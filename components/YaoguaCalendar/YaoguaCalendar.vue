<template>
	<view class="yaogua-calendar">
		<!-- 背景装饰 -->
		<view class="bg-decoration">
			<view class="corner-decoration top-left"></view>
			<view class="corner-decoration top-right"></view>
			<view class="corner-decoration bottom-left"></view>
			<view class="corner-decoration bottom-right"></view>
			<view class="center-pattern"></view>
		</view>
		
		<!-- 标题区域 -->
		<view class="header-section">
			<view class="title-box">
				<view class="title-icon">☯</view>
				<text class="main-title">在线摇卦</text>
			</view>
			<text class="sub-title">文王六十四卦金钱课</text>
		</view>
		
		<!-- 卜卦方法说明 -->
		<view class="method-section">
			<view class="section-header">
				<view class="section-icon">📜</view>
				<text class="section-title">卜卦方法</text>
			</view>
			<view class="method-content">
				<text class="method-text">静默一分钟，心念集中于你所测之事，如爱情、事业、健康等，然后心念一动，点击立即摇卦，掷出金钱卦，并查看卦辞，请自行体会其中的吉凶指示。</text>
			</view>
		</view>
		
		<!-- 摇卦区域 -->
		<view class="shake-area">
			<view class="coins-container" :class="{ shaking: isShaking }">
				<view class="coin" v-for="(coin, index) in coins" :key="index" :class="{ flipped: coin === 1 }">
					<view class="coin-inner">
						<view class="coin-face coin-front">
							<view class="coin-square"></view>
							<text class="coin-text">乾隆通宝</text>
						</view>
						<view class="coin-face coin-back">
							<view class="coin-circle"></view>
							<text class="coin-yang">阳</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="shake-btn" :class="{ shaking: isShaking }" @tap="startYaogua">
				<text class="btn-text">{{ isShaking ? '摇卦中...' : '立即摇卦' }}</text>
			</view>
		</view>
		
		<!-- 金钱卦说明 -->
		<view class="explanation-section">
			<view class="section-header">
				<view class="section-icon">💰</view>
				<text class="section-title">什么是金钱卦</text>
			</view>
			<view class="explanation-content">
				<text class="explanation-text">金钱卦是六爻占卜中的简易算法，即双掌合住六枚铜钱摇而掷出成卦。什么时候停止摇卦，全凭自己心念之所至，易经摇卦，贵在随机而动，占卜方能感应所求。</text>
			</view>
		</view>

		<!-- 卦象结果 -->
		<view class="result-section" v-if="showResult">
			<!-- 基本信息 -->
			<view class="basic-info">
				<view class="section-header">
					<text class="section-title">基本信息</text>
				</view>
				<view class="basic-content">
					<view class="gua-main">
						<view class="gua-number-row">
							<text class="gua-number-text">您掷出易经第</text>
							<text class="gua-number-highlight">{{ getGuaIndex() }}</text>
							<text class="gua-number-text">卦</text>
						</view>
						<view class="gua-title-row">
							<text class="gua-name">卦名：<text class="gua-name-highlight">{{ guaInfo.name }}</text></text>
							<text class="gua-alias">({{ guaInfo.alias }}卦)</text>
							<text class="gua-rank">柔顺伸展 上上卦</text>
						</view>
						<view class="xiang-section">
							<text class="xiang-label">象曰：</text>
							<text class="xiang-content">{{ guaInfo.text }}</text>
						</view>
						<view class="jiegua-section">
							<text class="jiegua-label">解卦：</text>
							<text class="jiegua-content">{{ guaInfo.interpretation }}</text>
						</view>
					</view>
					<view class="gua-symbol-box">
						<view class="gua-lines">
							<view class="gua-line" v-for="(line, index) in guaLines" :key="index" :class="{ broken: line === 0 }">
								<text>{{ line === 0 ? '-- --' : '------' }}</text>
							</view>
						</view>
						<text class="gua-number-tag">{{ getGuaIndex() }}{{ guaInfo.name }}</text>
					</view>
				</view>
			</view>

			<!-- 解卦信息 -->
			<view class="jiegua-section">
				<view class="section-header">
					<text class="section-title">解卦信息</text>
				</view>
				<view class="jiegua-content">
					<view class="jiegua-item" v-for="(item, index) in categoryInfo" :key="index">
						<text class="jiegua-label">{{ item.label }}：</text>
						<text class="jiegua-text">{{ item.value }}</text>
					</view>
				</view>
			</view>

			<!-- 重新摇卦 -->
			<view class="reset-btn" @tap="resetYaogua">
				<text class="btn-text">重新摇卦</text>
			</view>
		</view>
		
		<!-- 摇卦简介 -->
		<view class="intro-section">
			<view class="section-header">
				<view class="section-icon">📚</view>
				<text class="section-title">摇卦简介</text>
			</view>
			<view class="intro-content">
				<view class="intro-item">
					<text class="intro-number">1.</text>
					<text class="intro-text">六十四卦金钱课，就是用三枚铜钱占卦，每掷出三枚铜钱一次，即得到一爻，掷六次，得到六爻，排成卦象，即得到六十四卦之一，用以占卜吉凶。后世亦传有简易的金钱课占法，只需掷出一次铜钱即可，缘份居金钱课卜卦即本于此。</text>
				</view>
				<view class="intro-item">
					<text class="intro-number">2.</text>
					<text class="intro-text">心诚则灵，测算结果仅供参考。</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 六爻摇卦组件
 * 基于铜钱摇卦原理实现占卜功能
 * 支持六次摇卦，每次摇三枚铜钱，共六爻组成一卦
 */

// 六十四卦数据
const guaData = {
	'000000': { name: '乾', alias: '为天', symbol: '☰', text: '元亨利贞', interpretation: '天行健，君子以自强不息。', career: '事业顺利，步步高升', business: '经商得利，财源广进', travel: '外出吉利，一路顺风', love: '婚姻美满，感情和睦', decision: '果断决策，前途光明' },
	'000001': { name: '姤', alias: '天风', symbol: '☰☴', text: '女壮，勿用取女。', interpretation: '天下有风，姤。后以施命诰四方。', career: '事业初起，需防小人', business: '商业机会，谨慎把握', travel: '外出有利，注意风向', love: '感情萌芽，谨慎对待', decision: '时机未至，暂缓决定' },
	'000010': { name: '遁', alias: '天山', symbol: '☰☶', text: '亨，小利贞。', interpretation: '天下有山，遁。君子以远小人，不恶而严。', career: '功成身退，明哲保身', business: '收缩经营，保存实力', travel: '宜隐不宜显', love: '感情需退一步思考', decision: '以退为进，静待时机' },
	'000011': { name: '否', alias: '天地', symbol: '☰☷', text: '否之匪人，不利君子贞，大往小来。', interpretation: '天地不交，否。君子以俭德辟难，不可荣以禄。', career: '事业受阻，诸事不顺', business: '商业萧条，保守经营', travel: '外出不利，宜守不宜动', love: '感情不和，沟通困难', decision: '不宜决策，等待转机' },
	'000100': { name: '履', alias: '天泽', symbol: '☰☱', text: '履虎尾，不咥人，亨。', interpretation: '上天下泽，履。君子以辨上下，定民志。', career: '步步为营，小心行事', business: '稳步发展，谨慎前行', travel: '旅途顺利，平安归来', love: '感情需要磨合', decision: '谨慎决策，三思而行' },
	'000101': { name: '同人', alias: '天火', symbol: '☰☲', text: '同人于野，亨。利涉大川，利君子贞。', interpretation: '天与火，同人。君子以类族辨物。', career: '与人合作，共同发展', business: '合伙经营，互利共赢', travel: '结伴而行，相互照应', love: '感情融洽，同心同德', decision: '集思广益，共同决策' },
	'000110': { name: '无妄', alias: '天雷', symbol: '☰☳', text: '元亨利贞。其匪正有眚，不利有攸往。', interpretation: '天下雷行，物与无妄。先王以茂对时，育万物。', career: '坚守正道，勿生妄念', business: '诚信经营，不贪不义之财', travel: '外出吉利，无灾无难', love: '感情真挚，切勿妄动', decision: '果断决策，切忌妄行' },
	'000111': { name: '噬嗑', alias: '火雷', symbol: '☲☳', text: '亨。利用狱。', interpretation: '雷电，噬嗑。先王以明罚敕法。', career: '整顿秩序，清除障碍', business: '处理纠纷，公正裁决', travel: '途中可能有阻滞', love: '感情有摩擦，需要沟通', decision: '需要决断，清除障碍' },
	'001000': { name: '大有', alias: '火天', symbol: '☲☰', text: '元亨。', interpretation: '火在天上，大有。君子以遏恶扬善，顺天休命。', career: '事业有成，收获颇丰', business: '生意兴隆，财源滚滚', travel: '外出顺利，满载而归', love: '感情丰收，幸福美满', decision: '顺势而为，大展宏图' },
	'001001': { name: '离', alias: '为火', symbol: '☲', text: '利贞，亨。畜牝牛吉。', interpretation: '明两作，离。大人以继明照于四方。', career: '光明磊落，前途光明', business: '蒸蒸日上，红红火火', travel: '外出光明，顺利平安', love: '感情光明，坦诚相待', decision: '光明正大，果断决策' },
	'001010': { name: '旅', alias: '火山', symbol: '☲☶', text: '小亨。旅贞吉。', interpretation: '山上有火，旅。君子以明慎用刑而不留狱。', career: '事业奔波，居无定所', business: '商旅活动，有利可图', travel: '旅途劳顿，但有收获', love: '感情漂泊，难定归宿', decision: '谨慎决策，以静制动' },
	'001011': { name: '鼎', alias: '火风', symbol: '☲☴', text: '元吉，亨。', interpretation: '木上有火，鼎。君子以正位凝命。', career: '地位稳固，事业鼎盛', business: '事业兴旺，蒸蒸日上', travel: '外出吉利，满载而归', love: '感情稳定，家庭和睦', decision: '抓住机遇，大展宏图' },
	'001100': { name: '未济', alias: '火水', symbol: '☲☵', text: '亨。小狐汔济，濡其尾，无攸利。', interpretation: '火在水上，未济。君子以慎辨物居方。', career: '事业未竟，尚需努力', business: '事情未完成，继续努力', travel: '行程未结束，谨慎前行', love: '感情未成熟，尚需培养', decision: '时机未到，暂缓决定' },
	'001101': { name: '既济', alias: '水火', symbol: '☵☲', text: '亨小，利贞。初吉终乱。', interpretation: '水在火上，既济。君子以思患而豫防之。', career: '事业完成，谨防后患', business: '事情成功，居安思危', travel: '到达目的地，注意安全', love: '感情成熟，谨防变故', decision: '成功之后，谨慎行事' },
	'001110': { name: '贲', alias: '山火', symbol: '☶☲', text: '亨。小利有攸往。', interpretation: '山下有火，贲。君子以明庶政，无敢折狱。', career: '事业需要修饰，注重形象', business: '包装宣传，提升品牌', travel: '外出风光，注意仪表', love: '感情需要美化', decision: '修饰外表，谨慎决策' },
	'001111': { name: '明夷', alias: '地火', symbol: '☷☲', text: '利艰贞。', interpretation: '明入地中，明夷。君子以莅众，用晦而明。', career: '事业受挫，韬光养晦', business: '暂时隐退，保存实力', travel: '外出不利，宜静不宜动', love: '感情受阻，保持低调', decision: '隐藏锋芒，静待时机' },
	'010000': { name: '需', alias: '水天', symbol: '☵☰', text: '有孚，光亨，贞吉。利涉大川。', interpretation: '云上于天，需。君子以饮食宴乐。', career: '事业需要等待时机', business: '等待商机，耐心经营', travel: '旅途需要等待', love: '感情需要耐心等待', decision: '等待时机，不可急躁' },
	'010001': { name: '讼', alias: '天水', symbol: '☰☵', text: '有孚窒惕，中吉。终凶。利见大人，不利涉大川。', interpretation: '天与水违行，讼。君子以作事谋始。', career: '事业有纠纷，谨慎处理', business: '商业诉讼，小心应对', travel: '外出有争，不宜远行', love: '感情有争执，需要沟通', decision: '避免争讼，寻求和解' },
	'010010': { name: '师', alias: '地水师', symbol: '☷☵', text: '贞，丈人吉，无咎。', interpretation: '地中有水，师。君子以容民畜众。', career: '领导众人，成就事业', business: '团队合作，共同发展', travel: '率众出行，声势浩大', love: '感情需要主导', decision: '果断指挥，统一行动' },
	'010011': { name: '比', alias: '水地', symbol: '☵☷', text: '吉。原筮元永贞，无咎。不宁方来，后夫凶。', interpretation: '地上有水，比。先王以建万国，亲诸侯。', career: '广结善缘，朋友相助', business: '合作共赢，互利互惠', travel: '外出得助，顺利平安', love: '感情和睦，相亲相爱', decision: '与人相比，择善而从' },
	'010100': { name: '小畜', alias: '风天', symbol: '☴☰', text: '亨。密云不雨，自我西郊。', interpretation: '风行天上，小畜。君子以懿文德。', career: '事业小有积蓄，尚需努力', business: '小有所成，继续积累', travel: '外出有阻，等待时机', love: '感情小有进展', decision: '积蓄力量，等待时机' },
	'010101': { name: '巽', alias: '为风', symbol: '☴', text: '小亨，利有攸往，利见大人。', interpretation: '随风，巽。君子以申命行事。', career: '事业顺利，进展迅速', business: '商业顺畅，流通无阻', travel: '外出顺利，一路顺风', love: '感情和顺，沟通顺畅', decision: '顺势而为，灵活应变' },
	'010110': { name: '渐', alias: '风山', symbol: '☴☶', text: '女归吉，利贞。', interpretation: '山上有木，渐。君子以居贤德善俗。', career: '事业循序渐进，稳步发展', business: '逐步积累，稳扎稳打', travel: '渐行渐远，平安顺利', love: '感情渐进，水到渠成', decision: '循序渐进，不可急躁' },
	'010111': { name: '中孚', alias: '风泽', symbol: '☴☱', text: '豚鱼吉，利涉大川，利贞。', interpretation: '泽上有风，中孚。君子以议狱缓死。', career: '诚实守信，事业有成', business: '诚信经营，顾客盈门', travel: '外出得信，顺利平安', love: '感情真诚，相互信任', decision: '坚守诚信，公正决策' },
	'011000': { name: '节', alias: '水泽', symbol: '☵☱', text: '亨。苦节不可贞。', interpretation: '泽上有水，节。君子以制数度，议德行。', career: '事业节制，适可而止', business: '节约开支，合理经营', travel: '节制出行，量入为出', love: '感情节制，把握分寸', decision: '适度决策，不可过度' },
	'011001': { name: '兑', alias: '为泽', symbol: '☱', text: '亨，利贞。', interpretation: '丽泽，兑。君子以朋友讲习。', career: '事业喜悦，人际关系好', business: '商业繁荣，顾客满意', travel: '外出愉快，收获满满', love: '感情甜蜜，和和美美', decision: '愉快决策，皆大欢喜' },
	'011010': { name: '损', alias: '山泽', symbol: '☶☱', text: '有孚，元吉，无咎，可贞，利有攸往。曷之用，二簋可用享。', interpretation: '山下有泽，损。君子以惩忿窒欲。', career: '事业有损失，需忍耐', business: '有所损失，以退为进', travel: '外出有损，谨慎行事', love: '感情有损伤，需要修复', decision: '权衡利弊，有所取舍' },
	'011011': { name: '咸', alias: '泽山', symbol: '☱☶', text: '亨，利贞，取女吉。', interpretation: '山上有泽，咸。君子以虚受人。', career: '事业感应，心意相通', business: '商业往来，互惠互利', travel: '外出有感，心有所动', love: '感情相感，心灵相通', decision: '顺应感应，自然而为' },
	'011100': { name: '屯', alias: '水雷', symbol: '☵☳', text: '元亨利贞，勿用有攸往，利建侯。', interpretation: '云雷，屯。君子以经纶。', career: '事业初创，艰难起步', business: '创业初期，困难重重', travel: '出行受阻，等待时机', love: '感情萌芽，需要培养', decision: '艰难决策，稳步推进' },
	'011101': { name: '随', alias: '泽雷', symbol: '☱☳', text: '元亨利贞，无咎。', interpretation: '泽中有雷，随。君子以向晦入宴息。', career: '事业顺遂，跟随潮流', business: '顺势而为，随遇而安', travel: '出行顺利，随遇而安', love: '感情随缘，顺其自然', decision: '顺势决策，灵活应变' },
	'011110': { name: '颐', alias: '山雷', symbol: '☶☳', text: '贞吉。观颐，自求口实。', interpretation: '山下有雷，颐。君子以慎言语，节饮食。', career: '事业需要休养，厚积薄发', business: '谨慎经营，节俭度日', travel: '外出休养，调养身心', love: '感情需要滋养', decision: '慎言慎行，谨慎决策' },
	'011111': { name: '复', alias: '地雷', symbol: '☷☳', text: '亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。', interpretation: '雷在地中，复。先王以至日闭关，商旅不行，后不省方。', career: '事业复兴，重新开始', business: '恢复经营，东山再起', travel: '外出回归，平安归来', love: '感情复合，破镜重圆', decision: '回归正道，重新出发' },
	'100000': { name: '大壮', alias: '雷天', symbol: '☳☰', text: '利贞。', interpretation: '雷在天上，大壮。君子以非礼弗履。', career: '事业壮大，实力雄厚', business: '规模扩大，实力增强', travel: '外出壮大，声势浩大', love: '感情强势，需要克制', decision: '量力而行，不可逞强' },
	'100001': { name: '恒', alias: '雷风', symbol: '☳☴', text: '亨，无咎，利贞，利有攸往。', interpretation: '雷风，恒。君子以立不易方。', career: '事业恒久，持之以恒', business: '长久经营，稳定发展', travel: '外出持久，贵在坚持', love: '感情长久，始终如一', decision: '持之以恒，坚定信念' },
	'100010': { name: '升', alias: '地风', symbol: '☷☴', text: '元亨，用见大人，勿恤，南征吉。', interpretation: '地中生木，升。君子以顺德，积小以高大。', career: '事业上升，步步高升', business: '蒸蒸日上，不断发展', travel: '南行有利，步步高升', love: '感情升温，越来越好', decision: '顺势上升，乘势而为' },
	'100011': { name: '蛊', alias: '山风', symbol: '☶☴', text: '元亨，利涉大川。先甲三日，后甲三日。', interpretation: '山下有风，蛊。君子以振民育德。', career: '事业有弊，需要整顿', business: '整顿内部，清除弊病', travel: '外出有阻，先整后行', love: '感情有问题，需要修复', decision: '整顿治理，清除隐患' },
	'100100': { name: '井', alias: '水风', symbol: '☵☴', text: '改邑不改井，无丧无得，往来井井。汔至，亦未繘井，羸其瓶，凶。', interpretation: '木上有水，井。君子以劳民劝相。', career: '事业稳定，滋养众人', business: '稳定经营，造福社会', travel: '外出有水，生活便利', love: '感情稳定，细水长流', decision: '保持稳定，惠泽他人' },
	'100101': { name: '革', alias: '泽火', symbol: '☱☲', text: '已日乃孚，元亨利贞，悔亡。', interpretation: '泽中有火，革。君子以治历明时。', career: '事业变革，破旧立新', business: '改革创新，与时俱进', travel: '外出变革，焕然一新', love: '感情革新，重新开始', decision: '大胆改革，勇于创新' },
	'100110': { name: '鼎', alias: '火风', symbol: '☲☴', text: '元吉，亨。', interpretation: '木上有火，鼎。君子以正位凝命。', career: '事业鼎盛，地位稳固', business: '事业兴旺，蒸蒸日上', travel: '外出吉利，满载而归', love: '感情稳定，家庭和睦', decision: '抓住机遇，大展宏图' },
	'100111': { name: '震', alias: '为雷', symbol: '☳', text: '亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。', interpretation: '洊雷，震。君子以恐惧修省。', career: '事业震动，警钟长鸣', business: '突发变故，谨慎应对', travel: '外出震动，小心行事', love: '感情震动，需要安抚', decision: '震惊之后，谨慎决策' },
	'101000': { name: '豫', alias: '雷地', symbol: '☳☷', text: '利建侯行师。', interpretation: '雷出地奋，豫。先王以作乐崇德，殷荐之上帝，以配祖考。', career: '事业顺遂，欢乐愉快', business: '商业繁荣，歌舞升平', travel: '外出愉快，心情舒畅', love: '感情愉悦，幸福美满', decision: '顺应时势，享受成功' },
	'101001': { name: '解', alias: '雷水', symbol: '☳☵', text: '利西南，无所往，其来复吉。有攸往，夙吉。', interpretation: '雷雨作，解。君子以赦过宥罪。', career: '事业解脱，困难解除', business: '解除困境，恢复经营', travel: '外出脱困，顺利归来', love: '感情和解，重归于好', decision: '解除束缚，重新开始' },
	'101010': { name: '恒', alias: '雷风', symbol: '☳☴', text: '亨，无咎，利贞，利有攸往。', interpretation: '雷风，恒。君子以立不易方。', career: '事业恒久，持之以恒', business: '长久经营，稳定发展', travel: '外出持久，贵在坚持', love: '感情长久，始终如一', decision: '持之以恒，坚定信念' },
	'101011': { name: '益', alias: '风雷', symbol: '☴☳', text: '利有攸往，利涉大川。', interpretation: '风雷，益。君子以见善则迁，有过则改。', career: '事业增益，越来越好', business: '利益增长，财源广进', travel: '外出有益，收获颇丰', love: '感情增进，日益加深', decision: '见善则迁，不断改进' },
	'101100': { name: '夬', alias: '泽天', symbol: '☱☰', text: '扬于王庭，孚号有厉。告自邑，不利即戎，利有攸往。', interpretation: '泽上于天，夬。君子以施禄及下，居德则忌。', career: '事业决断，清除小人', business: '果断决策，清除障碍', travel: '外出果断，势不可挡', love: '感情决断，快刀斩乱麻', decision: '果断决策，当机立断' },
	'101101': { name: '姤', alias: '天风', symbol: '☰☴', text: '女壮，勿用取女。', interpretation: '天下有风，姤。后以施命诰四方。', career: '事业初起，需防小人', business: '商业机会，谨慎把握', travel: '外出有利，注意风向', love: '感情萌芽，谨慎对待', decision: '时机未至，暂缓决定' },
	'101110': { name: '大过', alias: '泽风', symbol: '☱☴', text: '栋桡，利有攸往，亨。', interpretation: '泽灭木，大过。君子以独立不惧，遁世无闷。', career: '事业大过，需要谨慎', business: '过度发展，风险加大', travel: '外出有险，谨慎行事', love: '感情过度，适可而止', decision: '谨慎行事，避免过度' },
	'101111': { name: '坤', alias: '为地', symbol: '☷', text: '元亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋，东北丧朋。安贞吉。', interpretation: '地势坤，君子以厚德载物。', career: '事业稳重，厚积薄发', business: '以柔克刚，顺势而为', travel: '西南有利，东北不利', love: '感情温顺，包容大度', decision: '以柔克刚，稳重行事' },
	'110000': { name: '谦', alias: '地山', symbol: '☷☶', text: '亨，君子有终。', interpretation: '地中有山，谦。君子以裒多益寡，称物平施。', career: '事业谦逊，终获成功', business: '谦虚经营，和气生财', travel: '外出谦逊，广结善缘', love: '感情谦和，互相尊重', decision: '谦虚谨慎，戒骄戒躁' },
	'110001': { name: '艮', alias: '为山', symbol: '☶', text: '艮其背，不获其身，行其庭，不见其人，无咎。', interpretation: '兼山，艮。君子以思不出其位。', career: '事业停滞，需要静止', business: '暂停经营，静观其变', travel: '不宜外出，宜静不宜动', love: '感情静止，保持距离', decision: '停止行动，静观其变' },
	'110010': { name: '蹇', alias: '水山', symbol: '☵☶', text: '利西南，不利东北。利见大人，贞吉。', interpretation: '山上有水，蹇。君子以反身修德。', career: '事业艰难，需要修身', business: '困难重重，反身修德', travel: '西南有利，东北不利', love: '感情不顺，反躬自省', decision: '修身养性，静待转机' },
	'110011': { name: '渐', alias: '风山', symbol: '☴☶', text: '女归吉，利贞。', interpretation: '山上有木，渐。君子以居贤德善俗。', career: '事业循序渐进，稳步发展', business: '逐步积累，稳扎稳打', travel: '渐行渐远，平安顺利', love: '感情渐进，水到渠成', decision: '循序渐进，不可急躁' },
	'110100': { name: '晋', alias: '火地', symbol: '☲☷', text: '康侯用锡马蕃庶，昼日三接。', interpretation: '明出地上，晋。君子以自昭明德。', career: '事业晋升，步步高升', business: '蒸蒸日上，繁荣昌盛', travel: '外出晋升，前途光明', love: '感情进展，越来越好', decision: '积极进取，大展宏图' },
	'110101': { name: '明夷', alias: '地火', symbol: '☷☲', text: '利艰贞。', interpretation: '明入地中，明夷。君子以莅众，用晦而明。', career: '事业受挫，韬光养晦', business: '暂时隐退，保存实力', travel: '外出不利，宜静不宜动', love: '感情受阻，保持低调', decision: '隐藏锋芒，静待时机' },
	'110110': { name: '家人', alias: '风火', symbol: '☴☲', text: '利女贞。', interpretation: '风自火出，家人。君子以言有物而行有恒。', career: '事业如家庭，和睦相处', business: '经营如治家，井井有条', travel: '外出思家，平安归来', love: '感情和睦，家庭美满', decision: '以家为本，和睦相处' },
	'110111': { name: '丰', alias: '雷火', symbol: '☳☲', text: '亨，王假之，勿忧，宜日中。', interpretation: '雷电皆至，丰。君子以折狱致刑。', career: '事业丰收，成果丰硕', business: '生意兴隆，财源广进', travel: '外出收获，满载而归', love: '感情丰收，幸福美满', decision: '抓住机遇，收获成果' },
	'111000': { name: '萃', alias: '泽地', symbol: '☱☷', text: '亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。', interpretation: '泽上于地，萃。君子以除戎器，戒不虞。', career: '事业荟萃，人才聚集', business: '精英汇聚，共谋发展', travel: '外出聚会，广结人脉', love: '感情相聚，缘分天定', decision: '集思广益，共谋发展' },
	'111001': { name: '困', alias: '泽水', symbol: '☱☵', text: '亨，贞，大人吉，无咎。有言不信。', interpretation: '泽无水，困。君子以致命遂志。', career: '事业困难，坚守信念', business: '经营困难，坚持到底', travel: '外出受困，坚守本心', love: '感情困扰，坚守真诚', decision: '坚守信念，渡过难关' },
	'111010': { name: '井', alias: '水风', symbol: '☵☴', text: '改邑不改井，无丧无得，往来井井。汔至，亦未繘井，羸其瓶，凶。', interpretation: '木上有水，井。君子以劳民劝相。', career: '事业稳定，滋养众人', business: '稳定经营，造福社会', travel: '外出有水，生活便利', love: '感情稳定，细水长流', decision: '保持稳定，惠泽他人' },
	'111011': { name: '革', alias: '泽火', symbol: '☱☲', text: '已日乃孚，元亨利贞，悔亡。', interpretation: '泽中有火，革。君子以治历明时。', career: '事业变革，破旧立新', business: '改革创新，与时俱进', travel: '外出变革，焕然一新', love: '感情革新，重新开始', decision: '大胆改革，勇于创新' },
	'111100': { name: '既济', alias: '水火', symbol: '☵☲', text: '亨小，利贞。初吉终乱。', interpretation: '水在火上，既济。君子以思患而豫防之。', career: '事业完成，谨防后患', business: '事情成功，居安思危', travel: '到达目的地，注意安全', love: '感情成熟，谨防变故', decision: '成功之后，谨慎行事' },
	'111101': { name: '未济', alias: '火水', symbol: '☲☵', text: '亨。小狐汔济，濡其尾，无攸利。', interpretation: '火在水上，未济。君子以慎辨物居方。', career: '事业未竟，尚需努力', business: '事情未完成，继续努力', travel: '行程未结束，谨慎前行', love: '感情未成熟，尚需培养', decision: '时机未到，暂缓决定' },
	'111110': { name: '归妹', alias: '雷泽', symbol: '☳☱', text: '征凶，无攸利。', interpretation: '泽上有雷，归妹。君子以永终知敝。', career: '事业有失，需要反思', business: '有所损失，吸取教训', travel: '外出不利，不宜远行', love: '感情有归，慎重对待', decision: '慎重决策，避免失误' },
	'111111': { name: '坤', alias: '为地', symbol: '☷', text: '元亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋，东北丧朋。安贞吉。', interpretation: '地势坤，君子以厚德载物。', career: '事业稳重，厚积薄发', business: '以柔克刚，顺势而为', travel: '西南有利，东北不利', love: '感情温顺，包容大度', decision: '以柔克刚，稳重行事' }
};

export default {
	name: 'YaoguaCalendar',
	data() {
			return {
				// 六枚铜钱状态 (0=背, 1=面)
				coins: [0, 0, 0, 0, 0, 0],
			// 是否正在摇卦
			isShaking: false,
			// 是否显示结果
			showResult: false,
			// 卦爻结果 (7=少阳, 8=少阴, 9=老阳, 6=老阴)
			yaoResult: [],
			// 卦象信息
			guaInfo: {
				name: '',
				alias: '',
				symbol: '',
				text: '',
				interpretation: ''
			},
			// 分类解卦信息
			categoryInfo: []
		};
	},
	computed: {
		/** 卦象线条显示 */
		guaLines() {
			if (this.yaoResult.length === 0) return [];
			return this.yaoResult.map(yao => {
				// 奇数为阳爻，偶数为阴爻
				return yao % 2 === 1 ? 1 : 0;
			});
		}
	},
	methods: {
		/** 获取卦象索引 */
		getGuaIndex() {
			if (this.yaoResult.length === 0) return 0;
			const guaKey = this.yaoResult.map(yao => yao % 2).join('');
			const keys = Object.keys(guaData);
			return keys.indexOf(guaKey) + 1;
		},

		/** 开始摇卦 */
		startYaogua() {
			if (this.isShaking) return;

			this.isShaking = true;
			this.showResult = false;
			this.yaoResult = [];

			let shakeCount = 0;
			const maxShakes = 20; // 摇卦次数，约2秒(20 * 100ms)

			const shakeInterval = setInterval(() => {
				// 随机生成六枚铜钱的状态
				this.coins = this.coins.map(() => Math.floor(Math.random() * 2));
				shakeCount++;

				if (shakeCount >= maxShakes) {
					clearInterval(shakeInterval);
					this.isShaking = false;
					this.generateFullGua(); // 直接生成完整卦象
				}
			}, 100); // 摇卦间隔时间(ms)，20次约2秒
		},

		/** 生成完整卦象（六爻） */
		generateFullGua() {
			this.yaoResult = [];
			for (let i = 0; i < 6; i++) {
				// 随机生成六枚铜钱的状态
				const coinStates = Array.from({ length: 6 }, () => Math.floor(Math.random() * 2));
				const faceCount = coinStates.filter(c => c === 1).length;

				// 确定爻的类型（六枚铜钱摇卦法）
				let yao;
				if (faceCount >= 4) {
					yao = 9; // 老阳（4-6个正面）
				} else if (faceCount === 3) {
					yao = 8; // 少阴（3个正面）
				} else if (faceCount >= 1) {
					yao = 7; // 少阳（1-2个正面）
				} else {
					yao = 6; // 老阴（0个正面）
				}

				this.yaoResult.push(yao);
			}
			this.calculateGua();
		},

		/** 记录一爻（保留用于兼容） */
		recordYao() {
			// 计算铜钱结果：面(1)的数量（六枚铜钱）
			const faceCount = this.coins.filter(c => c === 1).length;
			const backCount = 6 - faceCount;

			// 确定爻的类型（六枚铜钱摇卦法）
			let yao;
			if (faceCount === 6 || faceCount >= 4) {
				yao = 9; // 老阳（4-6个正面）
			} else if (faceCount === 3) {
				yao = 8; // 少阴（3个正面）
			} else if (faceCount === 2 || faceCount === 1) {
				yao = 7; // 少阳（1-2个正面）
			} else {
				yao = 6; // 老阴（0个正面）
			}

			this.yaoResult.push(yao);

			// 如果已经摇了六爻，计算卦象
			if (this.yaoResult.length >= 6) {
				this.calculateGua();
			} else {
				uni.showToast({
					title: `第${this.yaoResult.length}爻完成`,
					icon: 'none'
				});
			}
		},

		/** 计算卦象 */
		calculateGua() {
			try {
				// 将卦爻结果转换为二进制字符串（0=阴爻，1=阳爻）
				const guaKey = this.yaoResult.map(yao => yao % 2).join('');
				
				// 获取卦象信息
				const gua = guaData[guaKey] || { 
					name: '未济', 
					alias: '未知', 
					symbol: '☯', 
					text: '未知', 
					interpretation: '卦象未明，请重新摇卦。',
					career: '事业未明',
					business: '商业未明',
					travel: '出行未明',
					love: '感情未明',
					decision: '决策未明'
				};

				this.guaInfo = {
					name: gua.name,
					alias: gua.alias,
					symbol: gua.symbol,
					text: gua.text,
					interpretation: gua.interpretation
				};

				// 获取分类解卦信息
				this.categoryInfo = [
					{ label: '事业', value: gua.career },
					{ label: '经商', value: gua.business },
					{ label: '求名', value: gua.name + '卦' },
					{ label: '外出', value: gua.travel },
					{ label: '婚恋', value: gua.love },
					{ label: '决策', value: gua.decision }
				];

				this.showResult = true;
			} catch (error) {
				console.error('计算卦象失败:', error);
				uni.showToast({
					title: '卦象计算失败',
					icon: 'none'
				});
			}
		},

		/** 重置摇卦 */
		resetYaogua() {
			this.coins = [0, 0, 0];
			this.yaoResult = [];
			this.showResult = false;
			this.guaInfo = {
				name: '',
				alias: '',
				symbol: '',
				text: '',
				interpretation: ''
			};
			this.categoryInfo = [];
		}
	}
};
</script>

<style scoped>
.yaogua-calendar {
	padding: 30rpx;
	min-height: 100vh;
	background: linear-gradient(180deg, #f5f0e6 0%, #e8dfd0 100%);
	position: relative;
	overflow: hidden;
}

/* 背景装饰 */
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

.top-left {
	top: 20rpx;
	left: 20rpx;
}

.top-left::before {
	top: 0;
	left: 0;
}

.top-left::after {
	top: 10rpx;
	left: 10rpx;
}

.top-right {
	top: 20rpx;
	right: 20rpx;
}

.top-right::before {
	top: 0;
	right: 0;
}

.top-right::after {
	top: 10rpx;
	right: 10rpx;
}

.bottom-left {
	bottom: 20rpx;
	left: 20rpx;
}

.bottom-left::before {
	bottom: 0;
	left: 0;
}

.bottom-left::after {
	bottom: 10rpx;
	left: 10rpx;
}

.bottom-right {
	bottom: 20rpx;
	right: 20rpx;
}

.bottom-right::before {
	bottom: 0;
	right: 0;
}

.bottom-right::after {
	bottom: 10rpx;
	right: 10rpx;
}

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

/* 标题区域 */
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

.title-icon {
	font-size: 44rpx;
}

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

/* 卜卦方法说明 */
.method-section {
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

.section-icon {
	font-size: 32rpx;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #5c4033;
}

.method-content {
	background: #faf6f1;
	border-radius: 12rpx;
	padding: 20rpx;
}

.method-text {
	font-size: 26rpx;
	color: #6b5344;
	line-height: 1.8;
	text-align: justify;
}

/* 摇卦区域 */
.shake-area {
	text-align: center;
	padding: 40rpx 0;
	position: relative;
	z-index: 1;
}

.coins-container {
	display: flex;
	justify-content: center;
	gap: 24rpx;
	margin-bottom: 40rpx;
	perspective: 1000rpx;
}

/* 铜钱样式 */
.coin {
	width: 100rpx;
	height: 100rpx;
	position: relative;
	transform-style: preserve-3d;
	transition: transform 0.6s ease;
}

.coin-inner {
	width: 100%;
	height: 100%;
	position: relative;
	transform-style: preserve-3d;
}

.coin-face {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	backface-visibility: hidden;
}

.coin-front {
	background: linear-gradient(145deg, #d4af37 0%, #c9a227 50%, #b8942f 100%);
	border: 4rpx solid #8b6914;
	box-shadow: 
		0 4rpx 12rpx rgba(139, 105, 20, 0.35),
		inset 0 2rpx 4rpx rgba(255, 255, 255, 0.4);
}

.coin-back {
	background: linear-gradient(145deg, #e8dfd0 0%, #d4c9b0 50%, #c4b896 100%);
	border: 4rpx solid #b8a88a;
	transform: rotateY(180deg);
	box-shadow: 
		0 4rpx 12rpx rgba(139, 105, 20, 0.25),
		inset 0 2rpx 4rpx rgba(255, 255, 255, 0.3);
}

.coin.flipped .coin-inner {
	transform: rotateY(180deg);
}

.coin-square {
	width: 28rpx;
	height: 28rpx;
	background: #5c4033;
	border: 2rpx solid #4a3528;
	margin-bottom: 4rpx;
}

.coin-circle {
	width: 28rpx;
	height: 28rpx;
	border-radius: 50%;
	background: #5c4033;
	border: 2rpx solid #4a3528;
	margin-bottom: 4rpx;
}

.coin-text {
	font-size: 12rpx;
	color: #4a3528;
	font-weight: 600;
	letter-spacing: 0.5rpx;
}

.coin-yang {
	font-size: 22rpx;
	color: #5c4033;
	font-weight: bold;
}

/* 摇卦动画 */
.shaking .coin {
	animation: coinFlip 0.25s ease-in-out infinite;
}

@keyframes coinFlip {
	0% { transform: rotateX(0deg) translateY(0) scale(1); }
	25% { transform: rotateX(90deg) translateY(-30rpx) scale(1.1); }
	50% { transform: rotateX(180deg) translateY(-40rpx) scale(1); }
	75% { transform: rotateX(270deg) translateY(-30rpx) scale(1.1); }
	100% { transform: rotateX(360deg) translateY(0) scale(1); }
}

/* 摇卦按钮 */
.shake-btn {
	background: linear-gradient(135deg, #8fbc8f 0%, #6b8e6b 50%, #5a7a5a 100%);
	padding: 28rpx 100rpx;
	border-radius: 8rpx;
	display: inline-block;
	box-shadow: 
		0 6rpx 16rpx rgba(107, 142, 107, 0.35),
		inset 0 2rpx 4rpx rgba(255, 255, 255, 0.2);
	transition: all 0.3s ease;
	border: 1rpx solid rgba(255, 255, 255, 0.2);
}

.shake-btn:active {
	transform: scale(0.98);
	box-shadow: 
		0 3rpx 8rpx rgba(107, 142, 107, 0.35),
		inset 0 2rpx 4rpx rgba(255, 255, 255, 0.1);
}

.shake-btn.shaking {
	background: linear-gradient(135deg, #9cc99c 0%, #7a9e7a 50%, #6a8e6a 100%);
	animation: btnPulse 0.5s ease-in-out infinite;
}

@keyframes btnPulse {
	0%, 100% { box-shadow: 0 6rpx 16rpx rgba(107, 142, 107, 0.35); }
	50% { box-shadow: 0 8rpx 20rpx rgba(107, 142, 107, 0.5); }
}

.btn-text {
	font-size: 34rpx;
	font-weight: bold;
	color: #3d5a3d;
	letter-spacing: 4rpx;
}

.tip-text {
	margin-top: 30rpx;
	font-size: 24rpx;
	color: #9a7b4f;
}

/* 金钱卦说明 */
.explanation-section {
	background: #fff;
	border-radius: 16rpx;
	padding: 28rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 1;
}

.explanation-content {
	background: #faf6f1;
	border-radius: 12rpx;
	padding: 20rpx;
}

.explanation-text {
	font-size: 26rpx;
	color: #6b5344;
	line-height: 1.8;
	text-align: justify;
}

/* 摇卦简介 */
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
	font-size: 26rpx;
	font-weight: bold;
	color: #c41e3a;
	flex-shrink: 0;
}

.intro-text {
	font-size: 26rpx;
	color: #6b5344;
	line-height: 1.8;
	text-align: justify;
}

/* 结果区域 */
.result-section {
	margin-top: 30rpx;
	position: relative;
	z-index: 1;
}

.section-title {
	display: block;
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 16rpx;
	padding: 12rpx 20rpx;
	background: #f5f5f5;
	border-bottom: 2rpx solid #e0e0e0;
}

/* 基本信息 */
.basic-info {
	background: #fff;
	padding: 30rpx;
	margin-bottom: 24rpx;
	border: 1rpx solid #ddd;
	border-radius: 8rpx;
	box-shadow: none;
}

.basic-content {
	display: flex;
	justify-content: space-between;
	gap: 30rpx;
}

.gua-main {
	flex: 1;
}

.gua-number-row {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	font-size: 28rpx;
	color: #333;
}

.gua-number-text {
	color: #333;
}

.gua-number-highlight {
	color: #c41e3a;
	font-weight: bold;
	font-size: 36rpx;
	margin: 0 8rpx;
}

.gua-title-row {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8rpx;
	margin-bottom: 20rpx;
	font-size: 28rpx;
}

.gua-name {
	color: #333;
	font-weight: 500;
}

.gua-name-highlight {
	color: #c41e3a;
	font-weight: bold;
	font-size: 34rpx;
}

.gua-alias {
	color: #c41e3a;
	font-weight: 500;
}

.gua-rank {
	color: #c41e3a;
	font-weight: 500;
}

.xiang-section,
.jiegua-section {
	margin-bottom: 16rpx;
	font-size: 26rpx;
	line-height: 1.8;
	text-align: justify;
}

.xiang-label,
.jiegua-label {
	color: #666;
	font-weight: 500;
	display: block;
	margin-bottom: 6rpx;
}

.xiang-content,
.jiegua-content {
	color: #333;
}

/* 卦象图示 */
.gua-symbol-box {
	flex-shrink: 0;
	text-align: center;
}

.gua-lines {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	padding: 20rpx 30rpx;
	background: #fafafa;
	border-radius: 8rpx;
	margin-bottom: 12rpx;
}

.gua-line {
	font-size: 32rpx;
	color: #333;
	font-weight: bold;
	letter-spacing: 2rpx;
}

.gua-line.broken {
	color: #666;
}

.gua-number-tag {
	font-size: 24rpx;
	color: #666;
	font-weight: 500;
}

/* 解卦信息 */
.jiegua-section {
	background: #fff;
	padding: 30rpx;
	margin-bottom: 24rpx;
	border: 1rpx solid #ddd;
	border-radius: 8rpx;
	box-shadow: none;
}

.jiegua-content {
	padding-top: 16rpx;
}

.jiegua-item {
	margin-bottom: 24rpx;
	font-size: 26rpx;
	line-height: 1.8;
	text-align: justify;
}

.jiegua-item:last-child {
	margin-bottom: 0;
}

.jiegua-label {
	color: #c41e3a;
	font-weight: bold;
	display: block;
	margin-bottom: 8rpx;
}

.jiegua-text {
	color: #333;
}

/* 重置按钮 */
.reset-btn {
	background: linear-gradient(135deg, #8fbc8f 0%, #6b8e6b 50%, #5a7a5a 100%);
	padding: 24rpx 80rpx;
	border-radius: 8rpx;
	display: block;
	box-shadow: 
		0 4rpx 12rpx rgba(107, 142, 107, 0.3);
	text-align: center;
	margin: 30rpx auto;
	transition: all 0.3s ease;
	border: 1rpx solid rgba(255, 255, 255, 0.2);
	max-width: 300rpx;
}

.reset-btn:active {
	transform: scale(0.98);
	box-shadow: 
		0 2rpx 6rpx rgba(107, 142, 107, 0.3);
}
</style>