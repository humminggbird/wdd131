document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("#nav-menu");
const filterTitle = document.querySelector("#filter-title");
const gallery = document.querySelector("#gallery");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        hamburger.textContent = "✕";
        hamburger.setAttribute("aria-label", "Close navigation menu");
    } else {
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "toggl navigation");
    }
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    //Add more temple objects here...
    {
        templeName: "Accra Ghana Temple",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
    },
    {
        templeName: "Apia Samoa Temple",
        location: "Apia, Samoa",
        dedicated: "1983, August, 5",
        area: 18691,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/apia-samoa-temple/apia-samoa-temple-13905.jpg"
    },
    {
        templeName: "Frankfurt Germany Temple",
        location: "Frankfurt, Germany",
        dedicated: "1987, August, 28",
        area: 32895,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/frankfurt-germany-temple/frankfurt-germany-temple-38924-main.jpg"
    }
];

function displayTemples(filteredTemples) {
    gallery.innerHTML = "";

    filteredTemples.forEach((temple) => {
        const card = document.createElement("article");
        card.classList.add("temple-card");

        card.innerHTML = `
            <h3>${temple.templeName}</h3>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" width="400" height="250">
        `;

        gallery.appendChild(card);
    });
}

navMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault();

        const filter = event.target.dataset.filter;
        let filtered = temples;
        let heading = "Home";

        if (filter === "old") {
            filtered = temples.filter((t) => Number(t.dedicated.split(",")[0]) < 1900);
            heading = "Old Temples";
        } else if (filter === "new") {
            filtered = temples.filter((t) => Number(t.dedicated.split(",")[0]) > 2000);
            heading = "New Temples";
        } else if (filter === "large") {
            filtered = temples.filter((t) => t.area > 90000);
            heading = "Large Temples";
        } else if (filter === "small") {
            filtered = temples.filter((t) => t.area < 10000);
            heading = "Small Temples";
        }

        filterTitle.textContent = heading;
        displayTemples(filtered);

        navMenu.classList.remove("open");
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "toggl navigation");
    }
});

displayTemples(temples);