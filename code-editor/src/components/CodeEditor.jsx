import { useState, useRef } from 'react'
import { Controlled } from 'react-codemirror2'
import { Button } from './Button'
import { ThemeSelector } from './ThemeSelector'
import { FileSelector } from './FileSelector'

import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/ruby/ruby';

import "codemirror/addon/runmode/runmode.js";
import "codemirror/addon/runmode/colorize.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/comment/continuecomment.js";
import "codemirror/addon/mode/simple.js";
import "codemirror/addon/hint/show-hint.js";

export const CodeEditor = ({ mode, value, setValue, setFile }) => {
  const [theme, setTheme] = useState('dracula')

  const fileInputRef = useRef()
  

  const changeCode = (editor, data, value) => {
    setValue(value)
  }

  const isFileValid = (file) =>{
    try {
      return (file.name.split(".")[1] === "rb") || (file.split(".")[1] === "rb")
    } catch (TypeError) {
      return (file.split(".")[1] === "rb")
    }
  }
    

  const readFile = (file) => {
    if (!isFileValid(file)) return
    setFile(file.name);
    const reader = new FileReader()
    
    reader.onloadend = () => {
      setValue(reader.result)
    }

    reader.readAsText(file)
  }

  const loadFile = (e) => {
    const file = e.target.files[0]

    readFile(file)
  }

  const onDrop = (editor, e) => {
    e.preventDefault()

    const file = e.dataTransfer.items[0].getAsFile()

    readFile(file)
  }
  
  return (
    <div className='code-editor'>
      <ThemeSelector setTheme={setTheme} />      
      {/* <FileSelector readFile={readFile}/> */}
      <Button
        className='btn file'
        title='Load file'
        onClick={() => {
          fileInputRef.current.click()
        }}
      />
      <input
        type='file'
        accept='.rb'
        style={{ display: 'none' }}
        aria-hidden='true'
        ref={fileInputRef}
        onChange={loadFile}
      />
      <Controlled
        value={value}
        onBeforeChange={changeCode}
        onDrop={onDrop}
        options={{
          mode,
          theme,
          lint: true,
          lineNumbers: true,
          lineWrapping: true,
          spellcheck: true,
          autoCloseBrackets: true,
          matchBrackets: true
        }}
      />
    </div>
  )
}
