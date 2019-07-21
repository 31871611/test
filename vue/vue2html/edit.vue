<template>
  <div class="edit">
    <quill-editor ref="myTextEditor"
                  v-model="content"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
    <input type="button" value="确定" @click="ck" />

    <div class="ql-container ql-snow">
      <div class="ql-editor" v-html="content"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'edit',
  data () {
    return {
      content: '',
      editorOption: {
        // something config
      }
    }
  },
  methods: {
    ck(){
      console.log(this.content)
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    }
  },
  mounted() {
    // you can use current editor object to do something(editor methods)
    console.log('this is my editor', this.editor)
    // this.editor to do something...
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  components: {
    quillEditor
  }
}
</script>

