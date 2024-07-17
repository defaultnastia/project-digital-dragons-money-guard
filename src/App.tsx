import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import { useAppDispatch } from "./redux/hooks";
import { refreshUser } from "./redux/user/operations";
// import { selectLoadingState } from "./redux/user/selectors";
import React, { Suspense, useEffect } from "react";
import { lazy } from "react";
import { Toaster } from "react-hot-toast";

const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(
  () => import("./pages/PageNotFound/PageNotFound")
);
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const HomeTab = lazy(() => import("./components/HomeTab/HomeTab"));
const StatisticsTab = lazy(
  () => import("./components/StatisticsTab/StatisticsTab")
);
const CurrencyTab = lazy(() => import("./components/CurrencyTab/CurrencyTab"));

// const App: React.FC = () => {
const App = () => {
  const dispatch = useAppDispatch();
  // const userRefreshing = useAppSelector(selectLoadingState);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // return userRefreshing ? (
  //   <p>Refreshing user...</p>
  // ) : (
  return (
    <>
      <Toaster />
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
