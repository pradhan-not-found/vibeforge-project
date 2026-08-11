'use client';

import { useState, useRef, useEffect } from "react";
import { User, Pencil, Camera } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<{name: string; avatar: string | null; email: string; role: string}>({ 
    name: "John Doe", 
    avatar: null, 
    email: "john@acmecorp.com", 
    role: "Company Admin" 
  });
  const [draftName, setDraftName] = useState(profile.name);
  const [draftAvatar, setDraftAvatar] = useState<string | null>(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfile(prev => ({
          ...prev,
          name: user.displayName || "User",
          email: user.email || prev.email,
          avatar: user.photoURL || prev.avatar,
        }));
        setDraftName(user.displayName || "User");
        setDraftAvatar(user.photoURL || null);
      }
    });
    return () => unsubscribe();
  }, []);

  const startEdit = () => {
    setDraftName(profile.name);
    setDraftAvatar(profile.avatar);
    setEditing(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setDraftAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const next = { ...profile, name: draftName.trim() || "John Doe", avatar: draftAvatar };
    setProfile(next);
    setEditing(false);
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full" style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)' }}>
      {/* Hero profile band */}
      <div className="mb-6 lg:mb-8">
        <div className="relative p-6 sm:p-8 bg-white rounded-[24px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          {!editing && (
            <button 
              onClick={startEdit} 
              className="absolute top-6 right-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-[#1A1A1A] bg-[#FAFAF7] border border-[#E5E5E5] hover:bg-[#F0F0F0] transition-colors shadow-sm"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-[16px] overflow-hidden border-2 border-[#E5E5E5] bg-[#FAFAF7] flex items-center justify-center">
                {(editing ? draftAvatar : profile.avatar) ? (
                  <img src={(editing ? draftAvatar : profile.avatar) as string} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-9 h-9 text-[rgba(38,35,35,0.4)]" />
                )}
              </div>
              {editing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#FAFAF7] transition-colors shadow-sm"
                  aria-label="Change photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium tracking-[0.14em] text-[rgba(38,35,35,0.5)] uppercase mb-1">Your profile</p>
              {editing ? (
                <div className="mt-2 flex flex-col gap-3 max-w-[300px]">
                  <input
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    className="w-full bg-white border border-[#E5E5E5] rounded-[8px] px-3 py-2 text-[18px] font-medium text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.1)] transition-shadow"
                    placeholder="Your name"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={saveProfile} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#2A2A2A] transition-colors">
                      Save Profile
                    </button>
                    <button onClick={() => setEditing(false)} className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#1A1A1A] rounded-[8px] text-[13px] font-medium hover:bg-[#FAFAF7] transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <h1 className="text-[28px] font-semibold text-[#1A1A1A] tracking-tight">{profile.name}</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div>
        <h2 className="text-[18px] font-medium text-[#1A1A1A] mb-4">Account Details</h2>
        <div className="bg-white rounded-[24px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-medium text-[rgba(38,35,35,0.5)]">Email Address</span>
              <div className="h-11 px-4 rounded-[10px] border border-[#E5E5E5] bg-[#FAFAF7] flex items-center text-[15px] text-[#1A1A1A]">
                {profile.email}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-medium text-[rgba(38,35,35,0.5)]">Role</span>
              <div className="h-11 px-4 rounded-[10px] border border-[#E5E5E5] bg-[#FAFAF7] flex items-center text-[15px] text-[#1A1A1A]">
                {profile.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
