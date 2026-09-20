import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from './BookCard';
import {
  Search,
  BookOpen,
  SlidersHorizontal,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  Library as LibraryIcon,
  Tag,
  Sparkles
} from 'lucide-react';
import { MascotSeButHoa } from './CartoonMascots';
import { soundEngine } from '../utils/audio';

export const Library: React.FC = () => {
  const {
    books,
    shelves,
    searchQuery,
    setSearchQuery,
    selectedShelfId,
    setSelectedShelfId,
    selectedHashtag,
    setSelectedHashtag
  } = useApp();

  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'time'>('rating');
  const shelvesScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update scroll navigation cues
  const updateScrollButtons = () => {
    if (shelvesScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = shelvesScrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [shelves]);

  // Support mouse wheel horizontal scrolling
  useEffect(() => {
    const el = shelvesScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += e.deltaY;
        updateScrollButtons();
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const handleScrollShelves = (direction: 'left' | 'right') => {
    soundEngine.playButtonClick();
    if (shelvesScrollRef.current) {
      const scrollOffset = direction === 'left' ? -320 : 320;
      shelvesScrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 350);
    }
  };

  // Compute popular hashtags from all books
  const popularHashtags = useMemo(() => {
    const map = new Map<string, number>();
    books.forEach((b) => {
      (b.hashtags || []).forEach((tag) => {
        const clean = tag.startsWith('#') ? tag : `#${tag}`;
        map.set(clean, (map.get(clean) || 0) + 1);
      });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [books]);

  // Active selected shelf
  const activeShelf = useMemo(() => {
    if (!selectedShelfId) return null;
    return shelves.find((s) => s.id === selectedShelfId) || null;
  }, [shelves, selectedShelfId]);

  // Filter books according to search query, active shelf, and active hashtag
  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tagFilter = selectedHashtag ? selectedHashtag.toLowerCase() : null;

    return books
      .filter((book) => {
        // Shelf filter
        if (selectedShelfId) {
          const inShelf = (book.shelfIds || []).includes(selectedShelfId);
          if (!inShelf) return false;
        }

        // Hashtag filter
        if (tagFilter) {
          const hasTag = (book.hashtags || []).some((t) =>
            t.toLowerCase().includes(tagFilter) || tagFilter.includes(t.toLowerCase())
          );
          if (!hasTag) return false;
        }

        // Search query filter
        if (q) {
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchEra = (book.era || '').toLowerCase().includes(q);
          const matchDesc = (book.description || '').toLowerCase().includes(q);
          const matchTag = (book.hashtags || []).some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchAuthor && !matchEra && !matchDesc && !matchTag) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title, 'vi');
        if (sortBy === 'time') return a.estimatedReadTimeMinutes - b.estimatedReadTimeMinutes;
        return 0;
      });
  }, [books, selectedShelfId, selectedHashtag, searchQuery, sortBy]);

  // Sort shelves by order
  const sortedShelves = useMemo(() => {
    return [...shelves].sort((a, b) => a.order - b.order);
  }, [shelves]);

  const clearAllFilters = () => {
    soundEngine.playButtonClick();
    setSearchQuery('');
    setSelectedShelfId(null);
    setSelectedHashtag(null);
  };

  const isFiltering = !!searchQuery || !!selectedShelfId || !!selectedHashtag;

  return (
    <div id="library-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none relative">
      {/* 1. Header with Cartoon Wooden Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative">
        {/* Mascot Bird perching */}
        <div className="absolute -top-6 right-0 sm:right-10 hidden sm:block">
          <MascotSeButHoa size={75} speechText="Kệ sách phong phú lắm nè!" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414] text-xs font-black uppercase tracking-wider mb-3 shadow-[0_3px_0_#8B5A2B]">
          <LibraryIcon className="w-4 h-4 text-[#FF8A00]" />
          <span>THƯ VIỆN GỖ TRONG RỪNG NẮNG</span>
        </div>
        <h1 className="font-literary text-4xl sm:text-5xl font-black text-[#3B2414] mb-3 drop-shadow-xs">
          Các Kệ Sách Thần Kỳ
        </h1>
        <p className="text-sm sm:text-base font-bold text-[#5C3A1E] leading-relaxed">
          Mỗi giá sách là một góc tri thức được kiến tạo tỉ mỉ. Hãy chọn một tác phẩm yêu thích để đọc và nuôi dưỡng vườn hoa nhé!
        </p>
      </div>

      {/* 2. Search & Filter Parchment Scroll */}
      <div className="wood-signboard p-5 sm:p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input (Parchment look) */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5A2B]" />
            <input
              id="library-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên tác phẩm, tác giả hoặc #hashtag (#TruyenKieu)..."
              className="w-full pl-12 pr-10 py-3 rounded-2xl text-sm font-bold bg-[#FFFEF2] border-3 border-[#8B5A2B] text-[#3B2414] placeholder:text-[#8B5A2B]/60 focus:outline-none focus:border-[#FF8A00] shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center hover:bg-[#FF8A00]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
            <SlidersHorizontal className="w-5 h-5 text-[#8B5A2B]" />
            <select
              id="library-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FFFEF2] border-3 border-[#8B5A2B] text-xs sm:text-sm rounded-2xl px-4 py-3 font-black text-[#3B2414] focus:outline-none shadow-[0_3px_0_#8B5A2B]"
            >
              <option value="rating">Đánh giá cao nhất ⭐</option>
              <option value="title">Tên tác phẩm (A - Z) 📖</option>
              <option value="time">Thời lượng đọc ngắn nhất ⏱️</option>
            </select>
          </div>
        </div>

        {/* 3. Popular Hashtags Cloud */}
        <div className="mt-4 pt-4 border-t-2 border-[#8B5A2B]/30 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#8B5A2B] shrink-0 mr-1">
            <Tag className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>Hashtags nổi bật:</span>
          </div>

          {popularHashtags.map((tag, i) => {
            const isSelected = selectedHashtag?.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => {
                  soundEngine.playButtonClick();
                  setSelectedHashtag(isSelected ? null : tag);
                }}
                className={`px-3 py-1 rounded-full text-xs font-black transition-all flex items-center gap-1 border-2 border-[#8B5A2B] ${
                  isSelected
                    ? 'bg-[#FF8A00] text-white shadow-[0_2px_0_#8B5A2B] scale-105'
                    : i % 2 === 0
                    ? 'bg-[#FFF21F] text-[#3B2414] hover:bg-[#FFC928]'
                    : 'bg-[#39C95A] text-white hover:bg-[#16A34A]'
                }`}
              >
                <span>{tag}</span>
                {isSelected && <X className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Bookshelf Tabs Navigation Carousel */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FF8A00]" />
            <h2 className="text-base sm:text-lg font-black text-[#3B2414]">
              Kệ Sách Chuyên Đề (Bookshelves)
            </h2>
          </div>

          {selectedShelfId && (
            <button
              onClick={() => {
                soundEngine.playButtonClick();
                setSelectedShelfId(null);
              }}
              className="text-xs font-black text-[#FF8A00] hover:text-[#FF6B1A] flex items-center gap-1 bg-[#FFF8DC] px-3 py-1 rounded-xl border-2 border-[#8B5A2B] shadow-[0_2px_0_#8B5A2B]"
            >
              <span>Xem toàn bộ kệ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Shelf Tabs (Wooden Planks) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none">
          {/* "Tất cả kệ sách" */}
          <button
            onClick={() => {
              soundEngine.playButtonClick();
              setSelectedShelfId(null);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black shrink-0 transition-all flex items-center gap-2 border-3 border-[#8B5A2B] ${
              !selectedShelfId
                ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_4px_0_#8B5A2B] scale-105'
                : 'bg-[#FFF8DC] text-[#5C3A1E] hover:bg-[#FFFEF2]'
            }`}
          >
            <span>📚 Tất cả ({books.length})</span>
          </button>

          {/* Individual Shelves */}
          {sortedShelves.map((shelf) => {
            const isSelected = selectedShelfId === shelf.id;
            const count = books.filter((b) => (b.shelfIds || []).includes(shelf.id)).length;
            return (
              <button
                key={shelf.id}
                onClick={() => {
                  soundEngine.playButtonClick();
                  setSelectedShelfId(shelf.id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black shrink-0 transition-all flex items-center gap-2 border-3 border-[#8B5A2B] ${
                  isSelected
                    ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_4px_0_#8B5A2B] scale-105'
                    : 'bg-[#FFF8DC] text-[#5C3A1E] hover:bg-[#FFFEF2]'
                }`}
              >
                <span>{shelf.icon || '📖'}</span>
                <span>{shelf.name}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#8B5A2B] text-white">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Active Filters Banner */}
      {isFiltering && (
        <div className="flex items-center justify-between bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] rounded-2xl px-4 py-2.5 mb-6 text-xs text-[#3B2414]">
          <div className="flex items-center gap-2 flex-wrap font-black">
            <span>🔍 Đang lọc:</span>
            {activeShelf && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#FF8A00] text-white border-2 border-[#8B5A2B]">
                Kệ: {activeShelf.name}
                <button onClick={() => setSelectedShelfId(null)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedHashtag && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#39C95A] text-white border-2 border-[#14532D]">
                Hashtag: {selectedHashtag}
                <button onClick={() => setSelectedHashtag(null)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#FFFEF2] text-[#3B2414] border-2 border-[#8B5A2B]">
                Từ khóa: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            <span className="text-[11px] text-[#8B5A2B]">({filteredBooks.length} tác phẩm)</span>
          </div>

          <button
            onClick={clearAllFilters}
            className="text-xs font-black text-[#FF8A00] hover:text-[#FF6B1A] underline shrink-0 ml-2"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* 6. MAIN CONTENT: CARTOON BOOKSHELF DISPLAY */}
      {selectedShelfId || selectedHashtag || searchQuery ? (
        <div>
          {/* Active Shelf Title Card */}
          {activeShelf && !searchQuery && !selectedHashtag && (
            <div className="mb-6 p-6 rounded-3xl bg-[#FFF8DC] border-3 border-[#8B5A2B] shadow-[0_5px_0_#5C3A1E]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl p-2 rounded-2xl bg-[#FFF21F] border-2 border-[#8B5A2B]">
                  {activeShelf.icon || '📚'}
                </span>
                <div>
                  <h2 className="font-literary text-2xl sm:text-3xl font-black text-[#3B2414]">
                    {activeShelf.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-[#5C3A1E]">
                    {activeShelf.description || 'Tuyển tập các tác phẩm chọn lọc đặc sắc.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-3xl bg-[#FFF8DC] border-3 border-dashed border-[#8B5A2B] p-8">
              <BookOpen className="w-16 h-16 text-[#8B5A2B] mx-auto mb-3 animate-warm-float" />
              <h3 className="font-literary text-2xl font-black text-[#3B2414] mb-2">
                Không tìm thấy cuốn sách nào phù hợp! 🍂
              </h3>
              <p className="text-sm font-bold text-[#5C3A1E] mb-5">
                Hãy thử tìm kiếm với từ khóa khác hoặc bấm xóa bộ lọc nhé.
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-cartoon-primary px-6 py-3 text-xs font-black"
              >
                QUAY LẠI TOÀN BỘ THƯ VIỆN
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Default View: Large Wood Bookshelf Sections */
        <div className="space-y-12">
          {sortedShelves.map((shelf) => {
            const shelfBooks = books.filter((b) => (b.shelfIds || []).includes(shelf.id));
            if (shelfBooks.length === 0) return null;

            return (
              <section
                key={shelf.id}
                id={`bookshelf-section-${shelf.id}`}
                className="wood-signboard p-6 sm:p-8"
              >
                {/* Bookshelf Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b-3 border-[#8B5A2B]/30">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2.5 rounded-2xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B]">
                      {shelf.icon || '📚'}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-literary text-2xl sm:text-3xl font-black text-[#3B2414]">
                          {shelf.name}
                        </h3>
                        <span className="badge-game-gold text-xs">
                          {shelfBooks.length} tác phẩm
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#5C3A1E] mt-1">
                        {shelf.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playButtonClick();
                      setSelectedShelfId(shelf.id);
                    }}
                    className="btn-cartoon-yellow hidden sm:flex items-center gap-1.5 text-xs font-black px-4 py-2"
                  >
                    <span>Mở Kệ Này</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Books Grid on Shelf */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10 pb-6">
                  {shelfBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>

                {/* Visual Shelf Ledge (Heavy carved timber wood shelf beam) */}
                <div className="h-6 w-full rounded-2xl bg-gradient-to-r from-[#8B5A2B] via-[#A76D36] to-[#8B5A2B] border-3 border-[#5C3A1E] shadow-[0_6px_0_#3B2414] flex items-center justify-between px-6">
                  <div className="w-4 h-2 rounded-full bg-[#FFC928]/40" />
                  <div className="w-4 h-2 rounded-full bg-[#FFC928]/40" />
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
