<template>
	<section class="electiveDetailed">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="form">
				<el-form-item>
					<el-input v-model.trim="form.keyword" @keyup.enter.native="getList" placeholder="姓名/账号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search" icon="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-select  placeholder="全部班级" style="width:120px;" v-model="form.select1" @change="getList">
						<el-option label="全部班级" value=""></el-option>
						<el-option v-for="item in classList" :label="item.class_name" :value="item.class_id" :key="item.class_id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select  placeholder="全部进度" style="width:120px;" v-model="form.select2" @change="getList">
						<el-option label="全部进度" value=""></el-option>
						<el-option label="待学生选科" value="1"></el-option>
						<el-option label="待家长确认" value="2"></el-option>
						<el-option label="家长已确认" value="3"></el-option>
						<el-option label="教务端调整" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select  placeholder="请选择" style="width:120px;" v-model="form.select3" @change="getList" v-if="form.select2 == ''">
						<el-option label="全部状态" value=""></el-option>
						<el-option label="未完成" value="1"></el-option>
						<el-option label="已完成" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="text" @click="reset">重置筛选</el-button>
				</el-form-item>

				<el-form-item style="float: right">
					<el-button type="primary" @click="impAlert">导出选科情况</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading">
			<!--<el-table-column type="selection" width="60"></el-table-column>-->
			<!--<el-table-column type="index" width="60"></el-table-column>-->
			<el-table-column prop="realname" label="姓名"></el-table-column>
			<el-table-column prop="student_number" label="账号"></el-table-column>
			<el-table-column prop="class_name" label="班级"></el-table-column>
			<el-table-column prop="subject_name" label="已选科目"></el-table-column>
			<el-table-column prop="status" label="进度"></el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<span :class="distribution(scope.row.xk_status)"></span>
					{{scope.row.xk_status}}
				</template>
			</el-table-column>
			<el-table-column label="家长信息">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="left" popper-class="pop">
						<div class="parentAlert" ref="parentAlert">
							<h3>家长信息</h3>
							<ul>
								<li v-for="item in parentList">
									<p>关系：{{item.relation}}</p>
									<p>姓名：{{item.name}}</p>
									<p>手机号：{{item.phone_tel}}</p>
								</li>
							</ul>
							<!--<i :style="{top:parentPosTop + 'px'}"></i>-->
						</div>
						<div slot="reference" class="name-wrapper">
							<span class="parentRound" v-if="scope.row.parent != ''" @mouseenter="parentOver($event,scope.row.user_id)">i</span>{{scope.row.parent}}
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="adjust(scope.$index, scope.row)">调整</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next" :page-sizes="[10, 20,30,40,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageId" :total="total" style="float:right;"></el-pagination>
		</el-col>

		<!-- 导出选科弹窗 -->
		<el-dialog title="选择导出字段" v-model="isImpAlert" size="mini" :close-on-click-modal="false">
			<div>
				<el-checkbox v-model="impAlertCheckName" disabled>姓名</el-checkbox>
				<el-checkbox v-model="impAlertCheck.number">账号</el-checkbox>
				<el-checkbox v-model="impAlertCheck.class">班级</el-checkbox>
				<el-checkbox v-model="impAlertCheck.subjust">已选科目</el-checkbox>
				<el-checkbox v-model="impAlertCheck.parent">家长信息</el-checkbox>
				<el-checkbox v-model="impAlertCheck.status">进度</el-checkbox>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="isImpAlert = false">取消</el-button>
				<el-button type="primary" @click.native="addImpAlert">确定</el-button>
			</div>
		</el-dialog>

		<!-- 调整弹窗 -->
		<el-dialog title="调整选科" v-model="isAdjust" size="mini" :close-on-click-modal="false">
			<div class="hint">
				<h3>提示：</h3>
				<p>选科数量：{{subject_count}}科</p>
			</div>

			<div class="selectSubject">
				<el-checkbox-group v-model="selectSubject" @change="subjectChange">
					<el-checkbox-button v-for="item in subjectList" :label="item.subject_id" :key="item.subject_id">{{item.subject_name}}</el-checkbox-button>
				</el-checkbox-group>
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="isAdjust = false">取消</el-button>
				<el-button type="primary" @click.native="addAdjust" :disabled="isSubjectDisabled">确定</el-button>
			</div>
		</el-dialog>

		<!-- 家长弹窗 -->
		<!--<div class="parentAlert" ref="parentAlert" v-show="isParentAlert" :style="{left:parentPosX + 'px',top:parentPosY + 'px'}">-->
			<!--<h2>家长信息</h2>-->
			<!--<ul>-->
				<!--<li v-for="item in parentList">-->
					<!--<p>关系：{{item.relation}}</p>-->
					<!--<p>姓名：{{item.name}}</p>-->
					<!--<p>手机号：{{item.phone_tel}}</p>-->
				<!--</li>-->
			<!--</ul>-->
			<!--<i :style="{top:parentPosTop + 'px'}"></i>-->
		<!--</div>-->

	</section>
</template>
<script type="text/ecmascript-6">
import { getSelCourDetail , getClass , exportSelCourse , getStuSelCourse , schoolSubAdjust , getParentList } from '../../api/api';
export default {
	data() {
		return {
			id:'',
			school_id:null,
			total:null,
			page: 1,
			pageId:20,
			listLoading: false,
			section:'',
			classList:[],
			list:[],
			form:{
				keyword:'',
				select1:'',
				select2:'',
				select3:''
			},
			isImpAlert:false,		// 导出弹窗
			impAlertCheckName:true,
			impAlertCheck:{
				number:false,
				class:false,
				subjust:false,
				parent:false,
				status:false
			},
			user_id:'',
			isAdjust:false,			// 调整弹窗
			subjectList:[],			// 学科列表
			selectSubject:[],		// 已选学科
			selectSubjectSave:[],	// 已选学科保存
			subject_count:null,		// 选科数量
			isSubjectDisabled:true,	// 是否调整
			parentList:[],			// 家长列表
			isParentAlert:false,	// 家长列表弹窗
			isParentAlert2:false,	// 家长列表弹窗2
			parentPosX:0,			// 家长列表弹窗定位位置
			parentPosY:0,
			parentPosTop:50
		}
	},
	methods: {
		// 获取选科明细
		getList(){
			if(this.form.select2 != ""){
				this.form.select3 = ""
			}
			let para = {
				page:this.page,
				pagesize:this.pageId,
				id:this.id,
				class_id:this.form.select1,
				status:this.form.select2,
				xk_status:this.form.select3,
				name:this.form.keyword
			};
			this.listLoading = true;
			getSelCourDetail(para).then((res) => {
				this.listLoading = false;
				if(res.code == 1){
					//console.log(res)
					this.total = res.data.total;
					this.list = res.data.list;
					this.pageId = Number(res.data.pagesize);
					this.section = res.data.section;
					this.getClass();
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 获取班级
		getClass(){
			let para = {
				school_id:this.school_id,
				section:this.section,
				pageSize:100
			};
			getClass(para).then((res) => {
				if(res.code == 1){
					//console.log(res)
					this.classList = res.data.list
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 第页显示多少条
		handleSizeChange(val) {
			this.pageId = val;
			this.getList();
		},
		// 页码
		handleCurrentChange(val) {
			this.page = val;
			this.getList();
		},
		// 搜索
		search(){
			this.getList();
		},
		// 重置
		reset(){
			this.form.keyword = "";
			this.form.select1 = "";
			this.form.select2 = "";
			this.form.select3 = "";
			this.getList();
		},
		// 导出弹窗
		impAlert(){
			this.isImpAlert = !this.isImpAlert;

			this.impAlertCheck.number = false;
			this.impAlertCheck.class = false;
			this.impAlertCheck.subjust = false;
			this.impAlertCheck.parent = false;
			this.impAlertCheck.status = false;
		},
		// 提交导出
		addImpAlert(){
			let url = "";
			for(let i in this.impAlertCheck){
				if(this.impAlertCheck[i]){
					url += '&' + i + '=' + 1;
				}
			}
			let token = window.sessionStorage.getItem('token');
			window.open(exportSelCourse + '?token=' + token + '&id=' + this.id + url);
			this.isImpAlert = !this.isImpAlert;
			// 清空
			this.impAlertCheck.number = false;
			this.impAlertCheck.class = false;
			this.impAlertCheck.subjust = false;
			this.impAlertCheck.parent = false;
			this.impAlertCheck.status = false;
		},
		// 调整弹窗
		adjust(index,row){
			this.isAdjust = !this.isAdjust;
			this.user_id = row.user_id;
			this.selectSubject = [];
			this.selectSubjectSave = [];
			this.isSubjectDisabled = true;
			let para = {
				id:this.id,
				user_id:row.user_id
			};
			getStuSelCourse(para).then((res) => {
				if(res.code == 1){
					//console.log(res)
					let data = res.data;
					if(data.selectSubject != ""){
						this.selectSubject = data.selectSubject.split(',');
						this.selectSubjectSave = data.selectSubject.split(',');
					}
					this.subjectList = data.subjectList;
					this.subject_count = data.subject_count;
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 控制确定按钮
		subjectChange(val){
			//console.log(val,this.selectSubjectSave,this.selectSubject)

			if(this.selectSubjectSave.length == this.selectSubject.length){
				let num = [];
				// 对比差异
				this.selectSubject.forEach((value,index)=>{
					let is = false;
					for(let i = 0;i < this.selectSubjectSave.length;i++){
						if(value == this.selectSubjectSave[i]){
							is = true;
							break
						}
					}
					if(!is){
						num.push(value)
					}
				})
				if(num.length > 0){
					// 有修改
					this.isSubjectDisabled = false
				}else{
					this.isSubjectDisabled = true
				}
			}else{
				this.isSubjectDisabled = false
			}

			/*
			// 已有选科
			if(this.selectSubjectSave.length == Number(this.subject_count)){
				// 相等
				if(val.length == this.selectSubjectSave.length){
					let num = [];
					// 对比差异
					val.forEach((value,index)=>{
						let is = false;
						for(let i = 0;i < this.selectSubjectSave.length;i++){
							if(value == this.selectSubjectSave[i]){
								is = true;
								break
							}
						}
						if(!is){
							num.push(value)
						}
					})
					if(num.length > 0){
						// 有修改
						this.isSubjectDisabled = false
					}else{
						this.isSubjectDisabled = true
					}
				}else{
					this.isSubjectDisabled = true
				}
			}else{
				if(val.length == Number(this.subject_count)){
					this.isSubjectDisabled = false
				}else{
					this.isSubjectDisabled = true
				}
			}
			 */
		},
		// 提交调整
		addAdjust(){
			//console.log('提交调整',this.subject_count,this.selectSubject,this.selectSubject.length)

			if(Number(this.subject_count) != this.selectSubject.length){
				this.$message.error('选科数量为'+ this.subject_count +'科');
				return false
			}
			let arrSort = this.selectSubject.sort();

			let para = {
				id:this.id,
				user_id:this.user_id,
				subject_id:arrSort.join() + ','
			};
			schoolSubAdjust(para).then((res) => {
				if(res.code == 1){
					this.$message({
						message: res.msg,
						type: 'success'
					});
					this.getList();
					this.isAdjust = !this.isAdjust;
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 移入显示家长信息
		parentOver(event,user_id){
			let para = {
				user_id:user_id
			};
			getParentList(para).then((res) => {
				if(res.code == 1){
					//console.log(res)
					this.parentList = res.data;
					this.isParentAlert = true;
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 移出
		parentOut(){
			setTimeout(()=>{
				this.isParentAlert = false;
			},100)
		},
		//状态按钮样式
		distribution(txt){
			if(txt == '已完成'){
				return 'conduct'
			}else if(txt == '未完成'){
				return 'finished'
			}
		}
	},
	mounted() {
		this.school_id = sessionStorage.getItem('school_id');
		this.id = this.$route.query.id;
		this.getList();
	}
}

</script>
<style>
.pop {
	padding: 0 !important;
	border-radius: 8px;
}
</style>
<style scoped lang="scss">
.electiveDetailed{
	.notBeginning,.conduct,.finished{
		width: 5px;
		height: 5px;
		display: inline-block;
		vertical-align: middle;
		border-radius: 100%;
		margin-right: 5px;
	}
	.notBeginning{
		background: #999;
	}
	.conduct{
		background: #66cc66;
	}
	.finished{
		background: #ff3300;
	}
	.parentRound{
		cursor: pointer;
		position: relative;
		display: inline-block;
		border:1px solid #999;
		border-radius: 100%;
		text-align: center;
		width: 14px;
		height: 14px;
		line-height: 14px;
		vertical-align: middle;
		margin-right: 5px;
	}
	.hint{
		padding:0 0 20px 0;
		h3{
			padding:0;
			margin:0;
			font-size:16px;
		}
		p{

		}
	}
	.selectSubject{
		width: 480px;
		.el-checkbox-button{
			margin-bottom: 10px;
			&:nth-child(8n){
				 border-radius: 0 4px 4px 0;
			}
			&:nth-child(8n) + .el-checkbox-button{
				 border-radius: 4px 0 0 4px;
				 border-left: 1px solid #bfcbd9;
			}
		}
	}

}
.parentAlert{
	/*position: absolute;*/
	/*left:0;*/
	/*top:0;*/
	/*z-index: 99;*/
	border-radius: 8px;
	width: 200px;
	background: #fff;
	/*border: 1px solid #bfcbd9;*/
	color:#1f2d3d;
	h3{
		border-radius: 8px 8px 0 0;
		padding:0 0 0 20px;
		margin:0;
		font-size:16px;
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #bfcbd9;
		background: #20a0ff;
		color: #fff;
	}
	ul{
		padding:10px 20px;
		margin:0;
		list-style: none;
		li{
			line-height: 25px;
			&:nth-child(2){
				 padding-top: 8px;
				 margin-top: 8px;
				 border-top: 1px dashed #bfcbd9;
			}
		}
	}
	i{
		position: absolute;
		right: -7px;
		top: 50px;
		/*top: 190px;*/
		margin-left: -5px;
		width: 10px;
		height: 10px;
		background: #fff;
		transform: rotate(-45deg);
		border-bottom: 1px dashed #bfcbd9;
		border-right: 1px dashed #bfcbd9;
	}
}
</style>