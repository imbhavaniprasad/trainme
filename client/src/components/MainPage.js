import React from 'react'
import UploadFile from './UploadFile'
import "../App.css"
import { Link } from 'react-router-dom'
const MainPage = ({ currentFile, loading, setLoading, handleUpload }) => {
  return (
    <div style={{ width: '80%', display: 'flex', justifyContent: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Revise</h1>
      {!currentFile &&
        <UploadFile loading={loading} setLoading={setLoading} handleUpload={handleUpload} />
      }
      {currentFile &&
        <div className="action-buttons">
          <div className="buttons-container">
            <Link to="/test"><button >Attempt a Test</button></Link>
            <Link to="/chat"><button>Chat with File</button></Link>
          </div>
        </div>
      }
    </div>
  )
}

export default MainPage