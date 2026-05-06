const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const PENGZU_BAIJI = {
    '甲': '甲不开仓', '乙': '乙不栽植', '丙': '丙不修灶', '丁': '丁不剃头', '戊': '戊不受田', '己': '己不破券',
    '庚': '庚不经络织机虚张', '辛': '辛不祭祀', '壬': '壬不泱水', '癸': '癸不词讼',
    '子': '子不问卜', '丑': '丑不冠带', '寅': '寅不祭祀', '卯': '卯不穿井', '辰': '辰不哭泣必主重丧', '巳': '巳不远行',
    '午': '午不盖屋', '未': '未不服药', '申': '申不安床', '酉': '酉不会客', '戌': '戌不吃狗', '亥': '亥不嫁娶'
};

function getPengZuBaiJi(dayGan, dayZhi) {
    const ganJi = PENGZU_BAIJI[dayGan] || '';
    const zhiJi = PENGZU_BAIJI[dayZhi] || '';
    return { gan: ganJi, zhi: zhiJi };
}

const dayGanZhi = '庚辰';
const pengzu = getPengZuBaiJi(dayGanZhi[0], dayGanZhi[1]);

console.log('=== 彭祖百忌 ===');
console.log('日天干:', pengzu.gan, '(期望: 庚不经络织机虚张)');
console.log('日地支:', pengzu.zhi, '(期望: 辰不哭泣必主重丧)');
console.log('');

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
    const dayGanIndex = TIANGAN.indexOf(dayGan);
    const statusIndex = (dayGanIndex * 2 + shichenIndex) % 12;
    return statusIndex % 3 === 0 ? '凶' : '吉';
}

console.log('=== 时辰吉凶 ===');
const expectedStatus = ['凶', '凶', '吉', '凶', '吉', '吉', '凶', '凶', '吉', '吉', '凶', '吉'];

SHICHEN.forEach((item, index) => {
    const status = getShichenStatus(dayGanZhi[0], index);
    console.log(`${item.name} ${item.time}: ${status} (期望: ${expectedStatus[index]}) ${status === expectedStatus[index] ? '✅' : '❌'}`);
});