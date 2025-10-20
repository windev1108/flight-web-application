import { Box, Typography } from "@mui/material"
import FlightIcon from '@mui/icons-material/Flight';
import NotFoundImage from '@/assets/images/not-found.png';

const FlightNotFound = () => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ fontSize: 32, fontWeight: 400 }}>Flight not found</Typography>
                <FlightIcon sx={{ rotate: '60deg' }} />
            </Box>
            <Box component={'img'}
                sx={{
                    marginY: 2,
                    marginRight: 2,
                    maxHeight: '60px',
                    objectFit: 'contain'
                }}
                src={NotFoundImage}
                alt='Page not found'
            />
        </Box>
    )
}

export default FlightNotFound