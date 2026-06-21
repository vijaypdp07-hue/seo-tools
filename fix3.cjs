const fs = require('fs');

const files = [
  "src/pages/tools/FakeNameGenerator.page.tsx",
  "src/pages/tools/HoursCalculator.page.tsx",
  "src/pages/tools/HtmlViewer.page.tsx",
  "src/pages/tools/TwitterCardGenerator.page.tsx",
  "src/pages/tools/UrlOpener.page.tsx",
  "src/pages/tools/XmlSitemapGenerator.page.tsx"
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(file, content);
}
console.log("Fixed!");
