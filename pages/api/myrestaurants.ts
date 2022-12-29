import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import RistoranteSchema, { RistoranteDocType } from "lib/models/ristorante";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       properties:
 *         success:
 *           type: boolean
 *           description: Success of the request
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RistoranteDocType:
 *       properties:
 *         id:
 *           type: uuid
 *           description: Id of the restaurant
 *         nome:
 *           type: string
 *           description: Name of the restaurant
 *         immagine:
 *           type: binary
 *           description: Image of the restaurant
 *         indirizzo:
 *           type: string
 *           description: Address of the restaurant
 *         orariApertura:
 *           type: string
 *           description: Opening hours of the restaurant
 *         telefono:
 *           type: string
 *           description: Phone number of the restaurant
 *         sito:
 *           type: string
 *           description: Website of the restaurant
 *           format: url
 *         email:
 *           type: string
 *           description: Email of the restaurant
 *           format: email
 *         descrizione:
 *           type: string
 *           description: Description of the restaurant
 *         tipologia:
 *           type: string
 *           description: Type of the restaurant
 *         gestoreId:
 *           type: uuid
 *           description: Id of the restaurant manager
 *         valutazione:
 *           type: number
 *           description: Rating of the restaurant
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *         menuIds:
 *           type: array
 *           description: Ids of the restaurant menus
 *           items:
 *             type: uuid
 *     MyRestaurantsResponse:
 *       properties:
 *         success:
 *           type: boolean
 *           description: Success of the request
 *         ristoranti:
 *           type: array
 *           description: Array of restaurants
 *           items:
 *             $ref: '#/components/schemas/RistoranteDocType'
 */
type Data = {
  success: boolean;
  error?: string;
  ristoranti?: RistoranteDocType[];
};

/**
 * @swagger
 * /api/myrestaurants:
 *   get:
 *     description: Get list data of restaurants
 *     responses:
 *       200:
 *         description: List of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MyRestaurantsResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function myrestaurantHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).send({
      success: false,
      error: "HTTP method not valid only GET Accepted",
    });
  }

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user?.isGestore) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized",
    });
  }

  dbConnect();
  const ristoranti = await RistoranteSchema.find({
    gestoreId: session.user.id,
  }).exec();

  return res.status(200).json({ success: true, ristoranti });
}

export default myrestaurantHandler;
