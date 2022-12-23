import {
  HydratedDocument,
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from "mongoose";
import Pietanza from "lib/models/pietanza";
import { Tipologia } from "lib/typing";

const RistoranteSchema = new Schema({
  id: { type: String, required: true },
  nome: { type: String, required: true },
  immagine: { type: Buffer, required: true },
  indirizzo: { type: String, required: true },
  orariApertura: { type: Date, required: true },
  telefono: { type: String, required: true },
  sito: { type: String, required: true },
  email: { type: String, required: true },
  descrizione: { type: String, required: true },
  tipologia: { type: String, enum: Tipologia, required: true },
  gestore: { type: String, required: true },
  valutazione: { type: Number, required: true },
  menu: { type: [Pietanza.schema], required: true },
});

type RistoranteSchemaType = InferSchemaType<typeof RistoranteSchema>;

export type RistoranteDocType = HydratedDocument<RistoranteSchemaType>;

export default (models.Ristorante as Model<RistoranteSchemaType>) ||
  model("Ristorante", RistoranteSchema);
