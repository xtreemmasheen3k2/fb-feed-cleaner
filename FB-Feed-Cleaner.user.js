// ==UserScript==
// @name         FB Feed Cleaner
// @namespace    local.fb.feed.cleaner
// @version      0.6.2
// @description  Outlines Facebook feed posts that contain the current Sponsored label link. Hiding is off until you turn it on.
// @author       xtreemmasheen3k2
// @license      MIT
// @match        https://www.facebook.com/*
// @match        https://web.facebook.com/*
// @run-at       document-start
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
  "use strict";

  let debug = GM_getValue("debug", true);
  let hide = GM_getValue("hide", false);
  let hits = 0;

  const style = document.createElement("style");
  style.textContent = ".fbfc-hit{outline:3px solid #e11!important;outline-offset:2px}.fbfc-hit::before{content:attr(data-fbfc);position:absolute;z-index:99999;background:#e11;color:#fff;font:12px/1.2 sans-serif;padding:2px 6px}.fbfc-hide{display:none!important}";
  (document.documentElement || document.head).appendChild(style);

  const badge = document.createElement("div");
  badge.style.cssText = "position:fixed;left:8px;bottom:8px;z-index:2147483647;background:#111;color:#fff;font:12px/1 sans-serif;padding:6px 8px;border-radius:6px;pointer-events:none";
  badge.textContent = "FB clean …";
  const mount = () => document.documentElement.appendChild(badge);
  if (document.documentElement) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  function paint() {
    badge.textContent = "FB clean " + hits + (hide ? " hidden" : " outlined");
  }

  function mark(post) {
    if (!post || post.dataset.fbfc) return;
    post.dataset.fbfc = "ad:label";
    hits++;
    if (debug) post.classList.add("fbfc-hit");
    if (hide) post.classList.add("fbfc-hide");
    paint();
  }

  function scan(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll("a[target='_blank'][href^='?'][href*='__cft__']").forEach(a => {
      if ((a.getAttribute("href") || "").includes("__tn__")) return;
      mark(a.closest("[aria-posinset]"));
    });
    paint();
  }

  function arm() {
    scan(document);
    new MutationObserver(list => {
      for (const m of list) for (const n of m.addedNodes) if (n.nodeType === 1) scan(n);
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.body) arm();
  else document.addEventListener("DOMContentLoaded", arm);

  GM_registerMenuCommand("Debug outline: " + (debug ? "on" : "off"), () => {
    debug = !debug; GM_setValue("debug", debug); location.reload();
  });
  GM_registerMenuCommand("Hide hits: " + (hide ? "on" : "off"), () => {
    hide = !hide; GM_setValue("hide", hide); location.reload();
  });
})();
