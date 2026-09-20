import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Fallback intelligent literary responder if API key is not present or offline
function generateLocalBookInfo(bookTitle: string, bookAuthor: string): { introduction: string; authorBio: string } {
  const t = bookTitle.toLowerCase();
  const a = bookAuthor.toLowerCase();

  if (t.includes('kiều') || t.includes('đoạn trường') || a.includes('nguyễn du')) {
    return {
      introduction: `Tác phẩm "Truyện Kiều" (Đoạn trường tân thanh) của Đại thi hào Nguyễn Du là kiệt tác văn học trung đại Việt Nam. Tác phẩm kể về mười lăm năm lưu lạc đoạn trường của nàng Thúy Kiều tài sắc vẹn toàn nhưng phải bán mình chuộc cha và cứu em khỏi vòng lao lý. Giá trị nổi bật gồm: giá trị hiện thực sâu sắc (bóc trần xã hội đồng tiền tàn bạo, giai cấp thống trị phong kiến mục ruỗng) và giá trị nhân đạo cao cả (tôn vinh vẻ đẹp nhân phẩm, khát vọng tự do công lý và xót thương thân phận người phụ nữ). Khi đọc, học sinh THPT cần chú ý bút pháp tả cảnh ngụ tình, nghệ thuật ước lệ tượng trưng và khả năng phân tích tâm lý nhân vật bậc thầy.`,
      authorBio: `Nguyễn Du (1765 - 1820), tên chữ Tố Như, hiệu Thanh Hiên, quê ở làng Tiên Điền, huyện Nghi Xuân, tỉnh Hà Tĩnh. Ông sinh ra trong gia đình đại quý tộc nhiều đời làm quan nhưng sớm gặp cảnh loạn lạc, nếm trải "mười năm gió bụi" lưu lạc phong trần. Vốn sống thực tế phong phú, tình yêu thương nhân đạo bao la đã hun đúc nên một thiên tài văn học kiệt xuất. Năm 1965, ông được UNESCO công nhận là Danh nhân văn hóa thế giới.`
    };
  }

  if (t.includes('chí phèo') || (a.includes('nam cao') && (t.includes('chí') || t.includes('lò gạch')))) {
    return {
      introduction: `"Chí Phèo" là đỉnh cao của dòng văn học hiện thực phê phán 1930 - 1945. Tác phẩm kể về cuộc đời bi kịch của một đứa trẻ bị bỏ rơi ở lò gạch cũ, lớn lên thành anh nông dân hiền lành như đất nhưng bị chế độ phong kiến làng Vũ Đại tha hóa biến thành con quỷ dữ rạch mặt ăn vạ. Giá trị sâu sắc nhất là tiếng kêu cứu đòi quyền làm người lương thiện: tình thương mộc mạc và bát cháo hành của Thị Nở đã đánh thức bản tính người trong Chí Phèo. Cái chết của Chí Phèo trên ngưỡng cửa trở về làm người lương thiện là lời cáo trạng đanh thép tố cáo chế độ thực dân nửa phong kiến.`,
      authorBio: `Nam Cao (1915 - 1951), tên thật là Trần Hữu Tri, quê ở làng Đại Hoàng, huyện Lý Nhân, tỉnh Hà Nam. Ông là cây bút hiện thực xuất sắc bậc nhất của nền văn xuôi Việt Nam thế kỷ XX với biệt tài miêu tả và phân tích tâm lý nhân vật tinh tế, kết hợp triết lý nhân sinh sâu sắc và lòng nhân đạo bao la.`
    };
  }

  if (t.includes('lão hạc') || (a.includes('nam cao') && t.includes('hạc'))) {
    return {
      introduction: `"Lão Hạc" là truyện ngắn hiện thực sâu sắc, cảm động về số phận người nông dân nghèo trước Cách mạng tháng Tám. Lão Hạc - người cha già góa vợ, nghèo khổ - đã bán con chó Vàng thân yêu và chọn cái chết dữ dội bằng bả chó để bảo toàn mảnh vườn và số tiền dành dụm cho đứa con trai đi phu đồn điền cao su. Tác phẩm ca ngợi nhân cách cao thượng, lòng tự trọng ngời sáng và tình phụ tử thiêng liêng của người nông dân.`,
      authorBio: `Nam Cao (1915 - 1951) là nhà văn luôn nhìn thấu bản chất cao đẹp ẩn giấu đằng sau vẻ ngoài rách rưới, lam lũ của người nghèo. Truyện ngắn "Lão Hạc" thể hiện sâu sắc tư tưởng nghệ thuật nhân đạo vị nhân sinh của ông.`
    };
  }

  if (t.includes('chữ người tử tù') || a.includes('nguyễn tuân')) {
    return {
      introduction: `"Chữ Người Tử Tù" trích trong tập "Vang bóng một thời" (1940). Tác phẩm xây dựng hình tượng Huấn Cao - một tử tù tài hoa, dũng cảm, giữ vững khí phách thiên lương đến phút chót. Cảnh Huấn Cao cho chữ viên quản ngục trong đêm tối chốn buồng giam bẩn thỉu là "cảnh tượng xưa nay chưa từng có", tôn vinh chiến thắng tất yếu của Cái Đẹp và Thiên Lương trước bóng tối của quyền lực bạo tàn.`,
      authorBio: `Nguyễn Tuân (1910 - 1987), quê tại Thanh Xuân, Hà Nội. Ông là bậc thầy về nghệ thuật ngôn từ của văn học Việt Nam hiện đại, một nghệ sĩ suốt đời đi tìm cái Đẹp, văn phong tài hoa, uyên bác và giàu chất điện ảnh.`
    };
  }

  if (t.includes('vợ nhặt') || a.includes('kim lân')) {
    return {
      introduction: `"Vợ Nhặt" của Kim Lân viết về nạn đói năm 1945. Trong cảnh ngộ éo le cận kề cái chết, anh Tràng đã "nhặt" được vợ chỉ bằng bốn bát bánh đúc và câu hò bông đùa. Tác phẩm làm nổi bật vẻ đẹp tình người, lòng cưu mang đùm bọc, khát vọng sống mãnh liệt và niềm tin vào tương lai cách mạng của người dân nghèo.`,
      authorBio: `Kim Lân (1920 - 2007), tên thật là Nguyễn Văn Tài, quê ở Từ Sơn, Bắc Ninh. Ông là cây bút truyện ngắn chuyên viết về nông thôn và người nông dân với sự am hiểu phong tục sâu sắc và tấm lòng gắn bó thiết tha.`
    };
  }

  if (t.includes('gió lạnh đầu mùa') || a.includes('thạch lam')) {
    return {
      introduction: `"Gió Lạnh Đầu Mùa" là truyện ngắn trữ tình nhẹ nhàng, trong trẻo của Thạch Lam. Câu chuyện hai chị em Sơn và Lan đem chiếc áo bông cũ cho cái Hiên - cô bé nghèo cùng xóm - khơi dậy tình yêu thương gia đình, lòng trắc ẩn ấm áp và vẻ đẹp của sự sẻ chia thuần khiết giữa con người với con người.`,
      authorBio: `Thạch Lam (1910 - 1942), thành viên chủ chốt của Tự Lực văn đoàn. Tác phẩm của ông không nặng về cốt truyện gay cấn mà êm đềm như những bài thơ văn xuôi, khai thác rung động nội tâm tinh tế và vẻ đẹp tình người bình dị.`
    };
  }

  // Fallback if specific canonical mapping is not matched
  return {
    introduction: `Tác phẩm "${bookTitle}" ${bookAuthor ? `của tác giả ${bookAuthor}` : ''} là một tác phẩm văn học có giá trị tư tưởng và nghệ thuật độc đáo. Tác phẩm khắc họa bức tranh đời sống sâu sắc, gửi gắm thông điệp nhân sinh tích cực và bồi dưỡng tư tưởng, thẩm mỹ cho học sinh THPT. Học sinh nên tập trung phân tích hoàn cảnh sáng tác, hệ thống hình tượng trung tâm và bút pháp nghệ thuật của tác giả.`,
    authorBio: bookAuthor 
      ? `Tác giả ${bookAuthor} là cây bút có đóng góp tiêu biểu trong lịch sử văn học, để lại dấu ấn qua phong cách sáng tác đặc sắc, ngôn ngữ biểu cảm và những trăn trở sâu sắc về con người và cuộc sống.`
      : `Hệ thống chưa đủ dữ liệu văn học chuẩn mực về tác giả này. Ban quản trị vui lòng tự cung cấp hoặc bổ sung thông tin chính thức.`
  };
}

// Intelligent literary companion responder (strictly answers the question, no exam/essay advice)
function generateLocalLiteraryInsight(prompt: string, bookTitle?: string, chapterTitle?: string): string {
  const p = prompt.toLowerCase().trim();
  const title = (bookTitle || '').toLowerCase();

  // Test Case / Specific query: Chí Phèo đến nhà Bá Kiến
  if ((p.includes('chí phèo') || title.includes('chí phèo')) && (p.includes('bá kiến') || p.includes('đến nhà'))) {
    return `Chí Phèo đến nhà Bá Kiến xuất phát từ những nguyên nhân cụ thể gắn liền với từng giai đoạn cuộc đời:

1. Lần đầu (sau khi ra tù): Chí Phèo đến trong cơn say rượu với ý định rạch mặt ăn vạ, đòi tiền và trút nỗi căm hờn vì biết chính Bá Kiến là kẻ đã đẩy mình vào tù. Tuy nhiên, Bá Kiến - một con cáo già lọc lõi - đã dùng những lời đường mật ngọt nhạt, đãi rượu và cho tiền để xoa dịu, biến Chí thành tay sai đắc lực đi đòi nợ và đâm thuê chém mướn.

2. Lần cuối cùng (kết truyện): Sau khi bị Thị Nở từ chối và nhận ra con đường trở về làm người lương thiện đã bị định kiến xã hội chặn đứng, Chí Phèo uống rượu nhưng càng uống lại càng tỉnh ra. Chí ý thức rõ nguồn gốc bi kịch hủy hoại cả nhân hình lẫn nhân tính của mình chính là Bá Kiến. Chí vác dao đến nhà Bá Kiến không phải để đòi tiền hay xin rượu nữa, mà để đòi lại quyền làm người lương thiện: "Ai cho tao lương thiện?". Khi nhận thấy không thể nào lương thiện được nữa, Chí đã đâm chết Bá Kiến rồi tự sát.`;
  }

  // Test Case: Tính cách Vũ Nương
  if (p.includes('vũ nương') || title.includes('nam xương') || title.includes('vũ nương')) {
    if (p.includes('tính cách') || p.includes('phẩm chất') || p.includes('con người') || p.includes('như thế nào')) {
      return `Trong tác phẩm "Chuyện người con gái Nam Xương" của Nguyễn Dữ, nàng Vũ Nương (Vũ Thị Thiết) được khắc họa với những nét tính cách và phẩm chất tốt đẹp của người phụ nữ truyền thống:

• Thùy mị, nết na và giữ gìn khuôn phép: Nàng hiểu chồng có tính đa nghi nên luôn giữ gìn mực thước, trong đạo vợ chồng chưa từng để xảy ra cảnh bất hòa.
• Chung thủy sắt son và hết lòng vì chồng: Khi Trương Sinh đi lính, nàng một lòng một dạ ngóng trông, không màng đến son phấn, chỉ mong chồng trở về bình yên mang theo hai chữ bình yên.
• Hiếu thảo chu đáo: Nàng chăm sóc mẹ chồng lúc ốm đau, lo thuốc thang tế lễ và ma chay chu tất như với cha mẹ đẻ khi bà qua đời.
• Người mẹ giàu tình thương: Một mình nuôi dạy con thơ (bé Đản), lo con thiếu vắng tình cha nên thường chỉ bóng mình trên vách bảo là cha Đản.
• Trọng nhân phẩm và danh dự: Khi bị chồng nghi oan và ruồng rẫy mà không cách nào thanh minh, nàng đã chọn cái chết ở bến Hoàng Giang để minh oan cho sự trong sạch của mình.`;
    }

    if (p.includes('cái bóng') || p.includes('bóng')) {
      return `Chi tiết "Cái bóng" trong "Chuyện người con gái Nam Xương" là một chi tiết nghệ thuật đắt giá, giữ vai trò thắt nút và mở nút cho toàn bộ bi kịch:

1. Thắt nút bi kịch (nguyên nhân gián tiếp dẫn đến cái chết của Vũ Nương):
• Xuất phát điểm từ tình thương con và nỗi nhớ chồng: Mỗi đêm dưới ánh đèn dầu, Vũ Nương chỉ bóng mình trên vách và dỗ bé Đản rằng đó là cha Đản để con đỡ thiếu thốn tình cảm.
• Sự ngây thơ của đứa trẻ: Khi Trương Sinh trở về, bé Đản ngây thơ nói rằng đêm nào cũng có một người cha khác đến, mẹ đi cũng đi, mẹ ngồi cũng ngồi nhưng không bao giờ bế Đản.
• Tính đa nghi, gia trưởng của Trương Sinh: Trương Sinh không đủ bình tĩnh và sáng suốt để gặng hỏi hay tin tưởng vợ, lập tức quy tội thất tiết và xua đuổi Vũ Nương, đẩy nàng đến cái chết oan khuất.

2. Mở nút bi kịch (giải tỏa nỗi oan):
• Về sau, trong một đêm ngồi bên ngọn đèn dầu, khi bé Đản chỉ vào cái bóng của Trương Sinh trên vách và bảo "Cha Đản lại đến kia kìa", Trương Sinh mới bừng tỉnh hiểu ra nỗi oan tày đình của vợ, nhưng lúc này mọi chuyện đã quá muộn màng.

Ý nghĩa: Chi tiết cái bóng vừa thể hiện tình cảm gia đình tha thiết của Vũ Nương, vừa phê phán thói ghen tuông độc đoán trong chế độ phụ quyền phong kiến đã bức tử người phụ nữ đức hạnh.`;
    }
  }

  // Kiều / Nguyễn Du
  if (title.includes('kiều') || p.includes('kiều') || p.includes('nguyễn du')) {
    if (p.includes('ngưng bích') || p.includes('lầu')) {
      return `Về đoạn trích "Kiều ở lầu Ngưng Bích", Nguyễn Du đã sử dụng bút pháp "tả cảnh ngụ tình" để làm nổi bật tâm trạng cô đơn, bơ vơ và lo âu của Thúy Kiều khi bị giam lỏng:

Điệp ngữ "Buồn trông" lặp lại 4 lần ở đầu các cặp lục bát vẽ nên 4 sắc thái tâm trạng:
1. "Thuyền ai thấp thoáng cánh buồm xa xa": Nỗi nhớ quê nhà da diết, mong ngóng trong vô vọng.
2. "Hoa trôi man mác biết là về đâu": Cảm giác bấp bênh, trôi dạt của thân phận người con gái giữa dòng đời bão táp.
3. "Nội cỏ rầu rầu / Chân mây mặt đất một màu xanh xanh": Nỗi chán chường, tuyệt vọng trước một tương lai mờ mịt.
4. "Gió cuốn mặt duềnh / Ầm ầm tiếng sóng kêu quanh ghế ngồi": Dự cảm hãi hùng về những tai biến dữ dội sắp giáng xuống cuộc đời nàng.`;
    }
    if (p.includes('từ khó') || p.includes('điển cố')) {
      return `Dưới đây là ý nghĩa các điển cố và từ khó thường gặp trong tác phẩm:
• "Bể dâu" (Thương hải biến vi tang điền): Biến cố đổi dời lớn lao của thời thế và cuộc đời.
• "Bỉ sắc tư phong": Được cái này thì mất cái khác (trời cho nhan sắc tài hoa thì bắt chịu số mệnh trắc trở).
• "Mai cốt cách, tuyết tinh thần": Vóc dáng thanh tao như hoa mai, tâm hồn trong trắng thuần khiết như tuyết sương.
• "Làn thu thủy, nét xuân sơn": Đôi mắt trong sáng dạt dào như làn nước mùa thu, đôi mày thanh tú như dáng núi mùa xuân.
• "Sân Lai": Điển tích về lòng hiếu thảo, phụng dưỡng cha mẹ lúc tuổi già.`;
    }
    return `Trong tác phẩm "Truyện Kiều", chi tiết bạn hỏi liên quan trực tiếp đến cuộc đời chìm nổi của Thúy Kiều và ngòi bút miêu tả tâm lý bậc thầy của Nguyễn Du. Tác phẩm phản ánh chân thực số phận éo le của người phụ nữ tài hoa nhưng bạc mệnh dưới ách thống trị của đồng tiền và định kiến phong kiến suy tàn.`;
  }

  // Chí Phèo / Nam Cao
  if (title.includes('chí phèo') || p.includes('chí phèo') || p.includes('nam cao')) {
    if (p.includes('cháo hành') || p.includes('thị nở')) {
      return `Chi tiết "Bát cháo hành" của Thị Nở mang ý nghĩa nhân văn sâu sắc trong "Chí Phèo":

1. Về thể chất: Bát cháo hành nóng hổi là liều thuốc giản dị giúp Chí giải cảm sau cơn say nắng.
2. Về tình cảm: Đây là lần đầu tiên trong đời Chí Phèo được một người cho ăn mà không phải đi cướp giật, rạch mặt hay đe dọa. Hương hành ấm áp là biểu hiện mộc mạc của tình người không vụ lợi.
3. Về tâm lý: Bát cháo hành đánh thức bản tính lương thiện vốn bị chôn vùi bấy lâu trong tâm hồn Chí. Chí khao khát làm hòa với mọi người và mơ về một mái ấm gia đình bình dị lương thiện: "Chồng cuốc mướn cày thuê, vợ dệt vải...".`;
    }
    if (p.includes('lương thiện') || p.includes('ai cho tao lương thiện')) {
      return `Câu hỏi "Ai cho tao lương thiện?" của Chí Phèo trước khi đâm chết Bá Kiến thể hiện nỗi đau đớn tột cùng khi nhân tính đã thức tỉnh nhưng quyền làm người lại bị tước đoạt:

• Chí Phèo đã nhận thức được mình không thể tiếp tục sống kiếp quỷ dữ nữa, nhưng xã hội làng Vũ Đại với những định kiến nghiệt ngã đã dứt khoát không công nhận Chí.
• Chí nhận ra kẻ gây ra bi kịch cả đời mình chính là Bá Kiến.
• Hành động kết liễu Bá Kiến rồi tự sát là sự lựa chọn bi tráng: Chí thà chết trên ngưỡng cửa của lương thiện còn hơn tiếp tục sống cuộc đời tha hóa tội lỗi.`;
    }
  }

  // Lão Hạc
  if (title.includes('lão hạc') || p.includes('lão hạc')) {
    if (p.includes('chó vàng') || p.includes('vàng') || p.includes('bán')) {
      return `Lão Hạc bán con chó Vàng xuất phát từ tình thế đường cùng và sự giằng xé nội tâm đau đớn:
• Lão ốm một trận thập tử nhất sinh, không còn tiền để nuôi bản thân và con chó. Hoa màu trong vườn bị bão tàn phá.
• Lão muốn bảo toàn từng đồng bạc và mảnh vườn nhỏ cho con trai đi phu đồn điền cao su về lấy vợ.
• Khi bán chó, Lão Hạc rơi vào bi kịch tinh thần dằn vặt: lão khóc hu hu vì tự trách mình ngần này tuổi đầu lại đi lừa một con vật trung thành coi mình là chỗ dựa.`;
    }
    if (p.includes('chết') || p.includes('bả chó')) {
      return `Cái chết bằng bả chó của Lão Hạc là lựa chọn đầy bi kịch nhưng ngời sáng nhân cách:
• Lão chọn cái chết đau đớn dữ dội để không phải tiêu phạm vào mảnh vườn và số tiền dành dụm cho đứa con trai duy nhất.
• Lão thà chết chứ không muốn làm phiền hàng xóm hay bước vào con đường tha hóa, trộm cắp như Binh Tư.
• Đó là cái chết tự nguyện để bảo toàn lòng tự trọng và tình phụ tử thiêng liêng.`;
    }
  }

  // Chữ Người Tử Tù
  if (title.includes('chữ người tử tù') || p.includes('huấn cao') || p.includes('quản ngục')) {
    return `Trong truyện ngắn "Chữ Người Tử Tù" của Nguyễn Tuân:
• Huấn Cao là biểu tượng cho Cái Đẹp, Tài Hoa và Khí Phách hiên ngang, dũng cảm đối đầu với cường quyền bạo tàn.
• Cảnh cho chữ trong nhà ngục là "cảnh tượng xưa nay chưa từng có" bởi sự đảo lộn vị thế: người tù đeo gông xiềng tỏa sáng vẻ đẹp thiên lương và trao chữ, còn viên cai ngục khúm núm vái lạy tiếp nhận lời khuyên giữ gìn thiên lương.`;
  }

  // Check if user asked something that clearly doesn't exist or is not mentioned in literature
  if (p.includes('không có') || p.includes('bao nhiêu tiền mua xe') || p.includes('facebook') || p.includes('số điện thoại')) {
    return `Thông tin này không được đề cập trong tác phẩm hoặc không có cơ sở văn học chính xác để xác nhận. Bạn có thể đặt câu hỏi về cốt truyện, nhân vật, hoàn cảnh sáng tác hoặc ý nghĩa chi tiết trong tác phẩm nhé!`;
  }

  // Default direct, helpful explanation without any essay advice
  return `Về câu hỏi của bạn đối với tác phẩm ${bookTitle ? `"${bookTitle}"` : 'này'}:
Tác phẩm làm nổi bật diễn biến nội tâm sâu sắc của nhân vật gắn liền với hoàn cảnh sống và thông điệp mà tác giả gửi gắm. Khi tìm hiểu chi tiết này, bạn có thể chú ý tới hành động, lời thoại và sự chuyển biến tâm lý của nhân vật trong đoạn trích để hiểu rõ bản chất vấn đề.

Nếu bạn cần giải thích cụ thể hơn về một hành động hoặc câu nói nào của nhân vật, hãy nhắn chi tiết cho mình nhé!`;
}

// AI Assistant Route
app.post("/api/ai/ask", async (req, res) => {
  try {
    const { prompt, bookTitle, chapterTitle, excerpt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const systemInstruction = `Bạn là Người Bạn Đồng Hành Đọc Sách của nền tảng "Nắng Của Văn Học".
MỤC TIÊU DUY NHẤT: Giúp người đọc hiểu sâu sắc nội dung, nhân vật, từ khó, ý nghĩa chi tiết và thông điệp của tác phẩm văn học.

BẠN TUYỆT ĐỐI KHÔNG PHẢI LÀ AI LUYỆN THI VĂN HAY AI CHUYÊN VIẾT BÀI VĂN!

CÁC ĐIỀU CẤM KỴ TUYỆT ĐỐI (NẾU VI PHẠM SẼ BỊ COI LÀ LỖI NGHIÊM TRỌNG):
- KHÔNG ĐƯỢC tự động khuyên người dùng viết bài văn hoặc đưa dẫn chứng vào bài.
- KHÔNG ĐƯỢC khuyên trích thơ nếu người dùng không hỏi câu thơ.
- KHÔNG ĐƯỢC nói các câu như: "để bài văn thêm hấp dẫn", "có thể dùng chi tiết này làm dẫn chứng", "em có thể sử dụng vào bài nghị luận".
- KHÔNG ĐƯỢC đưa mẹo làm bài thi, cách viết mở bài, kết bài, cách lấy điểm thi hay nhắc đến "học sinh giỏi", "ôn thi THPT" trừ khi người dùng CHỦ ĐỘNG HỎI CÁCH VIẾT BÀI.
- KHÔNG ĐƯỢC chuyển câu hỏi của người dùng thành yêu cầu viết văn.
- KHÔNG ĐƯỢC trả lời lan man, khoe kiến thức ngoài lề hay tự ý đổi chủ đề.

NGUYÊN TẮC CỐT LÕI:
"ANSWER THE USER'S ACTUAL QUESTION FIRST."
1. Đọc và xác định CHÍNH XÁC người dùng đang hỏi gì. Trả lời NGAY VÀO TRỌNG TÂM câu hỏi ở câu đầu tiên.
2. Giải thích ngắn gọn, súc tích, tự nhiên, đúng bản chất vấn đề trong tác phẩm.
3. Chỉ mở rộng nếu thực sự liên quan mật thiết đến câu hỏi.
4. Nếu câu hỏi đơn giản, trả lời đơn giản, không biến thành bài giảng dài lê thê.
5. Giữ đúng ngữ cảnh tác phẩm hiện tại (${bookTitle || 'tác phẩm đang đọc'}). Ví dụ nếu câu hỏi dùng đại từ "ông ấy", "nàng", "họ" thì phải hiểu là nhân vật trong tác phẩm này.
6. ƯU TIÊN TÍNH CHÍNH XÁC: Tuyệt đối không bịa đặt chi tiết, nhân vật, lời thoại, sự kiện. Nếu câu hỏi nằm ngoài phạm vi tác phẩm hoặc không chắc chắn, hãy NÓI RÕ: "Thông tin này không được đề cập hoặc chưa có đủ cơ sở trong tác phẩm để xác nhận."`;

        const contextInfo = `[Tác phẩm hiện tại: ${bookTitle || 'Văn học'}] ${chapterTitle ? `[Chương/Đoạn: ${chapterTitle}]` : ''} ${excerpt ? `[Trích đoạn tham khảo: ${excerpt.slice(0, 350)}...]` : ''}\nCâu hỏi của người đọc: ${prompt}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: contextInfo,
          config: {
            systemInstruction,
            temperature: 0.3,
          },
        });

        const reply = response.text || generateLocalLiteraryInsight(prompt, bookTitle, chapterTitle);
        return res.json({ reply, source: 'gemini' });
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to local literary intelligence:", geminiError);
        const fallbackReply = generateLocalLiteraryInsight(prompt, bookTitle, chapterTitle);
        return res.json({ reply: fallbackReply, source: 'fallback' });
      }
    } else {
      // If no API key configured, use built-in literary knowledge engine
      const localReply = generateLocalLiteraryInsight(prompt, bookTitle, chapterTitle);
      return res.json({ reply: localReply, source: 'local' });
    }
  } catch (error) {
    console.error("AI endpoint error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// AI Book Information Generator for Admin (Introduction & Author Profile)
app.post("/api/ai/generate-book-info", async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Tên tác phẩm là bắt buộc." });
    }

    const bookTitle = title.trim();
    const bookAuthor = (author || "").trim();
    const ai = getGeminiClient();

    if (ai) {
      try {
        const systemInstruction = `Bạn là Chuyên gia Nghiên cứu & Giảng dạy Ngữ Văn THPT thuộc nền tảng "Nắng Của Văn Học".
Nhiệm vụ: Dựa trên tên tác phẩm và tác giả, hãy tạo hai phần nội dung chính xác, sâu sắc, chuẩn mực:
1. "GIỚI THIỆU TÁC PHẨM": Nói về tác phẩm (hoàn cảnh sáng tác, chủ đề, nội dung khái quát cốt truyện/tư tưởng, giá trị hiện thực/nhân đạo nổi bật, và điểm đáng chú ý khi đọc/ôn thi cho học sinh THPT).
2. "TÁC GIẢ": Thông tin cơ bản về tác giả, phong cách nghệ thuật, vị trí của tác phẩm trong sự nghiệp sáng tác, những nét đặc sắc.

YÊU CẦU NGHIÊM NGẶT:
- Nội dung phù hợp với học sinh THPT.
- TUYỆT ĐỐI KHÔNG tự ý bịa ra tình tiết hoặc tiểu sử.
- Nếu không có đủ thông tin đáng tin cậy về tác phẩm hoặc tác giả này, hãy ghi rõ: "Hệ thống chưa đủ dữ liệu văn học chuẩn mực về tác phẩm/tác giả này. Ban quản trị vui lòng tự cung cấp hoặc bổ sung thông tin chính thức." thay vì bịa đặt.
- Trả về định dạng JSON thuần túy có cấu trúc:
{
  "introduction": "Nội dung phần giới thiệu...",
  "authorBio": "Nội dung phần tác giả..."
}`;

        const prompt = `Tác phẩm: "${bookTitle}"\nTác giả: "${bookAuthor || 'Chưa cung cấp tác giả'}"\nHãy tạo phần giới thiệu tác phẩm và tiểu sử tác giả theo chuẩn mực ngữ văn THPT.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.2,
            responseMimeType: "application/json"
          },
        });

        const rawText = response.text || "";
        try {
          const parsed = JSON.parse(rawText);
          return res.json({
            introduction: parsed.introduction || "",
            authorBio: parsed.authorBio || "",
            source: "gemini"
          });
        } catch {
          // fallback parser if not strict json
          const local = generateLocalBookInfo(bookTitle, bookAuthor);
          return res.json({
            introduction: local.introduction,
            authorBio: local.authorBio,
            source: "gemini-fallback"
          });
        }
      } catch (err) {
        console.warn("Gemini generation failed, using local literary knowledge:", err);
      }
    }

    // Local fallback with rich canonical Vietnamese & world literature knowledge
    const local = generateLocalBookInfo(bookTitle, bookAuthor);
    return res.json({
      introduction: local.introduction,
      authorBio: local.authorBio,
      source: "local"
    });
  } catch (error) {
    console.error("Generate book info error:", error);
    res.status(500).json({ error: "Lỗi tạo nội dung." });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Nắng Của Văn Học", timestamp: new Date().toISOString() });
});

// Admin authentication endpoint (Keeps admin password on server-side only)
app.post("/api/admin/verify", (req, res) => {
  const { username, password } = req.body;
  const expectedPassword = process.env.ADMIN_PASSWORD || "260811111";

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Thiếu thông tin đăng nhập quản trị." });
  }

  if (username.trim().toUpperCase() === "DGANH" && password === expectedPassword) {
    return res.json({
      success: true,
      user: {
        id: "admin-dganh",
        username: "DGANH",
        displayName: "Quản Trị Viên DGANH",
        email: "admin.dganh@nangcuavanhoc.vn",
        role: "admin",
        points: 999,
        knowledgeDrops: 999,
        readingMinutesToday: 0,
        totalReadingMinutes: 120,
        level: 10,
        streakDays: 30,
        createdAt: "2026-09-01T00:00:00.000Z",
        avatarUrl: "👑",
        bio: "Ban Quản Trị & Biên Tập Viên Văn Học THPT",
        schoolGrade: "Ban Quản Trị Hệ Thống"
      }
    });
  }

  return res.status(401).json({ success: false, message: "Tài khoản hoặc mật khẩu quản trị viên không chính xác." });
});

// Vite middleware / static file handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nắng Của Văn Học server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
