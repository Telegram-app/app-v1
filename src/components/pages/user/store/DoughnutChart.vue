<template>
  <div class="chart">
    <div class="chart__doughnut">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
    <div class="chart__legend" id="chartLegend"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import htmlLegendPlugin from '@/plugins/chart/chartLegend.ts';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, htmlLegendPlugin);

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut,
  },
  
  setup() {
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      layout: {
        padding: {
          // Any unspecified dimensions are assumed to be 0
          top: 15,
          right: 15,
          bottom: 15,
          left: 15,
        }
      },
      plugins: {
        htmlLegend: {
          containerID: 'chartLegend',
        },
        legend: {
          display: false,
          // position: "right",
          // labels: {
          //   boxWidth: 10,
          //   boxHeight: 10
          // }
        },
        tooltip: {
          enabled: true,
          position: 'nearest',
          displayColors: false,
          callbacks: {
            title: () => null,
            label: function (context: any) {
              let label = context.label || '';
              
              if (context.raw !== null) {
                label += ' ' + context.raw + '%';
              }
              
              return label;
            },
          }
        },
      },
    });
    
    return {
      chartOptions,
    };
  },
  
  data: () => ({
    chartData: {
      labels: [
        'Инвестор и команда',
        'Разработка протокола',
        'Казначейство',
        'Фонд экосистемы ИИ',
        'Jumpstart',
        'Маркет-мейкер',
        'Эйрдроп',
      ],
      datasets: [
        {
          data: [45, 35, 7.5, 5, 3, 3, 1.5],
          labelItems: [
            [ { text: 'Элемент 1' }, { text: 'Элемент 2' }, { text: 'Элемент 3' } ],
            [ { text: 'Элемент 1' }, { text: 'Элемент 2' }, { text: 'Элемент 3' } ],
            [ { text: 'Элемент 1' }, { text: 'Элемент 2' }, { text: 'Элемент 3' } ],
            [ { text: 'Элемент 1' }, { text: 'Элемент 2' }, { text: 'Элемент 3' } ],
            [ { text: 'Элемент 1' }, { text: 'Элемент 2' }, { text: 'Элемент 3' } ],
            [ { text: 'Элемент 1' }, { text: 'Элемент 2' }, { text: 'Элемент 3' } ],
            [ { text: 'Элемент 1' }, { text: 'Элемент 2' }, { text: 'Элемент 3' } ],
          ],
          backgroundColor: [
            '#FFA500',
            '#FF6347',
            '#8A2BE2',
            '#FF4500',
            '#32CD32',
            '#FF1493',
            '#00CED1',
          ],
          hoverOffset: 12,
          borderWidth: 0
        },
      ],
    }
  })
});
</script>

<style lang="scss">

.chart {
  display: flex;
  margin: 0 -10px;
  overflow: visible;
  
  &__doughnut {
    width: 200px;
    height: 200px;
  }
  
  &__legend {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-right: 15px;
    
    ul {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      margin: 0;
      padding: 0;
      
      li {
        display: flex;
        flex-direction: column;
        
        margin: 0;
        padding: 0;
        min-height: 32px;
        max-height: 32px;
        overflow: hidden;
        
        transition: max-height 0.5s;
        
        cursor: pointer;
        
        &.expanded {
          max-height: 200px;
          
          transition: max-height 1s ease-in-out;
          
          .icon {
            transform: rotate(-90deg);
            
            transition: all 0.6s ease-out;
          }
        }
        
        p {
          position: relative;
          
          display: flex;
          align-items: center;
          margin: 0;
          min-height: 32px;
          padding: 0 13px 0 0;
          
          font-size: 14px;
          line-height: 1;
          
          span {
            position: relative;
            
            display: flex;
            flex-shrink: 0;
            margin-right: 6px;
            height: 10px;
            width: 10px;
            
            &.check-mark {
              &:before {
                content: '✓';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                
                padding-bottom: 4px;
                
                font-size: 17px;
              }
            }
          }
          
          .icon {
            position: absolute;
            right: -10px;
            transform: rotate(90deg);
            
            padding: 10px;
            
            transition: all 0.3s ease-in;
          }
        }
        
        ul {
          padding-bottom: 5px;
          border-bottom: 1px solid theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
          li {
            min-height: 16px;
            max-height: 16px;
            
            font-size: 13px;
          }
        }
      }
    }
  }
}

</style>