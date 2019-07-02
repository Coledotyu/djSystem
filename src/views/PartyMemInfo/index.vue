<template>
  <div class="party-mem-info-container">
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="passTableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        border
        :default-sort="{prop: 'party_time', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80"></el-table-column>
        <el-table-column prop="phone_number" label="手机号"></el-table-column>
        <el-table-column prop="party_branch" label="党支部"></el-table-column>
        <el-table-column prop="specialty" label="特长"></el-table-column>
        <el-table-column prop="honor" label="荣誉"></el-table-column>
        <el-table-column prop="party_time" label="入党时间" sortable></el-table-column>
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

    <!-- 党员信息详情 -->
    <el-dialog title="党员信息详情" :visible.sync="detailsDialogFormVisible">
      <el-form :model="selectedTable">
        <el-form-item label="姓名" label-width="140px">
          <el-input v-model="selectedTable.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="140px">
          <el-input v-model="selectedTable.age" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="140px">
          <el-input v-model="selectedTable.gender" disabled></el-input>
        </el-form-item>
        <el-form-item label="入党时间" label-width="140px">
          <el-input v-model="selectedTable.party_time" disabled></el-input>
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
        <el-form-item label="荣誉" label-width="140px">
          <el-input v-model="selectedTable.honor" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailsPartyMemInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改党员信息 -->
    <el-dialog title="修改党员信息" :visible.sync="editDialogFormVisible">
      <el-form :model="selectedTable">
        <el-form-item label="姓名" label-width="140px">
          <el-input v-model="selectedTable.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="140px">
          <el-input v-model="selectedTable.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="140px">
          <el-input v-model="selectedTable.gender"></el-input>
        </el-form-item>
        <el-form-item label="入党时间" label-width="140px">
          <el-input v-model="selectedTable.party_time"></el-input>
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
        <el-form-item label="荣誉" label-width="140px">
          <el-input v-model="selectedTable.honor"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePartyMemInfoTable()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加党员信息 -->
    <el-dialog title="添加党员信息" :visible.sync="addDialogFormVisible">
      <el-form :model="addedTable">
        <el-form-item label="姓名" label-width="140px">
          <el-input v-model="addedTable.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="140px">
          <el-input v-model="addedTable.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="140px">
          <el-input v-model="addedTable.gender"></el-input>
        </el-form-item>
        <el-form-item label="入党时间" label-width="140px">
          <el-input v-model="addedTable.party_time"></el-input>
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
        <el-form-item label="荣誉" label-width="140px">
          <el-input v-model="addedTable.honor"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPartyMemInfoTable()">确 定</el-button>
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
    this.getPartyMemInfoTable();
  },
  methods: {
    getPartyMemInfoTable() {
      const data = {
        page: this.currentPage,
        rows: this.rows
      };
      this.$http
        .post("/api/partyMem/info/query/all", data)
        .then(res => {
          this.passTableData = res.data.result;
          console.log(this.passTableData);
          this.passTableData.forEach(function(element) {
            element.party_time = formatTime(element.party_time);
          });
          this.$http.get("/api/partyMem/info/query/count").then(res => {
            this.total = res.data.data.length;
          });
        })
        .catch(err => {
          console.log("获取总数失败");
        });
    },
    detailsPartyMemInfo() {
      this.detailsDialogFormVisible = false;
      this.getPartyMemInfoTable();
    },
    updatePartyMemInfoTable() {
      const data = {
        _id: this.selectedTable._id,
        name: this.selectedTable.name,
        age: this.selectedTable.age,
        gender: this.selectedTable.gender,
        party_time: this.selectedTable.party_time,
        phone_number: this.selectedTable.phone_number,
        address: this.selectedTable.address,
        party_branch: this.selectedTable.party_branch,
        specialty: this.selectedTable.specialty,
        honor: this.selectedTable.honor
      };
      this.$http
        .post("/api/partyMem/info/modify", data)
        .then(res => {
          this.getPartyMemInfoTable();
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
      this.getPartyMemInfoTable();
      this.editDialogFormVisible = false;
    },
    addPartyMemInfoTable() {
      const data = this.addedTable;
      this.$http
        .post("/api/partyMem/info/add", data)
        .then(res => {
          this.getPartyMemInfoTable();
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
      this.getPartyMemInfoTable();
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
      this.getPartyMemInfoTable();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDetails(row) {
      this.getPartyMemInfoTable();
      this.detailsDialogFormVisible = true;
      this.selectedTable = row;
    },
    handleEdit(row) {
      this.getPartyMemInfoTable();
      this.editDialogFormVisible = true;
      this.selectedTable = row;
    },
    handleAdd(row) {
      this.getPartyMemInfoTable();
      this.addDialogFormVisible = true;
    },
    handleDelete(row) {
      const data = {
        _id: row._id
      };

      this.$http
        .post("/api/partyMem/info/delete", data)
        .then(res => {
          this.getPartyMemInfoTable();
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

      this.getPartyMemInfoTable();
    }
  }
};
</script>

<style lang="scss">
</style>


