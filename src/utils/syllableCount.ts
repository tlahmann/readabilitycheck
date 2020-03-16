export function syllableCount(docContent: string): number {
    if (!docContent || !docContent.length) { return 0; }
    
    let syllable = require('syllable');
    let syllableCount = 0;

    syllableCount = syllable(docContent);

    return syllableCount;
}
