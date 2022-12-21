import {
  HydratedDocument,
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from "mongoose";

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  isUnitn: { type: Boolean, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

type UserSchemaType = InferSchemaType<typeof UserSchema>;

export type UserDocType = HydratedDocument<UserSchemaType>;

export default (models.User as Model<UserSchemaType>) ||
  model("User", UserSchema);
