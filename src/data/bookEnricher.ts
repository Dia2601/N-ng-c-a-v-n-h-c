import { Book, OnlineReadingSource } from '../types';

interface BookDetailMetadata {
  shelfIds: string[];
  hashtags: string[];
  introduction: string;
  authorBio: string;
  onlineSources: OnlineReadingSource[];
}

export const BOOK_METADATA_REGISTRY: Record<string, BookDetailMetadata> = {
  'truyen-kieu': {
    shelfIds: ['shelf-vietnam-classic'],
    hashtags: ['#TruyenKieu', '#NguyenDu', '#VanHocTrungDai', '#DoanTruongTanThanh', '#NguVan11'],
    introduction: 'Tác phẩm "Truyện Kiều" (Đoạn trường tân thanh) của Đại thi hào Nguyễn Du là kiệt tác thơ Nôm bất hủ của nền văn học trung đại Việt Nam. Tác phẩm tái hiện tấn bi kịch mười lăm năm chìm nổi, lưu lạc đoạn trường của nàng Thúy Kiều - người con gái sắc nước hương trời, tài hoa tột bậc nhưng phải hy sinh tuổi thanh xuân, bán mình chuộc cha và cứu em khỏi vòng lao lý. Giá trị nổi bật của tác phẩm thể hiện ở giá trị hiện thực đanh thép (tố cáo xã hội đồng tiền tanh hôi và giai cấp quan lại phong kiến tha hóa chà đạp lên con người) và giá trị nhân đạo bao la (ngợi ca phẩm giá, ước mơ tự do công lý và đồng cảm sâu sắc với nỗi đau người phụ nữ). Khi học, học sinh THPT cần chú ý bút pháp tả cảnh ngụ tình trác tuyệt, nghệ thuật miêu tả nội tâm nhân vật và hệ thống từ ngữ tượng hình, điển cố hàm súc.',
    authorBio: 'Nguyễn Du (1765 - 1820), tên chữ Tố Như, hiệu Thanh Hiên, sinh ra tại Thăng Long, quê gốc tại làng Tiên Điền, huyện Nghi Xuân, tỉnh Hà Tĩnh. Ông sinh trưởng trong một gia đình quý tộc phong kiến hiển đạt bậc nhất thời bấy giờ nhưng cuộc đời sớm gặp biến cố loạn lạc. Mười năm gió bụi lưu lạc khắp nẻo đường đất nước và những lần đi sứ sang Trung Quốc đã giúp ông thấu hiểu sâu sắc thân phận của nhân dân lầm than. Năm 1965, Đại thi hào Nguyễn Du được UNESCO vinh danh là Danh nhân văn hóa thế giới.',
    onlineSources: [
      {
        id: 'src-kieu-1',
        sourceName: 'Thư viện Quốc gia Việt Nam (Bản số hóa)',
        url: 'https://nlv.gov.vn/',
        description: 'Bản lưu trữ thư mục văn bản Nôm và bản dịch chữ Quốc ngữ chuẩn mực'
      },
      {
        id: 'src-kieu-2',
        sourceName: 'Kho học liệu số Ngữ văn THPT Quốc gia',
        url: 'https://moet.gov.vn/',
        description: 'Nguyên văn toàn bộ 3254 câu thơ lục bát kèm chú thích từ điển cổ'
      }
    ]
  },
  'chi-pheo': {
    shelfIds: ['shelf-vietnam-classic', 'shelf-truyen-ngan'],
    hashtags: ['#NamCao', '#ChiPheo', '#HienThucPhePhan', '#NguVan11', '#LangVuDai'],
    introduction: '"Chí Phèo" là đỉnh cao của dòng văn học hiện thực phê phán Việt Nam giai đoạn 1930 - 1945. Tác phẩm kể về cuộc đời bi kịch của một đứa trẻ bị bỏ rơi ở lò gạch cũ, lớn lên thành một anh nông dân hiền lành như đất nhưng bị thế lực thống trị làng Vũ Đại đẩy vào tù ngục, biến dạng thành con quỷ dữ rạch mặt ăn vạ. Giá trị sâu sắc nhất của tác phẩm là tiếng kêu cứu xé lòng đòi quyền làm người lương thiện: tình thương mộc mạc và bát cháo hành của Thị Nở đã đánh thức bản tính người trong Chí Phèo. Cái chết bi tráng của Chí Phèo trên ngưỡng cửa trở về làm người lương thiện là bản cáo trạng đanh thép tố cáo chế độ thực dân nửa phong kiến hủy diệt nhân tính.',
    authorBio: 'Nam Cao (1915 - 1951), tên khai sinh là Trần Hữu Tri, quê ở làng Đại Hoàng, huyện Lý Nhân, tỉnh Hà Nam. Ông là cây bút hiện thực xuất sắc bậc nhất của nền văn xuôi Việt Nam thế kỷ XX. Nam Cao có biệt tài phân tích và miêu tả tâm lý nhân vật cực kỳ sắc sảo, ngôn ngữ đối thoại sinh động và giọng văn vừa lạnh lùng, tỉnh táo vừa chứa chan tình yêu thương nhân đạo đối với những con người nghèo khổ, bất hạnh.',
    onlineSources: [
      {
        id: 'src-cp-1',
        sourceName: 'Tủ sách Văn học Hiện thực Việt Nam 1930 - 1945',
        url: 'https://vanhocnghethuat.vn/',
        description: 'Bản in tác phẩm Chí Phèo (Cái lò gạch cũ) đầy đủ trọn vẹn'
      },
      {
        id: 'src-cp-2',
        sourceName: 'Thư viện Tác phẩm Giảng dạy THPT',
        url: 'https://violet.vn/',
        description: 'Văn bản đọc trích đoạn trọng tâm cùng hệ thống câu hỏi hướng dẫn bài học'
      }
    ]
  },
  'lao-hac': {
    shelfIds: ['shelf-vietnam-classic', 'shelf-truyen-ngan'],
    hashtags: ['#NamCao', '#LaoHac', '#CauVang', '#NguVanTHPT', '#TinhPhuTu'],
    introduction: '"Lão Hạc" là một truyện ngắn kiệt xuất của Nam Cao, khắc họa bức tranh chân thực và đầy xót xa về số phận người nông dân nghèo trong nạn đói, sự bần cùng trước Cách mạng tháng Tám. Lão Hạc - một người cha già góa vợ, nghèo đói - chọn bán đi con chó Vàng mà lão yêu quý như con, rồi sau đó chọn cái chết dữ dội bằng bả chó để bảo toàn mảnh vườn và số tiền dành dụm cho đứa con trai đi làm ăn xa. Tác phẩm ngợi ca vẻ đẹp tâm hồn thanh sạch, lòng tự trọng ngời sáng và tình phụ tử thiêng liêng cao cả của người lao động nghèo.',
    authorBio: 'Nam Cao là nhà văn luôn trăn trở về "đôi mắt" nhìn nhận con người: cần phải nhìn xuyên qua bề ngoài tồi tàn, rách rưới để nhận ra hạt ngọc lương thiện ẩn sâu trong tâm hồn người nông dân. "Lão Hạc" cùng với "Chí Phèo", "Đời thừa", "Giăng sáng" khẳng định vị thế trụ cột của Nam Cao trong lịch sử văn học nước nhà.',
    onlineSources: [
      {
        id: 'src-lh-1',
        sourceName: 'Thư viện Sách Điện tử Văn học',
        url: 'https://sachxua.vn/',
        description: 'Bản lưu trữ văn bản Lão Hạc nguyên bản năm 1943'
      }
    ]
  },
  'chu-nguoi-tu-tu': {
    shelfIds: ['shelf-vietnam-classic'],
    hashtags: ['#NguyenTuan', '#ChuNguoiTuTu', '#VangBongMotThoi', '#HuanCao', '#NguVan12'],
    introduction: '"Chữ Người Tử Tù" rút từ tập truyện "Vang bóng một thời" (1940) của nhà văn Nguyễn Tuân. Tác phẩm xây dựng hình tượng Huấn Cao - một người anh hùng văn võ song toàn, một nghệ sĩ tài hoa kiệt xuất với nét chữ vuông vức tươi tắn, đồng thời là một đấng trượng phu uy vũ bất năng khuất. Điểm nhấn chói lọi của truyện là "cảnh tượng xưa nay chưa từng có": cảnh Huấn Cao cho chữ viên quản ngục trong đêm tối chốn buồng giam bẩn thỉu. Tác phẩm khẳng định chân lý bất diệt: Cái Đẹp và Thiên Lương luôn chiến thắng bóng tối, cái tàn bạo không thể dập tắt được ánh sáng nghệ thuật chân chính.',
    authorBio: 'Nguyễn Tuân (1910 - 1987), quê ở làng Mọc, quận Thanh Xuân, Hà Nội. Ông là bậc thầy về nghệ thuật ngôn từ của văn học Việt Nam hiện đại, một nghệ sĩ suốt đời đi tìm cái Đẹp và phụng sự cái Đẹp. Văn Nguyễn Tuân tài hoa, uyên bác, giàu chất điện ảnh, triết lý và sự cầu toàn đến mức nghiêm cẩn trong từng câu chữ.',
    onlineSources: [
      {
        id: 'src-cntt-1',
        sourceName: 'Kho sách Văn nghệ Việt Nam',
        url: 'https://vannghe.org.vn/',
        description: 'Toàn văn tác phẩm và tập truyện Vang bóng một thời'
      }
    ]
  },
  'vo-nhat': {
    shelfIds: ['shelf-vietnam-classic', 'shelf-truyen-ngan'],
    hashtags: ['#KimLan', '#VoNhat', '#NanDoi1945', '#Trang', '#NguVan12'],
    introduction: '"Vợ Nhặt" của nhà văn Kim Lân là một trong những truyện ngắn xuất sắc nhất viết về nạn đói khủng khiếp năm 1945 tại Việt Nam. Giữa ranh giới mong manh của sự sống và cái chết, nhân vật Tràng đã "nhặt" được người vợ chỉ bằng bốn bát bánh đúc và vài câu bông đùa. Tác phẩm gây xúc động mạnh mẽ bởi tinh thần lạc quan, khát vọng sống mãnh liệt, tình yêu thương đùm bọc giữa những con người cùng khổ và niềm tin hướng về tương lai tươi sáng qua hình ảnh lá cờ đỏ sao vàng ở cuối truyện.',
    authorBio: 'Kim Lân (1920 - 2007), tên thật là Nguyễn Văn Tài, quê ở huyện Từ Sơn, tỉnh Bắc Ninh. Ông là cây bút chuyên viết truyện ngắn về làng quê nông thôn Việt Nam với vốn hiểu biết sâu sắc về phong tục tập quán và tâm lý mộc mạc, chất phác của người nông dân.',
    onlineSources: [
      {
        id: 'src-vn-1',
        sourceName: 'Thư viện Văn học Việt Nam Hiện đại',
        url: 'https://vanhocvietnam.edu.vn/',
        description: 'Toàn văn truyện ngắn Vợ Nhặt phục vụ ôn thi THPT Quốc gia'
      }
    ]
  },
  'gio-lanh-dau-mua': {
    shelfIds: ['shelf-vietnam-classic', 'shelf-truyen-ngan'],
    hashtags: ['#ThachLam', '#GioLanhDauMua', '#TuLucVanDoan', '#NheNhang', '#NguVan10'],
    introduction: '"Gió Lạnh Đầu Mùa" là bức tranh phong tục và tình người dịu ngọt, trong trẻo của Thạch Lam. Truyện không có cốt truyện gay cấn mà êm đềm như một bài thơ văn xuôi, kể về hai chị em Sơn và Lan đem chiếc áo bông cũ của người em quá cố cho cái Hiên - cô bé nhà nghèo co ro giữa làn gió lạnh đầu đông. Tác phẩm khơi gợi trong tâm hồn người đọc lòng trắc ẩn ấm áp và vẻ đẹp của sự sẻ chia thuần khiết.',
    authorBio: 'Thạch Lam (1910 - 1942), thành viên chủ chốt của Tự Lực văn đoàn. Phong cách sáng tác của ông hướng vào thế giới nội tâm tinh tế, rung động mong manh trước đời sống thường nhật và quan niệm sâu sắc: "Văn chương là một thứ khí giới thanh cao và đắc lực, vừa giải thoát vừa cứu vớt tâm hồn con người".',
    onlineSources: [
      {
        id: 'src-gldm-1',
        sourceName: 'Tủ sách Tự Lực Văn Đoàn số hóa',
        url: 'https://sachxua.vn/',
        description: 'Văn bản toàn tập tuyển tập Thạch Lam'
      }
    ]
  },
  'hoang-tu-be': {
    shelfIds: ['shelf-world-classic'],
    hashtags: ['#AntoineDeSaintExupery', '#HoangTuBe', '#KinhDienTheGioi', '#TrietLy', '#YeuThuong'],
    introduction: '"Hoàng Tử Bé" (Le Petit Prince) là kiệt tác văn học Pháp nổi tiếng toàn cầu của nhà văn - phi công Antoine de Saint-Exupéry. Cuốn sách như một câu chuyện cổ tích triết học sâu sắc về tình yêu thương, tình bạn, trách nhiệm và cách con người nhìn nhận thế giới: "Người ta chỉ thấy rõ bằng trái tim, điều cốt lõi vô hình trước mắt trần". Một tác phẩm bất hủ làm ấm lòng độc giả ở mọi lứa tuổi.',
    authorBio: 'Antoine de Saint-Exupéry (1900 - 1944) là nhà văn, nhà thơ và phi công tiên phong người Pháp. Các tác phẩm của ông mang đậm chất suy tưởng trữ tình về phẩm giá con người, sự gắn kết nhân loại giữa bầu trời bao la.',
    onlineSources: [
      {
        id: 'src-htb-1',
        sourceName: 'Thư viện Văn học Kinh điển Quốc tế',
        url: 'https://gutenberg.org/',
        description: 'Bản dịch và ấn bản văn học mở của tác phẩm Hoàng Tử Bé'
      }
    ]
  },
  'ong-gia-va-bien-ca': {
    shelfIds: ['shelf-world-classic'],
    hashtags: ['#ErnestHemingway', '#OngGiaVaBienCa', '#NguyenLyTangBangTroi', '#NguVan12'],
    introduction: '"Ông Già Và Biển Cả" (The Old Man and the Sea) đã mang lại cho Hemingway giải Pulitzer (1953) và giải Nobel Văn học (1954). Truyện kể về cuộc chiến đấu kiên cường, đơn độc kéo dài ba ngày đêm của ông lão đánh cá Santiago với con cá kiếm khổng lồ trên dòng nước nhiệt đới. Tác phẩm biểu đạt xuất sắc "nguyên lý tảng băng trôi" và gửi gắm thông điệp bất diệt về ý chí con người: "Con người sinh ra không phải để dành cho thất bại. Con người có thể bị hủy diệt nhưng không thể bị đánh bại".',
    authorBio: 'Ernest Hemingway (1899 - 1961), nhà văn vĩ đại người Mỹ. Ông là người đặt nền móng cho lối viết cô đọng, khúc chiết với nguyên lý tảng băng trôi (bảy phần chìm, một phần nổi) có ảnh hưởng sâu sắc đến nền văn xuôi thế giới hiện đại.',
    onlineSources: [
      {
        id: 'src-og-1',
        sourceName: 'Thư viện Tác phẩm Nobel Văn học',
        url: 'https://nobelprize.org/',
        description: 'Tài liệu và ấn bản tham khảo tác phẩm The Old Man and the Sea'
      }
    ]
  },
  'mat-biec': {
    shelfIds: ['shelf-youth-growth'],
    hashtags: ['#NguyenNhatAnh', '#MatBiec', '#ThanhXuan', '#LangDoDo', '#NganVaHaLan'],
    introduction: '"Mắt Biếc" là cuốn tiểu thuyết được yêu thích bậc nhất của nhà văn Nguyễn Nhật Anh. Câu chuyện tình buồn man mác của Ngạn dành cho cô bạn gái có đôi mắt biếc biếc Hà Lan từ thuở ấu thơ nơi làng Đo Đo cho đến khi trưởng thành. Tác phẩm lay động trái tim hàng triệu bạn trẻ bởi vẻ đẹp thủy chung, hoài niệm thanh xuân trong trẻo và những trăn trở của tuổi mới lớn.',
    authorBio: 'Nguyễn Nhật Ánh (sinh năm 1955), nhà văn chuyên viết cho thiếu nhi và tuổi trẻ Việt Nam với hàng chục tác phẩm best-seller. Văn phong của ông hóm hỉnh, nhẹ nhàng, đượm chút hoài niệm và chan chứa tình cảm yêu thương cuộc đời.',
    onlineSources: [
      {
        id: 'src-mb-1',
        sourceName: 'Tủ sách Thiếu nhi & Thanh thiếu niên Việt Nam',
        url: 'https://nxbkimdong.com.vn/',
        description: 'Trang thông tin giới thiệu và ấn bản tác phẩm của Nguyễn Nhật Ánh'
      }
    ]
  },
  'atomic-habits': {
    shelfIds: ['shelf-youth-growth'],
    hashtags: ['#JamesClear', '#AtomicHabits', '#KyNangSong', '#ThoiQuenNguyenTu', '#PhatTrienBanThan'],
    introduction: '"Atomic Habits" (Thay đổi tí hon, hiệu quả bất ngờ) của James Clear là cuốn sách hướng dẫn phương pháp xây dựng thói quen tốt và từ bỏ thói quen xấu thông qua 4 quy luật cốt lõi: Khiến nó rõ ràng, Khiến nó hấp dẫn, Khiến nó dễ dàng, Khiến nó thỏa mãn. Tác phẩm đặc biệt hữu ích cho học sinh trong việc sắp xếp thời gian tự học, đọc sách mỗi ngày và duy trì sự kiên trì lâu dài.',
    authorBio: 'James Clear là chuyên gia hàng đầu thế giới về thói quen và sự cải thiện bản thân. Các bài viết và cuốn sách của ông đã được dịch sang hơn 50 thứ tiếng và bán ra hàng chục triệu bản trên toàn cầu.',
    onlineSources: [
      {
        id: 'src-ah-1',
        sourceName: 'Kho sách Kỹ năng & Phát triển Tư duy',
        url: 'https://jamesclear.com/',
        description: 'Các bài viết và tóm tắt phương pháp thói quen nguyên tử'
      }
    ]
  }
};

export const enrichBookWithMetadata = (book: Book): Book => {
  const meta = BOOK_METADATA_REGISTRY[book.id];
  
  const defaultShelfId = 
    book.category === 'vietnam-classic' ? 'shelf-vietnam-classic' :
    book.category === 'world-classic' ? 'shelf-world-classic' :
    book.category === 'self-growth' || book.category === 'youth-contemporary' ? 'shelf-youth-growth' :
    'shelf-truyen-ngan';

  const defaultHashtag = `#${book.author.replace(/[\s\W]+/g, '')}`;

  return {
    ...book,
    shelfIds: (book.shelfIds && book.shelfIds.length > 0) 
      ? book.shelfIds 
      : (meta ? meta.shelfIds : [defaultShelfId]),
    hashtags: (book.hashtags && book.hashtags.length > 0)
      ? book.hashtags
      : (meta ? meta.hashtags : [defaultHashtag, `#${book.categoryLabel.replace(/\s+/g, '')}`, '#NgữVănTHPT']),
    introduction: book.introduction || (meta ? meta.introduction : book.description),
    authorBio: book.authorBio || (meta ? meta.authorBio : `Tác giả ${book.author} — một trong những gương mặt tiêu biểu thuộc thời kỳ ${book.era || 'văn học'}. Tác phẩm mang phong cách nghệ thuật độc đáo và tư tưởng sâu sắc.`),
    onlineSources: (book.onlineSources && book.onlineSources.length > 0)
      ? book.onlineSources
      : (meta ? meta.onlineSources : [])
  };
};
