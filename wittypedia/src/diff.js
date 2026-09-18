/** Line diff in MediaWiki's two-column table format, with inline word marking. */

function lcsMatrixDiff(a, b) {
  // Myers would be nicer; for revision-sized text the classic LCS table is fine
  // and keeps the code auditable.
  const n = a.length, m = b.length;
  if (n * m > 4_000_000) return [{ type: 'replace', a, b }]; // absurd inputs: bail to whole-block
  const dp = new Uint32Array((n + 1) * (m + 1));
  const W = m + 1;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * W + j] = a[i] === b[j] ? dp[(i + 1) * W + j + 1] + 1
        : Math.max(dp[(i + 1) * W + j], dp[i * W + j + 1]);
    }
  }
  const ops = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { ops.push({ type: 'same', line: a[i], ai: i, bi: j }); i++; j++; }
    else if (dp[(i + 1) * W + j] >= dp[i * W + j + 1]) { ops.push({ type: 'del', line: a[i], ai: i }); i++; }
    else { ops.push({ type: 'add', line: b[j], bi: j }); j++; }
  }
  while (i < n) { ops.push({ type: 'del', line: a[i], ai: i }); i++; }
  while (j < m) { ops.push({ type: 'add', line: b[j], bi: j }); j++; }
  return ops;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Word-level highlight of what changed between two paired lines. */
function wordMark(oldLine, newLine) {
  const aw = oldLine.split(/(\s+)/), bw = newLine.split(/(\s+)/);
  const ops = lcsMatrixDiff(aw, bw);
  let o = '', nw = '';
  for (const op of ops) {
    if (op.type === 'same') { o += esc(op.line); nw += esc(op.line); }
    else if (op.type === 'del') o += `<del>${esc(op.line)}</del>`;
    else nw += `<ins>${esc(op.line)}</ins>`;
  }
  return [o, nw];
}

/** Group ops into hunks with 2 lines of context, like MediaWiki's default. */
export function renderDiff(oldText, newText) {
  const a = String(oldText || '').split('\n');
  const b = String(newText || '').split('\n');
  const ops = lcsMatrixDiff(a, b);

  // Pair up adjacent del/add runs so they show side by side.
  const rows = [];
  for (let i = 0; i < ops.length;) {
    if (ops[i].type === 'same') { rows.push({ kind: 'same', ...ops[i] }); i++; continue; }
    const dels = [], adds = [];
    while (i < ops.length && ops[i].type === 'del') dels.push(ops[i++]);
    while (i < ops.length && ops[i].type === 'add') adds.push(ops[i++]);
    const max = Math.max(dels.length, adds.length);
    for (let k = 0; k < max; k++) rows.push({ kind: 'change', del: dels[k], add: adds[k] });
  }

  const changed = rows.map((r, i) => (r.kind === 'change' ? i : -1)).filter((x) => x >= 0);
  if (!changed.length) {
    return '<div class="mw-revision">No difference between the two revisions.</div>';
  }
  const keep = new Set();
  for (const idx of changed) for (let d = -2; d <= 2; d++) if (rows[idx + d]) keep.add(idx + d);

  const out = [];
  let lastShown = -99;
  for (let i = 0; i < rows.length; i++) {
    if (!keep.has(i)) continue;
    const r = rows[i];
    if (i - lastShown > 1) {
      const aLine = (r.kind === 'same' ? r.ai : r.del?.ai ?? 0) + 1;
      const bLine = (r.kind === 'same' ? r.bi : r.add?.bi ?? 0) + 1;
      out.push(`<tr><td colspan="2" class="diff-lineno">Line ${aLine}:</td><td colspan="2" class="diff-lineno">Line ${bLine}:</td></tr>`);
    }
    lastShown = i;
    if (r.kind === 'same') {
      out.push(`<tr><td class="diff-marker"></td><td class="diff-context">${esc(r.line)}</td><td class="diff-marker"></td><td class="diff-context">${esc(r.line)}</td></tr>`);
    } else {
      const [oHtml, nHtml] = r.del && r.add ? wordMark(r.del.line, r.add.line)
        : [r.del ? esc(r.del.line) : '', r.add ? esc(r.add.line) : ''];
      out.push('<tr>'
        + (r.del ? `<td class="diff-marker">&minus;</td><td class="diff-deletedline"><div>${oHtml}</div></td>`
                 : '<td colspan="2" class="diff-empty"></td>')
        + (r.add ? `<td class="diff-marker">+</td><td class="diff-addedline"><div>${nHtml}</div></td>`
                 : '<td colspan="2" class="diff-empty"></td>')
        + '</tr>');
    }
  }
  return `<table class="diff"><col class="diff-marker"><col class="diff-content"><col class="diff-marker"><col class="diff-content"><tbody>${out.join('')}</tbody></table>`;
}
