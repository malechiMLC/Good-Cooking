// custom-components/recipesList/recipeslist.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    torecipe:function(e){
      console.log(e.currentTarget.id)
      wx.navigateTo({
        url: '/pages/recipe/recipe?recipeID='+e.currentTarget.id
      })
    }
  }
})

