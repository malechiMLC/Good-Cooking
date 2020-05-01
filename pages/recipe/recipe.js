// pages/recipe/recipe.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liked:false,
    collected:false,
    commented:false,
    commentnum: '',
    collectnum: '',
    commenttext:'',
    rid:10,
    title: "",
    image:'',
    timeNeeded:'',
    difficulty:'',
    size:'',
    ingredients:'',
    nutrition:'',
    steps: '',
    commentArray: []
  },

  //点击collet按钮
  onCollect:function(){
    if (!this.data.collected) {
      var that = this
      //收藏
      wx.request({
        url: 'https://csquare.wang/favorite/user/' + app.globalData.openId + '/recipe/' + that.data.rid,
        method: 'POST',
        data: {
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res)
          var num = parseInt(that.data.collectnum)+1
          that.setData({
            collected: true,
            collectnum:num.toString()
          })
       },
      })
    } else {
      var that = this
      //取消收藏
      wx.request({
        url: 'https://csquare.wang/favorite/recipe/' + that.data.rid,
        method: 'DELETE',
        data: {
          openid: app.globalData.openId,
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('delete success')
          var num = parseInt(that.data.collectnum) - 1
          that.setData({
            collected: false,
            collectnum: num.toString()
          })
        },
      })
    }
  },
  //点击comment按钮
  onComment: function () {
    if (!this.data.commented) {
      this.setData({
        commented: true
      })
    } else {
      this.setData({
        commented: false
      })
    }

  },
  inputComment:function(e){
    this.setData({
      commenttext: e.detail.value
    })
  },

  //提交评论
  commitComment:function(){
    var that = this
    wx.request({
      url: 'https://csquare.wang/comment/recipe/'+ that.data.rid,
      method:'POST',
      data:{
        openid: app.globalData.openId,
        content:that.data.commenttext
      },
      header:{
        'content-type': 'application/json'
      },
      success(res){
        console.log("comment success")
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        })
        var num = parseInt(that.data.commentnum) + 1
        that.setData({
          commented:false,
          commentnum:num.toString()
        })
        that.getComments()
      }
    })
  },

  //获取评论列表
  getComments:function(){
  var that = this
  wx.request({
    url: 'https://csquare.wang/comment/recipe/' + that.data.rid,
    method: 'GET',
    data: {
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log(res.data)
      var temp_array = []
      for (let i = 0; i < res.data.length; i++) {
        let obj = {}
        obj.openid = res.data[i].openid,
          obj.name = res.data[i].name,
          obj.avatar = res.data[i].profile,
          obj.content = res.data[i].content
        temp_array.push(obj)
      }
      that.setData({
        commentArray: temp_array,
        commentnum:res.data.length
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //页面跳转参数处理
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        rid: data.data
      })
    })

    //获取食谱
    wx.request({
      url: 'https://csquare.wang/recipe/' + that.data.rid,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          difficulty: res.data.difficulty,
          image: res.data.image,
          ingredients: res.data.ingredients,
          nutrition: res.data.nutrition,
          size: res.data.size,
          steps: res.data.steps,
          timeNeeded: res.data.timeNeeded,
          title: res.data.title,
          uid: res.data.openid,
          time: res.data.time,
          collectnum: res.data.collectedTimes
        })
      }
    })

    //获取评论列表
    that.getComments()
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