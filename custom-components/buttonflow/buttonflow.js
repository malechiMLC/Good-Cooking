// custom-components/buttonflow/buttonflow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label:{
      type:String,
      value:''
    },
    words:{
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
    sendKeyword:function(e){
      // console.log(e.currentTarget.dataset.id)
      this.triggerEvent('sendKeyword', e.currentTarget.dataset.id)
    }
  }
})

