import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, PlotBand, Legend, LineSeries, HighchartsProvider, AreaSeries, Tooltip
} from 'react-jsx-highcharts';
import { Button, ButtonGroup, Container } from 'react-bootstrap';


const DashboardChart = ({ realPlotBands, expectedPlotBands, realSeries, expectedSeries, maxLimitSeries, minLimitSeries, title, yAxisTitle, toolTipSuffix, yAxisMax }) => {
  const [plotBandsToShow, setPlotBandsToShow] = useState('expected');
  if (!expectedPlotBands) return null;
  return (
    <Container>

      <ButtonGroup aria-label="Mostrar fases">
        <Button className='shadow-none' variant={plotBandsToShow === "expected" ? "primary" : "success"} onClick={() => setPlotBandsToShow('real')}>Real</Button>
        <Button className='shadow-none' variant={plotBandsToShow === "real" ? "primary" : "success"} onClick={() => setPlotBandsToShow('expected')}>Esperado</Button>
      </ButtonGroup>

      <HighchartsProvider Highcharts={Highcharts}>

        <HighchartsChart>
          <Chart width={600} />

          <Title useHTML style={{ color: "#FFFFFF", backgroundColor: "#5493C9", fontWeight: "bold" }}>{title}</Title>

          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          <Tooltip valueSuffix={toolTipSuffix}/>

          <XAxis type='datetime' labels={{ format: "{value:%m-%d %k:%M}" }}>
            <XAxis.Title>Hora</XAxis.Title>
            {
              (plotBandsToShow === 'expected' ? expectedPlotBands : realPlotBands).map((plotBand, index) => {
                return (
                  <PlotBand key={index} from={plotBand.from} to={plotBand.to} color={plotBand.color} label={plotBand.label} />
                )
              })
            }
          </XAxis>

          <YAxis max={yAxisMax}>
            <YAxis.Title>{yAxisTitle}</YAxis.Title>

            {expectedSeries && <AreaSeries type="area" name="Esperado" data={expectedSeries} color={"#0E283D"} />}
            {realSeries && <LineSeries name="Real" data={realSeries} color={"#FFDA0A"} lineWidth={3} />}
            {maxLimitSeries && <LineSeries dashStyle='LongDash' name="Máximo permitido" data={maxLimitSeries} color={"#E6A720"} lineWidth={1} />}
            {realSeries && <LineSeries dashStyle='LongDash' name="Mínimo permitido" data={minLimitSeries} color={"#FFFFFF"} lineWidth={1} />}


          </YAxis>
        </HighchartsChart>
      </HighchartsProvider>
    </Container>
  );
}

export default DashboardChart;