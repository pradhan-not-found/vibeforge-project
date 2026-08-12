import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

// Ensure data dir exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export type DatabaseSchema = {
  policies: {
    maxSpend: number;
    maxTokens: number;
    loopLimit?: number;
  };
  agents: Record<string, {
    name: string;
    owner?: string;
    totalTokens: number;
    totalSpend: number;
    blockedCount: number;
  }>;
  userSettings?: Record<string, {
    geminiApiKey?: string;
    groqApiKey?: string;
    openAiApiKey?: string;
  }>;
  queue: Array<{
    id: string;
    agentId: string;
    agentName: string;
    action: string;
    policy: string;
    time: string;
    prompt: string;
  }>;
  traces: Array<{
    id: string;
    agentId: string;
    agentName: string;
    success: boolean;
    durationMs: number;
    tokensUsed: number;
    cost: number;
    errorContext?: string;
    response?: string;
    timestamp: string;
  }>;
};

const defaultSchema: DatabaseSchema = {
  policies: {
    maxSpend: 50,
    maxTokens: 100000,
    loopLimit: 5,
  },
  agents: {
    'gemini-flash': {
      name: 'Gemini Web Researcher',
      owner: 'admin',
      totalTokens: 0,
      totalSpend: 0,
      blockedCount: 0,
    },
    'groq-agent': {
      name: 'Groq Data Scraper',
      owner: 'admin',
      totalTokens: 0,
      totalSpend: 0,
      blockedCount: 0,
    },
  },
  userSettings: {},
  queue: [],
  traces: [],
};

// Initialize DB if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify(defaultSchema, null, 2));
}

export function getDb(): DatabaseSchema {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error('Failed to read db.json, returning default schema.', error);
    return defaultSchema;
  }
}

export function saveDb(data: DatabaseSchema) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to write db.json', error);
  }
}

export function updateAgentUsage(agentId: string, tokens: number, cost: number) {
  const db = getDb();
  if (db.agents[agentId]) {
    db.agents[agentId].totalTokens += tokens;
    db.agents[agentId].totalSpend += cost;
    saveDb(db);
  }
}

export function incrementAgentBlocked(agentId: string) {
  const db = getDb();
  if (db.agents[agentId]) {
    db.agents[agentId].blockedCount += 1;
    saveDb(db);
  }
}
