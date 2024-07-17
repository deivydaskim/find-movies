import { useState, useEffect } from 'react';
import starIcon from '../assets/icons/star-icon.svg';
import { useParams } from 'react-router-dom';
import { getMediaDetails, getMediaCrew } from '../api/MoviesAPI';
import { formatDate, formatMinutes, getYear } from '../utils/utils';

const Movie = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [mediaDetails, setMediaDetails] = useState<MovieDetails | null>(null);
  const [mediaCredits, setMediaCredits] = useState<MovieCredits | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const mediaData = await getMediaDetails(`/movie/${id}`);
        setMediaDetails(() => mediaData);
        const crewData = await getMediaCrew(`/movie/${id}`);
        setMediaCredits(crewData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="h-96">Loading...</div>;
  }

  if (error) {
    return <div className="h-96">Error: {error.message}</div>;
  }

  if (mediaDetails) {
    const actors = mediaCredits?.cast.slice(0, 5);
    const directors = mediaCredits?.crew.filter(
      (crew) => crew.known_for_department == 'Directing'
    );

    return (
      <>
        <section className="flex flex-col md:flex-row gradient-gray md:py-10 py-4 mt-9 justify-between">
          <div className="space-y-2">
            <h3 className="body font-bold uppercase text-yellow-350">Movie</h3>
            <h1 className="headline-xl font-semibold">{mediaDetails.title}</h1>
            <p className="caption-2">
              {getYear(mediaDetails.release_date)} -
              {formatMinutes(mediaDetails.runtime)}
            </p>
          </div>
          <div className="flex gap-3 items-center flex-shrink-0 self-end">
            <div className="flex items-center">
              <img src={starIcon} className="w-10" />
              <p className="headline-l">
                {mediaDetails.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="caption !lowercase text-gray-300">
              {mediaDetails.vote_count}
              <br />
              ratings
            </p>
          </div>
        </section>
        <section className="my-12 flex md:flex-row flex-col gap-8">
          <div className="flex-shrink-0 self-center">
            <img
              src={`https://image.tmdb.org/t/p/w300/${mediaDetails.poster_path}`}
              alt={mediaDetails.title}
              className="rounded-xl w-72"
            />
          </div>
          <div className="space-y-6">
            <ul className="flex gap-3 body-2 text-gray-300 flex-wrap">
              {mediaDetails.genres.map((genre) => {
                return (
                  <li
                    key={genre.id}
                    className="py-1 px-4 border border-gray-500 rounded-full bg-gray-100/10"
                  >
                    {genre.name}
                  </li>
                );
              })}
            </ul>
            <p className="body">{mediaDetails.overview}</p>
            <div className="space-y-2 body-2">
              <p>
                <strong>Director:</strong> {directors && directors[0].name}
              </p>
              <p>
                <strong>Stars:</strong>
                {actors &&
                  actors.map((actor, index) => (
                    <span key={actor.id}>
                      {actor.name}
                      {index !== actors.length - 1 && ', '}
                    </span>
                  ))}
              </p>
              <p>
                <strong>Countries Of Origin:</strong>
                {mediaDetails.production_countries.map(
                  (country) => country.name
                )}
              </p>
              <p>
                <strong>Release Date:</strong>
                {formatDate(mediaDetails.release_date)}
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Movie;
