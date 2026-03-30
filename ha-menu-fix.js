/* ha-menu-fix.js
HA menu fix
Version      1.0.2, 29.03.2026
Description  Fixes menus and dropdowns that are cut off or unclickable in Home Assistant Web GUI (Web Awesome components bugs).
Author       BluffingJohn

Install:
1) Login into HA with a admin account (with "Advanced Mode" on)
2) Copy/Create this file to "/homeassistant/www/ha-menu-fix.js" using File Editor (HA add-on) or WinSCP/etc.
	If "/homeassistant/www/" directory doesn't exist create it manually.

3a) [Recommended method] Edit "/homeassistant/configuration.yaml" using File Editor/etc and add the folowing 4 lines.
	If there already exist a "frontend:" section defined just use that and add the "extra_module_url:"

# Add fix to HA Web Awesome bugs
frontend:
  extra_module_url:
    - /local/ha-menu-fix.js?v=1.0.2

3b) [Alternative method] Register this resource to the Settings -> Dashboards -> ... -> Resources -> Add resource
	!Warning: This way it will be loaded only in Dashboards and never in Settings/etc. Use '3a' for better performance!
	URL: /local/ha-menu-fix.js?v=1.0.2
	Type: JavaScript module

4) Developer tools -> Check configuration and reload all YAML configuration
5) Refresh the browser/app.
6) Restart HA (if it doesn't say "HA menu fix" in browser console)
*/

(function() {
	'use strict';

	const ver  = '1.0.2';
	const loop = 1500; //run every 1,5s
	let debug  = false; //Change to true to see where the script is doing its work
	console.log("%c[JS] HA menu fix v" + ver + " loaded.", "color: #208AEE; font-weight: bold;");

	let finalCSS = `
		/* ABSOLUTE PRIORITY FOR ALL TYPES OF MENUS */
		ha-dropdown[open], .ha-dropdown-menu, ha-dropdown-item, div#menu, [part="menu"], .mdc-menu-surface--open, wa-popup[active] { 
			z-index: 2147483647 !important;
			pointer-events: all !important;
			visibility: visible !important;
			display: flex !important;
		}

		/* TABLE AND VIRTUALIZER - Only break barriers if NOT in a combo-box/picker */
		.mdc-data-table__row, .mdc-data-table__cell, lit-virtualizer:not(.virtualizer-wrapper lit-virtualizer) {
			overflow: visible !important;
			contain: none !important;
		}

		/* Keep scroll in combo-box/pickers */
		.virtualizer-wrapper lit-virtualizer {
			overflow: auto !important;
			contain: size layout !important;
		}

		/* Raise the active row above the others when you interact with it */
		.mdc-data-table__row:focus-within { 
			z-index: 1000 !important; 
		}
	`;

	if(debug) {
		finalCSS += `
			/* Color borders for debug! */
			ha-dropdown[open], .mdc-menu-surface--open {
				outline: 2px solid lime !important;
			}
			div#menu, [part="menu"] {
				outline: 2px solid magenta !important;
			}
		`;
	}

	const applyStyles = (root) => {
		if (!root) return;
		// Inject styles into each new Shadow DOM discovered to fix the 'menu' elements
		if (root instanceof ShadowRoot && !root.querySelector('#ha-fix-final')) {
			const s = document.createElement('style');
			s.id = 'ha-fix-final';
			s.textContent = finalCSS;
			root.appendChild(s);
		}
		const all = root.querySelectorAll?.('*') || [];
		all.forEach(el => { if (el.shadowRoot) applyStyles(el.shadowRoot); });
	};

	// Scan every 1.5 seconds to discover and fix new elements/menus
	setInterval(() => applyStyles(document.body), loop);

	// Add global style to main elements of the document
	const mainS = document.createElement('style');
	mainS.textContent = finalCSS;
	document.head.appendChild(mainS);
})();
