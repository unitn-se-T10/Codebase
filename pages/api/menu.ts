import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import MenuSchema, { MenuDocType } from "lib/models/menu";
import RistoranteSchema from "lib/models/ristorante";
import { PietanzaDocType } from "lib/models/pietanza";
import { v4 as uuidv4 } from "uuid";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Session } from "next-auth";

/**
 * @swagger
 * components:
 *   schemas:
 *     PietanzaDocType:
 *       properties:
 *         nome:
 *           type: string
 *           description: Name of the dish
 *         prezzo:
 *           type: number
 *           description: Price of the dish
 *         allergeni:
 *           type: array
 *           description: Array of allergens
 *           items:
 *             type: string
 *         calorie:
 *           type: number
 *           description: Calories of the dish
 *         ingredienti:
 *           type: array
 *           description: Array of ingredients
 *           items:
 *             type: string
 *             description: Ingredient
 *         isDisponibile:
 *           type: boolean
 *           description: Availability of the dish
 *     MenuDocType:
 *       properties:
 *         id:
 *           type: string
 *           description: Id of the menu
 *           format: uuid
 *         nome:
 *           type: string
 *           description: Name of the menu
 *         ristoranteId:
 *           type: string
 *           description: Id of the restaurant
 *           format: uuid
 *         tipologia:
 *           type: string
 *           description: Type of the menu
 *         piatti:
 *           type: array
 *           description: Array of dishes
 *           items:
 *             $ref: '#/components/schemas/PietanzaDocType'
 */
type Data = {
  success: boolean;
  error?: string;
  menuId?: string;
  menu?: MenuDocType;
};

async function checkPermission(
  session: Session,
  menuId: string,
  res: NextApiResponse<Data>
) {
  dbConnect();
  const ristorante = await RistoranteSchema.findOne({
    gestoreId: session.user.id,
    menuIds: menuId,
  }).exec();
  if (!ristorante) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized or menu not found",
    });
  }
}

/**
 * @swagger
 * /api/menu:
 *   get:
 *     description: Get a menu
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Menu found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 menu:
 *                   $ref: '#/components/schemas/MenuDocType'
 *       400:
 *         description: id not provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function getMenu(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({
      success: false,
      error: "id not provided",
    });
  }

  dbConnect();
  const menu = await MenuSchema.findOne({ id }).exec();
  if (!menu) {
    return res.status(404).send({
      success: false,
      error: "Menu not found",
    });
  }

  return res.status(200).send({ success: true, menu });
}

/**
 * @swagger
 * /api/menu:
 *   post:
 *     description: Add a menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Name of the menu
 *               tipologia:
 *                 type: string
 *                 description: Type of the menu
 *               piatti:
 *                 type: array
 *                 description: Array of dishes
 *                 items:
 *                   $ref: '#/components/schemas/PietanzaDocType'
 *     responses:
 *       200:
 *         description: Menu added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 menuId:
 *                   type: string
 *                   description: Id of the menu
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized or menu not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function addMenu(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user?.isGestore) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized",
    });
  }

  const { nome, tipologia, ristoranteId, piatti } = req.body;
  if (!nome || !tipologia || !ristoranteId || !piatti) {
    return res.status(400).send({
      success: false,
      error: "Insufficient arguments",
    });
  }

  dbConnect();
  try {
    const piattiData = piatti.map((piatto: Omit<PietanzaDocType, "id">) => ({
      id: uuidv4(),
      ...piatto,
    }));

    const menu = await MenuSchema.create({
      id: uuidv4(),
      nome,
      tipologia,
      ristoranteId,
      piatti: piattiData,
    });
    await RistoranteSchema.updateOne(
      { id: ristoranteId },
      { $push: { menuIds: menu.id } }
    ).exec();
    return res.status(200).send({ success: true, menuId: menu.id });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
}

/**
 * @swagger
 * /api/menu:
 *   put:
 *     description: Update a menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Id of the menu
 *                 format: uuid
 *                 required: true
 *               nome:
 *                 type: string
 *                 description: Name of the menu
 *               tipologia:
 *                 type: string
 *                 description: Type of the menu
 *               piatti:
 *                 type: array
 *                 description: Array of dishes
 *                 items:
 *                   $ref: '#/components/schemas/PietanzaDocType'
 *     responses:
 *       200:
 *         description: Menu updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 menu:
 *                   $ref: '#/components/schemas/MenuDocType'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized or menu not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function editMenu(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { id, nome, tipologia, piatti } = req.body;
  if (!id) {
    return res.status(400).send({
      success: false,
      error: "id is required",
    });
  }

  await checkPermission(session, id, res);

  dbConnect();
  const menu = await MenuSchema.findOne({ id }).exec();
  if (nome) menu.nome = nome;
  if (tipologia) menu.tipologia = tipologia;
  if (piatti) menu.piatti = piatti;
  await menu.save();

  return res.status(200).send({ success: true, menu });
}

/**
 * @swagger
 * /api/menu:
 *   delete:
 *     description: Delete a menu
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Menu deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized or menu not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function deleteMenu(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).send({
      success: false,
      error: "id is required",
    });
  }

  await checkPermission(session, id, res);

  dbConnect();
  await MenuSchema.deleteOne({ id }).exec();
  await RistoranteSchema.updateOne(
    { gestoreId: session.user.id },
    { $pull: { menuIds: id } }
  ).exec();
  return res.status(200).send({ success: true });
}

async function menuHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getMenu(req, res);
    case "POST":
      return addMenu(req, res);
    case "PUT":
      return editMenu(req, res);
    case "DELETE":
      return deleteMenu(req, res);
    default:
      return res.status(405).send({
        success: false,
        error: "HTTP method not valid",
      });
  }
}

export default menuHandler;
