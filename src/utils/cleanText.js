const cleanText = (text) => {

    return text
        .replace(/\r/g, "")
        .replace(/\t/g, " ")
        .replace(/\n{2,}/g, "\n")
        .replace(/[ ]{2,}/g, " ")
        .trim();

}

module.exports = {cleanText};