import React, {useState} from 'react'
import { Number } from './Number'
import { Plus } from './Plus'
import { Equal } from './Equal'
import { Result } from './Result'
import { Input } from './Input'

const App = () => {
  const [input, setInput] = useState(0)
  const [result, setResult] = useState(0)

  return (
    <div>
      <div>
        <Number number={1} input={input} setInput={setInput}/>
        <Number number={2} input={input} setInput={setInput}/>
        <Number number={3} input={input} setInput={setInput}/>
      </div>
      <div>
        <Number number={4} input={input} setInput={setInput}/>
        <Number number={5} input={input} setInput={setInput}/>
        <Number number={6} input={input} setInput={setInput}/>
      </div>
      <div>
        <Number number={7} input={input} setInput={setInput}/>
        <Number number={8} input={input} setInput={setInput}/>
        <Number number={9} input={input} setInput={setInput}/>
      </div>
      <div>
        <Number number={0} input={input} setInput={setInput}/>
        <Plus input={input} result={result} setResult={setResult} setInput={setInput}/>
        <Equal input={input} result={result} setResult={setResult} setInput={setInput}/>
      </div>
      <div>
        <Input input={input}/>
      </div>
      <div>
        <Result result={result}/>
      </div>
    </div>
  )
}

export default App
