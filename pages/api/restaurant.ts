import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "./auth/[...nextauth]";
import dbConnect from "lib/dbConnect";
import RistoranteSchema, { RistoranteDocType } from "lib/models/ristorante";
import MenuSchema from "lib/models/menu";

/**
 * @swagger
 * components:
 *   schemas:
 *     RistoranteDocType:
 *       properties:
 *         id:
 *           type: uuid
 *           description: The auto-generated id of the restaurant
 *         nome:
 *           type: string
 *           description: The name of the restaurant
 *         immagine:
 *           type: binary
 *           description: The image of the restaurant
 *         indirizzo:
 *           type: string
 *           description: The address of the restaurant
 *         orariApertura:
 *           type: string
 *           description: The opening hours of the restaurant
 *         telefono:
 *           type: string
 *           description: The phone number of the restaurant
 *         sito:
 *           type: string
 *           description: The website of the restaurant
 *           format: url
 *         email:
 *           type: string
 *           description: The email of the restaurant
 *           format: email
 *         descrizione:
 *           type: string
 *           description: The description of the restaurant
 *         tipologia:
 *           type: string
 *           description: The type of the restaurant
 *         gestoreId:
 *           type: string
 *           description: The id of the restaurant manager
 *           format: uuid
 *         valutazione:
 *           type: number
 *           description: The rating of the restaurant
 *         menuIds:
 *           type: array
 *           description: The ids of the menus of the restaurant
 *           items:
 *             type: string
 *             format: uuid
 */
type Data = {
  success: boolean;
  error?: string;
  ristoranteId?: string;
  ristorante?: RistoranteDocType;
};

/**
 * @swagger
 * /api/restaurant:
 *   get:
 *     description: Get the info of a restaurant
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: The restaurant info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 risotante:
 *                   $ref: '#/components/schemas/RistoranteDocType'
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
async function getRestaurantInfo(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({
      success: false,
      error: "Missing id",
    });
  }

  dbConnect();
  const restaurant = await RistoranteSchema.findOne({ id: id });
  if (!restaurant) {
    return res.status(404).send({
      success: false,
      error: "Restaurant not found",
    });
  }

  return res.status(200).send({ success: true, ristorante: restaurant });
}

/**
 * @swagger
 * /api/restaurant:
 *   post:
 *     description: Add a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: The name of the restaurant
 *               indirizzo:
 *                 type: string
 *                 description: The address of the restaurant
 *               orariApertura:
 *                 type: string
 *                 description: The opening hours of the restaurant
 *               telefono:
 *                 type: string
 *                 description: The phone number of the restaurant
 *               sito:
 *                 type: string
 *                 description: The website of the restaurant
 *                 format: url
 *               email:
 *                 type: string
 *                 description: The email of the restaurant
 *                 format: email
 *               descrizione:
 *                 type: string
 *                 description: The description of the restaurant
 *               tipologia:
 *                 type: string
 *                 description: The type of the restaurant
 *               valutazione:
 *                 type: number
 *                 description: The rating of the restaurant
 *                 default: 0
 *                 minimum: 0
 *                 maximum: 5
 *               immagine:
 *                 type: string
 *                 description: The image of the restaurant
 *                 format: base64
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
 *                 ristoranteId:
 *                   type: string
 *                   description: The id of the restaurant
 *                   format: uuid
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
async function addRestaurant(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user?.isGestore) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized",
    });
  }

  const {
    nome,
    indirizzo,
    orariApertura,
    telefono,
    sito,
    email,
    descrizione,
    tipologia,
    immagine,
    valutazione,
  } = req.body;
  // NOTE: should use YUP
  if (
    !nome ||
    !indirizzo ||
    !orariApertura ||
    !telefono ||
    !sito ||
    !email ||
    !descrizione ||
    !tipologia ||
    !immagine
  ) {
    return res.status(400).send({
      success: false,
      error: "Missing fields",
    });
  }

  dbConnect();
  try {
    const restaurant = await RistoranteSchema.create({
      id: uuidv4(),
      nome,
      indirizzo,
      orariApertura,
      telefono,
      sito,
      email,
      descrizione,
      tipologia,
      gestoreId: session.user.id,
      immagine,
      valutazione: valutazione ? valutazione : 0,
      menuIds: [],
    });
    return res.status(200).send({ success: true, ristoranteId: restaurant.id });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
}

/**
 * @swagger
 * /api/restaurant:
 *   put:
 *     description: Update a restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The id of the restaurant
 *                 format: uuid
 *                 required: true
 *               nome:
 *                 type: string
 *                 description: Name of the menu
 *               indirizzo:
 *                 type: string
 *                 description: The address of the restaurant
 *               orariApertura:
 *                 type: string
 *                 description: The opening hours of the restaurant
 *               telefono:
 *                 type: string
 *                 description: The phone number of the restaurant
 *                 format: phone
 *               sito:
 *                 type: string
 *                 description: The website of the restaurant
 *                 format: url
 *               email:
 *                 type: string
 *                 description: The email of the restaurant
 *                 format: email
 *               descrizione:
 *                 type: string
 *                 description: The description of the restaurant
 *               tipologia:
 *                 type: string
 *                 description: The type of the restaurant
 *               valutazione:
 *                 type: number
 *                 description: The rating of the restaurant
 *     responses:
 *       200:
 *         description: Restaurant updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 risotante:
 *                   $ref: '#/components/schemas/RistoranteDocType'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function editRestaurant(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const {
    id,
    nome,
    indirizzo,
    orariApertura,
    telefono,
    sito,
    email,
    descrizione,
    tipologia,
    immagine,
    valutazione,
  } = req.body;
  if (!session?.user?.isGestore) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized",
    });
  }
  if (!id) {
    return res.status(400).send({
      success: false,
      error: "id is required",
    });
  }

  dbConnect();
  const restaurant = await RistoranteSchema.findOne({
    id,
    gestoreId: session.user.id,
  });
  if (!restaurant) {
    return res.status(404).send({
      success: false,
      error: "Restaurant not found",
    });
  }
  if (nome) restaurant.nome = nome;
  if (indirizzo) restaurant.indirizzo = indirizzo;
  if (orariApertura) restaurant.orariApertura = orariApertura;
  if (telefono) restaurant.telefono = telefono;
  if (sito) restaurant.sito = sito;
  if (email) restaurant.email = email;
  if (descrizione) restaurant.descrizione = descrizione;
  if (tipologia) restaurant.tipologia = tipologia;
  if (valutazione) restaurant.valutazione = valutazione;
  if (immagine) restaurant.immagine = immagine;
  await restaurant.save();

  return res.status(200).send({ success: true, ristorante: restaurant });
}

/**
 * @swagger
 * /api/restaurant:
 *   delete:
 *     description: Delete a restaurant
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Restaurant deleted
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
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function deleteRestaurant(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const id = req.query.id as string;
  if (!session?.user?.isGestore) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized",
    });
  }

  if (!id) {
    return res.status(400).send({
      success: false,
      error: "id is required",
    });
  }

  dbConnect();
  const restaurant = await RistoranteSchema.findOne({
    id,
    gestoreId: session.user.id,
  });
  if (!restaurant) {
    return res.status(404).send({
      success: false,
      error: "Restaurant not found",
    });
  }
  await MenuSchema.deleteMany({ id: { $in: restaurant.menuIds } });
  await restaurant.delete();

  return res.status(200).send({ success: true });
}

async function restaurantHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getRestaurantInfo(req, res);
    case "POST":
      return addRestaurant(req, res);
    case "PUT":
      return editRestaurant(req, res);
    case "DELETE":
      return deleteRestaurant(req, res);
    default:
      return res.status(405).send({
        success: false,
        error: "HTTP method not valid",
      });
  }
}

export default restaurantHandler;
