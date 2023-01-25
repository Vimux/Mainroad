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
const copied_class = 'copied';
const deeplink_class = '.link';
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
  let headingNodes = [], results, current, id,
  tags = [1,2,3,4,5,6];

  current = document.URL;

  tags.forEach(function(tag){
    results = document.getElementsByTagName(`h${tag}`);
    Array.prototype.push.apply(headingNodes, results);
  });

  function sanitizeURL(url) {
    // removes any existing id on url
    const hash = '#';
    const position_of_hash = url.indexOf(hash);
    if(position_of_hash > -1 ) {
      const id = url.substr(position_of_hash, url.length - 1);
      url = url.replace(id, '');
    }
    return url
  }

  headingNodes.forEach(function(node){
    let copy_btn = createEl('span');
    copy_btn.className = 'link icon';
    copy_btn.dataset.icon = 'link';
    toggleSprite('link', copy_btn);
    id = node.getAttribute('id');
    const node_styles = window.getComputedStyle(node);
    let node_height = node_styles.getPropertyValue('line-height');
    node_height = parseFloat(node_height) > 31 ? node_height : 0;
    node.style.setProperty('--height', node_height);
    if(!id) {
      id = node.innerText.toLowerCase().replaceAll(' ', '-');
      node.setAttribute('id', id);
    }
    if(id) {
      copy_btn.dataset.link = `${sanitizeURL(current)}#${id}`;
      node.appendChild(copy_btn);
      pushClass(node, 'link__owner');
    }
  });
}

function copyFeedback(target) {
  const is_copy_button = isTarget(target, deeplink_class);
  if(is_copy_button.valid) {
    target = is_copy_button.exact ? target : target.closest(deeplink_class);
    toggleSprite('check', target); // under review
    pushClass(target, copied_class);
    const copy_btn_x_pos = target.getBoundingClientRect().x;
    copy_btn_x_pos > window.innerWidth / 2 ? pushClass(target, 'js-left') : false;
    setTimeout(function() {
      toggleSprite(target.dataset.icon, target);
      deleteClass(target, copied_class);
    }, 1500);
  }
}

function copyDeepLinks(target) {
  let deeplinks, new_link;
  deeplinks = elems(deeplink_class);
  const is_deeplink = isTarget(target, deeplink_class);
  if(deeplinks && is_deeplink.valid && !target.closest(`.${panel_box}`)) {
    target = is_deeplink.exact ? target : target.closest(deeplink_class);
    new_link = target.dataset.link;
    copyToClipboard(new_link);
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
    btn.className = `link icon panel_icon panel_${button.id}`;
    btn.dataset.icon = button.id;
    button.show ? false : pushClass(btn, panelHide);
    // load icon inside button
    toggleSprite(button.id, btn);
    // append button on panel
    panel.appendChild(btn);
  });

  return panel;
}

function copyCode(code_element) {
  const line_numbers = elems('.ln', code_element);
  // remove line numbers before copying
  line_numbers.length ? line_numbers.forEach(line => line.remove()) : false;

  // remove leading '$' from all shell snippets
  code_element = code_element.cloneNode(true);
  const lines = elems('span', code_element);
  lines.forEach(line => {
    const text = line.textContent.trim(' ');
    if(text.indexOf('$') === 0) {
      line.textContent = line.textContent.replace('$ ', '');
    }
  })

  const snippet = code_element.textContent;
  // copy code
  copyToClipboard(snippet);
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

  if(is_copy_icon.valid) {
    target = is_copy_icon.exact ? target : target.closest(`.${copy_id}`);
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
  const shell_based = ['sh', 'shell', 'zsh', 'bash'];
  blocks.forEach(block => {
    const is_shell_based = shell_based.includes(block.dataset.lang);
    if(is_shell_based) {
      const lines = elems('span', block);
      Array.from(lines).forEach(line => {
        let line_contents = line.textContent.trim(' ');
        if(line_contents.indexOf('$') !== 0) {
          pushClass(line.lastElementChild, 'shell');
        }
      });
    }
  });
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
    copyFeedback(target);
  });
});