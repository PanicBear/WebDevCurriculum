class File {
  #name;
  #content;
  #onEdit = false;
  constructor({ name, content }) {
    this.#name = name;
    this.#content = content;
  }
  getName = () => this.#name;
  getContent = () => this.#content;
  isEditing = (isEditing) => (this.#onEdit = isEditing);
  isSaved = () => this.#onEdit;
  changeContent = (content) => (this.#content = content);
  getSavedState = () => ({ name: this.#name, content: this.#content });
}
export default File;
