export enum Allergene {
  ARACHIDI_E_DERIVATI = "arachidi e derivati",
  FRUTTA_A_GUSCIO = "frutta a guscio",
  LATTE_E_DERIVATI = "latte e derivati",
  MOLLUSCHI = "molluschi",
  PESCE = "pesce",
  SESAMO = "sesamo",
  SOIA = "soia",
  CROSTACEI = "crostacei",
  GLUTINE = "glutine",
  LUPINI = "lupini",
  SENAPE = "senape",
  SEDANO = "sedano",
  ANIDRIDE_SOLFOROSA_E_SOLFITI = "anidride solforosa e solfiti",
  UOVA_E_DERIVATI = "uova e derivati",
}

export enum TipologiaRistorante {
  RISTORANTE = "ristorante",
  PIZZERIA = "pizzeria",
  GIAPPONESE = "giapponese",
  CINESE = "cinese",
  MESSICANO = "messicano",
  INDIANO = "indiano",
  POKE = "poke",
  KEBAB = "kebab",
  FAST_FOOD = "fast food",
}

export enum TipologiaMenu {
  PRIMI = "primi",
  SECONDI = "secondi",
  CONTORNI = "contorni",
  DOLCI = "dolci",
  BEVANDE = "bevande",
  PIZZE_CLASSICHE = "pizze classiche",
}

export type RistoranteThumbnail = {
  id: string;
  nome: string;
  indirizzo: string;
  telefono: string;
  email: string;
  immagine: string;
  tipologia: string;
};
