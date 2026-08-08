// content.js - 更新版本
console.log('Content script loaded');

let audioContexts = new Map();

// 监听来自popup或background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("Content script received message:", request);

	// 处理音量调节请求（同步）
	if (request.action === "changeVolume") {
		const tab = audioContexts.get(request.id);
		if (!tab) {
			sendResponse({
				success: false,
				message: '音频流未初始化，请重新启动录制'
			});
			return false;
		}

		tab.gainNode.gain.value = parseInt(request.volume) * 0.01;
		console.log('gainNode', tab.gainNode.gain.value)
		sendResponse({
			success: true,
			message: `调节成功，当前音量为 ${request.volume}`
		});
		return false;
	}

	//返回其他发声标签当前音量
	if (request.action === "changeVolumeOther") {
		const tab = audioContexts.get(request.id);
		if (!tab) {
			sendResponse({
				id: request.id,
				success: false,
				volume: 100
			});
			return false;
		}
		const volume = tab.gainNode.gain.value * 100
		sendResponse({
			id: request.id,
			success: true,
			volume: volume
		});
		return false;
	}

	// 处理音频流捕获请求（异步）
	if (request.action === "relayedMessageStreamId") {
		handleStreamCapture(request)
			.then(result => {
				console.log("异步处理完成:", result);
				// 如果存在requestId，将其包含在响应中
				if (request.requestId) {
					result.requestId = request.requestId;
				}
				sendResponse(result);
			})
			.catch(error => {
				console.log("异步处理失败:", error);
				const errorResponse = {
					success: false,
					error: error.message
				};
				if (request.requestId) {
					errorResponse.requestId = request.requestId;
				}
				sendResponse(errorResponse);
			});

		return true; // 保持消息通道开放
	}

	return false; // 其他消息不保持通道
});

// 专门的异步处理函数
async function handleStreamCapture(request) {
	const {
		id: tabId,
		streamId
	} = request;

	console.log(`开始处理标签 ${tabId} 的音频流...`);

	// 如果已经存在该标签的音频上下文，直接返回
	if (audioContexts.has(tabId)) {
		const existingTab = audioContexts.get(tabId);
		return {
			success: true,
			id: tabId,
			volume: existingTab.gainNode.gain.value * 100,
			message: '使用已存在的音频流'
		};
	}

	try {
		// 创建新的音频上下文
		const tab = await createAudioContext(streamId, tabId);
		audioContexts.set(tabId, tab);

		console.log(`标签 ${tabId} 的音频流创建成功`);

		return {
			success: true,
			id: tabId,
			volume: tab.gainNode.gain.value * 100,
			message: '音频流创建成功'
		};

	} catch (error) {
		console.log(`创建标签 ${tabId} 音频流失败:`, error);
		// 清理可能的残留
		audioContexts.delete(tabId);
		throw error;
	}
}

// 创建音频上下文的独立函数
async function createAudioContext(streamId, tabId) {
	console.log(`为标签 ${tabId} 创建音频上下文...`);

	try {
		// 获取音频流
		const audioStream = await navigator.mediaDevices.getUserMedia({
			audio: {
				mandatory: {
					chromeMediaSource: "tab",
					chromeMediaSourceId: streamId
				}
			}
		});
		console.log(`获取音频流`);

		// 创建音频上下文
		const audioContext = new AudioContext();
		console.log(`创建音频上下文`);

		// 等待音频上下文就绪
		if (audioContext.state === 'suspended') {
			await audioContext.resume();
		}
		console.log(`等待音频上下文就绪`);

		// 创建音频节点
		const audioSource = audioContext.createMediaStreamSource(audioStream);
		const gainNode = audioContext.createGain();
		console.log(`创建音频节点`);

		// 设置默认音量
		gainNode.gain.value = 1.0; // 100% 音量
		console.log(`设置默认音量`);

		// 连接音频节点
		audioSource.connect(gainNode);
		gainNode.connect(audioContext.destination);
		console.log(`连接音频节点`);

		const tab = {
			audioContext,
			gainNode,
			stream: audioStream,
			createdAt: Date.now()
		};

		console.log(`标签 ${tabId} 音频上下文创建完成`);
		return tab;

	} catch (error) {
		console.log(`创建标签 ${tabId} 音频上下文失败:`, error);
		throw error;
	}
}
