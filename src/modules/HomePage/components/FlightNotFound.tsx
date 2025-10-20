import { Box, Typography } from "@mui/material"
import FlightIcon from '@mui/icons-material/Flight';

const FlightNotFound = () => {
    return (
        <Box sx={{ display: 'flex', }}>
            <Typography sx={{ fontSize: 24, fontWeight: 400 }}>Flight not found</Typography>
            <FlightIcon sx={{ rotate: '60deg' }} />
        </Box>
    )
}

export default FlightNotFound