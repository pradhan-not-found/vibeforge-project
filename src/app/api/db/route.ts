import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const db = await getDb();
  return NextResponse.json(db);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const db = await getDb();
    
    if (data.action === 'update_policyProfiles') {
      db.policyProfiles = data.policyProfiles;
      await saveDb(db);
      return NextResponse.json({ status: 'success' });
    }
    
    if (data.action === 'update_policy_and_agents') {
      db.policyProfiles = data.policyProfiles;
      if (data.agentUpdates) {
        for (const [agentId, policyId] of Object.entries(data.agentUpdates) as [string, string][]) {
          if (db.agents[agentId]) {
            db.agents[agentId].policyId = policyId;
          }
        }
      }
      await saveDb(db);
      return NextResponse.json({ status: 'success' });
    }
    
    if (data.action === 'clear_queue_item') {
      db.queue = db.queue.filter(item => item.id !== data.id);
      await saveDb(db);
      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
