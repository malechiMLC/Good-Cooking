// custom-components/foodlist/foodlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoArray: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toRecipe:function(e){
      var recipeID = e.currentTarget.dataset.index
      console.log(e.currentTarget.dataset.index)
      wx.navigateTo({
        url: '/pages/recipe/recipe',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: recipeID })
        }
      })
    }
  }
})
