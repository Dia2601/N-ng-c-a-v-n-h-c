import { Bookshelf } from '../types';

export const INITIAL_BOOKSHELVES: Bookshelf[] = [
  {
    id: 'shelf-vietnam-classic',
    name: 'Kệ Tinh Hoa Văn Học Việt Nam',
    description: 'Kho tàng áng văn trung đại và các kiệt tác văn chương bất hủ trong chương trình Ngữ văn THPT.',
    icon: '📜',
    hashtag: '#KinhDienVietNam',
    order: 1,
    displayOrder: 1,
    colorTone: '#FDFF00',
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'shelf-truyen-ngan',
    name: 'Kệ Truyện Ngắn Hiện Thực 1930 - 1945',
    description: 'Bức tranh hiện thực thấm đượm tình người, chiều sâu tâm lý và nỗi đau thân phận của Nam Cao, Kim Lân, Thạch Lam.',
    icon: '🌾',
    hashtag: '#TruyenNgan',
    order: 2,
    displayOrder: 2,
    colorTone: '#F97316',
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'shelf-world-classic',
    name: 'Kệ Văn Học Thế Giới & Nhân Loại',
    description: 'Những tuyệt phẩm đại diện cho vẻ đẹp nhân loại từ phương Đông đến phương Tây vượt mọi biên giới thời gian.',
    icon: '🌍',
    hashtag: '#VanHocTheGioi',
    order: 3,
    displayOrder: 3,
    colorTone: '#22C55E',
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'shelf-youth-growth',
    name: 'Kệ Tuổi Trẻ & Kỹ Năng Sống',
    description: 'Những trang viết ấm áp nuôi dưỡng hạt giống cảm xúc, bồi đắp tâm hồn và rèn luyện thói quen tích cực.',
    icon: '🌱',
    hashtag: '#TuoiTre',
    order: 4,
    displayOrder: 4,
    colorTone: '#0284C7',
    createdAt: '2026-09-01T00:00:00.000Z'
  }
];

export const INITIAL_SHELVES = INITIAL_BOOKSHELVES;
