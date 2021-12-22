class File {
  #name;
  #content;
  #onEdit = "";
  constructor({ name, content }) {
    this.#name = name;
    this.#content = content;
  }
  getName = () => this.#name;
  getContent = () => this.#content;
  isEditing = (isEditing) => (this.#onEdit = isEditing);
  getEditedContent = () => this.#onEdit;
  setContent = (content) => (this.#content = content);
  getSavedState = () => ({ name: this.#name, content: this.#content });
}
export default File;
