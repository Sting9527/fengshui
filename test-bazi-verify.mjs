import { Solar, Lunar } from 'lunar-javascript';

console.log('========== 八字排盘验证测试 ==========');
console.log('测试日期: 2026年5月6日 13:25');
console.log('参考网站: https://6tail.cn/calendar/api.html#demo.bazi.html');
console.log('');

const year = 2026;
const month = 5;
const day = 6;
const hour = 13;
const minute = 25;

const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
const lunar = solar.getLunar();

console.log('【基本信息】');
console.log(`阳历日期: ${year}年${month}月${day}日 ${hour}:${minute}`);
console.log(`农历日期: ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`);
console.log(`生肖: ${lunar.getYearShengXiao()}`);
console.log('');

console.log('【八字四柱】');
const yearGan = lunar.getYearGan();
const yearZhi = lunar.getYearZhi();
const monthGan = lunar.getMonthGan();
const monthZhi = lunar.getMonthZhi();
const dayGan = lunar.getDayGan();
const dayZhi = lunar.getDayZhi();
const hourGan = lunar.getTimeGan();
const hourZhi = lunar.getTimeZhi();

console.log(`年柱: ${yearGan}${yearZhi}`);
console.log(`月柱: ${monthGan}${monthZhi}`);
console.log(`日柱: ${dayGan}${dayZhi}`);
console.log(`时柱: ${hourGan}${hourZhi}`);
console.log('');

const NAYIN = {
	'海中金': ['甲子', '乙丑'], '炉中火': ['丙寅', '丁卯'], '大林木': ['戊辰', '己巳'],
	'路旁土': ['庚午', '辛未'], '剑锋金': ['壬申', '癸酉'], '山头火': ['甲戌', '乙亥'],
	'涧下水': ['丙子', '丁丑'], '城头土': ['戊寅', '己卯'], '白蜡金': ['庚辰', '辛巳'],
	'杨柳木': ['壬午', '癸未'], '井泉水': ['甲申', '乙酉'], '屋上土': ['丙戌', '丁亥'],
	'霹雳火': ['戊子', '己丑'], '松柏木': ['庚寅', '辛卯'], '长流水': ['壬辰', '癸巳'],
	'砂石金': ['甲午', '乙未'], '山下火': ['丙申', '丁酉'], '平地木': ['戊戌', '己亥'],
	'壁上土': ['庚子', '辛丑'], '金箔金': ['壬寅', '癸卯'], '覆灯火': ['甲辰', '乙巳'],
	'天河水': ['丙午', '丁未'], '大驿土': ['戊申', '己酉'], '钗钏金': ['庚戌', '辛亥'],
	'桑柘木': ['壬子', '癸丑'], '大溪水': ['甲寅', '乙卯'], '砂中土': ['丙辰', '丁巳'],
	'天上火': ['戊午', '己未'], '石榴木': ['庚申', '辛酉'], '大海水': ['壬戌', '癸亥']
};

function getNayin(gan, zhi) {
	for (const [name, pairs] of Object.entries(NAYIN)) {
		if (pairs.includes(gan + zhi)) return name;
	}
	return '';
}

console.log('【纳音五行】');
console.log(`年柱纳音: ${getNayin(yearGan, yearZhi)}`);
console.log(`月柱纳音: ${getNayin(monthGan, monthZhi)}`);
console.log(`日柱纳音: ${getNayin(dayGan, dayZhi)}`);
console.log(`时柱纳音: ${getNayin(hourGan, hourZhi)}`);
console.log('');

const SHISHEN_MAP = {
	'甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '正官', '辛': '七杀', '壬': '偏印', '癸': '正印' },
	'乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '七杀', '辛': '正官', '壬': '正印', '癸': '偏印' },
	'丙': { '甲': '正印', '乙': '偏印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '正官', '癸': '七杀' },
	'丁': { '甲': '偏印', '乙': '正印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '七杀', '癸': '正官' },
	'戊': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
	'己': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
	'庚': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
	'辛': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
	'壬': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
	'癸': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' }
};

function getShiShen(riGan, gan) {
	return SHISHEN_MAP[riGan]?.[gan] || '';
}

console.log('【十神分析】');
console.log(`日主: ${dayGan}`);
console.log(`年干十神: ${getShiShen(dayGan, yearGan)}`);
console.log(`月干十神: ${getShiShen(dayGan, monthGan)}`);
console.log(`时干十神: ${getShiShen(dayGan, hourGan)}`);
console.log('');

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

function getTaiyuan(monthZhi, dayGan) {
	const nextZhi = DIZHI[(DIZHI.indexOf(monthZhi) + 2) % 12];
	const nextGanIndex = (TIANGAN.indexOf(dayGan) + 3) % 10;
	return TIANGAN[nextGanIndex] + nextZhi;
}

function getMinggong(monthZhi, hourZhi) {
	const minggongIndex = (DIZHI.indexOf(monthZhi) + DIZHI.indexOf(hourZhi) + 6) % 12;
	return TIANGAN[0] + DIZHI[minggongIndex];
}

console.log('【其他信息】');
console.log(`旬空: ${lunar.getDayXunKong()}`);
console.log(`胎元: ${getTaiyuan(monthZhi, dayGan)}`);
console.log(`命宫: ${getMinggong(monthZhi, hourZhi)}`);
console.log('');

console.log('【五行统计】');
const TIANGAN_WUXING = { '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水' };
const DIZHI_WUXING = { '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水' };

const count = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
const gans = [yearGan, monthGan, dayGan, hourGan];
const zhis = [yearZhi, monthZhi, dayZhi, hourZhi];

gans.forEach(g => { if (TIANGAN_WUXING[g]) count[TIANGAN_WUXING[g]]++; });
zhis.forEach(z => { if (DIZHI_WUXING[z]) count[DIZHI_WUXING[z]]++; });

console.log(`金: ${count['金']}个`);
console.log(`木: ${count['木']}个`);
console.log(`水: ${count['水']}个`);
console.log(`火: ${count['火']}个`);
console.log(`土: ${count['土']}个`);
console.log('');

console.log('========== 验证完成 ==========');
