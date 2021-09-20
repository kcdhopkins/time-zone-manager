import React from 'react'
import { Box, TextField, Grid } from "@material-ui/core"

const TimezoneFieldInput = ({values, onChange}) => {
    return (
        <Grid>
            <Grid item xs ={12}>
                <Box ml={2} mt={3} mr={1}>
                    <TextField
                        id="time"
                        fullWidth
                        name="time"
                        label="Select a Time"
                        type="time"
                        defaultValue={values.time}
                        step="any"
                        onChange={(e)=>onChange(e)}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default TimezoneFieldInput
