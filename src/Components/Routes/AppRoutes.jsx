import { Route, Routes } from "react-router-dom";
import LoginPage from "../Auth/Loginpage";
import MainPage from "../Main/MainPage";
import ProfilePage from "../User/ProfilePage";
import VacationPage from "../User/VacationPage";
import Layout from "../Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import ChangePassPage from "../Auth/ChangePassPage";
import NotFound from "../NotFound";

const AppRoutes = ({ darkMode, toggleDarkTheme }) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <LoginPage darkMode={darkMode} toggleDarkTheme={toggleDarkTheme} />
        }
      />
      <Route
        path='/login'
        element={
          <LoginPage darkMode={darkMode} toggleDarkTheme={toggleDarkTheme} />
        }
      />
      <Route
        path='/changePass'
        element={
          <ChangePassPage
            darkMode={darkMode}
            toggleDarkTheme={toggleDarkTheme}
          />
        }
      />
      <Route path='*' element={<NotFound />} />
      <Route
        path='/home'
        element={
          <PrivateRoute>
            <Layout darkMode={darkMode} toggleDarkTheme={toggleDarkTheme}>
              <MainPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path='/userprofile'
        element={
          <PrivateRoute>
            <Layout darkMode={darkMode} toggleDarkTheme={toggleDarkTheme}>
              <ProfilePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path='/uservacation'
        element={
          <PrivateRoute>
            <Layout darkMode={darkMode} toggleDarkTheme={toggleDarkTheme}>
              <VacationPage />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
