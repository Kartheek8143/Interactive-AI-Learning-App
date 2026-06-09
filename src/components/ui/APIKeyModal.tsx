'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';

interface Props { onClose: () => void; }

export default function APIKeyModal({ onClose }: Props) {
  const { apiKey, setApiKey, learningLevel, setLearningLevel } = useStore();
  const [key, setKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(key.trim());
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1000);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#111827', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f4ff', marginBottom: '4px' }}>⚙️ Settings</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Configure your AI learning experience</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 10px', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>✕</button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#a78bfa', marginBottom: '8px' }}>🔑 AI Provider Key / Host</label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="gsk_... or sk-or-... or ollama or AIzaSy..."
            className="input-field"
            style={{ fontFamily: 'monospace', width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
          />
          <div style={{ marginTop: '12px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>Supported Keys & Services:</span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: '10px', marginBottom: '2px' }}>⚡ GROQ (Llama 3) - Free</div>
                <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>Get free key (gsk_...)</a>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '10px', marginBottom: '2px' }}>♊ Gemini - Free</div>
                <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>Get free key (AIzaSy...)</a>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '10px', marginBottom: '2px' }}>🚀 OpenRouter - Free Models</div>
                <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>Get key (sk-or-...)</a>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '10px', marginBottom: '2px' }}>🏠 Ollama - Local/Offline</div>
                <span style={{ color: '#94a3b8' }}>Type <code style={{ color: '#fff' }}>ollama</code> to connect</span>
              </div>
            </div>
            
            <p style={{ color: '#4b5563', margin: '4px 0 0 0', lineHeight: '1.3' }}>
              Accepts standard OpenAI keys (<code style={{ color: '#94a3b8' }}>sk-...</code>). Stored locally in your browser.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#a78bfa', marginBottom: '12px' }}>🎓 Learning Level</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {(['beginner', 'intermediate', 'expert'] as const).map(level => (
              <button key={level} onClick={() => setLearningLevel(level)} style={{
                padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'center',
                background: learningLevel === level ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'rgba(255,255,255,0.05)',
                color: learningLevel === level ? '#fff' : '#94a3b8',
                border: learningLevel === level ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                  {level === 'beginner' ? '🌱' : level === 'intermediate' ? '🔥' : '⚡'}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>{level}</div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSave} style={{
          width: '100%', padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '15px',
          background: saved ? 'linear-gradient(135deg,#10b981,#06b6d4)' : 'linear-gradient(135deg,#7c3aed,#4f46e5)',
          color: 'white', transition: 'all 0.3s',
        }}>
          {saved ? '✅ Saved!' : '💾 Save Settings'}
        </button>
      </div>
    </div>
  );
}
