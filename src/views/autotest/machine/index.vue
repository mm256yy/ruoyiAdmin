<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="执行机节点编号" prop="machineNodeCode">
        <el-input
          v-model="queryParams.machineNodeCode"
          placeholder="请输入执行机节点编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行机节点ip" prop="machineNodeIp">
        <el-input
          v-model="queryParams.machineNodeIp"
          placeholder="请输入执行机节点ip"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行机节点名称" prop="machineNodeName">
        <el-input
          v-model="queryParams.machineNodeName"
          placeholder="请输入执行机节点名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行机节点状态0不在线，1在线" prop="machineNodeStatus">
        <el-select v-model="queryParams.machineNodeStatus" placeholder="请选择执行机节点状态0不在线，1在线" clearable>
          <el-option
            v-for="dict in dict.type.machine_node_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['autotest:machine:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['autotest:machine:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['autotest:machine:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['autotest:machine:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="machineList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="执行机节点编号" align="center" prop="machineNodeCode" />
      <el-table-column label="执行机节点ip" align="center" prop="machineNodeIp" />
      <el-table-column label="执行机节点名称" align="center" prop="machineNodeName" />
      <el-table-column label="执行机节点状态0不在线，1在线" align="center" prop="machineNodeStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.machine_node_status" :value="scope.row.machineNodeStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="${comment}" align="center" prop="browser" />
      <el-table-column label="客户端版本由客户端上包" align="center" prop="clientVersion" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['autotest:machine:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['autotest:machine:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改自动化测试执行机对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="执行机节点编号" prop="machineNodeCode">
          <el-input v-model="form.machineNodeCode" placeholder="请输入执行机节点编号" />
        </el-form-item>
        <el-form-item label="执行机节点ip" prop="machineNodeIp">
          <el-input v-model="form.machineNodeIp" placeholder="请输入执行机节点ip" />
        </el-form-item>
        <el-form-item label="执行机节点名称" prop="machineNodeName">
          <el-input v-model="form.machineNodeName" placeholder="请输入执行机节点名称" />
        </el-form-item>
        <el-form-item label="执行机节点状态0不在线，1在线" prop="machineNodeStatus">
          <el-select v-model="form.machineNodeStatus" placeholder="请选择执行机节点状态0不在线，1在线">
            <el-option
              v-for="dict in dict.type.machine_node_status"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMachine, getMachine, delMachine, addMachine, updateMachine } from "@/api/autotest/machine";

export default {
  name: "Machine",
  dicts: ['machine_node_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 自动化测试执行机表格数据
      machineList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        machineNodeCode: null,
        machineNodeIp: null,
        machineNodeName: null,
        machineNodeStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        machineNodeCode: [
          { required: true, message: "执行机节点编号不能为空", trigger: "blur" }
        ],
        machineNodeIp: [
          { required: true, message: "执行机节点ip不能为空", trigger: "blur" }
        ],
        machineNodeName: [
          { required: true, message: "执行机节点名称不能为空", trigger: "blur" }
        ],
        machineNodeStatus: [
          { required: true, message: "执行机节点状态0不在线，1在线不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询自动化测试执行机列表 */
    getList() {
      this.loading = true;
      listMachine(this.queryParams).then(response => {
        this.machineList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        machineNodeCode: null,
        machineNodeIp: null,
        machineNodeName: null,
        machineNodeStatus: null,
        browser: null,
        clientVersion: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加自动化测试执行机";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMachine(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改自动化测试执行机";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMachine(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMachine(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除自动化测试执行机编号为"' + ids + '"的数据项？').then(function() {
        return delMachine(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('autotest/machine/export', {
        ...this.queryParams
      }, `machine_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
