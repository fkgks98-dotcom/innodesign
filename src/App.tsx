import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPosts from './pages/admin/Posts';
import AdminSettings from './pages/admin/Settings';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 사용자 뷰 (메인 홈페이지) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* 관리자 뷰 (대시보드) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
