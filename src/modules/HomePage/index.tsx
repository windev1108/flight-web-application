import Sidebar from '@/modules/HomePage/components/FlightSideBar';
import { Box } from '@mui/material'
import FlightBoard from './components/FlightBoard';
import useMediaQuery from '@mui/material/useMediaQuery';


const HomePage = () => {
  const isMd = useMediaQuery('(min-width: 768px)');

  return (
    <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.paper' }}>
      {isMd &&
        <Sidebar />
      }
      <FlightBoard />
    </Box>
  )
}

export default HomePage