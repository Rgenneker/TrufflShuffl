import { useEffect, useRef } from "react";

const AD_INVOKE_URL =
  "https://pl29742062.effectivecpmnetwork.com/ad0a4242c48089c8f2af3f8331cc6c92/invoke.js";
const CONTAINER_ID = "container-ad0a4242c48089c8f2af3f8331cc6c92";

/**
 * Injects the effectivecpmnetwork invoke script once per instance so each
 * mounted ad container is independently initialised by the network.
 */
export function NativeAdBanner({ className }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Container div the network expects
    const container = document.createElement("div");
    container.id = CONTAINER_ID;
    wrapper.appendChild(container);

    // Load invoke.js fresh — this makes the network discover the container above
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = AD_INVOKE_URL;
    wrapper.appendChild(script);

    return () => {
      wrapper.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={className}
    />
  );
}
