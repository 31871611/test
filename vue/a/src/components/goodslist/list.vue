<template>

<ul class="goods_list con">
    <li>
        <a href=""><img v-bind:src="'src/assets/images/2.jpg'"  alt=""/></a>
        <p>A859 郭懋介</p>
        <strong>￥18,500</strong>
        <a href="" class="buy"></a>
        <div class="love">
            <i></i>
            <b>1</b>
        </div>
        <i class="out"><a href=""></a></i>
    </li>
    <li>
        <a href=""><img v-bind:src="'src/assets/images/2.jpg'"  alt=""/></a>
        <p>A859 郭懋介残荷听雨系列套件章</p>
        <strong>￥18,500</strong>
        <span class="red">即将开售</span>
        <div class="love">
            <i></i>
            <b>2</b>
        </div>
        <i class="booked"><a href=""></a></i>
    </li>

    <li v-for="list in lists">
        <a href=""><img v-bind:src="list.url"  alt=""/></a>
        <p>{{list.commodityName}}</p>
        <strong>{{list.price}}</strong>
        <a href="" class="buy"></a>
        <div class="love">
            <i v-bind:class="{'select':list.love}"></i>
            <b>{{list.loveNum}}</b>
        </div>
    </li>


</ul>

</template>


<script>


    export default{
        ready:function(){
//            this.$http.get('src/api/book.json', function(data) {
////            this.$http.post('src/api/book.json',{a:"a1"},function(data) {
//                this.$set('lists', data);
//                console.log(JSON.stringify(this.lists));
//            }).error(function(data, status, request) {
//                console.log('fail' + status + "," + request);
//            });

            // GET request
//            this.$http.jsonp('http://pan.jizhenfang.com:8211/dataSource/category/listCategory/0').then(function (response) {
//            this.$http.jsonp('http://192.168.1.165/jizhenfang-php2/test.php',{jsonp:'callback'}).then(function (response) {
            this.$http.get('http://localhost/json.php',{jsonp:'callback'}).then(function (response) {

                // get status
                alert(response.status);

                // get all headers
                //console.log(response.headers());

                // get 'expires' header
                //console.log(response.headers('expires'));

                // set data on vm
//                this.$set('lists', response)
                console.log(response);

            },{
//                headers: {'Content-Type': 'Access-Control-Allow-Origin'}
            }, function (response) {

                // error callback
            });


        },
        data(){
            return{
                lists:""
            }
        }
    }


</script>