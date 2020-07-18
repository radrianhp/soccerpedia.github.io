import loadNav from "././navloader.js";
import loadPage from "././pageloader.js";

document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  // Load page content
  let page = window.location.hash.substr(1);
  if (page === "") page = "home";
  console.log(page);
  loadPage(page);
});
