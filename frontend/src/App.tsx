
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/layout/Header/Header';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import LogoutPage from './pages/LogoutPage';
import { PublicRoute } from './components/ui/PublicRoute/PublicRoute';
import { ProtectedRoute } from './components/ui/ProtectedRoute/ProtectedRoute';

const LazyHomePage = lazy(() => import('./pages/HomePage'))
const LazyLoginPage = lazy(() => import('./pages/LoginPage'))
const LazyAdminPage = lazy(() => import('./pages/AdminPage'));
const LazyGalleryPage = lazy(() => import('./pages/GalleryPage'));
const LazyProfilePage = lazy(() => import('./pages/GalleryPage'));
const LazyRegisterPage = lazy(() => import('./pages/RegisterPage'));
const LazyForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const LazyExhibitionsPage = lazy(() => import("./pages/ExhibitionsPage"));

function App() {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<>Загрузка</>}>
              <Header />
              <Routes>
                <Route element={<PublicRoute />}>
                  <Route path="login" element={<LazyLoginPage />} />
                  <Route path="register" element={<LazyRegisterPage />} />
                  <Route path="forgot-password" element={<LazyForgotPasswordPage />} />
                  <Route path='artists' element={<LazyGalleryPage />} />
                  <Route path="exhibitions" element={<LazyExhibitionsPage />} />
                  <Route path="gallery" element={<LazyGalleryPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="profile" element={<LazyProfilePage />} />
                  <Route path="logout" element={<LogoutPage />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo="/" />}>
                  <Route path="adminPanel" element={<LazyAdminPage />} />
                  <Route path="admin/users" element={<LazyAdminPage />} />
                  <Route path="admin/moderators" element={<LazyAdminPage />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['admin', 'moderator']} redirectTo="/" />}>
                  {/* <Route path="moderation" element={<LazyModeratorPage />} />
                  <Route path="moderation/artists" element={<LazyModeratorPage />} />
                  <Route path="moderation/exhibitions" element={<LazyModeratorPage />} /> */}
                </Route>

                <Route path="/" element={<LazyHomePage />} />

                <Route path='*' element={<LazyHomePage />} />
              </Routes>

            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </NotificationProvider>
    </>
  )
}

export default App
