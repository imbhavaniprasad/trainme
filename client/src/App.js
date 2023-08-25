import "./App.css";
import { useEffect, useState, createContext } from 'react'
import SideBar from "./components/SideBar";
import UploadFile from "./components/UploadFile";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import AttemptTest from "./components/AttemptTest";
import { useNavigate } from 'react-router-dom';
import ChatWindow from "./components/ChatWindow";
export const FileContext = createContext(undefined);
function App() {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previousFiles, setPreviousFiles] = useState([
    { "title": "Car Drivers", "nameSpace": "car-driving-rules5061fd70-a53e-4b66-bcca-87e3f60f104e" },
    { "title": "IngMar", "nameSpace": "ingmar-bergmandc97c212-5cc7-44eb-9e81-8931eb7694ec" },

  ]);
  const [currentFile, setCurrentFile] = useState(null);
  const navigate = useNavigate();
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
  const handleFileSelection = (file) => {
    setCurrentFile(file);
    navigate("/");
  }
  const createNewChat = () => {
    console.log("new chat")
    setCurrentFile(null);
    navigate("/")
    console.log("docs", currentFile);
  }
  const handleUpload = (doc) => {
    console.log("prevFiles seting");
    setCurrentFile(doc);
    setPreviousFiles((previousFiles) => [...previousFiles, doc]);
  }
  console.log("previous files", previousFiles);
  return (
    <div className="app">
      <FileContext.Provider value={currentFile}>
        <SideBar setCurrentFile={setCurrentFile} createNewChat={createNewChat} currentFile={currentFile} previousFiles={previousFiles} handleFileSelection={handleFileSelection} />
        <Routes>
          <Route exact path="/" element={<MainPage loading={loading} setLoading={setLoading} handleUpload={handleUpload} currentFile={currentFile} />}>
          </Route>
          <Route path="/test" element={<AttemptTest />}></Route>
          <Route path="/chat" element={<ChatWindow />}></Route>
        </Routes>
      </FileContext.Provider>
    </div>
  );
}

export default App;
