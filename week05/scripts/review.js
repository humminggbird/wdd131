let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

reviewCount++;

localStorage.setItem("reviewCount", reviewCount);

const reviewCountDisplay = document.getElementById("reviewCount");

if (reviewCountDisplay) {
    reviewCountDisplay.textContent = reviewCount;
}

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.getElementById("lastModified");

if (lastModified) {
    lastModified.textContent = `Last Modified: ${ document.lastModified } `;
}
