import { Box, Typography, Chip } from '@mui/material';
import { FlightCard, type FlightData } from "./FlightCard";
import type { FilterState } from '..';
import mockData from '@/data/mock.json';
import { useDeferredValue, useEffect, useState } from 'react';
import FlightNotFound from './FlightNotFound';
import FlightSkeleton from './FlightSkeleton';

interface FlightResultsProps {
    filters: FilterState;
}

export default function FlightBoard({ filters }: FlightResultsProps) {
    const [allFlights, setFlights] = useState<FlightData[]>([]);
    const [loading, setLoading] = useState(true);
    const deferredFilters = useDeferredValue(filters);


    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setFlights(mockData as FlightData[]);
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Apply filters
    const filteredFlights = allFlights?.filter((flight) => {
        const hasMatchingSource = flight.segments.some((segment) => {
            if (segment.source === 'NDC' && filters.fareSource.ndc) return true;
            if (segment.source === 'INFINI' && filters.fareSource.infini) return true;
            return false;
        });
        if (!hasMatchingSource && (deferredFilters.fareSource.ndc || deferredFilters.fareSource.infini)) return false;

        if (deferredFilters.stops.direct || deferredFilters.stops.oneStop || deferredFilters.stops.twoPlus) {
            const hasMatchingStops = flight.segments.some((segment) => {
                const stops = segment.stops || 0;
                if (stops === 0 && deferredFilters.stops.direct) return true;
                if (stops === 1 && deferredFilters.stops.oneStop) return true;
                if (stops >= 2 && deferredFilters.stops.twoPlus) return true;
                return false;
            });
            if (!hasMatchingStops) return false;
        }

        if (flight.totalPrice && (flight.totalPrice < deferredFilters.priceRange[0] || flight.totalPrice > deferredFilters.priceRange[1])) {
            return false;
        }
        return true;
    });

    const filteredNormalFlights = filteredFlights.slice(0, 1);
    const filteredSeparateFlights = filteredFlights.slice(1);

    // Render logic
    if (loading) {
        return <FlightSkeleton />
    }

    if (!loading && filteredFlights.length === 0) {
        return <FlightNotFound />
    }

    return (
        <>
            <Box sx={{ flex: 1, bgcolor: 'grey.50', display: 'flex', flexDirection: 'column', overflowY: 'auto', height: '90vh' }}>
                {filteredSeparateFlights?.length > 0 && (
                    <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'grey.300', p: 2 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                            {/* Regular search summary */}
                            <Box>
                                <Typography variant="body2" mb={1}>Selected itinerary by regular search</Typography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1.5 }}>
                                    <Chip label="NDC" color="primary" size="small" />
                                    <Typography variant="body2" fontWeight={600}>
                                        {`JPY ${filteredNormalFlights.reduce((min, c) => c.totalPrice! < min.totalPrice! ? c : min).totalPrice?.toLocaleString('en-US')}`}
                                    </Typography>
                                </Box>
                                <FlightCard flight={{ ...filteredNormalFlights[0], isCompact: true }} />
                            </Box>

                            {/* Separate search summary */}
                            <Box>
                                <Typography variant="body2" mb={1}>Selected itinerary by separate return search</Typography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1.5 }}>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <Chip label="NDC" color="primary" size="small" />
                                        <Chip label="INFINI" color="default" size="small" />
                                    </Box>
                                    <Typography variant="body2" fontWeight={600}>
                                        {`JPY ${filteredSeparateFlights.reduce((min, c) => c.totalPrice! < min.totalPrice! ? c : min).totalPrice?.toLocaleString('en-US')}`}
                                    </Typography>
                                </Box>
                                <FlightCard flight={{ ...filteredSeparateFlights[0], isCompact: true }} />
                            </Box>
                        </Box>
                    </Box>
                )}

                {/* Detailed results */}
                <Box sx={{ p: 2, flex: 1 }}>
                    {filteredNormalFlights.map((flight) => (
                        <FlightCard
                            key={flight.id}
                            flight={{
                                ...flight,
                                showSelectable: true,
                                flightRoute: 'SIN-KUL',
                                fareCode: 'NH887-SQ/NH6260',
                                bookingDetails: 'Change: Changeable　Refund: Hoàn tiền　Validity period: October 21 23:59\ndeparture: SIN November 18 10:45 TERMINAL 3 arrival: HND November 18 18:25 TERMINAL 2\nFreeketen: 1h30p　Remaining seats: 9+\nEasy to use: NH887　Class: N　Mall: No data　Cabin: エコノミー\nEquipment: BOEING 787-8　Operation career: All Nippon Airways　Number of miles: 1000\nFareBasis: QQS/PQ8　Class: N　Checked baggage/number of pieces: 2 (23KG)　Carry-on baggage/weight: 2\n\nDeparture: HND November 6th 00:25 TERMINAL 2 Arrival: SIN November 7 06:55 TERMINAL 1\nFreeketen: 1h30p Remaining seats: 9+\nEasy to use: SQ/NH6260　Class: N　Mall: No data　Cabin: Economy\nEquipment: BOEING 787-9　Operating career: Singapore Airlines　Number of miles: 1000\nFareBasis: QQS/PQ8　Checked baggage/number of pieces: 2 (23KG)　Carry-on baggage/weight: 2'
                            }}
                        />
                    ))}

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" sx={{ mb: 2, px: 1 }}>
                            Other options
                        </Typography>
                        {filteredSeparateFlights.map((flight) => (
                            <FlightCard key={flight.id} flight={{ ...flight, showSelectable: true }} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
