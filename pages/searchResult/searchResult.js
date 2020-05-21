// pages/searchResult/searchResult.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    infoArray:[
      // {
      //   bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
      //   text:"菜名",
      //   timeNeeded:"200分钟",
      //   difficulty:'中等',
      //   id:'1'
      // },{
      //   bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
      //   text:"菜名",
      //   timeNeeded:"200分钟",
      //   difficulty:'容易',
      //   id:'2'
      // },{
      //   bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
      //   text:"菜名",
      //   timeNeeded:"200分钟",
      //   difficulty:'较难',
      //   id:'3'
      // }
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
      _this.setData({
        keyword:data.data
      })
    }) 
console.log(_this.data.keyword)
    // 搜索
    wx.request({
      url: 'https://csquare.wang/search',
      method: 'GET',
      data: {
        openid:app.globalData.openId,
        keyword:_this.data.keyword
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(_this.data.keyword)
        console.log(res)
        var temp_array=[]
        for(var i=0;i<res.data.length;i++){
          var obj={}
          console.log(res.data[i])
          obj.timeNeeded=res.data[i].timeNeeded
          obj.bgUrl=res.data[i].image
          obj.text=res.data[i].title
          obj.difficulty=res.data[i].difficulty
          obj.id=res.data[i].id
          temp_array.push(obj)
        }
        _this.setData({
          infoArray:temp_array
        })
        console.log(_this.data.infoArray)
      }
    })
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