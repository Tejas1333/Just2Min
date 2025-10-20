'use client'

export default function SettingsModal({ settings, setSettings }) {
  return (
    <div className="p-3 rounded border">
      <h4 className="font-semibold">Settings</h4>
      <div className="mt-2">
        <label className="block">Default seconds</label>
        <input type="number" value={settings.defaultSec} onChange={e=>setSettings({...settings, defaultSec: Number(e.target.value)})} className="p-2 border rounded" />
      </div>
      <div className="mt-2">
        <label className="block">Theme</label>
        <select value={settings.theme} onChange={e=>setSettings({...settings, theme: e.target.value})} className="p-2 border rounded">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>
    </div>
  )
}