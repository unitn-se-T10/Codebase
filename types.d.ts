import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      isGestore: boolean;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    isGestore: boolean;
  }
}
