import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  error?: string;
};

async function getRestaurantInfo(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO: implement
}

async function addRestaurant(req: NextApiRequest, res: NextApiResponse<Data>) {
  // TODO: implement
}

async function editRestaurant(req: NextApiRequest, res: NextApiResponse<Data>) {
  // TODO: implement
}

async function deleteRestaurant(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO: implement
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
