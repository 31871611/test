

// 方法
class Person{
  String name;
  int age;
  final String gender;
  //String _lt;


  // 构造方法.与类命名一样
  Person(this.name,this.age,this.gender);

  // 第二个构造方法
  Person.withName(this.name,this.gender);

  // 初始化列表
  Person.withMap(Map map):name = map["name"],gender = map["gender"]{
    age = map["age"];
  }

  void work(){
    print("name is $name,age is $age");
  }

  //call方法，名称必须是call
  void call(){
    print("name is $name,age is $age");
  }

}