function lineToJson(dict, line, storedEnclosedFields) {
    let json = {};
    let l = line.split(','); //parteix la linia per les comes

    if(l.length !== dict.length) return -1; //si la linia no te el nombre de fields correcte, retorna -1

    for (let i = 0; i < l.length; i++) { //junta les dues arrays per fer el json
        if (/^[0-9 ]*$/.test(l[i])){ //if field only contains numbers, dot and space it can be converted to number
            l[i] = Number.parseInt(l[i]);
        }else if (/^[0-9. ]*$/.test(l[i])){
            l[i] = Number.parseFloat(l[i]);
        } else if (l[i].match(/_storedEnclosedField#/)){
            let index = Number.parseInt(l[i].split('#')[1]);
            l[i] = storedEnclosedFields[index]
        }

        json[dict[i]] = l[i];
    }
    return json;
}

module.exports = lineToJson;