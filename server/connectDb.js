const { PineconeClient } = require('@pinecone-database/pinecone');
const {createPineConeIndex} = require("./createPineConeIndex");
const connectDb = async (client)=>{
    const indexName = "revise_docs";
const vectorDimension = 1536;
    try{
        await client.init({
            apiKey: "61d6e20f-fc19-41cc-af92-c59bd8cd8ea0",
            environment: "us-west1-gcp-free",
        });
          await createPineConeIndex(client,indexName,vectorDimension);
          next();
    }catch(err){
        throw new Error("Hi");
    }

}
exports.connectDb = connectDb;