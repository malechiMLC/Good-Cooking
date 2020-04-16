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
    likenum:'',
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
    commentArray: [
      {
        avatar:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg",
        name:'user',
        comment:"great!"
      },
      {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg",
        name: 'user',
        comment: "great!"
      },
      {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg",
        name: 'user',
        comment: "great!"
      }
    ]
  },

  //获取评论
  getComments:function(){
    var that = this
    var list = []
    var commentList = []
    wx.request({
      url: 'https://csquare.wang/comment/recipe/' + that.data.rid,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        for(var i=0;i<res.data.length;i++){
          list.push(res.data[i])
        }
      }
    })
    console.log(list)
    //对获取的list做处理
    // for(var i=0;list.length;i++){
    //   var avatar,name = this.getCommentUserInfo(list[i].openid)
    //   var obj
    //   obj.name = name
    //   obj.avatar = avatar
    //   obj.openid = list[i].openid
    //   obj.comment = list[i].content
    //   commentList.push(obj)
    // }
    // that.setData({
    //   commentArray:commentList
    // })
  },
  //根据openId反向获取用户信息
  getCommentUserInfo:function(userId){
    wx.request({
      url: 'https://csquare.wang/user',
      method:'GET',
      data:{
        openid:userId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        console.log(res.data)
        return res.data.avatar,res.data.name
      }
    })
  },
  //点击collet按钮
  onCollect:function(){
    if (!this.data.collected) {
      var that = this
      console.log('if')
      console.log(app.globalData.openId)
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
          console.log('collect success')
          that.setData({
            collected: true
          })
       },
        fail() {
          console.log('collect fail')
        }
      })
    } else {
      var that = this
      console.log('else')
      console.log(app.globalData.openId)
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
          console.log(res)
          that.setData({
            collected: false
          })
        },
        fail() {
          console.log('delete fail')
        }
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
        that.setData({
          commented:false
        })
        //刷新评论
        that.getComments()
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log('onload get openid')
    console.log(app.globalData.openId)
    // 页面跳转参数处理
    // let sid = options.recipeID
    // let rid = parseInt(sid)
    // this.setData({
    //   id:rid
    // })

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
        console.log(res)
        that.setData({
          difficulty:res.data.difficulty,
          image:res.data.image,
          ingredients:res.data.ingredients,
          nutrition:res.data.nutrition,
          size:res.data.size,
          steps:res.data.steps,
          timeNeeded:res.data.timeNeeded,
          title:res.data.title,
          uid:res.data.openid,
          time:res.data.time,
        })
      }
    })

    // that.getComments()

    that.getCommentUserInfo('ovQMG5twIxjfeMk7WdJt8hAIZDBQ')

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