const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const blog = require('./blog');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const main = async () => {
  const posts = await blog();
  await app.prepare();

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    console.log({
      url: req.url,
      check: !!posts.find(x => x.url === req.url),
    });

    if (pathname === '/') {
      app.render(req, res, '/', query);
    } else if (!!posts.find(x => x.url === req.url)) {
      app.render(req, res, '/post', query);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
};

main();
