// Seed articles, batch 6. Same house rule: the claim is true and sourced; the
// joke lives inside the true part.

export const articles8 = [
{
  title: 'Gimli Glider',
  ratings: { helpful: [158, 4], funny: [189, 9] },
  revisions: [
    { user: 'Skinnerbox', daysAgo: 20, comment: 'created article', content: `{{Infobox
| title = Gimli Glider
| flight = Air Canada 143
| date = 23 July 1983
| aircraft = Boeing 767, C-GAUN
| from = Montreal, via Ottawa, to Edmonton
| problem = the fuel gauges were blank, and the manual sum used the wrong conversion
| landed at = a disused airbase at Gimli, Manitoba, whose runway ended in a drag strip
| fuel remaining at touchdown = none, in either tank
}}

The '''Gimli Glider''' is the name given to Air Canada Flight 143, a Boeing 767 that ran out of fuel over Red Lake, Ontario, on 23 July 1983 and was glided to a landing at a disused military airfield at Gimli, Manitoba. The fuel gauges were not working. The amount of fuel on board was worked out by hand. The figure used to turn litres into weight was 1.77, which converts litres into pounds. The aircraft measured fuel in kilograms, for which the factor is about 0.8.<ref name="lockwood">George H. Lockwood, Board of Inquiry into the emergency landing of Air Canada Boeing 767 C-GAUN at Gimli, Manitoba, on 23 July 1983, final report (Library and Archives Canada).</ref>

The plane left Montreal, and then Ottawa, with about half the fuel the crew thought it had.

== The sum ==
The 767 was new to Air Canada, and it was metric. The rest of the fleet still worked in pounds. When the gauges failed, the crew and the maintenance staff measured the fuel with drip sticks, which gave centimetres, and a table, which gave litres. Litres still had to be turned into a weight. The number they were given was 1.77. That number is right for pounds. Nobody had told the fuellers that a 767 needed the other one.<ref name="lockwood" />

Dividing by 2.2 would have produced kilograms. Nobody divided by 2.2. The aircraft took off twice, from two airports, with the same error in it.<ref name="lockwood" />

The judge who heard the inquiry wrote that calling the accident a metric mix-up was "simplistic and inaccurate". The wrong factor was real. So was everything around it: blank gauges, a minimum-equipment list that was not followed, and a company that had not assigned the manual fuel sum to anyone in particular when the gauges were dead. The responsibility, he found, ran up into Air Canada management.<ref name="lockwood" />

== The landing ==
Both engines stopped at 35,000 feet, 65 miles from Winnipeg and 45 from Gimli. With the engines gone, the electronic instruments went blank. What remained was a magnetic compass, an artificial horizon, an airspeed indicator and an altimeter. Captain Robert Pearson, who had flown gliders, pointed the aircraft at Gimli. He side-slipped it on the approach and touched down within 800 feet of the threshold.<ref name="lockwood" />

The far end of the runway had been turned into a drag strip. Beyond the strip, drivers and their families were camped in tents and caravans for the weekend. The aircraft stopped before it reached them. Both fuel tanks were dry. Everyone got off.<ref name="lockwood" />

== See also ==
* [[Mars Climate Orbiter]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Mars Climate Orbiter',
  ratings: { helpful: [171, 3], funny: [203, 8] },
  revisions: [
    { user: 'Thoenfan', daysAgo: 19, comment: 'created article', content: `{{Infobox
| title = Mars Climate Orbiter
| operator = NASA, with Lockheed Martin
| launched = 11 December 1998
| lost = 23 September 1999
| root cause = a ground software file reported pound-seconds where the specification required newton-seconds
| factor = 4.45
| software on the spacecraft = metric, and correct
}}

The '''Mars Climate Orbiter''' was a NASA spacecraft lost on 23 September 1999 as it arrived at Mars, after a nine-month flight. The onboard software used metric units and was working. A file produced on the ground, by a program called SM_FORCES, reported the impulse of small thruster firings in pound-force seconds. The specification said newton-seconds. Navigation software believed the specification.<ref name="mib">Arthur G. Stephenson and others, ''Mars Climate Orbiter Mishap Investigation Board Phase I Report'', NASA, 10 November 1999.</ref>

One pound-force is 4.45 newtons. The navigation solution was therefore low by 4.45, for the whole cruise.

== What the board found ==
The Mishap Investigation Board's root cause is a single sentence. The ground software did not use metric units in the "Small Forces" file used to model the trajectory. The Angular Momentum Desaturation file was supposed to be in newton-seconds. It was in pound-seconds. Every later calculation of where the spacecraft was, built on that file, undercounted the effect of the thrusters by the conversion between the two.<ref name="mib" />

The spacecraft itself had been computing the same forces in metric units, correctly. The ground did not use those numbers. The error was found on 29 September, six days after the spacecraft had already been sent into the Martian atmosphere on a path it could not survive.<ref name="mib" />

The board did not stop at the units. It listed the things that let a units error travel for nine months: the mission was not treated as one system, the interface specification was not followed and was not checked end to end, and a last navigation fix before arrival was considered and not done. Arthur Stephenson, the board's chairman, said the failed translation of units was the root cause, and that other failures had let it "linger and propagate".<ref name="nasa">"Mars Climate Orbiter Failure Board Releases Report", NASA, 10 November 1999.</ref>

The number 4.45 is not a large number. Multiplied by every thruster firing between Earth and Mars, it was the difference between an orbit and a hole in the atmosphere.

== See also ==
* [[Gimli Glider]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Leonard v. Pepsico',
  ratings: { helpful: [149, 5], funny: [256, 7] },
  revisions: [
    { user: 'HansardHannah', daysAgo: 17, comment: 'created article', content: `{{Infobox
| title = Leonard v. Pepsico
| court = United States District Court for the Southern District of New York
| citation = 88 F. Supp. 2d 116 (1999)
| judge = Kimba M. Wood
| claimed offer = a Harrier jet, for 7,000,000 Pepsi Points
| tendered = 15 Pepsi Points and a cheque for $700,008.50
| held = the commercial was a joke
}}

'''Leonard v. Pepsico, Inc.''', 88 F. Supp. 2d 116 (S.D.N.Y. 1999), is a contract case about a television advertisement. The commercial ended with a teenager landing a Harrier jet next to a school, saying "Sure beats the bus", and a caption: "HARRIER FIGHTER 7,000,000 PEPSI POINTS." John Leonard collected the points, in a manner of speaking, and sued for the jet. Judge Kimba M. Wood granted Pepsi summary judgment.<ref name="leonard">''Leonard v. Pepsico, Inc.'', 88 F. Supp. 2d 116 (S.D.N.Y. 1999) (Wood, J.).</ref>

== The order ==
Pepsi Stuff was a promotion in which points from specially marked bottles could be redeemed for merchandise from a catalogue. The catalogue's order form listed 53 items. A jacket tattoo was 15 points. A mountain bike was 3,300. There was no Harrier on the form.<ref name="leonard" />

Leonard decided he could not drink his way to seven million points. The rules allowed points to be bought. He raised about $700,000 and, on or about 27 March 1996, sent Pepsi an order form on which he had written "1 Harrier Jet" and "7,000,000", together with 15 original points and a cheque for $700,008.50. The letter said the cheque was for a new Harrier as advertised.<ref name="leonard" />

Pepsi returned the cheque, sent coupons, and wrote that the jet was in the commercial to be funny. Leonard's lawyers wrote back that the commercial "clearly offers the new Harrier jet for 7,000,000 Pepsi Points" and gave Pepsi ten business days. Pepsi sued first, in New York, for a declaration that it owed him no aircraft. Leonard sued in Florida, a state the court later described as having nothing to do with the case. The Florida case was transferred to New York.<ref name="leonard" />

== The joke, as a legal finding ==
Wood held that an advertisement is not an offer, that the commercial pointed viewers at the catalogue for the actual terms, and that the catalogue did not contain a jet. Separately, she held that the commercial was obviously a joke. The test was what a reasonable person would have understood, not what Leonard hoped and not what Pepsi had privately intended.<ref name="leonard" />

The opinion goes through the commercial shot by shot. The pilot is a teenager who "could barely be trusted with the keys to his parents' car, much less the prize aircraft of the United States Marine Corps", and who spends his pre-flight minutes on his hair. A Harrier's job, as the Marine Corps described it, is to attack and destroy surface targets. Using one to get to school is not a serious proposal. Seven million points was either seven million cans of Pepsi, which Wood worked out as roughly 190 a day for a hundred years, or about $700,000. A Harrier cost roughly $23 million. Leonard knew that figure. A fighter plane for $700,000, the court said, was a deal too good to be true.<ref name="leonard" />

The commercial was an advertisement, it was tongue-in-cheek, and there was no writing that satisfied the Statute of Frauds. Leonard did not get a jet. The judgement is assigned, in law schools, to the week on offer and acceptance.

== See also ==
* [[Carlill v Carbolic Smoke Ball Company]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Coelacanth',
  ratings: { helpful: [166, 4], funny: [141, 6] },
  revisions: [
    { user: 'MonotremeMary', daysAgo: 16, comment: 'created article', content: `{{Infobox
| title = Coelacanth
| order = Coelacanthiformes
| living genus = ''Latimeria''
| first living specimen = 22 December 1938, off East London, South Africa
| identified by = J. L. B. Smith
| named for = Marjorie Courtenay-Latimer, and the Chalumna River
| soft tissue saved = none
}}

The '''coelacanth''' is a lobe-finned fish of a group that palaeontologists had known from fossils and had believed finished by the end of the Mesozoic. On 22 December 1938 a trawler brought one up, alive, from about 40 fathoms west of East London, South Africa. It was given to Marjorie Courtenay-Latimer, curator of the East London Museum. She wrote to the ichthyologist J. L. B. Smith, with a sketch.<ref name="smith">J. L. B. Smith, "A living fish of Mesozoic type", ''Nature'' 143 (1939), pp. 455-456.</ref>

By the time Smith got the letter, the fish had been stuffed, and the insides had been thrown away.

== The letter ==
Smith was at Knysna, about four hundred miles away. Seasonal post meant the letter took ten days. The sketch was enough for him to see that the fish was of a type believed long extinct. He telephoned the museum. There was no preserving equipment. The body had putrefied and, in Smith's words, had been "disposed of beyond any hope of redemption", and a local taxidermist had mounted what was left.<ref name="smith" />

He named it ''Latimeria chalumnae'': the genus for Courtenay-Latimer, the species for the Chalumna River, near where the trawl had been working. The announcement in ''Nature'' opens with the old tag ''Ex Africa semper aliquid novi''. It is a description of a living fish written from a mount.<ref name="smith" />

== What was left ==
The fins, the scales and the skull were still there, and they were not the fins, scales and skull of any fish Smith knew to be alive. He wrote that a full account of the species and its relationships would follow in the ''Transactions of the Royal Society of South Africa''. The first animal's organs were not going to be in it. They had already been thrown away.<ref name="smith" />

A fisherman told him that about five years earlier he had found a larger fish of the same kind, partly decomposed, on a beach east of East London, and had gone for help. When he came back, the tide had taken it.<ref name="smith" /> The 1938 fish is the one that stayed.

== See also ==
* [[Tardigrade]]

== References ==
{{reflist}}

[[Category:Animals]]
[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Clever Hans',
  ratings: { helpful: [154, 3], funny: [178, 8] },
  revisions: [
    { user: 'Anonyfish', daysAgo: 14, comment: 'created article', content: `{{Infobox
| title = Clever Hans
| species = horse
| owner = Wilhelm von Osten, Berlin
| apparent talents = arithmetic, reading, music, the calendar
| tested by = Oskar Pfungst, 1907, published 1911
| actual talent = noticing when the questioner relaxed
}}

'''Clever Hans''' was a horse in Berlin, owned and tutored by a retired schoolteacher, Wilhelm von Osten, who believed the animal could calculate, read, tell the time and identify musical intervals. Hans answered by tapping a hoof. A commission of respected observers watched him in 1904 and could find no fraud. The psychologist Oskar Pfungst then tested the horse with the answer hidden from the person asking the question. The arithmetic stopped.<ref name="pfungst">Oskar Pfungst, ''Clever Hans (The Horse of Mr. von Osten)'', translated by Carl L. Rahn (Henry Holt, New York, 1911).</ref>

Hans could not do sums. He could tell when a person who could do sums thought the sum was finished.

== The test ==
Pfungst called the two conditions "procedure with knowledge" and "procedure without knowledge". Von Osten whispered a number into the horse's ear. Pfungst whispered another. Hans was asked for the total. Each man knew only his own number, so the sum, if anyone in the yard knew it, was the horse. Then they repeated the problem with the answer known to the questioner.

In 31 trials without knowledge, Hans was right 3 times. In 31 trials with knowledge, he was right 29 times. Pfungst treated the three as chance. A counting test, with balls on a frame and the experimenter facing away, was passed every time the answer was known and failed every time it was not. A musical test went the same way. Across the series, knowledge produced correct answers 90 to 100 per cent of the time. Ignorance produced about 10 per cent, which is what chance produces.<ref name="pfungst" />

Pfungst's conclusion is a list of things Hans could not do. He could not read, count or calculate. He knew nothing of coins, cards, calendars or clocks. He could not tap back a number he had just been told. He had, Pfungst wrote, "not a trace of musical ability".<ref name="pfungst" />

== The cue ==
What Hans could do was watch. The questioner leaned forward while the hoof was tapping and straightened, slightly, when the right number had been reached. The movement was not performed on purpose. It was the posture of someone waiting, and then of someone who has the answer. Hans stopped when the posture changed. Pfungst measured it. If he leaned further forward at the tenth tap of a requested twenty, the horse sped up for the second ten. Of 34 such trials, 31 worked.<ref name="pfungst" />

Von Osten had not been signalling on purpose, which is why the 1904 commission found no trick. He believed the horse was thinking. The horse was watching him believe it. Asked a question to which nobody present knew the answer, Hans tapped anyway, and the number he arrived at was his own.

== See also ==
* [[Ig Nobel Prize]]

== References ==
{{reflist}}

[[Category:Animals]]
[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Carrington Event',
  ratings: { helpful: [177, 4], funny: [162, 7] },
  revisions: [
    { user: 'CiteOrDie', daysAgo: 13, comment: 'created article', content: `{{Infobox
| title = Carrington Event
| date = 1-2 September 1859
| flare observed by = Richard Carrington and Richard Hodgson, independently
| published = ''Monthly Notices of the Royal Astronomical Society'', 1860
| effect on Earth = a geomagnetic storm, worldwide aurora, telegraph failure
| telegraph, Boston to Portland = operated for about two hours with the batteries disconnected
}}

The '''Carrington Event''' was a solar flare and the geomagnetic storm that followed it, in the first days of September 1859. Just before noon on 1 September, the English astronomer Richard Carrington was drawing sunspots when he saw two patches of intense white light on the Sun. Richard Hodgson, observing independently, saw the same thing. Their reports were published side by side.<ref name="carrington">Richard C. Carrington, "Description of a Singular Appearance seen in the Sun on September 1, 1859", ''Monthly Notices of the Royal Astronomical Society'' 20 (1859), pp. 13-15. Hodgson's note is printed with it.</ref>

The next day, telegraphers in the United States found that the wires worked better with the batteries switched off.

== The flare ==
Carrington's note is short, because the event was short. The patches of light lasted about five minutes. He had the presence of mind to note the time and the position, and to check that it was not a reflection in the instrument. By the time he went to fetch someone else to look, it was fading. The magnetic instruments at Kew, which he did not know about until afterwards, had jumped at the same minute.<ref name="carrington" />

The storm that reached Earth on 2 September produced aurora far south of the usual latitudes. A compilation of the eyewitness record describes the light, at its height, as blood-red or deep crimson, and bright enough that a person could read a newspaper by it.<ref name="green">James L. Green and others, "Eyewitness Reports of the Great Auroral Storm of 1859", submitted to ''Advances in Space Research'', 2005 (NASA technical report).</ref>

== The wires ==
Telegraph lines in Europe and North America stopped behaving. Currents appeared on wires that had no battery attached. Operators reported shocks, and poles threw sparks. On the line between Boston and Portland, the operators did the experiment the situation suggested. Boston asked Portland to cut the battery off for fifteen minutes. Portland did. Boston reported that the line was then running on the auroral current, and asked how the writing was coming through.<ref name="green" />

Portland's answer, as printed in the ''Daily Chronicle and Sentinel'' of Augusta, Georgia, on 8 September 1859, and reprinted in the NASA compilation, was: "Better than with our batteries on."<ref name="green" />

They worked the wire for about two hours with no battery at all, adjusting the relays as the current rose and fell. The same paper called it the first time on record that more than a word or two had been sent that way. A Washington office, the same morning, found currents on the wires before anyone had connected a battery, and sent messages from New York to Pittsburgh on them.<ref name="green" />

The Sun had, for one morning, become the power supply of the telegraph, and the operators had preferred it to the equipment they were paying for.

== See also ==
* [[Wow! signal]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Wow! signal',
  ratings: { helpful: [148, 6], funny: [171, 5] },
  revisions: [
    { user: 'Thoenfan', daysAgo: 11, comment: 'created article', content: `{{Infobox
| title = Wow! signal
| detected = 15 August 1977
| telescope = Big Ear, Ohio State University
| frequency = near 1420 MHz, the hydrogen line
| printout = 6EQUJ5
| annotation = "Wow!", in red pen, by Jerry Ehman
| detected again = no
}}

The '''Wow! signal''' is a strong narrowband radio signal recorded on 15 August 1977 by the Big Ear radio telescope at Ohio State University, during a search for signals of the sort a technical civilisation might send. It arrived near 1420 MHz, the frequency at which neutral hydrogen radiates, which is the frequency a sender might pick because anyone with a radio telescope is already looking there. A few days later Jerry Ehman, reviewing the printout, circled the characters 6EQUJ5 and wrote "Wow!" in the margin in red pen. The name of the signal is his handwriting.<ref name="ehman">Jerry R. Ehman, "Wow! Signal: 30th Anniversary Report", Ohio State University Radio Observatory, bigear.org, 2007.</ref>

It has not been seen again.

== The printout ==
Big Ear did not track objects. It sat still, and the rotation of the Earth carried the sky through the beam. A steady source of small angular size was expected to produce a particular pattern of rising and falling intensity, lasting about as long as the beam took to sweep past it, a little over a minute and a half. The characters 6EQUJ5 are that pattern, written in the code the computer used for signal strength. The U stands for a peak of about 30 times the background noise. Ehman recognised the shape, marked it, finished the rest of the printout to see whether it came back on a later day, and then called John Kraus and Robert Dixon. It had not come back.<ref name="ehman" /><ref name="dixon">Robert S. Dixon and Jerry R. Ehman, account of the 15 August 1977 detection, in the North American AstroPhysical Observatory compilation of the Wow! signal (the "official" summary circulated by the observatory).</ref>

The location was reobserved more than thirty times in the following six weeks, and many times in later years, by Big Ear and by other instruments. Nothing like it was recorded, there or anywhere else in the survey.<ref name="dixon" />

== What it was not shown to be ==
A single detection is not a message. Ehman's own anniversary account goes through the telescope, the frequency and the ways the signal could have been terrestrial, and does not close the question. Later searches, including one by Breakthrough Listen, have not recovered it.<ref name="bl">"Breakthrough Listen Search for the WOW! Signal", ''Research Notes of the American Astronomical Society'' (2022), reporting no redetection and citing J. R. Ehman, "The Big Ear Wow! Signal", 1998, and J. D. Kraus, 1979.</ref> The hydrogen-line frequency and the beam-shaped rise and fall are what made the line of printout worth a red pen. They are also what a natural narrowband burst could look like. The observation stands. The repetition, which would have decided it, does not.

The entire public name of the event is a marginal note, written by a man who was surprised, and who then checked the following days and found nothing.

== See also ==
* [[Carrington Event]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Tacoma Narrows Bridge',
  ratings: { helpful: [183, 5], funny: [147, 9] },
  revisions: [
    { user: 'CubeWatch', daysAgo: 10, comment: 'created article', content: `{{Infobox
| title = Tacoma Narrows Bridge (1940)
| opened = 1 July 1940
| collapsed = 7 November 1940
| wind at collapse = 42 mph in Farquharson's timing; the state history says about 40
| motion = torsion, about 0.2 hertz
| textbook explanation = resonance, from vortices shed by the wind
| frequency of those vortices at 42 mph = about 1 hertz
}}

The '''1940 Tacoma Narrows Bridge''' was a suspension bridge across the Tacoma Narrows, in Washington state. It opened on 1 July 1940. It collapsed on 7 November 1940, in a wind of 42 miles per hour, twisting itself apart while a camera ran. The film is still shown in physics classes, usually as an example of resonance. The engineers who worked on the collapse do not think that is what the film shows.<ref name="billah">K. Yusuf Billah and Robert H. Scanlan, "Resonance, Tacoma Narrows bridge failure, and undergraduate physics textbooks", ''American Journal of Physics'' 59 (1991), pp. 118-124.</ref><ref name="wsdot">Washington State Department of Transportation, "Tacoma Narrows Bridge history: Lessons from failure".</ref>

== What fell ==
The deck was stiffened with solid plate girders, eight feet deep, rather than an open truss. It was light, and it had very little resistance to twisting. For months it had moved in the wind in a vertical wave, which is why it was already called Galloping Gertie before anyone came to film the end of it. On 7 November the motion changed. A cable band on the north side slipped, the deck began to twist, and the twist grew until the span failed.<ref name="wsdot" />

The Federal Works Administration sent Othmar Ammann, Theodore von Kármán and Glenn Woodruff to find out why. Their report, in March 1941, blamed the bridge's flexibility, and the way a solid girder and deck in a wind produce lift and drag, like a wing that should not have been a wing. Aerodynamic forces on bridges, they said, were poorly understood, and future designs would have to be tested as models in a wind tunnel.<ref name="wsdot" />

== The textbook ==
Billah and Scanlan, writing in 1991 for an audience of physicists, counted the textbooks that used Tacoma Narrows as a classroom example of forced resonance: a structure shaken by a periodic push at its own natural frequency, the push being the vortices the wind sheds behind a girder. They then did the sum. At 42 miles per hour the natural rate of that vortex shedding is about 1 hertz. The twist that destroyed the bridge, timed by Professor F. B. Farquharson as he watched it, was 0.2 hertz. The two numbers are not the same number. Vortex shedding was not driving the collapse.<ref name="billah" />

What was driving it, in the engineering account, is aeroelastic flutter. The deck's own motion changed the wind force on it, and the changed force increased the motion. The damping, which is what bleeds energy out of an oscillation, became negative. The bridge supplied its own push. Forced resonance and self-excitation are different mechanisms, and the paper's point is that fifty years of undergraduate explanation had been using the wrong one, with the film as evidence.<ref name="billah" />

The film is genuine. The wind speed is genuine. The sentence that usually accompanies them in a physics course is the part that does not survive the arithmetic.

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},
];
