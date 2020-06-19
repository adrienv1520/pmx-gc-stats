/**
 * Probe factory using PMX.
 *
 *    - static create(probeType, opts = {}) -> Probe
 */
const Probe = require('pmx').probe();
const { object: { is }, cast: { int } } = require('../helpers');

// data aggregators, avg by default
const aggTypes = ['avg', 'sum', 'max', 'min', 'none'];

class ProbeFactory {
  /**
   * Create a probe
   * @param  {String} probeType [counter, metric, meter or histogram]
   * @param  {Object} [opts={}] [options can be name, unit, agg_type, alert,
   *                            value, samples, timeframe, measurement]
   * @return {Probe}            [Probe created]
   */
  static create(probeType, opts = {}) {
    const { name, unit, agg_type: aggType } = opts;
    const probe = {};
    probe.name = is(String, name) && name.trim() !== '' ? name : 'unknown';

    if (is(String, unit) && unit.trim() !== '') {
      probe.unit = unit;
    }

    if (aggTypes.indexOf(aggType) !== -1) {
      probe.agg_type = aggType;
    }

    switch (probeType) {
      // counter
      case 'counter': {
        const { alert } = opts;

        if (is(Object, alert)) {
          probe.alert = alert;
        }

        return Probe.counter(probe);
      }
      // metric
      case 'metric': {
        const { value } = opts;

        if (is(Function, value)) {
          probe.value = value;
        }

        return Probe.metric(probe);
      }
      // meter
      case 'meter': {
        const { alert, samples, timeframe } = opts;
        probe.samples = int(samples, { ge: 1 }) || 1;
        probe.timeframe = int(timeframe, { ge: 1 }) || 60;

        if (is(Object, alert)) {
          probe.alert = alert;
        }

        return Probe.meter(probe);
      }
      // histogram
      case 'histogram': {
        const measurements = [
          'mean', // the average of all observed values, by default
          'min', // the lowest observed value
          'max', // the highest observed value
          'sum', // the sum of all observed values
          'variance', // the variance of all observed values
          'stddev', // the stddev of all observed values
          'count', // the number of observed values
          'median', // 50% of all values in the resevoir are at or below this value
          'p75', // see median, 75% percentile
          'p95', // see median, 95% percentile
          'p99', // see median, 99% percentile
          'p999', // see median, 99.9% percentile
        ];

        const { measurement } = opts;

        if (measurements.indexOf(measurement) !== -1) {
          probe.measurement = measurement;
        } else {
          ([probe.measurement] = measurements);
        }

        return Probe.histogram(probe);
      }
      default:
        return undefined;
    }
  }
}

module.exports = ProbeFactory;
