import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  MessageCircle,
  Share2,
  Plus,
  BookOpen,
  Send,
  Coffee,
  Sparkles,
  Feather,
  Droplets
} from 'lucide-react';
import { MascotMiuTho } from './CartoonMascots';
import { soundEngine } from '../utils/audio';

export const ForumView: React.FC = () => {
  const {
    forumPosts,
    addForumPost,
    likeForumPost,
    addCommentToPost,
    currentUser,
    setIsAuthModalOpen,
    books,
    showToast
  } = useApp();

  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newBookTag, setNewBookTag] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState('all');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);

  const tagsList = [
    { id: 'all', label: 'Tất cả chủ đề ☕' },
    { id: 'Nghị luận văn học', label: 'Nghị luận văn học ✒️' },
    { id: 'Nam Cao', label: 'Tác phẩm Nam Cao 🌾' },
    { id: 'Văn học Trung đại', label: 'Văn học Trung đại 📜' },
    { id: 'Kinh nghiệm đọc sách', label: 'Mẹo cảm thụ sách 💡' },
  ];

  const filteredPosts = forumPosts.filter((post) => {
    if (selectedTagFilter === 'all') return true;
    return post.tags.includes(selectedTagFilter) || (post.bookTag && post.bookTag.includes(selectedTagFilter));
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Cậu hãy nhập tiêu đề và nội dung để cùng đàm đạo nhé! 📜');
      return;
    }

    soundEngine.playLevelUp();
    addForumPost(
      newTitle,
      newContent,
      newBookTag || undefined,
      newBookTag ? ['Bàn trà văn chương', newBookTag] : ['Bàn trà văn chương', 'Cảm nhận tác phẩm']
    );

    setNewTitle('');
    setNewContent('');
    setNewBookTag('');
    setIsPosting(false);
    showToast('✨ Lá thư văn chương của cậu đã được treo lên hàng rào trà quán!');
  };

  const handleSendComment = (postId: string) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    soundEngine.playButtonClick();
    addCommentToPost(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div id="forum-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* 1. Header: Bàn Trà Đàm Đạo Văn Chương */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative">
        <div className="absolute -top-4 right-2 hidden sm:block">
          <MascotMiuTho size={70} speechText="Mời cậu ghé uống trà bàn văn! 🍵" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414] text-xs font-black uppercase tracking-wider mb-3 shadow-[0_3px_0_#8B5A2B]">
          <Coffee className="w-4 h-4 text-[#FF8A00]" />
          <span>GÓC BÀN TRÀ ĐÀM ĐẠO VĂN CHƯƠNG HOẠT HÌNH</span>
        </div>
        <h1 className="font-literary text-4xl sm:text-5xl font-black text-[#3B2414] mb-2 drop-shadow-xs">
          Bàn Trà Đàm Đạo
        </h1>
        <p className="text-sm sm:text-base font-bold text-[#5C3A1E] leading-relaxed">
          Không gian thưởng trà bàn văn, chia sẻ góc nhìn sâu sắc và treo những bức thư cảm thụ lên hàng rào hoa.
        </p>
      </div>

      {/* 2. Action Bar: Create Post Wooden Button & Fence Tags */}
      <div className="wood-signboard p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {tagsList.map((tag) => {
            const isSelected = selectedTagFilter === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => {
                  soundEngine.playButtonClick();
                  setSelectedTagFilter(tag.id);
                }}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border-2 border-[#8B5A2B] ${
                  isSelected
                    ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_3px_0_#8B5A2B] scale-105'
                    : 'bg-[#FFFEF2] text-[#5C3A1E] hover:bg-[#FFF8DC]'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        <button
          id="btn-open-create-post"
          onClick={() => {
            if (!currentUser) {
              showToast('Cậu hãy đăng nhập để cùng đàm đạo nhé! ☕');
              setIsAuthModalOpen(true);
              return;
            }
            soundEngine.playButtonClick();
            setIsPosting((prev) => !prev);
          }}
          className="btn-cartoon-primary w-full sm:w-auto px-5 py-2.5 text-xs font-black flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>{isPosting ? 'ĐÓNG SOẠN THẢO' : 'TREO THƯ ĐÀM ĐẠO MỚI'}</span>
        </button>
      </div>

      {/* 3. Create Post Parchment Form */}
      {isPosting && (
        <form
          onSubmit={handleCreatePost}
          className="storybook-card p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-[#8B5A2B]/20">
            <span className="text-2xl">📜</span>
            <h3 className="font-literary text-xl font-black text-[#3B2414]">
              Soạn Cuộn Thư Gửi Bàn Trà Văn Chương
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-[#3B2414] mb-1">
                Tiêu đề cuộn thư
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ví dụ: Cảm nhận về chi tiết bát cháo hành ấm tình người trong Chí Phèo..."
                className="w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#3B2414] mb-1">
                Tác phẩm gắn liền (tùy chọn)
              </label>
              <select
                value={newBookTag}
                onChange={(e) => setNewBookTag(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none"
              >
                <option value="">-- Bàn luận tự do (Không chọn sách cụ thể) --</option>
                {books.map((b) => (
                  <option key={b.id} value={b.title}>
                    {b.title} — {b.author}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-[#3B2414] mb-1">
                Nội dung dòng thư
              </label>
              <textarea
                rows={5}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Viết cảm nghĩ, thắc mắc nghị luận hoặc góc nhìn độc đáo của bạn..."
                className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsPosting(false)}
                className="px-4 py-2 text-xs font-bold text-[#8B5A2B]"
              >
                Hủy cuộn thư
              </button>
              <button
                type="submit"
                className="btn-cartoon-primary px-6 py-2.5 text-xs font-black"
              >
                TREO LÊN HÀNG RÀO
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 4. Posts List Styled as Letters on Wooden Garden Fence */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const isLiked = currentUser ? post.likedBy.includes(currentUser.id) : false;
          const showComments = activeCommentsPostId === post.id;

          return (
            <article
              key={post.id}
              id={`forum-post-${post.id}`}
              className="storybook-card p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Decorative wooden peg / clip */}
              <div className="absolute top-2 left-8 w-6 h-4 bg-[#8B5A2B] rounded-xs border-2 border-[#5C3A1E] shadow-sm z-10" />

              {/* Author Row */}
              <div className="flex items-center justify-between gap-3 mb-4 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF21F] border-2 border-[#8B5A2B] flex items-center justify-center text-2xl shadow-xs">
                    {post.authorAvatar || '🌸'}
                  </div>
                  <div>
                    <h4 className="font-literary text-base font-black text-[#3B2414]">
                      {post.authorName}
                    </h4>
                    <span className="text-[11px] font-bold text-[#8B5A2B]">
                      {post.createdAt}
                    </span>
                  </div>
                </div>

                {post.bookTag && (
                  <span className="badge-game-gold text-xs">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{post.bookTag}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-literary text-xl sm:text-2xl font-black text-[#3B2414] mb-3 leading-snug">
                {post.title}
              </h3>

              {/* Content */}
              <p className="font-literary text-sm sm:text-base font-bold leading-relaxed text-[#5C3A1E] whitespace-pre-wrap mb-4">
                {post.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.map((tg, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-black px-3 py-1 rounded-xl bg-[#FFF8DC] border-2 border-[#8B5A2B] text-[#5C3A1E]"
                  >
                    #{tg}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Thả hoa 🌸, Bình luận, Chia sẻ */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-[#8B5A2B]/20 text-xs font-black text-[#8B5A2B]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      soundEngine.playWater();
                      likeForumPost(post.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-transform hover:scale-105 ${
                      isLiked
                        ? 'bg-[#FF5FA2] border-[#8B5A2B] text-white shadow-[0_2px_0_#8B5A2B]'
                        : 'bg-[#FFF8DC] border-[#8B5A2B] text-[#3B2414]'
                    }`}
                  >
                    <span>🌸</span>
                    <span>{post.likes} Thả hoa</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playButtonClick();
                      setActiveCommentsPostId((curr) => (curr === post.id ? null : post.id));
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#8B5A2B] bg-[#FFF8DC] text-[#3B2414] hover:bg-[#FFF21F] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FF8A00]" />
                    <span>{post.comments.length} Lời đối ẩm</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playButtonClick();
                    navigator.clipboard?.writeText?.(window.location.href);
                    showToast('Đã sao chép liên kết cuộn thư đàm đạo! ✨');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#8B5A2B] bg-[#FFF8DC] text-[#3B2414] hover:bg-[#FFF21F] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#FF8A00]" />
                  <span>Chia sẻ</span>
                </button>
              </div>

              {/* Comments Section */}
              {showComments && (
                <div className="mt-5 pt-4 border-t-2 border-[#8B5A2B]/20 space-y-4">
                  {post.comments.length > 0 ? (
                    <div className="space-y-3">
                      {post.comments.map((cm) => (
                        <div
                          key={cm.id}
                          className="flex gap-3 p-3.5 rounded-2xl bg-[#FFF8DC] border-2 border-[#8B5A2B]"
                        >
                          <div className="w-8 h-8 rounded-xl bg-[#FFF21F] border-2 border-[#8B5A2B] flex items-center justify-center text-base shrink-0">
                            {cm.authorAvatar}
                          </div>
                          <div className="flex-1 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-black text-[#3B2414]">
                                {cm.authorName}
                              </span>
                              <span className="text-[10px] font-bold text-[#8B5A2B]">{cm.createdAt}</span>
                            </div>
                            <p className="text-xs font-bold text-[#5C3A1E] leading-relaxed">
                              {cm.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-bold text-[#8B5A2B] italic text-center py-2">
                      Chưa có lời đối ẩm nào. Hãy là người đầu tiên nâng chén trà đàm đạo! 🍵
                    </p>
                  )}

                  {/* Comment Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendComment(post.id);
                      }}
                      placeholder="Gửi lời đối ẩm văn học của bạn..."
                      className="flex-1 px-4 py-2 rounded-2xl text-xs font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="btn-cartoon-yellow p-2.5 rounded-2xl"
                    >
                      <Send className="w-4 h-4 text-[#FF8A00]" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
