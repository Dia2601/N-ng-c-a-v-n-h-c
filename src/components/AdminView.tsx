import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book, BookCategory, Bookshelf, OnlineReadingSource, BookIntroduction, AuthorBiography } from '../types';
import {
  Shield,
  Plus,
  Trash2,
  Edit3,
  BookOpen,
  ArrowLeft,
  Check,
  Search,
  Sparkles,
  Layers,
  ArrowUp,
  ArrowDown,
  Globe,
  Tag,
  FileText,
  User as UserIcon,
  ExternalLink,
  HelpCircle,
  Loader2,
  X
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    books,
    shelves,
    adminAddBook,
    adminEditBook,
    adminDeleteBook,
    adminAddShelf,
    adminEditShelf,
    adminDeleteShelf,
    adminReorderShelves,
    setActiveTab,
    showToast
  } = useApp();

  // Active Admin Sub-tab: 'books' or 'shelves'
  const [adminTab, setAdminTab] = useState<'books' | 'shelves'>('books');

  // ==========================================
  // BOOK FORM STATES
  // ==========================================
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [era, setEra] = useState('Văn học hiện đại');
  const [category, setCategory] = useState<BookCategory>('vietnam-classic');
  const [categoryLabel, setCategoryLabel] = useState('Văn học Việt Nam');
  const [description, setDescription] = useState('');
  const [curriculumGrade, setCurriculumGrade] = useState('Lớp 11 THPT');
  const [estimatedReadTimeMinutes, setEstimatedReadTimeMinutes] = useState(25);
  const [hashtagsInput, setHashtagsInput] = useState('');
  const [selectedShelfIds, setSelectedShelfIds] = useState<string[]>([]);
  const [onlineSources, setOnlineSources] = useState<OnlineReadingSource[]>([]);

  // Detailed Introduction fields
  const [historicalContext, setHistoricalContext] = useState('');
  const [theme, setTheme] = useState('');
  const [summary, setSummary] = useState('');
  const [realisticValue, setRealisticValue] = useState('');
  const [humanisticValue, setHumanisticValue] = useState('');
  const [examNotes, setExamNotes] = useState('');

  // Detailed Author fields
  const [shortBio, setShortBio] = useState('');
  const [artisticStyle, setArtisticStyle] = useState('');
  const [workSignificance, setWorkSignificance] = useState('');
  const [analysisNotes, setAnalysisNotes] = useState('');

  // Chapter 1 content
  const [chapter1Title, setChapter1Title] = useState('Chương mở đầu');
  const [chapter1Content, setChapter1Content] = useState('');

  // AI Generation State
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiPreviewData, setAiPreviewData] = useState<any | null>(null);

  // ==========================================
  // SHELF FORM STATES
  // ==========================================
  const [isShelfModalOpen, setIsShelfModalOpen] = useState(false);
  const [editingShelfId, setEditingShelfId] = useState<string | null>(null);
  const [shelfName, setShelfName] = useState('');
  const [shelfIcon, setShelfIcon] = useState('📚');
  const [shelfDescription, setShelfDescription] = useState('');

  // ------------------------------------------
  // HANDLERS FOR BOOKS
  // ------------------------------------------
  const handleOpenAdd = () => {
    setEditingBookId(null);
    setTitle('');
    setAuthor('');
    setEra('Văn học hiện đại');
    setCategory('vietnam-classic');
    setCategoryLabel('Văn học Việt Nam');
    setDescription('');
    setCurriculumGrade('Lớp 11 THPT');
    setEstimatedReadTimeMinutes(25);
    setHashtagsInput('#NguVan11, #VanHocVietNam');
    setSelectedShelfIds(shelves.length > 0 ? [shelves[0].id] : []);
    setOnlineSources([
      {
        id: 'src-nlv',
        sourceName: 'Thư viện Quốc gia Việt Nam',
        url: 'https://nlv.gov.vn',
        note: 'Bản số hóa lưu trữ phục vụ giáo dục'
      }
    ]);
    setHistoricalContext('');
    setTheme('');
    setSummary('');
    setRealisticValue('');
    setHumanisticValue('');
    setExamNotes('');
    setShortBio('');
    setArtisticStyle('');
    setWorkSignificance('');
    setAnalysisNotes('');
    setChapter1Title('Chương mở đầu');
    setChapter1Content('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (book: Book) => {
    setEditingBookId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setEra(book.era);
    setCategory(book.category);
    setCategoryLabel(book.categoryLabel);
    setDescription(book.description);
    setCurriculumGrade(book.curriculumGrade || 'Lớp 11 THPT');
    setEstimatedReadTimeMinutes(book.estimatedReadTimeMinutes);
    setHashtagsInput((book.hashtags || []).join(', '));
    setSelectedShelfIds(book.shelfIds || []);
    setOnlineSources(
      book.onlineSources && book.onlineSources.length > 0
        ? book.onlineSources
        : [
            {
              id: 'src-nlv',
              sourceName: 'Thư viện Quốc gia Việt Nam',
              url: 'https://nlv.gov.vn',
              note: 'Bản số hóa lưu trữ phục vụ giáo dục'
            }
          ]
    );

    const intro: BookIntroduction = typeof book.introduction === 'object' && book.introduction !== null
      ? book.introduction
      : { summary: typeof book.introduction === 'string' ? book.introduction : '' };
    setHistoricalContext(intro.historicalContext || '');
    setTheme(intro.theme || '');
    setSummary(intro.summary || '');
    setRealisticValue(intro.realisticValue || '');
    setHumanisticValue(intro.humanisticValue || '');
    setExamNotes(intro.examNotes || '');

    const bio: AuthorBiography = typeof book.authorBio === 'object' && book.authorBio !== null
      ? book.authorBio
      : { shortBio: typeof book.authorBio === 'string' ? book.authorBio : '' };
    setShortBio(bio.shortBio || '');
    setArtisticStyle(bio.artisticStyle || '');
    setWorkSignificance(bio.workSignificance || '');
    setAnalysisNotes(bio.analysisNotes || '');

    setChapter1Title(book.chapters[0]?.title || 'Chương mở đầu');
    setChapter1Content(book.chapters[0]?.content || '');
    setIsFormOpen(true);
  };

  // Add / Remove Online Source
  const handleAddSource = () => {
    setOnlineSources((prev) => [
      ...prev,
      { id: 'src-' + Date.now(), sourceName: '', url: 'https://', note: '' }
    ]);
  };

  const handleRemoveSource = (index: number) => {
    setOnlineSources((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSourceChange = (index: number, field: keyof OnlineReadingSource, val: string) => {
    setOnlineSources((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  // Toggle shelf selection
  const handleToggleShelf = (shelfId: string) => {
    setSelectedShelfIds((prev) =>
      prev.includes(shelfId) ? prev.filter((id) => id !== shelfId) : [...prev, shelfId]
    );
  };

  // Trigger AI Generation
  const handleGenerateAI = async () => {
    if (!title.trim()) {
      showToast('Vui lòng nhập tên tác phẩm trước khi tạo nội dung bằng AI!');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai/generate-book-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), author: author.trim() })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiPreviewData(data.data);
        showToast('AI đã tạo xong nội dung chuẩn mực cho tác phẩm!');
      } else {
        showToast(data.error || 'Không thể tạo nội dung AI. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('AI generate error:', err);
      showToast('Có lỗi kết nối khi gọi AI. Vui lòng kiểm tra lại mạng.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Accept AI Generated Content
  const handleAcceptAIContent = () => {
    if (!aiPreviewData) return;

    if (aiPreviewData.author && !author.trim()) {
      setAuthor(aiPreviewData.author);
    }
    if (aiPreviewData.era) setEra(aiPreviewData.era);
    if (aiPreviewData.category) {
      setCategory(aiPreviewData.category);
      setCategoryLabel(
        aiPreviewData.category === 'vietnam-classic'
          ? 'Văn học Việt Nam'
          : aiPreviewData.category === 'world-classic'
          ? 'Văn học Nước ngoài'
          : aiPreviewData.category === 'youth-contemporary'
          ? 'Văn học Đương đại'
          : 'Kỹ năng & Phát triển'
      );
    }

    if (aiPreviewData.hashtags && Array.isArray(aiPreviewData.hashtags)) {
      setHashtagsInput(aiPreviewData.hashtags.join(', '));
    }

    if (aiPreviewData.onlineSources && Array.isArray(aiPreviewData.onlineSources)) {
      setOnlineSources(aiPreviewData.onlineSources);
    }

    const intro = aiPreviewData.introduction;
    if (intro) {
      if (intro.historicalContext) setHistoricalContext(intro.historicalContext);
      if (intro.theme) setTheme(intro.theme);
      if (intro.summary) setSummary(intro.summary);
      if (intro.realisticValue) setRealisticValue(intro.realisticValue);
      if (intro.humanisticValue) setHumanisticValue(intro.humanisticValue);
      if (intro.examNotes) setExamNotes(intro.examNotes);
      if (intro.summary && !description.trim()) setDescription(intro.summary);
    }

    const bio = aiPreviewData.authorBio;
    if (bio) {
      if (bio.shortBio) setShortBio(bio.shortBio);
      if (bio.artisticStyle) setArtisticStyle(bio.artisticStyle);
      if (bio.workSignificance) setWorkSignificance(bio.workSignificance);
      if (bio.analysisNotes) setAnalysisNotes(bio.analysisNotes);
    }

    setAiPreviewData(null);
    showToast('Đã áp dụng toàn bộ nội dung AI vào biểu mẫu!');
  };

  // Save Book
  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      showToast('Vui lòng nhập tên tác phẩm và tên tác giả!');
      return;
    }

    // Parse hashtags
    const parsedHashtags = hashtagsInput
      .split(/[,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    const bookIntro: BookIntroduction = {
      historicalContext: historicalContext.trim(),
      theme: theme.trim(),
      summary: summary.trim() || description.trim(),
      realisticValue: realisticValue.trim(),
      humanisticValue: humanisticValue.trim(),
      examNotes: examNotes.trim()
    };

    const bookAuthorBio: AuthorBiography = {
      shortBio: shortBio.trim(),
      artisticStyle: artisticStyle.trim(),
      workSignificance: workSignificance.trim(),
      analysisNotes: analysisNotes.trim()
    };

    if (editingBookId) {
      const existing = (books || []).find((b) => b.id === editingBookId);
      if (!existing) return;

      const updated: Book = {
        ...existing,
        title: title.trim(),
        author: author.trim(),
        era,
        category,
        categoryLabel:
          category === 'vietnam-classic'
            ? 'Văn học Việt Nam'
            : category === 'world-classic'
            ? 'Văn học Nước ngoài'
            : category === 'youth-contemporary'
            ? 'Văn học Đương đại'
            : 'Kỹ năng & Phát triển',
        description: description.trim() || summary.trim() || existing.description,
        curriculumGrade,
        estimatedReadTimeMinutes: Number(estimatedReadTimeMinutes) || 20,
        hashtags: parsedHashtags,
        shelfIds: selectedShelfIds,
        onlineSources: onlineSources.filter((s) => s.sourceName.trim() && s.url.trim()),
        introduction: bookIntro,
        authorBio: bookAuthorBio,
        chapters: [
          {
            id: existing.chapters[0]?.id || 'chap-1',
            title: chapter1Title.trim() || 'Chương mở đầu',
            order: 1,
            content: chapter1Content.trim() || existing.chapters[0]?.content || 'Đang cập nhật nội dung...'
          },
          ...existing.chapters.slice(1)
        ]
      };

      adminEditBook(updated);
    } else {
      const newBook: Book = {
        id: 'book-' + Date.now(),
        title: title.trim(),
        author: author.trim(),
        era,
        category,
        categoryLabel:
          category === 'vietnam-classic'
            ? 'Văn học Việt Nam'
            : category === 'world-classic'
            ? 'Văn học Nước ngoài'
            : category === 'youth-contemporary'
            ? 'Văn học Đương đại'
            : 'Kỹ năng & Phát triển',
        description: description.trim() || summary.trim() || 'Tác phẩm văn học chọn lọc THPT.',
        curriculumGrade,
        rating: 5.0,
        reviewCount: 1,
        hashtags: parsedHashtags,
        shelfIds: selectedShelfIds,
        onlineSources: onlineSources.filter((s) => s.sourceName.trim() && s.url.trim()),
        introduction: bookIntro,
        authorBio: bookAuthorBio,
        coverTheme: {
          bg: '#FBF4E4',
          border: '#D9BE9B',
          text: '#3D2817',
          tagBg: '#FDFF00',
          illustrationType: 'calligraphy'
        },
        estimatedReadTimeMinutes: Number(estimatedReadTimeMinutes) || 25,
        chapters: [
          {
            id: 'chap-1',
            title: chapter1Title.trim() || 'Chương mở đầu',
            order: 1,
            content: chapter1Content.trim() || 'Nội dung tác phẩm đang được số hóa...'
          }
        ]
      };

      adminAddBook(newBook);
    }

    setIsFormOpen(false);
  };

  // ------------------------------------------
  // HANDLERS FOR SHELVES
  // ------------------------------------------
  const handleOpenAddShelf = () => {
    setEditingShelfId(null);
    setShelfName('');
    setShelfIcon('📚');
    setShelfDescription('');
    setIsShelfModalOpen(true);
  };

  const handleOpenEditShelf = (shelf: Bookshelf) => {
    setEditingShelfId(shelf.id);
    setShelfName(shelf.name);
    setShelfIcon(shelf.icon || '📚');
    setShelfDescription(shelf.description || '');
    setIsShelfModalOpen(true);
  };

  const handleSaveShelf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shelfName.trim()) {
      showToast('Vui lòng nhập tên giá sách!');
      return;
    }

    if (editingShelfId) {
      const existing = shelves.find((s) => s.id === editingShelfId);
      if (existing) {
        adminEditShelf({
          ...existing,
          name: shelfName.trim(),
          icon: shelfIcon.trim() || '📚',
          description: shelfDescription.trim()
        });
      }
    } else {
      adminAddShelf({
        name: shelfName.trim(),
        icon: shelfIcon.trim() || '📚',
        description: shelfDescription.trim(),
        order: shelves.length + 1
      });
    }

    setIsShelfModalOpen(false);
  };

  const handleMoveShelf = (shelfId: string, direction: 'up' | 'down') => {
    const sorted = [...shelves].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((s) => s.id === shelfId);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      const temp = sorted[index];
      sorted[index] = sorted[index - 1];
      sorted[index - 1] = temp;
      adminReorderShelves(sorted.map((s) => s.id));
    } else if (direction === 'down' && index < sorted.length - 1) {
      const temp = sorted[index];
      sorted[index] = sorted[index + 1];
      sorted[index + 1] = temp;
      adminReorderShelves(sorted.map((s) => s.id));
    }
  };

  return (
    <div id="admin-view" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* 1. Header with brand styling */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-amber-200 dark:border-[#38281D] mb-8">
        <div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-xs font-semibold text-[#8C735B] hover:text-[#3D2817] dark:hover:text-white flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở lại Hồ sơ</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FDFF00] text-[#3D2817] border border-[#E5DE00]">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="font-literary text-2xl sm:text-3xl font-extrabold text-[#382617] dark:text-[#F8EFE4]">
              Bàn Quản Trị Hệ Thống
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6048] dark:text-[#A8927D] mt-1">
            Quản lý kho tàng tác phẩm, hệ thống giá sách (bookshelves) và tạo nội dung tự động bằng AI.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-amber-100/70 dark:bg-[#251B14] border border-amber-200">
          <button
            id="admin-tab-books"
            onClick={() => setAdminTab('books')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              adminTab === 'books'
                ? 'bg-[#FDFF00] text-[#3D2817] border border-[#E5DE00] shadow-xs'
                : 'text-[#695340] dark:text-[#CBB59E] hover:text-[#3D2817]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tác phẩm ({books.length})</span>
          </button>

          <button
            id="admin-tab-shelves"
            onClick={() => setAdminTab('shelves')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              adminTab === 'shelves'
                ? 'bg-[#FDFF00] text-[#3D2817] border border-[#E5DE00] shadow-xs'
                : 'text-[#695340] dark:text-[#CBB59E] hover:text-[#3D2817]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Giá sách ({shelves.length})</span>
          </button>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. TAB: QUẢN LÝ TÁC PHẨM                           */}
      {/* ================================================== */}
      {adminTab === 'books' && (
        <div>
          {/* Action Bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C735B]">
              Danh sách tác phẩm ({books.length})
            </span>
            <button
              id="btn-admin-add-book"
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FDFF00] hover:bg-[#FFF44F] text-[#3D2817] border border-[#E5DE00] shadow-xs transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 text-[#3D2817]" />
              <span>Thêm tác phẩm mới</span>
            </button>
          </div>

          {/* Book Form Modal */}
          {isFormOpen && (
            <form
              onSubmit={handleSaveBook}
              className="bg-[#FFFDF9] dark:bg-[#221710] border-2 border-[#FDFF00] rounded-3xl p-6 sm:p-8 shadow-xl mb-10 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  <h3 className="font-literary text-xl font-bold text-[#3B2919] dark:text-[#F7EFE6]">
                    {editingBookId ? 'Chỉnh sửa tác phẩm văn học' : 'Thêm tác phẩm văn học mới'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Requirement 7: Prominent AI Generator Trigger */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-[#FFFEEA] to-amber-50 dark:from-[#2E2015] dark:to-[#221710] border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-2xl bg-[#FDFF00] text-[#3D2817] border border-[#E5DE00] shadow-xs">
                    <Sparkles className="w-5 h-5 text-[#F97316]" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[#3D2817] dark:text-[#FDFF00]">
                      Tự động tạo nội dung bằng AI (Trợ lý Giáo viên Ngữ Văn)
                    </h4>
                    <p className="text-xs text-[#7A6048] dark:text-[#CBB5A0]">
                      Nhập tên tác phẩm & tác giả, AI sẽ tạo chuẩn xác: Giới thiệu, Hoàn cảnh, Giá trị hiện thực / nhân đạo, Tác giả và Hashtags.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGeneratingAI || !title.trim()}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-[#FDFF00] hover:bg-[#FFF44F] text-[#3D2817] border border-[#E5DE00] shadow-sm flex items-center gap-2 disabled:opacity-50 transition-all hover:scale-[1.02] shrink-0"
                >
                  {isGeneratingAI ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#F97316]" />
                      <span>AI đang phân tích...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#F97316]" />
                      <span>TỰ ĐỘNG TẠO NỘI DUNG BẰNG AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Preview Dialog/Banner if generated */}
              {aiPreviewData && (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-[#1A2619] border-2 border-emerald-400 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                      <Check className="w-5 h-5" />
                      <span>AI đã tạo nội dung thành công cho "{title}"!</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAcceptAIContent}
                      className="px-4 py-2 rounded-xl bg-[#FDFF00] hover:bg-[#FFF44F] text-[#3D2817] text-xs font-bold border border-[#E5DE00] shadow-xs flex items-center gap-1.5"
                    >
                      <span>Chấp nhận & Điền vào Form</span>
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-[#3D2817] dark:text-[#D1BEAA] bg-white/80 dark:bg-black/30 p-3.5 rounded-xl space-y-2">
                    <p><strong>Hoàn cảnh:</strong> {aiPreviewData.introduction?.historicalContext}</p>
                    <p><strong>Chủ đề:</strong> {aiPreviewData.introduction?.theme}</p>
                    <p><strong>Tóm tắt:</strong> {aiPreviewData.introduction?.summary}</p>
                    <p><strong>Hashtags gợi ý:</strong> {aiPreviewData.hashtags?.join(', ')}</p>
                  </div>
                </div>
              )}

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] mb-1">
                    Tên tác phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ví dụ: Rừng Xà Nu, Chí Phèo..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E1712] border border-amber-300 dark:border-[#3A291D] text-[#3D2C1D] dark:text-[#F3E7D3] focus:outline-none focus:ring-2 focus:ring-[#FDFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] mb-1">
                    Tác giả *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Trung Thành, Nam Cao..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E1712] border border-amber-300 dark:border-[#3A291D] text-[#3D2C1D] dark:text-[#F3E7D3] focus:outline-none focus:ring-2 focus:ring-[#FDFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] mb-1">
                    Thời kỳ / Bối cảnh lịch sử
                  </label>
                  <input
                    type="text"
                    value={era}
                    onChange={(e) => setEra(e.target.value)}
                    placeholder="Ví dụ: Kháng chiến chống Mỹ (1965)..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E1712] border border-amber-300 dark:border-[#3A291D] text-[#3D2C1D] dark:text-[#F3E7D3] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] mb-1">
                    Phân loại thể loại
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const val = e.target.value as BookCategory;
                      setCategory(val);
                      setCategoryLabel(
                        val === 'vietnam-classic'
                          ? 'Văn học Việt Nam'
                          : val === 'world-classic'
                          ? 'Văn học Nước ngoài'
                          : val === 'youth-contemporary'
                          ? 'Văn học Đương đại'
                          : 'Kỹ năng & Phát triển'
                      );
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E1712] border border-amber-300 dark:border-[#3A291D] text-[#3D2C1D] dark:text-[#F3E7D3] focus:outline-none"
                  >
                    <option value="vietnam-classic">Văn học Việt Nam</option>
                    <option value="world-classic">Văn học Nước ngoài</option>
                    <option value="youth-contemporary">Văn học Đương đại</option>
                    <option value="self-growth">Kỹ năng & Phát triển</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] mb-1">
                    Khối lớp THPT
                  </label>
                  <input
                    type="text"
                    value={curriculumGrade}
                    onChange={(e) => setCurriculumGrade(e.target.value)}
                    placeholder="Ví dụ: Lớp 11 THPT..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E1712] border border-amber-300 dark:border-[#3A291D] text-[#3D2C1D] dark:text-[#F3E7D3] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] mb-1">
                    Thời lượng đọc ước tính (phút)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={estimatedReadTimeMinutes}
                    onChange={(e) => setEstimatedReadTimeMinutes(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E1712] border border-amber-300 dark:border-[#3A291D] text-[#3D2C1D] dark:text-[#F3E7D3] focus:outline-none"
                  />
                </div>
              </div>

              {/* Requirement 8: Hashtags Field */}
              <div>
                <label className="block text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] mb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Hashtags tác phẩm (cách nhau bởi dấu phẩy hoặc khoảng trắng)</span>
                </label>
                <input
                  type="text"
                  value={hashtagsInput}
                  onChange={(e) => setHashtagsInput(e.target.value)}
                  placeholder="Ví dụ: #TruyenKieu, #NguyenDu, #VanHocTrungDai, #THPT, #Lop11"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E1712] border border-amber-300 dark:border-[#3A291D] text-[#3D2C1D] dark:text-[#F3E7D3] focus:outline-none focus:ring-2 focus:ring-[#FDFF00]"
                />
              </div>

              {/* Requirement 6: Chọn Giá Sách mà cuốn sách thuộc về */}
              <div>
                <label className="block text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Chọn giá sách (Có thể thuộc 1 hoặc nhiều giá sách)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {shelves.map((shelf) => {
                    const isChecked = selectedShelfIds.includes(shelf.id);
                    return (
                      <button
                        type="button"
                        key={shelf.id}
                        onClick={() => handleToggleShelf(shelf.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                          isChecked
                            ? 'bg-[#FDFF00] text-[#3D2817] border-[#E5DE00] shadow-xs'
                            : 'bg-white dark:bg-[#251B14] text-[#695340] dark:text-[#CBB59E] border-amber-200 hover:border-amber-400'
                        }`}
                      >
                        <span>{shelf.icon || '📖'}</span>
                        <span>{shelf.name}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-[#3D2817]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Requirement 6: Nguồn đọc Online (Nhiều nguồn) */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-[#251B14] border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#4A3525] dark:text-[#CBB6A1] flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#0284C7]" />
                    <span>Nguồn đọc online uy tín (Thêm nhiều nguồn)</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSource}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-[#FDFF00] hover:bg-[#FFF44F] text-[#3D2817] border border-[#E5DE00] flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Thêm nguồn đọc</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {onlineSources.map((src, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-[#1E1712] border border-amber-200 flex flex-col sm:flex-row items-center gap-2"
                    >
                      <input
                        type="text"
                        value={src.sourceName}
                        onChange={(e) => handleSourceChange(idx, 'sourceName', e.target.value)}
                        placeholder="Tên nguồn (VD: Thư viện Quốc gia)"
                        className="w-full sm:w-1/3 px-3 py-1.5 rounded-lg text-xs border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                      />
                      <input
                        type="url"
                        value={src.url}
                        onChange={(e) => handleSourceChange(idx, 'url', e.target.value)}
                        placeholder="URL (https://...)"
                        className="w-full sm:w-1/3 px-3 py-1.5 rounded-lg text-xs border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                      />
                      <input
                        type="text"
                        value={src.note || ''}
                        onChange={(e) => handleSourceChange(idx, 'note', e.target.value)}
                        placeholder="Ghi chú (Bản số hóa THPT...)"
                        className="w-full sm:w-1/3 px-3 py-1.5 rounded-lg text-xs border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSource(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        title="Xóa nguồn này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement 5 & 6: Phần 1 - Giới thiệu tác phẩm */}
              <div className="p-4 rounded-2xl bg-[#FFFEEA] dark:bg-[#2A1E14] border border-amber-200 space-y-4">
                <h4 className="font-literary text-base font-bold text-[#3D2817] dark:text-[#FDFF00] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#F97316]" />
                  <span>Phần 1: Giới thiệu tác phẩm (Chuẩn kiến thức THPT)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                      Hoàn cảnh sáng tác
                    </label>
                    <textarea
                      rows={3}
                      value={historicalContext}
                      onChange={(e) => setHistoricalContext(e.target.value)}
                      placeholder="Thời điểm, bối cảnh lịch sử, xuất xứ..."
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                      Chủ đề tư tưởng
                    </label>
                    <textarea
                      rows={3}
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      placeholder="Chủ đề chính và thông điệp tác phẩm gửi gắm..."
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                    Tóm tắt nội dung khái quát
                  </label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Tóm lược cốt truyện, nhân vật và diễn biến..."
                    className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                      Giá trị hiện thực
                    </label>
                    <textarea
                      rows={3}
                      value={realisticValue}
                      onChange={(e) => setRealisticValue(e.target.value)}
                      placeholder="Bức tranh hiện thực đời sống, mâu thuẫn xã hội..."
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                      Giá trị nhân đạo
                    </label>
                    <textarea
                      rows={3}
                      value={humanisticValue}
                      onChange={(e) => setHumanisticValue(e.target.value)}
                      placeholder="Tấm lòng xót thương, ca ngợi vẻ đẹp phẩm chất..."
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                    Những điểm đáng chú ý khi đọc / làm bài thi THPT
                  </label>
                  <textarea
                    rows={3}
                    value={examNotes}
                    onChange={(e) => setExamNotes(e.target.value)}
                    placeholder="Các biện pháp nghệ thuật đắt giá, luận điểm then chốt khi viết văn..."
                    className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                  />
                </div>
              </div>

              {/* Requirement 5 & 6: Phần 2 - Tác giả */}
              <div className="p-4 rounded-2xl bg-[#FFFEEA] dark:bg-[#2A1E14] border border-amber-200 space-y-4">
                <h4 className="font-literary text-base font-bold text-[#3D2817] dark:text-[#FDFF00] flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[#22C55E]" />
                  <span>Phần 2: Tác giả</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                      Tiểu sử ngắn gọn
                    </label>
                    <textarea
                      rows={3}
                      value={shortBio}
                      onChange={(e) => setShortBio(e.target.value)}
                      placeholder="Năm sinh, quê quán, con đường sáng tác..."
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                      Phong cách nghệ thuật
                    </label>
                    <textarea
                      rows={3}
                      value={artisticStyle}
                      onChange={(e) => setArtisticStyle(e.target.value)}
                      placeholder="Nét đặc sắc về giọng điệu, ngôn ngữ, thể loại..."
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                      Vị trí của tác phẩm trong sự nghiệp tác giả
                    </label>
                    <textarea
                      rows={3}
                      value={workSignificance}
                      onChange={(e) => setWorkSignificance(e.target.value)}
                      placeholder="Đỉnh cao sự nghiệp, bước ngoặt sáng tác..."
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5C4533] dark:text-[#D1BEAA] mb-1">
                      Điểm cần nhớ khi phân tích tác giả trong đề thi
                    </label>
                    <textarea
                      rows={3}
                      value={analysisNotes}
                      onChange={(e) => setAnalysisNotes(e.target.value)}
                      placeholder="Mối liên hệ giữa tư tưởng nhà văn và hình tượng nhân vật..."
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-200"
                    />
                  </div>
                </div>
              </div>

              {/* Trích đoạn đọc trực tiếp (Chương 1) */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#251B14] border border-stone-200 space-y-3">
                <h4 className="font-literary text-base font-bold text-[#3D2817] dark:text-[#FDFF00] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#8C735B]" />
                  <span>Trích đoạn đọc trực tiếp trong ứng dụng (Chương 1)</span>
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Tiêu đề chương / đoạn trích
                  </label>
                  <input
                    type="text"
                    value={chapter1Title}
                    onChange={(e) => setChapter1Title(e.target.value)}
                    placeholder="Ví dụ: Chương mở đầu..."
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Nội dung văn bản
                  </label>
                  <textarea
                    rows={6}
                    value={chapter1Content}
                    onChange={(e) => setChapter1Content(e.target.value)}
                    placeholder="Dán toàn bộ văn bản hoặc trích đoạn tác phẩm..."
                    className="w-full p-3 rounded-xl text-xs font-literary bg-white dark:bg-[#1E1712] border border-stone-300"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-amber-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#8C735B] hover:bg-[#EFE3CF]"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FDFF00] hover:bg-[#FFF44F] text-[#3D2817] border border-[#E5DE00] shadow-xs hover:scale-[1.02] transition-all"
                >
                  {editingBookId ? 'Lưu thay đổi tác phẩm' : 'Đăng tải tác phẩm'}
                </button>
              </div>
            </form>
          )}

          {/* Books Table */}
          <div className="bg-[#FFFDF9] dark:bg-[#251B14] border border-amber-200 dark:border-[#3D2C1F] rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF4EA] dark:bg-[#201812] text-[#695340] dark:text-[#CBB59E] border-b border-amber-200">
                  <tr>
                    <th className="p-4 font-bold">Tác phẩm</th>
                    <th className="p-4 font-bold">Tác giả</th>
                    <th className="p-4 font-bold">Giá sách</th>
                    <th className="p-4 font-bold">Hashtags</th>
                    <th className="p-4 font-bold">Nguồn online</th>
                    <th className="p-4 font-bold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 dark:divide-[#38281D]">
                  {books.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAF4EA]/50 dark:hover:bg-[#2A1E15] transition-colors">
                      <td className="p-4 font-bold text-[#3B2919] dark:text-[#F7EFE6]">
                        {b.title}
                      </td>
                      <td className="p-4 text-[#6E553F] dark:text-[#CBB59E]">
                        {b.author}
                      </td>
                      <td className="p-4 text-[#8C735B] dark:text-[#A8927D]">
                        <div className="flex flex-wrap gap-1">
                          {(b.shelfIds || []).map((sId) => {
                            const shelf = shelves.find((s) => s.id === sId);
                            return (
                              <span key={sId} className="px-2 py-0.5 rounded-md bg-[#FFF44F] text-[#3D2817] text-[10px] font-bold">
                                {shelf?.name || sId}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="p-4 text-[#8C735B]">
                        <div className="flex flex-wrap gap-1">
                          {(b.hashtags || []).slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-[#6B533E]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-[#8C735B]">
                        <span className="font-semibold text-[#0284C7]">
                          {(b.onlineSources || []).length} nguồn
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(b)}
                            className="p-1.5 rounded-lg text-[#6E553F] hover:bg-[#EFE3D0] dark:hover:bg-[#382619] transition-colors"
                            title="Sửa tác phẩm"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc muốn xóa tác phẩm "${b.title}" khỏi thư viện?`)) {
                                adminDeleteBook(b.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-[#C94034] hover:bg-[#FBE8E6] transition-colors"
                            title="Xóa tác phẩm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 3. TAB: QUẢN LÝ GIÁ SÁCH (BOOKSHELVES - Req 4)     */}
      {/* ================================================== */}
      {adminTab === 'shelves' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-literary text-xl font-bold text-[#3D2817] dark:text-[#F8EFE4]">
                Quản lý Cấu trúc Giá Sách (Bookshelves)
              </h2>
              <p className="text-xs text-[#7A6048] dark:text-[#A8927D]">
                Tạo giá sách theo chuyên đề, đặt tên, sắp xếp thứ tự và phân bổ tác phẩm.
              </p>
            </div>

            <button
              id="btn-admin-add-shelf"
              onClick={handleOpenAddShelf}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FDFF00] hover:bg-[#FFF44F] text-[#3D2817] border border-[#E5DE00] shadow-xs flex items-center gap-2 hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo giá sách mới</span>
            </button>
          </div>

          {/* Shelf Modal */}
          {isShelfModalOpen && (
            <form
              onSubmit={handleSaveShelf}
              className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#251B14] border-2 border-[#FDFF00] shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <h3 className="font-literary text-lg font-bold text-[#3D2817] dark:text-[#F8EFE4]">
                  {editingShelfId ? 'Chỉnh sửa giá sách' : 'Tạo giá sách mới'}
                </h3>
                <button type="button" onClick={() => setIsShelfModalOpen(false)}>
                  <X className="w-4 h-4 text-stone-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3525] mb-1">
                    Biểu tượng / Emoji
                  </label>
                  <input
                    type="text"
                    value={shelfIcon}
                    onChange={(e) => setShelfIcon(e.target.value)}
                    placeholder="Ví dụ: 📜, 🌾, 🌍, 🌟"
                    className="w-full px-3 py-2 rounded-xl text-sm bg-white dark:bg-[#1E1712] border border-amber-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#4A3525] mb-1">
                    Tên giá sách *
                  </label>
                  <input
                    type="text"
                    required
                    value={shelfName}
                    onChange={(e) => setShelfName(e.target.value)}
                    placeholder="Ví dụ: Văn học Trung đại, Thơ ca kháng chiến..."
                    className="w-full px-3 py-2 rounded-xl text-sm bg-white dark:bg-[#1E1712] border border-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A3525] mb-1">
                  Mô tả giá sách
                </label>
                <textarea
                  rows={2}
                  value={shelfDescription}
                  onChange={(e) => setShelfDescription(e.target.value)}
                  placeholder="Mô tả tóm tắt nội dung của giá sách..."
                  className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#1E1712] border border-amber-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsShelfModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#8C735B]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-[#FDFF00] hover:bg-[#FFF44F] text-[#3D2817] border border-[#E5DE00]"
                >
                  {editingShelfId ? 'Lưu giá sách' : 'Tạo giá sách'}
                </button>
              </div>
            </form>
          )}

          {/* Shelves List */}
          <div className="grid grid-cols-1 gap-4">
            {[...shelves]
              .sort((a, b) => a.order - b.order)
              .map((shelf, idx, arr) => {
                const bookCount = books.filter((b) => (b.shelfIds || []).includes(shelf.id)).length;
                return (
                  <div
                    key={shelf.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#251B14] border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-xl bg-[#FFF44F]/50 border border-[#FDFF00]">
                        {shelf.icon || '📚'}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-literary text-lg font-bold text-[#3D2817] dark:text-[#F8EFE4]">
                            {shelf.name}
                          </h4>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FDFF00] text-[#3D2817] border border-[#E5DE00]">
                            {bookCount} tác phẩm
                          </span>
                        </div>
                        <p className="text-xs text-[#7A6048] dark:text-[#CBB5A0] mt-0.5">
                          {shelf.description || 'Chưa có mô tả cho giá sách này.'}
                        </p>
                      </div>
                    </div>

                    {/* Shelf Actions: Reorder, Edit, Delete */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleMoveShelf(shelf.id, 'up')}
                        disabled={idx === 0}
                        title="Di chuyển lên"
                        className="p-2 rounded-xl bg-amber-50 hover:bg-[#FDFF00] disabled:opacity-30 border border-amber-200"
                      >
                        <ArrowUp className="w-4 h-4 text-[#3D2817]" />
                      </button>

                      <button
                        onClick={() => handleMoveShelf(shelf.id, 'down')}
                        disabled={idx === arr.length - 1}
                        title="Di chuyển xuống"
                        className="p-2 rounded-xl bg-amber-50 hover:bg-[#FDFF00] disabled:opacity-30 border border-amber-200"
                      >
                        <ArrowDown className="w-4 h-4 text-[#3D2817]" />
                      </button>

                      <button
                        onClick={() => handleOpenEditShelf(shelf)}
                        title="Chỉnh sửa giá sách"
                        className="p-2 rounded-xl bg-amber-50 hover:bg-[#FDFF00] border border-amber-200"
                      >
                        <Edit3 className="w-4 h-4 text-[#3D2817]" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc muốn xóa giá sách "${shelf.name}"?`)) {
                            adminDeleteShelf(shelf.id);
                          }
                        }}
                        title="Xóa giá sách"
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
