class Editor {
  #root;
  #notepad;
  #onEdit = {};
  constructor(root, notepad) {
    this.#root = root;
    this.#notepad = notepad;
    this.#addEventListener();
  }
  #addEventListener = () => {
    this.#root.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("close-file")) {
        const tab = target.parentElement.parentElement;
        this.closeTab(tab.innerText, "edit");
      }
    });
  };
  #removeWindow = (name) => {
    const fileInfo = this.#onEdit[name];
    fileInfo && fileInfo.element.remove();
  };
  #onTypeEvent = (e, name) => {
    const target = e.target;
    const icon = target.parentElement.querySelector("i.close-file");
    this.#onEdit[name].current = target.value;
    if (this.#onEdit[name].current !== this.#onEdit[name].content) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-circle");
    } else {
      icon.classList.remove("fa-circle");
      icon.classList.add("fa-times");
    }
  };
  addWindow = ({ name, content }) => {
    if (!this.#onEdit[name]) {
      const element = document.createElement("div");
      element.className = "file";
      element.insertAdjacentHTML(
        "beforeend",
        `<div class="file-header">
          <div class="file-header_text">
            ${name}
          </div>
          <div class="file-header_button close-file">
            <i class="fas fa-times close-file"></i>
          </div>
        </div>
        <textarea class="file-content">${content}</textarea>`
      );
      this.#root.append(element);
      element.addEventListener("keyup", (e) => this.#onTypeEvent(e, name));
      this.#onEdit[name] = { name, content, current: content, element };
    }
  };
  getOnEditList = () => this.#onEdit;
  closeTab = (name, action) => {
    console.log(this.#onEdit[name].current);
    const onEdit = this.#onEdit[name].content !== this.#onEdit[name].current;
    let msg;
    let cb;
    switch (action) {
      case "edit":
        msg = "작성중인 파일을 저장합니다";
        cb = () =>
          this.#notepad.editFile(name, name, this.#onEdit[name].current);
        break;
      case "delete":
        msg = "작성중인 파일을 삭제합니다";
        cb = () => console.log("ignore file change");
        break;
      default:
        throw new Error("unknown action");
    }
    if (!onEdit || (onEdit && confirm(msg))) {
      onEdit && cb();
      this.#removeWindow(name);
      delete this.#onEdit[name];
      return true;
    }
    throw Error("탭 닫기를 취소했습니다");
  };
}
export default Editor;
