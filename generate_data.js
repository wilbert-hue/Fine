const fs = require('fs');
const path = require('path');

const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

function ts(arr) {
  const o = {};
  years.forEach((y, i) => { o[y] = arr[i]; });
  return o;
}

const valueData = {
  "U.S.": {
    "By Customer Type": {
      "Museums & Cultural Institutions":            ts([337.1, 352.7, 369.7, 388.5, 409.8, 433.4, 458.8, 485.0, 512.4]),
      "Private Collectors & Estates":               ts([530.2, 572.0, 617.7, 667.8, 723.5, 785.6, 853.3, 928.6, 1011.3]),
      "Auction Houses & Art Dealers":               ts([383.0, 412.6, 444.8, 480.1, 519.4, 564.1, 614.0, 669.6, 732.8]),
      "Corporate & Hospitality Clients":            ts([144.0, 155.5, 168.3, 182.9, 199.5, 218.5, 240.3, 264.6, 291.3]),
      "Artists & Studios":                          ts([109.2, 112.5, 116.1, 120.3, 125.2, 130.9, 137.4, 144.4, 151.8]),
      "Others (Restoration & Conservation Firms)":  ts([ 79.1,  81.2,  83.6,  86.3,  89.6,  93.0,  97.0, 101.4, 105.9])
    },
    "By Service Type": {
      "Packing & Crating Services":                 ts([373.5, 394.3, 417.4, 442.9, 470.7, 502.2, 537.2, 576.0, 618.5]),
      "Climate-Controlled Transportation":          ts([433.6, 457.0, 482.0, 509.5, 540.7, 575.6, 614.6, 657.5, 705.3]),
      "Art Installation & De-installation":         ts([218.4, 236.0, 255.4, 277.2, 301.8, 329.5, 360.1, 393.0, 428.6]),
      "Storage & Vaulting":                         ts([311.8, 338.3, 367.5, 399.5, 435.3, 475.4, 519.3, 568.3, 622.4]),
      "Insurance & Valuation Services":             ts([112.4, 116.4, 120.8, 125.4, 130.5, 136.1, 142.0, 148.4, 155.3]),
      "Courier & White-Glove Delivery":             ts([ 88.6,  96.1, 104.4, 113.7, 124.3, 136.6, 150.2, 165.0, 181.1]),
      "Others (Customs Brokerage, Digital Inventory)": ts([44.3, 48.3, 52.8, 57.9, 63.7, 70.2, 77.4, 85.4, 94.1])
    },
    "By Region": {
      "Northeast": ts([629.9, 668.7, 709.8, 753.8, 803.1, 858.0, 917.0, 980.8, 1051.0]),
      "Southeast": ts([405.1, 438.4, 475.7, 517.2, 563.3, 615.3, 673.2, 737.4, 808.4]),
      "Midwest":   ts([265.9, 274.2, 283.5, 294.3, 306.8, 321.2, 337.6, 355.4, 374.1]),
      "West":      ts([153.5, 165.2, 178.3, 193.1, 210.0, 229.3, 251.3, 275.8, 302.7]),
      "Southwest": ts([128.2, 139.9, 153.0, 167.6, 183.9, 201.8, 221.7, 244.2, 269.3])
    }
  }
};

const volumeData = {
  "U.S.": {
    "By Customer Type": {
      "Museums & Cultural Institutions":            ts([17083, 17520, 17974, 18476, 19054, 19701, 20376, 21047, 21713]),
      "Private Collectors & Estates":               ts([30516, 32101, 33817, 35648, 37578, 39595, 41688, 43869, 46122]),
      "Auction Houses & Art Dealers":               ts([18575, 19317, 20118, 20966, 21850, 22761, 23691, 24646, 25616]),
      "Corporate & Hospitality Clients":            ts([ 6717,  7019,  7351,  7713,  8096,  8493,  8892,  9289,  9689]),
      "Artists & Studios":                          ts([ 6054,  6258,  6470,  6698,  6945,  7209,  7480,  7750,  8023]),
      "Others (Restoration & Conservation Firms)":  ts([ 3980,  4071,  4166,  4271,  4393,  4530,  4673,  4814,  4953])
    },
    "By Service Type": {
      "Packing & Crating Services":                 ts([20897, 21492, 22114, 22821, 23624, 24473, 25371, 26277, 27176]),
      "Climate-Controlled Transportation":          ts([23717, 24687, 25663, 26628, 27651, 28762, 29866, 30953, 32035]),
      "Art Installation & De-installation":         ts([10283, 10734, 11251, 11818, 12405, 13009, 13641, 14313, 15014]),
      "Storage & Vaulting":                         ts([12522, 13209, 13991, 14850, 15751, 16691, 17685, 18751, 19875]),
      "Insurance & Valuation Services":             ts([ 5307,  5454,  5606,  5770,  5948,  6138,  6332,  6522,  6712]),
      "Courier & White-Glove Delivery":             ts([ 7546,  7945,  8384,  8864,  9375,  9909, 10453, 11003, 11564]),
      "Others (Customs Brokerage, Digital Inventory)": ts([2654, 2765, 2887, 3021, 3162, 3307, 3452, 3596, 3747])
    },
    "By Region": {
      "Northeast": ts([29189, 30217, 31361, 32561, 33800, 35052, 36321, 37651, 38984]),
      "Southeast": ts([15424, 16187, 16989, 17856, 18794, 19804, 20860, 21939, 23057]),
      "Midwest":   ts([10283, 10554, 10835, 11145, 11501, 11899, 12315, 12729, 13141]),
      "West":      ts([19819, 20661, 21541, 22489, 23513, 24611, 25751, 26903, 28085]),
      "Southwest": ts([ 8210,  8667,  9170,  9721, 10308, 10923, 11553, 12193, 12849])
    }
  }
};

// Build sub-region top-level entries by allocating U.S. customer/service segments
// proportionally to each sub-region's share of the U.S. total per year.
function buildSubRegions(data) {
  const us = data["U.S."];
  const regionTotals = us["By Region"]; // {region: {year: val}}
  const subRegionNames = Object.keys(regionTotals);

  for (const region of subRegionNames) {
    data[region] = { "By Customer Type": {}, "By Service Type": {} };
    for (const segType of ["By Customer Type", "By Service Type"]) {
      for (const [segName, series] of Object.entries(us[segType])) {
        const out = {};
        for (const y of years) {
          const usTotal = Object.values(us[segType]).reduce((a, s) => a + s[y], 0);
          const share = regionTotals[region][y] / usTotal;
          const val = series[y] * share;
          out[y] = Number.isInteger(series[y]) ? Math.round(val) : Math.round(val * 10) / 10;
        }
        data[region][segType][segName] = out;
      }
    }
  }
}
// Sub-regions are kept ONLY as items inside the "By Region" segment, not as
// top-level geographies, so the geography selector shows just U.S.
// buildSubRegions(valueData);
// buildSubRegions(volumeData);

const segmentationAnalysis = {
  "U.S.": {
    "By Customer Type": Object.fromEntries(Object.keys(valueData["U.S."]["By Customer Type"]).map(k => [k, {}])),
    "By Service Type":  Object.fromEntries(Object.keys(valueData["U.S."]["By Service Type"]).map(k => [k, {}])),
    "By Region":        Object.fromEntries(Object.keys(valueData["U.S."]["By Region"]).map(k => [k, {}]))
  }
};

const outDir = path.join(__dirname, 'public', 'data');
fs.writeFileSync(path.join(outDir, 'value.json'), JSON.stringify(valueData, null, 2));
fs.writeFileSync(path.join(outDir, 'volume.json'), JSON.stringify(volumeData, null, 2));
fs.writeFileSync(path.join(outDir, 'segmentation_analysis.json'), JSON.stringify(segmentationAnalysis, null, 2));

// Verification: row totals per segment type per year should match across types
function verify(name, data) {
  console.log(`\n=== ${name} ===`);
  const segTypes = Object.keys(data["U.S."]);
  for (const y of years) {
    const totals = segTypes.map(st => {
      const sum = Object.values(data["U.S."][st]).reduce((a, s) => a + s[y], 0);
      return Math.round(sum * 10) / 10;
    });
    console.log(`${y}:`, segTypes.map((s,i) => `${s}=${totals[i]}`).join(' | '));
  }
}
verify('VALUE', valueData);
verify('VOLUME', volumeData);
console.log('\nWrote value.json, volume.json, segmentation_analysis.json');
