全是post

# 提交表单
127.0.0.1:7001/patrol/info/add

type 表示类型，people,govern,yuyue
{
	"name": "苏远",
	"mobile": "13",
	"sex": 1,
	"content": "11ssss少时诵诗书",
	"image_url": "111",
	"type": "test",
	"status": "new"
}




# 添加人员
127.0.0.1:7001/patrol/staff/add
type 表示人员类型，mediation, guard, help, police
{
	"name": "sy",
	"type": "test",
	"sex": 1,
	"age": 20,
	"area": "11ssds",
	"period": "周一",
	"good": "优秀",
	"path": "商场",
	"case": "打架",
	"detail": "哈哈哈哈哈"
}


# 查询
staff info
127.0.0.1:7001/patrol/{}/list

{
   其他字段
   limit,
    offset,
}
