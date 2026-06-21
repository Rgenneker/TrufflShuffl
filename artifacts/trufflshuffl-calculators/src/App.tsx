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

/** All calculator/page routes — rendered inside the language-prefixed nested Router */
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
      {/* Business */}
      <Route path="/vat" component={VATCalculator} />
      <Route path="/percentage" component={PercentageCalculator} />
      <Route path="/retirement" component={RetirementCalculator} />
      <Route path="/roi" component={ROICalculator} />
      <Route path="/savings" component={SavingsCalculator} />
      <Route path="/salary" component={SalaryCalculator} />
      {/* Fuel & Travel */}
      <Route path="/fuel" component={FuelCalculator} />
      {/* Home & Garden */}
      <Route path="/pool" component={PoolCalculator} />
      <Route path="/paving" component={PavingCalculator} />
      <Route path="/renovation" component={RenovationCalculator} />
      <Route path="/paint" component={PaintCalculator} />
      {/* Health */}
      <Route path="/calories" component={CalorieCalculator} />
      <Route path="/bmi" component={BMICalculator} />
      {/* Dates & Time */}
      <Route path="/age" component={AgeCalculator} />
      {/* Fashion */}
      <Route path="/clothing-size" component={ClothingSizeCalculator} />
      <Route path="/shoe-size" component={ShoeSizeCalculator} />
      <Route path="/belt-ring" component={BeltRingCalculator} />
      {/* Unit Conversions */}
      <Route path="/units" component={UnitConverter} />
      {/* Conversion value pages — /convert/miles-to-km/5 */}
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

/** Reads :lang from the outer route, syncs to LanguageContext, mounts the inner nested Router */
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
      {/* Nested Router: all <Link href="/…"> inside here resolve to /${lang}/… */}
      <WouterRouter base={`${BASE}/${langFromUrl}`}>
        <InnerRoutes />
      </WouterRouter>
    </>
  );
}

/** Redirects bare "/" to the browser-detected or saved language */
function RootRedirect() {
  const { lang } = useLang();
  const [, navigate] = useLocation();
  useEffect(() => {
    const host = window.location.hostname;
    if (host !== "trufflshuffl.com" && host !== "www.trufflshuffl.com") {
      window.location.replace(`https://www.trufflshuffl.com/${lang}`);
      return;
    }
    navigate(`/${lang}`, { replace: true } as never);
  }, []);
  return null;
}

function OuterRouter() {
  return (
    <WouterRouter base={BASE}>
      <Switch>
        <Route path="/" component={RootRedirect} />
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
