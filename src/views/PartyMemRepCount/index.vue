<template>
  <div class="party-mem-rep-count-container">
    <div id="party-mem-rep-count" class="party-mem-rep-count"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "党员报到统计图：",
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "报到人数",
            type: "line",
            stack: "总量",
            data: [7, 5, 4, 7, 9, 10, 1]
          }
        ]
      }
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      console.log("drawline");
      let myChart = this.$echarts.init(
        document.getElementById("party-mem-rep-count")
      );
      myChart.setOption(this.option);
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
    margin:6rem auto;
  }
}
</style>


