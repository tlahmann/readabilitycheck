import { sentenceCount, syllableCount, wordCount } from '../utils'

export function flesch(docContent: string): number {
    let fre = 0;

    const sc = sentenceCount(docContent);
    const wc = wordCount(docContent);
    const syc = syllableCount(docContent);

    // Calculate readability based on the Flesch Readability Ease formula
    fre = 206.835 - (1.015 * (wc / sc)) - (84.6 * (syc / wc));

    // Scores are always rounded up to the nearest integer
    return Math.ceil(fre);
}
