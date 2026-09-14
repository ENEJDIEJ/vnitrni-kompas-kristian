import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "app", "prostor-demo");
const resources = {
  en: JSON.parse(fs.readFileSync(path.join(sourceDir, "contentTranslations.en.json"), "utf8")),
  de: JSON.parse(fs.readFileSync(path.join(sourceDir, "contentTranslations.de.json"), "utf8")),
};

const longSourceStrings = Object.keys(resources.en).filter((value) => value.length > 30);
const report = {
  lessonBlocks: 84,
  sourceStrings: Object.keys(resources.en).length,
  enTranslatedLongStrings: longSourceStrings.filter((value) => resources.en[value] !== value).length,
  deTranslatedLongStrings: longSourceStrings.filter((value) => resources.de[value] !== value).length,
  enUntranslatedLongStrings: longSourceStrings.filter((value) => resources.en[value] === value),
  deUntranslatedLongStrings: longSourceStrings.filter((value) => resources.de[value] === value),
};

console.log(JSON.stringify(report, null, 2));
if (report.enUntranslatedLongStrings.length || report.deUntranslatedLongStrings.length) process.exitCode = 1;
