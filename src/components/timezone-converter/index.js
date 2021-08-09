import React from 'react'
import { Box, Grid, Button } from "@material-ui/core"
import TimezoneFieldInput from './TimezoneFieldInput'
import TimezoneSelections from './TimezoneSelections'
import { Formik } from 'formik'
import spacetime from 'spacetime'
const moment = require('moment-timezone')

const TIMEZONES = {
    "PST":'America/Los_Angeles',
    "EST":'America/New_York',
    "MST":'America/Denver',
    "CST":'America/Chicago',
    "UTC": "UTC"
}

const ABBR = {
    "America/Los_Angeles":'Pacific',
    "America/New_York":'Eastern',
    "America/Denver":'Mountain',
    "America/Chicago":'Central',
    "UTC": "Universal"
}

const InputField = ({setCustomTime}) => {
    const handleSubmit = (values, actions) => {
        const { timezonefrom, timezoneto, time} = values
        const space = " "
        const date = moment().format("MM/DD/YYYY")
        const fromZone = timezonefrom.split(space)?.[0]
        const toZone = timezoneto.split(space)?.[0]
        let fromTimeZone
        let toTimeZone
        
        const currentInputZoneDate = spacetime(date, fromZone)
        const currentInputZoneDateTime = currentInputZoneDate.time(time)
        const convertedTime = currentInputZoneDateTime.goto(toZone).time()
    
        for(const key in TIMEZONES){
            if(TIMEZONES[key] === fromZone){
                fromTimeZone = TIMEZONES[key]
            }
            if(TIMEZONES[key] === toZone){
                toTimeZone = TIMEZONES[key]
            }
        }
        
        setCustomTime(
            {
                time: convertedTime, 
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
