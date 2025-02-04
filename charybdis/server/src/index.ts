// import { upload } from "./controllers/upload.controller";
import { uploadToCloud } from "./services/upload.service";
import figlet from "figlet";
import { select } from "@inquirer/prompts";
import { deleteAllDownloads, dumpLocalDb } from "./services/dump.service";
import { compareDatabases } from "./services/compare.service";
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
  await await commandDialog();
};

const printTitle = async (projectName: string) => {
  // Print the project title in ASCII art using figlet.
  figlet(projectName, (err, projectName) => {
    if (err) {
      console.error("Something went wrong with figlet:", err);
      return;
    }
    console.log(`\n${projectName}\n`);
  });

  // Wait a second so that the project title is fully printed
  // before the user can enter anything else.
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

const commandDialog = async () => {
  // Using chalk to style the select prompt message.
  const command = await select({
    message: chalk.bold.blue("What would you like to do with the data:"),
    choices: ["dump", "upload", "compare", "delete-all-downloads"],
  });

  switch (command) {
    case "dump":
      try {
        await dumpLocalDb();
      } catch (error) {
        handleDumpError(error);
      }
      break;
    case "upload":
      try {
        await uploadToCloud();
      } catch (error) {
        handleUploadError(error);
      }
      break;
    case "compare":
      try {
        let info = await compareDatabases();
        let formattedInfo = chalk.bold.green(info.matches.join("\n"));
        formattedInfo += "\n" + chalk.bold.red(info.mismatches.join("\n"));
        formattedInfo += "\n" + chalk.bold.yellow(info.extraTables.join("\n"));
        console.log(formattedInfo);
      } catch (error) {
        printError("compare databases failed");
      }
      break;
    case "delete-all-downloads":
      try {
        await deleteAllDownloads();
      } catch (error) {
        printError("delete all downloads failed");
      }

      break;
    default:
      printError("Invalid command");
  }

  await commandDialog();
};

const printError = (errorMessage: string) => {
  console.log(
    chalk.whiteBright.bold("\n\nError: ") +
      chalk.underline.red.bold(`${errorMessage}\n`)
  );
};

function handleUploadError(error: any) {
  if (error instanceof CouldNotConnectToCloudDB) {
    printError("Could not connect to the cloud database");
  } else if (error instanceof DataTypeUploadError) {
    printError("Failed to upload data types");
  } else if (error instanceof RunsUploadError) {
    printError("Failed to upload runs");
  } else if (error instanceof DataUploadError) {
    printError("Failed to upload data");
  } else {
    printError("An unknown error occurred: " + error.message);
  }
}

function handleDumpError(error: any) {
  if (error instanceof CouldNotConnectToLocalDB) {
    printError("Could not connect to the local database");
  } else if (error instanceof DataTypeDumpFailed) {
    printError("Failed to dump data types");
  } else if (error instanceof RunDumpFailed) {
    printError("Failed to dump runs");
  } else if (error instanceof DataDumpFailed) {
    printError("Failed to dump data");
  } else if (error instanceof FailedWriteAuditLog) {
    printError("Failed to write to audit log");
  } else {
    printError("An unknown error occurred: " + error.message);
  }
}

// Start the CLI
main();
