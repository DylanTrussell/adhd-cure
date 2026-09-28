/**
 * Picture slots. Every article gets two:
 *
 *   documentary - shows the actual thing. Goes in the infobox or the lead.
 *                 Funny is welcome, but it has to be a real photograph of the
 *                 real subject.
 *   humour      - the joke picture, at the foot of the article. The caption
 *                 says plainly what it is, so the site never passes off a
 *                 photoshop or a generated image as evidence.
 *
 * `query` searches Wikimedia Commons. `diptych` suggests a second search for
 * the side-by-side composer. `custom` slots expect you to supply the image in
 * the contact sheet, by URL or from your own machine.
 */
export const photoSlots = [
  // --------------------------------------------------------- Great Emu War
  {
    article: 'Great Emu War', kind: 'documentary', place: 'lead',
    query: 'Emu War 1932 Lewis gun truck Australia',
    webQuery: 'emu war 1932 machine gun photograph',
    diptych: 'Dromaius novaehollandiae emu head portrait',
    caption: "Left: the Royal Australian Artillery's truck-mounted Lewis gun, 1932. Right: the opposition.",
  },
  {
    article: 'Great Emu War', kind: 'humour', place: 'end', custom: true,
    query: 'emu portrait funny',
    webQuery: 'emu war meme emu soldier helmet funny',
    generate: 'Sepia-toned vintage war photograph portrait of an emu wearing a battered World War One Australian army helmet, staring directly at the camera, shallow depth of field, grainy 1930s film stock, soldiers blurred in the background',
    caption: "An emu, photographed in the manner of a regimental portrait. No emu held rank; the Australian House of Representatives did, however, discuss which side any medals should go to.",
  },

  // ---------------------------------------------------------------- Wombat
  {
    article: 'Wombat', kind: 'documentary', place: 'lead',
    query: 'Vombatus ursinus wombat',
    webQuery: 'wombat cube poop photograph',
    diptych: 'wombat scat cube faeces',
    caption: "Left: a common wombat. Right: what comes out of it, at the corners it was moulded into over several days.",
  },
  {
    article: 'Wombat', kind: 'humour', place: 'end', custom: true,
    query: 'wombat running speed',
    webQuery: 'wombat meme funny photoshop',
    generate: 'A wide chunky wombat sprinting flat out across a running track in an athletics lane, motion blur, stadium floodlights, photographed like a sports agency picture',
    caption: "Not a photograph of an actual race. The 40 km/h is real, and it is faster than Usain Bolt's average over 100 m.",
  },

  // --------------------------------------------------------- Mantis shrimp
  {
    article: 'Mantis shrimp', kind: 'documentary', place: 'lead',
    query: 'Odontodactylus scyllarus peacock mantis shrimp',
    webQuery: 'mantis shrimp punch cavitation photo',
    diptych: 'mantis shrimp cavitation strike underwater',
    caption: "Left: a peacock mantis shrimp. Right: the club it hits with, which accelerates at up to 10,000 g and boils the water in front of it.",
  },
  {
    article: 'Mantis shrimp', kind: 'humour', place: 'end', custom: true,
    query: 'aquarium cracked glass',
    webQuery: 'mantis shrimp meme punch funny',
    generate: 'A cracked aquarium glass panel photographed from outside the tank, a small colourful mantis shrimp visible behind the crack, apologetic aquarium staff out of focus in the background, documentary photograph',
    caption: "Staged. The glass-breaking is not: smashers are kept in acrylic tanks by aquarists who learned this the second way.",
  },

  // -------------------------------------------------------------- Platypus
  {
    article: 'Platypus', kind: 'documentary', place: 'lead',
    query: 'Ornithorhynchus anatinus platypus swimming',
    webQuery: 'platypus swimming photograph',
    diptych: 'platypus bill electroreception anatomy specimen',
    caption: "Left: a platypus. Right: the bill, carrying about 40,000 electroreceptors, which is how it hunts with its eyes shut.",
  },
  {
    article: 'Platypus', kind: 'humour', place: 'end', custom: true,
    query: 'natural history museum specimen examination',
    webQuery: 'platypus meme funny photoshop',
    generate: 'A 1799 natural history scene: a bewildered English naturalist in a powdered wig examining a platypus pelt on a desk with a magnifying glass and a pair of scissors, looking for stitches, candlelit study, oil painting style',
    caption: "An illustration of a real episode: George Shaw cut into the first specimen looking for the seam where somebody had sewn a duck's bill onto a mole. The cuts are still in the pelt.",
  },

  // ------------------------------------------------------------ Tardigrade
  {
    article: 'Tardigrade', kind: 'documentary', place: 'lead',
    query: 'Tardigrada scanning electron micrograph water bear',
    webQuery: 'tardigrade microscope photograph',
    diptych: 'tardigrade light microscope Hypsibius',
    caption: "Left: a tardigrade under an electron microscope. Right: the same animal in visible light, at about half a millimetre.",
  },
  {
    article: 'Tardigrade', kind: 'humour', place: 'end', custom: true,
    query: 'space vacuum chamber',
    webQuery: 'tardigrade meme water bear funny',
    generate: 'A microscopic tardigrade floating in the vacuum of space above the curve of the Earth, tiny and unbothered, photorealistic, lit like a NASA photograph',
    caption: "Illustration. The vacuum exposure is documented: specimens on the outside of FOTON-M3 in 2007 came home and reproduced. A warm afternoon still kills them.",
  },

  // ------------------------------------------------------- Boaty McBoatface
  {
    article: 'Boaty McBoatface', kind: 'documentary', place: 'lead',
    query: 'Autosub Long Range Boaty McBoatface submarine',
    webQuery: 'boaty mcboatface submarine photograph',
    diptych: 'RRS Sir David Attenborough polar research ship',
    caption: "Left: Boaty McBoatface. Right: RRS <i>Sir David Attenborough</i>, the ship 124,109 people voted to call something else.",
  },
  {
    article: 'Boaty McBoatface', kind: 'humour', place: 'end', custom: true,
    query: 'ship naming ceremony',
    webQuery: 'boaty mcboatface meme funny',
    generate: 'A formal ship naming ceremony with dignitaries in suits, a champagne bottle, and an enormous official banner reading nothing, photographed as a wire-service news picture',
    caption: "Staged. The poll result was not: the name led the vote by roughly four to one, and the man who suggested it publicly apologised.",
  },

  // --------------------------------------------------------- Project Pigeon
  {
    article: 'Project Pigeon', kind: 'documentary', place: 'lead',
    query: 'homing pigeon Columba livia military messenger',
    webQuery: 'skinner pigeon guided missile photograph',
    diptych: 'B.F. Skinner pigeon operant conditioning apparatus',
    caption: "Left: a homing pigeon. Right: Skinner's apparatus, in which one pecked at a target image to steer a bomb.",
  },
  {
    article: 'Project Pigeon', kind: 'humour', place: 'end', custom: true,
    query: 'pigeon medal award',
    webQuery: 'war pigeon meme funny photoshop',
    generate: 'A pigeon wearing a small gallantry medal on a ribbon around its neck, standing on a wooden podium, dignified formal portrait, warm studio light',
    caption: "A posed illustration. The medals are real: 32 pigeons hold the Dickin Medal for gallantry, against one cat.",
  },

  // ---------------------------------------------------------- Ig Nobel Prize
  {
    article: 'Ig Nobel Prize', kind: 'documentary', place: 'lead',
    query: 'Ig Nobel Prize ceremony Sanders Theatre',
    webQuery: 'ig nobel prize ceremony photograph',
    caption: "An Ig Nobel ceremony. The prizes are handed over by actual Nobel laureates.",
  },

  // ------------------------------------------------------------ Eiffel Tower
  {
    article: 'Eiffel Tower', kind: 'documentary', place: 'lead',
    query: 'Eiffel Tower Paris photograph',
    webQuery: 'eiffel tower photograph 1889',
    caption: "The Eiffel Tower. Sold for scrap twice in 1925, by the same con man, using the same script both times.",
  },
  {
    article: 'Eiffel Tower', kind: 'humour', place: 'end', custom: true,
    query: 'scrap metal dealer contract signing',
    webQuery: 'eiffel tower sold scrap meme funny',
    generate: 'A 1920s con man in a sharp suit shaking hands with a scrap-metal dealer in front of the Eiffel Tower, both men holding a contract, sepia tone, staged period photograph, film noir lighting',
    caption: "Staged. Victor Lustig ran this exact confidence trick on two separate scrap dealers within weeks, and was only caught trying it a third time.",
  },

  // ----------------------------------------------------------------- Napoleon
  {
    article: 'Napoleon', kind: 'documentary', place: 'lead',
    query: 'Napoleon Bonaparte portrait painting',
    webQuery: 'napoleon bonaparte portrait',
    caption: "Napoleon Bonaparte. His recorded height, correctly converted from French units, is entirely average.",
  },
  {
    article: 'Napoleon', kind: 'humour', place: 'end', custom: true,
    query: 'tape measure ruler comparison',
    webQuery: 'napoleon short meme funny',
    generate: 'A tailor measuring a confident, average-height Napoleon-costumed figure with a tape measure next to two different rulers labelled in French and English units, comic illustration, museum diagram style',
    caption: "Illustration. The myth of his short stature traces to British cartoonists converting French pieds and pouces using English feet and inches.",
  },

  // ------------------------------------------------------- Great Fire of London
  {
    article: 'Great Fire of London', kind: 'documentary', place: 'lead',
    query: 'Great Fire of London 1666 painting',
    webQuery: 'great fire of london 1666 painting',
    caption: "A depiction of the Great Fire of London, September 1666. It destroyed most of the medieval city and is recorded as killing very few of its inhabitants.",
  },
  {
    article: 'Great Fire of London', kind: 'humour', place: 'end', custom: true,
    query: 'bakery oven fire cartoon',
    webQuery: 'great fire of london meme funny',
    generate: 'A worried 17th-century baker in an apron staring at a small oven fire while flames spread comically out the bakery window behind him, woodcut illustration style, dramatic',
    caption: "Illustration. Thomas Farriner's bakery on Pudding Lane is where the fire started; the innocent Frenchman later hanged for arson had not yet arrived in London when it did.",
  },

  // ---------------------------------------------------------------- Velcro
  {
    article: 'Velcro', kind: 'documentary', place: 'lead',
    query: 'burdock burr hook macro photograph',
    webQuery: 'velcro hook and loop macro photograph',
    caption: "Hook-and-loop fastener under magnification. The hooks are a direct copy of the burdock burr that inspired it.",
  },
  {
    article: 'Velcro', kind: 'humour', place: 'end', custom: true,
    query: 'dog covered in burrs',
    webQuery: 'velcro dog burrs meme funny',
    generate: 'A cheerful dog completely covered in burrs after a walk, standing next to a thoughtful engineer holding a magnifying glass, cartoon illustration, warm colours',
    caption: "Illustration. George de Mestral's idea came directly from picking burrs out of his dog's fur after a walk in the Alps.",
  },

  // -------------------------------------------------------------- Coca-Cola
  {
    article: 'Coca-Cola', kind: 'documentary', place: 'lead',
    query: 'Coca-Cola bottle vintage photograph',
    webQuery: 'coca cola vintage advertisement photograph',
    caption: "An early Coca-Cola bottle. The original 1886 recipe used coca leaf extract; the cocaine alkaloid was gone from the formula by around 1903.",
  },
  {
    article: 'Coca-Cola', kind: 'humour', place: 'end', custom: true,
    query: 'bank vault secret document',
    webQuery: 'coca cola secret formula vault meme funny',
    generate: 'A dramatic bank vault door slowly opening to reveal a single ordinary index card on a pedestal, spotlight, museum exhibit style, slightly comic',
    caption: "Staged. The company's actual vault holding the formula is a public tourist attraction in Atlanta.",
  },

  // -------------------------------------------------------------- Mount Everest
  {
    article: 'Mount Everest', kind: 'documentary', place: 'lead',
    query: 'Mount Everest summit photograph',
    webQuery: 'everest summit photograph',
    diptych: 'everest climbers queue line photograph 2019',
    caption: "Left: Mount Everest. Right: the queue below the summit in May 2019, at an altitude where the air holds about a third of the oxygen it does at sea level.",
  },
  {
    article: 'Mount Everest', kind: 'humour', place: 'end', custom: true,
    query: 'mountain climbers queue line cartoon',
    webQuery: 'everest traffic jam meme funny',
    generate: 'A long orderly line of mountaineers in full expedition gear queueing patiently on a narrow snowy ridge, one checking a wristwatch impatiently, cartoon illustration',
    caption: "Illustration. In May 2019, climbers reported waits of one to two hours in the 'death zone' above 8,000 metres.",
  },

  // ------------------------------------------------------------- Computer bug
  {
    article: 'Computer bug', kind: 'documentary', place: 'lead',
    query: 'Harvard Mark II relay computer photograph',
    webQuery: 'first computer bug moth logbook photograph',
    caption: "The Harvard Mark II logbook page, moth taped in as evidence, now held by the Smithsonian.",
  },
  {
    article: 'Computer bug', kind: 'humour', place: 'end', custom: true,
    query: 'moth taped notebook page',
    webQuery: 'computer bug moth meme funny',
    generate: 'A large friendly moth wearing tiny reading glasses sitting proudly next to an old vacuum-tube computer relay panel, cartoon illustration, warm lighting',
    caption: "Illustration of the actual specimen taped into the Mark II logbook on 9 September 1947, with the annotation \"first actual case of bug being found.\"",
  },

  // ---------------------------------------------------------------- ARPANET
  {
    article: 'ARPANET', kind: 'documentary', place: 'lead',
    query: 'ARPANET IMP interface message processor photograph',
    webQuery: 'arpanet first computer network photograph 1969',
    caption: "An Interface Message Processor, the hardware that carried the first ARPANET transmission between UCLA and Stanford Research Institute in 1969.",
  },
  {
    article: 'ARPANET', kind: 'humour', place: 'end', custom: true,
    query: 'computer terminal crash screen',
    webQuery: 'arpanet first message meme funny',
    generate: 'A 1969-style computer terminal displaying only the letters "L" and "O" on screen before a crash, an engineer on a rotary phone looking exasperated nearby, retro illustration',
    caption: "Illustration. The first message sent over the ARPANET was meant to be \"LOGIN\"; the system crashed after two letters.",
  },

  // -------------------------------------------------------------- Sliced bread
  {
    article: 'Sliced bread', kind: 'documentary', place: 'lead',
    query: 'bread slicing machine vintage bakery',
    webQuery: 'sliced bread vintage bakery photograph 1928',
    caption: "A bread-slicing machine of the kind Otto Rohwedder spent over a decade perfecting.",
  },
  {
    article: 'Sliced bread', kind: 'humour', place: 'end', custom: true,
    query: 'wartime ration poster bread',
    webQuery: 'sliced bread ban 1943 meme funny',
    generate: 'A stern 1940s-style government poster illustration warning citizens against sliced bread, propaganda poster aesthetic, bold red text banner left blank for a caption',
    caption: "Illustration. The United States government really did ban sliced bread for eight weeks in 1943, then admitted it hadn't saved anything.",
  },

  // ---------------------------------------------------------- Great Molasses Flood
  {
    article: 'Great Molasses Flood', kind: 'documentary', place: 'lead',
    query: 'Boston molasses flood 1919 wreckage photograph',
    webQuery: 'boston molasses flood 1919 photograph',
    caption: "Wreckage in Boston's North End after the January 1919 molasses tank collapse.",
  },
  {
    article: 'Great Molasses Flood', kind: 'humour', place: 'end', custom: true,
    query: 'giant wave illustration brown',
    webQuery: 'molasses flood meme funny',
    generate: 'A giant slow-motion wave of thick brown molasses rolling down a 1919 Boston street past horse carts and startled pedestrians, sepia illustration, dramatic but slightly comic',
    caption: "Illustration. The wave was later estimated to have moved at up to 35 mph, fast enough that several victims could not outrun it.",
  },

  // --------------------------------------------------------------------- QWERTY
  {
    article: 'QWERTY', kind: 'documentary', place: 'lead',
    query: 'QWERTY typewriter keyboard vintage photograph',
    webQuery: 'antique typewriter keyboard photograph',
    caption: "An early QWERTY typewriter keyboard. The layout was shaped by mechanical and telegraph-operator needs, not a plot to slow typists down.",
  },
  {
    article: 'QWERTY', kind: 'humour', place: 'end', custom: true,
    query: 'typewriter jammed keys closeup',
    webQuery: 'qwerty keyboard meme funny',
    generate: 'A close-up illustration of old typewriter typebars jammed together mid-strike, dramatic lighting, mechanical detail, slightly comic tangle',
    caption: "Illustration. The popular story that QWERTY was designed to cause this is not well supported by the patent record.",
  },

  // ----------------------------------------------------------------- Cadaver Synod
  {
    article: 'Cadaver Synod', kind: 'documentary', place: 'lead',
    query: 'medieval papal court illustration painting',
    webQuery: 'cadaver synod pope formosus painting',
    caption: "A depiction of the Cadaver Synod of January 897, at which the exhumed body of Pope Formosus was put on trial.",
  },
  {
    article: 'Cadaver Synod', kind: 'humour', place: 'end', custom: true,
    query: 'medieval courtroom illustration',
    webQuery: 'cadaver synod meme funny',
    generate: 'A medieval illuminated-manuscript style illustration of a solemn church court, robed officials gesturing at an empty ornate throne, dramatic candlelight, historical illustration style',
    caption: "Illustration in the medieval style. A deacon was assigned to answer the charges on the corpse's behalf.",
  },

  // ---------------------------------------------------------------------- Tetris
  {
    article: 'Tetris', kind: 'documentary', place: 'lead',
    query: 'Tetris arcade cabinet Game Boy photograph',
    webQuery: 'tetris game boy 1989 photograph',
    caption: "Tetris on the Nintendo Game Boy. Alexey Pajitnov received no royalties from any version of it until 1996.",
  },
  {
    article: 'Tetris', kind: 'humour', place: 'end', custom: true,
    query: 'falling blocks puzzle illustration',
    webQuery: 'tetris meme funny',
    generate: 'A stack of colourful falling tetromino blocks forming a chaotic pile against a Cold War-era Moscow skyline silhouette, retro poster illustration, red and grey palette',
    caption: "Illustration. The rights to Tetris legally belonged to the Soviet state, not to the man who invented it, for over a decade.",
  },

  // ----------------------------------------------------------- Dancing plague of 1518
  {
    article: 'Dancing plague of 1518', kind: 'documentary', place: 'lead',
    query: 'Strasbourg medieval town square painting',
    webQuery: 'dancing plague 1518 strasbourg painting',
    caption: "Strasbourg, where roughly 400 people were recorded dancing, apparently involuntarily, over about a month in 1518.",
  },
  {
    article: 'Dancing plague of 1518', kind: 'humour', place: 'end', custom: true,
    query: 'medieval musicians stage illustration',
    webQuery: 'dancing plague meme funny',
    generate: 'A wooden stage in a medieval town square with hired musicians playing while exhausted-looking townspeople dance uncontrollably around them, illustration in a period woodcut style',
    caption: "Illustration. The city council's official response was to hire musicians and build a stage, which historians think made things worse.",
  },

  // ------------------------------------------------------- Corned beef sandwich incident
  {
    article: 'Corned beef sandwich incident', kind: 'documentary', place: 'lead',
    query: 'Gemini 3 spacecraft astronauts photograph',
    webQuery: 'gemini 3 astronauts 1965 photograph',
    caption: "The Gemini 3 crew, John Young and Gus Grissom. Young smuggled a delicatessen sandwich aboard in his spacesuit pocket.",
  },
  {
    article: 'Corned beef sandwich incident', kind: 'humour', place: 'end', custom: true,
    query: 'sandwich floating space illustration',
    webQuery: 'space sandwich meme funny',
    generate: 'A corned beef sandwich floating in the cabin of a 1960s spacecraft, crumbs drifting weightlessly, an astronaut in the background looking alarmed, retro NASA illustration style',
    caption: "Illustration. Crumbs in zero gravity were a genuine engineering concern, which is why this reached a Congressional hearing.",
  },

  // ---------------------------------------------------------------------- Bubble wrap
  {
    article: 'Bubble wrap', kind: 'documentary', place: 'lead',
    query: 'bubble wrap sheet macro photograph',
    webQuery: 'bubble wrap close up photograph',
    caption: "Bubble wrap. Invented in 1957 as a wallpaper, and rejected as one.",
  },
  {
    article: 'Bubble wrap', kind: 'humour', place: 'end', custom: true,
    query: 'person popping bubble wrap illustration',
    webQuery: 'bubble wrap popping meme funny',
    generate: 'A delighted person popping a huge sheet of bubble wrap with both hands, exaggerated joyful expression, bright colourful cartoon illustration style',
    caption: "Illustration. Sealed Air never designed a market for this; it happened entirely on its own and became free advertising.",
  },

  // ------------------------------------------------------------- Instant noodles
  {
    article: 'Instant noodles', kind: 'documentary', place: 'lead',
    query: 'instant ramen noodles package photograph',
    webQuery: 'instant noodles cup noodles vintage photograph',
    caption: "Instant noodles. Momofuku Ando developed them in a backyard shed after losing his fortune twice.",
  },
  {
    article: 'Instant noodles', kind: 'humour', place: 'end', custom: true,
    query: 'trophy podium illustration',
    webQuery: 'instant noodles meme funny',
    generate: 'A steaming cup of instant noodles standing triumphantly on a first-place podium, tiny gold medal around the cup, karaoke microphone and a Walkman relegated to second and third place beside it, playful illustration',
    caption: "Illustration. A 2000 Japanese poll ranked instant noodles the invention people were most proud of, ahead of karaoke and the Walkman.",
  },

  // -------------------------------------------------------- Antikythera mechanism
  {
    article: 'Antikythera mechanism', kind: 'documentary', place: 'lead',
    query: 'Antikythera mechanism fragment photograph museum',
    webQuery: 'antikythera mechanism artifact photograph',
    caption: "A fragment of the Antikythera mechanism, a geared astronomical calculator built around the 2nd century BC.",
  },
  {
    article: 'Antikythera mechanism', kind: 'humour', place: 'end', custom: true,
    query: 'ancient gears illustration mysterious',
    webQuery: 'antikythera mechanism meme funny',
    generate: 'An ancient Greek craftsman squinting suspiciously at a small bronze geared device on his workbench as if it is far too advanced for his own century, illustration in a classical vase-painting style',
    caption: "Illustration. Nothing of comparable mechanical complexity is known to survive from the following 1,000-plus years.",
  },

  // ------------------------------------------------------------ Guinness World Records
  {
    article: 'Guinness World Records', kind: 'documentary', place: 'lead',
    query: 'Guinness World Records book cover photograph',
    webQuery: 'guinness book of records vintage photograph',
    caption: "An early edition of the book commissioned to settle an argument about which bird flies fastest.",
  },
  {
    article: 'Guinness World Records', kind: 'humour', place: 'end', custom: true,
    query: 'pub argument illustration',
    webQuery: 'guinness world records meme funny',
    generate: 'Two determined men in a 1950s pub arguing loudly and gesturing at a bird flying past the window, pints of beer on the table, illustration in a warm vintage advertising style',
    caption: "Illustration of the argument that started it: golden plover versus red grouse, Ireland, 1951.",
  },

  // ---------------------------------------------------------------- Domesday Book
  {
    article: 'Domesday Book', kind: 'documentary', place: 'lead',
    query: 'Domesday Book manuscript photograph National Archives',
    webQuery: 'domesday book manuscript photograph',
    caption: "A page of the Domesday Book, William the Conqueror's 1086 survey of England.",
  },
  {
    article: 'Domesday Book', kind: 'humour', place: 'end', custom: true,
    query: 'medieval scribe writing illustration',
    webQuery: 'domesday book meme funny',
    generate: 'An exhausted medieval scribe surrounded by towering stacks of parchment, quill in hand, a stern Norman official checking a pocket watch behind him, illuminated-manuscript style illustration',
    caption: "Illustration. The survey covered most of England in under a year, using eleventh-century travel and record-keeping.",
  },

  // ---------------------------------------------------------------- Silly Putty
  {
    article: 'Silly Putty', kind: 'documentary', place: 'lead',
    query: 'Silly Putty egg toy photograph',
    webQuery: 'silly putty toy photograph',
    caption: "Silly Putty in its plastic egg. Invented as a failed rubber substitute during a wartime shortage.",
  },
  {
    article: 'Silly Putty', kind: 'humour', place: 'end', custom: true,
    query: 'astronaut floating toy illustration',
    webQuery: 'silly putty space meme funny',
    generate: 'An Apollo-era astronaut in a spacecraft cabin using a blob of putty to stick a floating tool to a control panel, retro NASA illustration style',
    caption: "Illustration. NASA really did fly Silly Putty on Apollo 8, to hold tools in place in zero gravity.",
  },

  // ------------------------------------------------------------------ Codex Gigas
  {
    article: 'Codex Gigas', kind: 'documentary', place: 'lead',
    query: 'Codex Gigas manuscript photograph devil bible',
    webQuery: 'codex gigas devil bible photograph',
    caption: "The Codex Gigas, the largest surviving medieval manuscript, at roughly 75 kilograms.",
  },
  {
    article: 'Codex Gigas', kind: 'humour', place: 'end', custom: true,
    query: 'monk writing candlelight illustration',
    webQuery: 'codex gigas meme funny',
    generate: 'A medieval monk hunched over an enormous book writing frantically by candlelight through the night, a shadowy figure looming just out of focus behind him, dramatic illuminated-manuscript style illustration',
    caption: "Illustration of the legend, clearly labelled as legend: no contemporary source supports the one-night, sold-his-soul story.",
  },

  // ------------------------------------------------------------------- Post-it Note
  {
    article: 'Post-it Note', kind: 'documentary', place: 'lead',
    query: 'Post-it notes pad photograph office',
    webQuery: 'post it notes photograph',
    caption: "Post-it Notes, built from an adhesive its own inventor considered a failure.",
  },
  {
    article: 'Post-it Note', kind: 'humour', place: 'end', custom: true,
    query: 'hymnal bookmark falling out illustration',
    webQuery: 'post it note meme funny',
    generate: 'A frustrated church choir member fumbling as paper bookmarks fall out of a hymnal mid-song, sheet music scattering, warm illustration style',
    caption: "Illustration of the actual origin: a colleague's hymnal bookmarks kept falling out, which is where the idea came from.",
  },

  // ---------------------------------------------------------------------- Chewing gum
  {
    article: 'Chewing gum', kind: 'documentary', place: 'lead',
    query: 'chicle sapodilla tree gum photograph',
    webQuery: 'vintage chewing gum advertisement photograph',
    caption: "An early chewing-gum advertisement. The raw chicle came to the US by way of an exiled Mexican general.",
  },
  {
    article: 'Chewing gum', kind: 'humour', place: 'end', custom: true,
    query: 'failed rubber tire illustration',
    webQuery: 'chewing gum meme funny',
    generate: 'A 19th-century inventor staring in defeat at a pile of failed rubber tyre prototypes made of a strange gummy substance, then having a sudden idea while glancing at a jar of the same material, comic strip illustration style',
    caption: "Illustration. Thomas Adams was trying to turn chicle into rubber tyres; it never worked, so he sold it as gum instead.",
  },

  // ------------------------------------------------------------------ Tunguska event
  {
    article: 'Tunguska event', kind: 'documentary', place: 'lead',
    query: 'Tunguska flattened forest photograph 1927 expedition',
    webQuery: 'tunguska event flattened trees photograph',
    caption: "Trees flattened by the 1908 Tunguska explosion, photographed by Leonid Kulik's 1927 expedition, the first to reach the site.",
  },
  {
    article: 'Tunguska event', kind: 'humour', place: 'end', custom: true,
    query: 'siberian forest explosion illustration',
    webQuery: 'tunguska event meme funny',
    generate: 'A vast Siberian forest with trees flattened outward in a radial starburst pattern from a bright empty sky, no crater, dramatic wide illustration, warm morning light',
    caption: "Illustration. No crater was ever found, because the explosion happened several kilometres above the ground.",
  },

  // -------------------------------------------------------------------- Piltdown Man
  {
    article: 'Piltdown Man', kind: 'documentary', place: 'lead',
    query: 'Piltdown Man skull reconstruction photograph museum',
    webQuery: 'piltdown man skull photograph',
    caption: "A reconstruction of the Piltdown skull, accepted as a genuine human ancestor for over 40 years before being exposed as a fraud.",
  },
  {
    article: 'Piltdown Man', kind: 'humour', place: 'end', custom: true,
    query: 'orangutan jaw filing illustration',
    webQuery: 'piltdown man meme funny',
    generate: 'A shadowy figure in an early-1900s study filing down an orangutan jawbone with a small tool by lamplight, magnifying glass and staining chemicals on the desk, mystery illustration style',
    caption: "Illustration. Whoever filed and stained the jawbone to fake it has never been identified with certainty.",
  },

  // --------------------------------------------------------------- Operation Mincemeat
  {
    article: 'Operation Mincemeat', kind: 'documentary', place: 'lead',
    query: 'World War Two submarine crew photograph 1943',
    webQuery: 'operation mincemeat world war two photograph',
    caption: "A British submarine crew of the kind that carried out Operation Mincemeat in April 1943.",
  },
  {
    article: 'Operation Mincemeat', kind: 'humour', place: 'end', custom: true,
    query: 'briefcase washing ashore illustration',
    webQuery: 'operation mincemeat meme funny',
    generate: 'An attache case chained to a uniformed figure washing up on a Spanish beach at dawn, a fisherman approaching cautiously, dramatic wartime illustration style',
    caption: "Illustration. The fabricated documents inside convinced Hitler to divert forces away from the real invasion target.",
  },

  // ---------------------------------------------------------- War of the Worlds panic
  {
    article: 'War of the Worlds panic', kind: 'documentary', place: 'lead',
    query: 'Orson Welles radio broadcast 1938 photograph',
    webQuery: 'orson welles war of the worlds broadcast photograph',
    caption: "Orson Welles broadcasting the Mercury Theatre's 1938 adaptation of The War of the Worlds.",
  },
  {
    article: 'War of the Worlds panic', kind: 'humour', place: 'end', custom: true,
    query: 'newspaper headline panic illustration',
    webQuery: 'war of the worlds panic meme funny',
    generate: 'A stack of dramatic 1938 newspaper front pages with oversized panic headlines, a single unbothered family calmly listening to a radio in the background, satirical illustration contrast',
    caption: "Illustration. The newspaper panic headlines were real; the nationwide scale of the actual panic was not, according to later research.",
  },

  // ---------------------------------------------------------------------- One small step
  {
    article: 'One small step', kind: 'documentary', place: 'lead',
    query: 'Neil Armstrong Apollo 11 moon photograph',
    webQuery: 'neil armstrong apollo 11 moon photograph',
    caption: "Neil Armstrong on the lunar surface, 21 July 1969. His first words remain disputed by exactly one word.",
  },
  {
    article: 'One small step', kind: 'humour', place: 'end', custom: true,
    query: 'radio static waveform illustration',
    webQuery: 'one small step for man meme funny',
    generate: 'A radio waveform display with a single tiny gap highlighted and magnified, a scientist peering at it intently through a magnifying glass, retro technical illustration style',
    caption: "Illustration. A 2006 digital audio analysis claimed to find the missing word 'a' hidden in a compressed gap in the transmission.",
  },

  // ------------------------------------------------------------------- Kellogg's Corn Flakes
  {
    article: "Kellogg's Corn Flakes", kind: 'documentary', place: 'lead',
    query: 'Battle Creek Sanitarium photograph historical',
    webQuery: 'battle creek sanitarium photograph',
    caption: "The Battle Creek Sanitarium, where corn flakes were invented by accident in 1894.",
  },
  {
    article: "Kellogg's Corn Flakes", kind: 'humour', place: 'end', custom: true,
    query: 'two brothers arguing illustration vintage',
    webQuery: 'kellogg brothers meme funny',
    generate: 'Two early-1900s brothers in a factory arguing over a bag of sugar next to a conveyor belt of cereal flakes, one gesturing sternly, comic vintage advertisement illustration style',
    caption: "Illustration of the actual falling-out: one brother wanted sugar added, the other refused, and they never really spoke again.",
  },

  // ------------------------------------------------------------------------ Pompeii graffiti
  {
    article: 'Pompeii graffiti', kind: 'documentary', place: 'lead',
    query: 'Pompeii wall inscription photograph',
    webQuery: 'pompeii graffiti wall photograph',
    caption: "Preserved wall writing in Pompeii, sealed by volcanic ash in 79 AD.",
  },
  {
    article: 'Pompeii graffiti', kind: 'humour', place: 'end', custom: true,
    query: 'ancient roman writing wall illustration',
    webQuery: 'pompeii graffiti meme funny',
    generate: 'An ordinary Roman citizen scratching a complaint into a plaster wall with a stylus, unaware a volcano looms smoking in the far background, dramatic dramatic-irony illustration style',
    caption: "Illustration. Thousands of these casual, unofficial complaints and boasts survived only because the city was buried the same day.",
  },

  // ------------------------------------------------------------------------------ Kudzu
  {
    article: 'Kudzu', kind: 'documentary', place: 'lead',
    query: 'kudzu vine overgrown forest photograph',
    webQuery: 'kudzu vine overgrown photograph',
    caption: "Kudzu overtaking trees in the southeastern United States, decades after the federal government paid farmers to plant it.",
  },
  {
    article: 'Kudzu', kind: 'humour', place: 'end', custom: true,
    query: 'vine covered car abandoned illustration',
    webQuery: 'kudzu meme funny',
    generate: 'An old abandoned car and a small shed almost completely swallowed by thick green vines, only a headlight and a door handle still visible, lush overgrown illustration style',
    caption: "Illustration. Kudzu can grow up to about 30 centimetres in a single day under the right conditions.",
  },

  // ------------------------------------------------------------------------- Cane toad
  {
    article: 'Cane toad', kind: 'documentary', place: 'lead',
    query: 'cane toad Australia photograph',
    webQuery: 'cane toad photograph australia',
    caption: "A cane toad. 102 were released in Queensland in 1935 to control a beetle they cannot physically reach.",
  },
  {
    article: 'Cane toad', kind: 'humour', place: 'end', custom: true,
    query: 'toad army illustration marching',
    webQuery: 'cane toad meme funny',
    generate: 'An enormous horde of cartoon toads marching confidently across the Australian outback under a blazing sun, one lone confused beetle burrowing safely underground far below them, comic illustration style',
    caption: "Illustration. The toads never reached the beetle they were imported for; the beetle lives underground.",
  },

  // -------------------------------------------------------------------- Sourdough starter
  {
    article: 'Sourdough starter', kind: 'documentary', place: 'lead',
    query: 'sourdough starter jar bubbling photograph',
    webQuery: 'sourdough starter photograph',
    caption: "A sourdough starter. Continuously fed cultures like this are claimed by some bakeries to be over a century old.",
  },
  {
    article: 'Sourdough starter', kind: 'humour', place: 'end', custom: true,
    query: 'heirloom jar family illustration',
    webQuery: 'sourdough starter meme funny',
    generate: 'An ornate heirloom jar of bubbling starter being solemnly handed down through three generations of a family in a warm kitchen, illustrated like a formal inheritance ceremony, gentle humour',
    caption: "Illustration. What's actually passed down is a self-renewing living culture, not any single original cell.",
  },

  // ------------------------------------------------------------------------ Dead salmon fMRI study
  {
    article: 'Dead salmon fMRI study', kind: 'documentary', place: 'lead',
    query: 'fMRI brain scanner photograph',
    webQuery: 'fmri scanner photograph',
    caption: "An fMRI scanner of the type used to scan a dead Atlantic salmon for a landmark 2009 methodology study.",
  },
  {
    article: 'Dead salmon fMRI study', kind: 'humour', place: 'end', custom: true,
    query: 'fish brain scan illustration',
    webQuery: 'dead salmon fmri meme funny',
    generate: 'A deceased Atlantic salmon lying serenely inside an MRI scanner tube, a brain-activity readout on a nearby monitor showing colourful false signal, deadpan scientific illustration style',
    caption: "Illustration. The salmon was dead the entire time; the 'signal' was the statistical error the study was built to expose.",
  },

  // --------------------------------------------------------------------------- Great Stink of 1858
  {
    article: 'Great Stink of 1858', kind: 'documentary', place: 'lead',
    query: 'Victorian London Thames river photograph engraving',
    webQuery: 'great stink london 1858 illustration',
    caption: "A contemporary depiction of the polluted Thames during the summer of 1858.",
  },
  {
    article: 'Great Stink of 1858', kind: 'humour', place: 'end', custom: true,
    query: 'Victorian gentlemen holding noses illustration',
    webQuery: 'great stink meme funny',
    generate: 'Distinguished Victorian members of Parliament clutching handkerchiefs to their noses in disgust, curtains soaked in lime chloride hanging limply in the windows behind them, satirical period cartoon style',
    caption: "Illustration. Parliament passed funding for London's new sewer system within about eighteen days of the smell reaching them directly.",
  },

  // ------------------------------------------------------------- Pigeon post at the Siege of Paris
  {
    article: 'Pigeon post at the Siege of Paris', kind: 'documentary', place: 'lead',
    query: 'homing pigeon 19th century photograph',
    webQuery: 'siege of paris pigeon post photograph',
    caption: "A homing pigeon of the kind that carried microfilm messages into besieged Paris in 1870-71.",
  },
  {
    article: 'Pigeon post at the Siege of Paris', kind: 'humour', place: 'end', custom: true,
    query: 'microfilm magnifying glass illustration',
    webQuery: 'pigeon post siege paris meme funny',
    generate: 'A 19th-century clerk squinting through a large magnifying glass at a tiny scrap of film held in tweezers, a pigeon perched proudly on the desk nearby, warm sepia illustration style',
    caption: "Illustration. A single pigeon could carry a rolled film containing the text of tens of thousands of messages.",
  },

  // -------------------------------------------------------------------------------- Emperor Norton
  {
    article: 'Emperor Norton', kind: 'documentary', place: 'lead',
    query: 'Emperor Norton San Francisco photograph portrait',
    webQuery: 'emperor norton san francisco photograph',
    caption: "Emperor Norton, in the uniform San Francisco largely humoured him in wearing for over two decades.",
  },
  {
    article: 'Emperor Norton', kind: 'humour', place: 'end', custom: true,
    query: 'street parade crowd illustration vintage',
    webQuery: 'emperor norton meme funny',
    generate: 'A grandly uniformed self-declared emperor strolling down a 19th-century San Francisco street while shopkeepers bow and tip their hats respectfully, warm vintage illustration style',
    caption: "Illustration. His funeral reportedly drew a crowd in the tens of thousands, for a man who held no real office at all.",
  },

  // ------------------------------------------------------------------------------- First trans-Atlantic row
  {
    article: 'First trans-Atlantic row', kind: 'documentary', place: 'lead',
    query: 'small wooden rowboat ocean photograph vintage',
    webQuery: 'trans atlantic rowboat 1896 photograph',
    caption: "A small open rowboat of the kind Harbo and Samuelsen rowed across the Atlantic in 1896.",
  },
  {
    article: 'First trans-Atlantic row', kind: 'humour', place: 'end', custom: true,
    query: 'tiny boat vast ocean illustration',
    webQuery: 'transatlantic row meme funny',
    generate: 'A tiny open wooden rowboat with two determined rowers, dwarfed by a vast stormy ocean, only a compass and sextant visible aboard, dramatic maritime illustration style',
    caption: "Illustration. Their route and time stood as the record for over a century, unbeaten until 2010.",
  },

  // ------------------------------------------------------------------------------------- The Toynbee tiles
  {
    article: 'The Toynbee tiles', kind: 'documentary', place: 'lead',
    query: 'Toynbee tile street photograph asphalt',
    webQuery: 'toynbee tile photograph street',
    caption: "A Toynbee tile embedded in a road surface. Their creator has never been definitively identified.",
  },
  {
    article: 'The Toynbee tiles', kind: 'humour', place: 'end', custom: true,
    query: 'mysterious figure night street illustration',
    webQuery: 'toynbee tiles meme funny',
    generate: 'A shadowy figure crouched over a hole cut in the floor of a slowly moving car at night, pressing a small tile into the asphalt below through the gap, mysterious noir illustration style',
    caption: "Illustration of the leading theory: nobody has ever actually been caught installing one.",
  },
];
