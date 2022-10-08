function lineToJson(dict, line) {
    let json = {};
    let l = line.split(','); //parteix la linia per les comes
    if(l.length !== dict.length) return -1; //si la linia no te el nombre de fields correcte, retorna -1

    for (let i = 0; i < l.length -1; i++) { //junta les dues arrays per fer el json
        json[dict[i]] = l[i];
    }
    return json;
}

module.exports = lineToJson;