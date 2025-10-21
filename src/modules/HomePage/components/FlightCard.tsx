import { useState } from 'react';
import { Box, Typography, Button, Chip, Checkbox } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import FlightRoute from './FlightRoute';

interface FlightSegment {
    flightNumber: string;
    airline: string;
    from: string;
    to: string;
    departDate: string;
    departTime: string;
    arriveDate?: string;
    arriveTime: string;
    duration?: string;
    stops?: number;
    baggage?: string;
    aircraft?: string;
    source: 'NDC' | 'INFINI';
    fareClasses?: Array<{
        name: string;
        price: number;
        locked?: boolean;
    }>;
}

export interface FlightData {
    id: number;
    segments: FlightSegment[];
    totalPrice?: number;
    flightRoute?: string;
    fareCode?: string;
    bookingDetails?: string;
    isCompact?: boolean;
    showSelectable?: boolean;
}

interface FlightCardProps {
    flight: FlightData;
}

interface SelectedFare {
    segmentIndex: number;
    fareIndex: number;
}

export function FlightCard({ flight }: FlightCardProps) {
    const { segments, isCompact, showSelectable, flightRoute, fareCode, bookingDetails } = flight;
    const [selectedFares, setSelectedFares] = useState<SelectedFare[]>([]);

    const handleFareSelect = (segmentIndex: number, fareIndex: number) => {
        setSelectedFares(prev => {
            // Check if this fare is already selected
            const existingIndex = prev.findIndex(
                sf => sf.segmentIndex === segmentIndex && sf.fareIndex === fareIndex
            );

            if (existingIndex >= 0) {
                // Unselect if already selected
                return prev.filter((_, index) => index !== existingIndex);
            } else {
                // Select this fare (replace any other fare from the same segment)
                const filtered = prev.filter(sf => sf.segmentIndex !== segmentIndex);
                return [...filtered, { segmentIndex, fareIndex }];
            }
        });
    };

    const isFareSelected = (segmentIndex: number, fareIndex: number) => {
        return selectedFares.some(
            sf => sf.segmentIndex === segmentIndex && sf.fareIndex === fareIndex
        );
    };

    // Compact view - for top summary cards
    if (isCompact) {
        return (
            <Box sx={{ border: 1, borderColor: 'grey.300', bgcolor: 'background.paper', p: 1.5 }}>
                {segments?.map((segment, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: index < segments?.length - 1 ? 1 : 0 }}>
                        <Box sx={{ minWidth: 70 }}>
                            <Typography variant="body2">{segment.flightNumber}</Typography>
                            <Typography variant="caption" color="text.secondary">{segment.airline.substring(0, 10)}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', minWidth: 45 }}>
                            <Typography variant="body2">{segment.from}</Typography>
                            <Typography variant="caption" color="text.secondary">{segment.departDate}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {segment.departTime}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, maxWidth: 400 }}>
                            <FlightRoute duration={segment.duration!} stops={segment.stops! ?? 0} />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', minWidth: 45 }}>
                            <Typography variant="body2">{segment.to}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {segment.arriveDate || segment.departDate}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {segment.arriveTime}
                            </Typography>
                        </Box>



                        <Typography variant="caption" color="text.secondary">
                            BAG : {segment.baggage || '23KG'}
                        </Typography>
                    </Box>
                ))
                }
            </Box >
        );
    }

    // Detailed selectable view
    return (
        <Box sx={{ border: 1, borderColor: 'grey.300', mb: 2, bgcolor: 'background.paper', overflowX: 'auto' }}>
            {/* Flight segments with price options */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ borderBottom: showSelectable ? 1 : 0, borderColor: 'grey.200', flex: 1 }}>
                    {segments.map((segment, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'stretch',
                                borderBottom: index < segments.length - 1 ? 1 : 0,
                                borderColor: 'grey.200',
                                minHeight: 80
                            }}
                        >

                            {/* Flight info section */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 1.5,
                                flex: 1,
                                px: 2,
                                py: 1.5,
                                minWidth: 500
                            }}>
                                <Box>
                                    <Checkbox />
                                </Box>
                                <Box sx={{ minWidth: 80 }}>
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                        {segment.flightNumber}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        {segment.airline}
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                                    <Typography variant="body2">{segment.from}</Typography>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        {segment.departDate}
                                    </Typography>
                                    <Typography variant="caption">{segment.departTime}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, maxWidth: 400 }}>
                                    <FlightRoute duration={segment.duration!} stops={segment.stops! ?? 0} />
                                </Box>

                                <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                                    <Typography variant="body2">{segment.to}</Typography>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        {segment.arriveDate || segment.departDate}
                                    </Typography>
                                    <Typography variant="caption">{segment.arriveTime}</Typography>
                                </Box>

                                <Box sx={{ minWidth: 70 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {segment.aircraft || '787-8'}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        {segment.duration || '6h40m'}
                                    </Typography>
                                </Box>
                            </Box>


                            {/* If not selectable, just show source badge */}
                            {!showSelectable && (
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: 2,
                                    minWidth: 100
                                }}>
                                    <Chip
                                        label={segment.source}
                                        size="small"
                                        color={segment.source === 'NDC' ? 'primary' : 'default'}
                                    />
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
                {/* Fare options section - only show if selectable */}
                {showSelectable && segments[0].fareClasses && segments[0].fareClasses.length > 0 && (
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        borderLeft: 1,
                        borderColor: 'grey.200',
                        overflowX: 'auto'
                    }}>
                        {segments[0].fareClasses.map((fare, fareIndex) => {
                            const isSelected = isFareSelected(0, fareIndex);
                            return (
                                <Button
                                    key={fareIndex}
                                    variant={isSelected ? "outlined" : "text"}
                                    onClick={() => handleFareSelect(0, fareIndex)}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        px: 2,
                                        py: 1.5,
                                        minWidth: 140,
                                    }}
                                >
                                    {/* Lock icon at top-right when selected */}
                                    {isSelected && (
                                        <LockIcon
                                            sx={{
                                                position: 'absolute',
                                                top: 4,
                                                right: 4,
                                                fontSize: 16,
                                                color: 'primary.main'
                                            }}
                                        />
                                    )}

                                    <Chip
                                        label={segments[0].source}
                                        size="small"
                                        color={segments[0].source === 'NDC' ? 'primary' : 'success'}
                                        sx={{ mb: 0.5, height: 20, fontSize: '0.7rem' }}
                                    />
                                    {/* {fare.locked && !isSelected && (
                                                <LockIcon sx={{ fontSize: 14, color: 'grey.500', mb: 0.5 }} />
                                            )} */}
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, textAlign: 'center', lineHeight: 1.2 }}>
                                        {fare.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        JPY {fare.price.toLocaleString()}
                                    </Typography>
                                </Button>
                            );
                        })}
                    </Box>
                )}

            </Box>

            {/* Flight route and codes - only for selectable */}
            {showSelectable && (flightRoute || fareCode) && (
                <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'grey.200', bgcolor: 'grey.50' }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                        {flightRoute && <Typography variant="body2">{flightRoute}</Typography>}
                        {fareCode && fareCode.split('-').map((code, index) => (
                            <Chip key={index} label={code} size="small" variant="outlined" sx={{ height: 22 }} />
                        ))}
                    </Box>
                </Box>
            )}

            {/* Booking details - only for selectable */}
            {showSelectable && bookingDetails && (
                <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'grey.200' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                        {bookingDetails}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
