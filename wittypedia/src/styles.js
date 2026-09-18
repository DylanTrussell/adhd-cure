export const CSS = `
:root{
  --link:#3366cc; --link-visited:#795cb2; --link-red:#d73333; --link-hover:#5a83d6;
  --bg:#f8f9fa; --content-bg:#fff; --text:#202122; --subtle:#54595d; --border:#a2a9b1;
  --border-light:#c8ccd1; --tab-bg:#f8f9fa; --accent-bg:#eaf3ff; --nav-bg:#f8f9fa;
  --ambox:#fef6e7; --ambox-border:#f4c430; --verified-bg:#e8f5e9; --verified-border:#4caf50;
  --serif:'Linux Libertine','Georgia','Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
}
:root:not([data-theme="light"]){ color-scheme:light dark; }
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --link:#88a9f5; --link-visited:#b58ae0; --link-red:#ff6e6e; --link-hover:#a8c2ff;
    --bg:#101418; --content-bg:#16191d; --text:#eaecf0; --subtle:#a2a9b1; --border:#54595d;
    --border-light:#3a3f44; --tab-bg:#1b1f24; --accent-bg:#202b3b; --nav-bg:#14181c;
    --ambox:#33291a; --ambox-border:#a97c1d; --verified-bg:#1c3320; --verified-border:#3f7a45;
  }
}
:root[data-theme="dark"]{
  --link:#88a9f5; --link-visited:#b58ae0; --link-red:#ff6e6e; --link-hover:#a8c2ff;
  --bg:#101418; --content-bg:#16191d; --text:#eaecf0; --subtle:#a2a9b1; --border:#54595d;
  --border-light:#3a3f44; --tab-bg:#1b1f24; --accent-bg:#202b3b; --nav-bg:#14181c;
  --ambox:#33291a; --ambox-border:#a97c1d; --verified-bg:#1c3320; --verified-border:#3f7a45;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--sans);font-size:14px;line-height:1.6}
a{color:var(--link);text-decoration:none}
a:visited{color:var(--link-visited)}
a:hover{text-decoration:underline;color:var(--link-hover)}
a.new,a.new:visited{color:var(--link-red)}
a.external::after{content:'';display:inline-block;width:.6em;height:.6em;margin-left:.25em;
  background:currentColor;opacity:.55;clip-path:polygon(0 0,100% 0,100% 100%,72% 100%,72% 34%,22% 84%,0 62%,50% 12%,0 12%)}

/* ---------- header ---------- */
.mw-header{display:flex;align-items:center;gap:12px;padding:8px 16px;background:var(--content-bg);
  border-bottom:1px solid var(--border-light);position:sticky;top:0;z-index:40}
.mw-header .hamburger{display:none;background:none;border:0;font-size:20px;color:var(--text);cursor:pointer;padding:4px 8px;border-radius:2px}
.mw-header .hamburger:hover{background:var(--accent-bg)}
.brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
.brand:hover{text-decoration:none}
.brand svg{display:block}
.brand-word{font-family:var(--serif);font-size:19px;line-height:1;color:var(--text);letter-spacing:.02em}
.brand-tag{display:block;font-family:var(--sans);font-size:9.5px;color:var(--subtle);letter-spacing:.055em;text-transform:uppercase;margin-top:3px}
.hdr-search{flex:1;max-width:520px;margin:0 auto;position:relative}
.hdr-search input{width:100%;padding:7px 10px 7px 32px;border:1px solid var(--border);border-radius:2px;
  background:var(--content-bg) url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2372777d'%3E%3Cpath d='M12.2 13.6a7 7 0 111.4-1.4l5 5-1.4 1.4-5-5zM7 12a5 5 0 100-10 5 5 0 000 10z'/%3E%3C/svg%3E") no-repeat 8px center/14px;
  color:var(--text);font-size:14px;font-family:inherit}
.hdr-search input:focus{outline:2px solid var(--link);outline-offset:-1px}
.suggest{position:absolute;left:0;right:0;top:100%;background:var(--content-bg);border:1px solid var(--border);
  border-top:0;z-index:50;box-shadow:0 2px 6px rgba(0,0,0,.15)}
.suggest a{display:block;padding:7px 10px;border-bottom:1px solid var(--border-light);color:var(--text)}
.suggest a:hover,.suggest a.sel{background:var(--accent-bg);text-decoration:none}
.suggest .s-title{font-weight:600;color:var(--link)}
.suggest .s-snip{display:block;font-size:12px;color:var(--subtle);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hdr-user{display:flex;align-items:center;gap:12px;flex-shrink:0;font-size:13.5px}
.hdr-user a{white-space:nowrap}
.btn{display:inline-block;padding:6px 12px;border:1px solid var(--border);border-radius:2px;background:var(--content-bg);
  color:var(--link);font-size:13.5px;font-family:inherit;cursor:pointer;line-height:1.4}
.btn:hover{background:var(--accent-bg);text-decoration:none}
.btn-primary{background:#36c;border-color:#36c;color:#fff;font-weight:600}
.btn-primary:hover{background:#447ff5;border-color:#447ff5;color:#fff}
.btn-progressive{background:#36c;border-color:#36c;color:#fff}

/* ---------- layout ---------- */
.mw-page{display:grid;grid-template-columns:176px minmax(0,1fr);gap:0;max-width:1650px;margin:0 auto}
.mw-sidebar{padding:16px 12px 40px;font-size:13.4px}
.mw-sidebar h3{font-size:11.5px;color:var(--subtle);text-transform:uppercase;letter-spacing:.05em;margin:16px 0 6px;font-weight:600}
.mw-sidebar ul{list-style:none;margin:0;padding:0}
.mw-sidebar li{margin:0 0 3px}
.mw-sidebar a{display:block;padding:2px 4px;border-radius:2px}
.mw-sidebar a:hover{background:var(--accent-bg);text-decoration:none}
.mw-content-wrap{background:var(--content-bg);border:1px solid var(--border-light);border-top:0;
  border-right:0;min-height:80vh;padding:0 0 48px}
@media(max-width:1000px){
  .mw-page{grid-template-columns:1fr}
  .mw-sidebar{display:none;background:var(--nav-bg);border-bottom:1px solid var(--border-light)}
  .mw-sidebar.open{display:block}
  .mw-header .hamburger{display:block}
  .mw-content-wrap{border-left:0}
  .hdr-search{order:3;flex-basis:100%;max-width:none;margin:6px 0 0}
  .mw-header{flex-wrap:wrap}
}

/* ---------- tabs ---------- */
.mw-tabs{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;
  border-bottom:1px solid var(--border);padding:0 24px;flex-wrap:wrap}
.mw-tabs ul{display:flex;list-style:none;margin:0;padding:0}
.mw-tabs li{margin:0}
.mw-tabs a{display:block;padding:9px 12px 8px;font-size:13.5px;border:1px solid transparent;border-bottom:0;margin-bottom:-1px}
.mw-tabs a:hover{background:var(--accent-bg);text-decoration:none}
.mw-tabs li.selected a{background:var(--content-bg);border-color:var(--border);color:var(--text);font-weight:600}
.mw-tabs li.new a{color:var(--link-red)}

/* ---------- content ---------- */
.mw-body{padding:12px 24px 0;max-width:1000px}
.mw-body.wide{max-width:none}
#firstHeading{font-family:var(--serif);font-weight:400;font-size:28px;line-height:1.3;margin:12px 0 0;
  padding-bottom:6px;border-bottom:1px solid var(--border-light)}
.tagline{font-size:12.5px;color:var(--subtle);margin:4px 0 12px;font-style:italic}
.mw-parser-output{font-size:14.6px;line-height:1.65}
.mw-parser-output p{margin:.55em 0 .95em}
.mw-parser-output h2{font-family:var(--serif);font-weight:400;font-size:22px;margin:1.3em 0 .4em;
  padding-bottom:4px;border-bottom:1px solid var(--border-light)}
.mw-parser-output h3{font-size:16.5px;margin:1.2em 0 .3em;font-weight:700}
.mw-parser-output h4,.mw-parser-output h5,.mw-parser-output h6{font-size:14.6px;margin:1.1em 0 .3em;font-weight:700}
.mw-parser-output ul,.mw-parser-output ol{margin:.4em 0 .9em 1.6em;padding:0}
.mw-parser-output li{margin:.14em 0}
.mw-parser-output dl{margin:.4em 0 .9em}
.mw-parser-output dd{margin:.2em 0 .2em 1.8em}
.mw-parser-output dt{font-weight:700;margin-top:.4em}
.mw-parser-output hr{border:0;border-top:1px solid var(--border-light);margin:1.2em 0}
.mw-parser-output pre{background:var(--bg);border:1px solid var(--border-light);padding:10px;overflow:auto;
  font-size:13px;line-height:1.5;border-radius:2px}
.mw-editsection{font-size:12.5px;font-weight:400;font-family:var(--sans);margin-left:8px;white-space:nowrap}
.mw-editsection a{color:var(--link)}
sup.reference{font-size:.75em;line-height:1;vertical-align:super}
sup.cn{font-size:.78em}
.references{font-size:13px;margin:.5em 0 1em 1.6em}
.references li{margin:.25em 0}
.mw-cite-backlink{font-style:italic;margin-right:.3em}
.hatnote{font-style:italic;padding-left:1.6em;margin:.4em 0 .8em;color:var(--subtle)}
.stub{border-top:1px solid var(--border-light);margin-top:1.4em;padding-top:.7em;font-size:13.5px;
  display:flex;gap:8px;align-items:flex-start}
.stub::before{content:'\\270E';font-size:16px;opacity:.6}
.ambox{display:flex;gap:10px;align-items:flex-start;background:var(--ambox);border:1px solid var(--ambox-border);
  border-left-width:6px;padding:9px 12px;margin:.8em 0;font-size:13.6px;border-radius:2px}
.ambox-verified{background:var(--verified-bg);border-color:var(--verified-border)}
.ambox-icon{font-size:15px;line-height:1.4}
blockquote.quote{margin:1em 0 1em 1.6em;padding-left:14px;border-left:3px solid var(--border-light);font-size:14.5px}
blockquote.quote footer{font-size:13px;color:var(--subtle);margin-top:.3em}
.mw-file.placeholder{display:inline-block;background:var(--bg);border:1px dashed var(--border);
  padding:2px 7px;font-size:12.5px;color:var(--subtle);border-radius:2px}
.nowrap{white-space:nowrap}

table.wikitable{border-collapse:collapse;margin:1em 0;background:var(--content-bg);font-size:13.8px}
table.wikitable>tbody>tr>th,table.wikitable>tbody>tr>td{border:1px solid var(--border-light);padding:6px 9px;text-align:left;vertical-align:top}
table.wikitable>tbody>tr>th{background:var(--bg);font-weight:700}
table.wikitable caption{font-weight:700;padding:5px;text-align:left;font-size:14px}
table.infobox{float:right;clear:right;width:290px;margin:0 0 1em 1.4em;border:1px solid var(--border-light);
  border-collapse:collapse;background:var(--bg);font-size:12.9px;line-height:1.5}
table.infobox caption{background:var(--accent-bg);font-weight:700;padding:7px;font-size:14px;
  border-bottom:1px solid var(--border-light);font-family:var(--serif)}
table.infobox th,table.infobox td{padding:5px 8px;border-top:1px solid var(--border-light);text-align:left;vertical-align:top}
table.infobox th{width:38%;font-weight:700}
table.infobox td.ib-caption{text-align:center;color:var(--subtle);font-style:italic}
@media(max-width:620px){table.infobox{float:none;width:auto;margin:1em 0}}

.toc{display:table;background:var(--bg);border:1px solid var(--border-light);padding:10px 16px 10px 10px;
  margin:1em 0;font-size:13.6px;border-radius:2px}
.toc .toctitle h2{font-family:var(--sans);font-size:14px;font-weight:700;border:0;margin:0 0 .4em;padding:0;text-align:center}
.toc ul{list-style:none;margin:0;padding:0}
.toc li{margin:.18em 0}
.toc .toclevel-2{margin-left:1.6em}
.toc .toclevel-3{margin-left:3.2em}
.toc .tocnumber{color:var(--subtle);margin-right:.35em}

.catlinks{border:1px solid var(--border-light);background:var(--bg);padding:7px 10px;margin:2em 24px 0;
  font-size:13.4px;border-radius:2px}
.catlinks ul{display:inline;list-style:none;padding:0;margin:0}
.catlinks li{display:inline-block;border-left:1px solid var(--border-light);margin:0 0 0 .5em;padding-left:.5em}
.catlinks li:first-child{border-left:0;margin-left:.3em;padding-left:0}

/* ---------- ratings ---------- */
.rating-box{margin:2.2em 24px 0;border:1px solid var(--border-light);background:var(--bg);border-radius:2px;
  padding:14px 16px;max-width:940px}
.rating-box h2{font-family:var(--serif);font-weight:400;font-size:18px;margin:0 0 3px;border:0;padding:0}
.rating-box .rb-sub{font-size:12.5px;color:var(--subtle);margin:0 0 12px}
.rating-rows{display:grid;gap:10px}
.rating-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.rating-label{width:190px;font-size:13.6px}
.rating-label b{display:block;font-size:14px}
.rating-label span{color:var(--subtle);font-size:12.3px}
.vote{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border:1px solid var(--border);
  background:var(--content-bg);border-radius:14px;cursor:pointer;font:inherit;font-size:13.4px;color:var(--text)}
.vote:hover{background:var(--accent-bg);border-color:var(--link)}
.vote.on{background:var(--accent-bg);border-color:var(--link);font-weight:600;box-shadow:inset 0 0 0 1px var(--link)}
.vote .ico{font-size:14px;line-height:1}
.vote .n{font-variant-numeric:tabular-nums;min-width:1.1em;text-align:right}
.bar{height:6px;border-radius:3px;background:var(--border-light);overflow:hidden;flex:1;min-width:90px;max-width:220px}
.bar i{display:block;height:100%;background:var(--verified-border)}
.bar.f i{background:#f4c430}
.rating-pct{font-size:12.5px;color:var(--subtle);min-width:150px}

/* ---------- edit / forms ---------- */
.editform textarea{width:100%;min-height:440px;font-family:ui-monospace,'SFMono-Regular',Menlo,Consolas,monospace;
  font-size:13.2px;line-height:1.55;padding:10px;border:1px solid var(--border);background:var(--content-bg);
  color:var(--text);border-radius:2px;resize:vertical}
.editform textarea:focus{outline:2px solid var(--link);outline-offset:-1px}
.edit-toolbar{display:flex;gap:4px;flex-wrap:wrap;border:1px solid var(--border);border-bottom:0;
  background:var(--bg);padding:5px 6px;border-radius:2px 2px 0 0}
.edit-toolbar button{background:var(--content-bg);border:1px solid var(--border-light);border-radius:2px;
  padding:3px 8px;font:inherit;font-size:12.6px;cursor:pointer;color:var(--text)}
.edit-toolbar button:hover{background:var(--accent-bg)}
.editform .summary{width:100%;max-width:620px;padding:6px 8px;border:1px solid var(--border);
  background:var(--content-bg);color:var(--text);border-radius:2px;font:inherit}
.editform label{font-size:13.4px}
.editform .row{margin:12px 0}
.editform .buttons{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:14px}
.editnotice{background:var(--accent-bg);border:1px solid var(--border-light);padding:10px 12px;
  font-size:13.4px;margin:12px 0;border-radius:2px}
.copywarn{font-size:12.3px;color:var(--subtle);margin-top:12px;max-width:760px}
.form-narrow{max-width:420px}
.form-narrow .row{margin:14px 0}
.form-narrow label{display:block;font-weight:600;margin-bottom:4px}
.form-narrow input{width:100%;padding:8px;border:1px solid var(--border);background:var(--content-bg);
  color:var(--text);border-radius:2px;font:inherit}
.errorbox,.successbox{padding:10px 12px;margin:12px 0;border-radius:2px;font-size:13.6px}
.errorbox{background:#fee7e6;border:1px solid #d73333;color:#7d2a20}
.successbox{background:var(--verified-bg);border:1px solid var(--verified-border)}
:root[data-theme="dark"] .errorbox{background:#3b1f1d;color:#ffd4d0}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]) .errorbox{background:#3b1f1d;color:#ffd4d0}}

/* ---------- history / recent changes / diffs ---------- */
.changelist{list-style:none;margin:10px 0;padding:0;font-size:13.6px}
.changelist li{padding:3px 0;border-bottom:1px solid var(--border-light);line-height:1.5}
.changelist .ts{color:var(--subtle);font-variant-numeric:tabular-nums}
.changelist .cmt{color:var(--subtle);font-style:italic}
.changelist .plus{color:#14866d;font-weight:700}
.changelist .minus{color:#d73333;font-weight:700}
.changelist .zero{color:var(--subtle)}
.changelist .minor{font-weight:700;color:var(--subtle)}
.changelist .tag{background:var(--accent-bg);border:1px solid var(--border-light);border-radius:2px;
  padding:0 4px;font-size:11.6px;color:var(--subtle)}
.diff{width:100%;border-collapse:collapse;table-layout:fixed;margin:12px 0;font-size:13px}
.diff col.diff-marker{width:2%}
.diff col.diff-content{width:48%}
.diff td{padding:3px 6px;vertical-align:top;font-family:ui-monospace,Menlo,Consolas,monospace;
  word-wrap:break-word;overflow-wrap:break-word}
.diff-title{background:var(--bg);font-family:var(--sans)!important;font-weight:600;border-bottom:1px solid var(--border-light)}
.diff-context{background:var(--bg)}
.diff-deletedline{background:#ffe49c}
.diff-addedline{background:#a3d3ff}
.diff-deletedline ins,.diff-addedline ins{background:#d8ecff;text-decoration:none}
.diff-deletedline del,.diff-addedline del{background:#fec9c9;text-decoration:none}
:root[data-theme="dark"] .diff-deletedline{background:#4a3a12}
:root[data-theme="dark"] .diff-addedline{background:#173a5e}
@media(prefers-color-scheme:dark){
  :root:not([data-theme="light"]) .diff-deletedline{background:#4a3a12}
  :root:not([data-theme="light"]) .diff-addedline{background:#173a5e}
}
.diff-marker{text-align:right;color:var(--subtle);font-weight:700}
.diff-lineno{font-family:var(--sans)!important;font-weight:700;font-size:12.6px}
.mw-revision{background:var(--accent-bg);border:1px solid var(--border-light);padding:9px 12px;
  margin:10px 0;font-size:13.4px;border-radius:2px}

/* ---------- misc ---------- */
.sortable th{cursor:pointer}
.mw-footer{max-width:1650px;margin:0 auto;padding:22px 24px 40px;font-size:12.6px;color:var(--subtle);
  border-top:1px solid var(--border-light);background:var(--bg)}
.mw-footer ul{list-style:none;display:flex;flex-wrap:wrap;gap:14px;margin:10px 0 0;padding:0}
.mw-mainpage-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:820px){.mw-mainpage-grid{grid-template-columns:1fr}}
.mp-box{border:1px solid var(--border-light);background:var(--bg);border-radius:2px;padding:12px 14px}
.mp-box h2{font-family:var(--serif);font-weight:400;font-size:18px;margin:0 0 .5em;border-bottom:1px solid var(--border-light);padding-bottom:4px}
.leaderboard{list-style:none;margin:0;padding:0;font-size:13.8px}
.leaderboard li{display:flex;gap:8px;align-items:baseline;padding:4px 0;border-bottom:1px solid var(--border-light)}
.leaderboard .score{font-variant-numeric:tabular-nums;color:var(--subtle);font-size:12.6px;margin-left:auto;white-space:nowrap}
.searchresult{margin:14px 0;padding-bottom:12px;border-bottom:1px solid var(--border-light)}
.searchresult .sr-title{font-size:16px}
.searchresult .sr-snip{color:var(--text);font-size:13.6px}
.searchresult .sr-meta{color:var(--subtle);font-size:12.4px;margin-top:3px}
.userlinks{font-size:12.6px}
.helptext{font-size:12.8px;color:var(--subtle)}
.pager{display:flex;gap:12px;margin:16px 0;font-size:13.4px}
`;
