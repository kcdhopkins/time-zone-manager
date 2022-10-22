import React from 'react'
import { Box, Grid, Button } from "@material-ui/core"
import TimezoneFieldInput from './TimezoneFieldInput'
import TimezoneSelections from './TimezoneSelections'
import { Formik } from 'formik'
import spacetime from 'spacetime'
import { TIMEZONES, ABBR } from './enums/timezones'
import TimezoneSchema from './validationsSchema/timezoneSchema'

const moment = require('moment-timezone')

const InputField = ({setCustomTime}) => {
    const handleSubmit = (values, actions) => {
        const { timezonefrom, timezoneto, time} = values
        const date = moment().format("MM/DD/YYYY")
        let fromTimeZone
        let toTimeZone
        
        const currentInputZoneDate = spacetime(date, timezonefrom)
        const currentInputZoneDateTime = currentInputZoneDate.time(time)
        const convertedTime = currentInputZoneDateTime.goto(timezoneto).time()

        for(const key in TIMEZONES){
            if(TIMEZONES[key] === timezonefrom){
                fromTimeZone = TIMEZONES[key]
            }
            
            if(TIMEZONES[key] === timezoneto){
                toTimeZone = TIMEZONES[key]
            }
        }
        
        setCustomTime(
            {
                time: convertedTime, 
                zone:`${ABBR[fromTimeZone]} to ${ABBR[toTimeZone]}`, 
                color: "#aaaaaa"
            }
        )
    }
    return (
        //@TODO valildators aren't working as expected
        <Formik
            initialValues={
                { 
                    time: '07:00',
                    timezonefrom: '',
                    timezoneto:''
                }
            }
            validationSchema={TimezoneSchema}
            onSubmit={(values, actions)=>handleSubmit(values, actions)}
        >
            {
                (props, errors, touched) =>{
                  
                    return (<form onSubmit={props.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} md={3}>
                                <TimezoneFieldInput values={props.values} onChange={props.handleChange}/>
                            </Grid>
                            <Grid item xs ={8} md={6}>
                                <TimezoneSelections values={props.values} onChange={props.handleChange} validators={{errors, touched}}/>
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
