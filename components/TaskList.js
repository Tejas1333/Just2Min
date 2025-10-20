'use client'
import { useState, useEffect } from 'react'

export default function TaskList() {
  const [items, setItems] = useState([])
  const [val, setVal] = useState('')

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem('tm_tasks') || '[]')) } catch {}
  }, [])

  function add() {
    if (!val.trim()) return
    const next = [...items, val.trim()]
    setItems(next)
    localStorage.setItem('tm_tasks', JSON.stringify(next))
    setVal('')
  }

  return (
    <div className="p-3 rounded border">
      <h4 className="font-semibold">Micro-tasks</h4>
      <div className="mt-2 flex gap-2">
        <input value={val} onChange={e=>setVal(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Add tiny task" />
        <button onClick={add} className="px-3 py-2 bg-blue-500 text-white rounded">Add</button>
      </div>
      <ul className="mt-2 list-disc pl-5 text-sm">
        {items.map((t,i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  )
}