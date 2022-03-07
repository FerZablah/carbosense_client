import React, { useState } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, XAxis, YAxis, PlotBand, Legend, LineSeries, HighchartsProvider, AreaSeries, Tooltip
} from 'react-jsx-highcharts';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const plotBandExceededColors = ['#F92718', '#D92100', '#B81A01', '#8F1200', '#610901'];


const DashboardChart = ({ realPlotBands, expectedPlotBands, exceededPhases, realSeries, expectedSeries, maxLimitSeries, minLimitSeries, title, yAxisTitle, toolTipSuffix, yAxisMax, showPlotbandsButton, yAxisMin, ovenId }) => {
  const [plotBandsToShow, setPlotBandsToShow] = useState('real');
  const navigate = useNavigate();

  if (!expectedPlotBands) return null;
  if(!realSeries ||  (realSeries && realSeries.length === 0)) return null;
  return (
    <div className='p-0'>
      <div className='p-3'>
        <p className='text-center fs-4'>{title}</p>
        <p className='text-center fs-4 fw-bold'>{`${realSeries[realSeries.length - 1][1]} ${toolTipSuffix}`}</p>
        {showPlotbandsButton && 
          <div>
            <span>Mostrar fases: </span>
            <ButtonGroup size='sm' aria-label="Mostrar fases">
              <Button className='shadow-none text-white' variant={plotBandsToShow === "expected" ? "secondary" : "info"} onClick={() => setPlotBandsToShow('real')}>Reales</Button>
              <Button className='shadow-none text-white' variant={plotBandsToShow === "real" ? "secondary" : "info"} onClick={() => setPlotBandsToShow('expected')}>Esperadas</Button>
            </ButtonGroup>
            </div>
        }
      </div>
      <HighchartsProvider Highcharts={Highcharts}>

        <HighchartsChart>
          <Chart styledMode/>

          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          <Tooltip valueSuffix={toolTipSuffix} />

          <XAxis type='datetime' labels={{ format: "{value:%m-%d %k:%M}" }}>
            <XAxis.Title>Hora</XAxis.Title>
            {
              (plotBandsToShow === 'expected' ? expectedPlotBands : realPlotBands).map((plotBand, index) => {
                return (
                  <PlotBand events={{click: (e) => navigate(`/graficas/${plotBand.label.text}/horno/${ovenId}`)}} key={index} from={plotBand.from} to={plotBand.to} color={exceededPhases.has(plotBand.label.text) ? plotBandExceededColors[index] : plotBand.color} label={plotBand.label} />
                )
              })
            }
          </XAxis>

          <YAxis max={yAxisMax} min={yAxisMin} labels={{formatter: function() {
            return this.value + toolTipSuffix
          }}}>
            <YAxis.Title>{yAxisTitle}</YAxis.Title>
            {realSeries && <LineSeries name="Real" zIndex={3} data={realSeries} color={"#FFDA0A"} lineWidth={3} />}
            {maxLimitSeries && <LineSeries dashStyle='LongDash' zIndex={2} name="Máximo permitido" data={maxLimitSeries} color={"#E6A720"} lineWidth={1} />}
            {minLimitSeries && <LineSeries dashStyle='LongDash' zIndex={1} name="Mínimo permitido" data={minLimitSeries} color={"#FFFFFF"} lineWidth={1} />}
            {expectedSeries && <AreaSeries type="area" zIndex={0} name="Esperado" data={expectedSeries} color={"#0E283D"} />}


          </YAxis>
        </HighchartsChart>
      </HighchartsProvider>
    </div>
  );
}

export default DashboardChart;