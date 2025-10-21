import FlightSideBar from '@/modules/HomePage/components/FlightSideBar';
import { FilterAlt, Menu } from '@mui/icons-material';
import { Box, Drawer, IconButton, useMediaQuery } from '@mui/material';
import React from 'react';
import HeaderContent from './HeaderContent';

export default function FlightHeader() {
    const isMd = useMediaQuery('(min-width: 768px)');
    const [openMenu, setOpenMenu] = React.useState(false);
    const [openFilter, setOpenFilter] = React.useState(false);


    return (
        <Box sx={{
            borderBottom: 1,
            borderColor: 'grey.300',
            maxWidth: '100%',
            bgcolor: 'grey.50',
            px: 2,
            py: 1.5
        }}>
            {isMd ? <HeaderContent toggleDrawer={() => setOpenMenu((prev) => !prev)} />

                :
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton onClick={() => setOpenFilter(true)}>
                            <FilterAlt />
                        </IconButton>
                        <IconButton onClick={() => setOpenMenu(true)}>
                            <Menu />
                        </IconButton>
                    </Box>
                    <Drawer open={openFilter} onClose={() => setOpenFilter(false)} sx={{ maxHeight: '100vh' }}  >
                        <FlightSideBar />
                    </Drawer>
                    <Drawer open={openMenu} onClose={() => setOpenMenu(false)} sx={{ maxHeight: '100vh' }}  >
                        <HeaderContent toggleDrawer={() => setOpenMenu((prev) => !prev)} />
                    </Drawer>
                </>
            }
        </Box>
    );
}
