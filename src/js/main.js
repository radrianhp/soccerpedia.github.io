import match from "/src/loader/loadleague.js";
import db from "/src/js/db.js";

// REQUEST API
document.addEventListener("DOMContentLoaded", function () {
  match.getMatchesById();
  match.getClubById();
  match.getClubSquadById();

  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  const id = urlParams.get("id");

  const btnSave = document.getElementById("save");
  const btnDelete = document.getElementById("delete");

  const deleteMatch = match.getSavedClubId(parseInt(id));

  let isSaved = false;
  const checkSaved = () => {
    return new Promise((resolve) => {
      db.getById(urlParams.get("id")).then((data) => {
        if (data !== undefined) {
          isSaved = true;
        }
        console.log(isSaved);
        resolve(isSaved);
      });
    });
  };

  btnSave.onclick = () => {
    console.log("click save");

    match.getClubById().then((clubs) => {
      db.saveForLater(clubs);

      console.log("Succesfully");
    });
  };

  btnDelete.onclick = () => {
    console.log("click delete");

    deleteMatch.then((id) => {
      db.deleteForSaved(id);
      console.log("Succesfully");
    });
  };

  if (isFromSaved) {
    btnSave.style.display = "none";
    btnDelete.style.display = "block-inline";
  } else {
    btnDelete.style.display = "none";
    btnSave.style.display = "block-inline";
  }
  checkSaved().then((result) => {
    if (result) {
      btnSave.classList.add("disabled");
    } else {
      btnSave.classList.remove("disabled");
    }
  });
});
