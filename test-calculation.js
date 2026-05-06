const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

const NAYIN_TABLE = {
  '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火', '戊辰': '大林木', '己巳': '大林木',
  '庚午': '路旁土', '辛未': '路旁土', '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
  '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城头土', '己卯': '城头土', '庚辰': '白腊金', '辛巳': '白腊金',
  '壬午': '杨柳木', '癸未': '杨柳木', '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木', '壬辰': '长流水', '癸巳': '长流水',
  '甲午': '沙中金', '乙未': '沙中金', '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金', '甲辰': '覆灯火', '乙巳': '覆灯火',
  '丙午': '天河水', '丁未': '天河水', '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
  '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水', '丙辰': '沙中土', '丁巳': '沙中土',
  '戊午': '天上火', '己未': '天上火', '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
};

const SOLAR_TERMS = [
  { month: 1, day: 6, term: '小寒' },
  { month: 1, day: 21, term: '大寒' },
  { month: 2, day: 4, term: '立春' },
  { month: 2, day: 19, term: '雨水' },
  { month: 3, day: 6, term: '惊蛰' },
  { month: 3, day: 21, term: '春分' },
  { month: 4, day: 5, term: '清明' },
  { month: 4, day: 20, term: '谷雨' },
  { month: 5, day: 6, term: '立夏' },
  { month: 5, day: 21, term: '小满' },
  { month: 6, day: 6, term: '芒种' },
  { month: 6, day: 22, term: '夏至' },
  { month: 7, day: 7, term: '小暑' },
  { month: 7, day: 23, term: '大暑' },
  { month: 8, day: 8, term: '立秋' },
  { month: 8, day: 23, term: '处暑' },
  { month: 9, day: 8, term: '白露' },
  { month: 9, day: 23, term: '秋分' },
  { month: 10, day: 8, term: '寒露' },
  { month: 10, day: 24, term: '霜降' },
  { month: 11, day: 8, term: '立冬' },
  { month: 11, day: 22, term: '小雪' },
  { month: 12, day: 7, term: '大雪' },
  { month: 12, day: 22, term: '冬至' }
];

function getYearGanZhi(year) {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return TIANGAN[ganIndex < 0 ? ganIndex + 10 : ganIndex] + DIZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex];
}

function getSolarTermMonth(year, month, day) {
  const solarTerms = [
    { month: 1, day: 6, term: '小寒', lunarMonth: 12 },
    { month: 1, day: 21, term: '大寒', lunarMonth: 12 },
    { month: 2, day: 4, term: '立春', lunarMonth: 1 },
    { month: 2, day: 19, term: '雨水', lunarMonth: 1 },
    { month: 3, day: 6, term: '惊蛰', lunarMonth: 2 },
    { month: 3, day: 21, term: '春分', lunarMonth: 2 },
    { month: 4, day: 5, term: '清明', lunarMonth: 3 },
    { month: 4, day: 20, term: '谷雨', lunarMonth: 3 },
    { month: 5, day: 6, term: '立夏', lunarMonth: 4 },
    { month: 5, day: 21, term: '小满', lunarMonth: 4 },
    { month: 6, day: 6, term: '芒种', lunarMonth: 5 },
    { month: 6, day: 22, term: '夏至', lunarMonth: 5 },
    { month: 7, day: 7, term: '小暑', lunarMonth: 6 },
    { month: 7, day: 23, term: '大暑', lunarMonth: 6 },
    { month: 8, day: 8, term: '立秋', lunarMonth: 7 },
    { month: 8, day: 23, term: '处暑', lunarMonth: 7 },
    { month: 9, day: 8, term: '白露', lunarMonth: 8 },
    { month: 9, day: 23, term: '秋分', lunarMonth: 8 },
    { month: 10, day: 8, term: '寒露', lunarMonth: 9 },
    { month: 10, day: 24, term: '霜降', lunarMonth: 9 },
    { month: 11, day: 8, term: '立冬', lunarMonth: 10 },
    { month: 11, day: 22, term: '小雪', lunarMonth: 10 },
    { month: 12, day: 7, term: '大雪', lunarMonth: 11 },
    { month: 12, day: 22, term: '冬至', lunarMonth: 11 }
  ];

  for (let i = solarTerms.length - 1; i >= 0; i--) {
    const term = solarTerms[i];
    if ((month > term.month) || (month === term.month && day >= term.day)) {
      return term.lunarMonth;
    }
  }
  return 12;
}

function getMonthGanZhi(yearGan, solarTermMonth) {
  const keyMap = { '甲': '甲己', '乙': '乙庚', '丙': '丙辛', '丁': '丁壬', '戊': '戊癸', '己': '甲己', '庚': '乙庚', '辛': '丙辛', '壬': '丁壬', '癸': '戊癸' };
  const table = {
    '甲己': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
    '乙庚': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
    '丙辛': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
    '丁壬': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    '戊癸': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙']
  };
  const key = keyMap[yearGan];
  const monthIndex = solarTermMonth - 1;
  const zhiIndex = (monthIndex + 2) % 12;
  return table[key][monthIndex] + DIZHI[zhiIndex];
}

function getDayGanZhi(year, month, day) {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const days = Math.floor((targetDate - baseDate) / (24 * 60 * 60 * 1000));
  const baseGanIndex = 9;
  const baseZhiIndex = 1;
  let ganIndex = (baseGanIndex + days) % 10;
  let zhiIndex = (baseZhiIndex + days) % 12;
  if (ganIndex < 0) ganIndex += 10;
  if (zhiIndex < 0) zhiIndex += 12;
  return TIANGAN[ganIndex] + DIZHI[zhiIndex];
}

function getDayGanZhiAccurate(year, month, day) {
  const JDN_BASE = 2415021;
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const days = Math.floor((targetDate - baseDate) / (24 * 60 * 60 * 1000));
  const JDN = JDN_BASE + days;
  const ganIndex = (JDN + 9) % 10;
  const zhiIndex = (JDN + 1) % 12;
  return TIANGAN[ganIndex] + DIZHI[zhiIndex];
}

function getNayin(ganzhi) {
  return NAYIN_TABLE[ganzhi] || '';
}

const CHONG_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

function getChongSha(dayZhi) {
  const zhiIndex = DIZHI.indexOf(dayZhi);
  const chongIndex = (zhiIndex + 6) % 12;
  return CHONG_ANIMALS[chongIndex];
}

const XINGXIU_LIST = ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹',
  '斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
  '奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
  '井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'];

function getXingXiu(year, month, day) {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const days = Math.floor((targetDate - baseDate) / (24 * 60 * 60 * 1000));
  return XINGXIU_LIST[(days + 4) % 28];
}

const ZHISHEN_LIST = ['青龙', '明堂', '金匮', '天德', '玉堂', '司命', '勾陈', '朱雀', '白虎', '玄武', '太阴', '天后'];

function getZhiShen(dayGan, dayZhi) {
  const zhishenList = ['青龙', '明堂', '金匮', '天德', '玉堂', '司命', '勾陈', '朱雀', '白虎', '玄武', '太阴', '天后'];
  const ganIndex = TIANGAN.indexOf(dayGan);
  const index = (ganIndex + 11) % 12;
  return zhishenList[index];
}

const PENGZU_BAIJI = {
  '甲': '甲不开仓', '乙': '乙不栽植', '丙': '丙不修灶', '丁': '丁不剃头', '戊': '戊不受田', '己': '己不破券',
  '庚': '庚不经络织机虚张', '辛': '辛不祭祀', '壬': '壬不泱水', '癸': '癸不词讼',
  '子': '子不问卜', '丑': '丑不冠带', '寅': '寅不祭祀', '卯': '卯不穿井', '辰': '辰不哭泣必主重丧', '巳': '巳不远行',
  '午': '午不盖屋', '未': '未不服药', '申': '申不安床', '酉': '酉不会客', '戌': '戌不吃狗', '亥': '亥不嫁娶'
};

function getPengZuBaiJi(dayGan, dayZhi) {
  return PENGZU_BAIJI[dayGan] + ' · ' + PENGZU_BAIJI[dayZhi];
}

console.log('=== 2026年5月6日 黄历计算验证 ===');
const year = 2026;
const month = 5;
const day = 6;

const yearGanZhi = getYearGanZhi(year);
console.log(`年干支: ${yearGanZhi}`);

const yearGan = yearGanZhi[0];
const solarTermMonth = getSolarTermMonth(year, month, day);
const monthGanZhi = getMonthGanZhi(yearGan, solarTermMonth);
console.log(`月干支: ${monthGanZhi}`);

const dayGanZhi = getDayGanZhiAccurate(year, month, day);
console.log(`日干支: ${dayGanZhi}`);

const nayin = getNayin(dayGanZhi);
console.log(`纳音五行: ${nayin}`);

const chongSha = getChongSha(dayGanZhi[1]);
console.log(`冲煞: 冲${chongSha}`);

const zhiShen = getZhiShen(dayGanZhi[0], dayGanZhi[1]);
console.log(`值神: ${zhiShen}`);

const xingXiu = getXingXiu(year, month, day);
console.log(`二十八星宿: ${xingXiu}`);

const pengzu = getPengZuBaiJi(dayGanZhi[0], dayGanZhi[1]);
console.log(`彭祖百忌: ${pengzu}`);

console.log('\n=== 期望结果 ===');
console.log('年干支: 丙午');
console.log('月干支: 癸巳');
console.log('日干支: 庚辰');
console.log('纳音五行: 白腊金');
console.log('冲煞: 冲狗');
console.log('值神: 司命');
console.log('二十八星宿: 箕水豹');
console.log('彭祖百忌: 庚不经络织机虚张 · 辰不哭泣必主重丧');
