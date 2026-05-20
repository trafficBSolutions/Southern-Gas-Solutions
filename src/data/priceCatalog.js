const priceCatalog = [
  { sku: 'SGS-001', name: 'Standard diagnostic / site visit', shortName: 'Service Call', category: 'Repair', unit: 'Base', jobType: 'Repair', laborHrs: 1, crew: 1, materialAllow: 25, notes: 'Trip, inspect, basic diagnosis. Repairs priced separately.', northGA: 520, metroATL: 695, extended: 895 },
  { sku: 'SGS-002', name: 'Emergency response 24/7 dispatch', shortName: 'Emergency Call', category: 'Emergency', unit: 'Base', jobType: 'Emergency', laborHrs: 1.5, crew: 1, materialAllow: 35, notes: 'After-hours multiplier applies.', northGA: 625, metroATL: 800, extended: 1000 },
  { sku: 'SGS-003', name: 'Gas pressure test / leak check', shortName: 'Pressure Test', category: 'Inspection', unit: 'Each', jobType: 'Inspection', laborHrs: 2, crew: 1, materialAllow: 45, notes: 'Does not include major repair.', northGA: 730, metroATL: 905, extended: 1105 },
  { sku: 'SGS-004', name: 'Minor accessible leak repair', shortName: 'Leak Repair', category: 'Repair', unit: 'Each', jobType: 'Repair', laborHrs: 2.5, crew: 1, materialAllow: 95, notes: 'Accessible repair only; concealed damage extra.', northGA: 907, metroATL: 1082, extended: 1282 },
  { sku: 'SGS-005', name: 'Add one standard gas appliance drop', shortName: 'Gas Drop', category: 'Install', unit: 'Per Drop', jobType: 'Install', laborHrs: 3, crew: 2, materialAllow: 175, notes: 'Accessible run, standard fittings.', northGA: 1657, metroATL: 1832, extended: 2032 },
  { sku: 'SGS-006', name: 'Tee/cap future gas drop', shortName: 'Future Drop', category: 'Install', unit: 'Per Drop', jobType: 'Install', laborHrs: 1.5, crew: 2, materialAllow: 85, notes: 'Add during rough-in or main line run.', northGA: 975, metroATL: 1150, extended: 1350 },
  { sku: 'SGS-007', name: '1/2"-1" black iron main line install', shortName: 'Black Iron Main', category: 'Install', unit: 'Per Ft', jobType: 'Install', laborHrs: 0.18, crew: 2, materialAllow: 6, notes: 'Labor/material base per foot; adjust for pipe size/access.', northGA: 374, metroATL: 549, extended: 749 },
  { sku: 'SGS-008', name: 'Generator gas line tie-in and regulator setup', shortName: 'Generator Tie-In', category: 'Generator', unit: 'Each', jobType: 'Generator', laborHrs: 5, crew: 2, materialAllow: 450, notes: 'Final load sizing and regulator needs may change price.', northGA: 2848, metroATL: 3023, extended: 3223 },
  { sku: 'SGS-009', name: 'Tankless water heater gas tie-in only', shortName: 'Tankless Tie-In', category: 'Tankless', unit: 'Each', jobType: 'Tankless', laborHrs: 4, crew: 2, materialAllow: 350, notes: 'Does not include water/venting unless added.', northGA: 2320, metroATL: 2495, extended: 2695 },
  { sku: 'SGS-010', name: 'Gas log/fireplace drop', shortName: 'Gas Logs Drop', category: 'Install', unit: 'Each', jobType: 'Install', laborHrs: 4, crew: 2, materialAllow: 275, notes: 'Firebox access, valve, stub, cap/plug.', northGA: 2184, metroATL: 2359, extended: 2559 },
  { sku: 'SGS-011', name: 'Exterior grill/deck stub-out', shortName: 'Outdoor Grill Stub', category: 'Install', unit: 'Each', jobType: 'Install', laborHrs: 3, crew: 2, materialAllow: 225, notes: 'Includes valve/cap; quick-connect extra.', northGA: 1748, metroATL: 1923, extended: 2123 },
  { sku: 'SGS-012', name: 'Tie gas system into propane tank/regulator', shortName: 'Propane Tank Tie-In', category: 'Install', unit: 'Each', jobType: 'Install', laborHrs: 4, crew: 2, materialAllow: 450, notes: 'Tank/regulator requirements can vary.', northGA: 2502, metroATL: 2677, extended: 2877 },
  { sku: 'SGS-013', name: 'New construction rough-in, 1-2 drops', shortName: 'Rough-In Package Small', category: 'Install', unit: 'Package', jobType: 'Install', laborHrs: 8, crew: 2, materialAllow: 650, notes: 'Good for small home rough-in.', northGA: 4248, metroATL: 4423, extended: 4623 },
  { sku: 'SGS-014', name: 'New construction rough-in, 3-5 drops', shortName: 'Rough-In Package Medium', category: 'Install', unit: 'Package', jobType: 'Install', laborHrs: 16, crew: 2, materialAllow: 1200, notes: 'Common multi-appliance rough-in.', northGA: 8011, metroATL: 8186, extended: 8386 },
  { sku: 'SGS-015', name: 'Commercial job setup / docs / coordination', shortName: 'Commercial Mobilization', category: 'Commercial', unit: 'Base', jobType: 'Commercial', laborHrs: 2, crew: 1, materialAllow: 75, notes: 'Use with commercial scopes.', northGA: 784, metroATL: 959, extended: 1159 },
  { sku: 'SGS-016', name: 'Crew day for commercial gas work', shortName: 'Commercial Service Day', category: 'Commercial', unit: 'Per Day', jobType: 'Commercial', laborHrs: 8, crew: 2, materialAllow: 350, notes: 'Use as day-rate baseline.', northGA: 3702, metroATL: 3877, extended: 4077 },
  { sku: 'SGS-017', name: 'Permit and inspection allowance', shortName: 'Permit / Inspection', category: 'Inspection', unit: 'Allowance', jobType: 'Inspection', laborHrs: 0.5, crew: 1, materialAllow: 0, notes: 'Edit based on county/city.', northGA: 389, metroATL: 564, extended: 764 },
  { sku: 'SGS-018', name: 'Attic/crawlspace/drilling/coordination add', shortName: 'Difficult Access Add', category: 'Install', unit: 'Allowance', jobType: 'Install', laborHrs: 2.5, crew: 2, materialAllow: 50, notes: 'Use when job is tight, hot attic, drilling, or obstacles.', northGA: 1257, metroATL: 1432, extended: 1632 },
];

export const areaPricingZones = ['North GA / Local', 'Metro ATL', 'Extended Area'];
export const profitMargins = ['35%', '40%', '45%', '50%'];
export const jobStatuses = ['Quoted', 'Approved', 'Scheduled', 'In Progress', 'Completed', 'Invoiced', 'Paid'];
export const jobTypes = ['Install', 'Repair', 'Emergency', 'Commercial', 'Generator', 'Tankless', 'Inspection', 'Service Call'];

export function getPriceForArea(item, area) {
  switch (area) {
    case 'Metro ATL': return item.metroATL;
    case 'Extended Area': return item.extended;
    default: return item.northGA;
  }
}

export default priceCatalog;
