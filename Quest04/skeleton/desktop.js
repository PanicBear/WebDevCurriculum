document.addEventListener("DOMContentLoaded", () => {
  new Desktop(new Icon(3), new Folder(2));
});

class Draggable {
  add(element) {
    document.createElement(element);
  }
}

class File {
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
  constructor(icon, folder) {
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
      if (!this.#isDragging && target.classList.contains("file")) {
        this.#isDragging = true;
        target.classList.add("onDrag");
      }
    });
    this.#desktop.addEventListener("mouseup", (e) => {
      if (this.#isDragging) {
        console.log(e.clientX);
        console.log("mouseup");
        const fileOnDrag = this.#desktop.querySelector(".onDrag");
        this.#isDragging = false;
        fileOnDrag.classList.add("dragged");
        console.log(fileOnDrag.style.height);
        fileOnDrag.style.top = `${e.clientY - 32}px`;
        fileOnDrag.style.left = `${e.clientX - 32}px`;
        console.log(fileOnDrag.style);
        fileOnDrag.classList.remove("onDrag");
      }
    });
  };
}

class Icon extends File {
  constructor(count) {
    super(count);
  }
  addIcon = () => this.add("<li class='file icon'></li>");
}

class Folder extends File {
  constructor(count) {
    super(count);
  }
  addFolder = () => this.add("<li class='file folder'></li>");
}

class Window {}
