const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { HuggingFaceInferenceEmbeddings } = require("langchain/embeddings/hf");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { OpenAI } = require("langchain/llms/openai");
const { Document } = require("langchain/document");
const { loadQAStuffChain } = require("langchain/chains");
const queryPineConeVectorStore = async (client, nameSpaceName, question) => {
    console.log("im in ans page", question)
    const index = client.Index(process.env.PINECONE_INDEX_NAME);
    console.log("question", question);
    const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
    // const embeddings = new HuggingFaceInferenceEmbeddings({
    //     model_name: "hkunlp/instructor-xl",
    //     apiKey: "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",
    //   });
    //   const vectorStore = await MemoryVectorStore.fromTexts([question],[{id:1}], embeddings);
    //   console.log("ans store",vectorStore.memoryVectors);
    const queryResponse = await index.query({
        queryRequest: {
            topK: 5,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true,
            namespace: nameSpaceName
        }
    });
    console.log("found", queryResponse.matches);
    if (queryResponse.matches.length) {
        const llmA = new OpenAI({ temperature: 0.4, model: "text-davinci-003", });
        const chainA = loadQAStuffChain(llmA);
        const concatantedMatches = queryResponse.matches.map((match) => match.metadata.pageContent).join(" ");
        console.log("similar search", concatantedMatches);
        try {
            const resA = await chainA.call({
                input_documents: [new Document({ pageContent: concatantedMatches })],
                question: question,
            });
            console.log("found answer...", { resA });
            return resA.text;
        }
        catch (err) {
            console.log("failed to fetch answer");
        };
    }
    else {
        console.log("no matches");
        return "NO matches";
    }
}

exports.queryPineConeVectorStore = queryPineConeVectorStore;