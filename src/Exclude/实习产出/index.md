朋友的文章：<https://www.nowcoder.com/share/jump/9858602751596978359>


使用web worker预处理数据，清洗压缩类似的数据，将剩余数据转化成avl tree，从而优化echarts的 api xAxis.axisLabel.formatter 同步阻塞问题；将阻塞时间从3s优化到26ms；
在ECharts 的内部实现是取很多个点，然后取对应的值；
