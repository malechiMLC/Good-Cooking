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
    toRecipe:function(event){
      var recipeID = event.currentTarget.dataset.index
      console.log(event.currentTarget.dataset.index)
      wx.navigateTo({
        url: '/pages/recipe/recipe?recipeID=' + recipeID,
      })
    }
  }
})
