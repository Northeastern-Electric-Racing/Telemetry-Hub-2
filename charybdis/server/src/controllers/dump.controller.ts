import { Request, Response } from "express";
import { dumpLocalDb } from "../services/dump.service";

export const dump = async (req: Request, res: Response) => {
  await dumpLocalDb();
  res.json({ message: "Dumped the mf data" });
};
