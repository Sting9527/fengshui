const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const JISHEN_LIST = ['月德', '天恩', '时德', '阴德', '福生', '司命', '青龙', '明堂', '金匮', '天德', '玉堂'];
const XIONGSHEN_LIST = ['月煞', '月虚', '血支', '五虚', '天牢', '玄武', '白虎', '朱雀', '勾陈'];

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

function getJiShenList(dayGan, dayZhi) {
  const ganIndex = TIANGAN.indexOf(dayGan);
  const zhiIndex = DIZHI.indexOf(dayZhi);
  const count = (ganIndex + zhiIndex) % 4 + 4;
  return JISHEN_LIST.slice(0, count).join('、');
}

function getXiongShenList(dayGan, dayZhi) {
  const ganIndex = TIANGAN.indexOf(dayGan);
  const zhiIndex = DIZHI.indexOf(dayZhi);
  const count = (ganIndex + zhiIndex) % 4 + 3;
  return XIONGSHEN_LIST.slice(0, count).join('、');
}

function getJiShenDirection(key, dayGan, dayZhi) {
  const directionMap = {
    '甲': { xishen: '东北', fushen: '东南', caishen: '正南', guishen: '东南' },
    '乙': { xishen: '正西', fushen: '西南', caishen: '正北', guishen: '正北' },
    '丙': { xishen: '正西', fushen: '正北', caishen: '正南', guishen: '正南' },
    '丁': { xishen: '正南', fushen: '正东', caishen: '东南', guishen: '东南' },
    '戊': { xishen: '正南', fushen: '正东', caishen: '正南', guishen: '西南' },
    '己': { xishen: '东南', fushen: '正西', caishen: '正西', guishen: '正北' },
    '庚': { xishen: '正南', fushen: '西北', caishen: '正南', guishen: '西南' },
    '辛': { xishen: '东北', fushen: '正南', caishen: '西南', guishen: '正东' },
    '壬': { xishen: '正南', fushen: '东南', caishen: '正东', guishen: '正北' },
    '癸': { xishen: '正南', fushen: '正北', caishen: '正南', guishen: '东南' }
  };

  const directions = directionMap[dayGan] || directionMap['甲'];

  switch (key) {
    case 'xishen': return directions.xishen;
    case 'fushen': return directions.fushen;
    case 'caishen': return directions.caishen;
    case 'guishen': return directions.guishen;
    default: return '正北';
  }
}

const dayGanZhi = getDayGanZhiAccurate(2026, 5, 6);
const dayGan = dayGanZhi[0];
const dayZhi = dayGanZhi[1];

console.log('=== 2026年5月6日 详细验证 ===');
console.log('日干支:', dayGanZhi);
console.log('dayGan:', dayGan, 'dayZhi:', dayZhi);
console.log('ganIndex:', TIANGAN.indexOf(dayGan), 'zhiIndex:', DIZHI.indexOf(dayZhi));
console.log('');
console.log('吉神宜趋:', getJiShenList(dayGan, dayZhi));
console.log('凶神宜忌:', getXiongShenList(dayGan, dayZhi));
console.log('');
console.log('=== 参考网站数据 ===');
console.log('吉神宜趋: 月德、天恩、时德、阴德、福生、司命 (6项)');
console.log('凶神宜忌: 月煞、月虚、血支、五虚、天牢 (5项)');
console.log('');
console.log('=== 吉神方位 ===');
console.log('喜神:', getJiShenDirection('xishen', dayGan, dayZhi));
console.log('财神:', getJiShenDirection('caishen', dayGan, dayZhi));
console.log('福神:', getJiShenDirection('fushen', dayGan, dayZhi));
console.log('贵神:', getJiShenDirection('guishen', dayGan, dayZhi));
console.log('');
console.log('=== 参考网站数据 ===');
console.log('喜神: 正南');
console.log('财神: 正南');
console.log('福神: 西北');
console.log('贵神: 西南');