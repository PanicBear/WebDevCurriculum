document.addEventListener("DOMContentLoaded", () => {
  const explorer = new Explorer(document.querySelector(".file-list"));
  const notepad = new Notepad(
    document.querySelector("#root"),
    explorer,
    new File()
  );
});

class Notepad {
  #notepad;
  #explorer;
  #file;
  #onEditList = {};
  constructor(target, explorer, file) {
    this.#notepad = target;
    this.#explorer = explorer;
    this.#file = file;
    this.#initEventHandler();
  }
  #initEventHandler = () => {
    this.#notepad.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("add-file")) {
        this.#explorer.addFile();
      } else if (target.classList.contains("delete-file")) {
        this.#explorer.removeFile(e.target.parentElement.parentElement.innerText);
      }
    });
    this.#notepad.addEventListener("dblclick", (e) => {
      const target = e.target;
      console.log(target);
      if (target.classList.contains("item-text")) {
        const file = JSON.parse(localStorage.getItem("files"))[
          target.textContent
        ];
        if (!this.#onEditList[target.textContent]) {
          this.#onEditList[file.name] = file;
        }
      }
    });
  };
  #deleteFile = () => {};
}

class Explorer {
  #storage;
  #root;
  constructor(fileList) {
    this.#root = fileList;
    this.#initStorage();
  }
  #initStorage = () => {
    this.#storage = localStorage;
    this.#storage.getItem("files") ??
      this.#storage.setItem("files", JSON.stringify({}));
    this.#onChange();
  };
  addFile = () => {
    const files = JSON.parse(this.#storage.getItem("files"));
    const name = prompt("생성할 파일의 이름을 입력하세요");
    if (name) {
      files[name] = { name, content: "" };
      this.#storage.setItem("files", JSON.stringify(files));
      this.#onChange();
    }
  };
  removeFile = (fileName) => {
    const files = JSON.parse(this.#storage.getItem("files"));
    delete files[fileName];
    console.log(fileName);
    this.#storage.setItem("files", JSON.stringify(files));
    this.#onChange();
  };
  #onChange = () => {
    console.log("onchange");
    const files = JSON.parse(this.#storage.getItem("files"));
    const items = Object.keys(files).map(
      (fileName) =>
        `<li class="file-item">
		<div class="item-text">${fileName}</div>
		<div class="item-button">
			<i class="far fa-trash-alt delete-file"></i>
		</div>
	</li>`
    );
    this.#root.innerHTML = items.join("");
  };
}

class File {
  #title = "";
  #content = "";
  updateFile(title, content) {
    this.#title = title;
    this.#content = content;
  }
  getFile = () => {
    return {
      title: this.#title,
      content: this.#content,
    };
  };
}
