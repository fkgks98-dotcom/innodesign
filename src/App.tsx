import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPosts from './pages/admin/Posts';
import AdminHomeEditor from './pages/admin/HomeEditor';
import AdminSettings from './pages/admin/Settings';
import AdminLogin from './pages/admin/Login';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';

// 관리자 권한 체크 컴포넌트
const AdminGuard = () => {
  const isAuthenticated = sessionStorage.getItem('admin_auth') === 'true';
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 사용자 뷰 (메인 홈페이지) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* 관리자 로그인 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 관리자 뷰 (대시보드) - 보호됨 */}
        <Route path="/admin" element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="home-editor" element={<AdminHomeEditor />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
