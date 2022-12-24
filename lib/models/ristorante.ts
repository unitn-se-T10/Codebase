import {
  HydratedDocument,
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from "mongoose";
import { TipologiaRistorante } from "lib/typings";

const RistoranteSchema = new Schema({
  id: { type: String, unique: true, required: true },
  nome: { type: String, required: true },
  immagine: { type: Buffer, required: true },
  indirizzo: { type: String, required: true },
  orariApertura: { type: Date, required: true },
  telefono: { type: String, required: true },
  sito: { type: String, required: true },
  email: { type: String, required: true },
  descrizione: { type: String, required: true },
  tipologia: { type: String, enum: TipologiaRistorante, required: true },
  gestoreId: { type: String, required: true },
  valutazione: { type: Number },
  menuIds: { type: [String], required: true },
});

type RistoranteSchemaType = InferSchemaType<typeof RistoranteSchema>;

export type RistoranteDocType = HydratedDocument<RistoranteSchemaType>;

export default (models.Ristorante as Model<RistoranteSchemaType>) ||
  model("Ristorante", RistoranteSchema);
