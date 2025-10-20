import { Box, Button, Typography } from '@mui/material';

export default function FlightHeader() {
    const tabs = [
        { name: 'Go to TOP screen', active: true },
        { name: 'PN search', active: false },
        { name: 'INFINI/NDC\nComparative search', active: false },
        { name: 'Money lending screen', active: false },
        { name: 'FOREST', active: false },
        { name: 'Mela truss', active: false }
    ];

    return (
        <Box sx={{
            borderBottom: 1,
            borderColor: 'grey.300',
            bgcolor: 'grey.50',
            px: 2,
            py: 1.5
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {tabs.map((tab, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            sx={{
                                bgcolor: tab.active ? 'success.main' : 'background.paper',
                                color: tab.active ? 'white' : 'text.primary',
                                border: 1,
                                borderColor: 'grey.400',
                                whiteSpace: 'pre-line',
                                textTransform: 'none',
                                minWidth: 80,
                                px: 2,
                                py: 1,
                                fontSize: '0.875rem',
                                '&:hover': {
                                    bgcolor: tab.active ? 'success.dark' : 'grey.100',
                                    borderColor: 'grey.400',
                                }
                            }}
                        >
                            {tab.name}
                        </Button>
                    ))}
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
        </Box>
    );
}
