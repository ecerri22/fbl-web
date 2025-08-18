"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackBarProps = {
  defaultHref: string;
  defaultLabel: string;
  allHref: string;
  allLabel: string;
  homeHref?: string;
  onBack?: () => void;
  className?: string;
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
      onBack(); 
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
        <span className="text-xs sm:text-sm">{backLabel}</span>
      </button>

      {showAllLink && (
        <>
          <span className="text-neutral-300">•</span>
          <Link
            href={allHref}
            className="text-xs sm:text-sm text-neutral-600 hover:text-red-800"
          >
            {allLabel}
          </Link>
        </>
      )}
    </div>
  );
}
