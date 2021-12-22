import Editor from "./editor.js";
import Explorer from "./explorer.js";
import File from "./file.js";

document.addEventListener("DOMContentLoaded", () => {
  const explorer = new Explorer(document.querySelector(".file-list"));
  const editor = new Editor(document.querySelector(".editor"));
  const notepad = new Notepad(
    document.querySelector("#root"),
    explorer,
    editor,
    File
  );
});

class Notepad {
  #notepad;
  #explorer;
  #editor;
  #File;
  #openedTab = {};
  constructor(target, explorer, editor, File) {
    this.#notepad = target;
    this.#explorer = explorer;
    this.#editor = editor;
    this.#File = File;
    this.#initEventHandler();
  }
  #initEventHandler = () => {
    this.#notepad.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("add-file")) {
        this.#explorer.createFile();
      } else if (target.classList.contains("delete-file")) {
        this.#explorer.deleteFile(
          e.target.parentElement.parentElement.innerText
        );
      }
    });
    this.#notepad.addEventListener("dblclick", (e) => {
      const target = e.target;
      if (target.classList.contains("item-text")) {
        const file = new this.#File(
          this.#explorer.readFile(target.textContent)
        );
        if (this.#openedTab[file.getName()] === undefined) {
          this.#editor.addTab(file);
          this.#openedTab[file.getName()] = file;
        }
      }
    });
  };
}
