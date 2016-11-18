<style scoped>
  @import "photoswipe.css";
  @import "default-skin.css";
  h1 {
     color: #42b983;
   }
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

      <!-- Container that holds slides.
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
          Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">

        <div class="pswp__top-bar">

          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

          <button class="pswp__button pswp__button--share" title="Share"></button>

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
  import PhotoSwipe from './photoswipe';
  import PhotoSwipeUIDefault from './photoswipe-ui-default';
  export default {
    data () {
      return {
        msg: 'photoswipe'
      }
    },
    ready:function (){

/*
      //生成对象.数组对象
      function obj(id,name){
        var o={};
        o.id=id;
        o.name=name;
        return o;
      }

    var items=[];
    for(var i=0;i<this.list.length;i++){
    items.push(generateObj(this.headUrl + this.list[i].docDir));
    }

      var arr=[];
      arr.push(obj(1,'用户1'));
      arr.push(obj(2,'用户2'));
      console.log(arr);

 */

      var pswpElement = document.querySelectorAll('.pswp')[0];

      // build items array
      var items = [
        {
          src: 'http://njizhenfang.jizhenfang.com/original/commodity/20161108/3593d93a90614baea4531721238deb6f.jpg',
          w: 1000,
          h: 1000
        },
        {
          src: 'http://njizhenfang.jizhenfang.com/original/commodity/20161108/099a499b063c48d7bcabda05f977709e.jpg',
          w: 1000,
          h: 1000
        }
      ];

      // define options (if needed)
      var options = {
        // optionName: 'option value'
        // for example:
        index: 0, // start at first slide
        pinchToClose : false,
        closeOnVerticalDrag : false,
        history : false
      };

      // Initializes and opens PhotoSwipe
      // var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUIDefault, items, options);
      var gallery = new PhotoSwipe( pswpElement, false, items, options);
      gallery.init();


    },
    methods:{

    },
    components:{

    }
  }
</script>

