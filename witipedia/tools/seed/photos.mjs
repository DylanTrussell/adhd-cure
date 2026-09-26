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
];
