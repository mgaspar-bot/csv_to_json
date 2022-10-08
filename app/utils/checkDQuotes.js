function checkDQuotes (str) {
    str = str.trim(); //Aixi la canvio??
    if (str.split('"').length % 2 === 0) throw new Error("you have unclosed double quotes")
    
    for(let i = 0; i < str.length; i++){
        if (str[i] === '"' ) {
            // console.log(`I found the quote at ${i}`);
            if (canBeEnclosingAField(str, i)){
                return searchCorrespondingClosingQuote(str, i)
            } else {
                throw new Error("first double quotes i found couldn't be enclosing a field. index"+i)
            }
        }
    }
    throw new Error("I ran through the string without finding an opening quote")
}

function canBeEnclosingAField (str, index) {
    if (index === 0) return true;
    if (str[index - 1] === '\n' || str[index -1] === ',') return true;
    return false;
}

function searchCorrespondingClosingQuote(str, index) {
    let i = index+1; //Here index has position of opening dquotes. I want to skip it because i already checked it
    for (i; i < str.length; i++){
        if (str[i] === '"' ) {
            if (!isEscapedQuote(str,i)){
                if (isClosingAField(str, i)){
                    return [index, i];
                } else {
                    throw new Error("After an opening quote, i found an unescaped dquote which was not enclosing a field. index"+i+str[i+1])
                }
            }else { //if it WAS an escaped quote, salta't seguent caracter, que sera una quote que no ens interessa
                i++;
            } 
        }
    }
    throw new Error("i ran through the string without finding a closing quote (having found an opening quote)")
}

function isEscapedQuote(str, index) {
    if(str[index + 1] === '"'){
        return true;
    }else {
        return false;
    }
}

function isClosingAField(str, index) {
    // console.log(index+1);
    if(index+1 === str.length
        || str[index+1] === ',' 
        || str[index+1] === '\n')
    {
        return true
    }else {
        return false
    }

}

module.exports = checkDQuotes;

/*
I'm trying to implement these rules:


Each field may or may not be enclosed in 
double quotes (however some programs, such 
as Microsoft Excel, do not use double 
quotes at all).  
If fields are not enclosed with double quotes,
then double quotes may not appear inside the fields.  For example:\

    “aaa”,“bbb”,“ccc” CRLF
    zzz,yyy,xxx

Fields containing line breaks (CRLF), double quotes,
 and commas should be enclosed in double-quotes.
For example:

    “aaa”,“b CRLF
    bb”,“ccc” CRLF
    zzz,yyy,xxx

If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote.  For example:

    “aaa”,“b"“bb”,“ccc”

found here
    https://docs.fileformat.com/spreadsheet/csv/
*/
