import preloader from "./../component/preloader.js";
import db from "./../js/db.js";

const base_url = "https://api.football-data.org/v2/";

const fetchAPI = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "2e24b8085d784a149414359773a5727e",
    },
  });
};

// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
};

// Blok kode untuk memparsing json menjadi array JavaScript
const json = (response) => {
  return response.json();
};

// Blok kode untuk meng-handle kesalahan di blok catch
const error = (error) => {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
};

const getStandings = () => {
  preloader.setPreloader("standings");
  let isCached = false;
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2021/standings")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            loadStandingList(data);
          });
        }
        isCached = true;
      });
  }
  fetchAPI(base_url + "competitions/2021/standings")
    .then(status)
    .then(json)
    .then(function (data) {
      loadStandingList(data);
    })
    .catch(() => {
      if (isCached === false) {
        preloader.removePreloader(
          "standings",
          "No internet connection. Can't load data."
        );
      }
    });
};
// Blok kode untuk melakukan request data json
const getScorers = () => {
  preloader.setPreloader("scorers");
  let isCached = false;
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2021/scorers")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            loadScorersList(data);
          });
        }
        isCached = true;
      });
  }
  fetchAPI(base_url + "competitions/2021/scorers")
    .then(status)
    .then(json)
    .then(function (data) {
      loadScorersList(data);
    })
    .catch(() => {
      if (isCached === false) {
        preloader.removePreloader(
          "matches",
          "No internet connection. Can't load data."
        );
      }
    });
};

// Blok kode untuk melakukan request data json
const getMatchesFinish = () => {
  preloader.setPreloader("matches");
  let isCached = false;
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2021/matches?status=FINISHED&limit=10")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            loadMatchesList(data);
          });
          isCached = true;
        }
      });
  }
  fetchAPI(base_url + "competitions/2021/matches?status=FINISHED&limit=10")
    .then(status)
    .then(json)
    .then(function (data) {
      loadMatchesList(data);
    })
    .catch(() => {
      if (isCached === false) {
        preloader.removePreloader(
          "clubs",
          "No internet connection. Can't load data."
        );
      }
    });
};

// Blok kode untuk melakukan request data json
const getMatchesSchedule = () => {
  preloader.setPreloader("schedule");
  let isCached = false;
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2021/matches?status=SCHEDULED&limit=10")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            loadMatchesSchedule(data);
          });
        }
        isCached = true;
      });
  }
  fetchAPI(base_url + "competitions/2021/matches?status=SCHEDULED&limit=10")
    .then(status)
    .then(json)
    .then(function (data) {
      loadMatchesSchedule(data);
    })
    .catch(() => {
      if (isCached === false) {
        preloader.removePreloader(
          "clubs",
          "No internet connection. Can't load data."
        );
      }
    });
};

const getMatchesById = () => {
  return new Promise(function (resolve, reject) {
    preloader.setPreloader("detail-match");
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    let isCached = false;

    if ("caches" in window) {
      caches.match(base_url + "matches/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            loadGetMatchesID(data);
          });
          isCached = true;
        }
      });
    }
    fetchAPI(base_url + "matches/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        loadGetMatchesID(data);
        resolve(data);
        reject(() => {
          if (isCached === false) {
            preloader.removePreloader(
              "clubs",
              "No internet connection. Can't load data."
            );
          }
        });
      });
  });
};

const getClubs = () => {
  preloader.setPreloader("clubs");
  let isCached = false;
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2021/teams")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            loadClubList(data);
          });
        }
        isCached = true;
      });
  }
  fetchAPI(base_url + "competitions/2021/teams")
    .then(status)
    .then(json)
    .then(function (data) {
      loadClubList(data);
    })
    .catch(() => {
      if (isCached === false) {
        preloader.removePreloader(
          "clubs",
          "No internet connection. Can't load data."
        );
      }
    });
};

const getClubById = () => {
  return new Promise(function (resolve, reject) {
    preloader.setPreloader("club-info");
    let isCached = false;
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then((data) => {
            loadSavedClubID(data);
          });
        }
        isCached = true;
      });
    }
    fetchAPI(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        loadSavedClubID(data);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
        reject(() => {
          if (isCached === false) {
            preloader.removePreloader(
              "clubs",
              "No internet connection. Can't load data."
            );
          }
        });
      });
  });
};

const getClubSquadById = () => {
  return new Promise(function (resolve, reject) {
    preloader.setPreloader("club-squad");
    let isCached = false;
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            loadSquadID(data);
          });
        }
        isCached = true;
      });
    }
    fetchAPI(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        loadSquadID(data);
        resolve(data);
        reject(() => {
          if (isCached === false) {
            preloader.removePreloader(
              "clubs",
              "No internet connection. Can't load data."
            );
          }
        });
      });
  });
};

const getSavedClub = () => {
  preloader.setPreloader("saved");
  db.getAll().then(function (clubs) {
    loadSavedClub(
      clubs,
      `
    <h5>No saved Club here.</h5>
    `
    );
  });
};

const getSavedClubId = () => {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    db.getById(idParam).then((data) => {
      loadSavedClubID(data);
      resolve(data);
      reject(() => {
        if (isCached === false) {
          preloader.removePreloader(
            "clubs",
            "No internet connection. Can't load data."
          );
        }
      });
    });
  });
};

// ####################LOAD PAGES##########################################
const loadSquadID = (data) => {
  //data
  // Objek JavaScript dari response.json() masuk lewat variabel data.
  console.log(data);
  // Menyusun komponen card artikel secara dinamis
  let squadHTML = "";
  data.squad.forEach(function (data) {
    squadHTML += `
              <tr>
                <td>${data.name}</td>
                <td>${data.role}</td>
                <td>${data.position}</td>
                <td>${data.shirtNumber}</td>
                <td>${data.dateOfBirth}</td>
                <td>${data.nationality}</td>
              </tr>
              `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("club-squad").innerHTML = squadHTML;
};
const loadSavedClubID = (data) => {
  //data
  // Objek JavaScript dari response.json() masuk lewat variabel data.
  console.log(data);
  // Menyusun komponen card artikel secara dinamis
  let clubHTML = "";
  clubHTML += `
      <div class="col s12 m7">
      <h2 class="header">${data.name}</h2>
      <div class="card horizontal">
        <div class="card-image">
          <img src="${data.crestUrl}" alt="${data.name}">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p>
              <i class="material-icons">place</i>
              ${data.address}
              <i class="material-icons">email</i>
              ${data.email}
            </p>
          </div>
          <div class="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    </div>
              `;
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("club-info").innerHTML = clubHTML;
};
const loadSavedClub = (clubs, empty_message = ``) => {
  console.log(clubs);
  // Menyusun komponen card artikel secara dinamis
  let clubsHTML = "";
  if (clubs.length !== 0) {
    clubs.forEach(function (clubs) {
      clubsHTML += `
      <div class="col s12 m6">
      <div class="card waves-effect waves-yellow">        
        <a href="club-detail.html?id=${clubs.id}&saved=true">
          <div class="card-image">
            <img src="./src/image/stadium.jpg" alt=">${clubs.name}">
          </div>
          <div class="card-content center-align">
            <div class="club-logo">
              <img src="${clubs.crestUrl}" width="50px" class="circle">
            </div>
             <p>${clubs.name}</p>
             <p>${clubs.venue}</p>
          </div>
        </a>
      </div>
      </div>
                `;
    });
  } else {
    clubsHTML += `
    <div class="center-align">
        ${empty_message}
    </div>
    `;
  }
  // Sisipkan komponen card ke dalam elemen dengan id #body-content
  document.getElementById("saved").innerHTML = clubsHTML;
};
const loadClubList = (data) => {
  // Objek/array JavaScript dari response.json() masuk lewat data.
  // Menyusun komponen card artikel secara dinamis
  let teamsHTML = "";
  data.teams.forEach(function (data) {
    teamsHTML += `
              <div class="col s12 m4">
              <div class="card waves-effect waves-yellow">        
                <a href="club-detail.html?id=${data.id}">
                  <div class="card-image">
                    <img src="./src/image/stadium.jpg" alt="${data.name}">
                  </div>
                  <div class="card-content center-align">
                    <div class="club-logo">
                      <img src="${data.crestUrl}" width="40px" class="circle">
                    </div>
                     <p>${data.name}</p>
                  </div>
                </a>
              </div>
              </div>
                    `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("clubs").innerHTML = teamsHTML;
};
const loadScorersList = (data) => {
  // Objek/array JavaScript dari response.json() masuk lewat data.
  // Menyusun komponen card artikel secara dinamis
  let scorersHTML = "";
  data.scorers.forEach(function (table) {
    scorersHTML += `
                <tr>
                  <td>${table.player.name}</td>
                  <td>${
                    table.player.shirtNumber !== null
                      ? table.player.shirtNumber
                      : `-`
                  }</td>
                  <td>${table.player.position}</td>
                  <td>${table.team.name}</td>
                  <td>${table.numberOfGoals}</td>
                </tr>
                      `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("scorers").innerHTML = scorersHTML;
};
const loadStandingList = (data) => {
  // Objek/array JavaScript dari response.json() masuk lewat data.
  // Menyusun komponen card artikel secara dinamis
  let standingHTML = ``;
  data.standings[0].table.forEach(function (table) {
    standingHTML += `
              <tr>
                <td>${table.position}</td>
                <td><img src="${table.team.crestUrl}" width="25px" class="circle" alt="${table.team.name}">${table.team.name}</td>
                <td>${table.playedGames}</td>
                <td>${table.won}</td>
                <td>${table.draw}</td>
                <td>${table.lost}</td>
                <td>${table.goalsFor}</td>
                <td>${table.goalDifference}</td>
                <td>${table.points}</td>
              </tr>
                    `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("standings").innerHTML = standingHTML;
};
const loadGetMatchesID = (data) => {
  // Objek JavaScript dari response.json() masuk lewat variabel data.
  console.log(data);
  // Menyusun komponen card artikel secara dinamis
  let detailHTML = `
                <h2>MatchDay ${data.match.matchday} - ${data.match.competition.name}</h2>
    
                <p>${data.match.group}</p>
                <p>Start Match : ${data.match.season.startDate}</p>
                <p>End Match   : ${data.match.season.endDate}</p>
                <h3>FullTime</h3>
                  <ul class="collection">
                    <li class="collection-item">${data.head2head.homeTeam.name}<p class="secondary-content">${data.match.score.fullTime.homeTeam}</p></li>
                    <li class="collection-item">${data.head2head.awayTeam.name}<p class="secondary-content">${data.match.score.fullTime.awayTeam}</p></li>
                  </ul>
                <h3>HalfTime</h3>
                  <ul class="collection">
                    <li class="collection-item">${data.head2head.homeTeam.name}<p class="secondary-content">${data.match.score.halfTime.homeTeam}</p></li>
                    <li class="collection-item">${data.head2head.awayTeam.name}<p class="secondary-content">${data.match.score.halfTime.awayTeam}</p></li>
                  </ul>
    
              `;
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("detail-match").innerHTML = detailHTML;
  // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
};
const loadMatchesSchedule = (data) => {
  // Objek/array JavaScript dari response.json() masuk lewat data.
  // Menyusun komponen card artikel secara dinamis
  let matchesHtml = "";
  data.matches.forEach(function (table) {
    matchesHtml += `
      <div class="col s12 m6">
        <div class="card">
          <div class="card-image">
            <img src="./src/image/stadium.jpg" alt="${table.matchday}">
              <span class="card-title">MatchDay- ${table.matchday}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red" href="./detail.html?id=${
                  table.id
                }"><i class="material-icons">description</i></a>
          </div>
            <div class="card-content">
              <ul class="collection">
                <li class="collection-item">${table.homeTeam.name}
                  <p class="secondary-content">${
                    table.score.fullTime.homeTeam !== null
                      ? table.score.fullTime.homeTeam
                      : `-`
                  }</p></li>
                <li class="collection-item">${table.awayTeam.name}
                  <p class="secondary-content">${
                    table.score.fullTime.awayTeam !== null
                      ? table.score.fullTime.awayTeam
                      : `-`
                  }</p></li>
              </ul>
            </div>
        </div>
      </div>
      `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("schedule").innerHTML = matchesHtml;
};
const loadMatchesList = (data) => {
  let matchesHtml = ``;
  data.matches.forEach((table) => {
    matchesHtml += `
      <div class="col s12 m6">
        <div class="card waves-effect waves-yellow match-item" id="${table.id}"> 
        <a class="waves-effect waves-light" href="./detail.html?id=${table.id}">       
          <div class="card-image">
            <img src="./src/image/stadium.jpg" alt="${table.matchday}">
            <span class="card-title">MatchDay- ${table.matchday}</span>
          </div>
          <div class="card-content">
            <ul class="collection">
              <li class="collection-item">${table.homeTeam.name}<p class="secondary-content">${table.score.fullTime.homeTeam}</p></li>
              <li class="collection-item">${table.awayTeam.name}<p class="secondary-content">${table.score.fullTime.awayTeam}</p></li>
            </ul>
          </div>
        </a>
        </div>
      </div>
            `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("matches").innerHTML = matchesHtml;
};

export default {
  getStandings,
  getScorers,
  getMatchesFinish,
  getMatchesSchedule,
  getMatchesById,
  getClubs,
  getClubById,
  getSavedClub,
  getSavedClubId,
  getClubSquadById,
};
