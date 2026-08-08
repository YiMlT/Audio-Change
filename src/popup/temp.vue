<template>
	<div class="plugInMain">
		<el-container>
			<el-header class="el_header">
				<el-card class="volumeChange_main" shadow="never" :body-style="{ padding: '0' }">
					<el-container>
						<el-header class="main_el_main">
							<el-row style="height: 35px;">
								<el-col :span="3">
									<el-avatar class="main_icon" shape="square" :size="31" :src="circleUrl" />
								</el-col>
								<el-col :span="21">
									<div class="main_title">{{ test.title }}</div>
								</el-col>
							</el-row>
						</el-header>
						<el-main class="main_change">
							<el-row style="height: 24px;">
								<el-col :span="1"></el-col>
								<el-col :span="19">
									<el-slider id="slider1" style="height: 24px;" v-model="sliderValue"
										:show-tooltip="false" class="compact-slider" max="200" :marks="marks" />
								</el-col>
								<el-col :span="4">
									<div class="change_num">{{ test.value }}</div>
								</el-col>
							</el-row>
						</el-main>
						<el-footer class="main_button">
							<el-row style="height: 29px;" :gutter="5">
								<el-col :span="8" class="button_style">
									<el-button type="info" plain style="height: 100%;width: 100%;border-radius: 8px;"
										size="small" round>
										静&nbsp;&nbsp;&nbsp;&nbsp;音
									</el-button>
								</el-col>
								<el-col :span="8" class="button_style">
									<el-button type="info" plain style="height: 100%;width: 100%;border-radius: 8px;"
										size="small" round>
										重置音量
									</el-button>
								</el-col>
								<el-col :span="8" class="button_style">
									<el-button type="info" plain style="height: 100%;width: 100%;border-radius: 8px;"
										size="small" round>
										更改设备
									</el-button>
								</el-col>
							</el-row>
						</el-footer>
					</el-container>
				</el-card>
			</el-header>
			<el-divider class="divider_sty">标签列表</el-divider>
			<el-main>Main</el-main>
		</el-container>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed
	} from 'vue'

	const test = ref({
		id: 1,
		icon: '',
		title: '这是一条测试标题',
		value: 100,
	})

	// 使用计算属性确保值始终是数字
	const sliderValue = computed({
		get: () => Number(test.value.value) || 0,
		set: (newValue) => {
			test.value.value = Number(newValue) || 0;
		}
	})

	const marks = reactive({
		0: '',
		100: '',
		200: ''
	})

	const handleWheel = (event, step = 1, min = 0, max = 200) => {
		event.preventDefault();
		const delta = Math.sign(event.deltaY) * -1;

		let newValue = sliderValue.value + delta * step;

		if (newValue < min) newValue = min;
		if (newValue > max) newValue = max;

		sliderValue.value = newValue;
	};

	const addWheelListener = (sliderId, step = 1, min = 0, max = 200) => {
		const sliderElement = document.getElementById(sliderId);
		if (sliderElement) {
			const runway = sliderElement.querySelector('.el-slider__runway');
			if (runway) {
				runway.addEventListener('wheel', (event) => handleWheel(event, step, min, max), {
					passive: false
				});
			}
		}
	};

	onMounted(() => {
		addWheelListener('slider1', 1, 0, 200);
	});
</script>

<style>
	.plugInMain {
		width: 300px;
		height: 450px;
	}

	:deep(.el-card__body) {
		padding: 0 !important;
	}

	.el_header {
		padding: 0;
		height: 116px;
	}

	.volumeChange_main {
		background-color: #bae5a9;
		height: 100px;
		border: 0;
		padding: 8px;
		border-radius: 8px;
	}

	.main_el_main {
		padding: 0;
		height: 35px;
	}

	.main_title {
		height: 35px;
		display: flex;
		align-items: center;
		font-size: 15px;
		color: #18191c;
		font-weight: bold;
	}

	.main_icon {
		position: relative;
		left: 2px;
		top: 2px;
		border-radius: 8px;
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
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
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

	.main_button {
		height: 29px;
		padding: 0;
	}

	.button_style {
		display: flex;
		align-items: center;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
	}

	.divider_sty {
		margin: 11px 0;
	}
</style>
