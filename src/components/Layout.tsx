import { Outlet, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* 헤더 */}
      <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* 로고 */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
                Inno Design <span className="text-primary">Co</span>
              </span>
            </Link>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/projects" className="text-gray-600 hover:text-primary transition-colors">PROJECTS</Link>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">CONTACT</a>
            </nav>

            {/* 소셜 및 관리자 링크 */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="https://www.instagram.com/innodesign_official" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <Link to="/admin" className="text-sm px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                관리자
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/projects" className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>PROJECTS</Link>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
              <Link to="/admin" className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>ADMIN</Link>
            </div>
          </div>
        )}
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 uppercase">Inno Design <span className="text-primary">Co</span></h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                INNOVATION IN SPACE<br />
                공간에 혁신을 담아내다
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>서울시 강남구 테헤란로 123, 이노타워 5층</li>
                <li>T. 02-1234-5678</li>
                <li>E. contact@innodesign.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Social</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/innodesign_official" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Pinterest</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Inno Design Co. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
