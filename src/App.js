import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/Home/MovieDetails";
import Home from "./components/Home/Home";
import SharedLayout from "./components/Main/SharedLayout";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/movieDetail" element={<MovieDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
