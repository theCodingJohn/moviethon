window.onload = getValues;
// Seach movie
const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("keyup", (e) => {
  const searchValue = searchBar.value.toLowerCase();
  const movieRow = tableBody.querySelectorAll("tr");
  movieRow.forEach((row) => {
    const movieTitle = row.firstElementChild.textContent;
    if (movieTitle.toLowerCase().indexOf(searchValue) !== -1) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
});

// Add movie to watchlist
const addForm = document.querySelector("#add-form");

function createElement(e) {
  if (e.keyCode === 13 || e.target.classList.contains("add-button")) {
    const movieTitleValue = addForm
      .querySelector('input[type="text"]')
      .value.trim();
    const releasedYearValue = addForm.querySelector('input[type="number"]')
      .value;

    if (!movieTitleValue) {
      openModal2();
      closeButton.onclick = () => openModal2();
    } else {
      openModal();

      yesButton.onclick = () => {
        // addButtonAnswer = true;
        const tableBody = document.querySelector("#watchlist-section tbody");

        // Create element
        const tr = document.createElement("tr");
        const movieTitleTable = document.createElement("td");
        const movieTitleInput = document.createElement("input");
        const movieTitle = document.createElement("span");
        const releasedYearTable = document.createElement("td");
        const releasedYearInput = document.createElement("input");
        const releasedYear = document.createElement("span");
        const parentButtonWrapper = document.createElement("td");
        const buttonWrapper = document.createElement("div");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        // Add content
        movieTitle.textContent = movieTitleValue;
        releasedYear.textContent = releasedYearValue;
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        // Add class
        movieTitleInput.classList.add("d-none", "table-input");
        movieTitle.classList.add("movie-title");
        releasedYearInput.classList.add("d-none", "table-input");
        releasedYear.classList.add("movie-title");
        buttonWrapper.classList.add("button-wrapper");
        editButton.classList.add("edit-button");
        deleteButton.classList.add("delete-button");
        // Set Attribute
        movieTitleInput.setAttribute("type", "text");
        releasedYearInput.setAttribute("type", "number");
        // Append element
        tr.appendChild(movieTitleTable);
        movieTitleTable.appendChild(movieTitleInput);
        movieTitleTable.appendChild(movieTitle);
        tr.appendChild(releasedYearTable);
        releasedYearTable.appendChild(releasedYearInput);
        releasedYearTable.appendChild(releasedYear);
        tr.appendChild(parentButtonWrapper);
        parentButtonWrapper.appendChild(buttonWrapper);
        buttonWrapper.appendChild(editButton);
        buttonWrapper.appendChild(deleteButton);
        tableBody.appendChild(tr);

        store();

        addForm.reset();
        openModal();
      };

      noButton.onclick = () => openModal();
    }
  }
}

addForm.addEventListener("click", createElement);
addForm.addEventListener("keyup", createElement);

// Remove to watchlist
const tableBody = document.querySelector("tbody.table-body");

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    openModal();
    yesButton.onclick = () => {
      deleteButtonAnwer = true;
      e.target.parentNode.parentNode.parentNode.remove();
      store();
      openModal();
    };
    noButton.onclick = () => {
      openModal();
    };
  }
});

// Edit content
const editMovieTitle = tableBody.querySelector(".movie-title");
const editReleasedYear = tableBody.querySelector(".released-year");

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-button")) {
    const releasedYearInput =
      e.target.parentElement.parentElement.previousElementSibling
        .firstElementChild;
    const movieTitleInput =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.firstElementChild;
    releasedYearInput.classList.toggle("d-none");
    releasedYearInput.nextElementSibling.classList.toggle("d-none");
    movieTitleInput.classList.toggle("d-none");
    movieTitleInput.nextElementSibling.classList.toggle("d-none");

    // Set attribut to input field
    releasedYearInput.setAttribute(
      "value",
      releasedYearInput.nextElementSibling.textContent.toUpperCase()
    );
    movieTitleInput.setAttribute(
      "value",
      movieTitleInput.nextElementSibling.textContent.toUpperCase()
    );

    // Change movie title and released year values
    movieTitleInput.nextElementSibling.textContent = movieTitleInput.value;
    releasedYearInput.nextElementSibling.textContent = releasedYearInput.value;

    store();
  }
});

//Function for modal
const modal = document.querySelector("#myModal");
const addButton = addForm.querySelector(".add-button");
const yesButton = modal.querySelector(".yesButton");
const noButton = modal.querySelector(".noButton");

let addButtonAnswer = false;
let deleteButtonAnwer = false;

function openModal() {
  modal.classList.toggle("d-none");
}

const modal2 = modal.nextElementSibling;
const closeButton = modal2.querySelector(".closeButton");
function openModal2() {
  modal2.classList.toggle("d-none");
}

// Store data to local storage
function store() {
  window.localStorage.myitems = tableBody.innerHTML;
}

// Get data from local storage
function getValues() {
  let storedValues = window.localStorage.myitems;
  if (!storedValues) {
    tableBody.innerHTML = `<tr><td><input class="table-input d-none" type="text" value="INTERSTELLAR"><span class="movie-title">INTERSTELLAR</span></td><td><input class="table-input d-none" type="number" value=""><span class="movie-title">2014</span></td><td><div class="button-wrapper"><button class="edit-button">Edit</button><button class="delete-button">Delete</button></div></td></tr>`;
  } else {
    tableBody.innerHTML = storedValues;
  }
}
