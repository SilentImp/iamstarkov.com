import 'isomorphic-fetch';

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// import { JssProvider, SheetsRegistry } from 'react-jss';
// import blog from '../blog';

export default class AppDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const articlesFetch = await fetch('http://localhost:3000/static/blog.json');
    const articles = await articlesFetch.json();

    // console.log(articles);
    const renderedPage = renderPage();
    /*
    const sheets = new SheetsRegistry();

    const decoratePage = Page => props => (
      <JssProvider registry={sheets}>
        <Page {...props} />
      </JssProvider>
    );


    const styles = (
      <style type="text/css" data-meta="jss-ssr">
        {sheets.toString()}
      </style>
    );
    */

    // return { ...renderedPage, styles, articles };
    return Object.assign({}, renderedPage);
  }
}
