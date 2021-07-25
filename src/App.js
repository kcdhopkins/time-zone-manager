import { Box, Grid, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import './index.css'
import img from '../src/images/united-states-time-zone-map.gif'
const moment = require('moment-timezone')


function App() {
  const [time, setTime] = useState([])

  useEffect(()=>{
    const myTimer = setInterval(()=>{
      const PSTtime = moment().tz('America/Los_Angeles').format('h:mm A')
      const ESTtime = moment().tz('America/New_York').format('h:mm A')
      const MSTtime = moment().tz('America/Denver').format('h:mm A')
      const CSTtime = moment().tz('America/Chicago').format('h:mm A')
      setTime([{time: PSTtime, zone:"PST - Pacific", color: "blue"}, {time:ESTtime, zone: "EST - Eastern", color: "orange"}, {time:MSTtime, zone:"MST - Mountain", color: "green"}, {time:CSTtime, zone:"CST - Central", color:"black"}])
    }, 1000)

    return ()=>clearInterval(myTimer)
  }, [])

  return (
    <div style={{widht: "100%", height:"100%"}}>
      <Grid container justifyItems="center" alignItems="center">
        <Grid item xs={12} md={4}>
          {time.map( (timeObj, index) => {
            return (
              <Box key = {`time-${index}`} component="div" justifyItems="center" alignItems="center" borderRadius={16} border={1} display="flex" flexDirection="column" m={2} boxShadow={3}>
                <Typography variant="h4" style={{color:timeObj.color}}>
                  {timeObj.zone}
                </Typography>
                <Typography variant="h4" style={{color:timeObj.color}}>
                  {timeObj.time}
                </Typography>
              </Box>)
            })
          }
        </Grid>
        <Grid item xs={12} md={4}>
          <img src = {img} alt="timezone_map" style={{width: "100%"}}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;