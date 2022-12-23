import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import RistoranteSchema from "lib/models/ristorante";

type Ristorante = {
  id: string;
  nome: string;
  indirizzo: string;
  telefono: string;
  email: string;
};

type Data = {
  success: boolean;
  error?: string;
  ristoranti?: Ristorante[];
};

async function thumbnailsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).send({
      success: false,
      error: "HTTP method not valid only POST Accepted",
    });
  }
  const numStart = req.body.numStart;
  const numToDisplay = req.body.numToDisplay;

  dbConnect();
  const ristoranti = await RistoranteSchema.find({})
    .skip(numStart)
    .limit(numToDisplay)
    .exec();
  const ristorantiData = ristoranti.map((ristorante) => {
    return {
      id: ristorante.id,
      nome: ristorante.nome,
      indirizzo: ristorante.indirizzo,
      telefono: ristorante.telefono,
      email: ristorante.email,
    };
  });

  console.log(numToDisplay);
  res.status(200).json({ success: true, ristoranti: ristorantiData });
}

export default thumbnailsHandler;
