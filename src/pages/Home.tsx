import FeaturedTabs from '../components/FeaturedTabs';
import MediaList from '../components/MediaList';

const Home: React.FC = () => {
  return (
    <>
      <section className="mt-14">
        <h1 className="headline-l text-yellow-350">Featured Today</h1>
        <div>
          <FeaturedTabs />
        </div>
      </section>
      <section className="mt-14">
        <h1 className="headline-l text-yellow-350">
          Premiers and announcments
        </h1>
        <div>
          <MediaList resource="movie/upcoming" />
        </div>
      </section>
    </>
  );
};

export default Home;
