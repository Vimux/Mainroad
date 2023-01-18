'use strict';

const light = 'light';
const dark = 'dark';
const active = 'active';
let auto = 'auto';
const storage_key = `{{ lower site.Title }}-color-mode`;
const copied_text = `{{ T "copied" }}`;
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

function addDeepLinks() {
  let headingNodes = [], results, link, icon, current, id,
  tags = ['h2', 'h3', 'h4', 'h5', 'h6'];

  current = document.URL;

  tags.forEach(function(tag){
    results = document.getElementsByTagName(tag);
    Array.prototype.push.apply(headingNodes, results);
  });

  console.log(tags);

  function sanitizeURL(url) {
    // removes any existing id on url
    const hash = '#';
    const positionOfHash = url.indexOf(hash);
    if(positionOfHash > -1 ) {
      const id = url.substr(positionOfHash, url.length - 1);
      url = url.replace(id, '');
    }
    return url
  }

  headingNodes.forEach(function(node){
    link = createEl('a');
    icon = createEl('img');
    icon.src = '{{ absURL "img/link.svg" }}';
    link.className = 'link icon';
    link.appendChild(icon);
    id = node.getAttribute('id');
    if(id) {
      link.href = `${sanitizeURL(current)}#${id}`;
      node.appendChild(link);
      pushClass(node, 'link__owner');
    }
  });
}

function copyFeedback(parent) {
  const copyText = document.createElement('div');
  const yanked = 'link__copied';
  copyText.classList.add(yanked);
  copyText.innerText = copied_text;
  if(!elem(`.${yanked}`, parent)) {
    const icon = parent.getElementsByTagName('img')[0];
    const originalSrc = icon.src;
    icon.src = '{{ absURL "img/check.svg" }}';
    parent.appendChild(copyText);
    setTimeout(function() {
      parent.removeChild(copyText)
      icon.src = originalSrc;
    }, 1500);
  }
}

function copyDeepLinks() {
  let deeplink, deeplinks, newLink, parent, target;
  deeplink = 'link';
  deeplinks = elems(`.${deeplink}`);
  if(deeplinks) {
    document.addEventListener('click', function(event)
    {
      target = event.target;
      parent = target.parentNode;
      if (target && containsClass(target, deeplink) || containsClass(parent, deeplink)) {
        event.preventDefault();
        newLink = target.href != undefined ? target.href : target.parentNode.href;
        copyToClipboard(newLink);
        target.href != undefined ?  copyFeedback(target) : copyFeedback(target.parentNode);
      }
    });
  }
}

window.addEventListener('load', () => {
  initializeMenu();
  addDeepLinks();
  copyDeepLinks();

  doc.addEventListener('click', function(event) {
    let target = event.target;
    let is_mode_toggle = isTarget(target, '.light__toggle')
    if(is_mode_toggle.valid) {
      setUserColorMode(true);
    }
  });
});