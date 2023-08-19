import React from 'react'
import UploadFile from './UploadFile'
import "../App.css"
import { Link } from 'react-router-dom'
const MainPage = ({currentFile,loading,setLoading,handleUpload}) => {
  return (
    <>
        {!currentFile &&
      <UploadFile loading={loading} setLoading={setLoading} handleUpload={handleUpload}/>
        }
      {currentFile && 
      <div className="action-buttons">
        <div className="buttons-container">
          <Link to="/test"><button className="active">Attempt a Test</button></Link>
           <button>Chat with File</button>
        </div>
    </div>
}
    </>
  )
}

export default MainPage