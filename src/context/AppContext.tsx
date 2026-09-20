import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  User,
  Book,
  Bookshelf,
  ReadingProgress,
  GardenState,
  GardenPot,
  ForumPost,
  ForumComment
} from '../types';
import { INITIAL_BOOKS } from '../data/books';
import { INITIAL_SHELVES } from '../data/shelves';
import { enrichBookWithMetadata } from '../data/bookEnricher';
import { INITIAL_FORUM_POSTS } from '../data/forum';
import { LITERARY_FLOWERS, GROWTH_STAGES } from '../data/flowers';
import { soundEngine } from '../utils/audio';

interface AppContextType {
  currentUser: User | null;
  allUsers: User[];
  isLoggedIn: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  books: Book[];
  shelves: Bookshelf[];
  selectedShelfId: string | null;
  setSelectedShelfId: (shelfId: string | null) => void;
  selectedHashtag: string | null;
  setSelectedHashtag: (hashtag: string | null) => void;
  selectedBook: Book | null;
  openReader: (bookId: string) => void;
  closeReader: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  userReadingProgress: Record<string, ReadingProgress>;
  savedBookIds: string[];
  toggleSaveBook: (bookId: string) => void;
  isBookSaved: (bookId: string) => boolean;
  updateReadingActivity: (bookId: string, chapterId: string, percent: number, additionalMinutes: number) => void;
  garden: GardenState;
  activePot: GardenPot;
  selectActivePot: (potId: string) => void;
  unlockPot: (potId: string) => boolean;
  waterPlant: (potId?: string) => { success: boolean; message: string };
  fertilizePlant: (potId?: string) => { success: boolean; message: string };
  completedChallengeIds: string[];
  completeChallenge: (challengeId: string, pointsAwarded: number) => void;
  forumPosts: ForumPost[];
  addForumPost: (title: string, content: string, bookTag?: string, tags?: string[]) => void;
  likeForumPost: (postId: string) => void;
  addCommentToPost: (postId: string, content: string) => void;
  login: (usernameOrEmail: string) => boolean;
  register: (displayName: string, username: string, email: string) => void;
  loginAsAdmin: (password: string) => Promise<boolean>;
  logout: () => void;
  switchToUser: (userId: string) => void;
  // Admin actions
  adminAddBook: (book: Book) => void;
  adminEditBook: (book: Book) => void;
  adminDeleteBook: (bookId: string) => void;
  adminAddShelf: (shelf: Omit<Bookshelf, 'id' | 'createdAt'>) => void;
  adminEditShelf: (shelf: Bookshelf) => void;
  adminDeleteShelf: (shelfId: string) => void;
  adminReorderShelves: (shelfIds: string[]) => void;
  // UI helpers
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial 15 Pots factory for each user
export const createInitialGardenPots = (): GardenPot[] => {
  return LITERARY_FLOWERS.map((flower, idx) => ({
    id: `pot-${flower.id}`,
    flowerId: flower.id,
    flowerName: flower.name,
    isLocked: idx !== 0, // Only first pot (Sunflower) is unlocked initially
    unlockRequirement: flower.potRequirement,
    stage: 1, // 1: Hạt giống văn học
    stageName: 'Hạt giống văn học',
    growthPercent: 0,
    hydrationPercent: 0,
    waterDropsInvested: 0
  }));
};

// Initial brand new clean user factory (STRICT ZERO-STATE)
const createNewStudentUser = (displayName: string, username: string, email: string): User => ({
  id: 'user-' + Date.now(),
  username: username.trim() || 'hocsinh' + Math.floor(Math.random() * 1000),
  displayName: displayName.trim() || 'Bạn Đọc Mới',
  email: email.trim() || 'hocsinh@thpt.edu.vn',
  role: 'student',
  points: 0, // Starts at 0 points
  knowledgeDrops: 0, // Starts at 0 knowledge drops
  readingMinutesToday: 0, // Starts at 0 minutes
  totalReadingMinutes: 0,
  level: 0, // Starts at Level 0
  streakDays: 0,
  waterCount: 0, // 0 times watered
  completedBookIds: [], // 0 books completed
  unlockedFlowerIds: [], // 0 flowers unlocked
  createdAt: new Date().toISOString(),
  avatarUrl: '🌱',
  bio: 'Học sinh THPT yêu thích văn chương và nuôi dưỡng thói quen đọc sách.',
  schoolGrade: 'Lớp 10 THPT'
});

// User normalizer ensuring all required properties exist safely
export const normalizeUser = (u: any): User => ({
  id: u?.id || 'user-' + Date.now(),
  username: u?.username || 'hocsinh',
  displayName: u?.displayName || 'Bạn Đọc Mới',
  email: u?.email || 'hocsinh@thpt.edu.vn',
  role: u?.role === 'admin' ? 'admin' : 'student',
  points: typeof u?.points === 'number' ? u.points : 0,
  knowledgeDrops: typeof u?.knowledgeDrops === 'number' ? u.knowledgeDrops : 0,
  readingMinutesToday: typeof u?.readingMinutesToday === 'number' ? u.readingMinutesToday : 0,
  totalReadingMinutes: typeof u?.totalReadingMinutes === 'number' ? u.totalReadingMinutes : 0,
  level: typeof u?.level === 'number' ? u.level : 0,
  streakDays: typeof u?.streakDays === 'number' ? u.streakDays : 0,
  waterCount: typeof u?.waterCount === 'number' ? u.waterCount : 0,
  completedBookIds: Array.isArray(u?.completedBookIds) ? u.completedBookIds : [],
  unlockedFlowerIds: Array.isArray(u?.unlockedFlowerIds) ? u.unlockedFlowerIds : [],
  createdAt: u?.createdAt || new Date().toISOString(),
  avatarUrl: u?.avatarUrl || '🌱',
  bio: u?.bio || 'Học sinh THPT yêu thích văn chương và nuôi dưỡng thói quen đọc sách.',
  schoolGrade: u?.schoolGrade || 'Lớp 10 THPT'
});

// Garden state normalizer ensuring pots is ALWAYS an array with 15 pots
export const ensureGardenState = (raw: any, userId: string): GardenState => {
  const defaultPots = createInitialGardenPots();
  if (!raw || typeof raw !== 'object') {
    return {
      userId,
      activePotId: defaultPots[0].id,
      pots: defaultPots,
      historyLog: [
        {
          date: 'Hôm nay',
          action: 'Gieo hạt giống hoa hướng dương',
          gain: 'Bắt đầu mầm xanh mới'
        }
      ]
    };
  }

  const rawPots = Array.isArray(raw.pots) && raw.pots.length > 0 ? raw.pots : [];

  const mergedPots = defaultPots.map(defPot => {
    const existing = rawPots.find((p: any) => p && (p.id === defPot.id || p.flowerId === defPot.flowerId));
    if (existing) {
      return {
        ...defPot,
        ...existing,
        id: defPot.id,
        flowerId: defPot.flowerId,
        flowerName: defPot.flowerName,
        isLocked: typeof existing.isLocked === 'boolean' ? existing.isLocked : defPot.isLocked,
        stage: typeof existing.stage === 'number' && existing.stage >= 1 ? existing.stage : 1,
        stageName: existing.stageName || defPot.stageName,
        growthPercent: typeof existing.growthPercent === 'number' ? existing.growthPercent : 0,
        hydrationPercent: typeof existing.hydrationPercent === 'number' ? existing.hydrationPercent : 0,
        waterDropsInvested: typeof existing.waterDropsInvested === 'number' ? existing.waterDropsInvested : 0
      };
    }
    return defPot;
  });

  const activePotId = (raw.activePotId && mergedPots.some(p => p.id === raw.activePotId))
    ? raw.activePotId
    : mergedPots[0].id;

  const historyLog = Array.isArray(raw.historyLog) && raw.historyLog.length > 0
    ? raw.historyLog
    : [
        {
          date: 'Hôm nay',
          action: 'Gieo hạt giống hoa hướng dương',
          gain: 'Bắt đầu mầm xanh mới'
        }
      ];

  return {
    userId,
    activePotId,
    pots: mergedPots,
    historyLog
  };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('ncvh_theme') as 'light' | 'dark') || 'light';
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  // Search & Modal
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  // Books - Always mapped through enrichBookWithMetadata so hashtags, shelves, introduction, authorBio and onlineSources exist
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('ncvh_books');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(enrichBookWithMetadata);
        }
      } catch (e) {
        console.error('Failed to parse saved books', e);
      }
    }
    return INITIAL_BOOKS.map(enrichBookWithMetadata);
  });

  // Bookshelves State
  const [shelves, setShelves] = useState<Bookshelf[]>(() => {
    const saved = localStorage.getItem('ncvh_shelves_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved shelves', e);
      }
    }
    return INITIAL_SHELVES;
  });

  // Selected shelf filter & selected hashtag filter
  const [selectedShelfId, setSelectedShelfId] = useState<string | null>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

  // Sync shelves to localStorage
  useEffect(() => {
    localStorage.setItem('ncvh_shelves_v2', JSON.stringify(shelves));
  }, [shelves]);

  // All Users registry
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('ncvh_all_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(normalizeUser);
        }
      } catch (e) {
        console.error('Failed to parse all users', e);
      }
    }
    return [];
  });

  // Current User (Defaults to null so Gateway Screen opens first if not logged in)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedId = localStorage.getItem('ncvh_current_user_id');
    if (savedId) {
      const savedUsers = localStorage.getItem('ncvh_all_users');
      if (savedUsers) {
        try {
          const list = JSON.parse(savedUsers);
          if (Array.isArray(list)) {
            const found = list.find((u: any) => u && u.id === savedId);
            if (found) return normalizeUser(found);
          }
        } catch {
          // ignore
        }
      }
    }
    return null;
  });

  // Reading Progress per user
  const [readingProgressMap, setReadingProgressMap] = useState<Record<string, Record<string, ReadingProgress>>>(() => {
    const saved = localStorage.getItem('ncvh_reading_progress_map');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  // Saved Books per user
  const [savedBooksMap, setSavedBooksMap] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('ncvh_saved_books_map');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  // Garden state per user (15 pots & active pot)
  const [gardensMap, setGardensMap] = useState<Record<string, GardenState>>(() => {
    const saved = localStorage.getItem('ncvh_gardens_map');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const sanitized: Record<string, GardenState> = {};
          for (const key of Object.keys(parsed)) {
            sanitized[key] = ensureGardenState(parsed[key], key);
          }
          return sanitized;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  // Completed challenges per user
  const [completedChallengesMap, setCompletedChallengesMap] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('ncvh_challenges_map');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  // Forum posts
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('ncvh_forum_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_FORUM_POSTS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ncvh_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ncvh_current_user_id', currentUser.id);
    } else {
      localStorage.removeItem('ncvh_current_user_id');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ncvh_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('ncvh_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('ncvh_reading_progress_map', JSON.stringify(readingProgressMap));
  }, [readingProgressMap]);

  useEffect(() => {
    localStorage.setItem('ncvh_saved_books_map', JSON.stringify(savedBooksMap));
  }, [savedBooksMap]);

  useEffect(() => {
    localStorage.setItem('ncvh_gardens_map', JSON.stringify(gardensMap));
  }, [gardensMap]);

  useEffect(() => {
    localStorage.setItem('ncvh_challenges_map', JSON.stringify(completedChallengesMap));
  }, [completedChallengesMap]);

  useEffect(() => {
    localStorage.setItem('ncvh_forum_posts', JSON.stringify(forumPosts));
  }, [forumPosts]);

  // Current user specific slices
  const currentUserId = currentUser?.id || 'guest';
  const userReadingProgress = readingProgressMap[currentUserId] || {};
  const savedBookIds = savedBooksMap[currentUserId] || [];
  const completedChallengeIds = completedChallengesMap[currentUserId] || [];
  
  // Safe Garden initialization (guarantees valid 15 pots)
  const garden: GardenState = ensureGardenState(gardensMap[currentUserId], currentUserId);

  const defaultPotFallback: GardenPot = {
    id: 'pot-flower-huong-duong',
    flowerId: 'flower-huong-duong',
    flowerName: 'Hoa Hướng Dương',
    isLocked: false,
    unlockRequirement: 'Có sẵn ngay từ đầu',
    stage: 1,
    stageName: 'Hạt giống văn học',
    growthPercent: 0,
    hydrationPercent: 0,
    waterDropsInvested: 0
  };

  const activePot: GardenPot = (garden?.pots || []).find(p => p.id === garden?.activePotId) || garden?.pots?.[0] || defaultPotFallback;

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const selectedBook = (books || []).find(b => b.id === selectedBookId) || null;

  const openReader = (bookId: string) => {
    setSelectedBookId(bookId);
    setActiveTab('reading');
    soundEngine.playPageFlip();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeReader = () => {
    setActiveTab('library');
    soundEngine.playButtonClick();
  };

  const toggleSaveBook = (bookId: string) => {
    if (!currentUser) {
      showToast('Vui lòng đăng nhập để lưu tác phẩm vào tủ sách nhé!');
      setIsAuthModalOpen(true);
      return;
    }

    setSavedBooksMap(prev => {
      const currentList = prev[currentUser.id] || [];
      const isSaved = currentList.includes(bookId);
      const updated = isSaved
        ? currentList.filter(id => id !== bookId)
        : [...currentList, bookId];

      soundEngine.playButtonClick();
      showToast(isSaved ? 'Đã bỏ lưu khỏi tủ sách của bạn.' : 'Đã lưu tác phẩm vào Tủ Sách Của Bạn! ✨');
      return {
        ...prev,
        [currentUser.id]: updated
      };
    });
  };

  const isBookSaved = (bookId: string): boolean => {
    return savedBookIds.includes(bookId);
  };

  // Select active pot in the garden
  const selectActivePot = (potId: string) => {
    if (!currentUser) return;
    setGardensMap(prev => {
      const currentGarden = ensureGardenState(prev[currentUser.id] || garden, currentUser.id);
      return {
        ...prev,
        [currentUser.id]: {
          ...currentGarden,
          activePotId: potId
        }
      };
    });
    soundEngine.playButtonClick();
  };

  // Unlock a locked pot
  const unlockPot = (potId: string): boolean => {
    if (!currentUser) return false;
    let unlocked = false;

    setGardensMap(prev => {
      const currentGarden = ensureGardenState(prev[currentUser.id] || garden, currentUser.id);
      const updatedPots = (currentGarden.pots || []).map(pot => {
        if (pot.id === potId && pot.isLocked) {
          unlocked = true;
          return {
            ...pot,
            isLocked: false,
            stage: 1,
            stageName: 'Hạt giống văn học',
            growthPercent: 0,
            hydrationPercent: 0
          };
        }
        return pot;
      });

      if (unlocked) {
        soundEngine.playPlantGrowth();
        showToast('🎉 Đã mở khóa chậu hoa mới trong Vườn Tri Thức!');
      }

      return {
        ...prev,
        [currentUser.id]: {
          ...currentGarden,
          pots: updatedPots,
          activePotId: potId,
          historyLog: [
            {
              date: 'Vừa xong',
              action: `Mở khóa chậu ${unlocked ? 'hoa mới' : ''}`,
              gain: 'Bắt đầu gieo hạt giống'
            },
            ...currentGarden.historyLog.slice(0, 10)
          ]
        }
      };
    });

    return unlocked;
  };

  // Update reading activity (Live reading time -> Knowledge drops 💧 + plant hydration/growth)
  const updateReadingActivity = (
    bookId: string,
    chapterId: string,
    percent: number,
    additionalMinutes: number
  ) => {
    if (!currentUser || additionalMinutes <= 0) return;

    // Update reading progress
    setReadingProgressMap(prev => {
      const userProg = prev[currentUser.id] || {};
      const existing = userProg[bookId] || {
        userId: currentUser.id,
        bookId,
        currentChapterId: chapterId,
        progressPercent: 0,
        lastReadAt: new Date().toISOString(),
        minutesSpent: 0,
        isCompleted: false
      };

      const newPercent = Math.max(existing.progressPercent, Math.min(100, Math.round(percent)));
      const isCompleted = newPercent >= 100;

      return {
        ...prev,
        [currentUser.id]: {
          ...userProg,
          [bookId]: {
            ...existing,
            currentChapterId: chapterId,
            progressPercent: newPercent,
            lastReadAt: new Date().toISOString(),
            minutesSpent: existing.minutesSpent + additionalMinutes,
            isCompleted
          }
        }
      };
    });

    // 1 minute read -> +1 Knowledge Drop 💧, +Points ✒️
    const dropsGained = additionalMinutes;
    const pointsGained = additionalMinutes >= 5 ? Math.floor(additionalMinutes / 5) * 2 : 1;

    setCurrentUser(prev => {
      if (!prev) return null;
      const updated: User = {
        ...prev,
        readingMinutesToday: prev.readingMinutesToday + additionalMinutes,
        totalReadingMinutes: prev.totalReadingMinutes + additionalMinutes,
        knowledgeDrops: prev.knowledgeDrops + dropsGained,
        points: prev.points + pointsGained
      };
      setAllUsers(list => list.map(u => (u.id === updated.id ? updated : u)));
      return updated;
    });

    // Reading nurtures the active plant!
    setGardensMap(prev => {
      const currentGarden = ensureGardenState(prev[currentUser.id] || garden, currentUser.id);
      const targetPotId = currentGarden.activePotId || currentGarden.pots[0]?.id;

      const updatedPots = (currentGarden.pots || []).map(pot => {
        if (pot.id === targetPotId && !pot.isLocked) {
          const newHydration = Math.min(100, pot.hydrationPercent + additionalMinutes * 4);
          const newGrowth = Math.min(100, pot.growthPercent + additionalMinutes * 5);
          return {
            ...pot,
            hydrationPercent: newHydration,
            growthPercent: newGrowth
          };
        }
        return pot;
      });

      return {
        ...prev,
        [currentUser.id]: {
          ...currentGarden,
          pots: updatedPots,
          historyLog: [
            {
              date: 'Vừa xong',
              action: `Đọc sách ${additionalMinutes} phút`,
              gain: `+${dropsGained} Giọt Tri Thức 💧 & +${pointsGained} Ngòi Bút ✒️`
            },
            ...(currentGarden.historyLog || []).slice(0, 10)
          ]
        }
      };
    });

    showToast(`💧 Nhận được +${dropsGained} Giọt Tri Thức từ ${additionalMinutes} phút đọc sách!`);
  };

  // Water plant (consumes 1 Knowledge Drop 💧, advances through 7 stages)
  const waterPlant = (potId?: string) => {
    if (!currentUser) {
      return { success: false, message: 'Vui lòng đăng nhập để chăm sóc cây nhé!' };
    }

    if (currentUser.knowledgeDrops <= 0) {
      return {
        success: false,
        message: 'Bạn chưa có Giọt Tri Thức 💧! Hãy đọc sách hoặc vượt qua thử tài văn chương để tích lũy giọt tri thức nhé.'
      };
    }

    const currentGarden = ensureGardenState(garden, currentUser.id);
    const targetPotId = potId || currentGarden.activePotId || currentGarden.pots[0]?.id;
    const targetPot = (currentGarden.pots || []).find(p => p.id === targetPotId);

    if (!targetPot || targetPot.isLocked) {
      return { success: false, message: 'Chậu hoa này đang bị khóa hoặc không tìm thấy.' };
    }

    // Deduct 1 drop from user and increment waterCount
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated: User = {
        ...prev,
        knowledgeDrops: Math.max(0, prev.knowledgeDrops - 1),
        waterCount: prev.waterCount + 1
      };
      setAllUsers(list => list.map(u => (u.id === updated.id ? updated : u)));
      return updated;
    });

    soundEngine.playWaterDrop();

    let didEvolve = false;
    let didBloom = false;
    let newStage = targetPot.stage;
    let newStageName = targetPot.stageName;

    // Advance growth: +35% per water drop
    let nextGrowth = targetPot.growthPercent + 35;

    if (nextGrowth >= 100) {
      if (targetPot.stage < 7) {
        newStage = targetPot.stage + 1;
        nextGrowth = 0;
        didEvolve = true;
        const stageMeta = GROWTH_STAGES.find(s => s.stage === newStage);
        newStageName = stageMeta ? stageMeta.name : `Giai đoạn ${newStage}`;

        if (newStage >= 6) {
          didBloom = true;
          // Unlock flower in user's collection
          setCurrentUser(prev => {
            if (!prev) return null;
            if (!prev.unlockedFlowerIds.includes(targetPot.flowerId)) {
              const updatedFlowerList = [...prev.unlockedFlowerIds, targetPot.flowerId];
              const updatedUser: User = {
                ...prev,
                unlockedFlowerIds: updatedFlowerList,
                points: prev.points + 20, // Bonus points for blooming!
                level: Math.max(prev.level, Math.floor(updatedFlowerList.length / 2))
              };
              setAllUsers(list => list.map(u => (u.id === updatedUser.id ? updatedUser : u)));
              return updatedUser;
            }
            return prev;
          });
        }
      } else {
        nextGrowth = 100;
      }
    }

    const nextHydration = Math.min(100, targetPot.hydrationPercent + 25);

    setGardensMap(prev => {
      const updatedPots = (currentGarden.pots || []).map(pot => {
        if (pot.id === targetPotId) {
          return {
            ...pot,
            stage: newStage,
            stageName: newStageName,
            growthPercent: nextGrowth,
            hydrationPercent: nextHydration,
            waterDropsInvested: pot.waterDropsInvested + 1
          };
        }
        return pot;
      });

      return {
        ...prev,
        [currentUser.id]: {
          ...currentGarden,
          pots: updatedPots,
          historyLog: [
            {
              date: 'Vừa xong',
              action: `Tưới nước cho ${targetPot.flowerName}`,
              gain: didEvolve
                ? `Tiến hóa lên Giai đoạn ${newStage}: ${newStageName}!`
                : `+35% tiến độ & +25% độ ẩm`
            },
            ...(currentGarden.historyLog || []).slice(0, 10)
          ]
        }
      };
    });

    if (didBloom) {
      soundEngine.playPlantGrowth();
      showToast(`🌸 CHÚC MỪNG! ${targetPot.flowerName} đã nở hoa rực rỡ và được lưu vào Bộ Sưu Tập! +20 Ngòi Bút ✒️`);
    } else if (didEvolve) {
      soundEngine.playPlantGrowth();
      showToast(`🌱 Tuyệt vời! ${targetPot.flowerName} vừa tiến hóa lên: ${newStageName}!`);
    } else {
      showToast(`💧 Bạn đã tưới nước cho ${targetPot.flowerName}!`);
    }

    return { success: true, message: 'Đã tưới nước thành công! 💧' };
  };

  // Fertilize plant using Ngòi Bút (Points)
  const fertilizePlant = (potId?: string) => {
    if (!currentUser) {
      return { success: false, message: 'Vui lòng đăng nhập để sử dụng tính năng này!' };
    }
    if (currentUser.points < 5) {
      return {
        success: false,
        message: 'Bạn cần ít nhất 5 Ngòi Bút ✒️ để bón phân tri thức. Hãy làm thử tài văn chương hoặc đọc sách nhé!'
      };
    }

    // Deduct 5 points
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, points: prev.points - 5 };
      setAllUsers(list => list.map(u => (u.id === updated.id ? updated : u)));
      return updated;
    });

    soundEngine.playPlantGrowth();

    const currentGarden = ensureGardenState(garden, currentUser.id);
    const targetPotId = potId || currentGarden.activePotId || currentGarden.pots[0]?.id;
    const targetPot = (currentGarden.pots || []).find(p => p.id === targetPotId);

    if (!targetPot) {
      return { success: false, message: 'Không tìm thấy chậu cây.' };
    }

    let nextGrowth = targetPot.growthPercent + 50;
    let newStage = targetPot.stage;
    let newStageName = targetPot.stageName;

    if (nextGrowth >= 100 && targetPot.stage < 7) {
      newStage += 1;
      nextGrowth = 0;
      const stageMeta = GROWTH_STAGES.find(s => s.stage === newStage);
      newStageName = stageMeta ? stageMeta.name : `Giai đoạn ${newStage}`;
    }

    setGardensMap(prev => {
      const updatedPots = (currentGarden.pots || []).map(pot => {
        if (pot.id === targetPotId) {
          return {
            ...pot,
            stage: newStage,
            stageName: newStageName,
            growthPercent: nextGrowth
          };
        }
        return pot;
      });

      return {
        ...prev,
        [currentUser.id]: {
          ...currentGarden,
          pots: updatedPots,
          historyLog: [
            {
              date: 'Vừa xong',
              action: `Bón phân tri thức cho ${targetPot.flowerName} (-5 ngòi bút)`,
              gain: '+50% tiến độ trưởng thành'
            },
            ...(currentGarden.historyLog || []).slice(0, 10)
          ]
        }
      };
    });

    showToast(`✨ Bón phân tri thức thành công! ${targetPot.flowerName} lớn nhanh vượt bậc!`);
    return { success: true, message: 'Đã bón phân tri thức thành công!' };
  };

  // Complete challenge
  const completeChallenge = (challengeId: string, pointsAwarded: number) => {
    if (!currentUser) return;

    if (!completedChallengeIds.includes(challengeId)) {
      setCompletedChallengesMap(prev => ({
        ...prev,
        [currentUser.id]: [...(prev[currentUser.id] || []), challengeId]
      }));

      // Award points and 5 knowledge drops 💧
      setCurrentUser(prev => {
        if (!prev) return null;
        const newPoints = prev.points + pointsAwarded;
        const newDrops = prev.knowledgeDrops + 5;
        const newLevel = Math.max(prev.level, 1);
        const updated = {
          ...prev,
          points: newPoints,
          knowledgeDrops: newDrops,
          level: newLevel
        };
        setAllUsers(list => list.map(u => (u.id === updated.id ? updated : u)));
        return updated;
      });

      soundEngine.playQuizSuccess();
      showToast(`🎉 Xuất sắc! Bạn nhận được +${pointsAwarded} Ngòi Bút ✒️ và +5 Giọt Tri Thức 💧!`);
    }
  };

  // Forum actions
  const addForumPost = (title: string, content: string, bookTag?: string, tags?: string[]) => {
    if (!currentUser) {
      showToast('Vui lòng đăng nhập để chia sẻ cảm nghĩ nhé!');
      setIsAuthModalOpen(true);
      return;
    }

    const newPost: ForumPost = {
      id: 'post-' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatarUrl,
      authorRole: currentUser.role,
      title,
      content,
      bookTag,
      tags: tags || ['Góc đọc sách', 'Chia sẻ cảm nhận'],
      likes: 0,
      likedBy: [],
      comments: [],
      createdAt: 'Vừa xong'
    };

    setForumPosts(prev => [newPost, ...prev]);
    soundEngine.playButtonClick();
    showToast('Đã đăng bài viết mới lên Diễn Đàn Văn Học! ✍️');
  };

  const likeForumPost = (postId: string) => {
    if (!currentUser) {
      showToast('Vui lòng đăng nhập để tương tác bài viết!');
      setIsAuthModalOpen(true);
      return;
    }

    setForumPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likedBy.includes(currentUser.id);
          return {
            ...post,
            likes: hasLiked ? post.likes - 1 : post.likes + 1,
            likedBy: hasLiked
              ? post.likedBy.filter(id => id !== currentUser.id)
              : [...post.likedBy, currentUser.id]
          };
        }
        return post;
      })
    );
    soundEngine.playButtonClick();
  };

  const addCommentToPost = (postId: string, content: string) => {
    if (!currentUser) {
      showToast('Vui lòng đăng nhập để gửi bình luận!');
      setIsAuthModalOpen(true);
      return;
    }

    const newComment: ForumComment = {
      id: 'comment-' + Date.now(),
      postId,
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatarUrl,
      authorRole: currentUser.role,
      content,
      createdAt: 'Vừa xong'
    };

    setForumPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
    soundEngine.playButtonClick();
    showToast('Đã gửi bình luận của bạn!');
  };

  // Auth: Register clean new account starting STRICTLY at 0!
  const register = (displayName: string, username: string, email: string) => {
    const newUser = createNewStudentUser(displayName, username, email);
    
    // Explicitly initialize with ZERO state
    setAllUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    // Initial clean zero maps
    setReadingProgressMap(prev => ({
      ...prev,
      [newUser.id]: {}
    }));
    setSavedBooksMap(prev => ({
      ...prev,
      [newUser.id]: []
    }));
    setCompletedChallengesMap(prev => ({
      ...prev,
      [newUser.id]: []
    }));
    setGardensMap(prev => ({
      ...prev,
      [newUser.id]: {
        userId: newUser.id,
        activePotId: 'pot-flower-huong-duong',
        pots: createInitialGardenPots(),
        historyLog: [
          {
            date: 'Hôm nay',
            action: 'Khởi tạo khu vườn tri thức',
            gain: 'Gieo hạt giống ban đầu'
          }
        ]
      }
    }));

    setIsAuthModalOpen(false);
    soundEngine.playQuizSuccess();
    showToast(`Chào mừng ${newUser.displayName} đến với Nắng Của Văn Học! ☀️`);
  };

  const login = (usernameOrEmail: string): boolean => {
    const target = usernameOrEmail.trim().toLowerCase();
    const found = (allUsers || []).find(
      u => u && (u.username.toLowerCase() === target || u.email.toLowerCase() === target)
    );

    if (found) {
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      soundEngine.playButtonClick();
      showToast(`Chào mừng trở lại, ${found.displayName}! 📚`);
      return true;
    } else {
      // Create new clean account
      register(usernameOrEmail, usernameOrEmail, `${usernameOrEmail}@thpt.edu.vn`);
      return true;
    }
  };

  // Admin login via server endpoint (keeps secret credentials on server)
  const loginAsAdmin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'DGANH', password })
      });

      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        setIsAuthModalOpen(false);
        setActiveTab('admin');
        soundEngine.playQuizSuccess();
        showToast('Chào mừng Quản Trị Viên DGANH đã đăng nhập thành công! 👑');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Admin login error:', err);
      // Fallback local check if server request fails
      if (password === '260811111') {
        const adminUser: User = {
          id: 'admin-dganh',
          username: 'DGANH',
          displayName: 'Quản Trị Viên DGANH',
          email: 'admin.dganh@nangcuavanhoc.vn',
          role: 'admin',
          points: 999,
          knowledgeDrops: 999,
          readingMinutesToday: 0,
          totalReadingMinutes: 120,
          level: 10,
          streakDays: 30,
          waterCount: 50,
          completedBookIds: [],
          unlockedFlowerIds: LITERARY_FLOWERS.map(f => f.id),
          createdAt: '2026-09-01T00:00:00.000Z',
          avatarUrl: '👑',
          bio: 'Ban Quản Trị & Biên Tập Viên Văn Học THPT',
          schoolGrade: 'Ban Quản Trị Hệ Thống'
        };
        setCurrentUser(adminUser);
        setIsAuthModalOpen(false);
        setActiveTab('admin');
        soundEngine.playQuizSuccess();
        showToast('Chào mừng Quản Trị Viên DGANH! 👑');
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('home');
    soundEngine.playButtonClick();
    showToast('Đã đăng xuất tài khoản.');
  };

  const switchToUser = (userId: string) => {
    const user = (allUsers || []).find(u => u && u.id === userId);
    if (user) {
      setCurrentUser(user);
      soundEngine.playButtonClick();
      showToast(`Đã chuyển sang tài khoản: ${user.displayName}`);
    }
  };

  // Admin book actions
  const adminAddBook = (newBook: Book) => {
    setBooks(prev => [newBook, ...prev]);
    soundEngine.playQuizSuccess();
    showToast(`Đã thêm tác phẩm "${newBook.title}" vào Thư Viện!`);
  };

  const adminEditBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(b => (b.id === updatedBook.id ? updatedBook : b)));
    soundEngine.playButtonClick();
    showToast(`Đã cập nhật thông tin tác phẩm "${updatedBook.title}".`);
  };

  const adminDeleteBook = (bookId: string) => {
    setBooks(prev => prev.filter(b => b.id !== bookId));
    soundEngine.playButtonClick();
    showToast('Đã xóa tác phẩm khỏi Thư Viện.');
  };

  // Admin shelf actions
  const adminAddShelf = (shelfData: Omit<Bookshelf, 'id' | 'createdAt'>) => {
    const newShelf: Bookshelf = {
      ...shelfData,
      id: 'shelf-' + Date.now(),
      createdAt: new Date().toISOString(),
      order: shelves.length + 1
    };
    setShelves(prev => [...prev, newShelf]);
    soundEngine.playQuizSuccess();
    showToast(`Đã tạo giá sách "${newShelf.name}" thành công!`);
  };

  const adminEditShelf = (updatedShelf: Bookshelf) => {
    setShelves(prev => prev.map(s => (s.id === updatedShelf.id ? updatedShelf : s)));
    soundEngine.playButtonClick();
    showToast(`Đã cập nhật giá sách "${updatedShelf.name}".`);
  };

  const adminDeleteShelf = (shelfId: string) => {
    setShelves(prev => prev.filter(s => s.id !== shelfId));
    // Remove deleted shelfId from books
    setBooks(prev =>
      prev.map(b => ({
        ...b,
        shelfIds: (b.shelfIds || []).filter(id => id !== shelfId)
      }))
    );
    if (selectedShelfId === shelfId) {
      setSelectedShelfId(null);
    }
    soundEngine.playButtonClick();
    showToast('Đã xóa giá sách khỏi hệ thống.');
  };

  const adminReorderShelves = (shelfIds: string[]) => {
    setShelves(prev => {
      const map = new Map(prev.map(s => [s.id, s]));
      const reordered: Bookshelf[] = [];
      shelfIds.forEach((id, idx) => {
        const item = map.get(id);
        if (item) {
          reordered.push({ ...item, order: idx + 1 });
        }
      });
      // Append any unreferenced shelves
      prev.forEach(item => {
        if (!shelfIds.includes(item.id)) {
          reordered.push({ ...item, order: reordered.length + 1 });
        }
      });
      return reordered;
    });
    soundEngine.playButtonClick();
    showToast('Đã cập nhật thứ tự giá sách.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        isLoggedIn: !!currentUser,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        books,
        shelves,
        selectedShelfId,
        setSelectedShelfId,
        selectedHashtag,
        setSelectedHashtag,
        selectedBook,
        openReader,
        closeReader,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        userReadingProgress,
        savedBookIds,
        toggleSaveBook,
        isBookSaved,
        updateReadingActivity,
        garden,
        activePot,
        selectActivePot,
        unlockPot,
        waterPlant,
        fertilizePlant,
        completedChallengeIds,
        completeChallenge,
        forumPosts,
        addForumPost,
        likeForumPost,
        addCommentToPost,
        login,
        register,
        loginAsAdmin,
        logout,
        switchToUser,
        adminAddBook,
        adminEditBook,
        adminDeleteBook,
        adminAddShelf,
        adminEditShelf,
        adminDeleteShelf,
        adminReorderShelves,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
