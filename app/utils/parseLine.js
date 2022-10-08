function parseLine(line) {
    let o = {};
    /*
    busca parells de "", lo que hi ha dins es sucre
    */
    if ((line.split('"').length) % 2 !== 1){
        console.log(`Invalid number of double ticks`);
    }else {
        console.log(`valid number of double ticks`);
    }
    
    let lineArray = line.split(',');
    let i = 1;
    for (field of lineArray) {
        o[i] = field;
        i++;
    }
    return o;
}


module.exports = parseLine;