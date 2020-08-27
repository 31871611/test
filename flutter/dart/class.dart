import 'Person.dart';

void main(){

/** 
  var person = new Person();
  person.name = "张三";
  person.age = 11;
  person.work();
*/


/*
  var rect = new Rectangle();
  rect.height = 20;
  rect.width = 30;
  print(rect.area);

  rect.area = 200;
  print(rect.width);
*/


/** 
  // 构造方法
  var person = new Person("张三",20,"male");
  var person2 = new Person.withName("name");
*/




}


class Rectangle{
  num width,height;

  // 计算属性
  num get area => width * height;
      set area(value){
        width = value / 20;
      }
}
