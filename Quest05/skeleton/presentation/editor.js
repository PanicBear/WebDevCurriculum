class Editor {
  #root;
  #notepad;
  constructor(root, notepad) {
    this.#root = root;
    this.#notepad = notepad;
  }
  openFile = () => {};
}
export default Editor;
