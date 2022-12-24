import { hash } from "bcrypt";
import dbConnect from "lib/dbConnect";
import UserSchema from "lib/models/user";
import { regSchema } from "lib/yupSchemas";
import type { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

// const BASE_URI = process.env.BASE_URI;
//
// if (!BASE_URI) throw new Error("BASE_URI local variable not set");

type Data = {
  success: boolean;
  error?: string;
  isUnitn?: boolean;
};

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

  // if (!(await VerifyCaptcha(req.body.captcha))) {
  //   return res.status(400).send("Invalid captcha");
  // }

  await dbConnect();

  try {
    await schema.validate(req.body);

    const { name, surname, email, password } = req.body;
    await dbConnect();

    const hypoteticUser = await UserSchema.findOne({ email }).exec();
    if (hypoteticUser && hypoteticUser.email === email) {
      return res.status(409).send({
        success: false,
        error: "Email already in use",
      });
    }
    const isUnitn = email.endsWith("@studenti.unitn.it");

    // TODO: implementare register del gestore
    await UserSchema.create({
      id: uuidv4(),
      name,
      surname,
      email,
      password: await hash(password, 12),
      isUnitn,
    });
    // await createUser(req.body);

    // const encodedUsername = encodeURIComponent(username);
    // const encodedVerifyEmail = encodeURIComponent(verifyEmail);
    //
    // const verificationLink = `${BASE_URI}api/verifyEmail?username=${encodedUsername}&verifyEmail=${encodedVerifyEmail}`;
    //
    // if (process.env.NODE_ENV !== "development") {
    //   await sendVerifyMail(req.body.email, { username, verificationLink });
    // } else console.log("Email verification link: " + verificationLink);

    return res.status(201).send({ success: true, isUnitn });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: (error as Error).message });
  }
}

export default signupHandler;
