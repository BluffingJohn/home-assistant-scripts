/* ha-menu-fix.js
HA menu fix
Version      1.0.3, 04.05.2026
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
    - /local/ha-menu-fix.js?v=1.0.3

3b) [Alternative method] Register this resource to the Settings -> Dashboards -> ... -> Resources -> Add resource
	!Warning: This way it will be loaded only in Dashboards and never in Settings/etc. Use '3a' for better performance!
	URL: /local/ha-menu-fix.js?v=1.0.3
	Type: JavaScript module

4) Developer tools -> Check configuration and reload all YAML configuration
5) Refresh the browser/app.
6) Restart HA (if it doesn't say "HA menu fix" in browser console)
*/

(function() {
	'use strict';

	const ver  = '1.0.3';
	const loop = 1500; //run every 1,5s
	console.log("%c[JS] HA menu fix v" + ver + " loaded.", "color: #208AEE; font-weight: bold;");

	let finalCSS = `
		/* Raise the active row above the others when you interact with it */
		.mdc-data-table__row:focus-within { 
			z-index: 1000 !important; 
		}
	`;

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
