'use strict';

const rootURL = `{{ replace (absURL "/") "//" "http://" }}`;

function isObj(obj) {
  return (obj && typeof obj === 'object' && obj !== null) ? true : false;
}

function createEl(element = 'div') {
  return document.createElement(element);
}

function emptyEl(el) {
  while(el.firstChild)
  el.removeChild(el.firstChild);
}

function elem(selector, parent = document){
  let elem = isObj(parent) ? parent.querySelector(selector) : false;
  return elem ? elem : false;
}

function elems(selector, parent = document) {
  const elems = isObj(parent) ? parent.querySelectorAll(selector) : [];
  return elems;
}

function pushClass(el, target_class) {
  if (isObj(el) && target_class) {
    let element_classes = el.classList;
    element_classes.contains(target_class) ? false : element_classes.add(target_class);
  }
}

function deleteClass(el, target_class) {
  if (isObj(el) && target_class) {
    let element_classes = el.classList;
    element_classes.contains(target_class) ? element_classes.remove(target_class) : false;
  }
}

function modifyClass(el, target_class) {
  if (isObj(el) && target_class) {
    const element_classes = el.classList;
    element_classes.contains(target_class) ? element_classes.remove(target_class) : element_classes.add(target_class);
  }
}

function containsClass(el, target_class) {
  if (isObj(el) && target_class && el !== document ) {
    return el.classList.contains(target_class) ? true : false;
  }
}

function hasClasses(el) {
  if(isObj(el)) {
    const classes = el.classList;
    return classes.length
  }
}

function getSetAttribute(elem, attr, value = null) {
  if (value) {
    elem.setAttribute(attr, value);
  } else {
    value = elem.getAttribute(attr);
    return value ? value : false;
  }
}

function isTarget(element, selector) {
  if(isObj(element)) {
    let matches = false;
    const is_exact_match = element.matches(selector);
    const exact_target = element.closest(selector);
    matches = is_exact_match ? is_exact_match : exact_target;
    return  {
      exact: is_exact_match,
      valid: matches,
      actual: exact_target,
    };
  }
}

function wrapEl(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

function copyToClipboard(str) {
  let copy, selection, selected;
  copy = createEl('textarea');
  copy.value = str;
  copy.setAttribute('readonly', '');
  copy.style.position = 'absolute';
  copy.style.left = '-9999px';
  selection = document.getSelection();
  doc.appendChild(copy);
  // check if there is any selected content
  selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
  copy.select();
  document.execCommand('copy');
  doc.removeChild(copy);
  if (selected) { // if a selection existed before copying
    selection.removeAllRanges(); // unselect existing selection
    selection.addRange(selected); // restore the original selection
  }
}

function toggleSprite(name, parent) {
  parent.innerHTML = `
    <svg>
      <use xlink:href="#${name}-icon"></use>
    </svg>
  `;
}