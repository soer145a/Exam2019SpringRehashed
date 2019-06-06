window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("INIT");
  fetchData();
}

function fetchData() {
  fetch(
    "https://examusers-4b00.restdb.io/rest/databaseuser?key=22631469345172666884",
    {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-apikey": "5cdbfbb9f66d7b1062cb34b7"
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      constructObj(data);
    });
}
function constructObj(data) {
  let objTemplate = document.querySelector("#myTemplate");
  let destination = document.querySelector("#container");

  data.forEach((obj, index) => {
    let klon = objTemplate.cloneNode(true).content;

    klon.querySelector("#fornavn").textContent = obj.fullName;
    klon.querySelector("#efternavn").textContent = obj.efternavn;
    klon.querySelector("#email").textContent = obj.email;
    klon.querySelector("#brugernavn").textContent = obj.username;
    klon.querySelector("#password").textContent = obj.password;
    klon.querySelector("#by").textContent = obj.city;
    klon.querySelector("#adresse").textContent = obj.adresse;
    klon.querySelector("#tlf").textContent = obj.telefoneNr;
    klon.querySelector("#cpr").textContent = obj.CPRnr;
    klon.querySelector("#userID").textContent = obj.userID;
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", `deleteIndex${index}`);
    let deleteButtonText = document.createElement("p");
    deleteButtonText.textContent = "Delete Me!";
    deleteButton.appendChild(deleteButtonText);
    deleteButton.addEventListener("click", () => {
      deleteTarget(obj);
    });
    klon.querySelector("#deletemebtn").appendChild(deleteButton);

    destination.appendChild(klon);
  });
}

function deleteTarget(obj) {
  console.log(obj);
  fetch(`https://examusers-4b00.restdb.io/rest/databaseuser/${obj._id}`, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-apikey": "5cdbfbb9f66d7b1062cb34b7"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.querySelector("#container").innerHTML = "";
      fetchData();
    });
}
