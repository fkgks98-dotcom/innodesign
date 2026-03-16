import React, { useState, useEffect } from 'react';
import { Save, Globe, Palette, Share2, Layout, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    heroTitle: '',
    heroSubtitle: '',
    contactEmail: '',
    contactPhone: '',
    address: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'site');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as any);
        }
        setLoading(false);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'settings/site');
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'settings', 'site'), settings);
      alert('설정이 저장되었습니다.');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/site');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">웹사이트 설정</h1>
        <button 
          onClick={handleSave}
          className="flex items-center px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-sm"
        >
          <Save size={20} className="mr-2" />
          변경사항 저장
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 탭 네비게이션 */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === 'home' 
                ? 'border-b-2 border-primary text-primary bg-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Layout size={18} className="mr-2" />
            홈페이지 문구
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`flex items-center px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === 'contact' 
                ? 'border-b-2 border-primary text-primary bg-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Globe size={18} className="mr-2" />
            연락처 정보
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="p-8">
          <form id="settings-form" onSubmit={handleSave} className="space-y-8">
            
            {/* 홈페이지 문구 설정 */}
            <div className={activeTab === 'home' ? 'block' : 'hidden'}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">메인 화면 문구 설정</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">메인 타이틀 (Hero Title)</label>
                  <input 
                    type="text" 
                    value={settings.heroTitle}
                    onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
                    placeholder="INNOVATION IN SPACE"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">서브 타이틀 (Hero Subtitle)</label>
                  <textarea 
                    rows={3}
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({...settings, heroSubtitle: e.target.value})}
                    placeholder="공간의 가치를 높이는 프리미엄 인테리어 전문 기업"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 연락처 정보 설정 */}
            <div className={activeTab === 'contact' ? 'block' : 'hidden'}>
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">회사 연락처 및 주소</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일 주소</label>
                  <input 
                    type="email" 
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    placeholder="contact@innodesign.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                  <input 
                    type="text" 
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                    placeholder="02-123-4567"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사무실 주소</label>
                  <input 
                    type="text" 
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                    placeholder="서울특별시 강남구 테헤란로..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
