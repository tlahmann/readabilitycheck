import { polysyllabicWordCount, sentenceCount, wordCount } from '../utils'

export function smog(docContent: string): number {
    let SMOGRead = 0;

    const sc = sentenceCount(docContent);
    const pwc = polysyllabicWordCount(docContent);

    // Calculate readability based on the Simple Measure of Gobbledygook (SMOG) Index
    SMOGRead = 3.1291 + (1.0430 * Math.sqrt(pwc * (30 / sc)));

    return Math.round(SMOGRead);
}
