// 八字排盘最终测试
import { Solar } from 'lunar-javascript';

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

const getNayin = (gan, zhi) => {
	for (const [name, pairs] of Object.entries(NAYIN)) {
		if (pairs.includes(gan + zhi)) return name;
	}
	return '';
};

console.log('===== 八字排盘测试 =====');
console.log('');

// 测试案例：1990年1月1日 0时
const solar = Solar.fromYmdHms(1990, 1, 1, 0, 0, 0);
const lunar = solar.getLunar();

console.log('测试日期: 1990年1月1日 0时');
console.log('');

const yearGan = lunar.getYearGan();
const yearZhi = lunar.getYearZhi();
const monthGan = lunar.getMonthGan();
const monthZhi = lunar.getMonthZhi();
const dayGan = lunar.getDayGan();
const dayZhi = lunar.getDayZhi();
const hourGan = lunar.getTimeGan();
const hourZhi = lunar.getTimeZhi();

console.log('【四柱八字】');
console.log('年柱:', yearGan + yearZhi, '-', getNayin(yearGan, yearZhi));
console.log('月柱:', monthGan + monthZhi, '-', getNayin(monthGan, monthZhi));
console.log('日柱:', dayGan + dayZhi, '-', getNayin(dayGan, dayZhi));
console.log('时柱:', hourGan + hourZhi, '-', getNayin(hourGan, hourZhi));
console.log('');

console.log('【生肖】');
console.log('年生肖:', lunar.getYearShengXiao());
console.log('月生肖:', lunar.getMonthShengXiao());
console.log('日生肖:', lunar.getDayShengXiao());
console.log('时生肖:', lunar.getTimeShengXiao());
console.log('');

console.log('【命局信息】');
console.log('旬空:', lunar.getDayXunKong());
console.log('十神:', lunar.getBaZiShiShenGan());
console.log('地支刑:', lunar.getZhiXing());
console.log('冲:', lunar.getChong());
console.log('');

console.log('===== 测试完成 =====');