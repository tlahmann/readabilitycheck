import { difficultWordCount, sentenceCount, wordCount } from '../utils'

export function spache(docContent: string): number {
    let spacheRead = 0;

    const sc = sentenceCount(docContent);
    const wc = wordCount(docContent);
    const dwc = difficultWordCount(docContent, 'space');

    // Calculate readability based on the Spache Readability Formula
    spacheRead = 0.659 + (0.121 * (wc / sc)) + (0.082 * ((dwc / wc) * 100));

    return Math.round(spacheRead);
}
