import React from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from './BookCard';
import { SunlitGardenBackground } from './SunlitGardenBackground';
import {
  MascotMiuTho,
  MascotMamTriThuc,
  MascotSeButHoa,
  MascotFlyingBook
} from './CartoonMascots';
import {
  Feather,
  Clock,
  Sprout,
  ArrowRight,
  BookOpen,
  Sparkles,
  Droplets,
  Award,
  Flower2,
  Bookmark
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Home: React.FC = () => {
  const {
    currentUser,
    setActiveTab,
    books,
    openReader,
    userReadingProgress,
    activePot
  } = useApp();

  // Find book being read by current user
  const readingBookIds = Object.keys(userReadingProgress || {}).filter(
    (id) => (userReadingProgress[id]?.progressPercent || 0) > 0
  );

  // If user has read books, sort by lastReadAt
  const currentReadingEntry = readingBookIds
    .map((id) => ({
      book: (books || []).find((b) => b.id === id),
      progress: userReadingProgress[id],
    }))
    .filter((entry): entry is { book: NonNullable<typeof entry.book>; progress: NonNullable<typeof entry.progress> } => !!entry.book && !!entry.progress)
    .sort(
      (a, b) =>
        new Date(b.progress.lastReadAt || 0).getTime() -
        new Date(a.progress.lastReadAt || 0).getTime()
    )[0];

  // Curated featured books
  const featuredBooks = (books || []).filter((b) => b.featured).slice(0, 4);

  return (
    <div id="home-view" className="w-full relative select-none">
      {/* ================================================== */}
      {/* 1. HERO SECTION: SUNLIT STORYBOOK GARDEN WORLD     */}
      {/* ================================================== */}
      <section className="relative overflow-hidden min-h-[580px] sm:min-h-[660px] flex flex-col justify-between pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#8B5A2B]">
        {/* Layered Cartoon Sunlit Garden Background */}
        <SunlitGardenBackground showStorybookLibrary={true} />

        <div className="max-w-5xl mx-auto w-full text-center relative z-10 my-auto">
          {/* Top Fantasy Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] text-[#3B2414] text-xs sm:text-sm font-black mb-5 animate-warm-float">
            <Sparkles className="w-4 h-4 text-[#FF8A00]" />
            <span>KHU VƯỜN ĐỌC SÁCH THẦN KỲ DÀNH CHO HỌC SINH THPT</span>
            <Sparkles className="w-4 h-4 text-[#FF8A00]" />
          </div>

          {/* Big Cartoon Storybook Title */}
          <h1 className="font-literary text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#FFF21F] drop-shadow-[0_5px_0_#8B5A2B] [-webkit-text-stroke:3px_#8B5A2B] leading-[1.1] mb-5">
            NẮNG CỦA VĂN HỌC
          </h1>

          {/* Whimsical 3-line Slogan */}
          <div className="max-w-2xl mx-auto mb-8 bg-[#FFF8DC]/90 backdrop-blur-xs border-3 border-[#8B5A2B] rounded-3xl p-4 sm:p-5 shadow-[0_6px_0_#5C3A1E]">
            <p className="font-literary text-lg sm:text-2xl font-black text-[#3B2414] leading-relaxed">
              “Đọc một trang sách. Trồng một khu vườn. Khám phá một thế giới.”
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#FF8A00] mt-1">
              Nuôi dưỡng tâm hồn qua từng trang văn học tinh hoa
            </p>
          </div>

          {/* Main Action Buttons (Chunky 2D Game Style) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 relative">
            <button
              id="btn-hero-explore-library"
              onClick={() => {
                soundEngine.playButtonClick();
                setActiveTab('library');
              }}
              className="btn-cartoon-primary px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-black tracking-wide flex items-center gap-3 hover:scale-105"
            >
              <BookOpen className="w-6 h-6 text-white" />
              <span>BẮT ĐẦU KHÁM PHÁ</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            <button
              id="btn-hero-view-garden"
              onClick={() => {
                soundEngine.playButtonClick();
                setActiveTab('garden');
              }}
              className="btn-cartoon-green px-7 sm:px-8 py-4 text-sm sm:text-base font-black flex items-center gap-2.5 hover:scale-105"
            >
              <Flower2 className="w-5 h-5 text-[#FFF21F]" />
              <span>KHU VƯỜN TRI THỨC</span>
            </button>
          </div>

          {/* Mascots Peeking from Bottom of Hero */}
          <div className="flex items-end justify-between max-w-4xl mx-auto px-4 mt-8 sm:mt-10 pointer-events-auto">
            {/* Mascot Miu Thơ on the left */}
            <div className="hidden sm:block">
              <MascotMiuTho
                size={110}
                speechText="Cậu ơi, vào thư viện đọc sách cùng Miu nhé! 🐾"
              />
            </div>

            {/* Flying Book in center */}
            <div className="hidden md:block">
              <MascotFlyingBook size={65} />
            </div>

            {/* Mascot Mầm Tri Thức on the right */}
            <div className="hidden sm:block">
              <MascotMamTriThuc
                size={95}
                speechText="Mỗi phút đọc là một giọt sương tưới hoa! 🌱"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. WOODEN SIGNBOARD STATS (BẢNG THỐNG KÊ GỖ KHU VƯỜN) */}
      {/* ================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div className="wood-signboard p-5 sm:p-7">
          {/* Decorative wooden studs at corners */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-[#8B5A2B] border border-[#FFC928]" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-[#8B5A2B] border border-[#FFC928]" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-[#8B5A2B] border border-[#FFC928]" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-[#8B5A2B] border border-[#FFC928]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-center">
            {/* Stat 1: Ngòi Bút ✒️ */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FFFEF2] border-3 border-[#FFC928] shadow-[0_4px_0_#8B5A2B]">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF21F] border-2 border-[#8B5A2B] flex items-center justify-center text-[#FF8A00] shrink-0">
                <Feather className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black font-literary text-[#3B2414]">
                  {currentUser ? currentUser.points : 0} ngòi bút
                </span>
                <p className="text-xs font-bold text-[#8B5A2B]">
                  Điểm thưởng văn học
                </p>
              </div>
            </div>

            {/* Stat 2: Giọt Tri Thức 💧 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FFFEF2] border-3 border-[#39C6FF] shadow-[0_4px_0_#168CFF]">
              <div className="w-12 h-12 rounded-2xl bg-[#39C6FF] border-2 border-[#168CFF] flex items-center justify-center text-white shrink-0">
                <Droplets className="w-6 h-6 fill-white" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black font-literary text-[#3B2414]">
                  {currentUser ? currentUser.knowledgeDrops : 0} giọt nước
                </span>
                <p className="text-xs font-bold text-[#168CFF]">
                  Nước tưới vườn cây
                </p>
              </div>
            </div>

            {/* Stat 3: Thời Gian Đọc ⏰ */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FFFEF2] border-3 border-[#FF8A00] shadow-[0_4px_0_#8B5A2B]">
              <div className="w-12 h-12 rounded-2xl bg-[#FF8A00] border-2 border-[#8B5A2B] flex items-center justify-center text-white shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black font-literary text-[#3B2414]">
                  {currentUser ? currentUser.readingMinutesToday : 0} phút
                </span>
                <p className="text-xs font-bold text-[#FF8A00]">
                  Hôm nay đã đọc
                </p>
              </div>
            </div>

            {/* Stat 4: Hoa Đang Trồng 🌸 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FFFEF2] border-3 border-[#39C95A] shadow-[0_4px_0_#14532D]">
              <div className="w-12 h-12 rounded-2xl bg-[#39C95A] border-2 border-[#14532D] flex items-center justify-center text-[#FFF21F] shrink-0">
                <Flower2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-base sm:text-lg font-black font-literary text-[#3B2414] truncate block">
                  {activePot?.flowerName || 'Hoa Hướng Dương'}
                </span>
                <p className="text-xs font-bold text-[#16A34A]">
                  GĐ {activePot?.stage || 1}/7 ({activePot?.growthPercent || 0}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. TIẾP TỤC ĐỌC (STORYBOOK READING DESK)            */}
      {/* ================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <h2 className="font-literary text-2xl sm:text-3xl font-black text-[#3B2414] drop-shadow-xs">
              TRANG SÁCH ĐANG MỞ
            </h2>
          </div>
          <button
            id="btn-view-all-books"
            onClick={() => {
              soundEngine.playButtonClick();
              setActiveTab('library');
            }}
            className="text-xs sm:text-sm font-black text-[#FF8A00] hover:text-[#FF6B1A] flex items-center gap-1 bg-[#FFF8DC] px-3 py-1.5 rounded-xl border-2 border-[#8B5A2B] shadow-[0_2px_0_#8B5A2B]"
          >
            Toàn bộ thư viện →
          </button>
        </div>

        {currentReadingEntry ? (
          /* Magical open storybook desk */
          <div
            id="continue-reading-card"
            className="storybook-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              {/* Cover with 3D Spine and Bookmark Ribbon */}
              <div
                className="w-22 h-28 sm:w-26 sm:h-32 rounded-2xl flex flex-col justify-between p-3 text-center shadow-[0_6px_0_#8B5A2B] shrink-0 border-3 border-[#8B5A2B] relative overflow-hidden"
                style={{
                  backgroundColor: currentReadingEntry.book.coverTheme.bg,
                  color: currentReadingEntry.book.coverTheme.text,
                }}
              >
                {/* Ribbon bookmark sticking out */}
                <div className="absolute top-0 right-3 w-4 h-8 bg-[#FF5FA2] border-b-4 border-b-transparent border-x-8 border-x-[#FF5FA2] z-10" />
                <span className="text-[10px] font-black uppercase tracking-wider opacity-80">
                  {currentReadingEntry.book.era}
                </span>
                <span className="font-literary text-xs sm:text-sm font-black line-clamp-2">
                  {currentReadingEntry.book.title}
                </span>
                <span className="text-[10px] font-bold">
                  {currentReadingEntry.book.author}
                </span>
              </div>

              <div>
                <span className="badge-game-gold text-xs inline-block mb-2">
                  ✨ Đang khám phá dở
                </span>
                <h3 className="font-literary text-2xl sm:text-3xl font-black text-[#3B2414]">
                  {currentReadingEntry.book.title}
                </h3>
                <p className="text-sm font-bold text-[#FF8A00] mb-2">
                  Tác giả: {currentReadingEntry.book.author}
                </p>
                <p className="text-xs sm:text-sm text-[#5C3A1E] max-w-lg line-clamp-2">
                  {currentReadingEntry.book.description}
                </p>
              </div>
            </div>

            <div className="w-full md:w-64 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-black text-[#3B2414]">
                <span>Tiến độ đọc:</span>
                <span className="text-[#FF8A00] font-black text-base">
                  {currentReadingEntry.progress.progressPercent}%
                </span>
              </div>

              {/* Cartoon Growth Bar */}
              <div className="w-full h-4 rounded-full bg-[#FFF8DC] border-2 border-[#8B5A2B] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FFF21F] to-[#FF8A00] transition-all duration-500 shadow-inner"
                  style={{ width: `${currentReadingEntry.progress.progressPercent}%` }}
                />
              </div>

              <button
                id="btn-continue-reading-action"
                onClick={() => {
                  soundEngine.playButtonClick();
                  openReader(currentReadingEntry.book.id);
                }}
                className="btn-cartoon-primary w-full py-3 text-sm font-black flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Tiếp tục đọc ngay</span>
              </button>
            </div>
          </div>
        ) : (
          /* Friendly cartoon empty state */
          <div
            id="empty-continue-reading"
            className="storybook-card p-8 sm:p-10 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] flex items-center justify-center text-[#FF8A00] mx-auto mb-4 animate-warm-float">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-literary text-2xl font-black text-[#3B2414] mb-2">
              Khu vườn đang chờ bạn gieo hạt sách đầu tiên! 🌱
            </h3>
            <p className="text-sm font-bold text-[#5C3A1E] max-w-md mx-auto mb-6 leading-relaxed">
              Mỗi trang sách bạn đọc sẽ nở thành một bông hoa rực rỡ và đọng lại những giọt tri thức mát lành.
            </p>
            <button
              id="btn-start-first-book"
              onClick={() => {
                soundEngine.playButtonClick();
                setActiveTab('library');
              }}
              className="btn-cartoon-primary px-8 py-3.5 text-sm font-black inline-flex items-center gap-2"
            >
              <span>CHỌN SÁCH ĐẦU TIÊN TRONG THƯ VIỆN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* 4. TÁC PHẨM NỔI BẬT (CARVED BOOKSHELF DISPLAY)     */}
      {/* ================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF21F] border-2 border-[#8B5A2B] text-xs font-black text-[#3B2414] mb-1 shadow-[0_2px_0_#8B5A2B]">
              <span>🌻 KỆ SÁCH ĐƯỢC YÊU THÍCH NHẤT</span>
            </div>
            <h2 className="font-literary text-3xl sm:text-4xl font-black text-[#3B2414]">
              Hương Sắc Văn Chương THPT
            </h2>
          </div>
          <button
            id="btn-explore-all-featured"
            onClick={() => {
              soundEngine.playButtonClick();
              setActiveTab('library');
            }}
            className="btn-cartoon-yellow hidden sm:flex items-center gap-2 px-5 py-2.5 text-xs font-black"
          >
            <span>XEM TẤT CẢ TÁC PHẨM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* The Books Grid with BookCard (Chunky storybook style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. VĂN HỌC & CẢM HỨNG (STORYBOOK BANNER)            */}
      {/* ================================================== */}
      <section className="border-t-4 border-[#8B5A2B] py-12 px-4 sm:px-6 lg:px-8 bg-[#FFF8DC]">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="w-12 h-12 rounded-full bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] flex items-center justify-center mx-auto mb-4 text-[#FF8A00] font-black text-xl">
            ✨
          </div>
          <blockquote className="font-literary text-xl sm:text-2xl font-black italic text-[#3B2414] leading-relaxed mb-3">
            “Một cuốn sách hay là một người bạn tri âm qua năm tháng, mở ra vạn dặm chân trời và thắp sáng khu vườn tâm hồn.”
          </blockquote>
          <cite className="text-xs sm:text-sm font-black text-[#FF8A00] not-italic tracking-wider uppercase">
            — Nắng Của Văn Học: Thắp Sáng Ngọn Lửa Tri Thức THPT
          </cite>
        </div>
      </section>
    </div>
  );
};
