"use strict";

window.addEventListener("DOMContentLoaded", init);
let userArray = [];
const front = document.querySelector("#formLogin");
const userData = document.querySelector("#formUserBlock");
const userInfo = document.querySelector("#formUserInfo");
const nemId = document.querySelector("#nemID");

function init() {
  fetchMyJson();
  console.log("init");
}
function fetchMyJson() {
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
      userArray = data;
      console.log(userArray);
      document
        .querySelector("#formUserButton")
        .addEventListener("click", displayFirstForm);
      document
        .querySelector("#formLoginButton")
        .addEventListener("click", () => {
          checkLoginStatus();
        });
    });
}
function checkLoginStatus() {
  console.log("CHECK LOGIN");
  let formUserName = document.querySelector("#formUsername").value;
  let formPassword = document.querySelector("#formPassword").value;
  console.log(formUserName);
  userArray.forEach(user => {
    if (formUserName == user.username) {
      if (user.password == formPassword) {
        window.location.replace("spil.html");
      }
    }
  });
}
function displayFirstForm() {
  front.style.display = "none";
  userData.style.display = "block";

  const dataObject = {
    username: "-placeholder-",
    password: "-placeholder-",
    email: "-placeholder-",
    telefoneNr: "-placeholder-",
    fornavn: "-placeholder-",
    efternavn: "-placeholder-",
    adresse: "-placeholder-",
    userID: "-placeholder-",
    city: "-placeholder-",
    CPRnr: "-placeholder-"
  };

  document
    .querySelector("#formUserBlockFormButton")
    .addEventListener("click", () => {
      console.log("CLIKED BUTTON");
      saveFirstSetOfData(dataObject);
    });
}
function saveFirstSetOfData(obj) {
  console.log("SAVE FIRST SET OF DATA");

  let usernameForm = document.querySelector("#userName");
  let userPassword = document.querySelector("#userPassword");
  let userPasswordTwo = document.querySelector("#userPasswordConfirm");
  let emailFormen = document.querySelector("#userEmail");

  let userCounter = 0;
  userArray.forEach(user => {
    console.log(user.username, usernameForm.value);
    if (user.username == usernameForm.value) {
      usernameForm.style.backgroundColor = "red";
    } else {
      console.log(usernameForm.checkValidity());
      if (usernameForm.checkValidity() != true) {
      } else {
        obj.username = usernameForm.value;

        if (
          document.querySelector("#userPassword").value ==
          document.querySelector("#userPasswordConfirm").value
        ) {
          obj.password = document.querySelector("#userPassword").value;
          if (user.email == obj.email) {
            emailFormen.style.backgroundColor = "red";
          } else {
            if (emailFormen.checkValidity() != true) {
              console.log(emailFormen.checkValidity());

              emailFormen.style.backgroundColor = "red";
            } else {
              obj.email = emailFormen.value;

              if (obj.telefoneNr == user.telefoneNr) {
              } else {
                obj.telefoneNr = document.querySelector("#userTlf").value;
                userCounter++;
                obj.userID = Math.random()
                  .toString(36)
                  .substr(2, 9);
              }
            }
          }
        } else {
          userPassword.style.backgroundColor = "red";
          userPasswordTwo.style.backgroundColor = "red";
        }
      }
    }
  });
  if (userCounter == userArray.length) {
    console.log("CORRECT");
    displaySecondForm(obj);
  } else {
  }
}
function displaySecondForm(obj) {
  console.log(obj);
  userData.style.display = "none";
  userInfo.style.display = "block";
  document
    .querySelector("#formUserInfoButton")
    .addEventListener("click", () => {
      saveSecondSetOfData(obj);
    });
}
function saveSecondSetOfData(obj) {
  obj.fornavn = document.querySelector("#userFirstName").value;
  obj.efternavn = document.querySelector("#userLastName").value;
  obj.adresse = document.querySelector("#userAdress").value;
  obj.city = document.querySelector("#userCity").value;
  let userCounter = 0;
  userArray.forEach(user => {
    if (user.CPRnr == obj.CPRnr) {
    } else {
      obj.CPRnr = document.querySelector("#userCpr").value;
      userCounter++;
    }
  });
  if (userCounter == userArray.length) {
    console.log("CORRECT");
    sendInfoToRest(obj);
  } else {
  }
}

function sendInfoToRest(obj) {
  console.log("SEND");
  nemId.style.display = "block";
  userInfo.style.display = "none";
  const postData = JSON.stringify(obj);
  console.log(postData);
  fetch("https://examusers-4b00.restdb.io/rest/databaseuser?", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cdbfbb9f66d7b1062cb34b7",
      "cache-control": "no-cache"
    },
    body: postData
  });
  fetchMyJson();
}
