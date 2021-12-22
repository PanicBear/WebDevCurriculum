class Editor {
  #root;
  constructor(root) {
    this.#root = root;
  }
  addTab = (file) => {
    this.#root.insertAdjacentHTML(
      "beforeend",
      `<div class="file">
    <div class="file-header">
      <div class="file-header_text">
        ${file.getName()}
      </div>
      <div class="file-header_button">
        <i class="fas fa-times close-file"></i>
      </div>
    </div>
    <textarea class="file-content">${file.getContent()}</textarea>
  </div>`
    );
  };
}
export default Editor;
