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
];
