<template>
	<section>

		<div class="course">
			<h2>选课活动</h2>

			<div class="courseInfo">
				<section>
					<p>学年：{{courseData.term_name}}</p>
					<p>学期：{{courseData.term}}</p>
					<p>年级：{{courseData.section_name}}</p>
					<p>开始时间：{{courseData.begin_date}}</p>
					<p>结束时间：{{courseData.end_date}}</p>
				</section>
				<section>
					<h4>可选组合：</h4>
					<ul>
						<li v-for="(item,index) in combinationList">{{index+1}}、{{item.courses_name}}</li>
					</ul>
				</section>
			</div>

			<div class="courseVolunteer">
				<el-form ref="volunteer" label-width="130px" :model="volunteer">
					<el-form-item label="第一志愿：" :class="{'is-error':isError.a1}">
						<el-select style="width:150px" placeholder="请选择第一志愿" v-model="volunteer.a1" @change="volunteerChange1('a1')">
							<el-option v-for="(item,index) in combinationList" :key="index" :label="item.courses_name" :value="item.courses"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="第二志愿：" :class="{'is-error':isError.a2}">
						<el-select style="width:150px" placeholder="请选择第二志愿" v-model="volunteer.a2" @change="volunteerChange2('a2')">
							<el-option v-for="(item,index) in combinationList" :key="index" :label="item.courses_name" :value="item.courses"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="第三志愿：">
						<el-select style="width:150px" placeholder="请选择第三志愿" v-model="volunteer.a3" @change="volunteerChange3('a3')">
							<el-option v-for="(item,index) in combinationList" :key="index" :label="item.courses_name" :value="item.courses"></el-option>
						</el-select>
					</el-form-item>
				</el-form>

				<ul class="saveList">
					<li v-show="volunteer1">第一志愿：<span>{{volunteer1}}</span></li>
					<li v-show="volunteer2">第二志愿：<span>{{volunteer2}}</span></li>
					<li v-show="volunteer3">第三志愿：<span>{{volunteer3}}</span></li>
				</ul>

				<el-button type="primary" @click="reset" style="width:88px;" :disabled="volunteer1 == ''">重置</el-button>
			</div>


			<div class="submit">
				<el-button type="primary" @click="submit" style="width:88px;">提交</el-button>
			</div>

		</div>

	</section>
</template>
<script type="text/ecmascript-6">
import { getCombinationList , courseData , getCombinationData , combinationDelete , combinationInsert } from '../../api/api';

export default {
	data() {
		return {
			setting_id:'',
			courseData:{},
			combinationList:[],
			volunteer:{
				a1:'',
				a2:'',
				a3:''
			},
			isError:{
				a1:false,
				a2:false,
				a3:false
			},
			volunteer1:'',
			volunteer2:'',
			volunteer3:'',
			saveList:{}
		};
	},
	methods: {
		// 学生选课信息
		getCourseData(){
			courseData({}).then((res) => {
				if(res.code == 1) {
					//console.log(res)
					this.courseData = res.data;
					this.setting_id = res.data.id;

					this.getCombination()
					this.getCombinationData()
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 学生选课组合信息
		getCombination(){
			let para = {
				setting_id:this.setting_id
			};
			getCombinationList(para).then((res) => {
				if(res.code == 1) {
					let data = res.data;

					// 去除重复
					data.forEach((val,index)=>{
						if(index === 0){
							this.combinationList.push(data[index])
						}
						let is = false;
						for(var i = 0; i < this.combinationList.length;i++){
							if(this.combinationList[i].courses_name == val.courses_name){
								is = true;
								break;
							}
						}
						if(!is){
							this.combinationList.push(data[index])
						}
					})

				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 学生选择的选课组合信息(边框里)
		getCombinationData(){
			let para = {
				setting_id:this.setting_id
			};
			getCombinationData(para).then((res) => {
				if(res.code == 1) {
					//console.log(res)
					let data = res.data;
					this.volunteer1 = data.will1_name
					this.volunteer2 = data.will2_name
					this.volunteer3 = data.will3_name
				}else{
					//this.$message.error(res.msg);
				}
			})
		},
		// 第一志愿下拉
		volunteerChange1(val){
			//console.log('第一志愿：' + val)
			if(this.volunteer.a1 != ''){
				this.isError.a1 = false;
			}
		},
		// 第二志愿下拉
		volunteerChange2(val){
			//console.log('第二志愿：' + val)
			if(this.volunteer.a2 != ''){
				this.isError.a2 = false;
			}
			if(this.volunteer.a1 == ''){
				this.isError.a1 = true;
				this.$message.error('请先选择第一志愿');
				this.volunteer.a2 = '';
				return false;
			}
		},
		// 第三志愿下拉
		volunteerChange3(val){
			//console.log('第三志愿：' + val)
			if(this.volunteer.a1 == ''){
				this.isError.a1 = true;
				this.$message.error('请先选择第一志愿');
				this.volunteer.a3 = '';
				return false;
			}
			if(this.volunteer.a2 == ''){
				this.isError.a2 = true;
				this.$message.error('请先选择第二志愿');
				this.volunteer.a3 = '';
				return false;
			}
		},
		// 重置
		reset(){
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					setting_id:this.setting_id
				};
				combinationDelete(para).then((res) => {
					if(res.code == 1) {
						this.$message({
							message: res.msg,
							type: 'success'
						});
						this.getCombinationData();
						this.volunteer1 = '';
						this.volunteer2 = '';
						this.volunteer3 = '';
					}else{
						this.$message.error(res.msg);
					}
				})
			}).catch(() => {

			});
		},
		// 提交
		submit(){
			if(this.volunteer.a1 == ''){
				this.$message.error('请先选择第一志愿');
				this.isError.a1 = true;
				return false;
			}
			let para = {
				setting_id:this.setting_id,
				will1:this.volunteer.a1,
				will2:this.volunteer.a2,
				will3:this.volunteer.a3
			};
			combinationInsert(para).then((res) => {
				if(res.code == 1) {
					//console.log(res)
					this.$message({
						message: res.msg,
						type: 'success'
					});
					this.getCombinationData();
					//this.volunteer.a1 = '';
					//this.volunteer.a2 = '';
					//this.volunteer.a3 = '';
				}else{
					this.$message.error(res.msg);
				}
			})
		}
	},
	mounted() {
		this.getCourseData();
	}
}
</script>
<style lang="scss" scoped>
.course{
	h2{
		text-align: center;
		font-size: 18px;
		color: #209FFE;
		font-weight: normal;
	}
	.courseInfo{
		$h:172px;
		width: 868px;
		height: $h;
		border: 1px solid #D0DAE7;
		border-radius: 4px;
		margin:20px auto 40px;
		section{
			/*width: 413px;*/
			height: $h;
			&:nth-child(1){
				float:left;
				 width: 250px;
				background: #f6fcff;
				border-right: 1px solid #D0DAE7;
			}
			&:nth-child(2){
				margin-left: 251px;
			}
		}
		p,h4{
			padding:0;
			margin:0;
		}
		p{
			font-size: 14px;
			color: #475669;
			padding-left: 24px;
			padding-top: 13px;
		}
		h4{
			font-size: 14px;
			color: #475669;
			/*float:left;*/
			/*height: $h;*/
			/*line-height: $h;*/
			font-weight: normal;
			padding-top: 13px;
			padding-left: 30px;
			padding-right: 14px;
		}
		ul{
			list-style: none;
			font-size: 14px;
			color: #475669;
			/*float:left;*/
			margin: 0;
			padding:16px 0 0 30px;
			li{
				margin-right: 30px;
				margin-bottom: 10px;
				float:left;
			}
		}
	}
	.courseVolunteer{
		height:200px;
		display: flex;
		justify-content: center;
		.el-form,.saveList,.el-button{
			/*float:left;*/
		}
		.saveList{
			margin-top: 16px;
			margin-left: 40px;
		}
		.el-button{
			height: 36px;
			margin-top: 46px;
			margin-left: 30px;
		}
	}

	.saveList{
		width: 400px;
		height: 114px - 9;
		overflow-y: auto;
		border: 1px solid #C0CCDA;
		border-radius: 4px;
		/*margin: 35px auto 0;*/
		margin: 0;
		padding:9px 9px 0 9px;
		list-style: none;
		li{
			margin-bottom: 9px;
			height: 26px;
			line-height: 26px;
			font-size: 14px;
			color: #475669;
		}
		span{
			vertical-align: middle;
			overflow: hidden;
			text-align: center;
			height: 24px;;
			line-height: 24px;
			display: inline-block;
			/*width: 110px;*/
			padding: 0 5px;
			color: #20A0FF;
			background: rgba(32,160,255,0.10);
			border: 1px solid rgba(32,160,255,0.20);
			border-radius: 4px;
		}
	}
	.submit{
		text-align: center;
	}
}
</style>