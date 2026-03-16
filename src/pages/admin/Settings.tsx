import React, { useState } from 'react';
import { Save, Globe, Palette, Share2 } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('설정이 저장되었습니다.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">웹사이트 설정</h1>
        <button 
          onClick={handleSave}
          className="flex items-center px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium shadow-sm"
        >
          <Save size={20} className="mr-2" />
          변경사항 저장
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 탭 네비게이션 */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === 'general' 
                ? 'border-b-2 border-primary text-primary bg-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Globe size={18} className="mr-2" />
            일반 설정 (SEO)
          </button>
          <button 
            onClick={() => setActiveTab('theme')}
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors ${
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
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === 'social' 
                ? 'border-b-2 border-primary text-primary bg-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Share2 size={18} className="mr-2" />
            소셜 미디어 연동
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <p className="mt-2 text-xs text-gray-500">브라우저 탭과 검색 결과에 표시되는 이름입니다.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사이트 설명 (Meta Description)</label>
                  <textarea 
                    rows={3}
                    defaultValue="공간의 가치를 높이는 프리미엄 인테리어 전문 기업 (주)이노디자인입니다. 주거공간, 상업공간 맞춤형 디자인 및 책임 시공."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  ></textarea>
                  <p className="mt-2 text-xs text-gray-500">검색 결과에서 사이트 이름 아래에 표시되는 짧은 설명입니다. (150자 내외 권장)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">검색 키워드 (Meta Keywords)</label>
                  <input 
                    type="text" 
                    defaultValue="인테리어, 리모델링, 아파트인테리어, 상공간인테리어, 이노디자인"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <p className="mt-2 text-xs text-gray-500">쉼표(,)로 구분하여 입력해주세요.</p>
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
