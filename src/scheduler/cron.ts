import cron from "node-cron";
import { getNextRow } from "../sheets/getNextRow";

cron.schedule("0 11 * * *", async () => {
  console.log("Morning Job Triggered");
  const sheet = "Sheet1";
  const row = await getNextRow(sheet);
});

cron.schedule("0 18 * * *", async () => {
  console.log(" Evening Job Triggered");
  const sheet = "Sheet2";
  const row = await getNextRow(sheet);
});
