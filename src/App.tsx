import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Movie from './pages/Movie';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          {/*           <Route path="series/:id" element={<Series />} />*/}
          <Route path="*" element={<div>Error 404</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
