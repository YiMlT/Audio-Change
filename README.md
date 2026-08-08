# Audio Change - Chrome 扩展

一款功能强大的浏览器音量控制与标签管理工具，让您轻松调节每个标签页的音量，并高效管理所有标签。

![Chrome 扩展](https://img.shields.io/badge/Chrome-扩展-blue.svg)
![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.x-blue.svg)

<p align="center">
  <a href="./README.md">简体中文</a>
    /
  <a href="./README_en.md">English</a>
</p>

---

## 📖 简介

**Audio Change** 是一款 Chrome 浏览器扩展，旨在解决网页音量控制不便的问题。它允许您：

- 独立调节任意标签页的音量（0% ~ 200%）
- 一键静音/取消静音
- 重置音量至 100%
- 查看所有正在发声的标签页，并分别控制
- 管理所有窗口的标签（切换焦点、关闭标签）

无论您是听音乐、看视频，还是参加在线会议，都能轻松掌控每个页面的音频输出。

---

## ✨ 特性

- **🎚️ 音量滑块**：直观的滑块操作，精确到 1%，范围 0% ~ 200%
- **🔇 静音快捷**：一键静音，再次点击恢复原音量
- **🔄 音量重置**：一键恢复至 100%
- **🎵 发声标签列表**：自动识别所有正在播放音频的标签页，并折叠/展开以便管理
- **📑 全局标签管理**：显示所有窗口的所有标签，支持点击切换焦点、关闭标签
- **🎨 友好界面**：基于 Vue 3 + Element Plus，清爽美观，响应迅速
- **💾 音量记忆**：切换标签后音量自动恢复（需保持扩展激活）

---

## 🚀 安装指南

### 从源码安装（开发模式）

1. **下载本项目源码**
   ```bash
   git clone https://github.com/YiMlT/Audio-Change.git
   cd Audio-Change
   ```

2. **安装依赖并构建（可选）**
   项目已包含预编译的 `popup.html` 和 `js` 文件，可直接使用。如需修改源码，请先安装依赖：
   ```bash
   npm install
   npm run build   # 构建生产版本
   ```

3. **加载到 Chrome**
   - 打开 Chrome 浏览器，访问 `chrome://extensions/`
   - 开启右上角的 **“开发者模式”**
   - 点击 **“加载已解压的扩展程序”**
   - 选择本项目文件夹（包含 `manifest.json` 的目录）
   - 扩展即安装成功，工具栏出现图标

> **注意**：由于使用了 `tabCapture` 权限，首次使用时会提示“捕获音频”，请允许。

---

## 🖱️ 使用说明

点击工具栏扩展图标，弹出操作面板：

### 1. 当前标签页控制
- 顶部显示当前激活标签页的图标和标题（过长标题会滚动）
- **音量滑块**：拖动调节音量
- **静音按钮**：点击静音，再次点击取消静音并恢复原音量
- **重置音量**：恢复至 100%

### 2. 发声标签管理
- 所有正在播放音频的标签页会以卡片形式展示
- 点击卡片头部可折叠/展开（展开时显示音量控件和按钮）
- 每个卡片独立控制音量、静音、重置

### 3. 全局标签列表
- 展示所有窗口下的所有标签页，按窗口分组
- 点击任意标签可切换焦点至该标签
- 每个标签右侧带有关闭按钮，悬停旋转动画，点击关闭标签

---

## 🔧 技术栈

- **UI 框架**：Vue 3 + Element Plus
- **构建工具**：Vue CLI（或 Webpack）
- **Chrome API**：
  - `tabs`、`tabCapture` 用于音频捕获与控制
  - `offscreen` 用于离屏文档处理音频流
  - `storage` 用于持久化设置（可扩展）
- **语言**：JavaScript (ES Modules)

---

## 📜 权限说明

| 权限               | 用途                               |
| ------------------ | ---------------------------------- |
| `tabs`             | 获取和操作标签页信息               |
| `tabCapture`       | 捕获标签页音频流以控制音量         |
| `activeTab`        | 获取当前激活标签                   |
| `scripting`        | 注入内容脚本（必要时）             |
| `offscreen`        | 创建离屏文档处理音频               |
| `storage`          | 保存用户偏好（预留）               |
| `host_permissions` | 允许在所有 HTTP/HTTPS 页面注入脚本 |

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！请确保遵循现有的代码风格，并添加必要的测试。

---

## 📄 许可证

本项目基于 **MIT** 许可证开源，详情请见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)

---

**享受更自由的音量控制！** 🎧
