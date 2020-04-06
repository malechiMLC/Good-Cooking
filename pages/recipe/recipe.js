// pages/recipe/recipe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liked:false,
    collected:false,
    likenum:'111',
    commentnum: '111',
    collecttnum: '111',
    id:0,
    title: "title",
    image:'',
    timeNeeded:'time',
    difficulty:'diff',
    size:'size',
    ingredients:'清水：100g，食用盐：20g，食用油：30g...清水：100g，食用盐：20g，食用油：30g...',
    nutrition:'清水：100g，食用盐：20g，食用油：30g...清水：100g，食用盐：20g，食用油：30g...清水：100g，食用盐：20g，食用油：30g...清水：100g，食用盐：20g，食用油：30g...',
    steps: ' < ul ><li><div class="recipeStep_img"><img src="https://i8.meishichina.com/attachment/recipe/2020/01/03/2020010315780566122045067513584.JPG?x-oss-process=style/p320" alt="腊肠香菇糯米饭的做法步骤：1"></div><div class="recipeStep_word"><div class="recipeStep_num">1</div>备好材料：糯米提前至少4小时凉水浸泡，干香菇凉水泡软，腊肠切厚片，青豆剥皮洗净，胡萝卜刮掉外皮，洋葱半个，香葱清洗干净。</div></li><li><div class="recipeStep_img"><img src="https://i8.meishichina.com/attachment/recipe/2020/01/03/2020010315780566124783257513584.JPG?x-oss-process=style/p320" alt="腊肠香菇糯米饭的做法步骤：2"></div><div class="recipeStep_word"><div class="recipeStep_num">2</div>洋葱切小丁，胡萝卜切小丁，香菇切丁，香葱切末；香菇水不要倒，焖饭倍儿香。</div></li><li><div class="recipeStep_img"><img src="https://i8.meishichina.com/attachment/recipe/2020/01/03/2020010315780566125993627513584.JPG?x-oss-process=style/p320" alt="腊肠香菇糯米饭的做法步骤：3"></div><div class="recipeStep_word"><div class="recipeStep_num">3</div>炒锅中倒少许油，将腊肠和香菇丁同入锅中，小火翻炒出香味；腊肠是自家制作的，如果肥肉少可以适量多放些油煸炒，如果肥肉多，可以少放些油煸炒。</div></li><li><div class="recipeStep_img"><img src="https://i8.meishichina.com/attachment/recipe/2020/01/03/2020010315780566127178917513584.JPG?x-oss-process=style/p320" alt="腊肠香菇糯米饭的做法步骤：4"></div><div class="recipeStep_word"><div class="recipeStep_num">4</div>将青豆、胡萝卜丁、洋葱丁入锅中，腊肠有咸味，根据口味撒盐、倒生抽，翻炒均匀。</div></li><li><div class="recipeStep_img"><img src="https://i8.meishichina.com/attachment/recipe/2020/01/03/2020010315780566128859707513584.JPG?x-oss-process=style/p320" alt="腊肠香菇糯米饭的做法步骤：5">',
  },

  //collect
  onCollect:function(){

  },
  //like
  onLike: function () {

  },
  //comment
  onLike: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid = options.recipeID
    let rid = parseInt(sid)
    this.setData({
      id:rid
    })

    var that = this
    //获取食谱
    wx.request({
      url: 'https://csquare.wang/recipe/'+rid,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})