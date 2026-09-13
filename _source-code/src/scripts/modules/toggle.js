/**
 * @typedef {{
 *   cta: HTMLElement,
 *   target: HTMLElement | null,
 *   hideCta: NodeListOf<HTMLElement> | null,
 * }} Elements - An object with elements that control the toggle behavior.
 */

/**
 * @typedef {{
 *   elements: Elements,
 *   init: () => void,
 *   destroy: () => void,
 *   toggle: () => void,
 *   show: () => void,
 *   hide: () => void,
 * }} Instance - An object with elements and methods to control the toggle behavior.
 */

/**
 * @callback LifecycleCallback
 * @param {Instance} instance
 * @returns {void}
 */

/**
 * Creates a toggle behavior for a given CTA that controls the visibility of a target element using a class.
 *
 * Use the toggle class to set the visibility of the target using CSS.
 *
 * @param {HTMLElement} cta - The element that will act as the toggle button.
 * @param {{
 *   lightDismiss?: boolean,
 *   onInit?: LifecycleCallback,
 *   onDestroy?: LifecycleCallback,
 *   onShow?: LifecycleCallback,
 *   onHide?: LifecycleCallback,
 * }} options - Configuration for the toggle behavior.
 * @param {{
 *   init?: string,
 *   show?: string,
 * }} classNames - Configuration for the class names.
 * @returns {Instance}
 */
export function createToggle(cta, options = {}, classNames = {}) {
  /**
   * @type {Elements}
   */
  const elements = {
    cta: cta,
    target: null,
    hideCta: null,
  };

  const opt = {
    lightDismiss: false,
    onInit: null,
    onDestroy: null,
    onShow: null,
    onHide: null,
    ...options,
  };

  const cn = {
    init: "is-init-toggle",
    show: "is-showing",
    ...classNames,
  };

  const instance = {
    elements: elements,
    init: init,
    destroy: destroy,
    toggle: toggle,
    show: show,
    hide: hide,
  };

  function isInit() {
    return elements.cta.classList.contains(cn.init);
  }

  function isShowing() {
    return elements.cta.getAttribute("aria-expanded") === "true";
  }

  function init() {
    if (isInit()) {
      return;
    }

    elements.target = document.getElementById(
      elements.cta.getAttribute("aria-controls")
    );
    elements.hideCta = elements.target.querySelectorAll("[data-toggle-hide]");

    addEventListeners();

    if (opt.lightDismiss && isShowing()) {
      addLightDismiss();
    }

    elements.cta.classList.add(cn.init);

    if (typeof opt.onInit === "function") {
      opt.onInit(instance);
    }
  }

  function destroy() {
    if (!isInit()) {
      return;
    }

    if (opt.lightDismiss && isShowing()) {
      removeLightDismiss();
    }

    removeEventListeners();

    elements.target = null;
    elements.hideCta = null;

    elements.cta.classList.remove(cn.init);

    if (typeof opt.onDestroy === "function") {
      opt.onDestroy(instance);
    }
  }

  function addEventListeners() {
    elements.cta.addEventListener("click", toggle);
    for (const element of elements.hideCta) {
      element.addEventListener("click", hide);
    }
  }

  function removeEventListeners() {
    elements.cta.removeEventListener("click", toggle);
    for (const element of elements.hideCta) {
      element.removeEventListener("click", hide);
    }
  }

  function addLightDismiss() {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscPress);
  }

  function removeLightDismiss() {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleEscPress);
  }

  function handleClickOutside(e) {
    if (
      elements.cta.contains(e.target) ||
      elements.target.contains(e.target) ||
      !isShowing()
    ) {
      return;
    }

    hide();
  }

  function handleEscPress(e) {
    if (e.key !== "Escape" || !isShowing()) {
      return;
    }

    hide();
  }

  function toggle() {
    if (isShowing()) {
      hide();
    } else {
      show();
    }
  }

  function show() {
    if (isShowing()) {
      return;
    }

    elements.cta.setAttribute("aria-expanded", "true");
    elements.target.classList.add(cn.show);

    if (opt.lightDismiss) {
      addLightDismiss();
    }

    if (typeof opt.onShow === "function") {
      opt.onShow(instance);
    }
  }

  function hide() {
    if (!isShowing()) {
      return;
    }

    elements.cta.setAttribute("aria-expanded", "false");
    elements.target.classList.remove(cn.show);

    if (opt.lightDismiss) {
      removeLightDismiss();
    }

    if (typeof opt.onHide === "function") {
      opt.onHide(instance);
    }
  }

  return instance;
}
