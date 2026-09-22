import React, { useState, useRef, useEffect } from 'react';
import { Book, Chapter, AIMessage } from '../types';
import { Sparkles, Send, Bot, User as UserIcon, X, Loader2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AIChatDrawerProps {
  book: Book;
  currentChapter: Chapter;
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  book,
  currentChapter,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Xin chào bạn! Mình là bạn đồng hành đọc sách của “Nắng Của Văn Học”. ☀️📚\n\nBạn đang cùng mình tìm hiểu tác phẩm “${book.title}” của tác giả ${book.author}.\nMình sẵn sàng cùng bạn khám phá diễn biến cốt truyện, giải nghĩa từ ngữ, tìm hiểu tính cách nhân vật hay ý nghĩa của từng chi tiết đắt giá.\n\nHãy nhập bất kỳ câu hỏi nào bạn đang thắc mắc nhé!`,
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    const textToSend = inputValue.trim();
    if (!textToSend || isLoading) return;

    soundEngine.playButtonClick();

    const userMsg: AIMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: 'Vừa xong',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          prompt: textToSend,
          bookTitle: book.title,
          chapterTitle: currentChapter.title,
          excerpt: currentChapter.content.slice(0, 400),
        }),
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      const aiReply: AIMessage = {
        id: 'reply-' + Date.now(),
        sender: 'ai',
        text: data.reply || 'Xin lỗi bạn, hiện tại hệ thống đang bận một chút. Bạn vui lòng thử lại sau ít phút nhé!',
        timestamp: 'Vừa xong',
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn('AI assistant request fallback activated:', err);
      const fallbackReply: AIMessage = {
        id: 'reply-' + Date.now(),
        sender: 'ai',
        text: `Về câu hỏi "${textToSend}" trong tác phẩm "${book.title}": Chi tiết này gắn liền với bối cảnh và diễn biến tâm trạng của nhân vật. Bạn có thể theo dõi các tình huống tiếp theo của tác phẩm hoặc hỏi chi tiết hơn về nhân vật để cùng mình thảo luận nhé!`,
        timestamp: 'Vừa xong',
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      id="ai-literary-assistant"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#FFF8DC] border-l-4 border-[#8B5A2B] shadow-[-10px_0_25px_rgba(92,58,30,0.3)] flex flex-col transition-all duration-300 select-none animate-fade-in"
    >
      {/* Drawer Header (Wooden sign bar) - Fixed at Top */}
      <div className="px-5 py-4 border-b-3 border-[#8B5A2B] bg-[#FFF21F] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF8A00] border-2 border-[#8B5A2B] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-literary text-lg font-black text-[#3B2414]">
              Bạn Đồng Hành Đọc Sách ☀️
            </h3>
            <p className="text-[11px] font-bold text-[#8B5A2B]">
              Đang cùng bạn đọc: “{book.title}”
            </p>
          </div>
        </div>

        <button
          id="btn-close-ai-drawer"
          onClick={() => {
            soundEngine.playButtonClick();
            onClose();
          }}
          className="w-8 h-8 rounded-xl bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] hover:bg-[#FF5FA2] hover:text-white flex items-center justify-center font-black transition-colors"
        >
          <X className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      {/* Messages List - Independent Scroll Area filling all available middle space */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-xl bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#FF8A00] flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm font-bold leading-relaxed whitespace-pre-wrap border-3 ${
                  isAI
                    ? 'bg-[#FFFEF2] text-[#3B2414] border-[#8B5A2B] shadow-[0_3px_0_#8B5A2B]'
                    : 'bg-[#FF8A00] text-white border-[#5C3A1E] shadow-[0_3px_0_#5C3A1E]'
                }`}
              >
                {msg.text}
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-xl bg-[#FF8A00] border-2 border-[#5C3A1E] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <UserIcon className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-[#FFF21F] border-2 border-[#8B5A2B] text-[#FF8A00] flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-[#FFFEF2] border-3 border-[#8B5A2B] rounded-2xl p-3.5 text-xs font-bold text-[#5C3A1E] flex items-center gap-2 shadow-[0_3px_0_#8B5A2B]">
              <Loader2 className="w-4 h-4 animate-spin text-[#FF8A00]" />
              <span>Đang đọc lại tác phẩm và suy ngẫm câu trả lời...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Form - Fixed at Bottom, No overlaying components */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3.5 sm:p-4 border-t-3 border-[#8B5A2B] flex items-center gap-2 bg-[#FFF8DC] shrink-0"
      >
        <input
          id="ai-question-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Hỏi về “${book.title}” (ví dụ: Vì sao nhân vật lại làm vậy?)...`}
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#FFFEF2] border-2 border-[#8B5A2B] text-[#3B2414] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
        />
        <button
          id="btn-send-ai-question"
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="btn-cartoon-primary p-3 rounded-2xl disabled:opacity-40 shrink-0"
          title="Gửi câu hỏi"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
