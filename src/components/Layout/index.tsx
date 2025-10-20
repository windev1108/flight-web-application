import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom';
import Header from './Header'


const Layout = () => {
    return (
        <Stack sx={{ overflow: 'hidden' }}>
            <Header />
            <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
                <Outlet />
            </main>
        </Stack>
    )
}

export default Layout