import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import RistoranteSchema from "lib/models/ristorante";

/**
 * @swagger
 * components:
 *   schemas:
 *     RistoranteThumbnail:
 *       properties:
 *         id:
 *           type: uuid
 *           description: Id of the restaurant
 *         nome:
 *           type: string
 *           description: Name of the restaurant
 *         indirizzo:
 *           type: string
 *           description: Address of the restaurant
 *         telefono:
 *           type: string
 *           description: Phone number of the restaurant
 *         email:
 *           type: string
 *           description: Email of the restaurant
 *         immagine:
 *           type: binary
 *           description: Image of the restaurant
 *     ThumbnailsResponse:
 *       properties:
 *         success:
 *           type: boolean
 *           description: Success of the request
 *         ristoranti:
 *           type: array
 *           description: Array of restaurants
 *           items:
 *             $ref: '#/components/schemas/RistoranteThumbnail'
 */
type Ristorante = {
  id: string;
  nome: string;
  indirizzo: string;
  telefono: string;
  email: string;
  immagine: string;
};

type Data = {
  success: boolean;
  error?: string;
  ristoranti?: Ristorante[];
};

/**
 * @swagger
 * /api/thumbnails:
 *   get:
 *     description: Get list data of restaurants
 *     parameters:
 *       - name: start
 *         description: Number of the first restaurant to get
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *           format: int
 *           minimum: 0
 *       - name: num
 *         description: Number of restaurants to get
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *           format: int
 *           minimum: 1
 *     responses:
 *       200:
 *         description: List of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ThumbnailsResponse'
 */
async function thumbnailsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).send({
      success: false,
      error: "HTTP method not valid only GET Accepted",
    });
  }
  const start = parseInt(req.query.start as string);
  const num = parseInt(req.query.num as string);

  dbConnect();
  const ristoranti = await RistoranteSchema.find({})
    .skip(start)
    .limit(num)
    .exec();
  const ristorantiData = ristoranti.map((ristorante) => {
    return {
      id: ristorante.id,
      nome: ristorante.nome,
      indirizzo: ristorante.indirizzo,
      telefono: ristorante.telefono,
      email: ristorante.email,
      immagine: ristorante.immagine,
    };
  });

  return res.status(200).json({ success: true, ristoranti: ristorantiData });
}

export default thumbnailsHandler;
