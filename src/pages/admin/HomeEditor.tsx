import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_HOME_DATA } from '../../constants';

export default function HomeEditor() {
  const [data, setData] = useState(DEFAULT_HOME_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('home_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('home_data', JSON.stringify(data));
    setTimeout(() => {
      setIsSaving(false);
      setMessage('성공적으로 저장되었습니다!');
      setTimeout(() => setMessage(''), 3000);
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('모든 내용을 초기값으로 되돌리시겠습니까?')) {
      setData(DEFAULT_HOME_DATA);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">홈페이지 수정</h1>
          <p className="text-gray-500">메인 화면의 텍스트와 이미지를 직접 수정할 수 있습니다.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleReset}
            className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className="mr-2" />
            초기화
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-md disabled:opacity-50"
          >
            <Save size={18} className="mr-2" />
            {isSaving ? '저장 중...' : '변경사항 저장'}
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 animate-fade-in">
          {message}
        </div>
      )}

      {/* 히어로 섹션 수정 */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-4">히어로 섹션 (메인 상단)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">메인 타이틀</label>
              <input 
                type="text" 
                value={data.hero.title}
                onChange={(e) => setData({...data, hero: {...data.hero, title: e.target.value}})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">서브 타이틀</label>
              <input 
                type="text" 
                value={data.hero.subtitle}
                onChange={(e) => setData({...data, hero: {...data.hero, subtitle: e.target.value}})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">버튼 텍스트</label>
              <input 
                type="text" 
                value={data.hero.buttonText}
                onChange={(e) => setData({...data, hero: {...data.hero, buttonText: e.target.value}})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">배경 이미지</label>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <input 
                  type="text" 
                  value={data.hero.bgImage}
                  onChange={(e) => setData({...data, hero: {...data.hero, bgImage: e.target.value}})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="이미지 URL 입력"
                />
                <div className="flex items-center space-x-2">
                  <label className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary group">
                    <ImageIcon size={18} className="mr-2 text-gray-400 group-hover:text-primary" />
                    <span className="text-sm font-semibold">내 컴퓨터에서 선택</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setData({...data, hero: {...data.hero, bgImage: reader.result as string}});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden border border-gray-100">
                <img src={data.hero.bgImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회사 소개 섹션 수정 */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-4">회사 소개 섹션</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">소제목 (작은 글씨)</label>
              <input 
                type="text" 
                value={data.about.title}
                onChange={(e) => setData({...data, about: {...data.about, title: e.target.value}})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">메인 헤딩</label>
              <textarea 
                value={data.about.heading}
                onChange={(e) => setData({...data, about: {...data.about, heading: e.target.value}})}
                rows={2}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상세 설명</label>
              <textarea 
                value={data.about.description}
                onChange={(e) => setData({...data, about: {...data.about, description: e.target.value}})}
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">소개 이미지</label>
              <div className="flex flex-col space-y-4 mb-4">
                <input 
                  type="text" 
                  value={data.about.image}
                  onChange={(e) => setData({...data, about: {...data.about, image: e.target.value}})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="이미지 URL 입력"
                />
                <label className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer text-sm font-medium">
                  <ImageIcon size={18} className="mr-2" />
                  내 컴퓨터에서 선택
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setData({...data, about: {...data.about, image: reader.result as string}});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              <div className="h-48 rounded-2xl overflow-hidden border border-gray-100">
                <img src={data.about.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.about.stats.map((stat, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">{idx === 0 ? '통계 1' : '통계 2'}</label>
                  <input 
                    type="text" 
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...data.about.stats];
                      newStats[idx].value = e.target.value;
                      setData({...data, about: {...data.about, stats: newStats}});
                    }}
                    className="w-full bg-transparent font-bold text-xl text-gray-900 outline-none"
                    placeholder="값 (예: 500+)"
                  />
                  <input 
                    type="text" 
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...data.about.stats];
                      newStats[idx].label = e.target.value;
                      setData({...data, about: {...data.about, stats: newStats}});
                    }}
                    className="w-full bg-transparent text-sm text-gray-500 outline-none"
                    placeholder="라벨 (예: 완료 프로젝트)"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
