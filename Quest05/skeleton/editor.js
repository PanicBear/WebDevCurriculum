class Editor {
  #root;
  #openedTab = {};
  #explorer;
  constructor(root, explorer) {
    this.#root = root;
    this.#explorer = explorer;
  }
  addTab = (file) => {
    if (!this.#openedTab[file.getName()]) {
      const tab = document.createElement("div");
      tab.className = "file";
      tab.insertAdjacentHTML(
        "afterbegin",
        `<div class="file-header">
          <div class="file-header_text">
            ${file.getName()}
          </div>
          <div class="file-header_button close-file">
            <i class="fas fa-times close-file"></i>
          </div>
        </div>
        <textarea class="file-content">${file.getContent()}</textarea>`
      );
      this.#root.insertAdjacentElement("beforeend", tab);
      this.#openedTab[file.getName()] = { file, tab };
      this.#initTabEvent(file.getName());
    }
  };
  getOpenedTab = () => this.#openedTab;
  #tabClickHandler = (e, name) => {
    const target = e.target;
    const tab = this.#openedTab[name].tab;
    if (target.classList.contains("close-file")) {
      if (!this.#openedTab[name].file.getEditedContent()) {
        tab.remove();
        this.#removeTabEvent(name);
        delete this.#openedTab[name];
      } else {
        const granted = confirm("변경을 저장 후 창을 닫으시겠습니까?");
        if (granted) {
          tab.remove();
          this.#removeTabEvent(name);
          this.#explorer.updateFile({
            name,
            content: this.#openedTab[name].file.getEditedContent(),
          });
          delete this.#openedTab[name];
        }
      }
    }
  };
  #tabTypeHandler = (e, name) => {
    const target = e.target;
    if (target.value !== this.#openedTab[name].file.getContent()) {
      const closeIcon = this.#openedTab[name].tab.querySelector(".fa-times");
      closeIcon && closeIcon.classList.remove("fa-times");
      closeIcon && closeIcon.classList.add("fa-circle");
      this.#openedTab[name].file.isEditing(target.value);
    } else {
      const onEditIcon = this.#openedTab[name].tab.querySelector(".fa-circle");
      onEditIcon && onEditIcon.classList.remove("fa-circle");
      onEditIcon && onEditIcon.classList.add("fa-times");
      this.#openedTab[name].file.isEditing("");
    }
  };
  #initTabEvent = (name) => {
    this.#openedTab[name].tab.addEventListener("click", (e) =>
      this.#tabClickHandler(e, name)
    );
    this.#openedTab[name].tab
      .querySelector(".file-content")
      .addEventListener("keyup", (e) => this.#tabTypeHandler(e, name));
  };
  #removeTabEvent = (name) => {
    this.#openedTab[name].tab.removeEventListener("click", (e) =>
      this.#tabClickHandler(e, name)
    );
    this.#openedTab[name].tab
      .querySelector(".file-content")
      .removeEventListener("keyup", (e) => this.#tabTypeHandler(e, name));
  };
}
export default Editor;
