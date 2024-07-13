// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import DashboardPage from "./pages/DashboardPage/DashboardPage";
// import PrivateRoute from "./components/PrivateRoute";
// import HomeTab from "./components/HomeTab/HomeTab";
// import StatisticsTab from "./components/StatisticsTab/StatisticsTab";
// import CurrencyTab from "./components/CurrencyTab/CurrencyTab";
// import RestrictedRoute from "./components/RestrictedRoute";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";

import CurrencyTab from "./components/CurrencyTab/CurrencyTab";

//! ADD LAZY LOAD

function App() {
  return (
    <>
      {/* <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<HomeTab />} />
          <Route path="statistics" element={<StatisticsTab />} />
          <Route path="currency" element={<CurrencyTab />} />
        </Route>
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegistrationPage />
            </RestrictedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes> */}
      <CurrencyTab />
    </>
  );
}

export default App;
