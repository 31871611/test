<template>
	<section class="archivesAchievement">

		<!--<div class="archivesTop">-->
			<!--<div class="archivesTitle">-->
				<!--<i></i>-->
				<!--<h1>个人报告</h1>-->
			<!--</div>-->
			<!--<div class="archivesSelect">-->
				<!--<span>学年</span>-->
				<!--<el-select v-model="form.section1" placeholder="请选择" style="float:left;margin: 15px 30px 0 0;">-->
					<!--<el-option v-for="item in year" :key="item" :label="item" :value="item"></el-option>-->
				<!--</el-select>-->
				<!--<span>学期</span>-->
				<!--<el-select v-model="form.section2" placeholder="请选择" style="float:left;margin: 15px 20px 0 0;">-->
					<!--<el-option label="上学期" value="0"></el-option>-->
					<!--<el-option label="下学期" value="1"></el-option>-->
				<!--</el-select>-->
			<!--</div>-->
		<!--</div>-->

		<el-form :inline="true" :model="form">
			<el-form-item>
				<el-input v-model="form.name" placeholder="姓名/帐号"></el-input>
			</el-form-item>
			<el-form-item label="学年">
				<el-select  placeholder="学年" style="width:120px;" v-model="form.section1" @change="getType">
					<el-option v-for="item in year" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学期">
				<el-select  placeholder="学期" style="width:120px;" v-model="form.section2" @change="getType">
					<el-option label="上学期" value="0"></el-option>
					<el-option label="下学期" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="年段">
				<el-select  placeholder="年段" style="width:120px;" v-model="form.section3" @change="getType">
					<el-option label="高一" value="4"></el-option>
					<el-option label="高二" value="5"></el-option>
					<el-option label="高三" value="6"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="班级">
				<el-select placeholder="班级" style="width:120px;" v-model="form.section4">
					<el-option v-for="item in classArr" :key="item.class_num" :label="item.class_name" :value="item.class_num"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="考试类型">
				<el-select  placeholder="考试类型" style="width:120px;" v-model="form.section5">
					<el-option v-for="item in examType" :key="item.id" :label="item.exam_type_name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search"><i class="el-icon-search"></i> 查询</el-button>
			</el-form-item>
		</el-form>

		<div class="btns">
			<el-button type="primary" @click="add" style="float:left;margin-right: 20px;">添加考试类型</el-button>
			<el-upload style="float:left;margin-right: 20px;" action="http://up-z2.qiniu.com" :data="postData" :before-upload="beforeUpload" :on-success="Success" :show-file-list=false :disabled="isUpload">
				<el-button type="primary">批量导入</el-button>
			</el-upload>
			<el-button type="primary" @click="down" style="float:left;margin-right: 20px;" ref="downTpl">下载模板</el-button>
		</div>

		<div class="line"></div>

		<div class="archivesAchievementInfo">
			<h2>成绩情况</h2>
			<!--<h3>考试类型</h3>-->
			<!--<el-select v-model="form.section5" placeholder="请选择" style="float:left;">-->
				<!--<el-option v-for="item in examType" :key="item.id" :label="item.exam_type_name" :value="item.id"></el-option>-->
			<!--</el-select>-->
		</div>

		<div class="archivesAchievementTable">
			<el-table :data="lists" border style="width: 1140px">
				<el-table-column label="序号" type="index" width="65"></el-table-column>
				<el-table-column label="学年" width="120" prop="term_name"></el-table-column>
				<el-table-column label="姓名" prop="stu_name"></el-table-column>
				<el-table-column label="性别" width="70" prop="gender"></el-table-column>
				<el-table-column label="帐号" prop="stu_number"></el-table-column>
				<el-table-column label="年段" width="70" prop="section"></el-table-column>
				<el-table-column label="班级" prop="class_num"></el-table-column>
				<el-table-column label="学期" prop="up_down_flag"></el-table-column>
				<el-table-column label="考试类型" width="100" prop="exam_type"></el-table-column>

				<el-table-column v-for="(item,index) in subjectsList" :label="item.name" :key="index" width="70" :prop="item.value"></el-table-column>
			</el-table>
		</div>

		<!-- 分页 -->
		<div class="page">
			<el-pagination layout="total, sizes, prev, pager, next" :page-sizes="[10, 20,30,40,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :total="total"></el-pagination>
		</div>

		<!-- 添加-->
		<el-dialog title="添加考试类型" v-model="isAddAlert" :close-on-click-modal="false" size="mini">
			<el-form ref="form" label-width="120px" style="padding:10px 30px 10px 0" v-model="addAlert">
				<el-form-item label="学　　年：" required>
					<el-select v-model="addAlert.year" filterable placeholder="请选择" @change="getType2">
						<el-option v-for="item in year" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学　　期：" required>
					<el-select v-model="addAlert.up_down_flag" filterable placeholder="请选择" @change="getType2">
						<el-option label="上学期" value="0"></el-option>
						<el-option label="下学期" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考试类型：" required>
					<!--<el-input v-model="addAlert.type" style="max-width: 220px"></el-input>-->
					<span class="authorsSpan" v-for="(item,index) in authorsDefault">
						<el-radio class="radio" v-model="authorsRadio" :label="item.name">{{item.name}}</el-radio>
					</span><span class="authorsSpan archivesHideRadio" v-for="(item,index) in authors">
						<el-radio class="radio" v-model="authorsRadio" :label="item.name"></el-radio>
						<el-input size="small" style="width: 130px" v-model.trim="item.name" :key="index" label="item.id" :maxlength="8" @blur="editAuthor($event,item.name,index)"></el-input>
						<el-button size="small" type="danger" @click="handleDel(index)" icon="delete2"></el-button>
					</span>
					<div>
						<el-input class="input-new-tag" style="width: 130px" v-if="inputVisible" v-model.trim="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" placeholder="按回车键提交"></el-input>
						<el-button size="small" v-else class="button-new-tag" @click="showInput">+ 添加{{title}}</el-button>
					</div>
				</el-form-item>
				<el-form-item label="面向年级：" required>
					<el-checkbox-group v-model="addAlert.section">
						<el-checkbox label="4">高一</el-checkbox>
						<el-checkbox label="5">高二</el-checkbox>
						<el-checkbox label="6">高三</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="isAddAlert=false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">确定</el-button>
			</div>
		</el-dialog>

		<div class="stepPromptsBg" v-show="stepPromptsBg"></div>
		<div class="stepPrompts" :style="{left:downTplOffsetLeft+'px',background:'url('+photo.archivesAchievement1+') no-repeat'}" v-show="stepPrompts1">
			<div class="arrow" :style="{background:'url('+photo.archivesAchievement2+') no-repeat'}"></div>
			<div class="name" :style="{background:'url('+photo.archivesAchievement3+') no-repeat'}"></div>
			<div class="btn" @click="stepPrompts1Ck"></div>
			<div class="exit" @click="stepPromptsExit"></div>
			<div class="down">
				<span>下载模版</span>
			</div>
		</div>

		<div class="stepPrompts2" :style="{background:'url('+photo.archivesAchievement4+') no-repeat'}" v-show="stepPrompts2">
			<div class="arrow" :style="{background:'url('+photo.archivesAchievement5+') no-repeat'}"></div>
			<div class="btn" @click="stepPrompts2Ck"></div>
			<div class="exit" @click="stepPromptsExit"></div>
			<div class="down">
				<span>课程管理</span>
			</div>
		</div>

	</section>
</template>
<script type="text/ecmascript-6">
import { archivesGetTermName , getNowSectionClass , archivesGetExamTypeList , archivesAddExamType , archivesEditExamType , archivesGetExamScoreList , getDocSDK , archivesImportScore , archivesCheckSubjectSet , archivesScoreExcelTemplet } from '../../api/api';
import archivesAchievement1 from '../../assets/archivesAchievement1.png'
import archivesAchievement2 from '../../assets/archivesAchievement2.png'
import archivesAchievement3 from '../../assets/archivesAchievement3.png'
import archivesAchievement4 from '../../assets/archivesAchievement4.png'
import archivesAchievement5 from '../../assets/archivesAchievement5.png'

export default {
	 data() { 	
	    return {
			photo:{
				archivesAchievement1:archivesAchievement1,
				archivesAchievement2:archivesAchievement2,
				archivesAchievement3:archivesAchievement3,
				archivesAchievement4:archivesAchievement4,
				archivesAchievement5:archivesAchievement5
			},
			school_id:'',
			id:'',
			addAlert:{
				year:'',
				up_down_flag:'',
				section:[],
				type:''
			},
			isAddAlert:false,
			form:{
				name:'',
				section1:'',
				section2:'',
				section3:'',
				section4:'',
				section5:''
			},
			year:[],
			classArr:[],
			examType:[],
			lists: [],
			subjectsList: [],
			isUpload:false,
			postData:{},
			url:'',
			page:1,
			pagesize:10,
			total:null,
			downTplOffsetLeft:0,
			stepPromptsBg:false,
			stepPrompts1:false,
			stepPrompts2:false,

			title:'考试类型',
			inputValue: '',	//添加笔名值
			inputVisible: false,
			authorsDefault:[],
			authors:[],
			delSave:[],
			authorsRadio:""
		}
	},
	methods: {
		// 获取学年
		getYear(){
			let para = {
				user_id:this.id
			}
			archivesGetTermName(para).then((res) => {
				if(res.code == 1) {
					//console.log(res)
					this.year = res.data;

				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 获取班级 或 考试类型
		getType(){

			// 获取班级
			if(this.form.section3 != ''){
				// 直接使用当前基础信息里的班级
				getNowSectionClass({
					section:this.form.section3
				}).then((res) => {
					if(res.code == 1){
						//console.log(res)
						this.classArr = res.data;
						this.form.section4 = '';
					}else{
						this.$message.error(res.msg)
					}
				})
			}

			// 考试类型
			if(this.form.section1 != '' && this.form.section2 != '' && this.form.section3 != ''){
				archivesGetExamTypeList({
					term_name:this.form.section1,
					up_down_flag:this.form.section2,
					section:this.form.section3,
					page:1,
					pagesize:100
				}).then((res) => {
					if(res.code == 1){
						//console.log(res)
						this.examType = res.data.list;
						this.form.section5 = '';
					}else{
						this.$message.error(res.msg)
					}
				})
			}
		},
		getType2(){
			// 考试类型
			if(this.addAlert.year != '' && this.addAlert.up_down_flag != ''){
				archivesGetExamTypeList({
					term_name:this.addAlert.year,
					up_down_flag:this.addAlert.up_down_flag,
					page:1,
					pagesize:100
				}).then((res) => {
					if(res.code == 1){
						//console.log(res.data.list)
						var arrDefault = []
						var arr = []
						res.data.list.forEach((value,index)=>{
							if(value.delete_yn == 1){
								arr.push({
									name:value.exam_type_name,
									id:value.id
								})
							}else{
								// 默认的
								arrDefault.push({
									name:value.exam_type_name,
									id:value.id
								})
							}
						})
						this.authorsDefault = arrDefault
						this.authors = arr
					}else{
						this.$message.error(res.msg)
					}
				})
			}
		},
		// 添加
		add(){
			this.isAddAlert = true;

			// 清空
			//this.addAlert.year = '';
			//this.addAlert.up_down_flag = '';
			//this.addAlert.section = [];
			//this.authorsDefault = [];
			//this.authors = [];
			//this.authorsRadio = ""
		},
		Success(res, file) {
			file.url = 'http://' + this.url +'/'+ res.key;
			//this.isUpload = false;
			archivesImportScore({
				file:file.url
			}).then((res) => {
				if(res.code == 1){
					this.$message({
						message: res.msg,
						type: 'success'
					})
					// 查询全部
					this.search();
				}else{
					if(res.data.file){
						this.$alert(res.msg, '错误', {
							confirmButtonText: '查看错误信息',
							callback: action => {
								window.open(res.data.file)
							}
						})
					}else{
						this.$message.error(res.msg)
					}
				}
			})
		},
		beforeUpload(file, fileList) { //在图片提交前获取token
			const xls = file.type === 'application/vnd.ms-excel';
			const xlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
			if (!xls && !xlsx) {
				this.$message.error('上传格式错误，仅支持xls、xlsx');
				return false;
			}
			//this.isUpload = true;
			return getDocSDK().then((res) => {
				this.postData = {
					'token': res.uptoken,
					'key': file.uid+file.name
				};
				this.url = res.url;
			});
		},
		// 下载
		down(){
			let is = false
			let t;

			t = setInterval(function(){
				if(is){
					let token = window.sessionStorage.getItem('token');
					window.open(archivesScoreExcelTemplet + '?token=' + token);
					clearInterval(t)
				}
			},1000)

			archivesCheckSubjectSet().then((res) => {
				//console.log(res)
				if(res.code == 1){
					is = true;
				}else{
					this.$message.error(res.msg)
					clearInterval(t)
					window.localStorage.removeItem('stepPrompts1')
					window.localStorage.removeItem('stepPrompts2')
					this.stepPromptsBg = true;
					this.stepPrompts1 = true;
				}
			})
		},
		// 查询
		search(){
//			if(this.form.name == '' || this.form.section1 == '' || this.form.section2 == '' || this.form.section3 == '' || this.form.section4 == '' || this.form.section5 == ''){
//				this.$message.error('查询前请确保筛选条件都要选中');
//				return false
//			}

			archivesGetExamScoreList({
				search_name:this.form.name,
				term_name:this.form.section1,
				up_down_flag:this.form.section2,
				section:this.form.section3,
				class_num:this.form.section4,
				exam_type:this.form.section5,
				page:this.page,
				pagesize:this.pagesize
			}).then((res) => {
				if(res.code == 1){
					//console.log(res)
					this.lists = res.data.list;
					this.page_size = parseInt(res.data.pagesize);
					this.total = parseInt(res.data.count);
					this.subjectsList = res.data.subjects;
				}else{
					this.$message.error(res.msg)
				}
			})
		},
		// 弹窗提交
		addSubmit(){
			if(this.addAlert.year == ''){
				this.$message.error('请选择学年')
				return false
			}
			if(this.addAlert.up_down_flag == ''){
				this.$message.error('请选择学期')
				return false
			}
			if(this.authorsRadio == ''){
				this.$message.error('请选择考试类型')
				return false
			}
			if(this.addAlert.section.length == 0){
				this.$message.error('请选择面向年级')
				return false
			}
			//console.log(this.authorsRadio,this.authorsDefault,this.authors)
			let name = [];
			let id = [];
			this.authorsDefault.forEach((value)=>{
				name.push(value.name)
				id.push(value.id)
			})
			this.authors.forEach((value)=>{
				name.push(value.name)
				id.push(value.id)
			})

			archivesEditExamType({
				term_name:this.addAlert.year,
				up_down_flag:this.addAlert.up_down_flag,
				section:this.addAlert.section.join(),
				name:name.join(),
				id:id.join(),
				sel_name:this.authorsRadio
			}).then((res) => {
				if(res.code == 1){
					this.$message({
						message: res.msg,
						type: 'success'
					})
					// 关闭弹窗
					this.isAddAlert = false;
					// 清空数据
					this.addAlert.year = '';
					this.addAlert.up_down_flag = '';
					//this.addAlert.type = '';
					this.addAlert.section = [];
					this.authorsDefault = [];
					this.authors = [];
					this.authorsRadio = "";
				}else{
					this.$message.error(res.msg)
				}
			})
		},
		// 第页显示多少条
		handleSizeChange(val) {
			this.pagesize = val;
			this.search();
		},
		// 页码
		handleCurrentChange(val) {
			this.page = val;
			this.search();
		},
		// 关闭步骤提示
		stepPromptsExit(){
			this.stepPromptsBg = false;
			this.stepPrompts1 = false;
			this.stepPrompts2 = false;
		},
		// 第一步至第二步
		stepPrompts1Ck(){
			this.stepPrompts1 = false;
			this.stepPrompts2 = true;
			window.localStorage.setItem('stepPrompts1',1);
		},
		// 第二步
		stepPrompts2Ck(){
			this.stepPromptsBg = false;
			this.stepPrompts2 = false;
			window.localStorage.setItem('stepPrompts2',1);
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

			var repeat = [];
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
			})

			if(this.authors.length != repeat.length){
				this.$message.error("等级不能相同");
				this.authors.splice(index,1);
				return false
			}

		},
		//删除
		handleDel(index){
			if(this.authors[index].name == this.authorsRadio ){
				this.authorsRadio = ""
			}
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
		this.id = this.$route.query.id;
		this.school_id = sessionStorage.getItem('school_id');
		this.getYear();
		// 查询全部
		this.search();
		// 下载模版的距离
		this.downTplOffsetLeft = this.$refs.downTpl.$el.offsetLeft;
		// 读取是否显示
		if(!window.localStorage.getItem('stepPrompts1')){
			this.stepPromptsBg = true;
			this.stepPrompts1 = true;
		}
		if(!window.localStorage.getItem('stepPrompts2') && window.localStorage.getItem('stepPrompts1')){
			this.stepPromptsBg = true;
			this.stepPrompts2 = true;
		}

	},
	components: {

	}
}
</script>
<style lang="scss" src="../../styles/archivesAchievement.scss" scoped></style>
<style>
.archivesHideRadio .el-radio__label{
	display: none;
}
</style>