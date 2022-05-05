import concatFiles from "./concatFiles.js";

concatFiles('D:\\FrontEnd Documents\\learn\\nodej-design-patterns\\Chapter4\\11-web-spider-v4\\download\\loige.co.html', 'files/bar.txt', 'files/dest.txt', (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('finish')
})
