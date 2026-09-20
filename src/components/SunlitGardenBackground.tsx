import React from 'react';

/**
 * SunlitGardenBackground
 * 2D Cartoon Fantasy Storybook Landscape:
 * - Bright Sky Blue #39C6FF to warm horizon
 * - Giant Radiant Golden Sunshine #FFF21F with orange sunbeams #FF8A00
 * - Distant Emerald Rolling Hills & Fairy Treehouses
 * - Whimsical Storybook Library Cottage in the middle-distance (Book-roof, glowing windows, climbing vines)
 * - Winding stone pathway through lush flower meadows (Yellow, orange, pink, purple, blue blossoms)
 * - Layered overhanging cartoon leafy canopies on left & right sides
 * - Flying magic books, fluttering parchment pages, sparkling fireflies, colorful butterflies
 */
export const SunlitGardenBackground: React.FC<{ showStorybookLibrary?: boolean }> = ({
  showStorybookLibrary = true
}) => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* 1. SKY GRADIENT: Sky Blue (#39C6FF) into Sunlit Gold (#FFF8DC) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#39C6FF] via-[#7FE0FF]/80 to-[#FFF8DC]" />

      {/* 2. GIANT CARTOON SUN (Top Center/Right) */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 sm:left-auto sm:right-16 md:right-32 w-72 h-72 sm:w-96 sm:h-96">
        {/* Outer Sun Glow Rings */}
        <div className="absolute inset-0 rounded-full bg-[#FFF21F]/40 blur-2xl animate-sun-radiate" />
        <div className="absolute inset-8 rounded-full bg-[#FFC928]/50 blur-xl animate-sun-radiate" />
        
        {/* Core Sun Face / Disc with bold cartoon outline */}
        <div className="absolute inset-16 rounded-full bg-gradient-to-b from-[#FFF21F] to-[#FFC928] border-4 border-[#FF8A00] shadow-[0_0_40px_#FFF21F] flex items-center justify-center">
          {/* Subtle cartoon sun smile */}
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
            <ellipse cx="18" cy="14" rx="4" ry="5" fill="#8B5A2B" />
            <ellipse cx="42" cy="14" rx="4" ry="5" fill="#8B5A2B" />
            <circle cx="16" cy="12" r="1.5" fill="#FFFFFF" />
            <circle cx="40" cy="12" r="1.5" fill="#FFFFFF" />
            <circle cx="12" cy="20" r="4" fill="#FF8A00" opacity="0.6" />
            <circle cx="48" cy="20" r="4" fill="#FF8A00" opacity="0.6" />
            <path d="M22 22 Q30 30 38 22" stroke="#8B5A2B" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Radiating Sun Rays (Cartoon spikes) */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-spin [animation-duration:60s]"
          fill="none"
        >
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d="M200 40 L212 90 L188 90 Z"
              fill="#FFC928"
              opacity="0.85"
              transform={`rotate(${i * 30} 200 200)`}
            />
          ))}
        </svg>
      </div>

      {/* 3. WIDE RADIATING SUNBEAMS (Diagonal rays of light) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1400 800"
      >
        <defs>
          <linearGradient id="beamGrad1" x1="70%" y1="0%" x2="20%" y2="100%">
            <stop offset="0%" stopColor="#FFF21F" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#FFC928" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFF21F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beamGrad2" x1="80%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFF21F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFF21F" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="900,0 1020,0 250,800 120,800" fill="url(#beamGrad1)" />
        <polygon points="1050,0 1180,0 680,800 520,800" fill="url(#beamGrad2)" />
        <polygon points="800,0 920,0 0,800 0,720" fill="url(#beamGrad1)" />
      </svg>

      {/* 4. FLUFFY DRIFTING STORYBOOK CLOUDS */}
      <div className="absolute top-10 left-[8%] animate-warm-float">
        <svg width="180" height="70" viewBox="0 0 180 70" fill="none">
          <path
            d="M30 55 C15 55 5 45 10 32 C12 20 28 16 38 22 C48 10 75 8 88 20 C100 6 135 8 142 24 C158 20 172 32 168 45 C165 55 150 55 140 55 Z"
            fill="#FFFFFF"
            stroke="#168CFF"
            strokeWidth="2.5"
          />
          <path d="M40 38 Q50 34 60 38" stroke="#39C6FF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-20 right-[15%] animate-warm-float" style={{ animationDelay: '2s' }}>
        <svg width="140" height="55" viewBox="0 0 140 55" fill="none">
          <path
            d="M25 45 C12 45 4 36 8 26 C10 16 24 13 32 18 C40 8 62 6 72 16 C82 5 110 6 116 20 C128 16 138 26 134 36 C132 45 120 45 110 45 Z"
            fill="#FFFFFF"
            stroke="#168CFF"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* 5. DISTANT CARTOON MOUNTAINS & ROLLING EMERALD HILLS */}
      <div className="absolute bottom-16 sm:bottom-24 left-0 right-0 h-96">
        <svg
          className="absolute bottom-0 w-full h-80"
          preserveAspectRatio="none"
          viewBox="0 0 1400 400"
          fill="none"
        >
          {/* Distant Hills (Fresh Turquoise-Green) */}
          <path
            d="M0 220 Q280 120 620 180 Q980 240 1400 150 L1400 400 L0 400 Z"
            fill="#39C95A"
            stroke="#16A34A"
            strokeWidth="4"
          />
          {/* Middle Hills (Leaf Green #16A34A) */}
          <path
            d="M0 260 Q380 180 820 250 Q1150 190 1400 240 L1400 400 L0 400 Z"
            fill="#16A34A"
            stroke="#14532D"
            strokeWidth="4"
          />
        </svg>
      </div>

      {/* 6. WHIMSICAL STORYBOOK LIBRARY COTTAGE IN THE MIDDLE-DISTANCE (Positioned scenic on hillside) */}
      {showStorybookLibrary && (
        <div className="absolute bottom-28 sm:bottom-36 right-4 sm:right-16 md:right-28 scale-75 sm:scale-90 md:scale-100 drop-shadow-xl z-0 pointer-events-none">
          <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
            {/* Library Base Cottage (Warm Timber Wood) */}
            <rect
              x="50"
              y="90"
              width="140"
              height="85"
              rx="12"
              fill="#FFF8DC"
              stroke="#8B5A2B"
              strokeWidth="4"
            />
            {/* Wood planks lines */}
            <line x1="50" y1="115" x2="190" y2="115" stroke="#8B5A2B" strokeWidth="2" />
            <line x1="50" y1="145" x2="190" y2="145" stroke="#8B5A2B" strokeWidth="2" />

            {/* Book-Shaped Roof (A giant open magical book acting as the roof) */}
            <path
              d="M20 90 C65 65 110 80 120 85 C130 80 175 65 220 90 L205 102 C165 80 125 92 120 95 C115 92 75 80 35 102 Z"
              fill="#FF8A00"
              stroke="#8B5A2B"
              strokeWidth="4"
            />
            {/* Book Spine at top ridge */}
            <ellipse cx="120" cy="85" rx="8" ry="4" fill="#FFC928" stroke="#8B5A2B" strokeWidth="2" />
            {/* Pages edge in roof */}
            <path
              d="M32 94 C72 74 112 86 120 88 C128 86 168 74 208 94"
              stroke="#FFF8DC"
              strokeWidth="3"
            />

            {/* Glowing Arched Library Window */}
            <path
              d="M95 100 A25 25 0 0 1 145 100 L145 135 L95 135 Z"
              fill="#FFF21F"
              stroke="#8B5A2B"
              strokeWidth="3"
            />
            {/* Window panes */}
            <line x1="120" y1="75" x2="120" y2="135" stroke="#8B5A2B" strokeWidth="2.5" />
            <line x1="95" y1="108" x2="145" y2="108" stroke="#8B5A2B" strokeWidth="2.5" />

            {/* Cozy Wooden Door with Heart Window */}
            <rect
              x="100"
              y="135"
              width="40"
              height="40"
              rx="6"
              fill="#8B5A2B"
              stroke="#5C3A1E"
              strokeWidth="3"
            />
            <circle cx="120" cy="148" r="4" fill="#FFF21F" />
            <circle cx="132" cy="155" r="2.5" fill="#FFC928" />

            {/* Climbing Ivy & Flowers on Cottage Walls */}
            <path
              d="M52 165 Q60 130 55 105 Q68 95 62 85"
              stroke="#16A34A"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="62" cy="120" r="4" fill="#FF5FA2" stroke="#8B5A2B" strokeWidth="1" />
            <circle cx="56" cy="140" r="3.5" fill="#FFF21F" stroke="#8B5A2B" strokeWidth="1" />
            <circle cx="58" cy="98" r="4" fill="#9B5CFF" stroke="#8B5A2B" strokeWidth="1" />

            {/* Wooden Signboard on Cottage: "THƯ VIỆN" */}
            <rect
              x="80"
              y="60"
              width="80"
              height="20"
              rx="4"
              fill="#FFC928"
              stroke="#8B5A2B"
              strokeWidth="2.5"
            />
            <text
              x="120"
              y="74"
              textAnchor="middle"
              fill="#3B2414"
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              THƯ VIỆN NẮNG
            </text>

            {/* Stacks of books by the door */}
            <rect x="70" y="160" width="22" height="6" rx="1.5" fill="#39C6FF" stroke="#8B5A2B" strokeWidth="1.5" />
            <rect x="72" y="154" width="18" height="6" rx="1.5" fill="#FF5FA2" stroke="#8B5A2B" strokeWidth="1.5" />
            <rect x="150" y="158" width="24" height="7" rx="1.5" fill="#39C95A" stroke="#8B5A2B" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {/* 7. WINDING COBBLESTONE PATHWAY FROM LIBRARY TO FOREGROUND */}
      <svg
        className="absolute bottom-0 w-full h-48 sm:h-64"
        preserveAspectRatio="none"
        viewBox="0 0 1200 300"
        fill="none"
      >
        {/* Lush Green Meadow Lawn (Foreground Grass #39C95A) */}
        <path
          d="M0 80 Q300 20 600 70 Q900 120 1200 40 L1200 300 L0 300 Z"
          fill="#39C95A"
          stroke="#14532D"
          strokeWidth="4"
        />

        {/* Stone Path winding down */}
        <path
          d="M570 60 C580 120 520 180 480 300 L720 300 C680 190 620 110 630 60 Z"
          fill="#FFF8DC"
          stroke="#8B5A2B"
          strokeWidth="4"
        />
        {/* Stepping Stones on Path */}
        <ellipse cx="600" cy="100" rx="18" ry="8" fill="#E8D7BF" stroke="#8B5A2B" strokeWidth="2" />
        <ellipse cx="580" cy="140" rx="26" ry="11" fill="#E8D7BF" stroke="#8B5A2B" strokeWidth="2.5" />
        <ellipse cx="620" cy="185" rx="32" ry="13" fill="#E8D7BF" stroke="#8B5A2B" strokeWidth="2.5" />
        <ellipse cx="570" cy="235" rx="38" ry="15" fill="#E8D7BF" stroke="#8B5A2B" strokeWidth="3" />
        <ellipse cx="610" cy="285" rx="46" ry="18" fill="#E8D7BF" stroke="#8B5A2B" strokeWidth="3" />
      </svg>

      {/* 8. VIBRANT BLOOMING FLOWERBEDS ALONG THE EDGES */}
      {/* Left Clump of Multi-Colored Cartoon Flowers */}
      <div className="absolute bottom-2 left-2 sm:left-10 md:left-20 flex items-end gap-1 sm:gap-2">
        {/* Big Yellow Sunflower */}
        <div className="flex flex-col items-center animate-gentle-sway origin-bottom">
          <div className="w-10 h-10 rounded-full bg-[#FFF21F] border-3 border-[#FF8A00] flex items-center justify-center shadow-md">
            <div className="w-4 h-4 rounded-full bg-[#8B5A2B]" />
          </div>
          <div className="w-2 h-14 bg-[#16A34A] rounded-full border border-[#14532D]" />
        </div>

        {/* Hot Pink Blossom */}
        <div className="flex flex-col items-center animate-gentle-sway origin-bottom" style={{ animationDelay: '0.8s' }}>
          <div className="w-8 h-8 rounded-full bg-[#FF5FA2] border-2 border-[#8B5A2B] flex items-center justify-center shadow-sm">
            <div className="w-3 h-3 rounded-full bg-[#FFF21F]" />
          </div>
          <div className="w-1.5 h-10 bg-[#16A34A] rounded-full" />
        </div>

        {/* Purple Bell Flower */}
        <div className="flex flex-col items-center animate-gentle-sway origin-bottom" style={{ animationDelay: '1.4s' }}>
          <div className="w-7 h-7 rounded-full bg-[#9B5CFF] border-2 border-[#4A1A94] flex items-center justify-center shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFF21F]" />
          </div>
          <div className="w-1.5 h-8 bg-[#16A34A] rounded-full" />
        </div>

        {/* Sky Blue Daisy */}
        <div className="flex flex-col items-center animate-gentle-sway origin-bottom" style={{ animationDelay: '0.4s' }}>
          <div className="w-6 h-6 rounded-full bg-[#39C6FF] border-2 border-[#168CFF] flex items-center justify-center shadow-2xs">
            <div className="w-2 h-2 rounded-full bg-[#FF8A00]" />
          </div>
          <div className="w-1 h-6 bg-[#16A34A] rounded-full" />
        </div>
      </div>

      {/* Right Clump of Multi-Colored Cartoon Flowers */}
      <div className="absolute bottom-2 right-2 sm:right-10 md:right-24 flex items-end gap-1.5 sm:gap-2.5">
        {/* Radiant Orange Poppy */}
        <div className="flex flex-col items-center animate-gentle-sway origin-bottom" style={{ animationDelay: '1s' }}>
          <div className="w-9 h-9 rounded-full bg-[#FF8A00] border-3 border-[#8B5A2B] flex items-center justify-center shadow-md">
            <div className="w-3.5 h-3.5 rounded-full bg-[#3B2414]" />
          </div>
          <div className="w-2 h-12 bg-[#16A34A] rounded-full border border-[#14532D]" />
        </div>

        {/* Pink Rosebud */}
        <div className="flex flex-col items-center animate-gentle-sway origin-bottom" style={{ animationDelay: '0.3s' }}>
          <div className="w-7 h-7 rounded-full bg-[#FF5FA2] border-2 border-[#8B5A2B] flex items-center justify-center shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFF8DC]" />
          </div>
          <div className="w-1.5 h-9 bg-[#16A34A] rounded-full" />
        </div>

        {/* Golden Daisy */}
        <div className="flex flex-col items-center animate-gentle-sway origin-bottom" style={{ animationDelay: '1.6s' }}>
          <div className="w-8 h-8 rounded-full bg-[#FFF21F] border-2 border-[#FFC928] flex items-center justify-center shadow-sm">
            <div className="w-3 h-3 rounded-full bg-[#8B5A2B]" />
          </div>
          <div className="w-1.5 h-11 bg-[#16A34A] rounded-full" />
        </div>
      </div>

      {/* 9. OVERHANGING 2D CARTOON TREE BOUGHS & CANOPIES (Top Left & Top Right) */}
      {/* Top Left Lush Tree Canopy */}
      <div className="absolute -top-10 -left-10 w-64 sm:w-80 md:w-96 h-56 md:h-72 text-[#16A34A] animate-gentle-sway origin-top-left z-0">
        <svg viewBox="0 0 320 240" fill="currentColor">
          {/* Main big cloud-like foliage puff */}
          <path
            d="M0 0 C40 10 90 20 120 60 C140 30 190 35 220 70 C250 100 240 150 200 180 C160 210 110 190 80 180 C40 210 0 170 0 120 Z"
            fill="#39C95A"
            stroke="#14532D"
            strokeWidth="5"
          />
          {/* Inner darker shade foliage */}
          <path
            d="M0 30 C30 40 70 50 90 80 C110 60 150 65 170 90 C190 120 180 150 150 170 C120 180 80 160 50 150 C20 160 0 140 0 100 Z"
            fill="#16A34A"
          />
          {/* Hanging vine with flowers */}
          <path d="M120 170 Q135 210 125 230" stroke="#14532D" strokeWidth="3" fill="none" />
          <circle cx="125" cy="230" r="6" fill="#FF5FA2" stroke="#8B5A2B" strokeWidth="2" />
        </svg>
      </div>

      {/* Top Right Tree Canopy under the Sun */}
      <div className="absolute -top-10 -right-10 w-64 sm:w-80 md:w-96 h-56 md:h-72 text-[#16A34A] animate-gentle-sway origin-top-right z-0" style={{ animationDelay: '1.8s' }}>
        <svg viewBox="0 0 320 240" fill="currentColor">
          <path
            d="M320 0 C280 10 230 20 200 60 C180 30 130 35 100 70 C70 100 80 150 120 180 C160 210 210 190 240 180 C280 210 320 170 320 120 Z"
            fill="#39C95A"
            stroke="#14532D"
            strokeWidth="5"
          />
          <path
            d="M320 30 C290 40 250 50 230 80 C210 60 170 65 150 90 C130 120 140 150 170 170 C200 180 240 160 270 150 C300 160 320 140 320 100 Z"
            fill="#16A34A"
          />
          {/* Hanging vine with golden bell */}
          <path d="M200 170 Q185 205 195 225" stroke="#14532D" strokeWidth="3" fill="none" />
          <circle cx="195" cy="225" r="6" fill="#FFF21F" stroke="#8B5A2B" strokeWidth="2" />
        </svg>
      </div>

      {/* 10. FLYING MAGIC BOOKS & PARCHMENT SHEETS */}
      <div className="absolute top-36 left-[18%] animate-warm-float hidden sm:block">
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
          <path d="M2 12 C10 8 18 10 20 12 C22 10 30 8 38 12 L36 24 C28 20 22 22 20 24 C18 22 12 20 4 24 Z" fill="#FF8A00" stroke="#8B5A2B" strokeWidth="2" />
          <path d="M4 10 C11 7 18 9 20 10 C22 9 29 7 36 10 L34 21 C28 18 22 20 20 21 C18 20 12 18 6 21 Z" fill="#FFF8DC" />
        </svg>
      </div>
      <div className="absolute top-48 right-[22%] animate-warm-float hidden sm:block" style={{ animationDelay: '1.5s' }}>
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none">
          <path d="M2 10 C8 6 15 8 17 10 C19 8 26 6 32 10 L30 20 C24 17 19 19 17 20 C15 19 10 17 4 20 Z" fill="#39C6FF" stroke="#168CFF" strokeWidth="1.8" />
          <path d="M3 8 C9 5 15 7 17 8 C19 7 25 5 31 8 L29 18 C24 15 19 17 17 18 C15 17 10 15 5 18 Z" fill="#FFF8DC" />
        </svg>
      </div>

      {/* 11. GOLDEN FIREFLIES / SPARKLES */}
      <div className="absolute top-1/4 left-[30%] w-3 h-3 rounded-full bg-[#FFF21F] border border-[#FF8A00] shadow-[0_0_12px_#FFF21F] animate-firefly-1" />
      <div className="absolute top-1/3 right-[35%] w-3.5 h-3.5 rounded-full bg-[#FFF21F] border border-[#FFC928] shadow-[0_0_15px_#FFF21F] animate-firefly-2" />
      <div className="absolute top-1/2 left-[12%] w-2.5 h-2.5 rounded-full bg-[#FF8A00] border border-[#8B5A2B] shadow-[0_0_10px_#FF8A00] animate-firefly-3" />
      <div className="absolute top-2/3 right-[18%] w-3 h-3 rounded-full bg-[#FFF21F] border border-[#FFC928] shadow-[0_0_12px_#FFF21F] animate-firefly-1" />

      {/* 12. BUTTERFLIES FLUTTERING */}
      <div className="absolute top-40 left-[40%] animate-butterfly">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
          <ellipse cx="6" cy="7" rx="5" ry="4" fill="#FF5FA2" stroke="#8B5A2B" strokeWidth="1" />
          <ellipse cx="6" cy="14" rx="4" ry="3" fill="#FF8A00" stroke="#8B5A2B" strokeWidth="1" />
          <ellipse cx="18" cy="7" rx="5" ry="4" fill="#FF5FA2" stroke="#8B5A2B" strokeWidth="1" />
          <ellipse cx="18" cy="14" rx="4" ry="3" fill="#FF8A00" stroke="#8B5A2B" strokeWidth="1" />
          <line x1="12" y1="4" x2="12" y2="17" stroke="#3B2414" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
