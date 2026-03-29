# Home Assistant - Menu Fix (Shadow DOM)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Greasy Fork](https://img.shields.io/badge/Install-Greasy%20Fork-orange.svg)](https://update.greasyfork.org/scripts/571519/HA%20menu%20fix.user.js)

### 🔴 The Problem
Recent updates in **Home Assistant (Core 2025.x - 2026.x)** introduced new UI components (Web Awesome). Due to strict CSS isolation (`overflow: hidden` and `contain: strict`) within the Shadow DOM of data tables and virtualized lists, many dropdown menus and settings buttons are:
* **Cut off** by row boundaries or table containers.
* **Unclickable** or hidden behind other elements.
* **Invisible** on mobile devices or legacy browsers (Legacy Chrome/Firefox).

### ✨ Possible solution until the developers are fixing this issue 
This script is a **lightweight, recursive Shadow DOM styler**. It automatically traverses the Home Assistant interface and injects specific CSS rules into every Shadow Root to:
1. **Break overflow barriers** of tables and virtualizers.
2. **Force high-priority `z-index`** on all known HA dropdown components.

---

## 🛠 Installation Options

### Option A: Global Fix (Recommended - No extension needed)
This method works on **all devices and browsers** (PC, Mobile, Tablet) automatically.
1. Upload `ha-menu-fix.js` to your `/config/www/` folder (create it if it doesn't exist).
2. Add the following to your `configuration.yaml`:
```yaml
frontend:
  extra_module_url:
    - /local/ha-menu-fix.js?v=1.0.2
```

3.  **Restart Home Assistant** or reload the frontend configuration.

-----

### Option B: Browser Extension (The "monkey" Way 🐒)

If you don't want to modify your HA server files, you can use a browser extension on your PC/Laptop. This script is fully compatible with:

  * **Tampermonkey** (Chrome, Edge, Safari, Firefox)
  * **Greasemonkey** (Firefox)
  * **Violentmonkey** (Open Source alternative)

**How to install:**

  * 👉 **[One-Click Install from Greasy Fork](https://update.greasyfork.org/scripts/571519/HA%20menu%20fix.user.js)**
  * Or use the direct update link: `https://update.greasyfork.org/scripts/571519/HA%20menu%20fix.user.js`

-----

## 🧪 Compatibility

  * **Tested on:** Home Assistant Core 2026.3.4 (Web Awesome UI)
  * **Browsers:** Chrome (v109+), Firefox (v115+), Edge, Safari, iOS/Android Companion App.

## 🐞 Debug Mode

If menus are still behaving badly, set `let debug = true;` inside the script. It will highlight targeted elements with **neon borders**:

  * **Lime**: Active dropdowns/surfaces.
  * **Magenta**: Core menu containers.

-----

## 📜 License

This project is licensed under the **MIT License**.
