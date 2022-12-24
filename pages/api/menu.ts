import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import MenuSchema, { MenuDocType } from "lib/models/menu";
import { PietanzaDocType } from "lib/models/pietanza";
import { v4 as uuidv4 } from "uuid";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

type Data = {
  success: boolean;
  error?: string;
  menuId?: string;
  menu?: MenuDocType;
};

async function getHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({
      success: false,
      error: "id is required",
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

  return res.status(200).json({ success: true, menu });
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user?.isGestore) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized",
    });
  }

  const { nome, tipologia, piatti } = req.body;
  if (!nome || !tipologia || !piatti) {
    return res.status(400).send({
      success: false,
      error: "nome, tipologia and piatti are required",
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
      piatti: piattiData,
    });
    return res.status(200).json({ success: true, menuId: menu.get("id") });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
}

async function menuHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") return getHandler(req, res);
  if (req.method === "POST") return postHandler(req, res);
  else {
    return res.status(405).send({
      success: false,
      error: "HTTP method not valid only GET Accepted",
    });
  }
}

export default menuHandler;
