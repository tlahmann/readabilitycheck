export function sentenceCount(docContent: string): number {
    if (!docContent || !docContent.length) { return 0; }

    // Approximate sentence count by finding word, followed by punctuation (.?!) and whitespace or end of string
    // as well as any words that match : or just a linebreak at the end of an unpunctuated line (eg: lists)
    // TODO: account for Markdown tables?
    let sentenceCount = 0;
    sentenceCount = docContent.match(/\w[.?!](\s|$)/g)?.length;// + +docContent.match(/\w:?\n/g)?.length;

    // Return the count if more than zero sentences found, otherwise return 1
    return (sentenceCount > 0 ? sentenceCount : 1);
}
