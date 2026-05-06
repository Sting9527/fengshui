<template>
	<view class="container">
		<view class="header-section">
			<view class="header-bg"></view>
			<view class="header-content">
				<text class="header-title">风水勘景</text>
				<text class="header-subtitle">选择位置分析布局</text>
			</view>
		</view>
		
		<view class="layout-section">
			<view class="layout-grid">
				<view class="direction-cell" :class="{selected: selectedRooms['东南']}" @tap="selectDirection('东南')">
					<view class="cell-content" v-if="!selectedRooms['东南']">
						<text class="add-text">+</text>
						<text class="add-subtext">添加</text>
					</view>
					<view class="cell-content-selected" v-else>
						<image :src="getRoomIcon(selectedRooms['东南'])" class="room-icon"></image>
						<text class="room-name">{{ selectedRooms['东南'] }}</text>
					</view>
					<text class="direction-name">东南</text>
					<text class="direction-trigram">巽</text>
				</view>
				
				<view class="direction-cell" :class="{selected: selectedRooms['正南']}" @tap="selectDirection('正南')">
					<view class="cell-content" v-if="!selectedRooms['正南']">
						<text class="add-text">+</text>
						<text class="add-subtext">添加</text>
					</view>
					<view class="cell-content-selected" v-else>
						<image :src="getRoomIcon(selectedRooms['正南'])" class="room-icon"></image>
						<text class="room-name">{{ selectedRooms['正南'] }}</text>
					</view>
					<text class="direction-name">正南</text>
					<text class="direction-trigram">离</text>
				</view>
				
				<view class="direction-cell" :class="{selected: selectedRooms['西南']}" @tap="selectDirection('西南')">
					<view class="cell-content" v-if="!selectedRooms['西南']">
						<text class="add-text">+</text>
						<text class="add-subtext">添加</text>
					</view>
					<view class="cell-content-selected" v-else>
						<image :src="getRoomIcon(selectedRooms['西南'])" class="room-icon"></image>
						<text class="room-name">{{ selectedRooms['西南'] }}</text>
					</view>
					<text class="direction-name">西南</text>
					<text class="direction-trigram">坤</text>
				</view>
				
				<view class="direction-cell" :class="{selected: selectedRooms['正东']}" @tap="selectDirection('正东')">
					<view class="cell-content" v-if="!selectedRooms['正东']">
						<text class="add-text">+</text>
						<text class="add-subtext">添加</text>
					</view>
					<view class="cell-content-selected" v-else>
						<image :src="getRoomIcon(selectedRooms['正东'])" class="room-icon"></image>
						<text class="room-name">{{ selectedRooms['正东'] }}</text>
					</view>
					<text class="direction-name">正东</text>
					<text class="direction-trigram">震</text>
				</view>
				
				<view class="center-cell">
					<view class="center-content">
						<text class="center-title">中心</text>
						<text class="center-subtitle">主客厅</text>
					</view>
				</view>
				
				<view class="direction-cell" :class="{selected: selectedRooms['正西']}" @tap="selectDirection('正西')">
					<view class="cell-content" v-if="!selectedRooms['正西']">
						<text class="add-text">+</text>
						<text class="add-subtext">添加</text>
					</view>
					<view class="cell-content-selected" v-else>
						<image :src="getRoomIcon(selectedRooms['正西'])" class="room-icon"></image>
						<text class="room-name">{{ selectedRooms['正西'] }}</text>
					</view>
					<text class="direction-name">正西</text>
					<text class="direction-trigram">兑</text>
				</view>
				
				<view class="direction-cell" :class="{selected: selectedRooms['东北']}" @tap="selectDirection('东北')">
					<view class="cell-content" v-if="!selectedRooms['东北']">
						<text class="add-text">+</text>
						<text class="add-subtext">添加</text>
					</view>
					<view class="cell-content-selected" v-else>
						<image :src="getRoomIcon(selectedRooms['东北'])" class="room-icon"></image>
						<text class="room-name">{{ selectedRooms['东北'] }}</text>
					</view>
					<text class="direction-name">东北</text>
					<text class="direction-trigram">艮</text>
				</view>
				
				<view class="direction-cell" :class="{selected: selectedRooms['正北']}" @tap="selectDirection('正北')">
					<view class="cell-content" v-if="!selectedRooms['正北']">
						<text class="add-text">+</text>
						<text class="add-subtext">添加</text>
					</view>
					<view class="cell-content-selected" v-else>
						<image :src="getRoomIcon(selectedRooms['正北'])" class="room-icon"></image>
						<text class="room-name">{{ selectedRooms['正北'] }}</text>
					</view>
					<text class="direction-name">正北</text>
					<text class="direction-trigram">坎</text>
				</view>
				
				<view class="direction-cell" :class="{selected: selectedRooms['西北']}" @tap="selectDirection('西北')">
					<view class="cell-content" v-if="!selectedRooms['西北']">
						<text class="add-text">+</text>
						<text class="add-subtext">添加</text>
					</view>
					<view class="cell-content-selected" v-else>
						<image :src="getRoomIcon(selectedRooms['西北'])" class="room-icon"></image>
						<text class="room-name">{{ selectedRooms['西北'] }}</text>
					</view>
					<text class="direction-name">西北</text>
					<text class="direction-trigram">乾</text>
				</view>
			</view>
			
			<text class="tips-text">请点击各方位，以上方位以最大面积落于该方位为准</text>
		</view>
		
		<view class="footer-section">
			<view class="footer-btn" :class="{ disabled: !hasMainDoor }" @tap="confirmLayout">
				<text class="btn-text">确定房屋布局</text>
			</view>
		</view>
		
		<view class="popup-overlay" v-if="showPopup" @tap="closePopup">
			<view class="popup-content" @tap.stop>
				<view class="popup-header">
					<text class="popup-title">{{ currentDirection }} - 添加房间</text>
					<text class="popup-close" @tap="closePopup">×</text>
				</view>
				<view class="room-grid">
					<view class="room-item" v-for="room in roomTypes" :key="room.name" @tap="selectRoom(room.name)">
						<image :src="room.icon" class="room-item-icon"></image>
						<text class="room-item-name">{{ room.name }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="toast-overlay" v-if="showToast">
			<view class="toast-content">
				<text class="toast-icon">✓</text>
				<text class="toast-text">{{ toastText }}</text>
			</view>
		</view>
		
		<view class="door-direction-overlay" v-if="showDoorDirectionPopup" @tap="closeDoorDirectionPopup">
			<view class="door-direction-content" @tap.stop>
				<text class="door-direction-title">确定大门朝向</text>
				<view class="direction-buttons">
					<view 
						class="direction-btn" 
						:class="{ selected: selectedDoorDirection === direction }"
						v-for="direction in doorDirections" 
						:key="direction"
						@tap="selectDoorDirection(direction)"
					>
						<text class="direction-btn-text">{{ direction }}</text>
					</view>
				</view>
				<view class="confirm-sitting-btn" :class="{ disabled: !selectedDoorDirection }" @tap="confirmSittingDirection">
					<text class="confirm-sitting-text">确定坐向</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedRooms: {},
				showPopup: false,
				currentDirection: '',
				showToast: false,
				toastText: '',
				showDoorDirectionPopup: false,
				selectedDoorDirection: '',
				doorDirections: ['正北', '正东', '正西', '正南', '东北', '西北', '东南', '西南'],
				roomTypes: [
					{ name: '大门', icon: '/static/iccc/damen.png' },
					{ name: '卫生间', icon: '/static/iccc/weishengjian.png' },
					{ name: '阳台', icon: '/static/iccc/yangtai.png' },
					{ name: '餐厅', icon: '/static/iccc/canting.png' },
					{ name: '厨房', icon: '/static/iccc/chufang.png' },
					{ name: '书房', icon: '/static/iccc/caozuo-shufang.png' },
					{ name: '客厅', icon: '/static/iccc/keting.png' },
					{ name: '卧室', icon: '/static/iccc/woshi-4.png' }
				]
			}
		},
		computed: {
			hasMainDoor() {
				return Object.values(this.selectedRooms).includes('大门')
			}
		},
		methods: {
			selectDirection(direction) {
				this.currentDirection = direction
				this.showPopup = true
			},
			closePopup() {
				this.showPopup = false
				this.currentDirection = ''
			},
			selectRoom(roomName) {
				this.selectedRooms[this.currentDirection] = roomName
				this.showToast = true
				this.toastText = `${this.currentDirection} - ${roomName}`
				this.closePopup()
				setTimeout(() => {
					this.showToast = false
				}, 500)
			},
			getRoomIcon(roomName) {
				const room = this.roomTypes.find(r => r.name === roomName)
				return room ? room.icon : ''
			},
			confirmLayout() {
				if (!this.hasMainDoor) {
					uni.showToast({
						title: '请先选择大门位置',
						icon: 'none'
					})
					return
				}
				if (Object.keys(this.selectedRooms).length === 0) {
					uni.showToast({
						title: '请先选择房间布局',
						icon: 'none'
					})
					return
				}
				this.showDoorDirectionPopup = true
				this.selectedDoorDirection = ''
			},
			closeDoorDirectionPopup() {
				this.showDoorDirectionPopup = false
			},
			selectDoorDirection(direction) {
				this.selectedDoorDirection = direction
			},
			confirmSittingDirection() {
				if (!this.selectedDoorDirection) {
					return
				}
				this.showDoorDirectionPopup = false
				uni.showToast({
					title: '房屋布局已确定',
					icon: 'success'
				})
			}
		}
	}
</script>

<style>
.container {
	background-color: #faf6f1;
	min-height: 100vh;
}

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
	display: flex;
	flex-direction: column;
	align-items: center;
}

.header-title {
	font-size: 48rpx;
	font-weight: bold;
	color: #fff;
	margin-bottom: 12rpx;
}

.header-subtitle {
	font-size: 26rpx;
	color: rgba(255, 255, 255, 0.8);
}

.layout-section {
	padding: 0 40rpx;
	margin-bottom: 57rpx;
}

.layout-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
	background-color: #efe8df;
	border-radius: 24rpx;
	padding: 30rpx;
}

.direction-cell {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 24rpx 0;
	background-color: #fff;
	border-radius: 20rpx;
	border: 3rpx solid #d43d3d;
	position: relative;
}

.direction-cell.selected {
	border-width: 4rpx;
}

.cell-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 16rpx;
}

.add-text {
	font-size: 40rpx;
	color: #999;
	font-weight: bold;
	line-height: 1;
}

.add-subtext {
	font-size: 24rpx;
	color: #999;
}

.cell-content-selected {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 16rpx;
	padding: 12rpx 24rpx;
	margin-bottom: 16rpx;
}

.room-icon {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	margin-bottom: 4rpx;
}

.room-name {
	font-size: 22rpx;
	color: #333;
	font-weight: bold;
}

.direction-name {
	font-size: 28rpx;
	color: #333;
	font-weight: bold;
	margin-bottom: 4rpx;
}

.direction-trigram {
	font-size: 22rpx;
	color: #e8d9cf;
}

.center-cell {
	display: flex;
	align-items: center;
	justify-content: center;
}

.center-content {
	width: 140rpx;
	height: 140rpx;
	border-radius: 50%;
	background-color: #d43d3d;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.center-title {
	font-size: 32rpx;
	color: #fff;
	font-weight: bold;
	line-height: 1;
}

.center-subtitle {
	font-size: 20rpx;
	color: rgba(255, 255, 255, 0.8);
	margin-top: 4rpx;
}

.tips-text {
	display: block;
	text-align: center;
	font-size: 24rpx;
	color: #999;
	margin-top: 24rpx;
}

.footer-section {
	padding: 0 40rpx;
}

.footer-btn {
	background-color: #d43d3d;
	border-radius: 50rpx;
	padding: 32rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.footer-btn.disabled {
	background-color: #ccc;
	pointer-events: none;
}

.btn-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #fff;
}

.popup-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: flex-end;
	z-index: 1000;
}

.popup-content {
	background-color: #fff;
	width: 100%;
	border-radius: 32rpx 32rpx 0 0;
	padding: 30rpx;
	padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
}

.popup-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;
}

.popup-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.popup-close {
	font-size: 48rpx;
	color: #999;
	line-height: 1;
}

.room-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30rpx;
}

.room-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
}

.room-item-icon {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}

.room-item-name {
	font-size: 24rpx;
	color: #333;
}

.toast-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2000;
}

.toast-content {
	background-color: #555;
	border-radius: 16rpx;
	padding: 48rpx 64rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
}

.toast-icon {
	font-size: 56rpx;
	color: #fff;
	font-weight: bold;
}

.toast-text {
	font-size: 28rpx;
	color: #fff;
}

.door-direction-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: flex-end;
	z-index: 2000;
}

.door-direction-content {
	background-color: #faf6f1;
	width: 100%;
	border-radius: 32rpx 32rpx 0 0;
	padding: 43rpx 40rpx;
	padding-bottom: calc(43rpx + env(safe-area-inset-bottom));
	display: flex;
	flex-direction: column;
	align-items: center;
}

.door-direction-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 43rpx;
}

.direction-buttons {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 22rpx;
	width: 100%;
	margin-bottom: 43rpx;
}

.direction-btn {
	background-color: #fff;
	border-radius: 16rpx;
	padding: 24rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2rpx solid #e8d9cf;
	transition: all 0.3s;
}

.direction-btn.selected {
	border-color: #d43d3d;
	background-color: rgba(212, 61, 61, 0.1);
}

.direction-btn-text {
	font-size: 28rpx;
	color: #333;
	font-weight: bold;
}

.confirm-sitting-btn {
	background: linear-gradient(180deg, #e85a5a 0%, #d43d3d 100%);
	border-radius: 50rpx;
	padding: 32rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	box-shadow: 0 8rpx 20rpx rgba(212, 61, 61, 0.3);
}

.confirm-sitting-btn.disabled {
	background: #ccc;
	pointer-events: none;
	box-shadow: none;
}

.confirm-sitting-text {
	font-size: 34rpx;
	font-weight: bold;
	color: #fff;
	letter-spacing: 4rpx;
}
</style>