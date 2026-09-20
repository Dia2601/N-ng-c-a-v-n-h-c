import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, BookOpen, Feather, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, books, openReader } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = books.filter((b) => {
    const q = query.trim().toLowerCase();
    if (!q) return false;
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.era.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    );
  });

  return (
    <div
      id="search-modal-backdrop"
      onClick={() => setIsSearchOpen(false)}
      className="fixed inset-0 z-50 bg-[#3B2414]/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 select-none animate-fade-in"
    >
      <div
        id="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#FFF8DC] border-4 border-[#8B5A2B] rounded-3xl shadow-[0_12px_0_#5C3A1E,0_20px_30px_rgba(0,0,0,0.3)] overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b-3 border-[#8B5A2B] bg-[#FFF21F] flex items-center gap-3">
          <Search className="w-6 h-6 text-[#FF8A00] stroke-[3] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm tác phẩm, tác giả (Truyện Kiều, Nam Cao, Hoàng Tử Bé)..."
            className="flex-1 bg-transparent text-sm sm:text-base font-black text-[#3B2414] placeholder-[#8B5A2B]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="px-2.5 py-1 rounded-xl bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] text-xs font-black"
            >
              Xóa
            </button>
          )}
          <button
            onClick={() => {
              soundEngine.playButtonClick();
              setIsSearchOpen(false);
            }}
            className="w-8 h-8 rounded-xl bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] hover:bg-[#FF5FA2] hover:text-white flex items-center justify-center font-black transition-colors"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          {query ? (
            results.length > 0 ? (
              results.map((book) => (
                <button
                  key={book.id}
                  onClick={() => {
                    soundEngine.playPageFlip();
                    setIsSearchOpen(false);
                    openReader(book.id);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-[#FFFEF2] hover:bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-11 h-14 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border-2 border-[#8B5A2B] shadow-xs"
                      style={{
                        backgroundColor: book.coverTheme.bg || '#FFF21F',
                        color: book.coverTheme.text || '#3B2414',
                      }}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-literary text-base font-black text-[#3B2414] group-hover:text-[#FF8A00] transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-xs font-bold text-[#8B5A2B]">
                        {book.author} • {book.categoryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-black text-[#FF8A00] group-hover:translate-x-1 transition-transform">
                    <span>Đọc ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-12 text-[#8B5A2B] text-sm font-bold">
                Không tìm thấy tác phẩm nào khớp với từ khóa “{query}” 🍂
              </div>
            )
          ) : (
            <div className="p-6 text-center text-xs text-[#8B5A2B]">
              <p className="font-black text-sm text-[#3B2414] mb-3">Gợi ý tìm kiếm phổ biến trong vườn:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Truyện Kiều', 'Chí Phèo', 'Lão Hạc', 'Hoàng Tử Bé', 'Nguyễn Du', 'Nam Cao'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        soundEngine.playButtonClick();
                        setQuery(tag);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#FFFEF2] text-[#3B2414] font-bold border-2 border-[#8B5A2B] hover:bg-[#FFF21F] shadow-[0_2px_0_#8B5A2B] transition-transform hover:scale-105"
                    >
                      {tag} 🌸
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
