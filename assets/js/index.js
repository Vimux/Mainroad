'use strict';

const light = 'light';
const dark = 'dark';
const active = 'active';
let auto = 'auto';
const storage_key = `{{ lower site.Title }}-color-mode`;
const key = `--color-mode`;
const data = 'data-mode';
const bank = window.localStorage;
const doc = document.documentElement;
const lighting_mode_toggle = elem('.light__toggle');

function initializeMenu() {
	var menuBtn = document.querySelector('.menu__btn');
	var	menu = document.querySelector('.menu__list');

	function toggleMenu() {
		menu.classList.toggle('menu__list--active');
		menu.classList.toggle('menu__list--transition');
		this.classList.toggle('menu__btn--active');
		this.setAttribute(
			'aria-expanded',
			this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
		);
	}

	function removeMenuTransition() {
		this.classList.remove('menu__list--transition');
	}

	if (menuBtn && menu) {
		menuBtn.addEventListener('click', toggleMenu, false);
		menu.addEventListener('transitionend', removeMenuTransition, false);
	}
}

function getSystemMode() {
  if (window.matchMedia) {
    return window.matchMedia(`(prefers-color-scheme: ${dark})`).matches ? dark : light;
  }
  return light;
}

function changeMode(current_mode) {
  const next_mode = current_mode == dark ? light : dark;
  bank.setItem(storage_key, next_mode);
  getSetAttribute(doc, data, next_mode);
}

function showLightingModeIcon() {
  let current_mode = doc.dataset.mode;
  if(current_mode == auto) {
    const user_selected_mode = bank.getItem(storage_key);
    current_mode = user_selected_mode ? user_selected_mode : getSystemMode();
  }

  console.log(current_mode);

  elems('svg', lighting_mode_toggle).forEach(icon => {
    icon.dataset.mode === current_mode ? pushClass(icon, active) : deleteClass(icon, active);
  })

}

function setUserColorMode(manual = false) {
  if(lighting_mode_toggle) {
    const current_mode = bank.getItem(storage_key);
    if(current_mode) {
      manual ? changeMode(current_mode) : getSetAttribute(doc, data, current_mode);
    } else {
      manual ? changeMode(current_mode) : false;
    }

    showLightingModeIcon();
  }
}

setUserColorMode(); // kicks in immediately

window.addEventListener('load', () => {
  initializeMenu();

  doc.addEventListener('click', function(event) {
    let target = event.target;
    let is_mode_toggle = isTarget(target, '.light__toggle')
    if(is_mode_toggle.valid) {
      setUserColorMode(true);
    }
  });
});