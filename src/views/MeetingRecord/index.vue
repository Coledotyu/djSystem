<template>
  <div class="meeting-record-container">
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="passTableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        border
        :default-sort="{prop: 'meeting_time', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="meeting_theme" label="会议主题" width="120"></el-table-column>
        <el-table-column prop="meeting_address" label="会议地址" width="120"></el-table-column>
        <el-table-column prop="meeting_moderator" label="会议主讲人"></el-table-column>
        <el-table-column prop="meeting_attendee" label="参会人"></el-table-column>
        <el-table-column prop="meeting_absentee" label="缺席人"></el-table-column>
        <el-table-column prop="meeting_content" label="会议内容"></el-table-column>
        <el-table-column prop="meeting_time" label="会议时间" sortable></el-table-column>
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

    <!-- 会议信息详情 -->
    <el-dialog title="会议信息详情" :visible.sync="detailsDialogFormVisible">
      <el-form :model="selectedTable">
        <el-form-item label="会议主题" label-width="140px">
          <el-input v-model="selectedTable.meeting_theme" disabled></el-input>
        </el-form-item>
        <el-form-item label="会议时间" label-width="140px">
          <el-input v-model="selectedTable.meeting_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="会议地址" label-width="140px">
          <el-input v-model="selectedTable.meeting_address" disabled></el-input>
        </el-form-item>
        <el-form-item label="会议主讲人" label-width="140px">
          <el-input v-model="selectedTable.meeting_moderator" disabled></el-input>
        </el-form-item>
        <el-form-item label="参会人员" label-width="140px">
          <el-input v-model="selectedTable.meeting_attendee" disabled></el-input>
        </el-form-item>
        <el-form-item label="缺席人员" label-width="140px">
          <el-input v-model="selectedTable.meeting_absentee" disabled></el-input>
        </el-form-item>
        <el-form-item label="会议内容" label-width="140px">
          <el-input v-model="selectedTable.meeting_content" disabled></el-input>
        </el-form-item>
        <el-form-item label="会议附图" label-width="140px">
          <!-- 图片上传到服务器！ -->
          <el-input v-model="selectedTable.meeting_photo_url" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailsMeetingInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改会议信息 -->
    <el-dialog title="修改会议信息" :visible.sync="editDialogFormVisible">
      <el-form :model="selectedTable">
        <el-form-item label="会议主题" label-width="140px">
          <el-input v-model="selectedTable.meeting_theme"></el-input>
        </el-form-item>
        <el-form-item label="会议时间" label-width="140px">
          <el-input v-model="selectedTable.meeting_time"></el-input>
        </el-form-item>
        <el-form-item label="会议地址" label-width="140px">
          <el-input v-model="selectedTable.meeting_address"></el-input>
        </el-form-item>
        <el-form-item label="会议主讲人" label-width="140px">
          <el-input v-model="selectedTable.meeting_moderator"></el-input>
        </el-form-item>
        <el-form-item label="参会人员" label-width="140px">
          <el-input v-model="selectedTable.meeting_attendee"></el-input>
        </el-form-item>
        <el-form-item label="缺席人员" label-width="140px">
          <el-input v-model="selectedTable.meeting_absentee"></el-input>
        </el-form-item>
        <el-form-item label="会议内容" label-width="140px">
          <el-input v-model="selectedTable.meeting_content"></el-input>
        </el-form-item>
        <el-form-item label="会议附图" label-width="140px">
          <!-- 图片上传到服务器！ -->
          <el-input v-model="selectedTable.meeting_photo_url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateMeetingInfoTable()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加会议信息 -->
    <el-dialog title="添加会议信息" :visible.sync="addDialogFormVisible">
      <el-form :model="addedTable">
        <el-form-item label="会议主题" label-width="140px">
          <el-input v-model="addedTable.meeting_theme"></el-input>
        </el-form-item>
        <el-form-item label="会议时间" label-width="140px">
          <el-input v-model="addedTable.meeting_time"></el-input>
        </el-form-item>
        <el-form-item label="会议地址" label-width="140px">
          <el-input v-model="addedTable.meeting_address"></el-input>
        </el-form-item>
        <el-form-item label="会议主讲人" label-width="140px">
          <el-input v-model="addedTable.meeting_moderator"></el-input>
        </el-form-item>
        <el-form-item label="参会人员" label-width="140px">
          <el-input v-model="addedTable.meeting_attendee"></el-input>
        </el-form-item>
        <el-form-item label="缺席人员" label-width="140px">
          <el-input v-model="addedTable.meeting_absentee"></el-input>
        </el-form-item>
        <el-form-item label="会议内容" label-width="140px">
          <el-input v-model="addedTable.meeting_content"></el-input>
        </el-form-item>
        <el-form-item label="会议附图" label-width="140px">
          <!-- 图片上传到服务器！ -->
          <el-input v-model="addedTable.meeting_photo_url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMeetingInfoTable()">确 定</el-button>
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
    this.getMeetingInfoTable();
  },
  methods: {
    getMeetingInfoTable() {
      const data = {
        page: this.currentPage,
        rows: this.rows
      };
      this.$http
        .post("/api/meetingRecord/query/all", data)
        .then(res => {
          this.passTableData = res.data.result;
          this.passTableData.forEach(function(element) {
            element.meeting_time = formatTime(element.meeting_time);
          });
          this.$http.get("/api/meetingRecord/query/count").then(res => {
            this.total = res.data.data.length;
          });
        })
        .catch(err => {
          console.log("获取总数失败");
        });
    },
    detailsMeetingInfo() {
      this.detailsDialogFormVisible = false;
      this.getMeetingInfoTable();
    },
    updateMeetingInfoTable() {
      const data = {
        _id: this.selectedTable._id,
        meeting_theme: this.selectedTable.meeting_theme,
        meeting_time: this.selectedTable.meeting_time,
        meeting_address: this.selectedTable.meeting_address,
        meeting_moderator: this.selectedTable.meeting_moderator,
        meeting_attendee: this.selectedTable.meeting_attendee,
        meeting_absentee: this.selectedTable.meeting_absentee,
        meeting_content: this.selectedTable.meeting_content,
        meeting_photo_url: this.selectedTable.meeting_photo_url
      };
      this.$http
        .post("/api/meetingRecord/modify", data)
        .then(res => {
          this.getMeetingInfoTable();
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
      this.getMeetingInfoTable();
      this.editDialogFormVisible = false;
    },
    addMeetingInfoTable() {
      const data = this.addedTable;
      this.$http
        .post("/api/meetingRecord/add", data)
        .then(res => {
          this.getMeetingInfoTable();
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
      this.getMeetingInfoTable();
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
      this.getMeetingInfoTable();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDetails(row) {
      this.getMeetingInfoTable();
      this.detailsDialogFormVisible = true;
      this.selectedTable = row;
    },
    handleEdit(row) {
      this.getMeetingInfoTable();
      this.editDialogFormVisible = true;
      this.selectedTable = row;
    },
    handleAdd(row) {
      this.getMeetingInfoTable();
      this.addDialogFormVisible = true;
    },
    handleDelete(row) {
      const data = {
        _id: row._id
      };

      this.$http
        .post("/api/meetingRecord/delete", data)
        .then(res => {
          this.getMeetingInfoTable();
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

      this.getMeetingInfoTable();
    }
  }
};
</script>

<style lang="scss">
</style>


