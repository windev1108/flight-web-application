import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Slider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { FilterSource } from '@/types/common';
import { useFilterStore } from '@/store/FilterStore';


export default function FlightSideBar() {
  const { filters, setFilter: onFilterChange, resetFilter: onReset } = useFilterStore()
  const handleFareSourceChange = (key: keyof FilterSource['fareSource']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      fareSource: {
        ...filters.fareSource,
        [key]: event.target.checked,
      }
    });
  };

  const handleStopsChange = (key: keyof FilterSource['stops']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      stops: {
        ...filters.stops,
        [key]: event.target.checked,
      }
    });
  };

  const handleAirportsChange = (key: keyof FilterSource['airports']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      airports: {
        ...filters.airports,
        [key]: event.target.checked,
      }
    });
  };

  const handleCabinChange = (key: keyof FilterSource['cabins']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      cabins: {
        ...filters.cabins,
        [key]: event.target.checked,
      }
    });
  };

  const handlePriceChange = (newValue: number | number[]) => {
    onFilterChange({
      priceRange: newValue as [number, number],
    });
  };

  return (
    <Box sx={{
      maxWidth: 300,
      width: {
        xs: '100%',
        md: '300px',
        lg: '300px'
      },
      borderRight: 1,
      borderColor: 'grey.300',
      bgcolor: 'background.paper',
      p: 2,
      overflowY: 'auto',
      height: '100vh',
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflowX: 'hidden', mb: 2, pb: 1, borderBottom: 1, borderColor: 'grey.300' }}>
        <Typography variant="body2">Refinement conditions</Typography>
        <Button size="small" sx={{ textTransform: 'none', textDecoration: 'underline', minWidth: 'auto' }} onClick={onReset}>
          Reset
        </Button>
      </Box>

      {/*Source */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
          <Typography variant="body2">Source</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ml: 2 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.fareSource.infini} onChange={handleFareSourceChange('infini')} />}
              label={<Typography variant="body2">INFINI</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.fareSource.ndc} onChange={handleFareSourceChange('ndc')} />}
              label={<Typography variant="body2">NDC</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.fareSource.lcc} onChange={handleFareSourceChange('lcc')} />}
              label={<Typography variant="body2">LCC</Typography>}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Number of transit times */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
          <Typography variant="body2">Number of transit times</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ml: 2 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.stops.direct} onChange={handleStopsChange('direct')} />}
              label={<Typography variant="body2">Direct</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.stops.oneStop} onChange={handleStopsChange('oneStop')} />}
              label={<Typography variant="body2">1 time</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.stops.twoPlus} onChange={handleStopsChange('twoPlus')} />}
              label={<Typography variant="body2">2 time</Typography>}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Time to wait */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
          <Typography variant="body2">Transit point</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ml: 2 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.airports.hnd} onChange={handleAirportsChange('hnd')} />}
              label={<Typography variant="body2">HND</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.airports.sgn} onChange={handleAirportsChange('sgn')} />}
              label={<Typography variant="body2">SGN</Typography>}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Airline */}
      {/* <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
          <Typography variant="body2">Airline</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <RadioGroup defaultValue="all" sx={{ ml: 2 }}>
            <FormControlLabel
              value="all"
              control={<Radio size="small" />}
              label={<Typography variant="body2">All</Typography>}
            />
            <FormControlLabel
              value="marketing"
              control={<Radio size="small" />}
              label={<Typography variant="body2">Marketing career</Typography>}
            />
            <FormControlLabel
              value="operating"
              control={<Radio size="small" />}
              label={<Typography variant="body2">Operating career</Typography>}
            />
            <FormControlLabel
              value="error"
              control={<Radio size="small" />}
              label={<Typography variant="body2">Multiple errors/day criteria only</Typography>}
            />
            <Divider sx={{ marginY: 2 }} />
            <Box>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={<Typography variant="body2">AA</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={<Typography variant="body2">UA</Typography>}
              />
            </Box>
          </RadioGroup>
        </AccordionDetails>
      </Accordion> */}

      {/* Article name */}
      {/* <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
          <Typography variant="body2">Article name</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
            <TextField
              placeholder="Enter article name"
              size="small"
              fullWidth
              sx={{ '& .MuiInputBase-root': { height: 32, fontSize: 14 } }}
            />
            <Button variant="outlined" sx={{ textTransform: 'none', height: 32 }}>
              Search
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2, mt: 1 }}>
            FareBasis
          </Typography>
        </AccordionDetails>
      </Accordion> */}

      {/* Reservation class */}
      {/* <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
          <Typography variant="body2">Reservation class</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, ml: 2 }}>
            {['B', 'E', 'L', 'C', 'M', 'F', 'D', 'P'].map((cls) => (
              <FormControlLabel
                key={cls}
                control={<Checkbox size="small" />}
                label={<Typography variant="body2">{cls}</Typography>}
                sx={{ m: 0 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion> */}

      {/* Cabin */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
          <Typography variant="body2">Cabin</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ml: 2 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.cabins.economy} onChange={handleCabinChange('economy')} />}
              label={<Typography variant="body2">Economy</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" checked={filters.cabins.business} onChange={handleCabinChange('business')} />}
              label={<Typography variant="body2">Business</Typography>}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Conversation (Price) */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
          <Typography variant="body2">Range Price</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ ml: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                JPY
              </Typography>
              <TextField
                type='number'
                onChange={({ target }) => handlePriceChange([filters.priceRange[0], Number(target.value)])}
                value={filters.priceRange[1]}
                placeholder="Enter price"
                size="small"
                fullWidth
                sx={{ '& .MuiInputBase-root': { height: 32 } }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              JPY {filters.priceRange[0]?.toLocaleString()} - {filters.priceRange[1].toLocaleString()}
            </Typography>
            <Slider
              value={filters.priceRange}
              onChange={(_e, value) => handlePriceChange(value)}
              min={25600}
              max={1134370}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `¥${value.toLocaleString()}`}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Half-destroyed*/}
      <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'grey.300' }}>
        <Typography variant="body2">Half-destroyed</Typography>
      </Box>
    </Box >
  );
}
