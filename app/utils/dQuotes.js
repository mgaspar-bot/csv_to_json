str = `"hey david " how are you"`;
console.log(str);
console.log();

let count = 0;
for (let i = 0; i < str.length; i++) {
    if (str[i] === '"') {
        count++;
    }
}
console.log(count);

//First check that all dQuotes are properly closed
if (str.split('"').length % 2 !== 0) {
    console.log(`Properly closed`);
}



str = str.split('"');
for (let i = 0; i < str.length; i++) {
    if (str[i] === '') {
        str.splice(i, 1);
    }
}
console.log(str);
console.log();

for (part of str){
    console.log(`${part}  ${str.indexOf(part)}`);
}

/*
define delimiter:
    you can choose to use a semicolon as a delimiter
    by adding a field use_semicolons:"true" to the multi-part form
    body of the request
define dquote mode
    you can use dquote mode by adding a double_quotes:"true" field
    to the req, but then ALL fields must be completely enclosed by
    double quotes, as i'll look for ',"' (or ';"') and "\n as delimiters
*/