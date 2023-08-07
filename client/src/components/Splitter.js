import React, { useState } from 'react';
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


function Splitter() {
  const [pdfContent, setPdfContent] = useState(null);

  const handleFileChange = async (event) => {
   
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("pdfFile", file);
    
    if (file) {
      console.log("form data",formData);
     await fetch("http://localhost:5000/extract-text",{
        method: "POST",
        body: formData
     }).then(
      response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('File upload failed');
        }
      }).then(extractedText => {
        console.log(extractedText.text);
        setPdfContent(extractedText.text);
    }).catch(err=>{
        console.log('error');
      });
    //  if(pdfContent!=null){
    //   console.log(pdfContent);
    //   await chunkIt(pdfContent);
    //  }
    }
  }
const chunkIt = async(text)=>{
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  
  const docOutput = await splitter.splitDocuments(text);
  console.log(docOutput);
}
  return (
    <div>
      <input type="file" encType="multipart/form-data" onChange={handleFileChange} />
      <div>{pdfContent || "Hi"}</div>
    </div>
  );
}

export default Splitter;
