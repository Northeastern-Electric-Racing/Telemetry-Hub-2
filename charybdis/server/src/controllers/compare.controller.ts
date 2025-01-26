import { Request, Response } from "express";
import { compareDatabases } from "../services/compare.service";

export const compareCloudToLocal = async (req: Request, res: Response) => {
  let result = await compareDatabases();
  res.json({ message: result });
};
