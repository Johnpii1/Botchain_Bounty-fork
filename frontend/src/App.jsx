
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useAccount } from "wagmi";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import BountyDetail from "./pages/BountyDetail";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import FAQPage from "./pages/Faqs";
import WhitepaperPage from "./pages/WhitePaper";
import ContactUs from "./pages/ContactUs";
import CookieConsent from "./pages/CookieConsent";

import LoadingScreen from "./components/LoadingScreen";
import { useTheme } from "./context/ThemeContext";

function RequireWallet({ children }) {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!address && !isConnected) {
      navigate("/", { replace: true });
    }
  }, [address, isConnected, navigate]);

  if (!address && !isConnected) {
    return null;
  }

  return children;
}

function App() {
  const [loading, setLoading] = useState(true);
  const { dark, setDark } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-300">
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route
            path="/"
            element={
              <LandingPage dark={dark} setDark={setDark} />
            }
          />

          <Route
            path="/faqs"
            element={
              <FAQPage dark={dark} setDark={setDark} />
            }
          />

          <Route
            path="/whitepaper"
            element={
              <WhitepaperPage dark={dark} setDark={setDark} />
            }
          />

          <Route
            path="/contact"
            element={
              <ContactUs dark={dark} setDark={setDark} />
            }
          />

          {/* Wallet-protected pages */}
          <Route
            path="/dashboard"
            element={
              <RequireWallet>
                <Dashboard dark={dark} setDark={setDark} />
              </RequireWallet>
            }
          />

          <Route
            path="/profile"
            element={
              <RequireWallet>
                <Profile dark={dark} setDark={setDark} />
              </RequireWallet>
            }
          />

          <Route
            path="/create"
            element={
              <RequireWallet>
                <Create dark={dark} setDark={setDark} />
              </RequireWallet>
            }
          />

          <Route
            path="/bounty/:id"
            element={
              <RequireWallet>
                <BountyDetail dark={dark} setDark={setDark} />
              </RequireWallet>
            }
          />

          {/* Analytics page */}
          <Route
            path="/analytics"
            element={
              <RequireWallet>
                <Analytics dark={dark} setDark={setDark} />
              </RequireWallet>
            }
          />

          {/* Admin page */}
          <Route
            path="/admin-224466"
            element={
              <RequireWallet>
                <Admin dark={dark} setDark={setDark} />
              </RequireWallet>
            }
          />

          {/* 404 page */}
          <Route
            path="*"
            element={
              <div className="flex min-h-screen items-center justify-center bg-[#080908] px-6 text-center text-white">
                <div>
                  <h1 className="text-5xl font-bold text-[#00D6A0]">
                    404
                  </h1>
                  <p className="mt-3 text-lg">
                    Page not found
                  </p>
                  <a
                    href="/dashboard"
                    className="mt-6 inline-flex rounded-xl bg-[#00D6A0] px-5 py-3 font-semibold text-black transition hover:bg-[#00B88A]"
                  >
                    Back to Dashboard
                  </a>
                </div>
              </div>
            }
          />
        </Routes>

        <CookieConsent />
      </BrowserRouter>
    </div>
  );
}

export default App;
