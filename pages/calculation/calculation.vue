<template>
	<view class="container">
		<view class="header-section">
			<view class="header-bg"></view>
			<view class="header-content">
				<text class="header-title">测算</text>
			</view>
		</view>

		<!-- 功能模块选择 -->
		<view class="module-section">
			<scroll-view scroll-x class="module-scroll">
				<view class="module-list">
					<view 
						v-for="(module, index) in modules" 
						:key="index"
						class="module-item"
						:class="{ active: currentModule === module.id }"
						@tap="selectModule(module.id)"
					>
						<text class="module-icon">{{ module.icon }}</text>
						<text class="module-name">{{ module.name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 模块内容区域 -->
		<view class="content-area">
			<!-- 黄历组件 -->
			<LunarCalendar v-if="currentModule === 'lunar'" />
			
			<!-- 八字排盘组件 -->
			<BaziCalendar v-if="currentModule === 'bazi'" />
			
			<!-- 摇卦占卜组件 -->
			<YaoguaCalendar v-if="currentModule === 'yaogua'" />
		</view>
	</view>
</template>

<script>
/**
 * 测算页面
 * 包含多个测算模块：黄历、八字排盘、摇卦占卜等
 * 通过顶部导航切换不同模块
 */
import LunarCalendar from '@/components/LunarCalendar/LunarCalendar.vue';
import BaziCalendar from '@/components/BaziCalendar/BaziCalendar.vue';
import YaoguaCalendar from '@/components/YaoguaCalendar/YaoguaCalendar.vue';

export default {
	name: 'CalculationPage',
	components: {
		LunarCalendar,
		BaziCalendar,
		YaoguaCalendar
	},
	data() {
		return {
			// 当前选中的模块
			currentModule: 'lunar',
			// 所有功能模块列表
			modules: [
				{ id: 'lunar', name: '老黄历', icon: '📅' },
				{ id: 'bazi', name: '八字排盘', icon: '🎴' },
				{ id: 'yaogua', name: '摇卦占卜', icon: '🔮' },
				{ id: 'liuyao', name: '六爻测算', icon: '🔯' },
				{ id: 'qimen', name: '奇门遁甲', icon: '⚡' },
				{ id: 'yinyuan', name: '姻缘测算', icon: '💑' },
				{ id: 'qiming', name: '起名测字', icon: '✍️' },
				{ id: 'caiyun', name: '财运分析', icon: '💰' }
			]
		};
	},
	methods: {
		/** 切换模块 */
		selectModule(moduleId) {
			this.currentModule = moduleId;
		},

		/** 获取当前模块图标 */
		getCurrentModuleIcon() {
			const module = this.modules.find(m => m.id === this.currentModule);
			return module ? module.icon : '📦';
		},

		/** 获取当前模块名称 */
		getCurrentModuleName() {
			const module = this.modules.find(m => m.id === this.currentModule);
			return module ? module.name : '功能模块';
		}
	}
};
</script>

<style>
.container {
	background-color: #faf6f1;
	min-height: 100vh;
}

/* 头部区域 */
.header-section {
	position: relative;
	height: 150rpx;
	padding: 0 40rpx;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.header-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 150rpx;
	background: linear-gradient(180deg, #d43d3d 0%, #b32d2d 100%);
}

.header-content {
	position: relative;
	z-index: 1;
}

.header-title {
	font-size: 48rpx;
	font-weight: bold;
	color: #fff;
}

/* 模块选择区域 */
.module-section {
	background-color: #fff;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #eee;
}

.module-scroll {
	white-space: nowrap;
}

.module-list {
	display: flex;
	gap: 0;
	padding: 0 30rpx;
}

.module-item {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	padding: 20rpx 30rpx;
	border-radius: 12rpx;
	min-width: 140rpx;
	transition: background-color 0.2s ease;
}

.module-item.active {
	background-color: rgba(212, 61, 61, 0.1);
}

.module-icon {
	font-size: 40rpx;
	margin-bottom: 8rpx;
}

.module-name {
	font-size: 24rpx;
	color: #666;
	transition: color 0.2s ease;
}

.module-item.active .module-name {
	color: #d43d3d;
	font-weight: bold;
}

/* 内容区域 */
.content-area {
	flex: 1;
}

/* 占位符样式 */
.placeholder-section {
	padding: 100rpx 40rpx;
}

.placeholder-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	padding: 80rpx 40rpx;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.placeholder-icon {
	font-size: 80rpx;
	margin-bottom: 20rpx;
}

.placeholder-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
}

.placeholder-desc {
	font-size: 26rpx;
	color: #999;
}
</style>