<template>
  <div class="device-dialog">
    <el-dialog
      :visible.sync="centerDialogVisible"
      :show-close="showClo"
      width="60%"
      center>
      <span slot="title" class="dialog-header ">
        <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
        <div>{{ dialogtitle }}</div>
        <el-button :disabled="disabled" size="mini" type="primary" @click="add_device">确 定</el-button>
      </span>
      <div v-loading="loading" class="parameter">
        <span class="parameter-item">
          <h4>设备类型</h4>
          <div class="parameter-item-wrap">
            <div class="parameter-item-center">
              <div>设备类型</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <selectbox :options="device_options.value1" v-model="form_data.DeviceType"/>
                </span>
              </div>
            </div>
          </div>
          <h4>通讯方式</h4>
          <div class="parameter-item-wrap">
            <div class="parameter-item-center">
              <div>网络域名</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <el-input
                    v-model="form_data.ipaddress"
                    placeholder="请输入内容"
                    clearable
                    class="input-box"/>
                </span>
              </div>
            </div>
            <div class="parameter-item-center">
              <div>Port</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <el-input
                    v-model="form_data.CommPort"
                    placeholder="请输入内容"
                    clearable/>
                </span>
              </div>
            </div>
          </div>
        </span>
        <span class="parameter-item">
          <h4>通讯参数</h4>
          <div class="parameter-item-wrap">
            <div class="parameter-item-center">
              <div>终端编号</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <el-input
                    v-model="form_data.ClientNumber"
                    :disabled="Prohibit"
                    placeholder="请输入内容"
                    clearable
                    class="input-box"/>
                </span>
              </div>
            </div>
            <div class="parameter-item-center">
              <div>机器号</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <el-input
                    v-model="form_data.Clientid"
                    placeholder="请输入内容"
                    clearable
                    class="input-box"/>
                </span>
              </div>
            </div>
          </div>
          <div class="parameter-item-wrap">
            <div class="parameter-item-center">
              <div>机器名称</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <el-input
                    v-model="form_data.ClientName"
                    placeholder="请输入内容"
                    clearable
                    class="input-box"/>
                </span>
              </div>
            </div>
            <div class="parameter-item-center">
              <div>设备组</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <selectbox :options="group_list" v-model="form_data.Floorid"/>
                </span>
              </div>
            </div>
          </div>
          <div class="parameter-item-wrap">
            <div class="parameter-item-center">
              <div>考勤状态</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <selectbox :options="device_options.value2" v-model="form_data.RecStatus"/>
                </span>
              </div>
            </div>
            <div class="parameter-item-center">
              <div>设备标识</div>
              <div class="net-input-item">
                <span class="icon-size icon-nav-network"/>
                <span>
                  <selectbox :options="device_options.value3" v-model="form_data.deviceflag"/>
                </span>
              </div>
            </div>
          </div>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import selectbox from '@/components/select'
import options from '@/components/mixin/device'
export default {
  components: {
    selectbox
  },
  mixins: [options],
  props: {
    de_data: {
      type: Number,
      default: null
    },
    group_list: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      showClo: false,
      dialogtitle: '新增终端',
      Prohibit: false,
      form_data: {
        DeviceType: null,
        Clientid: null,
        ClientNumber: null,
        ClientName: null,
        Floorid: null,
        RecStatus: null,
        deviceflag: null,
        ipaddress: null,
        CommPort: null,
        Linkmode: 1
      },
      loading: true,
      disabled: true
    }
  },
  methods: {
    // 增加修改终端
    add_device() {
      if (this.de_data === 1) {
        this.$store.dispatch('interactive/Device_create', this.form_data).then(response => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.centerDialogVisible = false
          this.$emit('Terminal_list')
        }).catch((error) => {
          console.log(error)
          this.$message.error('新增失败')
        })
      } else if (this.de_data === 0) {
        console.log(this.form_data)
        this.$store.dispatch('interactive/Device_update', this.form_data).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.centerDialogVisible = false
        }).catch((error) => {
          console.log(error)
          this.$message.error('修改失败')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .device-dialog .dialog-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-row{
    background:#fff;
    box-shadow:0px 2px 7px 0px rgba(0,0,0,0.13);
    border-radius:5px;
    padding: 0 10px 10px;
    margin-bottom: 10px;
    h4{
      border-bottom:1px solid #bdbdbd;
      margin: 0 0 20px 0;
      padding: 12px 0;
      color:#47a369;
    }
    .net-input-item{
      width: 49%;
    }
  }
  .parameter{
        display: flex;
  }
  .parameter-item{
    background:#fff;
    box-shadow:0px 2px 7px 0px rgba(0,0,0,0.13);
    border-radius:5px;
    width: 49.5%;
    padding: 0 10px 10px;
    &:first-child{
      margin-right: 0.5%;
    }
    &:last-child{
      margin-left: 0.5%;
    }
    h4{
      border-bottom:1px solid #bdbdbd;
      margin: 0 0 20px 0;
      padding: 12px 0;
      color:#47a369;
    }
  }
  .el-radio-group{
    width: 100%;
    p{
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .el-radio{
      font-weight: 600;
    }
    .port{
      font-size: 16px;
      margin-top:15px;
    }
  }
  .net-input{
    margin: 0 20px;
    }
    .net-input-item{
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      border-bottom:1px solid #999;
      margin-top: 14px;
      &:last-child{
        margin-bottom: 30px;
      }
    .icon-size{
      color:#47a369;
      width: 12%;
      flex-shrink: 0;
      flex-basis: 12%;
    }
    span:last-child{
      width: 88%;
      flex-basis: 88%;
      flex-shrink: 0;
    }
  }
  .parameter-item-wrap{
    display: flex;
    align-content: center;
    width: 100%;
    margin-bottom: 10px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .parameter-item-center{
    width: 48%;
    &:first-child{
      margin-right: 2%;
    }
    &:last-child{
      margin-left: 2%;
    }
    >div:first-child{
      font-weight: 600;
    }
  }
  ul{
    list-style: none;
    padding-left: 0;
  }
  .search-device{
    .seach-list{
      margin: 10px 0;
      padding: 0 10px;
      box-shadow:0px 2px 7px 0px rgba(0,0,0,0.13);
      background: #fff;
      border-radius:5px;
      .list-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:nth-child(2){
          background: #f2f2f2;
          padding: 5px 10px;
        }
        &:nth-child(4){
          background: #f2f2f2;
          padding: 5px 10px;
        }
        .el-button{
          padding: 8px 11px;
          margin: 4px 0;
        }
        >ul{
          width: 100%;
          >li{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom:1px solid #eee;
          }
        }
      }
    }
  }

</style>
