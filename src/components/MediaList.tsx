import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getMedia } from '../api/MoviesAPI';
import { getTitle } from '../utils/utils';
import Spinner from './SpinnerLoading';
import star from '../assets/icons/star-icon.svg';

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
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);

  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMedia(page, resource);

        setMediaData((prevData) => {
          if (!prevData) return data;

          const uniqueResults = data.results.filter(
            (item) =>
              !prevData.results.some((prevItem) => prevItem.id === item.id)
          );

          return {
            ...data,
            results:
              page === 1
                ? data.results
                : [...prevData.results, ...uniqueResults],
          };
        });
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
      if (
        container &&
        container.scrollLeft + container.clientWidth + 5 >=
          container.scrollWidth
      ) {
        if (!loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  if (loading && !mediaData) {
    return <div className="h-96">Loading...</div>;
  }

  if (error) {
    return <div className="h-96">Error: {error.message}</div>;
  }

  const resourceType = getResourceType(resource);

  return (
    <ul ref={containerRef} className="my-10 flex overflow-x-scroll gap-5">
      {mediaData!.results.map((result) => (
        <Link key={result.id} to={`${resourceType}/${result.id}`}>
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

              <div className="h-10 w-20 absolute bg-black rounded-se-lg bottom-0 flex justify-evenly items-center">
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

export default MediaList;
