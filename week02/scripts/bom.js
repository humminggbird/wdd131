const inputElement = document.querySelector("#favchap");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("ul");

const bookOfMormonBooks = [
    "1 Nephi",
    "2 Nephi",
    "Jacob",
    "Enos",
    "Jarom",
    "Omni",
    "Words of Mormon",
    "Mosiah",
    "Alma",
    "Helaman",
    "3 Nephi",
    "4 Nephi",
    "Mormon",
    "Ether",
    "Moroni"
];

buttonElement.addEventListener("click", function () {

    const inputValue = inputElement.value.trim();

    if (inputValue !== "") {

        const bookName = inputValue.replace(/[0-9: ]/g, "").trim();

        let validBook = false;

        for (let i = 0; i < bookOfMormonBooks.length; i++) {
            if (inputValue.toLowerCase().includes(bookOfMormonBooks[i].toLowerCase())) {
                validBook = true;
            }
        }

        if (!validBook) {
            alert("Please enter a Book of Mormon chapter.");
            inputElement.focus();
            return;
        }

        if (listElement.children.length >= 10) {
            alert("You can only add 10 favorite chapters.");
            inputElement.focus();
            return;
        }

        let duplicate = false;

        const listItems = listElement.querySelectorAll("li");

        listItems.forEach(function (item) {
            const text = item.firstChild.textContent;

            if (text.toLowerCase() === inputValue.toLowerCase()) {
                duplicate = true;
            }
        });

        if (duplicate) {
            alert("That chapter is already in the list.");
            inputElement.focus();
            return;
        }

        const li = document.createElement("li");
        const deleteButtonElement = document.createElement("button");

        li.textContent = inputValue;

        deleteButtonElement.textContent = "❌";

        deleteButtonElement.setAttribute(
            "aria-label",
            `Remove ${inputValue}`
        );

        li.appendChild(deleteButtonElement);

        listElement.appendChild(li);

        deleteButtonElement.addEventListener("click", function () {

            listElement.removeChild(li);

            inputElement.focus();

        });

        inputElement.value = "";

        inputElement.focus();
    }

});