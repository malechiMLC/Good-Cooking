// custom-components/commentcard/commentcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentArray: {
      type: Array,
      value: [],
      observer:function(newval,oldval){
        console.log(this.data.commentArray)
        console.log(newval)
        this.setData({
          commentArray:newval
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    comments:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tohomepage: function (e) {
      wx.navigateTo({
        url: '/pages/homepage/homepage?otherOpenId=' + e.currentTarget.id,
      })
    },
  }
})
