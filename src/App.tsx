import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Series from './pages/Series';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="series/:id" element={<Series />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
