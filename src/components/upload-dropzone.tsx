"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ALLOWED = [".pdf", ".docx", ".zip"];
const MAX_MB = 50;

// FR-04: client-side type & size validation (repeat the same check on the server / Strapi upload)
export function UploadDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function validate(f: File) {
    const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED.includes(ext)) return `Only PDF, DOCX or ZIP files are allowed.`;
    if (f.size > MAX_MB * 1024 * 1024) return `File is larger than ${MAX_MB} MB.`;
    return null;
  }

  function pick(f: File | undefined) {
    if (!f) return;
    const err = validate(f);
    setError(err);
    setFile(err ? null : f);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files[0]);
        }}
        className={cn(
          "flex flex-wrap items-center gap-[18px] rounded-[14px] border-[1.5px] border-dashed border-[#C5CBD4] bg-[#FAFBFC] p-[22px] transition-colors",
          dragging && "border-primary bg-primary-soft"
        )}
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
          <Upload className="size-[22px] text-primary" aria-hidden />
        </span>
        <div className="flex-[1_1_220px]">
          <div className="text-[15px] font-semibold">{file ? file.name : "Upload a new version"}</div>
          <div className="mt-0.5 text-[13px] text-muted">
            {file
              ? `${(file.size / 1024 / 1024).toFixed(1)} MB · ready to upload as v4`
              : `Drag a file here or browse. PDF, DOCX or ZIP, up to ${MAX_MB} MB.`}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED.join(",")}
          className="sr-only"
          aria-label="Choose file to upload"
          onChange={(e) => pick(e.target.files?.[0])}
        />
        <Button type="button" onClick={() => inputRef.current?.click()}>
          {file ? "Change file" : "Choose file"}
        </Button>
      </div>
      {file && (
        <div className="mt-3 flex flex-wrap gap-2.5">
          <label htmlFor="change-note" className="sr-only">
            Change note
          </label>
          <input
            id="change-note"
            placeholder="Change note — what changed in this version?"
            className="h-11 flex-[1_1_260px] rounded-[10px] border border-border-strong px-3 text-sm outline-none focus:border-primary"
          />
          <Button type="button" variant="dark">
            Upload version
          </Button>
        </div>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-danger-fg">
          {error}
        </p>
      )}
    </div>
  );
}
