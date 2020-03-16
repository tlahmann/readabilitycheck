import { sentenceCount, syllableCount, wordCount } from '../utils'

export function fleschKincaid(docContent: string): number {
    let fleschKincaidRead = 0;

    const sc = sentenceCount(docContent);
    const wc = wordCount(docContent);
    const syc = syllableCount(docContent);

    // Calculate readability based on the Flesch-Kincaid Grade Level formula
    fleschKincaidRead = (0.39 * (wc / sc)) + (11.8 * (syc / wc)) - 15.59;

    return Math.round(fleschKincaidRead);
}
