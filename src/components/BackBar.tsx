"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackBarProps = {
  /** Where to go when not coming from "home" */
  defaultHref: string;
  /** Label when not coming from "home" */
  defaultLabel: string;
  /** Secondary link (always visible) */
  allHref: string;
  allLabel: string;
  /** Fallback target if from=home but no history (e.g., opened in new tab) */
  homeHref?: string;
  /** Optional: inline back handler (e.g., clear selection on News) */
  onBack?: () => void;
  className?: string;
  /** Hide the secondary link if needed */
  showAllLink?: boolean;
};

export default function BackBar({
  defaultHref,
  defaultLabel,
  allHref,
  allLabel,
  homeHref = "/",
  onBack,
  className = "",
  showAllLink = true,
}: BackBarProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from");

  const [hasHistory, setHasHistory] = useState(false);
  useEffect(() => {
    setHasHistory(window.history.length > 1);
  }, []);

  const handleBack = () => {
    if (from === "home") {
      if (hasHistory) router.back();
      else router.push(homeHref);
      return;
    }
    if (onBack) {
      onBack(); // e.g., clear selection in News list view
      return;
    }
    router.push(defaultHref);
  };

  const backLabel = from === "home" ? "Back to Home" : defaultLabel;

  return (
    <div className={`mb-8 max-[640px]:my-5 flex items-center gap-3 mb-6 ${className}`}>
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-red-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">{backLabel}</span>
      </button>

      {showAllLink && (
        <>
          <span className="text-neutral-300">•</span>
          <Link
            href={allHref}
            className="text-sm text-neutral-600 hover:text-red-800"
          >
            {allLabel}
          </Link>
        </>
      )}
    </div>
  );
}
