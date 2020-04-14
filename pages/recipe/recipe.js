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
    uid:'',
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

  //collect
  onCollect:function(){
    console.log(app.globalData.openid)
    if (!this.data.collected) {
      var that = this
      //收藏
      wx.request({
        url: 'https://csquare.wang/favorite/user/' + app.globalData.openid + '/recipe/' + that.data.rid,
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
      //取消收藏
      wx.request({
        url: 'https://csquare.wang/favorite/recipe/' + that.data.rid,
        method: 'delete',
        data: {
          openid: app.globalData.openid
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
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

  // //coLike
  // onLike: function () {
  //   if (!this.data.liked) {
  //     this.setData({
  //       liked: true
  //     })
  //   } else {
  //     this.setData({
  //       liked: false
  //     })
  //   }
  // },
  //comment-open/close
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
  //comment-commit
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
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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

    // 获取评论
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
        that.setData({
          commentArray:res.data
        })
      }
    })
    // 处理获得的评论对象数组
    // var temp_array = []
    // for (var i =0;i<temp_array.length)
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