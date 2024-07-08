import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
{/*       <Route path="movie/:id" element={<Movies />} />
          <Route path="series/:id" element={<Series />} />*/}
          <Route path="*" element={<div>Error 404</div>} />  
        </Route>
      </Routes>
    </Router>
  );
};

export default App;