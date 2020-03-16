export function wordCount(docContent: string): number {
    if (!docContent || !docContent.length) { return 0; }

    let wordCount = 0;
    wordCount = docContent.match(/\w+/g)?.length

    return wordCount;
}
