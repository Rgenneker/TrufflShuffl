import { useEffect, useRef } from "react";

const AD_INVOKE_URL =
  "https://pl29742062.effectivecpmnetwork.com/ad0a4242c48089c8f2af3f8331cc6c92/invoke.js";
const CONTAINER_ID = "container-ad0a4242c48089c8f2af3f8331cc6c92";

/**
 * Native ad banner for effectivecpmnetwork.
 *
 * The container div is rendered statically so it is present in the DOM
 * before the invoke script is appended to document.body via useEffect.
 * The script is always appended to <body> — NOT inside the wrapper div —
 * which is what the ad network requires to execute correctly.
 */
export function NativeAdBanner({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = AD_INVOKE_URL;

    // Must be appended to body — appending inside a div prevents the
    // ad network from initialising correctly on most browsers.
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (el) el.innerHTML = "";
    };
  }, []);

  // Container div rendered statically — it must already be in the DOM
  // when the invoke.js script runs.
  return (
    <div
      id={CONTAINER_ID}
      ref={containerRef}
      className={className}
    />
  );
}
