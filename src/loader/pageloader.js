import league from "./loadleague.js";

const loadPage = (page) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      const content = document.querySelector("#body-content");

      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
        // tambahkan blok if berikut
        if (page === "home") {
          console.log("Ready home page");
          league.getStandings();
        } else if (page === "scorers") {
          console.log("Ready scorers page");
          league.getScorers();
        } else if (page === "matches") {
          console.log("Ready matches page");
          league.getMatchesFinish();
          league.getMatchesSchedule();
        } else if (page === "clubs") {
          console.log("Ready clubs page");
          league.getClubs();
        } else if (page === "saved") {
          console.log("Saved item successfully");
          league.getSavedClub();
        }

        M.Tabs.init(document.querySelectorAll(".tabs"), {});
      } else if (this.status == 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
      }
    }
  };
  xhttp.open("GET", "./src/pages/" + page + ".html", true);
  xhttp.send();
};

export default loadPage;
