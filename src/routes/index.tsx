import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileImage,
  FileText,
  FolderOpen,
  Handshake,
  LayoutDashboard,
  Link2,
  MessageSquareText,
  ShieldCheck,
  Upload,
  UsersRound,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Role = "candidate" | "employer";
type CandidateTab = "overview" | "evidence" | "portfolio" | "network";
type AssessmentResult = "passed" | "retry" | null;

const candidateNav: { id: CandidateTab; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "evidence", label: "My evidence", icon: FileCheck2 },
  { id: "portfolio", label: "Portfolio", icon: FolderOpen },
  { id: "network", label: "Vouches", icon: UsersRound },
];

const employerCandidates = [
  { name: "Amina Yusuf", trade: "Electrical installation", score: 78, initials: "AY", tone: "bg-success/10 text-success", note: "3 skills ready to review", status: "New" },
  { name: "Kojo Mensah", trade: "Solar panel installation", score: 91, initials: "KM", tone: "bg-warning/15 text-warning-foreground", note: "2 employer vouches", status: "Strong match" },
  { name: "Esi Owusu", trade: "Care assistance", score: 84, initials: "EO", tone: "bg-secondary text-secondary-foreground", note: "Portfolio updated today", status: "New" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillBridge — Skills & proof" },
      { name: "description", content: "Build a trusted record of real-world skills through practical assessments, work samples, and people who know your work." },
      { property: "og:title", content: "SkillBridge — Skills & proof" },
      { property: "og:description", content: "Validate hands-on experience with low-barrier assessments, practical proof, and trusted endorsements." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillBridgeApp,
});

function SkillBridgeApp() {
  const [role, setRole] = useState<Role>("candidate");
  const [activeTab, setActiveTab] = useState<CandidateTab>("overview");
  const [score, setScore] = useState(78);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [answer, setAnswer] = useState<number | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult>(null);
  const [proofName, setProofName] = useState("");
  const [checklist, setChecklist] = useState([false, false, false]);
  const [inviteUrl, setInviteUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [reviewedCandidates, setReviewedCandidates] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!assessmentOpen || assessmentResult) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setAssessmentResult("retry");
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [assessmentOpen, assessmentResult]);

  function startAssessment() {
    setSecondsLeft(60);
    setAnswer(null);
    setAssessmentResult(null);
    setAssessmentOpen(true);
  }

  function submitAssessment() {
    if (answer === null || assessmentResult) return;
    if (answer === 0) {
      setAssessmentResult("passed");
      setScore((current) => Math.min(100, current + 4));
    } else {
      setAssessmentResult("retry");
    }
  }

  function createInvite() {
    setInviteUrl(`${window.location.origin}/verify/amina-yusuf?skill=electrical-safety`);
    setCopied(false);
  }

  async function copyInvite() {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function toggleReviewed(name: string) {
    setReviewedCandidates((current) =>
      current.includes(name) ? current.filter((candidate) => candidate !== name) : [...current, name],
    );
  }

  function navigateTo(tab: CandidateTab) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card px-5 py-6 lg:flex">
          <BrandMark />
          {role === "candidate" ? (
            <Navigation activeTab={activeTab} onSelect={navigateTo} />
          ) : (
            <EmployerNavigation />
          )}
          <div className="mt-auto border-t border-border pt-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">AY</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Amina Yusuf</p>
                <p className="text-xs text-muted-foreground">Candidate account</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Account options" title="Account options" className="ml-auto shrink-0">
                <CircleHelp aria-hidden="true" />
              </Button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-24 lg:pb-10">
          <header className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-7 lg:px-10">
            <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3">
              <div className="lg:hidden"><BrandMark compact /></div>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold">Skills that travel with you</p>
                <p className="text-xs text-muted-foreground">A clearer way to show what you can do.</p>
              </div>
              <RoleSwitcher role={role} onChange={setRole} />
            </div>
          </header>

          <div className="mx-auto max-w-[1120px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
            {role === "candidate" ? (
              <CandidateWorkspace
                activeTab={activeTab}
                assessmentResult={assessmentResult}
                checklist={checklist}
                copied={copied}
                fileInput={fileInput}
                inviteUrl={inviteUrl}
                onChecklistChange={(index, checked) => setChecklist((current) => current.map((item, itemIndex) => itemIndex === index ? checked : item))}
                onCreateInvite={createInvite}
                onCopyInvite={copyInvite}
                onFileChange={(file) => setProofName(file?.name ?? "")}
                onNavigate={navigateTo}
                onStartAssessment={startAssessment}
                onToggleAssessment={() => setAssessmentOpen((current) => !current)}
                proofName={proofName}
                score={score}
                fileInputRef={fileInput}
              />
            ) : (
              <EmployerWorkspace reviewedCandidates={reviewedCandidates} onToggleReviewed={toggleReviewed} />
            )}
          </div>
        </main>
      </div>

      {role === "candidate" && (
        <nav aria-label="Candidate navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 lg:hidden">
          <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
            {candidateNav.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant="ghost"
                className={`h-14 flex-col gap-1 rounded-md px-1 text-[11px] ${activeTab === id ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
                aria-current={activeTab === id ? "page" : undefined}
                onClick={() => navigateTo(id)}
              >
                <Icon className="size-[18px]" aria-hidden="true" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </nav>
      )}

      {assessmentOpen && (
        <AssessmentDialog
          answer={answer}
          result={assessmentResult}
          secondsLeft={secondsLeft}
          onAnswer={setAnswer}
          onClose={() => setAssessmentOpen(false)}
          onSubmit={submitAssessment}
          onRetry={startAssessment}
        />
      )}
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
        <ShieldCheck className="size-5" aria-hidden="true" />
      </span>
      <div className={compact ? "block" : "block"}>
        <p className="text-[17px] font-bold leading-tight">SkillBridge</p>
        {!compact && <p className="mt-0.5 text-[11px] text-muted-foreground">Skills, seen clearly</p>}
      </div>
    </div>
  );
}

function RoleSwitcher({ role, onChange }: { role: Role; onChange: (role: Role) => void }) {
  return (
    <div aria-label="Switch demo role" className="flex shrink-0 items-center gap-1 rounded-md border border-border bg-card p-1">
      <Button variant="ghost" size="sm" aria-pressed={role === "candidate"} onClick={() => onChange("candidate")} className={`h-8 px-2.5 text-xs sm:px-3 ${role === "candidate" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"}`}>
        <UsersRound aria-hidden="true" /> <span>Candidate</span>
      </Button>
      <Button variant="ghost" size="sm" aria-pressed={role === "employer"} onClick={() => onChange("employer")} className={`h-8 px-2.5 text-xs sm:px-3 ${role === "employer" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"}`}>
        <BriefcaseBusiness aria-hidden="true" /> <span>Employer</span>
      </Button>
    </div>
  );
}

function Navigation({ activeTab, onSelect }: { activeTab: CandidateTab; onSelect: (tab: CandidateTab) => void }) {
  return (
    <nav aria-label="Main navigation" className="mt-10 space-y-1">
      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">My workspace</p>
      {candidateNav.map(({ id, label, icon: Icon }) => (
        <Button key={id} variant="ghost" aria-current={activeTab === id ? "page" : undefined} onClick={() => onSelect(id)} className={`h-11 w-full justify-start rounded-md px-3 ${activeTab === id ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
          <Icon aria-hidden="true" /> <span>{label}</span>
          {id === "evidence" && <span className="ml-auto rounded-sm bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">4</span>}
        </Button>
      ))}
      <Button variant="ghost" className="mt-7 h-11 w-full justify-start rounded-md px-3 text-muted-foreground"><CircleHelp aria-hidden="true" /><span>Help & support</span></Button>
    </nav>
  );
}

function EmployerNavigation() {
  return (
    <nav aria-label="Employer navigation" className="mt-10 space-y-1">
      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Talent workspace</p>
      <Button variant="ghost" aria-current="page" className="h-11 w-full justify-start rounded-md bg-accent px-3 text-accent-foreground"><LayoutDashboard aria-hidden="true" /><span>Candidate matches</span></Button>
      <Button variant="ghost" className="h-11 w-full justify-start rounded-md px-3 text-muted-foreground"><FileCheck2 aria-hidden="true" /><span>Skill standards</span></Button>
      <Button variant="ghost" className="h-11 w-full justify-start rounded-md px-3 text-muted-foreground"><MessageSquareText aria-hidden="true" /><span>Team reviews</span></Button>
    </nav>
  );
}

type CandidateWorkspaceProps = {
  activeTab: CandidateTab;
  assessmentResult: AssessmentResult;
  checklist: boolean[];
  copied: boolean;
  fileInput: React.RefObject<HTMLInputElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  inviteUrl: string;
  proofName: string;
  score: number;
  onChecklistChange: (index: number, checked: boolean) => void;
  onCreateInvite: () => void;
  onCopyInvite: () => void;
  onFileChange: (file: File | undefined) => void;
  onNavigate: (tab: CandidateTab) => void;
  onStartAssessment: () => void;
  onToggleAssessment: () => void;
};

function CandidateWorkspace({
  activeTab,
  assessmentResult,
  checklist,
  copied,
  fileInput,
  fileInputRef,
  inviteUrl,
  proofName,
  score,
  onChecklistChange,
  onCreateInvite,
  onCopyInvite,
  onFileChange,
  onNavigate,
  onStartAssessment,
}: CandidateWorkspaceProps) {
  const isOverview = activeTab === "overview";
  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-success"><span className="size-2 rounded-full bg-success" /> YOUR SKILLS & PROOF</p>
          <h1 className="text-2xl font-bold tracking-normal sm:text-3xl">{isOverview ? "Good morning, Amina" : candidateNav.find((item) => item.id === activeTab)?.label}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{isOverview ? "Your experience is worth showing. Keep building your proof." : "Your hands-on experience, gathered in one place."}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="grid size-9 place-items-center rounded-full bg-accent font-semibold text-accent-foreground">AY</span>
          <span><span className="block font-semibold text-foreground">Amina Yusuf</span><span className="text-xs">Accra, Ghana</span></span>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          <section aria-label="Skill profile" className="grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold">Electrical installation</h2>
                <span className="inline-flex items-center gap-1 rounded-sm bg-success/10 px-2 py-1 text-xs font-medium text-success"><BadgeCheck className="size-3.5" aria-hidden="true" /> Trade profile</span>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Show employers the safety, installation, and troubleshooting skills you’ve built on the job.</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-4 text-success" aria-hidden="true" /> 6 skills listed</span>
                <span className="inline-flex items-center gap-1.5"><UsersRound className="size-4" aria-hidden="true" /> 2 people vouching</span>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <div className="min-w-0">
                <div className="flex items-baseline gap-1.5"><span className="text-4xl font-bold tabular-nums">{score}</span><span className="text-sm text-muted-foreground">/ 100</span></div>
                <p className="mt-1 text-xs font-medium text-muted-foreground">Verification score</p>
                <div className="mt-3 h-2 w-36 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-label="Verification score" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${score}%` }} /></div>
              </div>
              <span className="grid size-12 place-items-center rounded-full bg-success/10 text-success"><Award className="size-6" aria-hidden="true" /></span>
            </div>
          </section>

          <div className="grid gap-7 xl:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.8fr)]">
            <div className="space-y-7">
              <EvidenceBuilder
                checklist={checklist}
                fileInput={fileInputRef}
                onChecklistChange={onChecklistChange}
                onFileChange={onFileChange}
                onStartAssessment={onStartAssessment}
                proofName={proofName}
                result={assessmentResult}
              />
              <PortfolioPreview onNavigate={onNavigate} />
            </div>
            <div className="space-y-5">
              <VerificationProgress checklist={checklist} proofName={proofName} score={score} />
              <VouchPreview inviteUrl={inviteUrl} copied={copied} onCreateInvite={onCreateInvite} onCopyInvite={onCopyInvite} onNavigate={onNavigate} />
            </div>
          </div>
        </>
      )}

      {activeTab === "evidence" && (
        <div className="grid gap-7 xl:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.8fr)]">
          <EvidenceBuilder
            checklist={checklist}
            fileInput={fileInput}
            onChecklistChange={onChecklistChange}
            onFileChange={onFileChange}
            onStartAssessment={onStartAssessment}
            proofName={proofName}
            result={assessmentResult}
          />
          <VerificationProgress checklist={checklist} proofName={proofName} score={score} />
        </div>
      )}

      {activeTab === "portfolio" && <PortfolioGallery />}
      {activeTab === "network" && <VouchPage inviteUrl={inviteUrl} copied={copied} onCreateInvite={onCreateInvite} onCopyInvite={onCopyInvite} />}
    </div>
  );
}

function SectionHeading({ title, detail, action }: { title: string; detail: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div><h2 className="text-lg font-bold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{detail}</p></div>
      {action}
    </div>
  );
}

function EvidenceBuilder({
  checklist,
  fileInput,
  onChecklistChange,
  onFileChange,
  onStartAssessment,
  proofName,
  result,
}: {
  checklist: boolean[];
  fileInput: React.RefObject<HTMLInputElement | null>;
  onChecklistChange: (index: number, checked: boolean) => void;
  onFileChange: (file: File | undefined) => void;
  onStartAssessment: () => void;
  proofName: string;
  result: AssessmentResult;
}) {
  return (
    <section className="space-y-4" aria-label="Build your evidence">
      <SectionHeading title="Build your proof" detail="Four practical ways to show what you know." />
      <div className="grid gap-3 sm:grid-cols-2">
        <EvidenceCard icon={Clock3} eyebrow="5 MINUTES" title="Quick skill check" detail="Show how you handle a real job-site scenario." status={result === "passed" ? "Passed" : result === "retry" ? "Try again" : "Ready"} statusTone={result === "passed" ? "success" : result === "retry" ? "warning" : "neutral"}>
          <Button size="sm" onClick={onStartAssessment} className="mt-4 w-full justify-between">{result === "passed" ? "Practice another" : "Start quick check"}<ArrowRight aria-hidden="true" /></Button>
        </EvidenceCard>

        <EvidenceCard icon={Video} eyebrow="PHOTO OR VIDEO" title="Show your work" detail="Share a short clip or photo of a completed task." status={proofName ? "Added" : "Not started"} statusTone={proofName ? "success" : "neutral"}>
          <input ref={fileInput} className="sr-only" type="file" accept="image/*,video/*" aria-label="Choose a work photo or video" onChange={(event) => onFileChange(event.currentTarget.files?.[0])} />
          <Button size="sm" variant="outline" onClick={() => fileInput.current?.click()} className="mt-4 w-full justify-between">{proofName ? "Choose another file" : "Choose photo or video"}<Upload aria-hidden="true" /></Button>
          {proofName && <p className="mt-2 truncate text-xs text-success" title={proofName}>{proofName}</p>}
          <div className="mt-3 space-y-2 border-t border-border pt-3">
            <p className="text-xs font-semibold">Safety checklist</p>
            {["Power isolated", "Tools checked", "Work area left safe"].map((label, index) => (
              <label key={label} className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <Checkbox checked={checklist[index] ?? false} onCheckedChange={(checked) => onChecklistChange(index, checked === true)} aria-label={label} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </EvidenceCard>

        <EvidenceCard icon={FolderOpen} eyebrow="YOUR WORK, YOUR STORY" title="Digital portfolio" detail="Bring projects, client notes, and samples together." status="3 items" statusTone="neutral">
          <div className="mt-4 flex items-center justify-between rounded-md bg-secondary/70 px-3 py-2.5">
            <span className="flex items-center gap-2 text-xs font-medium"><FileImage className="size-4 text-primary" aria-hidden="true" />Recent projects</span>
            <span className="text-xs text-muted-foreground">3 samples</span>
          </div>
        </EvidenceCard>

        <EvidenceCard icon={Handshake} eyebrow="PEOPLE WHO KNOW YOUR WORK" title="Ask for a vouch" detail="Invite a former boss or colleague to confirm a skill." status="2 received" statusTone="success">
          <div className="mt-4 flex items-center gap-2 rounded-md bg-success/10 px-3 py-2.5 text-xs text-success"><CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />Kwame and Kofi confirmed your skills</div>
        </EvidenceCard>
      </div>
    </section>
  );
}

function EvidenceCard({
  children,
  detail,
  eyebrow,
  icon: Icon,
  status,
  statusTone,
  title,
}: {
  children: React.ReactNode;
  detail: string;
  eyebrow: string;
  icon: LucideIcon;
  status: string;
  statusTone: "neutral" | "success" | "warning";
  title: string;
}) {
  const statusClass = statusTone === "success" ? "bg-success/10 text-success" : statusTone === "warning" ? "bg-warning/15 text-warning-foreground" : "bg-secondary text-secondary-foreground";
  return (
    <article className="flex min-w-0 flex-col rounded-lg border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground"><Icon className="size-5" aria-hidden="true" /></span>
        <span className={`max-w-[50%] truncate rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusClass}`}>{status}</span>
      </div>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
      <h3 className="mt-1 text-base font-bold">{title}</h3>
      <p className="mt-1 min-h-10 text-sm leading-5 text-muted-foreground">{detail}</p>
      {children}
    </article>
  );
}

function VerificationProgress({ checklist, proofName, score }: { checklist: boolean[]; proofName: string; score: number }) {
  const completeCount = checklist.filter(Boolean).length + (proofName ? 1 : 0);
  const steps = [
    { label: "Create your skill profile", complete: true, icon: CheckCircle2 },
    { label: "Complete a quick skill check", complete: score > 78, icon: FileCheck2 },
    { label: "Add a photo or video", complete: Boolean(proofName), icon: Upload },
    { label: "Get a work reference", complete: true, icon: UsersRound },
  ];
  return (
    <section className="rounded-lg border border-border bg-card p-5" aria-label="Verification progress">
      <div className="flex items-start justify-between gap-3">
        <div><h2 className="font-bold">Your progress</h2><p className="mt-1 text-xs text-muted-foreground">A few steps make your skills easier to trust.</p></div>
        <span className="text-lg font-bold tabular-nums text-primary">{completeCount + (score > 78 ? 1 : 0)}<span className="text-xs font-medium text-muted-foreground"> / 6</span></span>
      </div>
      <div className="mt-5 space-y-4">
        {steps.map(({ label, complete, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3">
            <span className={`grid size-8 shrink-0 place-items-center rounded-full ${complete ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>{complete ? <Check className="size-4" aria-hidden="true" /> : <Icon className="size-4" aria-hidden="true" />}</span>
            <span className={`text-xs ${complete ? "font-medium text-foreground" : "text-muted-foreground"}`}>{label}</span>
            {complete && <span className="sr-only">Complete</span>}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-md bg-accent/70 p-3">
        <p className="flex items-center gap-2 text-xs font-semibold text-accent-foreground"><ArrowDownRight className="size-4" aria-hidden="true" />Your next step</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{proofName ? "Check the safety steps above, then share your work." : "Add one photo or video from a job you’re proud of."}</p>
      </div>
    </section>
  );
}

function PortfolioPreview({ onNavigate }: { onNavigate: (tab: CandidateTab) => void }) {
  return (
    <section className="space-y-4" aria-label="Portfolio preview">
      <SectionHeading title="Work worth sharing" detail="A few examples from your experience." action={<Button variant="ghost" size="sm" onClick={() => onNavigate("portfolio")} className="text-primary">View portfolio <ChevronRight aria-hidden="true" /></Button>} />
      <div className="grid gap-3 sm:grid-cols-3">
        <PortfolioItem icon={BriefcaseBusiness} title="Home rewiring" category="Residential · 2025" color="bg-accent text-accent-foreground" />
        <PortfolioItem icon={ShieldCheck} title="Panel safety check" category="Maintenance · 2024" color="bg-success/10 text-success" />
        <PortfolioItem icon={FileText} title="Client feedback" category="Testimonial · Kwame A." color="bg-warning/15 text-warning-foreground" />
      </div>
    </section>
  );
}

function PortfolioGallery() {
  const items = [
    { icon: BriefcaseBusiness, title: "Home rewiring", category: "Residential · 2025", description: "Replaced worn wiring and outlets in a two-bedroom home, then tested each circuit." },
    { icon: ShieldCheck, title: "Panel safety check", category: "Maintenance · 2024", description: "Inspected breakers, labelled circuits, and documented the safe isolation process." },
    { icon: FileText, title: "Client feedback", category: "Testimonial · Kwame A.", description: "“Amina explained each step and finished the work safely and on time.”" },
  ];
  return (
    <section className="space-y-5" aria-label="Portfolio gallery">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold">Your portfolio</h2><p className="mt-1 text-sm text-muted-foreground">A simple record of work you’re proud to stand behind.</p></div><Button variant="outline" size="sm"><Upload aria-hidden="true" />Add a sample</Button></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(({ category, description, icon: Icon, title }, index) => (
          <article key={title} className="overflow-hidden rounded-lg border border-border bg-card">
            <div className={`flex aspect-[16/9] items-center justify-center ${index === 0 ? "bg-accent text-accent-foreground" : index === 1 ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"}`}><Icon className="size-10" strokeWidth={1.5} aria-hidden="true" /></div>
            <div className="p-4"><p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{category}</p><h3 className="mt-1 font-bold">{title}</h3><p className="mt-2 text-sm leading-5 text-muted-foreground">{description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VouchPreview({ inviteUrl, copied, onCreateInvite, onCopyInvite, onNavigate }: { inviteUrl: string; copied: boolean; onCreateInvite: () => void; onCopyInvite: () => void; onNavigate: (tab: CandidateTab) => void }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5" aria-label="Peer and employer vouches">
      <div className="flex items-start justify-between gap-2"><div><h2 className="font-bold">People who vouch for you</h2><p className="mt-1 text-xs text-muted-foreground">Trusted voices strengthen your profile.</p></div><span className="grid size-9 place-items-center rounded-md bg-success/10 text-success"><Handshake className="size-5" aria-hidden="true" /></span></div>
      <div className="mt-4 space-y-3">
        <VouchPerson initials="KM" name="Kwame Mensah" detail="Former supervisor · Safety" />
        <VouchPerson initials="KA" name="Kofi Asare" detail="Workmate · Installation" />
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <Button size="sm" className="w-full justify-between" onClick={onCreateInvite}>Invite someone to vouch <Link2 aria-hidden="true" /></Button>
        {inviteUrl && <div className="mt-3 space-y-2"><label htmlFor="share-link" className="text-xs font-medium">Share this verification link</label><div className="flex gap-2"><input id="share-link" readOnly value={inviteUrl} onFocus={(event) => event.currentTarget.select()} className="min-w-0 flex-1 rounded-md border border-input bg-background px-2 py-2 text-xs" /><Button size="icon" variant="outline" aria-label="Copy link" title="Copy link" onClick={onCopyInvite}><Link2 aria-hidden="true" /></Button></div><p aria-live="polite" className="text-xs text-success">{copied ? "Link copied" : "Select the link to copy it"}</p></div>}
      </div>
      <Button variant="ghost" size="sm" onClick={() => onNavigate("network")} className="mt-2 w-full text-muted-foreground">View all vouches <ChevronRight aria-hidden="true" /></Button>
    </section>
  );
}

function VouchPerson({ detail, initials, name }: { detail: string; initials: string; name: string }) {
  return <div className="flex items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">{initials}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{name}</p><p className="truncate text-[11px] text-muted-foreground">{detail}</p></div><BadgeCheck className="size-4 shrink-0 text-success" aria-label="Verified vouch" /></div>;
}

function VouchPage({ inviteUrl, copied, onCreateInvite, onCopyInvite }: { inviteUrl: string; copied: boolean; onCreateInvite: () => void; onCopyInvite: () => void }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
      <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
        <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-success/10 text-success"><Handshake className="size-5" aria-hidden="true" /></span><div><h2 className="font-bold">People who know your work</h2><p className="mt-1 text-sm text-muted-foreground">A colleague or former boss can confirm specific skills from real work.</p></div></div>
        <div className="mt-6 divide-y divide-border"><VouchPerson initials="KM" name="Kwame Mensah" detail="Former supervisor · Electrical safety" /><div className="py-4"><VouchPerson initials="KA" name="Kofi Asare" detail="Workmate · Installation and troubleshooting" /></div></div>
      </section>
      <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
        <h2 className="font-bold">Request a vouch</h2><p className="mt-1 text-sm leading-5 text-muted-foreground">Send a unique link to someone who has seen your work.</p>
        <Button className="mt-5 w-full justify-between" onClick={onCreateInvite}>Create a share link <ArrowUpRight aria-hidden="true" /></Button>
        {inviteUrl && <div className="mt-4 space-y-2"><label htmlFor="network-share-link" className="text-xs font-medium">Verification link</label><input id="network-share-link" readOnly value={inviteUrl} onFocus={(event) => event.currentTarget.select()} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-xs" /><Button size="sm" variant="outline" onClick={onCopyInvite} className="w-full"><Link2 aria-hidden="true" />{copied ? "Copied" : "Copy link"}</Button></div>}
        <p aria-live="polite" className="mt-3 text-xs text-muted-foreground">The person you invite can endorse a specific skill.</p>
      </section>
    </div>
  );
}

function EmployerWorkspace({ reviewedCandidates, onToggleReviewed }: { reviewedCandidates: string[]; onToggleReviewed: (name: string) => void }) {
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-success"><span className="size-2 rounded-full bg-success" /> TALENT WORKSPACE</p><h1 className="text-2xl font-bold sm:text-3xl">Skills, not just paper</h1><p className="mt-2 max-w-xl text-sm text-muted-foreground">Review practical evidence and trusted references alongside each candidate’s experience.</p></div><Button variant="outline" size="sm"><UsersRound aria-hidden="true" />3 candidates</Button></div>
      <section className="grid gap-3 sm:grid-cols-3" aria-label="Candidate summary">
        <MetricTile label="Ready to review" value="3" icon={FileCheck2} tone="bg-success/10 text-success" />
        <MetricTile label="Skills verified" value="12" icon={BadgeCheck} tone="bg-accent text-accent-foreground" />
        <MetricTile label="Employer vouches" value="8" icon={Handshake} tone="bg-warning/15 text-warning-foreground" />
      </section>
      <section className="overflow-hidden rounded-lg border border-border bg-card" aria-label="Candidates for review">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-5 py-4"><div><h2 className="font-bold">Candidate matches</h2><p className="mt-1 text-xs text-muted-foreground">Electrical and installation roles · Updated today</p></div><Button variant="outline" size="sm"><FileText aria-hidden="true" />Export list</Button></div>
        <div className="divide-y divide-border">
          {employerCandidates.map((candidate) => {
            const reviewed = reviewedCandidates.includes(candidate.name);
            return (
              <article key={candidate.name} className="grid gap-4 px-5 py-5 sm:grid-cols-[minmax(180px,1.15fr)_minmax(140px,1fr)_auto] sm:items-center">
                <div className="flex min-w-0 items-center gap-3"><span className={`grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold ${candidate.tone}`}>{candidate.initials}</span><div className="min-w-0"><h3 className="truncate text-sm font-bold">{candidate.name}</h3><p className="truncate text-xs text-muted-foreground">{candidate.trade}</p></div></div>
                <div className="flex items-center gap-3"><span className="min-w-10 text-lg font-bold tabular-nums">{candidate.score}</span><div className="min-w-0"><p className="text-xs font-medium">Verification score</p><p className="truncate text-[11px] text-muted-foreground">{candidate.note}</p></div></div>
                <div className="flex items-center justify-between gap-3 sm:justify-end"><span className={`rounded-sm px-2 py-1 text-[10px] font-semibold ${candidate.status === "Strong match" ? "bg-success/10 text-success" : "bg-secondary text-secondary-foreground"}`}>{reviewed ? "Reviewed" : candidate.status}</span><Button variant={reviewed ? "outline" : "default"} size="sm" onClick={() => onToggleReviewed(candidate.name)} aria-pressed={reviewed}>{reviewed ? "Undo review" : "Review profile"}<ChevronRight aria-hidden="true" /></Button></div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-border bg-card p-5"><h2 className="font-bold">What you can verify</h2><p className="mt-1 text-sm text-muted-foreground">Look at the evidence behind every skill.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><MetricTile label="Scenario assessments" value="Pass / retry" icon={Clock3} tone="bg-accent text-accent-foreground" /><MetricTile label="Trade proof" value="Photos & video" icon={Video} tone="bg-success/10 text-success" /></div></div>
        <div className="rounded-lg border border-border bg-accent/50 p-5"><ShieldCheck className="size-6 text-primary" aria-hidden="true" /><h2 className="mt-3 font-bold">Evidence before assumptions</h2><p className="mt-2 text-sm leading-5 text-muted-foreground">Each profile combines practical work, short skill checks, and endorsements from people who know the candidate.</p></div>
      </section>
    </div>
  );
}

function MetricTile({ icon: Icon, label, tone, value }: { icon: LucideIcon; label: string; tone: string; value: string }) {
  return <div className="rounded-md border border-border bg-background p-4"><span className={`grid size-9 place-items-center rounded-md ${tone}`}><Icon className="size-4" aria-hidden="true" /></span><p className="mt-4 text-lg font-bold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>;
}

function PortfolioItem({ category, color, icon: Icon, title }: { category: string; color: string; icon: LucideIcon; title: string }) {
  return <article className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card p-3"><span className={`grid size-12 shrink-0 place-items-center rounded-md ${color}`}><Icon className="size-5" aria-hidden="true" /></span><div className="min-w-0"><h3 className="truncate text-sm font-semibold">{title}</h3><p className="truncate text-xs text-muted-foreground">{category}</p></div><ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground" aria-hidden="true" /></article>;
}

function AssessmentDialog({
  answer,
  onAnswer,
  onClose,
  onRetry,
  onSubmit,
  result,
  secondsLeft,
}: {
  answer: number | null;
  onAnswer: (answer: number) => void;
  onClose: () => void;
  onRetry: () => void;
  onSubmit: () => void;
  result: AssessmentResult;
  secondsLeft: number;
}) {
  const options = [
    "Isolate the circuit and confirm it is de-energized before starting.",
    "Begin the work carefully and ask a coworker to watch.",
    "Use insulated tools and avoid touching exposed conductors.",
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/35 p-4" role="dialog" aria-modal="true" aria-labelledby="assessment-title">
      <div className="my-auto w-full max-w-lg rounded-lg border border-border bg-card p-5 shadow-xl sm:p-6">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-success">QUICK SKILL CHECK · ELECTRICAL SAFETY</p><h2 id="assessment-title" className="mt-2 text-xl font-bold">A safe first step</h2></div><Button variant="ghost" size="icon" aria-label="Close assessment" title="Close assessment" onClick={onClose}><X aria-hidden="true" /></Button></div>
        {!result ? <>
          <div className="mt-5 flex items-center justify-between rounded-md bg-secondary px-3 py-2 text-xs"><span className="font-medium">Choose the safest first action.</span><span className="inline-flex items-center gap-1.5 font-semibold tabular-nums"><Clock3 className="size-4" aria-hidden="true" />{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}</span></div>
          <p className="mt-5 text-sm leading-6">You arrive at a site to replace a faulty socket. The circuit may still be live. What should you do first?</p>
          <div className="mt-4 space-y-2">
            {options.map((option, index) => <Button key={option} variant="outline" aria-pressed={answer === index} onClick={() => onAnswer(index)} className={`h-auto min-h-12 w-full justify-start whitespace-normal py-3 text-left ${answer === index ? "border-primary bg-accent text-accent-foreground" : "text-foreground"}`}><span className="mr-1 grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold">{String.fromCharCode(65 + index)}</span>{option}</Button>)}
          </div>
          <Button onClick={onSubmit} disabled={answer === null} className="mt-5 w-full justify-between">Check my answer <ArrowRight aria-hidden="true" /></Button>
        </> : <div className="mt-6">
          <div className={`flex items-start gap-3 rounded-md p-4 ${result === "passed" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"}`}>
            {result === "passed" ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> : <CircleHelp className="mt-0.5 size-5 shrink-0" aria-hidden="true" />}
            <div><h3 className="font-bold">{result === "passed" ? "That’s the safe first step." : "Not quite — give it another try."}</h3><p className="mt-1 text-sm leading-5">{result === "passed" ? "Always isolate and test before work begins. Your verification score has been updated." : "Start by making the circuit safe, then confirm it is de-energized."}</p></div>
          </div>
          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button variant="outline" onClick={onClose}>Close</Button>{result === "retry" && <Button onClick={onRetry}>Try again</Button>}</div>
        </div>}
      </div>
    </div>
  );
}
