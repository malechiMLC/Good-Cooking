// custom-components/recipesList/recipeslist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoArray:{
      type:Array,
      value:[
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
      ]
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

  }
})

