import Link from 'next/link';

const Preview = ({ article }) => (
  <div>
    <Link href={article.url}>
      <a>{article.title.text}</a>
    </Link>
    <time>{article.date.text}</time>
    <p dangerouslySetInnerHTML={{ __html: article.desc.html }} />
  </div>
);

export default Preview;
