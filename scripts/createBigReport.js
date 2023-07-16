// Usage: node ./scripts/createBigReport.js

fs = require('fs');

const file1Data = fs.readFileSync('./outputs/client.json', 'utf8');
const file2Data = fs.readFileSync('./outputs/server.json', 'utf8');

const file1Entries = JSON.parse(file1Data).map((entry) => {
  entry.type = 'client';
  return entry;
});

const file2Entries = JSON.parse(file2Data).map((entry) => {
  entry.type = 'server';
  return entry;
});

const mergedEntries = file1Entries.concat(file2Entries);

mergedEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const sortedJson = JSON.stringify(mergedEntries);

if (!fs.existsSync('./outputs')) {
  fs.mkdirSync('./outputs');
}

// if (fs.existsSync('../outputs/bigReport.json')) {
//   fs.unlinkSync('../outputs/bigReport.json');
// }

fs.writeFileSync('./outputs/bigReport.json', sortedJson);

// console.log('Done!', sortedJson);
