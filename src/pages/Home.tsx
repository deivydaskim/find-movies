import { useState } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const Home = () => {
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
              <h2>Movies list</h2>
            </div>
          )}
          {tabIndex === 1 && (
            <div className="">
              <h2>Series list</h2>
            </div>
          )}
        </div>
      </section>
      <section className="mt-14">
        <h1 className="headline-l text-yellow-350">Premiers and announcments</h1>
        <div>
          <h2>Premiers and announcments List</h2>
        </div>
      </section>
    </>
  );
};

export default Home;
