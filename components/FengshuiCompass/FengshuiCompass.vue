<template>
	<view class="bazi-detail">
		<!-- 标签页切换 -->
		<view class="tabs-header">
			<view 
				v-for="(tab, index) in tabs" 
				:key="index"
				class="tab-item"
				:class="{ active: currentTab === index }"
				@tap="currentTab = index"
			>
				<text class="tab-text">{{ tab.name }}</text>
			</view>
		</view>

		<!-- 基本信息 -->
		<view v-if="currentTab === 0" class="tab-content">
			<view class="info-section">
				<view class="info-row">
					<view class="info-item">
						<text class="info-label">姓名</text>
						<text class="info-value">{{ baziData.name }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">性别</text>
						<text class="info-value">{{ baziData.gender }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">生肖</text>
						<text class="info-value">{{ baziData.zodiac }}</text>
					</view>
				</view>

				<view class="info-row bg-light">
					<text class="info-label-full">农历</text>
					<text class="info-value-full">{{ baziData.lunarDate }}</text>
				</view>

				<view class="info-row">
					<text class="info-label-full">阳历</text>
					<text class="info-value-full">{{ baziData.solarDate }}</text>
				</view>

				<view class="info-row bg-light">
					<text class="info-label-full">真太阳时</text>
					<text class="info-value-full">{{ baziData.solarTime }}</text>
				</view>

				<view class="info-row">
					<text class="info-label-full">出生地点</text>
					<text class="info-value-full">{{ baziData.birthPlace }}</text>
				</view>

				<view class="info-row bg-light">
					<text class="info-label-full">人元司令分野</text>
					<text class="info-value-full">{{ baziData.renyuan }}</text>
				</view>

				<view class="info-row">
					<text class="info-label-full">节气</text>
					<text class="info-value-full">{{ baziData.jieqi }}</text>
				</view>

				<view class="info-row bg-light">
					<view class="info-item">
						<text class="info-label">星座</text>
						<text class="info-value">{{ baziData.xingzuo }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">星宿</text>
						<text class="info-value">{{ baziData.xingxiu }}</text>
					</view>
				</view>

				<view class="info-row">
					<view class="info-item">
						<text class="info-label">胎元</text>
						<text class="info-value">{{ baziData.taiyuan }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">胎息</text>
						<text class="info-value">{{ baziData.taixi }}</text>
					</view>
				</view>

				<view class="info-row bg-light">
					<view class="info-item">
						<text class="info-label">命宫</text>
						<text class="info-value">{{ baziData.minggong }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">命卦</text>
						<text class="info-value">{{ baziData.minggua }}</text>
					</view>
				</view>

				<view class="info-row">
					<view class="info-item">
						<text class="info-label">身宫</text>
						<text class="info-value">{{ baziData.shengong }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">空亡</text>
						<text class="info-value">{{ baziData.kongwang }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 基本排盘 -->
		<view v-if="currentTab === 1" class="tab-content">
			<view class="paipan-section">
				<view class="paipan-table">
					<view class="table-header">
						<view class="table-cell header">四柱</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">{{ pillar.name }}</view>
					</view>
					
					<view class="table-row">
						<view class="table-cell label">主星</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">{{ pillar.mainStar }}</view>
					</view>
					
					<view class="table-row bg-light">
						<view class="table-cell label">天干</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">{{ pillar.tianGan }}</view>
					</view>
					
					<view class="table-row">
						<view class="table-cell label">地支</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">{{ pillar.diZhi }}</view>
					</view>
					
					<view class="table-row bg-light">
						<view class="table-cell label">藏干</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">
							<text class="cangan-item" v-for="(cg, i) in pillar.cangGan" :key="i">{{ cg }}</text>
						</view>
					</view>
					
					<view class="table-row">
						<view class="table-cell label">副星</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">
							<text class="fuxing-item" v-for="(fx, i) in pillar.fuXing" :key="i">{{ fx }}</text>
						</view>
					</view>
					
					<view class="table-row bg-light">
						<view class="table-cell label">星运</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">{{ pillar.xingYun }}</view>
					</view>
					
					<view class="table-row">
						<view class="table-cell label">自坐</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">{{ pillar.ziZuo }}</view>
					</view>
					
					<view class="table-row bg-light">
						<view class="table-cell label">空亡</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">{{ pillar.kongWang }}</view>
					</view>
					
					<view class="table-row">
						<view class="table-cell label">纳音</view>
						<view class="table-cell" v-for="(pillar, index) in pillars" :key="index">{{ pillar.nayin }}</view>
					</view>
				</view>
				
				<!-- 神煞 -->
				<view class="shensha-section">
					<view class="shensha-item" v-for="(item, index) in shensha" :key="index">
						<text class="shensha-label">{{ item.label }}</text>
						<text class="shensha-value">{{ item.value }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 运势 -->
		<view v-if="currentTab === 2" class="tab-content">
			<!-- 大运 -->
			<view class="yunshi-section">
				<view class="section-title">大运</view>
				<view class="dayun-container">
					<view class="dayun-tongxian">
						<text class="tongxian-label">童限</text>
						<text class="tongxian-year">2026</text>
						<text class="tongxian-age">1岁</text>
					</view>
					<view class="dayun-items">
						<view class="dayun-item" v-for="(item, index) in dayun" :key="index">
							<text class="dayun-ganzhi">{{ item.ganzhi }}</text>
							<view class="dayun-years">
								<text class="year-start">{{ item.startYear }}</text>
								<view class="year-line"></view>
								<text class="year-end">{{ item.endYear }}</text>
							</view>
							<text class="dayun-period">{{ item.period }}</text>
							<text class="dayun-star">{{ item.star }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 流年 -->
			<view class="yunshi-section">
				<view class="section-title">流年</view>
				<view class="liunian-grid">
					<view class="liunian-column" v-for="(col, index) in liunian" :key="index">
						<text class="liunian-item" v-for="(item, i) in col" :key="i">{{ item }}</text>
					</view>
				</view>
			</view>

			<!-- 起运 -->
			<view class="yunshi-section">
				<view class="section-title">起运</view>
				<view class="qiyun-content">
					<text class="qiyun-text">{{ qiyunInfo }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'FengshuiCompass',
	data() {
		return {
			currentTab: 0,
			tabs: [
				{ name: '基本信息' },
				{ name: '基本排盘' },
				{ name: '运势' }
			],
			baziData: {
				name: '陈贵',
				gender: '男',
				zodiac: '马',
				lunarDate: '2026年三月十九日 申时',
				solarDate: '2026-05-05 16:23',
				solarTime: '2026-05-05 16:33',
				birthPlace: '上海市',
				renyuan: '乙木用事',
				jieqi: '出生于清明后30天13小时53分钟，立夏前0天3小时15分钟。',
				xingzuo: '金牛座',
				xingxiu: '尾宿东方青龙',
				taiyuan: '癸未（杨柳木）',
				taixi: '甲戌',
				minggong: '癸巳（长流水）',
				minggua: '坎卦（东四命）',
				shengong: '辛丑（壁上土）',
				kongwang: '申酉'
			},
			pillars: [
				{
					name: '年柱',
					mainStar: '正印',
					tianGan: '丙',
					diZhi: '午',
					cangGan: ['丁火', '己土'],
					fuXing: ['偏印', '比肩'],
					xingYun: '临官',
					ziZuo: '帝旺',
					kongWang: '寅卯',
					nayin: '天河水'
				},
				{
					name: '月柱',
					mainStar: '正财',
					tianGan: '壬',
					diZhi: '辰',
					cangGan: ['戊土', '乙木', '癸水'],
					fuXing: ['劫财', '七杀', '偏财'],
					xingYun: '衰',
					ziZuo: '墓',
					kongWang: '午未',
					nayin: '长流水'
				},
				{
					name: '日柱',
					mainStar: '元男',
					tianGan: '己',
					diZhi: '卯',
					cangGan: ['乙木'],
					fuXing: ['七杀'],
					xingYun: '病',
					ziZuo: '病',
					kongWang: '申酉',
					nayin: '城头土'
				},
				{
					name: '时柱',
					mainStar: '正财',
					tianGan: '壬',
					diZhi: '申',
					cangGan: ['庚金', '壬水', '戊土'],
					fuXing: ['伤官', '正财', '劫财'],
					xingYun: '沐浴',
					ziZuo: '长生',
					kongWang: '戌亥',
					nayin: '剑锋金'
				}
			],
			shensha: [
				{ label: '日柱神煞', value: '太极、天官' },
				{ label: '时柱神煞', value: '天乙、文昌、金舆、破相' }
			],
			dayun: [
				{ ganzhi: '癸巳', startYear: '2026', endYear: '2036', period: '1-11岁', star: '偏财' },
				{ ganzhi: '甲午', startYear: '2036', endYear: '2046', period: '11-21岁', star: '正官' },
				{ ganzhi: '乙未', startYear: '2046', endYear: '2056', period: '21-31岁', star: '七杀' },
				{ ganzhi: '丙申', startYear: '2056', endYear: '2066', period: '31-41岁', star: '正印' }
			],
			liunian: [
				['丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑', '甲寅', '乙卯'],
				['丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥', '甲子', '乙丑'],
				['丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥'],
				['丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉']
			],
			qiyunInfo: '出生后16天4时后起运（阳历2026-05-21 20:33:59）'
		};
	}
};
</script>

<style scoped>
.bazi-detail {
	min-height: 100vh;
	background: #faf6f1;
}

/* 标签页头部 */
.tabs-header {
	display: flex;
	background: #fff;
	border-bottom: 1rpx solid #eee;
	padding: 0 20rpx;
}

.tab-item {
	flex: 1;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.tab-item.active {
	background: #d43d3d;
}

.tab-item.active::after {
	content: '';
	position: absolute;
	bottom: -1rpx;
	left: 20%;
	right: 20%;
	height: 4rpx;
	background: #d43d3d;
	border-radius: 2rpx;
}

.tab-text {
	font-size: 28rpx;
	color: #666;
}

.tab-item.active .tab-text {
	color: #fff;
	font-weight: bold;
}

/* 标签内容 */
.tab-content {
	padding: 24rpx;
}

/* 基本信息 */
.info-section {
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
}

.info-row {
	display: flex;
	padding: 20rpx 24rpx;
}

.info-row.bg-light {
	background: #faf6f1;
}

.info-item {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.info-label {
	font-size: 24rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.info-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.info-label-full {
	font-size: 24rpx;
	color: #999;
	width: 160rpx;
	flex-shrink: 0;
}

.info-value-full {
	font-size: 28rpx;
	color: #333;
	flex: 1;
}

/* 基本排盘 */
.paipan-section {
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
}

.paipan-table {
	width: 100%;
}

.table-header {
	display: flex;
	background: #d43d3d;
}

.table-header .table-cell {
	color: #fff;
	font-weight: bold;
}

.table-row {
	display: flex;
	border-bottom: 1rpx solid #f0e6d6;
}

.table-row.bg-light {
	background: #faf6f1;
}

.table-cell {
	flex: 1;
	padding: 16rpx 8rpx;
	text-align: center;
	font-size: 24rpx;
	color: #333;
}

.table-cell.header {
	background: #c53535;
}

.table-cell.label {
	background: #f5efe3;
	color: #8b4513;
	font-weight: 500;
	width: 100rpx;
	flex-shrink: 0;
	text-align: left;
	padding-left: 20rpx;
}

.cangan-item, .fuxing-item {
	display: block;
	font-size: 22rpx;
	color: #666;
	line-height: 1.6;
}

/* 神煞 */
.shensha-section {
	padding: 20rpx 24rpx;
	background: #faf6f1;
}

.shensha-item {
	display: flex;
	padding: 8rpx 0;
}

.shensha-label {
	font-size: 24rpx;
	color: #999;
	width: 160rpx;
	flex-shrink: 0;
}

.shensha-value {
	font-size: 24rpx;
	color: #333;
	flex: 1;
}

/* 运势 */
.yunshi-section {
	background: #fff;
	border-radius: 16rpx;
	margin-bottom: 24rpx;
	overflow: hidden;
}

.section-title {
	background: #d43d3d;
	color: #fff;
	font-size: 28rpx;
	font-weight: bold;
	padding: 16rpx 24rpx;
}

/* 大运 */
.dayun-container {
	display: flex;
	padding: 20rpx 0;
	overflow-x: auto;
}

.dayun-tongxian {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 20rpx;
	border-right: 1rpx solid #e0d6c8;
}

.tongxian-label {
	font-size: 22rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.tongxian-year, .tongxian-age {
	font-size: 24rpx;
	color: #333;
	font-weight: 500;
}

.dayun-items {
	display: flex;
	padding: 0 16rpx;
	gap: 20rpx;
}

.dayun-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 100rpx;
}

.dayun-ganzhi {
	font-size: 26rpx;
	color: #d43d3d;
	font-weight: bold;
	margin-bottom: 12rpx;
}

.dayun-years {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 8rpx;
}

.year-start, .year-end {
	font-size: 22rpx;
	color: #666;
}

.year-line {
	width: 1rpx;
	height: 24rpx;
	background: #d43d3d;
	margin: 4rpx 0;
}

.dayun-period {
	font-size: 22rpx;
	color: #8b4513;
	margin-bottom: 4rpx;
}

.dayun-star {
	font-size: 20rpx;
	color: #d43d3d;
}

/* 流年 */
.liunian-grid {
	display: flex;
	padding: 20rpx;
	gap: 16rpx;
	overflow-x: auto;
}

.liunian-column {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.liunian-item {
	font-size: 24rpx;
	color: #5c4033;
	padding: 8rpx 12rpx;
	background: #f5efe3;
	border-radius: 8rpx;
	text-align: center;
	min-width: 80rpx;
}

/* 起运 */
.qiyun-content {
	padding: 24rpx;
}

.qiyun-text {
	font-size: 26rpx;
	color: #333;
	line-height: 1.6;
}
</style>
