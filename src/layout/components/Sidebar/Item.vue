<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
      isOne:{
          type: [Boolean,String],
          default: false
      }
  },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        isCollapse() {
            return !this.sidebar.opened
        },
    },
    setup(){

    },
    render(h){

        const vNodes = []
        if (this.icon) {
            vNodes.push(<svg-icon icon-class={this.icon}/>)
        }

        // 如果展开
        if (!this.isCollapse) {
            vNodes.push(<span slot='title'>{(this.title)}</span>)
         }else{
            // // 如果关闭
            if(this.isOne == true){
                return ;
            }else{
                vNodes.push(<span slot='title'>{(this.title)}</span>)
            }
        }




        return vNodes
    }
}
</script>
