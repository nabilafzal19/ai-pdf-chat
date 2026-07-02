const chunkText =(
    text,
    chunkSize = 500,
    overlap =100
)=>{
const words = text.split(/\s+/);
const chunks = [];

 let start = 0;
    let id = 1;

    while(start<words.length){

        const end = start + chunkSize;

        const chunkWords = words.slice(start,end)

        chunks.push({
            id,
            text:chunkWords.join(" "),
            wordCount : chunkWords.length,
            startWord: start,
          endWord: Math.min(end - 1, words.length - 1)
        })
        id++;

        start += chunkSize -overlap;
    }
    return chunks
}

module.exports = {
    chunkText
}