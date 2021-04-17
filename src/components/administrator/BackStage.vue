<template>
  <div id="stage">
    <el-card>
      <el-row>
        <el-form :model="backstageFrom" ref="backstageFrom" class="form-head">
          <el-form-item>
             <el-cascader
             v-model="backstageFrom.value"
        :options="options"
         :props="{ expandTrigger: 'hover', checkStrictly: true  }"
          @change="handleChange"
          clearable
          >
          </el-cascader>
          </el-form-item>
         
        </el-form></el-row
      >
      <el-table :data="infList" stripe>
        <el-table-column type="index" width="50px"></el-table-column>
        <el-table-column prop="studentID" label="学号" width="130px">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="200px">
        </el-table-column>
        <el-table-column prop="number" label="电话" width="200px">
        </el-table-column>
        <el-table-column prop="flag" label="面试状态" width="200px">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.flag === 0">报名成功</el-tag>
            <el-tag v-else-if="scope.row.flag === 1" type="success">一面通过</el-tag>
            <el-tag v-else-if="scope.row.flag === 2" type="info">二面通过</el-tag>
            <el-tag v-else type="warning">三面通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="team" label="所属组别" width="180px">
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template v-slot:default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editStuinfo(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteStuinfo(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-sizes="[1, 3, 5, 8]"
        :page-size="queryInfo.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      ></el-pagination>
    </el-card>
    <!-- dialog对话框 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%" 
	  :modal-append-to-body="false">
      <el-form :model="editStuinfoForm" ref="editStuinfoForm" label-width="100px">
        <el-form-item label="手机号" prop="number">
          <el-input v-model="editStuinfoForm.number"></el-input>
        </el-form-item>
        <el-form-item prop="team">
          <el-select v-model="editStuinfoForm.team" placeholder="请选择方向">
            <el-option label="嵌入式" value="嵌入式"></el-option>
            <el-option label="前端组" value="前端组"></el-option>
            <el-option label="后台组" value="后台组"></el-option>
            <el-option label="安卓组" value="安卓组"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="editStuinfoForm.flag" placeholder="请选择状态">
            <el-option label="报名成功" value="0"></el-option>
            <el-option label="一面通过" value="1"></el-option>
            <el-option label="二面通过" value="2"></el-option>
            <el-option label="三面通过" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      backstageFrom: {
        num: "",
        value:[],
      },
      infList: [
      ],
      totalCount: 0,
      queryInfo: {
        currentPage: 1,
        rows: 8,
      },
      flagNum: {
        flag: 0,
        studentID: 0,
      },
      dialogVisible: false,
      editStuinfoForm: {
        number: 0,
        team: "前端组",
        flag: 1,
        id: '',
      },
      options:[
       {
         value:'嵌入式',
         label:'嵌入式组',
         children:[
          {
            value:0,
            label:'报名成功'
          },
          {
            value:1,
            label:'一面通过'
          },
          {
            value:2,
            label:'二面通过'
          },
          {
            value:3,
            label:'三面通过'
          },
         ]
       },
           {
         value:'前端组',
         label:'前端组',
         children:[
          {
            value:0,
            label:'报名成功'
          },
          {
            value:1,
            label:'一面通过'
          },
          {
            value:2,
            label:'二面通过'
          },
          {
            value:3,
            label:'三面通过'
          },
         ]
       },
           {
         value:'后台组',
         label:'后台组',
         children:[
          {
            value:0,
            label:'报名成功'
          },
          {
            value:1,
            label:'一面通过'
          },
          {
            value:2,
            label:'二面通过'
          },
          {
            value:3,
            label:'三面通过'
          },
         ]
       },
           {
         value:'安卓组',
         label:'安卓组',
         children:[
          {
            value:0,
            label:'报名成功'
          },
          {
            value:1,
            label:'一面通过'
          },
          {
            value:2,
            label:'二面通过'
          },
          {
            value:3,
            label:'三面通过'
          },
         ]
       },
           {
         value:'产品组',
         label:'产品组',
         children:[
          {
            value:0,
            label:'报名成功'
          },
          {
            value:1,
            label:'一面通过'
          },
          {
            value:2,
            label:'二面通过'
          },
          {
            value:3,
            label:'三面通过'
          },
         ]
       },
      ]
    };
  },
  methods: {
    searchByName() {
      this.backstageFrom.value =[]
      this.getInfList()
    },
    searchByDirection() {},
    //获取学生信息
    getInfList() {
      let url 
      let data = {}
      // console.log(data);
     
        if(this.backstageFrom.value.length===0){
        url = '/Servlet/FindByAllServlet'
      }else if(this.backstageFrom.value.length===1){
        url = '/Servlet/FindBySelectedServlet',
        data.team = this.backstageFrom.value[0]
        data.flag='全部'
      }else{
        url='/Servlet/FindBySelectedServlet'
        data.team = this.backstageFrom.value[0],
        data.flag= this.backstageFrom.value[1]
      }
    
        Object.assign(data,this.queryInfo)
       this.$post(url, data)
        .then((res) => {
          if (res.Status == 200) {
            console.log(res)
            this.infList = res.data;
            this.totalCount = res.totalCount;
          } else {
            this.$message("数据获取失败");
          }
        })
        .catch((err) => {
          this.$message.error("未知原因，数据获取失败！");
        });
    },

    editStuinfo(inf) {
      // console.log(inf);
      this.editStuinfoForm.number = inf.number;
      this.editStuinfoForm.team = inf.team;
      this.editStuinfoForm.flag = inf.flag;
      this.editStuinfoForm.id = inf.id;
      this.dialogVisible = true;
    },
    handleSizeChange(newSize) {
      this.queryInfo.rows = newSize;
      this.getInfList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage;
      this.getInfList();
    },
    //删除学生
    async deleteStuinfo(ID) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该学生, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      this.$post("/Servlet/DeleteServlet", { id: ID }).then((res) => {
        if (res.Status !== 200) {
          return this.$message.error("删除参数失败");
        }
        this.$message.success("删除参数成功");
        this.getInfList();
      });
    },
    //修改学生面试状态
    //确认修改学生信息
    confirmEdit() {
      this.$post("/Servlet/UpdateServlet", this.editStuinfoForm)
        .then((res) => {
          if (res.Status !== 200) {
            return this.$message.error("修改失败");
          }
          this.$message.success("修改成功！");
          this.getInfList();
        })
        .catch((err) => {
          this.message.error("修改失败");
        });
      this.dialogVisible = false;
    },
    ifadmin(){
      if(!sessionStorage.getItem('admin')){
        this.$router.push('/admin')
      }
    },
    handleChange(){
      // console.log(this.value);
      
      this.getInfList()
    }
  },

  created() {
    this.ifadmin()
    this.getInfList();
  },
  //  beforeRouteEnter(to, from, next){
  //    const token = sessionStorage.getItem('token')
  //     if(!token) return next('/admin')
  //     next()
  // }
};
</script>

<style lang="less" scoped>
#stage {
  width: 100%;
  height: 100%;
   display: flex;
    justify-content: center;
    align-items: center;
  .el-card {
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    .el-pagination{
      margin-top: 20px;
      position: absolute;
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
