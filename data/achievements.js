// 成就类型说明：
// type: 1 - 完成成就的次数统计
// type: 2 - 成就分数统计
// type: 3 - 首次使用特定功能后解锁成就，value为功能标识符
// type: 4 - 在特定时间段内完成测试解锁成就，value为时间范围，格式为"开始时间,结束时间"

const achievements = [
  {
      num: 1,
      type: 1,//完成成就的次数
      id: "test1",
      category: "testman",
      title: "初次见面",
      description: "首次完成任意性格测试",
      value: 1,
      icon: "images/achievements/钓鱼 (1).png",
      score: 10,
      weight: 3,
      detailed:'占位文字11111111111111111111111111111111111111111111111111111111'
  },
  {
      num: 2,
      type: 1,
      id: "test2",
      category: "testman",
      title: "测试达人",
      description: "完成5个任意测试",
      value: 5,
      icon: "images/achievements/Sport-Fishing (1).png",
      score: 15,
      weight: 2,
      detailed:'占位文字1111111112222222222222222222111111111111111111111'
  },
  {
      num: 3,
      type: 2,//成就分数统计
      id: "test3",
      category: "persion",
      title: "初出茅庐",
      description: "累计获得15成就分数",
      value: 15,
      icon: "images/achievements/路亚轮 (1).png",
      score: 20,
      weight: 4,
      detailed:'占位文字111111111333333333333333333311111111111111111111111111111'
  },
  {
      num: 4,
      type: 1,
      id: "test4",
      category: "testman",
      title: "测试专家",
      description: "完成10个任意测试",
      value: 10,
      icon: "images/achievements/钓鱼 (1).png",
      score: 25,
      weight: 3,
      detailed:'占位文字111111444444444444441111114441111111111'
  },
  {
      num: 5,
      type: 1,
      id: "test5",
      category: "testman",
      title: "测试大师",
      description: "完成20个任意测试",
      value: 20,
      icon: "images/achievements/Sport-Fishing (1).png",
      score: 35,
      weight: 4,
      detailed:'占位文字111111111155555555555555555555555555555555'
  },
  {
      num: 6,
      type: 2,
      id: "score1",
      category: "persion",
      title: "小有成就",
      description: "累计获得50成就分数",
      value: 50,
      icon: "images/achievements/路亚轮 (1).png",
      score: 30,
      weight: 3,
      detailed:'占位文字1111111111166666666666666666611111111111111'
  },
  {
      num: 7,
      type: 2,
      id: "score2",
      category: "persion",
      title: "成就斐然",
      description: "累计获得100成就分数",
      value: 100,
      icon: "images/achievements/钓鱼 (1).png",
      score: 40,
      weight: 4,
      detailed:'占位文字11111111111111111777777777777777777777111111111111111111111'
  },
  {
      num: 8,
      type: 1,
      id: "fishing1",
      category: "fishing",
      title: "初次垂钓",
      description: "首次完成钓鱼活动",
      value: 1,
      icon: "images/achievements/钓鱼 (1).png",
      score: 15,
      weight: 2,
      detailed:'占位文字111111111111888888888888888888888888'
  },
  {
      num: 9,
      type: 1,
      id: "fishing2",
      category: "fishing",
      title: "钓鱼爱好者",
      description: "完成5次钓鱼活动",
      value: 5,
      icon: "images/achievements/Sport-Fishing (1).png",
      score: 25,
      weight: 3,
      detailed:'占位文字99999999999999999999999999999999'
  },
  {
      num: 10,
      type: 1,
      id: "fishing3",
      category: "fishing",
      title: "钓鱼大师",
      description: "完成15次钓鱼活动",
      value: 15,
      icon: "images/achievements/路亚轮 (1).png",
      score: 35,
      weight: 4,
      detailed:'占位文字0000000000000000000000000000'
  },
  {
      num: 11,
      type: 3,
      id: "firsttime",
      category: "persion",
      title: "天气爱好者",
      description: "首次使用查看天气",
      value: 'checkWeather',
      icon: "images/achievements/路亚轮 (1).png",
      score: 35,
      weight: 4,
      detailed:'占位文字001十一十一00'
  },
  {
      num: 12,
      type: 4,
      id: "nightowl",
      category: "fishing",
      title: "夜钓幽灵",
      description: "在凌晨0-5点完成任意测试题",
      value:[[0],[5]],
      icon: "images/achievements/路亚轮 (1).png",
      score: 35,
      weight: 4,
      detailed:'占位文字001十2十200'
  },
];

module.exports = {
  achievements
};