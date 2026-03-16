import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Quote, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DEFAULT_HOME_DATA } from '../constants';

// 샘플 데이터 (게시물은 나중에 동적 처리 가능)
const PROJECT_ITEMS = [
  {
    id: 1,
    title: '모던 미니멀리즘 아파트',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    ],
    description: '여백의 미를 살린 40평대 아파트 인테리어. 화이트 톤과 우드의 조화로 따뜻한 분위기를 연출했습니다.'
  },
  {
    id: 2,
    title: '프리미엄 오피스 라운지',
    category: '상업공간',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
    ],
    description: '창의성과 휴식이 공존하는 IT 기업의 사내 라운지. 개방감 있는 구조와 모던한 가구 배치가 특징입니다.'
  },
  {
    id: 3,
    title: '오래된 주택의 재탄생',
    category: '리모델링',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'
    ],
    description: '30년 된 구옥을 현대적인 라이프스타일에 맞게 전면 리모델링한 프로젝트입니다.'
  },
  {
    id: 4,
    title: '자연을 품은 전원주택',
    category: '신축',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512918766671-ad650e989c7c?w=800',
      'https://images.unsplash.com/photo-1512915922686-57c11f9ad6b3?w=800'
    ],
    description: '건축주의 라이프스타일을 반영하여 처음부터 끝까지 새롭게 지어 올린 신축 주택입니다.'
  }
];

const SERVICES = [
  {
    title: '공간 컨설팅',
    description: '고객의 라이프스타일과 니즈를 분석하여 최적의 공간 활용 방안을 제안합니다.',
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />
  },
  {
    title: '맞춤형 디자인',
    description: '트렌드를 반영하면서도 시간이 지나도 변치 않는 가치를 지닌 디자인을 설계합니다.',
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />
  },
  {
    title: '책임 시공',
    description: '숙련된 전문가들이 최고급 자재를 사용하여 꼼꼼하고 완벽하게 시공합니다.',
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />
  },
  {
    title: '사후 관리 (A/S)',
    description: '시공 후에도 체계적인 관리 시스템을 통해 고객 만족을 최우선으로 합니다.',
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />
  }
];

export default function Home() {
  const [data, setData] = useState(DEFAULT_HOME_DATA);
  const [projects, setProjects] = useState(PROJECT_ITEMS);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem('home_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
    
    const savedPosts = localStorage.getItem('admin_posts');
    if (savedPosts) {
      const publishedPosts = JSON.parse(savedPosts).filter((p: any) => p.status === '발행됨');
      if (publishedPosts.length > 0) {
        setProjects(publishedPosts);
      }
    }
  }, []);

  const openProject = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIdx(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const allImages = selectedProject ? [selectedProject.image, ...(selectedProject.images || [])].filter(Boolean) : [];

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="w-full">
      {/* 히어로 섹션 */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.hero.bgImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight uppercase whitespace-nowrap"
          >
            {data.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-gray-200 mb-10 font-light"
          >
            {data.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-medium rounded-full hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
            >
              {data.hero.buttonText}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 회사 소개 섹션 */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">{data.about.title}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">
                {data.about.heading}
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {data.about.description}
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                {data.about.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src={data.about.image} 
                alt="Interior Design Process" 
                className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">프리미엄 브랜드 대상</div>
                    <div className="text-sm text-gray-500">인테리어 부문 3년 연속</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 프로젝트 섹션 */}
      <section id="projects" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Projects</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">최근 시공 사례</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openProject(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                    {item.category}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-900 hover:text-white transition-colors">
              프로젝트 더보기
            </button>
          </div>
        </div>
      </section>

      {/* 프로젝트 상세 모달 */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm"
            onClick={closeProject}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 이미지 영역 */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden group">
                <img 
                  src={allImages[currentImageIdx]} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={32} />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                      {allImages.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIdx ? 'bg-white w-6' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* 정보 영역 */}
              <div className="w-full md:w-[400px] p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <button 
                    onClick={closeProject}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-grow">
                  <p className="text-gray-600 leading-relaxed text-lg mb-8 whitespace-pre-line">
                    {selectedProject.description || selectedProject.content}
                  </p>
                  
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 mt-8">
                      {allImages.map((img, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setCurrentImageIdx(idx)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIdx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      closeProject();
                      window.location.href = '#contact';
                    }}
                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-primary transition-colors"
                  >
                    이 프로젝트와 비슷한 견적 문의하기
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 서비스 섹션 */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Our Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">체계적인 인테리어 솔루션</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
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
