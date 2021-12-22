class Notepad {
  #Storage;
  #Editor;
  #Explorer;
  constructor(Storage, Editor, Explorer) {
    this.#Storage = new Storage();
    this.#Editor = new Editor(document.querySelector(".editor"), this);
    this.#Explorer = new Explorer(document.querySelector(".explorer"), this);
  }
  getFileList = () => this.#Storage.readAllFiles();
  createFile = ({ name, content }) => {
    const file = this.#Storage.createFile({ name, content });
    this.#Explorer.addItem(JSON.parse(file).name);
  };
  openFile = (name) => {
    const file = this.#Storage.readFile(name);
    this.#Editor.addWindow(file);
  };
  editFile = (originName, name, content) => {
    console.log(content);
    this.#Storage.updateFile(originName, { name, content });
    if (originName !== name) {
      this.#Explorer.removeItem(originName);
      this.#Explorer.addItem(name);
    }
  };
  removeFile = (name) => {
    this.#Editor.closeTab(name, "delete");
    this.#Storage.deleteFile(name);
  };
}
export default Notepad;
