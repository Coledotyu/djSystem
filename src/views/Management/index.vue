<template>
  <div class="management-container">
    <el-row style="height: 100%">
      <el-col :span="4">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router unique-opened>
						<!-- <el-menu-item index="management">Home</el-menu-item> -->
						<el-menu-item index="partyMemRepCount">Home</el-menu-item>
						<el-menu-item index="partyMemRep">党员报道</el-menu-item>
						<el-menu-item index="partyMemInfo">党员信息</el-menu-item>
						<el-menu-item index="meetingRecord">会议记录</el-menu-item>
						<el-menu-item index="infoCommunication">信息交流</el-menu-item>
						<el-menu-item @click="signOut()">退出</el-menu-item>
				</el-menu>
			</el-col>
      <el-col :span="20" style="height: 100%; overflow: auto;">
        <the-header></the-header>
				<keep-alive>
				  <router-view></router-view>
				</keep-alive>
			</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		defaultActive: function() {
			return this.$route.path.replace('/', '');
		},
  },
  methods: {
    signOut() {
      console.log('退出')
      this.$store.dispatch('AdminSignOut');
    }
  }
};
</script>

<style lang="scss">
@import 'src/assets/scss/index';

.management-container {
  height: 100%;
}
.el-col {
  height: 100%;
}
.el-menu {
	background-color: $clr-main-bg;
}

.el-menu-item {
  color: $clr-font;
  &:hover{
	  background-color: $clr-menu-hover-bg;
  }
}

.el-menu-item.is-active {
	background-color: $clr-submenu-bg;
}

</style>
