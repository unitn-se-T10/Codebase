import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      isGestore: boolean;
      id: string;
      surname: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    isGestore: boolean;
    id: string;
    surname: string;
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    isGestore: boolean;
    id: string;
    surname: string;
  }
}
