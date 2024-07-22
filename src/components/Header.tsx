import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/icons/logo.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import SearchList from './SearchResults';
import { getSearchResults } from '../api/MoviesAPI';
import { debounce } from '../utils/utils';

const Header = () => {
  const [searchData, setSearchData] = useState<Search | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const inputValue = inputRef.current!.value;
    setLoading(true);

    if (inputValue.length === 0) {
      setSearchData(null);
      setLoading(false);
      return;
    }
    try {
      const search = await getSearchResults(inputValue);
      setSearchData(search);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleDebouncedSearch = debounce(handleSearch, 500);

  const resetSearch = () => {
    inputRef.current!.value = '';
    setSearchData(null);
  };

  return (
    <header className="flex flex-col sm:flex-row sm:gap-10 gap-3 items-center lg:px-28 px-6">
      <div>
        <Link to={`/`}>
          <img src={logo} alt="Find movies logo" />
        </Link>
      </div>
      <div className="flex-1 relative w-full">
        <input
          className="w-full pl-10 py-2 rounded-sm focus:outline-yellow-400 p-4 bg-slate-100 text-black"
          placeholder="Search a Movie"
          type="text"
          ref={inputRef}
          onInput={handleDebouncedSearch}
          onBlur={resetSearch}
        />
        <button className="h-7 w-7 absolute left-2 top-1/2 -translate-y-1/2">
          <img className="opacity-70" src={searchIcon} alt="Search icon" />
        </button>
        {
          <SearchList
            resetSearch={resetSearch}
            data={searchData}
            loading={loading}
            error={error}
          />
        }
      </div>
    </header>
  );
};

export default Header;
