import dotenv from "dotenv";

dotenv.config();

// Validación
if (!process.env.PORT) {
  throw new Error("El puerto no está definido en el .env");
}

// Exportamos variables
export const PORT = process.env.PORT;