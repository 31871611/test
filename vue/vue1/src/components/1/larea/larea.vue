<style scoped>
  @import "LArea.min.css";
  h1 {
    color: #42b983;
  }
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

  <h1>LArea</h1>
  <div class="content-block">
    <input id="demo1" type="text" readonly="" placeholder="城市选择特效"  value="广东省,深圳市,南山区"/>
    <input id="value1" type="hidden" value="20,234,504"/>
  </div>

  <div class="content-block">
    <input id="demo2" type="text" readonly="" placeholder="城市选择特效" />
    <input id="value2" type="hidden" />
  </div>

</template>

<script>
  import LArea from './LArea';
  import LAreaData from './LAreaData1';
  import {provs_data, citys_data, dists_data} from './LAreaData2';

  export default {
    data () {
      return {
        msg: 'iso三联地址联动'
      }
    },
    ready:function (){

      var area1 = new LArea();
      area1.init({
        'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#value1', //选择完毕后id属性输出到该位置
        'keys': {
          id: 'id',
          name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': LAreaData //数据源
      });
      area1.value=[1,13,3];//控制初始位置，注意：该方法并不会影响到input的value


      var area2 = new LArea();
      area2.init({
        'trigger': '#demo2',
        'valueTo': '#value2',
        'keys': {
          id: 'value',
          name: 'text'
        },
        'type': 2,
        'data': [provs_data, citys_data, dists_data]
      });


    },
    methods:{

    },
    components:{

    }
  }
</script>

