const path = require('path');
const fs = require('fs');
const util = require('util');

const blog = require('./blog');

const pify = util.promisify;
const writeFile = pify(fs.writeFile);

const main = async () => {
  const articles = await blog();

  await writeFile(
    'static/blog.json',
    JSON.stringify(articles, null, 2),
    'utf8',
  );
};

main();
