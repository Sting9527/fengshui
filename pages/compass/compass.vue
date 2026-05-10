<template>
	<view class="container">
		<view class="mode-background">
			<image v-if="currentMode === 'default'" class="bg-image" src="/static/lpbj.png" mode="aspectFill"></image>
			<view v-else-if="currentMode === 'map'" class="map-container">
				<map id="map" class="map-view" :latitude="latitude" :longitude="longitude" :scale="mapScale" :show-location="false" :map-type="2" :markers="markers" :enable-zoom="true" :enable-scroll="true" :enable-rotate="true" :enable-satellite="true" @loaded="onMapLoaded"></map>
				<view class="map-controls">
					<view class="control-group">
						<view class="control-btn" @tap="zoomIn">
							<text class="control-icon">+</text>
						</view>
						<view class="control-btn" @tap="zoomOut">
							<text class="control-icon">−</text>
						</view>
					</view>
					<view class="control-btn location-btn" @tap="locateMe">
						<text class="control-icon">◎</text>
					</view>
				</view>
			</view>
			<camera v-else-if="currentMode === 'camera'" device-position="back" flash="off" class="camera-view" @error="onCameraError"></camera>
			<view v-else-if="currentMode === 'custom'" class="custom-bg">
				<view class="custom-image-container" @touchstart="onCustomImageTouchStart" @touchmove="onCustomImageTouchMove" @touchend="onCustomImageTouchEnd">
					<image v-if="customImage" class="custom-image" :src="customImage" mode="aspectFit" :style="customImageStyle"></image>
					<view v-if="!customImage" class="custom-placeholder">
						<text class="placeholder-text">请选择图片</text>
					</view>
				</view>
				<view v-if="customImage" class="custom-image-hint">
					<text class="hint-text">双指缩放 / 单指移动</text>
				</view>
			</view>
		</view>
		
		<view class="compass-wrapper" :class="{ 'default-compass': currentMode === 'default', 'map-compass': currentMode === 'map', 'custom-compass': currentMode === 'custom', 'camera-compass': currentMode === 'camera' }">
			<image 
				class="compass-image" 
				:src="currentCompassImage" 
				:key="currentCompassPath"
				mode="aspectFit"
				:style="{ transform: 'rotate(' + rotation + 'deg)' }"
				@touchstart="onCompassTouchStart"
				@touchmove="onCompassTouchMove"
			></image>
			<image v-if="currentMode === 'default'" class="overlay-a2" src="/static/a2.png" mode="aspectFit" :style="{ transform: 'rotate(' + rotation + 'deg)' }"></image>
			<image v-if="currentMode === 'default'" class="overlay-a3" src="/static/a3.png" mode="aspectFit" :style="{ transform: 'rotate(' + rotation + 'deg)' }"></image>
			<view class="cross-line horizontal" :style="{ transform: 'rotate(' + rotation + 'deg)' }"></view>
			<view class="cross-line vertical" :style="{ transform: 'rotate(' + rotation + 'deg)' }"></view>
			<view class="pointer-overlay" :style="{ transform: 'rotate(' + rotation + 'deg)' }">
				<view class="pointer north"></view>
				<view class="pointer south"></view>
				<view class="pointer east"></view>
				<view class="pointer west"></view>
			</view>
		</view>
		
		<view v-if="currentMode === 'default'" class="info-panel">
			<view class="info-row">
				<view class="info-item">
					<text class="info-label">方位</text>
					<text class="info-value">{{ currentDirection }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">度数</text>
					<text class="info-value">{{ currentAngle }}°</text>
				</view>
			</view>
			<view class="info-row">
				<view class="info-item">
					<text class="info-label">经度</text>
					<text class="info-value">{{ formatCoord(longitude) }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">纬度</text>
					<text class="info-value">{{ formatCoord(latitude) }}</text>
				</view>
			</view>
		</view>
		
		<view class="tools-panel">
			<view class="tool-item" @tap="showModePicker">
				<image class="tool-icon" src="/static/iccc/moshixuanze.png" mode="aspectFit"></image>
				<text class="tool-text">模式</text>
			</view>
			<view class="tool-item" @tap="toggleLock">
				<image class="tool-icon" :class="{ 'active': isLocked }" src="/static/iccc/suoding.png" mode="aspectFit"></image>
				<text class="tool-text">{{ isLocked ? '解锁' : '锁定' }}</text>
			</view>
			<view class="tool-item" @tap="changeCompass">
				<image class="tool-icon" src="/static/iccc/genghuan.png" mode="aspectFit"></image>
				<text class="tool-text">换盘</text>
			</view>

			<view v-if="currentMode === 'custom'" class="tool-item" @tap="chooseImage">
				<image class="tool-icon" src="/static/iccc/xuantu.png" mode="aspectFit"></image>
				<text class="tool-text">选图</text>
			</view>
		</view>
		
		<view class="mode-picker" v-if="showMode" @tap="hideModePicker">
			<view class="mode-content" @tap.stop>
				<view class="mode-item" :class="{ 'active': currentMode === 'default' }" @tap="selectMode('default')">
					<text class="mode-title">默认主盘</text>
					<text class="mode-desc">综合风水罗盘</text>
				</view>
				<view class="mode-item" :class="{ 'active': currentMode === 'map' }" @tap="selectMode('map')">
					<text class="mode-title">卫星地图盘</text>
					<text class="mode-desc">根据卫星地图进行测算</text>
				</view>
				<view class="mode-item" :class="{ 'active': currentMode === 'camera' }" @tap="selectMode('camera')">
					<text class="mode-title">实景取相盘</text>
					<text class="mode-desc">利用相机取景进行测算</text>
				</view>
				<view class="mode-item" :class="{ 'active': currentMode === 'custom' }" @tap="selectMode('custom')">
					<text class="mode-title">上传图盘</text>
					<text class="mode-desc">选择相册中图片进行测算</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentCompassPath: 'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_1.png',
				rotation: 0,
				currentDirection: '坐壬向丙',
				currentAngle: 0,
				currentTrigram: '坎',
				currentCompassIndex: 0,
				currentMode: 'default',
				isLocked: false,
				isManual: false,
				showMode: false,
				longitude: 116.4074,
				latitude: 39.9042,
				customImage: '',
				customImageScale: 1,
				customImageTranslateX: 0,
				customImageTranslateY: 0,
				lastTouchDistance: 0,
				lastTouchCenterX: 0,
				lastTouchCenterY: 0,
				markers: [],
				mapLoaded: false,
				mapScale: 13,
				compassImages: [
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_1.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_2.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_3.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_4.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_5.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_10.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_20.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_21.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_22.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_23.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_25.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_27.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_28.png',
					'https://mp-35e40d86-4d87-4136-914a-7f594a46009d.cdn.bspapp.com/compass/luopan_29.png'
				],
				mapCompassImages: [
					'/static/compass/pan.png',
					'/static/compass/pan-map.png',
					'/static/compass/pan-map-yellow.png'
				],
				trigramMap: {
					'北': '坎', '东北': '艮', '东': '震', '东南': '巽',
					'南': '离', '西南': '坤', '西': '兑', '西北': '乾'
				},
				mountainsOrder: ['壬', '子', '癸', '丑', '艮', '寅', '甲', '卯', '乙', '辰', '巽', '巳', '丙', '午', '丁', '未', '坤', '申', '庚', '酉', '辛', '戌', '乾', '亥'],
				touchStartX: 0,
				touchStartY: 0,
				touchStartRotation: 0
			}
		},
		computed: {
			currentCompassImage() {
				return this.currentCompassPath
			},
			customImageStyle() {
				return {
					transform: `scale(${this.customImageScale}) translate(${this.customImageTranslateX}px, ${this.customImageTranslateY}px)`
				}
			}
		},
		onLoad() {
			this.startCompass()
			this.getLocation()
			this.initCompassImage()
		},
		onUnload() {
			this.stopCompass()
		},
		methods: {
			initCompassImage() {
				if (this.currentMode === 'map') {
					this.currentCompassPath = '/static/compass/pan-map.png?v=' + Date.now()
				} else if (this.currentMode === 'custom') {
					this.currentCompassPath = '/static/compass/pan.png?v=' + Date.now()
				} else {
					this.currentCompassPath = this.compassImages[0] + '?v=' + Date.now()
				}
			},
			hasWxApi(apiName) {
				return typeof wx !== 'undefined' && wx[apiName]
			},
			startCompass() {
				const that = this
				uni.startCompass({
					success: (res) => {
						that.updateCompass(res)
					},
					fail: () => {
						uni.showToast({
							title: '罗盘不可用',
							icon: 'none'
						})
					}
				})
				
				uni.onCompassChange((res) => {
					that.updateCompass(res)
				})
			},
			stopCompass() {
				uni.stopCompass()
			},
			updateCompass(res) {
				if (this.isLocked || this.isManual) {
					return
				}
				this.rotation = 360 - res.direction
				this.updateDirection(res.direction)
			},
			updateDirection(angle) {
				this.currentAngle = Math.round(angle)
				this.currentTrigram = this.getTrigram(angle)
				this.currentDirection = this.getDirection(angle)
			},
			getTrigram(angle) {
				const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
				const index = Math.floor((angle + 22.5) / 45) % 8
				return this.trigramMap[directions[index]]
			},
			getDirection(angle) {
				const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
				const index = Math.floor((angle + 22.5) / 45) % 8
				return directions[index]
			},
			toggleLock() {
			this.isLocked = !this.isLocked
			if (this.isLocked) {
				this.isManual = false
				uni.showToast({
					title: '已解锁',
					icon: 'none'
				})
			} else {
				uni.showToast({
					title: '已锁定',
					icon: 'none'
				})
			}
		},
			showModePicker() {
				this.showMode = true
			},
			hideModePicker() {
				this.showMode = false
			},
			selectMode(mode) {
				this.showMode = false
				if (mode === 'camera') {
					this.checkCameraPermission((authorized) => {
						if (authorized) {
							this.currentMode = mode
							this.currentCompassIndex = 0
							this.initCompassImage()
							uni.showToast({
								title: '已切换为实景取相盘',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '请先授权相机权限',
								icon: 'none'
							})
						}
					})
					return
				}
				this.currentMode = mode
				this.currentCompassIndex = 0
				this.initCompassImage()
				switch (mode) {
					case 'default':
						uni.showToast({
							title: '已切换为默认主盘',
							icon: 'none'
						})
						break
					case 'map':
						this.getLocation()
						uni.showToast({
							title: '已切换为卫星地图盘',
							icon: 'none'
						})
						break
					case 'custom':
						uni.showToast({
							title: '已切换为上传图盘',
							icon: 'none'
						})
						break
				}
			},
			changeCompass() {
				if (this.currentMode === 'map' || this.currentMode === 'custom') {
					this.currentCompassIndex = (this.currentCompassIndex + 1) % this.mapCompassImages.length
					this.currentCompassPath = this.mapCompassImages[this.currentCompassIndex % this.mapCompassImages.length] + '?v=' + Date.now()
				} else {
					this.currentCompassIndex = (this.currentCompassIndex + 1) % this.compassImages.length
					this.currentCompassPath = this.compassImages[this.currentCompassIndex] + '?v=' + Date.now()
				}
				uni.showToast({
					title: '已更换罗盘',
					icon: 'none',
					duration: 1000
				})
			},

			saveImageToAlbum(imagePath) {
				uni.saveImageToPhotosAlbum({
					filePath: imagePath,
					success: () => {
						uni.showToast({
							title: '图片已保存到相册',
							icon: 'success'
						})
					},
					fail: (err) => {
						let errorMsg = '保存失败'
						if (err && err.errMsg && (err.errMsg.includes('auth deny') || err.errMsg.includes('permission'))) {
							errorMsg = '请在手机系统设置中允许访问相册'
						}
						uni.showToast({
							title: errorMsg,
							icon: 'none'
						})
					}
				})
			},
			chooseImage() {
				const that = this
				that.hasWxApi('chooseImage') ? that.chooseImageWx() : that.chooseImageUni()
			},
			chooseImageWx() {
				const that = this
				wx.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function(res) {
						
						if (res.tempFilePaths && res.tempFilePaths.length > 0) {
							that.customImage = res.tempFilePaths[0]
							that.resetCustomImage()
							uni.showToast({
								title: '图片选择成功',
								icon: 'success'
							})
						} else {
							that.showChooseImageError('获取图片路径失败')
						}
					},
					fail: function(err) {
						
						that.handleChooseImageError(err)
					}
				})
			},
			chooseImageUni() {
				const that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function(res) {
						
						if (res.tempFilePaths && res.tempFilePaths.length > 0) {
							that.customImage = res.tempFilePaths[0]
							that.resetCustomImage()
							uni.showToast({
								title: '图片选择成功',
								icon: 'success'
							})
						} else if (res.tempFilePath) {
							that.customImage = res.tempFilePath
							that.resetCustomImage()
							uni.showToast({
								title: '图片选择成功',
								icon: 'success'
							})
						} else {
							that.showChooseImageError('获取图片路径失败')
						}
					},
					fail: function(err) {
						
						that.handleChooseImageError(err)
					}
				})
			},
			handleChooseImageError(err) {
				if (!err) return
				if (err && err.errMsg && err.errMsg.includes('cancel')) return
				let errorMsg = '图片选择失败'
				const msg = err.errMsg || ''
				if (msg) {
					if (msg.includes('auth deny') || msg.includes('permission')) {
						errorMsg = '请在手机系统设置中允许访问相册'
					} else if (msg.includes('exceed max limit') || msg.includes('80051')) {
						errorMsg = '图片过大，请选择小于2MB的图片'
					} else if (msg.includes('network')) {
						errorMsg = '网络错误，请稍后重试'
					} else if (msg.includes('copyFileToTemp') || msg.includes('is not a function')) {
						errorMsg = '当前环境不支持，请使用真机测试'
					} else {
						errorMsg = '选择失败: ' + msg
					}
				} else if (err.code) {
					errorMsg = '错误码: ' + err.code + '，请重试'
				}
				uni.showToast({
					title: errorMsg,
					icon: 'none',
					duration: 3000
				})
			},
			showChooseImageError(msg) {
				uni.showToast({
					title: msg,
					icon: 'none'
				})
			},
			onCameraError(e) {
				uni.showToast({
					title: '相机打开失败',
					icon: 'none'
				})
			},
			onCustomImageTouchStart(e) {
				const touches = e.touches
				if (touches.length === 2) {
					this.lastTouchDistance = this.getDistance(touches[0], touches[1])
					this.lastTouchCenterX = (touches[0].clientX + touches[1].clientX) / 2
					this.lastTouchCenterY = (touches[0].clientY + touches[1].clientY) / 2
				} else if (touches.length === 1) {
					this.lastTouchCenterX = touches[0].clientX
					this.lastTouchCenterY = touches[0].clientY
				}
			},
			onCustomImageTouchMove(e) {
				const touches = e.touches
				if (touches.length === 2) {
					const currentDistance = this.getDistance(touches[0], touches[1])
					const scale = currentDistance / this.lastTouchDistance
					this.customImageScale = Math.max(1, Math.min(5, this.customImageScale * scale))
					this.lastTouchDistance = currentDistance
				} else if (touches.length === 1) {
					const deltaX = touches[0].clientX - this.lastTouchCenterX
					const deltaY = touches[0].clientY - this.lastTouchCenterY
					this.customImageTranslateX += deltaX
					this.customImageTranslateY += deltaY
					this.lastTouchCenterX = touches[0].clientX
					this.lastTouchCenterY = touches[0].clientY
				}
			},
			onCustomImageTouchEnd(e) {
			},
			getDistance(touch1, touch2) {
				const dx = touch2.clientX - touch1.clientX
				const dy = touch2.clientY - touch1.clientY
				return Math.sqrt(dx * dx + dy * dy)
			},
			resetCustomImage() {
				this.customImageScale = 1
				this.customImageTranslateX = 0
				this.customImageTranslateY = 0
			},
			onCompassTouchStart(e) {
				if (!this.isLocked) {
					return
				}
				this.isManual = true
				const touch = e.touches[0]
				this.touchStartX = touch.clientX
				this.touchStartY = touch.clientY
				this.touchStartRotation = this.rotation
			},
			onCompassTouchMove(e) {
				if (!this.isManual || !this.isLocked) {
					return
				}
				const touch = e.touches[0]
				const deltaX = touch.clientX - this.touchStartX
				const deltaY = touch.clientY - this.touchStartY
				const centerX = e.currentTarget.offsetWidth / 2
				const centerY = e.currentTarget.offsetHeight / 2
				
				if (deltaX > centerX) {
					if (deltaY > this.touchStartY) {
						this.rotation = this.touchStartRotation + 2
					} else {
						this.rotation = this.touchStartRotation - 2
					}
				} else {
					if (deltaY > this.touchStartY) {
						this.rotation = this.touchStartRotation - 2
					} else {
						this.rotation = this.touchStartRotation + 2
					}
				}
				
				this.updateDirectionFromRotation()
			},
			updateDirectionFromRotation() {
				let angle = (360 - this.rotation + 360) % 360
				this.updateDirection(angle)
			},
			formatCoord(val) {
				if (val === 0 || val === null || val === undefined) {
					return '--'
				}
				return val.toFixed(3)
			},
			getLocation() {
				const that = this
				this.checkLocationPermission(function(authorized) {
					if (authorized) {
						that.doGetLocation()
					} else {
						that.showPermissionDenied()
					}
				})
			},
			checkLocationPermission(callback) {
				const that = this
				if (that.hasWxApi('getSetting')) {
					wx.getSetting({
						success: function(res) {
							if (res.authSetting['scope.userLocation'] === true) {
								callback(true)
							} else if (res.authSetting['scope.userLocation'] === false) {
								that.requestLocationPermission(callback)
							} else {
								that.requestLocationPermission(callback)
							}
						},
						fail: function() {
							that.requestLocationPermission(callback)
						}
					})
				} else {
					callback(true)
				}
			},
			requestLocationPermission(callback) {
				const that = this
				if (that.hasWxApi('authorize')) {
					wx.authorize({
						scope: 'scope.userLocation',
						success: function() {
							callback(true)
						},
						fail: function() {
							callback(false)
						}
					})
				} else {
					callback(true)
				}
			},
			checkCameraPermission(callback) {
				const that = this
				if (that.hasWxApi('getSetting')) {
					wx.getSetting({
						success: function(res) {
							if (res.authSetting['scope.camera'] === true) {
								callback(true)
							} else if (res.authSetting['scope.camera'] === false) {
								callback(false)
							} else {
								that.requestCameraPermission(callback)
							}
						},
						fail: function() {
							callback(false)
						}
					})
				} else {
					callback(true)
				}
			},
			requestCameraPermission(callback) {
				const that = this
				if (that.hasWxApi('authorize')) {
					wx.authorize({
						scope: 'scope.camera',
						success: function() {
							callback(true)
						},
						fail: function() {
							callback(false)
						}
					})
				} else {
					callback(true)
				}
			},
			doGetLocation() {
				const that = this
				if (that.hasWxApi('getLocation')) {
					wx.getLocation({
						type: 'gcj02',
						success: function(res) {
							
							that.longitude = res.longitude
							that.latitude = res.latitude
							that.updateMarkers(res.latitude, res.longitude)
						},
						fail: function(err) {
							
							that.fallbackGetLocation()
						}
					})
				} else {
					that.fallbackGetLocation()
				}
			},
			fallbackGetLocation() {
				const that = this
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						that.longitude = res.longitude
						that.latitude = res.latitude
						that.updateMarkers(res.latitude, res.longitude)
					},
					fail: function(err) {
						
						that.latitude = 39.9042
						that.longitude = 116.4074
						that.updateMarkers(that.latitude, that.longitude)
						uni.showToast({
							title: '使用默认位置',
							icon: 'none'
						})
					}
				})
			},
			showPermissionDenied() {
				const that = this
				uni.showModal({
					title: '提示',
					content: '未获取到位置权限，请在系统设置中开启定位权限',
					showCancel: false,
					confirmText: '知道了',
					success: function() {
						if (that.hasWxApi('openSetting')) {
							wx.openSetting({
								success: function(res) {
									if (res.authSetting['scope.userLocation'] === true) {
										uni.showToast({
											title: '已授权，可重新获取位置',
											icon: 'none'
										})
									}
								}
							})
						}
					}
				})
			},
			updateMarkers(lat, lng) {
				this.markers = []
			},
			onMapLoaded() {
				
				this.mapLoaded = true
				if (this.latitude !== 0 && this.longitude !== 0) {
					this.updateMarkers(this.latitude, this.longitude)
				}
			},
			zoomIn() {
				if (this.mapScale < 14) {
					this.mapScale++
				}
			},
			zoomOut() {
				if (this.mapScale > 4) {
					this.mapScale--
				}
			},
			locateMe() {
				const that = this
				uni.showLoading({
					title: '定位中...'
				})
				this.checkLocationPermission(function(authorized) {
					if (authorized) {
						if (that.hasWxApi('getLocation')) {
							wx.getLocation({
								type: 'gcj02',
								success: function(res) {
									uni.hideLoading()
									that.latitude = res.latitude
									that.longitude = res.longitude
									that.mapScale = 18
									that.updateMarkers(res.latitude, res.longitude)
									uni.showToast({
										title: '定位成功',
										icon: 'success'
									})
								},
								fail: function(err) {
									uni.hideLoading()
									that.handleLocationFail()
								}
							})
						} else {
							uni.getLocation({
								type: 'gcj02',
								success: function(res) {
									uni.hideLoading()
									that.latitude = res.latitude
									that.longitude = res.longitude
									that.mapScale = 18
									that.updateMarkers(res.latitude, res.longitude)
									uni.showToast({
										title: '定位成功',
										icon: 'success'
									})
								},
								fail: function(err) {
									uni.hideLoading()
									that.handleLocationFail()
								}
							})
						}
					} else {
						uni.hideLoading()
						that.showPermissionDenied()
					}
				})
			},
			handleLocationFail() {
				this.latitude = 39.9042
				this.longitude = 116.4074
				this.updateMarkers(this.latitude, this.longitude)
				uni.showToast({
					title: '定位失败，使用默认位置',
					icon: 'none'
				})
			}
		}
	}
</script>

<style>
.container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
}



.mode-background {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
}

.bg-image {
	width: 100%;
	height: 100%;
}

.map-container {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
}

.map-view,
.camera-view {
	width: 100%;
	height: 100%;
	opacity: 1;
}

.custom-bg {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
}

.custom-image-container {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.custom-image {
	width: 100%;
	height: 100%;
	transition: none;
	touch-action: none;
}

.custom-image-hint {
	position: absolute;
	bottom: 200rpx;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(0, 0, 0, 0.5);
	padding: 16rpx 32rpx;
	border-radius: 40rpx;
	z-index: 5;
}

.hint-text {
	font-size: 24rpx;
	color: #fff;
}

.custom-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.placeholder-text {
	font-size: 32rpx;
	color: #999;
}

.compass-wrapper {
	width: 626rpx;
	height: 626rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	position: relative;
	z-index: 10;
}

.compass-wrapper.map-compass,
.compass-wrapper.camera-compass,
.compass-wrapper.custom-compass {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: 0;
}

.compass-wrapper.default-compass {
	position: relative;
	margin-top: 10%;
	margin-bottom: 5%;
}

.compass-bg-layer {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 50%;
	z-index: 0;
}

.compass-image {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	transition: transform 0.1s linear;
	position: relative;
	z-index: 1;
}

.overlay-a2 {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 2;
	pointer-events: none;
}

.overlay-a3 {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 3;
	pointer-events: none;
}

.compass-wrapper.map-compass .compass-image,
.compass-wrapper.custom-compass .compass-image,
.compass-wrapper.camera-compass .compass-image {
	opacity: 0.85;
}

.pointer-overlay {
	position: absolute;
	width: 114%;
	height: 114%;
	top: -7%;
	left: -7%;
	pointer-events: none;
	z-index: 10;
}

.pointer {
	position: absolute;
	width: 0;
	height: 0;
	border-style: solid;
}

.pointer.north {
	top: -10rpx;
	left: 50%;
	transform: translateX(-50%);
	border-width: 0 15rpx 20rpx;
	border-color: transparent transparent #d43d3d;
}

.pointer.south {
	bottom: -10rpx;
	left: 50%;
	transform: translateX(-50%);
	border-width: 20rpx 15rpx 0;
	border-color: #666 transparent transparent;
}

.pointer-connector.vertical {
	position: absolute;
	top: 10rpx;
	left: 50%;
	bottom: 10rpx;
	width: 2rpx;
	margin-left: -1rpx;
	background: #d43d3d;
}

.pointer-connector.horizontal {
	position: absolute;
	top: 50%;
	left: 10rpx;
	right: 10rpx;
	height: 2rpx;
	margin-top: -1rpx;
	background: #d43d3d;
}

.pointer.east {
	top: 50%;
	right: -10rpx;
	transform: translateY(-50%);
	border-width: 15rpx 0 15rpx 20rpx;
	border-color: transparent transparent transparent #666;
}

.pointer.west {
	top: 50%;
	left: -10rpx;
	transform: translateY(-50%);
	border-width: 15rpx 20rpx 15rpx 0;
	border-color: transparent #666 transparent transparent;
}

.cross-line {
	position: absolute;
	background: #d43d3d;
	z-index: 5;
	pointer-events: none;
}

.cross-line.horizontal {
	top: 50%;
	left: -7%;
	width: 114%;
	height: 2rpx;
	margin-top: -1rpx;
}

.cross-line.vertical {
	top: -7%;
	left: 50%;
	width: 2rpx;
	height: 114%;
	margin-left: -1rpx;
}

.info-panel {
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 24rpx;
	padding: 24rpx 32rpx;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	margin-left: 40rpx;
	margin-right: 40rpx;
	position: relative;
	z-index: 1;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
}

.info-row {
	display: flex;
	justify-content: space-around;
	gap: 40rpx;
}

.info-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 140rpx;
}

.info-label {
	font-size: 24rpx;
	color: #888;
	margin-bottom: 6rpx;
}

.info-value {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.tools-panel {
	display: flex;
	justify-content: space-around;
	width: 100%;
	padding: 0 20rpx;
	margin-top: auto;
	margin-bottom: 30rpx;
	position: relative;
	z-index: 1;
}

.tool-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15rpx 25rpx;
}

.tool-icon {
	width: 60rpx;
	height: 60rpx;
	margin-bottom: 8rpx;
}

.tool-icon.active {
	opacity: 0.6;
}

.tool-text {
	font-size: 26rpx;
	color: #fff;
	text-shadow: 0 0 8rpx rgba(0, 0, 0, 0.8), 0 0 16rpx rgba(0, 0, 0, 0.6);
	font-weight: bold;
	background: rgba(0, 0, 0, 0.5);
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
}

.mode-picker {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: flex-end;
	z-index: 100;
}

.mode-content {
	width: 100%;
	background: #fff;
	border-radius: 24rpx 24rpx 0 0;
	padding: 40rpx;
}

.mode-item {
	padding: 30rpx;
	border-bottom: 1rpx solid #eee;
	display: flex;
	flex-direction: column;
}

.mode-item.active .mode-title {
	color: #d43d3d;
}

.mode-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
}

.mode-desc {
	font-size: 24rpx;
	color: #888;
}

.map-controls {
	position: absolute;
	bottom: 300rpx;
	left: 30rpx;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	z-index: 100;
}

.control-group {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.control-btn {
	width: 80rpx;
	height: 80rpx;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
	border: 2rpx solid #eee;
}

.control-btn:active {
	background: rgba(255, 255, 255, 0.7);
	transform: scale(0.95);
}

.control-icon {
	font-size: 40rpx;
	color: #333;
	font-weight: bold;
}

.location-btn {
	background: #d43d3d;
	border-color: #d43d3d;
}

.location-btn .control-icon {
	color: #fff;
	font-size: 36rpx;
}
</style>
