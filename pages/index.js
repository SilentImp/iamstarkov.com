import React, { Component } from 'react';
import { ThemeProvider } from 'react-jss';

import { Preview } from '../components';

const Index = ({ articles }) => (
  <div>{articles.map(x => <Preview key={x.url} article={x} />)}</div>
);

let articles;
Index.getInitialProps = async ({ renderPage }) => {
  if (!articles) {
    const articlesFetch = await fetch('http://localhost:3000/static/blog.json');
    articles = await articlesFetch.json();
  }
  return { articles };
};
export default Index;
