

const currentYear = document.querySelector("#currentyear");

currentYear.textContent = new Date().getFullYear();




const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modified: ${document.lastModified}`;





const hamburger = document.querySelector(".hamburger");

const navigation = document.querySelector("nav");

hamburger.addEventListener("click", () => {

    navigation.classList.toggle("open");

    hamburger.classList.toggle("open");

    if (hamburger.classList.contains("open")) {
        hamburger.textContent = "✖";
    } else {
        hamburger.textContent = "☰";
    }

});