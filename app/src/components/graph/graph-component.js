import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';

import {
  calculateTotalDays,
  parseGrowthDataSet,
  parseProgressDataSet,
  parseArea,
  parseTransparent
} from '../../utilities';

export class GraphComponent extends Component {

  render() {

    const {
      challenge,
      entries,
    } = this.props;

    const {
      progress,
      date_start,
      date_end
    } = challenge;

    const {
      active,
      days_since_start,
      tick,
    } = progress;

    const numberOfDays = active ? days_since_start : calculateTotalDays(date_start, date_end);

    const progressDataSet = parseProgressDataSet(entries, date_start, numberOfDays);
    const growthDataSet = parseGrowthDataSet(numberOfDays, tick);

    const config = {
      chart: {
        type: 'area',
      },
      title: null,
      plotOptions: {
        area: {
          stacking: true,
          lineWidth: 0,
          shadow: false,
          marker: {
            enabled: false
          },
          enableMouseTracking: false,
          showInLegend: false
        },
        line: {
          zIndex: 5,
          marker: {
            enabled: false
          }
        }
      },
      yAxis: {
        title: null,
      },
      series: [{
        showInLegend: false,
        type: 'line',
        color: '#555',
        data: progressDataSet,
      }, {
        showInLegend: false,
        type: 'line',
        color: '#55e',
        data: growthDataSet,
      }, {
        fillColor: '#5e5',
        data: parseArea(progressDataSet, growthDataSet) // Green
      }, {
        fillColor: '#e55',
        data: parseArea(growthDataSet, progressDataSet) // Red
      }, {
        fillColor: 'rgba(255,255,255,0)',
        data: parseTransparent(progressDataSet, growthDataSet)
      }],
    };

    return (
      <ReactHighcharts
        config={config}
        ref="chart"
      />
    );
  }
}
