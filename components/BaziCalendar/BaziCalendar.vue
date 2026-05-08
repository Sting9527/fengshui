<template>
	<view class="bazi-calendar">
		<view class="header-section">
			<text class="page-title">排盘</text>
			<text class="page-subtitle">请填写阳历（公历）时间：</text>
		</view>
		
		<view class="input-section">
			<view class="input-grid">
				<view class="input-item">
					<text class="input-label">年：</text>
					<picker mode="date" :value="inputData.date" @change="onDateChange">
						<view class="picker-input">
							<text>{{ inputData.year || '--' }}</text>
						</view>
					</picker>
				</view>
				
				<view class="input-item">
					<text class="input-label">月：</text>
					<picker mode="date" :value="inputData.date" @change="onDateChange">
						<view class="picker-input">
							<text>{{ inputData.month || '--' }}</text>
						</view>
					</picker>
				</view>
				
				<view class="input-item">
					<text class="input-label">日：</text>
					<picker mode="date" :value="inputData.date" @change="onDateChange">
						<view class="picker-input">
							<text>{{ inputData.day || '--' }}</text>
						</view>
					</picker>
				</view>
				
				<view class="input-item">
					<text class="input-label">时：</text>
					<picker mode="selector" :range="hourOptions" @change="onHourChange">
						<view class="picker-input">
							<text>{{ inputData.hour || '--' }}</text>
						</view>
					</picker>
				</view>
				
				<view class="input-item">
					<text class="input-label">分：</text>
					<picker mode="selector" :range="minuteOptions" @change="onMinuteChange">
						<view class="picker-input">
							<text>{{ inputData.minute || '--' }}</text>
						</view>
					</picker>
				</view>
			</view>
			
			<view class="select-section">
				<view class="select-item">
					<text class="input-label">性别：</text>
					<picker mode="selector" :range="genderOptions" @change="onGenderChange">
						<view class="picker-input">
							<text>{{ inputData.genderText }}</text>
							<text class="picker-arrow">▼</text>
						</view>
					</picker>
				</view>
				
				<view class="select-item">
					<text class="input-label">子时流派：</text>
					<picker mode="selector" :range="zishiOptions" @change="onZishiChange">
						<view class="picker-input">
							<text>{{ inputData.zishiText }}</text>
							<text class="picker-arrow">▼</text>
						</view>
					</picker>
				</view>
				
				<view class="select-item">
					<text class="input-label">起运流派：</text>
					<picker mode="selector" :range="qiyunOptions" @change="onQiyunChange">
						<view class="picker-input">
							<text>{{ inputData.qiyunText }}</text>
							<text class="picker-arrow">▼</text>
						</view>
					</picker>
				</view>
			</view>
		</view>
		
		<view class="action-section">
			<view class="calculate-btn" :class="{ loading: isCalculating }" @tap="calculateBazi">
				<text class="btn-text">{{ isCalculating ? '计算中...' : '开始排盘' }}</text>
			</view>
		</view>
		
		<view class="result-section" v-if="showResult">
			<view class="result-header">
				<text class="result-title">排盘结果</text>
			</view>
			
			<view class="bazi-display">
				<view class="bazi-row">
					<view class="bazi-pillar">
						<text class="pillar-label">年柱</text>
						<view class="pillar-content">
							<text class="gan">{{ baziResult.yearGan }}</text>
							<text class="zhi">{{ baziResult.yearZhi }}</text>
						</view>
						<text class="pillar-nayin">{{ baziResult.yearNayin }}</text>
					</view>
					
					<view class="bazi-pillar">
						<text class="pillar-label">月柱</text>
						<view class="pillar-content">
							<text class="gan">{{ baziResult.monthGan }}</text>
							<text class="zhi">{{ baziResult.monthZhi }}</text>
						</view>
						<text class="pillar-nayin">{{ baziResult.monthNayin }}</text>
					</view>
					
					<view class="bazi-pillar">
						<text class="pillar-label">日柱</text>
						<view class="pillar-content">
							<text class="gan day-master">{{ baziResult.dayGan }}</text>
							<text class="zhi">{{ baziResult.dayZhi }}</text>
						</view>
						<text class="pillar-nayin">{{ baziResult.dayNayin }}</text>
					</view>
					
					<view class="bazi-pillar">
						<text class="pillar-label">时柱</text>
						<view class="pillar-content">
							<text class="gan">{{ baziResult.hourGan }}</text>
							<text class="zhi">{{ baziResult.hourZhi }}</text>
						</view>
						<text class="pillar-nayin">{{ baziResult.hourNayin }}</text>
					</view>
				</view>
			</view>
			
			<view class="info-section">
				<view class="info-row">
					<text class="info-label">姓名</text>
					<text class="info-value">{{ inputData.name || '未填写' }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">性别</text>
					<text class="info-value">{{ inputData.genderText }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">出生日期</text>
					<text class="info-value">{{ inputData.date }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">出生时间</text>
					<text class="info-value">{{ inputData.hour }}:{{ inputData.minute }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">农历</text>
					<text class="info-value">{{ baziResult.lunarDate }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">生肖</text>
					<text class="info-value">{{ baziResult.yearShengxiao }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">纳音</text>
					<text class="info-value">{{ baziResult.dayNayin }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">旬空</text>
					<text class="info-value">{{ baziResult.xunkong }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">胎元</text>
					<text class="info-value">{{ baziResult.taiyuan }}</text>
				</view>
				<view class="info-row">
					<text class="info-label">命宫</text>
					<text class="info-value">{{ baziResult.minggong }}</text>
				</view>
			</view>
			
			<view class="shishen-section">
				<text class="section-title">十神</text>
				<view class="shishen-row">
					<view class="shishen-item">
						<text class="shishen-label">年干</text>
						<text class="shishen-value">{{ baziResult.yearShiShen }}</text>
					</view>
					<view class="shishen-item">
						<text class="shishen-label">月干</text>
						<text class="shishen-value">{{ baziResult.monthShiShen }}</text>
					</view>
					<view class="shishen-item">
						<text class="shishen-label">日干</text>
						<text class="shishen-value">{{ baziResult.dayGan }}（日主）</text>
					</view>
					<view class="shishen-item">
						<text class="shishen-label">时干</text>
						<text class="shishen-value">{{ baziResult.hourShiShen }}</text>
					</view>
				</view>
			</view>
			
			<view class="wuxing-section">
				<text class="section-title">五行</text>
				<view class="wuxing-content">
					<view class="wuxing-item" v-for="(item, index) in wuxingList" :key="index">
						<text class="wuxing-name">{{ item.name }}</text>
						<view class="wuxing-bar">
							<view class="wuxing-fill" :style="{ width: item.percent + '%', background: item.color }"></view>
						</view>
						<text class="wuxing-count">{{ item.count }}</text>
					</view>
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

const SHISHEN_MAP = {
	'甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '正官', '辛': '七杀', '壬': '偏印', '癸': '正印' },
	'乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '七杀', '辛': '正官', '壬': '正印', '癸': '偏印' },
	'丙': { '甲': '正印', '乙': '偏印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '正官', '癸': '七杀' },
	'丁': { '甲': '偏印', '乙': '正印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '七杀', '癸': '正官' },
	'戊': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
	'己': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
	'庚': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
	'辛': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
	'壬': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
	'癸': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' }
};

function getNayin(gan, zhi) {
	for (const [name, pairs] of Object.entries(NAYIN)) {
		if (pairs.includes(gan + zhi)) return name;
	}
	return '';
}

function getShiShen(riGan, gan) {
	return SHISHEN_MAP[riGan]?.[gan] || '';
}

function getTaiyuan(monthZhi, dayGan) {
	const nextZhi = DIZHI[(DIZHI.indexOf(monthZhi) + 2) % 12];
	const nextGanIndex = (TIANGAN.indexOf(dayGan) + 3) % 10;
	return TIANGAN[nextGanIndex] + nextZhi;
}

function getMinggong(monthZhi, hourZhi) {
	const minggongIndex = (DIZHI.indexOf(monthZhi) + DIZHI.indexOf(hourZhi) + 6) % 12;
	return '午' === DIZHI[minggongIndex] ? '甲午' : ('子' === DIZHI[minggongIndex] ? '甲子' : TIANGAN[0] + DIZHI[minggongIndex]);
}

export default {
	name: 'BaziCalendar',
	data() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hour = String(now.getHours()).padStart(2, '0');
		const minute = String(now.getMinutes()).padStart(2, '0');
		const dateStr = `${year}-${month}-${day}`;
		
		return {
			inputData: {
				name: '',
				date: dateStr,
				year: year.toString(),
				month: month,
				day: day,
				hour: hour,
				minute: minute,
				gender: 'male',
				genderText: '男',
				zishi: 'liupai2',
				zishiText: '流派2：晚子时日柱算当天',
				qiyun: 'qiyun1',
				qiyunText: '流派1：3天=1年，1天=4月，1时辰=10天'
			},
			isCalculating: false,
			showResult: false,
			baziResult: {},
			wuxingList: [],
			hourOptions: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
			minuteOptions: ['00', '15', '30', '45'],
			genderOptions: ['男', '女'],
			zishiOptions: ['流派1：早子时日柱算当天', '流派2：晚子时日柱算当天'],
			qiyunOptions: ['流派1：3天=1年，1天=4月，1时辰=10天', '流派2：1天=4个月，1时辰=10天']
		};
	},
	methods: {
		onDateChange(e) {
			const value = e.detail.value;
			this.inputData.date = value;
			const parts = value.split('-');
			this.inputData.year = parts[0];
			this.inputData.month = parts[1];
			this.inputData.day = parts[2];
		},
		onHourChange(e) {
			this.inputData.hour = this.hourOptions[e.detail.value];
		},
		onMinuteChange(e) {
			this.inputData.minute = this.minuteOptions[e.detail.value];
		},
		onGenderChange(e) {
			this.inputData.gender = e.detail.value === 0 ? 'male' : 'female';
			this.inputData.genderText = this.genderOptions[e.detail.value];
		},
		onZishiChange(e) {
			this.inputData.zishi = e.detail.value === 0 ? 'liupai1' : 'liupai2';
			this.inputData.zishiText = this.zishiOptions[e.detail.value];
		},
		onQiyunChange(e) {
			this.inputData.qiyun = e.detail.value === 0 ? 'qiyun1' : 'qiyun2';
			this.inputData.qiyunText = this.qiyunOptions[e.detail.value];
		},
		calculateBazi() {
			if (!this.inputData.date) {
				uni.showToast({ title: '请选择日期', icon: 'none' });
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
			const year = parseInt(this.inputData.year);
			const month = parseInt(this.inputData.month);
			const day = parseInt(this.inputData.day);
			const hour = parseInt(this.inputData.hour);
			const minute = parseInt(this.inputData.minute);
			
			const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
			const lunar = solar.getLunar();
			
			const yearGan = lunar.getYearGan();
			const yearZhi = lunar.getYearZhi();
			const monthGan = lunar.getMonthGan();
			const monthZhi = lunar.getMonthZhi();
			const dayGan = lunar.getDayGan();
			const dayZhi = lunar.getDayZhi();
			const hourGan = lunar.getTimeGan();
			const hourZhi = lunar.getTimeZhi();
			
			this.baziResult = {
				yearGan, yearZhi, yearNayin: getNayin(yearGan, yearZhi),
				yearShengxiao: lunar.getYearShengXiao(),
				monthGan, monthZhi, monthNayin: getNayin(monthGan, monthZhi),
				dayGan, dayZhi, dayNayin: getNayin(dayGan, dayZhi),
				hourGan, hourZhi, hourNayin: getNayin(hourGan, hourZhi),
				lunarDate: lunar.getMonthInChinese() + '月' + lunar.getDayInChinese(),
				xunkong: lunar.getDayXunKong() || '',
				taiyuan: getTaiyuan(monthZhi, dayGan),
				minggong: getMinggong(monthZhi, hourZhi),
				yearShiShen: getShiShen(dayGan, yearGan),
				monthShiShen: getShiShen(dayGan, monthGan),
				hourShiShen: getShiShen(dayGan, hourGan)
			};
			
			this.computeWuxing(yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi);
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
			const WUXING = ['金', '木', '水', '火', '土'];
			this.wuxingList = WUXING.map(w => ({
				name: w, count: count[w],
				percent: total > 0 ? Math.round((count[w] / total) * 100) : 0,
				color: colors[w]
			}));
		}
	}
};
</script>

<style scoped>
.bazi-calendar {
	min-height: 100vh;
	background: #f5f5f5;
	padding: 20rpx;
}

.header-section {
	margin-bottom: 30rpx;
}

.page-title {
	display: block;
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
	text-align: center;
	margin-bottom: 10rpx;
}

.page-subtitle {
	display: block;
	font-size: 28rpx;
	color: #666;
	text-align: center;
}

.input-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 20rpx;
	margin-bottom: 30rpx;
}

.input-grid {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 10rpx;
	margin-bottom: 20rpx;
}

.input-item {
	display: flex;
	flex-direction: column;
}

.input-label {
	font-size: 24rpx;
	color: #666;
	margin-bottom: 8rpx;
}

.picker-input {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16rpx 12rpx;
	background: #f8f8f8;
	border: 1rpx solid #ddd;
	border-radius: 8rpx;
	font-size: 28rpx;
	color: #333;
}

.picker-arrow {
	font-size: 20rpx;
	color: #999;
}

.select-section {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.select-item {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.select-item .input-label {
	min-width: 120rpx;
	margin-bottom: 0;
}

.select-item .picker-input {
	flex: 1;
}

.action-section {
	margin-bottom: 30rpx;
}

.calculate-btn {
	background: linear-gradient(135deg, #c43232 0%, #a32929 100%);
	border-radius: 40rpx;
	padding: 24rpx;
	text-align: center;
}

.calculate-btn.loading {
	background: #ccc;
}

.btn-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #fff;
}

.result-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 20rpx;
}

.result-header {
	text-align: center;
	margin-bottom: 20rpx;
	padding-bottom: 15rpx;
	border-bottom: 1rpx solid #eee;
}

.result-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.bazi-display {
	margin-bottom: 25rpx;
}

.bazi-row {
	display: flex;
	justify-content: space-between;
}

.bazi-pillar {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	padding: 15rpx 10rpx;
	background: #fafafa;
	border-radius: 12rpx;
	margin: 0 5rpx;
}

.pillar-label {
	font-size: 22rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.pillar-content {
	display: flex;
	gap: 8rpx;
	margin-bottom: 8rpx;
}

.gan {
	font-size: 36rpx;
	font-weight: bold;
	color: #c43232;
}

.gan.day-master {
	color: #333;
}

.zhi {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.pillar-nayin {
	font-size: 20rpx;
	color: #666;
}

.info-section {
	margin-bottom: 25rpx;
}

.info-row {
	display: flex;
	justify-content: space-between;
	padding: 12rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.info-label {
	font-size: 26rpx;
	color: #666;
}

.info-value {
	font-size: 26rpx;
	color: #333;
	font-weight: 500;
}

.shishen-section {
	margin-bottom: 25rpx;
}

.section-title {
	display: block;
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 15rpx;
	padding-left: 10rpx;
	border-left: 4rpx solid #c43232;
}

.shishen-row {
	display: flex;
	justify-content: space-between;
}

.shishen-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	padding: 12rpx;
	background: #fafafa;
	border-radius: 8rpx;
	margin: 0 5rpx;
}

.shishen-label {
	font-size: 22rpx;
	color: #999;
	margin-bottom: 6rpx;
}

.shishen-value {
	font-size: 26rpx;
	color: #333;
	font-weight: 500;
}

.wuxing-section {
	margin-bottom: 20rpx;
}

.wuxing-content {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.wuxing-item {
	display: flex;
	align-items: center;
	gap: 15rpx;
}

.wuxing-name {
	width: 40rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #333;
}

.wuxing-bar {
	flex: 1;
	height: 24rpx;
	background: #f0f0f0;
	border-radius: 12rpx;
	overflow: hidden;
}

.wuxing-fill {
	height: 100%;
	border-radius: 12rpx;
	transition: width 0.3s ease;
}

.wuxing-count {
	width: 60rpx;
	text-align: right;
	font-size: 26rpx;
	color: #666;
}
</style>
