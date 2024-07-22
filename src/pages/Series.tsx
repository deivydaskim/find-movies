import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMediaDetails } from '../api/MoviesAPI';
import MediaDetails from '../components/MediaDetails';

const Series = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [mediaDetails, setMediaDetails] = useState<SeriesDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const mediaData: SeriesDetails = await getMediaDetails(`/tv/${id}`);
        setMediaDetails(mediaData);
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
    return <div className="h-96">Something went wrong... {error.message}</div>;
  }

  if (mediaDetails) {
    return <MediaDetails mediaDetails={mediaDetails} />;
  }
};

export default Series;
