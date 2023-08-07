import React,{useRef,useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
const UploadFile = ({loading,setLoading,handleUpload}) => {
    const[title,setTitle] = useState("");
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
      // Trigger the file input click event when the button is clicked
      fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        console.log("upload button clicked")
        const file = event.target.files[0];
        const formData = new FormData();
        const uniqueId = uuidv4();
        const nameSpaceId= file.name.split(".")[0].replace(/_/g, '-')+uniqueId
        console.log("namespace",nameSpaceId)
    formData.append("pdfFile", file);
    formData.append("nameSpaceId",nameSpaceId);
    console.log("namespace id",nameSpaceId);
    // setDocs({"title" : title,"nameSpace" : nameSpaceId});
    // setTitle("");
    // await new Promise((res)=>setTimeout(res,2000));
    if (file) {
        setLoading(true);
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
      }).then(data => {
        setTitle("");
        handleUpload({"title" : title,"nameSpace" : nameSpaceId});
    }).catch(err=>{
        console.log('error');
        setLoading(false);
        // event.target.value=""
      });
setLoading(false);
    }
};
  return (
    <div className="file-upload">
        <input type='text' className='input-title' onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter the File Name'/>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button disabled={loading} className="upload-button" onClick={handleButtonClick}>
        Upload File
      </button>
      {loading && <h1>File is being uploaded...</h1>}
    </div>
  )
}

export default UploadFile;