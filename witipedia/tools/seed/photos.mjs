/**
 * Picture slots. One entry per image we want in the encyclopedia.
 *
 * `query` is searched on Wikimedia Commons, which is the right source here for
 * three reasons: the licences are free, every file carries its author, and the
 * provenance is checkable. Captions are written to the same rule as the prose:
 * the joke has to be in the true part.
 */
export const photoSlots = [
  {
    article: 'Great Emu War', place: 'lead', query: 'Dromaius novaehollandiae emu',
    caption: "An emu. Roughly 20,000 of them saw off two Lewis guns, a truck and the Royal Australian Artillery in 1932.",
  },
  {
    article: 'Great Emu War', place: 'section:The campaign', query: 'Lewis gun machine gun',
    caption: "A Lewis gun. It was designed for men advancing in lines, and the emus declined to advance in lines.",
  },
  {
    article: 'Wombat', place: 'lead', query: 'Vombatus ursinus wombat',
    caption: "A common wombat. Built like a footstool, runs at 40 km/h.",
  },
  {
    article: 'Wombat', place: 'section:Cubes', query: 'wombat scat faeces cube',
    caption: "Wombat droppings. The corners are formed inside the animal over several days, by two stiff and two flexible bands of intestine.",
  },
  {
    article: 'Mantis shrimp', place: 'lead', query: 'Odontodactylus scyllarus peacock mantis shrimp',
    caption: "A peacock mantis shrimp. The club accelerates at up to 10,000 g; the eyes above it are about ten times worse than yours at telling similar colours apart.",
  },
  {
    article: 'Platypus', place: 'lead', query: 'Ornithorhynchus anatinus platypus',
    caption: "A platypus. The first specimen to reach Britain was examined for stitches.",
  },
  {
    article: 'Platypus', place: 'section:Venom', query: 'platypus spur anatomy',
    caption: "The male's hind-leg spur. The venom will not kill you, and will not respond much to morphine either.",
  },
  {
    article: 'Tardigrade', place: 'lead', query: 'Tardigrada scanning electron micrograph water bear',
    caption: "A tardigrade, around half a millimetre long. Survives the vacuum of space, dies after two days at 37.8 °C.",
  },
  {
    article: 'Boaty McBoatface', place: 'lead', query: 'Autosub Long Range Boaty McBoatface',
    caption: "Boaty McBoatface. The name was the joke; the Orkney Passage measurements were not.",
  },
  {
    article: 'Boaty McBoatface', place: 'section:The poll', query: 'RRS Sir David Attenborough ship',
    caption: "RRS <i>Sir David Attenborough</i>, the ship 124,109 people voted to call something else.",
  },
  {
    article: 'Project Pigeon', place: 'lead', query: 'homing pigeon Columba livia domestica',
    caption: "A homing pigeon. Thirty-two of them hold the Dickin Medal for gallantry. One cat does.",
  },
  {
    article: 'Project Pigeon', place: 'section:Context: other decorated birds', query: 'Cher Ami pigeon',
    caption: "Cher Ami, who delivered the message after being shot through the breast, and was decorated by France for it.",
  },
  {
    article: 'Ig Nobel Prize', place: 'lead', query: 'Ig Nobel Prize ceremony',
    caption: "An Ig Nobel ceremony. The prizes are handed over by actual Nobel laureates.",
  },
];
