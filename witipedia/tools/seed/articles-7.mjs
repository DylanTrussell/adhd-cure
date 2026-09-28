// Seed articles, batch 6. Same house rule: the claim is true and sourced; the
// joke lives inside the true part.

export const articles7 = [
{
  title: 'Cane toad',
  ratings: { helpful: [149, 5], funny: [188, 8] },
  revisions: [
    { user: 'Ornithopod', daysAgo: 1, comment: 'created article', content: `{{Infobox
| title = Cane toad
| introduced to Australia = 1935
| introduced to control = French's cane beetle and greyback cane beetle
| number released = 102
| toads today, estimated = over 200 million
| actually controlled the beetles it was released for = no
}}

The '''cane toad''' was deliberately introduced to Australia in 1935 to control a beetle that damages sugar cane. It has never been shown to control that beetle, and its descendants now number in the hundreds of millions.

== Introduction ==
Australian sugar growers were losing crops to native cane beetle larvae, which live underground and are largely unreachable by a ground-dwelling toad in any case; nonetheless, following reported success using cane toads against beetles in Puerto Rico and Hawaii, Australian authorities imported 102 cane toads from Hawaii in 1935 and released them in Queensland sugar-growing regions after a brief breeding programme.<ref name="turvey">Nigel Turvey, ''Cane Toads: A Tale of Sugar, Politics and Flawed Science'' (Sydney University Press, 2013).</ref> The beetles' larvae live below ground, where adult toads, being surface-dwelling and largely nocturnal in their foraging, could not meaningfully reach them; no rigorous contemporary study ever demonstrated the toads reduced beetle populations at all.<ref name="turvey" />

== The spread ==
Cane toads had no natural predators in Australia adapted to their toxic skin secretions, which are lethal to most native animals that attempt to eat them, including quolls, freshwater crocodiles and goannas.<ref name="turvey" /> With no effective predation and abundant food, the toad population expanded from the original 102 individuals to an estimated over 200 million across a range spreading across Queensland, the Northern Territory and into Western Australia, at an advancing front researchers have clocked moving at up to about 50 km a year in some populations, considerably faster than the toad's original invasion speed, a change attributed to natural selection favouring longer-legged, faster-dispersing individuals at the expanding edge of the range.<ref>Benjamin L. Phillips et al., "Invasion and the Evolution of Speed in Toads," ''Nature'' 439 (2006), p. 803.</ref>

== Aftermath ==
Government and university-led research into biological and chemical control methods has continued for decades without producing an effective large-scale solution; current management largely focuses on protecting specific vulnerable native predator populations rather than eliminating the toad itself.<ref name="turvey" /> The insect the toad was imported to control remains, to this day, a routine pest managed by entirely different, unrelated methods.

== References ==
{{reflist}}

[[Category:Animals]]
[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Sourdough starter',
  ratings: { helpful: [96, 3], funny: [88, 3] },
  revisions: [
    { user: 'CiteOrDie', daysAgo: 7, comment: 'created article', content: `{{Infobox
| title = Sourdough starter
| oldest documented, continuously maintained = disputed; several bakeries claim over 100 years
| microorganisms = wild yeast plus lactic acid bacteria
| San Francisco strain named = ''Fructilactobacillus sanfranciscensis'', 1971
| passed down as = family and business heirlooms, sometimes for generations
}}

A '''sourdough starter''' is a live culture of wild yeast and bacteria maintained indefinitely through regular feeding, and some bakeries and families claim to have kept the same starter alive, through repeated feeding and division, for well over a century.

== How it stays alive ==
A starter is a stable fermenting mixture of flour and water that has captured wild yeast and lactic acid bacteria from the environment and the flour itself; regularly discarding part of it and feeding it fresh flour and water keeps the culture alive indefinitely, in principle for as long as someone keeps feeding it, since the microorganisms reproduce continuously.<ref name="lactobacillus">Michael Gänzle, "Lactic Metabolism Revisited: Metabolism of Lactic Acid Bacteria in Food Fermentations and Food Spoilage," ''Current Opinion in Food Science'' 2 (2015), pp. 106-117, on sourdough microbial ecology.</ref> The specific San Francisco sourdough bacterium was formally identified and named ''Lactobacillus sanfranciscensis'' (reclassified ''Fructilactobacillus sanfranciscensis'' in 2020) by researchers in 1971, after its distinctive presence in the city's traditional sourdough bread was studied scientifically.<ref>Kline, L. and Sugihara, T. F., "Microorganisms of the San Francisco Sour Dough Bread Process," ''Applied Microbiology'' 21:3 (1971), pp. 456-458.</ref>

== Age claims ==
Several bakeries and families publicly claim starters passed down for a century or more, including claims tracing lineage to the Gold Rush era in San Francisco and to Klondike-era Yukon prospectors, who reportedly carried starter with them and were nicknamed "sourdoughs" as a result.<ref name="lactobacillus" /> These specific multigenerational age claims are typically based on family or business oral history rather than continuous scientific documentation, and microbiologists note that a starter's living population continuously turns over new generations of microorganisms, meaning what is passed down is a continuously self-renewing culture rather than any single original cell surviving a hundred years.<ref name="lactobacillus" /> Even so, the practice of maintaining and gifting starters across generations and between bakers is well documented as a genuine, long-running tradition, whatever the precise verifiable age of any specific claimed lineage.

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Dead salmon fMRI study',
  ratings: { helpful: [104, 4], funny: [199, 9] },
  revisions: [
    { user: 'Thoenfan', daysAgo: 9, comment: 'created article', content: `{{Infobox
| title = "Dead salmon" fMRI study
| formal title = Neural correlates of interspecies perspective taking in the post-mortem Atlantic Salmon
| author = Craig M. Bennett et al.
| subject = one dead Atlantic salmon
| purpose = demonstrating a statistical flaw in fMRI research
| presented as = a poster at a 2009 neuroscience conference
| Ig Nobel Prize = 2012, Neuroscience
}}

The '''"dead salmon" fMRI study''' placed a whole, dead Atlantic salmon in a brain scanner, showed it photographs, and asked it to identify the emotional state of the people in them. The purpose was not a joke about fish, but a serious demonstration of a statistical error common in real neuroscience research.

== The experiment ==
Neuroscientist Craig Bennett and colleagues at Dartmouth placed a dead salmon, purchased for the purpose, into a functional MRI scanner and ran it through a standard experimental protocol used in human emotion-recognition studies, showing the deceased fish photographs of people in social situations and asking it, exactly as a live human subject would be asked, to identify the emotion being displayed.<ref name="bennett">Craig M. Bennett et al., "Neural Correlates of Interspecies Perspective Taking in the Post-Mortem Atlantic Salmon: An Argument For Multiple Comparisons Correction," poster presented at the Organization for Human Brain Mapping conference, 2009.</ref> Without applying standard statistical corrections for the huge number of simultaneous comparisons an fMRI scan involves, the raw data showed apparent "brain activity" in the dead fish's brain cavity, activity that was in fact statistical noise, not a genuine neural signal, since the salmon was, as the researchers stated plainly, dead.<ref name="bennett" />

== The point ==
The study's actual purpose was to demonstrate, vividly, why fMRI researchers must apply multiple-comparisons statistical corrections: an fMRI scan tests tens of thousands of individual brain voxels simultaneously, and without correcting for that number of comparisons, a certain proportion will show "significant" results by pure chance alone, even in tissue that is unambiguously incapable of neural activity.<ref name="bennett" /> The paper was intended partly as advocacy within the neuroimaging field, at a time when a meaningful proportion of published fMRI studies were not applying the correction the salmon study demonstrated was necessary.<ref name="bennett" />

== Recognition ==
The study was awarded the 2012 Ig Nobel Prize in Neuroscience, an award given for research that "first makes people laugh, and then makes them think," which is widely regarded among the neuroimaging community as an entirely fitting description of this particular fish.<ref>Improbable Research, "2012 Ig Nobel Prize Winners," Neuroscience category citation.</ref>

== References ==
{{reflist}}

[[Category:True but improbable]]
[[Category:Animals]]
` },
  ],
  talk: null,
},

{
  title: 'Great Stink of 1858',
  ratings: { helpful: [128, 3], funny: [142, 5] },
  revisions: [
    { user: 'HansardHannah', daysAgo: 15, comment: 'created article', content: `{{Infobox
| title = Great Stink
| date = summer 1858
| location = London, on the banks of the River Thames
| cause = untreated sewage, industrial waste and an unusually hot summer
| Parliament's response time = eighteen days to approve funding
| engineer subsequently commissioned = Joseph Bazalgette
}}

The '''Great Stink''' was a public health and political crisis in the summer of 1858, when the smell of untreated sewage in the Thames became so severe that it drove business out of the Houses of Parliament itself, and forced legislation that had been stalled for years through Parliament in a matter of weeks.

== The cause ==
By the mid-nineteenth century, London's rapidly growing population emptied raw sewage and industrial waste directly into the Thames, which also supplied much of the city's drinking water; an unusually hot summer in 1858 caused the river to give off an overwhelming stench that reportedly could be smelled for miles.<ref name="halliday">Stephen Halliday, ''The Great Stink of London: Sir Joseph Bazalgette and the Cleansing of the Victorian Capital'' (The History Press, 1999).</ref> Curtains soaked in chloride of lime were hung over the windows of the Houses of Parliament in an attempt to mask the smell, and several accounts describe committee sessions relocated or abandoned entirely because members could not tolerate the smell coming off the river directly outside.<ref name="halliday" />

== The response ==
Proposals for a comprehensive London sewer system had circulated for years without funding, delayed partly by disputes over cost and jurisdiction between competing London authorities.<ref name="halliday" /> With members of Parliament themselves personally and immediately affected, a bill authorising funding for a new metropolitan sewer network was introduced and passed within about eighteen days, a strikingly fast turnaround for Victorian legislative process, driven by an urgency that years of public health reports about disease and mortality from contaminated water had failed to produce.<ref name="halliday" />

== The engineering response ==
Civil engineer Joseph Bazalgette was commissioned to design and build the resulting system: over 1,300 miles of new sewers, intercepting waste before it reached the central Thames and redirecting it downstream, completed over the following decade.<ref name="halliday" /> The network, built to standards well beyond contemporary requirements based on Bazalgette's own decision to double his calculated pipe diameters as a margin for future population growth, remains a functioning part of London's sewer infrastructure into the twenty-first century.<ref name="halliday" />

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Pigeon post at the Siege of Paris',
  ratings: { helpful: [111, 4], funny: [97, 3] },
  revisions: [
    { user: 'PollWatcher', daysAgo: 11, comment: 'created article', content: `{{Infobox
| title = Pigeon post during the Siege of Paris
| siege dates = September 1870 - January 1871
| method = messages photographically reduced onto microfilm, carried by pigeon
| messages per pigeon, using microfilm = tens of thousands
| pigeons that made it through, estimated = about 1 in 10
}}

During the Prussian siege of Paris in 1870-71, with the city cut off from the rest of France, the only reliable communication method into the city was homing pigeons carrying messages photographically reduced to a size small enough for one bird to carry tens of thousands of them at once.

== The blockade ==
Prussian forces surrounded Paris from September 1870, cutting telegraph lines and physical routes into the city; hot-air balloons, used to carry mail and officials out of the besieged city, worked only one way, since balloons of the era could not be reliably steered back in against prevailing winds.<ref name="wilson">Robert Wilson, ''Paris Under Siege'' (Robinson, 2009).</ref> Homing pigeons, which reliably navigate home regardless of how they leave, became the only workable method of getting messages back into Paris from the unoccupied provisional government outside.<ref name="wilson" />

== Microfilm messages ==
Photographer Rene Dagron developed a method of photographically reducing pages of text onto small collodion film, allowing a single lightweight pigeon-carried message to contain the text of many thousands of individual letters and official despatches, projected and transcribed by hand once the pigeon reached Paris.<ref name="wilson" /> Reports from the period describe individual pigeon-carried microfilm messages containing tens of thousands of separate dispatches in a single flight.<ref name="wilson" />

== Losses ==
Prussian forces specifically targeted the pigeons, employing hawks and rifle fire against them once their strategic role became apparent, and postal service estimates from the period suggest roughly nine in ten pigeons dispatched failed to complete the journey, whether from Prussian countermeasures, exhaustion, weather or predation by birds of prey.<ref name="wilson" /> Paris fell in January 1871 after the siege reduced the city to eating zoo animals and household pets for food; the surviving pigeon-carried messages remain a documented, unusual instance of a communications network built almost entirely around a single migratory bird species.<ref name="wilson" />

== References ==
{{reflist}}

[[Category:Military history]]
[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Emperor Norton',
  ratings: { helpful: [107, 3], funny: [178, 7] },
  revisions: [
    { user: 'Ornithopod', daysAgo: 20, comment: 'created article', content: `{{Infobox
| title = Emperor Norton
| born = Joshua Abraham Norton, c. 1818
| self-proclaimed title, 1859 = Emperor of the United States
| later added = Protector of Mexico
| currency issued = his own, honoured by local San Francisco merchants
| funeral attendance, reported = tens of thousands
}}

'''Emperor Norton''' was a failed San Francisco businessman who, after losing his fortune, declared himself Emperor of the United States in 1859. The city largely humoured him for over two decades, some local merchants accepted his self-printed currency, and his funeral reportedly drew tens of thousands of mourners.

== Rise and fall ==
Joshua Norton arrived in San Francisco in 1849 with a modest inheritance, built a substantial fortune through real estate and commodity trading, then lost nearly everything in a failed attempt to corner the market on rice in 1853, following an unforeseen surge in Peruvian rice imports that undercut his position; a subsequent lawsuit against him dragged on for years and left him financially and, by several contemporary accounts, psychologically diminished.<ref name="drury">William Drury, ''Norton I: Emperor of the United States'' (Dodd, Mead, 1986).</ref>

== The proclamation ==
In September 1859, Norton submitted a formal notice to San Francisco newspapers declaring himself "Norton I, Emperor of the United States," and the ''San Francisco Bulletin'' printed it, apparently for its entertainment value.<ref name="drury" /> Norton continued issuing occasional imperial decrees for the following two decades, including one ordering the dissolution of the United States Congress by force, and another proposing a bridge across San Francisco Bay decades before the Bay Bridge was actually built.<ref name="drury" />

== Civic reception ==
Local merchants and restaurants, largely playing along with the joke, issued Norton free meals and accepted his self-printed currency at face value in local shops for small purchases; the city is reported by multiple contemporary accounts to have provided him a form of informal municipal accommodation for a time, and San Francisco police reportedly saluted him in the street.<ref name="drury" /> A widely repeated story holds that a police officer's brief attempt to have Norton committed for psychiatric evaluation was met with public outcry and swiftly reversed, with an official apology issued to him; this account appears in several secondary sources though it rests on limited surviving primary documentation from the period.<ref name="drury" />

== Death ==
Norton collapsed and died on a San Francisco street in January 1880; his funeral procession reportedly drew a crowd estimated by contemporary newspapers in the tens of thousands, an extraordinary turnout for a man who held no formal office, position or wealth of any kind.<ref name="drury" />

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'First trans-Atlantic row',
  ratings: { helpful: [86, 3], funny: [93, 3] },
  revisions: [
    { user: 'CiteOrDie', daysAgo: 26, comment: 'created article', content: `{{Infobox
| title = First trans-Atlantic row
| rowers = George Harbo and Frank Samuelsen
| departed = New York City, 6 June 1896
| arrived = Isles of Scilly, England, 1 August 1896
| duration = 55 days
| boat length = about 5.5 metres
| navigation aids = compass and sextant only
}}

The first confirmed row across the Atlantic Ocean was completed in 1896 by two Norwegian-American fishermen in a wooden boat about 5.5 metres long, using only a compass and sextant, decades before organised trans-Atlantic rowing existed as a recognised sport.

== The crossing ==
George Harbo and Frank Samuelsen, both experienced fishermen, set out from New York City on 6 June 1896 in a specially built open wooden rowboat named ''Fox'', intending to prove the crossing could be done by human power alone and to claim newspaper prize money reportedly offered for the feat.<ref name="ocean">Tori Murden McClure, ''A Pearl in the Storm: How I Found My Heart in the Middle of the Ocean'' (Harper, 2009), historical background chapter on Harbo and Samuelsen.</ref> They rowed continuously in alternating shifts, capsizing at least once during a storm and righting the boat themselves without outside assistance, navigating using only a compass and sextant with no radio, support vessel or modern safety equipment of any kind.<ref name="ocean" /> They reached the Isles of Scilly, off the southwest coast of England, after 55 days at sea, then continued on to France before returning to New York.<ref name="ocean" />

== Recognition ==
The crossing received relatively little sustained public attention at the time compared to other contemporary feats of endurance, and no organised trans-Atlantic rowing race existed for almost a century afterward; the first regularly run trans-Atlantic rowing race was not established until 1997.<ref>Ocean Rowing Society International, historical race records and first-crossing verification archive.</ref> Harbo and Samuelsen's specific route and timing record stood as the fastest verified trans-Atlantic row for over a hundred years, not beaten until 2010, by a rowing team using a considerably more advanced vessel and modern routing technology.<ref>Ocean Rowing Society International, "Fastest Crossings" record table.</ref>

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'The Toynbee tiles',
  ratings: { helpful: [77, 4], funny: [116, 5] },
  revisions: [
    { user: 'Thoenfan', daysAgo: 28, comment: 'created article', content: `{{Infobox
| title = Toynbee tiles
| first documented = early 1980s
| cities found in = over 20, mostly in the United States and South America
| typical material = layered asphalt and linoleum, embedded in road surfaces
| typical text (paraphrased) = a message about reviving the dead on the planet Jupiter, referencing Toynbee and Kubrick
| creator identity = never definitively confirmed
}}

'''Toynbee tiles''' are small, homemade plaques embedded in road surfaces in cities across the Americas since at least the early 1980s, bearing a cryptic message referencing historian Arnold Toynbee, the film ''2001: A Space Odyssey'', and the resurrection of the dead on Jupiter — and nobody has ever definitively established who made them or how.

== Discovery and spread ==
The tiles first drew sustained public attention in the 1980s and 1990s, discovered embedded flush into asphalt at intersections in Philadelphia and later documented in more than twenty cities across the United States and several in South America, always at road intersections rather than sidewalks.<ref name="doc">''Resurrect Dead: The Mystery of the Toynbee Tiles'' (documentary film, dir. Jon Foy, 2011), summarising a multi-year investigation into the tiles' origin.</ref> Each tile is made from layered material, typically asphalt roofing tar with linoleum or similar, and bears a variant of a short cryptic message referencing the historian Arnold Toynbee and Stanley Kubrick's film ''2001: A Space Odyssey'', tied to a claim about reviving the dead on the planet Jupiter.<ref name="doc" />

== The mystery ==
The tiles are notably embedded within busy road surfaces rather than placed on sidewalks, which has led researchers documented in the 2011 documentary ''Resurrect Dead'' to theorise the creator worked at night from a moving vehicle, dropping prepared tiles through a hole cut in the vehicle's floor and using tar to set them before speeding away, since no witness has ever been documented actually observing the act of installation itself.<ref name="doc" /> Independent investigation by documentary filmmakers traced circumstantial evidence toward a specific Philadelphia individual with a documented history of eccentric and reclusive behaviour, though no conclusive, universally accepted confirmation of authorship or method has been established, and the individual identified by the investigation never gave a definitive on-record confirmation.<ref name="doc" />

== Status ==
New tiles have appeared far less frequently since the early 2000s, and many original tiles have been worn away, paved over, or removed by road resurfacing over the following decades; surviving examples are now documented and catalogued by amateur researchers who track their locations and condition.<ref name="doc" />

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},
];
