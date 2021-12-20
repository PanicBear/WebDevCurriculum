document.addEventListener("DOMContentLoaded", () => {
  new Desktop(new Icon(3), new Folder(2), new Window());
  new Desktop(new Icon(3), new Folder(2), new Window());
});

class Draggable {
  add(element) {
    document.createElement(element);
  }
}

class GUI {
  constructor(count) {
    this.count = count;
  }
  add = (html) => {
    let innerHtml = "";
    new Array(this.count).fill().forEach(() => (innerHtml += html));
    return innerHtml;
  };
}

class Desktop {
  #isDragging = false;
  #desktop = document.createElement("section");
  #target = null;
  #ghost = null;
  #window = null;

  constructor(icon, folder, win) {
    this.#window = win;
    this.#initDesktop(icon, folder);
    this.#registHandlers();
  }
  #initDesktop = (icon, folder) => {
    this.#desktop.classList.add("desktop");
    this.#desktop.insertAdjacentHTML(
      "beforeend",
      `<ul class="file-wrapper">
				${icon.addIcon()}
				${folder.addFolder()}
			</ul>`
    );
    document.body.append(this.#desktop);
  };
  #registHandlers = () => {
    this.#desktop.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const target = e.target;
      if (!this.#isDragging && target.classList.contains("draggable")) {
        this.#isDragging = true;
        target.classList.add("onDrag");
        this.#target = target;
        this.#addGhost();
      }
    });
    this.#desktop.addEventListener("mouseup", (e) => {
      if (this.#isDragging) {
        const fileOnDrag = this.#desktop.querySelector(".onDrag");
        this.#isDragging = false;
        fileOnDrag.classList.add("dragged");
        fileOnDrag.style.top = `${e.pageY - 32}px`;
        fileOnDrag.style.left = `${e.pageX - 32}px`;
        fileOnDrag.classList.remove("onDrag");
        this.#target = null;
        this.#desktop.removeChild(this.#ghost);
        this.#ghost = null;
      }
    });
    this.#desktop.addEventListener("dblclick", () => {
      this.#window.addWindow(this.#desktop);
    });
    this.#desktop.addEventListener("mousemove", (e) => {
      if (this.#isDragging && this.#ghost) {
        this.#ghost.style.top = `${e.pageY - 32}px`;
        this.#ghost.style.left = `${e.pageX - 32}px`;
        this.#ghost.style.color = "black";
      }
    });
  };
  #addGhost = () => {
    if (this.#target.classList.contains("fa-file")) {
      this.#ghost = document.createElement("i");
      this.#ghost.className = "far fa-file ghost";
    } else if (this.#target.classList.contains("fa-folder")) {
      this.#ghost = document.createElement("i");
      this.#ghost.className = "far fa-folder ghost";
    } else if (this.#target.classList.contains("win")) {
      this.#ghost = document.createElement("section");
      this.#ghost.className = "win ghost";
    }
    this.#desktop.insertAdjacentElement("beforeend", this.#ghost);
  };
}

class Icon extends GUI {
  constructor(count) {
    super(count);
  }
  addIcon = () =>
    this.add(
      "<li class='file icon'><i class='far fa-file draggable'></i></li>"
    );
}

class Folder extends GUI {
  constructor(count) {
    super(count);
  }
  addFolder = () =>
    this.add(
      "<li class='file folder'><i class='far fa-folder draggable'></i></li>"
    );
}

class Window extends GUI {
  constructor() {
    super(1);
  }
  addWindow = (target) => {
    console.log("addWindow");
    target.insertAdjacentHTML(
      "beforeEnd",
      this.add("<i class='win far fa-window-maximize draggable'></i>")
    );
  };
}
