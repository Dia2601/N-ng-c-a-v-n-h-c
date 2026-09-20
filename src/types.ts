export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: UserRole;
  points: number; // Ngòi bút
  knowledgeDrops: number; // Giọt tri thức 💧
  readingMinutesToday: number;
  totalReadingMinutes: number;
  level: number;
  streakDays: number;
  waterCount: number; // Số lần tưới cây
  completedBookIds: string[];
  unlockedFlowerIds: string[]; // Danh sách hoa đã nở / mở khóa
  createdAt: string;
  avatarUrl: string;
  bio?: string;
  schoolGrade?: string; // e.g. "Lớp 11 THPT Chuyên"
}

export interface Chapter {
  id: string;
  title: string;
  order: number;
  content: string;
  description?: string;
  audioTimeEstimate?: string;
}

export interface OnlineReadingSource {
  id: string;
  sourceName: string;
  url: string;
  note?: string;
  description?: string;
}

export interface BookIntroduction {
  historicalContext?: string;
  theme?: string;
  summary?: string;
  realisticValue?: string;
  humanisticValue?: string;
  examNotes?: string;
}

export interface AuthorBiography {
  shortBio?: string;
  artisticStyle?: string;
  workSignificance?: string;
  analysisNotes?: string;
}

export interface Bookshelf {
  id: string;
  name: string;
  description: string;
  icon?: string;
  coverImage?: string;
  hashtag?: string;
  order: number;
  displayOrder?: number;
  createdAt?: string;
  colorTone?: string; // Optional aesthetic accent
}

export type BookCategory = 
  | 'vietnam-classic' 
  | 'world-classic' 
  | 'youth-contemporary' 
  | 'self-growth' 
  | 'poetry-drama';

export interface Book {
  id: string;
  title: string;
  author: string;
  era: string; // e.g. "Văn học Trung đại", "1930 - 1945", "Hiện đại"
  category: BookCategory;
  categoryLabel: string;
  description: string;
  rating: number;
  reviewCount: number;
  estimatedReadTimeMinutes: number;
  coverTheme: {
    bg: string;
    text: string;
    border: string;
    tagBg: string;
    illustrationType: 'calligraphy' | 'lotus' | 'mountain' | 'quill' | 'moon' | 'lantern' | 'waves';
  };
  chapters: Chapter[];
  featured?: boolean;
  curriculumGrade?: string; // "Lớp 10", "Lớp 11", "Lớp 12", "Tham khảo mở rộng"
  
  // Upgraded properties for Bookshelves, Hashtags, 3-tab detail, and Admin AI
  shelfIds?: string[];
  hashtags?: string[];
  coverImage?: string;
  introduction?: BookIntroduction | string; // Tab 1: GIỚI THIỆU TÁC PHẨM
  authorBio?: AuthorBiography | string;    // Tab 2: TÁC GIẢ
  onlineSources?: OnlineReadingSource[]; // Tab 3: ĐỌC TÁC PHẨM ONLINE
}

export interface ReadingProgress {
  userId: string;
  bookId: string;
  currentChapterId: string;
  progressPercent: number;
  lastReadAt: string;
  minutesSpent: number;
  isCompleted: boolean;
}

export interface SavedBook {
  userId: string;
  bookId: string;
  savedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Challenge {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  description: string;
  rewardPoints: number; // Ngòi bút thưởng
  requiredLevel: number;
  questions: QuizQuestion[];
}

export type PlantType = 'rose' | 'lotus' | 'sunflower' | 'banyan';

export interface GardenPot {
  id: string;
  flowerId: string;
  flowerName: string;
  isLocked: boolean;
  unlockRequirement: string;
  unlockCostFeathers?: number;
  stage: number; // 1: Hạt giống, 2: Mầm, 3: Cây non, 4: Trưởng thành, 5: Kết nụ, 6: Nở hoa, 7: Hoàn thiện
  stageName: string;
  growthPercent: number; // 0 - 100
  hydrationPercent: number; // 0 - 100
  waterDropsInvested: number;
}

export interface GardenState {
  userId: string;
  activePotId: string;
  pots: GardenPot[];
  plantType?: PlantType;
  plantName?: string;
  stage?: number;
  stageName?: string;
  hydrationPercent?: number;
  sunlightHours?: number;
  fertilizerUnits?: number;
  growthProgressPercent?: number;
  historyLog: Array<{
    date: string;
    action: string;
    gain: string;
  }>;
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  title: string;
  content: string;
  bookTag?: string;
  tags: string[];
  likes: number;
  likedBy: string[];
  comments: ForumComment[];
  createdAt: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  bookContext?: string;
}
