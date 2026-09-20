import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LITERARY_FLOWERS, GROWTH_STAGES, getFlowerById } from '../data/flowers';
import {
  Sprout,
  Droplets,
  Feather,
  Sparkles,
  BookOpen,
  Lock,
  Unlock,
  HelpCircle,
  Trophy,
  Flower2,
  X,
  Check
} from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { MascotMamTriThuc, MascotMiuTho } from './CartoonMascots';

export const GardenView: React.FC = () => {
  const {
    currentUser,
    garden,
    activePot,
    selectActivePot,
    unlockPot,
    waterPlant,
    fertilizePlant,
    setActiveTab,
    showToast
  } = useApp();

  const [filterMode, setFilterMode] = useState<'pots' | 'collection' | 'guide'>('pots');
  const [isWateringAnim, setIsWateringAnim] = useState(false);
  const [showNoDropsModal, setShowNoDropsModal] = useState(false);

  const activeFlowerMeta = getFlowerById(activePot?.flowerId) || LITERARY_FLOWERS[0];
  const activeStageMeta = GROWTH_STAGES.find(s => s.stage === (activePot?.stage || 1)) || GROWTH_STAGES[0];

  const handleWaterClick = () => {
    if (!currentUser) {
      showToast('Cậu hãy đăng nhập để cùng chăm sóc vườn cây nhé! 🌱');
      return;
    }

    if (currentUser.knowledgeDrops <= 0) {
      soundEngine.playLevelUp();
      setShowNoDropsModal(true);
      return;
    }

    if (!activePot?.id) return;

    soundEngine.playWater();
    setIsWateringAnim(true);
    setTimeout(() => setIsWateringAnim(false), 1400);
    waterPlant(activePot.id);
  };

  const handleFertilizeClick = () => {
    if (!activePot?.id) return;
    soundEngine.playButtonClick();
    fertilizePlant(activePot.id);
  };

  // 2D Cartoon Hand-Drawn SVG Growth Illustration (7 Stages)
  const renderCartoonPlant = () => {
    const stage = activePot?.stage || 1;

    return (
      <div className="relative w-64 h-64 mx-auto flex items-center justify-center select-none">
        {/* Soil Mound Base with Grass Blades */}
        <div className="absolute bottom-4 w-44 h-14 rounded-[50%] bg-[#5C3A1E] border-4 border-[#3B2414] shadow-[0_6px_0_#2A180C] z-10 flex items-center justify-center">
          <div className="w-36 h-8 rounded-[50%] bg-[#7A4B22] border-2 border-[#5C3A1E]" />
          {/* Grass tufts sprouting around pot soil */}
          <span className="absolute -top-3 left-4 text-lg">🌱</span>
          <span className="absolute -top-2 right-6 text-sm">🌿</span>
        </div>

        {/* Plant according to stage */}
        <div className="relative z-20 mb-8 transition-all duration-300">
          {stage === 1 && (
            /* Giai đoạn 1: Hạt mầm trong đất */
            <div className="flex flex-col items-center animate-warm-float">
              <svg width="70" height="70" viewBox="0 0 100 100">
                {/* Glowing halo */}
                <circle cx="50" cy="50" r="42" fill="#FFF21F" opacity="0.3" />
                {/* Seed body */}
                <path
                  d="M50 15 C68 35, 80 65, 50 85 C20 65, 32 35, 50 15 Z"
                  fill="#A76D36"
                  stroke="#5C3A1E"
                  strokeWidth="5"
                />
                {/* Cute eyes */}
                <circle cx="43" cy="55" r="4" fill="#3B2414" />
                <circle cx="57" cy="55" r="4" fill="#3B2414" />
                <circle cx="44.5" cy="53.5" r="1.5" fill="#FFFFFF" />
                <circle cx="58.5" cy="53.5" r="1.5" fill="#FFFFFF" />
                {/* Cute smile */}
                <path d="M46 63 Q50 67 54 63" stroke="#3B2414" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Little blush */}
                <ellipse cx="38" cy="60" rx="3" ry="2" fill="#FF5FA2" opacity="0.7" />
                <ellipse cx="62" cy="60" rx="3" ry="2" fill="#FF5FA2" opacity="0.7" />
              </svg>
              <div className="badge-game-gold text-[10px] mt-2">Hạt Mầm Ngủ Say</div>
            </div>
          )}

          {stage === 2 && (
            /* Giai đoạn 2: Chồi non 2 lá nhỏ */
            <div className="flex flex-col items-center animate-gentle-sway">
              <svg width="90" height="90" viewBox="0 0 100 100">
                {/* Stem */}
                <path d="M50 85 Q48 55 50 35" stroke="#39C95A" strokeWidth="8" strokeLinecap="round" fill="none" />
                {/* Left Leaf */}
                <path d="M48 45 Q20 30 30 15 Q45 25 48 45 Z" fill="#39C95A" stroke="#14532D" strokeWidth="4" />
                {/* Right Leaf */}
                <path d="M52 45 Q80 30 70 15 Q55 25 52 45 Z" fill="#39C95A" stroke="#14532D" strokeWidth="4" />
                {/* Dewdrop */}
                <circle cx="70" cy="18" r="4" fill="#39C6FF" stroke="#168CFF" strokeWidth="1.5" />
              </svg>
              <div className="badge-game-green text-[10px] mt-1">Chồi Non Nhú Lên</div>
            </div>
          )}

          {stage === 3 && (
            /* Giai đoạn 3: Cây con cao hơn, có nhánh vươn */
            <div className="flex flex-col items-center animate-gentle-sway">
              <svg width="110" height="110" viewBox="0 0 100 100">
                {/* Main Stem */}
                <path d="M50 90 Q47 50 50 20" stroke="#39C95A" strokeWidth="9" strokeLinecap="round" fill="none" />
                {/* Branch Left */}
                <path d="M48 60 Q25 50 18 35 Q35 38 48 52" fill="#39C95A" stroke="#14532D" strokeWidth="4" />
                {/* Branch Right */}
                <path d="M52 50 Q75 40 82 25 Q65 28 52 42" fill="#39C95A" stroke="#14532D" strokeWidth="4" />
                {/* Top Leaves */}
                <ellipse cx="50" cy="16" rx="14" ry="10" fill="#39C95A" stroke="#14532D" strokeWidth="4" />
              </svg>
              <div className="badge-game-green text-[10px] mt-1">Cây Con Vươn Cao</div>
            </div>
          )}

          {stage === 4 && (
            /* Giai đoạn 4: Cây lớn, nhiều lá xanh mướt */
            <div className="flex flex-col items-center animate-gentle-sway">
              <svg width="130" height="130" viewBox="0 0 100 100">
                {/* Big Foliage Cloud */}
                <path
                  d="M50 20 Q65 5 80 20 Q95 35 85 55 Q90 75 75 80 Q60 85 50 80 Q40 85 25 80 Q10 75 15 55 Q5 35 20 20 Q35 5 50 20 Z"
                  fill="#39C95A"
                  stroke="#14532D"
                  strokeWidth="5"
                />
                {/* Inner lighter green patch */}
                <ellipse cx="50" cy="45" rx="25" ry="20" fill="#4ADE80" />
                {/* Little flowers buds hiding */}
                <circle cx="35" cy="40" r="5" fill="#FFF21F" />
                <circle cx="65" cy="42" r="5" fill="#FFF21F" />
              </svg>
              <div className="badge-game-green text-[10px] mt-1">Lá Xanh Tươi Tốt</div>
            </div>
          )}

          {stage === 5 && (
            /* Giai đoạn 5: Chúm chím nụ hoa */
            <div className="flex flex-col items-center animate-warm-float">
              <svg width="140" height="140" viewBox="0 0 100 100">
                <path d="M50 90 Q48 55 50 35" stroke="#39C95A" strokeWidth="8" strokeLinecap="round" fill="none" />
                {/* Leaves */}
                <path d="M48 65 Q20 55 25 35 Q40 45 48 58" fill="#39C95A" stroke="#14532D" strokeWidth="4" />
                <path d="M52 60 Q80 50 75 30 Q60 40 52 53" fill="#39C95A" stroke="#14532D" strokeWidth="4" />
                {/* Cute Flower Bud */}
                <path
                  d="M50 15 C65 25, 65 48, 50 55 C35 48, 35 25, 50 15 Z"
                  fill="#FF5FA2"
                  stroke="#8B5A2B"
                  strokeWidth="4"
                />
                <circle cx="50" cy="20" r="3" fill="#FFF21F" />
              </svg>
              <div className="badge-game-pink text-[10px] mt-1">Nụ Hoa E Ấp</div>
            </div>
          )}

          {stage === 6 && (
            /* Giai đoạn 6: Nụ hoa hé mở cánh */
            <div className="flex flex-col items-center animate-gentle-sway">
              <svg width="150" height="150" viewBox="0 0 100 100">
                <path d="M50 90 L50 45" stroke="#39C95A" strokeWidth="8" strokeLinecap="round" />
                {/* Big blooming petals */}
                <circle cx="50" cy="38" r="28" fill="#FFF21F" stroke="#FF8A00" strokeWidth="4" />
                <circle cx="50" cy="38" r="16" fill="#FF8A00" stroke="#8B5A2B" strokeWidth="3" />
                <circle cx="50" cy="38" r="10" fill="#8B5A2B" />
              </svg>
              <div className="badge-game-gold text-[10px] mt-1">Hoa Hé Mở Sắc Hương</div>
            </div>
          )}

          {stage === 7 && (
            /* Giai đoạn 7: Đóa hoa nở rộ rực rỡ, phát sáng thần kỳ */
            <div className="flex flex-col items-center animate-gentle-sway relative">
              {/* Golden Sun Aura Glow */}
              <div className="absolute inset-0 rounded-full bg-[#FFF21F]/40 blur-xl animate-pulse" />
              <div className="text-8xl drop-shadow-[0_8px_0_rgba(139,90,43,0.4)] transform hover:scale-110 transition-transform duration-200">
                {activeFlowerMeta.icon}
              </div>
              <div className="badge-game-gold text-xs mt-2 shadow-[0_3px_0_#8B5A2B] animate-bounce">
                ✨ {activeFlowerMeta.name} Nở Rực Rỡ!
              </div>
            </div>
          )}
        </div>

        {/* WATERING ANIMATION OVERLAY (Cartoon Watering Can & Water Streams) */}
        {isWateringAnim && (
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            {/* Tilted Cartoon Watering Can */}
            <div className="relative -top-12 -right-8 animate-bounce">
              <svg width="90" height="70" viewBox="0 0 100 80" className="transform -rotate-25">
                {/* Can Body */}
                <ellipse cx="45" cy="45" rx="30" ry="22" fill="#39C6FF" stroke="#168CFF" strokeWidth="5" />
                {/* Handle */}
                <path d="M20 40 C5 25, 5 65, 20 50" fill="none" stroke="#168CFF" strokeWidth="6" strokeLinecap="round" />
                {/* Spout */}
                <path d="M70 42 L92 28" stroke="#168CFF" strokeWidth="7" strokeLinecap="round" />
                {/* Spout Rose head */}
                <circle cx="94" cy="27" r="8" fill="#FFF21F" stroke="#FF8A00" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Falling cartoon droplets */}
            <div className="absolute bottom-16 flex gap-3 text-3xl animate-bounce">
              <span className="animate-ping">💧</span>
              <span>💧</span>
              <span className="animate-ping">💧</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="literary-garden-view" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* 1. Garden Header with Wooden Signboard */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414] text-xs font-black uppercase tracking-wider mb-3 shadow-[0_3px_0_#8B5A2B]">
          <Sprout className="w-4 h-4 text-[#14532D]" />
          <span>VƯỜN VĂN HỌC 15 ĐÓA HOA KỲ DIỆU</span>
        </div>
        <h1 className="font-literary text-4xl sm:text-5xl font-black text-[#3B2414] mb-2 drop-shadow-xs">
          Khu Vườn Tri Thức
        </h1>
        <p className="text-sm sm:text-base font-bold text-[#5C3A1E] leading-relaxed">
          Đọc từng trang sách tích lũy <strong>Giọt Tri Thức 💧</strong>. Tưới mát cho các mầm hoa văn chương Việt Nam để nở rộ rực rỡ!
        </p>

        {/* View Switcher Tabs (Wooden buttons) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
          <button
            onClick={() => {
              soundEngine.playButtonClick();
              setFilterMode('pots');
            }}
            id="tab-garden-pots"
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-3 border-[#8B5A2B] ${
              filterMode === 'pots'
                ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_4px_0_#8B5A2B] scale-105'
                : 'bg-[#FFF8DC] text-[#5C3A1E] hover:bg-[#FFFEF2]'
            }`}
          >
            <Flower2 className="w-4 h-4 text-[#FF8A00]" />
            <span>15 Chậu Cây Đang Trồng</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playButtonClick();
              setFilterMode('collection');
            }}
            id="tab-garden-collection"
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-3 border-[#8B5A2B] ${
              filterMode === 'collection'
                ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_4px_0_#8B5A2B] scale-105'
                : 'bg-[#FFF8DC] text-[#5C3A1E] hover:bg-[#FFFEF2]'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#FF8A00]" />
            <span>Bộ Sưu Tập 15 Hoa ({currentUser?.unlockedFlowerIds?.length || 0}/15)</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playButtonClick();
              setFilterMode('guide');
            }}
            id="tab-garden-guide"
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-3 border-[#8B5A2B] ${
              filterMode === 'guide'
                ? 'bg-[#FFF21F] text-[#3B2414] shadow-[0_4px_0_#8B5A2B] scale-105'
                : 'bg-[#FFF8DC] text-[#5C3A1E] hover:bg-[#FFFEF2]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#39C95A]" />
            <span>7 Giai Đoạn Hoa Nở</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Active Pot & 15 Pots Grid */}
      {filterMode === 'pots' && (
        <>
          {/* Main Interactive Stage & Care Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
            {/* Active Pot Center Stage (Wood Carved Garden Plot) */}
            <div className="lg:col-span-7 storybook-card p-6 sm:p-8 text-center relative overflow-hidden">
              {/* Cute Badge on top of plot */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414] text-xs font-black mb-3 shadow-[0_2px_0_#8B5A2B]">
                <span className="text-base">{activeFlowerMeta.icon}</span>
                <span>{activePot.flowerName}</span>
                <span className="text-[#FF8A00]">•</span>
                <span>Giai đoạn {activePot.stage}/7: {activePot.stageName}</span>
              </div>

              {/* Poetic quote snippet */}
              <p className="font-literary text-lg font-black text-[#5C3A1E] mb-2 max-w-md mx-auto italic">
                "{activeFlowerMeta.literaryQuote}"
              </p>

              {/* 2D Cartoon Plant Visual Illustration */}
              <div className="my-2">
                {renderCartoonPlant()}
              </div>

              {/* Growth Progress Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex items-center justify-between text-xs font-black text-[#3B2414] mb-1.5">
                  <span>Tiến độ giai đoạn hiện tại:</span>
                  <span className="text-[#16A34A] font-black text-sm">{activePot.growthPercent}%</span>
                </div>
                {/* Thick Cartoon Bar */}
                <div className="w-full h-5 rounded-full bg-[#FFF8DC] border-3 border-[#8B5A2B] overflow-hidden p-0.5 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFF21F] via-[#39C95A] to-[#16A34A] transition-all duration-500"
                    style={{ width: `${activePot.growthPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-bold text-[#8B5A2B] mt-1.5">
                  <span>💧 Đã tưới: {activePot.waterDropsInvested} giọt tri thức</span>
                  <span>Độ ẩm đất: {activePot.hydrationPercent}%</span>
                </div>
              </div>

              {/* Care Action Buttons (Chunky 2D buttons) */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <button
                  id="btn-water-plant"
                  onClick={handleWaterClick}
                  className="btn-cartoon-blue px-6 py-3.5 text-xs sm:text-sm font-black flex items-center gap-2 hover:scale-105"
                >
                  <Droplets className="w-5 h-5 fill-white" />
                  <span>TƯỚI NƯỚC TRI THỨC (-1 💧)</span>
                </button>

                <button
                  id="btn-fertilize-plant"
                  onClick={handleFertilizeClick}
                  disabled={!currentUser || currentUser.points < 5}
                  className="btn-cartoon-primary px-6 py-3.5 text-xs sm:text-sm font-black flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                >
                  <Feather className="w-5 h-5" />
                  <span>BÓN PHÂN BÚT HOA (-5 ✒️)</span>
                </button>
              </div>

              {/* Prompt to read books for more drops */}
              <div className="mt-5 p-3 rounded-2xl bg-[#FFF21F]/40 border-2 border-[#8B5A2B] flex items-center justify-between text-xs font-bold text-[#3B2414]">
                <div className="flex items-center gap-2 text-left">
                  <BookOpen className="w-4 h-4 text-[#FF8A00] shrink-0" />
                  <span>Đọc sách trong thư viện để nhận thêm Giọt Tri Thức 💧 (+1 giọt / phút đọc)</span>
                </div>
                <button
                  onClick={() => {
                    soundEngine.playButtonClick();
                    setActiveTab('library');
                  }}
                  className="btn-cartoon-yellow px-3 py-1.5 text-xs font-black shrink-0"
                >
                  Đọc Sách Ngay
                </button>
              </div>
            </div>

            {/* Right: Garden Stats & Mascot Cheerleader */}
            <div className="lg:col-span-5 space-y-5">
              {/* Mascot Cheerleader Card */}
              <div className="storybook-card p-5 flex items-center gap-4">
                <MascotMamTriThuc size={80} speechText="Chăm chỉ tưới cây, hoa sẽ nở rực rỡ nhé! 🌸" />
                <div>
                  <h4 className="font-literary text-lg font-black text-[#3B2414]">
                    Bạn Mầm Tri Thức
                  </h4>
                  <p className="text-xs font-bold text-[#5C3A1E] mt-1">
                    Cứ mỗi 10 giọt nước tưới, cây sẽ bứt phá sang giai đoạn sinh trưởng mới!
                  </p>
                </div>
              </div>

              {/* Garden Inventory Status Plaque */}
              <div className="wood-signboard p-6 space-y-4">
                <h3 className="font-literary text-xl font-black text-[#3B2414] pb-2 border-b-2 border-[#8B5A2B]/30">
                  Túi Đồ Nghề Làm Vườn
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-[#FFFEF2] border-2 border-[#39C6FF] shadow-[0_3px_0_#168CFF]">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-[#168CFF] fill-[#168CFF]" />
                      <span className="text-xs font-black text-[#3B2414]">Giọt Tri Thức</span>
                    </div>
                    <span className="text-2xl font-black font-literary text-[#168CFF]">
                      {currentUser ? currentUser.knowledgeDrops : 0} 💧
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFFEF2] border-2 border-[#FF8A00] shadow-[0_3px_0_#8B5A2B]">
                    <div className="flex items-center gap-2 mb-1">
                      <Feather className="w-4 h-4 text-[#FF8A00]" />
                      <span className="text-xs font-black text-[#3B2414]">Ngòi Bút Thưởng</span>
                    </div>
                    <span className="text-2xl font-black font-literary text-[#FF8A00]">
                      {currentUser ? currentUser.points : 0} ✒️
                    </span>
                  </div>
                </div>

                <div className="text-xs font-bold text-[#5C3A1E] space-y-1.5 bg-[#FFFEF2]/80 p-3 rounded-2xl border-2 border-[#8B5A2B]/30">
                  <div className="flex justify-between">
                    <span>Đã mở khóa hoa:</span>
                    <span className="font-black text-[#16A34A]">{currentUser?.unlockedFlowerIds?.length || 0} / 15 loài</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thời gian đọc hôm nay:</span>
                    <span className="font-black text-[#FF8A00]">{currentUser?.readingMinutesToday || 0} phút</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 15 Pots Grid (Khu Vườn 15 Chậu Cây Đất Nung) */}
          <div className="storybook-card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b-3 border-[#8B5A2B]/30">
              <div>
                <h3 className="font-literary text-2xl font-black text-[#3B2414]">
                  15 Chậu Cây Đất Nung Trong Vườn
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#5C3A1E]">
                  Bấm chọn chậu cây để chăm sóc hoặc mở khóa chậu mới bằng ngòi bút!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {(garden?.pots || []).map((pot) => {
                const flower = getFlowerById(pot.flowerId);
                const isSelected = activePot.id === pot.id;

                return (
                  <div
                    key={pot.id}
                    onClick={() => {
                      if (!pot.isLocked) {
                        soundEngine.playButtonClick();
                        selectActivePot(pot.id);
                      }
                    }}
                    className={`p-4 rounded-3xl border-3 transition-all text-center flex flex-col items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF21F] border-[#8B5A2B] shadow-[0_5px_0_#8B5A2B] scale-105'
                        : pot.isLocked
                        ? 'bg-[#E0D0BF] border-[#8B5A2B]/40 opacity-70'
                        : 'bg-[#FFFEF2] border-[#8B5A2B] hover:bg-[#FFF8DC] shadow-[0_3px_0_#8B5A2B]'
                    }`}
                  >
                    <div className="text-3xl my-2">
                      {pot.isLocked ? '🔒' : flower?.icon || '🌱'}
                    </div>

                    <span className="font-literary text-xs font-black text-[#3B2414] line-clamp-1">
                      {pot.flowerName}
                    </span>

                    {pot.isLocked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          unlockPot(pot.id);
                        }}
                        className="btn-cartoon-yellow w-full mt-2 py-1 text-[10px] font-black"
                      >
                        Mở Khóa ({pot.unlockCostFeathers} ✒️)
                      </button>
                    ) : (
                      <div className="w-full mt-2">
                        <div className="flex justify-between text-[10px] font-black text-[#8B5A2B]">
                          <span>GĐ {pot.stage}/7</span>
                          <span>{pot.growthPercent}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#FFF8DC] border border-[#8B5A2B] overflow-hidden mt-0.5">
                          <div
                            className="h-full bg-[#39C95A]"
                            style={{ width: `${pot.growthPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Mode 2: Full 15 Literary Flower Collection Showcase */}
      {filterMode === 'collection' && (
        <div className="storybook-card p-6 sm:p-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-literary text-3xl font-black text-[#3B2414]">
              Bộ Sưu Tập 15 Đóa Hoa Văn Học Việt Nam
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#5C3A1E] mt-1">
              Nuôi nở từng đóa hoa để lưu giữ những vần thơ bất hủ và mở khóa danh hiệu tương ứng!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LITERARY_FLOWERS.map((flower) => {
              const isUnlocked = currentUser?.unlockedFlowerIds?.includes(flower.id);
              const pot = (garden?.pots || []).find(p => p.flowerId === flower.id);
              const isBloomed = (pot?.stage || 0) >= 6 || isUnlocked;

              return (
                <div
                  key={flower.id}
                  className={`p-5 rounded-3xl border-3 transition-all relative flex flex-col justify-between ${
                    isBloomed
                      ? 'bg-[#FFF8DC] border-[#8B5A2B] shadow-[0_5px_0_#5C3A1E]'
                      : 'bg-[#FFFEF2] border-[#8B5A2B]/40 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#FFF21F] border-2 border-[#8B5A2B] shadow-inner flex items-center justify-center text-3xl">
                          {flower.icon}
                        </div>
                        <div>
                          <h4 className="font-literary text-base font-black text-[#3B2414]">{flower.name}</h4>
                          <span className="text-xs font-bold text-[#FF8A00]">{flower.symbolism}</span>
                        </div>
                      </div>
                      {isBloomed ? (
                        <span className="badge-game-green text-[10px]">
                          Đã Nở 🌸
                        </span>
                      ) : (
                        <span className="badge-game-gold text-[10px]">
                          Chưa nở
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-literary italic text-[#5C3A1E] leading-relaxed my-2 bg-[#FFFEF2] p-3 rounded-2xl border-2 border-[#8B5A2B]/20">
                      "{flower.literaryQuote}"
                    </p>

                    <div className="text-[11px] font-bold text-[#8B5A2B] space-y-0.5">
                      <p>📖 <strong>Tác phẩm:</strong> {flower.associatedWork}</p>
                      <p>✍️ <strong>Tác giả:</strong> {flower.associatedAuthor}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t-2 border-[#8B5A2B]/20 flex items-center justify-between text-[11px] font-black text-[#8B5A2B]">
                    <span>Yêu cầu: {flower.potRequirement}</span>
                    {pot && !pot.isLocked && (
                      <button
                        onClick={() => {
                          soundEngine.playButtonClick();
                          selectActivePot(pot.id);
                          setFilterMode('pots');
                        }}
                        className="text-[#FF8A00] hover:text-[#FF6B1A] underline"
                      >
                        Chăm sóc ngay →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 3: 7 Growth Stages Guide */}
      {filterMode === 'guide' && (
        <div className="storybook-card p-6 sm:p-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-literary text-3xl font-black text-[#3B2414]">
              7 Giai Đoạn Đơm Hoa Văn Học
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#5C3A1E] mt-1">
              Từ hạt mầm nhỏ trong trang sách đến đóa hoa tỏa ngát hương thơm tri thức.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {GROWTH_STAGES.map((stg) => {
              const isCurrent = activePot.stage === stg.stage;
              const isPassed = activePot.stage > stg.stage;

              return (
                <div
                  key={stg.stage}
                  className={`p-4 rounded-2xl border-3 text-center transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#FFF21F] border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] scale-105'
                      : isPassed
                      ? 'bg-[#39C95A]/20 border-[#14532D]'
                      : 'bg-[#FFF8DC] border-[#8B5A2B]/40 opacity-70'
                  }`}
                >
                  <div>
                    <span className="text-3xl block mb-2">{stg.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider block text-[#FF8A00] mb-0.5">
                      GĐ {stg.stage}
                    </span>
                    <h4 className="font-literary text-xs font-black text-[#3B2414] mb-1">
                      {stg.name}
                    </h4>
                    <p className="text-[11px] font-bold text-[#5C3A1E] leading-tight">
                      {stg.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t-2 border-[#8B5A2B]/20 text-[10px] font-black text-[#16A34A]">
                    {stg.reward}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* POPUP MODAL: OUT OF WATER DROPS (Mascot Guide) */}
      {showNoDropsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="storybook-card max-w-md w-full p-6 text-center animate-warm-float relative">
            <button
              onClick={() => setShowNoDropsModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center hover:bg-[#FF8A00]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="my-3 flex justify-center">
              <MascotMiuTho size={110} speechText="Hết giọt nước rồi cậu ơi! Cùng đi đọc sách nào! 🐾" />
            </div>

            <h3 className="font-literary text-2xl font-black text-[#3B2414] mb-2">
              Bạn Cần Thêm Giọt Tri Thức 💧
            </h3>
            <p className="text-sm font-bold text-[#5C3A1E] mb-6 leading-relaxed">
              Mỗi phút đọc sách trong thư viện sẽ mang về 1 Giọt Tri Thức tươi mát để bạn tưới cho vườn hoa nở rộ!
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  soundEngine.playButtonClick();
                  setShowNoDropsModal(false);
                  setActiveTab('library');
                }}
                className="btn-cartoon-primary px-6 py-3 text-sm font-black flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>ĐẾN THƯ VIỆN ĐỌC SÁCH NGAY</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
