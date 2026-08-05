# adhd-cure

Shapes how Claude answers: the recommendation up top, numbered steps with real
time estimates, then **one** labelled `Why:` block, then one small next action.

Most brevity skills strip explanation entirely and you end up trusting a list you
can't evaluate. This one keeps exactly one reason — the one behind the decision
that needed defending — and puts it after the steps so you can skip it.

## Before / after

**Before**

> Let's think about this. Adding a third language touches a few places, and
> there are some tradeoffs to weigh around how the existing code branches…

**After**

> **Do the lang-table refactor first, before any French data exists.**
>
> 1. **Lang table** (~2 hrs) — replace the 15 hardcoded ternaries
> 2. **Curriculum** (~half a day) — 15 JSONs, then add `'fr'` to `LANG_DIRS`
> 3. **VO** (~1 hr batch) — ~3,300 clips, ~15,000 credits
>
> **Why this order:** VO is the only step that costs real money and the hardest
> to redo. Ship 1–2 first and audition the voice against real words.
>
> **Next:** run `grep -c "=== 'it'" js/*.js` — that sizes step 1 exactly.

## Install

In an interactive Claude Code terminal:

```
/plugin marketplace add dylantrussell/adhd-cure
/plugin install adhd-cure@adhd-cure
```

Or clone it and point at the folder — edit `~/.claude/settings.json`:

```bash
git clone https://github.com/dylantrussell/adhd-cure.git ~/adhd-cure
```

```json
{
  "extraKnownMarketplaces": {
    "adhd-cure": {
      "source": { "source": "directory", "path": "/absolute/path/to/adhd-cure" }
    }
  },
  "enabledPlugins": { "adhd-cure@adhd-cure": true }
}
```

Restart Claude Code either way.

To apply it in sessions where plugin skills aren't loaded, also paste this into
`~/.claude/CLAUDE.md`:

> Lead with the action or the recommendation. Numbered steps for multi-step
> work, each with a concrete time estimate. Then **one** labelled `Why:` block,
> after the steps, covering only the decision that needed defending. End with
> one thing I can do in under a minute.
>
> Cap lists at 5. Restate where we are each turn. No preamble, no recap, no
> closing pleasantries.

## Customize

Everything lives in one file: `skills/adhd-cure/SKILL.md`.

- **Rename it** — change the folder name, the `name:` in the frontmatter, and
  both `.claude-plugin/*.json` files. All four must match.
- **Retune the shape** — the `## The shape` section is the whole opinion. Want
  more reasoning? Say "a `Why:` block per step." Want none? Delete rule 3.
- **Change what it triggers on** — the `description:` frontmatter decides that.
  It's deliberately broad ("ANY message") so it doesn't only fire when you
  remember to ask.
- **Adjust the escape hatches** — `## Break the shape when` is where you say
  which situations deserve full prose.

Keep it short. A 900-word style skill competes with your actual question for
attention; this one is under 450 on purpose.

## License

MIT
