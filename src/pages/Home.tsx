import { motion } from 'motion/react';
import { ArrowRight, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_HOME_DATA } from '../constants';

export default function Home() {
  const [data, setData] = useState(DEFAULT_HOME_DATA);

  useEffect(() => {
    const savedData = localStorage.getItem('home_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="w-full">
      {/* 히어로 섹션 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.hero.bgImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight uppercase"
          >
            {data.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-gray-200 mb-12 font-light"
          >
            {data.hero.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link 
              to="/projects" 
              className="group relative px-12 py-5 bg-primary text-white text-xl font-bold rounded-full overflow-hidden transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center">
                VIEW PROJECTS
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 문의하기 섹션 */}
      <section id="contact" className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 text-primary/50 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            새로운 공간에서의 시작,<br />
            이노디자인과 함께하세요.
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            전문 디자이너가 고객님의 예산과 취향에 맞는 최적의 플랜을 제안해 드립니다.
          </p>
          <form className="max-w-2xl mx-auto bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input 
                type="text" 
                placeholder="이름" 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <input 
                type="tel" 
                placeholder="연락처" 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            <textarea 
              placeholder="문의 내용 (예: 30평대 아파트 전체 리모델링 견적 문의)" 
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors mb-6 resize-none"
            ></textarea>
            <button 
              type="button"
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
            >
              상담 신청하기
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
