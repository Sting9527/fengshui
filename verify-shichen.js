const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

const SHICHEN = [
    { name: '子时', time: '23:00-01:00' },
    { name: '丑时', time: '01:00-03:00' },
    { name: '寅时', time: '03:00-05:00' },
    { name: '卯时', time: '05:00-07:00' },
    { name: '辰时', time: '07:00-09:00' },
    { name: '巳时', time: '09:00-11:00' },
    { name: '午时', time: '11:00-13:00' },
    { name: '未时', time: '13:00-15:00' },
    { name: '申时', time: '15:00-17:00' },
    { name: '酉时', time: '17:00-19:00' },
    { name: '戌时', time: '19:00-21:00' },
    { name: '亥时', time: '21:00-23:00' }
];

function getShichenStatus(dayGan, shichenIndex) {
    const shichenJiXiong = {
        '甲': ['吉', '凶', '吉', '凶', '吉', '凶', '凶', '吉', '凶', '吉', '凶', '吉'],
        '乙': ['凶', '吉', '凶', '吉', '凶', '吉', '吉', '凶', '吉', '凶', '吉', '凶'],
        '丙': ['吉', '吉', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶', '凶', '吉'],
        '丁': ['凶', '凶', '吉', '凶', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶'],
        '戊': ['吉', '凶', '凶', '吉', '凶', '凶', '凶', '吉', '凶', '凶', '吉', '吉'],
        '己': ['凶', '吉', '吉', '凶', '吉', '吉', '吉', '凶', '吉', '吉', '凶', '凶'],
        '庚': ['凶', '凶', '吉', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶', '吉'],
        '辛': ['吉', '吉', '凶', '吉', '凶', '凶', '吉', '吉', '凶', '凶', '吉', '凶'],
        '壬': ['凶', '吉', '吉', '凶', '吉', '凶', '吉', '凶', '吉', '凶', '吉', '凶'],
        '癸': ['吉', '凶', '凶', '吉', '凶', '吉', '凶', '吉', '凶', '吉', '凶', '吉']
    };
    const jiXiongList = shichenJiXiong[dayGan] || shichenJiXiong['甲'];
    return jiXiongList[shichenIndex];
}

console.log('=== 时辰吉凶 (庚日) ===');
const expectedStatus = ['凶', '凶', '吉', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶', '吉'];

let allCorrect = true;
SHICHEN.forEach((item, index) => {
    const status = getShichenStatus('庚', index);
    const isCorrect = status === expectedStatus[index];
    allCorrect = allCorrect && isCorrect;
    console.log(`${item.name} ${item.time}: ${status} (期望: ${expectedStatus[index]}) ${isCorrect ? '✅' : '❌'}`);
});

console.log('');
console.log(allCorrect ? '所有时辰吉凶计算正确！' : '存在错误需要修正！');