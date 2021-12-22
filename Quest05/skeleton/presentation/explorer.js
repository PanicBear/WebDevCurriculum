class Explorer {
  #root;
  #notepad;
  #list;
  constructor(fileListWrapper, notepad) {
    this.#root = fileListWrapper;
    this.#notepad = notepad;
    this.#list = this.#notepad.getFileList();
    this.#initList();
    this.#addEventHander();
  }
  #initList = () => {
    const items = Object.keys(this.#list).forEach(this.addItem);
  };
  #addEventHander = () => {
    this.#root.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("add-file")) {
        const name = prompt("생성할 파일명을 입력하세요");
        name && this.#notepad.createFile({ name, content: "" });
      } else if (target.classList.contains("delete-file")) {
        this.removeItem(target.parentElement.parentElement);
      }
    });
    this.#root.addEventListener('dblclick', (e)=>{
      const target = e.target;
      console.log(target);
      if(target.classList.contains('item-text')){
        const name = target.innerText;
        this.#notepad.openFile(name);
      }
    })
  };
  addItem = (name) =>{
    this.#root.insertAdjacentHTML(
      "beforeEnd",
      `<li class="file-item">
        <div class="item-text">${name}</div>
        <div class="item-button">
          <i class="far fa-trash-alt delete-file"></i>
        </div>
      </li>`
    );
  }
  removeItem = (item) => {
    this.#notepad.removeFile(item.innerText)
    this.#root.removeChild(item);
  }
}
export default Explorer;
