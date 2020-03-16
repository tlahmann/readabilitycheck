export function polysyllabicWordCount(docContent: string): number {
    if (!docContent || !docContent.length) { return 0; }
    
    let syllable = require('syllable');
    let polysyllabicWordCount = 0;
    let wordList = Array();

    // Grab words from document
    wordList = docContent.match(/\w+/g);

    for (var i = 0; i < wordList.length; i++) {
        let word = wordList[i];
        polysyllabicWordCount += (syllable(word) >= 3) ? 1 : 0;
    }
    console.log("Polysyllabic words: " + polysyllabicWordCount);

    return polysyllabicWordCount;
}
