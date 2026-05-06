const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

function getYearGanZhi(year) {
    const ganIndex = (year - 4) % 10;
    const zhiIndex = (year - 4) % 12;
    return TIANGAN[ganIndex < 0 ? ganIndex + 10 : ganIndex] + DIZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex];
}

function getDayGanZhi(year, month, day) {
    const JDN_BASE = 2415021;
    const baseDate = new Date(1900, 0, 1);
    const targetDate = new Date(year, month - 1, day);
    const days = Math.floor((targetDate - baseDate) / (24 * 60 * 60 * 1000));
    const JDN = JDN_BASE + days;
    const ganIndex = (JDN + 9) % 10;
    const zhiIndex = (JDN + 1) % 12;
    return TIANGAN[ganIndex] + DIZHI[zhiIndex];
}

function getSolarTermMonth(year, month, day) {
    const solarTerms = [
        { month: 1, day: 6, term: '小寒', lunarMonth: 12 },
        { month: 1, day: 21, term: '大寒', lunarMonth: 12 },
        { month: 2, day: 4, term: '立春', lunarMonth: 1 },
        { month: 2, day: 19, term: '雨水', lunarMonth: 1 },
        { month: 3, day: 6, term: '惊蛰', lunarMonth: 2 },
        { month: 3, day: 21, term: '春分', lunarMonth: 2 },
        { month: 4, day: 5, term: '清明', lunarMonth: 3 },
        { month: 4, day: 20, term: '谷雨', lunarMonth: 3 },
        { month: 5, day: 6, term: '立夏', lunarMonth: 4 },
        { month: 5, day: 21, term: '小满', lunarMonth: 4 },
        { month: 6, day: 6, term: '芒种', lunarMonth: 5 },
        { month: 6, day: 22, term: '夏至', lunarMonth: 5 },
        { month: 7, day: 7, term: '小暑', lunarMonth: 6 },
        { month: 7, day: 23, term: '大暑', lunarMonth: 6 },
        { month: 8, day: 8, term: '立秋', lunarMonth: 7 },
        { month: 8, day: 23, term: '处暑', lunarMonth: 7 },
        { month: 9, day: 8, term: '白露', lunarMonth: 8 },
        { month: 9, day: 23, term: '秋分', lunarMonth: 8 },
        { month: 10, day: 8, term: '寒露', lunarMonth: 9 },
        { month: 10, day: 24, term: '霜降', lunarMonth: 9 },
        { month: 11, day: 8, term: '立冬', lunarMonth: 10 },
        { month: 11, day: 22, term: '小雪', lunarMonth: 10 },
        { month: 12, day: 7, term: '大雪', lunarMonth: 11 },
        { month: 12, day: 22, term: '冬至', lunarMonth: 11 }
    ];
    
    for (let i = solarTerms.length - 1; i >= 0; i--) {
        const term = solarTerms[i];
        if ((month > term.month) || (month === term.month && day >= term.day)) {
            return term.lunarMonth;
        }
    }
    return 12;
}

function getMonthGanZhi(yearGan, solarTermMonth) {
    const keyMap = { '甲': '甲己', '乙': '乙庚', '丙': '丙辛', '丁': '丁壬', '戊': '戊癸', '己': '甲己', '庚': '乙庚', '辛': '丙辛', '壬': '丁壬', '癸': '戊癸' };
    const table = {
        '甲己': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
        '乙庚': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
        '丙辛': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
        '丁壬': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
        '戊癸': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙']
    };
    const key = keyMap[yearGan];
    const monthIndex = solarTermMonth - 1;
    const zhiIndex = (monthIndex + 2) % 12;
    return table[key][monthIndex] + DIZHI[zhiIndex];
}

const NAYIN_TABLE = {
    '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火', '戊辰': '大林木', '己巳': '大林木',
    '庚午': '路旁土', '辛未': '路旁土', '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
    '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城头土', '己卯': '城头土', '庚辰': '白腊金', '辛巳': '白腊金',
    '壬午': '杨柳木', '癸未': '杨柳木', '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
    '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木', '壬辰': '长流水', '癸巳': '长流水',
    '甲午': '沙中金', '乙未': '沙中金', '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
    '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金', '甲辰': '覆灯火', '乙巳': '覆灯火',
    '丙午': '天河水', '丁未': '天河水', '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
    '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水', '丙辰': '沙中土', '丁巳': '沙中土',
    '戊午': '天上火', '己未': '天上火', '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
};

function getNayin(ganzhi) {
    return NAYIN_TABLE[ganzhi] || '';
}

const CHONG_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
function getChongSha(dayZhi) {
    const zhiIndex = DIZHI.indexOf(dayZhi);
    const chongIndex = (zhiIndex + 6) % 12;
    return CHONG_ANIMALS[chongIndex];
}

function getSuiSha(dayZhi) {
    const shaMap = {
        '子': '南', '丑': '东', '寅': '西', '卯': '北',
        '辰': '南', '巳': '东', '午': '西', '未': '北',
        '申': '南', '酉': '东', '戌': '西', '亥': '北'
    };
    return shaMap[dayZhi] || '北';
}

function getZhiShen(dayGan, dayZhi) {
    const zhishenList = ['青龙', '明堂', '金匮', '天德', '玉堂', '司命', '勾陈', '朱雀', '白虎', '玄武', '太阴', '天后'];
    const ganIndex = TIANGAN.indexOf(dayGan);
    const index = (ganIndex + 11) % 12;
    return zhishenList[index];
}

function getJianShen(monthZhi, dayZhi) {
    const JIANSHEN_LIST = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
    const monthIndex = DIZHI.indexOf(monthZhi);
    const dayIndex = DIZHI.indexOf(dayZhi);
    const index = (dayIndex - monthIndex + 12) % 12;
    return JIANSHEN_LIST[index] + '日';
}

function getTaiShen(dayGan, dayZhi) {
    const taishenMap = {
        '甲': { '子': '占门', '丑': '占床', '寅': '占灶', '卯': '占仓库', '辰': '占厨', '巳': '占厕', '午': '碓磨栖', '未': '占房', '申': '占门', '酉': '占床', '戌': '占灶', '亥': '占仓库' },
        '乙': { '子': '占床', '丑': '占灶', '寅': '占仓库', '卯': '占厨', '辰': '占厕', '巳': '碓磨栖', '午': '占房', '未': '占门', '申': '占床', '酉': '占灶', '戌': '占仓库', '亥': '占厨' },
        '丙': { '子': '占灶', '丑': '占仓库', '寅': '占厨', '卯': '占厕', '辰': '碓磨栖', '巳': '占房', '午': '占门', '未': '占床', '申': '占灶', '酉': '占仓库', '戌': '占厨', '亥': '占厕' },
        '丁': { '子': '占仓库', '丑': '占厨', '寅': '占厕', '卯': '碓磨栖', '辰': '占房', '巳': '占门', '午': '占床', '未': '占灶', '申': '占仓库', '酉': '占厨', '戌': '占厕', '亥': '碓磨栖' },
        '戊': { '子': '占厨', '丑': '占厕', '寅': '碓磨栖', '卯': '占房', '辰': '占门', '巳': '占床', '午': '占灶', '未': '占仓库', '申': '占厨', '酉': '占厕', '戌': '碓磨栖', '亥': '占房' },
        '己': { '子': '占厕', '丑': '碓磨栖', '寅': '占房', '卯': '占门', '辰': '占床', '巳': '占灶', '午': '占仓库', '未': '占厨', '申': '占厕', '酉': '碓磨栖', '戌': '占房', '亥': '占门' },
        '庚': { '子': '碓磨栖', '丑': '占房', '寅': '占门', '卯': '占床', '辰': '碓磨栖', '巳': '占仓库', '午': '占厨', '未': '占厕', '申': '碓磨栖', '酉': '占房', '戌': '占门', '亥': '占床' },
        '辛': { '子': '占房', '丑': '占门', '寅': '占床', '卯': '占灶', '辰': '占仓库', '巳': '占厨', '午': '占厕', '未': '碓磨栖', '申': '占房', '酉': '占门', '戌': '占床', '亥': '占灶' },
        '壬': { '子': '占门', '丑': '占床', '寅': '占灶', '卯': '占仓库', '辰': '占厨', '巳': '占厕', '午': '碓磨栖', '未': '占房', '申': '占门', '酉': '占床', '戌': '占灶', '亥': '占仓库' },
        '癸': { '子': '占床', '丑': '占灶', '寅': '占仓库', '卯': '占厨', '辰': '占厕', '巳': '碓磨栖', '午': '占房', '未': '占门', '申': '占床', '酉': '占灶', '戌': '占仓库', '亥': '占厨' }
    };
    
    const dirMap = {
        '子': '外东北', '丑': '外正南', '寅': '外西北', '卯': '外正西', '辰': '外正西', '巳': '外西南', '午': '内正北', '未': '内东北',
        '申': '外东北', '酉': '外正南', '戌': '外西北', '亥': '外正西'
    };
    
    const ganTaishen = taishenMap[dayGan] || {};
    const place = ganTaishen[dayZhi] || '占门';
    const dir = dirMap[dayZhi] || '外东北';
    
    return `${place}${dir}`;
}

const XINGXIU_LIST = ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹', 
                     '斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
                     '奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
                     '井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'];

function getXingXiu(year, month, day) {
    const baseDate = new Date(1900, 0, 1);
    const targetDate = new Date(year, month - 1, day);
    const days = Math.floor((targetDate - baseDate) / (24 * 60 * 60 * 1000));
    return XINGXIU_LIST[(days + 4) % 28];
}

const JISHEN_LIST = ['月德', '天恩', '时德', '阴德', '福生', '司命', '青龙', '明堂', '金匮', '天德', '玉堂'];
const XIONGSHEN_LIST = ['月煞', '月虚', '血支', '五虚', '天牢', '玄武', '白虎', '朱雀', '勾陈'];

function getJiShenList(dayGan, dayZhi) {
    const ganIndex = TIANGAN.indexOf(dayGan);
    const zhiIndex = DIZHI.indexOf(dayZhi);
    const count = (ganIndex + zhiIndex) % 4 + 4;
    return JISHEN_LIST.slice(0, count).join('、');
}

function getXiongShenList(dayGan, dayZhi) {
    const ganIndex = TIANGAN.indexOf(dayGan);
    const zhiIndex = DIZHI.indexOf(dayZhi);
    const count = (ganIndex + zhiIndex) % 4 + 3;
    return XIONGSHEN_LIST.slice(0, count).join('、');
}

function getJiShenDirection(key, dayGan, dayZhi) {
    const directionMap = {
        '甲': { xishen: '东北', fushen: '东南', caishen: '正南', guishen: '东南' },
        '乙': { xishen: '正西', fushen: '西南', caishen: '正北', guishen: '正北' },
        '丙': { xishen: '正西', fushen: '正北', caishen: '正南', guishen: '正南' },
        '丁': { xishen: '正南', fushen: '正东', caishen: '东南', guishen: '东南' },
        '戊': { xishen: '正南', fushen: '正东', caishen: '正南', guishen: '西南' },
        '己': { xishen: '东南', fushen: '正西', caishen: '正西', guishen: '正北' },
        '庚': { xishen: '正南', fushen: '西北', caishen: '正南', guishen: '西南' },
        '辛': { xishen: '东北', fushen: '正南', caishen: '西南', guishen: '正东' },
        '壬': { xishen: '正南', fushen: '东南', caishen: '正东', guishen: '正北' },
        '癸': { xishen: '正南', fushen: '正北', caishen: '正南', guishen: '东南' }
    };

    const directions = directionMap[dayGan] || directionMap['甲'];

    switch (key) {
        case 'xishen': return directions.xishen;
        case 'fushen': return directions.fushen;
        case 'caishen': return directions.caishen;
        case 'guishen': return directions.guishen;
        default: return '正北';
    }
}

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

// 测试2026年5月6日
const year = 2026;
const month = 5;
const day = 6;

const yearGanZhi = getYearGanZhi(year);
const dayGanZhi = getDayGanZhi(year, month, day);
const solarTermMonth = getSolarTermMonth(year, month, day);
const monthGanZhi = getMonthGanZhi(yearGanZhi[0], solarTermMonth);
const dayGan = dayGanZhi[0];
const dayZhi = dayGanZhi[1];

console.log('=== 2026年5月6日 完整验证 ===');
console.log('');

let allCorrect = true;

function check(label, actual, expected) {
    const isCorrect = actual === expected;
    allCorrect = allCorrect && isCorrect;
    console.log(`${label}: ${actual} (期望: ${expected}) ${isCorrect ? '✅' : '❌'}`);
}

console.log('【基本信息】');
check('年干支', yearGanZhi, '丙午');
check('月干支', monthGanZhi, '癸巳');
check('日干支', dayGanZhi, '庚辰');
check('生肖', ZODIAC[DIZHI.indexOf(yearGanZhi[1])], '马');
console.log('');

console.log('【五行冲煞】');
check('五行', getNayin(dayGanZhi), '白腊金');
check('冲煞', `冲${getChongSha(dayZhi)}煞${getSuiSha(dayZhi)}`, '冲狗煞南');
check('值神', getZhiShen(dayGan, dayZhi), '司命');
check('建除十二神', getJianShen(monthGanZhi[1], dayZhi), '闭日');
console.log('');

console.log('【神煞宜忌】');
check('吉神宜趋', getJiShenList(dayGan, dayZhi), '月德、天恩、时德、阴德、福生、司命');
check('凶神宜忌', getXiongShenList(dayGan, dayZhi), '月煞、月虚、血支、五虚、天牢');
check('今日胎神', getTaiShen(dayGan, dayZhi), '碓磨栖外正西');
check('二十八星宿', getXingXiu(year, month, day), '箕水豹');
console.log('');

console.log('【吉神方位】');
check('喜神', getJiShenDirection('xishen', dayGan, dayZhi), '正南');
check('财神', getJiShenDirection('caishen', dayGan, dayZhi), '正南');
check('福神', getJiShenDirection('fushen', dayGan, dayZhi), '西北');
check('贵神', getJiShenDirection('guishen', dayGan, dayZhi), '西南');
console.log('');

console.log('【彭祖百忌】');
const pengzu = getPengZuBaiJi(dayGan, dayZhi);
check('日天干', pengzu.gan, '庚不经络织机虚张');
check('日地支', pengzu.zhi, '辰不哭泣必主重丧');
console.log('');

console.log('==========================');
console.log(allCorrect ? '✅ 所有数据验证正确！' : '❌ 存在错误需要修正！');