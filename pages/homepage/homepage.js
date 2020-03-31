// pages/homepage/homepage.js
const app=getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    otherOpenId:'111',      //个人主页的所有者的openid
    name:'昵称在这里~',
    sex:'女',
    profile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg',
    follows:[{
      openid:111,
      name:'被关注用户1',
      sex:'女',
      profile:'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg'
    },{
      openid:222,
      name:'被关注用户2',
      sex:'男',
      profile:'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg'
    },{
      openid:333,
      name:'被关注用户3',
      sex:'女',
      profile:'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg'
    }],
    followsLength:3,
    followers:[{
      openid:111,
      name:'关注用户1',
      sex:'女',
      profile:'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg'
    },{
      openid:222,
      name:'关注用户2',
      sex:'男',
      profile:'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg'
    },{
      openid:333,
      name:'关注用户3',
      sex:'女',
      profile:'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg'
    }],
    followersLength:3,
    likes:233,
    iffollow:'关注',    //关注/取消关注
    btnColor:'red',
    txtColor:'white',
    caipuColor:'#777',
    dongtaiColor:'#bbb',
    dongtaiArray:[
      {
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"这里是内容",
        avatarUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg',
        author:"作者名",
        likeNum:'2000'
      },{
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"这里是标题",
        avatarUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg',
        author:"作者名",
        likeNum:'2000'
      },{
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"这里是标题",
        avatarUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg',
        author:"作者名",
        likeNum:'2000'
      }
    ],
    caipuArray:[
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
    ],
    iscaipu:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.otherOpenId)
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
    var _this=this
  //获取个人主页信息
  //  wx.request({
  //   url: 'https://csquare.wang/user/'+_this.data.otherOpenId,
  //   method: 'GET',
  //   data: {},
  //   header: {
  //     'content-type': 'application/json'
  //   },
  //   success(res) {
  //     _this.setData({
  //       name:res.data.name,
  //       sex:res.data.sex,
  //       profile:res.data.profile
  //     })
  //   }
  // })

    // 关注了谁
    // wx.request({
    //   url: 'https://csquare.wang/user/'+_this.data.otherOpenId+'/follow',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     _this.setData({
    //       follows:res.data,
    //       followsLength:res.data.length
    //     })
    //   }
    // })
    //被谁关注了
    // wx.request({
    //   url: 'https://csquare.wang/user/'+_this.data.otherOpenId+'/follower',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     _this.setData({
    //       followers:res.data,
    //       followersLength:res.data.length
    //     })
    //   }
    // })
    //获赞数
    // wx.request({
    //   url: 'https://csquare.wang/like/post/'+app.globalData.openId+'/number',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     _this.setData({
    //       likes:res.data
    //     })
    //   }
    // })
    // 登录者是否关注了这个人
    // wx.request({
    //   url: 'https://csquare.wang/user/'+app.globalData.openId+'/follow',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     var follows=[]
    // follows=res.data
    // for(var i=0;i<follows.lenght;i++){
    //   if(follows[i].openid==app.globalData.openId){
    //     _this.setData({
    //       iffollow:'取消关注',
          // btnColor:'white',
          // txtColor:'red'
    //     })
    //   }
    // }
    //   }
    // })

    // 获取分享列表
    // wx.request({
    //   url: 'https://csquare.wang/post',
    //   method: 'GET',
    //   data: { },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     var temp_array=[]
    //     for(var i=0;i<res.length;i++){
    //       var obj
    //       obj.author=res.data[i].name
    //       obj.bgUrl=res.data[i].images[0]
    //       obj.text=res.data[i].text
    //       obj.avatarUrl=res.data[i].profile
    //       obj.likeNum=res.data[i].images.length*10+1     //fake likeNum

    //       temp_array.push(obj)
    //     }

    //     _this.setData({
    //       infoArray:temp_array
    //     })
    //   }
    // })

    //获取菜谱列表

    wx.setNavigationBarTitle({
      title: _this.data.name
   })
  },

  iffollow:function(){
    var _this=this
    // 关注
    if(_this.data.iffollow=='关注'){
      // wx.request({
      //     url: 'https://csquare.wang/like/post/'+app.globalData.openId+'/number',
      //     method: 'POST',
      //     data: {
      //       followId:_this.data.otherOpenId
      //     },
      //     header: {
      //       'content-type': 'application/json'
      //     },
      //     success(res) {
      //       if(res.data=='true'){
      //         _this.setData({
      //           iffollow:'取消关注',
      //           btnColor:'white',
      //           txtColor:'red'
      //         })
      //       }
      //     }
      //   })
    }
    // 取消关注
    else if(_this.data.iffollow=='取消关注'){
      // wx.request({
      //   url: 'https://csquare.wang/like/post/'+app.globalData.openId+'/number',
      //   method: 'DELETE',
      //   data: {
      //     followId:_this.data.otherOpenId
      //   },
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   success(res) {
      //     if(res.data=='true'){
      //       _this.setData({
      //         iffollow:'关注',
      //         btnColor:'red',
      //         txtColor:'white'
      //       })
      //     }
      //   }
      // })
    }
  },
  changetab:function(){
    var _this=this
    console.log
    if(_this.data.iscaipu){
      _this.setData({
        iscaipu:false,
        caipuColor:'#bbb',
        dongtaiColor:'#777'
      })
    }else{
      _this.setData({
        iscaipu:true,
        caipuColor:'#777',
        dongtaiColor:'#bbb'
      })
    }
  },
  showfollows:function(){
    var _this=this
    wx.navigateTo({
      url: '/pages/followlist/followlist',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: _this.data.follows})
      }
    })
  },
  showfollowers:function(){

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