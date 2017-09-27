const Post = ({ article }) => (
  <div>
    <h1 dangerouslySetInnerHTML={{ __html: article.title.html }} />
    {article.date && <time>{article.date.time}</time>}
    <div dangerouslySetInnerHTML={{ __html: article.content.html }} />
  </div>
);

let articles;
Post.getInitialProps = async ({ req, renderPage }) => {
  const url = req ? req.url : location.pathname;
  if (!articles) {
    const articlesFetch = await fetch('http://localhost:3000/static/blog.json');
    articles = await articlesFetch.json();
  }
  const article = articles.find(x => x.url === url);
  console.log(articles);
  return { article };
};

export default Post;
