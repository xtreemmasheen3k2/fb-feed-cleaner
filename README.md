# FB Feed Cleaner

Userscript for the Facebook feed. It outlines posts that contain the current Sponsored label link. Hiding is off by default.

Install with Tampermonkey or Violentmonkey. Greasy Fork listing: https://greasyfork.org/en/scripts/598911-fb-feed-cleaner

## Defaults

- Debug outline: on
- Hide hits: off

Both are in the script-manager menu. Changing one reloads the page. A saved choice overrides the default on later visits.

## What it matches

A feed post with a link that has target="_blank", an href starting with `?`, `__cft__` in the href, and no `__tn__`. A followed page sharing an outside link is not enough.

## Limits

This does not catch every ad. It was checked on one English feed. The feed may stop loading if hiding is on; turn hiding off if that happens. The script makes no requests and collects nothing.

MIT License.
