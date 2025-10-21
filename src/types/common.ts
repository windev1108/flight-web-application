export interface FilterSource {
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