export const articles = Object.freeze({
    f: {
        def: 'die',
        undef: 'eine'
    },
    m: {
        def: 'der',
        undef: 'ein'
    },
    n: {
        def: 'das',
        undef: 'ein'
    }
});

export function startSentence(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
};