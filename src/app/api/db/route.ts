import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const db = getDb();
    
    if (data.action === 'update_policies') {
      db.policies = data.policies;
      saveDb(db);
      return NextResponse.json({ status: 'success' });
    }
    
    if (data.action === 'clear_queue_item') {
      db.queue = db.queue.filter(item => item.id !== data.id);
      saveDb(db);
      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
