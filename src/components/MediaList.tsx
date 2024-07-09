import { useEffect, useState } from 'react';
import { getMedia } from '../api/MoviesAPI';

import star from '../assets/icons/star-icon.svg';

import { FeaturedResult, Movie, TV } from '../types/types';

const MediaList: React.FC<{ resource: string }> = ({ resource }) => {
  const [mediaData, setMediaData] = useState<
    FeaturedResult<Movie> | FeaturedResult<TV> | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: FeaturedResult<Movie> = await getMedia(page, resource);
        setMediaData(data);
      } catch (error) {
        const errorMessage = (error as Error).message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, resource]);

  if (loading || error) {
    return <div className="h-56">...</div>;
  }

  if (mediaData) {
    return (
      <ul className="my-10 flex gap-8 overflow-x-auto">
        {mediaData.results.map((result) => {
          return (
            <li key={result.id}>
              <div className="relative mb-3 w-[185px]">
                <img
                  className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/w185/${result.poster_path}`}
                  alt=""
                />
                <div className="h-10 w-20 absolute bg-black rounded-se-lg bottom-0 flex justify-evenly items-center">
                  <img className="w-6" src={star} alt="" />
                  <p>{result.vote_average.toFixed(1)}</p>
                </div>
              </div>
              <h3 className="body-2 text-center">
                {'title' in result
                  ? (result as Movie).title
                  : (result as TV).name}
              </h3>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default MediaList;
