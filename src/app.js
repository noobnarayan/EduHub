import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PRODUCTION_URL } from "./constants.js";
import { errorHandler } from "./utils/errorHandler.js";
export const app = express();
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? `${PRODUCTION_URL}`
//         : "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(cors({}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(errorHandler);
