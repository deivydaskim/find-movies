import { Outlet } from 'react-router-dom';
import Header from './components/Header';


const Layout = () => {
  return (
    <div className='px-3 max-w-[1440px] my-8 mx-auto '>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
