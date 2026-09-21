// Project, help and main pages. "Witipedia" is substituted for SITE_NAME at build time.

export const projectPages = [
{ ns: 0, title: 'Main Page', protect: 'sysop', user: 'Admin', daysAgo: 100, comment: 'main page', content: `__NOTOC__
<div class="mp-box">
'''Welcome to [[Witipedia:About|Witipedia]]''', the free encyclopedia that anyone can edit, in which every joke has to survive a fact-check.

Everything here works the way an encyclopedia works: anonymous editing, revision history, talk pages, protection, rollback, elected administrators. The single difference is the [[Witipedia:Be funny|humour guideline]], which says that wit is welcome and inaccuracy is not. If a joke needs the facts to bend, the joke goes.
</div>

== Today's featured article ==
The '''[[Great Emu War]]''' was a wildlife-management operation conducted in Western Australia in late 1932, in which soldiers of the Royal Australian Artillery were deployed with two Lewis guns against roughly 20,000 emus. The birds broke into small groups, outran a truck-mounted machine gun, and jammed the guns by simply not lining up. The operation was withdrawn twice. Major Meredith's own after-action assessment described the emus as facing machine guns "with the invulnerability of tanks", which remains the only known case of an artillery officer rating a flightless bird above his own weapon. ([[Great Emu War|full article]])

== Did you know ... ==
* ... that a '''[[Wombat|wombat]]'''<nowiki />'s droppings are moulded into cubes ''inside'' the animal, by two stiff and two flexible bands in the last 8% of its intestine, because cubes do not roll off the rocks it leaves them on?
* ... that the '''[[Mantis shrimp|mantis shrimp]]''', with up to sixteen classes of colour receptor, is about ten times ''worse'' than a human at telling two similar colours apart?
* ... that '''[[Boaty McBoatface]]''' is cited in ''Nature Communications'' for the first direct measurements of turbulent mixing in the Orkney Passage?
* ... that '''[[Project Pigeon|pigeon-guided missiles]]''' worked, and were cancelled because, in B. F. Skinner's words, "no one would take us seriously"?
* ... that a '''[[Tardigrade|tardigrade]]''' can survive the vacuum of space but dies after two days at 37.8 °C?

== How this place works ==
{| class="wikitable"
|+ The parts that are identical to Wikipedia
! Thing !! How it works here
|-
| Editing || Anyone, logged in or not. Anonymous edits record your IP address in the history.
|-
| Accounts || Free. After 4 days and 10 edits you are ''autoconfirmed'' and can edit semi-protected pages and use rollback. 30 days and 500 edits makes you ''extended confirmed''.
|-
| Administrators || Elected at [[Witipedia:Requests for adminship]]. They can protect, delete and block. They have no editorial authority over content.
|-
| History || Every version of every page is kept forever, with diffs. See [[Special:RecentChanges]].
|-
| Disputes || Fought on the [[Witipedia:Talk pages|talk page]], with sources, not with the revert button.
|}

== The one part that is different ==
Each article carries two separate ratings: '''was this helpful''' and '''was this funny'''. They are counted apart on purpose. An article can teach you nothing and be hilarious, or be immaculately sourced and completely flat, and the editors need to know which of those two problems they have. Thumbs down counts too, and it is shown. See [[Special:TopRated]].

== Get started ==
* [[Witipedia:Five pillars]] - the whole ruleset, on one page
* [[Witipedia:Be funny]] - the humour guideline, with worked examples
* [[Witipedia:Verifiability]] - funny is not a source
* [[Help:Editing]] - wikitext in five minutes
* [[Witipedia:Sandbox]] - break things here
* [[Special:Random]] - read something
` },

{ ns: 4, title: 'About', user: 'Admin', daysAgo: 100, comment: 'about page', content: `'''Witipedia''' is an encyclopedia written and edited by volunteers, built on one observation: the funniest things in the world are true, and most of them are being deleted right now by somebody enforcing a tone.

On the large encyclopedias, a sentence can be perfectly sourced and still be removed for being witty. The policy behind that is real and mostly correct, because an encyclopedia full of jokes is useless. But the enforcement throws away a particular kind of writing that is accurate, memorable and funny at the same time, and there was nowhere for it to go. Now there is.

== What this means in practice ==
Witipedia is not a parody encyclopedia. It is not a place for invented facts, fake quotes or satire. Those sites exist and are good at what they do; this is a different thing. Here:

* Every claim must be verifiable and sourced, exactly as on any encyclopedia.
* The wit has to live in the true part. If you have to change a fact to land a joke, you have lost.
* Signposting is banned. No "hilariously", no "you won't believe", no winking at the reader.
* The reader must come away better informed than they arrived. That is the test, and it is not negotiable.

== Everything else is Wikipedia ==
The software, the namespaces, the talk pages, the revision history, the user rights ladder, the protection levels, the rollback, the elected administrators, the deletion discussions: all of it is deliberately the same, because thirty years of encyclopedia practice already solved those problems and the solutions were not the thing that needed fixing.

== Licence ==
All text is released under [https://creativecommons.org/licenses/by-sa/4.0/ CC BY-SA 4.0]. You keep the credit, anybody can reuse it, nobody can lock it up.

== See also ==
* [[Witipedia:Five pillars]]
* [[Witipedia:Be funny]]
* [[Witipedia:General disclaimer]]

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Five pillars', protect: 'autoconfirmed', user: 'Admin', daysAgo: 99, comment: 'the ruleset', content: `The fundamental principles of '''Witipedia''' are summarised in five pillars.

== 1. Witipedia is an encyclopedia ==
It is not a joke book, a forum, a soapbox or a collection of trivia. Articles have leads, structure, sources and scope. If a page would not be an article on any other encyclopedia, it is not an article here either. The humour is a style, not the subject.

== 2. Every claim is verifiable ==
Anything challenged needs a source that a stranger can check. This applies with full force to the funny part, which is the part most likely to be wrong and the part readers are most likely to repeat. A joke that rests on an unsourced claim is deleted, not tagged. See [[Witipedia:Verifiability]].

== 3. Witipedia is funny, and the humour has rules ==
Wit is expected, not tolerated. It is also constrained: the joke lives inside the accurate sentence, never in place of it. No fabricated quotes, no invented statistics, no "sources say". If the true thing is already funny, write it plainly and get out of the way. See [[Witipedia:Be funny]].

== 4. Editors treat each other decently ==
Assume the other person is trying to improve the article. Argue about the sentence, not the person. Revert with a reason. Comedy is subjective and most content disputes here are really two people with different taste, both of them right about the facts.

== 5. Witipedia has no firm rules, except two ==
Every guideline here can be improved, ignored in a specific case, or rewritten by consensus. The two that cannot be waived are: it has to be true, and the reader has to end up better informed. Everything else, including this page, is negotiable.

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Be funny', protect: 'autoconfirmed', user: 'Admin', daysAgo: 98, comment: 'the humour guideline, with examples', content: `This guideline describes what counts as good humour on Witipedia. It is the only substantive difference between this site and any other encyclopedia, so it is worth reading properly.

== The rule ==
'''The joke must be in the true part.'''

That is the whole guideline. Everything below is a consequence of it.

== Consequences ==

=== The fact comes first ===
Write the accurate sentence. Then see whether it is already funny. Most of the time it is, and your job is to stop decorating it.

* '''Good''': "Meredith's final report claimed 986 emus killed with 9,860 rounds: a rate of ten rounds per bird."
* '''Bad''': "The hapless soldiers hilariously blasted away over 9,000 rounds at the crafty birds!"

The first is a citation and an arithmetic observation. The second is a comedy voice, and it tells the reader nothing the first did not.

=== No signposting ===
Delete these words on sight: hilariously, ironically, amazingly, you guessed it, wait for it, and any exclamation mark outside a quotation. If the reader needs to be told a thing is funny, it is not.

=== No fabricated anything ===
No invented quotes, statistics, dates, studies or "some scholars argue". This is the line between this site and satire, and it is not a soft line: fabrication is the one thing that gets an article deleted rather than fixed.

=== One joke, then move on ===
A paragraph with three jokes in it has none. The wit should arrive about as often as a good lecturer's does: rarely enough that you are not braced for it.

=== Punch up, or punch at the situation ===
Institutions, bureaucracies, our own species and the writer are all fair targets. Individuals are fair when the funny thing is a matter of public record and they are a public figure in that record. Ordinary people caught in a bad moment are not material.

=== The dead-joke list ===
Jokes so common that they are now furniture. They are not banned, but they must earn their place:
* "designed by a committee" (platypus, and see [[Talk:Platypus]])
* "nature's X" for anything
* "hold my beer"
* Any construction of the form "X walked into a bar"
* "and then it got worse", except where it demonstrably did

=== Get out of the way ===
Sometimes the funniest available sentence is the plainest one. The [[Wombat|wombat]] article's best line is a table row noting that around 300 northern hairy-nosed wombats remain, followed by "the last row is the part of this article that is not funny at all." That works because the article stops being funny on purpose, at the right moment. Learn to do that.

== How this is enforced ==
By editors, on talk pages, with the same tools as any other content dispute. Maintenance tags exist for both failure modes:

{| class="wikitable"
! Template !! Use when
|-
| <code><nowiki>{{unfunny}}</nowiki></code> || The article is accurate and joyless
|-
| <code><nowiki>{{unverified joke}}</nowiki></code> || The joke may not be true. Treat as urgent
|-
| <code><nowiki>{{jn}}</nowiki></code> || Inline: this passage needs wit
|-
| <code><nowiki>{{cn}}</nowiki></code> || Inline: this needs a source
|-
| <code><nowiki>{{true and funny|source=}}</nowiki></code> || The funny claim has been checked and it held
|}

== See also ==
* [[Witipedia:Five pillars]]
* [[Witipedia:Verifiability]]

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Verifiability', user: 'Admin', daysAgo: 97, comment: 'verifiability policy', content: `'''Funny is not a source.'''

On Witipedia, material that is challenged or likely to be challenged must be supported by a source a reader can go and check. The threshold is not "I read it somewhere", "everyone knows this" or "it's obviously true".

== Where this bites hardest ==
The funny claim is the one that travels. A reader who remembers one sentence from your article will remember the joke, repeat it at dinner, and be wrong in public on your behalf. So the funny claim carries the ''highest'' sourcing burden here, not the lowest.

A useful test before saving: if this line were quoted back to you by a stranger who had also read the source, would you be comfortable?

== Sources ==
Prefer, in order: peer-reviewed literature; official records, statutes and transcripts; reputable books and long-form journalism; specialist reference works. Avoid: aggregator sites, listicles, "fun facts" pages, and anything that cites another encyclopedia. Never cite a thing you have not opened.

== Things that are true and still do not belong ==
* Trivia with no bearing on the subject
* Claims true of one instance, written as though general
* Numbers stripped of their units, ranges or error bars because the rounded version is funnier

That last one is the most common way a good editor goes wrong here.

== When you are caught out ==
Fix it, note it in the edit summary, and move on. Nobody is embarrassed by a corrected article; the alternative is an encyclopedia that cannot be trusted, which is just a comedy site with more footnotes.

== See also ==
* [[Witipedia:Be funny]]
* [[Witipedia:Citing sources]]

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Citing sources', user: 'HansardHannah', daysAgo: 90, comment: 'how to cite', content: `Use <code><nowiki><ref>...</ref></nowiki></code> inline, and put <code><nowiki>{{reflist}}</nowiki></code> under a <code>== References ==</code> heading.

A reference should contain enough for a reader to find the thing: author, title, publication, year, and page or article number where it exists.

<pre>
The limb reaches about 23 m/s.<ref name="patek">S. N. Patek, W. L. Korff and
R. L. Caldwell, "Deadly strike mechanism of a mantis shrimp", ''Nature'' 428
(2004), pp. 819-820.</ref>

Later reuse of the same source.<ref name="patek" />
</pre>

Named references let you cite the same work twice without repeating it. Do not cite a source you have not read, and do not cite a news article about a study when the study itself is available.

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Community portal', user: 'Ornithopod', daysAgo: 85, comment: 'portal', content: `== What needs doing ==
* '''Source the jokes.''' [[Special:RecentChanges]], read the diffs, tag anything unsourced with <code><nowiki>{{unverified joke}}</nowiki></code>.
* '''Expand the stubs.''' [[Special:ShortPages]] is the honest list of our failures.
* '''Write the red links.''' [[Special:WantedPages]] shows what other articles already assume exists.
* '''Fix the humourless ones.''' An accurate, dull article is a bug here. Tag it <code><nowiki>{{unfunny}}</nowiki></code> and then, ideally, fix it yourself.

== Current discussions ==
* [[Talk:Platypus]] - retiring the committee joke
* [[Talk:Mantis shrimp]] - defending the 2014 colour-vision result
* [[Witipedia:Requests for adminship]] - two open nominations

== Conventions ==
Bold the article title in the first sentence. Lead paragraph explains the subject to someone who has never heard of it. Structure with <code>==&nbsp;Headings&nbsp;==</code>. Categories at the bottom. Sign talk page posts with <code>~~~~</code>.

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Sandbox', user: 'Admin', daysAgo: 95, comment: 'sandbox', content: `<!-- Everything below this line is here to be broken. Edit freely. -->
This is the '''sandbox'''. Edit it, preview it, save it, break it. It is periodically wiped and nothing here is permanent.

Try some markup:

''italics'', '''bold''', [[Main Page|an internal link]], [https://example.com an external link], a footnote.<ref>Like this.</ref>

* a list
** a nested list item

{{stub}}

== References ==
{{reflist}}
` },

{ ns: 4, title: 'Requests for adminship', user: 'Admin', daysAgo: 84, comment: 'RfA process', content: `Administrators are elected here. Any registered editor may nominate another, or themselves. Discussion runs for seven days, after which a bureaucrat closes it. The rough threshold is 70% support, but a bureaucrat weighs arguments rather than counting heads.

Administrators can protect pages, delete pages and block accounts. They have '''no''' additional authority over content: an admin who loses a content argument has lost it.

== What people are actually assessed on ==
* Edit history, particularly talk-page behaviour under disagreement
* Whether they revert with a reason
* Whether they can tell the difference between an unfunny article and an article whose jokes they personally did not enjoy

That last one is the job.

== Open nominations ==
=== CiteOrDie ===
'''Support.''' Reverts vandalism within minutes, always leaves a summary, and removed their own joke from [[Platypus]] when it was shown to be unsourced. [[User:Admin|Admin]] ([[User talk:Admin|talk]]) 10:22, 1 September 2026 (UTC)
: '''Support.''' The [[Talk:Platypus]] thread is the best argument anyone could make for their own nomination. [[User:MonotremeMary|MonotremeMary]] ([[User talk:MonotremeMary|talk]]) 11:04, 1 September 2026 (UTC)

=== Thoenfan ===
'''Neutral.''' Excellent sourcing, but three reverts in one hour on [[Mantis shrimp]] without using the talk page. Ask again in a month. [[User:Ornithopod|Ornithopod]] ([[User talk:Ornithopod|talk]]) 18:40, 2 September 2026 (UTC)
: That is fair. Withdrawing for now. [[User:Thoenfan|Thoenfan]] ([[User talk:Thoenfan|talk]]) 20:15, 2 September 2026 (UTC)

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Administrators', user: 'Admin', daysAgo: 83, comment: 'admin list and limits', content: `Administrators hold the technical permissions to protect pages, delete pages and block accounts. Nothing else.

== Limits ==
* An administrator involved in a content dispute does not use admin tools in that dispute.
* Protection is for stopping edit wars and vandalism, never for freezing a preferred version.
* Blocks are preventative. A block issued because somebody was rude to you is a misuse of the tool.
* Deletion is for pages that cannot be fixed: fabrications, attack pages, and articles whose entire premise is false. "Not funny" is a reason to edit, not to delete.

== Current administrators ==
* [[User:Admin|Admin]] (bureaucrat)

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Talk pages', user: 'CiteOrDie', daysAgo: 80, comment: 'talk page guide', content: `Every article has a discussion page, reached by the '''Discussion''' tab. It is for improving the article, not for discussing the subject.

== Conventions ==
* New topic gets a new <code>==&nbsp;heading&nbsp;==</code> at the bottom
* Reply by indenting with a colon; one more colon per level of reply
* Sign every post with <code>~~~~</code>, which expands to your name and the time when you save
* Do not edit anybody else's comment, including to fix their typo

== What actually gets resolved here ==
Content disputes on this site are usually one of three things: a fact is wrong (settled by sources), a joke is unsourced (settled by sources), or two editors have different taste in comedy (not settled by sources, and the older, better-sourced version wins by default).

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Non-free content', user: 'Admin', daysAgo: 82, comment: 'non-free content policy', content: `Most files here are free to reuse. Some are not: a photograph or a piece of internet art that illustrates the subject better than anything free can, used under a claim of '''fair use'''.

Wikipedia allows this under a narrow policy, and so does Witipedia. The rules are the same ones a court would look at.

== When a non-free file is acceptable ==
* '''No free equivalent exists.''' If somebody has photographed the thing under a free licence, use that instead.
* '''It illustrates commentary.''' The file has to support something the article actually says. A funny picture stapled to an unrelated article is decoration, not commentary.
* '''Low resolution.''' Upload the smallest version that still reads. This is the single factor most within your control.
* '''It does not substitute for the original.''' If somebody would look at our copy instead of buying or visiting the source, it fails.
* '''It is sourced.''' The file page records where it came from. Always.

== What it is not ==
Fair use is a defence, not a permission slip. It means that if the copyright holder objects, there is a real argument to make. It does not mean nobody can object.

If a creator asks for their work to come down, it comes down, the same day, without an argument. That is the deal: we borrow, with credit, and we stop the moment we are asked. An administrator can delete any file at [[Special:ListFiles]].

== Marking ==
Choose '''Non-free, used under a fair-use rationale''' when uploading. The file page then carries a notice, and the rationale it stores says which article the file illustrates and where it came from.

Do not mark somebody else's work as CC or public domain because it is more convenient. A wrong licence tag is a lie in the record, and this site does not tell those.

[[Category:Witipedia]]
` },

{ ns: 4, title: 'Privacy policy', user: 'Admin', daysAgo: 100, comment: 'privacy', content: `== What is stored ==
* '''If you edit while logged out''': your IP address is recorded in the page history, permanently and publicly. This is the same as Wikipedia. If that is not acceptable to you, [[Special:CreateAccount|create an account]] first.
* '''If you have an account''': your username, a salted PBKDF2 hash of your password, your optional email address, your registration date and your edit count.
* '''Ratings''': one row per person per article per question, keyed to your account if you have one, or to your IP address if you do not. This is how the site stops one person voting a hundred times.
* '''Sessions''': a random token in a cookie called <code>wp_session</code>, stored hashed.

== What is not stored ==
No analytics, no advertising identifiers, no third-party scripts, no tracking pixels. There is nothing on this site to sell.

== Deletion ==
Contributions cannot be removed from page history; that is what makes an encyclopedia auditable, and it is a condition of the licence. Account data other than contributions can be deleted on request.

[[Category:Witipedia]]
` },

{ ns: 4, title: 'General disclaimer', user: 'Admin', daysAgo: 100, comment: 'disclaimer', content: `'''Witipedia makes no guarantee of validity.'''

Like any encyclopedia written by volunteers, this one contains errors at any given moment. It is written to be accurate, it is edited by people who care about being accurate, and it is still not a substitute for a primary source, a professional, or a doctor.

The site's humour is not a signal that a passage is not serious. Every factual claim here is meant literally. Where a claim is wrong, it is a mistake, not a bit: correct it, or raise it on the talk page.

Nothing here is medical, legal or financial advice. If an article about a wombat appears to be giving you legal advice, stop reading it.

[[Category:Witipedia]]
` },

{ ns: 12, title: 'Editing', user: 'HansardHannah', daysAgo: 88, comment: 'wikitext cheat sheet', content: `Wikitext, in about five minutes.

== Text ==
{| class="wikitable"
! You type !! You get
|-
| <code><nowiki>''italic''</nowiki></code> || ''italic''
|-
| <code><nowiki>'''bold'''</nowiki></code> || '''bold'''
|-
| <code><nowiki>[[Wombat]]</nowiki></code> || [[Wombat]]
|-
| <code><nowiki>[[Wombat|these animals]]</nowiki></code> || [[Wombat|these animals]]
|-
| <code><nowiki>[[Wombat]]s</nowiki></code> || [[Wombat]]s
|-
| <code><nowiki>[https://example.com label]</nowiki></code> || [https://example.com label]
|-
| <code><nowiki>== Heading ==</nowiki></code> || A section heading
|-
| <code><nowiki>* item</nowiki></code> || A bullet
|-
| <code><nowiki># item</nowiki></code> || A numbered item
|-
| <code><nowiki>----</nowiki></code> || A horizontal rule
|-
| <code><nowiki>~~~~</nowiki></code> || Your signature and the time, on talk pages
|}

A red link means the page does not exist yet. Clicking it starts the article.

== References ==
Put the source inline where the claim is:

<pre>
Wombats run at 40 km/h.<ref>Triggs, ''Wombats'' (2009), p. 14.</ref>
</pre>

and finish the article with:

<pre>
== References ==
{{reflist}}
</pre>

== Tables ==
<pre>
{| class="wikitable"
|+ Optional caption
! Header !! Header
|-
| cell || cell
|}
</pre>

== Infoboxes ==
<pre>
{{Infobox
| title = Wombat
| family = Vombatidae
| top speed = 40 km/h
}}
</pre>

== Templates worth knowing ==
<code><nowiki>{{reflist}}</nowiki></code>, <code><nowiki>{{cn}}</nowiki></code>, <code><nowiki>{{jn}}</nowiki></code>, <code><nowiki>{{stub}}</nowiki></code>, <code><nowiki>{{quote|text=|author=}}</nowiki></code>, <code><nowiki>{{unfunny}}</nowiki></code>, <code><nowiki>{{unverified joke|reason=}}</nowiki></code>, <code><nowiki>{{true and funny|source=}}</nowiki></code>.

== Practise ==
[[Witipedia:Sandbox]]. Nothing there is permanent.

[[Category:Help]]
` },

{ ns: 14, title: 'True but improbable', user: 'Admin', daysAgo: 70, comment: 'category description', content: `Articles whose central fact would be dismissed as invented if it were not documented. Membership requires a source that would survive a hostile reader.

[[Category:Witipedia]]
` },
{ ns: 14, title: 'Animals', user: 'Admin', daysAgo: 70, comment: 'category', content: `Articles about animals.` },
{ ns: 14, title: 'Military history', user: 'Admin', daysAgo: 70, comment: 'category', content: `Articles about military history, including the parts nobody involved wanted written down.` },
{ ns: 14, title: 'Witipedia', user: 'Admin', daysAgo: 70, comment: 'category', content: `Project pages: policies, guidelines and process.` },
{ ns: 14, title: 'Help', user: 'Admin', daysAgo: 70, comment: 'category', content: `Help pages for editors.` },

{ ns: 2, title: 'Admin', user: 'Admin', daysAgo: 100, comment: 'user page', content: `Administrator and bureaucrat here. I mostly patrol [[Special:RecentChanges]] and argue on [[Witipedia talk:Be funny|talk pages]] about whether a sentence is funny or merely pleased with itself.

If I have reverted you, the reason is in the edit summary, and my talk page is open.
` },
{ ns: 2, title: 'CiteOrDie', user: 'CiteOrDie', daysAgo: 60, comment: 'user page', content: `I check the funny claim. That is my whole contribution to this project.

If you have written something excellent and I have asked you for a page number, it is not personal. It is that the excellent thing will be repeated by thousands of people, and one of them will be a wombat biologist.
` },
];
