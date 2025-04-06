import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
}

interface DashboardState {
  metrics: DashboardMetrics;
  isLoading: boolean;
  error: string | null;
  fetchMetrics: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: {
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  },
  isLoading: false,
  error: null,

  fetchMetrics: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Fetch orders count
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact' });

      // Fetch pending orders
      const { count: pendingOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .eq('status', 'pending');

      // Fetch completed orders
      const { count: completedOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .eq('status', 'completed');

      // Calculate total revenue
      const { data: orders } = await supabase
        .from('orders')
        .select('amount')
        .eq('status', 'completed');

      const totalRevenue = orders?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;

      set({
        metrics: {
          totalOrders: totalOrders || 0,
          totalRevenue,
          pendingOrders: pendingOrders || 0,
          completedOrders: completedOrders || 0,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));