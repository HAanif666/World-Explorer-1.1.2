// ============================
// ADD COUNTRY
// ============================

const countryName =
    document.getElementById(
        "countryName"
    );

const countryCapital =
    document.getElementById(
        "countryCapital"
    );

const countryCurrency =
    document.getElementById(
        "countryCurrency"
    );

const addButton =
    document.getElementById(
        "addCountry"
    );

const countryList =
    document.getElementById(
        "countryList"
    );


// ============================
// ADD COUNTRY BUTTON
// ============================

if (addButton) {

    addButton.addEventListener(
        "click",
        function () {

            const name =
                countryName.value.trim();

            const capital =
                countryCapital.value.trim();

            const currency =
                countryCurrency.value.trim();


            if (
                name === "" ||
                capital === "" ||
                currency === ""
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


            const country = {
                name,
                capital,
                currency
            };


            countryList.innerHTML += `

                <div class="admin-country">

                    <h3>
                        ${country.name}
                    </h3>

                    <p>
                        Capital:
                        ${country.capital}
                    </p>

                    <p>
                        Currency:
                        ${country.currency}
                    </p>

                </div>

            `;


            countryName.value = "";
            countryCapital.value = "";
            countryCurrency.value = "";

        }
    );

}


// ============================
// FAVOURITE COUNTS
// ============================

const favouriteCounts =
    document.getElementById(
        "favouriteCounts"
    );


async function loadFavouriteCounts() {

    if (!favouriteCounts) {
        return;
    }


    try {

        const response =
            await fetch(
                "/api/favourites"
            );


        if (!response.ok) {
            throw new Error(
                "Failed to load favourites."
            );
        }


        const favourites =
            await response.json();


        favouriteCounts.innerHTML =
            "";


        const countries =
            Object.entries(
                favourites
            );


        if (countries.length === 0) {

            favouriteCounts.innerHTML =
                "<p>No favourites yet.</p>";

            return;
        }


        countries.forEach(
            ([country, count]) => {

                favouriteCounts.innerHTML += `

                    <div class="favourite-count-card">

                        <h3>
                            ${country}
                        </h3>

                        <p>
                            ⭐
                            ${count}
                            favourite${count === 1 ? "" : "s"}
                        </p>

                    </div>

                `;

            }
        );


    } catch (error) {

        favouriteCounts.innerHTML =
            "<p>Could not load favourite counts.</p>";

        console.error(error);

    }

}


loadFavouriteCounts();