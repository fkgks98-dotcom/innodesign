import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

// 샘플 데이터
const INITIAL_POSTS = [
  { id: 1, title: '모던 미니멀리즘 아파트', category: '주거공간', date: '2023-10-25', status: '발행됨' },
  { id: 2, title: '프리미엄 오피스 라운지', category: '상업공간', date: '2023-10-20', status: '발행됨' },
  { id: 3, title: '오래된 주택의 재탄생', category: '리모델링', date: '2023-10-15', status: '초안' },
  { id: 4, title: '자연을 품은 전원주택', category: '신축', date: '2023-10-05', status: '발행됨' },
];

export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('admin_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
    }
  }, []);

  const saveToLocalStorage = (newPosts: any[]) => {
    setPosts(newPosts);
    localStorage.setItem('admin_posts', JSON.stringify(newPosts));
  };

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentPost({ title: '', category: '주거공간', content: '', image: '', status: '발행됨' });
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const newPosts = posts.filter(p => p.id !== id);
      saveToLocalStorage(newPosts);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let newPosts;
    if (currentPost.id) {
      newPosts = posts.map(p => p.id === currentPost.id ? { ...p, ...currentPost } : p);
    } else {
      newPosts = [{ ...currentPost, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...posts];
    }
    saveToLocalStorage(newPosts);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{currentPost?.id ? '게시글 수정' : '새 게시글 작성'}</h1>
          <button 
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-gray-900 px-4 py-2"
          >
            취소
          </button>
        </div>

        <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
            <input 
              type="text" 
              value={currentPost?.title}
              onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="게시글 제목을 입력하세요"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <select 
                value={currentPost?.category}
                onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="주거공간">주거공간</option>
                <option value="상업공간">상업공간</option>
                <option value="리모델링">리모델링</option>
                <option value="신축">신축</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">대표 이미지</label>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input 
                    type="url" 
                    value={currentPost?.image || ''}
                    onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="이미지 URL을 직접 입력하거나 아래 버튼을 사용하세요"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col items-center justify-center p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} className="text-gray-400 group-hover:text-primary" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">내 컴퓨터에서 사진 선택</span>
                    <span className="text-xs text-gray-500 mt-1">JPG, PNG, GIF (최대 5MB)</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCurrentPost({ ...currentPost, image: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                    {currentPost?.image ? (
                      <>
                        <img src={currentPost.image} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setCurrentPost({...currentPost, image: ''})}
                          className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                          title="이미지 제거"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon size={32} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-xs text-gray-400">이미지 미리보기</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
            <textarea 
              value={currentPost?.content}
              onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
              rows={10}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y"
              placeholder="시공 사례에 대한 상세한 설명을 작성해주세요."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button 
              type="button"
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              임시저장
            </button>
            <button 
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium shadow-sm"
            >
              {currentPost?.id ? '수정 완료' : '발행하기'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">게시글 관리</h1>
        <button 
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
        >
          <Plus size={20} className="mr-2" />
          새 게시글 작성
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="게시글 검색..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-primary focus:border-primary">
              <option>전체 카테고리</option>
              <option>주거공간</option>
              <option>상업공간</option>
              <option>리모델링</option>
              <option>신축</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-primary focus:border-primary">
              <option>최신순</option>
              <option>오래된순</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">제목</th>
                <th className="px-6 py-4 font-medium">카테고리</th>
                <th className="px-6 py-4 font-medium">작성일</th>
                <th className="px-6 py-4 font-medium">상태</th>
                <th className="px-6 py-4 font-medium text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500">#{post.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md">{post.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full font-medium ${
                      post.status === '발행됨' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="수정"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="삭제"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <div>총 {posts.length}개의 게시글</div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-50" disabled>이전</button>
            <button className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100">다음</button>
          </div>
        </div>
      </div>
    </div>
  );
}
