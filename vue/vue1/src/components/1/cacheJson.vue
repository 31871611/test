<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <ul>
    <li v-for="item in list">
      <p>{{item.title}}</p>
      <p>{{item.alt}}</p>
      <p>{{item.id}}</p>
      <p><img :src="item.image" alt=""></p>
      <p>{{item.isbn10}}</p>
      <p>{{item.isbn13}}</p>
      <p>{{item.pages}}</p>
      <p>{{item.price}}</p>
      <p>{{item.pubdate}}</p>
      <p>{{item.summary}}</p>
    </li>
  </ul>

</template>

<script>
export default {
  data () {
    return {
      msg: '缓存数据',
      list: ''
    }
  },
  ready: function () {
    // 先读取缓存数据
    if (window.localStorage) {
      if (window.localStorage.getItem('indexData')) {
        var cacheArr = []
        // 保存在localStorage中的数据要是双引号
        // var a = [{'title': '用户名'}]
        cacheArr.push(JSON.parse(window.localStorage.getItem('indexData')))
        this.list = cacheArr[0]
        console.log(cacheArr)
      }
    }
    /**/
    this.$http.jsonp('https://api.douban.com/v2/book/1220564').then(function (response) {
      // get status
//      console.log(response.status.data)
      console.time('test')
      this.list = response
      console.timeEnd('test')

      // 保存、更新数据
      window.localStorage.setItem('indexData', JSON.stringify(response))

      // get all headers
      // console.log(response.headers());

      // get 'expires' header
      // console.log(response.headers('expires'));

      // set data on vm
      // this.$set('lists', response)
      // console.log(response)
    }, {
      // headers: {'Content-Type': 'Access-Control-Allow-Origin'}
    }, function (response) {
      // error callback
    })



    /*
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
      headers: {
      },
      emulateJSON: true
    }).then(function(response) {
      console.log(response.data);
    }, function(response) {
      console.log(response)
    });
     */


  }
}
</script>

