// 搜索八字相关方法
import { Solar } from 'lunar-javascript';

const solar = Solar.fromYmdHms(1990, 1, 1, 0, 0, 0);
const lunar = solar.getLunar();

console.log('八字相关方法:');
const baziMethods = [];
for (const key of Object.keys(lunar)) {
    if (typeof lunar[key] === 'function') {
        if (key.includes('ShiShen') || key.includes('XunKong') || 
            key.includes('TaiYuan') || key.includes('MingGong') ||
            key.includes('TianGan') || key.includes('DiZhi') ||
            key.includes('He') || key.includes('Chong') || key.includes('Xing') || key.includes('Hai')) {
            baziMethods.push(key);
        }
    }
}
console.log(baziMethods);

// 测试一些方法
console.log('\n测试方法:');
console.log('getShiShen:', typeof lunar.getShiShen === 'function' ? lunar.getShiShen() : 'not found');
console.log('getXunKong:', typeof lunar.getXunKong === 'function' ? lunar.getXunKong() : 'not found');
console.log('getTaiYuan:', typeof lunar.getTaiYuan === 'function' ? lunar.getTaiYuan() : 'not found');
console.log('getMingGong:', typeof lunar.getMingGong === 'function' ? lunar.getMingGong() : 'not found');
console.log('getTianGanHe:', typeof lunar.getTianGanHe === 'function' ? lunar.getTianGanHe() : 'not found');
console.log('getDiZhiHe:', typeof lunar.getDiZhiHe === 'function' ? lunar.getDiZhiHe() : 'not found');