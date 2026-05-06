// 测试修改后的 LunarCalendar 组件逻辑
import { Solar } from 'lunar-javascript';

const date = new Date(2026, 4, 6); // 2026-05-06
const solar = Solar.fromDate(date);
const lunar = solar.getLunar();

console.log('===== 2026-05-06 黄历数据验证 =====');
console.log('');

// 基本信息
console.log('【基本信息】');
console.log('阳历:', `${solar.getYear()}-${solar.getMonth()}-${solar.getDay()}`);
console.log('农历:', lunar.getMonthInChinese() + lunar.getDayInChinese(), '(期望: 三月二十)');
console.log('年干支:', lunar.getYearInGanZhi(), '(期望: 丙午)');
console.log('月干支:', lunar.getMonthInGanZhi(), '(期望: 癸巳)');
console.log('日干支:', lunar.getDayInGanZhi(), '(期望: 庚辰)');
console.log('生肖:', lunar.getYearShengXiao(), '(期望: 马)');
console.log('');

// 五行冲煞
console.log('【五行冲煞】');
console.log('纳音五行:', lunar.getDayNaYin(), '(期望: 白蜡金)');
console.log('冲:', lunar.getDayChongShengXiao(), '(期望: 狗)');
console.log('煞:', lunar.getDaySha(), '(期望: 南)');
console.log('值神:', lunar.getDayTianShen(), '(期望: 司命)');
console.log('建除:', lunar.getDayJianChu() + '日', '(期望: 闭日)');
console.log('');

// 神煞宜忌
console.log('【神煞宜忌】');
console.log('宜:', lunar.getDayYi().join('、'));
console.log('忌:', lunar.getDayJi().join('、'));
console.log('吉神宜趋:', lunar.getDayJiShen().join('、'));
console.log('凶神宜忌:', lunar.getDayXiongSha().join('、'));
console.log('胎神:', lunar.getDayTaiShen(), '(期望: 碓磨栖外正西)');
console.log('星宿:', lunar.getXiu(), '(期望: 箕水豹)');
console.log('');

// 吉神方位
console.log('【吉神方位】');
console.log('喜神:', lunar.getDayPositionXiDesc(), '(期望: 西北)');
console.log('福神:', lunar.getDayPositionFuDesc(), '(期望: 西南)');
console.log('财神:', lunar.getDayPositionCaiDesc(), '(期望: 正东)');
console.log('阳贵:', lunar.getDayPositionYangGuiDesc(), '(期望: 正南)');
console.log('');

// 彭祖百忌
console.log('【彭祖百忌】');
console.log('天干:', lunar.getPengZuGan(), '(期望: 庚不经络织机虚张)');
console.log('地支:', lunar.getPengZuZhi(), '(期望: 辰不哭泣必主重丧)');
console.log('');

// 时辰吉凶
console.log('【时辰吉凶】');
const times = lunar.getTimes();
times.forEach((time, index) => {
    console.log(`${time.getGanZhi().substring(1)}时: ${time.getLuck()}`);
});