import "./App.css";
import {useEffect, useState} from 'react'
import SideBar from "./components/SideBar";
import UploadFile from "./components/UploadFile";
function App() {
  const [docs,setDocs] = useState(null);
  const [loading,setLoading]=useState(false);
  const [previousFiles,setPreviousFiles]=useState([]);
  const [currentFile,setCurrentFile]=useState(null);
  // useEffect(()=>{
  //   console.log("file being uploaded");
  //    if(!currentFile && docs){
  //     console.log("uploaded")
  //     setCurrentFile(docs);
  //    }
  //    if(docs){
  //     console.log("current file,docs",docs)
  //     setPreviousFiles((previousFiles)=>[...previousFiles,docs]);
  //     setDocs(null);
  //    }
  // },[docs?.nameSpace]);
  const handleFileSelection = (file)=>{
    setCurrentFile(file);
  }
  const createNewChat=()=>{
    console.log("new chat")
    setCurrentFile(null);
    console.log("docs",currentFile);
  }
  const handleUpload=(doc)=>{
    console.log("prevFiles seting");
    setCurrentFile(doc);
    setPreviousFiles((previousFiles)=>[...previousFiles,doc]);
  }
  console.log("previous files",previousFiles);
  return (
    <div className="app">
      <SideBar setCurrentFile={setCurrentFile} createNewChat={createNewChat} currentFile={currentFile} previousFiles={previousFiles} handleFileSelection={handleFileSelection}/>

      {!currentFile &&
      <UploadFile loading={loading} setLoading={setLoading} handleUpload={handleUpload}/>
      }
      {currentFile &&
      <div className="action-buttons">
        <div className="buttons-container">
           <button className="active">Attempt a Test</button>
           <button>Chat with File</button>
        </div>
        </div>
      }
    </div>
  );
}

export default App;
