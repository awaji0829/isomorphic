import React from "react";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";

// import { Header } from "./components/Header";
import loadable from "@loadable/component";

const Header = loadable(
  () => import(/* webpackChunkName: "Header" */ "./components/Header")
);
const Footer = loadable(
  () => import(/* webpackChunkName: "Footer" */ "./components/Footer")
);
const Home = loadable(
  () => import(/* webpackChunkName: "Home" */ "./pages/Home")
);
const News = loadable(
  () => import(/* webpackChunkName: "News" */ "./pages/News")
);

const App: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>App</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/news" element={<News />}></Route>
      </Routes>
    </div>
  );
};
export default App;
