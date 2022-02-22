import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, PlotBand, Legend, LineSeries, HighchartsProvider, AreaSeries, Tooltip
} from 'react-jsx-highcharts';


const DashboardChart = ({ plotBands, realSeries, expectedSeries, maxLimitSeries, minLimitSeries, title, exceededPhases }) => {
  if (!plotBands) return null;
  return (
    <HighchartsProvider Highcharts={Highcharts}>

      <HighchartsChart>
        <Chart width={600}/>

        <Title useHTML style={{ color: "#FFFFFF", backgroundColor: "#5493C9", fontWeight: "bold" }}>{title}</Title>

        <Legend layout="horizontal" align="center" verticalAlign="bottom" />
        <Tooltip valueSuffix="&deg;C"/>

        <XAxis type='datetime' labels={{ format: "{value:%m-%d %k:%M:%S}" }}>
          <XAxis.Title>Hora</XAxis.Title>
          {
            plotBands.map((plotBand, index) => {
              return (
                <PlotBand key={index} from={plotBand.from} to={plotBand.to} color={exceededPhases.has(plotBand.label.text) ? "#CA2A2A" : plotBand.color} label={plotBand.label} />
              )
            })
          }
        </XAxis>

        <YAxis max={1200}>
          <YAxis.Title>Temperatura &deg;C</YAxis.Title>

          {expectedSeries && <AreaSeries type="area" name="Esperado" data={expectedSeries} color={"#0E283D"}  />}
          {realSeries && <LineSeries name="Real" data={realSeries} color={"#FFDA0A"} lineWidth={3} />}
          {maxLimitSeries && <LineSeries dashStyle='LongDash' name="Máximo permitido" data={maxLimitSeries} color={"#E6A720"} lineWidth={1} />}
          {realSeries && <LineSeries dashStyle='LongDash' name="Mínimo permitido" data={minLimitSeries} color={"#FFFFFF"} lineWidth={1} />}


        </YAxis>
      </HighchartsChart>
    </HighchartsProvider>
  );
}

export default DashboardChart;