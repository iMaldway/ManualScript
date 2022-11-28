// http://flcp.xttyz.com/hnfc_login/kjSearch/ssqKjSearch?pageNum=1

const BS = {
  stage: [],
  redGlobe: new Map(),
  buldGlobe: new Map(),
  init() {
    /**
     * 获取数据
     */
    let ball = $('td[align="left"]')
    for (let i in ball) {
      let item = ball[i]
      if (item.tagName === 'TD') {
        let nowStage = item.innerText?.split('\n\t\n') || []
        this.stage.push(nowStage)
      }
    }
    /**
     * 初始化结构
     */
    for (let i = 1; i < 34; i++) {
      this.redGlobe.set(i + '', 0)
    }
    for (let i = 1; i < 17; i++) {
      this.buldGlobe.set(i + '', 0)
    }
    /**
     * 分析集合
     */
    for (let i in this.stage) {
      let item = this.stage[i]
      for (let j = 0; j < 6; j++) {
        if (this.redGlobe.has(item[j])) {
          let value = this.redGlobe.get(item[j])
          this.redGlobe.set(item[j], value + 1)
        }
      }
      if (this.buldGlobe.has(item[6])) {
        let value = this.buldGlobe.get(item[6])
        this.buldGlobe.set(item[6], value + 1)
      }
    }
    /**
     * 概率转换
     */
    this.probability(this.redGlobe)
    /**
     * 概率转换
     */
    this.probability(this.buldGlobe)
  },
  getOrdinar() {
    let randRed = this.weightedRand(this.redGlobe)
    let randBuld = this.weightedRand(this.buldGlobe)
    let produce = []
    while (produce.length < 6) {
      let value = randRed()
      if (produce.indexOf(value) < 0) {
        produce.push(value)
      }
    }
    // 排序
    produce.sort(function (a, b) {
      return a - b
    })
    while (produce.length < 7) {
      let value = randBuld()
      if (produce.indexOf(value) < 0) {
        produce.push(value)
      }
    }
    console.log(produce.join(' '))
  },
  probability(globe) {
    for (let key of globe.keys()) {
      let value = globe.get(key)
      globe.set(key, parseInt(((this.stage.length - value) / this.stage.length) * 100))
    }
  },
  weightedRand(spec) {
    /**
     * 权重函数
     * 构建一个表格，按照权重填充，取总长度随机数
     */
    let table = []
    for (let key of spec.keys()) {
      let item = spec.get(key)
      /**
       * 减去55基准数，当该值小于等于55时取1减少权重。
       * 达到55时，说明在20条数据中出现了9次。
       */
      // item = item <= 55 ? 1 : item - 55
      for (let j = 0; j < item; j++) {
        table.push(key)
      }
    }
    return function () {
      // 随机获取一个下标
      const index = Math.floor(Math.random() * table.length)
      // 获取返回值
      const res = table[index]
      // 将返回值从表格中移除，以减少后续出现的概率
      table.splice(index, 1)
      return res
    }
  },
  log() {
    for (let key of this.redGlobe.keys()) {
      console.log('红球', key, '出现：', this.redGlobe.get(key))
    }
    for (let key of buldGlobe.keys()) {
      console.log('蓝球', key, '出现：', this.buldGlobe.get(key))
    }
  },
  ticket(index = 1) {
    this.init()
    for (let i = 0; i < index; i++) {
      this.getOrdinar()
    }
  }
}
BS.ticket(5)
