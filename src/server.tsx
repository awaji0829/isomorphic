import path from "path";
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import fs from "fs";
import Helmet from "react-helmet";

import App from "./App";
import { StaticRouter } from "react-router-dom/server"; // 변경됨!!!

const app = express();

if (process.env.NODE_ENV !== "production") {
  //개발 중에 코드 변경사항을 실시간으로 반영하여 개발 효율성을 높입
  const webpack = require("webpack");
  const webpackConfig = require("../webpack.client.js");

  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  const compiler = webpack(webpackConfig);

  app.use(
    //메모리상에 번들 파일을 저장하고 Express.js 서버와 통합하여 실시간으로 변화를 반영
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  //핫 모듈 리플레이스먼트를 위한 미들웨어로, 변경된 모듈을 전체 페이지를 새로고침하지 않고도 실시간으로 업데이트
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname)));

app.get("*", (req, res) => {
  const context: any = {} as any;

  const html = renderToString(
    //서버사이드 렌더링에서 BrowserRouter 대신 사용하는 React-router
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  //꼭! renderToString 다음에 선언해주셔야 helmet의 정보를 정상적으로 가져올 수 있다.
  const helmet = Helmet.renderStatic();

  res.set("content-type", "text/html");
  res.send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
     
          ${helmet.title.toString()}
        </head>
        <body>
          <div id="root">${html}</div>
          <script type="text/javascript" src="main.js"></script>
        </body>
      </html>
  `);
});

app.listen(3003, () => console.log("Server started http://localhost:3003"));
