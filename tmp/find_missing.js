// find missing
const fs = require("fs");

const appContent = fs.readFileSync("src/App.tsx", "utf-8");
const homeContent = fs.readFileSync("src/pages/Home.page.tsx", "utf-8");

const appMatches = [...appContent.matchAll(/path="tools\/([^"]+)"/g)].map(m => m[1]);
const appRealTools = appMatches.filter(path => path.includes("/")); // filter out "text", "image"

const homeMatches = [...homeContent.matchAll(/path: "\/tools\/([^"]+)"/g)].map(m => m[1]);
// popular templates also matched but it's fine.

const missingInHome = appRealTools.filter(x => !homeMatches.includes(x));
const missingInApp = homeMatches.filter(x => !appRealTools.includes(x));

console.log("Missing in Home.page.tsx:", missingInHome);
console.log("Missing in App.tsx:", missingInApp);
