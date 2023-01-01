import { hash } from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "lib/dbConnect";
import UserSchema from "lib/models/user";
import { regSchema } from "lib/yupSchemas";

// const BASE_URI = process.env.BASE_URI;
//
// if (!BASE_URI) throw new Error("BASE_URI local variable not set");

type Data = {
  success: boolean;
  error?: string;
  isUnitn?: boolean;
};

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     description: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               surname:
 *                 type: string
 *                 description: The user's surname
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 format: password
 *               isGestore:
 *                 type: boolean
 *                 description: Whether the user is a gestore or not
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 isUnitn:
 *                   type: boolean
 *                   description: Whether the user is a unitn student or not
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function signupHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).send({
      success: false,
      error: "HTTP method not valid only POST Accepted",
    });
  }

  const schema = Yup.object().shape({
    name: regSchema.name,
    surname: regSchema.name,
    email: regSchema.email,
    password: regSchema.password,
  });

  try {
    await schema.validate(req.body);

    const { name, surname, email, password, isGestore } = req.body;
    await dbConnect();

    const hypoteticUser = await UserSchema.findOne({ email }).exec();
    if (hypoteticUser && hypoteticUser.email === email) {
      return res.status(409).send({
        success: false,
        error: "Email already in use",
      });
    }
    const isUnitn = email.endsWith("@studenti.unitn.it");

    await UserSchema.create({
      id: uuidv4(),
      name,
      surname,
      email,
      password: await hash(password, 12),
      isGestore,
      isUnitn,
    });

    return res.status(201).send({ success: true, isUnitn });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: (error as Error).message });
  }
}

export default signupHandler;
