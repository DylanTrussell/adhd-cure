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

  // ---------------------------------------------------------- Pitch drop experiment
  {
    article: 'Pitch drop experiment', kind: 'documentary', place: 'lead',
    query: 'University of Queensland pitch drop experiment funnel',
    webQuery: 'pitch drop experiment Queensland photograph',
    caption: "The University of Queensland pitch drop experiment. The pitch was poured in 1927. The ninth drop fell in 2014.",
  },
  {
    article: 'Pitch drop experiment', kind: 'humour', place: 'end', custom: true,
    query: 'scientist watching empty desk',
    webQuery: 'pitch drop experiment meme funny',
    generate: 'A patient professor in a cardigan sitting in a folding chair staring at a glass funnel of black pitch, calendar pages flying off the wall behind him, warm illustration, no text',
    caption: "Illustration. John Mainstone watched the experiment for 52 years. Five drops fell on his watch. He saw none of them.",
  },

  // ---------------------------------------------------------- Oxford Electric Bell
  {
    article: 'Oxford Electric Bell', kind: 'documentary', place: 'lead',
    query: 'Oxford Electric Bell Clarendon dry pile',
    webQuery: 'Oxford electric bell Clarendon laboratory photograph',
    caption: "The Oxford Electric Bell, bought in 1840 and still ringing. The ringing is practically inaudible.",
  },
  {
    article: 'Oxford Electric Bell', kind: 'humour', place: 'end', custom: true,
    query: 'Victorian scientist battery experiment',
    webQuery: 'oxford electric bell meme funny',
    generate: 'A Victorian gentleman in a frock coat cupping his ear toward a tiny brass bell under a glass dome, hearing nothing, oil-painting illustration, no text',
    caption: "Illustration. The bell has been ringing since 1840 at about two strikes a second. A corridor away, it cannot be heard.",
  },

  // ------------------------------------------------------------ London Beer Flood
  {
    article: 'London Beer Flood', kind: 'documentary', place: 'lead',
    query: 'Meux Horse Shoe Brewery Tottenham Court Road',
    webQuery: 'London beer flood 1814 Horse Shoe brewery',
    diptych: 'Dominion Theatre Tottenham Court Road',
    caption: "Left: the Horse Shoe Brewery, where a vat of porter burst on 17 October 1814. Right: the Dominion Theatre, which stands on the site.",
  },
  {
    article: 'London Beer Flood', kind: 'humour', place: 'end', custom: true,
    query: 'Victorian tax office ledger',
    webQuery: 'London beer flood meme funny',
    generate: 'A Regency clerk in a dim excise office carefully writing a rebate into a leather ledger while a brewery vat looms in a painting behind him, period illustration, no text, not depicting any real victim',
    caption: "Illustration, and not a picture of the flood. Eight people died. The brewery was not held liable, and recovered the excise duty on the beer.",
  },

  // --------------------------------------- Carlill v Carbolic Smoke Ball Company
  {
    article: 'Carlill v Carbolic Smoke Ball Company', kind: 'documentary', place: 'lead',
    query: 'Carbolic Smoke Ball advertisement 1891',
    webQuery: 'carbolic smoke ball company advertisement',
    caption: "The advertisement. It offered £100, and mentioned a £1,000 bank deposit, which is why the Court of Appeal decided the company had meant it.",
  },
  {
    article: 'Carlill v Carbolic Smoke Ball Company', kind: 'humour', place: 'end', custom: true,
    query: 'Victorian judge wig illustration',
    webQuery: 'carbolic smoke ball meme funny',
    generate: 'A Victorian lady in a high-collared dress holding a small rubber ball with a nozzle up to her nose, looking unwell but determined, a folded newspaper advertisement on the table, period illustration, no text',
    caption: "Illustration. Using the ball three times a day was, in the judgment, inconvenience enough to count as consideration. Catching influenza was how Mrs Carlill accepted the offer.",
  },

  // ----------------------------------------------------------------- Jaffa Cakes
  {
    article: 'Jaffa Cakes', kind: 'documentary', place: 'lead',
    query: 'Jaffa Cakes packet McVitie',
    webQuery: 'Jaffa Cakes packet photograph',
    caption: "Jaffa Cakes. A 1991 VAT tribunal held they were cakes, in part because they go hard when they go stale.",
  },
  {
    article: 'Jaffa Cakes', kind: 'humour', place: 'end', custom: true,
    query: 'stale cake biscuit courtroom',
    webQuery: 'jaffa cakes VAT meme funny',
    generate: 'A small sponge cake with a dark chocolate top and a dot of orange sitting on a courtroom evidence table beside a gavel, documentary still-life photograph style, no text, no logos',
    caption: "A staged still life, not an exhibit from the hearing. The actual test was culinary: cakes harden with age, biscuits soften, and a Jaffa Cake hardens.",
  },

  // -------------------------------------------------------------------- Pig War
  {
    article: 'Pig War', kind: 'documentary', place: 'lead',
    query: 'English Camp San Juan Island Royal Marines',
    webQuery: 'San Juan Island Pig War English Camp photograph',
    diptych: 'American Camp San Juan Island officers quarters',
    caption: "Left: English Camp, San Juan Island. Right: American Camp. The two garrisons occupied opposite ends of the island for twelve years. The dispute had begun with a pig.",
  },
  {
    article: 'Pig War', kind: 'humour', place: 'end', custom: true,
    query: 'pig in a vegetable garden',
    webQuery: 'pig war san juan meme funny',
    generate: 'A large pig standing in a nineteenth-century potato patch with two tiny rival flags planted at opposite ends of the garden, gentle storybook illustration, no text',
    caption: "Illustration. The pig was real, and it was the only casualty. The flags, the camps and the German emperor came afterwards.",
  },

  // ----------------------------------------------------------------------- Vasa
  {
    article: 'Vasa', kind: 'documentary', place: 'lead',
    query: 'Vasa warship museum Stockholm hull',
    webQuery: 'Vasa ship museum photograph',
    caption: "Vasa, in the museum that now holds her. On 10 August 1628 she sailed 1,300 metres and sank.",
  },
  {
    article: 'Vasa', kind: 'humour', place: 'end', custom: true,
    query: 'sailors running across deck illustration',
    webQuery: 'Vasa ship meme funny',
    generate: 'Thirty seventeenth-century sailors running from one side of a decorated warship deck to the other while an admiral on the quay waves both arms for them to stop, historical illustration, no text',
    caption: "Illustration of the stability test at the quay. The admiral stopped it, afraid the ship would sink where she was moored, and then ordered her to sail.",
  },

  // ---------------------------------------------------- Discovery of Richard III
  {
    article: 'Discovery of Richard III', kind: 'documentary', place: 'lead',
    query: 'Greyfriars Leicester Richard III excavation skeleton',
    webQuery: 'Richard III Leicester car park excavation photograph',
    caption: "The Greyfriars excavation in Leicester, 2012, on the site of a car park. The skeleton in the choir of the lost church was Richard III.",
  },
  {
    article: 'Discovery of Richard III', kind: 'humour', place: 'end', custom: true,
    query: 'archaeologist trowel asphalt',
    webQuery: 'richard iii car park meme funny',
    generate: 'An archaeologist kneeling with a trowel at the edge of a marked parking bay, a yellow painted parking line running past an open trench, documentary photograph style, no text, no identifiable living person',
    caption: "Illustration. The trench was real, and it was in a car park. The parking line in this picture is staged.",
  },

  // --------------------------------------------------------------- Gimli Glider
  {
    article: 'Gimli Glider', kind: 'documentary', place: 'lead',
    query: 'Air Canada Boeing 767 Gimli Glider C-GAUN',
    webQuery: 'Gimli Glider Air Canada 767 photograph',
    caption: "The Boeing 767 that became the Gimli Glider, after the 23 July 1983 landing. Both tanks were dry.",
  },
  {
    article: 'Gimli Glider', kind: 'humour', place: 'end', custom: true,
    query: 'drag racing strip runway',
    webQuery: 'gimli glider meme funny',
    generate: 'A large airliner stopped at the end of a runway that has been painted as a drag strip, tents and a timing tower in the distance, daylight, documentary style, no airline logos, no text',
    caption: "Illustration. The drag strip was real: the far end of the disused runway at Gimli was being used for racing, and the aircraft stopped short of the campers.",
  },

  // -------------------------------------------------------- Mars Climate Orbiter
  {
    article: 'Mars Climate Orbiter', kind: 'documentary', place: 'lead',
    query: 'Mars Climate Orbiter spacecraft NASA',
    webQuery: 'Mars Climate Orbiter NASA photograph',
    caption: "Mars Climate Orbiter, launched 11 December 1998 and lost on arrival at Mars on 23 September 1999.",
  },
  {
    article: 'Mars Climate Orbiter', kind: 'humour', place: 'end', custom: true,
    query: 'metric imperial ruler conversion',
    webQuery: 'mars climate orbiter metric meme funny',
    generate: 'Two engineers holding a ruler, one end marked in pounds and the other in newtons, looking at a tiny spacecraft model between them, clean technical illustration, no text',
    caption: "Illustration. The mismatch was 4.45, the number of newtons in a pound-force. The spacecraft's own software was in metric and was right.",
  },

  // ---------------------------------------------------------- Leonard v. Pepsico
  {
    article: 'Leonard v. Pepsico', kind: 'documentary', place: 'lead',
    query: 'Harrier jump jet AV-8B landing',
    webQuery: 'AV-8B Harrier jet photograph',
    caption: "An AV-8B Harrier. The commercial offered one for 7,000,000 Pepsi Points. The catalogue did not.",
  },
  {
    article: 'Leonard v. Pepsico', kind: 'humour', place: 'end', custom: true,
    query: 'teenager school bus cartoon',
    webQuery: 'pepsi harrier jet commercial meme funny',
    generate: 'A teenager in sunglasses holding a soda, standing beside a bicycle rack, looking pleased, with the shadow of a jump jet on the school wall behind him, 1990s commercial illustration style, no logos, no text',
    caption: "Illustration of the commercial Judge Wood described shot by shot. Her finding was that no reasonable person would take it as an offer of a fighter plane.",
  },

  // ----------------------------------------------------------------- Coelacanth
  {
    article: 'Coelacanth', kind: 'documentary', place: 'lead',
    query: 'Latimeria chalumnae coelacanth specimen',
    webQuery: 'coelacanth Latimeria museum specimen photograph',
    caption: "A coelacanth. The 1938 specimen had already been mounted by a taxidermist before the ichthyologist arrived.",
  },
  {
    article: 'Coelacanth', kind: 'humour', place: 'end', custom: true,
    query: 'taxidermist fish mount workshop',
    webQuery: 'coelacanth meme funny',
    generate: 'A 1930s taxidermist in a small workshop stuffing a large strange fish while a letter sits unopened on the table, period illustration, no text',
    caption: "Illustration. J. L. B. Smith wrote that the body had been disposed of beyond any hope of redemption, and the fish mounted, before his letter arrived.",
  },

  // ---------------------------------------------------------------- Clever Hans
  {
    article: 'Clever Hans', kind: 'documentary', place: 'lead',
    query: 'Clever Hans horse von Osten Berlin',
    webQuery: 'Clever Hans horse photograph 1904',
    caption: "Clever Hans with Wilhelm von Osten. The horse tapped out answers for as long as the questioner knew them.",
  },
  {
    article: 'Clever Hans', kind: 'humour', place: 'end', custom: true,
    query: 'horse watching a person lean',
    webQuery: 'clever hans horse meme funny',
    generate: 'A horse watching a man in a 1904 suit who is leaning forward very slightly, the horse mid-hoof-tap, quiet Berlin courtyard, documentary-style illustration, no text',
    caption: "Illustration of the cue Oskar Pfungst measured. When the questioner did not know the answer, the horse's arithmetic fell to chance.",
  },

  // ------------------------------------------------------------ Carrington Event
  {
    article: 'Carrington Event', kind: 'documentary', place: 'lead',
    query: 'sunspot drawing Richard Carrington 1859',
    webQuery: 'Carrington solar flare 1859 drawing',
    caption: "Carrington's drawing of the sunspot group of 1 September 1859, with the two patches of white light he watched for about five minutes.",
  },
  {
    article: 'Carrington Event', kind: 'humour', place: 'end', custom: true,
    query: '19th century telegraph operator',
    webQuery: 'carrington event telegraph meme funny',
    generate: 'Two 1850s telegraph operators, batteries disconnected and set aside, sending messages while a red aurora glows outside the office window, period illustration, no text',
    caption: "Illustration. On the Boston to Portland line the operators worked for about two hours on the auroral current alone, and reported that it was better than their batteries.",
  },

  // ----------------------------------------------------------------- Wow! signal
  {
    article: 'Wow! signal', kind: 'documentary', place: 'lead',
    query: 'Big Ear radio telescope Ohio State',
    webQuery: 'Ohio State Big Ear telescope photograph',
    caption: "The Big Ear radio telescope at Ohio State, which recorded the signal on 15 August 1977.",
  },
  {
    article: 'Wow! signal', kind: 'humour', place: 'end', custom: true,
    query: 'computer printout red pen margin',
    webQuery: 'wow signal printout 6EQUJ5 photograph',
    generate: 'A fanfold computer printout with one row of characters circled in red ink and a single handwritten word in the margin, close-up, no other legible text',
    caption: "Illustration of the annotation, not the original printout. Jerry Ehman wrote Wow! in red pen beside 6EQUJ5. The signal was not recorded again.",
  },

  // ------------------------------------------------------ Tacoma Narrows Bridge
  {
    article: 'Tacoma Narrows Bridge', kind: 'documentary', place: 'lead',
    query: 'Tacoma Narrows Bridge collapse 1940 photograph',
    webQuery: 'Galloping Gertie Tacoma Narrows collapse photograph',
    caption: "The 1940 Tacoma Narrows Bridge twisting in a wind of about 40 miles per hour, on 7 November 1940, shortly before the span failed.",
  },
  {
    article: 'Tacoma Narrows Bridge', kind: 'humour', place: 'end', custom: true,
    query: 'physics textbook resonance diagram',
    webQuery: 'tacoma narrows resonance textbook meme funny',
    generate: 'An open physics textbook showing a neat sine wave labelled resonance, with a small photograph of a twisting bridge tucked in the margin and a red correction mark beside the caption, illustration, no readable brand names',
    caption: "Illustration. The film of the collapse is real. The vortex-shedding frequency at that wind speed is about 1 hertz, and the twist that destroyed the bridge was 0.2 hertz.",
  },

  // -------------------------------------------------------- Donoghue v Stevenson
  {
    article: 'Donoghue v Stevenson', kind: 'documentary', place: 'lead',
    query: 'ginger beer bottle stone opaque',
    webQuery: 'ginger beer bottle 1930s photograph',
    caption: "A stone ginger-beer bottle of the opaque kind at issue in Donoghue v Stevenson. The snail was never proved, and never disproved.",
  },
  {
    article: 'Donoghue v Stevenson', kind: 'humour', place: 'end', custom: true,
    query: 'snail bottle illustration',
    webQuery: 'donoghue v stevenson snail meme funny',
    generate: 'A courtroom clerk holding an empty opaque stone bottle up to the light, unable to see inside, period illustration, no text',
    caption: "Illustration. The House of Lords decided the case on the assumption that the pursuer's story was true. The trial that would have tested the story never happened.",
  },

  // ------------------------------------------------- Mayo v. Satan and His Staff
  {
    article: 'Mayo v. Satan and His Staff', kind: 'documentary', place: 'lead',
    query: 'United States federal courthouse Pennsylvania',
    webQuery: 'federal courthouse Western District Pennsylvania photograph',
    caption: "A federal courthouse. Gerald Mayo's complaint was given a miscellaneous docket number here, in the Western District of Pennsylvania, and not served.",
  },
  {
    article: 'Mayo v. Satan and His Staff', kind: 'humour', place: 'end', custom: true,
    query: 'blank legal form marshal',
    webQuery: 'mayo v satan meme funny',
    generate: 'A blank process-server form on a clerk desk, the address line empty, a quill beside it, sober illustration, no text, no infernal imagery',
    caption: "Illustration of the missing form. The order denies the fee waiver because the complaint included no instructions telling the marshal how to serve the defendant.",
  },

  // ------------------------------------------------------------ Streisand effect
  {
    article: 'Streisand effect', kind: 'documentary', place: 'lead',
    query: 'California coastline aerial photograph erosion',
    webQuery: 'California coast aerial survey photograph',
    caption: "The California coast, photographed from the air for an erosion survey. One frame of that survey showed a house in Malibu.",
  },
  {
    article: 'Streisand effect', kind: 'humour', place: 'end', custom: true,
    query: 'magnifying glass on a tiny photograph',
    webQuery: 'streisand effect meme funny',
    generate: 'A tiny aerial photograph pinned to a board, and a huge crowd of identical pointing fingers entering from outside the frame, editorial illustration, no likeness of any real person, no text',
    caption: "Illustration. Before the lawsuit the frame had been downloaded six times, two of them by the plaintiff's lawyers.",
  },

  // ----------------------------------------------------------- Naruto v. Slater
  {
    article: 'Naruto v. Slater', kind: 'documentary', place: 'lead',
    query: 'crested macaque Sulawesi Macaca nigra',
    webQuery: 'crested black macaque Sulawesi photograph',
    caption: "A crested macaque. Naruto, a macaque in a reserve on Sulawesi, took photographs with a camera a photographer had left unattended.",
  },
  {
    article: 'Naruto v. Slater', kind: 'humour', place: 'end', custom: true,
    query: 'camera on a tripod in a forest',
    webQuery: 'monkey selfie meme funny',
    generate: 'An unattended camera on a rock in a tropical forest, a crested macaque looking into the lens, documentary style, no text, not a reproduction of the copyrighted selfie',
    caption: "Illustration, and not one of the photographs in the lawsuit. The Ninth Circuit held that the Copyright Act does not let an animal sue.",
  },

  // ------------------------------------------------------------------ Pringles
  {
    article: 'Pringles', kind: 'documentary', place: 'lead',
    query: 'stack of saddle-shaped potato snacks',
    webQuery: 'Pringles stack photograph',
    caption: "Regular Pringles. The Court of Appeal held they were similar to potato crisps and made from the potato, and therefore standard-rated for VAT.",
  },
  {
    article: 'Pringles', kind: 'humour', place: 'end', custom: true,
    query: 'judge looking at a snack',
    webQuery: 'pringles VAT crisp meme funny',
    generate: 'A single saddle-shaped crisp on a courtroom exhibit stand beside a potato, sober still-life illustration, no logos, no text',
    caption: "Illustration. Potato flour was over 40 per cent of the product, which the court held was enough to count as made from the potato.",
  },

  // ---------------------------------------------------------------- Hoover Dam
  {
    article: 'Hoover Dam', kind: 'documentary', place: 'lead',
    query: 'Hoover Dam construction concrete pour 1930s',
    webQuery: 'Hoover Dam construction workers concrete photograph',
    caption: "Pouring Hoover Dam. The blocks rose a few inches at a time, with puddlers standing in the concrete. The Bureau of Reclamation says nobody is buried in it.",
  },
  {
    article: 'Hoover Dam', kind: 'humour', place: 'end', custom: true,
    query: 'concrete block construction workers',
    webQuery: 'hoover dam bodies buried myth meme',
    generate: 'Six workers standing in a shallow layer of wet concrete inside a wooden form, the concrete only inches deep, documentary illustration of a 1930s pour, no text',
    caption: "Illustration of the pour the Bureau describes. A bucket raised the level by two to six inches. That is not enough concrete to hide a person from the people standing in it.",
  },

  // ------------------------------------------------ A Severe Strain on Credulity
  {
    article: 'A Severe Strain on Credulity', kind: 'documentary', place: 'lead',
    query: 'Robert Goddard rocket test 1926',
    webQuery: 'Robert H Goddard rocket photograph',
    caption: "Robert Goddard with one of his rockets. In 1920 the New York Times said he seemed to lack the physics taught in high school.",
  },
  {
    article: 'A Severe Strain on Credulity', kind: 'humour', place: 'end', custom: true,
    query: 'newspaper correction notice',
    webQuery: 'new york times goddard correction meme funny',
    generate: 'A 1969 newspaper page with a short correction notice set in small type, a Moon photograph on the opposite page, editorial illustration, no readable masthead, no real newspaper logo',
    caption: "Illustration. The real correction ran on 17 July 1969, quoted the 1920 sneer, cited Newton, and said the Times regretted the error.",
  },

  // ------------------------------------------------------------ Pierson v. Post
  {
    article: 'Pierson v. Post', kind: 'documentary', place: 'lead',
    query: 'red fox Vulpes vulpes',
    webQuery: 'red fox running photograph',
    caption: "A red fox. In 1805 the New York Supreme Court decided who owned one, and held that chasing it was not enough.",
  },
  {
    article: 'Pierson v. Post', kind: 'humour', place: 'end', custom: true,
    query: 'fox hunt hounds beach',
    webQuery: 'pierson v post fox meme funny',
    generate: 'A fox on an empty beach with two distant figures, one with hounds and one stepping in, early-1800s illustration style, no text',
    caption: "Illustration. Post had the hounds. Pierson had the fox. The court, citing Roman law, gave it to Pierson.",
  },
];
