import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

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

export default function Projects() {
  const [projects, setProjects] = useState(PROJECT_ITEMS);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
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
    <div className="pt-20">
      <section className="py-24 bg-gray-50 min-h-screen">
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
                animate={{ opacity: 1, y: 0 }}
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
                  </>
                )}
              </div>

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
                  <button onClick={closeProject} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
