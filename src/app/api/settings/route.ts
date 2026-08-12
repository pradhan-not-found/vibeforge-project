import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const db = getDb();
    const userSettings = db.userSettings?.[userId] || {};

    return NextResponse.json(userSettings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, settings } = await req.json();

    if (!userId || !settings) {
      return NextResponse.json({ error: 'Missing userId or settings' }, { status: 400 });
    }

    const db = getDb();
    if (!db.userSettings) db.userSettings = {};
    
    db.userSettings[userId] = {
      ...(db.userSettings[userId] || {}),
      ...settings,
    };

    saveDb(db);

    return NextResponse.json({ success: true, settings: db.userSettings[userId] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
