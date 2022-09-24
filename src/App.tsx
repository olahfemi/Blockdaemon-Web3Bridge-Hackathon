import "./App.css";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tracker from "./pages/Tracker";
import Explorer from "./pages/Explorer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MainLayout />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/explorer" element={<Explorer />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
