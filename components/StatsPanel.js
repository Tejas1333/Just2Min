'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function StatsPanel() {
  const { data } = useSWR('/api/stats', fetcher)
  return (
    <div className="p-4 rounded border">
      <h3 className="font-semibold">Stats</h3>
      <div className="mt-2">Total sessions: {data?.totalSessions ?? '—'}</div>
      <div>Total XP: {data?.totalXP ?? '—'}</div>
    </div>
  )
}