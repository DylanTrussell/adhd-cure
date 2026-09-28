// Seed articles, batch 9. Same house rule: the claim is true and sourced; the
// joke lives inside the true part.

export const articles11 = [
{
  title: 'Hubble Space Telescope mirror',
  ratings: { helpful: [188, 4], funny: [171, 7] },
  revisions: [
    { user: 'CubeWatch', daysAgo: 13, comment: 'created article', content: `{{Infobox
| title = Hubble Space Telescope mirror
| launched = 24 April 1990, Space Shuttle ''Discovery''
| flaw announced = 21 June 1990
| error = spherical aberration, about ten times the specified tolerance
| template = the reflective null corrector, kept unchanged since manufacture
| spacing error = the field lens, 1.3 mm too far from the lower mirror
| other tests = an inverse null corrector, and a refractive one, both of which showed the error
}}

The '''primary mirror of the Hubble Space Telescope''' was polished to the wrong shape. The telescope was launched on 24 April 1990. On orbit it would not focus. Both high-resolution cameras showed the same distortion, spherical aberration, and on 21 June 1990 the project manager said so. A board chaired by Lew Allen found that the 2.4-metre mirror had been figured against an optical template, the reflective null corrector, whose field lens sat 1.3 mm too far from the lower mirror. That one measurement accounts for the blur.<ref name="allen">Lew Allen and others, ''The Hubble Space Telescope Optical Systems Failure Report'', NASA, November 1990.</ref>

The mirror was not a bad piece of glass that had been polished carelessly. It was a very good piece of glass that had been polished, carefully, to the wrong instructions.

== The cap ==
The position of the optics was set with metering rods of Invar, by reflecting a beam of light off a polished rod end and reading the interference. To keep the beam centred, Perkin-Elmer fitted a field cap over the end of the rod, with a small hole in the middle. The top of the cap was painted so that it would not reflect. Some of that paint had come off, in a small area around the hole. The operator, the board concluded, took the reflection from the bare metal of the cap rather than from the end of the rod. A test with the same equipment in 1990 found that this was quite easy to do, and even probable. The screws then had no adjustment left, spacers were added, and the lens was left 1.3 mm out.<ref name="allen" />

The corrector was preserved afterwards exactly as it had been during manufacture. When the board measured it, the error was still there.

== The instruments that were right ==
Two other tests, made at the time, showed the same error. An inverse null corrector, built to imitate a perfect mirror, showed it in the template. A refractive null corrector, used to measure the finished mirror, showed it in the glass. Both results were set aside, on the view that those instruments were the ones that were flawed. The manufacturing plan had placed complete reliance on the reflective null corrector, and no check of its dimensions was made after it was first assembled. Staff inside the optical division were worried. The worry did not get out of the division.<ref name="allen" />

The telescope flew with a mirror that two of its own measuring instruments had already failed.

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
  title: 'Ariane 5 Flight 501',
  ratings: { helpful: [176, 3], funny: [169, 6] },
  revisions: [
    { user: 'CiteOrDie', daysAgo: 12, comment: 'created article', content: `{{Infobox
| title = Ariane 5 Flight 501
| date = 4 June 1996
| place = Kourou
| altitude at breakup = about 3,700 m
| time = about 37 seconds after the start of the ignition sequence
| cause = a 64-bit floating-point value converted to a 16-bit integer
| variable = BH, the horizontal bias
| backup = failed 72 milliseconds earlier, for the same reason
}}

'''Ariane 5 Flight 501''' was the maiden flight of the Ariane 5 launcher. On 4 June 1996, about 40 seconds after the start of the flight sequence and at an altitude of about 3,700 metres, the vehicle veered off its path, broke up and exploded. An inquiry board chaired by Jacques-Louis Lions traced the failure to a single conversion in the software of the inertial reference system: a 64-bit floating-point number turned into a 16-bit signed integer that could not hold it.<ref name="lions">Inquiry Board (J. L. Lions, chairman), ''Ariane 5: Flight 501 Failure'', report of 19 July 1996.</ref>

The number was a horizontal-bias value called BH. It was larger than the same calculation had ever been on Ariane 4, because Ariane 5's early trajectory is different. The conversion was not protected. Other conversions next to it were.

== The function that was finished ==
The overflow happened in the alignment of the inertial platform. That module produces a useful result only before lift-off. Once the rocket is flying, the inquiry board wrote, the function serves no purpose. It kept running for about 40 seconds of flight anyway, because that was how long Ariane 4 had needed it, in case of a hold late in the countdown. Ariane 5 did not need it. The code had been carried over, and the Ariane 5 trajectory had been left out of the requirements for the unit.<ref name="lions" />

Three variables that could overflow had been left unprotected, after a decision that the computer should not spend its time checking things that were physically impossible. For BH, the impossible value was the one the new rocket produced.

== The spare ==
There were two inertial reference systems, one active and one in hot standby, so that a failure of the first could be survived by switching to the second. They ran the same software. The backup declared the same exception one data cycle earlier, 72 milliseconds before the active unit did. The on-board computer therefore had nothing left to switch to. What it received from the failed unit was a diagnostic bit pattern, which it read as flight data, and it commanded the nozzles to their stops. The angle of attack passed 20 degrees. The boosters separated. The self-destruct, which was working, destroyed the launcher.<ref name="lions" />

The specification said that on any exception the processor should shut down. Both processors did. The inquiry board noted that this switched off two units that were, until the moment of the exception, still healthy.

== See also ==
* [[Mars Climate Orbiter]]
* [[Hubble Space Telescope mirror]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Knight Capital',
  ratings: { helpful: [164, 5], funny: [158, 8] },
  revisions: [
    { user: 'PollWatcher', daysAgo: 11, comment: 'created article', content: `{{Infobox
| title = Knight Capital
| date = 1 August 2012
| system = SMARS, the automated order router
| trigger = 212 parent orders, sent to one of eight servers
| result = 4 million executions, 154 stocks, more than 397 million shares
| positions = about $3.5 billion long and $3.15 billion short
| loss = $460 million
| duration = about 45 minutes
}}

On 1 August 2012, '''Knight Capital''' Americas LLC sent millions of orders into the stock market while handling 212 small retail orders. The orders came from its automated router, SMARS. In about 45 minutes the firm obtained more than 4 million executions, in 154 stocks, for more than 397 million shares. It was left about $3.5 billion long in 80 stocks and about $3.15 billion short in 74. The loss on those positions was $460 million.<ref name="sec">U.S. Securities and Exchange Commission, Release No. 34-70694, ''In the Matter of Knight Capital Americas LLC'', 16 October 2013.</ref>

The 212 orders were the ones customers had actually sent. The rest were the router's idea.

== The code that had been retired ==
SMARS was being updated for the New York Stock Exchange's retail liquidity program. The new code was meant to replace an old function called Power Peg, which Knight had stopped using in 2003 and had left in the program. The new code reused the flag that used to turn Power Peg on. Power Peg, when it worked, counted the shares already filled and stopped sending child orders when the parent's order was complete. In 2005 that counter had been moved to an earlier point in the sequence. Knight did not retest Power Peg afterwards, to see whether it would still stop.<ref name="sec" />

During the deployment, one technician did not copy the new code onto one of the eight servers. Nobody reviewed the copy. There was no written procedure that said someone should. On the morning of 1 August, the seven updated servers handled the new orders correctly. The eighth still had Power Peg, and the reused flag woke it up.

== Forty-five minutes ==
Because the counter had been moved, the eighth server sent child orders without regard to how many shares had already been filled. One part of Knight's system could see that the parent orders were done. That information was not passed back to SMARS. For those 212 parents, the router kept going.<ref name="sec" />

In 75 of the stocks, Knight's executions were more than 20 percent of the volume and the price moved more than 5 percent. The code that was supposed to know when to stop had been left in place, with its stop removed, on a machine nobody had updated.

== See also ==
* [[Ariane 5 Flight 501]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Chelyabinsk meteor',
  ratings: { helpful: [191, 3], funny: [142, 9] },
  revisions: [
    { user: 'Ornithopod', daysAgo: 10, comment: 'created article', content: `{{Infobox
| title = Chelyabinsk meteor
| date = 15 February 2013
| place = Chelyabinsk Oblast, Russia
| size = about 19.8 m across, give or take 4.6 m
| speed = 19.16 km/s at entry
| energy = several hundred kilotons, uncertain by about a factor of two
| peak brightness = magnitude -27.3, at 29.7 km altitude
| glass = 3,613 apartment buildings in the city, about 44 percent
}}

The '''Chelyabinsk meteor''' was an asteroid about 20 metres across that entered the atmosphere over Chelyabinsk Oblast on 15 February 2013 and broke up in the air. It was the largest airburst over land since the Tunguska event of 1908, in a region with more than a million people. Dash cameras and security cameras recorded it. From those films, and from infrasound that went round the Earth, a consortium led by Olga Popova put the entry speed at 19.16 kilometres a second and the diameter at 19.8 metres, plus or minus 4.6, assuming a sphere of the density measured from the meteorites.<ref name="popova">Olga P. Popova and others, "Chelyabinsk Airburst, Damage Assessment, Meteorite Recovery, and Characterization", ''Science'' 342 (2013), pp. 1069-1073.</ref>

The energy estimates sit between roughly 470 and 590 kilotons. The paper says every one of them is uncertain by a factor of two, for want of anything else that big to calibrate against.

== What reached the ground ==
The brightest moment was at 29.7 km. The last burst was at 27 km. Fragments that got lower were slowed enough, the authors argue, that they did not hand their momentum on to the air beneath them, which is why the blast at the surface was less than a single shock from a larger body would have been. It was still enough. In the city, 3,613 apartment buildings, about 44 percent, had shattered glass. A zinc-factory roof collapsed. Directly under the path, the shock blew people off their feet.<ref name="popova" />

In Yemanzhelinsk, window frames facing the trajectory were pushed in. There was no structural damage to the buildings. There was a statue of Pushkin in the local library, cracked by a blown-out window frame.

== The shape of the damage ==
Teams visited 50 villages. The broken glass extended furthest to the side of the track, not ahead of it, which is what a cylindrical shock does. Ahead of the fireball the disturbance lasted a long time, shook buildings and sent people outside, and broke nothing. The number of damaged houses per thousand inhabitants fell off with distance. Electricity and mobile phones dropped briefly in one northern district, from the vibration, and some gas valves closed themselves for the same reason.<ref name="popova" />

No crater belongs to the event. The rock that did the damage finished as dust and as meteorites, and the thing that broke the glass was air.

== See also ==
* [[Tunguska event]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Florence whale explosion',
  ratings: { helpful: [170, 4], funny: [205, 6] },
  revisions: [
    { user: 'Anonyfish', daysAgo: 9, comment: 'created article', content: `{{Infobox
| title = Florence whale explosion
| date = 12 November 1970
| place = a beach south of Florence, Oregon
| carcass = a sperm whale, 45 feet, about 8 tons, ashore since 9 November
| charge = half a ton of dynamite
| agency = the Oregon State Highway Division, which then had the beaches
| injuries = none reported
| one car = a three-foot piece of whale, through the roof
}}

The '''Florence whale explosion''' was the attempt, on the afternoon of 12 November 1970, to remove a dead sperm whale from an Oregon beach with dynamite. The whale, 45 feet long and about eight tons, had washed ashore near Florence on 9 November. Beaches were then the responsibility of the State Highway Division. The engineers treated the carcass as they would have treated a boulder: half a ton of dynamite, placed to blow the pieces out to sea, where gulls and fish were expected to finish the job.<ref name="opb">Tiffany Camhi, "It was like a blubber snowstorm: Why Oregon blew up a whale in 1970", Oregon Public Broadcasting, 18 July 2020, from an interview with Larry Bacon of the ''Register-Guard''.</ref>

Larry Bacon, a new reporter at the Eugene ''Register-Guard'', was there. He said there was no countdown.

== The blast ==
Bacon described a hundred-foot geyser of blood, blubber and sand, and then a fall of smaller pieces he compared to a snowstorm. Spectators who had been standing about a quarter of a mile away ran. A chunk about three feet across came down on a car and smashed the roof. Bacon's car was parked next to that one. He reported no injuries. The smell stayed in people's clothes.<ref name="opb" />

George Thornton, the highway engineer in charge, told Bacon afterwards that it had gone exactly right, except that the dynamite had funnelled down into the sand and sent the explosion straight up.

== Afterwards ==
The remaining pieces had to be dealt with by other means. Oregon's practice with a beached whale is now to bury it. Florence later named a seaside park for the explosion.<ref name="opb" />

The plan was to turn one large obstruction into many small ones, at a distance the gulls could manage. The distance the pieces actually travelled was the distance to the spectators.

== See also ==
* [[Great Molasses Flood]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Pentium FDIV bug',
  ratings: { helpful: [159, 4], funny: [166, 5] },
  revisions: [
    { user: 'Thoenfan', daysAgo: 8, comment: 'created article', content: `{{Infobox
| title = Pentium FDIV bug
| found by = Thomas R. Nicely, Lynchburg College
| noticed = June 1994
| isolated = 19 October 1994
| reported to Intel = 24 October 1994
| public email = 30 October 1994
| example = 4195835 divided by 3145727
| check = the same division, rearranged, returns 256 instead of 0
}}

The '''Pentium FDIV bug''' is an error in the floating-point division of early Intel Pentium processors. Thomas R. Nicely, a mathematician at Lynchburg College, was enumerating primes and adding up the reciprocals of twin primes when the totals from a Pentium disagreed with the totals from a 486 by more than rounding could explain. He traced it, by binary search, to one pair of twin primes. The processor was returning a wrong reciprocal. He contacted Intel on 24 October 1994 and described the bug in an email on 30 October.<ref name="nicely">Thomas R. Nicely, "Pentium FDIV flaw FAQ", 19 August 2011, including the test values and his account of the discovery.</ref>

He had first seen the bad totals in June. It took until 19 October to be satisfied that the compiler, the chipset and his own code were not the cause.

== The division ==
A short test, which Nicely attributes to Tim Coe, is the division of 4,195,835 by 3,145,727. A correct processor returns 1.3338204491362410025. A flawed Pentium returns 1.3337390689020375894. The first digits agree. The fifth significant digit does not.<ref name="nicely" />

Rearranged, the same sum is harder to miss. Compute 4195835 minus 3145727 times the quotient of those two numbers. The result should be 0. On a flawed Pentium it is 256. Nicely's note says the check can be done in a spreadsheet, in BASIC, or in the calculator that shipped with Windows.

== What he was doing ==
The project was not a test of the chip. It was a count of primes, twin primes, triplets and quadruplets, run across a set of ordinary computers and combined at the end. The first Pentium joined that set in March 1994. The wrong answers appeared in the sum of reciprocals, which is a quantity that converges, slowly, and which has to be right to many places before the error shows. Lock the floating-point unit out and the error disappeared, at about a tenth of the speed.<ref name="nicely" />

The processor failed a piece of arithmetic that a mathematician was only doing in order to add up a series. The failure could then be demonstrated on the calculator.

== See also ==
* [[Computer bug]]
* [[Ariane 5 Flight 501]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Phineas Gage',
  ratings: { helpful: [183, 4], funny: [121, 11] },
  revisions: [
    { user: 'HansardHannah', daysAgo: 7, comment: 'created article', content: `{{Infobox
| title = Phineas Gage
| date = 13 September 1848
| place = Cavendish, Vermont
| age = 25
| iron = a tamping iron, 3 feet 7 inches, 13 and a quarter pounds
| entry = the left cheek
| exit = the top of the frontal bone
| died = 21 May 1861, San Francisco
}}

'''Phineas Gage''' was a foreman on the Rutland and Burlington Railroad who, on 13 September 1848, at Cavendish, Vermont, had a tamping iron blown through his head. The iron was three feet seven inches long, an inch and a quarter thick at its widest, and weighed thirteen and a quarter pounds. It entered under the left cheekbone, passed through the front of the brain, and left through the top of the skull. His men found it some rods behind him, with blood and brain on it.<ref name="harlow">John M. Harlow, "Recovery from the Passage of an Iron Bar Through the Head", read before the Massachusetts Medical Society, 3 June 1868, ''Publications of the Massachusetts Medical Society'' 2 (1868).</ref>

Gage spoke within a few minutes. He was taken to his hotel in an ox cart, sitting up. He got down with a little help, and an hour later walked up a flight of stairs to the bed where his doctor, John Martyn Harlow, dressed the wound.

== What he said ==
Harlow found him conscious, bleeding heavily, with a pulse of 60. Gage pointed to the hole in his cheek and said that the iron had entered there and passed through his head. He said he hoped he was not much hurt. Later that evening he said he did not care to see his friends, as he would be at work in a few days. Harlow could pass a finger into the opening in the skull for its full length. The brain, he noted, was not sensitive to it.<ref name="harlow" />

The wound infected. Ten days on, Harlow did not think recovery was possible. On the 27th of September an attendant asked him to stop treating Gage, on the ground that it would only prolong the dying. Harlow opened an abscess and let out eight ounces of pus. By 8 November, the fifty-sixth day, Gage was walking in the street.

== Afterwards ==
His contractors, who had thought him their best foreman, would not take him back. Harlow wrote that the balance between his intellectual faculties and his animal propensities seemed destroyed: fitful, irreverent, profane in a way he had not been, obstinate and then capricious, full of plans he abandoned. Friends and acquaintances said he was "no longer Gage." He worked for a time in a livery stable, then for nearly eight years in Chile, driving a coach, and died in San Francisco on 21 May 1861, twelve years, six months and eight days after the injury. There was no autopsy. His mother later allowed the skull to be opened, and Harlow deposited the skull and the iron at Harvard.<ref name="harlow" />

Harlow's first report, in 1848, was not widely believed. He said in 1868 that many surgeons had refused to accept that the man had got up again until they had put their fingers into the hole in his head, and that even then they wanted statements from clergymen and lawyers. Henry Jacob Bigelow, who did believe it, had called the leading feature of the case its improbability. Harlow quoted him, and then showed the skull.

== See also ==
* [[Piltdown Man]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},

{
  title: 'Bloop',
  ratings: { helpful: [141, 6], funny: [174, 7] },
  revisions: [
    { user: 'MonotremeMary', daysAgo: 6, comment: 'created article', content: `{{Infobox
| title = Bloop
| recorded = summer 1997
| by = NOAA hydrophones
| NOAA account = consistent with icequakes from large icebergs
| range = detected at more than 5,000 km
| likely source = between the Bransfield Strait and the Ross Sea, or Cape Adare
| the clip = the signal, sped up 16 times
}}

'''Bloop''' is the name given to a broad, powerful underwater sound recorded in the summer of 1997 by hydrophones of the U.S. National Oceanic and Atmospheric Administration. The agency's acoustics programme now describes that sound as consistent with icequakes, the noises large icebergs make when they crack. Hydrophones in the Scotia Sea have since recorded many icequakes whose spectrograms look very like it. In early 2008 the same kind of signal was used to follow iceberg A53a as it broke up near South Georgia. Sounds of that size can be heard on more than one sensor at a range of over 5,000 kilometres.<ref name="noaa">NOAA Pacific Marine Environmental Laboratory, Acoustics Monitoring Program, "Icequakes (Bloop)".</ref>

From the direction of arrival, NOAA puts the iceberg or icebergs that made the 1997 sound between the Bransfield Strait and the Ross Sea, or possibly at Cape Adare, which is already known for this sort of noise.

== The recording ==
The sound that circulates is not the sound at the speed the hydrophone heard it. NOAA's own file of the original icequake is labelled as the recorded signal sped up sixteen times. A separate clip of an iceberg calving, on the same page, is sped up three times. At the original rate the event is a long, low crack. Sped up, it is the noise that got the name.<ref name="noaa" />

An iceberg breaking is loud enough to cross an ocean. Played sixteen times too fast, it is also brief enough to pass for a call.

== See also ==
* [[Wow! signal]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
  ],
  talk: null,
},
];
