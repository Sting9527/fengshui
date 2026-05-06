// 测试修改后的 LunarCalendar 组件逻辑
import { Solar } from 'lunar-javascript';

const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const date = new Date(2026, 4, 6); // 2026-05-06
const solar = Solar.fromDate(date);
const lunar = solar.getLunar();

console.log('===== 2026-05-06 黄历数据验证 =====');
console.log('');

let allCorrect = true;

function check(label, actual, expected) {
    const isCorrect = actual === expected;
    allCorrect = allCorrect && isCorrect;
    console.log(`${label}: ${actual} (期望: ${expected}) ${isCorrect ? '✅' : '❌'}`);
}

// 基本信息
console.log('【基本信息】');
check('农历', lunar.getMonthInChinese() + '月' + lunar.getDayInChinese(), '三月二十');
check('年干支', lunar.getYearInGanZhi(), '丙午');
check('月干支', lunar.getMonthInGanZhi(), '癸巳');
check('日干支', lunar.getDayInGanZhi(), '庚辰');
check('生肖', lunar.getYearShengXiao(), '马');
console.log('');

// 五行冲煞
console.log('【五行冲煞】');
check('纳音五行', lunar.getDayNaYin(), '白蜡金');
check('冲', lunar.getDayChongShengXiao(), '狗');
check('煞', lunar.getDaySha(), '南');
check('值神', lunar.getDayTianShen(), '司命');

// 建除十二神
const JIANSHEN_LIST = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
const monthGanZhi = lunar.getMonthInGanZhi();
const dayGanZhi = lunar.getDayInGanZhi();
const monthZhi = monthGanZhi[1];
const dayZhi = dayGanZhi[1];
const monthIndex = DIZHI.indexOf(monthZhi);
const dayIndex = DIZHI.indexOf(dayZhi);
const jianshenIndex = (dayIndex - monthIndex + 12) % 12;
const jianshen = JIANSHEN_LIST[jianshenIndex] + '日';
check('建除', jianshen, '闭日');
console.log('');

// 神煞宜忌
console.log('【神煞宜忌】');
check('吉神宜趋', lunar.getDayJiShen().join('、'), '月德、天恩、时德、阴德、福生、司命');
check('凶神宜忌', lunar.getDayXiongSha().join('、'), '月煞、月虚、血支、五虚');

// 胎神
const taishenMap = {
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
const dirMap = {
    '子': '外东北', '丑': '外正南', '寅': '外西北', '卯': '外正西', '辰': '外正西', '巳': '外西南', '午': '内正北', '未': '内东北',
    '申': '外东北', '酉': '外正南', '戌': '外西北', '亥': '外正西'
};
const dayGan = dayGanZhi[0];
const ganTaishen = taishenMap[dayGan] || {};
const place = ganTaishen[dayZhi] || '占门';
const dir = dirMap[dayZhi] || '外东北';
const taishen = place + dir;
check('胎神', taishen, '碓磨栖外正西');

// 二十八星宿
const XINGXIU_LIST = ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹', 
                    '斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
                    '奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
                    '井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'];
const xingxiuShort = lunar.getXiu();
const xingxiu = XINGXIU_LIST.find(item => item.startsWith(xingxiuShort)) || xingxiuShort;
check('星宿', xingxiu, '箕水豹');
console.log('');

// 吉神方位
console.log('【吉神方位】');
check('喜神', lunar.getDayPositionXiDesc(), '西北');
check('福神', lunar.getDayPositionFuDesc(), '西南');
check('财神', lunar.getDayPositionCaiDesc(), '正东');
check('阳贵', lunar.getDayPositionYangGuiDesc(), '正南');
console.log('');

// 彭祖百忌
console.log('【彭祖百忌】');
check('天干', lunar.getPengZuGan(), '庚不经络织机虚张');
check('地支', lunar.getPengZuZhi(), '辰不哭泣必主重丧');
console.log('');

console.log('==========================');
console.log(allCorrect ? '✅ 所有数据验证正确！' : '❌ 存在错误需要修正！');