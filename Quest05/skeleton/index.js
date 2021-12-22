import Storage from "./domain/storage.js";
import Editor from "./presentation/editor.js";
import Explorer from "./presentation/explorer.js";
import Notepad from "./service/notepad.js";

document.addEventListener("DOMContentLoaded", () => {
  new Notepad(Storage, Editor, Explorer);
});
