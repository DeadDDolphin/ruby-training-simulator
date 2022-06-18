import './App.scss'
import { useState } from 'react'
import { Button } from './components/Button'
import { CodeEditor } from './components/CodeEditor'
import { CodeExecutor } from './components/CodeExecutor'
import server from "./server.json";

const initialCode =""

export default function App() {
  const [mode, setMode] = useState('ruby');
  const [code, setCode] = useState(initialCode);
  const [codeResult, setCodeResult] = useState('');
  const [task, setTask] = useState('hello_world.rb');
  
  const runCode = () => {

    const data = {
        rubyCode: code,
        path: task
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(`${server.host}:${server.port}/runTest`, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result[0].msg == "success"){
            if (result[1].msg == "success"){
              console.log(result[1].codeResult)
              if(result[1].codeResult === ''){
                console.log(result[0].testResult)
                setCodeResult(result[0].testResult)
              } else {
                setCodeResult(result[1].codeResult)
              }
            } else {
              setCodeResult("Ошибка в коде. Т.к. он прошел тест, то возможна ошибка в тесте");
            }
          } else {          
            setCodeResult(result[0].testResult)
          }
        },      
        (error) => {
          alert(error);
        }
      );
  }
  
  const saveFile = () => {
    const data = {
      rubyCode: code,
      path: task,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${server.host}:${server.port}/saveFile`, requestOptions)
      .then((res) => {
        console.log(res)
        return res.json()})
      .then(
        (result) => {
          // if(result.result == "success"){
            console.log("Сохранено");
          // } else {
          // }
        },      
        (error) => {
          console.log(error)
          alert(error);
        }
      );
  };

  const propsByMode = {
    ruby: {
      mode: 'ruby',
      value: code,
      setValue: setCode,
      setFile: setTask
    }
  }

  return (
    <div className='app'>
      <h1>Тренажер для Ruby</h1>
      <div className='main-container'>
      <div className='editor-container'>
      <CodeEditor {...propsByMode[mode]} />
      <Button
        className='btn file'
        title='Save file'
        onClick={saveFile}
      />
      <Button className='btn run' title='Run code' onClick={runCode} />
      </div>
      <CodeExecutor  srcDoc={codeResult} />
      </div>
    </div>
  )
}
