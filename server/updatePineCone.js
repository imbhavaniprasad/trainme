const {
  RecursiveCharacterTextSplitter,
  CharacterTextSplitter,
} = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { HuggingFaceInferenceEmbeddings } = require("langchain/embeddings/hf");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const pdfParse = require("pdf-parse");
const updatePineCone = async (client,file,req) => {
  let rawDocs = null;
  const index = client.Index(process.env.PINECONE_INDEX_NAME);
  let txtPath = "Revise_Meta_Data";
  const nameSpaceName = req.body.nameSpaceId;
  await pdfParse(file.buffer).then((result) => {
    // res.send(result.text);
    rawDocs = result.text;
  });
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.createDocuments([rawDocs]);
  //    console.log("chunks",chunks);
  const embeddingArrays = await new OpenAIEmbeddings().embedDocuments(
      chunks.map(chunk=>chunk.pageContent.replace(/\n/g,""))
  );
// console.log("embeddings",embeddingArrays)
console.log("embeddings len",embeddingArrays.length)
console.log("name space",nameSpaceName)
  let batchSize = 100;
  let batch=[];
  for (let idx = 0; idx < chunks.length; idx++) {
    const chunk = chunks[idx];
    const vector = {
      id: `revise_${idx}`,
      values: embeddingArrays[idx],
      metadata: {
        ...chunk.metadata,
        loc: JSON.stringify(chunk.metadata.loc),
        pageContent: chunk.pageContent,
        txtPath: txtPath,
      },
    };
    batch.push(vector);
    // When-batch-is-full-or-it's the last item,-upsert-the-Vectors
    if (batch.length === batchSize || idx === chunks.length - 1) {
        console.log("batch is eing pushed...");
      await index.upsert({
        upsertRequest: {
          vectors: batch,
          namespace : nameSpaceName
        },
      });
      batch=[];
    }
  }
    console.log("pushed into pinecone");
//   const retriever = vectorStore.asRetriever();
//     const resultOne = await vectorStore.similaritySearch("List down 3 questions I can ask from this pdf", 1);


};
exports.updatePineCone = updatePineCone;
