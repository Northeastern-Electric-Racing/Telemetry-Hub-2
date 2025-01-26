#!/usr/bin/env node

import { Command } from "commander";
import figlet from "figlet";
import axios from "axios";

const program = new Command();
const SERVER_URL = "http://localhost:3000"; // Update this with your server's address

console.log(figlet.textSync("Charybdis CLI"));

program
  .version("1.0.0")
  .description(
    "A CLI for managing database uploading and downloading for Argos"
  );

// Command to download (dump) data
program
  .command("dump-dev")
  .description("Download data from the cloud database into local CSVs")
  .action(async () => {
    try {
      console.log(`Downloading data to...`);
      const response = await axios.put(`${SERVER_URL}/dump`);

      if (response.status === 200) {
        console.log("Data successfully dumped");
      } else {
        console.error("Error occurred during dump:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to dump data:", error);
    }
  });

// Command to upload data
program
  .command("up-dev <inputPath>")
  .description("Upload data from local CSVs into the cloud database")
  .action(async (inputPath) => {
    try {
      console.log(`Uploading data from ${inputPath}...`);
      const response = await axios.put(`${SERVER_URL}/upload`, {
        inputPath,
      });

      if (response.status === 200) {
        console.log("Data successfully uploaded from:", inputPath);
      } else {
        console.error("Error occurred during upload:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to upload data:", error);
    }
  });

program.parse(process.argv);
