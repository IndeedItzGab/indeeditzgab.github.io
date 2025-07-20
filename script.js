

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("exploreBtn").addEventListener("click", () => {
    const el = document.getElementById("pages-frame");
    const top = el.offsetTop;

    window.scrollTo({
      top: top,
      behavior: "smooth"
    });
  })
})