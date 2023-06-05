import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { mainTheme } from "./utils/Theme";
import { useEffect } from "react";
import { ForceLocater } from "./pages/ForceLocater";
import { CrimeMap } from "./pages/CrimeMap";
const queryClient = new QueryClient();
function App() {
  useEffect(() => {
    document.title = "Police tracker";
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={mainTheme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Navigate to={"/force"} />} path="/" />
            <Route element={<ForceLocater />} path="/force" />
            <Route element={<CrimeMap />} path="/crimemap" />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
