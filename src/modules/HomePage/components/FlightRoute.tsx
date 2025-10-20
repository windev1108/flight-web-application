import { Box } from '@mui/material'

interface FlightRouteProps {
    duration: string;
    stops: number

}

const FlightRoute = ({ duration, stops }: FlightRouteProps) => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            minWidth: 400
        }}>
            <Box
                component="svg"
                width="200"
                height="20"
                viewBox="0 0 200 20"
                sx={{ flexShrink: 0 }}
            >
                {/* Line*/}
                <line
                    x1="0"
                    y1="10"
                    x2="195"
                    y2="10"
                    stroke="#999"
                    strokeWidth="1"
                />

                {/* arrow */}
                <polygon
                    points="195,8 200,10 195,12"
                    fill="#000"
                />

                {/* Text “Direct” */}
                <text
                    x="100"
                    y="6"
                    textAnchor="middle"
                    fontSize="6"
                    fontWeight="600"
                    fill="#666"
                    style={{ marginBottom: 2 }}
                >
                    {stops !== undefined ? (stops === 0 ? 'Direct' : `${stops === 1 ? '1 stop' : `${stops} stops`}`) : 'Direct'}
                </text>
                <text
                    x="100"
                    y="20"
                    textAnchor="middle"
                    fontSize="6"
                    fontWeight="600"
                    fill="#666"
                    style={{ marginBottom: 2 }}
                >
                    {duration}
                </text>
            </Box>
        </Box>
    )
}

export default FlightRoute