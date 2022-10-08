function generateDict (number_of_columns) {
    let dict = []
    for (let i = 0; i < number_of_columns; i++) {
        dict.push(`column_${i}`)
    }
    return dict;
}

module.exports = generateDict;