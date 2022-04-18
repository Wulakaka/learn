import FindRegex from "./FindRegex.js";

const findRegex = new FindRegex(/hello\w+/)
findRegex.addFile('files/fileA.txt')
  .addFile('files/fileB.txt')
  // 由于触发是同步的，所以监听要放在执行之前
  .on('find', (list) => console.log(`invoke find: ${list}`))
  .find()
  .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`))
