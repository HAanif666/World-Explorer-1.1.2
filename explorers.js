const explorers = [
    {
        name: "Christopher Columbus",
        details: "His 1492 voyage crossed the Atlantic under the Spanish crown."
    },

    {
        name: "Ibn Battuta",
        details: "He travelled across large parts of Africa, Asia and Europe."
    },

    {
        name: "James Cook",
        details: "He made several major voyages across the Pacific."
    }
];


const moreButtons =
    document.querySelectorAll(".more-btn");

const explorerCards =
    document.querySelectorAll(".explorer-card");


moreButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {

        const details =
            explorerCards[index]
                .querySelector(".explorer-details");

        details.textContent =
            explorers[index].details;

    });

});
