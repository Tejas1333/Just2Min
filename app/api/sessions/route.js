import clientPromise from '../../../lib/mongodb'

export async function POST(req) {
  const client = await clientPromise
  const db = client.db('two_min_app')
  const sessions = db.collection('sessions')

  const body = await req.json()
  body.startedAt = new Date(body.startedAt)
  const result = await sessions.insertOne(body)

  return new Response(JSON.stringify({ ok: true, id: result.insertedId }), { status: 201 })
}
