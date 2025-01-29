// import { Request, Response } from "express";
// import { uploadToCloud } from "../services/upload.service";
// import { prisma as cloudPrisma } from "../../../local-prisma/prisma";
// import { v4 as uuidv4 } from "uuid";

// export const upload = async (req: Request, res: Response) => {
//   const batchRunInserter = async (batch) => {
//     const newRuns = batch.map((run) => {
//       const newId = uuidv4();
//       runIdMap[run.runId] = newId;

//       return {
//         id: newId,
//         runId: Number(run.runId),
//         driverName: run.driverName,
//         notes: run.notes
//           ? `${run.notes} (location: ${run.locationName || ""})`
//           : `(location: ${run.locationName || ""})`,
//         time: new Date(run.time),
//       };
//     });

//     await cloudPrisma.run.createMany({ data: newRuns, skipDuplicates: true });
//     console.log(`Inserted ${newRuns.length} runs`);
//   };

//   await uploadRuns();
//   res.json({ message: "Uploaded the mf data" });
// };
