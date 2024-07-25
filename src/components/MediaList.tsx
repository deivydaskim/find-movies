import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getMedia } from '../services/MoviesAPI';
import { getTitle } from '../utils/utils';
import Spinner from './Spinner';
import star from '../assets/icons/star-icon.svg';
import errorLogo from '../assets/icons/plug-error-illustration.svg';

interface MediaListProps {
  resource: 'movie/now_playing' | 'movie/upcoming' | 'tv/airing_today';
}

const getResourceType = (
  resource: MediaListProps['resource']
): 'movie' | 'series' => {
  return resource.startsWith('movie') ? 'movie' : 'series';
};

const MediaList: React.FC<MediaListProps> = ({ resource }) => {
  const [mediaData, setMediaData] = useState<MediaResult<Movie | TV> | null>(
    JSON.parse(sessionStorage.getItem(resource) || 'null')
  );
  const [loading, setLoading] = useState(!mediaData);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(() => {
    const savedPage = sessionStorage.getItem(`${resource}-page`);
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const containerRef = useRef<HTMLUListElement>(null);

  const resourceType = getResourceType(resource);

  useEffect(() => {
    if (mediaData && page == 1) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMedia(page, resource);

        setMediaData((prevData) => {
          if (!prevData) {
            const newData = { ...data, page };
            sessionStorage.setItem(resource, JSON.stringify(newData));
            return newData;
          }

          const uniqueResults = data.results.filter(
            (item) =>
              !prevData.results.some((prevItem) => prevItem.id === item.id)
          );

          const newData = {
            ...data,
            results: [...prevData.results, ...uniqueResults],
            page,
          };
          sessionStorage.setItem(resource, JSON.stringify(newData));
          return newData;
        });
        sessionStorage.setItem(`${resource}-page`, page.toString());
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, resource]);

useEffect(() => {
  const container = containerRef.current;

  const handleScroll = () => {
    if (!container) return;

    sessionStorage.setItem(`${resource}-scrollPosition`, container.scrollLeft.toString());

    if (container.scrollLeft + container.clientWidth + 5 >= container.scrollWidth && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const savedScrollPosition = sessionStorage.getItem(`${resource}-scrollPosition`);
  if (savedScrollPosition && container) {
    container.scrollLeft = parseInt(savedScrollPosition, 10);
  }

  container?.addEventListener('scroll', handleScroll);

  return () => {
    container?.removeEventListener('scroll', handleScroll);
  };
}, [loading, resource]);


  if (loading && !mediaData) {
    return <Skeleton />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <ul
      ref={containerRef}
      className="my-9 flex overflow-x-scroll overflow-y-hidden gap-5"
    >
      {mediaData!.results.map((result) => (
        <Link
          className="first:ml-1 block hover:scale-105 transition-transform duration-200 ease-linear my-2"
          key={result.id}
          to={`${resourceType}/${result.id}`}
        >
          <li>
            <div className="relative mb-3 w-[185px] h-[278px]">
              {result.poster_path ? (
                <img
                  className="rounded-lg h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w185/${result.poster_path}`}
                  alt={getTitle(result)}
                />
              ) : (
                <div className="rounded-lg w-full h-full pt-10 bg-slate-900">
                  <p className="text-center text-slate-400">No image</p>
                </div>
              )}

              <div className="h-10 w-20 absolute bg-black rounded-se-lg -left-[1px] -bottom-[1px] flex justify-evenly items-center">
                <img className="w-6" src={star} alt="Rating star" />
                <p>{result.vote_average.toFixed(1)}</p>
              </div>
            </div>
            <h3 className="body-2 text-center max-w-[185px] text-wrap">
              {getTitle(result)}
            </h3>
          </li>
        </Link>
      ))}
      {loading && (
        <li className="relative right-3 self-center">
          <Spinner />
        </li>
      )}
    </ul>
  );
};

const Skeleton = () => {
  return (
    <ul className="my-11 flex gap-5 overflow-hidden">
      {Array.from({ length: 10 }).map((_, index) => (
        <li className="first:ml-1" key={index}>
          <div className="w-[185px] h-[278px] mb-3 rounded-lg bg-gray-700 animate-pulse"></div>
          <div className="w-[185px] h-6 mb-9 rounded-lg bg-gray-700 animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
};

const Error = () => {
  return (
    <div className="h-96 pl-4 pt-10 flex flex-col max-w-56 m-auto items-center gap-3 body">
      <h2 className="text-gray-200 text-center">Something went wrong...</h2>
      <img className="text-center" src={errorLogo} alt="" />
      <button
        className="px-3 py-1 rounded-md bg-blue-950 w-max"
        onClick={() => window.location.reload()}
      >
        Try reload page
      </button>
    </div>
  );
};

export default MediaList;
