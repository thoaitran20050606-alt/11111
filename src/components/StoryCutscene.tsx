import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, MessageSquare, Swords, AlertTriangle, ShieldAlert } from 'lucide-react';
import portraitPhuocTrucReunited from '../assets/images/phuoc_truc_reunited_1792344680888.jpg';
import portraitPhuocGlassesTruc from '../assets/images/portrait_phuoc_glasses_truc_1792344215672.jpg';
import phuocTrucOttersImg from '../assets/images/phuoc_truc_family_otters_1792348195628.jpg';
import baHoLongVillainImg from '../assets/images/ba_ho_long_villain_1792342274333.jpg';
import baHoLongLasImg from '../assets/images/ba_ho_long_las_streetwear_1792349486434.jpg';
import phuocRealAvatarImg from '../assets/images/phuoc_real_avatar_1792344663444.jpg';
import portraitBossOfficer from '../assets/images/boss_patrol_officer_1792342260575.jpg';
import mapLevel1Img from '../assets/images/level1_song_buong_pixel_1792345673840.jpg';
import mapLevel2Img from '../assets/images/level2_pho_huyen_csgt_1792347208571.jpg';
import level4XeMayNgaImg from '../assets/images/level4_xe_may_nga_1792348181254.jpg';
import mapLevel4SaigonImg from '../assets/images/level4_saigon_night_map_1792349469369.jpg';
import {
  getPhuocAvatar,
  subscribePhuocAvatar,
  getBaHoLongAvatar,
  subscribeBaHoLongAvatar,
} from '../utils/avatarManager';
import { AvatarUploaderButton } from './AvatarUploaderButton';

interface StoryCutsceneProps {
  onStartPlaying: () => void;
  specificScene?: 'intro' | 'level2_briefing' | 'level3_briefing' | 'level4_briefing';
}

export const StoryCutscene: React.FC<StoryCutsceneProps> = ({
  onStartPlaying,
  specificScene = 'intro',
}) => {
  const [phuocAvatar, setPhuocAvatarState] = useState<string>(getPhuocAvatar());
  const [baHoLongAvatar, setBaHoLongAvatarState] = useState<string>(getBaHoLongAvatar());

  useEffect(() => {
    const unsubPhuoc = subscribePhuocAvatar((newUrl) => setPhuocAvatarState(newUrl));
    const unsubBaHo = subscribeBaHoLongAvatar((newUrl) => setBaHoLongAvatarState(newUrl));
    return () => {
      unsubPhuoc();
      unsubBaHo();
    };
  }, []);

  // 1. INTRO CUTSCENE: Giới thiệu Phước & Trúc -> Long xuất hiện cướp Trúc -> Phước quyết tâm lên đường
  const introSlides = [
    {
      title: 'HỒI 1: BÌNH YÊN BÊN CẦU SÔNG BUÔNG',
      subtitle: 'Giới thiệu đôi bạn trẻ Phước và Trúc bên bầy rái cá',
      image: phuocTrucOttersImg,
      alt: 'Phước và Trúc vui đùa cùng rái cá bên Cầu Sông Buông',
      badge: 'GIỚI THIỆU NHÂN VẬT',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-300 leading-relaxed">
            Ven <span className="text-amber-300 font-bold">Cầu Sông Buông</span> hiền hòa, chàng thanh niên{' '}
            <span className="text-emerald-300 font-bold">Phước</span> đeo kính cận, dáng vẻ thư sinh nhưng nghĩa hiệp,
            sớm tối vui vẻ chài lưới và bầu bạn cùng đàn rái cá tinh nghịch.
          </p>
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Phước:</span>
              <p className="text-stone-200 italic">
                "Trúc ơi, nước sông Buông hôm nay trong biếc, đàn rái cá lội tung tăng vui ghê. Chỉ mong ngày nào đôi mình cũng yên bình thế này."
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">Trúc:</span>
              <p className="text-stone-200 italic">
                "Dạ anh Phước! Em chỉ cần được ở bên anh, dù ăn cơm rau muối qua ngày em cũng thấy hạnh phúc."
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">Tùy chỉnh avatar nhân vật chính:</span>
            <AvatarUploaderButton target="phuoc" variant="compact" />
          </div>
        </div>
      ),
    },
    {
      title: 'HỒI 2: BÁ HỘ LONG BẤT NGỜ XUẤT HIỆN',
      subtitle: 'Phú hộ trẻ cậy giàu sang quyền thế buông lời xấc xược',
      image: baHoLongVillainImg,
      alt: 'Bá Hộ Long xuất hiện',
      badge: 'KẺ PHẢN DIỆN XUẤT HIỆN',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-300 leading-relaxed">
            Bỗng nhiên, tiếng còi xe inh ỏi và bước chân rầm rộ của đoàn tùy tùng ập đến.{' '}
            <span className="text-purple-300 font-bold">Bá Hộ Long</span> – tay phú hộ trẻ tuổi giàu xổi, kiêu ngạo khét tiếng – bước xuống vênh váo.
          </p>
          <div className="bg-purple-950/40 border border-purple-500/30 p-3 rounded-xl space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 font-bold">Bá Hộ Long:</span>
              <p className="text-purple-100 italic">
                "Hahaha! Khắp vùng sông Buông này hóa ra lại giấu một mỹ nhân xinh như hoa thế này! Con bé kia, mày theo thằng nghèo chài lưới này làm gì cho khổ? Mau theo Bá Hộ Long tao về Dinh thự, vàng đeo đỏ ngực, ăn sung mặc sướng!"
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">Trúc:</span>
              <p className="text-pink-100 italic">
                "Anh tự trọng đi! Tôi không ham tiền bạc nhung lụa của anh! Cả đời này tôi chỉ yêu thương một mình anh Phước thôi!"
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">Tùy chỉnh avatar Bá Hộ Long:</span>
            <AvatarUploaderButton target="baholong" variant="compact" />
          </div>
        </div>
      ),
    },
    {
      title: 'HỒI 3: LONG CƯỚP TRÚC & KÍCH ĐỘNG BẦY RÁI CÁ',
      subtitle: 'Long bắt Trúc lên xe đem về Dinh, sai đàn em cản Phước',
      image: baHoLongLasImg,
      alt: 'Long bắt cóc Trúc',
      badge: 'BIẾN CỐ KỊCH TÍNH',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-300 leading-relaxed">
            Bị từ chối thẳng thừng, Long nổi cơn thịnh nộ, lộ rõ bản chất bạo ngược.
          </p>
          <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Phước:</span>
              <p className="text-stone-100 italic">
                "Long! Ban ngày ban mặt ngươi dám ức hiếp dân lành à?! Buông Trúc ra ngay!"
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 font-bold">Bá Hộ Long:</span>
              <p className="text-purple-100 italic">
                "Thằng nghèo hèn chỉ có mỗi set son 500k mà dám to còi với tao à?! Trên đời này tiền là tất cả! Người đâu, trói con bé ném lên xe đem về Dinh! Kích động đàn rái cá chặn đường, đứa nào cản thì đạp bẹp!"
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">Trúc (hoảng sợ):</span>
              <p className="text-pink-200 font-semibold italic">
                "Anh Phước ơi!! Cứu em với!! Buông tôi ra... cứu em...!"
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'HỒI 4: LỜI THỀ GIẢI CỨU CỦA CHÀNG TRAI PHƯỚC',
      subtitle: 'Phước quyết tâm đạp rái cá vượt Cầu Sông Buông giải cứu người thương!',
      image: phuocRealAvatarImg,
      alt: 'Quyết tâm của Phước',
      badge: 'LÊN ĐƯỜNG XUẤT TRẬN',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-300 leading-relaxed">
            Nhìn chiếc xe của Bá Hộ Long rú ga cuốn theo cát bụi cùng tiếng kêu cứu xé lòng của Trúc, Phước siết chặt nắm tay, ngọn lửa chính nghĩa bừng sáng trong mắt!
          </p>
          <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-xl text-xs space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-200 font-bold">Lời thề của Phước:</span>
            <p className="text-amber-100 font-bold text-sm italic">
              "Trúc! Hãy đợi anh! Dù phải băng qua nghìn trùng nguy hiểm, đạp rái cá vượt Cầu Sông Buông hay đối đầu cả trạm CSGT, anh thề sẽ đánh bại Bá Hộ Long và đưa em trở về bình an!"
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-300 space-y-1">
            <p className="text-emerald-400 font-bold">🎮 HƯỚNG DẪN MÀN 1:</p>
            <p>• Dùng <strong>A / D hoặc Mũi Tên</strong> để di chuyển, <strong>Space / W</strong> để nhảy.</p>
            <p>• Nhảy đạp lên đầu rái cá để nảy cao vượt chướng ngại vật.</p>
            <p>• Nhặt tiền vàng sen và <strong>Trái Tim ❤️</strong> để hồi máu và cộng thêm thời gian!</p>
          </div>
        </div>
      ),
    },
  ];

  // 2. LEVEL 2 BRIEFING: Chạm trán Mini-Boss CSGT
  const level2Slides = [
    {
      title: 'CỬA ẢI PHỐ HUYỆN: CHẠM TRÁN TRƯỞNG TRẠM CSGT',
      subtitle: 'Né đạn súng lục liên thanh & Phản đòn bằng lý lẽ "BECAUSE"!',
      image: mapLevel2Img,
      alt: 'Phố Huyện và Trạm CSGT',
      badge: 'CHẠM TRÁN BOSS CÔNG AN',
      badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-950/60',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-300 leading-relaxed">
            Phước đã vượt qua Cầu Sông Buông và tiến vào <span className="text-amber-300 font-bold">Phố Huyện</span>.
            Ngay trước Trạm CSGT, một sĩ quan cảnh sát tuần tra nghiêm nghị tay lăm lăm súng ngắn chặn đường!
          </p>
          <div className="bg-sky-950/40 border border-sky-500/30 p-3 rounded-xl space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-sky-500/30 text-sky-200 font-bold">Công An:</span>
              <p className="text-stone-100 italic">
                "Đứng lại! Ai cho phép chạy quá tốc độ và nhảy nhót lộn xộn trong khu vực phố huyện?! Giơ tay lên đầu hàng!"
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Phước:</span>
              <p className="text-stone-100 italic">
                "Thưa chú, em đang đi cứu người bị bắt cóc! Em có lý do chính đáng... BECAUSE!"
              </p>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-rose-300">
              <AlertTriangle className="w-4 h-4" />
              CẢNH BÁO BOSS CÔNG AN:
            </p>
            <p>• Boss có súng lục bắn đạn liên thanh tốc độ cao! Hãy nhảy né hoặc leo lên giàn giáo.</p>
            <p>• Nhấn <strong>Chuột Trái hoặc phím F</strong> để hô <strong>"BECAUSE!"</strong> (hồi chiêu 2.5s) phản đòn.</p>
            <p>• Khi máu Boss xuống <strong>50% HP</strong>, Boss sẽ <strong>HÓA ĐIÊN (TỔNG LỰC)</strong> bắn đạn chùm 3 viên liên tiếp!</p>
          </div>
        </div>
      ),
    },
  ];

  // 3. LEVEL 3 BRIEFING: Cổng Dinh Cơ Bá Hộ Long
  const level3Slides = [
    {
      title: 'MÀN 3: ĐỘT NHẬP CỔNG DINH BÁ HỘ LONG',
      subtitle: 'Bẫy đầm sen hiểm trở & Bầy hộ vệ rái cá thiện chiến',
      image: baHoLongAvatar,
      alt: 'Cổng Dinh Bá Hộ Long',
      badge: 'ĐỘT NHẬP SÀO HUYỆT',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-300 leading-relaxed">
            Sau khi thuyết phục được viên cảnh sát bằng lý lẽ đanh thép, Phước đã tìm ra lối vào sào huyệt của{' '}
            <span className="text-purple-300 font-bold">Dinh Cơ Bá Hộ Long</span>!
          </p>
          <p className="text-xs text-stone-300 leading-relaxed">
            Khuôn viên dinh cơ được bố trí dày đặc bè bèo di động, bẫy rào chắn và những chú rái cá hộ vệ nhảy chồm hung hăng.
          </p>
          <div className="bg-amber-950/50 border border-amber-500/40 p-3 rounded-xl text-xs text-amber-200 space-y-1">
            <p className="font-bold">💡 Mẹo vượt ải:</p>
            <p>Sử dụng tiếng hô <strong>"BECAUSE!"</strong> để làm choáng lính gác từ xa và nhặt Trái Tim hồi máu trên mái ngói!</p>
          </div>
        </div>
      ),
    },
  ];

  // 4. LEVEL 4 BRIEFING: Cutscene màn cuối trước khi đánh nhau với Long (Theo đúng yêu cầu của người dùng)
  const level4Slides = [
    {
      title: 'HỒI CUỐI: ĐẠI LỘ SÀI GÒN ĐÊM & CÚ NGÃ XE CỦA LONG',
      subtitle: 'Phước rượt đuổi đến tận Landmark 81 - Chiếc xe của Long văng vào dải phân cách!',
      image: level4XeMayNgaImg,
      alt: 'Xe máy của Bá Hộ Long lật nhào bên dải phân cách',
      badge: 'CUỘC RƯỢT ĐUỔI NGHẸT THỞ',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-300 leading-relaxed">
            Sau bao phen hiểm trở, Phước đã bám đuổi sát nút <span className="text-purple-300 font-bold">Bá Hộ Long</span> tới tận{' '}
            <span className="text-amber-300 font-bold">Đại Lộ Cầu Đêm Sài Gòn</span> – nơi tòa tháp Landmark 81 và Bitexco tỏa sáng rực rỡ bên dòng sông.
          </p>
          <p className="text-xs text-stone-300 leading-relaxed">
            Do quá hoảng loạn trước bước chân thần tốc của Phước, chiếc xe máy của Long trượt bánh lật nhào bên lan can dải phân cách cầu cao tốc!
          </p>
          <p className="text-xs text-pink-200 bg-pink-950/40 border border-pink-500/30 p-2.5 rounded-xl">
            Trúc may mắn chỉ bị xây xát nhẹ, được Phước dìu sang lối đi bộ an toàn bên lan can cầu. Nhưng Long đã gượng dậy, đôi mắt đỏ ngầu tức tối!
          </p>
        </div>
      ),
    },
    {
      title: 'ĐỐI THOẠI TRƯỚC TRẬN ĐẠI CHIẾN: PHƯỚC VS BÁ HỘ LONG',
      subtitle: 'Cuộc tranh cãi nảy lửa giữa lý lẽ tình yêu và tiền bạc trước giờ tử chiến',
      image: baHoLongVillainImg,
      alt: 'Bá Hộ Long tử chiến',
      badge: 'QUYẾT ĐẤU ĐỈNH ĐIỂM',
      badgeColor: 'border-rose-500/50 text-rose-300 bg-rose-950/70',
      content: (
        <div className="space-y-2.5">
          <div className="bg-purple-950/40 border border-purple-500/40 p-2.5 rounded-xl text-xs space-y-1">
            <span className="px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 font-bold">Bá Hộ Long (quát tháo):</span>
            <p className="text-purple-100 italic">
              "Mẹ kiếp! Mày bám dai như đỉa vậy hả Phước?! Nhìn lại mình xem, mày chỉ là thằng nghèo chài lưới ven sông Buông, lấy tư cách gì tranh giành Trúc với tao?!"
            </p>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-500/40 p-2.5 rounded-xl text-xs space-y-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 font-bold">Phước (đanh thép):</span>
            <p className="text-emerald-100 italic">
              "Bá Hộ Long! Tiền tài của mày có chất cao như núi cũng không bao giờ mua được tình cảm chân thành! Trúc không thuộc về kẻ bạo ngược như mày!"
            </p>
          </div>

          <div className="bg-pink-950/40 border border-pink-500/30 p-2.5 rounded-xl text-xs space-y-1">
            <span className="px-2 py-0.5 rounded bg-pink-500/30 text-pink-200 font-bold">Trúc (nhắn nhủ):</span>
            <p className="text-pink-100 italic">
              "Anh Phước cẩn thận! Hắn có xúc xắc ma thuật và bão tiền đô la nguy hiểm lắm!"
            </p>
          </div>

          <div className="bg-purple-950/40 border border-purple-500/40 p-2.5 rounded-xl text-xs space-y-1">
            <span className="px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 font-bold">Bá Hộ Long (rút vũ khí cười lớn):</span>
            <p className="text-purple-100 italic">
              "Nực cười! Trên đời này cái gì không mua được bằng tiền thì sẽ mua được bằng RẤT NHIỀU TIỀN! Bão đô la và xúc xắc ma thuật của tao sẽ chôn vùi mày tại đây!"
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'QUYẾT TỬ ĐẠI LỘ: CẢNH BÁO BÁ HỘ LONG HÓA ĐIÊN 50% HP',
      subtitle: 'Xúc xắc ma thuật & Bão tiền đô la – Phản đòn bằng "BECAUSE!"',
      image: baHoLongLasImg,
      alt: 'Bá Hộ Long Streetwear LAS',
      badge: 'CƠ CHẾ BOSS CHI TIẾT',
      badgeColor: 'border-rose-500/50 text-rose-300 bg-rose-950/70',
      content: (
        <div className="space-y-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 space-y-1 text-rose-200">
            <p className="font-extrabold flex items-center gap-1.5 text-rose-300 text-sm">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              CẢNH BÁO: BÁ HỘ LONG SẼ HÓA ĐIÊN KHI XUỐNG 50% HP!
            </p>
            <p>• <strong>Bình thường:</strong> Ném cặp xúc xắc nảy và bão tiền đô la $100.</p>
            <p>• <strong>Khi xuống còn 50% HP (Hóa Điên / Cuồng Nộ):</strong></p>
            <p className="pl-3 text-amber-200">🔥 Tốc độ di chuyển tăng gấp đôi, aura lửa đỏ cuồng bạo quanh người.</p>
            <p className="pl-3 text-amber-200">🔥 Tung bão 3 xúc xắc liên hoàn với vận tốc cực nhanh khó né.</p>
            <p className="pl-3 text-amber-200">🔥 Phóng lốc xoáy 5 đợt tiền đô la và xấp tiền dày đặc.</p>
            <p className="pl-3 text-amber-200">🔥 Giậm đất tạo DOUBLE 4 sóng xung kích bùng nổ sang 2 bên!</p>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-200 space-y-1">
            <p className="font-bold">🗣️ VŨ KHÍ DUY NHẤT CỦA PHƯỚC: "BECAUSE!" (Hồi chiêu 2.5 giây)</p>
            <p>Canh thời điểm né đòn, hô vang <strong>"BECAUSE!"</strong> để phá bão tiền và đánh gục Bá Hộ Long!</p>
          </div>
        </div>
      ),
    },
  ];

  let slides = introSlides;
  if (specificScene === 'level2_briefing') slides = level2Slides;
  else if (specificScene === 'level3_briefing') slides = level3Slides;
  else if (specificScene === 'level4_briefing') slides = level4Slides;

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onStartPlaying();
    }
  };

  const active = slides[currentSlide];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 md:p-6 bg-stone-950/95 backdrop-blur-md z-30 select-none">
      <div className="w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]">
        {/* Left Side: Story & Character Artwork */}
        <div className="relative w-full md:w-5/12 h-56 md:h-auto min-h-[260px] md:min-h-[420px] bg-stone-950 flex items-center justify-center overflow-hidden p-3 shrink-0">
          <img
            src={active.image}
            alt={active.alt}
            className="w-full h-full object-contain max-h-[380px] drop-shadow-xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-stone-900/30 pointer-events-none" />
        </div>

        {/* Right Side: Narrative & Dialogue Flow */}
        <div className="w-full md:w-7/12 p-5 md:p-7 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-extrabold flex items-center gap-1.5 ${active.badgeColor || 'border-amber-500/40 text-amber-400 bg-amber-950/60'}`}>
                <Sparkles className="w-3.5 h-3.5" />
                {active.badge || 'CỐT TRUYỆN TRANH'}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {currentSlide + 1} / {slides.length}
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-black text-stone-100 tracking-tight mb-1">
              {active.title}
            </h2>
            <p className="text-xs text-stone-400 mb-3">{active.subtitle}</p>

            <div className="text-stone-300 text-sm leading-relaxed">
              {active.content}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between shrink-0">
            <button
              onClick={onStartPlaying}
              className="text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors cursor-pointer py-1.5 px-2"
            >
              Bỏ qua giới thiệu
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs md:text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{currentSlide < slides.length - 1 ? 'Tiếp theo' : 'Vào Màn Chơi'}</span>
              {currentSlide < slides.length - 1 ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
