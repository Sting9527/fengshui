// 测试 lunar 库的使用
const { Solar } = require('lunar-javascript');

// 测试 2026-05-06
const date = new Date(2026, 4, 6); // 注意月份从0开始
const solar = Solar.fromDate(date);
const lunar = solar.getLunar();

console.log('===== 2026-05-06 黄历数据 =====');
console.log('');

// 基本信息
console.log('【基本信息】');
console.log('阳历:', `${solar.getYear()}-${solar.getMonth()}-${solar.getDay()}`);
console.log('农历:', `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`);
console.log('年干支:', lunar.getYearInGanZhi());
console.log('月干支:', lunar.getMonthInGanZhi());
console.log('日干支:', lunar.getDayInGanZhi());
console.log('生肖:', lunar.getYearShengXiao());
console.log('');

// 五行冲煞
console.log('【五行冲煞】');
console.log('纳音五行:', lunar.getDayNaYin());
console.log('冲煞:', `冲${lunar.getDayChongShengXiao()}煞${lunar.getDayShaDesc()}`);
console.log('值神:', lunar.getDayTianShen());
console.log('建除:', lunar.getDayJianChu());
console.log('');

// 神煞宜忌
console.log('【神煞宜忌】');
console.log('宜:', lunar.getDayYi().join('、'));
console.log('忌:', lunar.getDayJi().join('、'));
console.log('吉神宜趋:', lunar.getDayJiShen().join('、'));
console.log('凶神宜忌:', lunar.getDayXiongSha().join('、'));
console.log('胎神:', lunar.getDayTaiShen());
console.log('星宿:', lunar.getXiu());
console.log('');

// 吉神方位
console.log('【吉神方位】');
console.log('喜神:', lunar.getDayPositionXiDesc());
console.log('福神:', lunar.getDayPositionFuDesc());
console.log('财神:', lunar.getDayPositionCaiDesc());
console.log('阳贵:', lunar.getDayPositionYangGuiDesc());
console.log('阴贵:', lunar.getDayPositionYinGuiDesc());
console.log('');

// 彭祖百忌
console.log('【彭祖百忌】');
console.log('天干:', lunar.getPengZuGan());
console.log('地支:', lunar.getPengZuZhi());
console.log('');

// 时辰
console.log('【时辰吉凶】');
const times = lunar.getTimes();
times.forEach((time, index) => {
    console.log(`${time.getGanZhi()} ${time.getShengXiao()}时: ${time.getLuck()}`);
});