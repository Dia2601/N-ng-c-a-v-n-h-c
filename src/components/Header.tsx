import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Search,
  Feather,
  Bookmark,
  Award,
  MessageSquare,
  Home,
  Flower2,
  Droplets,
  Volume2,
  VolumeX,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { MascotSeButHoa } from './CartoonMascots';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    setIsSearchOpen,
    setIsAuthModalOpen,
    showToast
  } = useApp();

  const [soundActive, setSoundActive] = useState<boolean>(soundEngine.isEnabled());

  const handleToggleSound = () => {
    const next = soundEngine.toggle();
    setSoundActive(next);
    showToast(next ? 'Đã bật âm thanh ríu rít 🔔' : 'Đã tắt âm thanh 🔕');
  };

  const navItems = [
    { id: 'home', label: 'Trang Chủ', icon: Home, emoji: '🏡' },
    { id: 'library', label: 'Thư Viện', icon: BookOpen, emoji: '📚' },
    { id: 'garden', label: 'Khu Vườn', icon: Flower2, emoji: '🌱' },
    { id: 'challenge', label: 'Thử Tài', icon: Award, emoji: '🎯' },
    { id: 'forum', label: 'Diễn Đàn', icon: MessageSquare, emoji: '💬' },
    { id: 'saved', label: 'Đã Lưu', icon: Bookmark, emoji: '📖' },
  ];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full select-none"
    >
      {/* WOODEN SIGNBOARD / MAGICAL BOOK MENU NAVBAR */}
      <div className="bg-[#FFF8DC] border-b-4 border-[#8B5A2B] shadow-[0_5px_0_#5C3A1E,0_10px_20px_rgba(92,58,30,0.25)] relative">
        {/* Top wood-grain accent line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF8A00] via-[#FFF21F] to-[#39C95A]" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4 relative">
          {/* Brand Logo: Whimsical Signboard Book with Little Bird */}
          <button
            id="btn-brand-logo"
            onClick={() => {
              soundEngine.playButtonClick();
              setActiveTab('home');
            }}
            title="Trang Chủ Nắng Của Văn Học"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
          >
            {/* Chunky Golden Book Icon Badge with leaf border */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] flex items-center justify-center text-[#3B2414] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                <BookOpen className="w-7 h-7 text-[#FF8A00] fill-[#FFF21F]" />
              </div>
              {/* Little cute sparkling leaf on corner */}
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#39C95A] border-2 border-[#14532D] flex items-center justify-center animate-spin [animation-duration:10s]">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-literary text-lg sm:text-xl font-black tracking-wide text-[#3B2414] drop-shadow-[0_1px_0_#FFF8DC] leading-tight">
                NẮNG CỦA VĂN HỌC
              </span>
              <span className="text-[11px] font-bold text-[#FF8A00] flex items-center gap-1">
                <span>Vườn Sách Kỳ Diệu</span>
                <span>✨</span>
              </span>
            </div>
          </button>

          {/* Center Navigation Links (Wooden Sign Plaque Buttons) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-[#FFFEF2]/80 px-3 py-1.5 rounded-2xl border-2 border-[#8B5A2B]/40 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    soundEngine.playButtonClick();
                    setActiveTab(item.id);
                  }}
                  className={`relative px-3.5 py-2 rounded-xl text-xs lg:text-sm font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FFF21F] text-[#3B2414] border-2 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] scale-105'
                      : 'text-[#5C3A1E] hover:bg-[#FFF8DC] hover:text-[#3B2414] border-2 border-transparent hover:border-[#8B5A2B]/30'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-ping ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Drops, Points, Sound, Search, User/Admin */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              id="btn-header-search"
              onClick={() => {
                soundEngine.playButtonClick();
                setIsSearchOpen(true);
              }}
              title="Tìm kiếm tác phẩm, tác giả hoặc hashtag"
              className="w-10 h-10 rounded-2xl bg-[#FFF8DC] border-2 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] flex items-center justify-center text-[#3B2414] hover:bg-[#FFF21F] hover:-translate-y-0.5 transition-all"
            >
              <Search className="w-5 h-5 text-[#8B5A2B]" />
            </button>

            {/* Sound Toggle */}
            <button
              id="btn-header-sound-toggle"
              onClick={handleToggleSound}
              title={soundActive ? 'Tắt âm thanh' : 'Bật âm thanh'}
              className="w-10 h-10 rounded-2xl bg-[#FFF8DC] border-2 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] flex items-center justify-center text-[#3B2414] hover:bg-[#FFF21F] hover:-translate-y-0.5 transition-all"
            >
              {soundActive ? <Volume2 className="w-5 h-5 text-[#FF8A00]" /> : <VolumeX className="w-5 h-5 text-[#8B5A2B]/60" />}
            </button>

            {/* Giọt Tri Thức 💧 (Sky Blue Badge) */}
            <button
              id="btn-header-drops"
              onClick={() => {
                soundEngine.playButtonClick();
                setActiveTab('garden');
              }}
              title="Giọt Tri Thức dùng để tưới cây trong Vườn!"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#39C6FF] border-2 border-[#168CFF] shadow-[0_3px_0_#0E65BD] hover:-translate-y-0.5 transition-all"
            >
              <Droplets className="w-4 h-4 text-white fill-white" />
              <span className="text-xs font-black text-white">
                {currentUser ? currentUser.knowledgeDrops : 0}
              </span>
              <span className="hidden xl:inline text-[11px] font-bold text-white/90">
                giọt
              </span>
            </button>

            {/* Ngòi Bút ✒️ (Sunshine Gold Badge) */}
            <button
              id="btn-header-points"
              onClick={() => {
                soundEngine.playButtonClick();
                setActiveTab('challenge');
              }}
              title="Ngòi bút tích lũy từ đọc sách và trả lời câu đố!"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#FFF21F] border-2 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] hover:-translate-y-0.5 transition-all"
            >
              <Feather className="w-4 h-4 text-[#FF8A00]" />
              <span className="text-xs font-black text-[#3B2414]">
                {currentUser ? currentUser.points : 0}
              </span>
              <span className="hidden xl:inline text-[11px] font-bold text-[#8B5A2B]">
                bút
              </span>
            </button>

            {/* Admin Nav Button */}
            {currentUser?.role === 'admin' && (
              <button
                id="btn-header-admin-nav"
                onClick={() => {
                  soundEngine.playButtonClick();
                  setActiveTab('admin');
                }}
                className="px-3 py-1.5 rounded-2xl bg-[#39C95A] hover:bg-[#16A34A] text-white border-2 border-[#14532D] shadow-[0_3px_0_#14532D] text-xs font-black flex items-center gap-1.5 hover:-translate-y-0.5 transition-all"
                title="Khu vực Quản trị Thư viện & Kệ sách"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFF21F]" />
                <span>Admin</span>
              </button>
            )}

            {/* User Profile / Login */}
            {currentUser ? (
              <button
                id="btn-header-user-profile"
                onClick={() => {
                  soundEngine.playButtonClick();
                  setActiveTab('profile');
                }}
                title={`Hành trình đọc của ${currentUser.displayName}`}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-2xl bg-[#FFF8DC] border-2 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] hover:bg-[#FFF21F] hover:-translate-y-0.5 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF8A00] border-2 border-[#8B5A2B] flex items-center justify-center text-sm shadow-inner text-white font-bold">
                  {currentUser.avatarUrl || '🌱'}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-black text-[#3B2414] leading-tight max-w-[90px] truncate">
                    {currentUser.displayName}
                  </span>
                  <span className="text-[10px] font-bold text-[#FF8A00]">
                    Cấp {currentUser.level} 🌟
                  </span>
                </div>
              </button>
            ) : (
              <button
                id="btn-header-login"
                onClick={() => setIsAuthModalOpen(true)}
                className="btn-cartoon-primary px-4 py-2 text-xs font-black"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around px-2 py-2 border-t-2 border-[#8B5A2B]/40 bg-[#FFF8DC] overflow-x-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playButtonClick();
                  setActiveTab(item.id);
                }}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[11px] font-extrabold transition-all ${
                  isActive
                    ? 'bg-[#FFF21F] text-[#3B2414] border-2 border-[#8B5A2B] shadow-[0_2px_0_#8B5A2B]'
                    : 'text-[#8B5A2B]'
                }`}
              >
                <span className="text-base leading-none">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
