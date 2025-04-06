import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";
import AppRoutes from "./routes";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Layout>
              <AppRoutes />
            </Layout>
          </AnimatePresence>
          <Toaster position="top-right" />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
