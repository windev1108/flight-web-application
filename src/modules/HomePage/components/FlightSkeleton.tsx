import { Box, Grid2 as Grid, Skeleton, Stack } from '@mui/material'

const FlightSkeleton = () => {
  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Grid container spacing={2}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Grid key={index} size={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton sx={{ width: '200px' }} />
            <Skeleton sx={{ width: '150px' }} />
            <Skeleton variant="rectangular" height={160} sx={{ mt: 1, borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>

      <Stack>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={200} sx={{ mt: 1, borderRadius: 2 }} />
        ))}
      </Stack>
    </Box>
  )
}

export default FlightSkeleton