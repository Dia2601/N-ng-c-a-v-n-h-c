import React from 'react';

/**
 * 2D Cartoon Fantasy Mascot Characters for "Nắng Của Văn Học"
 * Stylized, cozy, whimsical, perfect for high school literature lovers:
 * - Miu Thơ: Chú mèo cam tròn xoe ôm cuốn sách ma thuật
 * - Mầm Tri Thức: Sinh vật mầm cây nhỏ màu xanh tươi tưới nước tri thức
 * - Sẻ Bút Hoa: Chú chim sẻ xanh biếc ngậm bút lông vàng
 * - Sách Bay Thần Kỳ: Cuốn sách cổ tích có cánh lượn bay
 */

interface MascotProps {
  className?: string;
  size?: number;
  speechText?: string;
  animate?: boolean;
}

// 1. Chú mèo cam ôm sách - Miu Thơ
export const MascotMiuTho: React.FC<MascotProps> = ({
  className = '',
  size = 110,
  speechText,
  animate = true
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {speechText && (
        <div className="mb-2 px-3 py-1.5 bg-[#FFF8DC] border-2 border-[#8B5A2B] rounded-2xl shadow-[0_4px_0_#8B5A2B] text-xs font-bold text-[#3B2414] relative animate-bounce max-w-[180px] text-center">
          {speechText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-[#8B5A2B]" />
        </div>
      )}

      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 120 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${animate ? 'hover:scale-110 transition-transform duration-300' : ''}`}
      >
        <defs>
          <filter id="mascotGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#8B5A2B" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Tail wagging */}
        <path
          d="M25 90 C10 85 8 60 20 52 C24 49 28 53 26 58 C18 68 22 80 32 82 Z"
          fill="#FF8A00"
          stroke="#8B5A2B"
          strokeWidth="3"
          strokeLinecap="round"
          className={animate ? 'animate-gentle-sway origin-bottom' : ''}
        />

        {/* Cat Body */}
        <ellipse
          cx="60"
          cy="78"
          rx="38"
          ry="34"
          fill="#FF8A00"
          stroke="#8B5A2B"
          strokeWidth="3.5"
          filter="url(#mascotGlow)"
        />
        {/* Cat Belly (Cream) */}
        <ellipse cx="60" cy="85" rx="24" ry="20" fill="#FFF8DC" />

        {/* Left Ear */}
        <path
          d="M32 40 L22 14 C20 10 25 8 29 11 L45 28 Z"
          fill="#FF8A00"
          stroke="#8B5A2B"
          strokeWidth="3"
        />
        <path d="M28 26 L24 16 L36 28 Z" fill="#FF5FA2" />

        {/* Right Ear */}
        <path
          d="M88 40 L98 14 C100 10 95 8 91 11 L75 28 Z"
          fill="#FF8A00"
          stroke="#8B5A2B"
          strokeWidth="3"
        />
        <path d="M92 26 L96 16 L84 28 Z" fill="#FF5FA2" />

        {/* Cat Head */}
        <ellipse
          cx="60"
          cy="46"
          rx="36"
          ry="30"
          fill="#FF8A00"
          stroke="#8B5A2B"
          strokeWidth="3.5"
        />

        {/* Cheeks / White fur patches */}
        <ellipse cx="44" cy="53" rx="12" ry="9" fill="#FFFEF2" />
        <ellipse cx="76" cy="53" rx="12" ry="9" fill="#FFFEF2" />

        {/* Rosy Blush */}
        <ellipse cx="36" cy="52" rx="5" ry="3.5" fill="#FF5FA2" opacity="0.7" />
        <ellipse cx="84" cy="52" rx="5" ry="3.5" fill="#FF5FA2" opacity="0.7" />

        {/* Big Curious Eyes */}
        <ellipse cx="48" cy="42" rx="5.5" ry="7" fill="#3B2414" />
        <ellipse cx="72" cy="42" rx="5.5" ry="7" fill="#3B2414" />
        {/* Eye Sparkles */}
        <circle cx="46" cy="39" r="2.2" fill="#FFFFFF" />
        <circle cx="50" cy="44" r="1.2" fill="#FFFFFF" />
        <circle cx="70" cy="39" r="2.2" fill="#FFFFFF" />
        <circle cx="74" cy="44" r="1.2" fill="#FFFFFF" />

        {/* Cute Nose & Mouth */}
        <polygon points="60,47 57,44 63,44" fill="#FF5FA2" />
        <path
          d="M55 50 Q60 54 65 50"
          stroke="#3B2414"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Whiskers */}
        <line x1="28" y1="46" x2="16" y2="44" stroke="#8B5A2B" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="50" x2="15" y2="52" stroke="#8B5A2B" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="46" x2="104" y2="44" stroke="#8B5A2B" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="50" x2="105" y2="52" stroke="#8B5A2B" strokeWidth="2" strokeLinecap="round" />

        {/* Cute Leaf Bookmark on Head */}
        <path
          d="M60 18 Q68 12 64 26 Q54 22 60 18 Z"
          fill="#39C95A"
          stroke="#16A34A"
          strokeWidth="1.5"
        />

        {/* The Magic Book hugged in paws */}
        <g transform="translate(32, 68)">
          {/* Book Spine & Cover (Bright Gold & Sunshine Yellow) */}
          <rect
            x="0"
            y="2"
            width="56"
            height="38"
            rx="4"
            fill="#FFC928"
            stroke="#8B5A2B"
            strokeWidth="3"
          />
          <rect x="4" y="5" width="48" height="32" rx="2" fill="#FFF21F" />
          {/* Pages outline */}
          <rect x="7" y="7" width="42" height="28" rx="2" fill="#FFF8DC" />
          {/* Star on book */}
          <polygon
            points="28,14 31,21 38,21 32,25 34,32 28,28 22,32 24,25 18,21 25,21"
            fill="#FF8A00"
          />
          {/* Pink Ribbon bookmark */}
          <path d="M28 2 L28 40 L32 37 L36 40 L36 2 Z" fill="#FF5FA2" />
        </g>

        {/* Cat Paws holding book */}
        <ellipse cx="36" cy="80" rx="8" ry="6" fill="#FFF8DC" stroke="#8B5A2B" strokeWidth="2.5" />
        <ellipse cx="84" cy="80" rx="8" ry="6" fill="#FFF8DC" stroke="#8B5A2B" strokeWidth="2.5" />

        {/* Little Paws at bottom */}
        <ellipse cx="46" cy="110" rx="10" ry="7" fill="#FFF8DC" stroke="#8B5A2B" strokeWidth="2.5" />
        <ellipse cx="74" cy="110" rx="10" ry="7" fill="#FFF8DC" stroke="#8B5A2B" strokeWidth="2.5" />
      </svg>
    </div>
  );
};

// 2. Bé mầm xanh tưới nước - Mầm Tri Thức
export const MascotMamTriThuc: React.FC<MascotProps> = ({
  className = '',
  size = 100,
  speechText,
  animate = true
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {speechText && (
        <div className="mb-2 px-3 py-1.5 bg-[#FFF8DC] border-2 border-[#16A34A] rounded-2xl shadow-[0_4px_0_#14532D] text-xs font-bold text-[#14532D] relative animate-bounce max-w-[180px] text-center">
          {speechText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-[#16A34A]" />
        </div>
      )}

      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 110 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${animate ? 'hover:rotate-6 transition-transform duration-300' : ''}`}
      >
        {/* Leaf sprout on head */}
        <g className={animate ? 'animate-gentle-sway origin-bottom' : ''}>
          <path
            d="M55 25 C50 10 32 8 36 22 C38 28 48 26 55 25 Z"
            fill="#39C95A"
            stroke="#14532D"
            strokeWidth="2.5"
          />
          <path
            d="M55 25 C62 8 80 10 76 24 C72 29 60 27 55 25 Z"
            fill="#16A34A"
            stroke="#14532D"
            strokeWidth="2.5"
          />
          <line x1="55" y1="25" x2="55" y2="35" stroke="#14532D" strokeWidth="3" />
        </g>

        {/* Chubby Round Green Body */}
        <ellipse
          cx="55"
          cy="66"
          rx="34"
          ry="32"
          fill="#39C95A"
          stroke="#14532D"
          strokeWidth="3.5"
        />
        {/* Lime belly */}
        <ellipse cx="55" cy="74" rx="22" ry="18" fill="#FFF21F" opacity="0.85" />

        {/* Cheeks Blush */}
        <circle cx="34" cy="66" r="5" fill="#FF5FA2" opacity="0.75" />
        <circle cx="76" cy="66" r="5" fill="#FF5FA2" opacity="0.75" />

        {/* Shiny Happy Eyes */}
        <ellipse cx="42" cy="58" rx="4.5" ry="6" fill="#14532D" />
        <ellipse cx="68" cy="58" rx="4.5" ry="6" fill="#14532D" />
        <circle cx="40" cy="55" r="2" fill="#FFFFFF" />
        <circle cx="66" cy="55" r="2" fill="#FFFFFF" />

        {/* Open Joyful Smile */}
        <path
          d="M50 68 Q55 76 60 68"
          fill="#FF5FA2"
          stroke="#14532D"
          strokeWidth="2.5"
        />

        {/* Watering Can held in right paw */}
        <g transform="translate(68, 62)">
          {/* Can body */}
          <rect
            x="4"
            y="4"
            width="22"
            height="18"
            rx="3"
            fill="#39C6FF"
            stroke="#168CFF"
            strokeWidth="2"
          />
          {/* Spout */}
          <path d="M26 8 L34 3 L35 7 L26 12 Z" fill="#168CFF" />
          {/* Handle */}
          <path
            d="M4 8 C-2 8 -2 18 4 18"
            stroke="#168CFF"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Magic Water Droplets */}
          <circle cx="38" cy="5" r="2" fill="#39C6FF" className="animate-ping" />
          <circle cx="42" cy="10" r="1.5" fill="#168CFF" />
        </g>

        {/* Little Leaf Hands */}
        <ellipse cx="30" cy="72" rx="6" ry="4.5" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
        <ellipse cx="72" cy="72" rx="6" ry="4.5" fill="#16A34A" stroke="#14532D" strokeWidth="2" />

        {/* Tiny feet */}
        <ellipse cx="44" cy="98" rx="8" ry="5" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
        <ellipse cx="66" cy="98" rx="8" ry="5" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
      </svg>
    </div>
  );
};

// 3. Chú chim sẻ ngậm bút lông - Sẻ Bút Hoa
export const MascotSeButHoa: React.FC<MascotProps> = ({
  className = '',
  size = 85,
  speechText,
  animate = true
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {speechText && (
        <div className="mb-2 px-3 py-1 bg-[#FFF8DC] border-2 border-[#168CFF] rounded-2xl shadow-[0_3px_0_#168CFF] text-xs font-bold text-[#168CFF] relative animate-bounce max-w-[160px] text-center">
          {speechText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-[#168CFF]" />
        </div>
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${animate ? 'animate-warm-float' : ''}`}
      >
        {/* Tail Feathers */}
        <path d="M15 55 L5 48 L14 62 L8 68 L22 64 Z" fill="#168CFF" stroke="#3B2414" strokeWidth="2" />

        {/* Bird Body */}
        <ellipse cx="46" cy="48" rx="26" ry="22" fill="#39C6FF" stroke="#3B2414" strokeWidth="3" />
        {/* Yellow belly */}
        <ellipse cx="48" cy="54" rx="16" ry="12" fill="#FFF21F" />

        {/* Wing */}
        <path
          d="M32 44 C26 44 24 56 34 60 C42 62 48 56 46 48 C44 44 38 44 32 44 Z"
          fill="#168CFF"
          stroke="#3B2414"
          strokeWidth="2.5"
        />

        {/* Big Eye */}
        <circle cx="60" cy="40" r="6" fill="#FFFFFF" stroke="#3B2414" strokeWidth="2" />
        <circle cx="62" cy="40" r="3.5" fill="#3B2414" />
        <circle cx="63" cy="38" r="1.5" fill="#FFFFFF" />

        {/* Beak with Gold Quill */}
        <polygon points="70,42 82,45 70,48" fill="#FF8A00" stroke="#3B2414" strokeWidth="1.5" />
        {/* Golden Quill Pen held in Beak */}
        <g transform="translate(62, 30) rotate(25)">
          <path
            d="M0 0 C12 -6 26 -2 30 12 C20 10 12 14 0 6 Z"
            fill="#FFC928"
            stroke="#8B5A2B"
            strokeWidth="1.5"
          />
          <line x1="0" y1="3" x2="28" y2="8" stroke="#FF8A00" strokeWidth="1.5" />
          <polygon points="0,3 -4,3 -2,4" fill="#3B2414" />
        </g>

        {/* Little Claws */}
        <line x1="42" y1="68" x2="40" y2="76" stroke="#FF8A00" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="68" x2="52" y2="76" stroke="#FF8A00" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// 4. Cuốn sách bay thần kỳ - Sách Bay Có Cánh
export const MascotFlyingBook: React.FC<{ size?: number; className?: string }> = ({
  size = 70,
  className = ''
}) => {
  return (
    <div className={`relative inline-block select-none animate-warm-float ${className}`}>
      <svg width={size} height={size * 0.75} viewBox="0 0 80 60" fill="none">
        {/* Left wing */}
        <path
          d="M24 28 C12 18 4 12 2 4 C14 8 20 18 25 24 Z"
          fill="#FFFDF2"
          stroke="#8B5A2B"
          strokeWidth="1.5"
          className="animate-gentle-sway origin-bottom-right"
        />
        {/* Right wing */}
        <path
          d="M56 28 C68 18 76 12 78 4 C66 8 60 18 55 24 Z"
          fill="#FFFDF2"
          stroke="#8B5A2B"
          strokeWidth="1.5"
          className="animate-gentle-sway origin-bottom-left"
        />
        {/* Book body */}
        <path
          d="M18 30 C30 25 38 29 40 31 C42 29 50 25 62 30 L60 48 C48 44 42 48 40 46 C38 48 32 44 20 48 Z"
          fill="#FF8A00"
          stroke="#8B5A2B"
          strokeWidth="2.5"
        />
        {/* Open Pages */}
        <path
          d="M20 27 C31 22 39 26 40 28 C41 26 49 22 60 27 L58 44 C48 40 42 44 40 43 C38 44 32 40 22 44 Z"
          fill="#FFF8DC"
          stroke="#FFC928"
          strokeWidth="1.5"
        />
        {/* Star sparkle */}
        <circle cx="40" cy="20" r="3" fill="#FFF21F" className="animate-ping" />
      </svg>
    </div>
  );
};

export const MascotKnowledgeSprout = MascotMamTriThuc;

