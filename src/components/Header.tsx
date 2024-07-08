import logo from '../assets/icons/logo.svg';
import searchIcon from '../assets/icons/search-icon.svg';

const Header = () => {
  return (
    <header className="flex gap-10 items-center">
      <div>
        <img src={logo} alt="Find movies logo" />
      </div>
      <div className="flex-1 relative">
        <input
          className="w-full pl-10 py-2 rounded-md focus:outline-yellow-400 p-4 bg-slate-100 text-black"
          placeholder="Search a Movie"
          type="text"
        />
        <button className="h-7 w-7 absolute left-2 top-1/2 -translate-y-1/2">
          <img className='opacity-70' src={searchIcon} alt="Search icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
