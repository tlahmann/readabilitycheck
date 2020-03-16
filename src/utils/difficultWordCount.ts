export function difficultWordCount(docContent: string, vocabulary: string): number {
    if (!docContent || !docContent.length) { return 0; }
    
    switch (vocabulary) {
        case "dale-chall":
            var familiarWords = require('dale-chall');
            break;
        case "spache":
            var familiarWords = require('spache');
            break;
        default:
            return 0;
    }

    let difficultWordCount = 0;
    let wordList = Array();

    // Grab words from document
    wordList = docContent.match(/\w+/g);

    for (var i = 0; i < wordList.length; i++) {
        let word = wordList[i];
        difficultWordCount += (familiarWords.indexOf(word) > -1) ? 1 : 0;
    }

    return difficultWordCount;
}
