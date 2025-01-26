import { Request, Response } from "express";
import { uploadToCloud } from "../services/upload.service";

export const upload = async (req: Request, res: Response) => {
  await uploadToCloud();
  res.json({ message: "Uploaded the mf data" });
};
