import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Marketplace from '../pages/Marketplace';
import Orders from '../pages/Orders';
import ContentPurchase from '../pages/ContentPurchase';
import SeoTools from '../pages/SeoTools';
import Profile from '../pages/Profile';
import BillingAndFunds from '../pages/BillingAndFunds';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthGuard from '../components/AuthGuard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="/marketplace" element={<AuthGuard><Marketplace /></AuthGuard>} />
      <Route path="/orders" element={<AuthGuard><Orders /></AuthGuard>} />
      <Route path="/content-purchase" element={<AuthGuard><ContentPurchase /></AuthGuard>} />
      <Route path="/seo-tools" element={<AuthGuard><SeoTools /></AuthGuard>} />
      <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
      <Route path="/billing-and-funds" element={<AuthGuard><BillingAndFunds /></AuthGuard>} />
    </Routes>
  );
}