class Storage {
  #storage = localStorage;
  constructor() {}
  createFile = ({ name, content }) => {
    if (!this.#storage[name]) {
      this.#storage[name] = JSON.stringify({ name, content });
      return this.#storage[name];
    } else {
      throw Error("이미 존재하는 파일명입니다");
    }
  };
  readAllFiles = () => ({ ...this.#storage });
  readFile = (name) => {
    const file = this.#storage[name];
    if (file) {
      return file;
    }
    throw Error("파일을 불러올 수 없습니다");
  };
  updateFile = (originName, { name, content }) => {
    if (this.#storage[originName]) {
      delete this.#storage[originName];
      this.#storage[name] = JSON.stringify({ name, content });
      return true;
    }
    throw Error("파일을 갱신할 수 없습니다");
  };
  deleteFile = (name, onEdit, removeTabCb) => {
    if (this.#storage[name]) {
      if (!onEdit || (onEdit && confirm("작성중인 파일을 삭제하시겠습니까?"))) {
        removeTabCb();
        delete this.#storage[name];
        return true;
      }
    }
    throw Error("파일을 삭제할 수 없습니다");
  };
}
export default Storage;
