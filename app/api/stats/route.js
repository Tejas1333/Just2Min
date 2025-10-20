// in api/stats/route.js
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("two_min_app");
  const sessions = db.collection("sessions");

  // 1. Efficiently get total count
  const totalSessions = await sessions.countDocuments();

  // 2. Efficiently get total XP
  const xpAgg = await sessions
    .aggregate([{ $group: { _id: null, sum: { $sum: "$xpEarned" } } }])
    .toArray();
  const totalXP = xpAgg[0]?.sum || 0;

  // 3. Efficiently get unique days
  const daysAgg = await sessions
    .aggregate([
      {
        $group: {
          // Group by the date part of 'startedAt'
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startedAt" } },
        },
      },
      { $count: "uniqueDaysCount" }, // Count the distinct groups
    ])
    .toArray();
  const uniqueDays = daysAgg[0]?.uniqueDaysCount || 0;

  return new Response(JSON.stringify({ totalSessions, totalXP, uniqueDays }));
}
