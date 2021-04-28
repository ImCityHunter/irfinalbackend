

function removeParenthesisText (text) {
    try {
        return text.replace(/ *\([^)]*\) */g, '');
    }
    catch (e){
        console.log("undefined input. 101");
        return undefined
    }
}


// https://stackoverflow.com/questions/51118115/how-to-remove-everything-after-a-certain-character-notepad
function removeAllAfter(text, mark){
    try{
        const regex = RegExp(mark+".*$");
        return text.replace(regex,"");
    } catch(e){
        console.log("undefined input. 102");
        return undefined;
    }

}


module.exports =  {
    removeParenthesisText, removeAllAfter
}