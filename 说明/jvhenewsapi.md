AppKey：a81f80231237461e168c2e3f7e1a735d

新闻列表查询
接口地址：
http://v.juhe.cn/toutiao/index
请求方式：get/post
返回类型：json
接口描述：返回头条(推荐)、国内，娱乐，体育，军事，科技，财经，时尚等新闻信息; 数据来源网络整理;
接口调试： API测试工具
请求header
名称	值
Content-Type:	application/x-www-form-urlencoded


请求参数
名称	必填	类型	说明
key	是	string	接口key, 在个人中心->我的数据,接口名称上方查看
type	否	string	支持类型
top(推荐,默认)
guonei(国内)
guoji(国际)
yule(娱乐)
tiyu(体育)
junshi(军事)
keji(科技)
caijing(财经)
youxi(游戏)
qiche(汽车)
jiankang(健康)
page	否	int	当前页数, 默认1, 最大50
page_size	否	int	每页返回条数, 默认30 , 最大30
is_filter	否	int	是否只返回有内容详情的新闻, 1:是, 默认0
返回参数
名称	类型	说明
error_code	int	返回码
reason	string	返回说明
result	obj	返回结果集
data	array	新闻列表, 无数据时为null
uniquekey	string	新闻ID
title	string	新闻标题
date	string	新闻时间
category	string	新闻分类
author_name	string	新闻来源
url	string	新闻访问链接
thumbnail_pic_s	string	新闻图片链接
is_content	string	是否有新闻内容,1表示有 可以通过查询新闻详细内容小接口获取新闻内容


{
    "reason": "success",
    "result": {
        "stat": "1",
        "data": [
            {
                "uniquekey": "db61b977d9fabd0429c6d0c671aeb30e",
                "title": "“新时代女性的自我关爱”主题沙龙暨双山街道福泰社区妇儿活动家园启动仪式举行",
                "date": "2021-03-08 13:47:00",
                "category": "头条",
                "author_name": "鲁网",
                "url": "https://mini.eastday.com/mobile/210308134708834241845.html",
                "thumbnail_pic_s": "https://dfzximg02.dftoutiao.com/news/20210308/20210308134708_d0216565f1d6fe1abdfa03efb4f3e23c_0_mwpm_03201609.png",
                "thumbnail_pic_s02": "https://dfzximg02.dftoutiao.com/news/20210308/20210308134708_d0216565f1d6fe1abdfa03efb4f3e23c_1_mwpm_03201609.png",
                "thumbnail_pic_s03": "https://dfzximg02.dftoutiao.com/news/20210308/20210308134708_d0216565f1d6fe1abdfa03efb4f3e23c_2_mwpm_03201609.png",
                "is_content": "1"
            },
            {
                "uniquekey": "7d246cbfa9000fb5ac42fb3bb934a592",
                "title": "滴滴发布女司机数据：2020年新增女性网约车司机超26万",
                "date": "2021-03-08 13:40:00",
                "category": "头条",
                "author_name": "国青年网",
                "url": "https://mini.eastday.com/mobile/210308134023641877777.html",
                "thumbnail_pic_s": "https://dfzximg02.dftoutiao.com/news/20210308/20210308134023_7a9ca0543b00332147c42e1ee4146908_0_mwpm_03201609.png",
                "thumbnail_pic_s02": "https://dfzximg02.dftoutiao.com/news/20210308/20210308134023_7a9ca0543b00332147c42e1ee4146908_1_mwpm_03201609.jpeg",
                "is_content": "1"
            },
            {
                "uniquekey": "c0611bea6eb961a57b21a0d1008bbe2e",
                "title": "点赞！东海县公安局学雷锋见行动",
                "date": "2021-03-08 13:38:00",
                "category": "头条",
                "author_name": "江南时报",
                "url": "https://mini.eastday.com/mobile/210308133849892734209.html",
                "thumbnail_pic_s": "https://dfzximg02.dftoutiao.com/news/20210308/20210308133849_b9f3d069a1ab400bf2d87fcc15793ca5_1_mwpm_03201609.png",
                "thumbnail_pic_s02": "https://dfzximg02.dftoutiao.com/news/20210308/20210308133849_b9f3d069a1ab400bf2d87fcc15793ca5_2_mwpm_03201609.png",
                "thumbnail_pic_s03": "https://dfzximg02.dftoutiao.com/news/20210308/20210308133849_b9f3d069a1ab400bf2d87fcc15793ca5_3_mwpm_03201609.png",
                "is_content": "1"
            }
        ],
        "page": "1",
        "pageSize": "3"
    },
    "error_code": 0
}

服务级错误码参照(error_code)：
错误码	说明
223501	新闻uniquekey格式错误
223502	暂查询不到相关新闻详情
系统级错误码参照：
错误码	说明	旧版本
10001	错误的请求KEY	101
10002	该KEY无请求权限	102
10003	KEY过期	103
10004	错误的OPENID	104
10005	应用未审核超时，请提交认证	105
10007	未知的请求源	107
10008	被禁止的IP	108
10009	被禁止的KEY	109
10011	当前IP请求超过限制	111
10012	请求超过次数限制	112
10013	测试KEY超过请求限制	113
10014	系统内部异常(调用充值类业务时，请务必联系客服或通过订单查询接口检测订单，避免造成损失)	114
10020	接口维护	120
10021	接口停用	121

示例
package cn.juhe.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class JavaGet {
    public static void main(String[] args) throws Exception {
        String apiKey = "a81f80231237461e168c2e3f7e1a735d";
        String apiUrl = "http://v.juhe.cn/toutiao/index";

        HashMap<String, String> map = new HashMap<>();
        map.put("key", apiKey);
        map.put("type", "");
        map.put("page", "");
        map.put("page_size", "");
        map.put("is_filter", "");

        URL url = new URL(String.format("%s?%s", apiUrl, params(map)));
        BufferedReader in = new BufferedReader(new InputStreamReader((url.openConnection()).getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println(response);
    }

    public static String params(Map<String, String> map) {
        return map.entrySet().stream()
                .map(entry -> {
                    try {
                        return entry.getKey() + "=" + URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString());
                    } catch (Exception e) {
                        e.printStackTrace();
                        return entry.getKey() + "=" + entry.getValue();
                    }
                })
                .collect(Collectors.joining("&"));
    }
}