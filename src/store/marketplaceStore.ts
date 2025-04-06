import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Website {
  id: string;
  url: string;
  metrics: {
    domainRating: number;
    referringDomains: string;
    totalBacklinks: string;
    totalKeywords: string;
    spamScore: string;
    language: string;
    linkValidity: string;
    trafficByCountry: string;
  };
  price: number;
}

interface Filters {
  minDR?: number;
  maxDR?: number;
  language?: string[];
  country?: string[];
  category?: string[];
  priceRange?: [number, number];
  search?: string;
}

interface MarketplaceState {
  websites: Website[];
  filters: Filters;
  isLoading: boolean;
  error: string | null;
  fetchWebsites: () => Promise<void>;
  setFilters: (filters: Filters) => void;
  applyFilters: () => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  websites: [],
  filters: {},
  isLoading: false,
  error: null,

  fetchWebsites: async () => {
    try {
      set({ isLoading: true, error: null });
      const { filters } = get();
      
      let query = supabase.from('websites').select('*');

      // Apply filters
      if (filters.minDR) {
        query = query.gte('metrics->domainRating', filters.minDR);
      }
      if (filters.maxDR) {
        query = query.lte('metrics->domainRating', filters.maxDR);
      }
      if (filters.language?.length) {
        query = query.in('metrics->language', filters.language);
      }
      if (filters.country?.length) {
        query = query.in('metrics->trafficByCountry', filters.country);
      }
      if (filters.search) {
        query = query.ilike('url', `%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      set({ websites: data || [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  applyFilters: () => {
    get().fetchWebsites();
  },
}));