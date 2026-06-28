const fs = require('fs');

const files = [
  "src/pages/tools/CropImage.page.tsx",
  "src/pages/tools/FaviconGenerator.page.tsx",
  "src/pages/tools/FormatConverter.page.tsx",
  "src/pages/tools/HeicConverter.page.tsx",
  "src/pages/tools/LockPdf.page.tsx",
  "src/pages/tools/PdfToJpg.page.tsx",
  "src/pages/tools/RotatePdf.page.tsx",
  "src/pages/tools/SplitPdf.page.tsx",
  "src/pages/tools/TargetSizeCompressor.page.tsx"
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace escaped backticks with real backticks
  content = content.replace(/\\`/g, '`');
  
  // Replace escaped dollar signs
  content = content.replace(/\\\$/g, '$');

  fs.writeFileSync(file, content);
}
console.log("Done fixed escaping!");
