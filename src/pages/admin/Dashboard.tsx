import { Users, FileText, Eye, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const savedPosts = localStorage.getItem('admin_posts');
    if (savedPosts) {
      setPostCount(JSON.parse(savedPosts).length);
    }
  }, []);

  const stats = [
    { label: '총 방문자 수', value: '12,450', change: '+12%', icon: <Users size={24} className="text-blue-500" /> },
    { label: '전체 게시글', value: postCount.toString(), change: '+3', icon: <FileText size={24} className="text-green-500" /> },
    { label: '오늘의 조회수', value: '842', change: '+5%', icon: <Eye size={24} className="text-purple-500" /> },
    { label: '신규 문의', value: '12', change: '-2', icon: <TrendingUp size={24} className="text-orange-500" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>
              <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* 퀵 액션 */}
      <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
        <h2 className="text-lg font-bold text-gray-900 mb-6">빠른 작업</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to="/admin/posts" 
            className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <FileText size={24} />
            </div>
            <div>
              <div className="font-bold text-gray-900">새 게시물 올리기</div>
              <div className="text-sm text-gray-500">시공 사례를 새로 등록합니다.</div>
            </div>
          </Link>
          <Link 
            to="/admin/home-editor" 
            className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Eye size={24} />
            </div>
            <div>
              <div className="font-bold text-gray-900">홈페이지 수정하기</div>
              <div className="text-sm text-gray-500">메인 화면의 내용을 변경합니다.</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 최근 활동 및 알림 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 등록된 프로젝트</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">모던 미니멀리즘 아파트 {i}</h4>
                  <p className="text-sm text-gray-500">주거공간 • 2023.10.{10+i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 고객 문의</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-xl hover:border-primary transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">30평대 아파트 리모델링 견적 문의</h4>
                  <span className="text-xs text-gray-400">2시간 전</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  안녕하세요, 이번에 이사를 가게 되어 전체 리모델링을 계획 중입니다. 
                  주방과 거실 확장을 포함하여 대략적인 견적을 받아보고 싶습니다.
                </p>
                <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">김철수</span>
                  <span>010-1234-5678</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
