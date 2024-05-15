import SigninPage from './pages/SigninPage/SigninPage';
import { Navigate, Outlet } from 'react-router-dom';
import CompaniesListPage from './pages/CompaniesListPage/CompaniesListPage';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ReportsPage from './pages/ReportsPage/ReportsPage';
import PersonalDataPage from './pages/PersonalDataPage/PersonalDataPage';
import FormsPage from './pages/FormsPage/FormsPage';
import dashboardIcon from './assets/icons/dashboard_icon.svg';
import companiesIcon from './assets/icons/companies_icon.svg';
import reportsIcon from './assets/icons/reports_icon.svg';
import personalIcon from './assets/icons/personal_data_icon.svg';
import formsIcon from './assets/icons/forms_icon.svg';
import { useLocation } from 'react-router-dom';

const HeaderLayout = () => {
  const location = useLocation();

  const loggedUserId = 'Mare';

  const isSignInPage = location.pathname === '/signin';

  if (!isSignInPage && loggedUserId)
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Sidebar /> <Outlet />
      </div>
    );

  return <Outlet />;
};

const ProtectedRoute = ({ element, path }: any) => {
  const loggedUser = localStorage.getItem('loggedUser');

  return loggedUser ? element : <Navigate to="/signin" />;
};

const appRoutes = [
  {
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/signin" replace />
      },
      {
        path: '/signin',
        element: <SigninPage />
      },
      {
        path: '/companies',
        element: (
          <ProtectedRoute element={<CompaniesListPage />} path="/companies" />
        )
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute element={<DashboardPage />} path="/dashboard" />
        )
      },
      {
        path: '/reports',
        element: <ProtectedRoute element={<ReportsPage />} path="/reports" />
      },
      {
        path: '/personal-data',
        element: (
          <ProtectedRoute
            element={<PersonalDataPage />}
            path="/personal-data"
          />
        )
      },
      {
        path: '/forms',
        element: <ProtectedRoute element={<FormsPage />} path="/forms" />
      }
    ]
  }
];

export default appRoutes;

export const navLinks = [
  {
    route: 'dashboard',
    name: 'Komandna tabla',
    icon: dashboardIcon
  },
  {
    route: 'companies',
    name: 'Lista preduzeća',
    icon: companiesIcon
  },
  {
    route: 'reports',
    name: 'Izveštaji',
    icon: reportsIcon
  },
  {
    route: 'personal-data',
    name: 'Matični podaci',
    icon: personalIcon
  },
  {
    route: 'forms',
    name: 'Obrasci',
    icon: formsIcon
  }
];
