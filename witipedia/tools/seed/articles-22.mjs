// Seed article. House rule: the claim is true and sourced; the joke lives
// inside the true part. Voice here is action-movie historiography on purpose.
// The curses in the body are either on the cockpit tape or aimed at a sourced fact.

export const articles22 = [
{
  title: 'Federal Express Flight 705',
  ratings: { helpful: [168, 5], funny: [214, 11] },
  revisions: [
    { user: 'Ornithopod', daysAgo: 5, comment: 'created article', content: `'''Federal Express Flight 705''' was a FedEx cargo flight from Memphis to San Jose on 7 April 1994. A jump-seat flight engineer attacked the crew with hammers. The crew flew the DC-10 back to Memphis. Nobody died.

== References ==
{{reflist}}
` },
    { user: 'HansardHannah', daysAgo: 3, comment: 'expanded from the Sixth Circuit opinion, the FBI cockpit tape, and Tucker\'s interview', content: `{{true and funny|source=FBI cockpit voice recorder transcript of Express 705, 7 April 1994}}
{{Infobox
| title = Federal Express Flight 705
| date = 7 April 1994
| aircraft = McDonnell Douglas DC-10-30F, N306FE
| from = Memphis
| to = San Jose
| occupants = 4
| fatalities = 0
| the attacker = Auburn Calloway, a FedEx flight engineer on the jump seat, with hammers and a speargun
| the landing = runway 36 Left at Memphis, about 35,000 pounds over maximum landing weight
}}

On the afternoon of 7 April 1994, '''Federal Express Flight 705''' left Memphis for San Jose in a McDonnell Douglas DC-10-30F, registration N306FE, with three crewmen and one extra FedEx pilot who had brought hammers.<ref name="asn">Aviation Safety Network, occurrence 324994, McDonnell Douglas DC-10-30F N306FE, Federal Express, 7 April 1994, NTSB ATL94LA077. Four occupants, zero fatalities. Memphis to San Jose.</ref><ref name="calloway">''United States v. Calloway'', 116 F.3d 1129 (6th Cir. 1997).</ref> About twenty minutes later, passing 18,000 feet and still talking about a ridge in Arkansas, the jump-seater started beating them in the head.<ref name="tucker">Jim Tucker, interview, "Jim Tucker", ''AVweb'', 16 October 2002.</ref><ref name="cvr">Federal Bureau of Investigation cockpit voice recorder transcript of Express 705, 7 April 1994, as published by AVweb, 16 October 2002, and reproduced at tailstrike.com, "7 April 1994 - Fedex 705".</ref>

He was trying to kill them, crash the jet, and have it pay out as an accident. They did not die. Captain David Sanders put the overweight airplane on runway 36 Left at Memphis while the other two were still fighting on the floor behind him.<ref name="cvr" /><ref name="aopa">Dave Hirschman, "FedEx retires heavy hauler with history", Aircraft Owners and Pilots Association, 24 January 2023.</ref>

The recorder got the whole thing, including First Officer Jim Tucker asking, with a hammer already through his skull, "What the fuck are you doing?"<ref name="cvr" />

== The jump seat ==
Auburn Calloway was a Federal Express flight engineer, 42 years old, living in Memphis.<ref name="calloway" /><ref name="wapo">"Jet Lands Safely After Attack on Crew", ''The Washington Post'', 8 April 1994 (Reuters).</ref> The company had been looking into irregularities in the way he reported his flight hours, and it had told him to show up at a hearing in Memphis on 8 April 1994, the day after this flight.<ref name="calloway" /> The ''Commercial Appeal'', quoted by the ''Los Angeles Times'' the day after the attack, reported a second problem sitting in the same hearing: he had allegedly falsified his employment application and failed to disclose that another air-cargo company had fired him.<ref name="lat">"Pilot Charged in Attack on Flight Crew Faced Disciplinary Hearing", ''Los Angeles Times'', 9 April 1994, from Times wire services, citing the Memphis ''Commercial Appeal''.</ref> FedEx would not discuss his record.<ref name="lat" />

In the days before the hearing he moved money. He had about $40,000 in securities sent to his former wife and sent her cashier's checks totaling nearly $14,000. He went to the employee-benefits office and changed the beneficiaries on an accidental-death policy and a term life policy.<ref name="calloway" /> Alan Bellows, writing up the case, put the on-the-job accidental-death benefit at an extra $2.5 million if Calloway died at work.<ref name="bellows">Alan Bellows, "Aches on a Plane", ''Damn Interesting'', January 2012.</ref> The Sixth Circuit did not put a dollar figure on the policies. It did record the beneficiary change, the cash, and a note to his ex-wife, found later on the airplane, "describing the author's apparent despair."<ref name="calloway" />

Flight 705 was the trip he picked. It was a DC-10 freighter from the Memphis hub to San Jose, loaded, on Bellows's account, with electronic gear headed for Silicon Valley.<ref name="bellows" /><ref name="asn" /> Calloway was not on the crew that actually flew it. The crew that had been scheduled, Calloway included, had come back from an inbound flight one minute over the eight-hour duty limit, so scheduling built a new crew and called Sanders, Tucker and flight engineer Andy Peterson.<ref name="tucker" /> Calloway got on anyway. FedEx let employees ride company cargo jets when there was room. He showed up in flight gear, with carry-on bags, walked into the cockpit before the real crew did, and started adjusting instruments as if the seat were his.<ref name="calloway" /> When Sanders, Tucker and Peterson arrived they took him for a jump-seater, which is a company word for an employee catching a ride.<ref name="calloway" />

The carry-on that mattered was a guitar case.<ref name="appeal">Max Garland, "25 years ago, Federal Express Flight 705 was business as usual — until a hijacking attempt", ''The Commercial Appeal'', 5 April 2019, citing the paper's own 2014 account of the guitar case, and quoting Dave Hirschman, author of ''Hijacked: The True Story of the Heroes of Flight 705''.</ref><ref name="bellows" /> What security later pulled off the airplane, according to the Court of Appeals, was two claw hammers, two sledgehammers, a speargun and a spear.<ref name="calloway" /> Reuters, the night of the attack, also listed a knife.<ref name="wapo" /> Tucker, who was in the right seat, remembered the first weapon that reached him as a 20-ounce framing hammer, and the second act as the speargun.<ref name="tucker" />

Hammers were the point. A bullet hole does not look like an airplane crash. A crushed skull can. Hirschman, who covered the case for the ''Commercial Appeal'' and then wrote the book, told the paper in 2019 that the hammer was chosen because it could wreck a man and still mimic crash injuries. He also said he thought Calloway's destination was FedEx headquarters, and that Calloway "was motivated to do maximum harm to FedEx." Hirschman added the only honest caveat available: Calloway is the only one who knows.<ref name="appeal" /> The sentencing judge later treated a crash in Memphis, and the people under it, as part of what the crime had risked.<ref name="calloway" />

The plan needed the cockpit voice recorder to miss the murder. Bellows's account, matched by later retellings of the preflight, is that Calloway pulled the recorder's circuit breaker, Peterson noticed and reset it, and Calloway pulled it again when the engineer stepped away. Peterson reset it again.<ref name="bellows" /> A cockpit voice recorder of that generation looped about thirty minutes of audio. Kill the crew with the tape still running and, on that account, he could fly long enough to overwrite the fight.<ref name="bellows" /> Peterson did not leave him a dead tape. The FBI later published the recording. It starts with three men laughing.<ref name="cvr" />

== Eighteen thousand feet ==
Sanders was 49, a FedEx captain whose seniority at the company ran about ten years past Tucker's. Tucker was 42, in the right seat as first officer, which is not where a man of his experience had to sit. Peterson, the flight engineer, was 39. The ''Los Angeles Times'' wire carried the ages the next day; the court and the tape call the engineer Andy.<ref name="lat" /><ref name="calloway" /><ref name="tucker" />

Tucker had not planned to be there. He had spent the morning renewing his FAA medical and meant to go fly his Luscombe. Scheduling needed a body who could fly the right seat of a DC-10, and he said yes to a trip that was supposed to be home by 11 p.m.<ref name="tucker" /> Before FedEx he had been a naval aviator: two carrier tours in A-7s, then a weapons instructor and an air-combat-maneuvering instructor in the A-4 at Pensacola. He left active duty in December 1981 and, a couple of years later, resigned his commission as a lieutenant commander. He had flown 737s for People Express. He had checked out on the DC-10 in January 1991.<ref name="tucker" />

They were late to the airplane. The bus driver took a wrong turn. Tucker had left the paperwork in the office because he was not the captain on this leg and captains do not normally haul the paperwork. He met Calloway on the stairs and filed him under "another jumpseater in uniform."<ref name="tucker" />

Tucker hand-flew the departure. The tape has the ordinary music of a climb: eighty knots, V1, rotate, gear up, flaps, and Tucker calling the ramp operation a goatrope, pilot slang for a mess. Sanders pointed out Crowley's Ridge through the windshield, a fault line you can see in the trees, and the two of them wandered into the New Madrid seismic zone and whether Tucker lived in Arkansas. He did not. Sanders lived in Fisherville. Tucker said that sounded like a great spot.<ref name="cvr" />

Peterson called for altimeters. Tucker answered "Nines and twos," which is 29.92, the setting you make passing 18,000 feet. He later put the attack at about twenty minutes after takeoff, passing through 18,000, everybody's back to the door, in the middle of that conversation.<ref name="cvr" /><ref name="tucker" /> Reuters put the cockpit intrusion about fifty miles west of Memphis. The FBI told the ''Los Angeles Times'' the crew had the airplane turned around about forty miles out.<ref name="wapo" /><ref name="lat" />

Then the transcript says, in the FBI's parentheses: sounds of hammer blows striking pilots.<ref name="cvr" />

Tucker heard a metallic ring he had never heard in an airplane. He later said it was the hammer peening off Andy Peterson's skull, two or three times. He turned, and the hammer hit him in the left parietal, over the left ear, went through the bone, and drove fragments into the brain. He lost useful consciousness for about forty-five seconds. His right side went numb almost immediately. He was still hand-flying.<ref name="tucker" />

The tape, while that was happening, is short:

Peterson: "Ow!"

Tucker: "God!" Then: "Oh, ah, shit."

Sanders: "God almighty!"

Tucker: "What the fuck are you doing?"

Sanders: "He's going to kill us."<ref name="cvr" />

Calloway went for Sanders next. Tucker, from the seat he could not get out of, watched Sanders fend off hammer blows with the shoulder harness still on. Then Calloway left. Tucker read it correctly, and said so years later: the man was going for the speargun, either to finish them or to make them fly where he wanted. He had not pulled the engine-fire handles and killed the jet. He wanted the airplane. The three of them were in the way.<ref name="tucker" />

He came back with it. On the tape he says, "Sit down, sit down, get back in your seat, this is a real gun, I'll kill ya."<ref name="cvr" /> Peterson, temporal artery already cut, blood leaving him in time with his pulse, grabbed the spear. Tucker, who could see and could not usefully move, kept yelling "Get him" and told them he had the airplane. The bank-angle warning started chanting.<ref name="cvr" /><ref name="tucker" />

== The airplane as the weapon ==
Tucker had taught other pilots how to use an airplane to ruin somebody's aim. He did not have a fighter. He had a freighter, the autothrottles still at max climb, and one arm that worked.

He pulled the yoke. Sanders, Peterson and Calloway left the cockpit. They tumbled into the galley. A barrel roll would have ended right-side up, and Tucker thought Calloway might simply wait it out, so he stopped the roll at 140 degrees. That figure is his, and he attributed it to the flight-data recorder: most of the way upside down, three men pinned up there, one of them still holding a hammer. From about 18,000 feet he split-S'd toward 12,000.<ref name="tucker" /> Hirschman, writing in 2023, described the same roll and said the jet went more than a hundred knots past its never-exceed speed during the fight.<ref name="aopa" /> The tape records the overspeed warning clicking while the bank-angle voice is still talking.<ref name="cvr" />

The nose came through and the airplane, in Tucker's word, was ripping. Mach tuck. Buffet. Wind noise. He let go of the yoke with the only hand that worked, knocked the autothrottles off, swept them to idle, and got the yoke back. Pull too softly and the dive keeps the airplane. Pull too hard and the airplane keeps the wings. He pulled, got the nose toward the horizon, and started kicking the rudder back and forth so the fight in the back would not get a stable floor.<ref name="tucker" />

What the airframe thought of this, he described later without romance. Control-balance panels on the elevators, about two hundred pounds apiece, were ripped off the airplane. The wings were dripping fuel from what the maneuvers had done to the spars.<ref name="tucker" /> The Sixth Circuit, at sentencing review, put FedEx's property damage above $800,000.<ref name="calloway" />

While Tucker was flying, the other two were losing. Peterson's skull was fractured and the temporal artery was open. Tucker later said Peterson was about five minutes from bleeding to death, and that he got a secondary infection afterward.<ref name="calloway" /><ref name="tucker" /> Sanders took more hammer blows. The court would record deep gashes in his head, a right ear that doctors had to sew back on, a stab wound in the right arm, and a dislocated jaw.<ref name="calloway" /> Tucker remembered the spear missing an artery, and the ear nearly torn off.<ref name="tucker" /> On the tape, from the back, Peterson yells, "Help, the son of a bitch is biting me!"<ref name="cvr" />

Tucker got a radio call out with a headset situation that was already falling apart. His Telex and his sunglasses were gone. He told Memphis center he had been wounded, that there had been an attempted takeover, and that he wanted a vector back to Memphis, an ambulance, and armed intervention. He asked them to keep talking to him. He was still about forty miles out, and he wanted a human voice from a room where nobody was being beaten with a hammer.<ref name="cvr" /><ref name="tucker" />

Sanders and Peterson were shouting for him. He put the airplane on autopilot, stood up badly, watched the autopilot drop offline, reselected it, and went aft. Calloway was on the floor of the forward cargo area in blood, coats, and loose paper. Peterson was on him. Sanders was standing over him with a hammer in one hand and the spear in the other. They were, Tucker said, anaerobic, like men who had just run a race they were not going to win on cardio. Sanders handed Tucker the spear and told him to use it if he had to. Tucker did not mention that his right hand kept falling off the shaft. He did not want Calloway to hear that.<ref name="tucker" />

Sanders went forward and took the jet back. The second round, Tucker said, lasted about fifteen minutes. Calloway would go slack, breathe, and come again. At one point he hauled himself up on the jump seats with both of them hanging on him and drove his thumbs into Tucker's eyes. The blood on Tucker's face was what made the thumbs slip. They went down in a pile. Peterson got hold of a hammer and hit him.<ref name="tucker" /> The court found that the eye-gouging left Tucker partially blind in that eye, on top of the skull fractures and the motor-control damage down his right arm and right leg.<ref name="calloway" />

Tucker has been blunt, since, that Peterson is the one the retellings slight. The flying was real. Without Peterson staying in the fight the whole time, Tucker said, there might not have been any flying left to praise. "He's tough as nails."<ref name="tucker" />

== Runway 36 Left ==
Memphis had cleared them for runway 9. Sanders, alone up front, told the tower he was coming around to 36 Left instead. The tower cleared him to land there, wind 050 at 8. The ground-proximity warning was already going: too low, terrain, sink rate, pull up, and it kept going through a thousand feet and five hundred.<ref name="cvr" /> Hirschman puts the landing about 35,000 pounds over the jet's maximum landing weight. They were still carrying the fuel for California. There was not a spare pilot to sit at the engineer's panel and dump it, and there was not time.<ref name="aopa" /><ref name="tucker" />

Sanders told the tower he had four souls on board and, as well as he could remember with a dislocated jaw and an ear hanging wrong, 85,000 or 86,000 pounds of fuel. Asked whether the situation was under control, he answered, "Well, it's sort of under control."<ref name="cvr" /> A few minutes earlier he had told the men in the back to put the spear in Calloway's throat if they had to, and that he did not give a shit if the man was dead, and also not to kill him. The tape holds both instructions. Then, cleared to land and still hearing the fight, he said, "Kill the son of a bitch."<ref name="cvr" />

Calloway was still struggling when the wheels were on the runway. Tucker remembers the fight continuing until the airplane stopped, and stopping only after Sanders came back from the parking brake and the engine shutdown.<ref name="tucker" /> Paramedic David Teague climbed the escape slide, which is built for going down, and put the cuffs on.<ref name="tucker" /><ref name="calloway" />

The wire story that night had three people in critical condition, Calloway included.<ref name="wapo" /> The next day's wire said Sanders had been treated and released, and that Tucker and Peterson were still serious, Calloway hospitalized with them.<ref name="lat" /> All four were alive. The airplane was on the airport it had left.<ref name="asn" />

== The life sentence ==
A roommate, Douglas Kinzie, called the FBI. He had seen a note in the apartment listing the Flight 705 crew. Agents already knew about the note on the airplane and the beneficiary changes. A magistrate signed a warrant for documents naming FedEx crew, notes about the flight, and insurance-beneficiary records. In the apartment they also took a note listing the weapons, two bank receipts, a will, and a power of attorney. The Sixth Circuit held the extra papers were in plain view and obviously about the same plan.<ref name="calloway" />

A grand jury indicted Calloway on 17 May 1994: attempted aircraft piracy under the old 49 U.S.C. § 1472(i), and interference with flight crew under § 1472(j).<ref name="calloway" /> On 30 March 1995 a jury in Memphis convicted him of attempted air piracy. The ''New York Times'' reported that the jury had deliberated about three and a half hours and had rejected his claim that he was insane at the time. The defense had argued a paranoid personality and a troubled upbringing. Sentencing was still ahead. The statute's range, as the ''Times'' gave it that day, ran from twenty years to life.<ref name="nyt">"Ex-Pilot Convicted of Attempted Air Piracy", ''The New York Times'', 31 March 1995.</ref>

The district judge did not stay in the ordinary range. Attempted aircraft piracy at guideline level 38, with no real criminal history, was 235 to 293 months. She went to level 43. Level 43 is life, whatever your history is. The reasons she wrote down, and the Court of Appeals accepted, were multiple victims, serious physical injury, property damage, and the chance of a crash in Memphis. FedEx was one of the victims she counted, alongside the three men, and the damage bill was the $800,000 already noted. The two life terms she imposed were concurrent, not stacked.<ref name="calloway" />

Calloway appealed. On 20 June 1997 the Sixth Circuit vacated the interference conviction, because the government conceded it was a lesser-included offense of the piracy count, and affirmed the piracy conviction and the life sentence. The court also said, in so many words, that no reasonable jury could have doubted he meant to take the airplane. Hoping the jet would hit the ground with nobody at the controls would still have been control. Wresting it from the crew was the crime, "not the defendant's flight plan or lack thereof."<ref name="calloway" /> Accounts of the sentence, including Tucker's own interview, describe it as life with no chance of parole.<ref name="tucker" /> The popular version in which two consecutive life terms survived the appeal is not what the opinion says. One life term did.<ref name="calloway" />

== After ==
The injuries ended the commercial careers of all three. Hirschman, in the AOPA piece on the airplane's retirement, states that flat.<ref name="aopa" /> Tucker's case is the one he has described in public. Depressed skull fracture, subdural hematoma, a craniotomy, then a brain abscess a week later and a stretch of weeks when the surgeons were not sure he would live. Six hours of intravenous drugs a day for six weeks. Two and a half years of physical, speech, cognitive and occupational therapy. A seizure disorder after the last surgery in 1996, which is the end of an airman medical. The medical he renewed on the morning of 7 April 1994 was the last one he held. He has said the right side still does not feel right.<ref name="tucker" />

He did not stop going near airplanes. He moved to rural Alabama, chaired the Headland airport authority, and kept the Luscombe, flying it with a friend as pilot in command because he could not legally be the pilot. AOPA noted in 2023 that he never went back to work at FedEx and did go back to flying, and pointed readers to a 2010 ''AOPA Pilot'' piece on that second life.<ref name="tucker" /><ref name="aopa" /> On 26 May 1994 the Air Line Pilots Association gave Sanders, Tucker and Peterson its Gold Medal Award for what they had done on the airplane.<ref name="bellows" />

N306FE was repaired and put back on the line. By the time Bellows wrote in 2012 it had been converted to an MD-10, which is a DC-10 with a newer cockpit and no flight engineer. It stayed in FedEx service another twenty-eight years after the afternoon it was supposed to be a hole in Memphis.<ref name="bellows" /><ref name="aopa" /> FedEx retired it with the last of the MD-10 fleet on 31 December 2022.<ref name="aopa" /> It arrived in Memphis that day from Toronto as flight 147. Another MD-10, N311FE, made the type's last arrival later the same day.<ref name="scramble">"FedEx retires MD-10-30Fs", ''Scramble'', noting N306FE (manufacturer serial 48287) retired 31 December 2022 after FDX147 from Toronto, and N311FE as the last of the type into Memphis.</ref>

Tucker, asked whether he would take the trip again if he knew it would cost him the job and save the people on the ground, said he did not know. He was sure about the other part. If Sanders had not got the airplane onto pavement, Calloway was going to finish Peterson and Tucker and then finish Sanders. It was a race against a clock made of blood.<ref name="tucker" />

The jet went back to work for twenty-eight years. The three men who saved it did not.

== See also ==
* [[Gimli Glider]]

== References ==
{{reflist}}

[[Category:True but improbable]]
` },
    { user: '198.51.100.14', daysAgo: 2, comment: '', content: `CALLOWAY WAS THE REAL VICTIM. THE CREW ATTACKED HIM AND THEN CRASHED THE PLANE AND EVERYBODY DIED. DELETE THIS.` },
    { user: 'CiteOrDie', daysAgo: 2, comment: 'Reverted edits by [[Special:Contributions/198.51.100.14|198.51.100.14]] to last revision by HansardHannah', revert: 2 },
    { user: 'CiteOrDie', daysAgo: 1, minor: true, comment: 'copyedit: the life sentence is one count, not a metaphor', patch: [['One life term did.', 'One life term is what the opinion left standing.']] },
  ],
  talk: { user: 'CiteOrDie', daysAgo: 1, content: `== The swearing ==

The lead quotes Tucker saying "What the fuck are you doing?" and later quotes Sanders on the spear and on killing Calloway. That is a lot of profanity for a page that is supposed to be an article. Can we paraphrase the tape? ~~~

: No. Those lines are the FBI transcript, published by AVweb from the cockpit voice recorder, not decoration. Tucker says the fuck-you line in the same breath as the hammer blows. Sanders tells the tower it is "sort of under control" while Peterson is shouting that Calloway is biting him. If we sand the words off, we are editing the evidence to make a murder attempt sound tidier than the tape. [[Witipedia:Be funny]] is not the issue. Verifiability is. The jokes on this page are the true sentences. [[User:HansardHannah|HansardHannah]] ([[User talk:HansardHannah|talk]]) 14:06, 28 September 2026 (UTC)

:: Agreed. Also leave the Sixth Circuit's correction in: concurrent life terms, then the interference count vacated, one life sentence affirmed. The "two consecutive lives" version is the one that needs a footnote, not the other way around. [[User:CiteOrDie|CiteOrDie]] ([[User talk:CiteOrDie|talk]]) 18:41, 28 September 2026 (UTC)
` },
},
];
