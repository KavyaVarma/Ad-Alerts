probability_bar = document.getElementById("probability-bar")
sponsor = document.getElementById("sponsor")

probability_colours = ["green", "yellow", "orange", "red", "red"];
probability_font_colours = ["white", "black", "white", "white"];

chrome.storage.sync.get("sponsorship_results", ({ sponsorship_results }) => {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        sponsorship_result = sponsorship_results[tabs[0].url];
        probability_bar.style["background-color"] = probability_colours[parseInt(sponsorship_result.probability_sponsorship/25)];
        probability_bar.style["color"] = probability_font_colours[parseInt(sponsorship_result.probability_sponsorship/25)];

        if(sponsorship_result.probability_sponsorship == 0) {
            probability_bar.style["color"] = "black"
        }

        probability_bar.style["width"] = sponsorship_result.probability_sponsorship+"%";
        probability_bar.innerText = sponsorship_result.probability_sponsorship+"%";

        sponsor.innerText = sponsorship_result.probable_sponsor;
    });
});




