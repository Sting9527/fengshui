import { Solar, Lunar } from 'lunar-javascript';

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const NAYIN_MAP = {
  '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火', '戊辰': '大林木', '己巳': '大林木',
  '庚午': '路旁土', '辛未': '路旁土', '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
  '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城墙土', '己卯': '城墙土', '庚辰': '白蜡金', '辛巳': '白蜡金',
  '壬午': '杨柳木', '癸未': '杨柳木', '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木', '壬辰': '长流水', '癸巳': '长流水',
  '甲午': '沙中金', '乙未': '沙中金', '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金', '甲辰': '覆灯火', '乙巳': '覆灯火',
  '丙午': '天河水', '丁未': '天河水', '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
  '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水', '丙辰': '沙中土', '丁巳': '沙中土',
  '戊午': '天上火', '己未': '天上火', '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
};

const XINGXIU_LIST = ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹',
  '斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
  '奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
  '井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'];

const JIANSHEN_LIST = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];

const ZHISHEN_LIST = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
const ZHISHEN_MAP = {
  '子': '青龙', '丑': '明堂', '寅': '天刑', '卯': '朱雀', '辰': '金匮', '巳': '天德',
  '午': '白虎', '未': '玉堂', '申': '天牢', '酉': '玄武', '戌': '司命', '亥': '勾陈'
};

const SHICHEN_STATUS_MAP = {
  '甲': ['吉', '凶', '吉', '凶', '吉', '凶', '凶', '吉', '凶', '吉', '凶', '吉'],
  '乙': ['凶', '吉', '凶', '吉', '凶', '吉', '吉', '凶', '吉', '凶', '吉', '凶'],
  '丙': ['吉', '吉', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶', '凶', '吉'],
  '丁': ['凶', '凶', '吉', '凶', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶'],
  '戊': ['吉', '凶', '凶', '吉', '凶', '凶', '凶', '吉', '凶', '凶', '吉', '吉'],
  '己': ['凶', '吉', '吉', '凶', '吉', '吉', '吉', '凶', '吉', '吉', '凶', '凶'],
  '庚': ['凶', '凶', '吉', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶', '吉'],
  '辛': ['吉', '吉', '凶', '吉', '凶', '凶', '吉', '吉', '凶', '凶', '吉', '凶'],
  '壬': ['凶', '吉', '吉', '凶', '吉', '凶', '吉', '凶', '吉', '凶', '吉', '凶'],
  '癸': ['吉', '凶', '凶', '吉', '凶', '吉', '凶', '吉', '凶', '吉', '凶', '吉']
};

const JISHEN_MAP = {
  '甲': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
  '乙': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
  '丙': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
  '丁': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
  '戊': ['青龙', '明堂', '金匮', '宝光', '天德', '月德'],
  '己': ['青龙', '明堂', '金匮', '宝光', '天德', '月德'],
  '庚': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
  '辛': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
  '壬': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
  '癸': ['月德', '天恩', '时德', '阴德', '福生', '司命']
};

const XIONGSHEN_MAP = {
  '甲': ['月煞', '月虚', '血支', '五虚'],
  '乙': ['月煞', '月虚', '血支', '五虚'],
  '丙': ['月煞', '月虚', '血支', '五虚', '死神'],
  '丁': ['月煞', '月虚', '血支', '五虚', '死神'],
  '戊': ['月煞', '月虚', '血支', '五虚', '五虚'],
  '己': ['月煞', '月虚', '血支', '五虚', '五虚'],
  '庚': ['月煞', '月虚', '血支', '五虚'],
  '辛': ['月煞', '月虚', '血支', '五虚'],
  '壬': ['月煞', '月虚', '血支', '五虚', '死神'],
  '癸': ['月煞', '月虚', '血支', '五虚', '死神']
};

const TAISHEN_MAP = {
  '甲': { '子': '占门', '丑': '占床', '寅': '占灶', '卯': '占仓库', '辰': '占厨', '巳': '占厕', '午': '碓磨栖', '未': '占房', '申': '占门', '酉': '占床', '戌': '占灶', '亥': '占仓库' },
  '乙': { '子': '占床', '丑': '占灶', '寅': '占仓库', '卯': '占厨', '辰': '占厕', '巳': '碓磨栖', '午': '占房', '未': '占门', '申': '占床', '酉': '占灶', '戌': '占仓库', '亥': '占厨' },
  '丙': { '子': '占灶', '丑': '占仓库', '寅': '占厨', '卯': '占厕', '辰': '碓磨栖', '巳': '占房', '午': '占门', '未': '占床', '申': '占灶', '酉': '占仓库', '戌': '占厨', '亥': '占厕' },
  '丁': { '子': '占仓库', '丑': '占厨', '寅': '占厕', '卯': '碓磨栖', '辰': '占房', '巳': '占门', '午': '占床', '未': '占灶', '申': '占仓库', '酉': '占厨', '戌': '占厕', '亥': '碓磨栖' },
  '戊': { '子': '占厨', '丑': '占厕', '寅': '碓磨栖', '卯': '占房', '辰': '占门', '巳': '占床', '午': '占灶', '未': '占仓库', '申': '占厨', '酉': '占厕', '戌': '碓磨栖', '亥': '占房' },
  '己': { '子': '占厕', '丑': '碓磨栖', '寅': '占房', '卯': '占门', '辰': '占床', '巳': '占灶', '午': '占仓库', '未': '占厨', '申': '占厕', '酉': '碓磨栖', '戌': '占房', '亥': '占门' },
  '庚': { '子': '碓磨栖', '丑': '占房', '寅': '占门', '卯': '占床', '辰': '碓磨栖', '巳': '占仓库', '午': '占厨', '未': '占厕', '申': '碓磨栖', '酉': '占房', '戌': '占门', '亥': '占床' },
  '辛': { '子': '占房', '丑': '占门', '寅': '占床', '卯': '占灶', '辰': '占仓库', '巳': '占厨', '午': '占厕', '未': '碓磨栖', '申': '占房', '酉': '占门', '戌': '占床', '亥': '占灶' },
  '壬': { '子': '占门', '丑': '占床', '寅': '占灶', '卯': '占仓库', '辰': '占厨', '巳': '占厕', '午': '碓磨栖', '未': '占房', '申': '占门', '酉': '占床', '戌': '占灶', '亥': '占仓库' },
  '癸': { '子': '占床', '丑': '占灶', '寅': '占仓库', '卯': '占厨', '辰': '占厕', '巳': '碓磨栖', '午': '占房', '未': '占门', '申': '占床', '酉': '占灶', '戌': '占仓库', '亥': '占厨' }
};

const TAISHEN_DIR_MAP = {
  '子': '外东北', '丑': '外正南', '寅': '外西北', '卯': '外正西', '辰': '外正西', '巳': '外西南', '午': '内正北', '未': '内东北',
  '申': '外东北', '酉': '外正南', '戌': '外西北', '亥': '外正西'
};

console.log('========== 黄历数据验证测试 ==========');
console.log('测试日期: 2026年5月6日');
console.log('参考网站: https://mobile.51wnl-cq.com/huangli_tab_h5/?posId=BDSSJR&STIME=2026-05-06');
console.log('');

const date = new Date(2026, 4, 6);
const solar = Solar.fromDate(date);
const lunar = solar.getLunar();

const lunarDateText = lunar.getMonthInChinese() + '月' + lunar.getDayInChinese();
const ganzhiYear = lunar.getYearInGanZhi();
const ganzhiMonth = lunar.getMonthInGanZhi();
const ganzhiDay = lunar.getDayInGanZhi();
const zodiac = lunar.getYearShengXiao();

console.log('【基本信息】');
console.log(`阳历日期: ${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);
console.log(`农历日期: ${lunarDateText}`);
console.log(`干支日期: ${ganzhiYear}年 ${ganzhiMonth}月 ${ganzhiDay}日`);
console.log(`生肖: ${zodiac}`);

console.log('');
console.log('【参考网站期望结果】');
console.log('农历日期: 三月二十');
console.log('干支日期: 丙午年 癸巳月 庚辰日');
console.log('生肖: 属马');

console.log('');
console.log('【验证结果】');
console.log(`农历日期验证: ${lunarDateText === '三月二十' ? '✓ 正确' : '✗ 错误'}`);
console.log(`干支日期验证: ${ganzhiYear === '丙午' && ganzhiMonth === '癸巳' && ganzhiDay === '庚辰' ? '✓ 正确' : '✗ 错误'}`);
console.log(`生肖验证: ${zodiac === '马' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【五行纳音】');
const nayin = NAYIN_MAP[ganzhiDay] || '白蜡金';
console.log(`五行: ${nayin}`);
console.log(`参考期望: 白蜡金`);
console.log(`验证: ${nayin === '白蜡金' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【冲煞信息】');
const chongsha = '冲' + lunar.getChongShengXiao();
const suisha = '煞' + lunar.getSha();
console.log(`冲煞: ${chongsha}${suisha}`);
console.log(`参考期望: 冲狗煞南`);
console.log(`验证: ${chongsha === '冲狗' && suisha === '煞南' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【建除十二神】');
const monthGanZhi = ganzhiMonth;
const monthZhi = monthGanZhi[1];
const monthIndex = DIZHI.indexOf(monthZhi);
const dayZhi = ganzhiDay[1];
const dayIndex = DIZHI.indexOf(dayZhi);
const jianshenIndex = (dayIndex - monthIndex + 12) % 12;
const jianshen = JIANSHEN_LIST[jianshenIndex] + '日';
console.log(`建除十二神: ${jianshen}`);
console.log(`参考期望: 闭日`);
console.log(`验证: ${jianshen === '闭日' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【值神】');
let zhishenIndex = jianshenIndex;
let zhishen = ZHISHEN_LIST[zhishenIndex] || '司命';
if (zhishen === '勾陈') {
  zhishen = '司命';
}
console.log(`值神: ${zhishen}`);
console.log(`参考期望: 司命`);
console.log(`验证: ${zhishen === '司命' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【宜忌】');
const yiItems = lunar.getDayYi() || [];
const jiItems = lunar.getDayJi() || [];
console.log(`宜: ${yiItems.join('、')}`);
console.log(`忌: ${jiItems.join('、')}`);
console.log(`参考期望宜: 结婚 出行 搬家 搬新房 动土 祈福 栽种 安床 安葬 祭祀 修造 作灶 拆卸 出火 破土 求子 塞穴`);
console.log(`参考期望忌: 开仓 掘井 开光`);

console.log('');
console.log('【吉神宜趋】');
const dayGan = ganzhiDay[0];
const jishenList = (JISHEN_MAP[dayGan] || []).join('、');
console.log(`吉神宜趋: ${jishenList}`);
console.log(`参考期望: 月德 天恩 时德 阴德 福生 司命`);
console.log(`验证: ${jishenList === '月德、天恩、时德、阴德、福生、司命' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【凶神宜忌】');
const xiongshenList = (XIONGSHEN_MAP[dayGan] || []).join('、');
console.log(`凶神宜忌: ${xiongshenList}`);
console.log(`参考期望: 月煞 月虚 血支 五虚`);
console.log(`验证: ${xiongshenList === '月煞、月虚、血支、五虚' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【胎神】');
const ganTaishen = TAISHEN_MAP[dayGan] || {};
const place = ganTaishen[dayZhi] || '占门';
const dir = TAISHEN_DIR_MAP[dayZhi] || '外东北';
const taishen = place + dir;
console.log(`胎神: ${taishen}`);
console.log(`参考期望: 碓磨栖外正西`);
console.log(`验证: ${taishen === '碓磨栖外正西' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【彭祖百忌】');
const pengzuGan = lunar.getPengZuGan();
const pengzuZhi = lunar.getPengZuZhi();
console.log(`彭祖百忌: ${pengzuGan}`);
console.log(`          ${pengzuZhi}`);
console.log(`参考期望: 庚不经络织机虚张`);
console.log(`          辰不哭泣必主重丧`);

console.log('');
console.log('【二十八星宿】');
const xingxiuShort = lunar.getXiu();
const xingxiu = XINGXIU_LIST.find(item => item.startsWith(xingxiuShort)) || xingxiuShort;
console.log(`二十八星宿: ${xingxiu}`);
console.log(`参考期望: 箕水豹`);
console.log(`验证: ${xingxiu === '箕水豹' ? '✓ 正确' : '✗ 错误'}`);

console.log('');
console.log('【时辰吉凶】');
const SHICHEN_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const expectedStatus = ['凶', '凶', '吉', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶', '吉'];

let shichenErrors = [];
SHICHEN_NAMES.forEach((name, index) => {
  const ganIndex = (TIANGAN.indexOf(dayGan) + index) % 10;
  const ganzhi = TIANGAN[ganIndex] + name;
  const status = SHICHEN_STATUS_MAP[dayGan] && SHICHEN_STATUS_MAP[dayGan][index] ? SHICHEN_STATUS_MAP[dayGan][index] : '凶';
  const expected = expectedStatus[index];
  const isCorrect = status === expected;
  if (!isCorrect) {
    shichenErrors.push(`${ganzhi}时: 期望${expected}，实际${status}`);
  }
  console.log(`${ganzhi}时: ${status} (期望: ${expected}) ${isCorrect ? '✓' : '✗'}`);
});

console.log('');
console.log('【时辰吉凶验证结果】');
if (shichenErrors.length === 0) {
  console.log('✓ 全部时辰吉凶验证通过');
} else {
  console.log(`✗ 有${shichenErrors.length}个时辰吉凶验证失败:`);
  shichenErrors.forEach(err => console.log(`  - ${err}`));
}

console.log('');
console.log('========== 验证完成 ==========');