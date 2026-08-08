console.log('background.js')

// 创建离屏文档的函数
async function ensureOffscreenDocument() {
	try {
		// 检查是否已存在离屏文档
		const existingContexts = await chrome.runtime.getContexts({});
		const hasOffscreen = existingContexts.some(context =>
			context.contextType === "OFFSCREEN_DOCUMENT"
		);

		if (!hasOffscreen) {
			await chrome.offscreen.createDocument({
				url: "content.html",
				reasons: ["USER_MEDIA"],
				justification: "Recording from chrome.tabCapture API and accessing the HTML Canvas"
			});
			console.log('离屏文档创建成功');
		} else {
			console.log('离屏文档已存在');
		}
	} catch (error) {
		console.log('创建离屏文档失败:', error);
	}
}

// 在扩展启动时创建离屏文档
chrome.runtime.onStartup.addListener(() => {
	console.log('扩展启动');
	ensureOffscreenDocument();
});

chrome.runtime.onInstalled.addListener(() => {
	console.log('扩展安装/更新');
	ensureOffscreenDocument();
});

// 存储待处理的请求
const pendingRequests = new Map();

// 存储已获取的streamId
const streamIdCache = new Map();

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("Background received message:", request);

	if (request.action === "relayToContent") {
		// 立即返回 true 保持通道开放
		handleRelayToContent(request, sendResponse);
		return true;
	}

	// 对于其他消息类型，不返回true，消息通道将自动关闭
});

// 专门处理 relayToContent 请求
async function handleRelayToContent(request, sendResponse) {
	try {
		// 确保离屏文档存在
		await ensureOffscreenDocument();

		let streamId = '';
		if (streamIdCache.get(request.id) == undefined) {
			console.log('开始捕获')
			streamId = await startTabCapture(request.id);
		} else {
			streamId = streamIdCache.get(request.id);
			console.log('捕获过了')
			sendResponse({
				action: 'changeVolume'
			});
			return true;
		}
		console.log('streamId', streamId);

		// 创建唯一的请求ID
		const requestId = `${request.id}_${Date.now()}`;

		// 存储发送响应函数
		pendingRequests.set(requestId, sendResponse);

		// 发送消息到content script
		chrome.runtime.sendMessage({
			action: "relayedMessageStreamId",
			id: request.id,
			streamId: streamId,
			source: "background",
			requestId: requestId // 添加请求ID用于关联响应
		}, (response) => {
			console.log('contentReturn', response);

			// 从存储中获取对应的sendResponse
			const storedSendResponse = pendingRequests.get(requestId);
			if (storedSendResponse) {
				storedSendResponse(response);
				pendingRequests.delete(requestId);
			}
		});

	} catch (error) {
		console.log('Error in handleRelayToContent:', error);
		sendResponse({
			success: false,
			error: error.message
		});
	}
}

// 改进的捕获函数
async function startTabCapture(tabId) {
	return new Promise((resolve, reject) => {
		// 首先获取媒体流ID
		chrome.tabCapture.getMediaStreamId({
			targetTabId: tabId
		}, (streamId) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
				return;
			}
			streamIdCache.set(tabId, streamId);
			resolve(streamId);
		});
	});
}
