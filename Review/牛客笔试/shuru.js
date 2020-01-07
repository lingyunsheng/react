
var getPerfectArranges = function(str) {
    if(typeof str !== "string") return0;
    var strArray = str.split("");
    // 出现了多少个不同字母
    var letters = {};
    strArray.forEach(o => {
        if(letters[o] === undefined) {
            letters[o] = 1;
        } else{
            letters[o] ++;
        }
    })
    var letterCount = Object.keys(letters).length;
    if(letterCount === 1) return 1;
    if(letterCount === 2) return 2;
    if(letterCount > 2) return 0;
}
 
getPerfectArranges("ABAB")