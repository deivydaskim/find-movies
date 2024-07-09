import { useState } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MediaList from '../components/MediaList';

const Home: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <section className="mt-14">
        <h1 className="headline-l text-yellow-350">Featured Today</h1>
        <div>
          <div className="border-b border-gray-600">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              textColor="inherit"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'white',
                  padding: '2px',
                  borderRadius: '10px',
                },
              }}
            >
              <Tab
                label="Movies"
                disableRipple
                sx={{ textTransform: 'none' }}
                className="!body"
              />
              <Tab
                label="Series"
                disableRipple
                sx={{ textTransform: 'none' }}
                className="!body"
              />
            </Tabs>
          </div>
          {tabIndex === 0 && (
            <div className="">
              <MediaList resource="movie/now_playing" />
            </div>
          )}
          {tabIndex === 1 && (
            <div className="">
              <MediaList resource="tv/airing_today" />
            </div>
          )}
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
