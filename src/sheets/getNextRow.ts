import path from "path";
import fs from "fs";
import { getSheetData } from "./getDataFromSheet";

const progressFile = path.resolve(__dirname, "../data/progress.json");

interface ProgressMap {
  [sheetName: string]: number;
}

export async function getNextRow(sheetName: string): Promise<string[]> {
  const progress: ProgressMap = JSON.parse(
    fs.readFileSync(progressFile, "utf-8")
  );
  const allRows = await getSheetData(sheetName);
  const headers = allRows[0];
  const dataRows = allRows.slice(1);

  const currentIndex = progress[sheetName] || 0;
  if (currentIndex >= dataRows.length) {
    throw new Error(`No more unused rows in sheet "${sheetName}".`);
  }
  const row = dataRows[currentIndex];

  progress[sheetName] = currentIndex + 1;
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
  return row;
}
