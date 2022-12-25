import {
  HydratedDocument,
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from "mongoose";
import { TipologiaMenu } from "lib/typings";
import Pietanza from "lib/models/pietanza";

const MenuSchema = new Schema({
  id: { type: String, unique: true, required: true },
  nome: { type: String, required: true },
  ristoranteId: { type: String, required: true },
  tipologia: { type: String, enum: TipologiaMenu, required: true },
  piatti: { type: [Pietanza.schema], required: true },
});

MenuSchema.index({ nome: 1, ristoranteId: 1 }, { unique: true });

type MenuSchemaType = InferSchemaType<typeof MenuSchema>;

export type MenuDocType = HydratedDocument<MenuSchemaType>;

export default (models.Menu as Model<MenuSchemaType>) ||
  model("Menu", MenuSchema);
