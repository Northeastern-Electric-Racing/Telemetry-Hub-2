// import { upload } from "./controllers/upload.controller";
import { uploadToCloud } from "./services/upload.service";
import { select } from "@inquirer/prompts";
import { deleteAllDownloads, dumpLocalDb } from "./services/dump.service";
import chalk from "chalk";
import {
  CouldNotConnectToLocalDB,
  DataDumpFailed,
  DataTypeDumpFailed,
  RunDumpFailed,
} from "./errors/dump.errors";
import { FailedWriteAuditLog } from "./errors/audit.errors";
import {
  CouldNotConnectToCloudDB,
  DataTypeUploadError,
  DataUploadError,
  RunsUploadError,
} from "./errors/upload.errors";

const main = async () => {
  await printTitle("Charybdis 2.0");
  await commandDialog();
};

const printTitle = async (projectName: string) => {
  // Print the project title in ASCII art using figlet.
  console.log(`
   ____ _                      _         _ _       ____    ___  
  / ___| |__   __ _ _ __ _   _| |__   __| (_)___  |___ \\  / _ \\ 
 | |   | '_ \\ / _\` | '__| | | | '_ \\ / _\` | / __|   __) || | | |
 | |___| | | | (_| | |  | |_| | |_) | (_| | \\__ \\  / __/ | |_| |
  \\____|_| |_|\\__,_|_|   \\__, |_.__/ \\__,_|_|___/ |_____(_)___/ 
                         |___/                                  
`);

  // Wait a second so that the project title is fully printed
  // before the user can enter anything else.
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

const commandDialog = async () => {
  // Using chalk to style the select prompt message.
  const command = await select({
    message: chalk.bold.blue("What would you like to do with the data:"),
    choices: ["dump", "upload", "delete-all-downloads"],
  });

  try {
    switch (command) {
      case "dump":
        await dumpLocalDb();
        break;
      case "upload":
        await uploadToCloud();
        break;
      case "delete-all-downloads":
        await deleteAllDownloads();
        break;
      default:
        printError("Invalid command");
    }
  } catch (error) {
    printError(error.message);
  }
  await commandDialog();
};

const printError = (errorMessage: string) => {
  console.log(
    chalk.whiteBright.bold("\n\nError: ") +
      chalk.underline.red.bold(`${errorMessage}\n`)
  );
};

// Start the CLI
main();
