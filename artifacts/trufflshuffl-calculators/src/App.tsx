import { Switch, Route, Router as WouterRouter, useParams, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { LanguageProvider, useLang } from "@/context/LanguageContext";
import { LANGUAGES, type LangCode } from "@/lib/i18n";
import { HreflangTags } from "@/components/HreflangTags";
import { SEOHead } from "@/components/SEOHead";
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
import VATCalculator from "@/pages/VATCalculator";
import GSTCalculator from "@/pages/GSTCalculator";
import ExciseDutyCalculator from "@/pages/ExciseDutyCalculator";
import CustomsDutyCalculator from "@/pages/CustomsDutyCalculator";
import PercentageCalculator from "@/pages/PercentageCalculator";
import RetirementCalculator from "@/pages/RetirementCalculator";
import ROICalculator from "@/pages/ROICalculator";
import SavingsCalculator from "@/pages/SavingsCalculator";
import AgeCalculator from "@/pages/AgeCalculator";
import SalaryCalculator from "@/pages/SalaryCalculator";
import ConversionPage from "@/pages/ConversionPage";
import ArticlesPage from "@/pages/ArticlesPage";
import ArticlePage from "@/pages/ArticlePage";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import TermsPage from "@/pages/Terms";
import PrivacyPage from "@/pages/Privacy";
import SitemapPage from "@/pages/Sitemap";
import EVCalculator from "@/pages/EVCalculator";
import SolarCalculator from "@/pages/SolarCalculator";
import ElectricityCalculator from "@/pages/ElectricityCalculator";
import WaterCalculator from "@/pages/WaterCalculator";
import ConstructionCalculator from "@/pages/ConstructionCalculator";
import FitnessCalculator from "@/pages/FitnessCalculator";
import AutomotiveCalculator from "@/pages/AutomotiveCalculator";
import TravelCalculator from "@/pages/TravelCalculator";
import PetCalculator from "@/pages/PetCalculator";
import FoodCalculator from "@/pages/FoodCalculator";
import EducationCalculator from "@/pages/EducationCalculator";
import EngineeringCalculator from "@/pages/EngineeringCalculator";
import EnvironmentCalculator from "@/pages/EnvironmentCalculator";
import LifestyleCalculator from "@/pages/LifestyleCalculator";
import TechCalculator from "@/pages/TechCalculator";
import CreditCardCalculator from "@/pages/CreditCardCalculator";
import DebtCalculator from "@/pages/DebtCalculator";
import InvestingCalculator from "@/pages/InvestingCalculator";
import NetWorthCalculator from "@/pages/NetWorthCalculator";
import BodyHealthCalculator from "@/pages/BodyHealthCalculator";
import BusinessToolsCalculator from "@/pages/BusinessToolsCalculator";
import TimeToolsCalculator from "@/pages/TimeToolsCalculator";

const queryClient = new QueryClient();
const VALID_CODES = LANGUAGES.map(l => l.code);
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

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

function InnerRoutes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      {/* Financial */}
      <Route path="/investment" component={InvestmentCalculator} />
      <Route path="/loan" component={LoanCalculator} />
      <Route path="/mortgage" component={MortgageCalculator} />
      <Route path="/bond" component={BondCalculator} />
      <Route path="/amortization" component={AmortizationCalculator} />
      <Route path="/credit-card" component={CreditCardCalculator} />
      <Route path="/debt" component={DebtCalculator} />
      <Route path="/net-worth" component={NetWorthCalculator} />
      {/* Investing */}
      <Route path="/investing" component={InvestingCalculator} />
      {/* Business */}
      <Route path="/vat" component={VATCalculator} />
      <Route path="/gst" component={GSTCalculator} />
      <Route path="/excise" component={ExciseDutyCalculator} />
      <Route path="/customs" component={CustomsDutyCalculator} />
      <Route path="/percentage" component={PercentageCalculator} />
      <Route path="/retirement" component={RetirementCalculator} />
      <Route path="/roi" component={ROICalculator} />
      <Route path="/savings" component={SavingsCalculator} />
      <Route path="/salary" component={SalaryCalculator} />
      <Route path="/business-tools" component={BusinessToolsCalculator} />
      {/* Fuel & Travel */}
      <Route path="/fuel" component={FuelCalculator} />
      <Route path="/travel" component={TravelCalculator} />
      {/* Automotive */}
      <Route path="/automotive" component={AutomotiveCalculator} />
      {/* Electric Vehicles */}
      <Route path="/ev" component={EVCalculator} />
      {/* Solar & Energy */}
      <Route path="/solar" component={SolarCalculator} />
      {/* Home Electricity */}
      <Route path="/electricity" component={ElectricityCalculator} />
      {/* Water */}
      <Route path="/water" component={WaterCalculator} />
      {/* Home & Garden */}
      <Route path="/pool" component={PoolCalculator} />
      <Route path="/paving" component={PavingCalculator} />
      <Route path="/renovation" component={RenovationCalculator} />
      <Route path="/paint" component={PaintCalculator} />
      {/* Construction */}
      <Route path="/construction" component={ConstructionCalculator} />
      {/* Health */}
      <Route path="/calories" component={CalorieCalculator} />
      <Route path="/bmi" component={BMICalculator} />
      <Route path="/body-health" component={BodyHealthCalculator} />
      {/* Fitness */}
      <Route path="/fitness" component={FitnessCalculator} />
      {/* Dates & Time */}
      <Route path="/age" component={AgeCalculator} />
      <Route path="/time-tools" component={TimeToolsCalculator} />
      {/* Fashion */}
      <Route path="/clothing-size" component={ClothingSizeCalculator} />
      <Route path="/shoe-size" component={ShoeSizeCalculator} />
      <Route path="/belt-ring" component={BeltRingCalculator} />
      {/* Unit Conversions */}
      <Route path="/units" component={UnitConverter} />
      {/* Pets */}
      <Route path="/pets" component={PetCalculator} />
      {/* Food */}
      <Route path="/food" component={FoodCalculator} />
      {/* Education */}
      <Route path="/education" component={EducationCalculator} />
      {/* Engineering */}
      <Route path="/engineering" component={EngineeringCalculator} />
      {/* Environment */}
      <Route path="/environment" component={EnvironmentCalculator} />
      {/* Lifestyle */}
      <Route path="/lifestyle" component={LifestyleCalculator} />
      {/* Technology */}
      <Route path="/tech" component={TechCalculator} />
      {/* Conversion value pages */}
      <Route path="/convert/:pair/:value" component={ConversionPage} />
      <Route path="/convert/:pair" component={ConversionPage} />
      {/* Articles */}
      <Route path="/articles" component={ArticlesPage} />
      <Route path="/articles/:slug" component={ArticlePage} />
      {/* Info pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/sitemap" component={SitemapPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function LangApp() {
  const params = useParams<{ lang: string }>();
  const langFromUrl = (params?.lang ?? "en") as LangCode;
  const { setLang } = useLang();
  const [, navigate] = useLocation();

  const isValid = VALID_CODES.includes(langFromUrl);

  useEffect(() => {
    if (isValid) {
      setLang(langFromUrl);
    } else {
      navigate("/en", { replace: true } as never);
    }
  }, [langFromUrl, isValid]);

  if (!isValid) return null;

  return (
    <>
      <HreflangTags lang={langFromUrl} />
      <SEOHead lang={langFromUrl} />
      <WouterRouter base={`${BASE}/${langFromUrl}`}>
        <InnerRoutes />
      </WouterRouter>
    </>
  );
}

function RootHomePage() {
  const { setLang } = useLang();
  useEffect(() => {
    setLang("en");
  }, []);

  return (
    <>
      <HreflangTags lang="en" />
      <SEOHead lang="en" />
      <HomePage />
    </>
  );
}

function OuterRouter() {
  return (
    <WouterRouter base={BASE}>
      <Switch>
        <Route path="/" component={RootHomePage} />
        <Route path="/:lang" component={LangApp} />
        <Route path="/:lang/*" component={LangApp} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <TooltipProvider>
            <OuterRouter />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
