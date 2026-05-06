<template>
	<view class="map-mode-container">
		<view class="map-content">
			<text class="map-text">地图模式</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style>
.map-mode-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
}

.map-content {
	text-align: center;
}

.map-text {
	font-size: 32rpx;
	color: #666;
}
</style>