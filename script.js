// ============================
// HERO
// ============================

const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {
    heroTitle.textContent = "Welcome to World Explorer";
}

const heroDescription =
    document.querySelector(".hero p");

if (heroDescription) {
    heroDescription.textContent =
        "Explore the amazing countries of our world.";
}


// ============================
// FAVOURITES
// ============================

const savedFavourites =
    localStorage.getItem("favourites");

let favourites = [];

if (savedFavourites) {
    favourites = JSON.parse(savedFavourites);
}


async function favouriteCountry(country) {

    if (favourites.includes(country)) {

        console.log(
            country + " is already a favourite."
        );

        return;
    }

    favourites.push(country);

    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );

    console.log(favourites);


    // Send favourite to Flask backend

    try {

        const response = await fetch(
            "/api/favourites",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    country: country
                })
            }
        );


        if (!response.ok) {
            throw new Error(
                "Could not save favourite."
            );
        }


        const result =
            await response.json();

        console.log(
            country +
            " total favourites:",
            result.count
        );

    } catch (error) {

        console.error(
            "Favourite server error:",
            error
        );

    }
}


// ============================
// FAVOURITE BUTTON ANIMATION
// ============================

const favouriteButtons =
    document.querySelectorAll(".favourite-btn");

favouriteButtons.forEach((button) => {

    button.addEventListener(
        "click",
        function () {

            const star =
                button.querySelector(".star");

            const text =
                button.querySelector(".fav-text");


            if (!star || !text) {
                return;
            }


            text.style.visibility =
                "hidden";


            star.style.animation =
                "none";


            void star.offsetWidth;


            star.style.animation =
                "starMove 1.5s linear";


            setTimeout(function () {

                text.textContent =
                    "Favourited";

                text.style.visibility =
                    "visible";

            }, 1500);

        }
    );

});


// ============================
// COUNTRY DATA
// ============================

const nigeria = {
    capital: "Abuja",
    continent: "Africa",
    currency: "Naira"
};


const japan = {
    capital: "Tokyo",
    continent: "Asia",
    currency: "Yen"
};


const brazil = {
    capital: "Brasília",
    continent: "South America",
    currency: "Real"
};


const france = {
    capital: "Paris",
    continent: "Europe",
    currency: "Euro"
};


const australia = {
    capital: "Canberra",
    continent: "Oceania",
    currency: "Australian dollar"
};


const unitedKingdom = {
    capital: "London",
    continent: "Europe",
    currency: "Pound sterling"
};


// ============================
// MORE BUTTONS
// ============================

function showNigeria() {

    const details =
        document.getElementById(
            "nigeriaDetails"
        );

    if (!details) {
        return;
    }

    details.innerHTML =
        "Capital: " + nigeria.capital + "<br>" +
        "Continent: " + nigeria.continent + "<br>" +
        "Currency: " + nigeria.currency;
}


function showJapan() {

    const details =
        document.getElementById(
            "japanDetails"
        );

    if (!details) {
        return;
    }

    details.innerHTML =
        "Capital: " + japan.capital + "<br>" +
        "Continent: " + japan.continent + "<br>" +
        "Currency: " + japan.currency;
}


function showBrazil() {

    const details =
        document.getElementById(
            "brazilDetails"
        );

    if (!details) {
        return;
    }

    details.innerHTML =
        "Capital: " + brazil.capital + "<br>" +
        "Continent: " + brazil.continent + "<br>" +
        "Currency: " + brazil.currency;
}


function showFrance() {

    const details =
        document.getElementById(
            "franceDetails"
        );

    if (!details) {
        return;
    }

    details.innerHTML =
        "Capital: " + france.capital + "<br>" +
        "Continent: " + france.continent + "<br>" +
        "Currency: " + france.currency;
}


function showAustralia() {

    const details =
        document.getElementById(
            "australiaDetails"
        );

    if (!details) {
        return;
    }

    details.innerHTML =
        "Capital: " + australia.capital + "<br>" +
        "Continent: " + australia.continent + "<br>" +
        "Currency: " + australia.currency;
}


function showUnitedKingdom() {

    const details =
        document.getElementById(
            "unitedKingdomDetails"
        );

    if (!details) {
        return;
    }

    details.innerHTML =
        "Capital: " + unitedKingdom.capital + "<br>" +
        "Continent: " + unitedKingdom.continent + "<br>" +
        "Currency: " + unitedKingdom.currency;
}


// ============================
// SEARCH
// ============================

const searchInput =
    document.getElementById(
        "countrySearch"
    );

const clearSearch =
    document.getElementById(
        "clearSearch"
    );

const noResults =
    document.getElementById(
        "noResults"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const countryCards =
                document.querySelectorAll(
                    ".country-card"
                );


            let foundCountries = 0;


            countryCards.forEach((card) => {

                const countryName =
                    card.querySelector("h3");


                const name =
                    countryName.textContent
                        .toLowerCase();


                const matches =
                    name.includes(searchText);


                if (matches) {

                    card.style.display =
                        "";

                    foundCountries++;

                } else {

                    card.style.display =
                        "none";

                }

            });


            if (
                foundCountries === 0 &&
                searchText !== ""
            ) {

                noResults.textContent =
                    "No countries found.";

            } else {

                noResults.textContent =
                    "";

            }

        }
    );

}


// ============================
// CLEAR SEARCH
// ============================

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            searchInput.dispatchEvent(
                new Event("input")
            );

            searchInput.focus();

        }
    );

}

const themeButton = document.getElementById("themeButton");

let themeMode = "light";

themeButton.addEventListener("click", function() {

    if (themeMode === "light") {

        themeMode = "dark";

        document.body.classList.add("dark-mode");

        themeButton.textContent = "🌙 Dark Mode";
    }

else if (themeMode === "dark") {

    themeMode = "space";

    document.body.classList.remove("dark-mode");

    document.body.classList.add("space-mode");

    themeButton.textContent = "🌌 Space Mode";
}

else if (themeMode === "space") {

    themeMode = "ocean";

    document.body.classList.remove("space-mode");

    document.body.classList.add("ocean-mode");

    themeButton.textContent = "🌊 Ocean Mode";
}

else if (themeMode === "ocean") {

    themeMode = "light";

    document.body.classList.remove("ocean-mode");

    themeButton.textContent = "☀️ Light Mode";
}

});

const countryCards =
    document.querySelectorAll(".country-card");


countryCards.forEach(function(card) {

    card.addEventListener("click", function() {

        if (
            !document.body.classList.contains("space-mode")
        ) {
            return;
        }

        card.classList.remove("abducting");

        void card.offsetWidth;

        card.classList.add("abducting");

    });

});

const flagsMode = document.getElementById("flagsMode");
const explorersMode = document.getElementById("explorersMode");
const modeScreen = document.getElementById("modeScreen");

if (modeScreen) {

    const savedMode = localStorage.getItem("explorerMode");

    if (savedMode) {
        modeScreen.style.display = "none";
    }

}

if (flagsMode) {

    flagsMode.addEventListener("click", function() {

        localStorage.setItem("explorerMode", "flags");
        modeScreen.style.display = "none";

    });

}

if (explorersMode) {

    explorersMode.addEventListener("click", function() {

        localStorage.setItem("explorerMode", "explorers");
        window.location.href = "explorers.html";

    });

}