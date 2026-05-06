// 检查 lunar 对象属性
import { Solar } from 'lunar-javascript';

const solar = Solar.fromYmdHms(1990, 1, 1, 0, 0, 0);
const lunar = solar.getLunar();

console.log('Lunar 对象属性:');
console.log(Object.keys(lunar));

console.log('\n直接输出 lunar 对象:');
console.log(lunar.toString());