import React from 'react';
import { Book } from '../types';
import { useApp } from '../context/AppContext';
import { Bookmark, Star, Clock, BookOpen } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { openReader, toggleSaveBook, isBookSaved, userReadingProgress, setSelectedHashtag, setActiveTab } = useApp();

  const saved = isBookSaved(book.id);
  const progress = userReadingProgress[book.id];

  const handleHashtagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    soundEngine.playButtonClick();
    setSelectedHashtag(tag);
    setActiveTab('library');
  };

  return (
    <div
      id={`book-card-${book.id}`}
      onClick={() => {
        soundEngine.playButtonClick();
        openReader(book.id);
      }}
      className="group relative flex flex-col rounded-3xl bg-[#FFF8DC] border-3 border-[#8B5A2B] shadow-[0_6px_0_#5C3A1E,0_10px_20px_rgba(92,58,30,0.15)] hover:shadow-[0_10px_0_#5C3A1E,0_16px_25px_rgba(92,58,30,0.25)] hover:-translate-y-1.5 transition-all duration-200 overflow-hidden cursor-pointer select-none"
    >
      {/* Book Cover Container - Storybook 2D Cartoon Aesthetic */}
      <div
        className="relative h-64 w-full flex flex-col justify-between p-4 sm:p-5 border-b-3 border-[#8B5A2B] overflow-hidden"
        style={{
          backgroundColor: book.coverTheme.bg || '#FFF21F',
          color: book.coverTheme.text || '#3B2414',
        }}
      >
        {/* Book Spine 3D Effect on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/15 border-r border-black/20" />

        {/* Top bar on cover: Category pill & Bookmark button */}
        <div className="relative z-10 flex items-center justify-between pl-2">
          <span className="badge-game-gold text-[10px] font-black tracking-wide uppercase">
            {book.categoryLabel}
          </span>

          <button
            id={`btn-bookmark-${book.id}`}
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playButtonClick();
              toggleSaveBook(book.id);
            }}
            title={saved ? 'Bỏ lưu' : 'Lưu vào Tủ Sách'}
            className={`w-8 h-8 rounded-full border-2 border-[#8B5A2B] flex items-center justify-center transition-all duration-200 ${
              saved
                ? 'bg-[#FF8A00] text-white shadow-[0_2px_0_#8B5A2B]'
                : 'bg-[#FFF8DC] text-[#8B5A2B] hover:bg-[#FFF21F]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Center: Title & Author in Storybook Typography with Protective Semi-transparent Plaque */}
        <div className="relative z-10 my-auto text-center mx-1 px-3 py-2.5 rounded-2xl bg-[#FFF8DC]/95 border-2 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B]">
          <h3 className="font-literary text-base sm:text-lg font-black tracking-tight leading-snug line-clamp-2 text-[#3B2414]">
            {book.title}
          </h3>
          <div className="w-10 h-0.5 mx-auto my-1.5 rounded-full bg-[#8B5A2B]/40" />
          <p className="text-[11px] font-black uppercase tracking-wider text-[#8B5A2B] line-clamp-1">
            {book.author}
          </p>
        </div>

        {/* Bottom of Cover: Era & Grade Tag */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-black pl-2 opacity-85">
          <span className="px-2 py-0.5 rounded-md bg-white/80 border border-[#8B5A2B]/30 text-[#3B2414]">
            {book.curriculumGrade || 'Văn học THPT'}
          </span>
          <span className="text-[#3B2414] font-bold">{book.era.split('(')[0].trim()}</span>
        </div>

        {/* Reading progress ribbon if in progress */}
        {progress && progress.progressPercent > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#FFF8DC] border-t border-[#8B5A2B]">
            <div
              className="h-full bg-gradient-to-r from-[#FFF21F] to-[#FF8A00] transition-all duration-300"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3 bg-[#FFFEF2]">
        {/* Description */}
        <p className="text-xs sm:text-[13px] leading-relaxed text-[#5C3A1E] font-medium line-clamp-2">
          {book.description}
        </p>

        {/* Hashtags Chips */}
        {book.hashtags && book.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            {book.hashtags.slice(0, 3).map((tag, idx) => (
              <span
                key={tag}
                onClick={(e) => handleHashtagClick(e, tag)}
                className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border-2 border-[#8B5A2B] cursor-pointer hover:scale-105 transition-transform ${
                  idx % 3 === 0
                    ? 'bg-[#FFF21F] text-[#3B2414]'
                    : idx % 3 === 1
                    ? 'bg-[#39C95A] text-white'
                    : 'bg-[#39C6FF] text-white'
                }`}
                title={`Khám phá tác phẩm theo hashtag ${tag}`}
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
            {book.hashtags.length > 3 && (
              <span className="text-[10px] font-bold text-[#8B5A2B]">+{book.hashtags.length - 3}</span>
            )}
          </div>
        )}

        {/* Rating & Estimated Reading Time */}
        <div className="flex items-center justify-between text-xs font-bold text-[#8B5A2B] pt-2 border-t-2 border-[#8B5A2B]/20">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#FFC928] fill-[#FFC928]" />
            <span className="font-black text-[#3B2414]">{book.rating}</span>
            <span className="text-[11px] text-[#8B5A2B]">({book.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#FF8A00]" />
            <span>~{book.estimatedReadTimeMinutes} phút đọc</span>
          </div>
        </div>

        {/* Read Action Button */}
        <button
          id={`btn-read-${book.id}`}
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playButtonClick();
            openReader(book.id);
          }}
          className="btn-cartoon-yellow w-full mt-1 py-2.5 px-4 text-xs sm:text-sm font-black flex items-center justify-center gap-2 group-hover:bg-[#FFF21F]"
        >
          <BookOpen className="w-4 h-4 text-[#FF8A00]" />
          <span>
            {progress && progress.progressPercent > 0
              ? `Đọc tiếp (${progress.progressPercent}%)`
              : 'Khám phá tác phẩm'}
          </span>
        </button>
      </div>
    </div>
  );
};
