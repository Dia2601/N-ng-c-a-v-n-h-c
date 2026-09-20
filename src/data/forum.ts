import { ForumPost } from '../types';

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    authorId: 'user-sample-leminh',
    authorName: 'Lê Thảo My',
    authorAvatar: '🌸',
    authorRole: 'student',
    title: 'Góc nhìn về chi tiết chiếc bóng trong "Chuyện Người Con Gái Nam Xương"',
    content: `Chào các bạn trong không gian Nắng Của Văn Học! Hôm nay mình vừa đọc lại Chuyện Người Con Gái Nam Xương của Nguyễn Dữ. Chi tiết chiếc bóng trên vách tường thực sự là một sáng tạo nghệ thuật đắt giá. Ban đầu chiếc bóng là biểu tượng của tình yêu thương gia đình, là điểm tựa tinh thần của người mẹ trẻ nuôi con mong chồng; nhưng bi kịch thay, cũng chính chiếc bóng vô tri ấy lại biến thành ngòi nổ châm ngòi cho sự nghi ngờ mù quáng của Trương Sinh. Các bạn có nghĩ rằng bi kịch này không chỉ bắt nguồn từ chiếc bóng mà sâu xa là do chế độ gia trưởng độc đoán thời phong kiến không?`,
    bookTag: 'Người Con Gái Nam Xương',
    tags: ['Nghị luận văn học', 'Văn học Trung đại', 'Phân tích chi tiết'],
    likes: 38,
    likedBy: [],
    comments: [
      {
        id: 'c1-1',
        postId: 'post-1',
        authorId: 'user-sample-hoang',
        authorName: 'Trần Đăng Khoa (Lớp 11 Văn)',
        authorAvatar: '🍃',
        authorRole: 'student',
        content: 'Hoàn toàn đồng ý với Thảo My! Chiếc bóng vừa là nút thắt vừa là nút mở của toàn bộ tấn bi kịch, một chi tiết nhỏ làm nên nhà văn lớn!',
        createdAt: 'Hôm qua lúc 19:42'
      }
    ],
    createdAt: '2 ngày trước'
  },
  {
    id: 'post-2',
    authorId: 'user-sample-nguyen',
    authorName: 'Nguyễn Hoàng Nam',
    authorAvatar: '☀️',
    authorRole: 'student',
    title: 'Bát cháo hành của Thị Nở — liều thuốc giải độc tâm hồn cho Chí Phèo',
    content: `Đọc đoạn Chí Phèo tỉnh rượu và đón nhận bát cháo hành, mình rớt nước mắt. Nam Cao miêu tả tâm lý bậc thầy: Chí Phèo không chỉ khỏi ốm về thể xác mà còn được thanh lọc tâm hồn. Lần đầu tiên có người đàn bà nhìn Chí như một con người chứ không phải một con quỷ dữ. "Trời ơi, hắn thèm lương thiện, hắn muốn làm hòa với mọi người biết bao!". Câu văn ngắn mà nhức nhối khôn nguôi. Các bạn tâm đắc nhất đoạn văn nào trong thiên truyện này?`,
    bookTag: 'Chí Phèo',
    tags: ['Nam Cao', 'Hiện thực phê phán', 'Tâm lý nhân vật'],
    likes: 54,
    likedBy: [],
    comments: [
      {
        id: 'c2-1',
        postId: 'post-2',
        authorId: 'user-sample-an',
        authorName: 'Vũ Hải An',
        authorAvatar: '📖',
        authorRole: 'student',
        content: 'Đoạn Chí Phèo nghe thấy tiếng chim hót ngoài bờ sông, tiếng cười nói của người đi chợ... âm thanh quen thuộc của sự sống đã đánh thức bản năng làm người của Chí. Đọc mà xót xa vô cùng.',
        createdAt: 'Hôm nay lúc 08:15'
      }
    ],
    createdAt: 'Hôm qua'
  },
  {
    id: 'post-3',
    authorId: 'user-sample-dieuanh',
    authorName: 'Hoàng Diệu Anh',
    authorAvatar: '✨',
    authorRole: 'student',
    title: 'Cách mình duy trì thói quen đọc 30 phút mỗi ngày nhờ khu vườn đọc sách',
    content: `Trước đây mình rất khó tập trung đọc những cuốn sách kinh điển dày cộp. Nhưng từ khi đặt mục tiêu tưới nước cho mầm cây mỗi ngày trên Nắng Của Văn Học, mình đọc được trọn vẹn 3 tác phẩm trong tháng này rồi! Cảm giác vừa lật từng trang sách vừa thấy đóa hoa hồng trong vườn nở rộ thật sự rất ấm áp và có động lực.`,
    bookTag: 'Atomic Habits',
    tags: ['Kinh nghiệm đọc sách', 'Chăm sóc cây', 'Lan tỏa văn hóa đọc'],
    likes: 67,
    likedBy: [],
    comments: [],
    createdAt: 'Vừa xong'
  }
];
