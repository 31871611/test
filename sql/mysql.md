多条SQL语句必须以分号;分隔
SQL语句不区分大小写

+检索数据
    检索单个列
    SELECT prod_name FROM products
    检索多个列
    SELECT prod_name,prod_id,prod_price FROM products
    检索所有列
    SELECT * FROM products
    DISTINCT关键字（去重），只返回不同的值
    SELECT DISTINCT vend_id FROM products
    LIMIT 5返回不多于5行的数据
    SELECT prod_name FROM products LIMIT 5
    LIMIT 5,5返回从行5开始的5行。第一个数为开始位置，第二个数为要检索的行数
    SELECT prod_name FROM products LIMIT 5,5

+排序检索数据
    ORDER BY子句取一个或多个列的名字，对输出进行排序
    SELECT prod_name FROM products ORDER BY prod_name
    首先按价格，然后再按名称排序
    SELECT prod_id,prod_price,prod_name FROM products ORDER BY prod_price,prod_name
    DESC降序排序，ASC升序（默认）
    SELECT prod_id,prod_price,prod_name FROM products ORDER BY prod_price DESC
    只对prod_price列指定DESC降序排序，prod_name仍按默认升序排序
    SELECT prod_id,prod_price,prod_name FROM products ORDER BY prod_price DESC,prod_name
在给出ORDER BY子句中，应该保证它位于FROM子句之后，如果使用LIMIT，它必须于ORDER BY之后

+过滤数据WHERE
    只返回prod_price=2.5的值
    SELECT * FROM products WHERE prod_price=2.5
    返回5和10之间的产品
    SELECT * FROM products WHERE prod_price BETWEEN 5 AND 10
在同时使用ORDER BY和WHERE子句时，应该让ORDER BY位于WHERE之后
    WHERE子句操作符
    =           等于
    <>          不等于
    !=          不等于
    <           小于
    <=          小于等于
    >           大于
    >=          大于等于
    BETWEEN     在指定的两个值之间

+数据过滤
    AND操作符
    OR操作符
    IN操作符
    NOT操作符


+使用子查询
    1、SELECT order_num FROM orderitems WHERE prod_id='tnt2';返回20005、20007
    2、SELECT cust_id FROM orders WHERE order_num IN(20005,20007);查询订单20005和20007的客户id
    把第一个查询变为子查询组合两个查询
    SELECT cust_id FROM orders WHERE order_num IN(SELECT order_num FROM orderitems WHERE prod_id='tnt2')
    在select语句中，子查询总是从内向外处理
    对于能嵌套的子查询的数目没有限制，不过在实际使用时由于性能的限制，不能嵌套太多的子查询
    计算字段使用子查询
    SELECT COUNT(*) FROM orders WHERE cust_id=10001;返回cust_id=10001的数量
    SELECT cust_name,cust_state,(SELECT COUNT(*) FROM orders WHERE orders.cust_id=customers.cust_id) AS orders FROM customers ORDER BY cust_name;
    增加一个字段为orders显示orders.cust_id=customers.cust_id的数量





●++

bit 布尔类型 0 或 1

int 整数      32位系统为32位，64位系统为64位
bigint 大整数

datetime  时间

nvarchar(50)  长度为50的字符串    可以使用中文、日文
nvarchar(MAX)  无限（最大）字符串

char(10);加了10表示10个字符
varchar(50)    没有中文、日文等字符

char(10) 与 varchar(10)
char(10)如果字符不达10后面用空格填充
varchar(10)后面不会用空格填充



sql语句字符串用单引号
sql语句大小写不敏感
INSERT INTO T_PERSON(ID,NAME,AGE) VALUES(1,'jim',20)

insert into t_person(id,name,age) values(1,'jim',20)


空值处理
为空：SELECT * FROM person1 WHERE Nickname IS NULL
不为空：SELECT * FROM person1 WHERE Nickname IS NOT NULL

空值处理函数:nickname为空就返回'无'
SELECT ISNULL(nickname,'无') AS '昵称' from person1


主键自增加  标识规范设置为是(表中只能有一个)
GUID生成器  可以生成唯一标识
select newid()
Guid id = Guid.NewGuid();



插入数据
INSERT INTO 表名称 VALUES (值1, 值2,....)
insert into person3 values('lucy',38)

我们也可以指定所要插入数据的列：
INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
insert into person3(Name) values('lucy')




更新数据
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 值

某个值加1，或者减1么
update 表名 set jine=jine-1

更新一个列：update person set age=30
更新多个列：update person set Age=30,Name='tom'
中文前面加一个N:update person set nickname=N'青年人'    (如果有问题就加N，不一定会出问题)

为 lastname 是 "Wilson" 的人添加 firstname：UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson'
过滤age大于等于20：update person set nickname=N'青年人' where Age>=20
update person set nickname=N'青年人' where (Age>20 and Age<30) or (Age=80)





删除数据
DELETE FROM 表名称 WHERE 列名称 = 值

删除某行:DELETE FROM Person WHERE LastName = 'Wilson' ("Fred Wilson" 会被删除：)




查数据（数据检索）
SELECT 列名称 FROM 表名称  或  SELECT * FROM 表名称

as给列取别名：select Name as 姓名,Age as 年龄 FROM person where age>50
取得当前时间：select getdate()


sql聚合函数：MAX(最大值)、MIN(最小值)、AVG(平均值)、SUM(和)、COUNT(数量)
大于25岁的员工的最高工资：select MAX(fsalsry) FROM person where Age>25





数据的排序
ASC:升序  DESC：降序  where要在ORDER BY之前
select 列名称 from 表名称 ORDER BY age(条件)
以字母顺序显示年龄：SELECT Age FROM person ORDER BY Age
以升序排列：SELECT * FROM person ORDER BY Age ASC
多条件升降排序：select * from person ORDER BY age ASC,Number DESC






通配符过滤
%：替代一个或多个字符
_：仅替代一个字符
SELECT * FROM person1 WHERE NAME LIKE '马%'










多值匹配
10,18,26的值：SELECT * FROM person1 WHERE age IN (10,18,26)
20于30之间的：SELECT * FROM person1 WHERE age BETWEEN 20 AND 30



SQL COUNT(*) 语法：函数返回表中的记录数
SELECT COUNT(*) FROM table_name


数据分组
GROUP BY 语句用于结合合计函数，根据一个或多个列对结果集进行分组
SELECT age,COUNT(*) FROM person1 GROUP BY Age



Having语句    Having在ORDER BY之后
SELECT age,COUNT(*) FROM person1 GROUP BY Age HAVING COUNT(*) >1
//Having是对分组后信息过滤，能用的列与select中能用的列是一样。无法代替where




case函数
case i
when 1 then 'aaa'
when 2 then 'bbb'
else 'ccc'
end

SELECT NAME,
(
	case leve
	WHEN 1 THEN '等级一'
	WHEN 2 THEN '等级二'
	WHEN 3 THEN '等级三'
	WHEN 4 THEN '等级四'
	ELSE '无'
	END
)AS '等级'
FROM person1