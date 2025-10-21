import type { FilterSource } from "@/types/common";

export const DEFAULT_FILTER_PARAMS : FilterSource = {
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
    } 


export const HEADER_TABS = [
        {
            name: 'Go to TOP screen', active: true,
        },
        { name: 'PN search', active: false },
        { name: 'INFINI/NDC\nComparative search', active: false },
        { name: 'Money lending screen', active: false },
        { name: 'FOREST', active: false },
        { name: 'Mela truss', active: false }
    ];