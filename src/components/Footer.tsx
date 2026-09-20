import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Heart, Feather, BookOpen, Sparkles, Coffee } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { MascotMiuTho, MascotKnowledgeSprout } from './CartoonMascots';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer
      id="main-footer"
      className="relative mt-16 border-t-4 border-[#8B5A2B] bg-[#FFF8DC] select-none py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Decorative wooden fence texture on top */}
      <div className="absolute -top-3 left-0 right-0 h-3 bg-[repeating-linear-gradient(90deg,#8B5A2B_0px,#8B5A2B_16px,#FFF8DC_16px,#FFF8DC_22px)]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Col 1: Brand & Slogan */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF21F] border-3 border-[#8B5A2B] flex items-center justify-center text-[#FF8A00] shadow-[0_3px_0_#8B5A2B] animate-warm-float">
              <Sun className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-literary text-3xl font-black text-[#3B2414] drop-shadow-xs">
                Nắng Của Văn Học
              </span>
              <p className="text-xs font-bold text-[#FF8A00] uppercase tracking-wider">
                Khu Vườn Kỳ Diệu Của Bạn Đọc THPT
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#5C3A1E] max-w-md leading-relaxed">
            “Đọc sách nhận thưởng, gieo mầm nở hoa và cùng nhau thắp sáng tình yêu văn học dân tộc.”
            Một thế giới hoạt hình tương tác kết nối những tâm hồn học trò với những trang văn bất hủ.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs font-black text-[#8B5A2B]">
            <Feather className="w-4 h-4 text-[#FF8A00]" />
            <span>Nuôi dưỡng thiên lương qua từng giọt tri thức và nụ hoa</span>
          </div>
        </div>

        {/* Col 2: Điều hướng nhanh */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[#FF8A00] mb-3 flex items-center gap-1.5">
            <span>ĐỊA ĐIỂM KHÁM PHÁ</span>
            <span>🌻</span>
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm font-bold text-[#5C3A1E]">
            <li>
              <button
                onClick={() => {
                  soundEngine.playButtonClick();
                  setActiveTab('home');
                }}
                className="hover:text-[#FF8A00] hover:translate-x-1 transition-all"
              >
                🏡 Khu Vườn Chính (Trang chủ)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  soundEngine.playButtonClick();
                  setActiveTab('library');
                }}
                className="hover:text-[#FF8A00] hover:translate-x-1 transition-all"
              >
                🌲 Thư Viện Trên Cây
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  soundEngine.playButtonClick();
                  setActiveTab('garden');
                }}
                className="hover:text-[#FF8A00] hover:translate-x-1 transition-all"
              >
                🌷 Vườn Ươm Hoa Kỳ Diệu
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  soundEngine.playButtonClick();
                  setActiveTab('challenge');
                }}
                className="hover:text-[#FF8A00] hover:translate-x-1 transition-all"
              >
                🎯 Đấu Trường Sĩ Tử
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  soundEngine.playButtonClick();
                  setActiveTab('forum');
                }}
                className="hover:text-[#FF8A00] hover:translate-x-1 transition-all"
              >
                🍵 Bàn Trà Đàm Đạo
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Cam kết & Văn hóa đọc */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[#FF8A00] mb-3 flex items-center gap-1.5">
            <span>HOẠT HÌNH & TRI THỨC</span>
            <span>✨</span>
          </h4>
          <p className="text-xs font-bold text-[#5C3A1E] leading-relaxed mb-3">
            Dự án giáo dục phi thương mại kết hợp AI và mỹ thuật truyện tranh cổ tích Việt Nam, khơi gợi cảm hứng cho học sinh THPT.
          </p>
          <div className="p-3.5 rounded-2xl bg-[#FFFEF2] border-2 border-[#8B5A2B] text-xs font-bold text-[#3B2414] shadow-[0_2px_0_#8B5A2B]">
            🌸 Tôn vinh vẻ đẹp tiếng Việt và bồi đắp nhân cách con người.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t-2 border-[#8B5A2B]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-[#8B5A2B]">
        <p>© 2026 Nắng Của Văn Học. Thế giới hoạt hình tương tác dành cho học sinh THPT.</p>
        <div className="flex items-center gap-1">
          <span>Gieo hạt mầm yêu thương</span>
          <Heart className="w-4 h-4 text-[#FF5FA2] fill-current inline mx-0.5" />
          <span>cho bạn đọc tuổi học trò</span>
        </div>
      </div>
    </footer>
  );
};
