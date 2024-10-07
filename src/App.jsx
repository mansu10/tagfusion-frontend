import { Routes, Route, Navigate, ScrollRestoration } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
// import Customdid from "./pages/Customdid";
import Web3card from "./pages/Web3card";
import CreateTags from "./pages/CreateTags";
import Web3TagAward from "./pages/Web3TagAward";
import CreateTagLink from "./pages/CreateTagLink.jsx";

import PageHome from './pages/PageHome'
import PageMine from './pages/PageMine'
import PageRegister from "./pages/PageRegister";
import PageTags from "./pages/PageTags";
import PageLoan from "./pages/PageLoan";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {

  return (
    <ScrollToTop>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageHome />} />
          <Route path="/my" element={<PageMine />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/tags" element={<PageTags />} />
          <Route path="/loan" element={<PageLoan />} />
          {/*<Route path="/web3" element={<Customdid />} />*/}
          {/* <Route path="/card" element={<Web3card />} /> */}
          <Route path="/create_tags" element={<CreateTags />} />
          <Route path="/award" element={<Web3TagAward />} />
          <Route path="/tgcreate_tag" element={<CreateTagLink />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ScrollToTop>
  );
};

export default App;
