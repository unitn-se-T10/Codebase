import {
  HydratedDocument,
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from "mongoose";
import { Allergene } from "lib/typings";

const PietanzaSchema = new Schema({
  id: { type: String, unique: true, required: true },
  nome: { type: String, required: true },
  prezzo: { type: Number, required: true },
  immagine: { type: String, required: true },
  allergeni: { type: [String], enum: Allergene, required: true },
  calorie: { type: Number, required: true },
  ingredienti: { type: [String], required: true },
  isDisponibile: { type: Boolean, required: true },
});

type PietanzaSchemaType = InferSchemaType<typeof PietanzaSchema>;

export type PietanzaDocType = HydratedDocument<PietanzaSchemaType>;

export default (models.Pietanza as Model<PietanzaSchemaType>) ||
  model("Pietanza", PietanzaSchema);
