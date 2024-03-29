import React from 'react'
import { Box, FormControl, Grid, InputLabel, Select } from "@material-ui/core"
import { TIMEZONES, ZONETITLES } from './enums/timezones'

const TimezoneSelections = ({values, onChange}) => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Box mt={2} mr={1} ml={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-age-native-simple">Time Zone From</InputLabel>
                        <Select
                            native
                            name="timezonefrom"
                            onChange={(e)=>onChange(e)}
                            label="timezonefrom"
                            inputProps={{
                                name: 'timezonefrom',
                                id: 'timezonefrom',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value={TIMEZONES.PST}>{ZONETITLES.PST}</option>
                            <option value={TIMEZONES.EST}>{ZONETITLES.EST}</option>
                            <option value={TIMEZONES.MST}>{ZONETITLES.MST}</option>
                            <option value={TIMEZONES.CST}>{ZONETITLES.CST}</option>
                            <option value={TIMEZONES.UTC}>{ZONETITLES.UTC}</option>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box mt={2} mr={1} ml={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-age-native-simple">Time Zone To</InputLabel>
                        <Select
                            native
                            value={values.timezoneto}
                            onChange={(e)=>onChange(e)}
                            label="timezoneto"
                            inputProps={{
                                name: 'timezoneto',
                                id: 'timezoneto',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value={TIMEZONES.PST}>{ZONETITLES.PST}</option>
                            <option value={TIMEZONES.EST}>{ZONETITLES.EST}</option>
                            <option value={TIMEZONES.MST}>{ZONETITLES.MST}</option>
                            <option value={TIMEZONES.CST}>{ZONETITLES.CST}</option>
                            <option value={TIMEZONES.UTC}>{ZONETITLES.UTC}</option>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        </Grid>
    )
}

export default TimezoneSelections
