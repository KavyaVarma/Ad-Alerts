let content = document.body.innerText

likelihood = 0;
sponsors = [];
sponsors_mentions = []

sponsored_regexes = [
                        /sponsored content/ig, 
                        /sponsored program/ig,
                        /sponsored post/ig,
                        /paid content/ig,
                        /paid program/ig,
                        /paid post/ig
                    ]

sponsored_regexes.forEach(regex => {
   if(content.match(regex) !== null)
        likelihood += 90;
});

sponsored_tokens = [
    /sponsored/ig, 
    /paid/ig,
    /sponsors/ig,
    /ad/ig
]

sponsored_tokens.forEach(regex => {
    if(content.match(regex) !== null)
        likelihood += 5;
});

sponsored_by_regexes = [
                        /presented by ?(?<sponsor>[^\.\n]*)[.|\n]/ig,
                        /partnered with ?(?<sponsor>[^\.\n]*)[.|\n]/ig,
                        /partnering with ?(?<sponsor>[^\.\n]*)[.|\n]/ig,
                        /sponsored by ?(?<sponsor>[^\.\n]*)[.|\n]/ig,
                        /sponsored by ?(?<sponsor>[^\.\n]*)[.|\n]/ig,
                        /paid for by ?(?<sponsor>[^\.\n]*)[.|\n]/ig,
                        /brought to you by ?(?<sponsor>[^\.\n]*)[.|\n]/ig
                       ]

var matches = []
sponsored_by_regexes.forEach( regex => {
    while (matches = regex.exec(content)) {
        if( matches !== null ) {
            if(matches[1].length > 30 )
                matches[1] = matches[1].split(" ")[0]
            sponsors.push(matches[1]);
            likelihood += 70;
        }
    }
});

sponsors.forEach(sponsor => {
    mentions = (content.match(RegExp(" "+sponsor+"[ \.,]", "ig")) || Array()).length
    sponsors_mentions.push([sponsor, mentions])
});

sponsors_mentions.sort(function(a, b) {
    return b[1] - a[1];
});

var sponsorship_result = {}
sponsorship_result.probability_sponsorship = Math.min(100, likelihood)
sponsorship_result.probable_sponsor = (sponsorship_result.probability_sponsorship < 30 ) ? "" : "Unknown Sponsor"
if(sponsors_mentions.length !== 0)
    sponsorship_result.probable_sponsor = sponsors_mentions[0][0]

chrome.runtime.sendMessage(sponsorship_result, function(response) { });
console.log(content)