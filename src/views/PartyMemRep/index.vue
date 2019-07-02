<template>
  <div class="party-mem-rep-container">
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="passTableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        border
        :default-sort="{prop: 'time', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="phone_number" label="手机号"></el-table-column>
        <el-table-column prop="address" label="家庭所在地"></el-table-column>
        <el-table-column prop="party_branch" label="党支部"></el-table-column>
        <el-table-column prop="specialty" label="特长"></el-table-column>
        <el-table-column prop="time" label="报到时间" sortable></el-table-column>
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

    <!-- 党员报到详情 -->
    <el-dialog title="党员报到信息详情" :visible.sync="detailsDialogFormVisible">
      <el-form :model="selectedTable">
        <el-form-item label="姓名" label-width="140px">
          <el-input v-model="selectedTable.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="140px">
          <el-input v-model="selectedTable.age" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="140px">
          <el-input v-model="selectedTable.phone_number" disabled></el-input>
        </el-form-item>
        <el-form-item label="家庭所在地" label-width="140px">
          <el-input v-model="selectedTable.address" disabled></el-input>
        </el-form-item>
        <el-form-item label="党支部" label-width="140px">
          <el-input v-model="selectedTable.party_branch" disabled></el-input>
        </el-form-item>
        <el-form-item label="特长" label-width="140px">
          <el-input v-model="selectedTable.specialty" disabled></el-input>
        </el-form-item>
        <el-form-item label="报到时间" label-width="140px">
          <el-input v-model="selectedTable.time" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailsPartyMemRep()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改党员报到信息 -->
    <el-dialog title="修改党员报到信息" :visible.sync="editDialogFormVisible">
      <el-form :model="selectedTable">
        <el-form-item label="姓名" label-width="140px">
          <el-input v-model="selectedTable.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="140px">
          <el-input v-model="selectedTable.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="140px">
          <el-input v-model="selectedTable.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="家庭所在地" label-width="140px">
          <el-input v-model="selectedTable.address"></el-input>
        </el-form-item>
        <el-form-item label="党支部" label-width="140px">
          <el-input v-model="selectedTable.party_branch"></el-input>
        </el-form-item>
        <el-form-item label="特长" label-width="140px">
          <el-input v-model="selectedTable.specialty"></el-input>
        </el-form-item>
        <el-form-item label="报到时间" label-width="140px">
          <el-input v-model="selectedTable.time"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePartyMemRepTable()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加党员报到信息 -->
    <el-dialog title="添加党员报到信息" :visible.sync="addDialogFormVisible">
      <el-form :model="addedTable">
        <el-form-item label="姓名" label-width="140px">
          <el-input v-model="addedTable.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="140px">
          <el-input v-model="addedTable.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="140px">
          <el-input v-model="addedTable.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="家庭所在地" label-width="140px">
          <el-input v-model="addedTable.address"></el-input>
        </el-form-item>
        <el-form-item label="党支部" label-width="140px">
          <el-input v-model="addedTable.party_branch"></el-input>
        </el-form-item>
        <el-form-item label="特长" label-width="140px">
          <el-input v-model="addedTable.specialty"></el-input>
        </el-form-item>
        <el-form-item label="报到时间" label-width="140px">
          <el-input v-model="addedTable.time"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPartyMemRepTable()">确 定</el-button>
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
    this.getPartyMemRepTable();
  },
  methods: {
    getPartyMemRepTable() {
      const data = {
        page: this.currentPage,
        rows: this.rows
      };
      this.$http
        .post("/api/partyMem/rep/query/all", data)
        .then(res => {
          this.passTableData = res.data.result;
          this.passTableData.forEach(function(element) {
            element.time = formatTime(element.time);
          });
          this.$http.get('/api/partyMem/rep/query/count').then(res => {
            this.total = res.data.data.length;
          });
        })
        .catch(err => {
          console.log("获取总数失败");
        });
    },
    detailsPartyMemRep() {
      this.detailsDialogFormVisible = false;
      this.getPartyMemRepTable();
    },
    updatePartyMemRepTable() {
      const data = {
        _id: this.selectedTable._id,
        name: this.selectedTable.name,
        age: this.selectedTable.age,
        phone_number: this.selectedTable.phone_number,
        address: this.selectedTable.address,
        party_branch: this.selectedTable.party_branch,
        specialty: this.selectedTable.specialty,
        time: this.selectedTable.time
      };
      this.$http
        .post("/api/partyMem/rep/modify", data)
        .then(res => {
          this.getPartyMemRepTable();
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
      this.getPartyMemRepTable();
      this.editDialogFormVisible = false;
    },
    addPartyMemRepTable() {
      const data = this.addedTable;

      this.$http
        .post("/api/partyMem/rep/add", data)
        .then(res => {
          this.getPartyMemRepTable();
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
      this.getPartyMemRepTable();
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
      this.getPartyMemRepTable();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDetails(row) {
      this.getPartyMemRepTable();
      this.detailsDialogFormVisible = true;
      this.selectedTable = row;
    },
    handleEdit(row) {
      this.getPartyMemRepTable();
      this.editDialogFormVisible = true;
      this.selectedTable = row;
    },
    handleAdd(row) {
      this.getPartyMemRepTable();
      this.addDialogFormVisible = true;
    },
    handleDelete(row) {
      const data = {
        _id: row._id
      };

      this.$http
        .post("/api/partyMem/rep/delete", data)
        .then(res => {
          this.getPartyMemRepTable();
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

      this.getPartyMemRepTable();
    }
  }
};
</script>

<style lang="scss">
</style>


