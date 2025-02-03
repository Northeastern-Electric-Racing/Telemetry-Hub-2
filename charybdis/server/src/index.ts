import { dump } from "./controllers/dump.controller";
// import { upload } from "./controllers/upload.controller";
import { compareCloudToLocal } from "./controllers/compare.controller";
import { uploadToCloud } from "./services/upload.service";
import figlet from "figlet";
import { input, confirm, select } from "@inquirer/prompts";
import { pastel } from "gradient-string";
import { CouldNotConnectToDB, dumpLocalDb } from "./services/dump.service";
import { compareDatabases } from "./services/compare.service";

const printTitle = async (projectName: string) => {
  // Super cool project name
  figlet(projectName, function (err, data) {
    console.log(data);
  });

  // Wait a second so that the project name is fully printed
  // before the calling user can print anything else
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

const commandDialog = async () => {
  let command = await select({
    message: "what would you like to do:",
    choices: ["dump", "upload", "compare"],
  });

  switch (command) {
    case "dump":
      try {
        await dumpLocalDb();
      } catch (error) {
        if (error instanceof CouldNotConnectToDB) {
          console.log("Could not connect to the local database");
          commandDialog();
        } else {
          console.log("An error occurred while dumping the local database");
        }
      }
      break;
    case "upload":
      await uploadToCloud();
      break;
    case "compare":
      await compareDatabases();
      break;
    default:
      console.log("Invalid command");
  }
};

const main = async () => {
  await printTitle("Charybdis 2.0");
  await commandDialog();
};

// Call the askName function
main();
