window.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".hamburger");
  const fon = document.querySelector(".blur");
  const menu = fon.querySelector(".menu");
  const menuClose = menu.querySelector(".menu__close");
  const levels = document.querySelectorAll(".level");

  menuButton.addEventListener("click", (e) => {
    e.preventDefault();
    fon.classList.remove("hidden");
    menu.classList.add("menu_active");
    document.body.style.overflow = "hidden";
  });

  menuClose.addEventListener("click", () => {
    menu.classList.remove("menu_active");
    fon.classList.add("hidden");
    document.body.style.overflow = "";
  });
  function initProgressBars() {
    levels.forEach((level) => {
      let val = level.querySelector(".level__percent");
      let pb = level.querySelector(".level__line_progress");
      pb.style.width = val.innerHTML;
      pb.style.background = "#FFA501";
    });
  }
  initProgressBars();
});
