import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Home from "./components/Home/Home";
import SharedLayout from "./components/Main/SharedLayout";
import About from "./components/About";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/movieDetail/:movieId" element={<MovieDetails />} />
            <Route path="/search/:searchText" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
