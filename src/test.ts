// src/test.ts
import { getSheetData } from "./sheets/getDataFromSheet";
import { getNextRow } from "./sheets/getNextRow";

// (async () => {
//   const rows = await getSheetData("Sheet1");
//   console.log(rows.slice(0, 2)); // Print first 5 rows
// })();

(async () => {
  const row = await getNextRow("Sheet1");
  console.log("Next row:", row);
})();
