import { characterCount, sentenceCount, wordCount } from '../utils'

export function automatedReadability(docContent: string): number {
    let autoRead = 0;

    const sc = sentenceCount(docContent);
    const wc = wordCount(docContent);
    const cc = characterCount(docContent);

    // Calculate readability based on the Automated Readability Index formula
    autoRead = (4.71 * (cc / wc)) + (0.5 * (wc / sc)) - 21.43;

    // Scores are always rounded up to the nearest integer
    return Math.ceil(autoRead);
}
