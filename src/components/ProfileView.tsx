import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LITERARY_FLOWERS, getFlowerById } from '../data/flowers';
import { soundEngine } from '../utils/audio';
import {
  User,
  Feather,
  Clock,
  BookOpen,
  Award,
  Sprout,
  Bookmark,
  LogOut,
  Sparkles,
  Shield,
  ArrowRight,
  UserCheck,
  Plus,
  Droplets,
  Trophy
} from 'lucide-react';
import { MascotMiuTho } from './CartoonMascots';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    allUsers,
    logout,
    switchToUser,
    register,
    userReadingProgress,
    savedBookIds,
    completedChallengeIds,
    activePot,
    setActiveTab,
    showToast
  } = useApp();

  const [isSwitching, setIsSwitching] = useState(false);
  const [showNewAccountForm, setShowNewAccountForm] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newUsername, setNewUsername] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center select-none">
        <User className="w-16 h-16 text-[#8B5A2B] mx-auto mb-4 animate-warm-float" />
        <h2 className="font-literary text-3xl font-black text-[#3B2414] mb-3">
          Bạn Chưa Đăng Nhập
        </h2>
        <p className="text-sm font-bold text-[#5C3A1E] mb-6 leading-relaxed">
          Hãy đăng nhập hoặc tạo tài khoản để theo dõi nhật ký đọc sách và chăm sóc đóa hoa tri thức nhé!
        </p>
      </div>
    );
  }

  const handleCreateZeroAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisplayName.trim()) return;
    soundEngine.playLevelUp();
    register(
      newDisplayName.trim(),
      newUsername.trim() || 'hocsinh_' + Math.floor(Math.random() * 1000),
      `${newUsername || 'hocsinh'}@thpt.edu.vn`
    );
    setShowNewAccountForm(false);
    setNewDisplayName('');
    setNewUsername('');
    showToast(`🌱 Đã tạo tài khoản mới cho bạn ${newDisplayName.trim()}!`);
  };

  return (
    <div id="profile-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* 1. Reader Treehouse Profile Plaque */}
      <div className="wood-signboard p-6 sm:p-8 mb-8 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar Frame with Floral Ring */}
            <div className="relative">
              <div className="w-22 h-22 rounded-3xl bg-[#FFF21F] border-4 border-[#8B5A2B] shadow-[0_5px_0_#5C3A1E] flex items-center justify-center text-5xl shrink-0">
                {currentUser.avatarUrl || '🌱'}
              </div>
              <span className="absolute -top-2 -right-2 text-2xl animate-gentle-sway">🌸</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="badge-game-gold text-xs">
                  {currentUser.schoolGrade || 'Học sinh THPT'}
                </span>
                <span className="badge-game-green text-xs">
                  Cấp độ {currentUser.level} 🌟
                </span>
              </div>

              <h1 className="font-literary text-3xl font-black text-[#3B2414]">
                {currentUser.displayName}
              </h1>
              <p className="text-xs font-bold text-[#8B5A2B] mt-0.5">
                @{currentUser.username} • {currentUser.email}
              </p>
              {currentUser.bio && (
                <p className="text-xs sm:text-sm font-bold text-[#5C3A1E] mt-2 italic">
                  “{currentUser.bio}”
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
            <button
              onClick={() => {
                soundEngine.playButtonClick();
                setIsSwitching((prev) => !prev);
              }}
              className="btn-cartoon-yellow px-4 py-2.5 text-xs font-black flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-[#FF8A00]" />
              <span>Đổi tài khoản</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playButtonClick();
                logout();
              }}
              className="px-4 py-2.5 rounded-2xl text-xs font-black bg-[#FF5FA2] border-3 border-[#8B5A2B] text-white shadow-[0_3px_0_#8B5A2B] hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Account Switcher Panel */}
      {isSwitching && (
        <div className="storybook-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#8B5A2B]/20">
            <h3 className="font-literary text-lg font-black text-[#3B2414]">
              Danh Sách Độc Giả Trên Thiết Bị
            </h3>
            <button
              onClick={() => setShowNewAccountForm((prev) => !prev)}
              className="text-xs font-black text-[#FF8A00] hover:underline flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo tài khoản mới tinh (Cột mốc 0)</span>
            </button>
          </div>

          {showNewAccountForm && (
            <form onSubmit={handleCreateZeroAccount} className="p-4 rounded-2xl bg-[#FFF8DC] border-3 border-[#8B5A2B] mb-4 space-y-3">
              <span className="text-xs font-black text-[#FF8A00] block">
                🌱 Tạo bạn đọc mới: Điểm = 0, Cấp = 0, Vườn mầm hạt, Không dữ liệu mẫu
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Họ và tên học sinh..."
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Tên đăng nhập (username)..."
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewAccountForm(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#8B5A2B]"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="btn-cartoon-primary px-4 py-2 text-xs font-black"
                >
                  Tạo tài khoản
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allUsers.map((u) => {
              const isCurrent = u.id === currentUser.id;
              return (
                <button
                  key={u.id}
                  onClick={() => {
                    soundEngine.playButtonClick();
                    switchToUser(u.id);
                  }}
                  className={`p-3.5 rounded-2xl text-left border-3 transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-[#FFF21F] border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B]'
                      : 'bg-[#FFFEF2] border-[#8B5A2B]/40 hover:border-[#8B5A2B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{u.avatarUrl || '🌱'}</span>
                    <div>
                      <span className="text-xs font-black text-[#3B2414] block">
                        {u.displayName}
                      </span>
                      <span className="text-[10px] font-bold text-[#8B5A2B]">
                        {u.points} ngòi bút • Cấp {u.level}
                      </span>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="badge-game-green text-[10px]">
                      Đang chọn ⭐
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Five Magical Storage Jars / Wall Plaques (Anti-SaaS Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
        {/* Jar 1: Ngòi Bút */}
        <div className="storybook-card p-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#FF8A00] flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Feather className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black font-literary text-[#3B2414] block">
            {currentUser.points}
          </span>
          <span className="text-[11px] font-black text-[#8B5A2B]">
            Ngòi Bút ✒️
          </span>
        </div>

        {/* Jar 2: Giọt Tri Thức */}
        <div className="storybook-card p-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#39C6FF] border-2 border-[#168CFF] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Droplets className="w-6 h-6 fill-white" />
          </div>
          <span className="text-2xl font-black font-literary text-[#168CFF] block">
            {currentUser.knowledgeDrops || 0}
          </span>
          <span className="text-[11px] font-black text-[#8B5A2B]">
            Giọt Tri Thức 💧
          </span>
        </div>

        {/* Jar 3: Phút Đọc */}
        <div className="storybook-card p-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#39C95A] border-2 border-[#14532D] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Clock className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black font-literary text-[#14532D] block">
            {currentUser.totalReadingMinutes}
          </span>
          <span className="text-[11px] font-black text-[#8B5A2B]">
            Phút Đọc Sách ⏳
          </span>
        </div>

        {/* Jar 4: Thử Thách */}
        <div className="storybook-card p-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FF8A00] border-2 border-[#8B5A2B] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black font-literary text-[#3B2414] block">
            {(completedChallengeIds || []).length}
          </span>
          <span className="text-[11px] font-black text-[#8B5A2B]">
            Thử Thách Đã Vượt 🎯
          </span>
        </div>

        {/* Jar 5: Tủ Sách */}
        <div className="storybook-card p-4 text-center col-span-2 sm:col-span-1">
          <div className="w-12 h-12 rounded-2xl bg-[#FF5FA2] border-2 border-[#8B5A2B] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Bookmark className="w-6 h-6 fill-white" />
          </div>
          <span className="text-2xl font-black font-literary text-[#3B2414] block">
            {(savedBookIds || []).length}
          </span>
          <span className="text-[11px] font-black text-[#8B5A2B]">
            Tác Phẩm Đã Lưu 📖
          </span>
        </div>
      </div>

      {/* 4. Mini Garden Snapshot Plaque */}
      <div className="wood-signboard p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-[#FFF21F] border-3 border-[#8B5A2B] text-[#FF8A00] flex items-center justify-center text-4xl shadow-md">
            🌻
          </div>
          <div>
            <span className="badge-game-gold text-[10px] mb-1">
              CHẬU HOA ĐANG CHĂM SÓC
            </span>
            <h3 className="font-literary text-2xl font-black text-[#3B2414]">
              {activePot?.flowerName || 'Hoa Hướng Dương'} — GĐ {activePot?.stage || 1}/7 ({activePot?.stageName || 'Hạt giống'})
            </h3>
            <p className="text-xs font-bold text-[#5C3A1E] mt-0.5">
              Độ ẩm {activePot?.hydrationPercent || 0}% • {activePot?.growthPercent || 0}% lớn khôn • {currentUser.waterCount || 0} lần tưới mát
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playButtonClick();
            setActiveTab('garden');
          }}
          className="btn-cartoon-primary px-6 py-3 text-xs font-black flex items-center gap-2"
        >
          <span>VÀO KHU VƯỜN</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Unlocked Literary Flowers Showcase Showcase Shelf */}
      <div className="storybook-card p-6 sm:p-7 mb-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-[#8B5A2B]/20">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#FF8A00]" />
            <h3 className="font-literary text-xl font-black text-[#3B2414]">
              Bộ Sưu Tập Đóa Hoa Văn Học Đã Nở ({currentUser.unlockedFlowerIds?.length || 0}/15)
            </h3>
          </div>
          <button
            onClick={() => {
              soundEngine.playButtonClick();
              setActiveTab('garden');
            }}
            className="text-xs font-black text-[#FF8A00] hover:underline"
          >
            Mở 15 đóa hoa vườn →
          </button>
        </div>

        {currentUser.unlockedFlowerIds && currentUser.unlockedFlowerIds.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {currentUser.unlockedFlowerIds.map((fid) => {
              const flower = getFlowerById(fid);
              if (!flower) return null;
              return (
                <div key={flower.id} className="p-3.5 rounded-2xl bg-[#FFF8DC] border-3 border-[#8B5A2B] text-center shadow-[0_3px_0_#8B5A2B] hover:scale-105 transition-transform">
                  <span className="text-4xl block mb-1.5 animate-warm-float">{flower.icon}</span>
                  <span className="text-xs font-black text-[#3B2414] block">{flower.name}</span>
                  <span className="text-[10px] font-bold text-[#8B5A2B]">{flower.symbolism}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-[#FFF8DC] border-3 border-dashed border-[#8B5A2B] text-center">
            <Sprout className="w-12 h-12 text-[#39C95A] mx-auto mb-2 animate-bounce" />
            <p className="text-sm font-black text-[#3B2414]">
              Cậu chưa có đóa hoa nào nở rộ vào bộ sưu tập vĩnh cửu.
            </p>
            <p className="text-xs font-bold text-[#5C3A1E] mt-1 max-w-md mx-auto">
              Hãy tích cực đọc sách để nhận <strong>Giọt Tri Thức 💧</strong> và chăm bón hoa đến Giai đoạn 6 nở hoa rực rỡ nhé!
            </p>
          </div>
        )}
      </div>

      {/* 6. Admin Panel Entry */}
      <div className="border-t-3 border-[#8B5A2B]/20 pt-6 text-center">
        <button
          id="btn-admin-access"
          onClick={() => {
            soundEngine.playButtonClick();
            setActiveTab('admin');
          }}
          className="text-xs font-black text-[#8B5A2B] hover:text-[#FF8A00] transition-colors flex items-center justify-center gap-1.5 mx-auto py-2 px-4 rounded-xl border-2 border-transparent hover:border-[#8B5A2B]"
        >
          <Shield className="w-4 h-4" />
          <span>Bảng Quản Trị Tác Phẩm & Kho Sách</span>
        </button>
      </div>
    </div>
  );
};
