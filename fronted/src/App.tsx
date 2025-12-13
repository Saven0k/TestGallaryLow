
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/layout/Header/Header';

const LazyHomePage = lazy(() => import('./pages/HomePage'))
const LazyLoginPage = lazy(() => import('./pages/LoginPage'))
const LazyAdminPage = lazy(() => import('./pages/AdminPage'));
const LazyGallaryPage = lazy(() => import('./pages/GalleryPage'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<>Загрузка</>}>
          <Header/>
          <Routes>
            <Route path='*' element={<LazyHomePage />} />
            <Route path='login' element={<LazyLoginPage />} />
            <Route path='galary' element={<LazyGallaryPage />} />
            {/* <Route path='/forgot-password' element={< />} /> */}

            <Route path='adminPanel' element={
              <LazyAdminPage />
            } />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
