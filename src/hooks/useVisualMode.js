import { useState } from "react"

export default function useVisualMode(modeInput) {

  const [history, setHistory] = useState([modeInput]);

  const transition = function(newMode, replace = false) {
    if (replace) {
      setHistory(prev => {return [...prev.slice(0, -1), newMode]});
      return;
    }
    setHistory(prev => {return [...prev, newMode]})
  }

  const back = function() {
    if (history.length > 1) {
      const newHistory = [...history].slice(0, -1)
      setHistory( newHistory )
    }
  }

  const mode = history[history.length -1]

  return { mode, transition, back }
}