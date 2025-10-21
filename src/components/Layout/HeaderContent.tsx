import { HEADER_TABS } from '@/lib/constants';
import { ArrowUpward } from '@mui/icons-material';
import { Box, Button, Typography, useMediaQuery } from '@mui/material'

interface HeaderContentProps {
    toggleDrawer: () => void
}

const HeaderContent = ({ toggleDrawer }: HeaderContentProps) => {
    const isMd = useMediaQuery('(min-width: 768px)');

    return (
        <Box sx={{ display: 'flex', flexDirection: isMd ? 'row' : 'column', p: 1, height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: isMd ? 'row' : 'column', gap: 1 }}>
                {HEADER_TABS.map((tab, index) => {
                    return <Button
                        key={index}
                        variant="outlined"
                        endIcon={tab.active ? <ArrowUpward /> : null}
                        onClick={() => {
                            toggleDrawer()
                            if (tab.active) {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                })
                            }
                        }}
                        sx={{
                            bgcolor: tab.active ? 'success.main' : 'background.paper',
                            color: tab.active ? 'white' : 'text.primary',
                            border: 1,
                            borderColor: 'grey.400',
                            whiteSpace: 'pre-line',
                            textTransform: 'none',
                            minWidth: 80,
                            height: 50,
                            px: 2,
                            fontSize: '0.875rem',
                            '&:hover': {
                                bgcolor: tab.active ? 'success.dark' : 'grey.100',
                                borderColor: 'grey.400',
                            }
                        }}
                    >
                        {tab.name}
                    </Button>
                })}
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary" display="block">
                    Login/PCC: IFNxxxxxx/LFQE
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    Version: x.x.x
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    Last login: July 23, 2025
                </Typography>
            </Box>
        </Box>
    )
}

export default HeaderContent