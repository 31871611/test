<template>
	<section class="archives" v-loading="listLoading">

		<archives-tab :id="id" :type="'home'"></archives-tab>

		<div class="archivesTop">
			<div class="archivesTitle">
				<i></i>
				<h1>个人报告</h1>
			</div>
		</div>

		<div class="my">
			<div class="face">
				<!--<img src="../../../static/img/archivesFace.png" alt="">-->
				<img :src="baseMessage.pic_url" alt="">
			</div>
			<div class="box">
				<h3>
					{{baseMessage.realname}}　
					<template v-if="baseMessage.gender == '男'">
						<img src="../../../static/img/archivesSex1.png" alt="">
					</template>
					<template v-else>
						<img src="../../../static/img/archivesSex2.png" alt="">
					</template>
				</h3>
				<ul>
					<li>学　　号：{{baseMessage.student_number}}</li>
					<!-- 0:在读 1：已转班 2：已经辍学 3：离校 4：毕业 -->
					<li>状　　态：
						<template v-if="baseMessage.cur_status == 0">
							在读
						</template>
						<template v-else-if="baseMessage.cur_status == 1">
							已转班
						</template>
						<template v-else-if="baseMessage.cur_status == 2">
							已经辍学
						</template>
						<template v-else-if="baseMessage.cur_status == 3">
							离校
						</template>
						<template v-else-if="baseMessage.cur_status == 4">
							毕业
						</template>
					</li>
					<li>目前学校：{{baseMessage.school_name}}</li>
					<li>入学时间：{{baseMessage.join_time}}</li>
					<li>所在年段：{{baseMessage.section}}</li>
					<li>所在班级：{{baseMessage.class_num}}</li>
				</ul>
			</div>
		</div>

		<div class="record">
			<h2>测评记录情况－兴趣倾向测评</h2>

			<template v-if="evaluateDataTxt != ''">
				<h3>测评结果（根据您最后一次测评得出）</h3>
				<ul>
					<li v-for="item in evaluateDataTypeData" :class="{'select':item.is}">
						<i :class="getClassI(item.i)"></i>
						<span>{{item.txt}}</span>
					</li>
				</ul>
				<h3>您的兴趣类型是：<span>{{evaluateData.remark}}</span></h3>

				<div class="typeTable">
					<el-table :data="evaluateDataList" border style="width: 100%">
						<el-table-column label="类型">
							<template slot-scope="scope">
								<h4>{{scope.row.a1}}</h4>
								<span>（{{scope.row.a0}}）</span>
							</template>
						</el-table-column>
						<el-table-column label="兴趣特征" width="820">
							<template slot-scope="scope">
								<p>{{scope.row.a2}}</p>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<h3>适合您的专业与职业：</h3>
				<div class="txt">{{evaluateDataTxt}}</div>
			</template>
			<div class="not" v-else><i></i><span>暂无测评记录</span></div>
		</div>

		<div class="archivesChart">
			<div class="box">
				<div id="main" class="chartBlock"></div>
			</div>
			<div class="box">
				<div id="main2" class="chartBlock"></div>
			</div>
		</div>

		<div class="subject">
			<h2>选科科目</h2>
			<ul v-if="subjectData.length > 0">
				<li v-for="item in subjectData">{{item.name}}</li>
			</ul>
			<div class="not" v-else><i></i><span>暂未选科</span></div>
		</div>

		<div class="volunteer">
			<h2>模拟志愿情况</h2>

			<template v-if="willMessage.count && willMessage.max && willMessage.min && willMessage.avg && willMessage.school_list.length > 0">
				<div class="fraction">
					<span>模拟总次数  {{willMessage.count}}</span>
					<span>模拟最高分  {{willMessage.max}}</span>
					<span>模拟最低分  {{willMessage.min}}</span>
					<span>模拟平均分  {{willMessage.avg}}</span>
				</div>
				<h3>根据最后一次测评为您推荐：</h3>
				<ul>
					<li v-for="item in willMessage.school_list">
						<div class="photo">
							<img :src="item.thumb" alt="">
						</div>
						<h4>{{item.title}}</h4>
						<div class="line"></div>
						<div class="type">
							<span>{{item.school_type}}</span>
							<b v-for="tag in item.school_tags.split(',')" v-if="tag != ''">{{tag}}</b>
						</div>
						<p><i></i>{{item.province}}－{{item.city}}</p>
						<p class="no">{{item.yesteryear}}年平均分：{{item.score_average}}</p>
					</li>
				</ul>
			</template>
			<div class="not" v-else><i></i><span>暂无模拟志愿情况</span></div>

		</div>

		<div class="honor">
			<h2>获得荣誉</h2>
			<ul v-if="honerData.total && honerData.time && honerData.content">
				<li>
					<div class="photo">
						{{honerData.total}}次
					</div>
					<div class="box">
						<h3>恭喜您在 {{honerData.time}} 获得</h3>
						<p>{{honerData.content}}</p>
					</div>
				</li>
			</ul>
			<div class="not" v-else><i></i><span>暂未获得荣誉</span></div>
		</div>

		<div class="achievement">
			<div class="achievementTop">
				<h2>考试成绩情况</h2>
				<el-select v-model="examAnalysisModel" placeholder="请选择" style="float:right;margin: 18px 20px 0 0;" @change="getExamAnalysis">
					<!--<el-option label="全部" value=""></el-option>-->
					<el-option v-for="item in examAnalysisOptions" :key="item.id" :label="item.exam_type_name" :value="item.id"></el-option>
				</el-select>
			</div>

			<template v-if="examAnalysisList.length > 0">
				<ul class="examAnalysisList">
					<li v-for="item in examAnalysisList">
						<div class="photo">
							<template v-if="item.name == '优秀'">
								<img src="../../../static/img/examAnalysisList1.png" alt="">
							</template>
							<template v-else-if="item.name == '良好'">
								<img src="../../../static/img/examAnalysisList2.png" alt="">
							</template>
							<template v-else-if="item.name == '合格'">
								<img src="../../../static/img/examAnalysisList3.png" alt="">
							</template>
							<template v-else-if="item.name == '尚待改进'">
								<img src="../../../static/img/examAnalysisList4.png" alt="">
							</template>
							<template v-else-if="item.name == '缺考'">
								<img src="../../../static/img/examAnalysisList5.png" alt="">
							</template>
						</div>
						<div class="box">
							<p>{{item.name}}－{{item.percent}}%</p>
							<div class="schedule" :style="{width:item.width + 'px'}">
								<el-tooltip v-for="value in item.data" effect="dark" :key="value.name" :content="value.title" placement="top-start">
									<span :class="getClassI(value.name)" :style="{width:value.width + 'px'}"></span>
								</el-tooltip>
							</div>
						</div>
						<div class="num">{{item.total}}次</div>
					</li>
				</ul>

				<div class="line"></div>

				<div class="examAnalysisColor">
					<b>科目：</b>
					<div class="box">
						<i class="i1"></i>
						<span>语文</span>
						<i class="i2"></i>
						<span>数学</span>
						<i class="i3"></i>
						<span>外语</span>
						<i class="i4"></i>
						<span>历史</span>
						<i class="i5"></i>
						<span>地理</span>
						<i class="i6"></i>
						<span>政治</span>
						<i class="i7"></i>
						<span>物理</span>
						<i class="i8"></i>
						<span>化学</span>
						<i class="i9"></i>
						<span>生物</span>
						<i class="i10"></i>
						<span>音乐</span>
						<i class="i11"></i>
						<span>美术</span>
						<i class="i12"></i>
						<span>运动与健康</span>
						<i class="i13"></i>
						<span>通用技术</span>
						<i class="i14"></i>
						<span>信息技术</span>
						<i class="i15"></i>
						<span>社区服务</span>
						<i class="i16"></i>
						<span>社会实践</span>
					</div>
				</div>
			</template>
			<div class="not" v-else><i></i><span>暂无考试成绩情况</span></div>
		</div>


	</section>
</template>
<script type="text/ecmascript-6">
import { archivesGetTermName , archivesGetStuInfo , archivesGetSubjectData , archivesGetHonerData , archivesGetWillMessage , archivesGetHomeworkData , archivesGetExamAnalysis , archivesEvaluateGetList , archivesEvaluateGetInfo , archivesGetExamTypeList } from '../../api/api';
import archivesTab from './tab.vue';
import echarts from 'echarts'

export default {
	 data() { 	
	    return {
			listLoading:false,
			id:'',
			baseMessage:{},
			subjectData:[],
			honerData:{},
			willMessage:{
				count:null,
				max:null,
				min:null,
				avg:null,
				school_list:[]
			},
			evaluateData:{},
			evaluateDataTypeData:[
				{'i':'r','txt':'R 现实型','is':false},
				{'i':'i','txt':'I 研究型','is':false},
				{'i':'a','txt':'A 艺术型','is':false},
				{'i':'s','txt':'S 社会型','is':false},
				{'i':'e','txt':'E 管理型','is':false},
				{'i':'c','txt':'C 常规型','is':false}
			],
			evaluateDataType:[],
			evaluateDataList:[],
			evaluateDataTxt:'',
			options: [],
			year:'',
			term:'0',
			// 饼图
			pieChart:null,
			pieChart2:null,
			examAnalysisList:[],
			examAnalysisModel:'',
			examAnalysisOptions:[]
		}
	},
	methods: {
		getClassI(txt){
			return txt
		},
		// 学生个人资料
		getMyInfo(){
			//this.listLoading = true;
			let para = {
				user_id:this.id
			}
			archivesGetStuInfo(para).then((res) => {
				//this.listLoading = false;
				if(res.code == 1) {
					//console.log(res)
					this.baseMessage = res.data;
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 学生选科科目信息
		getSubjectData(){
			//this.listLoading = true;
			let para = {
				user_id:this.id
			}
			archivesGetSubjectData(para).then((res) => {
				//this.listLoading = false;
				if(res.code == 1) {
					console.log(res)
					this.subjectData = res.data;
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 学生荣誉信息
		getHonerData(){
			//this.listLoading = true;
			let para = {
				user_id:this.id
			}
			archivesGetHonerData(para).then((res) => {
				//this.listLoading = false;
				if(res.code == 1) {
					//console.log(res)
					this.honerData = res.data;
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 学生模拟志愿信息
		getWillMessage(){
			//this.listLoading = true;
			let para = {
				user_id:this.id
			}
			archivesGetWillMessage(para).then((res) => {
				//this.listLoading = false;
				if(res.code == 1) {
					//console.log(res)
					this.willMessage = res.data;
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 学生作业统计图表
		getHomeworkInit(){

			this.$nextTick(function() {

				// 饼图
				this.pieChart = echarts.init(document.getElementById('main'));
				this.pieChart.setOption({
					title: {
						text: '生涯作业成绩情况',
						left:140,
						top:0
					},
					tooltip : {
						trigger: 'item',
						formatter: "{d}% <br/>{b} : {c} 次"
					},
					series : [
						{
							name: '次数',
							type: 'pie',
							radius: ['30%', '70%'],
							//data:this.pieData
							data:[],
							label: {
								normal: {
									show: false,
									position: 'center'
								}
							}
						}
					]
				})

				// 饼图2
				this.pieChart2 = echarts.init(document.getElementById('main2'));
				this.pieChart2.setOption({
					title: {
						text: '生涯作业完成情况',
						left:140,
						top:0
					},
					tooltip : {
						trigger: 'item',
						formatter: "{d}% <br/>{b} : {c} 次"
					},
					series : [
						{
							name: '次数',
							type: 'pie',
							radius: ['30%', '70%'],
							//data:this.pieData
							data:[],
							label: {
								normal: {
									show: false,
									position: 'center'
								}
							}
						}
					]
				})

				this.getHomeworkData();

			})

		},
		// 学生作业统计
		getHomeworkData(){
			let para = {
				user_id:this.id
			}
			archivesGetHomeworkData(para).then((res) => {
				if(res.code == 1) {
					//console.log(res)
					let data = res.data;

					// 饼图1
					var color1 = [
						'#F46769',
						'#FC9834',
						'#2CA3FD',
						'#94D45F',
						'#ECECEC'
					];
					var arr1 = [];
					data.list1.forEach((value,index)=>{
						let obj = {}
						obj.value = value.value
						obj.name = value.name
						obj.itemStyle = {
							normal:{
								color:color1[index]
							}
						}
						arr1.push(obj)
					})
					// 饼图填入数据
					this.pieChart.setOption({
						legend: {
							orient: 'vertical',
							x: '0',
							y:'150px',
							data:['A','B','C','D','其他']
						},
						series : [
							{
								data:arr1
							}
						]
					})


					// 饼图2
					var color2 = [
						'#3DA4EF',
						'#B8E986',
						'#E5E5E5'
					];
					var arr2 = [];
					data.list2.forEach((value,index)=>{
						let obj = {}
						obj.value = value.value
						obj.name = value.name
						obj.itemStyle = {
							normal:{
								color:color2[index]
							}
						}
						arr2.push(obj)
					})
					// 饼图填入数据
					this.pieChart2.setOption({
						legend: {
							orient: 'vertical',
							x: '0',
							y:'160px',
							data:['按时完成','补交','未完成']
						},
						series : [
							{
								data:arr2
							}
						]
					})

				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 测评
		getEvaluateGetList(){
			archivesEvaluateGetList({
				type_id:3,
				user_id:this.id,
				page:1,
				page_size:1
			}).then((res) => {
				if(res.code == 1) {
					if(res.data.list.length == 0){
						return false
					}
					archivesEvaluateGetInfo({
						result_id:res.data.list[0].result_id
					}).then((ress) => {
						if(ress.code == 1) {
							//console.log(ress.data)
							this.evaluateData = ress.data;

							this.evaluateDataType = [];
							// 兴趣类型
							for(let i = 0;i < this.evaluateDataTypeData.length;i++){
								for(let j = 0;j < this.evaluateData.remark.length;j++){
									if(this.evaluateDataTypeData[i].i.toUpperCase() == this.evaluateData.remark[j]){
										this.evaluateDataTypeData[i].is = true;
										//console.log(this.evaluateData.remark[j])
										break
									}
								}
							}

							// 类型列表
							this.evaluateData.resultDesc.detail.forEach((value)=>{
								var obj = {}
								value.forEach((val,index)=>{
									obj['a' + index] = val
								})
								this.evaluateDataList.push(obj)
							})
							//console.log(this.evaluateDataList)

							// 适合您的专业与职业
							this.evaluateDataTxt = ress.data.resultDesc.result;

						}else{
							this.$message.error(ress.msg);
						}
					})
				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 考试成绩统计
		getExamAnalysis(){
			let para = {
				user_id:this.id,
				exam_type:this.examAnalysisModel
			}
			archivesGetExamAnalysis(para).then((res) => {
				if(res.code == 1) {
					//console.log(JSON.stringify(res.data))
					let examAnalysisList = res.data;

					// 各科目
					let subject = {
						"c_chinese" : "语文",
						"c_english" : "外语",
						"c_math" :"数学",
						"c_physics" :"物理",
						"c_chemistry" :"化学",
						"c_biology" :"生物",
						"c_politics" :"政治",
						"c_history" :"历史",
						"c_geography" :"地理",
						"c_music" :"音乐",
						"c_art" :"美术",
						"c_sport" :"运动与健康",
						"c_universal_tech" :"通用技术",
						"c_info_tech" :"信息技术",
						"c_commu_service" :"社区服务",
						"c_social_practice" :"社会实践"
					}

					// 计算总数
					let total = 0;
					for(let i in examAnalysisList){
						total += examAnalysisList[i].total
					}

					this.examAnalysisList = []
					// 重新拼接数据
					for(let i in examAnalysisList){
						var obj = {};
						// 第项的长度
						let width = Math.floor(860 / total * examAnalysisList[i].total);
						obj.width = width;
						// 单科的长度
						//let num = Math.floor(width / examAnalysisList[i].total);
						let num = width / examAnalysisList[i].total;
						for(let j in examAnalysisList[i]){
							obj[j] = examAnalysisList[i][j];
							obj.data = [];
							for(let m in examAnalysisList[i].data){
								var obj2 = {};
								obj2.name = m;
								obj2.value = examAnalysisList[i].data[m];
								obj2.width = num * examAnalysisList[i].data[m];
								obj2.title = subject[m] + examAnalysisList[i].data[m] + '次';
								obj.data.push(obj2);
							}
						}
						this.examAnalysisList.push(obj);
					}
					//console.log(this.examAnalysisList)

				}else{
					this.$message.error(res.msg);
				}
			})
		},
		// 获取考试成绩类型下拉
		getType(){
			archivesGetExamTypeList({
				page:1,
				pagesize:100
			}).then((res) => {
				if(res.code == 1){
					//console.log(res)
					this.examAnalysisOptions = res.data.list;
					this.examAnalysisModel = '';
				}else{
					this.$message.error(res.msg)
				}
			})
		}

	},
	mounted() {
		this.id = this.$route.query.id;

		this.getMyInfo();
		this.getSubjectData();
		this.getHonerData();
		this.getWillMessage();
		this.getHomeworkInit();
		this.getEvaluateGetList();
		this.getExamAnalysis();
		this.getType();
	},
	components: {
		archivesTab
	}
}
</script>
<style lang="scss" src="../../styles/archivesHome.scss" scoped></style>