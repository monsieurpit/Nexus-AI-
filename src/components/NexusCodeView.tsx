import React, { useState } from 'react';
import { GitBranch, GitCommit, Loader2, Check, X } from 'lucide-react';

// "Nexus Code" — the repo-editing feature, native to this website. Reachable via the "Code"
// toggle in the top rail, right next to normal chat. Your own GitHub token, pasted fresh on
// every request and never stored, is the entire gatekeeper: it's the only thing that determines
// what repo can actually be pushed to.

interface LineDiffPart {
  added?: boolean;
  removed?: boolean;
  value: string;
}

interface Proposal {
  requestId: string;
  filePath: string;
  lineDiff: LineDiffPart[];
  patch: string;
}

type Step = 'form' | 'submitting' | 'diff' | 'applying' | 'done';

function Disclaimer() {
  return (
    <div className="rounded-[var(--nx-r-md)] border border-[var(--nx-warn)]/30 bg-[var(--nx-warn)]/10 p-4 text-sm leading-relaxed text-[var(--nx-text)]">
      <p className="mb-1 font-semibold text-[var(--nx-warn)]">⚠️ Before you use this</p>
      <p className="text-[var(--nx-text-muted)]">
        Nexus swears and can be crude in general — that's intentional, not a bug, and it can bleed
        into generated code comments or commit messages here. This is a small, local AI model — it{' '}
        <strong className="text-[var(--nx-text)]">will</strong> make mistakes, especially with code.
        You're responsible for reviewing every line of any diff before approving it. Patrick and Nexus
        are not responsible for anything that goes wrong with your repo as a result of this feature.
      </p>
    </div>
  );
}

function DiffView({ lineDiff }: { lineDiff: LineDiffPart[] }) {
  const rows: { type: 'add' | 'del' | 'ctx'; text: string }[] = [];
  for (const part of lineDiff) {
    const lines = part.value.split('\n');
    if (lines[lines.length - 1] === '') lines.pop();
    for (const line of lines) {
      rows.push({ type: part.added ? 'add' : part.removed ? 'del' : 'ctx', text: line });
    }
  }
  return (
    <div className="overflow-x-auto rounded-[var(--nx-r-md)] border border-[var(--nx-border)] bg-[var(--nx-bg)] font-mono text-xs">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`whitespace-pre px-3 py-0.5 ${
            row.type === 'add'
              ? 'bg-[var(--nx-success-soft)] text-[var(--nx-success)]'
              : row.type === 'del'
              ? 'bg-[var(--nx-danger-soft)] text-[var(--nx-danger)]'
              : 'text-[var(--nx-text-faint)]'
          }`}
        >
          <span className="mr-2 select-none opacity-60">{row.type === 'add' ? '+' : row.type === 'del' ? '-' : ' '}</span>
          {row.text || ' '}
        </div>
      ))}
    </div>
  );
}

export const NexusCodeView: React.FC = () => {
  const [step, setStep] = useState<Step>('form');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ repoUrl: '', filePath: '', instruction: '', githubToken: '' });
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [result, setResult] = useState<{ commitUrl: string | null } | null>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handlePropose(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setStep('submitting');
    try {
      const res = await fetch('/api/codeedit/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
      setProposal(body);
      setStep('diff');
    } catch (err: any) {
      setError(err.message);
      setStep('form');
    }
  }

  async function handleApprove() {
    if (!proposal) return;
    setError('');
    setStep('applying');
    try {
      const res = await fetch('/api/codeedit/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: proposal.requestId, githubToken: form.githubToken }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
      setResult(body);
      setStep('done');
    } catch (err: any) {
      setError(err.message);
      setStep('diff');
    }
  }

  function handleReject() {
    const requestId = proposal?.requestId;
    setProposal(null);
    setResult(null);
    setStep('form');
    fetch('/api/codeedit/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setError('');
      })
      .catch(() => {
        // The reject already went through locally; this just means the server-side lock
        // may not have released, which would surface as a "busy" error on the next propose.
        setError('Reject sent locally, but the server may not have released the edit lock — if your next proposal fails as busy, wait a moment and retry.');
      });
  }

  function handleStartOver() {
    setProposal(null);
    setResult(null);
    setError('');
    setForm((f) => ({ ...f, instruction: '' }));
    setStep('form');
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-5 overflow-y-auto px-6 py-8">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-[var(--nx-text)]">
          <GitBranch className="h-5 w-5 text-[var(--nx-accent)]" />
          Nexus Code
        </h1>
        <p className="mt-1 text-sm text-[var(--nx-text-muted)]">
          Nexus proposes a code change to your own GitHub repo — you review the exact diff before anything is pushed.
        </p>
      </div>

      <Disclaimer />

      {(step === 'form' || step === 'submitting') && (
        <form onSubmit={handlePropose} className="flex flex-col gap-4 rounded-[var(--nx-r-lg)] border border-[var(--nx-border)] bg-[var(--nx-surface)] p-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--nx-text-muted)]">Repo URL</label>
            <input
              value={form.repoUrl}
              onChange={set('repoUrl')}
              placeholder="https://github.com/yourname/yourrepo"
              className="w-full rounded-[var(--nx-r-sm)] border border-[var(--nx-border)] bg-[var(--nx-elevated)] px-3 py-2 text-sm text-[var(--nx-text)] placeholder-[var(--nx-text-faint)] outline-none focus:border-[var(--nx-accent)] focus:ring-2 focus:ring-[var(--nx-accent-ring)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--nx-text-muted)]">File path (one file only)</label>
            <input
              value={form.filePath}
              onChange={set('filePath')}
              placeholder="src/index.js"
              className="w-full rounded-[var(--nx-r-sm)] border border-[var(--nx-border)] bg-[var(--nx-elevated)] px-3 py-2 text-sm text-[var(--nx-text)] placeholder-[var(--nx-text-faint)] outline-none focus:border-[var(--nx-accent)] focus:ring-2 focus:ring-[var(--nx-accent-ring)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--nx-text-muted)]">Instruction</label>
            <textarea
              value={form.instruction}
              onChange={set('instruction')}
              rows={4}
              placeholder="Add a null check before using user.email"
              className="w-full resize-none rounded-[var(--nx-r-sm)] border border-[var(--nx-border)] bg-[var(--nx-elevated)] px-3 py-2 text-sm text-[var(--nx-text)] placeholder-[var(--nx-text-faint)] outline-none focus:border-[var(--nx-accent)] focus:ring-2 focus:ring-[var(--nx-accent-ring)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--nx-text-muted)]">
              GitHub token <span className="text-[var(--nx-text-faint)]">— write access to this repo only, never stored</span>
            </label>
            <input
              type="password"
              value={form.githubToken}
              onChange={set('githubToken')}
              placeholder="ghp_…"
              className="w-full rounded-[var(--nx-r-sm)] border border-[var(--nx-border)] bg-[var(--nx-elevated)] px-3 py-2 text-sm text-[var(--nx-text)] placeholder-[var(--nx-text-faint)] outline-none focus:border-[var(--nx-accent)] focus:ring-2 focus:ring-[var(--nx-accent-ring)]"
            />
          </div>

          {error && <p className="text-sm text-[var(--nx-danger)]">{error}</p>}

          <button
            type="submit"
            disabled={step === 'submitting'}
            className="flex items-center justify-center gap-2 rounded-[var(--nx-r-sm)] bg-[var(--nx-accent)] px-4 py-2 text-sm font-medium text-[var(--nx-on-accent)] transition-colors hover:bg-[var(--nx-accent-hover)] disabled:opacity-50"
          >
            {step === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
            {step === 'submitting' ? 'Nexus is working on it…' : 'Propose change'}
          </button>
        </form>
      )}

      {(step === 'diff' || step === 'applying') && proposal && (
        <div className="flex flex-col gap-4">
          <div className="rounded-[var(--nx-r-lg)] border border-[var(--nx-border)] bg-[var(--nx-surface)] p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--nx-text)]">
              <GitCommit className="h-4 w-4 text-[var(--nx-accent)]" />
              Nexus modifie <code className="rounded bg-[var(--nx-elevated)] px-1.5 py-0.5 font-mono text-[var(--nx-accent)]">{proposal.filePath}</code>
            </p>
            <DiffView lineDiff={proposal.lineDiff} />
          </div>

          {error && <p className="text-sm text-[var(--nx-danger)]">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              disabled={step === 'applying'}
              className="flex items-center gap-2 rounded-[var(--nx-r-sm)] bg-[var(--nx-success)] px-4 py-2 text-sm font-medium text-[#06231a] transition-colors hover:brightness-110 disabled:opacity-50"
            >
              {step === 'applying' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {step === 'applying' ? 'Pushing…' : 'Approve & push'}
            </button>
            <button
              onClick={handleReject}
              disabled={step === 'applying'}
              className="flex items-center gap-2 rounded-[var(--nx-r-sm)] bg-[var(--nx-elevated)] px-4 py-2 text-sm font-medium text-[var(--nx-text)] transition-colors hover:bg-[var(--nx-elevated-hover)] disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Reject
            </button>
          </div>
        </div>
      )}

      {step === 'done' && result && (
        <div className="rounded-[var(--nx-r-lg)] border border-[var(--nx-border)] bg-[var(--nx-surface)] p-5">
          <p className="mb-4 text-sm text-[var(--nx-text)]">
            Change pushed successfully.{' '}
            {result.commitUrl && (
              <a href={result.commitUrl} target="_blank" rel="noreferrer" className="text-[var(--nx-accent)] hover:underline">
                View the commit on GitHub →
              </a>
            )}
          </p>
          <button
            onClick={handleStartOver}
            className="rounded-[var(--nx-r-sm)] bg-[var(--nx-accent)] px-4 py-2 text-sm font-medium text-[var(--nx-on-accent)] transition-colors hover:bg-[var(--nx-accent-hover)]"
          >
            Propose another change
          </button>
        </div>
      )}
    </div>
  );
};
