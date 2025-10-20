'use client'
import { useEffect, useState, useRef } from 'react'

export default function Timer({ defaultSec = 120, onComplete = () => {} }) {
  const [seconds, setSeconds] = useState(defaultSec)
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s - 1)
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  useEffect(() => {
    if (seconds <= 0 && running) {
      setRunning(false)
      setMessage('Great! 2 minutes done. Want to extend?')
      onComplete({ durationSec: defaultSec, completed: true })
    }
  }, [seconds, running, defaultSec, onComplete])

  function start() {
    setSeconds(defaultSec)
    setRunning(true)
    setMessage(null)
  }

  function stop() {
    setRunning(false)
    setMessage('Stopped. Good try!')
  }

  const pct = Math.max(0, (seconds / defaultSec) * 100)

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="text-6xl font-mono">{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</div>
      <div className="my-4">
        <div className="w-40 h-40 rounded-full mx-auto relative">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path className="text-gray-200" strokeWidth="3" d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" />
            <path strokeWidth="3" strokeLinecap="round" fill="none"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831"
              style={{ strokeDasharray: `${pct} 100` }} />
          </svg>
        </div>
      </div>

      <div className="space-x-3">
        <button onClick={start} className="px-4 py-2 rounded bg-blue-600 text-white">Start 2-min</button>
        <button onClick={() => { setSeconds(300); setRunning(true); }} className="px-4 py-2 rounded bg-gray-200">Extend 5-min</button>
        <button onClick={stop} className="px-4 py-2 rounded bg-red-200">Stop</button>
      </div>

      {message && <div className="mt-4 text-sm text-gray-700">{message}</div>}
    </div>
  )
}