
const year = document.getElementById("currentyear");
year.textContent = new Date().getFullYear();


const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;