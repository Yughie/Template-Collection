import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Showcase from "./pages/Showcase";
import Postcard1 from "./pages/Postcard1";
import Postcard2 from "./pages/Postcard2";
import Postcard3 from "./pages/Postcard3";
import Postcard4 from "./pages/Postcard4";
import Postcard5 from "./pages/Postcard5";
import Postcard6 from "./pages/Postcard6";
import Gallery1 from "./pages/Gallery1";
import Gallery2 from "./pages/Gallery2";
import Gallery3 from "./pages/Gallery3";
import Gallery4 from "./pages/Gallery4";
import Gallery5 from "./pages/Gallery5";
import Gallery6 from "./pages/Gallery6";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Showcase />} />
        <Route path="/postcard-1" element={<Postcard1 />} />
        <Route path="/postcard-2" element={<Postcard2 />} />
        <Route path="/postcard-3" element={<Postcard3 />} />
        <Route path="/postcard-4" element={<Postcard4 />} />
        <Route path="/postcard-5" element={<Postcard5 />} />
        <Route path="/postcard-6" element={<Postcard6 />} />
        <Route path="/gallery-1" element={<Gallery1 />} />
        <Route path="/gallery-2" element={<Gallery2 />} />
        <Route path="/gallery-3" element={<Gallery3 />} />
        <Route path="/gallery-4" element={<Gallery4 />} />
        <Route path="/gallery-5" element={<Gallery5 />} />
        <Route path="/gallery-6" element={<Gallery6 />} />
      </Routes>
    </Router>
  );
}

export default App;
