import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/Home";
import InvestmentCalculator from "@/pages/InvestmentCalculator";
import LoanCalculator from "@/pages/LoanCalculator";
import MortgageCalculator from "@/pages/MortgageCalculator";
import BondCalculator from "@/pages/BondCalculator";
import AmortizationCalculator from "@/pages/AmortizationCalculator";
import FuelCalculator from "@/pages/FuelCalculator";
import PoolCalculator from "@/pages/PoolCalculator";
import PavingCalculator from "@/pages/PavingCalculator";
import RenovationCalculator from "@/pages/RenovationCalculator";
import PaintCalculator from "@/pages/PaintCalculator";
import CalorieCalculator from "@/pages/CalorieCalculator";
import BMICalculator from "@/pages/BMICalculator";
import ClothingSizeCalculator from "@/pages/ClothingSizeCalculator";
import ShoeSizeCalculator from "@/pages/ShoeSizeCalculator";
import BeltRingCalculator from "@/pages/BeltRingCalculator";
import UnitConverter from "@/pages/UnitConverter";

const queryClient = new QueryClient();

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/investment" component={InvestmentCalculator} />
      <Route path="/loan" component={LoanCalculator} />
      <Route path="/mortgage" component={MortgageCalculator} />
      <Route path="/bond" component={BondCalculator} />
      <Route path="/amortization" component={AmortizationCalculator} />
      <Route path="/fuel" component={FuelCalculator} />
      <Route path="/pool" component={PoolCalculator} />
      <Route path="/paving" component={PavingCalculator} />
      <Route path="/renovation" component={RenovationCalculator} />
      <Route path="/paint" component={PaintCalculator} />
      <Route path="/calories" component={CalorieCalculator} />
      <Route path="/bmi" component={BMICalculator} />
      <Route path="/clothing-size" component={ClothingSizeCalculator} />
      <Route path="/shoe-size" component={ShoeSizeCalculator} />
      <Route path="/belt-ring" component={BeltRingCalculator} />
      <Route path="/units" component={UnitConverter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
