import { Challenge } from '../types';

export const LITERARY_CHALLENGES: Challenge[] = [
  {
    id: 'challenge-level-1',
    level: 1,
    title: 'Mầm Xanh Thi Ca & Truyện Kiều',
    subtitle: 'Khám phá thế giới nghệ thuật ngôn từ của Đại thi hào Nguyễn Du',
    description: 'Thử tài kiến thức căn bản về kiệt tác Truyện Kiều, bút pháp ước lệ tượng trưng và các nhân vật tiêu biểu trong văn học trung đại.',
    rewardPoints: 10,
    requiredLevel: 0,
    questions: [
      {
        id: 'q1-1',
        question: 'Nguyễn Du dùng bút pháp nào để khắc họa vẻ đẹp "nghiêng nước nghiêng thành" của Thúy Kiều?',
        options: [
          'Bút pháp hiện thực trần trụi miêu tả chi tiết từng đường nét',
          'Bút pháp ước lệ tượng trưng lấy vẻ đẹp thiên nhiên làm chuẩn mực ("làn thu thủy, nét xuân sơn")',
          'Bút pháp trào phúng phóng đại châm biếm',
          'Bút pháp phân tâm học hiện đại'
        ],
        correctIndex: 1,
        explanation: 'Nguyễn Du sử dụng nghệ thuật ước lệ cổ điển tinh tế: mượn "thu thủy" (nước mùa thu trong veo dạt dào) tả đôi mắt, "xuân sơn" (núi mùa xuân thanh tú) tả nét mày kiều diễm.'
      },
      {
        id: 'q1-2',
        question: 'Trong đoạn trích "Kiều ở lầu Ngưng Bích", điệp từ nào được lặp lại 4 lần ở đầu các cặp câu lục bát để diễn tả nỗi buồn dồn dập?',
        options: [
          'Nhớ ai',
          'Thương ôi',
          'Buồn trông',
          'Xót xa'
        ],
        correctIndex: 2,
        explanation: 'Điệp từ "Buồn trông" lặp lại 4 lần tạo nhịp điệu dồn dập, khắc sâu điệp khúc tâm trạng cô đơn, bơ vơ và linh cảm bão tố cuộc đời của nàng Kiều.'
      },
      {
        id: 'q1-3',
        question: 'Thể thơ chính được thi hào Nguyễn Du vận dụng mẫu mực trong toàn bộ 3254 câu Truyện Kiều là gì?',
        options: [
          'Thơ Thất ngôn bát cú Đường luật',
          'Thơ Song thất lục bát',
          'Thơ Lục bát thuần túy dân tộc',
          'Thơ Tự do tân hình thức'
        ],
        correctIndex: 2,
        explanation: 'Truyện Kiều là đỉnh cao chói lọi của thể thơ lục bát truyền thống của dân tộc Việt Nam, đạt đến độ trau chuốt, tinh luyện phi thường.'
      }
    ]
  },
  {
    id: 'challenge-level-2',
    level: 2,
    title: 'Hiện Thực Phê Phán & Bi Kịch Con Người',
    subtitle: 'Bước chân vào làng Vũ Đại và bi kịch tha hóa trước Cách mạng',
    description: 'Tìm hiểu ngòi bút bậc thầy Nam Cao qua "Chí Phèo", "Lão Hạc" và tấm lòng nhân đạo cao quý.',
    rewardPoints: 15,
    requiredLevel: 1,
    questions: [
      {
        id: 'q2-1',
        question: 'Hình tượng "bát cháo hành" của Thị Nở có ý nghĩa biểu tượng sâu sắc nhất là gì?',
        options: [
          'Đơn thuần là món ăn giải cảm sau cơn say rượu',
          'Hương vị tình người ấm áp, liều thuốc giải độc tâm hồn đánh thức nhân tính và khát vọng lương thiện trong Chí Phèo',
          'Sự chế giễu ngầm của thị Nở đối với Chí Phèo',
          'Minh chứng cho sự nghèo nàn cơ cực của làng Vũ Đại'
        ],
        correctIndex: 1,
        explanation: 'Bát cháo hành bốc khói của Thị Nở là biểu tượng tình thương mộc mạc duy nhất Chí được nhận, đánh thức bản tính lương thiện bị vùi dập bấy lâu.'
      },
      {
        id: 'q2-2',
        question: 'Vì sao Lão Hạc chọn cái chết đau đớn bằng bả chó thay vì bán đi mảnh vườn?',
        options: [
          'Vì lão quá ân hận sau khi bán cậu Vàng',
          'Vì muốn bảo toàn mảnh vườn và món tiền dành dụm nguyên vẹn cho đứa con trai nghèo đi đồn điền',
          'Vì lão bị dân làng xa lánh, cô lập',
          'Vì lão đã quá già yếu không thể lao động'
        ],
        correctIndex: 1,
        explanation: 'Cái chết bằng bả chó của Lão Hạc là bi kịch hi sinh cao thượng của một người cha nghèo kiên quyết bảo vệ tương lai của con và giữ gìn nhân cách trong sạch.'
      },
      {
        id: 'q2-3',
        question: 'Câu nói cuối cùng xé lòng của Chí Phèo trước mặt Bá Kiến trước khi vung dao là gì?',
        options: [
          '"Tao muốn có thật nhiều tiền và rượu!"',
          '"Ai cho tao lương thiện?"',
          '"Làng Vũ Đại này không ai bằng tao!"',
          '"Tao hận cả cái xã hội này!"'
        ],
        correctIndex: 1,
        explanation: '"Ai cho tao lương thiện?" là câu hỏi nhức nhối mang giá trị hiện thực và nhân đạo sâu sắc, bản cáo trạng đanh thép đối với xã hội phong kiến thực dân tàn bạo.'
      }
    ]
  },
  {
    id: 'challenge-level-3',
    level: 3,
    title: 'Vẻ Đẹp Thiên Lương & Phong Thái Kẻ Sĩ',
    subtitle: 'Nghệ thuật tôn vinh cái đẹp và khí phách bất khuất của Nguyễn Tuân',
    description: 'Khám phá "Chữ Người Tử Tù", tấm lòng biệt nhỡn liên tài và sự thăng hoa của thiên lương giữa chốn ngục tù tăm tối.',
    rewardPoints: 20,
    requiredLevel: 2,
    questions: [
      {
        id: 'q3-1',
        question: 'Tại sao cảnh Huấn Cao cho chữ viên quản ngục lại được Nguyễn Tuân gọi là "cảnh tượng xưa nay chưa từng có"?',
        options: [
          'Vì việc cho chữ diễn ra ngoài trời lúc bình minh rạng rỡ',
          'Vì người cho chữ là tử tù sắp chết uy nghi dạy dỗ; kẻ xin chữ là cai ngục khúm núm; cái đẹp tỏa sáng rạng ngời lấn át nơi ngục tối bẩn thỉu',
          'Vì chữ được viết bằng máu trên nền đá lạnh buốt',
          'Vì có sự tham gia của hàng trăm tù nhân khác'
        ],
        correctIndex: 1,
        explanation: 'Trật tự nhà tù bị đảo lộn hoàn toàn: tử tù trở thành người ban phát cái đẹp và thiên lương, quản ngục vái lạy tiếp nhận lời răn dạy cao quý.'
      },
      {
        id: 'q3-2',
        question: 'Lời khuyên then chốt của Huấn Cao dành cho viên Quản ngục trước lúc chia tay là gì?',
        options: [
          'Hãy tiếp tục làm ngục quan để giúp đỡ thêm nhiều tù nhân khác',
          'Hãy bỏ nghề ngục tù, về quê giữ lấy thiên lương cho lành vững rồi hãy nghĩ đến việc chơi chữ',
          'Hãy theo học chữ Nho để trở thành danh nho',
          'Hãy rời bỏ quê hương sang xứ khác lập nghiệp'
        ],
        correctIndex: 1,
        explanation: 'Huấn Cao khẳng định: Cái đẹp không thể chung sống với cái xấu xa, độc ác; phải có thiên lương trong sạch thì mới có thể thưởng thức cái đẹp chân chính.'
      }
    ]
  },
  {
    id: 'challenge-level-4',
    level: 4,
    title: 'Khát Vọng Sống & Tình Người Thời Đói',
    subtitle: 'Bản trường ca nhân ái qua kiệt tác Vợ Nhặt của Kim Lân',
    description: 'Phân tích chiều sâu tâm lý nhân vật Tràng, bà cụ Tứ và vẻ đẹp tình người nhen nhóm giữa ranh giới sống chết năm 1945.',
    rewardPoints: 25,
    requiredLevel: 3,
    questions: [
      {
        id: 'q4-1',
        question: 'Trong tác phẩm "Vợ Nhặt" của Kim Lân, hình ảnh nào xuất hiện trong tâm trí anh Tràng ở cuối câu chuyện báo hiệu sự đổi đời?',
        options: [
          'Một kho thóc đầy ắp của làng',
          'Đoàn người đói kéo nhau đi phá kho thóc Nhật và lá cờ đỏ sao vàng bay phấp phới',
          'Một ngôi nhà khang trang bên bờ sông',
          'Tiếng trẻ thơ vui đùa trong sân'
        ],
        correctIndex: 1,
        explanation: 'Hình ảnh lá cờ đỏ sao vàng ở cuối truyện thể hiện niềm tin và xu thế tất yếu của Cách mạng sẽ giải phóng người nông dân nghèo khỏi tăm tối, đói khát.'
      }
    ]
  },
  {
    id: 'challenge-level-5',
    level: 5,
    title: 'Biển Cả Khát Vọng & Văn Học Thế Giới',
    subtitle: 'Triết lý tảng băng trôi của Hemingway và bí ẩn hành tinh Hoàng Tử Bé',
    description: 'Chinh phục các đỉnh cao văn học kinh điển thế giới và đúc kết những thông điệp nhân văn vĩnh cửu.',
    rewardPoints: 30,
    requiredLevel: 4,
    questions: [
      {
        id: 'q5-1',
        question: 'Bí mật mà chú Cáo tặng cho Hoàng Tử Bé khi chia tay là gì?',
        options: [
          '"Thời gian là vàng bạc quý giá nhất"',
          '"Người ta chỉ có thể nhìn thấy rõ ràng bằng trái tim. Những điều cốt lõi thì vô hình trong mắt trần"',
          '"Hãy trân trọng tất cả những ai bạn gặp gỡ"',
          '"Vũ trụ luôn luôn lắng nghe mọi lời nguyện cầu"'
        ],
        correctIndex: 1,
        explanation: 'Câu nói bất hủ của Antoine de Saint-Exupéry nhắc nhở con người về bản chất của tình yêu thương đích thực vượt qua những hình thức hào nhoáng bề ngoài.'
      },
      {
        id: 'q5-2',
        question: 'Tác phẩm "Ông Già và Biển Cả" đã minh chứng cho tuyên ngôn nhân sinh nào của Ernest Hemingway?',
        options: [
          '"Thiên nhiên luôn luôn thống trị con người"',
          '"Con người có thể bị hủy diệt nhưng không thể bị đánh bại"',
          '"Mọi nỗ lực của con người đều là vô ích trước số phận"',
          '"Hãy luôn thỏa hiệp với hiểm nguy"'
        ],
        correctIndex: 1,
        explanation: 'Dù chỉ kéo về bộ xương cá kiếm trơ trọi sau cuộc chiến với đàn cá mập, ông lão Santiago vẫn sừng sững như một biểu tượng của ý chí bất khuất phi thường.'
      }
    ]
  }
];
