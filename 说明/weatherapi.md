用户ID:22kgiu1742368605395gQ0mgBTQLl
ColaKey:Nl38NONMSfcZnN1742368605395v91mURwnM1

实时天气(预报)API
一款帮助你获取实时天气和天气预报的API接口

#二、使用步骤
#1、接口
重要提示:建议使用https协议,当https协议无法使用时再尝试使用http协议

请求方式: POST

https://luckycola.com.cn/weather/getWeather
#2、请求参数
序号	参数	是否必须	说明
1	adcode	是	地区编码,获取请参考相:获取地区编码接口文档
2	appKey	是	唯一验证AppKey, 可前往官网“个人中心“获取(http(s): //luckycola.com.cn (opens new window)), 下面具体介绍获取方法
3	uid	是	账号等唯一标识, 可前往官网“个人中心“获取(http(s): //luckycola.com.cn (opens new window)), 下面具体介绍获取方法
4	weatherType	否	需要获取的天气数据类型,可取值“base”(实时天气数据)、和“all”(预报天气数据)
注意!!!: 如果您还没有appKey和uid,请先请前往官网获取 官网地址:http(s): //luckycola.com.cn/(opens new window)

#3、请求参数示例
{	// 城市地区编码,查询请参考文档:
    "adcode": 110114,
    // 唯一验证key,下面介绍如何获取
    "appKey": "643d*******a45",
    //用户唯一id,前往官网“个人中心获取”
    "uid": "cVL******59",
    // 需要获取的天气数据类型 可以取值“base”和“all“,base表示获取实时天气数据,all表示获取预报天气数据
    "weatherType": "base"
}
#4、接口 返回示例
{
	"code": 0,
	"msg": "天气获取成功",
	"data": {
		// 天气数据类型
		"type": "实时天气",
		// 实时天气数据
		"lives": [
			{
				"province": "北京",
				"city": "昌平区",
				"adcode": "110114",
				"weather": "晴",
				"temperature": "0",
				"winddirection": "西",
				"windpower": "≤3",
				"humidity": "22",
				"reporttime": "2023-11-29 18:10:17",
				"temperature_float": "0.0",
				"humidity_float": "22.0"
			}
		],
		// 预报天气数据
		"forecasts": [...],
	}
}
#5、智能生成API代码
如果您是小白或者不熟悉的编程爱好者,您可以使用AiRestful帮助您智能生成API使用的代码示例:

<开始体验>:智能生成API代码(opens new window)

#三、 如何获取appKey和uid
#1、申请appKey:
登录Luckycola官网(http(s): //luckycola.com.cn (opens new window)),进入“[个人中心]“,即可进行申请 在这里插入图片描述

#2、获取appKey和uid
AppKey申请通过后,登录Luckycola官网(http(s): //luckycola.com.cn (opens new window)),进入“[个人中心]“即可获取 在这里插入图片描述

#四、重要说明
重要提示: 您的AppKey和uid是重要信息,请务必妥善保存,避免泄漏!

重要提示: 您的AppKey和uid是重要信息,请务必妥善保存,避免泄漏!

重要提示: 您的AppKey和uid是重要信息,请务必妥善保存,避免泄漏!