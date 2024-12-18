import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/themeProvider";
import WeatherDashboard from "./page/WeatherDashboard";
import CityPage from "./page/City-page";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/city/:cityName" element={<CityPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
