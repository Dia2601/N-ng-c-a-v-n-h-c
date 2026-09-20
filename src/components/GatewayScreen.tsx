import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, BookOpen, Sun, KeyRound, UserPlus, Volume2, VolumeX, ShieldCheck, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const GatewayScreen: React.FC = () => {
  const { login, register, loginAsAdmin, showToast } = useApp();
  const [mode, setMode] = useState<'welcome' | 'login' | 'register' | 'admin'>('welcome');
  const [soundActive, setSoundActive] = useState<boolean>(soundEngine.isEnabled());

  // Form states
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleToggleSound = () => {
    const next = soundEngine.toggle();
    setSoundActive(next);
    showToast(next ? 'Đã bật âm thanh 🔔' : 'Đã tắt âm thanh 🔕');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!username.trim()) {
      setErrorMessage('Vui lòng nhập tên đăng nhập hoặc email.');
      return;
    }
    soundEngine.playButtonClick();
    const success = login(username.trim());
    if (!success) {
      setErrorMessage('Tài khoản chưa tồn tại. Vui lòng bấm Đăng ký để tạo tài khoản mới.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!username.trim() || !displayName.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ họ tên và tên đăng nhập.');
      return;
    }
    soundEngine.playQuizSuccess();
    register(displayName.trim(), username.trim(), email.trim() || `${username.trim()}@thpt.edu.vn`);
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!adminPassword) {
      setErrorMessage('Vui lòng nhập mật khẩu quản trị.');
      return;
    }
    setLoading(true);
    soundEngine.playButtonClick();
    const success = await loginAsAdmin(adminPassword);
    setLoading(false);
    if (!success) {
      setErrorMessage('Mật khẩu quản trị viên không chính xác.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FEF9C3] via-[#FEF08A] to-[#FDE047] select-none p-4">
      {/* Sunbeam and ambient lighting effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-300/40 rounded-full blur-3xl animate-sunbeam pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-orange-300/30 rounded-full blur-3xl animate-sunbeam pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-lime-300/40 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative floating game elements */}
      <div className="absolute top-8 left-8 text-3xl animate-warm-float pointer-events-none opacity-80">📖</div>
      <div className="absolute top-16 right-12 text-3xl animate-warm-float pointer-events-none opacity-80" style={{ animationDelay: '1.2s' }}>🌸</div>
      <div className="absolute bottom-20 left-12 text-3xl animate-gentle-sway pointer-events-none opacity-70">🌱</div>
      <div className="absolute bottom-16 right-16 text-3xl animate-warm-float pointer-events-none opacity-80" style={{ animationDelay: '2s' }}>🌻</div>
      <div className="absolute top-1/3 left-6 text-2xl animate-warm-float pointer-events-none opacity-60" style={{ animationDelay: '0.7s' }}>✨</div>
      <div className="absolute top-2/3 right-8 text-2xl animate-warm-float pointer-events-none opacity-60" style={{ animationDelay: '1.8s' }}>🍃</div>

      {/* Audio toggle & admin corner button */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={handleToggleSound}
          id="gateway-sound-toggle-btn"
          className="p-2.5 rounded-full bg-white/80 hover:bg-white text-amber-900 border border-amber-200/80 shadow-sm transition hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-medium"
          title="Bật/tắt âm thanh"
        >
          {soundActive ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          <span className="hidden sm:inline">{soundActive ? 'Âm thanh bật' : 'Âm thanh tắt'}</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playButtonClick();
            setMode(mode === 'admin' ? 'welcome' : 'admin');
            setErrorMessage(null);
          }}
          id="gateway-admin-mode-btn"
          className="p-2.5 rounded-full bg-white/80 hover:bg-white text-amber-900 border border-amber-200/80 shadow-sm transition hover:scale-105 active:scale-95 flex items-center gap-1 text-xs font-medium"
          title="Cổng Quản Trị Viên"
        >
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span className="hidden sm:inline">Admin</span>
        </button>
      </div>

      {/* Center Gateway Content Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-200/90 text-center relative overflow-hidden">
          {/* Subtle top banner shimmer */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-lime-400" />

          {/* Golden Sun & Sprout Icon */}
          <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-orange-200 border-4 border-white shadow-lg flex items-center justify-center mb-4 relative">
            <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 animate-spin-slow" />
            <span className="absolute bottom-1 right-2 text-xl">🌱</span>
          </div>

          {/* Main Title: poetic script font */}
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-950 font-script tracking-wide mb-1 drop-shadow-sm">
            Nắng Của Văn Học
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-amber-800/90 font-medium mb-1">
            Đọc một trang sách, gieo một mầm xanh.
          </p>

          <p className="text-xs text-amber-700/75 mb-6 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Thư viện tác phẩm & Khu vườn tri thức THPT</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </p>

          {/* Error notice */}
          {errorMessage && (
            <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-shake">
              {errorMessage}
            </div>
          )}

          {/* Mode 1: Welcome Choice */}
          {mode === 'welcome' && (
            <div className="space-y-3">
              <button
                onClick={() => {
                  soundEngine.playButtonClick();
                  setMode('login');
                  setErrorMessage(null);
                }}
                id="gateway-login-choice-btn"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 border-b-4 border-amber-700"
              >
                <KeyRound className="w-5 h-5" />
                <span>ĐĂNG NHẬP</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playButtonClick();
                  setMode('register');
                  setErrorMessage(null);
                }}
                id="gateway-register-choice-btn"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-600 hover:to-emerald-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 border-b-4 border-emerald-800"
              >
                <UserPlus className="w-5 h-5" />
                <span>ĐĂNG KÝ MỚI</span>
              </button>

              <div className="pt-2 text-xs text-amber-900/60 flex items-center justify-center gap-1">
                <span>Tài khoản mới bắt đầu với 0 điểm & chậu hạt giống sạch</span>
              </div>
            </div>
          )}

          {/* Mode 2: Student Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Tên đăng nhập hoặc Email học sinh:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ví dụ: thaomy_thpt hoặc email..."
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                id="gateway-submit-login-btn"
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md transition transform active:scale-98 flex items-center justify-center gap-2 border-b-4 border-amber-700"
              >
                <BookOpen className="w-4 h-4" />
                <span>VÀO KHÔNG GIAN ĐỌC SÁCH</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-amber-800 font-semibold hover:underline"
                >
                  Chưa có tài khoản? Đăng ký ngay
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('welcome');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-amber-700/80 hover:text-amber-950"
                >
                  Quay lại
                </button>
              </div>
            </form>
          )}

          {/* Mode 3: Student Register Form (Strictly 0-State New Account) */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Họ và tên của bạn:
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Thảo My"
                  required
                  autoFocus
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Tên đăng nhập (viết liền không dấu):
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ví dụ: thaomy12"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Email (tùy chọn):
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="thaomy@thpt.edu.vn"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-lime-50 border border-lime-200 text-lime-900 text-xs flex items-start gap-1.5">
                <span className="text-base leading-none">🌱</span>
                <span>Tài khoản mới sẽ bắt đầu sạch ở Cấp 0, 0 Ngòi Bút, 0 Giọt Tri Thức và một chậu hạt giống để bạn nuôi lớn!</span>
              </div>

              <button
                type="submit"
                id="gateway-submit-register-btn"
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-600 hover:to-emerald-700 text-white font-bold text-sm shadow-md transition transform active:scale-98 flex items-center justify-center gap-2 border-b-4 border-emerald-800"
              >
                <UserPlus className="w-4 h-4" />
                <span>KHỞI TẠO TÀI KHOẢN MỚI</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-amber-800 font-semibold hover:underline"
                >
                  Đã có tài khoản? Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('welcome');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-amber-700/80 hover:text-amber-950"
                >
                  Quay lại
                </button>
              </div>
            </form>
          )}

          {/* Mode 4: Admin Access */}
          {mode === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-3.5 text-left">
              <div className="p-3 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-xs mb-2">
                <p className="font-semibold mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Xác thực Quản Trị Viên</span>
                </p>
                <p className="text-amber-800/90">
                  Tài khoản dành riêng cho Ban Quản trị để quản lý thư viện sách và hệ thống.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Mật khẩu quản trị:
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Nhập mã bí mật quản trị viên..."
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                id="gateway-submit-admin-btn"
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800 hover:to-orange-900 text-white font-bold text-sm shadow-md transition transform active:scale-98 flex items-center justify-center gap-2 border-b-4 border-amber-950 disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? 'Đang xác thực...' : 'ĐĂNG NHẬP QUẢN TRỊ VIÊN'}</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode('welcome');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-amber-800 hover:underline"
                >
                  ← Quay lại trang bắt đầu
                </button>
              </div>
            </form>
          )}

          {/* Footer note inside card */}
          <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-center gap-1 text-[11px] text-amber-800/60">
            <span>Dành riêng cho học sinh THPT yêu mến văn chương</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
