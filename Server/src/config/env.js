import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("El puerto no está definido en el .env");
}

export const PORT = process.env.PORT;