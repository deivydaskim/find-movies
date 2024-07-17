import { Outlet } from 'react-router-dom';
import Header from './components/Header';


const Layout = () => {
  return (
    <div className='px-4 my-8 '>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
