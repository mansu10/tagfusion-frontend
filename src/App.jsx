import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import PageHome from './pages/PageHome'
import PageMine from './pages/PageMine'
import PageRegister from "./pages/PageRegister";
import PageTags from "./pages/PageTags";
import PageLoan from "./pages/PageLoan";
import PageRepay from "./pages/PageRepay";
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
          <Route path="/repay" element={<PageRepay />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ScrollToTop>
  );
};

export default App;
