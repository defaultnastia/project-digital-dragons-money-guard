import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import HomeTab from "./components/HomeTab/HomeTab";
import StatisticsTab from "./components/StatisticsTab/StatisticsTab";
import CurrencyTab from "./components/CurrencyTab/CurrencyTab";
import RestrictedRoute from "./components/RestrictedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { refreshUser } from "./redux/user/operations";
import { selectLoadingState } from "./redux/user/selectors";
import React, { Suspense, useEffect } from "react";
// import { lazy } from "react";

//! ADD LAZY LOAD

// const DashboardPage = lazy(() => import("./pages/DashboardPage"));
// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const RegistrationPage = lazy(() => import("./pages/PageNotFound"));
// const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userRefreshing = useAppSelector(selectLoadingState);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return userRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Suspense fallback={null}>
        <Routes>
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
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
