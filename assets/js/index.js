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
const lineClass = '.line';
const iconsPath = '{{ default "icons/" site.Params.iconsDir }}';

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

function copyDeepLinks(target) {
  let deeplink, deeplinks, newLink, parent;
  deeplink = 'link';
  deeplinks = elems(`.${deeplink}`);
  if(deeplinks) {
    parent = target.parentNode;
    if (target && containsClass(target, deeplink) || containsClass(parent, deeplink)) {
      event.preventDefault();
      newLink = target.href != undefined ? target.href : target.parentNode.href;
      copyToClipboard(newLink);
      target.href != undefined ?  copyFeedback(target) : copyFeedback(target.parentNode);
    }
  }
}

const code_action_buttons = [
  {
    icon: 'copy',
    id: 'copy',
    title: 'Copy Code',
    show: true
  },
];

const copy_id = 'panel_copy';
const panel_box = 'panel_box';
const highlight_wrap = 'highlight_wrap'

function wrapOrphanedPreElements() {
  const pres = elems('pre');
  Array.from(pres).forEach(function(pre){
    const parent = pre.parentNode;
    const is_orpaned = !containsClass(parent, 'highlight');
    if(is_orpaned) {
      const pre_wrapper = createEl();
      pre_wrapper.className = 'highlight';
      const outer_wrapper = createEl();
      outer_wrapper.className = highlight_wrap;
      wrapEl(pre, pre_wrapper);
      wrapEl(pre_wrapper, outer_wrapper);
    }
  })
}

wrapOrphanedPreElements();

function codeBlocks() {
  const marked_code_blocks = elems('code');
  const blocks = Array.from(marked_code_blocks).filter(function(block){
    return hasClasses(block) && !Array.from(block.classList).includes('noClass');
  }).map(function(block){
    return block
  });
  return blocks;
}

function maxHeightIsSet(elem) {
  let max_height = elem.style.maxHeight;
  return max_height.includes('px')
}

const blocks = codeBlocks();

function actionPanel() {
  const panel = createEl();
  panel.className = panel_box;

  code_action_buttons.forEach(function(button) {
    // create button
    const btn = createEl('div');
    btn.title = button.title;
    btn.className = `icon panel_icon panel_${button.id}`;
    button.show ? false : pushClass(btn, panelHide);
    // load icon inside button
    btn.style.backgroundImage = `url(${rootURL}${iconsPath}${button.icon}.svg)`;
    // append button on panel
    panel.appendChild(btn);
  });

  return panel;
}

function copyCode(code_element) {
  line_numbers = elems('.ln', code_element);
  // remove line numbers before copying
  if(line_numbers.length) {
    line_numbers.forEach(function(line){
      line.remove();
    });
  }
  // copy code
  copyToClipboard(code_element.textContent);
}

(function codeActions(){
  const blocks = codeBlocks();

  const highlight_wrap_id = highlight_wrap;
  blocks.forEach(function(block){
    // disable line numbers if disabled globally
    const highlightElement = block.parentNode.parentNode;
    // wrap code block in a div
    const highlight_wrapper = createEl();
    highlight_wrapper.className = highlight_wrap_id;
    wrapEl(highlightElement, highlight_wrapper);

    const panel = actionPanel();
    // append buttons
    highlight_wrapper.appendChild(panel);
  });
})();

function copyCodeBlockContents(target){
  // copy code block
  const is_copy_icon = isTarget(target, `.${copy_id}`);
  const highlight_wrap_id = highlight_wrap;

  if(is_copy_icon.exact) {
    pushClass(target, active);

    setTimeout(function() {
      deleteClass(target, active)
    }, 1000)

    const code_element = target.closest(`.${highlight_wrap_id}`).firstElementChild.firstElementChild;

    copyCode(code_element.cloneNode(true));
  }
}

(function highlightCommands() {
  const blocks = codeBlocks();
  blocks.forEach(block => block.dataset.lang === 'sh' ? pushClass(block.parentNode, 'shell') : false);
})();

window.addEventListener('load', () => {
  initializeMenu();
  addDeepLinks();

  doc.addEventListener('click', function(event) {
    let target = event.target;
    let is_mode_toggle = isTarget(target, '.light__toggle')
    if(is_mode_toggle.valid) {
      setUserColorMode(true);
    }

    copyCodeBlockContents(target);
    copyDeepLinks(target);
  });
});