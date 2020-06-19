/**
 * pmx-gc-stats
 *
 * Stats about Node.js V8 garbage collector
 * are exposed in PM2 for each GC type executed using PMX probes.
 *
 * Author: Adrien Valcke <adrienvalcke@icloud.com>
 */
const gc = require('gc-stats')();
const { ProbeFactory } = require('./metrics');
const { object: { is, exists }, cast: { num }, string: { camelCase } } = require('./helpers');

const defaultGcTypes = [
  1,
  2,
  4,
  8,
  15,
];

const prefix = 'gc-type';

const defaultDiffSuffixes = [
  'total-heap-size',
  'total-heap-executable-size',
  'used-heap-size',
  'heap-size-limit',
  'total-physical-size',
  'total-available-size',
  'malloced-memory',
  'peak-malloced-memory',
];

const defaultGcTypesLen = defaultGcTypes.length;
const defaultDiffSuffixesLen = defaultDiffSuffixes.length;

/**
 * @func pmxGcStats
 *
 * Stats about Node.js V8 garbage collector after it has been executed
 * are exposed in PM2 for each GC type using PMX probes.
 *
 * @param  {Array} types a list of gc types to get stats of
 * @param  {Array} probes a list of probes suffixes to get stats of for each gc type
 * @return {undefined}
 */
const pmxGcStats = function pmxGcStats({
  types,
  probes: suffixes,
} = {}) {
  const probes = {};

  // create probes by gc types
  for (let i = 0; i < defaultGcTypesLen; i += 1) {
    const type = defaultGcTypes[i];

    // only select gc types in option or defaul gc types if option is missing
    if (!is(Array, types) || types.indexOf(type) !== -1) {
      // create count, pause and diff probes if in option or if option is missing
      probes[type] = {
        diff: {},
      };

      // count
      if (!is(Array, suffixes) || suffixes.indexOf('count') !== -1) {
        probes[type].count = ProbeFactory.create('counter', { name: `${prefix}-${type}-count` });
      }

      // pause
      if (!is(Array, suffixes) || suffixes.indexOf('pause') !== -1) {
        probes[type].pause = ProbeFactory.create('histogram', { name: `${prefix}-${type}-pause`, measurement: 'sum', unit: 'ns' });
      }

      // create diff probes
      for (let j = 0; j < defaultDiffSuffixesLen; j += 1) {
        const suffix = defaultDiffSuffixes[j];

        // only select diff probes in option or defaul diff probes if option is missing
        if (!is(Array, suffixes) || suffixes.indexOf(suffix) !== -1) {
          probes[type].diff[suffix] = ProbeFactory.create('histogram', { name: `${prefix}-${type}-diff-${suffix}`, measurement: 'sum', unit: 'B' });
        }
      }
    }
  }

  // listen to gc stats events
  gc.on('stats', (stats) => {
    if (exists(stats)) {
      // get all probes for a specific gc type
      const gcTypeProbes = probes[stats.gctype];

      if (exists(gcTypeProbes)) {
        gcTypeProbes.count.inc();
        gcTypeProbes.pause.update(num(stats.pause) || 0);

        if (exists(stats.diff)) {
          Object.keys(gcTypeProbes.diff).forEach((diffSuffix) => {
            // match gc-stats module diff keys
            const key = camelCase({ string: diffSuffix, separator: '-' });
            gcTypeProbes.diff[diffSuffix].update(num(stats.diff[key] || 0));
          });
        }
      }
    }
  });
};

module.exports = pmxGcStats;
