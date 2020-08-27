

void main(){


/*
  var a = "变量a";
  print(a);

  final b = "只能赋值一次的变量";
  print(b);

  const c = "常量，必须是编译期的常量";
*/



/* 

  // 数值型

  num a = 10;

  int b = 20;

  double c = 10.5;

  // 运算符：+、-、*、/、~/、%

  print(b.isEven);
  print(b.isOdd);

  int e = -100;
  print(e.abs());

  double f = 10.5;
  print(f.round());

*/



/* 
  // 字符串
  String str1 = 'hello';
  String str2 = '''hello
        多行
        22
  ''';

  print(str1);
  print(str2);

  String str3 = 'hello \n dart';
  String str4 = r'hello \n dart';
  print(str3);  // 换行
  print(str4);  // 转义不换行

  String s2 = 'The + operator ';
  print(s2 + 'works, as well.');  // 连接
  print(s2 * 5);      // 复制5次
  print(s2 == "5");   // 是否相等
  print(s2[0]);

  int int1 = 1;
  int int2 = 2;
  print("a + b = ${int1 + int2}");

  print(s2.length;);
  print(s2.isEmpty;);

*/


/* 

  // 布尔型
  bool isTrue = true;
  bool isFalse = false;

*/


/* 
  // 列表list(数组)
  var list1 = [1,2,3,"str",true];
  print(list1);
  print(list1[2]);
  list1[3] = "hello";

  var list2 = const [1,2,3];  // 不可修改

  list1.length;
  list1.add("添加");
  list1.insert(1, "在1的位置插入");
  print(list1);

  list1.remove("添加");   // 删除上面添加的内容
  print(list1);

  //list1.clear();

  list1.indexOf("str");

*/

/* 

  //map
  var map1 = {
    "first":"dart",
    "second":"java"
  };

    var map2 =  const {
    "first":"dart",
    "second":"java"
  };

  print(map1);
  print(map1["first"]);
  map1["first"] = "sass";

  map1.containsKey("first");
  map1.containsValue("sass");

  map1.forEach((key, value) {
    print("key=$key,value=$value");
  });

*/


/* 
  getPerson("张", 11);



  printPerson('张三');
  printPerson('李四',age:20);
  printPerson('李四',age:20,gender:'male');

  printPerson2('张三');
  printPerson2('李四',20);
  printPerson2('李四',20,'male');



  // 匿名方法
  var func = (str){
    print(str);
  };
  func(30);

  ((){
    print("test");
  })();
*/

}

// 定义函数
String getPerson(String name,int age){
  return "name=$name,age=$age";
}


// 可选参数
void printPerson(String name,{int age,String gender}){
  print("name=$name,age=$age,gender=$gender");
}

void printPerson2(String name,[int age,String gender]){
  print("name=$name,age=$age,gender=$gender");
}

void enableFlags({bool bold = false, bool hidden = false}) {

}




