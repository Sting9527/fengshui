<template>
	<view class="huangli-container">
		<!-- 顶部日期选择 -->
		<view class="date-selector-bar">
			<view class="nav-btn" @tap="prevDay">
				<text class="nav-icon">‹</text>
			</view>
			<picker mode="date" :value="currentDate" @change="onDateChange">
				<view class="date-display">
					<text class="solar-date">{{ solarYear }}年{{ solarMonth }}月{{ solarDay }}日</text>
					<text class="week-day">{{ weekDay }} 第{{ weekNum }}周</text>
				</view>
			</picker>
			<view class="nav-btn" @tap="nextDay">
				<text class="nav-icon">›</text>
			</view>
		</view>

		<!-- 主日期卡片 -->
		<view class="main-card">
			<view class="main-date">
				<text class="day-num">{{ solarDay }}</text>
				<view class="lunar-info">
					<text class="lunar-date">{{ lunarDateText }}</text>
					<text class="ganzhi-date">{{ ganzhiYear }}年 {{ ganzhiMonth }}月 {{ ganzhiDay }}日</text>
				</view>
			</view>
			<view class="zodiac-box">
				<text class="zodiac-text">属{{ zodiac }}</text>
			</view>
		</view>

		<!-- 宜忌区域 -->
		<view class="yiji-section">
			<view class="yi-card">
				<view class="card-header yi">
					<text class="header-icon">宜</text>
				</view>
				<view class="card-content">
					<text class="yiji-item" v-for="(item, index) in yiItems" :key="index">{{ item }}</text>
				</view>
			</view>
			<view class="ji-card">
				<view class="card-header ji">
					<text class="header-icon">忌</text>
				</view>
				<view class="card-content">
					<text class="yiji-item" v-for="(item, index) in jiItems" :key="index">{{ item }}</text>
				</view>
			</view>
		</view>

		<!-- 基础信息卡片 -->
		<view class="info-card">
			<view class="info-row">
				<view class="info-item">
					<text class="info-label">五行</text>
					<text class="info-value">{{ nayin }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">冲煞</text>
					<text class="info-value">{{ chongsha }}煞{{ suisha }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">值神</text>
					<text class="info-value">{{ zhishen }}</text>
				</view>
			</view>
		</view>

		<!-- 时辰宜忌 -->
		<view class="shichen-section">
			<view class="section-title-bar">
				<text class="section-title">时辰宜忌</text>
			</view>
			<view class="shichen-list">
				<view class="shichen-card" v-for="(item, index) in shichenList" :key="index" :class="{ 'ji': item.ji }">
					<view class="shichen-header">
						<view class="shichen-main">
							<text class="shichen-ganzhi">{{ item.ganzhi }}</text>
							<text class="shichen-name">{{ item.name }}时</text>
						</view>
						<text class="shichen-time">{{ item.time }}</text>
						<view class="shichen-status" :class="{ 'ji': item.ji }">
							<text>{{ item.status }}</text>
						</view>
					</view>
					<view class="shichen-info">
						<text class="shichen-chongsha">{{ item.chongsha }} {{ item.sha }}</text>
					</view>
					<view class="shichen-directions">
						<text class="direction-item"><text class="direction-label">喜神</text>{{ item.xishen }}</text>
						<text class="direction-item"><text class="direction-label">财神</text>{{ item.caishen }}</text>
						<text class="direction-item"><text class="direction-label">福神</text>{{ item.fushen }}</text>
					</view>
					<view class="shichen-yi" v-if="item.yi.length > 0">
						<text class="yi-label">宜：</text>
						<text class="yi-content">{{ item.yi.join('、') }}</text>
					</view>
					<view class="shichen-ji" v-if="item.jiItems.length > 0">
						<text class="ji-label">忌：</text>
						<text class="ji-content">{{ item.jiItems.join('、') }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 神煞信息 -->
		<view class="shensha-section">
			<view class="section-title-bar">
				<text class="section-title">神煞宜忌</text>
			</view>
			<view class="shensha-grid">
				<view class="shensha-card">
					<text class="shensha-title">建除十二神</text>
					<text class="shensha-value">{{ jianshen }}</text>
				</view>
				<view class="shensha-card">
					<text class="shensha-title">吉神宜趋</text>
					<text class="shensha-value">{{ jishenList }}</text>
				</view>
				<view class="shensha-card">
					<text class="shensha-title">今日胎神</text>
					<text class="shensha-value">{{ taishen }}</text>
				</view>
				<view class="shensha-card">
					<text class="shensha-title">凶神宜忌</text>
					<text class="shensha-value">{{ xiongshenList }}</text>
				</view>
			</view>
		</view>

		<!-- 彭祖百忌 -->
		<view class="pengzu-section">
			<view class="section-title-bar">
				<text class="section-title">彭祖百忌</text>
			</view>
			<view class="pengzu-content">
				<text class="pengzu-text">{{ pengzuGan }} · {{ pengzuZhi }}</text>
			</view>
		</view>

		<!-- 二十八星宿 -->
		<view class="xingxiu-section">
			<view class="section-title-bar">
				<text class="section-title">二十八星宿</text>
			</view>
			<view class="xingxiu-content">
				<text class="xingxiu-text">{{ xingxiu }}</text>
			</view>
		</view>

		<!-- 吉神方位 -->
		<view class="jishen-direction-section">
			<view class="section-title-bar">
				<text class="section-title">吉神方位</text>
			</view>
			<view class="direction-grid">
				<view class="direction-item">
					<text class="direction-name">喜神</text>
					<text class="direction-value">{{ xishen }}</text>
				</view>
				<view class="direction-item">
					<text class="direction-name">财神</text>
					<text class="direction-value">{{ caishen }}</text>
				</view>
				<view class="direction-item">
					<text class="direction-name">福神</text>
					<text class="direction-value">{{ fushen }}</text>
				</view>
				<view class="direction-item">
					<text class="direction-name">贵神</text>
					<text class="direction-value">{{ guishen }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { Solar } from 'lunar-javascript';

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

const TIANGAN_WUXING = { '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水' };
const DIZHI_WUXING = { '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水' };

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

const LUNAR_MONTHS = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
const LUNAR_DAYS = ['', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

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

const CHONG_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const SHA_DIRECTIONS = ['北', '东', '南', '西'];

const XINGXIU_LIST = ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹', 
                     '斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
                     '奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
                     '井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'];

const JIANSHEN_LIST = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
const ZHISHEN_LIST = ['青龙', '明堂', '金匮', '天德', '玉堂', '司命', '勾陈', '朱雀', '白虎', '玄武', '太阴', '天后'];

const JISHEN_LIST = ['月德', '天恩', '时德', '阴德', '福生', '司命', '青龙', '明堂', '金匮', '天德', '玉堂'];
const XIONGSHEN_LIST = ['月煞', '月虚', '血支', '五虚', '天牢', '玄武', '白虎', '朱雀', '勾陈'];

const PENGZU_BAIJI = {
	'甲': '甲不开仓', '乙': '乙不栽植', '丙': '丙不修灶', '丁': '丁不剃头', '戊': '戊不受田', '己': '己不破券',
	'庚': '庚不经络织机虚张', '辛': '辛不祭祀', '壬': '壬不泱水', '癸': '癸不词讼',
	'子': '子不问卜', '丑': '丑不冠带', '寅': '寅不祭祀', '卯': '卯不穿井', '辰': '辰不哭泣必主重丧', '巳': '巳不远行',
	'午': '午不盖屋', '未': '未不服药', '申': '申不安床', '酉': '酉不会客', '戌': '戌不吃狗', '亥': '亥不嫁娶'
};

const SOLAR_TERMS = [
	{ month: 1, day: 6, term: '小寒' },
	{ month: 1, day: 21, term: '大寒' },
	{ month: 2, day: 4, term: '立春' },
	{ month: 2, day: 19, term: '雨水' },
	{ month: 3, day: 6, term: '惊蛰' },
	{ month: 3, day: 21, term: '春分' },
	{ month: 4, day: 5, term: '清明' },
	{ month: 4, day: 20, term: '谷雨' },
	{ month: 5, day: 6, term: '立夏' },
	{ month: 5, day: 21, term: '小满' },
	{ month: 6, day: 6, term: '芒种' },
	{ month: 6, day: 22, term: '夏至' },
	{ month: 7, day: 7, term: '小暑' },
	{ month: 7, day: 23, term: '大暑' },
	{ month: 8, day: 8, term: '立秋' },
	{ month: 8, day: 23, term: '处暑' },
	{ month: 9, day: 8, term: '白露' },
	{ month: 9, day: 23, term: '秋分' },
	{ month: 10, day: 8, term: '寒露' },
	{ month: 10, day: 24, term: '霜降' },
	{ month: 11, day: 8, term: '立冬' },
	{ month: 11, day: 22, term: '小雪' },
	{ month: 12, day: 7, term: '大雪' },
	{ month: 12, day: 22, term: '冬至' }
];

function getYearGanZhi(year) {
	const ganIndex = (year - 4) % 10;
	const zhiIndex = (year - 4) % 12;
	return TIANGAN[ganIndex < 0 ? ganIndex + 10 : ganIndex] + DIZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex];
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

function getNayin(ganzhi) {
	return NAYIN_TABLE[ganzhi] || '';
}

function getLunarDate(year, month, day) {
	const lunarData = {
		1900: [0, 31, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1901: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1902: [0, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1903: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1904: [0, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1905: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1906: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1907: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1908: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1909: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1910: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1911: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30],
		1912: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1913: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1914: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1915: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1916: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1917: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1918: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1919: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		1920: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1921: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1922: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1923: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1924: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29],
		1925: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1926: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1927: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1928: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1929: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1930: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1931: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30],
		1932: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1933: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1934: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1935: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1936: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1937: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1938: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1939: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		1940: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1941: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1942: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1943: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1944: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29],
		1945: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1946: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1947: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1948: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1949: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1950: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1951: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		1952: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1953: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1954: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1955: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1956: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1957: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1958: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1959: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		1960: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1961: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1962: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1963: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1964: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29],
		1965: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1966: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1967: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1968: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1969: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1970: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1971: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		1972: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1973: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1974: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1975: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1976: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1977: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1978: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1979: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		1980: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1981: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1982: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1983: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1984: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29],
		1985: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1986: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1987: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1988: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1989: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1990: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1991: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		1992: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1993: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1994: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1995: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1996: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		1997: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1998: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		1999: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		2000: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2001: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2002: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2003: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2004: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29],
		2005: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2006: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2007: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2008: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2009: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2010: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2011: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		2012: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2013: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2014: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2015: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2016: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2017: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2018: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2019: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		2020: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2021: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2022: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2023: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2024: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29],
		2025: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2026: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2027: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2028: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2029: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2030: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2031: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		2032: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2033: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2034: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2035: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2036: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2037: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2038: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2039: [0, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
		2040: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
		2041: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2042: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2043: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2044: [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29],
		2045: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2046: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
		2047: [0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]
	};
	
	const data = lunarData[year];
	if (!data) {
		return { month: 1, day: 1 };
	}
	
	let dayOfYear = 0;
	for (let i = 1; i < month; i++) {
		dayOfYear += data[i];
	}
	dayOfYear += day;
	
	let lunarMonth = 1;
	let lunarDay = dayOfYear;
	
	for (let i = 1; i <= 12; i++) {
		if (lunarDay <= data[i]) {
			break;
		}
		lunarDay -= data[i];
		lunarMonth++;
	}
	
	return { month: lunarMonth, day: lunarDay };
}

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

function getXingXiu(year, month, day) {
	const baseDate = new Date(1900, 0, 1);
	const targetDate = new Date(year, month - 1, day);
	const days = Math.floor((targetDate - baseDate) / (24 * 60 * 60 * 1000));
	return XINGXIU_LIST[(days + 4) % 28];
}

function getZhiShen(dayGan, dayZhi) {
	const zhishenList = ['青龙', '明堂', '金匮', '天德', '玉堂', '司命', '勾陈', '朱雀', '白虎', '玄武', '太阴', '天后'];
	const ganIndex = TIANGAN.indexOf(dayGan);
	const index = (ganIndex + 11) % 12;
	return zhishenList[index];
}

function getJianShen(monthZhi, dayZhi) {
	const monthIndex = DIZHI.indexOf(monthZhi);
	const dayIndex = DIZHI.indexOf(dayZhi);
	const index = (dayIndex - monthIndex + 12) % 12;
	return JIANSHEN_LIST[index] + '日';
}

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
	const ganIndex = TIANGAN.indexOf(dayGan);
	const zhiIndex = DIZHI.indexOf(dayZhi);

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

function getYiJi(dayGan, dayZhi) {
	const YI_LIST = [
		['结婚', '出行', '搬家', '搬新房', '动土', '祈福', '栽种', '安床'],
		['安葬', '祭祀', '修造', '作灶', '拆卸', '出火', '破土', '求子'],
		['纳采', '订盟', '订婚', '冠笄', '会亲友', '安机械', '开池', '开仓'],
		['纳财', '交易', '立券', '入宅', '移徙', '赴任', '开市', '开张'],
		['开光', '塑绘', '斋醮', '沐浴', '理发', '扫舍', '伐木', '竖柱']
	];
	
	const JI_LIST = [
		['开仓', '掘井', '开光', '针灸', '打猎', '伐木', '上梁', '安门'],
		['嫁娶', '开市', '交易', '纳财', '入宅', '安床', '赴任', '出行'],
		['破土', '启钻', '除服', '成服', '修造', '动土', '竖柱', '上梁'],
		['祭祀', '祈福', '斋醮', '开光', '嫁娶', '入宅', '移徙', '开市'],
		['纳畜', '入殓', '移徙', '安葬', '探病', '伐木', '上梁', '安门']
	];
	
	const ganIndex = TIANGAN.indexOf(dayGan);
	const zhiIndex = DIZHI.indexOf(dayZhi);
	const index = (ganIndex + zhiIndex) % YI_LIST.length;
	
	return {
		yi: YI_LIST[index],
		ji: JI_LIST[(index + 1) % JI_LIST.length]
	};
}

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

function getDayOfYear(year, month, day) {
	const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let dayOfYear = 0;
	
	for (let i = 1; i < month; i++) {
		dayOfYear += daysInMonth[i];
	}
	
	if (month > 2 && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)) {
		dayOfYear++;
	}
	
	dayOfYear += day;
	return dayOfYear;
}

function getWeekNum(year, month, day) {
	const date = new Date(year, month - 1, day);
	const startOfYear = new Date(year, 0, 1);
	const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
	return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

function getPengZuBaiJi(dayGan, dayZhi) {
	const ganJi = PENGZU_BAIJI[dayGan] || '';
	const zhiJi = PENGZU_BAIJI[dayZhi] || '';
	return { gan: ganJi, zhi: zhiJi };
}

export default {
	name: 'LunarCalendar',
	data() {
		const now = new Date();
		const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
		
		return {
			currentDate: dateStr,
			solarYear: now.getFullYear(),
			solarMonth: now.getMonth() + 1,
			solarDay: now.getDate(),
			weekDay: '',
			weekNum: 0,
			lunarDateText: '',
			ganzhiYear: '',
			ganzhiMonth: '',
			ganzhiDay: '',
			zodiac: '',
			nayin: '',
			yiItems: [],
			jiItems: [],
			shichenList: [],
			chongsha: '',
			suisha: '',
			taishen: '',
			xingxiu: '',
			zhishen: '',
			jianshen: '',
			jishenList: '',
			xiongshenList: '',
			xishen: '',
			fushen: '',
			caishen: '',
			guishen: '',
			pengzuGan: '',
			pengzuZhi: '',
			dayOfYear: 0
		};
	},
	mounted() {
		this.updateCalendar();
	},
	methods: {
		onDateChange(e) {
			this.currentDate = e.detail.value;
			this.parseDate();
			this.updateCalendar();
		},
		
		parseDate() {
			const [year, month, day] = this.currentDate.split('-').map(Number);
			this.solarYear = year;
			this.solarMonth = month;
			this.solarDay = day;
		},
		
		prevDay() {
			const date = new Date(this.solarYear, this.solarMonth - 1, this.solarDay);
			date.setDate(date.getDate() - 1);
			this.currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
			this.parseDate();
			this.updateCalendar();
		},
		
		nextDay() {
			const date = new Date(this.solarYear, this.solarMonth - 1, this.solarDay);
			date.setDate(date.getDate() + 1);
			this.currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
			this.parseDate();
			this.updateCalendar();
		},
		
		updateCalendar() {
			const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			const date = new Date(this.solarYear, this.solarMonth - 1, this.solarDay);
			this.weekDay = weekDays[date.getDay()];
			this.weekNum = getWeekNum(this.solarYear, this.solarMonth, this.solarDay);
			this.dayOfYear = getDayOfYear(this.solarYear, this.solarMonth, this.solarDay);
			
			// 使用 lunar-javascript 库获取黄历数据
			const solar = Solar.fromDate(date);
			const lunar = solar.getLunar();
			
			// 农历信息
			this.lunarDateText = lunar.getMonthInChinese() + '月' + lunar.getDayInChinese();
			this.ganzhiYear = lunar.getYearInGanZhi();
			this.ganzhiMonth = lunar.getMonthInGanZhi();
			this.ganzhiDay = lunar.getDayInGanZhi();
			this.zodiac = lunar.getYearShengXiao();
			// 纳音五行（使用原有逻辑）
			const NAYIN_MAP = {
				'甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火', '戊辰': '大林木', '己巳': '大林木',
				'庚午': '路旁土', '辛未': '路旁土', '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
				'丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城墙土', '己卯': '城墙土', '庚辰': '白蜡金', '辛巳': '白蜡金',
				'壬午': '杨柳木', '癸未': '杨柳木', '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
				'戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木', '壬辰': '长流水', '癸巳': '长流水',
				'甲午': '沙中金', '乙未': '沙中金', '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
				'庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金', '甲辰': '覆灯火', '乙巳': '覆灯火',
				'丙午': '天河水', '丁未': '天河水', '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
				'壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水', '丙辰': '沙中土', '丁巳': '沙中土',
				'戊午': '天上火', '己未': '天上火', '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
			};
			this.nayin = NAYIN_MAP[this.ganzhiDay] || '白蜡金';
			
			const dayGan = this.ganzhiDay[0];
			const dayZhi = this.ganzhiDay[1];
			const monthGanZhi = this.ganzhiMonth;
			
			// 宜忌
			this.yiItems = lunar.getDayYi();
			this.jiItems = lunar.getDayJi();
			
			// 时辰宜忌（根据农历日期生成详细数据）
			this.shichenList = this.generateShichenList(lunar);
			
			// 冲煞
			this.chongsha = '冲' + lunar.getChongShengXiao();
			this.suisha = lunar.getSha();
			
			// 胎神（使用原有逻辑）
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
			this.taishen = place + dir;
			
			// 值神（使用原有逻辑）
			const ZHISHEN_MAP = {
				'子': '青龙', '丑': '明堂', '寅': '天刑', '卯': '朱雀', '辰': '金匮', '巳': '天德',
				'午': '白虎', '未': '玉堂', '申': '天牢', '酉': '玄武', '戌': '司命', '亥': '勾陈'
			};
			this.zhishen = ZHISHEN_MAP[dayZhi] || '司命';
			
			// 吉神方位
			this.xishen = lunar.getPositionXiDesc();
			this.fushen = lunar.getPositionFuDesc();
			this.caishen = lunar.getPositionCaiDesc();
			this.guishen = lunar.getPositionYangGuiDesc();
			
			// 彭祖百忌
			this.pengzuGan = lunar.getPengZuGan();
			this.pengzuZhi = lunar.getPengZuZhi();
			
			// 建除十二神（使用原有逻辑）
			const JIANSHEN_LIST = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
			const monthZhi = monthGanZhi[1];
			const monthIndex = DIZHI.indexOf(monthZhi);
			const dayIndex = DIZHI.indexOf(dayZhi);
			const jianshenIndex = (dayIndex - monthIndex + 12) % 12;
			this.jianshen = JIANSHEN_LIST[jianshenIndex] + '日';
			
			// 吉神宜趋、凶神宜忌（使用原有逻辑）
			const JISHEN_MAP = {
				'甲': ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '天医', '玉堂'],
				'乙': ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '天医', '玉堂'],
				'丙': ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '天医', '玉堂', '司命'],
				'丁': ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '天医', '玉堂', '司命'],
				'戊': ['青龙', '明堂', '金匮', '宝光', '天德', '月德', '天德合', '月德合'],
				'己': ['青龙', '明堂', '金匮', '宝光', '天德', '月德', '天德合', '月德合'],
				'庚': ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '天医', '玉堂'],
				'辛': ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '天医', '玉堂'],
				'壬': ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '天医', '玉堂', '司命'],
				'癸': ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '天医', '玉堂', '司命']
			};
			const XIONGSHEN_MAP = {
				'甲': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差'],
				'乙': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差'],
				'丙': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差', '死神'],
				'丁': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差', '死神'],
				'戊': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差', '五虚'],
				'己': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差', '五虚'],
				'庚': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差'],
				'辛': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差'],
				'壬': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差', '死神'],
				'癸': ['日破', '大耗', '灾煞', '天火', '月厌', '地火', '阴错', '阳差', '死神']
			};
			this.jishenList = (JISHEN_MAP[dayGan] || []).slice(0, 6).join('、');
			this.xiongshenList = (XIONGSHEN_MAP[dayGan] || []).slice(0, 4).join('、');
			
			// 二十八星宿（使用完整名称映射）
			const XINGXIU_LIST = ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹', 
								'斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
								'奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
								'井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'];
			const xingxiuShort = lunar.getXiu();
			this.xingxiu = XINGXIU_LIST.find(item => item.startsWith(xingxiuShort)) || xingxiuShort;
		},
		
		getShichenTime(index) {
			const times = [
				'23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
				'07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
				'15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
			];
			return times[index];
		},
		
		generateYiJi(dayGan, dayZhi) {
			const yiJi = getYiJi(dayGan, dayZhi);
			this.yiItems = yiJi.yi;
			this.jiItems = yiJi.ji;
		},
		
		generateShichen(dayGan) {
			this.shichenList = SHICHEN.map((item, index) => ({
				...item,
				status: getShichenStatus(dayGan, index),
				ji: getShichenStatus(dayGan, index) === '凶'
			}));
		},
		
		generateShensha(dayGan, dayZhi) {
			this.chongsha = `冲${getChongSha(dayZhi)}`;
			this.suisha = getSuiSha(dayZhi);
			this.taishen = getTaiShen(dayGan, dayZhi);
			this.zhishen = getZhiShen(dayGan, dayZhi);
		},
		
		generateJishen(dayGan, dayZhi) {
			this.xishen = getJiShenDirection('xishen', dayGan, dayZhi);
			this.fushen = getJiShenDirection('fushen', dayGan, dayZhi);
			this.caishen = getJiShenDirection('caishen', dayGan, dayZhi);
			this.guishen = getJiShenDirection('guishen', dayGan, dayZhi);
		},
		
		generatePengZuBaiJi(dayGan, dayZhi) {
			const pengzu = getPengZuBaiJi(dayGan, dayZhi);
			this.pengzuGan = pengzu.gan;
			this.pengzuZhi = pengzu.zhi;
		},
		
		generateJianShen(monthZhi, dayZhi) {
			this.jianshen = getJianShen(monthZhi, dayZhi);
		},
		
		generateJiXiongShen(dayGan, dayZhi) {
			this.jishenList = getJiShenList(dayGan, dayZhi);
			this.xiongshenList = getXiongShenList(dayGan, dayZhi);
		},
		
		generateXingXiu(year, month, day) {
			this.xingxiu = getXingXiu(year, month, day);
		},
		
		generateShichenList(lunar) {
			const SHICHEN_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
			const CHONG_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
			const SHA_DIRECTIONS = ['北', '东', '南', '西'];
			const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
			
			const dayGan = lunar.getDayGan();
			const dayGanIndex = TIANGAN.indexOf(dayGan);
			const shichenGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
			
			const shichenYiJi = {
				'甲子': { yi: ['结婚', '交易', '开业', '祈福', '安床', '求子', '求财'], ji: ['出行', '搬家', '赴任', '诉讼', '盖屋', '修造', '入殓', '上梁'], chong: '马', sha: '煞南', xishen: '西南', caishen: '正西', fushen: '正东' },
				'乙丑': { yi: ['结婚', '搬新房', '祈福', '安葬', '祭祀', '酬神', '求财'], ji: ['出行', '赴任', '动土', '修造'], chong: '羊', sha: '煞东', xishen: '正南', caishen: '正西', fushen: '正东' },
				'丙寅': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '安葬', '祭祀', '修造', '作灶', '酬神', '斋醮', '求财'], ji: ['祈福', '求子'], chong: '猴', sha: '煞北', xishen: '东南', caishen: '正北', fushen: '正北' },
				'丁卯': { yi: ['结婚', '出行', '交易', '搬新房', '开业', '赴任', '安葬', '修造', '求子', '求财'], ji: ['祈福', '祭祀', '酬神', '斋醮'], chong: '鸡', sha: '煞西', xishen: '东北', caishen: '正北', fushen: '正南' },
				'戊辰': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '祈福', '安床', '安葬', '求财'], ji: ['动土', '乘船', '修造', '造桥'], chong: '狗', sha: '煞南', xishen: '西北', caishen: '正东', fushen: '西南' },
				'己巳': { yi: ['结婚', '搬家', '交易', '搬新房', '开业', '祈福', '安葬', '祭祀', '修造', '酬神', '求子', '斋醮'], ji: [], chong: '猪', sha: '煞东', xishen: '西南', caishen: '正东', fushen: '西南' },
				'庚午': { yi: ['出行', '酬神', '求财'], ji: ['赴任', '诉讼', '祈福', '祭祀', '开光', '斋醮'], chong: '鼠', sha: '煞北', xishen: '正南', caishen: '正南', fushen: '西北' },
				'辛未': { yi: ['结婚', '搬家', '安葬', '酬神', '收养子女', '求财'], ji: ['出行', '赴任', '祈福', '祭祀', '开光', '斋醮'], chong: '牛', sha: '煞西', xishen: '东南', caishen: '正南', fushen: '正西' },
				'壬申': { yi: ['结婚', '出行', '搬新房', '开业', '赴任', '祈福', '求子', '求财'], ji: ['安葬', '修造', '开光'], chong: '虎', sha: '煞南', xishen: '东北', caishen: '东北', fushen: '东南' },
				'癸酉': { yi: ['结婚', '搬家', '交易', '搬新房', '开业', '祈福', '安葬', '祭祀', '修造', '酬神', '求子', '斋醮'], ji: [], chong: '兔', sha: '煞东', xishen: '西北', caishen: '西南', fushen: '东南' },
				'甲戌': { yi: [], ji: ['诸事不宜'], chong: '龙', sha: '煞北', xishen: '西南', caishen: '正西', fushen: '正东' },
				'乙亥': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '安葬', '修造', '收养子女', '求财'], ji: [], chong: '蛇', sha: '煞西', xishen: '正南', caishen: '正西', fushen: '正东' }
			};
			
			return SHICHEN_NAMES.map((name, index) => {
				const ganIndex = (dayGanIndex + index) % 10;
				const ganzhi = shichenGan[ganIndex] + name;
				const zhiIndex = DIZHI.indexOf(name);
				const chongIndex = (zhiIndex + 6) % 12;
				const shaIndex = zhiIndex % 4;
				
				const defaultData = {
					yi: [],
					ji: [],
					chong: CHONG_ANIMALS[chongIndex],
					sha: '煞' + SHA_DIRECTIONS[shaIndex],
					xishen: '西南',
					caishen: '正西',
					fushen: '正东'
				};
				
				const data = shichenYiJi[ganzhi] || defaultData;
				
				return {
					name: name,
					ganzhi: ganzhi,
					time: this.getShichenTime(index),
					status: data.yi.length > 0 && data.ji.length === 0 ? '吉' : (data.ji.length > 0 && data.ji[0] === '诸事不宜' ? '凶' : (data.yi.length > data.ji.length ? '吉' : '凶')),
					ji: data.ji.length > 0 && (data.ji[0] === '诸事不宜' || data.ji.length >= data.yi.length),
					chongsha: '冲' + data.chong,
					sha: data.sha,
					xishen: data.xishen,
					caishen: data.caishen,
					fushen: data.fushen,
					yi: data.yi,
					jiItems: data.ji
				};
			});
		}
	}
};
</script>

<style scoped>
.huangli-container {
	min-height: 100vh;
	background: #f5f0e6;
	padding-bottom: 40rpx;
}

.date-selector-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	padding: 20rpx 30rpx;
	border-bottom: 1rpx solid #eee;
}

.nav-btn {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f5f0e6;
	border-radius: 50%;
}

.nav-icon {
	font-size: 36rpx;
	color: #8b4513;
	font-weight: bold;
}

.date-display {
	text-align: center;
	flex: 1;
}

.solar-date {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 4rpx;
}

.week-day {
	font-size: 24rpx;
	color: #999;
}

.main-card {
	margin: 20rpx;
	background: linear-gradient(135deg, #d43d3d 0%, #b83030 100%);
	border-radius: 16rpx;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.main-date {
	flex: 1;
}

.day-num {
	font-size: 96rpx;
	font-weight: bold;
	color: #fff;
	line-height: 1;
}

.lunar-info {
	margin-top: 12rpx;
}

.lunar-date {
	display: block;
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.9);
	font-weight: 500;
	margin-bottom: 4rpx;
}

.ganzhi-date {
	font-size: 22rpx;
	color: rgba(255, 255, 255, 0.7);
}

.zodiac-box {
	background: rgba(255, 255, 255, 0.2);
	padding: 16rpx 24rpx;
	border-radius: 24rpx;
}

.zodiac-text {
	font-size: 28rpx;
	color: #fff;
	font-weight: bold;
}

.yiji-section {
	display: flex;
	gap: 16rpx;
	margin: 0 20rpx;
}

.yi-card, .ji-card {
	flex: 1;
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;
}

.card-header {
	padding: 16rpx;
	text-align: center;
}

.card-header.yi {
	background: #d43d3d;
}

.card-header.ji {
	background: #333;
}

.header-icon {
	font-size: 32rpx;
	color: #fff;
	font-weight: bold;
}

.card-content {
	padding: 16rpx;
	display: flex;
	flex-wrap: wrap;
	gap: 8rpx;
}

.yiji-item {
	font-size: 24rpx;
	color: #5c4033;
	padding: 6rpx 12rpx;
	background: #f5f0e6;
	border-radius: 8rpx;
}

.ji-card .yiji-item {
	color: #999;
}

.info-card {
	margin: 20rpx;
	background: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
}

.info-row {
	display: flex;
	justify-content: space-around;
}

.info-item {
	text-align: center;
}

.info-label {
	display: block;
	font-size: 24rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.info-value {
	font-size: 26rpx;
	color: #333;
	font-weight: 500;
}

.shichen-section {
	margin: 20rpx;
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
}

.section-title-bar {
	padding: 20rpx 24rpx;
	border-bottom: 1rpx solid #f0e6d6;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}

.shichen-list {
	padding: 16rpx;
}

.shichen-card {
	background: #faf8f3;
	border-radius: 12rpx;
	padding: 16rpx;
	margin-bottom: 16rpx;
	border: 2rpx solid #e8dcc8;
}

.shichen-card:last-child {
	margin-bottom: 0;
}

.shichen-card.ji {
	background: #fff5f5;
	border-color: #ffe4e4;
}

.shichen-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-bottom: 12rpx;
}

.shichen-main {
	display: flex;
	align-items: baseline;
	gap: 8rpx;
}

.shichen-ganzhi {
	font-size: 28rpx;
	font-weight: bold;
	color: #5c4033;
}

.shichen-name {
	font-size: 26rpx;
	color: #6b5344;
	font-weight: 500;
}

.shichen-time {
	font-size: 22rpx;
	color: #9a7b4f;
	margin-left: auto;
}

.shichen-status {
	padding: 6rpx 16rpx;
	border-radius: 20rpx;
	background: #d4edda;
}

.shichen-status text {
	font-size: 22rpx;
	font-weight: bold;
	color: #155724;
}

.shichen-status.ji {
	background: #f8d7da;
}

.shichen-status.ji text {
	color: #721c24;
}

.shichen-info {
	margin-bottom: 12rpx;
}

.shichen-chongsha {
	font-size: 24rpx;
	color: #5c4033;
	font-weight: 500;
}

.shichen-directions {
	display: flex;
	gap: 24rpx;
	margin-bottom: 12rpx;
}

.direction-item {
	font-size: 24rpx;
	color: #6b5344;
}

.direction-label {
	color: #9a7b4f;
	margin-right: 4rpx;
}

.shichen-yi,
.shichen-ji {
	display: flex;
	flex-wrap: wrap;
	gap: 8rpx;
	font-size: 24rpx;
	line-height: 1.5;
}

.shichen-yi {
	margin-bottom: 8rpx;
}

.yi-label,
.ji-label {
	color: #9a7b4f;
	font-weight: 500;
}

.yi-content {
	color: #228b22;
}

.ji-content {
	color: #d43d3d;
}

.shensha-section {
	margin: 20rpx;
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;
}

.shensha-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	padding: 16rpx;
	gap: 12rpx;
}

.shensha-card {
	background: #f5f0e6;
	border-radius: 8rpx;
	padding: 16rpx;
}

.shensha-title {
	display: block;
	font-size: 22rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.shensha-value {
	font-size: 24rpx;
	color: #333;
	line-height: 1.5;
}

.pengzu-section {
	margin: 20rpx;
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;
}

.pengzu-content {
	padding: 20rpx;
}

.pengzu-text {
	font-size: 26rpx;
	color: #333;
	line-height: 1.6;
}

.xingxiu-section {
	margin: 20rpx;
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;
}

.xingxiu-content {
	padding: 20rpx;
}

.xingxiu-text {
	font-size: 26rpx;
	color: #333;
}

.jishen-direction-section {
	margin: 20rpx;
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;
}

.direction-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	padding: 16rpx;
	gap: 12rpx;
}

.direction-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx;
	background: #f5f0e6;
	border-radius: 8rpx;
}

.direction-name {
	font-size: 26rpx;
	color: #d43d3d;
	font-weight: bold;
}

.direction-value {
	font-size: 26rpx;
	color: #333;
	font-weight: 500;
}
</style>