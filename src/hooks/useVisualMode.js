import { useState } from "react"

export default function useVisualMode(modeInput) {

  const [mode, setMode] = useState(modeInput);
  const [history, setHistory] = useState([modeInput]);
  console.log(history)

  const transition = function(newMode, replace = false) {
    if (replace) {
      setMode(prev => {return newMode});
      setHistory(prev => {return [...prev.slice(0, -1), newMode]});
      
    } else {
      setMode(prev => {return newMode})
      setHistory(prev => {return [...prev, newMode]})
    }
    
  }

  const back = function() {
    if (history.length > 1) {
      const newHistory = [...history].slice(0, -1)
      setHistory( newHistory )
      const lastMode = newHistory[newHistory.length -1];
      setMode(prev => {return lastMode});
    }
  }

  return { mode, transition, back }
}