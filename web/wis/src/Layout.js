import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';

import styles from './Layout.module.css';
import R1 from './pages/routing1';
import R2 from './pages/routing2';
import R3 from './pages/routing3';
import R4 from './pages/routing4';
import aplogo from './data/aplogo.png';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(3);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' ,display: 'flex'}}>
        <img src={aplogo} alt="  "/>
        <Tabs sx={{ width: '750px'}} value={value} onChange={handleChange} aria-label="basic tabs example ">
          <Tab label="진료 희망자" {...a11yProps(0)} />
          <Tab label="진료 신청" {...a11yProps(1)} />
          <Tab label="조치 내역" {...a11yProps(2)} />
          <Tab label="추적 관리" {...a11yProps(3)} />
        </Tabs>
        <div className={styles.wfill} />
        <Link to="/">로그아웃</Link>
      </Box>
      <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={value}
      onChangeIndex={handleChangeIndex}
      >
      <TabPanel value={value} index={0}>
        <R1 />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <R2 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <R3 />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <R4 />
      </TabPanel>
      </SwipeableViews>
    </Box>
  );
}