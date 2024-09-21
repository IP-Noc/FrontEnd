import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  NgZone,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { GraphGrafanaService } from '../services/graphGrafana/graph-grafana.service';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { Cloudinary } from '@cloudinary/url-gen';

@Component({
  selector: 'app-showgraphs',
  templateUrl: './showgraphs.component.html',
  styleUrls: ['./showgraphs.component.css'],
})
export class ShowgraphsComponent implements OnInit, AfterViewInit {
  @ViewChild('iframe') iframe!: ElementRef;

  data: any = [];
  id: any;
  typeGraph!: string;
  values!: any;
  myChart!: echarts.ECharts;
  intervalId!: any;
  Clients: any;
  startDateN: any;
  endaDateN: any;
idCompany:any;
  constructor(
    private ggs: GraphGrafanaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private http: HttpClient
  ) {
    // Get params id
    this.id = this.route.snapshot.paramMap.get('id');
    this.idCompany = this.route.snapshot.paramMap.get('company');
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

  clientsTabme: any[] = [];
  timeTo: any;
  timeFrom: any;
  selectedClient: any;
  dataQuery: any = {};
title:any
  getData() {
    this.cdr.detectChanges();

    this.ggs.getGrafanaById(this.id).subscribe((res) => {
      this.data = res;
      this.typeGraph = this.data.executedQuery.typegraph;
      this.timeFrom = this.data.executedQuery.variables.__timeFrom;
      this.timeTo = this.data.executedQuery.variables.__timeTo;
      this.selectedClient = this.data.executedQuery.variables.cli_name;
      console.log(this.timeFrom, this.timeTo);
      this.clientsTabme = this.data.Clients;
this.title = this.data.title
      this.cdr.detectChanges(); // Ensure change detection runs

      if (this.typeGraph === 'stat') {
        this.values = this.data.resultQuery.values[0][0];
        this.setupGaugeChart(this.data.resultQuery);
      } else if (this.typeGraph === 'timeseries') {
        this.setupChart(this.data.resultQuery);
      } else if (this.typeGraph === 'barchart') {
        this.setupBarChart(this.data.resultQuery);
      } else if (this.typeGraph === 'gauge') {
        this.setupGaugeChart(this.data.resultQuery);
      }
    });
  }

 

  setupBarChart(resultQuery: any) {
    const chartDom = document.getElementById('main');
    if (!chartDom) {
      console.error('Chart container not found');
      return;  // Ensure the DOM element exists
    }
    this.myChart = echarts.init(chartDom);
    this.myChart.clear();  // Clear previous data

    // Check the structure of resultQuery
    console.log('resultQuery', resultQuery);

    if (!resultQuery.values || typeof resultQuery.values !== 'object') {
      console.error('Invalid data: values is not an object');
      return;
    }

    // Extract categories from resultQuery.fields
    const categories = resultQuery.fields.map((field: { name: any; }) => field.name);

    // Convert values object into arrays
    const seriesData = Object.keys(resultQuery.values).map(key => {
      return {
        name: categories[key],
        type: 'bar',
        data: Object.values(resultQuery.values[key])
      };
    });

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: { data: categories },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: Object.values(resultQuery.values['0'])  // Assuming the first array represents category labels
      },
      yAxis: {
        type: 'value'
      },
      series: seriesData as any
    };

    console.log('ECharts option', option); // Log to check if the options are set correctly

    this.myChart.setOption(option);
  }

  setupGaugeChart(resultQuery: any) {
    const chartDom = document.getElementById('gaugeChart');
    if (!chartDom) {
      console.error('Chart container not found');
      return;
    }
    this.myChart = echarts.init(chartDom);

    const gaugeData = resultQuery.fields.map((field: any, index: number) => {
      return {
        value: resultQuery.values[0][0] !== null ? resultQuery.values[0][0] : 0,  // Replace null with 0
        name: field.name,
        title: {
          offsetCenter: ['0%', `${index * 30 - 30}%`]
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', `${index * 30 - 20}%`]
        }
      };
    });

    const option: echarts.EChartsOption = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 40
            }
          },
          splitLine: {
            show: false,
            distance: 10,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 80
          },
          data: gaugeData,
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
        }
      ]
    };

    this.myChart.setOption(option);

    setInterval(() => {
      gaugeData.forEach((data: { value: any; }, index: string | number) => {
        data.value = resultQuery.values[index][0] !== null ? resultQuery.values[index][0] : 0;  // Update the value with the data from the server
      });
      this.myChart.setOption({
        series: [
          {
            data: gaugeData,
            pointer: {
              show: false
            }
          }
        ]
      });
    }, 2000);
  }

  updateData() {
    const updatedQuery = {
      from: this.timeFrom,
      to: this.timeTo,
      cli_name: this.selectedClient,
    };

    this.ggs.UpdateGrafanaById(this.id, this.idCompany,updatedQuery).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.getData(); // Refresh the data
      
      },
      error: (error) => console.error('Failed to update:', error)
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.myChart) this.myChart.dispose();
  }

  setupChart(resultQuery: any) {
    const chartDom = document.getElementById('main');
    if (!chartDom) {
      console.error('Chart container not found');
      return;
    }
    this.myChart = echarts.init(chartDom);
    this.myChart.clear();

    const dates = Object.values(resultQuery.values['0']);
    const dataSeries = Object.keys(resultQuery.values).slice(1).map(key => {
      return {
        name: resultQuery.fields[key].name,
        type: 'line',
        data: Object.values(resultQuery.values[key]),
        symbol: 'none',
        sampling: 'lttb',
        smooth: true,
        itemStyle: {
          color: this.getRandomColor()
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: this.getRandomColor() },
            { offset: 1, color: this.getRandomColor() }
          ])
        }
      };
    });

    const option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt: any[]) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: 'Time Series Data'
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      series: dataSeries
    };

    this.myChart.setOption(option);
  }

  getRandomColor() {
    const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  ngOnInit(): void {
  }

  generateRandomName(prefix: string = 'image'): string {
    const date = new Date();
    const timestamp = date.getTime(); // Get current timestamp
    const randomSuffix = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    return `${prefix}-${timestamp}-${randomSuffix}.png`;
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    this.getData();
    this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.detectChanges();
      if (this.typeGraph === 'barchart') {
        this.setupBarChart(this.data.resultQuery);
      } else if (this.typeGraph === 'timeseries') {
        this.setupChart(this.data.resultQuery);
      } else if (this.typeGraph === 'stat') {
        this.setupGaugeChart(this.data.resultQuery);
      } else if (this.typeGraph === 'gauge') {
        this.setupGaugeChart(this.data.resultQuery);
      }
    }, 500);  // Adjust the delay as necessary
  }
}
