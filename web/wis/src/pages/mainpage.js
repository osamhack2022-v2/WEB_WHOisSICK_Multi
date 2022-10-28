import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

//import R1 from './routing1';
import R1 from './routing1';
import R2 from './routing2';
import R3 from './routing3';
import R4 from './routing4';
import Logo from '../data/logo.png';
import { Grid, Button} from '@mui/material';

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
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' ,display: 'flex'}}>
        <img className="image" src={Logo} alt="로고"/>
        <Grid item xs>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example " variant='fullWidth' >
          <Tab label="진료 희망자" {...a11yProps(0)} />
          <Tab label="진료 신청" {...a11yProps(1)} />
          <Tab label="조치 내역" {...a11yProps(2)} />
          <Tab label="추적 관리" {...a11yProps(3)} />
        </Tabs>
        </Grid>
        <Grid
         item
         sx={{
          display: 'flex',
          alignItems: 'center',
         }}>
        <Button onClick={() => navigate("/")} variant="outlined">로그아웃</Button>
        </Grid>
      </Box>
      <TabPanel key={0} value={value} index={0}>
        <R1 />
      </TabPanel>
      <TabPanel key={1} value={value} index={1}>
        <R2 />
      </TabPanel>
      <TabPanel key={2} value={value} index={2}>
        <R3 />
      </TabPanel>
      <TabPanel key={3} value={value} index={3}>
        <R4 />
      </TabPanel>
    </Box>
    </React.Fragment>
  );
}