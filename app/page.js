'use client'
import { useState, useEffect } from 'react'
import Timer from '../components/Timer'
import StatsPanel from '../components/StatsPanel'
import TaskList from '../components/TaskList'
import SettingsModal from '../components/SettingsModal'

export default function Home() {
  const [settings, setSettings] = useState({ defaultSec: 120, theme: 'light' })

  useEffect(() => {
    const s = localStorage.getItem('tm_defaultSec')
    const t = localStorage.getItem('tm_theme')
    setSettings({ defaultSec: Number(s || 120), theme: t || 'light' })
  }, [])

  useEffect(() => {
    localStorage.setItem('tm_defaultSec', settings.defaultSec)
    localStorage.setItem('tm_theme', settings.theme)
  }, [settings])

  async function handleComplete(meta) {
    const baseXP = Math.max(1, Math.round(meta.durationSec / 30)) * 5
    const payload = { startedAt: new Date().toISOString(), durationSec: meta.durationSec, completed: meta.completed, xpEarned: baseXP }
    try { await fetch('/api/sessions', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) }) } catch (e) { console.warn('Failed to save session', e) }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="col-span-2">
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Just 2 Minutes</h1>
            <Timer defaultSec={settings.defaultSec} onComplete={handleComplete} />
            <div className="mt-6 grid grid-cols-2 gap-4">
              <TaskList />
              <SettingsModal settings={settings} setSettings={setSettings} />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded shadow space-y-4">
            <StatsPanel />
            <div className="p-3 border rounded"> 
              <h4 className="font-semibold">Motivational Nudge</h4>
              <p className="mt-2 text-sm">"Start small. You don't need permission to begin."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}