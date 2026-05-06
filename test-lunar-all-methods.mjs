// 检查更多 lunar 对象方法
import { Solar } from 'lunar-javascript';

const solar = Solar.fromYmdHms(1990, 1, 1, 0, 0, 0);
const lunar = solar.getLunar();

console.log('Lunar 对象所有方法:');
const methods = [];
for (const key of Object.keys(lunar)) {
    if (typeof lunar[key] === 'function') {
        methods.push(key);
    }
}
console.log(methods);