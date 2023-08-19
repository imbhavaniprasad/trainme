const express = require("express");
// const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require('cors');
var bodyParser = require('body-parser')
// const dotenv = require('dotenv');
const app = express();
const { FaissStore } = require("langchain/vectorstores/faiss");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PDFLoader } =  require("langchain/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter,CharacterTextSplitter } = require("langchain/text_splitter");
const { HuggingFaceInferenceEmbeddings } = require("langchain/embeddings/hf");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
// const { Configuration, OpenAIApi } =require("openai");
const {updatePineCone} = require("./updatePineCone");
const {createPineConeIndex} = require("./createPineConeIndex");
const {connectDb} = require("./connectDb");
// const {queryPineConeVectorStore} = require("./quer")
const { OpenAI } = require("langchain/llms/openai");
const { loadQAStuffChain } = require("langchain/chains");
const { PineconeClient } = require('@pinecone-database/pinecone');
const { queryPineConeVectorStore } = require("./queryPineConeVectorStore");
const multer = require('multer');

require('dotenv').config();
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
const upload = multer();
const indexName="car-drivers";
const vectorDimension = 1536;
// app.use(connectDb);
// (async()=>{
//   await client.init({
//     apiKey: "61d6e20f-fc19-41cc-af92-c59bd8cd8ea0",
//     environment: "us-west1-gcp-free",
// });
//   await createPineConeIndex(client,indexName,vectorDimension);

//   // await updatePineCone(client,indexName,docs);

//   // await queryPineConeVectorStore(client,indexName,question)
// })
app.get('/', (req, res) => {   
    res.status(200).json("Hii");
})
// app.use(fileUpload());

// const configuration = new Configuration({
//   organization:'org-xjSP8G9wowfoHp3IxnV4sOVw',
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
app.post("/extract-text",upload.single('pdfFile'), async (req, res) => {
    // console.log("im called",req.files)
    const file = req.file;
//   const nameSpaceId = req.body.nameSpaceId;
    if (!file) {
        res.status(400);
        res.end();
    }
    // console.log("formdata",req.files.pdfFile)
    // const nameSpaceName = req.files.pdfFile.name.split(".")[0].replace(/_/g, '-');
    const client = new PineconeClient();

    await client.init({
        apiKey: "61d6e20f-fc19-41cc-af92-c59bd8cd8ea0",
        environment: "us-west1-gcp-free",
    });
          await createPineConeIndex(client,indexName,vectorDimension);
              const result = await updatePineCone(client,file,req);
              
          res.status(200).send({message : "Successfully Embedded"});
  
});
app.post("/get-answer",async(req,res)=>{
    try{
        const client = new PineconeClient();
        await client.init({
            apiKey: "61d6e20f-fc19-41cc-af92-c59bd8cd8ea0",
            environment: "us-west1-gcp-free",
        });
        // const nameSpaceName = req.files.pdfFile.name.split(".")[0].replace(/_/g, '-');
        // console.log("req.body",req.body)
        //   await createPineConeIndex(client,indexName,vectorDimension);
        const answer = await queryPineConeVectorStore(client,req.body.nameSpace,req.body.question);
        res.status(200).json({answer :answer});

    }
    catch(err){
        res.end();
    }

});
app.post("/delete-vectors",async(req,res)=>{
console.log("env value",process.env.PINECONE_INDEX_NAME)
        const client = new PineconeClient();

        await client.init({
            apiKey: "61d6e20f-fc19-41cc-af92-c59bd8cd8ea0",
            environment: "us-west1-gcp-free",
        });
        const index = client.Index('car-drivers');
        await index.delete1(req.body);
        res.status(200).json({message:'Success'})

})
app.post("/query-data",async(req,res)=>{
     const client = new PineconeClient();

        await client.init({
            apiKey: "61d6e20f-fc19-41cc-af92-c59bd8cd8ea0",
            environment: "us-west1-gcp-free",
        });
        const index = client.Index('car-drivers');
    // const queryRequest = {
    //     topK: 5,
    //     namespace: 'car-driving-rulesbf539e2e-21d8-49bd-bf10-b041f842a448'
    //   };
      const queryResponse = await index.fetch({
        ids: ['revise_1', 'revise_2'],
        namespace: 'car-driving-rulesbf539e2e-21d8-49bd-bf10-b041f842a448'});
      console.log("respose",queryResponse);
      res.send("Hi")
})
app.listen(5000,()=>{
    console.log("Listening at port 5000")
});