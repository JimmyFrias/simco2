export const capitalizeFirstLetterForWord = (parameter) => {
    let primeraLetra = parameter.charAt(0).toUpperCase();
    let restoPalabra = parameter.slice(1).toLowerCase();
    let resultado = primeraLetra + restoPalabra;
    return resultado;
};

export const capitalizeFirstLetter = (parameter) => {
    let words = parameter.split(' ');
    let wordsCapitalize = words.map(function (word) {
        return `${capitalizeFirstLetterForWord(word)} `;      
    });    
    return wordsCapitalize;
};