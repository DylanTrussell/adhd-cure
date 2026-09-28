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
 * the contact sheet, by URL or from your own machine. `generatedFile` is a
 * humour illustration already drawn for the article (under seed/); the picker
 * offers it ahead of a web search. It is an illustration, never a document.
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
    generatedFile: 'humour/pitch-drop-humour.png',
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
    generatedFile: 'humour/oxford-bell-humour.png',
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

  // ----------------------------------------------------------- Greenland shark
  {
    article: 'Greenland shark', kind: 'documentary', place: 'lead',
    query: 'Somniosus microcephalus Greenland shark',
    webQuery: 'Greenland shark photograph',
    caption: "A Greenland shark. Radiocarbon in the eye-lens nuclei of 28 females put the largest, at 502 cm, at about 392 years, plus or minus 120.",
  },
  {
    article: 'Greenland shark', kind: 'humour', place: 'end', custom: true,
    query: 'shark eye close up',
    webQuery: 'greenland shark old meme funny',
    generate: 'A close illustration of a shark eye in cross-section, the lens nucleus marked as a small dark core, scientific plate style, no text',
    caption: "Illustration. The nucleus of the lens is laid down early and does not turn over, which is why the carbon in it dates the birth and not last Tuesday.",
  },

  // ------------------------------------------------------ Turritopsis nutricula
  {
    article: 'Turritopsis nutricula', kind: 'documentary', place: 'lead',
    query: 'Turritopsis jellyfish hydrozoan medusa',
    webQuery: 'Turritopsis dohrnii jellyfish photograph',
    caption: "A Turritopsis medusa. In 1996 a colony in a laboratory tank reverted from medusa to polyp and grew a new colony.",
  },
  {
    article: 'Turritopsis nutricula', kind: 'humour', place: 'end', custom: true,
    query: 'jellyfish life cycle diagram',
    webQuery: 'immortal jellyfish life cycle backwards meme',
    generate: 'A simple scientific diagram of a jellyfish life cycle with one arrow drawn back from the medusa to the polyp, ink on paper, no words',
    caption: "Illustration. The 1996 paper reported the medusa turning back into the polyp stage. The arrow in a textbook usually points the other way.",
  },

  // -------------------------------------------------------- Bombardier beetle
  {
    article: 'Bombardier beetle', kind: 'documentary', place: 'lead',
    query: 'Brachinus bombardier beetle',
    webQuery: 'bombardier beetle photograph spray',
    caption: "A bombardier beetle. The spray of benzoquinones is mixed in a reaction chamber and leaves at 100°C.",
  },
  {
    article: 'Bombardier beetle', kind: 'humour', place: 'end', custom: true,
    query: 'beetle abdomen glands diagram',
    webQuery: 'bombardier beetle chemistry meme funny',
    generate: 'A cutaway illustration of a small beetle abdomen with two separate reservoirs meeting a tiny chamber at the tip, scientific plate, no text',
    caption: "Illustration. The hydroquinones and the hydrogen peroxide are stored apart and mixed only as they are fired.",
  },

  // -------------------------------------------------------------------- Okapi
  {
    article: 'Okapi', kind: 'documentary', place: 'lead',
    query: 'Okapia johnstoni okapi',
    webQuery: 'okapi photograph legs stripes',
    caption: "An okapi. The first material shown in London was two strips of hide cut for belts, and it was published as a horse.",
  },
  {
    article: 'Okapi', kind: 'humour', place: 'end', custom: true,
    query: 'leather belt striped hide',
    webQuery: 'okapi belt discovery meme funny',
    generate: 'Two short strips of striped hide laid on a zoological-society table beside a handwritten label reading nothing, museum still life, no readable text',
    caption: "Illustration. Philip Sclater named Equus johnstoni from strips of skin. The skull, which arrived later, put the animal with the giraffes.",
  },

  // -------------------------------------------------------- Dreadnought hoax
  {
    article: 'Dreadnought hoax', kind: 'documentary', place: 'lead',
    query: 'HMS Dreadnought 1910 battleship',
    webQuery: 'HMS Dreadnought photograph 1910',
    caption: "HMS Dreadnought. On 7 February 1910 a party in costume was piped aboard after a telegram the Foreign Office had not sent.",
  },
  {
    article: 'Dreadnought hoax', kind: 'humour', place: 'end', custom: true,
    query: 'Edwardian battleship officers on deck',
    webQuery: 'dreadnought hoax photograph 1910',
    generate: 'An Edwardian battleship quarterdeck with a naval band and a flag lieutenant, and a small party in theatrical robes and false beards being saluted, period illustration, no likeness of any real person',
    caption: "Illustration of the visit. The robes, beards and makeup came from a theatrical costumier. One officer on board was Virginia Stephen's cousin and did not recognise her.",
  },

  // -------------------------------------------------- Theft of the Mona Lisa
  {
    article: 'Theft of the Mona Lisa', kind: 'documentary', place: 'lead',
    query: 'Mona Lisa Louvre painting',
    webQuery: 'Mona Lisa Leonardo photograph',
    caption: "Leonardo's Mona Lisa. It left the Louvre on a Monday, 21 August 1911, while the museum was closed.",
  },
  {
    article: 'Theft of the Mona Lisa', kind: 'humour', place: 'end', custom: true,
    query: 'empty picture frame on a gallery wall',
    webQuery: 'mona lisa stolen empty wall 1911 photograph',
    generate: 'A museum gallery wall with one empty hook and a pale rectangle where a painting had been, 1911 interior, no readable labels, no reproduction of the painting',
    caption: "Illustration of the gap. Staff assumed the picture had been taken down to be photographed, and it was about a day before anyone treated the wall as a theft.",
  },

  // ------------------------------------------------------- Cottingley Fairies
  {
    article: 'Cottingley Fairies', kind: 'documentary', place: 'lead',
    query: 'Cottingley Beck Yorkshire stream',
    webQuery: 'Cottingley Beck photograph',
    caption: "Cottingley Beck. The five photographs were taken here in 1917 and 1920. The fairies in four of them were cardboard.",
  },
  {
    article: 'Cottingley Fairies', kind: 'humour', place: 'end', custom: true,
    query: 'cardboard paper cutout on a hatpin',
    webQuery: 'cottingley fairies cardboard cutout hatpin',
    generate: 'A cardboard paper cutout of a winged figure propped on a hatpin in the grass beside a stream, photographed as a prop, not a reproduction of the 1917 plates, no children',
    caption: "Illustration of the method Elsie Wright described in 1983: drawings copied from a book, cut out of card, and held up with hatpins. Not one of the original photographs.",
  },

  // --------------------------------------------------- Operation Paul Bunyan
  {
    article: 'Operation Paul Bunyan', kind: 'documentary', place: 'lead',
    query: 'Korean DMZ Joint Security Area poplar tree stump',
    webQuery: 'Operation Paul Bunyan tree stump Joint Security Area photograph',
    caption: "The Joint Security Area. On 21 August 1976 a work party with chainsaws cut down the poplar whose pruning, three days earlier, had ended with two officers dead.",
  },
  {
    article: 'Operation Paul Bunyan', kind: 'humour', place: 'end', custom: true,
    query: 'chainsaw and military helicopter',
    webQuery: 'operation paul bunyan tree cutting photograph',
    generate: 'A single poplar stump in a border camp, a chainsaw on the ground, and distant helicopters in a grey sky, documentary illustration, no insignia, no text',
    caption: "Illustration. The return visit brought chainsaws, hundreds of troops, helicopters, B-52s and a carrier. The BBC's account says it was over in less than 45 minutes.",
  },

  // ------------------------------------------- Hubble Space Telescope mirror
  {
    article: 'Hubble Space Telescope mirror', kind: 'documentary', place: 'lead',
    query: 'Hubble Space Telescope primary mirror polishing',
    webQuery: 'Hubble Space Telescope primary mirror photograph',
    caption: "The Hubble primary mirror during manufacture. It was polished to the shape the reflective null corrector reported, and that instrument's lens was 1.3 mm out.",
  },
  {
    article: 'Hubble Space Telescope mirror', kind: 'humour', place: 'end', custom: true,
    generatedFile: 'humour/hubble-cap-humour.png',
    query: 'optical test interferometer fringes',
    webQuery: 'hubble mirror spherical aberration meme',
    generate: 'A laboratory optical bench with a small metal cap, a chip of dark paint missing around a pinhole, and a beam of light reflecting off the cap instead of the rod beneath it, technical illustration, no text',
    caption: "Illustration of the board's account. The field cap was painted so it would not reflect. A little of the paint was gone, and the reflection was taken from the cap.",
  },

  // -------------------------------------------------------- Ariane 5 Flight 501
  {
    article: 'Ariane 5 Flight 501', kind: 'documentary', place: 'lead',
    query: 'Ariane 5 rocket launch Kourou',
    webQuery: 'Ariane 5 launch photograph',
    caption: "An Ariane 5 leaving Kourou. Flight 501, on 4 June 1996, broke up about 37 seconds after the ignition sequence began.",
  },
  {
    article: 'Ariane 5 Flight 501', kind: 'humour', place: 'end', custom: true,
    generatedFile: 'humour/ariane-humour.png',
    query: 'redundant computers same error',
    webQuery: 'ariane 5 software overflow diagram',
    generate: 'Two identical grey electronics boxes side by side, both showing the same small fault light, a rocket silhouette faint in the background, technical illustration, no readable text, no logos',
    caption: "Illustration. The backup inertial unit failed 72 milliseconds before the active one, because it was running the same software.",
  },

  // ------------------------------------------------------------- Knight Capital
  {
    article: 'Knight Capital', kind: 'documentary', place: 'lead',
    query: 'New York Stock Exchange trading floor 2012',
    webQuery: 'NYSE trading floor photograph',
    caption: "The New York Stock Exchange. On 1 August 2012 one Knight Capital server turned 212 retail orders into about 4 million executions.",
  },
  {
    article: 'Knight Capital', kind: 'humour', place: 'end', custom: true,
    generatedFile: 'humour/knight-servers-humour.png',
    query: 'server room one machine different',
    webQuery: 'knight capital trading error meme',
    generate: 'Eight identical server racks in a row, seven with a small green light and one with a small amber light, sober technical illustration, no logos, no text',
    caption: "Illustration. Seven of the eight servers had the new code. The eighth still had Power Peg, which Knight had stopped using in 2003.",
  },

  // -------------------------------------------------------- Chelyabinsk meteor
  {
    article: 'Chelyabinsk meteor', kind: 'documentary', place: 'lead',
    query: 'Chelyabinsk meteor smoke trail 2013',
    webQuery: 'Chelyabinsk meteor dashcam trail photograph',
    caption: "The trail of the Chelyabinsk meteor, 15 February 2013. The body was about 20 metres across and broke up near 30 kilometres altitude.",
  },
  {
    article: 'Chelyabinsk meteor', kind: 'humour', place: 'end', custom: true,
    query: 'broken window and a plaster bust',
    webQuery: 'chelyabinsk meteor broken windows photograph',
    generate: 'A library interior with one window frame pushed inward and a plaster bust toppled and cracked beside it, daylight, documentary illustration, no readable text',
    caption: "Illustration. In Yemanzhelinsk the buildings were not structurally damaged. A statue of Pushkin in the library was cracked by a window frame.",
  },

  // -------------------------------------------------- Florence whale explosion
  {
    article: 'Florence whale explosion', kind: 'documentary', place: 'lead',
    query: 'Oregon coast beach Florence',
    webQuery: 'Florence Oregon exploding whale 1970 photograph',
    caption: "The Oregon coast near Florence. On 12 November 1970 the State Highway Division detonated half a ton of dynamite under a beached sperm whale.",
  },
  {
    article: 'Florence whale explosion', kind: 'humour', place: 'end', custom: true,
    query: 'whale carcass on a beach crowd distant',
    webQuery: 'exploding whale florence meme',
    generate: 'A 1970s beach with a distant crowd on a dune and a column of sand and spray where a carcass had been, period news illustration, no gore, no text',
    caption: "Illustration. Spectators stood about a quarter of a mile off. A piece about three feet across still reached a car.",
  },

  // --------------------------------------------------------- Pentium FDIV bug
  {
    article: 'Pentium FDIV bug', kind: 'documentary', place: 'lead',
    query: 'Intel Pentium processor ceramic package',
    webQuery: 'Intel Pentium processor photograph 1994',
    caption: "An early Intel Pentium. For some divisions the floating-point unit returned a result wrong from the fifth significant digit.",
  },
  {
    article: 'Pentium FDIV bug', kind: 'humour', place: 'end', custom: true,
    query: 'Windows calculator 1990s',
    webQuery: 'pentium fdiv bug calculator meme',
    generate: 'A 1990s beige desktop calculator window showing a long division and the number 256 where a zero was expected, period interface illustration, no logos, no brand names',
    caption: "Illustration of the check Thomas Nicely published. On a flawed Pentium, 4195835 minus 3145727 times their quotient comes out as 256.",
  },

  // ------------------------------------------------------------- Phineas Gage
  {
    article: 'Phineas Gage', kind: 'documentary', place: 'lead',
    query: 'Phineas Gage skull tamping iron Harvard',
    webQuery: 'Phineas Gage skull and tamping iron photograph',
    caption: "Gage's skull and the tamping iron, deposited by John Martyn Harlow at Harvard. The bar is three feet seven inches long.",
  },
  {
    article: 'Phineas Gage', kind: 'humour', place: 'end', custom: true,
    query: 'nineteenth century surgeons examining a skull',
    webQuery: 'phineas gage diagram iron path',
    generate: 'A nineteenth-century medical lecture, a skull on a table beside a long iron bar, surgeons leaning in, engraving style, no likeness of a real person, no text',
    caption: "Illustration. Harlow wrote that many surgeons would not believe the man had stood up again until they had put a finger into the hole in his head.",
  },

  // -------------------------------------------------------------------- Bloop
  {
    article: 'Bloop', kind: 'documentary', place: 'lead',
    query: 'tabular iceberg Antarctic',
    webQuery: 'large Antarctic iceberg photograph',
    caption: "A large iceberg. NOAA describes the 1997 sound called Bloop as consistent with the icequakes icebergs make when they crack.",
  },
  {
    article: 'Bloop', kind: 'humour', place: 'end', custom: true,
    generatedFile: 'humour/bloop-humour.png',
    query: 'spectrogram underwater sound',
    webQuery: 'bloop sound spectrogram noaa',
    generate: 'A long low spectrogram beside the same trace compressed to a short blip, scientific illustration on a dark background, no words, no creature',
    caption: "Illustration. NOAA's file of the original sound is the recorded signal sped up sixteen times. There is no animal in the account.",
  },

  // ------------------------------------------------------------------- Hair ice
  {
    article: 'Hair ice', kind: 'documentary', place: 'lead',
    query: 'hair ice Exidiopsis dead wood',
    webQuery: 'hair ice fungus wood photograph',
    caption: "Hair ice on dead wood. The 2015 study found the fungus Exidiopsis effusa on every sample, and found that the ice still forms after the fungus is killed.",
  },
  {
    article: 'Hair ice', kind: 'humour', place: 'end', custom: true,
    query: 'white hair on a log',
    webQuery: 'hair ice close up photograph',
    generate: 'A close illustration of fine white ice filaments growing from the cut end of a damp branch, like hair, on a dark forest floor, no text',
    caption: "Illustration. The hairs are ice, shaped by a fungus and by the mouths of the wood rays. They are not hair.",
  },

  // ------------------------------------------ Tanganyika laughter epidemic
  {
    article: 'Tanganyika laughter epidemic', kind: 'documentary', place: 'lead',
    query: 'Lake Victoria Bukoba shoreline',
    webQuery: 'Bukoba Tanganyika 1960s photograph',
    caption: "The shore of Lake Victoria near Bukoba. The 1962 outbreak began at a mission school about 25 miles from the town.",
  },
  {
    article: 'Tanganyika laughter epidemic', kind: 'humour', place: 'end', custom: true,
    query: 'empty school classroom',
    webQuery: 'closed school classroom photograph',
    generate: 'An empty school classroom with chairs pushed back and a closed door, quiet daylight, documentary illustration, no children, no text',
    caption: "Illustration of a closed school, not of the pupils. Rankin and Philip reported laughing, crying and restlessness, and the school shut twice.",
  },

  // -------------------------------------------------------- Millennium Bridge
  {
    article: 'Millennium Bridge', kind: 'documentary', place: 'lead',
    query: 'London Millennium Footbridge Thames',
    webQuery: 'Millennium Bridge London photograph crowd',
    caption: "The Millennium Bridge. It opened on 10 June 2000 and was closed on 12 June after the deck moved sideways under the crowd.",
  },
  {
    article: 'Millennium Bridge', kind: 'humour', place: 'end', custom: true,
    query: 'pedestrians holding a railing',
    webQuery: 'millennium bridge wobble opening day',
    generate: 'Pedestrians on a slender footbridge holding the handrail as the deck shifts sideways a few centimetres, daylight, illustration, no logos, no text',
    caption: "Illustration. Arup found that walking in time with the sway was the more comfortable way to keep one's balance, and that those steps increased the sway.",
  },

  // ----------------------------------------------------------------- Wood frog
  {
    article: 'Wood frog', kind: 'documentary', place: 'lead',
    query: 'Rana sylvatica wood frog',
    webQuery: 'wood frog photograph',
    caption: "A wood frog. Storey and Storey found that glucose production starts when ice forms, not when the temperature crosses a set line.",
  },
  {
    article: 'Wood frog', kind: 'humour', place: 'end', custom: true,
    query: 'frog on frozen leaves',
    webQuery: 'frozen wood frog ice crystals',
    generate: 'A small brown frog on leaf litter with a thin film of ice on the leaves around it, scientific still life, no text',
    caption: "Illustration. A frog cooled below zero but not yet frozen had ordinary blood sugar. The same kind of frog, once frozen, did not.",
  },

  // -------------------------------------------------------- Eric Moussambani
  {
    article: 'Eric Moussambani', kind: 'documentary', place: 'lead',
    query: 'Sydney Olympic swimming pool 2000',
    webQuery: 'Eric Moussambani Sydney 2000 photograph',
    caption: "The Sydney Olympic pool. On 19 September 2000 Eric Moussambani swam the first 100 metre freestyle heat alone, in 1:52.72.",
  },
  {
    article: 'Eric Moussambani', kind: 'humour', place: 'end', custom: true,
    query: 'empty swimming lanes one swimmer',
    webQuery: 'eric the eel olympics meme',
    generate: 'An Olympic pool with seven empty lanes and one swimmer mid-length, crowd in the stands, illustration, no likeness of a real person, no text',
    caption: "Illustration. The other two swimmers in the heat had been eliminated for false starts. He had never raced 100 metres before.",
  },

  // ------------------------------------------------------- Boring and Dull Day
  {
    article: 'Boring and Dull Day', kind: 'documentary', place: 'lead',
    query: 'Boring Oregon town sign',
    webQuery: 'Boring Oregon road sign photograph',
    caption: "Boring, Oregon. On 5 June 2012 its community planning organisation voted unanimously to pair with Dull, Scotland.",
  },
  {
    article: 'Boring and Dull Day', kind: 'humour', place: 'end', custom: true,
    query: 'two road signs side by side',
    webQuery: 'dull scotland boring oregon signs photograph',
    generate: 'Two plain road signs on one post, one reading like a village name and one like another, photographed straight, no extra jokes written on them, documentary style',
    caption: "Illustration. Oregon's enrolled House Bill 2352 designates 9 August as Boring and Dull Day, and includes a recital that reading the Act is boring and dull.",
  },

  // ------------------------------------------------------------------ Left-pad
  {
    article: 'Left-pad', kind: 'documentary', place: 'lead',
    query: 'computer terminal npm install error',
    webQuery: 'npm left-pad install failure screenshot',
    caption: "A terminal. On 22 March 2016, unpublishing an eleven-line package produced hundreds of failed installs a minute.",
  },
  {
    article: 'Left-pad', kind: 'humour', place: 'end', custom: true,
    query: 'short function on a screen',
    webQuery: 'left-pad javascript meme',
    generate: 'A few lines of plain code on a dark screen, a string of spaces being added to the front of a word, technical illustration, no logos, no brand names',
    caption: "Illustration. The package padded the left side of a string. Builds failed because version 0.0.3 was no longer where they had been told to look.",
  },

  // ------------------------------------------------------------- Fosbury flop
  {
    article: 'Fosbury flop', kind: 'documentary', place: 'lead',
    query: 'Dick Fosbury high jump Mexico 1968',
    webQuery: 'Dick Fosbury flop 1968 Olympic photograph',
    caption: "Dick Fosbury at the 1968 Olympic high jump. He cleared 2.24 metres on his third attempt. The bar at 2.29 stayed up.",
  },
  {
    article: 'Fosbury flop', kind: 'humour', place: 'end', custom: true,
    query: 'high jump bar falling backwards',
    webQuery: 'fosbury flop diagram back first',
    generate: 'A simple sports diagram of a high jumper going over a bar backwards, head first, arching the back, no logos, no readable text, illustration',
    caption: "Illustration. He finished third at the United States trials. The style is named for the jumper who won the gold.",
  },

  // ---------------------------------------------------------- Fisher Space Pen
  {
    article: 'Fisher Space Pen', kind: 'documentary', place: 'lead',
    query: 'Fisher space pen AG7',
    webQuery: 'Fisher space pen photograph',
    caption: "A Fisher Space Pen. NASA bought 400 of them at $6 each. The mechanical pencils, earlier, had been $128.89.",
  },
  {
    article: 'Fisher Space Pen', kind: 'humour', place: 'end', custom: true,
    query: 'mechanical pencil on a string',
    webQuery: 'astronaut pencil floating spacecraft',
    generate: 'A single mechanical pencil tied to a short cord, floating in a plain spacecraft cabin, technical illustration, no logos, no text',
    caption: "Illustration. The story says NASA spent a fortune on a pen. The invoice that matches the fortune is for 34 pencils.",
  },

  // -------------------------------------------------------------- D.B. Cooper
  {
    article: 'D.B. Cooper', kind: 'documentary', place: 'lead',
    query: 'Boeing 727 rear airstair',
    webQuery: 'Northwest Orient Boeing 727 aft stairs photograph',
    caption: "The rear stairs of a Boeing 727. On 24 November 1971 the hijacker who signed his ticket Dan Cooper jumped from a set like these.",
  },
  {
    article: 'D.B. Cooper', kind: 'humour', place: 'end', custom: true,
    query: 'weathered twenty dollar bills rubber band',
    webQuery: 'decayed currency packets sand',
    generate: 'Three small stacks of worn paper currency held by rubber bands, sitting on river sand, documentary still life, no readable serial numbers, no text',
    caption: "Illustration. On 10 February 1980 an eight-year-old raking sand for a campfire found three packets, $5,800, from the ransom.",
  },

  // --------------------------------------------------- Year Without a Summer
  {
    article: 'Year Without a Summer', kind: 'documentary', place: 'lead',
    query: 'Mount Tambora caldera Sumbawa',
    webQuery: 'Tambora volcano caldera photograph',
    caption: "The caldera of Tambora. The 1815 eruption put about 60 megatonnes of sulfur into the stratosphere. 1816 was named for the summer it did not have.",
  },
  {
    article: 'Year Without a Summer', kind: 'humour', place: 'end', custom: true,
    query: 'snow in June New England 19th century painting',
    webQuery: 'year without a summer snow June illustration',
    generate: 'A quiet New England farm in summer clothes with snow on the fields, early nineteenth century, plain illustration, no text',
    caption: "Illustration. In the northeastern United States, maritime Canada, and Europe, 1816 acquired a name for the season that did not arrive.",
  },

  // ------------------------------------------------------- Centralia mine fire
  {
    article: 'Centralia mine fire', kind: 'documentary', place: 'lead',
    query: 'Centralia Pennsylvania smoke Route 61',
    webQuery: 'Centralia PA abandoned highway steam photograph',
    caption: "Smoke from the Centralia mine fire. First reported on 27 May 1962. The 1983 estimate to put it out was $663 million.",
  },
  {
    article: 'Centralia mine fire', kind: 'humour', place: 'end', custom: true,
    query: 'two price tags side by side',
    webQuery: 'abandoned centralia pennsylvania street',
    generate: 'A plain ledger page with two large figures, one much larger than the other, no words, illustration of a municipal account book',
    caption: "Illustration. The estimate to extinguish the fire was $663 million. Congress appropriated $42 million to relocate the borough.",
  },

  // ------------------------------------------ Seattle windshield pitting epidemic
  {
    article: 'Seattle windshield pitting epidemic', kind: 'documentary', place: 'lead',
    query: '1950s American car windshield close up',
    webQuery: '1954 Seattle automobile windshield photograph',
    caption: "A 1950s windshield. Between 14 and 15 April 1954, Seattle police took 242 calls about pits in more than 3,000 of them.",
  },
  {
    article: 'Seattle windshield pitting epidemic', kind: 'humour', place: 'end', custom: true,
    query: 'person inspecting car windshield closely',
    webQuery: 'windshield pitting close inspection photograph',
    generate: 'A 1950s driver leaning close to a car windshield, looking at the glass rather than through it, period illustration, no text, no logos',
    caption: "Illustration. The newspapers had already suggested the pits were being found by people looking at the glass instead of through it.",
  },

  // ---------------------------------------------------------- Eddie the Eagle
  {
    article: 'Eddie the Eagle', kind: 'documentary', place: 'lead',
    query: 'Eddie Edwards ski jump Calgary 1988',
    webQuery: 'Eddie the Eagle Calgary Olympics photograph',
    caption: "Eddie Edwards at Calgary. On the normal hill the K-point was 89 metres. He jumped 55, twice, and finished 58th of 58.",
  },
  {
    article: 'Eddie the Eagle', kind: 'humour', place: 'end', custom: true,
    query: 'ski jump distance markers',
    webQuery: 'ski jump hill K point markers',
    generate: 'A ski jump landing hill with distance marks, one mark far up the hill and a much shorter mark well below it, diagram, no text, no logos',
    caption: "Illustration. His 69.2 points left him one place behind a score of 140.4.",
  },

  // ----------------------------------------------------------- Hollywood Sign
  {
    article: 'Hollywood Sign', kind: 'documentary', place: 'lead',
    query: 'Hollywood Sign Mount Lee',
    webQuery: 'Hollywood sign photograph Mount Lee',
    caption: "The Hollywood Sign. It was built in 1923 to spell Hollywoodland, as an advertisement for a housing tract.",
  },
  {
    article: 'Hollywood Sign', kind: 'humour', place: 'end', custom: true,
    query: 'Hollywoodland sign historic photograph',
    webQuery: 'original Hollywoodland sign 1923 photograph',
    generate: 'A hillside of white block letters spelling a long real-estate name, with the last four letters drawn as if being taken down, plain illustration, no modern logos',
    caption: "Illustration. In 1949 the Chamber of Commerce paid to put the H back, on condition the last four letters came off.",
  },

  // ---------------------------------------------------- Liebeck v. McDonald's
  {
    article: "Liebeck v. McDonald's", kind: 'documentary', place: 'lead',
    query: '1990s paper coffee cup drive through',
    webQuery: 'McDonalds coffee cup 1990s photograph',
    caption: "A takeaway coffee cup. The operations manual said the coffee was to be held at 180 to 190 degrees Fahrenheit.",
  },
  {
    article: "Liebeck v. McDonald's", kind: 'humour', place: 'end', custom: true,
    query: 'thermometer in a coffee cup',
    webQuery: 'coffee temperature thermometer',
    generate: 'A paper coffee cup with a thermometer in it, the scale high, plain still life, no logos, no brand names, illustration',
    caption: "Illustration. A student with a thermometer found other cups in the city about 20 degrees cooler.",
  },

  // ------------------------------------------------------ Sydney Opera House
  {
    article: 'Sydney Opera House', kind: 'documentary', place: 'lead',
    query: 'Sydney Opera House shells construction 1960s',
    webQuery: 'Sydney Opera House under construction photograph',
    caption: "The shells under construction. Utzon left on 28 April 1966. The building opened on 20 October 1973.",
  },
  {
    article: 'Sydney Opera House', kind: 'humour', place: 'end', custom: true,
    query: 'architect briefcase drawings',
    webQuery: 'architectural drawings rolled',
    generate: 'A small stack of architectural drawings and a departure board, plain illustration, no readable words, no logos',
    caption: "Illustration. He told his staff he expected to be back within two years. He was not invited back.",
  },

  // --------------------------------------------------- Leaning Tower of Pisa
  {
    article: 'Leaning Tower of Pisa', kind: 'documentary', place: 'lead',
    query: 'Leaning Tower of Pisa',
    webQuery: 'Leaning Tower of Pisa photograph',
    caption: "The bell tower of Pisa Cathedral. Work stopped after the third ring because the ground was giving way.",
  },
  {
    article: 'Leaning Tower of Pisa', kind: 'humour', place: 'end', custom: true,
    query: 'tower built with a correcting curve',
    webQuery: 'pisa tower curve correction diagram',
    generate: 'A simple diagram of a tower whose lower floors lean one way and whose upper floors bend back the other way, no text, illustration',
    caption: "Illustration. From 1275 the new floors were built slightly the other way, to straighten it.",
  },

  // --------------------------------------------------------------- Play-Doh
  {
    article: 'Play-Doh', kind: 'documentary', place: 'lead',
    query: 'Play-Doh cans',
    webQuery: 'vintage Play-Doh can photograph',
    caption: "Cans of the modelling compound. Before 1956 the same sort of mixture was sold to wipe soot off wallpaper.",
  },
  {
    article: 'Play-Doh', kind: 'humour', place: 'end', custom: true,
    query: 'coal soot on wallpaper',
    webQuery: 'sooty wallpaper coal heating',
    generate: 'A wallpapered wall with a soft pale smear where soot has been wiped away, domestic still life, no text, no logos',
    caption: "Illustration. Kutol made it to clean coal residue. The soot went away when the heating did.",
  },

  // -------------------------------------------------- 1904 Olympic marathon
  {
    article: '1904 Olympic marathon', kind: 'documentary', place: 'lead',
    query: '1904 Olympic marathon St Louis Hicks',
    webQuery: 'Thomas Hicks 1904 marathon photograph',
    caption: "Thomas Hicks after the 1904 marathon. His time was 3:28:53. The man writing the account had given him strychnine on the road.",
  },
  {
    article: '1904 Olympic marathon', kind: 'humour', place: 'end', custom: true,
    query: 'early automobile dusty road 1904',
    webQuery: '1904 St Louis marathon automobile',
    generate: 'A dusty unpaved road with an early open automobile and a runner far behind, 1904, illustration, no text, no logos',
    caption: "Illustration. Fred Lorz rode for many miles, then ran the last five, and was greeted as the winner.",
  },

  // ----------------------------------------------------------------- Skylab
  {
    article: 'Skylab', kind: 'documentary', place: 'lead',
    query: 'Skylab space station',
    webQuery: 'Skylab NASA photograph',
    caption: "Skylab. On 11 July 1979 pieces of it came down in the Shire of Esperance.",
  },
  {
    article: 'Skylab', kind: 'humour', place: 'end', custom: true,
    query: 'littering fine notice',
    webQuery: 'parking ticket litter fine',
    generate: 'A small municipal fine notice beside a fragment of metal on red dirt, illustration, no readable words, no logos',
    caption: "Illustration. The ranger's littering fine was $400. NASA did not pay it. A radio audience did, in 2009.",
  },

  // ---------------------------------------------------- Worcestershire sauce
  {
    article: 'Worcestershire sauce', kind: 'documentary', place: 'lead',
    query: 'Lea and Perrins Worcestershire sauce bottle',
    webQuery: 'Lea Perrins bottle photograph',
    caption: "Lea and Perrins. The company's account is that the first batch was put in the basement because it tasted awful.",
  },
  {
    article: 'Worcestershire sauce', kind: 'humour', place: 'end', custom: true,
    query: 'old barrel in a cellar',
    webQuery: 'cellar barrel stone basement',
    generate: 'A single old jar on a stone cellar shelf, dust, no labels readable, still life illustration',
    caption: "Illustration. They tried it again a couple of years later, when they went back downstairs.",
  },

  // ------------------------------------------------------------------ Slinky
  {
    article: 'Slinky', kind: 'documentary', place: 'lead',
    query: 'Slinky toy metal spring',
    webQuery: 'original metal Slinky photograph',
    caption: "A Slinky. US patent 2,415,012, granted 28 January 1947, claims a spring that walks downstairs by gravity.",
  },
  {
    article: 'Slinky', kind: 'humour', place: 'end', custom: true,
    query: 'spring walking down stairs',
    webQuery: 'slinky walking downstairs',
    generate: 'A metal coil mid-step on a plain staircase, one end on an upper tread and the other reaching down, illustration, no text, no logos',
    caption: "Illustration. The patent says that after the start, the rest of the trip is gravity.",
  },

  // ------------------------------------------------------------- Penicillin
  {
    article: 'Penicillin', kind: 'documentary', place: 'lead',
    query: 'Penicillium mould petri dish',
    webQuery: 'Penicillium notatum culture photograph',
    caption: "A Penicillium culture. Fleming saw a clear ring around a mould on a dish of Staphylococcus on 3 September 1928.",
  },
  {
    article: 'Penicillin', kind: 'humour', place: 'end', custom: true,
    query: 'cantaloupe melon mould',
    webQuery: 'mouldy cantaloupe',
    generate: 'A cantaloupe with a patch of blue-green mould, laboratory still life, no text, no logos',
    caption: "Illustration. The strain used for industrial penicillin came from a mouldy cantaloupe in a Peoria market.",
  },

  // --------------------------------------------------------- Microwave oven
  {
    article: 'Microwave oven', kind: 'documentary', place: 'lead',
    query: 'early Raytheon Radarange microwave oven',
    webQuery: 'Radarange microwave oven photograph',
    caption: "An early microwave oven. The 1945 patent is a method of cooking food with waves about ten centimetres long.",
  },
  {
    article: 'Microwave oven', kind: 'humour', place: 'end', custom: true,
    query: 'wavelength diagram ten centimetres',
    webQuery: 'microwave wavelength diagram',
    generate: 'A simple diagram of a short wave entering a piece of food, technical illustration, no text, no logos',
    caption: "Illustration. The claim specifies a wavelength of substantially ten centimetres, and food left in it until cooked.",
  },

  // ------------------------------------------------------------ Parthenon
  {
    article: 'Parthenon', kind: 'documentary', place: 'lead',
    query: 'Parthenon Athens',
    webQuery: 'Parthenon photograph Acropolis',
    caption: "The Parthenon. On 26 September 1687 a mortar round hit the powder stored inside it.",
  },
  {
    article: 'Parthenon', kind: 'humour', place: 'end', custom: true,
    query: '17th century mortar siege',
    webQuery: 'Venetian mortar 17th century illustration',
    generate: 'A seventeenth-century mortar on a hill aimed at a temple, period engraving style, no text',
    caption: "Illustration. Morosini's word for the round that brought the cella down was fortunate.",
  },

  // ------------------------------------------------------------ Apollo 13
  {
    article: 'Apollo 13', kind: 'documentary', place: 'lead',
    query: 'Apollo 13 service module damage',
    webQuery: 'Apollo 13 damaged service module NASA photograph',
    caption: "The Apollo 13 service module after the oxygen tank ruptured. The tank had been dropped two inches while it was being removed from Apollo 10.",
  },
  {
    article: 'Apollo 13', kind: 'humour', place: 'end', custom: true,
    query: 'oxygen tank spherical metal',
    webQuery: 'apollo oxygen tank photograph',
    generate: 'A spherical metal tank being lowered, a gap of about two inches under it, technical illustration, no text, no logos',
    caption: "Illustration. The drop was two inches. The internal fill line was not known to be damaged. The tank flew on the next spacecraft.",
  },

  // ----------------------------------------------------------------- Tang
  {
    article: 'Tang', kind: 'documentary', place: 'lead',
    query: 'Tang drink mix jar',
    webQuery: 'vintage Tang jar photograph',
    caption: "Tang. William Mitchell at General Foods invented the crystals in 1957. They were on grocery shelves in 1959.",
  },
  {
    article: 'Tang', kind: 'humour', place: 'end', custom: true,
    query: 'space drink pouch',
    webQuery: 'apollo drink pouch orange',
    generate: 'A plain foil drink pouch labelled only by a colour swatch of orange, no brand name, illustration',
    caption: "Illustration. The pouches NASA flew were labelled orange drink. The brand name stayed on the ground.",
  },

  // ---------------------------------------------------------- Oxford Dodo
  {
    article: 'Oxford Dodo', kind: 'documentary', place: 'lead',
    query: 'Oxford dodo head foot museum',
    webQuery: 'Oxford University Museum dodo specimen photograph',
    caption: "The Oxford dodo: a head and a foot. The rest of the stuffed bird did not survive the inspection of 8 January 1755.",
  },
  {
    article: 'Oxford Dodo', kind: 'humour', place: 'end', custom: true,
    query: 'old museum catalogue latin note',
    webQuery: 'ashmolean catalogue manuscript',
    generate: 'A handwritten museum catalogue page with one Latin word circled, no readable modern text, illustration',
    caption: "Illustration. The bonfire comes from reading lustrandum, an inspection, as a Roman purification by fire.",
  },

  // ---------------------------------------------------------------- WD-40
  {
    article: 'WD-40', kind: 'documentary', place: 'lead',
    query: 'WD-40 can',
    webQuery: 'vintage WD-40 can photograph',
    caption: "A can of WD-40. The name is the lab-book note: water displacement, the formula that worked on the fortieth try.",
  },
  {
    article: 'WD-40', kind: 'humour', place: 'end', custom: true,
    query: 'Atlas missile on pad',
    webQuery: 'Atlas missile photograph Convair',
    generate: 'A tall rocket on a pad with a small oil can at its foot, illustration, no logos, no readable text',
    caption: "Illustration. Convair used it on the skin of the Atlas missile. Employees took cans home.",
  },

  // ------------------------------------------------------------ Super Glue
  {
    article: 'Super Glue', kind: 'documentary', place: 'lead',
    query: 'cyanoacrylate adhesive tube',
    webQuery: 'Eastman 910 super glue tube photograph',
    caption: "A tube of cyanoacrylate. Kodak sold it in 1958 as Eastman 910, after a 1954 patent on its use as an adhesive.",
  },
  {
    article: 'Super Glue', kind: 'humour', place: 'end', custom: true,
    query: 'laboratory refractometer',
    webQuery: 'refractometer laboratory instrument',
    generate: 'A laboratory optical instrument with two glass plates stuck together, plain illustration, no text, no logos',
    caption: "Illustration. Coover warned that the sample would stick in the refractometer. It did.",
  },

  // ------------------------------------------------------------ Safety pin
  {
    article: 'Safety pin', kind: 'documentary', place: 'lead',
    query: 'safety pin close up',
    webQuery: 'safety pin photograph',
    caption: "A safety pin. Walter Hunt's 1849 patent is one piece of wire: pin, coil, and catch.",
  },
  {
    article: 'Safety pin', kind: 'humour', place: 'end', custom: true,
    query: 'bent wire coil',
    webQuery: 'single piece of wire bent into a pin',
    generate: 'A single length of wire bent into a pin, a coil, and a clasp, plain illustration on a white ground, no text, no logos',
    caption: "Illustration. The patent's advantage, which it calls unknown in other plans, is that the point goes into the catch instead of the finger.",
  },

  // ------------------------------------------------------------ Moon tree
  {
    article: 'Moon tree', kind: 'documentary', place: 'lead',
    query: 'Moon tree plaque Apollo 14',
    webQuery: 'moon tree plaque photograph',
    caption: "A moon tree. The seeds flew in Stuart Roosa's personal kit on Apollo 14.",
  },
  {
    article: 'Moon tree', kind: 'humour', place: 'end', custom: true,
    query: 'canvas pouch seeds',
    webQuery: 'seed canister pouch',
    generate: 'A small metal canister of seeds beside a canvas pouch, plain illustration, no text, no logos',
    caption: "Illustration. The bags burst in decontamination. NASA never kept a list of where the trees went.",
  },

  // ---------------------------------------------------------------- Otzi
  {
    article: 'Otzi', kind: 'documentary', place: 'lead',
    query: 'Otzi reconstruction South Tyrol',
    webQuery: 'Otzi the Iceman reconstruction photograph',
    caption: "A reconstruction of the man found on the Schnalstal glacier in 1991. The South Tyrol Museum says he was murdered more than 5,300 years ago.",
  },
  {
    article: 'Otzi', kind: 'humour', place: 'end', custom: true,
    query: 'newspaper nameplate',
    webQuery: 'journalist notebook',
    generate: 'A reporter notebook with a single short name written on it, no readable modern headline, illustration',
    caption: "Illustration. The name on the exhibit was chosen by the journalist Karl Wendl because it would be remembered.",
  },

  // ---------------------------------------------------------- Ghost Army
  {
    article: 'Ghost Army', kind: 'documentary', place: 'lead',
    query: 'inflatable tank Ghost Army 23rd Headquarters',
    webQuery: 'inflatable Sherman tank photograph WWII',
    caption: "An inflatable tank of the kind the 23rd Headquarters Special Troops used. From a quarter of a mile it looked like an M4.",
  },
  {
    article: 'Ghost Army', kind: 'humour', place: 'end', custom: true,
    query: 'rubber inflatable tank',
    webQuery: 'dummy inflatable tank',
    generate: 'A canvas tank shape on a field, clearly limp at the edges, illustration, no insignia text',
    caption: "Illustration. The National WWII Museum's account is that up close it would fool no one.",
  },

  // ---------------------------------------------------- Paul the octopus
  {
    article: 'Paul the octopus', kind: 'documentary', place: 'lead',
    query: 'common octopus aquarium',
    webQuery: 'octopus in aquarium tank photograph',
    caption: "A common octopus. Paul's keepers offered a mussel in one of two jars marked with flags.",
  },
  {
    article: 'Paul the octopus', kind: 'humour', place: 'end', custom: true,
    query: 'two glass jars',
    webQuery: 'two jars side by side',
    generate: 'Two plain glass jars side by side, each with a small flag shape that is not a real national flag, illustration, no text',
    caption: "Illustration. After eight matches the aquarium retired him from what it called the official oracle business.",
  },

  // ----------------------------------------------------- Sagrada Familia
  {
    article: 'Sagrada Familia', kind: 'documentary', place: 'lead',
    query: 'Sagrada Familia Barcelona towers cranes',
    webQuery: 'Sagrada Familia under construction photograph',
    caption: "The Sagrada Familia. Gaudi worked on it from 1883 until 1926. In 2025 the chairman would not pick a year inside a range of ten to twelve.",
  },
  {
    article: 'Sagrada Familia', kind: 'humour', place: 'end', custom: true,
    query: 'construction crane on a church tower',
    webQuery: 'sagrada familia crane',
    generate: 'A tall church tower with scaffolding still on the upper storeys, illustration, no text',
    caption: "Illustration. The hope for 2026 is the outside of one tower, 172.5 metres, not the finished church.",
  },

  // ---------------------------------------------------------- Endurance
  {
    article: 'Endurance', kind: 'documentary', place: 'lead',
    query: 'Endurance ship Frank Hurley Weddell Sea',
    webQuery: 'Shackleton Endurance trapped in ice Hurley photograph',
    caption: "Endurance in the ice, photographed by Frank Hurley before the ship was crushed in 1915. The wreck was found on 5 March 2022.",
  },
  {
    article: 'Endurance', kind: 'humour', place: 'end', custom: true,
    query: 'nautical chart pencil mark',
    webQuery: 'old nautical logbook',
    generate: 'An old logbook page with one position marked, and a second mark a short distance away, illustration, no readable modern text',
    caption: "Illustration. The wreck lay about four miles south of the position Captain Worsley wrote down in 1915.",
  },

  // --------------------------------------------------- Inky the octopus
  {
    article: 'Inky the octopus', kind: 'documentary', place: 'lead',
    query: 'octopus aquarium tank',
    webQuery: 'octopus in a tank photograph',
    caption: "An octopus in a tank. The lid on Inky's tank at the National Aquarium of New Zealand had been left slightly ajar.",
  },
  {
    article: 'Inky the octopus', kind: 'humour', place: 'end', custom: true,
    query: 'floor drain pipe',
    webQuery: 'aquarium floor drain',
    generate: 'A round floor drain beside wet tracks, plain illustration, no text, no logos',
    caption: "Illustration. The drain was about 15 centimetres wide. The manager said he did not leave a message.",
  },

  // ----------------------------------------- Charge of the Light Brigade
  {
    article: 'Charge of the Light Brigade', kind: 'documentary', place: 'lead',
    query: 'Charge of the Light Brigade 1854 print',
    webQuery: 'Charge of the Light Brigade Crimea engraving',
    caption: "A nineteenth-century print of the charge at Balaklava. The order was to stop the Russians carrying off guns. The brigade charged the battery it could see.",
  },
  {
    article: 'Charge of the Light Brigade', kind: 'humour', place: 'end', custom: true,
    query: 'valley between hills',
    webQuery: 'valley artillery position illustration',
    generate: 'A valley seen from the floor, with guns at the far end and a small figure on a height looking the other way, plain illustration, no text',
    caption: "Illustration. Raglan could see the captured guns. From the valley, the battery in front was the one in view.",
  },

  // -------------------------------------------------------- Christmas truce
  {
    article: 'Christmas truce', kind: 'documentary', place: 'lead',
    query: 'Christmas truce 1914 British German soldiers photograph',
    webQuery: 'Christmas truce 1914 no mans land photograph',
    caption: "British and German soldiers in no man's land, Christmas 1914. The Imperial War Museum says the truce was not observed in every sector.",
  },
  {
    article: 'Christmas truce', kind: 'humour', place: 'end', custom: true,
    query: 'old leather football',
    webQuery: '1914 football',
    generate: 'A single scuffed leather football on bare mud, no players, illustration',
    caption: "Illustration. Ernie Williams, interviewed by the museum, said it was a proper football and that they did not form teams.",
  },

  // ----------------------------------------------------------------- SPAM
  {
    article: 'SPAM', kind: 'documentary', place: 'lead',
    query: 'SPAM can Hormel',
    webQuery: 'vintage Spam can photograph',
    caption: "A can of SPAM. Hormel says the first can left the line on 5 July 1937.",
  },
  {
    article: 'SPAM', kind: 'humour', place: 'end', custom: true,
    query: 'contest prize ribbon',
    webQuery: 'one hundred dollar bill vintage',
    generate: 'A plain blue tin and a small card marked 100, still life illustration, no logos, no brand name',
    caption: "Illustration. Ken Daigneau won 100 dollars for the name. The eighty-fifth-birthday release does not say what the letters stand for.",
  },

  // --------------------------------------------------------------- Martha
  {
    article: 'Martha', kind: 'documentary', place: 'lead',
    query: 'Martha passenger pigeon Smithsonian specimen',
    webQuery: 'Martha last passenger pigeon mount photograph',
    caption: "Martha, the last known passenger pigeon, mounted at the Smithsonian after she died on 1 September 1914.",
  },
  {
    article: 'Martha', kind: 'humour', place: 'end', custom: true,
    query: 'block of ice freight',
    webQuery: 'large block of ice',
    generate: 'A rectangular block of ice on a railway baggage cart, plain illustration, no text',
    caption: "Illustration. The body was frozen into a 300-pound block of ice and sent by train.",
  },

  // ------------------------------------------------------------- Kon-Tiki
  {
    article: 'Kon-Tiki', kind: 'documentary', place: 'lead',
    query: 'Kon-Tiki balsa raft',
    webQuery: 'Kon-Tiki raft photograph 1947',
    caption: "The Kon-Tiki raft. It left Callao on 28 April 1947 with six men and a parrot.",
  },
  {
    article: 'Kon-Tiki', kind: 'humour', place: 'end', custom: true,
    query: 'balsa wood logs lashed',
    webQuery: 'balsa raft logs',
    generate: 'Nine balsa logs lashed with rope, a small sail, open ocean, illustration, no text',
    caption: "Illustration. After 101 days the raft ran onto a reef. The Kon-Tiki Museum calls that an unconditional success.",
  },

  // ---------------------------------------------------- Vulcanized rubber
  {
    article: 'Vulcanized rubber', kind: 'documentary', place: 'lead',
    query: 'Charles Goodyear india rubber',
    webQuery: 'vulcanized rubber sheet',
    caption: "India-rubber. Goodyear's 1844 patent is rubber, sulphur, and white lead, heated to about 270 degrees Fahrenheit.",
  },
  {
    article: 'Vulcanized rubber', kind: 'humour', place: 'end', custom: true,
    query: 'white lead pigment powder',
    webQuery: 'lead white pigment',
    generate: 'Three small heaps of material, a dark gum, a yellow powder, and a white powder, still life, no labels',
    caption: "Illustration. The patent says he is not claiming the sulphur. He already had that, from 1839. This one adds the white lead.",
  },

  // -------------------------------------------------------- Cardiff Giant
  {
    article: 'Cardiff Giant', kind: 'documentary', place: 'lead',
    query: 'Cardiff Giant Farmers Museum Cooperstown',
    webQuery: 'Cardiff Giant gypsum statue photograph',
    caption: "The Cardiff Giant, a gypsum figure Fenimore Farm calls America's Greatest Hoax. The farm bought it in 1947.",
  },
  {
    article: 'Cardiff Giant', kind: 'humour', place: 'end', custom: true,
    query: 'gypsum block quarry',
    webQuery: 'gypsum stone block',
    generate: 'A rough block of pale stone beside a carved foot, barn interior, illustration, no text',
    caption: "Illustration. George Hull started from a five-ton block of gypsum and a verse in Genesis.",
  },

  // ---------------------------------------------------- Year 2000 problem
  {
    article: 'Year 2000 problem', kind: 'documentary', place: 'lead',
    query: 'year 2000 computer mainframe',
    webQuery: 'Y2K computer room 1999 photograph',
    caption: "A computer room of the sort the year-2000 work was done in. The GAO says 99.9 percent of federal mission-critical systems were reported compliant by December 1999.",
  },
  {
    article: 'Year 2000 problem', kind: 'humour', place: 'end', custom: true,
    query: 'calendar page 1900',
    webQuery: 'calendar year 1900',
    generate: 'A claim form with the year printed as 1900, plain illustration, no logos, no personal names',
    caption: "Illustration. Medicare contractors received claims dated 1900 or 2099. By mid-February there were at least 50,475 of them.",
  },

  // ------------------------------------------------------------ Saccharin
  {
    article: 'Saccharin', kind: 'documentary', place: 'lead',
    query: 'saccharin crystals sweetener',
    webQuery: 'saccharin crystals photograph',
    caption: "Saccharin crystals. Fahlberg's 1885 patent says a diluted solution tastes like saturated cane sugar.",
  },
  {
    article: 'Saccharin', kind: 'humour', place: 'end', custom: true,
    query: 'coal tar laboratory flask',
    webQuery: 'coal tar sample jar',
    generate: 'A small laboratory flask of dark liquid beside a dish of white crystals, illustration, no text',
    caption: "Illustration. The starting material the patent names, for reasons of cost, is toluene from coal-tar.",
  },

  // ------------------------------------------------ The Landlord's Game
  {
    article: "The Landlord's Game", kind: 'documentary', place: 'lead',
    query: "Landlord's Game Lizzie Magie board",
    webQuery: "Landlord's Game 1904 board photograph",
    caption: "A board for The Landlord's Game. Lizzie J. Magie's 1904 patent starts each player with five hundred dollars.",
  },
  {
    article: "The Landlord's Game", kind: 'humour', place: 'end', custom: true,
    query: 'board game corner jail space',
    webQuery: 'old board game jail corner',
    generate: 'A square game board corner marked only with a small barred window, no brand name, illustration',
    caption: "Illustration. A player who refuses the rules goes to jail until a double or a fifty-dollar fine.",
  },

  // ------------------------------------------ Mike the headless chicken
  {
    article: 'Mike the headless chicken', kind: 'documentary', place: 'lead',
    query: 'Mike the headless chicken Fruita',
    webQuery: 'Miracle Mike headless chicken photograph',
    caption: "Mike, photographed after 10 September 1945. He lived eighteen months.",
  },
  {
    article: 'Mike the headless chicken', kind: 'humour', place: 'end', custom: true,
    query: 'glass eyedropper',
    webQuery: 'medicine dropper',
    generate: 'A glass dropper and a small syringe on a motel bedside table, illustration, no text',
    caption: "Illustration. He was fed with a dropper. The night he died, the syringe that cleared his throat had been left at the sideshow.",
  },

  // --------------------------------------------------------------- Ouija
  {
    article: 'Ouija', kind: 'documentary', place: 'lead',
    query: 'Ouija board planchette',
    webQuery: 'early Ouija board photograph',
    caption: "A talking board. Elijah Bond's 1891 patent calls it an Ouija or Egyptian luck-board, operated by the touch of the hand.",
  },
  {
    article: 'Ouija', kind: 'humour', place: 'end', custom: true,
    query: 'felt furniture pad',
    webQuery: 'felt pad on a wooden leg',
    generate: 'A small round table with four short legs, felt under each foot, and a pointed tongue, plain illustration, no letters',
    caption: "Illustration. The patent puts felt on the feet so the table will not scratch the board or creak.",
  },

  // ------------------------------------------------------ Hitler diaries
  {
    article: 'Hitler diaries', kind: 'documentary', place: 'lead',
    query: 'Stern magazine 1983 press conference',
    webQuery: 'Hitler diaries Stern 1983 photograph',
    caption: "The volumes sold to Stern as Hitler's diaries. A Hamburg court, on 8 July 1985, treated them as forgeries.",
  },
  {
    article: 'Hitler diaries', kind: 'humour', place: 'end', custom: true,
    query: 'stack of blank notebooks',
    webQuery: 'stack of old notebooks',
    generate: 'Sixty thin notebooks in a stack, plain covers, illustration, no readable writing, no symbols',
    caption: "Illustration. There were sixty volumes. Before sentencing, Kujau told reporters he had written them.",
  },

  // ---------------------------------------------------- Whaleship Essex
  {
    article: 'Whaleship Essex', kind: 'documentary', place: 'lead',
    query: 'sperm whale Nantucket whaler',
    webQuery: 'sperm whale nineteenth century whaling print',
    caption: "A sperm whale and a whaleship. On 20 November 1820 a whale struck the Essex twice.",
  },
  {
    article: 'Whaleship Essex', kind: 'humour', place: 'end', custom: true,
    query: 'open whaleboat pacific',
    webQuery: 'whaleboat at sea',
    generate: 'Three small open boats on a large empty sea, illustration, no text',
    caption: "Illustration. Chase's answer to the captain, who had not seen the attack, was that they had been stove by a whale.",
  },

  // ------------------------------------------------------------ Axolotl
  {
    article: 'Axolotl', kind: 'documentary', place: 'lead',
    query: 'Ambystoma mexicanum axolotl',
    webQuery: 'axolotl external gills photograph',
    caption: "An axolotl. The adult keeps the external gills. The species is endemic to Lake Xochimilco.",
  },
  {
    article: 'Axolotl', kind: 'humour', place: 'end', custom: true,
    query: 'Pennsylvania creek',
    webQuery: 'Walnut Creek Pennsylvania',
    generate: 'A small salamander with feathery gills in a clear North American creek, illustration, no text',
    caption: "Illustration. In 2025 one adult female was found in Walnut Creek, Pennsylvania, and removed. The Geological Survey calls it a likely aquarium release.",
  },

  // --------------------------------------------- Donation of Constantine
  {
    article: 'Donation of Constantine', kind: 'documentary', place: 'lead',
    query: 'Donation of Constantine medieval manuscript',
    webQuery: 'Donation of Constantine fresco',
    caption: "A medieval image of Constantine and the pope. Lorenzo Valla's 1440 treatise argues the charter is a forgery.",
  },
  {
    article: 'Donation of Constantine', kind: 'humour', place: 'end', custom: true,
    query: 'medieval Latin manuscript page',
    webQuery: 'latin charter manuscript',
    generate: 'A Latin manuscript page with one word circled, the word not legible as modern text, illustration',
    caption: "Illustration. One word Valla stops on is satraps. Another is a city that, on the document's own date, had not been founded.",
  },

  // ------------------------------------------------------- Rosetta Stone
  {
    article: 'Rosetta Stone', kind: 'documentary', place: 'lead',
    query: 'Rosetta Stone British Museum',
    webQuery: 'Rosetta Stone photograph',
    caption: "The Rosetta Stone. The decree of 196 BC is written in hieroglyphs, Demotic, and Greek.",
  },
  {
    article: 'Rosetta Stone', kind: 'humour', place: 'end', custom: true,
    query: 'broken stone slab inscription',
    webQuery: 'broken stela fragment',
    generate: 'A broken dark stone with three bands of writing, the top band cut off at an angle, illustration, the letters not readable',
    caption: "Illustration. The British Museum says a copy was to go to every sizeable temple. Whether that happened is unknown.",
  },

  // -------------------------------------------------- Voynich manuscript
  {
    article: 'Voynich manuscript', kind: 'documentary', place: 'lead',
    query: 'Voynich manuscript plant page',
    webQuery: 'Voynich manuscript Beinecke page photograph',
    caption: "A page of the Voynich manuscript, Beinecke MS 408. The script is unidentified.",
  },
  {
    article: 'Voynich manuscript', kind: 'humour', place: 'end', custom: true,
    query: 'unread letter pile',
    webQuery: 'stack of unopened letters',
    generate: 'A tall stack of unopened letters on a library desk, illustration, no readable addresses',
    caption: "Illustration. The library that owns the book says it cannot answer individual theories, because of the volume of proposals.",
  },

  // -------------------------------------------------------- Hope Diamond
  {
    article: 'Hope Diamond', kind: 'documentary', place: 'lead',
    query: 'Hope Diamond Smithsonian',
    webQuery: 'Hope Diamond necklace photograph',
    caption: "The Hope Diamond. Taken out of its setting in 1974, it weighed 45.52 carats, not the 44.5 long reported.",
  },
  {
    article: 'Hope Diamond', kind: 'humour', place: 'end', custom: true,
    query: 'plain brown paper package',
    webQuery: 'brown paper parcel string',
    generate: 'A plain brown paper parcel tied with string, on a museum table, illustration, no labels',
    caption: "Illustration. On 10 November 1958 the diamond arrived by registered mail in a plain brown package, insured for one million dollars.",
  },

  // ----------------------------------------------------------- Sputnik 1
  {
    article: 'Sputnik 1', kind: 'documentary', place: 'lead',
    query: 'Sputnik 1 satellite',
    webQuery: 'Sputnik 1 sphere photograph',
    caption: "Sputnik 1. NASA describes it as about the size of a beach ball: 58 centimetres, 83.6 kilograms.",
  },
  {
    article: 'Sputnik 1', kind: 'humour', place: 'end', custom: true,
    query: 'beach ball',
    webQuery: 'plain beach ball',
    generate: 'A polished metal sphere the size of a beach ball with four thin antennae, plain illustration, no flags, no text',
    caption: "Illustration. The American satellite planned for that season was to weigh 3.5 pounds. On 6 December, Vanguard TV-3 exploded on the pad.",
  },

  // ----------------------------------------------------- Great Moon Hoax
  {
    article: 'Great Moon Hoax', kind: 'documentary', place: 'lead',
    query: 'Great Moon Hoax 1835 lunar animals print',
    webQuery: '1835 moon hoax bat people print',
    caption: "The 1835 print deposited for copyright as discoveries by Sir John Herschel. The Library of Congress catalogue calls the beings imaginary.",
  },
  {
    article: 'Great Moon Hoax', kind: 'humour', place: 'end', custom: true,
    query: 'copyright deposit stamp',
    webQuery: 'nineteenth century copyright notice',
    generate: 'A printed picture of a winged figure and a unicorn on a cratered ground, with a clerk stamp in the corner, the stamp not readable, illustration',
    caption: "Illustration. Benjamin Henry Day deposited it on 29 August 1835 with the Clerk of the Southern District of New York.",
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

  // -------------------------------------------------------------------- 10,000 Year Clock
  {
    article: '10,000 Year Clock', kind: 'documentary', place: 'lead',
    query: '10000 year clock Long Now mechanism photograph',
    webQuery: 'long now clock 10000 year photograph',
    caption: "Part of the 10,000 Year Clock mechanism, being built inside a mountain in West Texas.",
  },
  {
    article: '10,000 Year Clock', kind: 'humour', place: 'end', custom: true,
    query: 'giant clock inside mountain illustration',
    webQuery: '10000 year clock meme funny',
    generate: 'A colossal mechanical clock built into the inside of a mountain, tiny visitors dwarfed beside an enormous gear, epic scale illustration, warm cinematic lighting',
    caption: "Illustration. Its continued operation over ten millennia depends on people actually bothering to visit and wind it.",
  },

  // -------------------------------------------------------------------------------- Baby cage
  {
    article: 'Baby cage', kind: 'documentary', place: 'lead',
    query: 'baby cage window 1930s photograph historical',
    webQuery: 'baby cage window photograph 1930s',
    caption: "A baby cage, bolted to an outside windowsill, photographed in the 1930s.",
  },
  {
    article: 'Baby cage', kind: 'humour', place: 'end', custom: true,
    query: 'patent drawing baby cage illustration',
    webQuery: 'baby cage meme funny',
    generate: 'A formal, deadpan 1920s-style patent diagram of a wire cage attached to a window ledge, technical labels and dotted lines, cross-section illustration style',
    caption: "Illustration in the style of the real 1922 patent. The London County Council issued these to residents on purpose.",
  },

  // ------------------------------------------------------------------ Boston Tea Party disguises
  {
    article: 'Boston Tea Party disguises', kind: 'documentary', place: 'lead',
    query: 'Boston Tea Party painting historical',
    webQuery: 'boston tea party painting 1773',
    caption: "A depiction of the Boston Tea Party, December 1773.",
  },
  {
    article: 'Boston Tea Party disguises', kind: 'humour', place: 'end', custom: true,
    query: 'colonial men soot blankets illustration',
    webQuery: 'boston tea party disguise meme funny',
    generate: 'A group of colonial men hastily smearing soot on their faces and wrapping blankets around themselves by lantern light before heading to the harbour, historical illustration style',
    caption: "Illustration. Several participants were recognised by acquaintances despite the disguise.",
  },

  // ---------------------------------------------------------------- World's first speeding ticket
  {
    article: "World's first speeding ticket", kind: 'documentary', place: 'lead',
    query: 'early motor car 1890s photograph',
    webQuery: 'early motor car 1896 photograph',
    caption: "An early motor car of the type Walter Arnold was driving when he was clocked at 8 mph in 1896.",
  },
  {
    article: "World's first speeding ticket", kind: 'humour', place: 'end', custom: true,
    query: 'policeman bicycle chase car illustration',
    webQuery: 'first speeding ticket meme funny',
    generate: 'A Victorian policeman pedalling furiously on a bicycle to catch up with a slow, sputtering early motor car, comic period illustration style',
    caption: "Illustration. The car was going 8 mph. The legal limit was 2.",
  },

  // ------------------------------------------------------------------------------------ Napoleon's rabbit hunt
  {
    article: "Napoleon's rabbit hunt", kind: 'documentary', place: 'lead',
    query: 'Napoleon Bonaparte hunting party painting',
    webQuery: 'napoleon hunting party painting',
    caption: "A depiction of an imperial hunting party of Napoleon's era.",
  },
  {
    article: "Napoleon's rabbit hunt", kind: 'humour', place: 'end', custom: true,
    query: 'emperor fleeing rabbits illustration comic',
    webQuery: 'napoleon rabbit hunt meme funny',
    generate: 'A startled French emperor in full military dress fleeing toward his carriage as a horde of determined rabbits charges after him across a field, comic historical illustration style',
    caption: "Illustration of the widely repeated anecdote. The article's talk page flags this one as more thinly sourced than most.",
  },

  // ----------------------------------------------------------------------------------------- Great Wall of China visibility myth
  {
    article: 'Great Wall of China visibility myth', kind: 'documentary', place: 'lead',
    query: 'Great Wall of China photograph',
    webQuery: 'great wall of china photograph',
    caption: "The Great Wall of China, typically 4 to 5 metres wide — narrower than the myth about seeing it from orbit suggests.",
  },
  {
    article: 'Great Wall of China visibility myth', kind: 'humour', place: 'end', custom: true,
    query: 'astronaut squinting window space illustration',
    webQuery: 'great wall space meme funny',
    generate: 'An astronaut squinting hard through a spacecraft window at a barely visible thin line on the distant Earth below, straining to see it, illustration style, gentle humour',
    caption: "Illustration. Multiple astronauts, including China's own first, have said plainly that they could not see it.",
  },
];
