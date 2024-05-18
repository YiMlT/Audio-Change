window.onload = function() {
	init();
}

let queryOptions = {
	// audible: true
};

let sliderTab = '';
let sliderTab_info = '';

let marquee_flag = '';


async function init() {
	let queryOptions_1 = {
		active: true,
		lastFocusedWindow: true
	};
	await chrome.tabs.query(queryOptions_1, async function(tabs) {
		document.querySelectorAll(".img_head")[0].src = tabs[0].favIconUrl;
		document.querySelectorAll(".head_title")[0].innerHTML = tabs[0].title;

		await chrome.runtime.sendMessage({
			name: 'getTabVolume',
			target: "offscreen",
			tabId: tabs[0].id,
		}, (res) => {
			let slider_value = document.querySelectorAll(".ribbon_slider_value")[0];
			let ribbon_slider = document.querySelectorAll(".ribbon_slider")[0];
			if (res !== undefined) {
				slider_value.innerHTML = res.value;
				ribbon_slider.value = res.value;
				chrome.runtime.sendMessage({
					name: 'setVolume',
					target: "background",
					tabId: tabs[0].id,
					value: res.value
				})
			} else {
				chrome.runtime.sendMessage({
					name: 'setVolume',
					target: "background",
					tabId: tabs[0].id,
					value: 100
				})
			}
		})


		sliderTab = tabs[0].id;
		sliderTab_info = tabs[0];

	})

	await setMicAccess("*://" + chrome.runtime.id + "/*", "allow", sliderTab_info);
	const deviceList = await navigator.mediaDevices.enumerateDevices();

	let ul_list_1 = document.querySelectorAll(".ul_list_1")[0];
	await chrome.tabs.query({
		audible: true
	}, async function(tabs) {
		for (tab of tabs) {
			if (tab.id != sliderTab) {
				let li_list_1 = document.createElement("li");
				li_list_1.className = "li_list_1";
				li_list_1.id = tab.id;
				li_list_1.setAttribute("data-id", tab.id);
				ul_list_1.appendChild(li_list_1);

				let tab_button_1 = document.createElement("div");
				tab_button_1.className = "tab_button_1";
				li_list_1.appendChild(tab_button_1);

				let button_1 = document.createElement("a");
				button_1.className = "button_1";
				button_1.href = "#";
				tab_button_1.appendChild(button_1);

				let img_button_1 = document.createElement("div");
				img_button_1.className = "img_button_1";
				button_1.appendChild(img_button_1);

				let img_1 = document.createElement("img");
				img_1.src = tab.favIconUrl;
				img_1.height = "25";
				img_1.width = "25";
				img_button_1.appendChild(img_1);

				let title_button_1 = document.createElement("div");
				title_button_1.className = "title_button_1";
				title_button_1.innerHTML = tab.title;
				button_1.appendChild(title_button_1);

				let function_button_1 = document.createElement("div");
				function_button_1.className = "function_button_1";
				function_button_1.setAttribute("data-flag", "true");
				button_1.appendChild(function_button_1);

				let close_tab_a_1 = document.createElement("a");
				close_tab_a_1.href = "#";
				close_tab_a_1.className = "close_tab_a_1";
				function_button_1.appendChild(close_tab_a_1);

				let close_tab_div_1 = document.createElement("div");
				close_tab_div_1.className = "close_tab_div_1";
				close_tab_div_1.innerHTML = "﹀";
				close_tab_a_1.appendChild(close_tab_div_1);

				let box_1 = document.createElement("div");
				box_1.className = "box_1";
				box_1.style.backgroundColor = "#f5f5f5";
				tab_button_1.appendChild(box_1);

				let head_1 = document.createElement("head");
				head_1.className = "head_box";
				box_1.appendChild(head_1);

				let head_img_1 = document.createElement("div");
				head_img_1.className = "head_img";
				head_1.appendChild(head_img_1);

				let img_head_1 = document.createElement("img");
				img_head_1.className = "img_head";
				img_head_1.src = tab.favIconUrl;
				img_head_1.height = "35px";
				img_head_1.width = "35px";
				head_img_1.appendChild(img_head_1);

				let head_title_1 = document.createElement("div");
				head_title_1.className = "head_title";
				head_title_1.innerHTML = tab.title;
				head_1.appendChild(head_title_1);

				let head_button_a = document.createElement("a");
				head_button_a.className = "head_button_a";
				head_button_a.href = "#";
				head_1.appendChild(head_button_a);

				let head_button_div = document.createElement("div");
				head_button_div.className = "head_button_div";
				head_button_div.innerHTML = "︿";
				head_button_a.appendChild(head_button_div);

				let ribbon_1 = document.createElement("div");
				ribbon_1.className = "ribbon";
				box_1.appendChild(ribbon_1);

				let slider_1 = document.createElement("div");
				slider_1.className = "slider";
				ribbon_1.appendChild(slider_1);

				let ribbon_slider_1 = document.createElement("input");
				ribbon_slider_1.className = "ribbon_slider";
				ribbon_slider_1.type = "range";
				ribbon_slider_1.min = "0";
				ribbon_slider_1.max = "200";
				ribbon_slider_1.value = "100";
				slider_1.appendChild(ribbon_slider_1);

				let ribbon_slider_value_1 = document.createElement("div");
				ribbon_slider_value_1.className = "ribbon_slider_value";
				ribbon_slider_value_1.innerHTML = "100";
				ribbon_1.appendChild(ribbon_slider_value_1);

				let ribbon_buttons_1 = document.createElement("div");
				ribbon_buttons_1.className = "ribbon_buttons";
				box_1.appendChild(ribbon_buttons_1);

				let volume_0 = document.createElement("a");
				volume_0.className = "button_ribbon";
				volume_0.href = "#";
				volume_0.style.margin = "0 2.5px 0 0";
				volume_0.innerHTML = "静音";
				ribbon_buttons_1.appendChild(volume_0);

				let volume_1 = document.createElement("a");
				volume_1.className = "button_ribbon";
				volume_1.href = "#";
				volume_1.style.margin = "0 2.5px 0 2.5px";
				volume_1.innerHTML = "重置音量";
				ribbon_buttons_1.appendChild(volume_1);

				let volume_2 = document.createElement("a");
				volume_2.className = "button_ribbon";
				volume_2.href = "#";
				volume_2.style.margin = "0 0 0 2.5px";
				volume_2.innerHTML = "切换输出";
				ribbon_buttons_1.appendChild(volume_2);

				let audioDevice = document.createElement("div")
				audioDevice.className = "audioDevice";
				audioDevice.style.display = "none";
				box_1.appendChild(audioDevice);

				let form_1 = document.createElement("form");
				form_1.className = "form_1";
				form_1.method = "POST";
				audioDevice.appendChild(form_1);

				let audioList = new Array();

				for (let i = 0, j = 0; i < deviceList.length; i++) {
					if ((deviceList[i].kind === "audiooutput") && (deviceList[i].deviceId !==
							"communications")) {
						if (j++ !== 0) {
							let hr_solid = document.createElement("hr");
							hr_solid.className = "hr-solid-content-device";
							form_1.appendChild(hr_solid);
						}
						let device_1 = document.createElement("a");
						device_1.className = "device";
						device_1.href = "#";
						form_1.appendChild(device_1);

						let device_input = document.createElement("div");
						device_input.className = "device_input";
						device_1.appendChild(device_input);

						let device_input_class = document.createElement("input");
						device_input_class.className = "device_input_class";
						device_input_class.type = "radio";
						device_input_class.name = "device_name";
						device_input_class.value = deviceList[i].deviceId;
						device_input.appendChild(device_input_class);
						audioList.push(device_input_class);

						let device_text = document.createElement("div");
						device_text.className = "device_text";
						device_text.innerHTML = deviceList[i].label;
						device_1.appendChild(device_text);
					}
				}

				await button_1.addEventListener("click", async function() {
					let li_temp = document.getElementById(li_list_1.id);
					if (function_button_1.getAttribute("data-flag") === "true") {
						function_button_1.setAttribute("data-flag", "false");
						button_1.style.display = "none";
						box_1.style.display = "block";
						li_temp.style.height = "137px";
						await chrome.runtime.sendMessage({
							name: 'getTabVolume',
							target: "offscreen",
							tabId: li_list_1.id,
						}, (res) => {
							if (res !== undefined) {
								ribbon_slider_1.value = res.value;
								ribbon_slider_value_1.innerHTML = res.value;
								chrome.runtime.sendMessage({
									name: 'setVolume',
									target: "background",
									tabId: li_list_1.id,
									value: res.value
								})
							} else {
								chrome.runtime.sendMessage({
									name: 'setVolume',
									target: "background",
									tabId: li_list_1.id,
									value: 100
								})
							}
						})
					}
				})

				await head_1.addEventListener("click", function() {
					let li_temp = document.getElementById(li_list_1.id);
					if (function_button_1.getAttribute("data-flag") === "false") {
						function_button_1.setAttribute("data-flag", "true");
						button_1.style.display = "flex";
						box_1.style.display = "none";
						audioDevice.style.display = "none";
						li_temp.style.height = "50px";
					}
				})

				await ribbon_slider_1.addEventListener("input", async function() {
					ribbon_slider_value_1.innerHTML = ribbon_slider_1.value;
					await chrome.runtime.sendMessage({
						name: 'setVolume',
						target: "background",
						tabId: li_list_1.id,
						value: ribbon_slider_1.value
					})
				})

				await volume_0.addEventListener("click", function() {
					//静音
					ribbon_slider_1.value = 0;
					ribbon_slider_value_1.innerHTML = 0;
					chrome.runtime.sendMessage({
						name: 'setVolume',
						target: "background",
						tabId: li_list_1.id,
						value: 0
					})
				});
				await volume_1.addEventListener("click", function() {
					//重置
					ribbon_slider_1.value = 100;
					ribbon_slider_value_1.innerHTML = 100;
					chrome.runtime.sendMessage({
						name: 'setVolume',
						target: "background",
						tabId: li_list_1.id,
						value: 100
					})
				});
				await volume_2.addEventListener("click", async function() {
					//暂无
					audioDevice.style.display = audioDevice.style.display === "none" ?
						"block" : "none";
					li_list_1.style.height = box_1.clientHeight + "px";
					// let form = document.querySelectorAll("form_1")[0];
					// let input = document.getElementsByTagName("input");
					chrome.runtime.sendMessage({
						name: "getDevices",
						target: "offscreen",
						tabId: tab.id
					}, (res) => {
						if (res.deviceId === '') {
							// input[0].checked = true;
							audioList[0].checked = true;
							return;
						}
						for (let inp of audioList) {
							if (inp.value === res.deviceId) {
								inp.checked = true;
								break;
							}
						}
					});
				});

				form_1.addEventListener("click", function(e) {
					if (e.target.tagName == "INPUT") {
						chrome.runtime.sendMessage({
							name: "setDevices",
							target: "offscreen",
							tabId: tab.id,
							deviceId: e.target.value
						});
					}
				})
			}
		}
	})

	let slider = document.querySelectorAll(".ribbon_slider")[0];
	slider.addEventListener("input", async function() {
		await sliderChange(slider.value);
	})

	let ul_list = document.querySelectorAll(".ul_list")[0];

	chrome.tabs.query(queryOptions, function(tabs) {
		for (let tab of tabs) {
			let li_list = document.createElement("li");
			li_list.className = "li_list";
			ul_list.appendChild(li_list);

			let tab_button = document.createElement("div");
			tab_button.className = "tab_button";
			li_list.appendChild(tab_button);

			let button = document.createElement("a");
			button.className = "button";
			button.href = "#";
			tab_button.appendChild(button);

			let img_button = document.createElement("div");
			img_button.className = "img_button";
			button.appendChild(img_button);

			let img = document.createElement("img");
			img.src = tab.favIconUrl;
			img.height = "25";
			img.width = "25";
			img_button.appendChild(img);

			let title_button = document.createElement("div");
			title_button.className = "title_button";
			title_button.innerHTML = tab.title;
			button.appendChild(title_button);


			let function_button = document.createElement("div");
			function_button.className = "function_button";
			button.appendChild(function_button);

			let close_tab_a = document.createElement("a");
			close_tab_a.href = "#";
			close_tab_a.className = "close_tab_a";
			function_button.appendChild(close_tab_a);

			let close_tab_div = document.createElement("div");
			close_tab_div.className = "close_tab_div";
			close_tab_div.innerHTML = "╳";
			close_tab_a.appendChild(close_tab_div);

			button.addEventListener("click", async () => {
				let windowId = tab.windowId;
				let ids = tab.id
				let temp = await chrome.tabs.update(ids, {
					active: true
				});
				await chrome.windows.update(temp.windowId, {
					focused: true
				});
			})

			button.addEventListener("mouseout", function() {
				tab_button.style.backgroundColor = "#f5f5f5";
				function_button.style.display = "none";
			})

			button.addEventListener("mouseover", function() {
				tab_button.style.backgroundColor = "#c4c4c4";
				function_button.style.display = "block";
			})

			close_tab_a.addEventListener("click", function() {
				chrome.tabs.remove(tab.id, () => {
					li_list.remove();
				})
			})

		}
	});

	for (let i = 0, j = 0; i < deviceList.length; i++) {
		let form = document.querySelectorAll(".form_1")[0];
		if ((deviceList[i].kind === "audiooutput") && (deviceList[i].deviceId !==
				"communications")) {
			if (j++ !== 0) {
				let hr_solid = document.createElement("hr");
				hr_solid.className = "hr-solid-content-device";
				form.appendChild(hr_solid);
			}
			let device_1 = document.createElement("a");
			device_1.className = "device";
			device_1.href = "#";
			form.appendChild(device_1);

			let device_input = document.createElement("div");
			device_input.className = "device_input";
			device_1.appendChild(device_input);

			let device_input_class = document.createElement("input");
			device_input_class.className = "device_input_class";
			device_input_class.type = "radio";
			device_input_class.name = "device_name";
			device_input_class.value = deviceList[i].deviceId;
			device_input.appendChild(device_input_class);

			let device_text = document.createElement("div");
			device_text.className = "device_text";
			device_text.innerHTML = deviceList[i].label;
			device_1.appendChild(device_text);
		}
	}

	if (ul_list.childNodes !== null) {
		document.querySelectorAll(".h2_title")[0].remove();
	}

	let button_ribbon = document.querySelectorAll(".button_ribbon");
	button_ribbon[0].addEventListener("click", function() {
		//静音
		document.querySelectorAll(".ribbon_slider")[0].value = 0;
		document.querySelectorAll(".ribbon_slider_value")[0].innerHTML = 0;
		chrome.runtime.sendMessage({
			name: 'setVolume',
			target: "background",
			tabId: sliderTab,
			value: 0
		})
	});
	button_ribbon[1].addEventListener("click", function() {
		//重置
		document.querySelectorAll(".ribbon_slider")[0].value = 100;
		document.querySelectorAll(".ribbon_slider_value")[0].innerHTML = 100;
		chrome.runtime.sendMessage({
			name: 'setVolume',
			target: "background",
			tabId: sliderTab,
			value: 100
		})
	});
	button_ribbon[2].addEventListener("click", async function() {
		//暂无
		/* chrome.runtime.sendMessage({
			name: "getDevices",
			target: "offscreen"
		}); */
		let audioDevice = document.querySelectorAll(".audioDevice")[0];
		audioDevice.style.display = audioDevice.style.display === "none" ? "block" : "none";
		// let form = document.querySelectorAll("form_1")[0];
		let input = document.getElementsByTagName("input");
		chrome.runtime.sendMessage({
			name: "getDevices",
			target: "offscreen",
			tabId: sliderTab
		}, (res) => {
			if (res.deviceId === '') {
				input[0].checked = true;
				return;
			}
			for (let inp of input) {
				if (inp.value === res.deviceId) {
					inp.checked = true;
					break;
				}
			}
		});


		// $("input[name='device_name']:checked")
	});

	chrome.runtime.sendMessage({
		name: 'allVolume',
		target: "background",
		value: 100
	})

	document.querySelectorAll(".form_1")[0].addEventListener("click", function(e) {
		if (e.target.tagName == "INPUT") {
			chrome.runtime.sendMessage({
				name: "setDevices",
				target: "offscreen",
				tabId: sliderTab,
				deviceId: e.target.value
			});
		}
	})
}

async function sliderChange(val) {
	let slider_value = document.querySelectorAll(".ribbon_slider_value")[0];
	slider_value.innerHTML = val;

	await chrome.runtime.sendMessage({
		name: 'setVolume',
		target: "background",
		tabId: sliderTab,
		value: val
	})
}

async function setMicAccess(pattern, value, tab) {
	await chrome.contentSettings.microphone.set({
		primaryPattern: pattern,
		scope: (
			tab.incognito ?
			"incognito_session_only" :
			"regular"
		),
		setting: value
	});
	return true;
}
