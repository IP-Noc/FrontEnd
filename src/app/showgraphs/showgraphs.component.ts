import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { GraphGrafanaService } from '../services/graphGrafana/graph-grafana.service';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';

@Component({
  selector: 'app-showgraphs',
  templateUrl: './showgraphs.component.html',
  styleUrls: ['./showgraphs.component.css'],
})
export class ShowgraphsComponent implements OnInit, AfterViewInit {
  data: any = [];
  id: any;
  typeGraph!: string;
  values!: any;
  myChart!: echarts.ECharts;
  intervalId!: any;
Clients: any;
startDateN: any;
endaDateN: any;

  constructor(
    private ggs: GraphGrafanaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    
  ) {
    // Get params id
    this.id = this.route.snapshot.paramMap.get('id');
  }
  closePage(): void {
    try {
        window.close();
        if (!window.closed) {
            alert("Please close this tab manually.");
        }
    } catch (e) {
        console.error("Error when trying to close the window:", e);
    }
}

clientsTabme:any=[];
dataQuery :any={};
  getData() {
    this.ggs.getGrafanaById(this.id).subscribe((res) => {
      this.data = res;
      this.typeGraph = this.data.executedQuery.typegraph;
      this.dataQuery = this.data.executedQuery;
      this.clientsTabme = this.data.Clients

      console.log('Data:', this.clientsTabme);
      if (this.typeGraph === 'stat') {
        this.values = this.data.resultQuery.values;
      } else if (this.typeGraph === 'timeseries') {
        this.cdr.detectChanges();
        this.setupChart(this.data.resultQuery);
      } else if (this.typeGraph === 'barchart') {
        this.cdr.detectChanges();
        this.setupBarChart(this.data.resultQuery);
      }
    });
  }

  selectedClient:any;

  updateData() {
  //if field empty get the old value
  if (!this.selectedClient) {
    this.selectedClient = this.dataQuery.variables.cli_name;
  }
  if (!this.startDateN) {
    this.startDateN = new Date(this.dataQuery.variables.__timeFrom);}
  if (!this.endaDateN) {
    this.endaDateN = new Date(this.dataQuery.variables.__timeTo);}

    const updatedQuery = {
        ...this.dataQuery,
        variables: {
            ...this.dataQuery.variables,
            cli_name: this.selectedClient,
            __timeFrom: this.startDateN.toISOString(),
            __timeTo: this.endaDateN.toISOString()
        }
    };

    this.ggs.UpdateGrafanaById(this.id, updatedQuery).subscribe({
        next: (response) => {
            console.log('Update successful:', response);
            this.getData(); // Refresh the data
        },
        error: (error) => console.error('Failed to update:', error)
    });
}
  setupBarChart(resultQuery: any) {
    const pluginCategories = resultQuery.values[0];
    const totalAlerts = resultQuery.values[1];
    const falsePositives = resultQuery.values[2];

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },
      legend: {
        data: ['Total Alertes', 'Faux Positifs (IA)'],
      },
      xAxis: {
        type: 'category',
        data: pluginCategories,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Total Alertes',
          type: 'bar',
          data: totalAlerts,
        },
        {
          name: 'Faux Positifs (IA)',
          type: 'line',
          yAxisIndex: 0,
          data: falsePositives,
        },
      ],
    };

    this.ngZone.runOutsideAngular(() => {
      const chartDom = document.getElementById('barchart');
      this.myChart = echarts.init(chartDom!, 'dark');
      this.myChart.setOption(option);

      // Clear existing interval if one exists
      if (this.intervalId) clearInterval(this.intervalId);

      this.intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * pluginCategories.length);
        const randomValue = Math.floor(Math.random() * 100);

        totalAlerts[randomIndex] = randomValue;
        falsePositives[randomIndex] = randomValue / 2;

        this.myChart.setOption({
          series: [{ data: totalAlerts }, { data: falsePositives }],
        });
      }, 2100);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.myChart) this.myChart.dispose();
  }
  setupChart(resultQuery: any) {
    // Log the fields to understand the structure
    console.log('Fields:', resultQuery.fields);

    // Find the index of the field that contains the timestamp data
    const timestampFieldNames = ['timestamp', 'time', 'date']; // Common names for timestamp fields
    const timestampIndex = resultQuery.fields.findIndex((field: any) =>
      timestampFieldNames.some((name) =>
        field.name.toLowerCase().includes(name)
      )
    );

    if (timestampIndex === -1) {
      console.error(
        'Timestamp field not found. Available fields are:',
        resultQuery.fields.map((field: any) => field.name)
      );
      return;
    }

    // Convert timestamps to 'YYYY-MM-DD'
    const dates = resultQuery.values[timestampIndex].map(
      (timestamp: number) => {
        return new Date(timestamp).toISOString().split('T')[0];
      }
    );

    // Generate series dynamically
    const series = resultQuery.fields
      .map((field: any, index: number) => {
        if (index === timestampIndex) return null; // Skip the timestamp field

        return {
          name: field.name,
          type: 'line',
          data: resultQuery.values[index],
          itemStyle: {
            color: index % 2 === 0 ? '#C64C24' : '#4513ba', // Use solid color for line
          },
          areaStyle: {
            color: index % 2 === 0 ? '#C64C24' : '#03396c', // Use the same solid color for the area
          },
        };
      })
      .filter((series: any) => series !== null);

    const option: echarts.EChartsOption = {
      animationDuration: 3000, // Animates the chart over 3000 milliseconds
      animationEasing: 'cubicInOut',
      color: [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
      ],
   
      tooltip: {
        trigger: 'axis',

        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust tooltip background for visibility
        position: function (pt) {
          return [pt[0], '50%'];
        },
        textStyle: {
          color: 'black',
          fontSize: 24,
          fontWeight: 'bold',
        },
      },
      title: {
        left: 'center',
        text: 'Time Series Data',
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
        },
      ],
      series: series,
    };

    setTimeout(() => {
      const chartDom = document.getElementById('main');
      if (chartDom) {
        const myChart = echarts.init(chartDom, {
          renderer: 'canvas',
          useDirtyRect: false,
        });
        myChart.setOption(option);
      }
    }, 0);
  }

  ngOnInit(): void {
    this.getData();
    document.getElementById('body')!.style.overflow = 'hidden';
    document.getElementById('body')!.style.background = 'none';
    document.styleSheets[2].disabled = true;

    //execute js
  }

  ngAfterViewInit(): void {
    // No changes needed here
  }
}
