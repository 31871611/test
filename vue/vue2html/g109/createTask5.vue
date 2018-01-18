<template>
	<section>
		<div class="el-step">
			<el-steps :space="180" :active="active" finish-status="success" :center="true">
				<el-step title="选课基础设置"></el-step>
				<el-step title="设置排课规则"></el-step>
				<el-step title="教师排班"></el-step>
				<el-step title="发布"></el-step>
			</el-steps>
		</div>
		<div class="el-item">
			<span :class="this.act===1 ? 'act' : ''">批量设置排课规则</span><span v-show="this.url.type === '2'" :class="[this.act===2 ? 'act' : '']">　/　走班选课组合</span>
		</div>
		<div class="el-tab"><span>批量排课</span><span class="act">排课规则</span><span>并班排课</span></div>

		<div class="el-baseForm" style="width:500px">
			<el-form  :model="form2"   >

				<el-form-item label="" >
					 <el-checkbox v-model="form2.checked1"> 教案平齐</el-checkbox><span class="el-tip">　　　保障老师负责两个班授课进度同步</span>
				</el-form-item>

				<el-form-item label="" >
					 <el-checkbox v-model="form2.checked2"> 分布均匀</el-checkbox><span class="el-tip">　　　排课分布均匀，避免某学科扎堆某几天。单双周适用。</span>
				</el-form-item>

				<el-form-item label="" >
					 <el-checkbox v-model="form2.checked3"> 课程互斥</el-checkbox><span class="el-tip">　　　互斥课程不连排一起，上午最后一节与下午第一节不算互斥</span>
				</el-form-item>



				<el-form-item label="" v-show="this.form2.checked3">
					<el-col :span="8">
						<el-select v-model="form2.value1" placeholder="请选择科目" @change="changeValue(form2.value1,1)">
							<el-option v-for="item in option3" :key="item.cs_id" :label="item.cs_name" :value="item.cs_id"></el-option>
						</el-select>
					</el-col>
					<el-col class="line" :span="1">+</el-col>
					<el-col :span="8">
						<el-select v-model="form2.value2" placeholder="请选择科目"  @change="changeValue(form2.value2,2)">
							<el-option v-for="item in option3" :key="item.cs_id" :label="item.cs_name" :value="item.cs_id"></el-option>
						</el-select>
					</el-col>
					<el-col class="line" :span="1">&nbsp;</el-col>
					<el-col :span="3">
						<el-button type="primary" @click="add(2)">添加</el-button>
					</el-col>
				</el-form-item>

				<el-form-item v-show="this.form2.checked3">
					<div class="el-form1" style="width:470px">
						<el-tag type="primary" :key="index" v-for="(tag,index) in tag2" :closable="true" @close="handleClose(tag,2)">{{tag}}</el-tag>
					</div>
				</el-form-item>



				<el-form-item label="" >
					 <el-checkbox v-model="form2.checked4"> 连配课程</el-checkbox><span class="el-tip">　　　某些课程需要一天连上两节。连课优先度高于分布均匀</span>
				</el-form-item>

				<el-form-item label="" v-show="this.form2.checked4">
					<el-col :span="8">
						<el-select v-model="form2.value3" placeholder="请选择科目" @change="changeValue(form2.value3,3)">
							<el-option v-for="item in option3" :key="item.cs_id" :label="item.cs_name" :value="item.cs_id"></el-option>
						</el-select>
					</el-col>
					<el-col class="line" :span="1">&nbsp;</el-col>
					<el-col :span="3">
						<el-button type="primary" @click="add(3)">添加</el-button>
					</el-col>
				</el-form-item>

				<el-form-item v-show="this.form2.checked4">
					<div class="el-form1" style="width:470px">
						<el-tag type="primary" :key="index" v-for="(tag,index) in tag3" :closable="true" @close="handleClose(tag,3)">{{tag}}</el-tag>
					</div>
				</el-form-item>



				<el-form-item label="" >
					 <el-checkbox v-model="form2.checked5"> 平均任课</el-checkbox><span class="el-tip">　　　系统后台排课优先选派未任课的老师。</span>
				</el-form-item>

				<el-form-item>
					<div class="el-submit" style="width:500px">
						<el-button type="primary" @click="submit2">下 一 步</el-button>
					</div>
				</el-form-item>

			</el-form>
		</div>

	</section>
</template>
<script type="text/ecmascript-6">
import { getCourseList , setPaikeRules , getClassBySettingid } from '../../api/api';
export default {
	data() {
		return{
			url:{
				setting_id:'',
				type:'',
				section:'',
				total:'',					// 总节数
				week:'',					// 0：每周、1：单双周
				lesson:'',					// 节数
				day:''						// 天数
			},

			active:1,
			act:1,
			acts:1,
			tag2:[],
			tags2:[],
			tag3:[],
			tags3:[],
			tag4:[],
			tags4:[],
			form2:{
				checked1:false,
				checked2:false,
				checked3:false,
				checked4:false,
				checked5:false,
				value1:'',
				value2:'',
				value3:'',
				val1:'',
				val2:'',
				val3:''
			},
	        option3:[],
	        option4:[],
	        option5:[]
		}
	},
	methods: {
		getList(){
			// 所有课程列表
			getCourseList().then((res) => {
				this.option3 = res.data
			});
		},
		// 下一步
        submit2(){
        	let x = 0;
        	let y = 0;
        	let z = 0;
        	if(this.form2.checked1 === true){
        		x = 1
        	}
        	if(this.form2.checked2 === true){
        		y = 1
        	}
        	if(this.form2.checked5 === true){
        		z = 1
        	}
        	let para = {
				setting_id:this.url.setting_id,
				parallel_yn:x,
				divide_aver_yn:y,
				teach_aver_yn:z,
				mutual_exclu_cs:this.tags2.join(';'),
				consecutive_cs:this.tags3.join(',')
			}
        	setPaikeRules(para).then((res) => {
        		if(res.code !==1){
					this.$message.error(res.msg);
					return false;
				}else{
					this.$message({
						message: res.msg,
						type: 'success'
					});
					// 去第六步
					this.$router.push(
						{
							path:'/createTask6',
							query:{
								step:6,
								setting_id:this.url.setting_id,
								type:this.url.type,
								section:this.url.section,
								week:this.url.week,
								day:this.url.day,
								total:this.url.total,
								lesson:this.url.lesson
							}
						}
					)

				}
        	})
        },
		// 添加
        add(i){
        	if(i === 2){
        		let f = 'form'+i;
	        	let t = 'tag'+i;
	        	let ts= 'tags'+i;
	        	let v1 = this[f].value1;
	        	let v2 = this[f].value2;
				if(v1==='' || v2==='' ){
					this.$message.error('请选择学科')
					return false
				}
				if(v1 == v2){
					this.$message.error('选择学科不能相同')
					return false
				}
				let tag =this[f].value1+':'+this[f].value2;
				let tags =this[f].val1+'+'+this[f].val2;
				if(this.tag2.length > 0){
					for(let i = 0; i < this.tag2.length; i++){
						if(this.tag2[i].indexOf(this[f].val1) != -1 && this.tag2[i].indexOf(this[f].val2) != -1){
							this.$message.error('不能重复添加相同排课');
							return false
						}
					}
				}
				this[t].push(tags);
				this[ts].push(tag);
        	}else if(i ===3){
        		let f = 'form2';
        		let t = 'tag'+i;
	        	let ts= 'tags'+i;
	        	let v1 = this[f].value3;
				if(v1 === ''){
					this.$message.error('请选择学科')
					return false
				}
				if(this[t].length > 0){
					for(let i = 0; i < this[t].length;i++){
						if(this[t][i] == this[f].val3){
							this.$message.error('不能重复添加相同排课');
							return false
						}
					}
				}
				let tag = this[f].value3;
				let tags = this[f].val3;
				this[t].push(tags);
				this[ts].push(tag);

        	}else {

        		let f = 'form3';
        		let t = 'tag'+i;
	        	let ts= 'tags'+i;
	        	let v1 = this[f].value1;
	        	let v2 = this[f].value2;
				if(v1 === '' || v2.length ===0){
					this.$message.error('合并前请确保两项都有选择')
					return false
				}
				if(v2.length < 2){
					this.$message.error('请选择最少两个班级')
					return false
				}

				let txt = [];
				let id = [];
				this.option4.forEach((value,index)=>{
					for(let i = 0;i < this[f].value2.length;i++){
						if(value.class_id == this[f].value2[i]){
							txt.push(value.class_name);
							id.push(value.class_id);
						}
					}
				})

				let tag = this[f].value1 + ':' + id.join();
				let tags = this[f].val1 + '(' + txt.join() + ')';

				// 查找是否重复，已添加该课程
				if(this.tag4.length > 0){
					for(let i = 0; i < this.tag4.length; i++){
						for(let j = 0; j < txt.length;j++){
							if(this.tag4[i].indexOf(this[f].val1) != -1 && this.tag4[i].indexOf(txt[j]) != -1){
								this.$message.error('不能重复添加相同排课');
								return false
							}
						}
					}
				}

				this.tag4.push(tags);
				this.tags4.push(tag);
        	}
        },
        handleClose(tag,e){
        	let t = 'tag'+e;
        	let ts = 'tags'+e;
        	let cid = 'classId'+(e-1);
        	let i = this[t].indexOf(tag);
        	if(e > 4){
        		this[cid].splice(i, 1)
        	}
        	this[t].splice(i, 1); 
        	this[ts].splice(i, 1); 
        	//console.log(this[ts],this[t]);
        },
        changeValue(val,e){
			if(e === 1){
				let obj = {};
				obj = this.option3.find((item)=>{
					return item.cs_id === val;
				});
				this.form2.val1 = obj.cs_name
			}else if(e === 2){
				let obj = {};
				obj = this.option3.find((item)=>{
					return item.cs_id === val;
				});
				this.form2.val2 = obj.cs_name
			}else if(e === 3){
				let obj = {};
				obj = this.option3.find((item)=>{
					return item.cs_id === val;
				});
				this.form2.val3 = obj.cs_name
			}
        }
	},
	mounted() {
		if(this.$route.query.step.toString() == '5') {
			//this.step = this.$route.query.step.toString();
			this.url.setting_id = this.$route.query.setting_id.toString();
			this.url.type = this.$route.query.type.toString();
			this.url.section = this.$route.query.section.toString();
			this.url.total = this.$route.query.total.toString();
			this.url.lesson = this.$route.query.lesson.toString();
			this.url.week = this.$route.query.week.toString();
			this.url.day = this.$route.query.day.toString();
			// 所有课程列表
			this.getList();
		}else{
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="scss">
.el-tab,.el-week{
	margin:30px auto 0;
	width: 270px;
	height: 41px;
	border-bottom: 1px solid #ccc
}
.el-tab span{
	font-size: 14px;
	line-height: 40px;
	color: #8492a6;
	display: inline-block;
	width: 33%;
	text-align: center;
}
.el-tab .act{
	color: #20A0FF;
	border-bottom: 3px solid #20A0FF
}
.el-form1{
	width: 770px;
	margin:0px auto 0;
	border:1px solid #ccc;
	border-radius: 8px;
	padding:15px;
	min-height:100px 
}
.el-tag{
	margin-bottom: 10px
}
.el-submit{
	width: 770px;
	margin:20px auto 0;
	text-align: center;
	border-radius: 8px;
	padding:15px 0;
}
.el-tip{
	color: #8492a6;
	line-height: 25px;
}
</style>