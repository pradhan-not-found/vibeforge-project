import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, user_id, provider } = await req.json();

    if (!name || !user_id) {
      return NextResponse.json({ error: 'Missing name or user_id' }, { status: 400 });
    }

    const db = getDb();
    const newId = `agent_${crypto.randomUUID().replace(/-/g, '').substring(0, 12)}`;
    
    db.agents[newId] = {
      name,
      owner: user_id,
      totalTokens: 0,
      totalSpend: 0,
      blockedCount: 0,
    };

    saveDb(db);

    return NextResponse.json({ 
      id: newId,
      proxy_url: `https://api.checkpost.app/v1/${newId}/chat`,
      proxy_api_key: `cp_${crypto.randomUUID().replace(/-/g, '')}`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const db = getDb();
    if (db.agents[id]) {
      delete db.agents[id];
      saveDb(db);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
  }
}
