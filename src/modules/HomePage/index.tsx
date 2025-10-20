import Sidebar from '@/modules/HomePage/components/FlightSideBar';
import { Box } from '@mui/material'
import { useState } from 'react';
import FlightBoard from './components/FlightBoard';

export interface FilterState {
  fareSource: {
    infini: boolean;
    ndc: boolean;
    lcc: boolean;
  };
  stops: {
    direct: boolean;
    oneStop: boolean;
    twoPlus: boolean;
  };
  airports: {
    hnd: boolean;
    sgn: boolean;
  };
  airlines: string[];
  cabins: {
    economy: boolean;
    business: boolean;
  };
  priceRange: [number, number];
}

const HomePage = () => {
  const [filters, setFilters] = useState<FilterState>({
    fareSource: {
      infini: true,
      ndc: true,
      lcc: false,
    },
    stops: {
      direct: false,
      oneStop: false,
      twoPlus: false,
    },
    airports: {
      hnd: false,
      sgn: false,
    },
    airlines: [],
    cabins: {
      economy: false,
      business: false,
    },
    priceRange: [25600, 1134370],
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      fareSource: {
        infini: true,
        ndc: true,
        lcc: false,
      },
      stops: {
        direct: false,
        oneStop: false,
        twoPlus: false,
      },
      airports: {
        hnd: false,
        sgn: false,
      },
      airlines: [],
      cabins: {
        economy: false,
        business: false,
      },
      priceRange: [25600, 1134370],
    });
  };
  return (
    <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.paper', overflow: 'hidden' }}>
      <Sidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
      <FlightBoard filters={filters} />
    </Box>
  )
}

export default HomePage