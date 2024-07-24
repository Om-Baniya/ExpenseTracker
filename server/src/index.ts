
import express, { Express } from "express";
import mongoose from "mongoose";
import FinancialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = Url of your database;
  
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("failed to connect to mongodb:", err));

app.use("/financial-records", FinancialRecordRouter);

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
