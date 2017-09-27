const path = require('path');
const fs = require('fs');
const util = require('util');

const R = require('ramda');
const articleData = require('article-data');

const pify = util.promisify;
const readdir = pify(fs.readdir);
const readFile = x => pify(fs.readFile)(x, 'utf8');
const log = console.log;
const err = console.err;

const ARTICLES_PATH = 'articles';

const fileObj = R.objOf('file');
const addPath = x => y => path.join(x, y);

const getBasename = file => path.basename(file, path.extname(file));

const articleFileRegexr = /^\d{4}-\d{2}-[\w\-]+\.md$/;

const url = ({ file }) => getBasename(file).substr('8');
const addProp = prop => fn => o => R.merge(o, { [prop]: fn(o) });
const rejectDrafts = x => !x.includes('draft');
const filterArticles = x => articleFileRegexr.test(x);
const data = ({ raw }) => articleData(raw, 'MMMM D, YYYY', 'en');

const articlesFiles = async path =>
  (await readdir(ARTICLES_PATH))
    .filter(filterArticles)
    .map(addPath(ARTICLES_PATH));

const mergeFileAndContent = (file, raw) => ({ file, raw });

const main = async () => {
  const files = await articlesFiles(ARTICLES_PATH);
  const rawContents = await Promise.all(files.map(readFile));
  const articlesRaw = R.zipWith(mergeFileAndContent, files, rawContents);
  const removeNodes = R.map(R.omit('node'));

  const articles = articlesRaw
    .map(o => R.mergeAll([o, { url: `/${url(o)}/` }, removeNodes(data(o))]))
    .map(R.omit('raw'));

  return articles;
};

module.exports = main;
