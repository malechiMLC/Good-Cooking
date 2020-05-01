// components/card/card.js
const app=getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoArray:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ifactive:[]
  },

  lifetimes:{
    ready: function() {
      var _this=this
      console.log(_this.data.infoArray)
      for(var i=0;i<_this.data.infoArray.length;i++){
        _this.data.ifactive.push('false')
      }
      console.log(_this.data.ifactive)
    }

  },
  /**
   * 组件的方法列表
   */
  methods: {
    tohomepage:function(e){
      wx.navigateTo({
        url: '/pages/homepage/homepage?otherOpenId='+e.currentTarget.id,
      })
    },
    toshare:function(e){
      wx.navigateTo({
        url: '/pages/post/post?postid=' + e.currentTarget.id,
      })
    },
    like:function(e){
      var _this=this
      // console.log(_this.data.infoArray)
      var index=Number(e.currentTarget.id)
      // console.log(index)
      if(_this.data.ifactive[index]=='true'){
        console.log(_this.data.infoArray[index].id)
        wx.request({
          url: 'https://csquare.wang/like/post/'+_this.data.infoArray[index].id,
          method: 'DELETE',
          data: {
            openid:app.globalData.openId
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            var temp=_this.data.ifactive
            temp[index]='false'
            var temp_1=_this.data.infoArray
            temp_1[index].likeNum--
            _this.setData({
              ifactive:temp,
              infoArray:temp_1
            })
          }
        })
      }else{
        wx.request({
          url: 'https://csquare.wang/like/post/'+_this.data.infoArray[index].id,
          method: 'POST',
          data: {
            openid:app.globalData.openId
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            var temp=_this.data.ifactive
            temp[index]='true'
            var temp_1=_this.data.infoArray
            temp_1[index].likeNum++
            _this.setData({
              ifactive:temp,
              infoArray:temp_1
            })
          }
        })
      }
    }
  }
})
