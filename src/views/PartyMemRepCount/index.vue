<template>
  <div class="party-mem-rep-count-container">
    <div id="party-mem-rep-count" class="party-mem-rep-count"></div>
  </div>
</template>

<script>
import time from "../../../utils/date.js";

export default {
  data() {
    return {
      option: {
        title: {
          text: "党员报到统计图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["报到人数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "报到人数",
            type: "line",
            stack: "总量",
            data: []
          },
        ]
      }
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let now = time.split("-");
      let year = parseInt(now[0]); // 传给后端查询该年中所有的document
      let month = parseInt(now[1]);
      for (let i = 0; i < month; ++i) {
        this.option.xAxis.data[i] = i + 1 + "月";
      }
      const data = {
        time: new Date(),
        year: year,
        month: month
      };
      this.$http
        .post("/api/partyMem/rep/perMonth/count", data)
        .then(res => {
          let myChart = this.$echarts.init(
            document.getElementById("party-mem-rep-count")
          );
          this.option.series[0].data = res.data.data;
          myChart.setOption(this.option);
        })
        .catch(err => {
          console.log("获取相应月份人数出错！");
        });
    }
  }
};
</script>

<style lang="scss">
.party-mem-rep-count-container {
  width: 100%;
  height: 100%;
  .party-mem-rep-count {
    width: 80%;
    height: 60%;
    margin: 6rem auto;
  }
}
</style>


