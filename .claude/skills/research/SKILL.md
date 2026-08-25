---
name: research
description: Answer research or factual questions by searching the web and grounding every claim in a credible, verifiable source with an inline citation. Use this whenever the user asks something that requires looking up current facts, statistics, news, scientific findings, legal/regulatory info, or "what is/how many/is it true that" style questions — even if they don't say "research" explicitly. Prioritizes primary sources, government (.gov), academic (.edu), and established reference/news outlets over forums, content farms, or unattributed blogs. Explicitly flags when no credible source can be found instead of guessing or relying on memory alone.
---

# Research

Answer the question by finding it in credible sources first, writing it down second. The
point of this skill isn't to sound authoritative — it's to make every claim traceable, so the
user (or anyone reading the answer later) can click through and verify it themselves.

## Workflow

1. **Search before answering.** Even if you're confident you already know the answer, look it
   up. Training knowledge goes stale and can't be cited — a live source can.
2. **Rank sources as you go.** When search results come back, sort them roughly like this:
   - **Tier 1 (prefer these):** primary sources — official statistics agencies, government
     sites (`.gov`), courts/regulators, academic journals and `.edu` sites, the original
     study/paper/filing/press release itself.
   - **Tier 2 (fine, especially for context/news):** established, edited news organizations
     and reference sources with a visible editorial/fact-checking process and named authors.
   - **Tier 3 (avoid; use only to lead you to a better source):** forums, Q&A sites, unedited
     blogs, content-farm SEO pages, aggregators with no named author, anything where you can't
     tell who wrote it or how it was checked, or pages that are themselves just repeating a
     claim without citing where it came from.
   When a Tier 2 or 3 source makes a factual claim (a number, a date, a quote), try to trace it
   back to the primary source it came from and cite that instead.
3. **Cross-check anything load-bearing.** For a specific number, date, or quote that the answer
   hinges on, look for a second independent source before stating it as fact. If sources
   disagree, say so rather than picking one silently.
4. **Write the answer with inline citations.** Every non-obvious factual claim gets a link to
   where it came from, placed right next to the claim (not just dumped in a list at the end).
   General framing, your own reasoning, or common knowledge doesn't need a citation — specific
   facts, figures, quotes, and claims about current events or research findings do.
5. **Before finalizing, audit your own links.** Go back over every citation you're about to use
   and check it against the tier table below — it's easy to grab whatever page had the number
   and move on, even if that page is itself just repeating a stat an aggregator or SEO site
   pulled from somewhere else. If a link you're about to cite is Tier 3, or is a secondary
   source restating a stat with no sourcing of its own, swap it for the primary source or a
   Tier 1/2 source instead. This is where most citation-quality slips happen, so don't skip it
   just because the answer already "looks" done.
6. **Say what you couldn't verify.** If a solid source doesn't exist for part of the question —
   too recent, too obscure, genuinely disputed, or you just can't find one — say that plainly
   instead of filling the gap from memory or a weak source. "I couldn't find a credible source
   for X" is a better answer than an uncited guess.

## What counts as credible (quick reference)

| Good | Be skeptical of |
|---|---|
| Government/regulatory sites (.gov), courts, official statistics bureaus | Anonymous blog posts, forum threads (Reddit, Quora) |
| Peer-reviewed journals, university (.edu) research pages | Content-farm "listicle" sites optimized for SEO, not accuracy |
| The primary document itself (study, filing, press release, transcript) | Sites that reword/aggregate news without adding sourcing |
| Established news outlets with named authors and editorial standards | Pages with no visible author, date, or sourcing |
| Reputable reference sources (e.g. major encyclopedias, standards bodies) | Anything that only cites itself or another uncited page |

This is a heuristic, not a strict whitelist — judge each source on transparency (who wrote it,
how would they know, do they cite where they got it) rather than just checking a domain suffix.

## Output format

Write the answer in prose or a short list, whichever fits the question, with citations inline
as markdown links right after the claim they support, e.g.:

> The FDA approved the drug in March 2024 ([FDA press release](https://...)).

If the question has multiple parts and some parts couldn't be verified, answer the verifiable
parts normally and add a short explicit note for the parts you couldn't confirm, naming what's
missing rather than leaving it implicit.
