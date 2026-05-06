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
			<view class="main-info">
				<view class="main-date-box">
					<text class="lunar-date">{{ lunarDateText }}</text>
					<text class="ganzhi-date">{{ ganzhiYear }}年 {{ ganzhiMonth }}月 {{ ganzhiDay }}日</text>
				</view>
				<view class="zodiac-box">
					<text class="zodiac-text">属{{ zodiac }}</text>
				</view>
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
					<text class="info-value">{{ chongsha }}{{ suisha }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">值神</text>
					<text class="info-value">{{ zhishen }}</text>
				</view>
			</view>
		</view>

		<!-- 时辰吉凶 -->
		<view class="shichen-section">
			<view class="section-title-bar">
				<text class="section-title">时辰吉凶</text>
			</view>
			<view class="shichen-list">
				<view 
					class="shichen-item" 
					v-for="(item, index) in shichenList" 
					:key="index"
					:class="{ 'current': index === currentShichenIndex }"
					@tap="selectShichen(index)"
				>
					<text class="shichen-name">{{ item.name }}时</text>
					<text class="shichen-ganzhi">{{ item.ganzhi }}</text>
					<text class="shichen-status" :class="item.status === '吉' ? 'ji' : 'xiong'">{{ item.status }}</text>
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
				<text class="pengzu-text">{{ pengzuGan }}</text>
				<text class="pengzu-text">{{ pengzuZhi }}</text>
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

		<!-- 当前时辰详情 -->
		<view class="current-shichen-detail" v-if="selectedShichen">
			<view class="section-title-bar">
				<text class="section-title">当前时辰</text>
			</view>
			<view class="shichen-detail-content">
				<view class="shichen-detail-header">
					<text class="shichen-detail-name">{{ selectedShichen.name }} {{ selectedShichen.ganzhi }}时</text>
					<text class="shichen-detail-time">{{ selectedShichen.time }}</text>
					<text class="shichen-detail-status" :class="selectedShichen.status === '吉' ? 'ji' : 'xiong'">
						{{ selectedShichen.status }}
					</text>
				</view>
				<view class="shichen-detail-info">
					<text class="detail-item">{{ selectedShichen.chongsha }} {{ selectedShichen.sha }}</text>
					<text class="detail-item">喜神{{ selectedShichen.xishen }}</text>
					<text class="detail-item">财神{{ selectedShichen.caishen }}</text>
					<text class="detail-item">福神{{ selectedShichen.fushen }}</text>
				</view>
				<view class="shichen-detail-yi" v-if="selectedShichen.yi.length > 0">
					<text class="detail-label">宜：</text>
					<text class="detail-content yi">{{ selectedShichen.yi.join('、') }}</text>
				</view>
				<view class="shichen-detail-ji" v-if="selectedShichen.jiItems.length > 0">
					<text class="detail-label">忌：</text>
					<text class="detail-content ji">{{ selectedShichen.jiItems.join('、') }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { Solar, Lunar } from 'lunar-javascript';

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

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

const XINGXIU_LIST = ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹',
					'斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐',
					'奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿',
					'井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'];

const JIANSHEN_LIST = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];

const ZHISHEN_LIST = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
const ZHISHEN_MAP = {
	'子': '青龙', '丑': '明堂', '寅': '天刑', '卯': '朱雀', '辰': '金匮', '巳': '天德',
	'午': '白虎', '未': '玉堂', '申': '天牢', '酉': '玄武', '戌': '司命', '亥': '勾陈'
};

const SHICHEN_STATUS_MAP = {
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

const JISHEN_MAP = {
	'甲': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
	'乙': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
	'丙': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
	'丁': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
	'戊': ['青龙', '明堂', '金匮', '宝光', '天德', '月德'],
	'己': ['青龙', '明堂', '金匮', '宝光', '天德', '月德'],
	'庚': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
	'辛': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
	'壬': ['月德', '天恩', '时德', '阴德', '福生', '司命'],
	'癸': ['月德', '天恩', '时德', '阴德', '福生', '司命']
};

const XIONGSHEN_MAP = {
	'甲': ['月煞', '月虚', '血支', '五虚'],
	'乙': ['月煞', '月虚', '血支', '五虚'],
	'丙': ['月煞', '月虚', '血支', '五虚', '死神'],
	'丁': ['月煞', '月虚', '血支', '五虚', '死神'],
	'戊': ['月煞', '月虚', '血支', '五虚', '五虚'],
	'己': ['月煞', '月虚', '血支', '五虚', '五虚'],
	'庚': ['月煞', '月虚', '血支', '五虚'],
	'辛': ['月煞', '月虚', '血支', '五虚'],
	'壬': ['月煞', '月虚', '血支', '五虚', '死神'],
	'癸': ['月煞', '月虚', '血支', '五虚', '死神']
};

const TAISHEN_MAP = {
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

const TAISHEN_DIR_MAP = {
	'子': '外东北', '丑': '外正南', '寅': '外西北', '卯': '外正西', '辰': '外正西', '巳': '外西南', '午': '内正北', '未': '内东北',
	'申': '外东北', '酉': '外正南', '戌': '外西北', '亥': '外正西'
};

function getWeekNum(year, month, day) {
	const date = new Date(year, month - 1, day);
	const startOfYear = new Date(year, 0, 1);
	const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
	return Math.ceil((days + startOfYear.getDay() + 1) / 7);
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
			currentShichen: '',
			currentShichenIndex: -1,
			selectedShichen: null
		};
	},
	mounted() {
		this.updateCalendar();
		this.updateCurrentShichen();
		this.selectShichen(this.currentShichenIndex);
		setInterval(() => {
			this.updateCurrentShichen();
			this.selectShichen(this.currentShichenIndex);
		}, 60000);
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
			
			const solar = Solar.fromDate(date);
			const lunar = solar.getLunar();
			
			this.lunarDateText = lunar.getMonthInChinese() + '月' + lunar.getDayInChinese();
			this.ganzhiYear = lunar.getYearInGanZhi();
			this.ganzhiMonth = lunar.getMonthInGanZhi();
			this.ganzhiDay = lunar.getDayInGanZhi();
			this.zodiac = lunar.getYearShengXiao();
			
			this.nayin = NAYIN_MAP[this.ganzhiDay] || '白蜡金';
			
			const dayGan = this.ganzhiDay[0];
			const dayZhi = this.ganzhiDay[1];
			const monthGanZhi = this.ganzhiMonth;
			
			this.yiItems = lunar.getDayYi() || [];
			this.jiItems = lunar.getDayJi() || [];
			
			this.shichenList = this.generateShichenList(lunar);
			
			this.chongsha = '冲' + lunar.getChongShengXiao();
			this.suisha = '煞' + lunar.getSha();
			
			const ganTaishen = TAISHEN_MAP[dayGan] || {};
			const place = ganTaishen[dayZhi] || '占门';
			const dir = TAISHEN_DIR_MAP[dayZhi] || '外东北';
			this.taishen = place + dir;
			
			const zhishenIndex = jianshenIndex;
			this.zhishen = ZHISHEN_LIST[zhishenIndex] || '司命';
			if (this.zhishen === '勾陈') {
				this.zhishen = '司命';
			}
			
			this.pengzuGan = lunar.getPengZuGan();
			this.pengzuZhi = lunar.getPengZuZhi();
			
			const monthZhi = monthGanZhi[1];
			const monthIndex = DIZHI.indexOf(monthZhi);
			const dayIndex = DIZHI.indexOf(dayZhi);
			const jianshenIndex = (dayIndex - monthIndex + 12) % 12;
			this.jianshen = JIANSHEN_LIST[jianshenIndex] + '日';
			
			this.jishenList = (JISHEN_MAP[dayGan] || []).join('、');
			this.xiongshenList = (XIONGSHEN_MAP[dayGan] || []).join('、');
			
			const xingxiuShort = lunar.getXiu();
			this.xingxiu = XINGXIU_LIST.find(item => item.startsWith(xingxiuShort)) || xingxiuShort;
		},
		
		updateCurrentShichen() {
			const now = new Date();
			const hour = now.getHours();
			let index = Math.floor((hour + 1) / 2) % 12;
			this.currentShichenIndex = index;
		},
		
		selectShichen(index) {
			if (this.shichenList[index]) {
				this.selectedShichen = this.shichenList[index];
			}
		},
		
		getShichenTime(index) {
			const times = [
				'23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
				'07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
				'15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
			];
			return times[index];
		},
		
		generateShichenList(lunar) {
			const SHICHEN_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
			const CHONG_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
			const SHA_DIRECTIONS = ['北', '东', '南', '西'];
			
			const dayGan = lunar.getDayGan();
			const dayGanIndex = TIANGAN.indexOf(dayGan);
			const shichenGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
			
			const shichenYiJi = {
				'丙子': { yi: [], ji: ['诸事不宜'], chong: '马', sha: '煞南', xishen: '西南', caishen: '正西', fushen: '正东' },
				'丁丑': { yi: [], ji: ['诸事不宜'], chong: '羊', sha: '煞东', xishen: '正南', caishen: '正西', fushen: '正东' },
				'戊寅': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '安葬', '祭祀', '修造', '作灶', '酬神', '斋醮', '求财'], ji: [], chong: '猴', sha: '煞北', xishen: '东南', caishen: '正北', fushen: '正北' },
				'己卯': { yi: [], ji: ['诸事不宜'], chong: '鸡', sha: '煞西', xishen: '东北', caishen: '正北', fushen: '正南' },
				'庚辰': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '祈福', '安床', '安葬', '求财'], ji: [], chong: '狗', sha: '煞南', xishen: '西北', caishen: '正东', fushen: '西南' },
				'辛巳': { yi: ['结婚', '搬家', '交易', '搬新房', '开业', '祈福', '安葬', '祭祀', '修造', '酬神', '求子', '斋醮'], ji: [], chong: '猪', sha: '煞东', xishen: '西南', caishen: '正东', fushen: '西南' },
				'壬午': { yi: [], ji: ['诸事不宜'], chong: '鼠', sha: '煞北', xishen: '正南', caishen: '正南', fushen: '西北' },
				'癸未': { yi: [], ji: ['出行', '赴任', '祈福', '祭祀', '开光', '斋醮'], chong: '牛', sha: '煞西', xishen: '东南', caishen: '正南', fushen: '正西' },
				'甲申': { yi: ['结婚', '出行', '搬新房', '开业', '赴任', '祈福', '求子', '求财'], ji: [], chong: '虎', sha: '煞南', xishen: '东北', caishen: '东北', fushen: '东南' },
				'乙酉': { yi: ['结婚', '搬家', '交易', '搬新房', '开业', '祈福', '安葬', '祭祀', '修造', '酬神', '求子', '斋醮'], ji: [], chong: '兔', sha: '煞东', xishen: '西北', caishen: '西南', fushen: '东南' },
				'丙戌': { yi: [], ji: ['诸事不宜'], chong: '龙', sha: '煞北', xishen: '西南', caishen: '正西', fushen: '正东' },
				'丁亥': { yi: ['结婚', '出行', '搬家', '搬新房', '赴任', '安葬', '修造', '收养子女', '求财'], ji: [], chong: '蛇', sha: '煞西', xishen: '正南', caishen: '正西', fushen: '正东' }
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
				const status = SHICHEN_STATUS_MAP[dayGan] && SHICHEN_STATUS_MAP[dayGan][index] ? SHICHEN_STATUS_MAP[dayGan][index] : (data.yi.length > 0 ? '吉' : '凶');
				
				return {
					name: name,
					ganzhi: ganzhi,
					time: this.getShichenTime(index),
					status: status,
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
	padding: 24rpx 30rpx;
	border-bottom: 1rpx solid #e8e0d0;
}

.nav-btn {
	width: 64rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f5f0e6;
	border-radius: 50%;
}

.nav-icon {
	font-size: 40rpx;
	color: #5c4033;
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
	background: linear-gradient(135deg, #c43232 0%, #a82828 100%);
	border-radius: 20rpx;
	padding: 32rpx;
	box-shadow: 0 8rpx 32rpx rgba(196, 50, 50, 0.3);
}

.main-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.main-date-box {
	flex: 1;
}

.lunar-date {
	display: block;
	font-size: 36rpx;
	color: #fff;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.ganzhi-date {
	display: block;
	font-size: 26rpx;
	color: rgba(255, 255, 255, 0.8);
}

.zodiac-box {
	width: 96rpx;
	height: 96rpx;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.zodiac-text {
	font-size: 28rpx;
	color: #fff;
	font-weight: 500;
}

.yiji-section {
	display: flex;
	gap: 16rpx;
	margin: 0 20rpx;
	min-height: 280rpx;
}

.yi-card, .ji-card {
	flex: 1;
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	min-height: 280rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.card-header {
	padding: 18rpx;
	text-align: center;
	flex-shrink: 0;
}

.card-header.yi {
	background: linear-gradient(135deg, #c43232 0%, #a82828 100%);
}

.card-header.ji {
	background: linear-gradient(135deg, #4a4a4a 0%, #333 100%);
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
	flex: 1;
	align-content: flex-start;
}

.yiji-item {
	font-size: 24rpx;
	color: #5c4033;
	padding: 8rpx 14rpx;
	background: #faf8f3;
	border-radius: 8rpx;
	border: 1rpx solid #e8dcc8;
	box-sizing: border-box;
	max-width: calc(50% - 4rpx);
}

.ji-card .yiji-item {
	color: #6b5344;
	background: #f5f5f5;
	border-color: #e0e0e0;
}

.info-card {
	margin: 20rpx;
	background: #fff;
	border-radius: 16rpx;
	padding: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.info-row {
	display: flex;
	justify-content: space-between;
}

.info-item {
	flex: 1;
	text-align: center;
}

.info-label {
	display: block;
	font-size: 24rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.info-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.section-title-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 20rpx 16rpx;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}

.shichen-section {
	background: #fff;
	margin: 20rpx;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.shichen-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0 16rpx 16rpx;
	gap: 12rpx;
}

.shichen-item {
	flex: calc(33.333% - 8rpx);
	background: #faf8f3;
	border-radius: 12rpx;
	padding: 16rpx 8rpx;
	text-align: center;
	border: 2rpx solid transparent;
	transition: all 0.3s ease;
}

.shichen-item.current {
	border-color: #c43232;
	background: #fff5f5;
}

.shichen-name {
	display: block;
	font-size: 26rpx;
	color: #333;
	font-weight: 500;
	margin-bottom: 4rpx;
}

.shichen-ganzhi {
	display: block;
	font-size: 22rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.shichen-status {
	font-size: 22rpx;
	padding: 4rpx 12rpx;
	border-radius: 6rpx;
	display: inline-block;
}

.shichen-status.ji {
	background: #27ae60;
	color: #fff;
}

.shichen-status.xiong {
	background: #e74c3c;
	color: #fff;
}

.shensha-section {
	background: #fff;
	margin: 20rpx;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.shensha-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rpx;
	background: #e8e0d0;
	margin: 0 16rpx 16rpx;
	border-radius: 12rpx;
	overflow: hidden;
}

.shensha-card {
	background: #fff;
	padding: 20rpx;
	text-align: center;
}

.shensha-title {
	display: block;
	font-size: 24rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.shensha-value {
	font-size: 26rpx;
	color: #333;
}

.pengzu-section {
	background: #fff;
	margin: 20rpx;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.pengzu-content {
	padding: 20rpx;
}

.pengzu-text {
	display: block;
	font-size: 26rpx;
	color: #5c4033;
	line-height: 1.8;
}

.xingxiu-section {
	background: #fff;
	margin: 20rpx;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.xingxiu-content {
	padding: 20rpx;
	text-align: center;
}

.xingxiu-text {
	font-size: 28rpx;
	color: #333;
}

.current-shichen-detail {
	background: #fff;
	margin: 20rpx;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.shichen-detail-content {
	padding: 0 20rpx 20rpx;
}

.shichen-detail-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding-bottom: 16rpx;
	border-bottom: 1rpx solid #f0f0f0;
	margin-bottom: 16rpx;
}

.shichen-detail-name {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}

.shichen-detail-time {
	font-size: 24rpx;
	color: #999;
}

.shichen-detail-status {
	font-size: 22rpx;
	padding: 4rpx 12rpx;
	border-radius: 6rpx;
	margin-left: auto;
}

.shichen-detail-status.ji {
	background: #27ae60;
	color: #fff;
}

.shichen-detail-status.xiong {
	background: #e74c3c;
	color: #fff;
}

.shichen-detail-info {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	margin-bottom: 16rpx;
}

.detail-item {
	font-size: 26rpx;
	color: #666;
}

.shichen-detail-yi, .shichen-detail-ji {
	margin-bottom: 12rpx;
}

.detail-label {
	font-size: 26rpx;
	color: #999;
}

.detail-content {
	font-size: 26rpx;
}

.detail-content.yi {
	color: #27ae60;
}

.detail-content.ji {
	color: #e74c3c;
}
</style>