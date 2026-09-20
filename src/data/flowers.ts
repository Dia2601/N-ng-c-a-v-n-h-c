export interface FlowerMeta {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  color: string;
  bgGrad: string;
  rarity: 'common' | 'rare';
  rarityLabel: string;
  potRequirement: string;
  quote: string;
  literaryQuote?: string;
  description: string;
  symbolism?: string;
  associatedAuthorOrWork: string;
  associatedWork?: string;
  associatedAuthor?: string;
}

export const LITERARY_FLOWERS: FlowerMeta[] = [
  {
    id: 'flower-huong-duong',
    name: 'Hoa Hướng Dương',
    englishName: 'Sunflower',
    icon: '🌻',
    color: '#EAB308',
    bgGrad: 'from-amber-100 to-yellow-200',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Có sẵn ngay từ đầu',
    quote: 'Luôn hướng về phía mặt trời và ánh sáng tri thức văn chương.',
    description: 'Biểu tượng của niềm tin, sự lạc quan và ánh sáng lý tưởng sống cao đẹp của tuổi trẻ.',
    associatedAuthorOrWork: 'Lý tưởng sống — Thơ Tố Hữu'
  },
  {
    id: 'flower-hong',
    name: 'Hoa Hồng',
    englishName: 'Rose',
    icon: '🌹',
    color: '#EF4444',
    bgGrad: 'from-rose-100 to-red-200',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Đọc đủ 10 phút hoặc hoàn thành 1 chương sách',
    quote: 'Chính thời gian bạn dành cho bông hồng đã làm cho nó trở nên quan trọng.',
    description: 'Biểu tượng của tình yêu trong sáng, sự trân trọng và tấm lòng nâng niu vẻ đẹp tâm hồn.',
    associatedAuthorOrWork: 'Hoàng Tử Bé — Saint-Exupéry'
  },
  {
    id: 'flower-cuc',
    name: 'Hoa Cúc',
    englishName: 'Daisy',
    icon: '🌼',
    color: '#F59E0B',
    bgGrad: 'from-yellow-50 to-amber-100',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Hoàn thành 1 thử tài văn chương đầu tiên',
    quote: 'Cúc áo vàng tươi thầm lặng dâng hương sắc cho đời.',
    description: 'Vẻ đẹp mộc mạc, bình dị, tượng trưng cho tấm lòng hiếu thảo và sự nhẫn nại bền bỉ.',
    associatedAuthorOrWork: 'Ca dao & Tình phụ tử'
  },
  {
    id: 'flower-tulip',
    name: 'Hoa Tulip',
    englishName: 'Tulip',
    icon: '🌷',
    color: '#EC4899',
    bgGrad: 'from-pink-100 to-rose-200',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Đọc tổng cộng 20 phút sách',
    quote: 'Mỗi cánh hoa khép mở theo nhịp thở êm dịu của mùa xuân.',
    description: 'Biểu trưng của tình cảm chân thành, thanh lịch và niềm tin vào tương lai tươi sáng.',
    associatedAuthorOrWork: 'Thơ lãng mạn Việt Nam'
  },
  {
    id: 'flower-oai-huong',
    name: 'Hoa Oải Hương',
    englishName: 'Lavender',
    icon: '🪻',
    color: '#8B5CF6',
    bgGrad: 'from-purple-100 to-indigo-200',
    rarity: 'rare',
    rarityLabel: 'Hiếm ✨',
    potRequirement: 'Đạt cấp độ 2 & trả lời đúng 3 câu hỏi thử tài',
    quote: 'Hương thơm hoài niệm đọng lại sâu lắng tựa dòng ký ức trang sách cũ.',
    description: 'Loài hoa tím của lòng chung thủy, sự trầm lắng và những rung động tinh khôi thuở học trò.',
    associatedAuthorOrWork: 'Mắt Biếc — Nguyễn Nhật Ánh'
  },
  {
    id: 'flower-anh-dao',
    name: 'Hoa Anh Đào',
    englishName: 'Cherry Blossom',
    icon: '🌸',
    color: '#F43F5E',
    bgGrad: 'from-pink-50 to-rose-100',
    rarity: 'rare',
    rarityLabel: 'Hiếm ✨',
    potRequirement: 'Đọc sách 3 ngày liên tiếp hoặc hoàn thành 2 tác phẩm',
    quote: 'Rơi với vận tốc 5 centimet trên giây, nhẹ như một lời ước hẹn thời niên thiếu.',
    description: 'Biểu tượng của vẻ đẹp mong manh thanh tao, sự trân trọng từng khoảnh khắc ngắn ngủi của đời người.',
    associatedAuthorOrWork: 'Văn học thế giới & Tuổi thanh xuân'
  },
  {
    id: 'flower-ly',
    name: 'Hoa Ly',
    englishName: 'Lily',
    icon: '🌺',
    color: '#FB7185',
    bgGrad: 'from-orange-50 to-rose-100',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Lưu 2 cuốn sách vào Tủ Sách cá nhân',
    quote: 'Hương ly thuần khiết làm bừng sáng góc bàn học và những trang văn.',
    description: 'Tượng trưng cho sự thanh cao, đức hạnh đoan trang và tình cảm bao dung thuần khiết.',
    associatedAuthorOrWork: 'Chuyện Người Con Gái Nam Xương'
  },
  {
    id: 'flower-cam-tu-cau',
    name: 'Hoa Cẩm Tú Cầu',
    englishName: 'Hydrangea',
    icon: '💐',
    color: '#06B6D4',
    bgGrad: 'from-cyan-100 to-blue-200',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Tưới cây 5 lần bằng Giọt Tri Thức',
    quote: 'Muôn ngàn cánh nhỏ đan xen tạo nên quả cầu tri thức diệu kỳ.',
    description: 'Biểu trưng của sự gắn kết, lòng biết ơn sâu sắc và muôn màu cảm xúc trong văn học.',
    associatedAuthorOrWork: 'Tình bạn & Văn học thiếu nhi'
  },
  {
    id: 'flower-bo-cong-anh',
    name: 'Hoa Bồ Công Anh',
    englishName: 'Dandelion',
    icon: '🌾',
    color: '#84CC16',
    bgGrad: 'from-lime-100 to-emerald-200',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Đọc trích đoạn Dế Mèn Phiêu Lưu Ký',
    quote: 'Theo gió bay xa, gieo hạt giống ước mơ khắp mọi miền đất nước.',
    description: 'Khát vọng tự do, phiêu lưu và tinh thần dám bước ra thế giới rộng lớn.',
    associatedAuthorOrWork: 'Dế Mèn Phiêu Lưu Ký — Tô Hoài'
  },
  {
    id: 'flower-mau-don',
    name: 'Hoa Mẫu Đơn',
    englishName: 'Peony',
    icon: '🏵️',
    color: '#D946EF',
    bgGrad: 'from-fuchsia-100 to-pink-200',
    rarity: 'rare',
    rarityLabel: 'Hiếm ✨',
    potRequirement: 'Tích lũy 50 Ngòi Bút & đọc xong 3 tác phẩm',
    quote: 'Khí chất vương giả, đoan trang, phong thái của bậc tài hoa.',
    description: 'Tượng trưng cho phẩm hạnh cao quý, tài năng rực rỡ và vẻ đẹp hoàn mỹ không tì vết.',
    associatedAuthorOrWork: 'Vẻ đẹp Thúy Kiều — Truyện Kiều'
  },
  {
    id: 'flower-sen',
    name: 'Hoa Sen',
    englishName: 'Lotus',
    icon: '🪷',
    color: '#EC4899',
    bgGrad: 'from-rose-50 to-pink-100',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Khám phá tác phẩm Chí Phèo hoặc Lão Hạc',
    quote: 'Gần bùn mà chẳng hôi tanh mùi bùn — ngời sáng thiên lương con người.',
    description: 'Quốc hoa Việt Nam, tượng trưng cho nhân cách trong sạch, bản lĩnh và thiên lương bất diệt.',
    associatedAuthorOrWork: 'Chí Phèo, Lão Hạc — Nam Cao'
  },
  {
    id: 'flower-lan',
    name: 'Hoa Lan',
    englishName: 'Orchid',
    icon: '💮',
    color: '#A855F7',
    bgGrad: 'from-purple-50 to-violet-100',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Hỏi AI Văn Học 2 câu hỏi đọc hiểu',
    quote: 'Thanh tao giữa chốn thâm u, kiêu hãnh như khí phách Huấn Cao.',
    description: 'Biểu trưng của bậc chính nhân quân tử, sự tinh tế trong thưởng thức nghệ thuật và cái đẹp.',
    associatedAuthorOrWork: 'Chữ Người Tử Tù — Nguyễn Tuân'
  },
  {
    id: 'flower-nhai',
    name: 'Hoa Nhài',
    englishName: 'Jasmine',
    icon: '🤍',
    color: '#10B981',
    bgGrad: 'from-emerald-50 to-teal-100',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Đọc truyện ngắn Thạch Lam (Gió Lạnh Đầu Mùa)',
    quote: 'Thoang thoảng hương đêm, dịu mát như tình người trong gió lạnh đầu đông.',
    description: 'Vẻ đẹp dịu dàng, kín đáo, mang lại sự bình yên trong tâm hồn sau những giờ học căng thẳng.',
    associatedAuthorOrWork: 'Gió Lạnh Đầu Mùa — Thạch Lam'
  },
  {
    id: 'flower-thach-thao',
    name: 'Hoa Thạch Thảo',
    englishName: 'Aster',
    icon: '💜',
    color: '#6366F1',
    bgGrad: 'from-indigo-50 to-blue-100',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Viết 1 bài viết hoặc bình luận trên Diễn Đàn',
    quote: 'Màu tím thủy chung, gắn liền với những bức thư tình văn học.',
    description: 'Tượng trưng cho sự hoài niệm nhẹ nhàng, tình cảm bạn bè bền chặt và những ước mơ học trò.',
    associatedAuthorOrWork: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh'
  },
  {
    id: 'flower-da-yen-thao',
    name: 'Hoa Dạ Yến Thảo',
    englishName: 'Petunia',
    icon: '🌺',
    color: '#F43F5E',
    bgGrad: 'from-rose-100 to-amber-100',
    rarity: 'common',
    rarityLabel: 'Phổ biến',
    potRequirement: 'Hoàn thiện 7 giai đoạn phát triển của bất kỳ chậu cây nào',
    quote: 'Rực rỡ sắc màu ban công, tràn đầy sinh khí của tuổi thanh xuân rạng ngời.',
    description: 'Tượng trưng cho niềm hân hoan thành quả, tình yêu thiên nhiên và tâm hồn rộng mở.',
    associatedAuthorOrWork: 'Vườn Tri Thức — Nắng Của Văn Học'
  }
];

// The 7 growth stages defined by the design prompt
export interface GrowthStageMeta {
  stage: number; // 1 to 7
  name: string;
  shortName: string;
  icon: string;
  description: string;
  requiredWaterDrops: number; // drops required to reach 100% in this stage
  reward?: string;
}

export const GROWTH_STAGES: GrowthStageMeta[] = [
  {
    stage: 1,
    name: 'Hạt giống văn học',
    shortName: 'Hạt giống',
    icon: '🌱',
    description: 'Hạt mầm tri thức vừa được gieo xuống nền đất tơi xốp.',
    requiredWaterDrops: 2,
    reward: '+10 Ngòi bút'
  },
  {
    stage: 2,
    name: 'Mầm xanh nhú lên',
    shortName: 'Nảy mầm',
    icon: '🌱',
    description: 'Mầm non đội đất vươn lên đón những tia nắng ấm đầu tiên.',
    requiredWaterDrops: 3,
    reward: '+15 Ngòi bút'
  },
  {
    stage: 3,
    name: 'Cây non xanh biếc',
    shortName: 'Cây non',
    icon: '🌿',
    description: 'Những chiếc lá non mọc đều đặn, rễ cây bắt đầu bám sâu.',
    requiredWaterDrops: 4,
    reward: '+20 Ngòi bút'
  },
  {
    stage: 4,
    name: 'Cây trưởng thành vươn cao',
    shortName: 'Cây trưởng thành',
    icon: '🪴',
    description: 'Thân cây cứng cáp, tán lá xum xuê đón trọn vẹn ánh nắng.',
    requiredWaterDrops: 5,
    reward: '+25 Ngòi bút'
  },
  {
    stage: 5,
    name: 'Cây kết nụ e ấp',
    shortName: 'Kết nụ',
    icon: '🌷',
    description: 'Nụ hoa chúm chím căng tràn nhựa sống, chuẩn bị hé nở.',
    requiredWaterDrops: 6,
    reward: '+30 Ngòi bút'
  },
  {
    stage: 6,
    name: 'Hoa nở rộ rực rỡ',
    shortName: 'Hoa nở',
    icon: '🌸',
    description: 'Cánh hoa bung tỏa rực rỡ ngát hương thơm giữa vườn tri thức.',
    requiredWaterDrops: 6,
    reward: '+50 Ngòi bút & Mở khóa bộ sưu tập'
  },
  {
    stage: 7,
    name: 'Hoa hoàn thiện & Lưu trữ',
    shortName: 'Bộ sưu tập',
    icon: '🌺',
    description: 'Bông hoa đạt đỉnh cao mỹ học, được lưu trữ vĩnh viễn vào Bộ Sưu Tập!',
    requiredWaterDrops: 0, // final stage
    reward: 'Danh hiệu Tinh Hoa Văn Chương'
  }
];

export const getFlowerById = (id?: string): FlowerMeta | undefined => {
  if (!id) return undefined;
  const flower = LITERARY_FLOWERS.find((f) => f.id === id);
  if (!flower) return undefined;
  return {
    ...flower,
    literaryQuote: flower.literaryQuote || flower.quote,
    symbolism: flower.symbolism || flower.description,
    associatedWork: flower.associatedWork || flower.associatedAuthorOrWork,
    associatedAuthor: flower.associatedAuthor || 'Văn học Việt Nam'
  };
};

