import { difficultWordCount, sentenceCount, wordCount } from '../utils'

export function daleChall(docContent: string): number {
    let daleChallRead = 0;

    const sc = sentenceCount(docContent);
    const wc = wordCount(docContent);
    const dwc = difficultWordCount(docContent, "dale-chall");

    let difficultWordPercentage = (dwc / sc) * 100;

    // Calculate readability based on the Dale-Chall Readability Formula
    daleChallRead = (0.1579 * difficultWordPercentage) + (0.0496 * (wc / sc))
    // Account for the raw score offset if the difficult word percentage is above 5%
    daleChallRead += (difficultWordPercentage > 5) ? 3.6365 : 0;

    // Return number with up to one decimal point
    return Number(daleChallRead.toFixed(1));
}
