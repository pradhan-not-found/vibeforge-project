"use client";
import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Key, User, Bell, Trash2, Copy, Check, Zap, Eye, EyeOff } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';
import { useAuth } from '@/context/AuthContext';

export default function Page() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [gmailEnabled, setGmailEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  
  const [apiKey, setApiKey] = useState('cp_live_a8f9c2d4e5b61a2b3c4d5e6f');
  const [apiKeyRevealed, setApiKeyRevealed] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [generationDots, setGenerationDots] = useState('');

    const [geminiKey, setGeminiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [geminiRevealed, setGeminiRevealed] = useState(false);
  const [groqRevealed, setGroqRevealed] = useState(false);
  const [openaiRevealed, setOpenaiRevealed] = useState(false);

  const [userAgents, setUserAgents] = useState<any[]>([]);
  const [revealedAgentKeys, setRevealedAgentKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user?.email) {
      // Load Settings
      fetch(`/api/settings?userId=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.geminiApiKey) setGeminiKey(data.geminiApiKey);
          if (data.groqApiKey) setGroqKey(data.groqApiKey);
          if (data.openAiApiKey) setOpenaiKey(data.openAiApiKey);
        })
        .catch(err => console.error("Failed to load settings:", err));

      // Load Agents
      fetch(`/api/db`)
        .then(res => res.json())
        .then(data => {
          if (data.agents) {
            const agentsList = Object.entries(data.agents)
              .filter(([_, info]: [string, any]) => info.owner === user.email)
              .map(([id, info]: [string, any]) => ({
                 id,
                 name: info.name,
                 provider: info.provider || 'Custom',
                 proxy_api_key: info.proxy_api_key || `cp_live_${id}`
              }));
            setUserAgents(agentsList);
          }
        })
        .catch(err => console.error("Failed to load db for settings:", err));
    }
  }, [user]);

  const handleSaveProviderKeys = async () => {
    if (!user?.email) return;
    setIsSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.email,
          settings: {
            geminiApiKey: geminiKey,
            groqApiKey: groqKey,
            openAiApiKey: openaiKey
          }
        })
      });
      alert('API keys saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save keys.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setIsGeneratingKey(true);
    setApiKeyRevealed(false);
    
    // Dot animation
    let dotCount = 0;
    const interval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setGenerationDots('.'.repeat(dotCount));
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let newKey = 'cp_live_';
      for (let i = 0; i < 24; i++) newKey += chars.charAt(Math.floor(Math.random() * chars.length));
      setApiKey(newKey);
      setIsGeneratingKey(false);
      setApiKeyRevealed(true);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto animate-fade-down">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)] mb-3">Account</p>
        <h1 className="font-sans text-4xl sm:text-5xl text-[var(--app-ink)] tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--app-muted)] mt-2">Manage your workspace, API keys, and preferences.</p>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* Workspace Section */}
        <MotionCard
          index={0}
          className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-6 card-elevate card-depth"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center text-[var(--app-muted)] shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <h2 className="font-sans text-xl text-[var(--app-ink)] tracking-tight">Workspace</h2>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
              <span className="text-sm text-[var(--app-muted)] font-medium">Workspace Name</span>
              <span className="text-sm font-medium text-[var(--app-ink)]">{(user as any)?.workspaceName || 'Checkpost Workspace'}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3 mb-2">
              <span className="text-sm text-[var(--app-muted)] font-medium">Owner Email</span>
              <span className="text-sm font-medium text-[var(--app-ink)]">{user?.email || 'admin@checkpost.app'}</span>
            </div>
            
            {/* Plan Selector */}
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--app-soft)] flex items-center justify-center border border-[var(--app-hairline)] shadow-sm">
                  <img 
                    src="/UI 04/flower.svg" 
                    alt="Plan Icon" 
                    className={`object-contain transition-all duration-300 ease-spring ${
                      selectedPlan === 'free' ? 'w-5 h-5 opacity-70' : 
                      selectedPlan === 'pro' ? 'w-7 h-7 opacity-90' : 
                      'w-9 h-9 opacity-100 scale-110 drop-shadow-sm'
                    }`} 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-[var(--app-ink)] font-medium">Active Plan</span>
                  <span className="text-[11px] text-[var(--app-muted)]">
                    {selectedPlan === 'free' ? '2 agents, 1M tokens/mo' : 
                     selectedPlan === 'pro' ? '10 agents, 5M tokens/mo' : 
                     'Unlimited agents, 20M tokens/mo'}
                  </span>
                </div>
              </div>
              <div className="relative group">
                <select 
                  value={selectedPlan} 
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E5E5] text-[var(--app-ink)] text-[13px] font-semibold rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--app-ink)]/10 cursor-pointer transition-all hover:bg-[#FAFAF7] shadow-sm min-w-[130px]"
                >
                  <option value="free">Free Plan</option>
                  <option value="pro">Pro Plan</option>
                  <option value="team">Team Plan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[var(--app-muted)] group-hover:text-[var(--app-ink)] transition-colors">
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </MotionCard>

        {/* Notifications */}
        <MotionCard
          index={1}
          className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-6 card-elevate card-depth"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center text-[var(--app-muted)] shadow-sm">
              <Bell className="w-4 h-4" />
            </div>
            <h2 className="font-sans text-xl text-[var(--app-ink)] tracking-tight">Notifications</h2>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3 mb-2">
              <span className="text-sm text-[var(--app-muted)] font-medium">Weekly Digest</span>
              <button 
                onClick={() => setWeeklyDigest(!weeklyDigest)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${weeklyDigest ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
              >
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${weeklyDigest ? 'translate-x-4' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Integrations */}
            <span className="text-[12px] font-bold text-[var(--app-muted)] uppercase tracking-wider mt-1">Alert Integrations</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0 rounded-lg bg-white shadow-sm border border-[var(--app-hairline)] p-1.5">
                    <svg viewBox="0 0 48 48" className="w-full h-full">
                      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.73V40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                      <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                      <polygon fill="#e53935" points="35,11.2 24,19.43 13,11.2 12,17 13,23.7 24,31.93 35,23.7 36,17"></polygon>
                      <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
                      <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[var(--app-ink)]">Gmail</span>
                    <span className="text-[11px] text-[var(--app-muted)]">Send to inbox</span>
                  </div>
                </div>
                <button onClick={() => setGmailEnabled(!gmailEnabled)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${gmailEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${gmailEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0 rounded-lg bg-white shadow-sm border border-[var(--app-hairline)] p-1.5">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path fill="#e01e5a" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z"></path>
                      <path fill="#e01e5a" d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"></path>
                      <path fill="#36c5f0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z"></path>
                      <path fill="#36c5f0" d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"></path>
                      <path fill="#2eb67d" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z"></path>
                      <path fill="#2eb67d" d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"></path>
                      <path fill="#ecB22e" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523z"></path>
                      <path fill="#ecB22e" d="M15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[var(--app-ink)]">Slack</span>
                    <span className="text-[11px] text-[var(--app-muted)]">Send to #sec</span>
                  </div>
                </div>
                <button onClick={() => setSlackEnabled(!slackEnabled)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${slackEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${slackEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </MotionCard>

        {/* LLM Provider Keys Section */}
        <MotionCard
          index={1.5}
          className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-6 card-elevate card-depth"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center text-[var(--app-muted)] shadow-sm">
              <Key className="w-4 h-4" />
            </div>
            <h2 className="font-sans text-xl text-[var(--app-ink)] tracking-tight">LLM Provider Keys</h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--app-muted)]">Configure your provider API keys to allow your agents to execute prompts. Only showing providers currently used by your agents.</p>
            
            {userAgents.length === 0 && (
              <div className="text-sm text-[var(--app-muted)] p-4 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl text-center">
                You haven't created any agents yet. Add an agent to see provider requirements here.
              </div>
            )}
            
            {userAgents.some(a => a.provider.toLowerCase().includes('openai')) && (
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
              <div className="flex-1">
                <p className="text-xs text-[var(--app-muted)] font-medium mb-1">OpenAI API Key</p>
                <div className="flex items-center gap-1.5">
                  <input
                    type={openaiRevealed ? "text" : "password"}
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxx"
                    className="w-full bg-transparent text-sm font-mono text-[var(--app-ink)] focus:outline-none placeholder:text-[var(--app-muted)]"
                  />
                  <button 
                    onClick={() => setOpenaiRevealed(!openaiRevealed)} 
                    className="p-1.5 rounded-md text-[var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[var(--app-ink)] transition-colors shrink-0"
                  >
                    {openaiRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
            )}
            
            {/* Gemini */}
            {userAgents.some(a => a.provider.toLowerCase().includes('gemini') || a.provider.toLowerCase().includes('google')) && (
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
              <div className="flex-1">
                <p className="text-xs text-[var(--app-muted)] font-medium mb-1">Google Gemini API Key</p>
                <div className="flex items-center gap-1.5">
                  <input
                    type={geminiRevealed ? "text" : "password"}
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSyxxxxxxxxxxxxxxxxxxxx"
                    className="w-full bg-transparent text-sm font-mono text-[var(--app-ink)] focus:outline-none placeholder:text-[var(--app-muted)]"
                  />
                  <button 
                    onClick={() => setGeminiRevealed(!geminiRevealed)} 
                    className="p-1.5 rounded-md text-[var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[var(--app-ink)] transition-colors shrink-0"
                  >
                    {geminiRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
            )}

            {/* Groq */}
            {userAgents.some(a => a.provider.toLowerCase().includes('groq')) && (
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
              <div className="flex-1">
                <p className="text-xs text-[var(--app-muted)] font-medium mb-1">Groq API Key</p>
                <div className="flex items-center gap-1.5">
                  <input
                    type={groqRevealed ? "text" : "password"}
                    value={groqKey}
                    onChange={(e) => setGroqKey(e.target.value)}
                    placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
                    className="w-full bg-transparent text-sm font-mono text-[var(--app-ink)] focus:outline-none placeholder:text-[var(--app-muted)]"
                  />
                  <button 
                    onClick={() => setGroqRevealed(!groqRevealed)} 
                    className="p-1.5 rounded-md text-[var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[var(--app-ink)] transition-colors shrink-0"
                  >
                    {groqRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
            )}
            {userAgents.length > 0 && (
              <button 
                onClick={handleSaveProviderKeys}
                disabled={isSaving}
                className="w-full mt-1 py-2.5 text-sm font-semibold text-[var(--app-ink)] bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl hover:bg-[var(--app-soft)] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[var(--app-ink)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isSaving ? 'Saving...' : 'Save Keys'}
              </button>
            )}
          </div>
        </MotionCard>
        {/* API Key Section */}
        <MotionCard
          index={2}
          className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-6 card-elevate card-depth"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center text-[var(--app-muted)] shadow-sm">
              <Key className="w-4 h-4" />
            </div>
            <h2 className="font-sans text-xl text-[var(--app-ink)] tracking-tight">API Keys</h2>
          </div>
          
          <div className="flex flex-col gap-3">
            {userAgents.length === 0 ? (
              <div className="text-sm text-[var(--app-muted)] p-4 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl text-center">
                You haven't created any agents yet. Add an agent to generate Proxy Gateway Keys.
              </div>
            ) : (
              userAgents.map(agent => (
                <div key={agent.id} className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
                  <div>
                    <p className="text-xs text-[var(--app-muted)] font-medium mb-0.5">{agent.name} Proxy Key</p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-mono text-[var(--app-ink)] h-5 flex items-center min-w-[220px]">
                        {revealedAgentKeys[agent.id] ? agent.proxy_api_key : 'cp_live_' + '•'.repeat(24)}
                      </p>
                      <button 
                        onClick={() => setRevealedAgentKeys(prev => ({...prev, [agent.id]: !prev[agent.id]}))} 
                        className="p-1.5 rounded-md text-[var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[var(--app-ink)] transition-colors"
                      >
                        {revealedAgentKeys[agent.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(agent.proxy_api_key);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border ${copied ? 'bg-green-50 text-green-700 border-green-200' : 'bg-[var(--app-canvas)] text-[var(--app-muted)] border-[var(--app-hairline)] hover:text-[var(--app-ink)] hover:bg-[var(--app-soft)]'}`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} 
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))
            )}
          </div>
        </MotionCard>

        {/* Danger Zone */}
        <MotionCard
          index={3}
          className="bg-red-50 rounded-2xl border-2 border-red-100 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-white border border-red-200 flex items-center justify-center text-red-500 shadow-sm overflow-hidden p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <h2 className="font-sans text-xl text-red-700 tracking-tight">Danger Zone</h2>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-white border border-red-200 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-red-700">Delete Workspace</p>
              <p className="text-xs text-red-400 mt-0.5">This action is irreversible. All agents and logs will be deleted.</p>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-700 bg-red-100 border border-red-200 rounded-xl hover:bg-red-200 transition-colors shrink-0">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </MotionCard>
      </div>
    </div>
  );
}
