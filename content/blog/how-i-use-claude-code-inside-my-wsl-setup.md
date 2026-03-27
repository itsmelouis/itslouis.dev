---
title: How I use Claude Code inside my WSL setup
description: Getting Claude Code's MCP servers to talk to Windows-side tools, plus the spec-driven workflow I use daily.
date: "2026-03-24"
tags: [claude, wsl, workflow, mcp]
---

I've been using Claude Code as my main AI coding assistant for a while now, and getting it to work properly inside WSL took more than I expected. This is the setup I landed on: part tutorial, part honest review.

## Why WSL makes things complicated

Claude Code runs natively in WSL, which is great. The problem starts when you want MCP servers that need to talk to Windows-side tools: browsers, design apps, anything with a GUI. WSL and Windows don't share the same network stack by default, so callbacks and port forwarding become your problem.

My two global MCP servers are Chrome DevTools and Figma. Both run on the Windows side, which means WSL can't reach them out of the box.

## Chrome DevTools MCP via `chrome-wsl`

The Chrome DevTools MCP lets Claude Code inspect live browser state (DOM, network requests, console) directly from the terminal. On a normal Linux machine it just works. On WSL, Chrome runs on Windows and exposes its remote debugging port on `127.0.0.1:9222` from Windows' perspective, not WSL's.

[chrome-wsl](https://github.com/dbalabka/chrome-wsl) bridges that gap. Here's what it does under the hood when you run it:

1. Detects the Windows host IP from inside WSL
2. Checks that a portproxy rule exists (`Windows IP:9222 -> 127.0.0.1:9222`) and that the firewall allows it. If either is missing, it prints the PowerShell admin commands you need to run once
3. Starts a `socat` process inside WSL that proxies the connection from `127.0.0.1:9222` (WSL) to the Windows Chrome debugging port
4. Launches Chrome on Windows with `--remote-debugging-port=9222`

The result: Claude Code sees `http://127.0.0.1:9222` as if Chrome was local.

Before each Claude Code session, run:

```bash
npx @dbalabka/chrome-wsl
```

And when you're done:

```bash
npx @dbalabka/chrome-wsl --stop
```

Then add the MCP server to your Claude Code config:

```json [~/.claude.json]
{
  "mcpServers": {
    "chrome": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "--browser-url=http://127.0.0.1:9222"]
    }
  }
}
```

### Automating the start/stop

Running `chrome-wsl` manually before every session gets old fast. [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/hooks) handle it automatically instead.

Install the package globally so the binary is available:
```bash
npm install -g @dbalabka/chrome-wsl
```

Then add these hooks to `~/.claude/settings.json`:
```json [~/.claude/settings.json]
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "chrome-wsl"
          }
        ]
      }
    ],
    "SessionEnd": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "chrome-wsl --stop"
          }
        ]
      }
    ]
  }
}
```

Chrome starts automatically when Claude Code opens, and shuts down cleanly when you exit with `/exit`.

## Giving Claude Code more context with skills

Claude Code works better when it knows what stack you're using. [skills.sh](https://skills.sh) is a CLI tool that lets you install curated context files (called skills) that get injected into your Claude Code sessions automatically. Think of them as structured documentation that Claude reads before touching your code.

Install them globally with `npx skills add -g <skill>` and they live in `~/.agents/skills/`. My current list:

**Nuxt / Vue ecosystem**
`nuxt`, `nuxt-ui`, `nuxt-content`, `nuxt-modules`, `nuxthub`, `nuxt-better-auth`, `vue`, `vueuse`, `vueuse-functions`, `reka-ui`

**Frontend & design**
`frontend-design`, `motion`, `superdesign`

**TypeScript**
`ts-library`

**SEO & marketing** *(useful for the portfolio)*
`seo-audit`, `schema-markup`, `programmatic-seo`, `social-content`

**Other**
`document-writer`, `skill-creator`

The Nuxt ones in particular make a real difference: Claude stops guessing about composables, module conventions, and Nuxt UI component APIs.

## How I actually use Claude Code day to day

My workflow goes beyond Plan Mode. I've adopted a spec-driven development approach, inspired by [Boris Tane's post](https://boristane.com/blog/how-i-use-claude-code/) and the [Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) from GitHub: never let Claude write code until there's a written, reviewed plan.

The core idea is to separate thinking from typing. Claude executes well, but decides less reliably without clear direction upfront.

Here's the flow for any non-trivial task:

::steps
### Research

Ask Claude to read the relevant parts of the codebase deeply before doing anything. The findings go into a `research.md` file, not just a chat response. If the research is wrong, everything downstream will be wrong.

### Plan

Claude writes a `plan.md` with a detailed implementation approach, code snippets, and the files it intends to touch. I use my own markdown file rather than Claude Code's built-in plan mode — it persists, I can edit it directly, and I stay in control of the architecture decisions.

### Annotate

Open `plan.md` in your editor and add inline notes: corrections, constraints, rejected approaches, domain knowledge Claude doesn't have. Then send it back: *"I added notes to the document, address them and update the plan, no code yet."* This cycle repeats until the plan is right.

### Implement

Once the plan is approved, let Claude run without interruption. By this point every decision has been made. Implementation should be boring.
::

The Chrome DevTools MCP fits naturally into the implementation phase: if something looks wrong in the browser, you can ask Claude to inspect the actual DOM state rather than describe it from memory.

::tip
Don't use Claude Code for anything you can write faster yourself: simple refactors, config files, one-liners. It earns its place on tasks where the context is large and keeping everything in your head is the hard part.
::

## Is it worth it on WSL?

Yes, but the tooling around it matters. WSL is where I do all my development: the Linux toolchain, Bash, Unix conventions. Claude Code fits naturally into that environment. The friction of managing MCP servers that live on the Windows side is real, but it's a one-time setup cost. chrome-wsl solves the Chrome side cleanly, and wrapping everything in a start script removes the last bit of manual overhead.

If you're on a similar setup, start with the wrapper script. The two minutes it takes to write will save you the context switch every time you open a new session.
