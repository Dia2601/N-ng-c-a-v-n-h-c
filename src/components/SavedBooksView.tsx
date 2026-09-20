import React from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from './BookCard';
import { Bookmark, BookOpen, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { MascotMiuTho } from './CartoonMascots';

export const SavedBooksView: React.FC = () => {
  const { books, savedBookIds, setActiveTab } = useApp();

  const savedBooks = books.filter((book) => savedBookIds.includes(book.id));

  return (
    <div id="saved-books-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414] text-xs font-black uppercase tracking-wider mb-3 shadow-[0_3px_0_#8B5A2B]">
          <Bookmark className="w-4 h-4 text-[#FF8A00] fill-current" />
          <span>TỦ SÁCH GỖ MƠ MỘNG HOẠT HÌNH</span>
        </div>
        <h1 className="font-literary text-4xl sm:text-5xl font-black text-[#3B2414] mb-2 drop-shadow-xs">
          Tác Phẩm Đã Lưu
        </h1>
        <p className="text-sm sm:text-base font-bold text-[#5C3A1E] leading-relaxed">
          Nơi cất giữ những trang sách gối đầu giường được kẹp dải ruy-băng hồng xinh xắn.
        </p>
      </div>

      {/* 2. Book List or Empty State */}
      {savedBooks.length > 0 ? (
        <div>
          <div className="flex items-center justify-between text-xs font-black text-[#8B5A2B] mb-6 px-2">
            <span className="badge-game-gold text-xs">Bạn đang lưu {savedBooks.length} tác phẩm yêu thích 📖</span>
            <button
              onClick={() => {
                soundEngine.playButtonClick();
                setActiveTab('library');
              }}
              className="text-[#FF8A00] hover:underline font-black flex items-center gap-1"
            >
              <span>+ Tìm thêm sách trong Thư Viện Cây</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="storybook-card p-10 sm:p-14 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_5px_0_#8B5A2B] text-[#FF8A00] flex items-center justify-center mx-auto mb-4 animate-warm-float">
            <Bookmark className="w-10 h-10 fill-current" />
          </div>

          <h3 className="font-literary text-2xl font-black text-[#3B2414] mb-2">
            Tủ Sách Đang Chờ Đón Bạn
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#5C3A1E] mb-6 leading-relaxed">
            Bạn chưa lưu tác phẩm nào. Hãy dạo bước qua Thư Viện Trên Cây và nhấn vào chiếc kẹp sách ruy-băng trên từng cuốn để mang về tủ nhé!
          </p>

          <button
            id="btn-explore-library-from-saved"
            onClick={() => {
              soundEngine.playButtonClick();
              setActiveTab('library');
            }}
            className="btn-cartoon-primary px-8 py-3.5 text-xs sm:text-sm font-black inline-flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>KHÁM PHÁ THƯ VIỆN NGAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
