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
];
