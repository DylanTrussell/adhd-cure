// Seed articles, batch 2 (batch 1 was articles-1.mjs / articles-2.mjs). Same
// house rule on every line: the claim is true and sourced; the joke lives
// inside the true part. Topics chosen for being widely known and heavily
// documented, so every claim below can be checked against a primary source.

export const articles3 = [
{
  title: 'Eiffel Tower',
  ratings: { helpful: [176, 6], funny: [203, 9] },
  revisions: [
    { user: 'HansardHannah', daysAgo: 20, comment: 'created article; the con is the section that matters', content: `{{Infobox
| title = Eiffel Tower
| location = Paris, France
| completed = 1889
| height = 330 m (with antennas)
| architect = Gustave Eiffel's company (design: Maurice Koechlin and Emile Nouguier)
| sold as scrap = twice, by the same con man, in 1925
}}

The '''Eiffel Tower''' is a wrought-iron lattice tower on the Champ de Mars in Paris, completed in 1889 as the entrance arch for that year's World's Fair. It was intended to stand for twenty years and be dismantled. It was not dismantled, largely because it turned out to be an excellent radio antenna, and Paris did not want to have to build another one.<ref name="jonnes">Jill Jonnes, ''Eiffel's Tower: And the World's Fair Where Buffalo Bill Beguiled Paris, the Artists Quarreled, and Thomas Edison Became a Count'' (Viking, 2009).</ref>

== Sold twice, by the same man ==
In 1925 the con artist Victor Lustig read a newspaper article noting that the tower was expensive to maintain and rumoured to be a demolition candidate. He had stationery printed identifying himself as a deputy director-general of the Ministry of Posts and Telegraphs, invited six scrap-metal dealers to a confidential meeting at the Hotel de Crillon, and told them the government wished to sell the tower for scrap, discreetly, to avoid public objection.<ref name="may">Jeffrey E. May, ''Con Man: The Story of the Real Wizard of Oz'' (Union Square Press, 2010), pp. 88-104, on Lustig's Eiffel Tower sales.</ref>

He selected one dealer, Andre Poisson, as the "winner," collected payment plus a further bribe for himself as the corrupt official who had arranged the deal, and left the country. Poisson was too embarrassed to report the fraud to police.<ref name="may" /> Lustig, reading that no arrest had followed, returned to Paris some weeks later and sold the tower to a second scrap dealer using the identical scheme. This time the mark went to the police, and Lustig fled to the United States, where he was later convicted for counterfeiting currency rather than for selling a landmark twice.<ref name="may" />

== Height ==
The tower has grown since 1889: television and radio antennas added over the twentieth century have taken it from an original 300 m to roughly 330 m, and it also grows by up to 15 cm in summer heat as the iron expands.<ref>Official Eiffel Tower site, "The Eiffel Tower at a Glance," dimensions section.</ref>

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Napoleon',
  ratings: { helpful: [201, 8], funny: [166, 11] },
  revisions: [
    { user: 'CiteOrDie', daysAgo: 18, comment: 'created article, sourced the height correction directly', content: `{{Infobox
| title = Napoleon Bonaparte
| born = 15 August 1769
| died = 5 May 1821
| height (French inches, per autopsy) = 5 pieds 2 pouces
| height (converted correctly) = about 1.68 m / 5 ft 6 in
| height (converted with wrong ruler, 1820s British press) = 5 ft 2 in
}}

'''Napoleon Bonaparte''' (1769-1821) was a French military and political leader who rose during the French Revolution and ruled France as emperor from 1804 to 1814/15. He was not short.

== The inches problem ==
Napoleon's post-mortem, conducted by his physician Francesco Antommarchi in 1821, recorded his height as 5 pieds 2 pouces in French measure.<ref name="dwyer">Philip Dwyer, ''Citizen Emperor: Napoleon in Power'' (Yale University Press, 2013), appendix on physical description.</ref> A French pied was about 32.5 cm and a pouce about 2.7 cm, longer than the English foot and inch of the same name. Converted correctly, 5 pieds 2 pouces comes to roughly 1.68 m, or about 5 ft 6 in in English units: perfectly average for a Frenchman of his generation, and in fact slightly taller than the mean height recorded for French army conscripts at the time.<ref name="dwyer" />

British newspapers and cartoonists converted the same figure using English feet and inches without adjusting the unit, producing "5 feet 2 inches" and, from that arithmetic error, the myth.<ref>David Markham, "Napoleon's Height: A Myth Refuted", ''Napoleonic Historical Society'' bulletin (2001), summarising the metrology.</ref> British political cartoonist James Gillray then built an entire visual campaign on a small, furious "Little Boney," and the image outlived every French measurement that contradicted it.

== Aftermath of the myth ==
The term "Napoleon complex," describing supposed compensatory aggression in short men, rests on a unit conversion error made two centuries ago by people who had never met him. Contemporary accounts, including from his own Imperial Guard, describe him as of unremarkable, average height.<ref name="dwyer" />

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: { user: 'CiteOrDie', daysAgo: 10, content: `== Please stop re-adding "notoriously short" to the lead ==

Twice now someone has added back the "notoriously short" line. The autopsy record is in French units; converting it correctly gives an entirely average height. This is one of the best-documented myths in popular history and the article should not repeat the error it exists to correct. ~~~

: Agreed, and I've semi-protected the lead sentence for a month. [[User:Admin|Admin]] ([[User talk:Admin|talk]]) 14:02, 16 September 2026 (UTC)
` },
},

{
  title: 'Great Fire of London',
  ratings: { helpful: [154, 4], funny: [131, 7] },
  revisions: [
    { user: 'HansardHannah', daysAgo: 24, comment: 'created article', content: `{{Infobox
| title = Great Fire of London
| dates = 2-6 September 1666
| started at = Thomas Farriner's bakery, Pudding Lane
| buildings destroyed = roughly 13,200 houses; 87 parish churches; St Paul's Cathedral
| confirmed deaths = a small number, traditionally given as very low
}}

The '''Great Fire of London''' burned through the City of London from 2 to 6 September 1666, destroying most of the medieval city within the old Roman walls. It started in a bakery and was initially blamed on a foreign conspiracy; neither the baker nor the diplomatic incident survived contact with the historical record.

== Start ==
The fire began shortly after midnight on 2 September in the bakery of Thomas Farriner on Pudding Lane. Farriner testified that he had checked his ovens before going to bed and believed them safely out; his household escaped over adjoining rooftops, though a maidservant who did not attempt the climb became one of the fire's few confirmed victims.<ref name="tinniswood">Adrian Tinniswood, ''By Permission of Heaven: The Story of the Great Fire of London'' (Riverhead Books, 2003).</ref>

A French watchmaker, Robert Hubert, later confessed to starting the fire deliberately as a foreign agent and was hanged for it in October 1666. Investigators at the time already doubted the confession: Hubert's account of throwing a fireball through a bakery window did not match the building, and he was shown to have arrived in London some days after the fire had already started. He was executed anyway, and historians now treat the confession as false, extracted from a man who may not have been mentally competent to give one.<ref name="tinniswood" />

== Scale versus death toll ==
The fire destroyed an estimated 13,200 houses, 87 parish churches and St Paul's Cathedral, leaving tens of thousands of Londoners homeless.<ref name="tinniswood" /> The traditionally cited death toll is a handful of named victims, a figure that has been challenged on the grounds that the deaths of poor Londoners, whose remains might not survive an inferno that also destroyed parish burial records, would have gone uncounted.<ref>Neil Hanson, ''The Great Fire of London: In That Apocalyptic Year, 1666'' (Doubleday, 2001), on the disputed toll.</ref> Whatever the true number, it is agreed that a fire which erased most of a major European capital killed a strikingly small recorded number of its inhabitants, largely because it burned slowly enough for people to flee to the river and the fields, even as it destroyed everything they owned.

== Rebuilding ==
Christopher Wren's plan for a rebuilt London on a grid of grand avenues was rejected in favour of rebuilding along the old, irregular medieval street lines, largely because property owners refused to have their boundaries redrawn while the ashes were still warm.<ref name="tinniswood" /> London's street plan today still substantially follows the layout the fire failed to erase.

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Velcro',
  ratings: { helpful: [142, 3], funny: [188, 6] },
  revisions: [
    { user: 'Thoenfan', daysAgo: 15, comment: 'created article', content: `{{Infobox
| title = Velcro
| inventor = George de Mestral
| patented = 1955 (Swiss patent), 1958 (Canadian)
| inspiration = burdock burrs stuck to his dog
| name origin = ''velours'' + ''crochet'' (French: velvet + hook)
}}

'''Velcro''' is a hook-and-loop fastener invented by the Swiss engineer George de Mestral after a walk in the Alps with his dog.

== The walk ==
In 1941, de Mestral returned from a hunting trip in the Jura mountains to find his clothing and his dog's fur covered in burdock burrs. Examining one under a microscope, he found that its surface was covered in small hooks that caught on anything with a loop-shaped surface, such as fabric weave or fur.<ref name="freeman">Allyn Freeman and Bob Golden, ''Why Didn't I Think of That?'' (Wiley, 1997), chapter on de Mestral and Velcro.</ref>

De Mestral spent roughly a decade developing a practical version, the main problem being how to weave the hook side out of a durable synthetic material at industrial scale rather than by hand; he eventually settled on nylon, cut under infrared light to form permanent hooks.<ref name="freeman" /> He patented the result in 1955, naming it by combining the French words ''velours'' (velvet) and ''crochet'' (hook).<ref>US Patent 2,717,437, "Separable Fastening Device," George de Mestral, filed 1952, granted 1955.</ref>

== Adoption ==
Early sales were modest; the fastener took off commercially in the 1960s, helped substantially by NASA's use of Velcro strips to secure equipment and tools in zero gravity aboard Apollo missions, which gave the product a level of publicity that a Swiss engineer's decade of nylon-weaving experiments could not otherwise have bought.<ref>NASA, "Velcro Usage in Apollo Program," ''Spinoff'' technology transfer report (1972).</ref>

The underlying mechanism, since studied as a foundational case in biomimicry, is simply a burr's own reproductive strategy: burdock seeds are covered in hooks specifically so that they catch on passing animals and get carried elsewhere before dropping off. De Mestral did not invent a fastening mechanism so much as notice one that had already been patented, so to speak, by evolution some tens of millions of years earlier.<ref name="freeman" />

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Coca-Cola',
  ratings: { helpful: [167, 9], funny: [174, 12] },
  revisions: [
    { user: 'CiteOrDie', daysAgo: 22, comment: 'created article, sourced the original formula carefully', content: `{{Infobox
| title = Coca-Cola
| invented = 1886, Atlanta, Georgia
| inventor = John Stith Pemberton
| original marketing = "brain tonic and intellectual beverage"
| coca leaf derivative removed from recipe by = 1929
}}

'''Coca-Cola''' is a carbonated soft drink invented in 1886 by the Atlanta pharmacist John Stith Pemberton, who was attempting to develop a patent medicine and a substitute for his own morphine addiction, acquired from a wound sustained in the American Civil War.<ref name="pendergrast">Mark Pendergrast, ''For God, Country and Coca-Cola'' (Basic Books, 2013), chapters 1-3.</ref>

== Original formula ==
Pemberton's syrup combined extract of the coca leaf, the source plant of cocaine, with caffeine-rich kola nut extract, and was marketed as a tonic for headaches and fatigue.<ref name="pendergrast" /> The amount of cocaine alkaloid per serving is estimated to have been small, and it was removed from the recipe by around 1903 as public and regulatory attitudes to cocaine hardened, well before the Harrison Narcotics Tax Act of 1914 restricted the drug nationally.<ref name="pendergrast" /> "Spent" coca leaves, with the cocaine extracted, continued to be used for flavouring under a special import arrangement with the US government that persists into the present, meaning a legitimate, cocaine-free coca leaf extract is still a listed part of the flavouring supplied to the Coca-Cola Company by a licensed processor.<ref>US Drug Enforcement Administration import records for decocainized coca leaf, cited in Pendergrast (2013), afterword.</ref>

== Secrecy theatre ==
The company maintains that the complete flavouring formula, nicknamed "Merchandise 7X," is known to only a small number of employees and is kept in a vault, a piece of corporate showmanship formalised when the physical vault was put on public display as a tourist attraction at the World of Coca-Cola museum in Atlanta in 2011.<ref>"World of Coca-Cola Unveils New Vault," company press release, 8 December 2011.</ref> Food chemists have pointed out that modern analytical chemistry can, in principle, reverse-engineer almost any beverage's ingredient list; the vault protects a brand story more than it protects a technical secret that could not otherwise be approximated.

== Name ==
The name and the flowing script logo were devised by Pemberton's bookkeeper, Frank Mason Robinson, who suggested that "the two Cs would look well in advertising."<ref name="pendergrast" /> The logo has changed only in detail since.

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: { user: 'Thoenfan', daysAgo: 8, content: `== Cocaine content figures ==

Do we have a real number of milligrams per serving anywhere reliable, or is "small" the honest answer? I have seen wildly different figures quoted online, most unsourced. ~~~

: "Small" is the honest answer. Pendergrast discusses the difficulty of reconstructing an exact figure given that Pemberton's own records are incomplete and later reformulations changed things repeatedly before 1903. I'd rather print "small, precise figure unclear" than a number I can't stand behind. [[User:CiteOrDie|CiteOrDie]] ([[User talk:CiteOrDie|talk]]) 19:40, 18 September 2026 (UTC)
` },
},

{
  title: 'Mount Everest',
  ratings: { helpful: [183, 5], funny: [219, 14] },
  revisions: [
    { user: 'Ornithopod', daysAgo: 12, comment: 'created article', content: `{{Infobox
| title = Mount Everest
| height = 8,849 m
| location = Nepal-China (Tibet) border
| first confirmed summit = Edmund Hillary and Tenzing Norgay, 29 May 1953
| approximate summit permits issued, spring 2019 = 381
| notable hazard = queueing
}}

'''Mount Everest''', at 8,849 m, is Earth's highest mountain above sea level, and in the last two decades has developed a hazard that has nothing to do with altitude: waiting in line.

== The 2019 queue ==
On 22-23 May 2019, a narrow weather window for safe summit attempts coincided with several hundred climbers converging on the final ridge below the peak, producing a photographed line of climbers standing in single file at over 8,000 m, an altitude at which the body is slowly dying regardless of how still one stands.<ref name="natgeo">Freddie Wilkinson, "What's Really Behind This Year's Deadly Season on Everest," ''National Geographic'', 27 May 2019.</ref> Nepal issued a record 381 climbing permits that spring, and climbers reported waits of one to two hours in the "death zone" above 8,000 m, where oxygen is roughly a third of sea-level pressure and supplemental oxygen supplies are finite.<ref name="natgeo" /> Eleven climbers died during that May 2019 season; several deaths were attributed at least partly to exhaustion and oxygen depletion during the delays rather than to falls or weather alone.<ref>Kai Schultz, "11 Died Climbing Everest This Season. Here's Why It Was So Deadly," ''The New York Times'', 26 May 2019.</ref>

== Why the queue exists ==
Nearly all commercial climbers summit via one of two standard routes and rely on fixed ropes installed by Sherpa teams each season; nearly everyone must clip into the same rope at the same bottlenecks, such as the Hillary Step. A short, safe weather window each May concentrates hundreds of climbers' attempts into the same few days, producing a queue for a piece of exposed ridge that has room for exactly one person at a time.<ref name="natgeo" /> Nepal's government has faced repeated criticism, including from mountaineers, for issuing permits without a matching cap on daily summit-day traffic.<ref>Kai Schultz, cited above.</ref>

== Litter ==
Decades of expeditions have also left an estimated tens of thousands of kilograms of discarded oxygen bottles, tents, rope and human waste on the mountain's upper slopes, giving Everest an additional and less romantic nickname among climbers: "the world's highest garbage dump." Nepal has required climbers since 2014 to bring down a minimum weight of their own waste or forfeit a deposit, with mixed success.<ref>"Nepal Orders Teams to Bring Back Their Trash from Everest," Reuters, 22 January 2014.</ref>

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Computer bug',
  ratings: { helpful: [128, 4], funny: [241, 8] },
  revisions: [
    { user: 'HansardHannah', daysAgo: 9, comment: 'created article; the moth is real and it is in a museum', content: `{{Infobox
| title = Computer bug (etymology)
| incident date = 9 September 1947
| location = Harvard Mark II, Harvard University
| logged by = operators including Grace Hopper's team
| specimen = a moth, taped into the logbook
| logbook now held at = Smithsonian National Museum of American History
}}

The engineering term '''"bug,"''' for a fault in a machine or program, predates computing by decades; Thomas Edison used it in an 1878 letter. But the specific moment often credited with popularising it in computing is well documented and involves an actual insect.

== The incident ==
On 9 September 1947, operators working on the Harvard Mark II relay computer traced a persistent fault to a moth that had become trapped between the contacts of one of the machine's electromechanical relays, shorting the circuit. They removed the moth, taped it into the machine's logbook, and annotated the entry: "First actual case of bug being found."<ref name="smith">Kathleen Broome Williams, ''Grace Hopper: Admiral of the Cyber Sea'' (Naval Institute Press, 2004), pp. 84-85.</ref> The logbook page, moth included, survives and is held by the Smithsonian's National Museum of American History.<ref>Smithsonian National Museum of American History, collections record for the Mark II logbook page, object ID accompanying the "first computer bug" exhibit.</ref>

Grace Hopper, then a naval officer working on the Mark II team, did not personally find the moth and did not claim to; the story that she coined the term "debugging" from this event is a later embellishment she herself sometimes retold and sometimes downplayed in interviews, since the word "bug" for a technical fault was already established engineering slang before 1947.<ref name="smith" /> What the incident added was not the word but the joke: the logbook entry is understood to be a deliberate pun by operators already using "bug" routinely, delighted to have found one that could be taped to a page.

== Why the story persists ==
Unlike most etymologies, this one comes with physical evidence in a federal museum collection, which is a higher evidentiary bar than most word origins ever clear. The actual coinage of "bug" for a technical fault remains older and is usually traced to nineteenth-century mechanical and telegraph engineering, well before Hopper's team taped anything to a logbook.<ref name="smith" />

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'ARPANET',
  ratings: { helpful: [151, 6], funny: [161, 5] },
  revisions: [
    { user: 'PollWatcher', daysAgo: 6, comment: 'created article', content: `{{Infobox
| title = ARPANET
| first message sent = 29 October 1969
| from = UCLA (Leonard Kleinrock's lab)
| to = Stanford Research Institute
| intended message = "LOGIN"
| actual message received before crash = "LO"
}}

The '''ARPANET''', the US Defense Department-funded packet-switching network that became a direct ancestor of the internet, transmitted its first message between two computers on 29 October 1969. The message was supposed to be the word "LOGIN." It crashed after two letters.

== The first transmission ==
A team led by Leonard Kleinrock at UCLA attempted to log in remotely to a computer at the Stanford Research Institute, roughly 560 km away, by typing the command "LOGIN" one letter at a time over the new network link, with an SRI engineer on the phone confirming each character's arrival.<ref name="hafner">Katie Hafner and Matthew Lyon, ''Where Wizards Stay Up Late: The Origins of the Internet'' (Simon & Schuster, 1996), pp. 152-154.</ref> The letters "L" and "O" arrived and were confirmed. The system crashed before the "G" arrived, so the first message ever sent over what became the internet's ancestor network was, in its entirety, "LO," an accidental and slightly apt greeting.<ref name="hafner" /> The connection was restored about an hour later and the full "LOGIN" went through.<ref name="hafner" />

== Kleinrock's later comment ==
Kleinrock has pointed out in interviews that "LO," while an accident, could not have been a more fitting first message had anyone planned it: short for "lo and behold."<ref>Leonard Kleinrock, oral history interview, Computer History Museum, 2004, discussing the 1969 transmission.</ref> No contemporary record shows that anyone at the time treated the crash as symbolic; the appeal of the story is almost entirely retrospective.

== Scale of the original network ==
The ARPANET connected exactly four nodes by the end of 1969: UCLA, SRI, the University of California, Santa Barbara, and the University of Utah.<ref name="hafner" /> The network that eventually became the modern internet began, for its first weeks of operation, as a link between two university computer labs that mostly worked, provided nobody needed the letter "G."

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},
];
