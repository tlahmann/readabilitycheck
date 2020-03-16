import { characterCount, sentenceCount, wordCount } from '../utils'

export function colemanLiau(docContent: string): number {
    let colemanLiauRead = 0;

    const sc = sentenceCount(docContent);
    const wc = wordCount(docContent);
    const cc = characterCount(docContent);

    // Calculate readability based on the Coleman-Liau index formula
    // https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index
    colemanLiauRead = (0.0588 * ((cc / wc) * 100)) - (0.296 * ((sc / wc) * 100)) - 15.8

    // Scores are always rounded to the nearest integer
    return Math.round(colemanLiauRead);
}
