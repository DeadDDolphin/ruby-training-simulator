import server from "./../server.json";
import { useState, useEffect } from "react";

export const FileSelector = ({ readFile }) => {
  
  const [files, setFiles] = useState([])
  const [isFilesLoaded, setIsFilesLoaded] = useState(false)

  const selectFile = ({ target: { value } }) => {
    readFile(value)
  }

  useEffect(() => {
    getFileNames();
  }, [])
  

  const getFileNames = () => {

    fetch(`${server.host}:${server.port}/getFileNames`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setFiles(result.files);
          setIsFilesLoaded(true);
        },      
        (error) => {
          alert(`FileSelector: ${error}`);
        }
      );
  }

  if(!isFilesLoaded){
    return (
      <div className='theme-selector'>
          <label htmlFor='files'>Files: </label>
          <select id='files' name='files'>
            <option>Files not Found</option>
          </select>
        </div>
    )
  } else {
      return (
        <div className='theme-selector'>
          <label htmlFor='files'>Files: </label>
          <select id='files' name='files' onChange={selectFile}>
            {files.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )
  }
}
