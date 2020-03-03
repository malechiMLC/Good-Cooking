// pages/searchResult/searchResult.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'搜索关键词',
    infoArray:[
      {
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"菜名",
        timeNeeded:"200分钟",
        difficulty:'中等'
      },{
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"菜名",
        timeNeeded:"200分钟",
        difficulty:'容易'
      },{
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"菜名",
        timeNeeded:"200分钟",
        difficulty:'较难'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option){
    var _this=this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data.data)
      _this.setData({
        keyword:data.data
      })
    }) 

    //搜索
    // wx.request({
    //   url: 'https://csquare.wang/search',
    //   method: 'GET',
    //   data: {
    //     openid:app.globalData.openid,
    //     keyword:_this.setData.keyword
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     var temp_array=[]
    //     for(var i=0;i<res.length;i++){
    //       var obj
    //       obj.timeNeeded=res.recipes[i].timeNeeded
    //       obj.bgUrl=res.recipes[i].image
    //       obj.text=res.recipes[i].name
    //       obj.difficulty=res.recipes[i].difficulty

    //       temp_array.push(obj)
    //     }

    //     this.setData({
    //       infoArray:temp_array
    //     })
    //   }
    // })
  },

  navigateBack:function(){
    wx.navigateBack({
      delta: 1
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