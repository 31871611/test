<template>
	<section class="courseHtml">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">

				<el-form-item style="float: right">
					<el-button type="primary" @click="courseAdd"  ><i class="el-icon-plus"></i> 新增学科</el-button>
				</el-form-item>

			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="cls" highlight-current-row v-loading="listLoading" @selection-change="selsChange1">
			<el-table-column type="selection" width="60"></el-table-column>
			<el-table-column type="index" width="60"></el-table-column>
			<el-table-column prop="subject_name" label="课程"></el-table-column>
			<el-table-column prop="subject_alias" label="别名"></el-table-column>
			<el-table-column prop="type_name" label="场地类型"></el-table-column>
			<el-table-column prop="importance_name" label="重要性">
				<template slot-scope="scope">
					<span :class="importantColour(scope.row.importance_name)">{{scope.row.importance_name}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="score" label="学分"></el-table-column>
			<el-table-column prop="subject_type_name" label="课程类型"></el-table-column>
			<el-table-column label="分配教师">
				<template slot-scope="scope">
					<span :class="distribution(scope.row.is_distribute_name)">{{scope.row.is_distribute_name}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="Edit(scope.$index, scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
					<el-button type="danger" size="small" @click="Del(scope.$index, scope.row)"><i class="el-icon-delete"> 删除</i></el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove1" :disabled="this.sel.length === 0">批量删除</el-button>
			<el-pagination layout="total, sizes, prev, pager, next" :page-sizes="[10, 20,30,40,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageId" :total="total" style="float:right;"></el-pagination>
		</el-col>


		<!-- 添加弹窗 -->
		<el-dialog :title="isEdit ? '编辑学科' : '新增学科'" v-model="isAddCourseAlert" size="small">
			<el-form ref="addCourseAlert" label-width="120px" :model="addCourseData">
				<el-form-item label="课程名称：" required>
					<el-input style="width:280px" v-model="addCourseData.subject_name" placeholder="请选择课程" :disabled="isPreset"></el-input>
				</el-form-item>
				<el-form-item label="别名：" >
					<el-input style="width:280px" v-model="addCourseData.subject_alias" placeholder="例如英语别名外语"></el-input>
				</el-form-item>
				<el-form-item label="学分：">
					<el-input-number style="width:280px" v-model="addCourseData.score" :min="0" :max="20"></el-input-number>
				</el-form-item>
				<el-form-item label="重要性：" required>
					<el-select style="width:280px" placeholder="请选择重要性" v-model="addCourseData.importance">
						<el-option label="非常重要" value="1" style="color: #FF4949;"></el-option>
						<el-option label="重要" value="2" style="color: #E3AB29;"></el-option>
						<el-option label="一般" value="3" style="color: #99A9BF;"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="课程类型：" required>
					<el-select style="width:280px" placeholder="请选择课程类型" v-model="addCourseData.subject_type">
						<el-option label="行政课" value="1"></el-option>
						<el-option label="走班课" value="2"></el-option>
						<el-option label="批量排课" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选用场地类型：" required>
					<el-select style="width:280px" placeholder="请选择" v-model="addCourseData.type_id">
						<el-option v-for="item in ClassroomList" :key="item.id" :label="item.type_name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分配教师：">
					<el-radio class="radio" v-model="addCourseData.is_distribute" label="1">分配</el-radio>
					<el-radio class="radio" v-model="addCourseData.is_distribute" label="0">不分配</el-radio>
				</el-form-item>
				<el-form-item label="学科分数：" required>
					<el-radio class="radio" v-model="addCourseData.valid_type" label="1">分数</el-radio>
					<el-radio class="radio" v-model="addCourseData.valid_type" label="2">等级</el-radio>
				</el-form-item>
				<el-form-item label="" v-show="addCourseData.valid_type == 1">
					<div>
						<el-input-number style="width:280px" v-model="addCourseData.fraction1" :min="0" :max="999"></el-input-number>
					</div>
					<div class="validTypeLine"></div>
					<div>
						<el-input-number style="width:280px" v-model="addCourseData.fraction2" :min="0" :max="999"></el-input-number>
					</div>
				</el-form-item>
				<el-form-item label="" v-show="addCourseData.valid_type == 2">
					<span class="authorsSpan" v-for="(item,index) in authorsDefault">
						<el-input size="small" style="width: 130px" v-model="item.name" :key="index" label="index" :disabled="true"></el-input>
						<el-button size="small" type="danger" icon="delete2" :disabled="true"></el-button>
					</span>
					<span class="authorsSpan" v-for="(item,index) in authors">
						<el-input size="small" style="width: 130px" v-model.trim="item.name" :key="index" label="item.id" :maxlength="8" @blur="editAuthor($event,item.name,index)"></el-input>
						<el-button size="small" type="danger" @click="handleDel(index)" icon="delete2"></el-button>
					</span>
					<div>
						<el-input class="input-new-tag" style="width: 130px" v-if="inputVisible" v-model.trim="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" placeholder="按回车键提交"></el-input>
						<el-button size="small" v-else class="button-new-tag" @click="showInput">+ 添加等级</el-button>
					</div>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="isAddCourseAlert = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit()">保存</el-button>
			</div>
		</el-dialog>

		<!-- 操作提示说明 -->
		<div class="stepPromptsBg" v-show="stepPromptsBg"></div>
		<div class="stepPrompts" v-show="stepPrompts1" :style="{background:'url('+photo.archivesAchievement6+') no-repeat'}">
			<div class="arrow" :style="{background:'url('+photo.archivesAchievement8+') no-repeat'}"></div>
			<div class="name" :style="{background:'url('+photo.archivesAchievement7+') no-repeat'}"></div>
			<div class="btn" @click="stepPrompts1Ck"></div>
			<div class="exit" @click="stepPromptsExit"></div>
			<div class="down">
				<el-button size="small"><i class="el-icon-edit"></i> 编辑</el-button>
			</div>
		</div>

	</section>
</template>
<script type="text/ecmascript-6">
	import { courseList,courseAdd,courseEdit,courseDelete,classroomType } from '../../api/api';
	import archivesAchievement6 from '../../assets/archivesAchievement6.png'
	import archivesAchievement7 from '../../assets/archivesAchievement7.png'
	import archivesAchievement8 from '../../assets/archivesAchievement8.png'

	export default {
		data() {
			return {
				photo:{
					archivesAchievement6:archivesAchievement6,
					archivesAchievement7:archivesAchievement7,
					archivesAchievement8:archivesAchievement8
				},
				school_id:null,
				form:{
					job_number:'',
					teacher_name:'',
					school_id:null
				},
				cls:[],
				total:null,
				page: 1,
				pageId:10,
//				pages:null,
				listLoading: false,

				ClassroomList:[],
				// 学科弹窗
				isAddCourseAlert:false,
				addCourseData:{
					id:'',
					subject_name:'',
					subject_alias:'',
					score:'',
					importance:'',
					type_id:'',
					subject_type:'',
					is_distribute:'1',
					valid_type:'1',
					fraction1:'',
					fraction2:'',
					valid_scope:''
				},
				// 编辑
				isEdit:false,
				isPreset:false,
				// 批量删除保存值
				sel:[],
				stepPromptsBg:false,
				stepPrompts1:false,

				title:'等级',
				inputValue: '',	//添加笔名值
				inputVisible: false,
				authorsDefault:[
					{
						name:"不合格"
					},
					{
						name:"合格"
					}
				],
				authors:[],
				delSave:[]
			}
		},
		methods: {
			getStu() {
				let para = {
					page:this.page,
					pagesize:this.pageId
				};
				this.listLoading = true;
				courseList(para).then((res) => {
					if(res.code == 1){
						this.total = res.data.total;
						this.cls = res.data.list;
						//this.pageId = res.data.page_size;
						this.listLoading = false;
					}else{
						this.$message.error(res.msg);
					}
				})
			},
			// 获取教室场地列表
			getClassroomType(){
				let para = {};
				classroomType(para).then((res) => {
					if(res.code == 1) {
						this.ClassroomList = res.data;
					}else{
						this.$message.error(res.msg);
					}
				})
			},
			// 显示新增学科弹窗
			courseAdd(){
				this.isEdit = false;
				this.isAddCourseAlert = true;
				this.isPreset = false;
				// 清空
				this.addCourseData.subject_name = ""
				this.addCourseData.subject_alias = ""
				this.addCourseData.score = ""
				this.addCourseData.importance = ""
				this.addCourseData.type_id = ""
				this.addCourseData.subject_type = ""
				this.addCourseData.is_distribute = "1"
				this.addCourseData.valid_type = "1"
				this.addCourseData.fraction1 = ""
				this.addCourseData.fraction2 = ""
				this.addCourseData.valid_scope = ""
				this.authors = []
			},
			// 新增学科
			addSubmit(){

				if(this.addCourseData.subject_name == ""){
					this.$message.error("请输入课程名称");
					return false
				}
				if(this.addCourseData.subject_name.length > 10){
					this.$message.error("课程名称请输入长度在 1 到 10 个字符");
					return false
				}
				if(this.addCourseData.importance == ""){
					this.$message.error("请选择重要性");
					return false
				}
				if(this.addCourseData.subject_type == ""){
					this.$message.error("请选择课程类型");
					return false
				}
				if(this.addCourseData.type_id == "" || !this.addCourseData.type_id){
					this.$message.error("请选择场地类型");
					return false
				}
				let valid_scope = '';
				if(this.addCourseData.valid_type == 1){
					// 分数
					if(this.addCourseData.fraction1 == this.addCourseData.fraction2){
						this.$message.error("分数区间不能相同");
						return false
					}
					valid_scope = this.addCourseData.fraction1 + ',' + this.addCourseData.fraction2;
				}else{
					// 等级
					let arr = [];
					var repeat = [];

					// 默认等级
					this.authorsDefault.forEach((value,index)=>{
						arr.push(value.name)
					})

					// 去重复
					this.authors.forEach((value,index)=>{
						let isRepeat = false;
						if(index == 0){
							repeat.push(value.name)
						}
						for(let i = 0;i<repeat.length;i++){
							if(repeat[i] == value.name){
								isRepeat = true;
								break
							}
						}
						if(!isRepeat){
							repeat.push(value.name)
						}
						arr.push(value.name)
					})

					if(this.authors.length != repeat.length){
						this.$message.error("等级不能相同");
						return false
					}
					console.log(arr)
					valid_scope = arr.join();
				}

				this.addCourseData.valid_scope = valid_scope;

				let para = {
					subject_name:this.addCourseData.subject_name,
					subject_alias:this.addCourseData.subject_alias || this.addCourseData.subject_name,
					score:this.addCourseData.score,
					importance:this.addCourseData.importance,
					subject_type:this.addCourseData.subject_type,
					type_id:this.addCourseData.type_id,
					is_distribute:this.addCourseData.is_distribute,
					valid_type:this.addCourseData.valid_type,
					valid_scope:this.addCourseData.valid_scope,
				}

				if(this.isEdit){
					para.id = this.addCourseData.id
					courseEdit(para).then((res) => {
						if(res.code == 1){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getStu();
							// 关闭弹窗
							this.isAddCourseAlert = false;
						}else{
							this.$message.error(res.msg)
						}
					})
				}else{
					courseAdd(para).then((res) => {
						if(res.code == 1){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getStu();
							// 关闭弹窗
							this.isAddCourseAlert = false;
						}else{
							this.$message.error(res.msg)
						}
					})
				}
			},
			// 第页显示多少条
			handleSizeChange(val) {
				this.pageId = val;
				this.getStu();
			},
			// 页码
			handleCurrentChange(val) {
				this.page = val;
				this.getStu();
			},
			// 编辑弹窗
			Edit(index,row){
				this.authors = []
				this.addCourseData.fraction1 = ''
				this.addCourseData.fraction2 = ''
				// 显示编辑弹窗
				this.isAddCourseAlert = true;
				if(row.preset == 1){
					this.isPreset = true
				}else{
					this.isPreset = false
				}
				// 设置相关值
				this.addCourseData.id = row.id
				this.addCourseData.subject_name = row.subject_name
				this.addCourseData.subject_alias = row.subject_alias
				this.addCourseData.score = row.score
				this.addCourseData.importance = row.importance.toString()
				this.addCourseData.type_id = row.type_id
				this.addCourseData.subject_type = row.subject_type.toString()
				this.addCourseData.is_distribute = row.is_distribute.toString()
				this.addCourseData.valid_type = row.valid_type.toString()
				if(row.valid_type == 1){
					let valid_scopeArr = row.valid_scope.split(',');
					this.addCourseData.fraction1 = valid_scopeArr[0]
					this.addCourseData.fraction2 = valid_scopeArr[1]
				}else{
					let valid_scopeArr = row.valid_scope.split(',');
					let arr = [];
					valid_scopeArr.forEach((value,index)=>{
						if(value != '合格' && value != '不合格'){
							arr.push({
								id:'-1',
								name:value
							})
						}
					})
					this.authors = arr
				}
				this.isEdit=true;
			},
			//删除
			Del: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					//NProgress.start();
					let para = { id: row.id };
					courseDelete(para).then((res) => {
						if(res.code == 1) {
							//NProgress.done();
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getStu();
						}else{
							this.$message.error(res.msg)
						}
					})

				}).catch(() => {

				});
			},
			// 批量删除保存值
			selsChange1: function (sels) {
				this.sel = sels;
			},
			// 批量删除
			batchRemove1: function () {
				var ids = this.sel.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					//NProgress.start();
					let para = {id: ids };
					courseDelete(para).then((res) => {
						if(res.code == 1) {
							//NProgress.done();
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getStu();
						}else{
							this.$message.error(res.msg)
						}
					})
				}).catch(() => {

				});
			},
			// 重要性颜色
			importantColour(txt){
				if(txt == '非常重要'){
					return 'courseVery';
				}else if(txt == '重要'){
					return 'courseImportant';
				}else{
					return 'courseCommonly';
				}
			},
			//分配样式
			distribution(txt){
				if(txt == '分配'){
					return 'courseDistribution'
				}
				return 'courseNotDistribution'
			},
			// 关闭步骤提示
			stepPromptsExit(){
				this.stepPromptsBg = false;
				this.stepPrompts1 = false;
			},
			// 第一步至第二步
			stepPrompts1Ck(){
				this.stepPromptsBg = false;
				this.stepPrompts1 = false;
				window.localStorage.setItem('stepPrompts3',1);
			},

			//添加笔名
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				//let inputValue = this.filterCharacter(this.inputValue);
				let inputValue = this.inputValue;
				//获取name集合
				let names = this.authors.map(i => i.name)
				if (inputValue && inputValue.length < 9 && names.indexOf(inputValue) < 0 && this.authors.length < 8) {
					var obj = {
						id:null,
						name:null
					};
					// 是否已经在删除中存在
					for(let i = 0;i < this.delSave.length;i++){
						if(this.delSave[i].name == inputValue && this.delSave[i].id != "-1"){
							obj.id = this.delSave[i].id
							obj.name = this.delSave[i].name
							//console.log('已经有id的')
							break
						}
					}
					this.authors.push({
						id: obj.id || '-1',
						name: obj.name || inputValue
					});
					//console.log(this.authors)
				}else if(inputValue.length > 8){
					this.$notify({
						title: '提示',
						message: this.title+'不能超过8个字',
						type: 'error'
					});
				}else if(names.indexOf(inputValue) >= 0){
					this.$notify({
						title: '提示',
						message: this.title+'重复',
						type: 'error'
					});
				}else if(this.authors.length >= 8){
					this.$notify({
						title: '提示',
						message: this.title+'不能超过10个',
						type: 'error'
					});
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			//编辑
			editAuthor(event,name, index){
				//console.log(event,name,index)
			},
			//删除
			handleDel(index){
				let is = true;
				for(let i = 0;i < this.delSave.length;i++){
					if(this.delSave[i].name == index){
						is = false;
						break;
					}
				}
				if(is){
					this.delSave.push(this.authors[index])
				}
				this.authors.splice(index,1);
			}
		},
		mounted() {
			this.school_id = sessionStorage.getItem('school_id');
			// 获取列表
			this.getStu();
			// 获取教室场地列表
			this.getClassroomType();
			// 读取是否显示
			if(!window.localStorage.getItem('stepPrompts3')){
				this.stepPromptsBg = true;
				this.stepPrompts1 = true;
			}
		}
	}

</script>
<style lang="scss" src="../../styles/course.scss" scoped></style>
<style >
.courseVery{
	color: #FF4949;
}
.courseImportant{
	color: #E3AB29;
}
.courseCommonly{
	color: #99A9BF;
}

.courseDistribution,.courseNotDistribution{
	display: inline-block;
	text-align: center;
	width: 58px;
	height: 24px;
	line-height: 24px;
	border-radius: 4px;
}
.courseDistribution{
	background: rgba(32,160,255,0.10);
	border: 1px solid rgba(32,160,255,0.20);
	color: #209FFE;
}
.courseNotDistribution{
	background: #E5E9F2;
	border: 1px solid #D0DAE7;
	color: #99A9BF;
}
.el-dialog__footer{
	border-top:1px solid #E0E6ED;
	padding-top: 15px;
}
</style>