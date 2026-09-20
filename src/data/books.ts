import { Book } from '../types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'truyen-kieu',
    title: 'Truyện Kiều',
    author: 'Nguyễn Du',
    era: 'Văn học Trung đại (Đầu TK XIX)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Kiệt tác thơ Nôm bất hủ của đại thi hào Nguyễn Du, tái hiện bi kịch cuộc đời mười lăm năm lưu lạc của nàng Thúy Kiều tài sắc vẹn toàn, khúc ca nhân đạo sâu sắc về thân phận con người.',
    rating: 4.9,
    reviewCount: 342,
    estimatedReadTimeMinutes: 45,
    curriculumGrade: 'Lớp 11 THPT',
    featured: true,
    coverTheme: {
      bg: '#FAF3E3',
      text: '#4A3423',
      border: '#D9C2A3',
      tagBg: '#F3E4CF',
      illustrationType: 'calligraphy'
    },
    chapters: [
      {
        id: 'kieu-1',
        title: 'Mở đầu & Bức họa Chị Em Thúy Kiều',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Trăm năm trong cõi người ta,
Chữ tài chữ mệnh khéo là ghét nhau.
Trải qua một cuộc bể dâu,
Những điều trông thấy mà đau đớn lòng.
Lạ gì bỉ sắc tư phong,
Trời xanh quen thói má hồng đánh ghen.

Đầu lòng hai ả tố nga,
Thúy Kiều là chị, em là Thúy Vân.
Mai cốt cách, tuyết tinh thần,
Mỗi người một vẻ, mười phân vẹn mười.
Vân xem trang trọng khác vời,
Khuôn trăng đầy đặn, nét ngài nở nang.
Hoa cười ngọc thốt đoan trang,
Mây thua nước tóc, tuyết nhường màu da.

Kiều càng sắc sảo mặn mà,
So bề tài sắc lại là phần hơn.
Làn thu thủy, nét xuân sơn,
Hoa ghen thua thắm, liễu hờn kém xanh.
Một hai nghiêng nước nghiêng thành,
Sắc đành đòi một, tài đành họa hai.
Thông minh vốn sẵn tính trời,
Pha nghề thi họa đủ mùi ca ngâm.
Cung thương lầu bậc ngũ âm,
Nghề riêng ăn đứt hồ cầm một trương.
Khúc nhà tay lựa nên chương,
Một thiên Bạc mệnh lại càng não nhân.`
      },
      {
        id: 'kieu-2',
        title: 'Cảnh Ngày Xuân & Cuộc Gặp Kim Trọng',
        order: 2,
        audioTimeEstimate: '6 phút đọc',
        content: `Ngày xuân con én đưa thoi,
Thiều quang chín chục đã ngoài sáu mươi.
Cỏ non xanh tận chân trời,
Cành lê trắng điểm một vài bông hoa.
Thanh minh trong tiết tháng ba,
Lễ là tảo mộ, hội là đạp thanh.
Gần xa nô nức yến anh,
Chị em sắm sửa bộ hành chơi xuân.
Dập dìu tài tử giai nhân,
Ngựa xe như nước áo quần như nêm.

Bóng tà như giục cơn buồn,
Khách đà xế bóng người toan về rồi.
Chị em thơ thẩn dan tay,
Bước dần theo ngọn tiểu khê lần tìm.
Sè sè nấm đất bên đường,
Dàu dàu ngọn cỏ nửa vàng nửa xanh...
Hỏi ra mới biết nàng Đạm Tiên xưa,
Tài sắc một thời nay vùi trong nấm mộ hoang liêu.

Trông chừng thấy một văn nhân,
Lưng túi gió trăng, gót bồng rực rỡ.
Đề huề lưng túi gió trăng,
Sau lưng theo một vài thằng con con.
Tuyết in sắc ngựa biên cương,
Cỏ pha màu áo nhuộm đường thanh tao.
Người đâu gặp gỡ làm chi,
Trăm năm biết có duyên gì hay không?`
      },
      {
        id: 'kieu-3',
        title: 'Kiều ở Lầu Ngưng Bích — Nỗi Lòng Tha Hương',
        order: 3,
        audioTimeEstimate: '7 phút đọc',
        content: `Trước lầu Ngưng Bích khóa xuân,
Vẻ non xa tấm trăng gần ở chung.
Cát vàng cồn nọ bụi hồng dặm kia.
Bẽ bàng mây sớm đèn khuya,
Nửa tình nửa cảnh như chia tấm lòng.

Tưởng người dưới nguyệt chén đồng,
Tin sương luống những rày trông mai chờ.
Bên trời góc bể bơ vơ,
Tấm son gột rửa bao giờ cho phai.
Xót người tựa cửa hôm mai,
Quạt nồng ấp lạnh những ai đó giờ?
Sân Lai cách mấy nắng mưa,
Có khi gốc tử đã vừa người ôm.

Buồn trông cửa bể chiều hôm,
Thuyền ai thấp thoáng cánh buồm xa xa?
Buồn trông ngọn nước mới sa,
Hoa trôi man mác biết là về đâu?
Buồn trông nội cỏ rầu rầu,
Chân mây mặt đất một màu xanh xanh.
Buồn trông gió cuốn mặt duềnh,
Ầm ầm tiếng sóng kêu quanh ghế ngồi.`
      }
    ]
  },
  {
    id: 'chi-pheo',
    title: 'Chí Phèo',
    author: 'Nam Cao',
    era: 'Văn học Hiện thực (1941)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Bức tranh hiện thực khốc liệt về làng Vũ Đại trước Cách mạng, tiếng kêu xé lòng đòi quyền làm người lương thiện của người nông dân cùng quẫn bị tha hóa.',
    rating: 4.9,
    reviewCount: 298,
    estimatedReadTimeMinutes: 40,
    curriculumGrade: 'Lớp 11 THPT',
    featured: true,
    coverTheme: {
      bg: '#F5EFE6',
      text: '#423122',
      border: '#DACABE',
      tagBg: '#EDE2D4',
      illustrationType: 'lantern'
    },
    chapters: [
      {
        id: 'cp-1',
        title: 'Tiếng Chửi Bắt Đầu Buổi Chiều',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Hắn vừa đi vừa chửi. Bao giờ cũng thế, cứ rượu xong là hắn chửi. Bắt đầu chửi trời. Có hề gì? Trời có của riêng nhà nào? Rồi hắn chửi đời. Thế cũng chẳng sao: đời là tất cả nhưng chẳng là ai. Rồi hắn chửi ngay cả làng Vũ Đại. Nhưng cả làng Vũ Đại ai cũng nhủ: "Chắc nó trừ mình ra!". Không ai lên tiếng cả. Tức thật! Ừ! Nó chửi đứa nào đẻ ra thân hắn, đẻ ra cái thằng Chí Phèo? Nhưng mà biết đứa nào đã đẻ ra Chí Phèo? Có trời mà biết! Hắn không biết, cả làng Vũ Đại cũng không ai biết.

Một anh đi thả ống lươn, một buổi sáng tinh sương đã thấy hắn trần truồng và xám ngắt trong một váy đụp để bên một cái lò gạch cũ bỏ không, anh rước lấy và đem cho một bác phó cối không con. Bác phó cối này chết, hắn lại bơ vơ, hết đi làm cho nhà này lại sang làm cho nhà nọ. Đến năm hai mươi tuổi, hắn làm canh điền cho nhà lý Kiến, bây giờ là cụ bá Kiến, ăn trên ngồi trốc.`
      },
      {
        id: 'cp-2',
        title: 'Bát Cháo Hành & Khát Khao Lương Thiện',
        order: 2,
        audioTimeEstimate: '6 phút đọc',
        content: `Hắn tỉnh dậy thấy hắn già mà vẫn còn cô độc. Buồn thay cho đời! Có lý nào như thế được? Hắn đã đến cái dốc bên kia của đời. Ở những người tới cái dốc bên kia, thường hay ngắm lại dốc bên này... Hắn nhớ lại một thời, hắn cũng từng mơ ước có một gia đình nho nhỏ. Chồng cuốc mướn cày thuê, vợ dệt vải. Chúng lại bỏ một con lợn nuôi để làm vốn liếng. Khá giả thì mua dăm ba sào ruộng làm...

Thị Nở vào, tay bưng một cái nồi chõng chơ, bốc khói nghi ngút.
- Thầy em xực bát cháo hành này cho nó nhẹ người.
Chí Phèo ngạc nhiên nhìn thị. Hắn thấy mắt mình hình như ươn ướt. Bởi vì lần này là lần đầu tiên hắn được một người đàn bà cho. Xưa nay, muốn ăn cái gì, hắn phải dọa nạt, cướp giật. Bát cháo hành của Thị Nở bốc khói thơm ngát. Hương hành thoang thoảng làm hắn tỉnh ngộ. Trời ơi, hắn thèm lương thiện, hắn muốn làm hòa với mọi người biết bao! Thị Nở sẽ mở đường cho hắn. Mọi người sẽ lại nhận hắn vào cái xã hội bằng phẳng, thân thiện của những người lương thiện...`
      },
      {
        id: 'cp-3',
        title: 'Ai Cho Tao Lương Thiện?',
        order: 3,
        audioTimeEstimate: '6 phút đọc',
        content: `Bà cô thị Nở xỉa xói vào mặt thị: "Đã nhịn được đến ngần này tuổi thì nhịn hẳn; ai lại đi lấy một thằng không cha không mẹ, chỉ có một nghề là rạch mặt ăn vạ!". Thị trút tất cả những lời ấy vào mặt Chí Phèo. Chí Phèo ngẩn người ra. Hắn đuổi theo nắm lấy tay thị, nhưng thị gạt phắt đi.

Hắn lại uống. Uống thật nhiều. Nhưng càng uống lại càng tỉnh ra. Hắn không đến nhà thị Nở, đôi chân hắn lại quen dẫn hắn đến nhà Bá Kiến.
Cụ Bá Kiến nhìn thấy hắn với đôi mắt đỏ ngầu, tay lăm lăm con dao nhỏ:
- Chí Phèo đấy hở? Lại say rồi phải không? Muốn xin tiền hay xin rượu?
- Tao không đến đây để xin tiền! — Chí Phèo thét lên.
- Thế mày muốn gì?
- Tao muốn làm người lương thiện!
Bá Kiến cười nhạt:
- Ồ tưởng gì, tôi vẫn bảo anh làm người lương thiện kia mà.
- Không được! Ai cho tao lương thiện? Làm sao cho mất được những vết mảnh chai trên mặt này? Tao không thể là người lương thiện nữa rồi! Chỉ có một cách... biết không!... Chỉ có một cách là... cái này!
Chí Phèo vung dao xông tới. Máu tươi trào ra. Cả làng Vũ Đại xôn xao kinh hoàng...`
      }
    ]
  },
  {
    id: 'lao-hac',
    title: 'Lão Hạc',
    author: 'Nam Cao',
    era: 'Văn học Hiện thực (1943)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Truyện ngắn cảm động rớt nước mắt về nhân cách cao thượng, tấm lòng yêu thương con vô bờ bến và cái chết đau đớn bảo toàn phẩm giá của người nông dân già nghèo khó.',
    rating: 4.9,
    reviewCount: 275,
    estimatedReadTimeMinutes: 30,
    curriculumGrade: 'Ngữ văn THPT',
    featured: true,
    coverTheme: {
      bg: '#FDF7E7',
      text: '#45321E',
      border: '#DFCCA9',
      tagBg: '#F3E5C8',
      illustrationType: 'quill'
    },
    chapters: [
      {
        id: 'lh-1',
        title: 'Cậu Vàng Đi Đời Rồi, Ông Giáo Ạ!',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Lão Hạc sang nhà tôi. Vừa ngồi xuống mép giường, lão đã bảo tôi:
- Cậu Vàng đi đời rồi, ông giáo ạ!
- Bắt rồi?
- Khốn nạn... Bắt rồi! Cho nó ăn cơm xong, thằng Mục với thằng Xiên núp sau bụi rào, bất thình lình quăng cái lưới chụp lấy... Thế là xong đời!

Mặt lão đột nhiên co rúm lại. Những vết nhăn xô lại với nhau, ép cho nước mắt chảy ra. Cái đầu lão ngoẹo về một bên và cái miệng móm mém của lão mếu máo như con nít. Lão hu hu khóc...
- Khốn nạn... Ông giáo ơi! Nó có biết gì đâu! Nó thấy tôi gọi thì ngoáy đuôi mừng rối rít. Tôi cho nó ăn cơm trong cái bát tây tử tế, rồi người ta bắt nó... Nó cứ nhìn tôi như muốn bảo: "A! Lão già tệ lắm! Tôi ăn ở với lão như thế mà lão xử với tôi như thế này à?". Tôi già ngần này tuổi đầu rồi mà còn đánh lừa một con chó, ông giáo ạ!`
      },
      {
        id: 'lh-2',
        title: 'Gửi Gắm Đất Đai & Tấm Lòng Người Cha',
        order: 2,
        audioTimeEstimate: '5 phút đọc',
        content: `Lão tính kỹ lắm. Lão bán con chó được năm đồng bạc với số tiền dành dụm là ba mươi đồng, đem gửi tôi tất cả. Lão bảo:
- Tôi gửi ông giáo giữ hộ. Bao giờ thằng con tôi về đồn điền cao su thì ông giáo trao tận tay cho nó. Còn mảnh vườn này, tôi cũng nhờ ông giáo trông nom, chớ để ai lấn chiếm. Tôi chết đi, đừng đụng đến một sào đất nào của nó, để nó có cái mà cày cấy, sinh nhai.

Tôi ngậm ngùi nhận lời. Con người nghèo khổ ấy chắt chiu từng củ khoai, mớ rau má để sống lay lắt qua ngày, dứt khoát không chịu tiêu vào một đồng tiền nào của con trai. Lòng tự trọng và tình phụ tử thiêng liêng sáng ngời trong manh áo rách tả tơi.`
      }
    ]
  },
  {
    id: 'chu-nguoi-tu-tu',
    title: 'Chữ Người Tử Tù',
    author: 'Nguyễn Tuân',
    era: 'Vang Bóng Một Thời (1940)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Cảnh tượng xưa nay chưa từng có: cái đẹp, thiên lương và khí phách tỏa sáng rực rỡ ngay chốn ngục tù tăm tối, bẩn thỉu.',
    rating: 4.8,
    reviewCount: 220,
    estimatedReadTimeMinutes: 35,
    curriculumGrade: 'Lớp 11 THPT',
    featured: true,
    coverTheme: {
      bg: '#F6EEDB',
      text: '#3D2A18',
      border: '#D2BE9B',
      tagBg: '#EFE1C5',
      illustrationType: 'calligraphy'
    },
    chapters: [
      {
        id: 'cntt-1',
        title: 'Huấn Cao Vào Ngục & Tấm Lòng Quản Ngục',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Huấn Cao! Người mà vùng tỉnh Sơn vẫn thường khen là người có tài viết chữ rất nhanh và rất đẹp. Chữ ông Huấn Cao đẹp lắm, vuông vắn lắm. Có được chữ ông Huấn mà treo trong nhà là một vật báu trên đời. Nhưng ông lại cầm đầu cuộc khởi nghĩa chống lại triều đình, nay bị bắt giam chờ ngày ra pháp trường xử tử.

Viên quản ngục và thầy thơ lại nhìn tên tử tù đứng đầu bảng khẽ thì thầm. Quản ngục vốn là người yêu cái đẹp, trọng thiên lương. Trong chốn ngục tù đầy rẫy bất lương và lừa lọc, tấm lòng biệt nhỡn liên tài của quản ngục như đóa sen nở giữa đầm lầy lội.`
      },
      {
        id: 'cntt-2',
        title: 'Cảnh Cho Chữ Xưa Nay Chưa Từng Có',
        order: 2,
        audioTimeEstimate: '6 phút đọc',
        content: `Đêm hôm ấy, lúc trại giam tỉnh Sơn chỉ còn vẳng lại tiếng mõ cầm canh, trong một buồng giam tối tăm, chật hẹp, ẩm ướt, tường đầy mạng nhện, đất bừa bãi phân chuột, phân gián... Một cảnh tượng xưa nay chưa từng có đã bày ra.

Đêm nay, một ngọn đuốc tẩm dầu tỏa khói nghi ngút, ánh sáng đỏ rực rọi lên ba mái đầu đang chụm lại. Một người tù cổ đeo gông, chân vướng xiềng, đang dậm tô nét chữ trên tấm lụa bạch trắng tinh căng phẳng trên mảnh ván. Người tù uy nghi, đĩnh đạc; viên quản ngục khúm núm; thầy thơ lại run run bưng chậu mực.

Mùi mực thơm ngào ngạt bốc lên, át đi mùi xú uế của nhà lao. Huấn Cao đỡ viên quản ngục đứng dậy và đĩnh đạc khuyên:
- Ở đây lẫn lộn. Ta khuyên thầy Quản nên thay chốn ở đi. Chỗ này không phải là nơi để treo một dải lụa trắng với những nét chữ vuông vắn tươi tắn nói lên những cái hoài bão tung hoành của một đời con người. Thầy hãy thoát khỏi cái nghề này đi đã, rồi hãy nghĩ đến chuyện chơi chữ. Ở đây, khó giữ thiên lương cho lành vững và rồi cũng đến nhem nhuốc mất cái đời lương thiện đi.

Ngục quan cảm động, vái người tù một vái, chắp tay nói một câu mà dòng nước mắt rỉ vào kẽ miệng làm cho nghẹn ngào:
- Kẻ mê muội này xin bái lĩnh!`
      }
    ]
  },
  {
    id: 'gio-lanh-dau-mua',
    title: 'Gió Lạnh Đầu Mùa',
    author: 'Thạch Lam',
    era: 'Tự Lực Văn Đoàn (1937)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Truyện ngắn ấm áp tình người như tia nắng dịu dàng giữa mùa đông giá rét, bài học nhân ái sơ khai mà sâu thẳm của trẻ thơ.',
    rating: 4.8,
    reviewCount: 190,
    estimatedReadTimeMinutes: 25,
    curriculumGrade: 'Văn học Trung học',
    featured: false,
    coverTheme: {
      bg: '#F8F3EA',
      text: '#3F2D1C',
      border: '#D7C7B3',
      tagBg: '#ECE1D0',
      illustrationType: 'lotus'
    },
    chapters: [
      {
        id: 'gldm-1',
        title: 'Cơn Gió Bấc & Chiếc Áo Bông Cho Bé Hiên',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `Buổi sáng thức dậy, Sơn thấy đất trời đổi khác. Gió bấc vi vu thổi qua khe cửa, bầu trời xám xịt và se lạnh. Mẹ Sơn mở hòm lấy ra những chiếc áo len, áo dạ ấm áp cho hai chị em.

Sơn và chị Lan tung tăng chạy ra chợ chơi cùng lũ trẻ nghèo trong xóm. Chúng đứng co ro, túm tụm quanh góc chợ, môi tím ngắt vì rét. Sơn nhìn thấy bé Hiên, con bé hàng xóm nghèo xơ xác, chỉ mặc manh áo rách tả tơi, hở cả lưng và tay run rẩy từng cơn.

Một ý nghĩ ấm áp chợt lóe lên trong đầu Sơn. Sơn thì thầm với chị Lan:
- Hay là chị em mình đem chiếc áo bông cũ của em Duyên cho con bé Hiên mặc đi?
Lan mừng rỡ đồng ý. Hai chị em hớn hở chạy về nhà lấy áo mang cho Hiên. Nhìn nụ cười bừng sáng trên khuôn mặt tím tái của cô bé nghèo, lòng Sơn ấm áp lạ thường, tựa như có ngọn lửa nhỏ sưởi ấm giữa ngọn gió lạnh đầu mùa.`
      }
    ]
  },
  {
    id: 'nguoi-con-gai-nam-xuong',
    title: 'Chuyện Người Con Gái Nam Xương',
    author: 'Nguyễn Dữ',
    era: 'Truyền Kỳ Mạn Lục (TK XVI)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Bi kịch oan khuất của nàng Vũ Nương nết na thùy mị dưới xã hội nam quyền phong kiến, khúc trần tình xót xa bên dòng sông Hoàng Giang.',
    rating: 4.7,
    reviewCount: 215,
    estimatedReadTimeMinutes: 30,
    curriculumGrade: 'Ngữ văn Lớp 9 & THPT',
    featured: false,
    coverTheme: {
      bg: '#FAF4E8',
      text: '#44311F',
      border: '#DAC7AB',
      tagBg: '#EDE0C9',
      illustrationType: 'moon'
    },
    chapters: [
      {
        id: 'ncgnx-1',
        title: 'Bóng Chàng Trên Vách & Bi Kịch Nghi Ngờ',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Vũ Thị Thiết, người con gái quê ở Nam Xương, tính tình thùy mị nết na, lại thêm tư dung tốt đẹp. Chàng Trương Sinh vì mến dung hạnh bèn xin mẹ đem trăm lạng vàng cưới về làm vợ. Chưa được bao lâu thì Trương Sinh phải đi lính thú nơi biên ải.

Ở nhà, Vũ Nương một mình sinh con, chăm sóc mẹ già đau yếu tận tụy như cha mẹ đẻ. Mẹ chồng mất, nàng lo liệu ma chay chu tất. Đêm đêm một mình bên ngọn đèn khuya, đứa con thơ khóc đòi cha, nàng bèn chỉ cái bóng của mình trên vách mà dỗ con: "Cha Đản đây này!".

Nào ngờ chiến tranh kết thúc, Trương Sinh trở về. Lời thơ ngây của con trẻ: "Trước đây có một người đàn ông đêm nào cũng đến..." khơi bùng cơn ghen tuông mù quáng trong lòng Trương Sinh. Mọi lời giải thích minh oan đều bất lực trước thói vũ phu, độc đoán của người chồng phong kiến.`
      }
    ]
  },
  {
    id: 'dat-rung-phuong-nam',
    title: 'Đất Rừng Phương Nam',
    author: 'Đoàn Giỏi',
    era: 'Văn học Hiện đại (1957)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Bản trường ca hùng vĩ, phóng khoáng về thiên nhiên và con người Nam Bộ qua hành trình lưu lạc của cậu bé An cùng tía má nuôi và thằng Cò.',
    rating: 4.9,
    reviewCount: 310,
    estimatedReadTimeMinutes: 50,
    curriculumGrade: 'Văn học THPT',
    featured: true,
    coverTheme: {
      bg: '#F5F3E8',
      text: '#3B301F',
      border: '#D3C9A8',
      tagBg: '#E9E4C9',
      illustrationType: 'mountain'
    },
    chapters: [
      {
        id: 'drpn-1',
        title: 'Đi Lấy Mật Trong Rừng U Minh',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `Buổi sáng sớm trong rừng tràm U Minh thật kỳ ảo. Nắng sớm lọt qua kẽ lá rọi xuống mặt bùn những đốm sáng lung linh như vảy cá. Gió thoang thoảng mùi hương hoa tràm ngọt ngào thanh khiết. Tía nuôi tôi dẫn đầu, vai mang gùi, tay cầm rựa phạt những cành cây chắn lối. Cò thoăn thoắt theo sau, vừa đi vừa chỉ cho tôi xem những tổ ong ruồi, chim chích rừng hót vang.

Tiếng ong bay rì rào như một dàn nhạc vĩ cầm bất tận. Kỹ nghệ gác kèo ong của người dân đất phương Nam không sách vở nào chép xiết, thấm đẫm tình yêu đất rừng hoang sơ hào phóng.`
      }
    ]
  },
  {
    id: 'so-do',
    title: 'Số Đỏ',
    author: 'Vũ Trọng Phụng',
    era: 'Văn học Hiện thực (1936)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Kiệt tác trào phúng đỉnh cao của văn học Việt Nam, lột trần bộ mặt giả dối, lố lăng của xã hội thượng lưu Âu hóa nửa mùa thời Pháp thuộc.',
    rating: 4.9,
    reviewCount: 380,
    estimatedReadTimeMinutes: 45,
    curriculumGrade: 'Lớp 11 THPT',
    featured: true,
    coverTheme: {
      bg: '#FBF5EB',
      text: '#483424',
      border: '#DECDB6',
      tagBg: '#EFE2CE',
      illustrationType: 'quill'
    },
    chapters: [
      {
        id: 'sd-1',
        title: 'Hạnh Phúc Của Một Tang Gia',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `Ba hôm sau, ông cụ già chết thật. Cái chết của ông cụ đã làm cho cả đại gia đình ấy nhảy chồm chồm lên vì sung sướng. Cái chúc thư kia thế là từ nay bắt đầu vào thời kỳ thực hành, chứ không còn là lý thuyết viển vông nữa!

Bọn con cháu chí hiếu ai nấy đều hân hoan chuẩn bị một đám tang to tát để khoe khoang với bàn dân thiên hạ. Cụ Cố Hồng nhắm nghiền mắt lại để mơ màng đến cái lúc cụ mặc đồ xô gai, lụ khụ chống gậy vừa ho vừa khạc để thiên hạ phải trầm trồ: "Kìa, con giai nhớn đã già đến thế kia kìa!".

Đám ma đưa đi to tát lộng lẫy, có kiệu bát cống, lợn quay, kèn ta, kèn Tây, kèn Tàu thi nhau thổi rầm rĩ. Người đi đưa thì chen chúc tán tỉnh nhau, hẹn hò nhau, bình phẩm áo quần tân thời... Một tấn bi hài kịch cười ra nước mắt của thời đại Âu hóa dởm.`
      }
    ]
  },
  {
    id: 'de-men-phieu-luu-ky',
    title: 'Dế Mèn Phiêu Lưu Ký',
    author: 'Tô Hoài',
    era: 'Văn học Hiện đại (1941)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Tác phẩm văn học thiếu nhi kinh điển nhất Việt Nam, bài học về sự trưởng thành, lòng dũng cảm và khát vọng hòa bình muôn loài.',
    rating: 4.9,
    reviewCount: 420,
    estimatedReadTimeMinutes: 35,
    curriculumGrade: 'Văn học Thiếu nhi & THPT',
    featured: true,
    coverTheme: {
      bg: '#F5F6EB',
      text: '#343B21',
      border: '#CBD4A7',
      tagBg: '#E6ECCB',
      illustrationType: 'lotus'
    },
    chapters: [
      {
        id: 'dm-1',
        title: 'Bài Học Đường Đời Đầu Tiên',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Tôi sống độc lập từ thuở bé. Ấy là tục lệ lâu đời trong họ dế chúng tôi... Tôi ăn uống điều độ và làm việc có chừng mực nên tôi chóng lớn lắm. Chẳng bao lâu tôi đã trở thành một chàng dế thanh niên cường tráng. Đôi càng tôi mẫm bóng. Những cái vuốt ở chân, ở khoeo cứ cứng dần và nhọn hoắt.

Nhưng tính tôi kiêu căng, xốc nổi. Tôi trêu chị Cốc, để rồi tai họa giáng xuống đầu chú Dế Choắt ốm yếu tội nghiệp. Giây phút Dế Choắt trút hơi thở cuối cùng, bài học đường đời đầu tiên đã khắc sâu vào tâm khảm tôi bằng máu và nước mắt hối hận.`
      }
    ]
  },
  {
    id: 'mat-biec',
    title: 'Mắt Biếc',
    author: 'Nguyễn Nhật Ánh',
    era: 'Văn học Đương đại (1990)',
    category: 'youth-contemporary',
    categoryLabel: 'Văn học Đương đại',
    description: 'Bản tình ca da diết, trong trẻo và đượm buồn của làng Đo Đo, về mối tình câm lặng chung thủy của Ngạn dành cho đôi mắt biếc của Hà Lan.',
    rating: 4.8,
    reviewCount: 512,
    estimatedReadTimeMinutes: 40,
    curriculumGrade: 'Đọc mở rộng THPT',
    featured: true,
    coverTheme: {
      bg: '#FAF4EF',
      text: '#402D27',
      border: '#DCC5BD',
      tagBg: '#EFE0D9',
      illustrationType: 'lantern'
    },
    chapters: [
      {
        id: 'mb-1',
        title: 'Khu Rừng Sim & Đôi Mắt Biếc Thuở Ấu Thơ',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `Hồi nhỏ, tôi và Hà Lan thường rủ nhau lên đồi sim chơi. Mùa sim chín, trái mọng tím ngát cả triền đồi. Tôi hái cho Hà Lan những trái sim ngọt lịm nhất, nhìn đôi môi em nhuộm tím màu sim và đôi mắt em trong veo như dòng suối nhỏ của làng Đo Đo.

Đôi mắt biếc ấy đã theo tôi suốt những năm tháng ấu thơ, qua những ngày đi học ở phố thị ồn ào và mãi mãi trở thành vết khắc khôn nguôi trong trái tim của một kẻ suốt đời đứng sau hạnh phúc của người khác.`
      }
    ]
  },
  {
    id: 'toi-thay-hoa-vang-tren-co-xanh',
    title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
    author: 'Nguyễn Nhật Ánh',
    era: 'Văn học Đương đại (2010)',
    category: 'youth-contemporary',
    categoryLabel: 'Văn học Đương đại',
    description: 'Chuyến tàu chở tuổi thơ về miền ký ức êm đềm bên đồng cỏ, nơi có tình anh em trong sáng, những đốm lửa ma trơi và mối tình đầu e ấp.',
    rating: 4.9,
    reviewCount: 430,
    estimatedReadTimeMinutes: 35,
    curriculumGrade: 'Đọc mở rộng THPT',
    featured: false,
    coverTheme: {
      bg: '#F8F6E8',
      text: '#3D381E',
      border: '#D9D3A8',
      tagBg: '#EDE7C5',
      illustrationType: 'lotus'
    },
    chapters: [
      {
        id: 'hv-1',
        title: 'Anh Em Thiều & Tường Dưới Mái Nhà Quê',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Thằng Tường em tôi có một tâm hồn hiền hậu lạ lùng. Nó thương con cóc, con dế, chăm sóc con cào cào như bạn thân. Có những buổi trưa hè oi ả, hai anh em nằm dưới bóng râm gốc mít, lắng nghe tiếng ve râm ran và ngắm những đóa hoa vàng nhỏ li ti nở bừng trên thảm cỏ xanh mướt mát.`
      }
    ]
  },
  {
    id: 'hoang-tu-be',
    title: 'Hoàng Tử Bé',
    author: 'Antoine de Saint-Exupéry',
    era: 'Văn học Pháp (1943)',
    category: 'world-classic',
    categoryLabel: 'Văn học Nước ngoài',
    description: 'Cuốn sách triết lý giàu chất thơ về tình yêu, trách nhiệm và cách nhìn thế giới bằng trái tim, bởi "điều cốt lõi thì vô hình trong mắt trần".',
    rating: 4.9,
    reviewCount: 650,
    estimatedReadTimeMinutes: 40,
    curriculumGrade: 'Văn học Kinh điển Thế giới',
    featured: true,
    coverTheme: {
      bg: '#FAF5EC',
      text: '#3E3424',
      border: '#D9CBB2',
      tagBg: '#EFE3CE',
      illustrationType: 'moon'
    },
    chapters: [
      {
        id: 'htb-1',
        title: 'Tiểu Tinh Cầu B612 & Bông Hồng Duy Nhất',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `— Nếu bạn thuần hóa tôi, chúng ta sẽ cần đến nhau. Với tôi, bạn sẽ là duy nhất trên đời. Với bạn, tôi cũng sẽ là duy nhất trên đời...
Con cáo nhìn Hoàng tử bé thật lâu rồi nói khẽ:
— Đây là bí mật của tôi. Nó rất đơn giản: Người ta chỉ có thể nhìn thấy rõ ràng bằng trái tim. Những điều cốt lõi thì vô hình trong mắt trần.
Chính thời gian bạn đã dành cho bông hồng của bạn mới làm cho bông hồng của bạn trở nên quan trọng đến thế.`
      }
    ]
  },
  {
    id: 'kieu-hanh-va-dinh-kien',
    title: 'Kiêu Hãnh và Định Kiến',
    author: 'Jane Austen',
    era: 'Văn học Anh (1813)',
    category: 'world-classic',
    categoryLabel: 'Văn học Nước ngoài',
    description: 'Kiệt tác văn chương nước Anh về tình yêu, địa vị xã hội, sự thấu hiểu và cách con người vượt qua định kiến cá nhân để tìm thấy tri kỷ đích thực.',
    rating: 4.8,
    reviewCount: 389,
    estimatedReadTimeMinutes: 60,
    curriculumGrade: 'Văn học Kinh điển Thế giới',
    featured: false,
    coverTheme: {
      bg: '#F7F3E9',
      text: '#3A2E20',
      border: '#D2C3AA',
      tagBg: '#E9DDD0',
      illustrationType: 'quill'
    },
    chapters: [
      {
        id: 'kh-1',
        title: 'Buổi Dạ Vũ & Ấn Tượng Ban Đầu',
        order: 1,
        audioTimeEstimate: '7 phút đọc',
        content: `Một sự thật được thừa nhận rộng rãi là một người đàn ông độc thân giàu có ắt hẳn phải cần một người vợ... Tại buổi dạ vũ ở Meryton, ngài Darcy kiêu hãnh và lạnh lùng đã từ chối khiêu vũ cùng Elizabeth Bennet, châm ngòi cho một chuỗi những hiểu lầm và định kiến sâu sắc nhưng cũng mở đầu cho mối duyên kỳ diệu.`
      }
    ]
  },
  {
    id: 'ong-gia-va-bien-ca',
    title: 'Ông Già và Biển Cả',
    author: 'Ernest Hemingway',
    era: 'Văn học Mỹ (1952)',
    category: 'world-classic',
    categoryLabel: 'Văn học Nước ngoài',
    description: 'Nguyên lý tảng băng trôi huyền thoại: con người sinh ra không phải để dành cho thất bại, con người có thể bị hủy diệt nhưng không thể bị đánh bại.',
    rating: 4.8,
    reviewCount: 340,
    estimatedReadTimeMinutes: 35,
    curriculumGrade: 'Lớp 12 THPT',
    featured: true,
    coverTheme: {
      bg: '#F2F6F7',
      text: '#223841',
      border: '#B3C8CF',
      tagBg: '#D8E5E8',
      illustrationType: 'waves'
    },
    chapters: [
      {
        id: 'og-1',
        title: 'Cuộc Chiến Với Con Cá Kiếm Khổng Lồ',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `Tám mươi tư ngày lão Santiago lênh đênh trên biển mà không bắt được một mống cá nào. Đến ngày thứ tám mươi lăm, lão dong thuyền ra khơi xa, xa hơn bất kỳ ngư dân nào trong làng. Và rồi, sợi dây câu chùng xuống rồi căng như dây đàn vĩ cầm.

Con cá kiếm khổng lồ quẫy mình trồi lên mặt nước, lấp lánh màu tím bạc dưới ánh mặt trời rực rỡ. Bàn tay lão rướm máu vì dây cứa, lưng lão mỏi nhừ, nhưng ánh mắt lão sáng quắc kiên cường: "Con người không được tạo ra để dành cho thất bại. Con người có thể bị tiêu diệt chứ không thể bị đánh bại!".`
      }
    ]
  },
  {
    id: 'sherlock-holmes',
    title: 'Sherlock Holmes: Chiếc Nhẫn Tình Cờ',
    author: 'Arthur Conan Doyle',
    era: 'Văn học Trinh thám Anh (1887)',
    category: 'world-classic',
    categoryLabel: 'Văn học Nước ngoài',
    description: 'Vụ án đầu tiên ghi dấu cuộc gặp gỡ định mệnh giữa vị thám tử đại tài Sherlock Holmes và bác sĩ Watson tại căn phòng số 221B phố Baker.',
    rating: 4.8,
    reviewCount: 450,
    estimatedReadTimeMinutes: 45,
    curriculumGrade: 'Văn học Trinh thám',
    featured: false,
    coverTheme: {
      bg: '#F7F4EE',
      text: '#3A3226',
      border: '#D0C6B5',
      tagBg: '#EAE1D3',
      illustrationType: 'lantern'
    },
    chapters: [
      {
        id: 'sh-1',
        title: 'Căn Nhà Bỏ Hoang & Dòng Chữ Màu Máu',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `Một căn nhà hoang tăm tối trên đường Brixton. Thi thể một người đàn ông ngoại quốc nằm bất động không một vết thương hở, nhưng trên bức tường bong tróc lại hiện rõ một chữ viết bằng máu tươi: "RACHE". Phương pháp suy luận logic suy lý phi thường của Holmes bắt đầu được thi triển.`
      }
    ]
  },
  {
    id: 'nhung-nguoi-khon-kho',
    title: 'Những Người Khốn Khổ',
    author: 'Victor Hugo',
    era: 'Văn học Lãng mạn Pháp (1862)',
    category: 'world-classic',
    categoryLabel: 'Văn học Nước ngoài',
    description: 'Tượng đài nhân đạo vĩ đại của nhân loại về tình yêu thương, sự cứu rỗi linh hồn của Jean Valjean và niềm tin bất diệt vào công lý.',
    rating: 4.9,
    reviewCount: 395,
    estimatedReadTimeMinutes: 60,
    curriculumGrade: 'Lớp 11 & 12 THPT',
    featured: true,
    coverTheme: {
      bg: '#FAF4E8',
      text: '#3F2F1E',
      border: '#D8C3A5',
      tagBg: '#EEE0CB',
      illustrationType: 'lantern'
    },
    chapters: [
      {
        id: 'nnkk-1',
        title: 'Hai Cây Chân Nến Bạc & Sự Cứu Rỗi',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `Mười chín năm tù khổ sai vì ăn cắp một mẩu bánh mì cứu đàn cháu đói, Jean Valjean bước ra đời với tấm lòng căm thù nhân thế. Lão ăn cắp bộ đồ bạc của đức giám mục Myriel tử tế đã cho lão trú ngụ. Bị cảnh sát bắt lại, đức giám mục đã bước ra và bảo: "Sao con lại quên hai cây chân nến bạc này? Ta đã tặng con tất cả mà!".

Cử chỉ bao dung vô bờ bến ấy đã đốt cháy mọi căm hờn, cứu vớt cả một linh hồn lầm lạc trở về với ánh sáng lương tri cao cả.`
      }
    ]
  },
  {
    id: 'nha-gia-kim',
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    era: 'Văn học Đương đại (1988)',
    category: 'world-classic',
    categoryLabel: 'Văn học Nước ngoài',
    description: 'Câu chuyện ngụ ngôn kỳ diệu thúc giục mỗi con người dũng cảm theo đuổi "Vận Mệnh của Đời Mình", vì khi ta thực sự khao khát điều gì, cả vũ trụ sẽ hợp lực giúp ta.',
    rating: 4.9,
    reviewCount: 890,
    estimatedReadTimeMinutes: 35,
    curriculumGrade: 'Sách Gối Đầu Giường THPT',
    featured: true,
    coverTheme: {
      bg: '#FBF5E5',
      text: '#433418',
      border: '#E1CF9A',
      tagBg: '#F3E5BE',
      illustrationType: 'mountain'
    },
    chapters: [
      {
        id: 'ngk-1',
        title: 'Cậu Bé Chăn Cừu & Giấc Mơ Kim Tự Tháp',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Santiago, cậu bé chăn cừu người xứ Andalusia, đã dám từ bỏ đàn cừu quen thuộc để vượt đại sa mạc Sahara tìm kiếm kho báu giấu kín dưới chân Kim Tự Tháp. Trên hành trình ấy, cậu học được ngôn ngữ của vũ trụ, của gió, của cát và của chính trái tim mình.`
      }
    ]
  },
  {
    id: 'tram-nam-co-don',
    title: 'Trăm Năm Cô Đơn',
    author: 'Gabriel García Márquez',
    era: 'Chủ nghĩa Hiện thực Huyền ảo (1967)',
    category: 'world-classic',
    categoryLabel: 'Văn học Nước ngoài',
    description: 'Biên niên sử huyền thoại về dòng họ Buendía tại ngôi làng Macondo, hồi chuông cảnh tỉnh về sự cô đơn, chia rẽ và số phận một dân tộc.',
    rating: 4.8,
    reviewCount: 310,
    estimatedReadTimeMinutes: 50,
    curriculumGrade: 'Văn học Kinh điển Thế giới',
    featured: false,
    coverTheme: {
      bg: '#FAF3E8',
      text: '#413020',
      border: '#D7C2A4',
      tagBg: '#EEDDC7',
      illustrationType: 'moon'
    },
    chapters: [
      {
        id: 'tncd-1',
        title: 'Ngôi Làng Macondo & Trận Mưa Hoa Vàng',
        order: 1,
        audioTimeEstimate: '6 phút đọc',
        content: `Nhiều năm sau này, trước đội hành quyết, đại tá Aureliano Buendía hẳn sẽ nhớ lại buổi chiều xa xưa ấy, khi cha chàng dẫn chàng đi xem nước đá. Macondo khi ấy là một làng gồm hai mươi nóc nhà bằng đất và sậy dựng bên bờ một dòng sông nước trong veo chảy qua những hòn đá nhẵn thín, trắng xóa và to như những quả trứng thời tiền sử...`
      }
    ]
  },
  {
    id: 'dac-nhan-tam',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    era: 'Kỹ năng & Tư duy (1936)',
    category: 'self-growth',
    categoryLabel: 'Kỹ năng & Phát triển',
    description: 'Nghệ thuật thu phục lòng người sâu sắc, học cách lắng nghe chân thành, khen ngợi trung thực và thấu hiểu người khác.',
    rating: 4.8,
    reviewCount: 780,
    estimatedReadTimeMinutes: 40,
    curriculumGrade: 'Kỹ năng sống THPT',
    featured: false,
    coverTheme: {
      bg: '#FDF7EB',
      text: '#44331C',
      border: '#DECCA8',
      tagBg: '#F3E4C7',
      illustrationType: 'quill'
    },
    chapters: [
      {
        id: 'dnt-1',
        title: 'Muốn Lấy Mật Thì Đừng Phá Tổ Ong',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Nguyên tắc số một trong giao tiếp: Không chỉ trích, oán trách hay than phiền. Con người vốn không hành động thuần túy bằng lý trí mà bằng cảm xúc, bị chi phối bởi lòng kiêu hãnh và sự tự trọng. Khi bạn thấu hiểu và chân thành lắng nghe, cánh cửa lòng người sẽ tự khắc mở ra.`
      }
    ]
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits — Thay Đổi Tí Hon, Hiệu Quả Bất Ngờ',
    author: 'James Clear',
    era: 'Phát triển Bản thân (2018)',
    category: 'self-growth',
    categoryLabel: 'Kỹ năng & Phát triển',
    description: 'Bí quyết rèn luyện thói quen học tập và đọc sách bền vững cho học sinh: tốt hơn 1% mỗi ngày tạo nên sự đột phá vĩ đại.',
    rating: 4.9,
    reviewCount: 920,
    estimatedReadTimeMinutes: 35,
    curriculumGrade: 'Phương pháp học tập THPT',
    featured: false,
    coverTheme: {
      bg: '#F7F6EE',
      text: '#373822',
      border: '#D0CEAB',
      tagBg: '#E9E6C9',
      illustrationType: 'lotus'
    },
    chapters: [
      {
        id: 'ah-1',
        title: 'Sức Mạnh Bất Ngờ Của Sự Tích Lũy 1%',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Nếu bạn tiến bộ 1% mỗi ngày trong một năm, bạn sẽ giỏi hơn gấp 37 lần vào cuối năm đó. Đọc sách cũng vậy: mỗi ngày 10 trang sách dường như không đáng kể, nhưng sau 1 năm bạn đã đọc trọn vẹn hơn 12 tác phẩm lớn của nhân loại. Bản chất thành công không phải sự thay đổi kịch phát một đêm, mà là sức mạnh của thói quen nguyên tử lặp lại mỗi ngày.`
      }
    ]
  },
  {
    id: 'vo-nhat',
    title: 'Vợ Nhặt',
    author: 'Kim Lân',
    era: 'Văn học Kháng chiến (1954)',
    category: 'vietnam-classic',
    categoryLabel: 'Văn học Việt Nam',
    description: 'Bức tranh cảm động về tình người và khát vọng sống mãnh liệt của người nghèo trong nạn đói năm 1945, ngọn đèn nhen nhóm niềm tin tương lai.',
    rating: 4.9,
    reviewCount: 315,
    estimatedReadTimeMinutes: 35,
    curriculumGrade: 'Lớp 12 THPT',
    featured: true,
    coverTheme: {
      bg: '#F8F2E4',
      text: '#44321E',
      border: '#DCC5A3',
      tagBg: '#EFE1C4',
      illustrationType: 'lantern'
    },
    chapters: [
      {
        id: 'vn-1',
        title: 'Tràng Dẫn Vợ Về Xóm Ngụ Cư',
        order: 1,
        audioTimeEstimate: '5 phút đọc',
        content: `Giữa cái đói quay đói quắt năm 1945, người chết đói như ngả rạ, anh Tràng đẩy xe bò nghèo khổ lại dắt về một người vợ nhặt chỉ qua vài câu hò vui và bốn bát bánh đúc. Xóm ngụ cư u ám bỗng dưng như bừng lên một luồng sinh khí mới.

Bà cụ Tứ, người mẹ nghèo còm cõi, nhìn nàng dâu mới mà lòng nghẹn lại vừa xót xa vừa mừng tủi: "Ừ thôi thì các con đã phải duyên phải kiếp với nhau, u cũng mừng lòng...". Nồi cháo cám chát xít trong buổi sáng tân hôn vẫn ấm áp nụ cười và câu chuyện về lá cờ đỏ sao vàng bay phấp phới trên đê Sộp.`
      }
    ]
  }
];
