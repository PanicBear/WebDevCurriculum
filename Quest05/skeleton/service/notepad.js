class Notepad {
  #Storage;
  #Editor;
  #Explorer;
  constructor(Storage, Editor, Explorer) {
    this.#Storage = new Storage();
    this.#Editor = new Editor(document.querySelector(".editor"), this);
    this.#Explorer = new Explorer(document.querySelector(".explorer"), this);
  }
  createFile = ({ name, content }) => {
    const file = this.#Storage.createFile({ name, content });
    this.#Explorer.addItem(JSON.parse(file));
  };
  openFile = (name) => {
    const file = this.#Storage.readFile(name);
  };
}
export default Notepad;
