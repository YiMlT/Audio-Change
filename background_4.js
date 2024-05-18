(async () => {
	"use strict";
	chrome.runtime.getContexts({}, async (res) => {
		if (res.contextType !== "OFFSCREEN_DOCUMENT") {
			await chrome.offscreen.createDocument({
				url: "offscreen.html",
				reasons: ["USER_MEDIA"],
				justification: "Recording from chrome.tabCapture API and accessing the HTML Canvas"
			})
		}
	});

	let tabs = new Array();

	correlationTab();

	//有新建标签时触发
	chrome.tabs.onCreated.addListener(function() {
		correlationTab();
	});

	//有页面更新时触发
	chrome.tabs.onUpdated.addListener(function() {
		correlationTab();
	});

	chrome.tabs.onRemoved.addListener((e => {
		chrome.runtime.sendMessage({
			name: "disposeTab",
			target: "offscreen",
			tabId: e
		})
	}))

	//获取所有相关tab
	async function correlationTab() {
		let queryOptions = {
			audible: true
		};

		await chrome.tabs.query(queryOptions, async function(tabList) {
			for (let tab of tabList) {
				if ((tabs.some(obj => obj.id == tab.id)) === false) {
					tab.num = 100;
					tabs.push(tab);
				}
			}
		});
	};

	await chrome.runtime.onMessage.addListener(async (message, sender, res) => {
		if (message.target === "background") {
			if (message.name === "setVolume") {
				chrome.runtime.sendMessage({
					name: "setTabVolume",
					target: "offscreen",
					tabId: message.tabId,
					value: message.value
				});
				for (let tab of tabs) {
					if (tab.id == message.tabId) {
						tab.num = message.value;
					}
				}
			} else if (message.name === "getStreamId") {
				await chrome.tabCapture.getMediaStreamId({
					targetTabId: message.tabId,
				}, (streamId) => {
					chrome.runtime.sendMessage({
						name: "createTabVolume",
						target: "offscreen",
						tabId: message.tabId,
						streamId: streamId,
						value: message.value
					});
					for (let tab of tabs) {
						if (tab.id == message.tabId) {
							tab.num = message.value;
						}
					}
				})
			}
		}
	});
})();
