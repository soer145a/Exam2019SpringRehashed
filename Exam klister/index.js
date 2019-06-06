"use strict";
import ScrollReveal from "scrollreveal";

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector(".spilNuKnap").addEventListener("click", klik);

  ScrollReveal().reveal(".textKampange", { delay: 1000 });

  ScrollReveal().reveal(".ikoner", { delay: 1000 });
  ScrollReveal().reveal(".textReveal", { delay: 1000 });

  console.log("knappen er klikket");
}

function klik() {
  window.open("spil.html");
}
