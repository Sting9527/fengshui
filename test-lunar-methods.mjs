// 检查 lunar 对象可用方法
import { Solar } from 'lunar-javascript';

const solar = Solar.fromYmdHms(1990, 1, 1, 0, 0, 0);
const lunar = solar.getLunar();

console.log('Lunar 对象可用方法:');
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(lunar)).filter(name => typeof lunar[name] === 'function'));