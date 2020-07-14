const setPreloader = (id) => {
  let setPreloaderHTML = `
  <div class="center-align">
      <div class="progress">
          <div class="indeterminate"></div>
      </div>
    <h5>Loading...</h5>
  </div>`;
  document.getElementById(id).innerHTML = setPreloaderHTML;
};

const removePreloader = (id, message) => {
  const setPreloaderHTML = `<h5>${message}</h5>`;

  document.getElementById(id).innerHTML = setPreloaderHTML;
};

export default {
  setPreloader,
  removePreloader,
};
