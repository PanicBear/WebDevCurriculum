class Explorer {
  #root;
  #notepad;
  #list = {};
  constructor(root, notepad) {
    this.#root = root;
    this.#notepad = notepad;
    this.#addEventHander();
  }

  #addEventHander = () => {
    this.#root.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("add-file")) {
        const name = prompt("생성할 파일명을 입력하세요");
        name && this.#notepad.createFile({ name, content: "" });
      }
    });
  };
  addItem = ({ name, content }) => {
    this.#list[name] = { name, content };
    console.log(this.#list);
  };
}
export default Explorer;
