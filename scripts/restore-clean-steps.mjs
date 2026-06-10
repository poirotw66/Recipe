#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const recipesDir = join(root, "src/content/recipes");
const targetCommit = "20abcc9";

function extractStepsBlock(content) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const startIdx = lines.findIndex((l) => l.trim() === "steps:");
  if (startIdx === -1) return null;
  const stepsLines = ["steps:"];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("- ")) {
      stepsLines.push(line);
    } else if (line.trim() === "" && stepsLines.length > 1) {
      stepsLines.push(line);
    } else {
      break;
    }
  }
  return stepsLines.join("\n");
}

function replaceStepsBlock(currentContent, oldStepsBlock) {
  const lines = currentContent.replace(/\r\n/g, "\n").split("\n");
  const startIdx = lines.findIndex((l) => l.trim() === "steps:");
  if (startIdx === -1) return currentContent;
  let endIdx = startIdx + 1;
  while (endIdx < lines.length && (lines[endIdx].startsWith("- ") || lines[endIdx].trim() === "")) {
    endIdx++;
  }
  const before = lines.slice(0, startIdx).join("\n");
  const after = lines.slice(endIdx).join("\n");
  return before + "\n" + oldStepsBlock + "\n" + after;
}

function main() {
  const files = readdirSync(recipesDir).filter((f) => f.endsWith(".md"));
  let restoredCount = 0;

  for (const file of files) {
    const filePath = join(recipesDir, file);
    const currentContent = readFileSync(filePath, "utf8");

    try {
      // Fetch the file content from commit 20abcc9
      const oldContent = execSync(
        `git show ${targetCommit}:src/content/recipes/${file}`,
        { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }
      );

      const oldStepsBlock = extractStepsBlock(oldContent);
      if (!oldStepsBlock) {
        console.warn(`[WARN] No steps block found in historical version of ${file}`);
        continue;
      }

      const updatedContent = replaceStepsBlock(currentContent, oldStepsBlock);
      if (updatedContent !== currentContent) {
        writeFileSync(filePath, updatedContent, "utf8");
        restoredCount++;
      }
    } catch (err) {
      console.error(`[ERROR] Failed to restore steps for ${file}:`, err.message);
    }
  }

  console.log(`Successfully restored steps for ${restoredCount} recipes to commit ${targetCommit}.`);
}

main();
