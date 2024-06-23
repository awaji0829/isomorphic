import React from "react";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Header } from "./components/Header";

const App = () => {
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
