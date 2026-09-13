import { createToggle } from "./modules/toggle.js";

(function () {
  const app = {};

  app.toggle = {
    createToggle: createToggle,
    instances: {},
    options: {
      nav: {
        lightDismiss: true,
      },
    },
  };
  const toggleElements = document.querySelectorAll(".js-toggle");
  for (const element of toggleElements) {
    const id = element.dataset.id;
    const dataOptions = element.dataset.toggleOptions;
    const options = dataOptions ? app.toggle.options[dataOptions] : undefined;
    app.toggle.instances[id] = app.toggle.createToggle(element, options);
    app.toggle.instances[id].init();
  }

  window.dapsyApp = app;
})();
