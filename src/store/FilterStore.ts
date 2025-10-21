import { DEFAULT_FILTER_PARAMS } from '@/lib/constants';
import type { FilterSource } from '@/types/common';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

type FilterStore = {
  filters: FilterSource;
  setFilter: (filters?: Partial<FilterSource>) => void;
  resetFilter: () => void;
};

const useFilterStoreBase = create<FilterStore>((set) => ({
  filters: DEFAULT_FILTER_PARAMS,
  setFilter: (source) => set((state) => ({ filters:  {...state.filters, ...source}  })),
  resetFilter: () => set(() => ({ filters: DEFAULT_FILTER_PARAMS}))
}));

export const useFilterStore = createSelectorFunctions(useFilterStoreBase);
