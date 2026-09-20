import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sun, Feather, BookOpen, Check, ShieldCheck, Sprout } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { MascotMiuTho } from './CartoonMascots';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, showToast } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('register');

  // Login inputs
  const [loginIdentifier, setLoginIdentifier] = useState('');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      showToast('Cậu hãy nhập tên đăng nhập hoặc email nhé! 📜');
      return;
    }
    soundEngine.playLevelUp();
    login(loginIdentifier.trim());
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      showToast('Cậu hãy nhập họ và tên của mình nhé! 🌸');
      return;
    }
    soundEngine.playLevelUp();
    register(
      regName.trim(),
      regUsername.trim() || 'hocsinh_' + Math.floor(Math.random() * 1000),
      regEmail.trim() || `${regUsername || 'hocsinh'}@thpt.edu.vn`
    );
  };

  return (
    <div
      id="auth-modal-backdrop"
      onClick={() => setIsAuthModalOpen(false)}
      className="fixed inset-0 z-50 bg-[#3B2414]/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fade-in"
    >
      <div
        id="auth-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FFF8DC] border-4 border-[#8B5A2B] rounded-3xl shadow-[0_12px_0_#5C3A1E,0_20px_30px_rgba(0,0,0,0.3)] overflow-hidden p-6 sm:p-8 relative"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playButtonClick();
            setIsAuthModalOpen(false);
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414] hover:bg-[#FF8A00] hover:text-white flex items-center justify-center font-black transition-colors"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Modal Brand Title with Mascot */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] flex items-center justify-center text-white mx-auto mb-3 animate-warm-float">
            <Sun className="w-8 h-8 text-[#FF8A00] fill-[#FF8A00]" />
          </div>
          <h2 className="font-literary text-3xl font-black text-[#3B2414]">
            Nắng Của Văn Học
          </h2>
          <p className="text-xs font-bold text-[#FF8A00] mt-1 uppercase tracking-wider">
            Vé Vào Cổng Khu Vườn Kỳ Diệu 🌻
          </p>
        </div>

        {/* Tabs: Đăng ký / Đăng nhập */}
        <div className="flex rounded-2xl bg-[#FFFEF2] p-1.5 mb-6 border-2 border-[#8B5A2B] gap-1">
          <button
            onClick={() => {
              soundEngine.playButtonClick();
              setTab('register');
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              tab === 'register'
                ? 'bg-[#FFF21F] text-[#3B2414] border-2 border-[#8B5A2B] shadow-[0_2px_0_#8B5A2B]'
                : 'text-[#8B5A2B] hover:text-[#3B2414]'
            }`}
          >
            Tạo Bạn Đọc Mới 🌱
          </button>
          <button
            onClick={() => {
              soundEngine.playButtonClick();
              setTab('login');
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              tab === 'login'
                ? 'bg-[#FFF21F] text-[#3B2414] border-2 border-[#8B5A2B] shadow-[0_2px_0_#8B5A2B]'
                : 'text-[#8B5A2B] hover:text-[#3B2414]'
            }`}
          >
            Đăng Nhập 📖
          </button>
        </div>

        {tab === 'register' ? (
          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Clean Start Notice */}
            <div className="p-3 rounded-2xl bg-[#E8F8EA] border-2 border-[#39C95A] text-xs font-bold text-[#14532D] flex items-start gap-2.5 shadow-xs">
              <Sprout className="w-5 h-5 text-[#39C95A] shrink-0 mt-0.5" />
              <span>
                <strong>Khởi đầu mầm hạt:</strong> Bạn sẽ nhận 0 ngòi bút, Cấp 0 và một chậu hoa hạt giống tinh khôi để bắt đầu chăm sóc!
              </span>
            </div>

            <div>
              <label className="block text-xs font-black text-[#3B2414] mb-1">
                Họ và tên học sinh *
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Phương Linh..."
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#3B2414] mb-1">
                Tên đăng nhập (username)
              </label>
              <input
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="Ví dụ: phuonglinh_thpt..."
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#3B2414] mb-1">
                Địa chỉ Email
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="Ví dụ: phuonglinh@thpt.edu.vn..."
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <button
              type="submit"
              className="btn-cartoon-primary w-full py-3 text-xs sm:text-sm font-black mt-2"
            >
              GIA NHẬP “NẮNG CỦA VĂN HỌC” ✨
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-[#3B2414] mb-1">
                Tên đăng nhập hoặc Email
              </label>
              <input
                type="text"
                required
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                placeholder="Nhập username hoặc email của bạn..."
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <p className="text-xs font-bold text-[#5C3A1E] leading-relaxed p-3 bg-[#FFF21F]/40 border-2 border-[#8B5A2B]/40 rounded-2xl">
              💡 Mẹo khám phá: Nhập bất kỳ tên nào để vào, hoặc nhập <code>thaomy_thpt</code> để trải nghiệm tài khoản mẫu đã đạt 24 ngòi bút.
            </p>

            <button
              type="submit"
              className="btn-cartoon-primary w-full py-3 text-xs sm:text-sm font-black"
            >
              BƯỚC VÀO KHU VƯỜN SÁCH 🌻
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
