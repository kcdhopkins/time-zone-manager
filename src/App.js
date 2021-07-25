import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import img from '../src/images/united-states-time-zone-map.gif'
const moment = require('moment-timezone')


function App() {
  const [time, setTime] = useState([])

  useEffect(()=>{
    setInterval(()=>{
      const PSTtime = moment().tz('America/Los_Angeles').format('h:mm A')
      const ESTtime = moment().tz('America/New_York').format('h:mm A')
      const MSTtime = moment().tz('America/Denver').format('h:mm A')
      const CSTtime = moment().tz('America/New_Orleans').format('h:mm A')
      setTime([{time: PSTtime, zone:"PST", color: "blue"}, {time:ESTtime, zone: "EST", color: "orange"}, {time:MSTtime, zone:"MST", color: "green"}, {time:CSTtime, zone:"CST", color:"black"}])
    }, 1000)
  }, [])

  return (
    <Grid container>
      <Grid item xs={2}>
        {time.map( (timeObj, index) => {
          return (
            <Box key = {`time-${index}`} component="div" justifyItems="center" alignItems="center" borderRadius={16} border={1} display="flex" flexDirection="column" m={2} boxShadow={3}>
              <Typography variant="h3" style={{color:timeObj.color}}>
                {timeObj.zone}
              </Typography>
              <Typography variant="h3" style={{color:timeObj.color}}>
                {timeObj.time}
              </Typography>
            </Box>)
          })
        }
      </Grid>
      <Grid item xs={8}>
        <img src = {img} alt="timezone_map"/>
      </Grid>
    </Grid>
  );
}

export default App;