import './App.scss'
import { useState } from 'react'
import { Tabs } from './components/Tabs'
import { CodeEditor } from './components/CodeEditor'
import { CodeExecutor } from './components/CodeExecutor'
import server from "./server.json";

const initialCode = 'puts "Hello World"';


export default function App() {
  const [mode, setMode] = useState('ruby');
  const [code, setCode] = useState(initialCode);
  const [codeResult, setcodeResult] = useState('');
  const [testMsg, setTestMsg] = useState('');
  const [task, setTask] = useState('hello_world.rb');

  const runCode = () => {

    const data = {
        rubyCode: code,
        pathTest: item.product_id
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
            //вывод исполнения кода
          } else {
            //вывод сообщений теста
          }
        },      
        (error) => {
          alert(error);
        }
      );
  }
  
  const propsByMode = {
    ruby: {
      mode: 'ruby',
      value: code,
      setValue: setCode
    }
  }

  return (
    <div className='app'>
      <h1>React Code Editor</h1>
      <Tabs mode={mode} setMode={setMode} />
      <CodeEditor {...propsByMode[mode]} />
      <CodeExecutor  runCode={runCode} />
    </div>
  )
}
