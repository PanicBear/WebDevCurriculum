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
      return JSON.parse(file);
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
  deleteFile = (name) => {
    if (this.#storage[name]) {
      delete this.#storage[name];
      return true;
    }
    throw Error("파일을 삭제할 수 없습니다");
  };
}
export default Storage;
