export class App {
  /**
   * @param {HTMLElement} root root HTML element
   * @param {Model} Model data representation
   * @param {View} ViewConstructor constructor for visual representation
   */
  constructor(root, model, ViewConstructor) {
    this.model = model;
    this.view = new ViewConstructor(model);
    root.appendChild(this.view.HTMLElement);
  }

  /**
   * @param {HTMLElement} root root HTML element
   * @param {Model} Model data representation
   * @param {View} View constructor for visual representation
   */
  static init(root, model, View) {
    return new App(root, model, View);
  }
}
