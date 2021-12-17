document.addEventListener("DOMContentLoaded", () => {
  // quest1();
  quest2();
});

function quest1() {
  const lines = parseInt(prompt("출력할 줄 갯수를 입력하세요"));
  let str = "";
  for (let i = 0; i < lines; i++) {
    for (let j = 1; j < lines * 2; j++) {
      str += Math.abs(j - lines) <= i ? "*" : " ";
    }
    str += "\n";
  }
  console.log(str);
}

function quest2() {
  document.addEventListener("click", (e) => {
    const target = e.target;
    switch (target.parentNode.className) {
      case "row1":
        if (target.style.backgroundColor === "yellow") {
          target.style.backgroundColor = "";
        } else {
          target.style.backgroundColor = "yellow";
        }
        break;
      case "row2":
        if (target.classList.contains("enabled")) {
          target.classList.remove("enabled");
        } else {
          target.classList.add("enabled");
        }
        break;
    }
  });
}
