function lineToJson(dict, line, storedEnclosedFields) {
    let json = {};
    line = line.replace(/\r/g, '');
    let l = line.split(','); //parteix la linia per les comes

    if(l.length !== dict.length) return -1; //si la linia no te el nombre de fields correcte, retorna -1

    for (let i = 0; i < l.length; i++) { 
        if (/^[0-9 -]*$/.test(l[i])){ //if field only contains numbers it can be converted to number
            l[i] = Number.parseInt(l[i]);
        }else if (/^[0-9. -]*$/.test(l[i])){
            l[i] = Number.parseFloat(l[i]);
        } else if (l[i].match(/_storedEnclosedField#/)){
            let index = Number.parseInt(l[i].split('#')[1]); //theres likely a faster way to know the correct index, as the order this strings were stored is the same order they'll be assigned here
            l[i] = storedEnclosedFields[index]
        }

        json[dict[i]] = l[i]; //junta les dues arrays per fer el json
    }
    return json;
}

module.exports = lineToJson;