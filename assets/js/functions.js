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
  let elems = isObj(parent) ? parent.querySelectorAll(selector) : [];
  return elems.length ? elems : false;
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