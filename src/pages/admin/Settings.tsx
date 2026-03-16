import React, { useState, useEffect } from 'react';
import { Save, Globe, Palette, Share2, Home, Image as ImageIcon, FileText } from 'lucide-react';
import { DEFAULT_HOME_DATA } from '../../constants';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [homeData, setHomeData] = useState(DEFAULT_HOME_DATA);
  const [projectPosts, setProjectPosts] = useState<any[]>([]);

  useEffect(() => {
    const savedHomeData = localStorage.getItem('home_data');
    if (savedHomeData) {
      setHomeData(JSON.parse(savedHomeData));
    }

    const savedPosts = localStorage.getItem('admin_posts');
    if (savedPosts) {
      setProjectPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('home_data', JSON.stringify(homeData));
    localStorage.setItem('admin_posts', JSON.stringify(projectPosts));
    alert('설정이 저장되었습니다.');
  };

  const updateProjectDescription = (id: number, description: string) => {
    const updatedPosts = projectPosts.map(post => 
      post.id === id ? { ...post, description } : post
    );
    setProjectPosts(updatedPosts);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">웹사이트 설정</h1>
        <button 
          form="settings-form"
          type="submit"
          className="flex items-center px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium shadow-sm"
        >
          <Save size={20} className="mr-2" />
          변경사항 저장
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 탭 네비게이션 */}
        <div className="flex border-b border-gray-100 bg-gray-50/50 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'general' 
                ? 'border-b-2 border-primary text-primary bg-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Globe size={18} className="mr-2" />
            일반 설정
          </button>
          <button 
            onClick={() => setActiveTab('homepage')}
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'homepage' 
                ? 'border-b-2 border-primary text-primary bg-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Home size={18} className="mr-2" />
            홈페이지 콘텐츠
          </button>
          <button 
            onClick={() => setActiveTab('theme')}
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'theme' 
                ? 'border-b-2 border-primary text-primary bg-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Palette size={18} className="mr-2" />
            테마 및 디자인
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'social' 
                ? 'border-b-2 border-primary text-primary bg-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Share2 size={18} className="mr-2" />
            소셜 미디어
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="p-8">
          <form id="settings-form" onSubmit={handleSave} className="space-y-8">
            
            {/* 일반 설정 (SEO) */}
            <div className={activeTab === 'general' ? 'block' : 'hidden'}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">기본 정보 및 검색엔진 최적화(SEO)</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사이트 이름 (Title)</label>
                  <input 
                    type="text" 
                    defaultValue="(주)이노디자인 - 프리미엄 인테리어 전문"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사이트 설명 (Meta Description)</label>
                  <textarea 
                    rows={3}
                    defaultValue="공간의 가치를 높이는 프리미엄 인테리어 전문 기업 (주)이노디자인입니다. 주거공간, 상업공간 맞춤형 디자인 및 책임 시공."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 홈페이지 콘텐츠 설정 */}
            <div className={activeTab === 'homepage' ? 'block' : 'hidden'}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">홈페이지 주요 콘텐츠 관리</h2>
              
              <div className="space-y-8">
                {/* 히어로 배경 이미지 */}
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                    <ImageIcon size={18} className="mr-2 text-primary" />
                    히어로 섹션 배경 이미지
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">배경 이미지 URL</label>
                        <input 
                          type="url" 
                          value={homeData.hero.bgImage}
                          onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, bgImage: e.target.value}})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">내 컴퓨터에서 사진 선택</label>
                        <div className="flex items-center space-x-3">
                          <label className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary group">
                            <ImageIcon size={20} className="mr-2 text-gray-400 group-hover:text-primary" />
                            <span className="text-sm font-semibold">파일 탐색기 열기</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setHomeData({...homeData, hero: {...homeData.hero, bgImage: reader.result as string}});
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">URL을 직접 입력하거나 위 버튼을 클릭하여 컴퓨터의 이미지를 선택하세요.</p>
                    </div>
                    <div className="aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50">
                      <img src={homeData.hero.bgImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* 프로젝트 설명 수정 */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText size={18} className="mr-2 text-primary" />
                    프로젝트 상세 설명 관리
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">메인 페이지의 '최근 시공 사례' 섹션에 표시되는 각 프로젝트의 설명을 수정할 수 있습니다.</p>
                  
                  <div className="space-y-6">
                    {projectPosts.length > 0 ? (
                      projectPosts.map((post) => (
                        <div key={post.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-gray-900">{post.title}</span>
                            <span className="text-xs bg-white px-2 py-1 rounded-md border border-gray-200 text-gray-500">{post.category}</span>
                          </div>
                          <textarea 
                            rows={3}
                            value={post.description || ''}
                            onChange={(e) => updateProjectDescription(post.id, e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none text-sm"
                            placeholder="프로젝트에 대한 간단한 설명을 입력하세요."
                          ></textarea>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                        등록된 프로젝트가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 테마 및 디자인 */}
            <div className={activeTab === 'theme' ? 'block' : 'hidden'}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">브랜드 아이덴티티</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">포인트 컬러 (Primary Color)</label>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="color" 
                      defaultValue="#abbbc9"
                      className="h-12 w-24 p-1 border border-gray-200 rounded-xl cursor-pointer"
                    />
                    <input 
                      type="text" 
                      defaultValue="#abbbc9"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">버튼, 강조 텍스트 등에 사용되는 브랜드 핵심 색상입니다.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">기본 폰트 (Typography)</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                    <option value="noto-sans">Noto Sans KR (기본)</option>
                    <option value="pretendard">Pretendard</option>
                    <option value="nanum-gothic">나눔고딕</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">로고 이미지</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG (최대 2MB)</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 소셜 미디어 연동 */}
            <div className={activeTab === 'social' ? 'block' : 'hidden'}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">소셜 미디어 링크</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                  <input 
                    type="url" 
                    defaultValue="https://www.instagram.com/innodesign_official"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://www.instagram.com/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pinterest URL</label>
                  <input 
                    type="url" 
                    defaultValue="https://pinterest.com/innodesign"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://pinterest.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Naver Blog URL</label>
                  <input 
                    type="url" 
                    defaultValue="https://blog.naver.com/innodesign"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://blog.naver.com/..."
                  />
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
