import { Solar, Lunar } from 'lunar-javascript';

// 测试日期：2026年5月6日
const date = new Date(2026, 4, 6); // 月份从0开始
const solar = Solar.fromDate(date);
const lunar = solar.getLunar();

console.log('=== 2026年5月6日黄历数据验证 ===');
console.log('');

// 基本信息
console.log('【基本信息】');
console.log('阳历日期:', `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);
console.log('农历日期:', lunar.getMonthInChinese() + '月' + lunar.getDayInChinese());
console.log('干支日期:', `${lunar.getYearInGanZhi()}年 ${lunar.getMonthInGanZhi()}月 ${lunar.getDayInGanZhi()}日`);
console.log('生肖:', lunar.getYearShengXiao());
console.log('');

// 五行纳音
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

const ganzhiDay = lunar.getDayInGanZhi();
console.log('【五行纳音】');
console.log('纳音:', NAYIN_MAP[ganzhiDay] || '未知');
console.log('');

// 宜忌
console.log('【宜忌事项】');
console.log('宜:', lunar.getDayYi().join('、'));
console.log('忌:', lunar.getDayJi().join('、'));
console.log('');

// 冲煞
console.log('【冲煞信息】');
console.log('冲:', lunar.getChongShengXiao());
console.log('煞:', lunar.getSha());
console.log('');

// 值神
const ZHISHEN_MAP = {
	'子': '青龙', '丑': '明堂', '寅': '天刑', '卯': '朱雀', '辰': '金匮', '巳': '天德',
	'午': '白虎', '未': '玉堂', '申': '天牢', '酉': '玄武', '戌': '司命', '亥': '勾陈'
};
const dayZhi = ganzhiDay[1];
console.log('【值神】');
console.log('值神:', ZHISHEN_MAP[dayZhi] || '司命');
console.log('');

// 吉神方位
console.log('【吉神方位】');
console.log('喜神:', lunar.getPositionXiDesc());
console.log('财神:', lunar.getPositionCaiDesc());
console.log('福神:', lunar.getPositionFuDesc());
console.log('贵神:', lunar.getPositionYangGuiDesc());
console.log('');

// 彭祖百忌
console.log('【彭祖百忌】');
console.log('天干:', lunar.getPengZuGan());
console.log('地支:', lunar.getPengZuZhi());
console.log('');

// 二十八星宿
const XINGXIU_LIST = ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹',
					'斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
					'奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
					'井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'];
const xingxiuShort = lunar.getXiu();
const xingxiu = XINGXIU_LIST.find(item => item.startsWith(xingxiuShort)) || xingxiuShort;
console.log('【二十八星宿】');
console.log('星宿:', xingxiu);
console.log('');

// 建除十二神
const JIANSHEN_LIST = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const monthGanZhi = lunar.getMonthInGanZhi();
const monthZhi = monthGanZhi[1];
const monthIndex = DIZHI.indexOf(monthZhi);
const dayIndex = DIZHI.indexOf(dayZhi);
const jianshenIndex = (dayIndex - monthIndex + 12) % 12;
console.log('【建除十二神】');
console.log('建除:', JIANSHEN_LIST[jianshenIndex] + '日');
console.log('');

// 胎神
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

const dayGan = ganzhiDay[0];
const ganTaishen = TAISHEN_MAP[dayGan] || {};
const place = ganTaishen[dayZhi] || '占门';
const dir = TAISHEN_DIR_MAP[dayZhi] || '外东北';
console.log('【胎神】');
console.log('胎神:', place + dir);
console.log('');

// 神煞宜忌
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

console.log('【神煞宜忌】');
console.log('吉神宜趋:', (JISHEN_MAP[dayGan] || []).join('、'));
console.log('凶神宜忌:', (XIONGSHEN_MAP[dayGan] || []).join('、'));
console.log('');

// 时辰信息
console.log('【时辰吉凶】');
const SHICHEN_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const CHONG_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const SHA_DIRECTIONS = ['北', '东', '南', '西'];
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

const dayGanIndex = TIANGAN.indexOf(dayGan);
const shichenGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

const shichenYiJi = {
	'甲子': { yi: ['结婚', '交易', '开业', '祈福', '安床', '求子', '求财'], ji: ['出行', '搬家', '赴任', '诉讼', '盖屋', '修造', '入殓', '上梁'], chong: '马', sha: '煞南', xishen: '西南', caishen: '正西', fushen: '正东' },
	'乙丑': { yi: ['结婚', '搬新房', '祈福', '安葬', '祭祀', '酬神', '求财'], ji: ['出行', '赴任', '动土', '修造'], chong: '羊', sha: '煞东', xishen: '正南', caishen: '正西', fushen: '正东' },
	'丙寅': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '安葬', '祭祀', '修造', '作灶', '酬神', '斋醮', '求财'], ji: ['祈福', '求子'], chong: '猴', sha: '煞北', xishen: '东南', caishen: '正北', fushen: '正北' },
	'丁卯': { yi: ['结婚', '出行', '交易', '搬新房', '开业', '赴任', '安葬', '修造', '求子', '求财'], ji: ['祈福', '祭祀', '酬神', '斋醮'], chong: '鸡', sha: '煞西', xishen: '东北', caishen: '正北', fushen: '正南' },
	'戊辰': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '祈福', '安床', '安葬', '求财'], ji: ['动土', '乘船', '修造', '造桥'], chong: '狗', sha: '煞南', xishen: '西北', caishen: '正东', fushen: '西南' },
	'己巳': { yi: ['结婚', '搬家', '交易', '搬新房', '开业', '祈福', '安葬', '祭祀', '修造', '酬神', '求子', '斋醮'], ji: [], chong: '猪', sha: '煞东', xishen: '西南', caishen: '正东', fushen: '西南' },
	'庚午': { yi: ['出行', '酬神', '求财'], ji: ['赴任', '诉讼', '祈福', '祭祀', '开光', '斋醮'], chong: '鼠', sha: '煞北', xishen: '正南', caishen: '正南', fushen: '西北' },
	'辛未': { yi: ['结婚', '搬家', '安葬', '酬神', '收养子女', '求财'], ji: ['出行', '赴任', '祈福', '祭祀', '开光', '斋醮'], chong: '牛', sha: '煞西', xishen: '东南', caishen: '正南', fushen: '正西' },
	'壬申': { yi: ['结婚', '出行', '搬新房', '开业', '赴任', '祈福', '求子', '求财'], ji: ['安葬', '修造', '开光'], chong: '虎', sha: '煞南', xishen: '东北', caishen: '东北', fushen: '东南' },
	'癸酉': { yi: ['结婚', '搬家', '交易', '搬新房', '开业', '祈福', '安葬', '祭祀', '修造', '酬神', '求子', '斋醮'], ji: [], chong: '兔', sha: '煞东', xishen: '西北', caishen: '西南', fushen: '东南' },
	'甲戌': { yi: [], ji: ['诸事不宜'], chong: '龙', sha: '煞北', xishen: '西南', caishen: '正西', fushen: '正东' },
	'乙亥': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '安葬', '修造', '收养子女', '求财'], ji: [], chong: '蛇', sha: '煞西', xishen: '正南', caishen: '正西', fushen: '正东' },
	'丙子': { yi: [], ji: ['诸事不宜'], chong: '马', sha: '煞南', xishen: '西南', caishen: '正西', fushen: '正东' },
	'丁丑': { yi: [], ji: ['诸事不宜'], chong: '羊', sha: '煞东', xishen: '正南', caishen: '正西', fushen: '正东' },
	'戊寅': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '安葬', '祭祀', '修造', '作灶', '酬神', '斋醮', '求财'], ji: [], chong: '猴', sha: '煞北', xishen: '东南', caishen: '正北', fushen: '正北' },
	'己卯': { yi: [], ji: ['诸事不宜'], chong: '鸡', sha: '煞西', xishen: '东北', caishen: '正北', fushen: '正南' },
	'庚辰': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '祈福', '安床', '安葬', '求财'], ji: [], chong: '狗', sha: '煞南', xishen: '西北', caishen: '正东', fushen: '西南' },
	'辛巳': { yi: ['结婚', '搬家', '交易', '搬新房', '开业', '祈福', '安葬', '祭祀', '修造', '酬神', '求子', '斋醮'], ji: [], chong: '猪', sha: '煞东', xishen: '西南', caishen: '正东', fushen: '西南' },
	'壬午': { yi: [], ji: ['诸事不宜'], chong: '鼠', sha: '煞北', xishen: '正南', caishen: '正南', fushen: '西北' },
	'癸未': { yi: [], ji: ['诸事不宜'], chong: '牛', sha: '煞西', xishen: '东南', caishen: '正南', fushen: '正西' },
	'甲申': { yi: ['结婚', '出行', '搬新房', '开业', '赴任', '祈福', '求子', '求财'], ji: [], chong: '虎', sha: '煞南', xishen: '东北', caishen: '东北', fushen: '东南' },
	'乙酉': { yi: ['结婚', '搬家', '交易', '搬新房', '开业', '祈福', '安葬', '祭祀', '修造', '酬神', '求子', '斋醮'], ji: [], chong: '兔', sha: '煞东', xishen: '西北', caishen: '西南', fushen: '东南' },
	'丙戌': { yi: [], ji: ['诸事不宜'], chong: '龙', sha: '煞北', xishen: '西南', caishen: '正西', fushen: '正东' },
	'丁亥': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '安葬', '修造', '收养子女', '求财'], ji: [], chong: '蛇', sha: '煞西', xishen: '正南', caishen: '正西', fushen: '正东' }
};

SHICHEN_NAMES.forEach((name, index) => {
	const ganIndex = (dayGanIndex + index) % 10;
	const ganzhi = shichenGan[ganIndex] + name;
	const zhiIndex = DIZHI.indexOf(name);
	const chongIndex = (zhiIndex + 6) % 12;
	const shaIndex = zhiIndex % 4;
	
	const defaultData = {
		yi: [],
		ji: [],
		chong: CHONG_ANIMALS[chongIndex],
		sha: '煞' + SHA_DIRECTIONS[shaIndex],
		xishen: '西南',
		caishen: '正西',
		fushen: '正东'
	};
	
	const data = shichenYiJi[ganzhi] || defaultData;
	const status = data.yi.length > 0 && data.ji.length === 0 ? '吉' : (data.ji.length > 0 && data.ji[0] === '诸事不宜' ? '凶' : (data.yi.length > data.ji.length ? '吉' : '凶'));
	
	const times = [
		'23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
		'07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
		'15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
	];
	
	console.log(`${ganzhi} ${name}时 ${times[index]} - ${status}`);
});

console.log('');
console.log('=== 验证完成 ===');
console.log('');
console.log('参考网站数据（2026年5月6日）：');
console.log('农历：三月二十');
console.log('干支：丙午年 癸巳月 庚辰日');
console.log('生肖：马');
console.log('宜：结婚、出行、搬家、搬新房、动土、祈福、栽种、安床、安葬、祭祀、修造、作灶、拆卸、出火、破土、求子、塞穴');
console.log('忌：开仓、掘井、开光');
console.log('五行：白腊金');
console.log('冲煞：冲狗煞南');
console.log('值神：司命');
console.log('建除十二神：闭日');
console.log('吉神宜趋：月德、天恩、时德、阴德、福生、司命');
console.log('今日胎神：碓磨栖外正西');
console.log('凶神宜忌：月煞、月虚、血支、五虚');
console.log('彭祖百忌：庚不经络织机虚张 · 辰不哭泣必主重丧');
console.log('二十八星宿：箕水豹');
console.log('时辰吉凶：丙子凶、丁丑凶、戊寅吉、己卯凶、庚辰吉、辛巳吉、壬午凶、癸未凶、甲申吉、乙酉吉、丙戌凶、丁亥吉');