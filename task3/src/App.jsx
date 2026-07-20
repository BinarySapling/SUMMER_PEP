
import './App.css'
import FormComp from './components/FormComp'
import FormData from './components/Child'
import { useState, useCallback } from 'react'

function App() {
  // const [count, setCount] = useState(0)
  function expenseCalculator(num){
    console.log("Calc")
    let result = 0;
    for(let i = 0; i < 100000; i++){
      result += num;
    }
    return result;
  }

  const [result, setResult] = useState(() => expenseCalculator(5));
  const recalc = useCallback(() => {
    setResult(expenseCalculator(5));
  }, []);
  return (
    <>
  Current result: {result}
  <button onClick={recalc}>Calc</button>
      {/* <FormComp/> */}
      {/* <FormData/> */}
      {/* current Count = {count};
      <button onClick={()=>{
        setCount(count+1)
      }}>Increase Count</button>
      <button onClick={()=>{
        setCount(count-1)
      }}>Decrease Count</button> */}



    </>
  )
}

export default App
