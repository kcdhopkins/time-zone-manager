import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import "./index.css";
import img from "../src/images/united-states-time-zone-map.gif";
import TimeZoneManager from "./components/timezone-converter/";
import { TIMEZONES, ZONETITLES } from './components/timezone-converter/enums/timezones'
import _ from "lodash";
const moment = require("moment-timezone");

const useStyles = makeStyles((theme) => ({
  timeform: {
    width: "40vw",
  },
}));

function App() {
  const [time, setTime] = useState([]);
  const [customTime, setCustomTime] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const myTimer = setInterval(() => {
      const PSTtime = moment().tz(TIMEZONES.PST).format("h:mm A");
      const ESTtime = moment().tz(TIMEZONES.EST).format("h:mm A");
      const MSTtime = moment().tz(TIMEZONES.MST).format("h:mm A");
      const CSTtime = moment().tz(TIMEZONES.CST).format("h:mm A");
      const UTCtime = moment.utc(moment()).format("h:mm A");

      if (_.isEmpty(customTime)) {
        setTime([
          { time: PSTtime, zone: ZONETITLES.PST, color: "blue" },
          { time: ESTtime, zone: ZONETITLES.EST, color: "orange" },
          { time: MSTtime, zone: ZONETITLES.MST, color: "green" },
          { time: CSTtime, zone: ZONETITLES.CST, color: "black" },
          { time: UTCtime, zone: ZONETITLES.UTC, color: "brown" },
        ]);
      } else {
        setTime([
          customTime,
          { time: PSTtime, zone: ZONETITLES.PST, color: "blue" },
          { time: ESTtime, zone: ZONETITLES.EST, color: "orange" },
          { time: MSTtime, zone: ZONETITLES.MST, color: "green" },
          { time: CSTtime, zone: ZONETITLES.CST, color: "black" },
          { time: UTCtime, zone: ZONETITLES.UTC, color: "brown" },
        ]);
      }
    }, 1000);
    return () => clearInterval(myTimer);
  });

  return (
    <div style={{ widht: "100%", height: "100%" }}>
      <Grid container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TimeZoneManager
              classes={classes}
              customTime={customTime}
              setCustomTime={setCustomTime}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          {time.map((timeObj, index) => {
            return (
              <Box
                key={`time-${index}`}
                component='div'
                justifyItems='center'
                alignItems='center'
                borderRadius={16}
                border={1}
                display='flex'
                flexDirection='column'
                m={2}
                boxShadow={3}>
                <Typography variant='h4' style={{ color: timeObj.color }}>
                  {timeObj.zone}
                </Typography>
                <Typography variant='h4' style={{ color: timeObj.color }}>
                  {timeObj.time}
                </Typography>
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={img} alt='timezone_map' style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
