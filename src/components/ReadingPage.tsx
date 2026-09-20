import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { AIChatDrawer } from './AIChatDrawer';
import { BookIntroduction, AuthorBiography } from '../types';
import {
  ArrowLeft,
  Bookmark,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Type,
  Share2,
  ExternalLink,
  User,
  FileText,
  Globe,
  Star,
  CheckCircle2,
  Award,
  BookMarked,
  Lightbulb,
  Hash,
  Droplets
} from 'lucide-react';
import { MascotMiuTho, MascotFlyingBook } from './CartoonMascots';
import { soundEngine } from '../utils/audio';

export const ReadingPage: React.FC = () => {
  const {
    selectedBook,
    closeReader,
    toggleSaveBook,
    isBookSaved,
    userReadingProgress,
    updateReadingActivity,
    currentUser,
    setSelectedHashtag,
    setActiveTab,
    showToast
  } = useApp();

  const [activeTabKey, setActiveTabKey] = useState<'intro' | 'author' | 'online' | 'read'>('intro');
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [readingSeconds, setReadingSeconds] = useState<number>(0);
  const timerRef = useRef<any>(null);

  // Resume at current chapter if user had previous progress
  useEffect(() => {
    if (selectedBook && currentUser) {
      const prog = userReadingProgress[selectedBook.id];
      if (prog && prog.currentChapterId) {
        const foundIdx = selectedBook.chapters.findIndex((c) => c.id === prog.currentChapterId);
        if (foundIdx !== -1) {
          setCurrentChapterIndex(foundIdx);
        }
      }
    }
  }, [selectedBook?.id]);

  // Track active reading time only when on direct read tab
  useEffect(() => {
    if (activeTabKey === 'read') {
      timerRef.current = setInterval(() => {
        setReadingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTabKey]);

  // Save reading activity every 60 seconds
  useEffect(() => {
    if (readingSeconds > 0 && readingSeconds % 60 === 0 && selectedBook && activeTabKey === 'read') {
      const minutesSpent = 1;
      const currentChap = selectedBook.chapters[currentChapterIndex] || selectedBook.chapters[0];
      if (currentChap) {
        const percent = Math.round(((currentChapterIndex + 1) / selectedBook.chapters.length) * 100);
        updateReadingActivity(selectedBook.id, currentChap.id, percent, minutesSpent);
        soundEngine.playWater();
        showToast('💧 Bạn vừa nhận thêm 1 Giọt Tri Thức từ trang sách!');
      }
    }
  }, [readingSeconds, activeTabKey]);

  if (!selectedBook) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center select-none">
        <BookOpen className="w-16 h-16 text-[#8B5A2B] mx-auto mb-4 animate-warm-float" />
        <h2 className="font-literary text-3xl font-black text-[#3B2414] mb-4">
          Chưa chọn tác phẩm nào! 🍂
        </h2>
        <button
          onClick={closeReader}
          className="btn-cartoon-primary px-6 py-3 text-xs font-black"
        >
          QUAY LẠI THƯ VIỆN
        </button>
      </div>
    );
  }

  const chapters = selectedBook.chapters || [];
  const currentChapter = chapters[currentChapterIndex] || chapters[0];
  const progressPercent = chapters.length > 0
    ? Math.round(((currentChapterIndex + 1) / chapters.length) * 100)
    : 0;
  const saved = isBookSaved(selectedBook.id);

  const goToPrevChapter = () => {
    if (currentChapterIndex > 0) {
      soundEngine.playPageFlip();
      const nextIdx = currentChapterIndex - 1;
      setCurrentChapterIndex(nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const percent = Math.round(((nextIdx + 1) / chapters.length) * 100);
      updateReadingActivity(selectedBook.id, chapters[nextIdx].id, percent, 0);
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      soundEngine.playPageFlip();
      const nextIdx = currentChapterIndex + 1;
      setCurrentChapterIndex(nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const percent = Math.round(((nextIdx + 1) / chapters.length) * 100);
      updateReadingActivity(selectedBook.id, chapters[nextIdx].id, percent, 1);
    } else {
      soundEngine.playLevelUp();
      updateReadingActivity(selectedBook.id, currentChapter.id, 100, 2);
      showToast(`🎉 Chúc mừng bạn đã hoàn thành trọn vẹn tác phẩm "${selectedBook.title}"!`);
    }
  };

  const handleShare = () => {
    soundEngine.playButtonClick();
    navigator.clipboard?.writeText?.(window.location.href);
    showToast('Đã sao chép liên kết tác phẩm để chia sẻ cùng bạn bè! ✨');
  };

  const handleHashtagClick = (tag: string) => {
    soundEngine.playButtonClick();
    setSelectedHashtag(tag);
    closeReader();
    setActiveTab('library');
  };

  const fontSizeClasses = {
    normal: 'text-base sm:text-lg leading-[1.9]',
    large: 'text-lg sm:text-xl leading-[2.0]',
    larger: 'text-xl sm:text-2xl leading-[2.1]',
  };

  // Safe extraction for introduction & authorBio
  const introObj: BookIntroduction = typeof selectedBook.introduction === 'object' && selectedBook.introduction !== null
    ? selectedBook.introduction
    : { summary: typeof selectedBook.introduction === 'string' ? selectedBook.introduction : selectedBook.description };

  const authorBioObj: AuthorBiography = typeof selectedBook.authorBio === 'object' && selectedBook.authorBio !== null
    ? selectedBook.authorBio
    : { shortBio: typeof selectedBook.authorBio === 'string' ? selectedBook.authorBio : '' };

  const onlineSources = selectedBook.onlineSources || [];

  return (
    <div id="reading-view" className="min-h-screen pb-24 select-none">
      {/* 1. Top Storybook Reading Toolbar */}
      <nav className="sticky top-0 z-30 bg-[#FFF8DC] border-b-3 border-[#8B5A2B] shadow-[0_4px_0_#5C3A1E] px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            id="btn-reading-back"
            onClick={() => {
              soundEngine.playButtonClick();
              closeReader();
            }}
            className="btn-cartoon-yellow px-3.5 py-1.5 text-xs font-black flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF8A00]" />
            <span className="hidden sm:inline">Về Thư Viện</span>
          </button>
          <div className="h-6 w-0.5 bg-[#8B5A2B]/40 hidden sm:block" />
          <div className="max-w-[200px] sm:max-w-md truncate">
            <span className="font-literary text-base sm:text-lg font-black text-[#3B2414]">
              {selectedBook.title}
            </span>
            <span className="text-xs font-bold text-[#FF8A00] hidden md:inline ml-2">
              — {selectedBook.author}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            id="btn-reading-bookmark"
            onClick={() => {
              soundEngine.playButtonClick();
              toggleSaveBook(selectedBook.id);
            }}
            title={saved ? 'Đã lưu trong Tủ Sách' : 'Lưu tác phẩm'}
            className={`p-2 rounded-xl border-2 border-[#8B5A2B] transition-all ${
              saved
                ? 'bg-[#FF8A00] text-white shadow-[0_2px_0_#8B5A2B]'
                : 'bg-[#FFF8DC] text-[#8B5A2B] hover:bg-[#FFF21F]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>

          {/* Share Button */}
          <button
            id="btn-reading-share"
            onClick={handleShare}
            title="Chia sẻ tác phẩm"
            className="p-2 rounded-xl border-2 border-[#8B5A2B] bg-[#FFF8DC] text-[#8B5A2B] hover:bg-[#FFF21F] transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* AI Literary Assistant Trigger */}
          <button
            id="btn-toggle-ai-assistant"
            onClick={() => {
              soundEngine.playButtonClick();
              setIsAIOpen((prev) => !prev);
            }}
            className="btn-cartoon-yellow px-3.5 py-1.5 text-xs font-black flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#FF8A00]" />
            <span className="hidden sm:inline">HỎI AI VĂN HỌC</span>
          </button>
        </div>
      </nav>

      {/* 2. Book Detail Hero Banner (Grand Storybook Opening) */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#8B5A2B] bg-[#FFF8DC]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* 3D Storybook Cover with Bookmark Ribbon */}
          <div
            className="w-38 sm:w-44 h-56 sm:h-64 rounded-3xl p-4 flex flex-col justify-between shrink-0 shadow-[0_8px_0_#5C3A1E] border-3 border-[#8B5A2B] relative overflow-hidden"
            style={{
              backgroundColor: selectedBook.coverTheme.bg || '#FFF21F',
              color: selectedBook.coverTheme.text || '#3B2414',
            }}
          >
            {/* Bookmark Ribbon */}
            <div className="absolute top-0 right-4 w-4 h-9 bg-[#FF5FA2] border-b-4 border-b-transparent border-x-8 border-x-[#FF5FA2] z-10" />

            <div className="badge-game-gold text-[10px] w-fit">
              {selectedBook.curriculumGrade || 'Ngữ văn THPT'}
            </div>
            <div className="text-center my-auto">
              <h2 className="font-literary text-xl font-black leading-snug line-clamp-3">
                {selectedBook.title}
              </h2>
              <div className="w-8 h-1 bg-[#8B5A2B]/40 mx-auto my-2 rounded-full" />
              <p className="text-xs uppercase font-black opacity-90">{selectedBook.author}</p>
            </div>
            <div className="text-[10px] font-bold opacity-80 text-right">{selectedBook.era}</div>
          </div>

          {/* Book Meta Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="badge-game-gold text-xs">
                {selectedBook.categoryLabel}
              </span>
              <span className="text-xs font-bold text-[#8B5A2B]">
                Thời kỳ: {selectedBook.era}
              </span>
              <span className="text-xs font-bold text-[#8B5A2B] flex items-center gap-1">
                <Star className="w-4 h-4 text-[#FFC928] fill-[#FFC928]" />
                <span className="font-black text-[#3B2414]">{selectedBook.rating}</span>
                <span>({selectedBook.reviewCount} nhận xét)</span>
              </span>
            </div>

            <h1 className="font-literary text-3xl sm:text-4xl font-black text-[#3B2414] mb-2 leading-tight">
              {selectedBook.title}
            </h1>
            <p className="text-base font-bold text-[#FF8A00] mb-3">
              Tác giả: <span className="text-[#3B2414]">{selectedBook.author}</span>
            </p>

            <p className="text-xs sm:text-sm text-[#5C3A1E] font-medium leading-relaxed mb-4 max-w-2xl">
              {selectedBook.description}
            </p>

            {/* Hashtags */}
            {selectedBook.hashtags && selectedBook.hashtags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mb-4">
                <Hash className="w-4 h-4 text-[#FF8A00]" />
                {selectedBook.hashtags.map((tag, idx) => (
                  <button
                    key={tag}
                    onClick={() => handleHashtagClick(tag)}
                    className={`text-xs font-black px-3 py-0.5 rounded-full border-2 border-[#8B5A2B] transition-transform hover:scale-105 ${
                      idx % 2 === 0 ? 'bg-[#FFF21F] text-[#3B2414]' : 'bg-[#39C95A] text-white'
                    }`}
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. 4-Tab Navigation Carousel (Wooden Planks) */}
      <div className="sticky top-18 z-20 bg-[#FFF8DC] border-b-3 border-[#8B5A2B] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-center sm:justify-start gap-2 overflow-x-auto py-2.5 scrollbar-none">
          <button
            id="tab-book-intro"
            onClick={() => {
              soundEngine.playButtonClick();
              setActiveTabKey('intro');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-2 border-[#8B5A2B] ${
              activeTabKey === 'intro'
                ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_3px_0_#8B5A2B] scale-105'
                : 'bg-[#FFFEF2] text-[#5C3A1E] hover:bg-[#FFF8DC]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#FF8A00]" />
            <span>Phần 1: Giới Thiệu</span>
          </button>

          <button
            id="tab-book-author"
            onClick={() => {
              soundEngine.playButtonClick();
              setActiveTabKey('author');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-2 border-[#8B5A2B] ${
              activeTabKey === 'author'
                ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_3px_0_#8B5A2B] scale-105'
                : 'bg-[#FFFEF2] text-[#5C3A1E] hover:bg-[#FFF8DC]'
            }`}
          >
            <User className="w-4 h-4 text-[#16A34A]" />
            <span>Phần 2: Tác Giả</span>
          </button>

          <button
            id="tab-book-online"
            onClick={() => {
              soundEngine.playButtonClick();
              setActiveTabKey('online');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-2 border-[#8B5A2B] ${
              activeTabKey === 'online'
                ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_3px_0_#8B5A2B] scale-105'
                : 'bg-[#FFFEF2] text-[#5C3A1E] hover:bg-[#FFF8DC]'
            }`}
          >
            <Globe className="w-4 h-4 text-[#168CFF]" />
            <span>Phần 3: Đọc Online ({onlineSources.length})</span>
          </button>

          {chapters.length > 0 && (
            <button
              id="tab-book-read-direct"
              onClick={() => {
                soundEngine.playButtonClick();
                setActiveTabKey('read');
              }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-2 border-[#8B5A2B] ${
                activeTabKey === 'read'
                  ? 'bg-[#FF8A00] text-white shadow-[0_3px_0_#5C3A1E] scale-105'
                  : 'bg-[#FFF21F] text-[#3B2414] hover:bg-[#FFC928]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-white" />
              <span>Đọc Trực Tiếp ({chapters.length} chương)</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Tab Content Container (Parchment Open Book) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================================================== */}
        {/* PHẦN 1: GIỚI THIỆU TÁC PHẨM                         */}
        {/* ================================================== */}
        {activeTabKey === 'intro' && (
          <div className="space-y-6">
            {/* Hoàn cảnh sáng tác */}
            <section className="storybook-card p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="p-2 rounded-xl bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414]">
                  <Clock className="w-4 h-4 text-[#FF8A00]" />
                </span>
                <h3 className="font-literary text-xl font-black text-[#3B2414]">
                  1. Hoàn cảnh sáng tác
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-[#5C3A1E] whitespace-pre-line">
                {introObj.historicalContext || 'Tác phẩm ra đời trong bối cảnh lịch sử và văn hóa đặc biệt, phản ánh chân thực hiện thực thời đại.'}
              </p>
            </section>

            {/* Chủ đề */}
            <section className="storybook-card p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="p-2 rounded-xl bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414]">
                  <BookMarked className="w-4 h-4 text-[#FF8A00]" />
                </span>
                <h3 className="font-literary text-xl font-black text-[#3B2414]">
                  2. Chủ đề tư tưởng
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-[#5C3A1E] whitespace-pre-line">
                {introObj.theme || 'Khám phá số phận con người, ca ngợi những vẻ đẹp tâm hồn cao khiết và khát vọng sống chân chính.'}
              </p>
            </section>

            {/* Tóm tắt nội dung khái quát */}
            <section className="storybook-card p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="p-2 rounded-xl bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414]">
                  <FileText className="w-4 h-4 text-[#FF8A00]" />
                </span>
                <h3 className="font-literary text-xl font-black text-[#3B2414]">
                  3. Tóm tắt nội dung khái quát
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-[#5C3A1E] whitespace-pre-line">
                {introObj.summary || selectedBook.description}
              </p>
            </section>

            {/* Giá trị hiện thực & Giá trị nhân đạo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="storybook-card p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="p-2 rounded-xl bg-[#FFF21F] text-[#3B2414] border-2 border-[#8B5A2B]">
                    <Award className="w-4 h-4 text-[#FF8A00]" />
                  </span>
                  <h3 className="font-literary text-lg font-black text-[#3B2414]">
                    4. Giá trị hiện thực
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#5C3A1E]">
                  {introObj.realisticValue || 'Phản ánh bức tranh xã hội chân thực, sâu sắc với những mâu thuẫn giai cấp và kiếp người cơ cực.'}
                </p>
              </section>

              <section className="storybook-card p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="p-2 rounded-xl bg-[#39C95A] text-white border-2 border-[#14532D]">
                    <Award className="w-4 h-4 text-[#FFF21F]" />
                  </span>
                  <h3 className="font-literary text-lg font-black text-[#14532D]">
                    5. Giá trị nhân đạo
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#14532D]">
                  {introObj.humanisticValue || 'Thấu hiểu, cảm thông với nỗi đau khổ của nhân vật, trân trọng khát vọng hướng thiện và hạnh phúc.'}
                </p>
              </section>
            </div>

            {/* Những điểm đáng chú ý khi đọc / khi làm bài thi */}
            <section className="wood-signboard p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="p-2 rounded-xl bg-[#FFF21F] text-[#3B2414] border-2 border-[#8B5A2B]">
                  <Lightbulb className="w-5 h-5 text-[#FF8A00]" />
                </span>
                <h3 className="font-literary text-xl font-black text-[#3B2414]">
                  6. Những điểm cần nhớ khi làm bài thi THPT
                </h3>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFFEF2] border-2 border-[#8B5A2B] text-xs sm:text-sm font-bold leading-relaxed text-[#5C3A1E] whitespace-pre-line">
                {introObj.examNotes || 'Chú ý nghệ thuật xây dựng nhân vật, phân tích diễn biến tâm lý và các chi tiết nghệ thuật đắt giá.'}
              </div>
            </section>
          </div>
        )}

        {/* ================================================== */}
        {/* PHẦN 2: TÁC GIẢ                                     */}
        {/* ================================================== */}
        {activeTabKey === 'author' && (
          <div className="space-y-6">
            <div className="storybook-card p-6 flex items-center gap-4">
              <span className="text-4xl p-3 rounded-2xl bg-[#FFF21F] border-2 border-[#8B5A2B]">
                ✍️
              </span>
              <div>
                <h2 className="font-literary text-2xl font-black text-[#3B2414]">
                  {selectedBook.author}
                </h2>
                <p className="text-xs font-bold text-[#FF8A00]">
                  Gương mặt tiêu biểu của nền văn học thời kỳ: {selectedBook.era}
                </p>
              </div>
            </div>

            {/* Tiểu sử */}
            <section className="storybook-card p-6">
              <h3 className="font-literary text-xl font-black text-[#3B2414] mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF8A00]" />
                <span>1. Tiểu sử ngắn gọn</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-[#5C3A1E] whitespace-pre-line">
                {authorBioObj.shortBio || `Nhà văn, nhà thơ ${selectedBook.author} đã có những đóng góp xuất sắc cho nền văn học Việt Nam.`}
              </p>
            </section>

            {/* Phong cách nghệ thuật */}
            <section className="storybook-card p-6">
              <h3 className="font-literary text-xl font-black text-[#3B2414] mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#39C95A]" />
                <span>2. Phong cách nghệ thuật</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-[#5C3A1E] whitespace-pre-line">
                {authorBioObj.artisticStyle || 'Phong cách văn chương độc đáo, điêu luyện về ngôn từ và tài hoa trong nghệ thuật khắc họa tâm lý.'}
              </p>
            </section>

            {/* Vị trí tác phẩm */}
            <section className="storybook-card p-6">
              <h3 className="font-literary text-xl font-black text-[#3B2414] mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#39C6FF]" />
                <span>3. Vị trí của tác phẩm trong sự nghiệp</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-[#5C3A1E] whitespace-pre-line">
                {authorBioObj.workSignificance || `"${selectedBook.title}" đánh dấu đỉnh cao sáng tạo và khẳng định phong cách nghệ thuật của ${selectedBook.author}.`}
              </p>
            </section>
          </div>
        )}

        {/* ================================================== */}
        {/* PHẦN 3: ĐỌC ONLINE                                  */}
        {/* ================================================== */}
        {activeTabKey === 'online' && (
          <div className="space-y-6">
            <div className="storybook-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl p-2 rounded-2xl bg-[#39C6FF] border-2 border-[#168CFF] text-white">
                  🌐
                </span>
                <div>
                  <h3 className="font-literary text-2xl font-black text-[#3B2414]">
                    Nguồn Đọc Trực Tuyến Chính Thống
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#5C3A1E]">
                    Các nguồn số hóa văn học chuẩn mực phục vụ học tập THPT.
                  </p>
                </div>
              </div>

              {onlineSources.length > 0 ? (
                <div className="space-y-4 mt-6">
                  {onlineSources.map((source, index) => (
                    <div
                      key={source.id || index}
                      className="p-5 rounded-2xl bg-[#FFFEF2] border-3 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="badge-game-gold text-[10px]">
                            Nguồn {index + 1}
                          </span>
                          <h4 className="font-black text-base text-[#3B2414]">
                            {source.sourceName}
                          </h4>
                        </div>
                        {(source.note || source.description) && (
                          <p className="text-xs font-bold text-[#5C3A1E] mt-1">
                            {source.note || source.description}
                          </p>
                        )}
                        <p className="text-[11px] text-[#8B5A2B] truncate mt-1">
                          {source.url}
                        </p>
                      </div>

                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cartoon-primary px-5 py-2.5 text-xs font-black flex items-center justify-center gap-2 shrink-0"
                      >
                        <span>Đọc tại nguồn này</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Globe className="w-12 h-12 text-[#8B5A2B] mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-bold text-[#5C3A1E]">Chưa có liên kết đọc online cho tác phẩm này.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* PHẦN 4: ĐỌC TRỰC TIẾP (STORYBOOK READING DESK)     */}
        {/* ================================================== */}
        {activeTabKey === 'read' && chapters.length > 0 && (
          <div className="space-y-6">
            {/* Reading Toolbar (Wooden shelf style) */}
            <div className="wood-signboard p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs font-black text-[#3B2414]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#FF8A00]" />
                  <span>Thời gian đọc: {Math.floor(readingSeconds / 60)}p {readingSeconds % 60}s</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#39C95A]" />
                  <span>Chương {currentChapterIndex + 1}/{chapters.length} ({progressPercent}%)</span>
                </div>
              </div>

              {/* Font Size Adjuster */}
              <button
                id="btn-toggle-fontsize"
                onClick={() =>
                  setFontSize((prev) =>
                    prev === 'normal' ? 'large' : prev === 'large' ? 'larger' : 'normal'
                  )
                }
                className="btn-cartoon-yellow px-3 py-1.5 text-xs font-black flex items-center gap-1.5"
              >
                <Type className="w-3.5 h-3.5" />
                <span>
                  Cỡ chữ: {fontSize === 'normal' ? 'Chuẩn' : fontSize === 'large' ? 'Lớn' : 'Rất lớn'}
                </span>
              </button>
            </div>

            {/* Chapter Selection Pills */}
            {chapters.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {chapters.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => {
                      soundEngine.playPageFlip();
                      setCurrentChapterIndex(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 rounded-2xl text-xs font-black shrink-0 transition-all border-2 border-[#8B5A2B] ${
                      idx === currentChapterIndex
                        ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_3px_0_#8B5A2B]'
                        : 'bg-[#FFF8DC] text-[#5C3A1E] hover:bg-[#FFFEF2]'
                    }`}
                  >
                    {chap.title}
                  </button>
                ))}
              </div>
            )}

            {/* Grand Open Storybook Page */}
            <article className="p-8 sm:p-12 rounded-3xl bg-[#FFF8DC] border-4 border-[#8B5A2B] shadow-[0_8px_0_#5C3A1E,0_16px_25px_rgba(92,58,30,0.2)] relative">
              {/* Little mascot cheering at the corner */}
              <div className="absolute top-4 right-4 hidden sm:block">
                <MascotMiuTho size={70} speechText="Đọc thật sâu lắng nhé! 🐾" />
              </div>

              <h2 className="font-literary text-2xl sm:text-3xl font-black text-[#3B2414] mb-6 pb-4 border-b-3 border-[#8B5A2B]/30 max-w-xl">
                {currentChapter.title}
              </h2>

              <div
                className={`font-literary text-[#3B2414] whitespace-pre-line tracking-normal ${fontSizeClasses[fontSize]}`}
              >
                {currentChapter.content}
              </div>

              {/* Navigation at bottom of page */}
              <div className="mt-12 pt-6 border-t-3 border-[#8B5A2B]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-black text-[#16A34A]">
                  <Droplets className="w-4 h-4 fill-[#39C6FF] text-[#168CFF]" />
                  <span>Mỗi 60 giây đọc tích lũy thêm 1 Giọt Tri Thức 💧!</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={goToPrevChapter}
                    disabled={currentChapterIndex === 0}
                    className="btn-cartoon-yellow px-4 py-2 text-xs font-black disabled:opacity-40 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Chương trước</span>
                  </button>

                  <button
                    onClick={goToNextChapter}
                    className="btn-cartoon-primary px-5 py-2 text-xs font-black flex items-center gap-1.5"
                  >
                    <span>
                      {currentChapterIndex === chapters.length - 1 ? 'HOÀN THÀNH TÁC PHẨM' : 'CHƯƠNG TIẾP THEO'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}
      </main>

      {/* Floating AI Literary Assistant Drawer */}
      <AIChatDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        book={selectedBook}
        currentChapter={currentChapter}
      />
    </div>
  );
};
