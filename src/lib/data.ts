import type { Comment, DocumentVersion, Milestone, Project } from "./types";

// ---------------------------------------------------------------------------
// Mock data. Every value here is sample content for the UI.
// Swap these for fetches to the Strapi REST API (e.g. /api/projects?populate=*).
// ---------------------------------------------------------------------------

export const researchAreas = [
  { name: "Computer Science", color: "#2B4FD8" },
  { name: "Engineering", color: "#5B6B82" },
  { name: "Environmental Science", color: "#1E7F4F" },
  { name: "Economics", color: "#C77A12" },
  { name: "Public Health", color: "#B42318" },
  { name: "Education", color: "#7A4CC2" },
  { name: "Social Sciences", color: "#0E7C86" },
  { name: "Mathematics", color: "#0E1726" },
];

export const currentMilestones: Milestone[] = [
  { id: "m1", title: "Proposal", dueDate: "2026-03-12", status: "completed" },
  { id: "m2", title: "Literature Review", dueDate: "2026-06-04", status: "completed" },
  { id: "m3", title: "Methodology", dueDate: "2026-08-20", status: "completed" },
  { id: "m4", title: "Implementation", dueDate: "2026-11-28", status: "under_review" },
  { id: "m5", title: "Final Report", dueDate: "2027-02-15", status: "not_started" },
];

export const projects: Project[] = [
  {
    id: "p1",
    slug: "urdu-speech-recognition",
    title: "Low-Resource Urdu Speech Recognition with Self-Supervised Models",
    abstract:
      "Fine-tuning wav2vec-style models on under 50 hours of labelled Urdu audio, with a new evaluation set of regional accents.",
    area: "Computer Science",
    year: 2026,
    keywords: ["speech recognition", "Urdu", "self-supervised learning"],
    author: "Ayesha Khan",
    authorInitials: "AK",
    supervisor: "Dr. Imran Siddiqui",
    cover: { bg: "#DCE5FF", c1: "#B9C9FF", c2: "#2B4FD8" },
    milestones: currentMilestones,
  },
  {
    id: "p2",
    slug: "indus-delta-salinity",
    title: "Groundwater Salinity Mapping in the Indus Delta",
    abstract:
      "Combining field samples with satellite indices to map salinity change across coastal districts over ten years.",
    area: "Environmental Science",
    year: 2025,
    keywords: ["groundwater", "remote sensing", "Indus Delta"],
    author: "Bilal Ahmed",
    authorInitials: "BA",
    supervisor: "Dr. Farah Naz",
    cover: { bg: "#D7EFE3", c1: "#AEDDC4", c2: "#1E7F4F" },
  },
  {
    id: "p3",
    slug: "microfinance-women-sindh",
    title: "Microfinance Access and Women-Led Small Businesses in Sindh",
    abstract:
      "A mixed-methods study of loan access, repayment and business growth among 400 women entrepreneurs.",
    area: "Economics",
    year: 2026,
    keywords: ["microfinance", "entrepreneurship", "gender"],
    author: "Sana Malik",
    authorInitials: "SM",
    supervisor: "Prof. Kamran Shah",
    cover: { bg: "#FCE9D2", c1: "#F7D2A6", c2: "#C77A12" },
  },
  {
    id: "p4",
    slug: "speech-to-sign",
    title: "Real-Time Speech-to-Sign Translation for Classroom Use",
    abstract:
      "A lightweight pipeline that converts lecture audio into sign-language avatars on low-cost tablets.",
    area: "Computer Science",
    year: 2025,
    keywords: ["accessibility", "speech", "edge devices"],
    author: "Hamza Raza",
    authorInitials: "HR",
    supervisor: "Dr. Nadia Qureshi",
    cover: { bg: "#E6E9F0", c1: "#C9D0DD", c2: "#5B6B82" },
  },
  {
    id: "p5",
    slug: "speech-feedback-english",
    title: "Speech Feedback Tools and Spoken English Confidence in Secondary Schools",
    abstract:
      "A semester-long classroom trial measuring how automated pronunciation feedback affects student confidence.",
    area: "Education",
    year: 2026,
    keywords: ["language learning", "speech feedback", "secondary education"],
    author: "Mariam Iqbal",
    authorInitials: "MI",
    supervisor: "Prof. Saima Javed",
    cover: { bg: "#EDE4FA", c1: "#D7C4F3", c2: "#7A4CC2" },
  },
  {
    id: "p6",
    slug: "synthetic-speech-detection",
    title: "Detecting Synthetic Speech in Low-Bandwidth Phone Calls",
    abstract:
      "Evaluates deepfake-audio detectors on compressed telephone audio and proposes a robust lightweight classifier.",
    area: "Computer Science",
    year: 2025,
    keywords: ["audio forensics", "deepfakes", "telephony"],
    author: "Usman Tariq",
    authorInitials: "UT",
    supervisor: "Dr. Imran Siddiqui",
    cover: { bg: "#D9F0F1", c1: "#AEDCDF", c2: "#0E7C86" },
  },
];

export const featuredProjects = projects.slice(0, 3);

export const versions: DocumentVersion[] = [
  {
    id: "v3",
    version: 3,
    fileName: "Chapter4_Implementation_v3.pdf",
    fileType: "PDF",
    size: "4.2 MB",
    changeNote: "Added ablation study on accent subsets and fixed WER table formatting.",
    uploadedAt: "2026-11-03T21:14:00",
    uploadedBy: "Ayesha Khan",
  },
  {
    id: "v2",
    version: 2,
    fileName: "Chapter4_Implementation_v2.docx",
    fileType: "DOCX",
    size: "1.8 MB",
    changeNote: "Rewrote training setup section after supervisor comments.",
    uploadedAt: "2026-10-22T18:02:00",
    uploadedBy: "Ayesha Khan",
  },
  {
    id: "v1",
    version: 1,
    fileName: "training_code_v1.zip",
    fileType: "ZIP",
    size: "12.6 MB",
    changeNote: "Initial training scripts and data preprocessing pipeline.",
    uploadedAt: "2026-10-09T11:40:00",
    uploadedBy: "Ayesha Khan",
  },
];

export const studentComments: Comment[] = [
  {
    id: "c1",
    author: "Dr. Imran Siddiqui",
    initials: "IS",
    role: "Supervisor",
    version: 3,
    createdAt: "2 hours ago",
    text: "Much stronger chapter. Please add confidence intervals to the accent results in Table 4.3 and explain why the Sindhi-accent subset performs worse.",
  },
  {
    id: "c2",
    author: "Ayesha Khan",
    initials: "AK",
    role: "Student",
    version: 3,
    createdAt: "1 hour ago",
    text: "Thank you. I will rerun the evaluation with bootstrapped intervals and upload v4 by Friday.",
    isReply: true,
  },
];

export const reviewComments: Comment[] = [
  {
    id: "r1",
    author: "Dr. Imran Siddiqui",
    initials: "IS",
    role: "Supervisor",
    version: 3,
    createdAt: "page 12",
    quote: "The model achieves its lowest word error rate on the Punjabi-accent subset…",
    text: "Add confidence intervals here. With only 14 Sindhi-accent speakers the gap may not be significant.",
  },
  {
    id: "r2",
    author: "Ayesha Khan",
    initials: "AK",
    role: "Student",
    version: 3,
    createdAt: "1 hour ago",
    text: "I will rerun the evaluation with bootstrapped intervals and upload v4 by Friday.",
  },
  {
    id: "r3",
    author: "Dr. Imran Siddiqui",
    initials: "IS",
    role: "Supervisor",
    version: 2,
    createdAt: "resolved",
    text: "Training setup is now clear. Resolved.",
    resolved: true,
  },
];

export const werResults = [
  { group: "Urdu (native)", speakers: 42, baseline: 18.4, finetuned: 9.7 },
  { group: "Punjabi accent", speakers: 35, baseline: 16.9, finetuned: 8.8 },
  { group: "Pashto accent", speakers: 21, baseline: 21.3, finetuned: 12.5 },
  { group: "Sindhi accent", speakers: 14, baseline: 27.6, finetuned: 17.9 },
];

// Supervisor dashboard — [completed, active, overdue] per student (5 milestones each)
export const studentProgress = [
  { name: "Ayesha Khan", completed: 3, active: 1, overdue: 0 },
  { name: "Hamza Raza", completed: 4, active: 1, overdue: 0 },
  { name: "Usman Tariq", completed: 2, active: 0, overdue: 1 },
  { name: "Mariam Iqbal", completed: 4, active: 0, overdue: 0 },
  { name: "Zainab Ali", completed: 1, active: 1, overdue: 1 },
  { name: "Omar Farooq", completed: 3, active: 1, overdue: 0 },
  { name: "Hira Saeed", completed: 2, active: 1, overdue: 0 },
  { name: "Danish Akhtar", completed: 1, active: 0, overdue: 1 },
];

export const overdueMilestones = [
  { initials: "UT", name: "Usman Tariq", milestone: "Implementation", late: "6 days late" },
  { initials: "ZA", name: "Zainab Ali", milestone: "Literature Review", late: "11 days late" },
  { initials: "DA", name: "Danish Akhtar", milestone: "Methodology", late: "2 days late" },
];

export const reviewQueue = [
  { name: "Ayesha Khan", project: "Urdu Speech Recognition", milestone: "Implementation", version: 3, submitted: "03 Nov 2026" },
  { name: "Hamza Raza", project: "Speech-to-Sign Translation", milestone: "Final Report", version: 2, submitted: "02 Nov 2026" },
  { name: "Omar Farooq", project: "Edge Inference for Crop Disease", milestone: "Methodology", version: 1, submitted: "01 Nov 2026" },
  { name: "Hira Saeed", project: "Code-Switching in Social Media Text", milestone: "Literature Review", version: 4, submitted: "01 Nov 2026" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function formatDate(iso: string, withYear = true) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", ...(withYear ? { year: "numeric" } : {}) });
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  return `${formatDate(iso)}, ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
}

export function progressOf(milestones: Milestone[]) {
  const done = milestones.filter((m) => m.status === "completed").length;
  return { done, total: milestones.length, percent: Math.round((done / milestones.length) * 100) };
}
