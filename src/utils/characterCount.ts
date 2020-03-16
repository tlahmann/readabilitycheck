export function characterCount(docContent: string): number {
    if (!docContent || !docContent.length) { return 0; }

    // Strip all whitespace characters
    docContent = docContent.replace(/\s+/g, '');

    let charCount = 0;
    charCount = docContent?.length;

    return charCount;
}
