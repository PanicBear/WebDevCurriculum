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
  createFile = () => {
    const files = JSON.parse(this.#storage.getItem("files"));
    const name = prompt("생성할 파일의 이름을 입력하세요");
    if (name) {
      files[name] = { name, content: "" };
      this.#storage.setItem("files", JSON.stringify(files));
      this.#onChange();
    }
  };
  updateFile = ({ name, content }) => {
    const files = JSON.parse(this.#storage.getItem("files"));
    console.log(content);
    files[name].content = content;
    console.log(files[name]);
    this.#storage.setItem("files", JSON.stringify(files));
  };
  readFile = (name) => JSON.parse(this.#storage.getItem("files"))[name];
  deleteFile = (fileName) => {
    const files = JSON.parse(this.#storage.getItem("files"));
    delete files[fileName];
    this.#storage.setItem("files", JSON.stringify(files));
    this.#onChange();
  };
}
export default Explorer;
