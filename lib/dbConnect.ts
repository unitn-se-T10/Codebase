/*import mongoose from "mongoose";

// HACK: I don't think this is the right way to do this. Find mongoose types
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: typeof mongoose;
        promise: Promise<typeof mongoose>;
      };
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB environment variables inside .env.local"
  );
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
/*
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        return mongoose;
      });
    } catch (error) {
      console.log(error);
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
*/