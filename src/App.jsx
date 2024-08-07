import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
// import Customdid from "./pages/Customdid";
import Web3card from "./pages/Web3card";
import CreateTags from "./pages/CreateTags";
import Web3TagAward from "./pages/Web3TagAward";
import CreateTagLink from "./pages/CreateTagLink.jsx";



const App = () => {

  return (

    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/*<Route path="/web3" element={<Customdid />} />*/}
        <Route path="/card" element={<Web3card />} />
        <Route path="/create_tags" element={<CreateTags />} />
        <Route path="/award" element={<Web3TagAward />} />
          <Route path="/tgcreate_tag" element={<CreateTagLink />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
};

export default App;
