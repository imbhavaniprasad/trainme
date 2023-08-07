const createPineConeIndex = async (client,indexName,vectorDimension)=>{
    console.log("indexname",process.env.PINECONE_INDEX_NAME);
    const existngIndexes = await client.listIndexes();
    if(!existngIndexes.includes(process.env.PINECONE_INDEX_NAME)){
        const createIndex = await client.createIndex(
            { createRequest : {
                name: process.env.PINECONE_INDEX_NAME,
                dimension: vectorDimension,
                metric:"cosine",
            }}
            );
            console.log("created INdex",createIndex)
            await new Promise((res)=>setTimeout(res, 5000));
    }
    else{
        console.log("index name already exists");
    }
}
exports.createPineConeIndex = createPineConeIndex;