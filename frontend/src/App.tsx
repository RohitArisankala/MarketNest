import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Marketplace from './pages/marketplace/Marketplace';
import ProductDetail from './pages/marketplace/ProductDetail';
import BrandDashboard from './pages/brand/BrandDashboard';
import CreateEditProduct from './pages/brand/CreateEditProduct';
import UserProfile from './pages/user/UserProfile';
import { AnimatePresence } from 'framer-motion';
import { ProtectedRoute, BrandRoute } from './components/auth/RouteGuards';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        <Route element={<BrandRoute />}>
          <Route path="/brand/dashboard" element={<BrandDashboard />} />
          <Route path="/brand/product/new" element={<CreateEditProduct />} />
          <Route path="/brand/product/:id/edit" element={<CreateEditProduct />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
