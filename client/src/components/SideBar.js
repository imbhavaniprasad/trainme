import React from 'react'
import "../App.css"
import { FileContext } from '../App';
import { useContext } from 'react';

const SideBar = ({setCurrentFile,currentFile,previousFiles,handleFileSelection,createNewChat}) => {
  // console.log("sidbar",currentFile);
  // console.log("prev files",previousFiles);
  return (
    <aside className="side-bar">
    <button onClick={createNewChat}>+ New Chat</button>
    {previousFiles ? <ul className="history">
      {previousFiles.map((prevFile,index)=>{
        return <li key={index} className={currentFile?.nameSpace===prevFile.nameSpace ? "active" : "disabled"}  onClick={()=>handleFileSelection(prevFile)}>{prevFile.title}</li>
      })}
      </ul>
    : <p>No Files are available!</p>
    }
    <nav>
      <p>Bhavani Prasad</p>
    </nav>
  </aside>
  )
}

export default SideBar