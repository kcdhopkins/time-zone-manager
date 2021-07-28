import React from 'react'
import { Box, Grid, Button } from "@material-ui/core"
import TimezoneFieldInput from './TimezoneFieldInput'
import TimezoneSelections from './TimezoneSelections'
import { Formik } from 'formik'
const moment = require('moment-timezone')

const TIMEZONES = {
    "PST":'America/Los_Angeles',
    "EST":'America/New_York',
    "MST":'America/Denver',
    "CST":'America/Chicago'
}

const ABBR = {
    "PST":'Pacific',
    "EST":'Eastern',
    "MST":'Mountain',
    "CST":'Central'
}

const InputField = ({setCustomTime}) => {
    const handleSubmit = (values, actions) => {
        const { timezonefrom, timezoneto, time} = values
        const space = " "
        const date = moment().format("MM/DD/YYYY")
        const dateTime = `${date} ${time}`
        const fromZone = timezonefrom.split(space)?.[0]
        const toZone = timezoneto.split(space)?.[0]
        const timeZoneKeys = Object.keys(TIMEZONES)
        const fromTimeZone = timeZoneKeys.filter( zone => fromZone === zone )?.[0]
        const toTimeZone = timeZoneKeys.filter( zone => toZone === zone )?.[0]

        const currentZone = moment(dateTime).tz(TIMEZONES[fromTimeZone])
        const convertZoneTime = currentZone.clone().tz(TIMEZONES[toTimeZone]).format("h:mm A");
        setCustomTime(
            {
                time: convertZoneTime, 
                zone:`${ABBR[fromTimeZone]} to ${ABBR[toTimeZone]}`, 
                color: "purple"
            }
        )
    }
    return (
        <Formik
            initialValues={
                { 
                    time: '07:00',
                    timezonefrom: '',
                    timezoneto:''
                }
            }
            onSubmit={(values, actions)=>handleSubmit(values, actions)}
        >
            {
                (props)=>{
                  
                    return (<form onSubmit={props.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} md={3}>
                                <TimezoneFieldInput values={props.values} onChange={props.handleChange}/>
                            </Grid>
                            <Grid item xs ={8} md={6}>
                                <TimezoneSelections values={props.values} onChange={props.handleChange}/>
                            </Grid>
                            <Grid item xs = {4} md={2}>
                                <Box mt={2}>
                                    <Button type="submit" style ={{height: "55px"}}variant="contained" color="primary" size="large">
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>)
                }
            }
        </Formik>
    )
}

export default InputField
