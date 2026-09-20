import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LITERARY_CHALLENGES } from '../data/challenges';
import { Challenge } from '../types';
import { soundEngine } from '../utils/audio';
import {
  Award,
  Feather,
  CheckCircle,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
  ChevronRight,
  X
} from 'lucide-react';
import { MascotSeButHoa } from './CartoonMascots';

export const ChallengeView: React.FC = () => {
  const {
    currentUser,
    completedChallengeIds,
    completeChallenge,
    setIsAuthModalOpen,
    showToast
  } = useApp();

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isChallengeFinished, setIsChallengeFinished] = useState<boolean>(false);

  const userLevel = currentUser ? currentUser.level : 0;

  const handleStartChallenge = (challenge: Challenge) => {
    if (!currentUser) {
      showToast('Cậu hãy đăng nhập để cùng thử tài văn chương nhé! 🎯');
      setIsAuthModalOpen(true);
      return;
    }

    if (userLevel < challenge.requiredLevel) {
      showToast(`Cậu cần đạt Cấp độ ${challenge.requiredLevel} để mở khóa cột mốc này! 🌟`);
      return;
    }

    soundEngine.playButtonClick();
    setActiveChallenge(challenge);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setIsChallengeFinished(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeChallenge) return;

    setIsAnswerSubmitted(true);
    const q = activeChallenge.questions[currentQuestionIdx];
    if (selectedOption === q.correctIndex) {
      soundEngine.playQuizSuccess();
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      soundEngine.playQuizWrong();
    }
  };

  const handleNextQuestion = () => {
    if (!activeChallenge) return;

    soundEngine.playButtonClick();
    if (currentQuestionIdx < activeChallenge.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsChallengeFinished(true);
      const passed = correctAnswersCount + (selectedOption === activeChallenge.questions[currentQuestionIdx].correctIndex ? 1 : 0) >= Math.ceil(activeChallenge.questions.length / 2);
      if (passed) {
        soundEngine.playLevelUp();
        completeChallenge(activeChallenge.id, activeChallenge.rewardPoints);
      }
    }
  };

  return (
    <div id="challenge-view" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* 1. Header with Mascot Sẻ Bút Hoa */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative">
        <div className="absolute -top-6 right-0 sm:right-10 hidden sm:block">
          <MascotSeButHoa size={75} speechText="Sẻ Bút Hoa sẵn sàng chấm bài nè! 🪶" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#3B2414] text-xs font-black uppercase tracking-wider mb-3 shadow-[0_3px_0_#8B5A2B]">
          <Award className="w-4 h-4 text-[#FF8A00]" />
          <span>VÕ ĐÀI TRÍ TUỆ VĂN CHƯƠNG HOẠT HÌNH</span>
        </div>
        <h1 className="font-literary text-4xl sm:text-5xl font-black text-[#3B2414] mb-2 drop-shadow-xs">
          Thử Tài Văn Chương
        </h1>
        <p className="text-sm sm:text-base font-bold text-[#5C3A1E] leading-relaxed">
          Vượt qua các câu hỏi văn học để thu thập thật nhiều <strong>Ngòi Bút ✒️</strong> và nâng cấp khu vườn nhé!
        </p>
      </div>

      {/* 2. User Progress Wooden Plaque */}
      <div className="wood-signboard p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] flex items-center justify-center text-[#FF8A00]">
            <Feather className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-literary text-xl font-black text-[#3B2414]">
              {currentUser ? currentUser.displayName : 'Khách vãng lai'} — Cấp {userLevel} 🌟
            </h3>
            <p className="text-xs font-bold text-[#5C3A1E]">
              Đã chinh phục {completedChallengeIds.length} / {LITERARY_CHALLENGES.length} cột mốc văn chương
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-2xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] flex items-center gap-2">
            <Feather className="w-5 h-5 text-[#FF8A00]" />
            <span className="font-black text-base text-[#3B2414]">
              {currentUser ? currentUser.points : 0}
            </span>
            <span className="text-xs font-bold text-[#8B5A2B]">ngòi bút</span>
          </div>
        </div>
      </div>

      {/* 3. Garden Stepping Stone Roadmap: 0 → 1 → 2 → 3 → 4 → 5 */}
      <div className="mb-12">
        <h3 className="text-xs font-black tracking-widest uppercase text-[#8B5A2B] mb-6 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF8A00]" />
          <span>LỘ TRÌNH ĐÁ HOA BƯỚC KHÁM PHÁ VĂN CHƯƠNG</span>
        </h3>

        {/* Garden Path Roadmap */}
        <div className="relative flex items-center justify-between max-w-3xl mx-auto px-4 py-4">
          {/* Connector Path (Wooden beam) */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-3 bg-[#8B5A2B] border-2 border-[#5C3A1E] rounded-full z-0 shadow-sm" />

          {/* Initial 0 Milestone: Start */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FFFEF2] border-3 border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B] flex items-center justify-center text-sm font-black text-[#3B2414]">
              🌱
            </div>
            <span className="text-xs font-black text-[#5C3A1E] mt-2">
              Bắt đầu
            </span>
          </div>

          {/* Challenges 1 through 5 */}
          {LITERARY_CHALLENGES.map((ch) => {
            const isCompleted = completedChallengeIds.includes(ch.id);
            const isLocked = userLevel < ch.requiredLevel;
            const isAvailable = !isLocked && !isCompleted;

            return (
              <button
                key={ch.id}
                id={`milestone-step-${ch.level}`}
                onClick={() => handleStartChallenge(ch)}
                disabled={isLocked}
                className="relative z-10 flex flex-col items-center focus:outline-none transition-transform hover:scale-110"
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center text-sm font-black border-3 transition-all ${
                    isCompleted
                      ? 'bg-[#39C95A] text-white border-[#14532D] shadow-[0_4px_0_#14532D]'
                      : isAvailable
                      ? 'bg-[#FFF21F] text-[#3B2414] border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] animate-bounce'
                      : 'bg-[#E0D0BF] text-[#8B5A2B] border-[#8B5A2B]/40 opacity-70 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 stroke-[3]" />
                  ) : isLocked ? (
                    <Lock className="w-5 h-5" />
                  ) : (
                    ch.level
                  )}
                </div>
                <span
                  className={`text-xs font-black mt-2 ${
                    isCompleted
                      ? 'text-[#16A34A]'
                      : isAvailable
                      ? 'text-[#FF8A00]'
                      : 'text-[#8B5A2B]'
                  }`}
                >
                  Mốc {ch.level}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Challenge Detail Cards List */}
      {!activeChallenge && (
        <div className="space-y-4">
          {LITERARY_CHALLENGES.map((ch) => {
            const isCompleted = completedChallengeIds.includes(ch.id);
            const isLocked = userLevel < ch.requiredLevel;

            return (
              <div
                key={ch.id}
                id={`challenge-card-${ch.id}`}
                className={`p-6 rounded-3xl border-3 transition-all ${
                  isCompleted
                    ? 'bg-[#FFFEF2] border-[#39C95A] shadow-[0_4px_0_#14532D]'
                    : isLocked
                    ? 'bg-[#EFE6DB]/70 border-[#8B5A2B]/30 opacity-75'
                    : 'storybook-card hover:scale-[1.01]'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-3 ${
                        isCompleted
                          ? 'bg-[#39C95A] text-white border-[#14532D]'
                          : isLocked
                          ? 'bg-[#E0D0BF] text-[#8B5A2B] border-[#8B5A2B]/40'
                          : 'bg-[#FFF21F] text-[#FF8A00] border-[#8B5A2B]'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <Award className="w-7 h-7" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-wider text-[#FF8A00]">
                          Cột mốc {ch.level}
                        </span>
                        {isCompleted && (
                          <span className="badge-game-green text-[10px]">
                            ĐÃ HOÀN THÀNH ⭐
                          </span>
                        )}
                        {isLocked && (
                          <span className="text-[10px] font-bold text-[#8B5A2B]">
                            (Yêu cầu Cấp độ {ch.requiredLevel})
                          </span>
                        )}
                      </div>

                      <h3 className="font-literary text-xl font-black text-[#3B2414]">
                        {ch.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-[#5C3A1E] mt-1 max-w-xl">
                        {ch.subtitle} — {ch.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-black text-[#FF8A00] flex items-center gap-1 justify-end">
                        <Feather className="w-4 h-4" />+{ch.rewardPoints}
                      </span>
                      <span className="text-[11px] font-bold text-[#8B5A2B]">ngòi bút thưởng</span>
                    </div>

                    <button
                      id={`btn-start-${ch.id}`}
                      onClick={() => handleStartChallenge(ch)}
                      disabled={isLocked}
                      className={`btn-cartoon-yellow px-5 py-2.5 text-xs font-black flex items-center gap-1.5 ${
                        isLocked ? 'opacity-40 cursor-not-allowed' : ''
                      }`}
                    >
                      <span>{isCompleted ? 'Luyện tập lại' : 'VÀO THỬ TÀI'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Active Quiz Question Parchment Screen */}
      {activeChallenge && !isChallengeFinished && (
        <div className="storybook-card p-6 sm:p-8">
          {/* Top header of quiz */}
          <div className="flex items-center justify-between pb-4 border-b-3 border-[#8B5A2B]/30 mb-6">
            <div>
              <span className="text-xs font-black text-[#FF8A00] uppercase tracking-wider">
                Mốc {activeChallenge.level}: {activeChallenge.title}
              </span>
              <h2 className="font-literary text-2xl font-black text-[#3B2414] mt-0.5">
                Câu hỏi {currentQuestionIdx + 1} / {activeChallenge.questions.length}
              </h2>
            </div>

            <button
              onClick={() => setActiveChallenge(null)}
              className="text-xs font-black text-[#8B5A2B] hover:text-[#3B2414] px-3.5 py-1.5 rounded-xl border-2 border-[#8B5A2B] bg-[#FFF8DC]"
            >
              Thoát thử thách
            </button>
          </div>

          {/* Current Question Body */}
          {(() => {
            const q = activeChallenge.questions[currentQuestionIdx];
            return (
              <div>
                <p className="font-literary text-xl sm:text-2xl font-black text-[#3B2414] mb-6 leading-relaxed">
                  {q.question}
                </p>

                <div className="space-y-3.5 mb-6">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    let optionStyle = 'bg-[#FFFEF2] border-[#8B5A2B] text-[#3B2414] hover:bg-[#FFF8DC]';

                    if (isAnswerSubmitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-[#39C95A] border-[#14532D] text-white font-black shadow-[0_3px_0_#14532D]';
                      } else if (isSelected && optIdx !== q.correctIndex) {
                        optionStyle = 'bg-[#FF5FA2] border-[#8B5A2B] text-white line-through font-bold';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-[#FFF21F] border-[#8B5A2B] text-[#3B2414] font-black shadow-[0_3px_0_#8B5A2B]';
                    }

                    return (
                      <button
                        key={optIdx}
                        id={`option-${optIdx}`}
                        disabled={isAnswerSubmitted}
                        onClick={() => setSelectedOption(optIdx)}
                        className={`w-full text-left p-4 rounded-2xl border-3 text-sm sm:text-base font-bold transition-all flex items-start gap-3.5 ${optionStyle}`}
                      >
                        <span className="w-8 h-8 rounded-xl bg-[#8B5A2B] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-sm">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed pt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box with Mascot feedback */}
                {isAnswerSubmitted && (
                  <div className="p-5 rounded-3xl bg-[#FFF8DC] border-3 border-[#8B5A2B] mb-6 flex items-start gap-4">
                    <div className="shrink-0">
                      {selectedOption === q.correctIndex ? (
                        <MascotSeButHoa size={60} speechText="Tuyệt vời! Cậu trả lời chuẩn xác lắm! 🎉" />
                      ) : (
                        <MascotSeButHoa size={60} speechText="Cố lên bạn nhỏ, đọc lại tác phẩm một chút là nhớ ngay thôi! 🪶" />
                      )}
                    </div>
                    <div>
                      <div className="font-black flex items-center gap-1.5 text-[#FF8A00] mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>Lời giải thích văn học:</span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#5C3A1E] leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                )}

                {/* Bottom Action */}
                <div className="flex justify-end gap-3 pt-4 border-t-3 border-[#8B5A2B]/30">
                  {!isAnswerSubmitted ? (
                    <button
                      id="btn-submit-answer"
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="btn-cartoon-primary px-8 py-3 text-sm font-black disabled:opacity-40"
                    >
                      XÁC NHẬN CÂU TRẢ LỜI
                    </button>
                  ) : (
                    <button
                      id="btn-next-question"
                      onClick={handleNextQuestion}
                      className="btn-cartoon-yellow px-8 py-3 text-sm font-black flex items-center gap-2"
                    >
                      <span>
                        {currentQuestionIdx === activeChallenge.questions.length - 1
                          ? 'XEM KẾT QUẢ'
                          : 'CÂU TIẾP THEO'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 6. Challenge Completed Summary View */}
      {isChallengeFinished && activeChallenge && (
        <div className="storybook-card p-8 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_5px_0_#8B5A2B] flex items-center justify-center text-[#FF8A00] mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="font-literary text-3xl font-black text-[#3B2414] mb-2">
            Hoàn thành Thử Thách! 🎉
          </h2>
          <p className="text-sm font-bold text-[#5C3A1E] mb-6">
            Bạn đã trả lời đúng {correctAnswersCount} / {activeChallenge.questions.length} câu hỏi văn học.
          </p>

          <div className="p-4 rounded-2xl bg-[#FFF21F] border-3 border-[#8B5A2B] shadow-[0_4px_0_#8B5A2B] flex items-center justify-center gap-3 mb-6">
            <Feather className="w-6 h-6 text-[#FF8A00]" />
            <span className="font-black text-base text-[#3B2414]">
              +{activeChallenge.rewardPoints} ngòi bút đã được cộng vào tài khoản!
            </span>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setActiveChallenge(null)}
              className="btn-cartoon-primary px-8 py-3.5 text-sm font-black"
            >
              QUAY LẠI CÁC THỬ THÁCH
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
