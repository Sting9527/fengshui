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
		
		<view class="detail-container" v-if="showDetail">
			<view class="detail-header">
				<view class="detail-header-bg"></view>
				<view class="detail-header-content">
					<text class="detail-back" @tap="goBack">‹</text>
					<text class="detail-header-title">风水分析</text>
				</view>
			</view>
			
			<scroll-view class="detail-scroll" scroll-y>
				<view class="analysis-card">
					<view class="card-title-wrap">
						<text class="card-title">基础解析</text>
					</view>
					<view class="card-content">
						<view class="door-info">
							<text class="door-icon">🚪</text>
							<view class="door-text">
								<text class="door-label">大门方位：</text>
								<text class="door-value">{{ selectedDoorDirection }}({{ doorPositionName }})</text>
							</view>
						</view>
						<view class="fengshui-info">
							<text class="fengshui-label">吉凶指数：</text>
							<text class="fengshui-value">{{ fortuneLevel.score }}%</text>
							<text class="fengshui-label">吉凶分析：</text>
							<text class="fengshui-analysis" :class="fortuneLevel.level === '吉' ? 'good' : fortuneLevel.level === '凶' ? 'bad' : ''">{{ fortuneLevel.text }}</text>
						</view>
						<view v-if="doorFengshuiData" class="element-info">
							<text class="element-label">五行属性：</text>
							<text class="element-value">{{ doorFengshuiData.element }}</text>
							<text class="element-label">八卦：</text>
							<text class="element-value">{{ doorFengshuiData.trigram }}</text>
							<text class="element-label">代表：</text>
							<text class="element-value">{{ doorFengshuiData.description }}</text>
						</view>
						<view v-if="Object.keys(selectedRooms).length > 0" class="layout-summary">
							<view class="layout-summary-title">
								<text class="summary-icon">🏠</text>
								<text class="summary-title">当前房屋布局</text>
							</view>
							<view class="selected-rooms-list">
								<view v-for="(room, direction) in selectedRooms" :key="direction" class="selected-room-item">
									<view class="room-direction">
										<text class="direction-text">{{ direction }}</text>
										<text class="direction-trigram-small">{{ getDirectionTrigram(direction) }}</text>
									</view>
									<view class="room-info">
										<text class="room-name">{{ room }}</text>
										<text class="room-status" :class="isRoomSuitable(room, direction) ? 'suitable' : 'unsuitable'">
											{{ isRoomSuitable(room, direction) ? '✓ 合适' : '⚠️ 需注意' }}
										</text>
									</view>
								</view>
							</view>
						</view>
						<view class="fengshui-summary">
							<text class="summary-desc">{{ getFengshuiSummary() }}</text>
						</view>
					</view>
				</view>
				
				<view class="analysis-card">
					<view class="card-title-wrap">
						<text class="card-title">当前布局优势</text>
					</view>
					<view class="card-content">
						<view v-for="(point, index) in goodPoints" :key="index" class="good-point-item">
							<text class="good-point-icon">✅</text>
							<view class="good-point-content">
								<text class="good-point-title">{{ point.title }}</text>
								<text class="good-point-desc">{{ point.desc }}</text>
							</view>
						</view>
						<view v-if="goodPoints.length === 0" class="no-data">
							<text class="no-data-text">暂无数据</text>
						</view>
					</view>
				</view>
				
				<view class="analysis-card">
					<view class="card-title-wrap">
						<text class="card-title">当前位置问题</text>
					</view>
					<view class="card-content">
						<view v-for="(problem, index) in currentProblems" :key="index" class="tip-item" :class="problem.type === 'warning' ? 'warning' : ''">
							<text v-if="problem.title !== '无'" class="tip-icon">{{ problem.type === 'warning' ? '⚠️' : '✅' }}</text>
							<view class="tip-content">
								<text class="tip-title">{{ problem.title }}</text>
								<text v-if="problem.desc" class="tip-desc">{{ problem.desc }}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="analysis-card" v-if="showDetailInfo">
					<view class="card-title-wrap">
						<text class="card-title">解决办法</text>
					</view>
					<view class="card-content">
						<view v-for="(solution, index) in solutions" :key="index" class="tip-item">
							<text class="tip-icon">{{ solution.icon }}</text>
							<view class="tip-content">
								<text class="tip-title">{{ solution.title }}</text>
								<text class="tip-desc">{{ solution.desc }}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="analysis-card" v-if="showDetailInfo">
					<view class="card-title-wrap">
						<text class="card-title">优化房屋布局方法</text>
					</view>
					<view class="card-content">
						<view v-for="(method, index) in optimizationMethods" :key="index" class="layout-item">
							<text class="layout-icon">{{ method.icon }}</text>
							<view class="layout-content">
								<text class="layout-title">{{ method.title }}</text>
								<text class="layout-desc">{{ method.desc }}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="analysis-card" v-if="showDetailInfo">
					<view class="card-title-wrap">
						<text class="card-title">布局优化效果</text>
					</view>
					<view class="card-content">
						<view class="effect-grid">
							<view v-for="(effect, index) in optimizationEffects" :key="index" class="effect-item">
								<text class="effect-icon">{{ effect.icon }}</text>
								<text class="effect-title">{{ effect.title }}</text>
								<text class="effect-desc">{{ effect.desc }}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="analysis-card" v-if="showDetailInfo">
					<view class="card-title-wrap">
						<text class="card-title">各方位布局建议</text>
					</view>
					<view class="card-content">
						<view v-for="(suggestion, index) in directionSuggestions" :key="index" class="direction-suggestion">
							<view class="direction-header">
								<text class="direction-name">{{ suggestion.direction }}</text>
								<text class="direction-trigram">{{ suggestion.trigram }}位</text>
								<text class="direction-fortune" :class="suggestion.fortune === '吉' ? 'good' : 'bad'">{{ suggestion.fortune }}</text>
							</view>
							<text class="direction-desc">{{ suggestion.desc }}</text>
						</view>
					</view>
				</view>
				
				<view class="bottom-space"></view>
			</scroll-view>
			
			<view class="unlock-btn" @tap="toggleDetailInfo">
				<text class="unlock-text">{{ showDetailInfo ? '收起详情' : '查看详情' }}</text>
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
				showDetail: false,
				showDetailInfo: false,
				roomTypes: [
					{ name: '大门', icon: '/static/iccc/damen.png' },
					{ name: '卫生间', icon: '/static/iccc/weishengjian.png' },
					{ name: '阳台', icon: '/static/iccc/yangtai.png' },
					{ name: '餐厅', icon: '/static/iccc/canting.png' },
					{ name: '厨房', icon: '/static/iccc/chufang.png' },
					{ name: '书房', icon: '/static/iccc/caozuo-shufang.png' },
					{ name: '客厅', icon: '/static/iccc/keting.png' },
					{ name: '卧室', icon: '/static/iccc/woshi-4.png' }
				],
				fengshuiData: {
					'正北': { 
						trigram: '坎', 
						element: '水', 
						fortune: '吉', 
						description: '事业、智慧、中男', 
						suitableRooms: ['书房', '卧室', '客厅'], 
						unsuitableRooms: ['厨房', '卫生间'],
						color: '红色',
						elementColor: '#c0392b',
						benefits: ['利于事业发展', '提升智慧', '促进学习'],
						issues: ['需注意水患', '避免湿气过重'],
						solutions: ['保持干燥通风', '使用暖色调装饰', '摆放圆形装饰物'],
						plants: ['发财树', '富贵竹'],
						animals: '龟',
						bestFurniture: '书桌、床'
					},
					'正南': { 
						trigram: '离', 
						element: '火', 
						fortune: '吉', 
						description: '名声、事业、中女', 
						suitableRooms: ['客厅', '办公室', '阳台'], 
						unsuitableRooms: ['卫生间', '厨房'],
						color: '白色',
						elementColor: '#2980b9',
						benefits: ['提升名声地位', '利于事业发展', '增加社交运势'],
						issues: ['需防火气过盛', '避免急躁情绪'],
						solutions: ['使用白色冷色调', '摆放金属饰品', '设置水景'],
						plants: ['仙人掌', '铁树'],
						animals: '凤凰',
						bestFurniture: '沙发、办公桌'
					},
					'正东': { 
						trigram: '震', 
						element: '木', 
						fortune: '吉', 
						description: '健康、学业、长子', 
						suitableRooms: ['书房', '卧室', '阳台'], 
						unsuitableRooms: ['卫生间', '厨房'],
						color: '黄色',
						elementColor: '#f1c40f',
						benefits: ['促进身体健康', '提升学业成绩', '增强活力'],
						issues: ['需防木气过旺', '避免过于躁动'],
						solutions: ['使用黄色土色系', '摆放陶瓷摆件', '保持整洁'],
						plants: ['绿萝', '吊兰'],
						animals: '龙',
						bestFurniture: '书桌、健身器材'
					},
					'正西': { 
						trigram: '兑', 
						element: '金', 
						fortune: '吉', 
						description: '口才、桃花、少女', 
						suitableRooms: ['客厅', '阳台', '卧室'], 
						unsuitableRooms: ['厨房'],
						color: '绿色',
						elementColor: '#27ae60',
						benefits: ['提升口才表达', '增加桃花运', '促进人际关系'],
						issues: ['需防金气过盛', '避免口舌是非'],
						solutions: ['摆放绿植', '使用木质家具', '挂山水画'],
						plants: ['万年青', '君子兰'],
						animals: '鸡',
						bestFurniture: '镜子、梳妆台'
					},
					'东北': { 
						trigram: '艮', 
						element: '土', 
						fortune: '凶', 
						description: '阻碍、病符、少男', 
						suitableRooms: ['储藏室', '杂物间'], 
						unsuitableRooms: ['卧室', '大门', '厨房'],
						color: '蓝色',
						elementColor: '#3498db',
						benefits: ['稳定根基', '积蓄能量'],
						issues: ['易有阻碍', '健康问题', '气场较弱'],
						solutions: ['保持整洁明亮', '使用明亮色彩', '摆放水晶', '悬挂风铃'],
						plants: ['芦荟', '石莲花'],
						animals: '狗',
						bestFurniture: '储物柜'
					},
					'西北': { 
						trigram: '乾', 
						element: '金', 
						fortune: '吉', 
						description: '贵人、财运、老父', 
						suitableRooms: ['客厅', '书房', '卧室'], 
						unsuitableRooms: ['卫生间', '厨房'],
						color: '绿色',
						elementColor: '#27ae60',
						benefits: ['易得贵人相助', '提升财运', '增强权威'],
						issues: ['需防金气过刚', '避免过于严肃'],
						solutions: ['摆放绿植', '使用暖色调', '挂柔和装饰画'],
						plants: ['发财树', '金钱树'],
						animals: '马',
						bestFurniture: '办公桌、书架'
					},
					'东南': { 
						trigram: '巽', 
						element: '木', 
						fortune: '吉', 
						description: '文昌、财运、长女', 
						suitableRooms: ['书房', '阳台', '客厅'], 
						unsuitableRooms: ['卫生间'],
						color: '黄色',
						elementColor: '#f1c40f',
						benefits: ['提升学业', '利于写作', '增加财富'],
						issues: ['需防风气过盛', '避免不稳定'],
						solutions: ['摆放陶瓷物品', '使用土色系', '保持安静'],
						plants: ['文竹', '富贵竹'],
						animals: '蛇',
						bestFurniture: '书桌、书架'
					},
					'西南': { 
						trigram: '坤', 
						element: '土', 
						fortune: '凶', 
						description: '病符、小人、老母', 
						suitableRooms: ['储藏室', '阳台'], 
						unsuitableRooms: ['卧室', '厨房', '大门'],
						color: '蓝色',
						elementColor: '#3498db',
						benefits: ['稳重踏实', '家庭和睦'],
						issues: ['易招小人', '健康问题', '气场压抑'],
						solutions: ['保持通风明亮', '使用金属装饰', '摆放铜制物品', '悬挂葫芦'],
						plants: ['虎皮兰', '常春藤'],
						animals: '牛',
						bestFurniture: '沙发、储物架'
					}
				},
				roomElements: {
					'大门': { element: '土', description: '气口，纳气聚财', importance: '高' },
					'卫生间': { element: '水', description: '排泄污秽，化煞', importance: '高' },
					'阳台': { element: '木', description: '采光纳气，连接内外', importance: '中' },
					'餐厅': { element: '火', description: '饮食之所，聚气养生', importance: '中' },
					'厨房': { element: '火', description: '烹饪之地，灶为财库', importance: '高' },
					'书房': { element: '木', description: '读书学习，文昌位', importance: '中' },
					'客厅': { element: '土', description: '会客聚气，家庭中心', importance: '高' },
					'卧室': { element: '土', description: '休息养生，气场核心', importance: '高' }
				},
				elementRelations: {
					'金': { generates: '水', overcomes: '木', generatedBy: '土', overcomeBy: '火' },
					'木': { generates: '火', overcomes: '土', generatedBy: '水', overcomeBy: '金' },
					'水': { generates: '木', overcomes: '火', generatedBy: '金', overcomeBy: '土' },
					'火': { generates: '土', overcomes: '金', generatedBy: '木', overcomeBy: '水' },
					'土': { generates: '金', overcomes: '水', generatedBy: '火', overcomeBy: '木' }
				},
				shengQiPositions: {
					'正北': '正南',
					'正南': '正北',
					'正东': '正西',
					'正西': '正东',
					'东北': '西南',
					'西南': '东北',
					'东南': '西北',
					'西北': '东南'
				}
			}
		},
		computed: {
			hasMainDoor() {
				return Object.values(this.selectedRooms).includes('大门')
			},
			doorFengshuiData() {
				if (!this.selectedDoorDirection) return null
				return this.fengshuiData[this.selectedDoorDirection]
			},
			doorPositionName() {
				if (!this.doorFengshuiData) return ''
				const positionMap = {
					'正北': '坎位',
					'正南': '离位',
					'正东': '震位',
					'正西': '兑位',
					'东北': '艮位',
					'西北': '乾位',
					'东南': '巽位',
					'西南': '坤位'
				}
				return positionMap[this.selectedDoorDirection] || ''
			},
			fortuneLevel() {
				if (!this.doorFengshuiData) return { level: '中', score: 50, text: '中等' }
				if (this.doorFengshuiData.fortune === '吉') {
					return { level: '吉', score: 85, text: '吉祥' }
				}
				return { level: '凶', score: 30, text: '不太理想' }
			},
			goodPoints() {
				const points = []
				if (this.selectedDoorDirection && this.doorFengshuiData) {
					points.push({
						title: `${this.selectedDoorDirection}方位优势`,
						desc: `该方位属${this.doorFengshuiData.element}元素，代表${this.doorFengshuiData.description}，大门开在此方位${this.doorFengshuiData.fortune === '吉' ? '有助于提升运势' : '需要特别注意化解'}`
					})
					if (this.doorFengshuiData.fortune === '吉') {
						points.push({
							title: '生气位加持',
							desc: `大门位于${this.shengQiPositions[this.selectedDoorDirection]}生气位的对冲方位，形成良好的气场循环，有利于家运昌盛。`
						})
					}
				}
				return points
			},
			currentProblems() {
				const problems = []
				if (this.selectedDoorDirection && this.doorFengshuiData) {
					if (this.doorFengshuiData.fortune === '凶') {
						problems.push({
							title: '方位煞气',
							desc: `${this.selectedDoorDirection}为${this.doorFengshuiData.description}，此方位气场较弱，可能影响健康和运势。`,
							type: 'warning'
						})
					}
					Object.keys(this.selectedRooms).forEach(dir => {
						const room = this.selectedRooms[dir]
						const dirData = this.fengshuiData[dir]
						if (dirData && dirData.unsuitableRooms.includes(room)) {
							problems.push({
								title: `${room}位置不当`,
								desc: `${room}位于${dir}(${dirData.trigram}位)，${dir}属${dirData.element}，${room}属${this.getRoomElement(room)}，两者相冲，易引发${this.getConflictEffect(room, dir)}。`,
								type: 'warning'
							})
						}
					})
				}
				if (problems.length === 0) {
					problems.push({
						title: '无',
						desc: '',
						type: 'success'
					})
				}
				return problems
			},
			solutions() {
				const solutions = []
				this.currentProblems.forEach(problem => {
					if (problem.type === 'warning') {
						if (problem.title.includes('方位煞气')) {
							solutions.push({
								title: '化解方位煞气',
								desc: `建议在大门处放置${this.getElementCounter(this.doorFengshuiData.element)}属性的物品进行化解，如${this.getLuckyItem(this.doorFengshuiData.element)}。`,
								icon: '🔴'
							})
						}
						if (problem.title.includes('位置不当')) {
							const match = problem.title.match(/(.*?)位置不当/)
							if (match) {
								solutions.push({
									title: `${match[1]}位置调整`,
									desc: `${match[1]}宜放置在${this.getSuitableDirection(match[1])}方位，当前位于${problem.desc.match(/位于(.+?)\(/)[1]}，建议${this.getRoomSuggestion(match[1])}。`,
									icon: '🟢'
								})
							}
						}
					}
				})
				if (solutions.length === 0) {
					solutions.push({
						title: '锦上添花',
						desc: '当前布局良好，可在吉位放置水晶、绿植等物品进一步提升运势。',
						icon: '🖼️'
					})
				}
				return solutions
			},
			optimizationEffects() {
				const effects = []
				
				if (!this.selectedDoorDirection || !this.doorFengshuiData) {
					return [{
						icon: '🏠',
						title: '选择布局',
						desc: '请先选择房屋布局和大门朝向，系统将为您分析优化效果。'
					}]
				}
				
				effects.push({
					icon: '💰',
					title: '财运提升',
					desc: `${this.doorFengshuiData.fortune === '吉' ? '大门朝向' + this.selectedDoorDirection + '为吉位，有利于招财纳气。' : '大门朝向需要通过布局调整来化解煞气，提升财运。'}财位宜保持明亮，可摆放保险柜或财神像。`
				})
				
				effects.push({
					icon: '🏥',
					title: '健康改善',
					desc: '住宅需保持"藏风聚气"，避免门窗过多导致气流直冲。厕所不宜位于房屋中央（"厕占中宫"会影响健康）。' + this.getHealthTip()
				})
				
				effects.push({
					icon: '👨👩👧👦',
					title: '家庭和睦',
					desc: '客厅沙发宜选择"凹"字形摆放，寓意左右护持、藏风聚气。横梁压顶需用吊顶遮挡，避免影响家人情绪和运势。'
				})
				
				effects.push({
					icon: '⚖️',
					title: '阴阳平衡',
					desc: '住宅需保持阴阳平衡：' + this.getYinYangTip() + '。明亮则生气勃勃，昏暗则阴气过重。'
				})
				
				return effects
			},
			optimizationMethods() {
				const methods = []
				
				if (this.selectedDoorDirection && this.doorFengshuiData) {
					methods.push({
						title: '大门气场优化',
						desc: `您的大门朝向${this.selectedDoorDirection}(${this.doorFengshuiData.trigram}位)，属${this.doorFengshuiData.element}元素。建议在门口放置${this.doorFengshuiData.plants.join('、')}等植物，使用${this.doorFengshuiData.color}色系装饰，增强吉气汇聚。`,
						icon: '🚪',
						element: this.doorFengshuiData.element
					})
				}
				
				Object.keys(this.selectedRooms).forEach(dir => {
					const room = this.selectedRooms[dir]
					const dirData = this.fengshuiData[dir]
					const roomElement = this.roomElements[room]
					
					if (dirData && roomElement) {
						const relation = this.getElementRelation(roomElement.element, dirData.element)
						let suggestion = ''
						
						if (relation === 'generates') {
							suggestion = `${room}属${roomElement.element}，${dir}属${dirData.element}，${roomElement.element}生${dirData.element}，气场相生，非常吉利。建议保持现状，可摆放${dirData.plants.join('、')}增强运势。`
						} else if (relation === 'overcomes') {
							suggestion = `${room}属${roomElement.element}，${dir}属${dirData.element}，${roomElement.element}克${dirData.element}，气场相冲。建议放置${this.getBalanceItem(roomElement.element, dirData.element)}进行化解。`
						} else if (relation === 'generatedBy') {
							suggestion = `${room}属${roomElement.element}，${dir}属${dirData.element}，${dirData.element}生${roomElement.element}，气场被生，较为吉利。建议使用${dirData.color}色系装饰。`
						} else if (relation === 'overcomeBy') {
							suggestion = `${room}属${roomElement.element}，${dir}属${dirData.element}，${dirData.element}克${roomElement.element}，气场被克。建议摆放${this.getProtectiveItem(roomElement.element)}进行化解。`
						} else {
							suggestion = `${room}位于${dir}(${dirData.trigram}位)，属${roomElement.element}与${dirData.element}并存，建议保持整洁通风，促进气场流通。`
						}
						
						methods.push({
							title: `${room}布局优化`,
							desc: suggestion,
							icon: this.getRoomIcon(room),
							element: roomElement.element,
							suitable: this.isRoomSuitable(room, dir)
						})
					}
				})
				
				if (methods.length === 0) {
					methods.push({
						title: '请先选择布局',
						desc: '请选择房屋布局和大门朝向，系统将为您生成个性化的优化建议。',
						icon: '�'
					})
				}
				
				return methods
			},
			directionSuggestions() {
				const suggestions = []
				Object.keys(this.fengshuiData).forEach(dir => {
					const data = this.fengshuiData[dir]
					const selectedRoom = this.selectedRooms[dir]
					let desc = `代表${data.description}，属${data.element}元素`
					if (selectedRoom) {
						if (data.suitableRooms.includes(selectedRoom)) {
							desc += `。${selectedRoom}在此方位很合适，${this.getRoomBenefit(selectedRoom, dir)}。`
						} else if (data.unsuitableRooms.includes(selectedRoom)) {
							desc += `。${selectedRoom}在此方位不太合适，${this.getRoomWarning(selectedRoom, dir)}。`
						} else {
							desc += `。${selectedRoom}在此方位尚可，建议注意${this.getRoomNote(selectedRoom, dir)}。`
						}
					} else {
						desc += `。此方位宜${data.suitableRooms.join('、')}，不宜${data.unsuitableRooms.join('、')}。`
					}
					suggestions.push({
						direction: dir,
						trigram: data.trigram,
						fortune: data.fortune,
						desc: desc
					})
				})
				return suggestions
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
				this.showDetail = true
			},
			goBack() {
				this.showDetail = false
			},
			unlockAll() {
					uni.showToast({
						title: '功能开发中',
						icon: 'none'
					})
				},
				toggleDetailInfo() {
					this.showDetailInfo = !this.showDetailInfo
				},
				getRoomElement(roomName) {
					const elementMap = {
						'大门': '土',
						'卫生间': '水',
						'阳台': '木',
						'餐厅': '火',
						'厨房': '火',
						'书房': '木',
						'客厅': '土',
						'卧室': '土'
					}
					return elementMap[roomName] || '土'
				},
				getConflictEffect(roomName, direction) {
					const conflicts = {
						'厨房': {
							'正北': '水火相冲，影响健康',
							'正南': '火炎土燥，家庭不和',
							'东北': '火生土旺，影响财运',
							'西南': '火生土旺，易招是非'
						},
						'卫生间': {
							'正北': '水旺成灾，易招疾病',
							'正南': '水火不容，家庭不和',
							'正东': '水木相泄，影响学业',
							'正西': '金水相生，尚可',
							'西北': '金水生旺，影响男主人'
						},
						'卧室': {
							'东北': '土旺压身，影响健康',
							'西南': '土旺压身，影响女主人'
						},
						'大门': {
							'东北': '艮位阻门，事业受阻',
							'西南': '坤位病符，健康受损'
						}
					}
					return conflicts[roomName] && conflicts[roomName][direction] || '气场不和'
				},
				getElementCounter(element) {
					const counters = {
						'水': '土',
						'火': '水',
						'木': '金',
						'金': '火',
						'土': '木'
					}
					return counters[element] || element
				},
				getLuckyItem(element) {
					const items = {
						'水': '黑色水晶、鱼缸',
						'火': '红色地毯、灯饰',
						'木': '绿植、木质摆件',
						'金': '金属饰品、白色装饰',
						'土': '黄色陶瓷、水晶球'
					}
					return items[element] || '吉祥物'
				},
				getSuitableDirection(roomName) {
					const suitable = {
						'大门': ['正南', '正北', '正东', '正西', '西北', '东南'],
						'卧室': ['正北', '正南', '正东', '正西'],
						'书房': ['正东', '东南', '西北'],
						'客厅': ['正南', '正北', '正东', '正西', '西北'],
						'厨房': ['东北', '西南'],
						'卫生间': ['东北', '西南'],
						'阳台': ['正东', '东南', '正西'],
						'餐厅': ['正东', '东南', '西北']
					}
					return suitable[roomName] && suitable[roomName][0] || '吉位'
				},
				getRoomSuggestion(roomName) {
					const suggestions = {
						'大门': '调整大门朝向或在门口放置屏风',
						'卧室': '考虑更换卧室位置或在房间内放置化解物品',
						'书房': '调整书桌方向或增加照明',
						'客厅': '重新布置家具或增加装饰',
						'厨房': '调整炉灶方向或增加通风',
						'卫生间': '加强通风或在门口放置绿植',
						'阳台': '增加绿植或调整阳台门方向',
						'餐厅': '调整餐桌位置或增加照明'
					}
					return suggestions[roomName] || '进行适当调整'
				},
				getRoomBenefit(roomName, direction) {
					const benefits = {
						'大门': {
							'正南': '有利于事业发展',
							'正北': '有利于智慧提升',
							'正东': '有利于健康学业',
							'正西': '有利于人际关系',
							'西北': '有利于贵人相助',
							'东南': '有利于财运文昌'
						},
						'卧室': {
							'正北': '有利于睡眠质量',
							'正南': '有利于事业运势',
							'正东': '有利于健康',
							'正西': '有利于桃花'
						},
						'书房': {
							'正东': '有利于学业进步',
							'东南': '有利于文昌运',
							'西北': '有利于贵人相助'
						},
						'客厅': {
							'正南': '有利于家庭和睦',
							'正北': '有利于事业发展',
							'西北': '有利于男主人运势'
						}
					}
					return benefits[roomName] && benefits[roomName][direction] || '气场和谐'
				},
				getRoomWarning(roomName, direction) {
					const warnings = {
						'卧室': {
							'东北': '易犯小人，影响健康',
							'西南': '易招病符，家庭不和'
						},
						'厨房': {
							'正北': '水火相冲，注意安全',
							'正南': '火上浇油，家庭不和'
						},
						'卫生间': {
							'正南': '水火不容，家庭不和',
							'正东': '水木相泄，影响学业'
						}
					}
					return warnings[roomName] && warnings[roomName][direction] || '气场较弱'
				},
				getRoomNote(roomName, direction) {
					const notes = {
						'阳台': {
							'东北': '保持整洁，避免堆放杂物',
							'西南': '保持通风，避免潮湿'
						},
						'餐厅': {
							'东北': '保持明亮，增加生气',
							'西南': '注意清洁，避免异味'
						}
					}
					return notes[roomName] && notes[roomName][direction] || '保持整洁'
				},
				getDirectionTrigram(direction) {
					if (!this.fengshuiData[direction]) return ''
					return this.fengshuiData[direction].trigram + '位'
				},
				isRoomSuitable(roomName, direction) {
					if (!this.fengshuiData[direction]) return true
					const dirData = this.fengshuiData[direction]
					if (dirData.suitableRooms.includes(roomName)) return true
					if (dirData.unsuitableRooms.includes(roomName)) return false
					return true
				},
				getFengshuiSummary() {
					if (!this.selectedDoorDirection || !this.doorFengshuiData) {
						return '请先选择大门朝向和房屋布局，系统将为您进行专业的风水分析。'
					}
					
					const roomCount = Object.keys(this.selectedRooms).length
					const goodRooms = Object.keys(this.selectedRooms).filter(dir => {
						return this.isRoomSuitable(this.selectedRooms[dir], dir)
					}).length
					const badRooms = roomCount - goodRooms
					
					let summary = `您的房屋大门朝向${this.selectedDoorDirection}(${this.doorFengshuiData.trigram}位)，属${this.doorFengshuiData.element}元素，代表${this.doorFengshuiData.description}。`
					
					if (this.doorFengshuiData.fortune === '吉') {
						summary += '此方位为吉位，有利于家运昌盛。'
					} else {
						summary += '此方位气场较弱，建议采取相应的化解措施。'
					}
					
					if (roomCount > 0) {
						summary += `您已布局${roomCount}个房间，其中${goodRooms}个位置合适${badRooms > 0 ? `，${badRooms}个需要注意` : ''}。`
					}
					
					return summary
				},
				getElementRelation(element1, element2) {
					if (!this.elementRelations[element1]) return null
					const relation = this.elementRelations[element1]
					if (relation.generates === element2) return 'generates'
					if (relation.overcomes === element2) return 'overcomes'
					if (relation.generatedBy === element2) return 'generatedBy'
					if (relation.overcomeBy === element2) return 'overcomeBy'
					return null
				},
				getBalanceItem(element1, element2) {
					const relation = this.elementRelations[element1]
					if (relation.overcomes === element2) {
						const balanceElement = relation.generatedBy
						return this.getLuckyItem(balanceElement)
					}
					return '水晶球或绿植'
				},
				getProtectiveItem(element) {
					const relation = this.elementRelations[element]
					if (relation) {
						return this.getLuckyItem(relation.generatedBy)
					}
					return '吉祥物'
				},
				getRoomIcon(roomName) {
					const icons = {
						'大门': '🚪',
						'卫生间': '🚽',
						'阳台': '🌤️',
						'餐厅': '🍽️',
						'厨房': '🍳',
						'书房': '📚',
						'客厅': '🛋️',
						'卧室': '🛏️'
					}
					return icons[roomName] || '🏠'
				},
				getElementCounter(element) {
					if (!this.elementRelations[element]) return ''
					return this.elementRelations[element].generatedBy
				},
				getHealthTip() {
					if (!this.selectedRooms) return ''
					const roomCount = Object.keys(this.selectedRooms).length
					if (roomCount === 0) return '请合理规划各功能区域。'
					const problems = []
					Object.keys(this.selectedRooms).forEach(dir => {
						const room = this.selectedRooms[dir]
						if (room === '卫生间' && dir === '正中') {
							problems.push('卫生间不宜位于房屋中央')
						}
					})
					if (this.doorFengshuiData && this.doorFengshuiData.fortune === '凶') {
						problems.push('大门方位气场较弱，需加强化解')
					}
					return problems.length > 0 ? problems.join('，') + '。' : '您的布局基本合理。'
				},
				getYinYangTip() {
					if (!this.selectedRooms) return '光线适中'
					let yangRooms = 0
					let yinRooms = 0
					Object.keys(this.selectedRooms).forEach(dir => {
						const room = this.selectedRooms[dir]
						if (['客厅', '书房', '餐厅', '厨房'].includes(room)) {
							yangRooms++
						} else if (['卧室', '卫生间'].includes(room)) {
							yinRooms++
						}
					})
					if (yangRooms > yinRooms + 2) {
						return '阳气略盛，建议增加绿植和柔和灯光来平衡'
					} else if (yinRooms > yangRooms + 2) {
						return '阴气略重，建议增加照明和暖色调装饰来平衡'
					}
					return '当前阴阳气场较为平衡'
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

.detail-container {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #faf6f1;
	z-index: 3000;
	display: flex;
	flex-direction: column;
}

.detail-header {
	position: relative;
	height: 100rpx;
	padding: 0 30rpx;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.detail-header-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 100rpx;
	background: linear-gradient(180deg, #d43d3d 0%, #b32d2d 100%);
}

.detail-header-content {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}

.detail-back {
	position: absolute;
	left: 30rpx;
	font-size: 56rpx;
	color: #fff;
	font-weight: bold;
	line-height: 1;
}

.detail-header-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #fff;
}

.detail-scroll {
	flex: 1;
	height: calc(100vh - 240rpx);
	padding: 30rpx 40rpx;
	padding-bottom: 140rpx;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.analysis-card {
	background-color: #fff;
	border-radius: 20rpx;
	border: 2rpx solid #e8d9cf;
	margin-bottom: 30rpx;
	overflow: hidden;
	width: 100%;
	max-width: 680rpx;
}

.card-title-wrap {
	display: flex;
	justify-content: center;
	padding: 20rpx 0;
	background: linear-gradient(90deg, #faf6f1 0%, #efe8df 50%, #faf6f1 100%);
}

.card-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #d43d3d;
	background-color: #fff;
	padding: 8rpx 32rpx;
	border-radius: 20rpx;
	border: 2rpx solid #e8d9cf;
}

.card-content {
	padding: 30rpx;
}

.door-info {
	display: flex;
	align-items: center;
	gap: 20rpx;
	margin-bottom: 20rpx;
}

.door-icon {
	font-size: 48rpx;
}

.door-text {
	display: flex;
	flex-direction: column;
}

.door-label {
	font-size: 26rpx;
	color: #666;
}

.door-value {
	font-size: 30rpx;
	font-weight: bold;
	color: #d43d3d;
}

.fengshui-info {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex-wrap: wrap;
}

.fengshui-label {
	font-size: 26rpx;
	color: #666;
}

.fengshui-value {
	font-size: 30rpx;
	font-weight: bold;
	color: #d43d3d;
}

.fengshui-analysis {
	font-size: 30rpx;
	font-weight: bold;
	color: #d43d3d;
	padding: 4rpx 16rpx;
	background-color: rgba(212, 61, 61, 0.1);
	border-radius: 8rpx;
}

.fengshui-analysis.good {
	color: #2ecc71;
	background-color: rgba(46, 204, 113, 0.1);
}

.fengshui-analysis.bad {
	color: #e74c3c;
	background-color: rgba(231, 76, 60, 0.1);
}

.element-info {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
	margin-top: 20rpx;
	padding-top: 20rpx;
	border-top: 1rpx solid #f0f0f0;
}

.element-label {
	font-size: 24rpx;
	color: #666;
}

.element-value {
	font-size: 24rpx;
	color: #d43d3d;
	font-weight: bold;
	margin-right: 16rpx;
}

.good-point-item {
	display: flex;
	gap: 20rpx;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.good-point-item:last-child {
	border-bottom: none;
}

.good-point-icon {
	font-size: 32rpx;
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.good-point-content {
	flex: 1;
}

.good-point-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 8rpx;
}

.good-point-desc {
	font-size: 24rpx;
	color: #666;
	line-height: 1.6;
}

.no-data {
	text-align: center;
	padding: 40rpx 0;
}

.no-data-text {
	font-size: 26rpx;
	color: #999;
}

.direction-fortune {
	font-size: 22rpx;
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
	font-weight: bold;
}

.direction-fortune.good {
	color: #2ecc71;
	background-color: rgba(46, 204, 113, 0.1);
}

.direction-fortune.bad {
	color: #e74c3c;
	background-color: rgba(231, 76, 60, 0.1);
}

.layout-summary {
	margin-top: 20rpx;
	padding-top: 20rpx;
	border-top: 1rpx solid #f0f0f0;
}

.layout-summary-title {
	display: flex;
	align-items: center;
	gap: 12rpx;
	margin-bottom: 16rpx;
}

.summary-icon {
	font-size: 32rpx;
}

.summary-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
}

.selected-rooms-list {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.selected-room-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16rpx;
	background-color: #faf6f1;
	border-radius: 12rpx;
}

.room-direction {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.direction-text {
	font-size: 26rpx;
	font-weight: bold;
	color: #333;
}

.direction-trigram-small {
	font-size: 20rpx;
	color: #d43d3d;
	background-color: rgba(212, 61, 61, 0.1);
	padding: 4rpx 10rpx;
	border-radius: 6rpx;
}

.room-info {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.room-name {
	font-size: 26rpx;
	color: #666;
}

.room-status {
	font-size: 22rpx;
	padding: 4rpx 12rpx;
	border-radius: 6rpx;
}

.room-status.suitable {
	color: #2ecc71;
	background-color: rgba(46, 204, 113, 0.1);
}

.room-status.unsuitable {
	color: #e74c3c;
	background-color: rgba(231, 76, 60, 0.1);
}

.fengshui-summary {
	margin-top: 20rpx;
	padding: 16rpx;
	background-color: rgba(212, 61, 61, 0.05);
	border-radius: 12rpx;
}

.summary-desc {
	font-size: 24rpx;
	color: #666;
	line-height: 1.6;
	text-align: justify;
}

.position-info {
	margin-bottom: 24rpx;
}

.position-name {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}

.section-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #d43d3d;
	margin-bottom: 16rpx;
	text-align: center;
	padding: 12rpx 0;
	background-color: rgba(212, 61, 61, 0.05);
	border-radius: 8rpx;
}

.section-content {
	font-size: 26rpx;
	color: #666;
	line-height: 1.8;
	text-align: justify;
	margin-bottom: 24rpx;
}

.bottom-space {
	height: 30rpx;
}

.tip-item {
	display: flex;
	gap: 20rpx;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.tip-item:last-child {
	border-bottom: none;
}

.tip-item.warning {
	background-color: rgba(245, 222, 179, 0.3);
	margin: -30rpx;
	padding: 30rpx;
}

.tip-item.warning:last-child {
	margin-bottom: -30rpx;
}

.tip-icon {
	font-size: 40rpx;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tip-content {
	flex: 1;
}

.tip-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 8rpx;
}

.tip-desc {
	font-size: 24rpx;
	color: #666;
	line-height: 1.6;
}

.taboo-item {
	display: flex;
	gap: 20rpx;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.taboo-item:last-child {
	border-bottom: none;
}

.taboo-icon {
	font-size: 40rpx;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.taboo-content {
	flex: 1;
}

.taboo-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #d43d3d;
	display: block;
	margin-bottom: 8rpx;
}

.taboo-desc {
	font-size: 24rpx;
	color: #666;
	line-height: 1.6;
}

.layout-item {
	display: flex;
	gap: 20rpx;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.layout-item:last-child {
	border-bottom: none;
}

.layout-icon {
	font-size: 40rpx;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.layout-content {
	flex: 1;
}

.layout-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 8rpx;
}

.layout-desc {
	font-size: 24rpx;
	color: #666;
	line-height: 1.6;
}

.effect-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.effect-item {
	background-color: rgba(212, 61, 61, 0.05);
	border-radius: 12rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
}

.effect-icon {
	font-size: 40rpx;
}

.effect-title {
	font-size: 26rpx;
	font-weight: bold;
	color: #d43d3d;
}

.effect-desc {
	font-size: 22rpx;
	color: #666;
	text-align: center;
	line-height: 1.5;
}

.direction-suggestion {
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.direction-suggestion:last-child {
	border-bottom: none;
}

.direction-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-bottom: 12rpx;
}

.direction-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
}

.direction-trigram {
	font-size: 22rpx;
	color: #d43d3d;
	background-color: rgba(212, 61, 61, 0.1);
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
}

.direction-desc {
	font-size: 24rpx;
	color: #666;
	line-height: 1.6;
}

.unlock-btn {
	position: fixed;
	bottom: 60rpx;
	left: 20%;
	right: 20%;
	width: 60%;
	background: linear-gradient(180deg, #e85a5a 0%, #d43d3d 100%);
	border-radius: 30rpx;
	padding: 17rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 -5rpx 12rpx rgba(212, 61, 61, 0.2);
}

.unlock-text {
	font-size: 20rpx;
	font-weight: bold;
	color: #fff;
	letter-spacing: 2rpx;
}
</style>