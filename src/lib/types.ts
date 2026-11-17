// Shapes mirror the planned Strapi v5 content types.
// Replace the mock data in lib/data.ts with REST calls to Strapi later.

export type MilestoneStatus = "not_started" | "in_progress" | "under_review" | "completed";

export interface Milestone {
  id: string;
  title: string;
  dueDate: string; // ISO date
  status: MilestoneStatus;
}

export interface DocumentVersion {
  id: string;
  version: number;
  fileName: string;
  fileType: "PDF" | "DOCX" | "ZIP";
  size: string;
  changeNote: string;
  uploadedAt: string; // ISO datetime
  uploadedBy: string;
}

export interface Comment {
  id: string;
  author: string;
  initials: string;
  role: "Student" | "Supervisor";
  version: number;
  createdAt: string; // relative label for the mockup
  text: string;
  quote?: string;
  resolved?: boolean;
  isReply?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  abstract: string;
  area: string;
  year: number;
  keywords: string[];
  author: string;
  authorInitials: string;
  supervisor: string;
  cover: { bg: string; c1: string; c2: string };
  milestones?: Milestone[];
}
