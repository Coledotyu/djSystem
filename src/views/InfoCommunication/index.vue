<template>
  <div class="info-communication-container">
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="passTableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        border
        :default-sort="{prop: 'published_time', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="post_theme" label="信息主题" width="80"></el-table-column>
        <el-table-column prop="post_owner" label="发布人" width="80"></el-table-column>
        <el-table-column prop="post_content_address" label="求职地址"></el-table-column>
        <el-table-column prop="post_content_salary" label="薪水/元"></el-table-column>
        <el-table-column prop="post_content_duration" label="工作时长/h"></el-table-column>
        <el-table-column prop="post_content_comms" label="联系方式"></el-table-column>
        <el-table-column prop="published_time" label="发布时间" sortable></el-table-column>
        <el-table-column fixed="right" label="操作" width="350">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row)" size="mini" type="primary">详情</el-button>
            <el-button
              @click="handleAdd(scope.row)"
              icon="el-icon-plus"
              type="primary"
              size="mini"
            >增加</el-button>
            <el-button
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
              type="primary"
              size="mini"
            >修改</el-button>
            <el-button
              @click="handleDelete(scope.row)"
              size="mini"
              icon="el-icon-delete"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="rows"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 信息详情 -->
    <el-dialog title="信息详情" :visible.sync="detailsDialogFormVisible">
      <el-form :model="selectedTable">
        <el-form-item label="信息主题" label-width="140px">
          <el-input v-model="selectedTable.post_theme" disabled></el-input>
        </el-form-item>
        <el-form-item label="发布人" label-width="140px">
          <el-input v-model="selectedTable.post_owner" disabled></el-input>
        </el-form-item>
        <el-form-item label="发布时间" label-width="140px">
          <el-input v-model="selectedTable.published_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="求职地址" label-width="140px">
          <el-input v-model="selectedTable.post_content_address" disabled></el-input>
        </el-form-item>
        <el-form-item label="薪水" label-width="140px">
          <el-input v-model="selectedTable.post_content_salary" disabled></el-input>
        </el-form-item>
        <el-form-item label="工作时长" label-width="140px">
          <el-input v-model="selectedTable.post_content_duration" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="140px">
          <el-input v-model="selectedTable.post_content_comms" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailsInfoCommunicating()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改信息 -->
    <el-dialog title="修改信息" :visible.sync="editDialogFormVisible">
      <el-form :model="selectedTable">
        <el-form-item label="信息主题" label-width="140px">
          <el-input v-model="selectedTable.post_theme"></el-input>
        </el-form-item>
        <el-form-item label="发布人" label-width="140px">
          <el-input v-model="selectedTable.post_owner"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" label-width="140px">
          <el-input v-model="selectedTable.published_time"></el-input>
        </el-form-item>
        <el-form-item label="求职地址" label-width="140px">
          <el-input v-model="selectedTable.post_content_address"></el-input>
        </el-form-item>
        <el-form-item label="薪水" label-width="140px">
          <el-input v-model="selectedTable.post_content_salary"></el-input>
        </el-form-item>
        <el-form-item label="工作时长" label-width="140px">
          <el-input v-model="selectedTable.post_content_duration"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="140px">
          <el-input v-model="selectedTable.post_content_comms"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfoCommunicatingTable()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加信息 -->
    <el-dialog title="添加信息" :visible.sync="addDialogFormVisible">
      <el-form :model="addedTable">
        <el-form-item label="信息主题" label-width="140px">
          <el-input v-model="addedTable.post_theme"></el-input>
        </el-form-item>
        <el-form-item label="发布人" label-width="140px">
          <el-input v-model="addedTable.post_owner"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" label-width="140px">
          <el-input v-model="addedTable.published_time"></el-input>
        </el-form-item>
        <el-form-item label="求职地址" label-width="140px">
          <el-input v-model="addedTable.post_content_address"></el-input>
        </el-form-item>
        <el-form-item label="薪水" label-width="140px">
          <el-input v-model="addedTable.post_content_salary"></el-input>
        </el-form-item>
        <el-form-item label="工作时长" label-width="140px">
          <el-input v-model="addedTable.post_content_duration"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="140px">
          <el-input v-model="addedTable.post_content_comms"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfoCommunicatingTable()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatTime } from "@/utils/format";

export default {
  data() {
    return {
      passTableData: [],
      multipleSelection: [],
      rows: 10,
      total: Number,
      currentPage: 1,
      offset: 0,
      limit: 20,
      selectedTable: {},
      addedTable: {},
      detailsDialogFormVisible: false,
      editDialogFormVisible: false,
      addDialogFormVisible: false
    };
  },
  mounted() {
    this.getInfoCommunicatingTable();
  },
  methods: {
    getInfoCommunicatingTable() {
      const data = {
        page: this.currentPage,
        rows: this.rows
      };
      this.$http
        .post("/api/infoCommunicating/query/all", data)
        .then(res => {
          this.passTableData = res.data.result;
          this.passTableData.forEach(function(element) {
            element.published_time = formatTime(element.published_time);
          });
          this.$http.get("/api/infoCommunicating/query/count").then(res => {
            this.total = res.data.data.length;
          });
        })
        .catch(err => {
          console.log("获取总数失败");
        });
    },
    detailsInfoCommunicating() {
      this.detailsDialogFormVisible = false;
      this.getInfoCommunicatingTable();
    },
    updateInfoCommunicatingTable() {
      const data = {
        _id: this.selectedTable._id,
        post_theme: this.selectedTable.post_theme,
        post_owner: this.selectedTable.post_owner,
        published_time: this.selectedTable.published_time,
        post_content_address: this.selectedTable.post_content_address,
        post_content_salary: this.selectedTable.post_content_salary,
        post_content_duration: this.selectedTable.post_content_duration,
        post_content_comms: this.selectedTable.post_content_comms
      };
      this.$http
        .post("/api/infoCommunicating/modify", data)
        .then(res => {
          this.getInfoCommunicatingTable();
          this.$message({
            message: "信息更新成功！",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            message: "信息更新失败！",
            type: "error"
          });
        });
      this.getInfoCommunicatingTable();
      this.editDialogFormVisible = false;
    },
    addInfoCommunicatingTable() {
      const data = this.addedTable;
      this.$http
        .post("/api/infoCommunicating/add", data)
        .then(res => {
          this.getInfoCommunicatingTable();
          this.$message({
            message: "信息添加成功！",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            message: "信息添加失败！",
            type: "error"
          });
        });
      this.getInfoCommunicatingTable();
      this.addDialogFormVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getInfoCommunicatingTable();
    },
    handleDetails(row) {
      this.getInfoCommunicatingTable();
      this.detailsDialogFormVisible = true;
      this.selectedTable = row;
    },
    handleEdit(row) {
      this.getInfoCommunicatingTable();
      this.editDialogFormVisible = true;
      this.selectedTable = row;
    },
    handleAdd(row) {
      this.getInfoCommunicatingTable();
      this.addDialogFormVisible = true;
    },
    handleDelete(row) {
      const data = {
        _id: row._id
      };

      this.$http
        .post("/api/infoCommunicating/delete", data)
        .then(res => {
          this.getInfoCommunicatingTable();
          this.$message({
            message: "删除成功！",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            message: "删除失败!",
            type: "error"
          });
        });

      this.getInfoCommunicatingTable();
    }
  }
};
</script>

<style lang="scss">
</style>


