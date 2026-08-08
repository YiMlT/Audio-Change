<template>
	<div class="plugInMain">
		<el-container>
			<el-header class="main_header" :style="{height: height_header + 'px'}">
				<el-scrollbar max-height="364px">
					<el-card class="volumeChange_main" shadow="never" :body-style="{ padding: '0' }">
						<el-container>
							<el-header class="main_el_main">
								<el-row style="height: 35px;" :gutter="5">
									<el-col :span="3">
										<el-avatar v-loading="currentTab.status !== 'complete'"
											element-loading-background="rgb(186 229 169 / 50%)"
											element-loading-custom-class="avatar-loading" class="main_icon"
											shape="square" :size="31" :src="currentTab.favIconUrl" />
									</el-col>
									<el-col :span="21">
										<div class="main_title scroll-text-container"
											:class="{ 'scrollable': isTextOverflow(currentTab.title) }">
											<span class="scroll-text"
												:data-text="currentTab.title">{{ currentTab.title }}</span>
										</div>
									</el-col>
								</el-row>
							</el-header>
							<el-main class="main_change">
								<el-row style="height: 24px;">
									<el-col :span="1"></el-col>
									<el-col :span="21" style="padding-right: 18px;">
										<el-slider style="height: 24px" v-model="currentTab.value" :show-tooltip="false"
											class="compact-slider"
											@input="tabValueChange(currentTab, currentTab.id, currentTab.value)"
											:step="1" :min='0' :max="200" :marks="marks" />
									</el-col>
									<el-col :span="2">
										<div class="change_num">{{ currentTab.value }}</div>
									</el-col>
								</el-row>
							</el-main>
							<el-footer class="main_button">
								<el-row style="height: 29px;" :gutter="5">
									<el-col :span="8" class="button_style">
										<el-button :type="currentTab.value == 0 ? 'warning': 'info'" plain
											style="height: 100%;width: 100%;border-radius: 8px;" size="small" round
											@click="muteVolume(currentTab)">
											{{currentTab.mutedText}}
										</el-button>
									</el-col>
									<el-col :span="8" class="button_style">
										<el-button type="info" plain
											style="height: 100%;width: 100%;border-radius: 8px;" size="small" round
											@click="resetVolume(currentTab)">
											重置音量
										</el-button>
									</el-col>
									<el-col :span="8" class="button_style">
										<el-button type="info" plain
											style="height: 100%;width: 100%;border-radius: 8px;" size="small" round>
											更改设备
										</el-button>
									</el-col>
								</el-row>
							</el-footer>
						</el-container>
					</el-card>
					<el-card v-show="audioTab.length > 0" class="volumeChange_other" v-for="item of audioTab"
						:key="item.id" :body-style="{ padding: '0' }" shadow="hover" :class="getCardClass(item)">
						<el-container>
							<el-header class="main_el_main">
								<el-row class="volumeChange_other_header" style="height: 35px;"
									@click="toggleStateWithAnimation(item)">
									<el-col :span="3">
										<el-avatar v-loading="item.status !== 'complete'"
											element-loading-background="rgb(186 229 169 / 50%)"
											element-loading-custom-class="avatar-loading" class="main_icon"
											shape="square" :size="31" :src="item.favIconUrl" />
									</el-col>
									<el-col :span="19" style="padding-left: 3.5px;">
										<div class="main_title scroll-text-container"
											:class="{ 'scrollable': isTextOverflow(item.title) }">
											<span class="scroll-text" :data-text="item.title">{{ item.title }}</span>
										</div>
									</el-col>
									<el-col :span="2">
										<el-button class="rotate-btn" type="plain" link>
											<el-icon :class="{ 'rotate-180': item.isExpanded }">
												<ArrowUp />
											</el-icon>
										</el-button>
									</el-col>
								</el-row>
							</el-header>
							<div class="card-content" :class="{ 'collapsed': item.isExpanded }">
								<el-main class="main_change">
									<el-row style="height: 24px;">
										<el-col :span="1"></el-col>
										<el-col :span="21" style="padding-right: 18px;">
											<el-slider style="height: 24px;" v-model="item.value" :show-tooltip="false"
												class="compact-slider"
												@input="tabValueChange(item, item.id, item.value)" :step="1" :min='0'
												:max="200" :marks="marks" />
										</el-col>
										<el-col :span="2">
											<div class="change_num">{{ item.value }}</div>
										</el-col>
									</el-row>
								</el-main>
								<el-footer class="main_button">
									<el-row style="height: 29px;" :gutter="5">
										<el-col :span="8" class="button_style">
											<el-button :type="item.value == 0 ? 'warning': 'info'" plain
												style="height: 100%;width: 100%;border-radius: 8px;" size="small" round
												@click="muteVolume(item)">
												{{item.mutedText}}
											</el-button>
										</el-col>
										<el-col :span="8" class="button_style">
											<el-button type="info" plain
												style="height: 100%;width: 100%;border-radius: 8px;" size="small" round
												@click="resetVolume(item)">
												重置音量
											</el-button>
										</el-col>
										<el-col :span="8" class="button_style">
											<el-button type="info" plain
												style="height: 100%;width: 100%;border-radius: 8px;" size="small" round>
												更改设备
											</el-button>
										</el-col>
									</el-row>
								</el-footer>
							</div>
						</el-container>
					</el-card>
				</el-scrollbar>
			</el-header>
			<el-divider class="divider_sty">标签列表</el-divider>
			<el-main style="padding: 0;max-height: 310.2px;min-height: 62.2px;" :style="{height: height_tabs + 'px'}">
				<el-scrollbar :max-height="height_tabs + 'px'">
					<div class="button-container">
						<el-card v-for="(window, index) of tabsInfo" :key="index" class="windows_group"
							:body-style="{ padding: '0' }" shadow="never">
							<el-button class="tab-button"
								style="padding: 0;border: 0;margin: 0;width: 280px;height: 100%;border-radius: 8px;"
								v-for="item of window.tabs" :key="item.id" type="plain"
								@click="focusedTab(item.id, item.windowId)"
								:color="item.id == currentTab.id ? '#bae5a9' : '#f5f5f5'">
								<el-card class="card_tab" :body-style="{ padding: '0' }" shadow="hover">
									<el-row style="height: 35px;">
										<el-col :span="3">
											<el-avatar v-loading="item.status !== 'complete'"
												element-loading-background="rgb(245 245 245 / 50%)"
												element-loading-custom-class="avatar-loading" class="main_icon"
												shape="square" :size="31" :src="item.favIconUrl" />
										</el-col>
										<el-col :span="19" style="padding-left: 3.5px;">
											<div class="tab_title scroll-text-container"
												:class="{ 'scrollable': isTextOverflow(item.title) }">
												<span class="scroll-text"
													:data-text="item.title">{{ item.title }}</span>
											</div>
										</el-col>
										<el-col :span="2">
											<el-button class="rotate-btn close-btn" type="plain"
												@click="closeTab(item.id)" link>
												<el-icon>
													<Close />
												</el-icon>
											</el-button>
										</el-col>
									</el-row>
								</el-card>
							</el-button>
						</el-card>
					</div>
				</el-scrollbar>
			</el-main>
		</el-container>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		ArrowUp,
		Close
	} from '@element-plus/icons-vue'

	// 确保所有数值都是数字类型
	const currentTab = ref({
		id: 1,
		favIconUrl: '',
		title: '这是一条测试标题0000000000000000000000000000000000000000000000',
		value: 100,
	})

	const audioTab = ref([{
		id: 2,
		favIconUrl: '',
		title: '这是第二条测试标题000000000000000000000000000000000000000000000000',
		value: 88,
		isExpanded: true
	}, {
		id: 3,
		favIconUrl: '',
		title: '这是第三条测试标题',
		value: 78,
		isExpanded: true
	}, {
		id: 4,
		favIconUrl: '',
		title: '这是第四条测试标题',
		value: 28,
		isExpanded: true
	}, {
		id: 5,
		favIconUrl: '',
		title: '这是第五条测试标题',
		value: 53,
		isExpanded: true
	}])

	const tabsInfo = ref([{
		id: 1,
		title: '测试标签',
		favIconUrl: '',
		windowId: ''
	}, {
		id: 2,
		title: '测试标签2',
		favIconUrl: '',
		windowId: ''
	}])

	const marks = reactive({
		0: '',
		100: '',
		200: ''
	})

	const height_header = ref(116)

	const height_tabs = ref(310.2)

	const default_icon_url = detectBrowser()

	//监听更新
	chrome.tabs.onUpdated.addListener(() => {
		queryTabs()
	})

	//监听关闭
	chrome.tabs.onRemoved.addListener(() => {
		queryTabs()
	})

	//判断浏览器类型设置默认图标
	function detectBrowser() {
		if (window.chrome) {
			// 进一步区分 Chromium 系浏览器可结合 userAgent
			const ua = navigator.userAgent;
			if (ua.includes('Edg/')) return './assets/Microsoft_Edge_logo_(2019).svg';
			return './assets/Google_Chrome_icon_(February_2022).svg'; // 通常为 Chrome 或其他基于 Chromium 的浏览器
		} else {
			return '';
		}
	}

	//计算header高度
	function calcuHeight() {
		const head = audioTab.value.length >= 2 ? 2 : audioTab.value.length
		console.log('发声tab数量', audioTab.value.length, audioTab.value)
		height_header.value = 116 + head * 59
		height_tabs.value = 310.2 - head * 59
	}

	// 静音功能 - 修改为接收tab参数
	const muteVolume = (tab) => {
		if (tab && typeof tab.value !== 'undefined') {
			tab.mutedInfo.muted = !tab.mutedInfo.muted
			tab.mutedText = tab.mutedInfo.muted ? '静音中' :
				'静    音'
			if (tab.mutedInfo.muted) {
				tabValueChange(tab, tab.id, 0, false);
				tab.value = 0
			} else {
				tabValueChange(tab, tab.id, tab.originalVolume, false);
				tab.value = tab.originalVolume
			}
			console.log(tab)
		}
	}

	// 重置音量功能 - 修改为接收tab参数
	const resetVolume = (tab) => {
		if (tab && typeof tab.value !== 'undefined') {
			tab.value = 100;
			tabValueChange(tab, tab.id, 100);
		}
	}

	//获取所有tab
	function queryTabs() {
		return new Promise((resolve, reject) => {
			chrome.windows.getAll({
				populate: true
			}, (windows) => {
				console.log('windows queryTabs', windows);
				tabsInfo.value = [];
				for (let window of windows) {
					if (window.tabs.length == 0) {
						continue;
					}
					let arr = {};
					arr.id = window.id;
					arr.tabs = [];
					for (let tab of window.tabs) {
						if (typeof tab.value === 'undefined') {
							tab.value = 100;
						} else {
							tab.value = Number(tab.value) || 100;
						}
						tab.favIconUrl = (tab.favIconUrl + '').startsWith('http') ? tab
							.favIconUrl : default_icon_url;
						arr.tabs.push(tab);
					}
					if (window.focused == true) {
						tabsInfo.value.unshift(arr);
						console.log('置顶', arr);
					} else {
						tabsInfo.value.push(arr);
					}
				}
				console.log('排序好的tabs', tabsInfo.value);
			});
		});
	}

	//获取当前tab
	async function getCurrentTab() {
		let queryOptions = {
			active: true,
			lastFocusedWindow: true
		};
		return new Promise((resolve, reject) => {
			chrome.tabs.query(queryOptions, (tabs) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					console.log('当前tab', tabs);
					resolve(tabs);
					currentTab.value = tabs[0];
					currentTab.value.mutedText = currentTab.value.mutedInfo.muted ? '静音中' : '静    音'
					// 确保value是数字
					currentTab.value.value = 100;

					if (currentTab.value.id) {
						//先尝试与content通信
						chrome.runtime.sendMessage({
							action: 'changeVolumeOther',
							id: currentTab.value.id
						}, function(response) {
							if (response.success) {
								currentTab.value.value = Math.round(response
									.volume)
								console.log('content中存在记录', currentTab.value.title + '当前音量：' +
									currentTab.value.value)
							} else {
								// 发送消息到background，让它与content script通信
								chrome.runtime.sendMessage({
									action: "relayToContent",
									id: currentTab.value.id
								}, function(response) {
									console.log('收到响应:', response);
									if (response.action == 'changeVolume') {
										chrome.runtime.sendMessage({
											action: 'changeVolumeOther',
											id: currentTab.value.id
										}, function(response) {
											if (response.success) {
												currentTab.value.value = Math
													.round(response
														.volume)
												console.log(currentTab.value
													.title + '当前音量：' +
													currentTab.value.value)
											} else {
												console.log('请前往该标签激活扩展')
											}
											currentTab.value.originalVolume =
												currentTab.value
												.value
										});
									} else {
										if (response && typeof response.volume !==
											'undefined') {
											// 确保响应中的volume是数字
											currentTab.value.value = Math.round(
												response.volume)
										} else {
											currentTab.value.value = 100;
										}
										currentTab.value.originalVolume = currentTab
											.value.value

										// 处理错误情况
										if (response && response.error) {
											console.log('捕获流失败:', response.error);
											// 可以在这里显示错误提示给用户
										}
									}
								});
							}
							currentTab.value.originalVolume = currentTab.value
								.value
						});
					}
					currentTab.value.favIconUrl = (currentTab.value.favIconUrl + '').startsWith(
							'http') ? currentTab.value
						.favIconUrl : default_icon_url;
					console.log('默认图标', default_icon_url)
				}
			})
		})
	}

	//关闭选择页面
	async function closeTab(id) {
		return new Promise((resolve, reject) => {
			const index = tabsInfo.value.findIndex(item => item.id === id);
			if (index !== -1) {
				tabsInfo.value.splice(index, 1);
			}
			chrome.tabs.remove(id)
		})
	}

	//聚焦窗口
	async function focusedTab(id, windowId) {
		try {
			const tabId = id;

			// 先激活标签页
			const updatedTab = await chrome.tabs.update(tabId, {
				active: true
			});

			// 然后聚焦窗口
			await chrome.windows.update(updatedTab.windowId, {
				focused: true
			});

			console.log(`已激活标签页 ${tabId} 并聚焦窗口 ${updatedTab.windowId}`);
		} catch (error) {
			console.log('激活标签页失败:', error);
		}
	}

	//获取正在发声的tab
	async function audioTabs() {
		return new Promise((resolve, reject) => {
			chrome.tabs.query({
				audible: true
			}, (tabs) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					console.log('发声tab', tabs);
					resolve(tabs);
					audioTab.value = [];
					for (let item of tabs) {
						if (item.id != currentTab.value.id) {
							// 确保每个音频tab都有正确的value和isExpanded属性
							item.isExpanded = true;
							item.value = parseInt(item.value) || 100;
							item.mutedText = item.mutedInfo.muted ? '静音中' : '静    音'
							audioTab.value.push(item);
							chrome.runtime.sendMessage({
								action: 'changeVolumeOther',
								id: item.id
							}, function(response) {
								if (response.success) {
									item.value = Math.round(response.volume)
									console.log(item.title + '当前音量：' + item.value)
								} else {
									console.log('请前往该标签激活扩展')
								}
								item.originalVolume = item.value
							});

							item.favIconUrl = (item.favIconUrl + '').startsWith('http') ? item
								.favIconUrl : default_icon_url;
						}
					}
					//最后计算高度
					calcuHeight();
				}
			});
		});
	}

	//更改当前页面音量
	async function tabValueChange(tab, id, value, flag = true) {
		// 确保value是数字
		const numValue = Number(value) || 0;
		if (flag) {
			tab.originalVolume = tab.value
			tab.mutedText = tab.value > 0 ? '静    音' : '静音中'
		}

		chrome.runtime.sendMessage({
			action: 'changeVolume',
			id: id,
			volume: numValue
		}, function(response) {
			if (response) {
				console.log(response.message);
			}
		});
	}

	// 检测文本是否溢出
	function isTextOverflow(text) {
		// 简单判断：如果文本长度超过一定字符数，认为会溢出
		// 实际项目中可以使用更精确的检测方法
		return text && text.length > 16;
	}

	// 获取卡片类名
	function getCardClass(item) {
		if (item.animating) {
			return item.isExpanded ? 'collapsing' : 'expanding'
		}
		return item.isExpanded ? 'collapsed' : 'expanded'
	}

	// 带动画的切换状态
	function toggleStateWithAnimation(item) {
		if (item.animating) return; // 如果正在动画中，不响应点击

		// 设置动画状态
		item.animating = true;

		// 计算高度变化
		if (item.isExpanded) {
			height_header.value += 65
			height_tabs.value -= 65
		} else {
			height_header.value -= 65
			height_tabs.value += 65
		}

		// 切换展开状态
		item.isExpanded = !item.isExpanded

		// 动画结束后清除动画状态
		setTimeout(() => {
			item.animating = false;
		}, 600); // 与CSS动画时间保持一致
	}

	function init() {
		getCurrentTab();
		queryTabs();
		audioTabs();
	}

	init();
</script>

<style>
	/* 保持原有的样式不变 */
	.plugInMain {
		width: 300px;
		height: 450px;
	}

	:deep(.el-card__body) {
		padding: 0 !important;
	}

	.main_header {
		padding: 0;
		max-height: 364px;
	}

	.volumeChange_main {
		background-color: #bae5a9;
		height: 100px;
		border: 0;
		padding: 8px;
		border-radius: 8px;
	}

	/* 卡片基础样式 */
	.volumeChange_other {
		background-color: #bae5a9;
		border: 0;
		padding: 8px;
		border-radius: 8px;
		margin: 8px 0 0 0;
		overflow: hidden;
		position: relative;
	}

	.developers_color {
		background-color: #bae5a9;
	}

	/* 展开状态 - 最终状态 */
	.volumeChange_other.expanded {
		height: 100px;
	}

	/* 收缩状态 - 最终状态 */
	.volumeChange_other.collapsed {
		height: 35px;
	}

	/* 展开动画 */
	.volumeChange_other.expanding {
		animation: expandCard 0.6s cubic-bezier(0.34, 1.5, 0.64, 0.98) forwards;
	}

	/* 收缩动画 */
	.volumeChange_other.collapsing {
		animation: collapseCard 0.6s cubic-bezier(0.34, 1.5, 0.64, 0.98) forwards;
	}

	/* 内容区域 */
	.card-content {
		transition: all 0.3s ease;
		opacity: 1;
		transform: translateY(0);
	}

	.card-content.collapsed {
		opacity: 0;
		transform: translateY(-10px);
		pointer-events: none;
	}

	/* 展开动画关键帧 */
	@keyframes expandCard {
		0% {
			height: 35px;
		}

		20% {
			height: 110px;
			/* 轻微过冲 */
		}

		40% {
			height: 95px;
			/* 回弹 */
		}

		60% {
			height: 103px;
			/* 轻微过冲 */
		}

		80% {
			height: 98px;
			/* 回弹 */
		}

		100% {
			height: 100px;
			/* 最终稳定 */
		}
	}

	/* 收缩动画关键帧 */
	@keyframes collapseCard {
		0% {
			height: 100px;
		}

		20% {
			height: 98px;
			/* 轻微回弹 */
		}

		40% {
			height: 103px;
			/* 轻微过冲 */
		}

		60% {
			height: 95px;
			/* 回弹 */
		}

		80% {
			height: 110px;
			/* 轻微过冲 */
		}

		100% {
			height: 35px;
			/* 最终收缩 */
		}
	}

	/* 防止滚动条出现 */
	:deep(.el-slider) {
		overflow: visible !important;
		transform: translateZ(0);
	}

	:deep(.el-slider__runway) {
		overflow: visible !important;
	}

	:deep(.el-slider__bar) {
		overflow: visible !important;
	}

	:deep(.el-slider__button) {
		transform: translateZ(0);
	}

	.main_el_main {
		padding: 0;
		height: 35px;
	}

	/* 文本滚动效果 */
	.scroll-text-container {
		position: relative;
		overflow: hidden;
		white-space: nowrap;
	}

	.scroll-text {
		display: inline-block;
		transition: transform 0.3s ease;
	}

	/* 可滚动的文本容器 */
	.scroll-text-container.scrollable:hover .scroll-text {
		animation: textScroll 8s linear infinite;
	}

	/* 文本滚动动画 */
	@keyframes textScroll {
		0% {
			transform: translateX(0);
		}

		10% {
			transform: translateX(0);
		}

		90% {
			/* 计算滚动距离：文本宽度 - 容器宽度 */
			transform: translateX(calc(-100% + var(--container-width, 200px)));
		}

		100% {
			transform: translateX(calc(-100% + var(--container-width, 200px)));
		}
	}

	/* 原有的标题样式 - 修改以支持滚动 */
	.main_title {
		height: 35px;
		display: flex;
		align-items: center;
		font-size: 15px;
		color: #18191c;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/* 为滚动容器设置最大宽度 */
		/* max-width: 200px; */
	}

	.tab_title {
		height: 35px;
		display: flex;
		align-items: center;
		font-size: 13px;
		color: #18191c;
		font-weight: bolder;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/* 为滚动容器设置最大宽度 */
		/* max-width: 180px; */
	}

	.main_icon {
		position: relative;
		top: 2px;
		border-radius: 8px;
		background-color: transparent;
	}

	.rotate-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10.5px 0px 10.5px 9.66px !important;
		border: 0;
		margin: 0;
	}

	.main_change {
		padding: 6px 0;
		height: 36px;
	}

	.change_num {
		font-size: 15px;
		color: #18191c;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	/* 紧凑型滑块 */
	.compact-slider {
		height: 20px;
	}

	:deep(.compact-slider .el-slider__runway) {
		height: 3px;
		margin: 8px 0;
	}

	:deep(.compact-slider .el-slider__bar) {
		height: 3px;
	}

	:deep(.compact-slider .el-slider__button) {
		width: 10px;
		height: 10px;
	}

	.el-slider__button-wrapper {
		background-color: transparent;
		height: 20px;
		line-height: normal;
		outline: none;
		position: absolute;
		text-align: center;
		top: -7px;
		transform: translateX(-50%);
		-webkit-user-select: none;
		user-select: none;
		width: 20px;
		z-index: 1;
	}

	.main_button {
		height: 29px;
		padding: 0;
	}

	.button_style {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.divider_sty {
		margin: 11px 0;
	}

	.other_button {
		padding: 0;
		border: 0;
		margin: 0;
		width: 100%;
	}

	.card_tab {
		width: 264px;
		height: 35px;
		padding: 8px;
		border-radius: 8px;
		border: 0;
		background-color: transparent;
	}

	.button-container {
		display: flex;
		flex-direction: column;
	}

	/* 为相邻的按钮之间添加间距，但首尾不受影响 */
	.tab-button+.tab-button {
		margin-top: 8px !important;
	}

	.rotate-180 {
		transform: rotate(180deg);
	}

	.el-icon {
		transition: transform 0.3s ease;
		/* 添加过渡效果使旋转更平滑[citation:1] */
	}

	/* 头像加载样式优化 */
	:deep(.el-avatar) {
		position: relative;
	}

	.avatar-loading {
		position: absolute !important;
		top: 0 !important;
		left: 0 !important;
		width: 100% !important;
		height: 100% !important;
		border-radius: 8px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		z-index: 10 !important;
	}

	.avatar-loading .el-loading-spinner {
		position: static !important;
		margin-top: 0 !important;
		transform: none !important;
	}

	.avatar-loading .el-loading-spinner .circular {
		width: 35px !important;
		height: 35px !important;
	}

	.avatar-loading .el-loading-spinner .path {
		stroke: #409eff !important;
		stroke-width: 3 !important;
	}

	/* 确保加载图标在头像中心 */
	.avatar-loading .el-loading-spinner {
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		width: 35px !important;
		height: 35px !important;
	}

	.windows_group {
		padding: 8px;
		border-radius: 8px;
		margin-bottom: 8px;
	}

	/* 最后一个窗口组去掉底部边距 */
	.windows_group:last-child {
		margin-bottom: 0 !important;
	}

	/* 窗口组边框颜色 - 循环使用6种颜色 */
	.windows_group:nth-child(6n+1) {
		border: 2px solid #bae5a9 !important;
	}

	.windows_group:nth-child(6n+2) {
		border: 2px solid #8ab4f8 !important;
	}

	.windows_group:nth-child(6n+3) {
		border: 2px solid #f28b82 !important;
	}

	.windows_group:nth-child(6n+4) {
		border: 2px solid #fdd663 !important;
	}

	.windows_group:nth-child(6n+5) {
		border: 2px solid #81c995 !important;
	}

	.windows_group:nth-child(6n+6) {
		border: 2px solid #ff8bcb !important;
	}

	.windows_group:nth-child(6n+7) {
		border: 2px solid #c58af9 !important;
	}

	.windows_group:nth-child(6n+8) {
		border: 2px solid #78d9ec !important;
	}

	.windows_group:nth-child(6n+9) {
		border: 2px solid #fcad70 !important;
	}

	/* Close 图标悬停旋转效果 */
	.rotate-btn.close-btn:hover .el-icon {
		animation: rotateClose 0.6s ease-in-out;
	}

	/* 旋转动画关键帧 */
	@keyframes rotateClose {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
