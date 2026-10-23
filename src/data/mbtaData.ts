import { SubwayLine, SubwayStation } from '../types';

export const MBTA_COLORS: Record<SubwayLine, string> = {
  Red: '#DA291C',
  Orange: '#ED8B00',
  Green: '#00843D',
  Blue: '#003DA5',
};

export const MBTA_STATIONS: SubwayStation[] = [
  // RED LINE
  { id: 'alewife', name: 'Alewife', lines: ['Red'], coords: [42.3954, -71.1425] },
  { id: 'davis', name: 'Davis', lines: ['Red'], coords: [42.3967, -71.1218], nearbyUniversities: ['Tufts University'] },
  { id: 'porter', name: 'Porter', lines: ['Red'], coords: [42.3884, -71.1191], nearbyUniversities: ['Lesley University'] },
  { id: 'harvard', name: 'Harvard', lines: ['Red'], coords: [42.3734, -71.1189], nearbyUniversities: ['Harvard University'] },
  { id: 'central', name: 'Central', lines: ['Red'], coords: [42.3653, -71.1034] },
  { id: 'kendall', name: 'Kendall/MIT', lines: ['Red'], coords: [42.3625, -71.0862], nearbyUniversities: ['MIT'] },
  { id: 'charles', name: 'Charles/MGH', lines: ['Red'], coords: [42.3612, -71.0706] },
  { id: 'park_st', name: 'Park Street', lines: ['Red', 'Green'], coords: [42.3564, -71.0624], nearbyUniversities: ['Suffolk Univ', 'Emerson College'] },
  { id: 'dtx', name: 'Downtown Crossing', lines: ['Red', 'Orange'], coords: [42.3555, -71.0605] },
  { id: 'south_station', name: 'South Station', lines: ['Red'], coords: [42.3523, -71.0552] },
  { id: 'broadway', name: 'Broadway', lines: ['Red'], coords: [42.3426, -71.0569] },
  { id: 'andrew', name: 'Andrew', lines: ['Red'], coords: [42.3302, -71.0577] },
  { id: 'jfk_umass', name: 'JFK/UMass', lines: ['Red'], coords: [42.3206, -71.0524], nearbyUniversities: ['UMass Boston'] },

  // ORANGE LINE
  { id: 'oak_grove', name: 'Oak Grove', lines: ['Orange'], coords: [42.4367, -71.0711] },
  { id: 'assembly', name: 'Assembly', lines: ['Orange'], coords: [42.3928, -71.0772] },
  { id: 'community_college', name: 'Community College', lines: ['Orange'], coords: [42.3736, -71.0695], nearbyUniversities: ['Bunker Hill CC'] },
  { id: 'north_station', name: 'North Station', lines: ['Orange', 'Green'], coords: [42.3656, -71.0602] },
  { id: 'haymarket', name: 'Haymarket', lines: ['Orange', 'Green'], coords: [42.3630, -71.0583] },
  { id: 'state', name: 'State', lines: ['Orange', 'Blue'], coords: [42.3589, -71.0576] },
  { id: 'chinatown', name: 'Chinatown', lines: ['Orange'], coords: [42.3525, -71.0628], nearbyUniversities: ['Tufts Medical'] },
  { id: 'tufts_med', name: 'Tufts Medical Ctr', lines: ['Orange'], coords: [42.3497, -71.0638], nearbyUniversities: ['Tufts Univ School of Med'] },
  { id: 'back_bay', name: 'Back Bay', lines: ['Orange'], coords: [42.3474, -71.0757] },
  { id: 'mass_ave', name: 'Mass Ave', lines: ['Orange'], coords: [42.3415, -71.0834] },
  { id: 'ruggles', name: 'Ruggles', lines: ['Orange'], coords: [42.3364, -71.0890], nearbyUniversities: ['Northeastern Univ', 'Wentworth'] },
  { id: 'roxbury_xing', name: 'Roxbury Crossing', lines: ['Orange'], coords: [42.3314, -71.0955] },
  { id: 'jackson_sq', name: 'Jackson Square', lines: ['Orange'], coords: [42.3231, -71.0996] },
  { id: 'forest_hills', name: 'Forest Hills', lines: ['Orange'], coords: [42.3005, -71.1137] },

  // GREEN LINE (Trunk & Core branches)
  { id: 'science_park', name: 'Science Park', lines: ['Green'], coords: [42.3667, -71.0676] },
  { id: 'govt_ctr', name: 'Govt Center', lines: ['Green', 'Blue'], coords: [42.3597, -71.0592] },
  { id: 'boylston', name: 'Boylston', lines: ['Green'], coords: [42.3530, -71.0646], nearbyUniversities: ['Emerson College'] },
  { id: 'arlington', name: 'Arlington', lines: ['Green'], coords: [42.3519, -71.0709] },
  { id: 'copley', name: 'Copley', lines: ['Green'], coords: [42.3499, -71.0774] },
  { id: 'hynes', name: 'Hynes Convention Ctr', lines: ['Green'], coords: [42.3479, -71.0878], nearbyUniversities: ['Berklee College of Music'] },
  { id: 'kenmore', name: 'Kenmore', lines: ['Green'], coords: [42.3489, -71.0952], nearbyUniversities: ['Boston University (East)'] },
  { id: 'bu_central', name: 'BU Central', lines: ['Green'], coords: [42.3501, -71.1069], nearbyUniversities: ['Boston University'] },
  { id: 'bu_west', name: 'BU West', lines: ['Green'], coords: [42.3510, -71.1160], nearbyUniversities: ['Boston University'] },
  { id: 'harvard_ave', name: 'Harvard Ave (Allston)', lines: ['Green'], coords: [42.3502, -71.1306] },
  { id: 'museum_fa', name: 'Museum of Fine Arts', lines: ['Green'], coords: [42.3394, -71.0945], nearbyUniversities: ['Northeastern', 'MassArt', 'SMFA'] },
  { id: 'longwood', name: 'Longwood Medical', lines: ['Green'], coords: [42.3390, -71.1060], nearbyUniversities: ['Harvard Medical School'] },
  { id: 'bc_res', name: 'Boston College', lines: ['Green'], coords: [42.3351, -71.1665], nearbyUniversities: ['Boston College'] },

  // BLUE LINE
  { id: 'bowdoin', name: 'Bowdoin', lines: ['Blue'], coords: [42.3614, -71.0620] },
  { id: 'aquarium', name: 'Aquarium', lines: ['Blue'], coords: [42.3598, -71.0517] },
  { id: 'maverick', name: 'Maverick', lines: ['Blue'], coords: [42.3691, -71.0395] },
  { id: 'airport', name: 'Airport', lines: ['Blue'], coords: [42.3743, -71.0304] },
  { id: 'orient_heights', name: 'Orient Heights', lines: ['Blue'], coords: [42.3869, -71.0047] },
  { id: 'wonderland', name: 'Wonderland', lines: ['Blue'], coords: [42.4134, -70.9917] },
];

// Subway lines polylines for Map rendering
export const MBTA_LINE_PATHS: { line: SubwayLine; path: [number, number][] }[] = [
  {
    line: 'Red',
    path: [
      [42.3954, -71.1425], // Alewife
      [42.3967, -71.1218], // Davis
      [42.3884, -71.1191], // Porter
      [42.3734, -71.1189], // Harvard
      [42.3653, -71.1034], // Central
      [42.3625, -71.0862], // Kendall/MIT
      [42.3612, -71.0706], // Charles/MGH
      [42.3564, -71.0624], // Park St
      [42.3555, -71.0605], // DTX
      [42.3523, -71.0552], // South Station
      [42.3426, -71.0569], // Broadway
      [42.3302, -71.0577], // Andrew
      [42.3206, -71.0524], // JFK/UMass
    ],
  },
  {
    line: 'Orange',
    path: [
      [42.4367, -71.0711], // Oak Grove
      [42.3928, -71.0772], // Assembly
      [42.3736, -71.0695], // Community College
      [42.3656, -71.0602], // North Station
      [42.3630, -71.0583], // Haymarket
      [42.3589, -71.0576], // State
      [42.3555, -71.0605], // DTX
      [42.3525, -71.0628], // Chinatown
      [42.3497, -71.0638], // Tufts Med
      [42.3474, -71.0757], // Back Bay
      [42.3415, -71.0834], // Mass Ave
      [42.3364, -71.0890], // Ruggles
      [42.3314, -71.0955], // Roxbury Crossing
      [42.3231, -71.0996], // Jackson Sq
      [42.3005, -71.1137], // Forest Hills
    ],
  },
  {
    line: 'Green',
    path: [
      [42.3667, -71.0676], // Science Park
      [42.3656, -71.0602], // North Station
      [42.3630, -71.0583], // Haymarket
      [42.3597, -71.0592], // Govt Center
      [42.3564, -71.0624], // Park St
      [42.3530, -71.0646], // Boylston
      [42.3519, -71.0709], // Arlington
      [42.3499, -71.0774], // Copley
      [42.3479, -71.0878], // Hynes
      [42.3489, -71.0952], // Kenmore
      [42.3501, -71.1069], // BU Central
      [42.3510, -71.1160], // BU West
      [42.3502, -71.1306], // Harvard Ave
      [42.3351, -71.1665], // BC
    ],
  },
  {
    line: 'Blue',
    path: [
      [42.3614, -71.0620], // Bowdoin
      [42.3597, -71.0592], // Govt Center
      [42.3589, -71.0576], // State
      [42.3598, -71.0517], // Aquarium
      [42.3691, -71.0395], // Maverick
      [42.3743, -71.0304], // Airport
      [42.3869, -71.0047], // Orient Heights
      [42.4134, -70.9917], // Wonderland
    ],
  },
];
