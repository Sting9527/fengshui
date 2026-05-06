// 测试 lunar 库的农历转换
import { Solar } from 'lunar-javascript';

const date = new Date(2026, 4, 6); // 2026-05-06
const solar = Solar.fromDate(date);
const lunar = solar.getLunar();

console.log('===== 2026-05-06 农历验证 =====');
console.log('阳历:', `${solar.getYear()}-${solar.getMonth()}-${solar.getDay()}`);
console.log('农历:', `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`);
console.log('年干支:', lunar.getYearInGanZhi());
console.log('月干支:', lunar.getMonthInGanZhi());
console.log('日干支:', lunar.getDayInGanZhi());
console.log('生肖:', lunar.getYearShengXiao());