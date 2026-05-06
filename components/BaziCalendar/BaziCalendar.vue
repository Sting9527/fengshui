<template>
	<view class="bazi-calendar">
		<view class="bg-decoration">
			<view class="corner-decoration top-left"></view>
			<view class="corner-decoration top-right"></view>
			<view class="corner-decoration bottom-left"></view>
			<view class="corner-decoration bottom-right"></view>
			<view class="center-pattern"></view>
		</view>
		
		<view class="header-section">
			<view class="title-box">
				<view class="title-icon">☯</view>
				<text class="main-title">八字排盘</text>
			</view>
			<text class="sub-title">生辰八字 · 命理分析</text>
		</view>
		
		<view class="input-section">
			<view class="section-header">
				<view class="section-icon">📝</view>
				<text class="section-title">出生信息</text>
			</view>
			
			<view class="input-content">
				<view class="input-row">
					<view class="input-item half">
						<text class="input-label">姓名</text>
						<input class="input-field" type="text" v-model="inputData.name" placeholder="请输入姓名" />
					</view>
					<view class="input-item half">
						<text class="input-label">性别</text>
						<view class="gender-select">
							<view 
								class="gender-option" 
								:class="{ active: inputData.gender === 'male' }"
								@tap="inputData.gender = 'male'"
							>
								男
							</view>
							<view 
								class="gender-option" 
								:class="{ active: inputData.gender === 'female' }"
								@tap="inputData.gender = 'female'"
							>
								女
							</view>
						</view>
					</view>
				</view>
				
				<view class="input-item">
					<text class="input-label">出生日期</text>
					<picker mode="date" :value="inputData.date" @change="onDateChange">
						<view class="picker-field">
							<text>{{ inputData.date || '请选择日期' }}</text>
							<text class="picker-arrow">▼</text>
						</view>
					</picker>
				</view>
				
				<view class="input-row">
					<view class="input-item half">
						<text class="input-label">出生时辰</text>
						<picker mode="time" :value="inputData.hour" @change="onHourChange">
							<view class="picker-field">
								<text>{{ inputData.hour || '请选择' }}</text>
								<text class="picker-arrow">▼</text>
							</view>
						</picker>
					</view>
					<view class="input-item half">
						<text class="input-label">出生分</text>
						<picker mode="time" :value="inputData.minute" @change="onMinuteChange">
							<view class="picker-field">
								<text>{{ inputData.minute || '请选择' }}</text>
								<text class="picker-arrow">▼</text>
							</view>
						</picker>
					</view>
				</view>
				
				<view class="input-item">
					<text class="input-label">历法</text>
					<view class="calendar-select">
						<view 
							class="calendar-option" 
							:class="{ active: inputData.calendar === 'solar' }"
							@tap="inputData.calendar = 'solar'"
						>
							阳历
						</view>
						<view 
							class="calendar-option" 
							:class="{ active: inputData.calendar === 'lunar' }"
							@tap="inputData.calendar = 'lunar'"
						>
							阴历
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="action-section">
			<view class="calculate-btn" :class="{ loading: isCalculating }" @tap="calculateBazi">
				<text class="btn-text">{{ isCalculating ? '计算中...' : '开始排盘' }}</text>
			</view>
		</view>
		
		<view class="result-section" v-if="showResult">
			<view class="bazi-info">
				<view class="section-header">
					<text class="section-title">{{ inputData.name || '命主' }}的八字</text>
					<text class="gender-tag">{{ inputData.gender === 'male' ? '男' : '女' }}</text>
				</view>
				
				<view class="bazi-main">
					<view class="bazi-pillar year-pillar">
						<view class="pillar-header">
							<text class="pillar-label">年柱</text>
							<text class="pillar-year">{{ baziResult.yearAge }}</text>
						</view>
						<view class="pillar-content">
							<view class="gan-zhi-box">
								<text class="gan">{{ baziResult.yearGan }}</text>
								<text class="zhi">{{ baziResult.yearZhi }}</text>
							</view>
							<text class="nayin">{{ baziResult.yearNayin }}</text>
						</view>
						<view class="pillar-footer">
							<text class="shengxiao">{{ baziResult.yearShengxiao }}</text>
						</view>
					</view>
					
					<view class="bazi-pillar month-pillar">
						<view class="pillar-header">
							<text class="pillar-label">月柱</text>
							<text class="pillar-year">{{ baziResult.monthAge }}</text>
						</view>
						<view class="pillar-content">
							<view class="gan-zhi-box">
								<text class="gan">{{ baziResult.monthGan }}</text>
								<text class="zhi">{{ baziResult.monthZhi }}</text>
							</view>
							<text class="nayin">{{ baziResult.monthNayin }}</text>
						</view>
						<view class="pillar-footer">
							<text class="shengxiao">{{ baziResult.monthShengxiao }}</text>
						</view>
					</view>
					
					<view class="bazi-pillar day-pillar">
						<view class="pillar-header">
							<text class="pillar-label">日柱</text>
						</view>
						<view class="pillar-content">
							<view class="gan-zhi-box">
								<text class="gan">{{ baziResult.dayGan }}</text>
								<text class="zhi">{{ baziResult.dayZhi }}</text>
							</view>
							<text class="nayin">{{ baziResult.dayNayin }}</text>
						</view>
						<view class="pillar-footer">
							<text class="shengxiao">{{ baziResult.dayShengxiao }}</text>
						</view>
					</view>
					
					<view class="bazi-pillar hour-pillar">
						<view class="pillar-header">
							<text class="pillar-label">时柱</text>
						</view>
						<view class="pillar-content">
							<view class="gan-zhi-box">
								<text class="gan">{{ baziResult.hourGan }}</text>
								<text class="zhi">{{ baziResult.hourZhi }}</text>
							</view>
							<text class="nayin">{{ baziResult.hourNayin }}</text>
						</view>
						<view class="pillar-footer">
							<text class="shengxiao">{{ baziResult.hourShengxiao }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="wuxing-section">
				<view class="section-header">
					<text class="section-title">五行分布</text>
				</view>
				<view class="wuxing-content">
					<view class="wuxing-item" v-for="(item, index) in wuxingList" :key="index">
						<text class="wuxing-name">{{ item.name }}</text>
						<view class="wuxing-bar">
							<view class="wuxing-fill" :style="{ width: item.percent + '%', background: item.color }"></view>
						</view>
						<text class="wuxing-count">{{ item.count }}个</text>
					</view>
				</view>
			</view>
			
			<view class="detail-section">
				<view class="section-header">
					<text class="section-title">命局分析</text>
				</view>
				<view class="detail-content">
					<view class="detail-row">
						<text class="detail-label">日主</text>
						<text class="detail-value rizhu-style">{{ baziResult.dayGan }}{{ wuxingResult[baziResult.dayWuxing] }}</text>
					</view>
					<view class="detail-row">
						<text class="detail-label">纳音</text>
						<text class="detail-value">{{ baziResult.dayNayin }}</text>
					</view>
					<view class="detail-row">
						<text class="detail-label">旬空</text>
						<text class="detail-value">{{ baziResult.xunkong }}</text>
					</view>
					<view class="detail-row">
						<text class="detail-label">胎元</text>
						<text class="detail-value">{{ baziResult.taiyuan }}</text>
					</view>
					<view class="detail-row">
						<text class="detail-label">命宫</text>
						<text class="detail-value">{{ baziResult.minggong }}</text>
					</view>
				</view>
			</view>
			
			<view class="shishen-section">
				<view class="section-header">
					<text class="section-title">十神分析</text>
				</view>
				<view class="shishen-content">
					<view class="shishen-grid">
						<view class="shishen-item" v-for="(item, index) in shishenList" :key="index">
							<text class="shishen-gan">{{ item.gan }}</text>
							<text class="shishen-name">{{ item.shishen }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="tiangan-section">
				<view class="section-header">
					<text class="section-title">天干通变</text>
				</view>
				<view class="tiangan-content">
					<view class="tiangan-row">
						<text class="tiangan-label">合</text>
						<text class="tiangan-value">{{ baziResult.tianganHe }}</text>
					</view>
					<view class="tiangan-row">
						<text class="tiangan-label">冲</text>
						<text class="tiangan-value">{{ baziResult.tianganChong }}</text>
					</view>
				</view>
			</view>
			
			<view class="dizhi-section">
				<view class="section-header">
					<text class="section-title">地支关系</text>
				</view>
				<view class="dizhi-content">
					<view class="dizhi-row">
						<text class="dizhi-label">合</text>
						<text class="dizhi-value">{{ baziResult.dizhiHe }}</text>
					</view>
					<view class="dizhi-row">
						<text class="dizhi-label">冲</text>
						<text class="dizhi-value">{{ baziResult.dizhiChong }}</text>
					</view>
					<view class="dizhi-row">
						<text class="dizhi-label">刑</text>
						<text class="dizhi-value">{{ baziResult.dizhiXing }}</text>
					</view>
					<view class="dizhi-row">
						<text class="dizhi-label">害</text>
						<text class="dizhi-value">{{ baziResult.dizhiHai }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="intro-section" v-if="!showResult">
			<view class="section-header">
				<view class="section-icon">📚</view>
				<text class="section-title">八字简介</text>
			</view>
			<view class="intro-content">
				<view class="intro-item">
					<text class="intro-number">1.</text>
					<text class="intro-text">八字，即生辰八字，是一个人出生时的干支历日期。年干和年支组成年柱，月干和月支组成月柱，日干和日支组成日柱，时干和时支组成时柱，共四柱，每柱两字，合称八字。</text>
				</view>
				<view class="intro-item">
					<text class="intro-number">2.</text>
					<text class="intro-text">八字命理学是一种根据干支历、阴阳五行、神煞等理论推测人的事业、婚姻、财运、学业、健康等事的学问。</text>
				</view>
				<view class="intro-item">
					<text class="intro-number">3.</text>
					<text class="intro-text">此测算结果仅供参考，命运掌握在自己手中。</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { Solar, Lunar } from 'lunar-javascript';

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const TIANGAN_WUXING = { '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水' };
const DIZHI_WUXING = { '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水' };
const DIZHI_SHENGXIAO = { '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔', '辰': '龙', '巳': '蛇', '午': '马', '未': '羊', '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪' };

const NAYIN = {
	'海中金': ['甲子', '乙丑'], '炉中火': ['丙寅', '丁卯'], '大林木': ['戊辰', '己巳'],
	'路旁土': ['庚午', '辛未'], '剑锋金': ['壬申', '癸酉'], '山头火': ['甲戌', '乙亥'],
	'涧下水': ['丙子', '丁丑'], '城头土': ['戊寅', '己卯'], '白蜡金': ['庚辰', '辛巳'],
	'杨柳木': ['壬午', '癸未'], '井泉水': ['甲申', '乙酉'], '屋上土': ['丙戌', '丁亥'],
	'霹雳火': ['戊子', '己丑'], '松柏木': ['庚寅', '辛卯'], '长流水': ['壬辰', '癸巳'],
	'砂石金': ['甲午', '乙未'], '山下火': ['丙申', '丁酉'], '平地木': ['戊戌', '己亥'],
	'壁上土': ['庚子', '辛丑'], '金箔金': ['壬寅', '癸卯'], '覆灯火': ['甲辰', '乙巳'],
	'天河水': ['丙午', '丁未'], '大驿土': ['戊申', '己酉'], '钗钏金': ['庚戌', '辛亥'],
	'桑柘木': ['壬子', '癸丑'], '大溪水': ['甲寅', '乙卯'], '砂中土': ['丙辰', '丁巳'],
	'天上火': ['戊午', '己未'], '石榴木': ['庚申', '辛酉'], '大海水': ['壬戌', '癸亥']
};

const SOLAR_TERMS = [
	{ term: '小寒', month: 1, day: 6 },
	{ term: '大寒', month: 1, day: 21 },
	{ term: '立春', month: 2, day: 4 },
	{ term: '雨水', month: 2, day: 19 },
	{ term: '惊蛰', month: 3, day: 6 },
	{ term: '春分', month: 3, day: 21 },
	{ term: '清明', month: 4, day: 5 },
	{ term: '谷雨', month: 4, day: 20 },
	{ term: '立夏', month: 5, day: 6 },
	{ term: '小满', month: 5, day: 21 },
	{ term: '芒种', month: 6, day: 6 },
	{ term: '夏至', month: 6, day: 22 },
	{ term: '小暑', month: 7, day: 7 },
	{ term: '大暑', month: 7, day: 23 },
	{ term: '立秋', month: 8, day: 8 },
	{ term: '处暑', month: 8, day: 23 },
	{ term: '白露', month: 9, day: 8 },
	{ term: '秋分', month: 9, day: 23 },
	{ term: '寒露', month: 10, day: 8 },
	{ term: '霜降', month: 10, day: 24 },
	{ term: '立冬', month: 11, day: 8 },
	{ term: '小雪', month: 11, day: 22 },
	{ term: '大雪', month: 12, day: 7 },
	{ term: '冬至', month: 12, day: 22 }
];

const YUANSHANG_QIYUE = {
	'甲己': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
	'乙庚': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
	'丙辛': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
	'丁壬': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
	'戊癸': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙']
};

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

const RISHANG_QISHI = {
	'甲己': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
	'乙庚': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
	'丙辛': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
	'丁壬': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
	'戊癸': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
};

const SHISHEN = { '比': '比肩', '劫': '劫财', '食': '食神', '伤': '伤官', '才': '偏财', '财': '正财', '官': '正官', '杀': '七杀', '枭': '偏印', '印': '正印' };

const WUXING = ['木', '火', '土', '金', '水'];

const DIZHI_XING = { '子': ['卯', '午', '酉'], '丑': ['酉', '午', '戌', '未'], '寅': ['申', '午', '戌'], '卯': ['子', '午', '酉'], '辰': ['酉', '戌', '丑'], '巳': ['亥', '午', '丑'], '午': ['子', '卯', '酉'], '未': ['丑', '子', '戌'], '申': ['寅', '午', '戌'], '酉': ['子', '卯', '午'], '戌': ['丑', '午', '酉', '未'], '亥': ['申', '午', '未'] };
const DIZHI_HE = { '子': ['丑', '子'], '丑': ['子', '巳'], '寅': ['亥', '午'], '卯': ['戌', '未'], '辰': ['酉', '戌'], '巳': ['申', '辰'], '午': ['未', '丑'], '未': ['午', '卯'], '申': ['巳', '寅'], '酉': ['辰', '子'], '戌': ['卯', '寅'], '亥': ['寅', '申'] };
const DIZHI_CHONG = { '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥', '午': '子', '未': '丑', '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳' };
const DIZHI_HAI = { '子': '未', '丑': '午', '寅': '巳', '卯': '辰', '辰': '卯', '巳': '寅', '午': '丑', '未': '子', '申': '亥', '酉': '戌', '戌': '酉', '亥': '申' };

function getNayin(gan, zhi) {
	for (const [name, pairs] of Object.entries(NAYIN)) {
		if (pairs.includes(gan + zhi)) return name;
	}
	return '';
}

function getShiShen(riGan, gan) {
	const relations = {
		'甲': { '甲': '比', '乙': '劫', '丙': '食', '丁': '伤', '戊': '才', '己': '财', '庚': '官', '辛': '杀', '壬': '枭', '癸': '印' },
		'乙': { '甲': '劫', '乙': '比', '丙': '伤', '丁': '食', '戊': '财', '己': '才', '庚': '杀', '辛': '官', '壬': '印', '癸': '枭' },
		'丙': { '甲': '印', '乙': '枭', '丙': '比', '丁': '劫', '戊': '食', '己': '伤', '庚': '才', '辛': '财', '壬': '官', '癸': '杀' },
		'丁': { '甲': '枭', '乙': '印', '丙': '劫', '丁': '比', '戊': '伤', '己': '食', '庚': '财', '辛': '才', '壬': '杀', '癸': '官' },
		'戊': { '甲': '官', '乙': '杀', '丙': '印', '丁': '枭', '戊': '比', '己': '劫', '庚': '食', '辛': '伤', '壬': '才', '癸': '财' },
		'己': { '甲': '杀', '乙': '官', '丙': '枭', '丁': '印', '戊': '劫', '己': '比', '庚': '伤', '辛': '食', '壬': '财', '癸': '才' },
		'庚': { '甲': '财', '乙': '才', '丙': '官', '丁': '杀', '戊': '印', '己': '枭', '庚': '比', '辛': '劫', '壬': '食', '癸': '伤' },
		'辛': { '甲': '才', '乙': '财', '丙': '杀', '丁': '官', '戊': '枭', '己': '印', '庚': '劫', '辛': '比', '壬': '伤', '癸': '食' },
		'壬': { '甲': '伤', '乙': '食', '丙': '财', '丁': '才', '戊': '官', '己': '杀', '庚': '枭', '辛': '印', '壬': '比', '癸': '劫' },
		'癸': { '甲': '食', '乙': '伤', '丙': '才', '丁': '财', '戊': '杀', '己': '官', '庚': '印', '辛': '枭', '壬': '劫', '癸': '比' }
	};
	return relations[riGan]?.[gan] || '';
}

function getXunkong(zhi) {
	const xun = ['甲子', '甲戌', '甲申', '甲午', '甲辰', '甲寅', '乙丑', '乙亥', '乙酉', '乙未', '乙巳', '乙卯', '丙寅', '丙子', '丙戌', '丙申', '丙午', '丙辰', '丁卯', '丁丑', '丁亥', '丁酉', '丁未', '丁巳', '戊辰', '戊寅', '戊子', '戊戌', '戊申', '戊午', '己巳', '己卯', '己丑', '己亥', '己酉', '己未', '庚午', '庚辰', '庚寅', '庚子', '庚戌', '庚申', '辛未', '辛巳', '辛卯', '辛丑', '辛亥', '辛酉', '壬申', '壬午', '壬辰', '壬寅', '壬子', '壬戌', '癸酉', '癸未', '癸巳', '癸卯', '癸丑', '癸亥'];
	const kong = ['戌亥', '申酉', '午未', '辰巳', '寅卯', '子丑'];
	const zhiIndex = DIZHI.indexOf(zhi);
	const xunIndex = Math.floor(zhiIndex / 2) % 6;
	return xun[zhiIndex] + '旬空' + kong[xunIndex];
}

function getTianganHe(gan1, gan2) {
	const he = { '甲': '己', '己': '甲', '乙': '庚', '庚': '乙', '丙': '辛', '辛': '丙', '丁': '壬', '壬': '丁', '戊': '癸', '癸': '戊' };
	return he[gan1] === gan2 ? gan1 + '合' + gan2 : '';
}

function getDizhiHe(zhi1, zhi2) {
	const he = { '子丑': '子丑合', '寅亥': '寅亥合', '卯戌': '卯戌合', '辰酉': '辰酉合', '巳申': '巳申合', '午未': '午未合' };
	const key = zhi1 + zhi2;
	const reverseKey = zhi2 + zhi1;
	return he[key] || he[reverseKey] || '';
}

function getTianganChong(gan1, gan2) {
	const chong = { '甲': '庚', '庚': '甲', '乙': '辛', '辛': '乙', '丙': '壬', '壬': '丙', '丁': '癸', '癸': '丁', '戊': '己', '己': '戊' };
	return chong[gan1] === gan2 ? gan1 + '冲' + gan2 : '';
}

function getDizhiChong(zhi) {
	return DIZHI_CHONG[zhi] || '';
}

function getDizhiXing(zhi) {
	return DIZHI_XING[zhi]?.join('、') || '';
}

function getDizhiHai(zhi) {
	return DIZHI_HAI[zhi] || '';
}

function getTaiyuan(monthZhi, dayGan) {
	const taiyuanRelation = {
		'子': '丑', '丑': '寅', '寅': '卯', '卯': '辰', '辰': '巳', '巳': '午',
		'午': '未', '未': '申', '申': '酉', '酉': '戌', '戌': '亥', '亥': '子'
	};
	const zhiIndex = DIZHI.indexOf(monthZhi);
	const taiyuanZhiIndex = (zhiIndex + 2) % 12;
	const dayGanIndex = TIANGAN.indexOf(dayGan);
	const taiyuanGan = TIANGAN[(dayGanIndex + 3) % 10];
	return taiyuanGan + DIZHI[taiyuanZhiIndex];
}

function getMinggong(monthZhi, hourZhi) {
	const minggongZhi = DIZHI[(DIZHI.indexOf(monthZhi) + DIZHI.indexOf(hourZhi) + 6) % 12];
	return '甲' + minggongZhi;
}

function getYearGan(year, month, day, hour) {
	return TIANGAN[(year - 4) % 10 < 0 ? (year - 4) % 10 + 10 : (year - 4) % 10];
}

function getMonthGan(yearGan, month) {
	const keyMap = { '甲': '甲己', '乙': '乙庚', '丙': '丙辛', '丁': '丁壬', '戊': '戊癸', '己': '甲己', '庚': '乙庚', '辛': '丙辛', '壬': '丁壬', '癸': '戊癸' };
	const key = keyMap[yearGan];
	const table = YUANSHANG_QIYUE[key] || YUANSHANG_QIYUE['甲己'];
	return table[month - 1];
}

function getDayGanZhi(year, month, day, hour) {
	const JDN_BASE = 2415021;
	const baseDate = new Date(1900, 0, 1);
	const targetDate = new Date(year, month - 1, day);
	const days = Math.floor((targetDate - baseDate) / (24 * 60 * 60 * 1000));
	const JDN = JDN_BASE + days;
	const ganIndex = (JDN + 9) % 10;
	const zhiIndex = (JDN + 1) % 12;
	return { 
		ganIndex: ganIndex < 0 ? ganIndex + 10 : ganIndex, 
		zhiIndex: zhiIndex < 0 ? zhiIndex + 12 : zhiIndex 
	};
}

function getHourGanZhi(dayGanIndex, hour) {
	const hourIndex = Math.floor(hour / 2) % 12;
	const tables = Object.values(RISHANG_QISHI);
	const table = tables[dayGanIndex % 5] || RISHANG_QISHI['甲己'];
	return { gan: table[hourIndex], zhi: DIZHI[hourIndex] };
}

function calculateAge(year, month, day) {
	const now = new Date();
	const birthDate = new Date(year, month - 1, day);
	let age = now.getFullYear() - birthDate.getFullYear();
	const monthDiff = now.getMonth() - birthDate.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

export default {
	name: 'BaziCalendar',
	data() {
			return {
				inputData: { name: '', gender: 'male', date: '', hour: '', minute: '', calendar: 'solar' },
				isCalculating: false,
				showResult: false,
				baziResult: {},
				wuxingResult: { '木': '木命', '火': '火命', '土': '土命', '金': '金命', '水': '水命' },
				wuxingList: [],
				shishenList: [],
				lunar: null
			};
		},
	methods: {
		onDateChange(e) { this.inputData.date = e.detail.value; },
		onHourChange(e) { this.inputData.hour = e.detail.value; },
		onMinuteChange(e) { this.inputData.minute = e.detail.value; },
		
		calculateBazi() {
			if (!this.inputData.date) {
				uni.showToast({ title: '请选择出生日期', icon: 'none' });
				return;
			}
			if (!this.inputData.hour) {
				uni.showToast({ title: '请选择出生时辰', icon: 'none' });
				return;
			}
			
			this.isCalculating = true;
			this.showResult = false;
			
			setTimeout(() => {
				this.computeBazi();
				this.isCalculating = false;
				this.showResult = true;
			}, 500);
		},
		
		computeBazi() {
			const [year, month, day] = this.inputData.date.split('-').map(Number);
			const timeParts = this.inputData.hour.split(':');
			const hour = parseInt(timeParts[0]) || 0;
			const minute = parseInt(timeParts[1]) || 0;
			
			const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
			this.lunar = solar.getLunar();
			
			const yearGan = this.lunar.getYearGan();
			const yearZhi = this.lunar.getYearZhi();
			const monthGan = this.lunar.getMonthGan();
			const monthZhi = this.lunar.getMonthZhi();
			const dayGan = this.lunar.getDayGan();
			const dayZhi = this.lunar.getDayZhi();
			const hourGan = this.lunar.getTimeGan();
			const hourZhi = this.lunar.getTimeZhi();
			
			const age = calculateAge(year, month, day);
			
			// 计算纳音五行
			const getNayinFromGanZhi = (gan, zhi) => {
				for (const [name, pairs] of Object.entries(NAYIN)) {
					if (pairs.includes(gan + zhi)) return name;
				}
				return '';
			};
			
			this.baziResult = {
				yearGan, yearZhi, yearNayin: getNayinFromGanZhi(yearGan, yearZhi),
				yearShengxiao: this.lunar.getYearShengXiao(), yearAge: age + '岁',
				monthGan, monthZhi, monthNayin: getNayinFromGanZhi(monthGan, monthZhi),
				monthShengxiao: this.lunar.getMonthShengXiao(), monthAge: (age + 1) + '岁起运',
				dayGan, dayZhi, dayNayin: getNayinFromGanZhi(dayGan, dayZhi),
				dayShengxiao: this.lunar.getDayShengXiao(), dayWuxing: TIANGAN_WUXING[dayGan],
				hourGan, hourZhi, hourNayin: getNayinFromGanZhi(hourGan, hourZhi),
				hourShengxiao: this.lunar.getTimeShengXiao(),
				xunkong: this.lunar.getDayXunKong() || getXunkong(dayZhi),
				taiyuan: getTaiyuan(monthZhi, dayGan),
				minggong: getMinggong(monthZhi, hourZhi),
				tianganHe: getTianganHe(yearGan, monthGan) || getTianganHe(monthGan, dayGan) || getTianganHe(dayGan, hourGan) || '无',
				tianganChong: getTianganChong(yearGan, monthGan) || getTianganChong(monthGan, dayGan) || getTianganChong(dayGan, hourGan) || '无',
				dizhiHe: getDizhiHe(yearZhi, monthZhi) || getDizhiHe(monthZhi, dayZhi) || getDizhiHe(dayZhi, hourZhi) || '无',
				dizhiChong: this.lunar.getChong() || '无',
				dizhiXing: this.lunar.getZhiXing() || '无',
				dizhiHai: getDizhiHai(yearZhi) || getDizhiHai(monthZhi) || getDizhiHai(dayZhi) || '无'
			};
			
			this.computeWuxing(yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi);
			this.computeShishen(dayGan, yearGan, monthGan, hourGan);
		},
		
		computeWuxing(yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi) {
			const count = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
			const gans = [yearGan, monthGan, dayGan, hourGan];
			const zhis = [yearZhi, monthZhi, dayZhi, hourZhi];
			
			gans.forEach(g => { if (TIANGAN_WUXING[g]) count[TIANGAN_WUXING[g]]++; });
			zhis.forEach(z => { if (DIZHI_WUXING[z]) count[DIZHI_WUXING[z]]++; });
			
			const colors = { 
				'金': 'linear-gradient(90deg, #d4af37 0%, #f0d875 100%)', 
				'木': 'linear-gradient(90deg, #228b22 0%, #7ccd7c 100%)', 
				'水': 'linear-gradient(90deg, #4169e1 0%, #87ceeb 100%)', 
				'火': 'linear-gradient(90deg, #dc143c 0%, #ff6b6b 100%)', 
				'土': 'linear-gradient(90deg, #8b4513 0%, #d2b48c 100%)' 
			};
			
			const total = Object.values(count).reduce((a, b) => a + b, 0);
			this.wuxingList = WUXING.map(w => ({
				name: w, count: count[w],
				percent: total > 0 ? Math.round((count[w] / total) * 100) : 0,
				color: colors[w]
			}));
		},
		
		computeShishen(dayGan, yearGan, monthGan, hourGan) {
			// 使用库提供的十神方法
			const shishenFromLunar = this.lunar.getBaZiShiShenGan();
			this.shishenList = [
				{ gan: '年干', shishen: shishenFromLunar[0] || SHISHEN[getShiShen(dayGan, yearGan)] || '-' },
				{ gan: '月干', shishen: shishenFromLunar[1] || SHISHEN[getShiShen(dayGan, monthGan)] || '-' },
				{ gan: '日主', shishen: dayGan + '元' },
				{ gan: '时干', shishen: shishenFromLunar[3] || SHISHEN[getShiShen(dayGan, hourGan)] || '-' }
			];
		}
	}
};
</script>

<style scoped>
.bazi-calendar {
	padding: 30rpx;
	min-height: 100vh;
	background: linear-gradient(180deg, #f5f0e6 0%, #e8dfd0 100%);
	position: relative;
	overflow: hidden;
}

.bg-decoration {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 0;
}

.corner-decoration {
	position: absolute;
	width: 120rpx;
	height: 120rpx;
	opacity: 0.15;
}

.corner-decoration::before {
	content: '';
	position: absolute;
	width: 60rpx;
	height: 60rpx;
	border: 4rpx solid #8b4513;
	border-radius: 8rpx;
}

.corner-decoration::after {
	content: '';
	position: absolute;
	width: 40rpx;
	height: 40rpx;
	border: 3rpx solid #8b4513;
	border-radius: 6rpx;
}

.top-left { top: 20rpx; left: 20rpx; }
.top-left::before { top: 0; left: 0; }
.top-left::after { top: 10rpx; left: 10rpx; }
.top-right { top: 20rpx; right: 20rpx; }
.top-right::before { top: 0; right: 0; }
.top-right::after { top: 10rpx; right: 10rpx; }
.bottom-left { bottom: 20rpx; left: 20rpx; }
.bottom-left::before { bottom: 0; left: 0; }
.bottom-left::after { bottom: 10rpx; left: 10rpx; }
.bottom-right { bottom: 20rpx; right: 20rpx; }
.bottom-right::before { bottom: 0; right: 0; }
.bottom-right::after { bottom: 10rpx; right: 10rpx; }

.center-pattern {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400rpx;
	height: 400rpx;
	background: radial-gradient(circle, rgba(212, 61, 61, 0.08) 0%, transparent 70%);
	border-radius: 50%;
}

.header-section {
	text-align: center;
	padding: 40rpx 0 30rpx;
	position: relative;
	z-index: 1;
}

.title-box {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16rpx;
	margin-bottom: 12rpx;
}

.title-icon { font-size: 44rpx; }
.main-title {
	font-size: 44rpx;
	font-weight: bold;
	color: #8b4513;
	letter-spacing: 6rpx;
}

.sub-title {
	font-size: 24rpx;
	color: #9a7b4f;
	letter-spacing: 4rpx;
}

.input-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 28rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 1;
}

.section-header {
	display: flex;
	align-items: center;
	gap: 12rpx;
	margin-bottom: 20rpx;
}

.section-icon { font-size: 32rpx; }
.section-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #5c4033;
}

.gender-tag {
	margin-left: auto;
	background: linear-gradient(135deg, #d43d3d 0%, #b83030 100%);
	color: #fff;
	padding: 6rpx 16rpx;
	border-radius: 20rpx;
	font-size: 22rpx;
}

.input-content {
	background: #fdfbf7;
	border-radius: 16rpx;
	padding: 24rpx;
	border: 1rpx solid #e8dcc8;
}

.input-row {
	display: flex;
	gap: 20rpx;
}

.input-item {
	margin-bottom: 24rpx;
}

.input-item.half {
	flex: 1;
}

.input-item:last-child {
	margin-bottom: 0;
}

.input-label {
	display: block;
	font-size: 26rpx;
	color: #6b5344;
	margin-bottom: 12rpx;
	font-weight: 500;
  height: 45rpx;
}

.input-field {
	width: 100%;
	/* padding: 45rpx 24rpx; */
	background: #fff;
	border: 2rpx solid #d4c9b0;
	border-radius: 12rpx;
	font-size: 30rpx;
	color: #333;
	box-sizing: border-box;
	transition: all 0.3s ease;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.input-field:focus {
	border-color: #c43232;
	box-shadow: 0 0 0 6rpx rgba(196, 50, 50, 0.15);
	outline: none;
}

.input-field::placeholder {
	color: #999999;
	font-size: 30rpx;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
	opacity: 1;
}

.picker-field {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx;
	background: #fff;
	border: 2rpx solid #d4c9b0;
	border-radius: 12rpx;
	font-size: 28rpx;
	color: #333;
	transition: all 0.3s ease;
}

.picker-field:active {
	border-color: #d43d3d;
}

.picker-arrow {
	font-size: 24rpx;
	color: #9a7b4f;
	transition: transform 0.3s ease;
}

.picker-field:active .picker-arrow {
	transform: rotate(180deg);
}

.gender-select,
.calendar-select {
	display: flex;
	gap: 16rpx;
}

.gender-option,
.calendar-option {
	flex: 1;
	padding: 24rpx;
	text-align: center;
	background: #fff;
	border: 2rpx solid #d4c9b0;
	border-radius: 12rpx;
	font-size: 30rpx;
	color: #5c4033;
	transition: all 0.3s ease;
	font-weight: 500;
}

.gender-option:active,
.calendar-option:active {
	transform: scale(0.98);
}

.gender-option.active,
.calendar-option.active {
	background: linear-gradient(135deg, #c43232 0%, #a82828 100%);
	color: #fff;
	border-color: #c43232;
	box-shadow: 0 4rpx 12rpx rgba(196, 50, 50, 0.3);
}

.action-section {
	text-align: center;
	padding: 20rpx 0 40rpx;
	position: relative;
	z-index: 1;
}

.calculate-btn {
	background: linear-gradient(135deg, #c43232 0%, #a82828 100%);
	padding: 28rpx 120rpx;
	border-radius: 40rpx;
	display: inline-block;
	box-shadow: 0 8rpx 20rpx rgba(196, 50, 50, 0.4);
	transition: all 0.3s ease;
	border: none;
}

.calculate-btn:active {
	transform: scale(0.96);
	box-shadow: 0 4rpx 10rpx rgba(196, 50, 50, 0.3);
}

.calculate-btn.loading {
	opacity: 0.7;
}

.btn-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #fff;
	letter-spacing: 8rpx;
}

.result-section {
	margin-bottom: 40rpx;
	position: relative;
	z-index: 1;
}

.bazi-info {
	background: #fff;
	border-radius: 16rpx;
	padding: 28rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.bazi-main {
	display: flex;
	justify-content: space-between;
	gap: 12rpx;
}

.bazi-pillar {
	flex: 1;
	background: linear-gradient(180deg, #faf8f3 0%, #f5efe6 100%);
	border: 2rpx solid #e0d5c5;
	border-radius: 16rpx;
	padding: 20rpx 12rpx;
	text-align: center;
	transition: all 0.3s ease;
}

.bazi-pillar:active {
	transform: scale(0.98);
}

.bazi-pillar.day-pillar {
	background: linear-gradient(180deg, #c43232 0%, #a82828 100%);
	border-color: #9a2424;
	box-shadow: 0 4rpx 12rpx rgba(196, 50, 50, 0.3);
}

.pillar-header {
	margin-bottom: 12rpx;
}

.pillar-label {
	font-size: 22rpx;
	color: #9a7b4f;
	font-weight: 500;
}

.day-pillar .pillar-label {
	color: rgba(255, 255, 255, 0.8);
}

.pillar-year {
	font-size: 18rpx;
	color: #9a7b4f;
	margin-left: 8rpx;
}

.day-pillar .pillar-year {
	color: rgba(255, 255, 255, 0.7);
}

.pillar-content {
	margin-bottom: 12rpx;
}

.gan-zhi-box {
	display: flex;
	justify-content: center;
	gap: 8rpx;
	margin-bottom: 8rpx;
}

.gan, .zhi {
	font-size: 44rpx;
	font-weight: bold;
	color: #5c4033;
	letter-spacing: 4rpx;
}

.day-pillar .gan, .day-pillar .zhi {
	color: #fff;
	text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}

.nayin {
	font-size: 18rpx;
	color: #9a7b4f;
}

.day-pillar .nayin {
	color: rgba(255, 255, 255, 0.8);
}

.pillar-footer {
	border-top: 1rpx dashed #d4c9b0;
	padding-top: 8rpx;
}

.day-pillar .pillar-footer {
	border-top-color: rgba(255, 255, 255, 0.3);
}

.shengxiao {
	font-size: 22rpx;
	color: #9a7b4f;
}

.day-pillar .shengxiao {
	color: rgba(255, 255, 255, 0.9);
}

.wuxing-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 28rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.wuxing-content {
	background: #faf8f3;
	border-radius: 16rpx;
	padding: 24rpx;
	border: 1rpx solid #e8dcc8;
}

.wuxing-item {
	display: flex;
	align-items: center;
	gap: 20rpx;
	margin-bottom: 20rpx;
}

.wuxing-item:last-child {
	margin-bottom: 0;
}

.wuxing-name {
	width: 60rpx;
	font-size: 30rpx;
	color: #5c4033;
	font-weight: bold;
	text-align: center;
}

.wuxing-bar {
	flex: 1;
	height: 32rpx;
	background: #e8dcc8;
	border-radius: 16rpx;
	overflow: hidden;
}

.wuxing-fill {
	height: 100%;
	border-radius: 16rpx;
	transition: width 0.6s ease;
}

.wuxing-count {
	width: 80rpx;
	text-align: right;
	font-size: 26rpx;
	color: #5c4033;
	font-weight: bold;
}

.detail-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 28rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.detail-content {
	background: #faf8f3;
	border-radius: 16rpx;
	padding: 24rpx;
	border: 1rpx solid #e8dcc8;
}

.detail-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 18rpx 20rpx;
	background: #fff;
	border-radius: 10rpx;
	margin-bottom: 12rpx;
}

.detail-row:last-child {
	margin-bottom: 0;
}

.detail-label {
	font-size: 26rpx;
	color: #6b5344;
	font-weight: 500;
	width: 100rpx;
}

.detail-value {
	font-size: 26rpx;
	color: #5c4033;
	font-weight: bold;
	text-align: right;
	flex: 1;
}

.rizhu-style {
	color: #d43d3d;
}

.shishen-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 28rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.shishen-content {
	background: #faf8f3;
	border-radius: 16rpx;
	padding: 24rpx;
	border: 1rpx solid #e8dcc8;
}

.shishen-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20rpx;
}

.shishen-item {
	text-align: center;
	padding: 20rpx 12rpx;
	background: #fff;
	border-radius: 12rpx;
	border: 2rpx solid #e8dcc8;
	transition: all 0.3s ease;
}

.shishen-item:active {
	transform: scale(0.96);
}

.shishen-gan {
	display: block;
	font-size: 30rpx;
	font-weight: bold;
	color: #5c4033;
	margin-bottom: 10rpx;
}

.shishen-name {
	font-size: 24rpx;
	color: #9a7b4f;
}

.tiangan-section,
.dizhi-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 28rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.tiangan-content,
.dizhi-content {
	background: #faf8f3;
	border-radius: 16rpx;
	padding: 24rpx;
	border: 1rpx solid #e8dcc8;
}

.tiangan-row,
.dizhi-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx 20rpx;
	background: #fff;
	border-radius: 10rpx;
	margin-bottom: 12rpx;
}

.tiangan-row:last-child,
.dizhi-row:last-child {
	margin-bottom: 0;
}

.tiangan-label,
.dizhi-label {
	font-size: 26rpx;
	color: #6b5344;
	font-weight: 500;
	width: 80rpx;
}

.tiangan-value,
.dizhi-value {
	font-size: 26rpx;
	color: #5c4033;
	text-align: right;
	flex: 1;
	font-weight: 500;
}

.intro-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 28rpx;
	margin-bottom: 40rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 1;
}

.intro-content {
	background: #faf6f1;
	border-radius: 12rpx;
	padding: 20rpx;
}

.intro-item {
	display: flex;
	gap: 12rpx;
	margin-bottom: 16rpx;
}

.intro-item:last-child {
	margin-bottom: 0;
}

.intro-number {
	font-size: 28rpx;
	font-weight: bold;
	color: #d43d3d;
	min-width: 36rpx;
}

.intro-text {
	flex: 1;
	font-size: 26rpx;
	color: #6b5344;
	line-height: 1.8;
	text-align: justify;
}
</style>
