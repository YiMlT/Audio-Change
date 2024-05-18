const tabs = {};

console.log("offsrceen已加载");

chrome.runtime.onMessage.addListener((async (message, sender, res) => {
	if (message.target === "offscreen") {
		if (message.name === "setTabVolume") {
			if (tabs[message.tabId] !== undefined) {
				tabs[message.tabId].gainNode.gain.value = message.value * 0.01;
			} else {
				let tabId = message.tabId;
				chrome.runtime.sendMessage({
					name: 'getStreamId',
					target: "background",
					tabId: tabId,
					value: message.value
				});
			}
		} else if (message.name === "createTabVolume") {
			let streamId = message.streamId;
			let tabId = message.tabId;
			let value = parseFloat(message.value);
			await captureTab(streamId, tabId);
			tabs[tabId].gainNode.gain.value = value * 0.01;
		} else if (message.name === "getTabVolume") {
			if (tabs[message.tabId] != undefined) {
				res({
					value: parseInt(tabs[message.tabId].gainNode.gain.value * 100)
				})
			}
		} else if (message.name === "disposeTab") {
			if (tabs[message.tabId] != undefined || tabs[message.tabId] !== null) {
				tab[message.tabId].audioContext.close();
			}
		} else if (message.name === "getDevices") {
			res({
				deviceId: tabs[message.tabId].audioContext.sinkId
			})
		} else if (message.name === "setDevices") {
			tabs[message.tabId].audioContext.setSinkId(message.deviceId);
		}
	}
}));

async function captureTab(streamId, tabId) {
	const t = await navigator.mediaDevices.getUserMedia({
		audio: {
			mandatory: {
				chromeMediaSource: "tab",
				chromeMediaSourceId: streamId
			}
		}
	});
	n = new AudioContext,
		s = n.createMediaStreamSource(t),
		o = n.createGain();
	s.connect(o),
		o.connect(n.destination),
		tabs[tabId] = {
			audioContext: n,
			gainNode: o
		}
}
