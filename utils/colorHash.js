const colorHash = (inputString) => {

    let sum = 0;

    for (let i in inputString) {
        sum += inputString.charCodeAt(i);
    }

    let r = ~~(('0.' + Math.sin(sum + 1).toString().substr(6)) * 256);
    let g = ~~(('0.' + Math.sin(sum + 2).toString().substr(6)) * 256);
    let b = ~~(('0.' + Math.sin(sum + 3).toString().substr(6)) * 256);

    let rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    return { r: r, g: g, b: b, rgb: rgb };

};

export default colorHash;
