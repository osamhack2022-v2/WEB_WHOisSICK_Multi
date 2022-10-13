import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import memb from '../../data/test.json';
import styles from './vtab.module.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  //memb.member[0].name="변경된 서한유";
  const [value, setValue] = React.useState(0);

  function mapFuncion(data, indexs) {
    return (
      <TabPanel value={value} index={indexs}>
      {data.Classes+" "+data.name}
       <br/>
       {data.inter}
       <br/>
       {data.ok&&<div className={styles.okk}>승인</div>}
       {!data.ok&&<div className={styles.nok}>거부</div>}
      </TabPanel>
    );
  }
  function maptab(data, indexs) {
    return (
      <Tab label={data.Classes+" "+data.name} {...a11yProps(indexs)} />
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 , width:"100%"}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {memb.member.map(maptab)}
  
        {/*<Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />*/}

      </Tabs>

      {memb.member.map(mapFuncion)}
        
  </Box>
  );
}