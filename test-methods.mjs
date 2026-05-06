// 测试 lunar-javascript 库的方法返回值
import { Solar } from 'lunar-javascript';

const date = new Date(2026, 4, 6); // 2026-05-06
const solar = Solar.fromDate(date);
const lunar = solar.getLunar();

console.log('===== lunar-javascript 方法返回值测试 =====');
console.log('');

// 基本信息
console.log('【基本信息】');
console.log('lunar.getMonthInChinese():', lunar.getMonthInChinese());
console.log('lunar.getDayInChinese():', lunar.getDayInChinese());
console.log('lunar.getYearInGanZhi():', lunar.getYearInGanZhi());
console.log('lunar.getMonthInGanZhi():', lunar.getMonthInGanZhi());
console.log('lunar.getDayInGanZhi():', lunar.getDayInGanZhi());
console.log('lunar.getYearShengXiao():', lunar.getYearShengXiao());
console.log('lunar.getDayNaYin():', lunar.getDayNaYin());
console.log('');

// 宜忌
console.log('【宜忌】');
console.log('lunar.getDayYi():', lunar.getDayYi());
console.log('lunar.getDayJi():', lunar.getDayJi());
console.log('');

// 时辰吉凶
console.log('【时辰吉凶】');
console.log('lunar.getTimes():', lunar.getTimes());
console.log('');

// 冲煞
console.log('【冲煞】');
console.log('lunar.getDayChongShengXiao():', lunar.getDayChongShengXiao());
console.log('lunar.getDaySha():', lunar.getDaySha());
console.log('');

// 值神
console.log('【值神】');
console.log('lunar.getDayTianShen():', lunar.getDayTianShen());
console.log('');

// 吉神方位
console.log('【吉神方位】');
console.log('lunar.getDayPositionXiDesc():', lunar.getDayPositionXiDesc());
console.log('lunar.getDayPositionFuDesc():', lunar.getDayPositionFuDesc());
console.log('lunar.getDayPositionCaiDesc():', lunar.getDayPositionCaiDesc());
console.log('lunar.getDayPositionYangGuiDesc():', lunar.getDayPositionYangGuiDesc());
console.log('');

// 彭祖百忌
console.log('【彭祖百忌】');
console.log('lunar.getPengZuGan():', lunar.getPengZuGan());
console.log('lunar.getPengZuZhi():', lunar.getPengZuZhi());
console.log('');

// 吉神宜趋、凶神宜忌
console.log('【吉神宜趋、凶神宜忌】');
console.log('lunar.getDayJiShen():', lunar.getDayJiShen());
console.log('lunar.getDayXiongSha():', lunar.getDayXiongSha());
console.log('');

// 二十八星宿
console.log('【二十八星宿】');
console.log('lunar.getXiu():', lunar.getXiu());
console.log('');

// 检查所有可用方法
console.log('【对象方法列表】');
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(lunar)).filter(m => typeof lunar[m] === 'function'));