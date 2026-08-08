# Audio Change - Chrome Extension

A powerful browser volume control and tab management tool that lets you easily adjust the volume of each tab individually and manage all your tabs efficiently.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)
![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.x-blue.svg)

<p align="center">
  <a href="./README.md">简体中文</a>
    /
  <a href="./README_en.md">English</a>
</p>

---

## 📖 Overview

**Audio Change** is a Chrome extension designed to solve the inconvenience of controlling webpage volume. It allows you to:
- Adjust the volume of any tab independently (0% ~ 200%)
- Mute/unmute with one click
- Reset volume to 100%
- View all tabs currently playing audio and control each separately
- Manage tabs across all windows (switch focus, close tabs)

Whether you're listening to music, watching videos, or joining online meetings, you have full control over each page's audio output.

---

## ✨ Features

- **🎚️ Volume Slider**: Intuitive slider with 1% precision, range 0% ~ 200%
- **🔇 Quick Mute**: One‑click mute; click again to restore the previous volume
- **🔄 Reset Volume**: Instantly reset to 100%
- **🎵 Audio Tab List**: Automatically detects all tabs playing audio; collapsible cards for easy management
- **📑 Global Tab Management**: Displays all tabs from all windows; click to switch focus, close tabs with a hover‑rotate button
- **🎨 Friendly UI**: Built with Vue 3 and Element Plus – clean, responsive, and pleasant
- **💾 Volume Persistence**: Volume is remembered when switching tabs (requires the extension to be active)

---

## 🚀 Installation

### From Source (Developer Mode)

1. **Clone the repository**
   ```bash
   git clone https://github.com/YiMlT/Audio-Change.git
   cd Audio-Change
   ```

2. **Install dependencies and build (optional)**
   The project includes pre‑built `popup.html` and `js` files, so you can use it directly. If you want to modify the source, first install dependencies:
   ```bash
   npm install
   npm run build   # Build for production
   ```

3. **Load into Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **"Developer mode"** (top right)
   - Click **"Load unpacked"**
   - Select the project folder (containing `manifest.json`)
   - The extension is now installed and appears in the toolbar

> **Note**: The first time you use it, Chrome will ask for permission to capture audio. Please allow it.

---

## 🖱️ Usage

Click the extension icon in the toolbar to open the popup panel.

### 1. Current Tab Control
- The top section shows the icon and title of the currently active tab (long titles scroll on hover)
- **Volume Slider**: Drag to adjust volume
- **Mute Button**: Click to mute; click again to unmute and restore previous volume
- **Reset Volume**: Restores to 100%

### 2. Audio Tab Management
- All tabs currently playing audio are displayed as cards
- Click the card header to collapse/expand (the volume controls and buttons are shown when expanded)
- Each card has independent volume, mute, and reset controls

### 3. Global Tab List
- Shows all tabs grouped by window
- Click any tab to focus that tab
- Each tab has a close button with a hover‑rotate animation; click to close the tab

---

## 🔧 Tech Stack

- **UI Framework**: Vue 3 + Element Plus
- **Build Tool**: Vue CLI (or Webpack)
- **Chrome APIs**:
  - `tabs`, `tabCapture` for audio capture and control
  - `offscreen` for offscreen document audio processing
  - `storage` for persistent settings (reserved)
- **Language**: JavaScript (ES Modules)

---

## 📜 Permissions Explained

| Permission         | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `tabs`             | Get and manage tab information                 |
| `tabCapture`       | Capture tab audio stream to control volume     |
| `activeTab`        | Get the currently active tab                   |
| `scripting`        | Inject content scripts when needed             |
| `offscreen`        | Create offscreen document for audio processing |
| `storage`          | Save user preferences (reserved)               |
| `host_permissions` | Allow script injection on all HTTP/HTTPS pages |

---

## 🤝 Contributing

Issues and pull requests are welcome! Please follow the existing code style and add appropriate tests.

---

## 📄 License

This project is open‑source under the **MIT** license. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)

---

**Enjoy more control over your audio!** 🎧