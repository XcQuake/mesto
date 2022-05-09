interface ISection {
  items: [];
  renderer: (item: object) => void;
  containerSelector: string;
}

export class Section {
  items: object[];
  container: Element;
  renderer: (item: object) => void;

  constructor({items, renderer, containerSelector}: ISection) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderItems(): void {
    this.items.forEach(item => {
      this.renderer(item);
    });
  };

  addItem(element: object, method: string): void {
    this.container[method](element);
  }
}
