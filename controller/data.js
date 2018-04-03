const characters = [
	'南雲鐵虎', '紫之創', '真白友也', '葵日向', '高峯翠',
	'姬宮桃李', '仙石忍', '葵裕太', '天滿光', '朱櫻司','春川宙',
	'明星昴流', '冰鷹北斗', '遊木真', '神崎颯馬', '乙狩阿多尼斯','逆先夏目',
	'大神晃牙', '朔間凜月', '衣更真緒', '伏見弓弦', '鳴上嵐','影片美伽',
	'蓮巳敬人', '天祥院英智', '羽風薰', '瀨名泉', '守澤千秋','齋宮宗',
	'鬼龍紅郎', '日日樹涉', '深海奏汰', '朔間零', '仁兔成鳴', '月永雷歐','青葉紡'
];
const redskill = [
	{
		name: 'TrickStar',
		buff: 13,
		members: ['明星昴流','冰鷹北斗','衣更真緒','遊木真']
	},
	{
		name: 'UNDEAD',
		buff: 13,
		members: ['大神晃牙','朔間零','乙狩阿多尼斯','羽風薰']
	},
	{
		name: '輕音部',
		buff: 13,
		members: ['大神晃牙','朔間零','葵日向','葵裕太']
	},
	{
		name: '弓道部',
		buff: 13,
		members: ['蓮巳敬人','伏見弓弦','朱櫻司','月永雷歐']
	},
	{
		name: '紅月',
		buff: 10,
		members: ['蓮巳敬人','鬼龍紅郎','神崎颯馬']
	},
	{
		name: '廣播委員會',
		buff: 10,
		members: ['仁兔成鳴','仙石忍','遊木真']
	},
	{
		name: '名門子弟',
		buff: 10,
		members: ['天祥院英智','朱櫻司','姬宮桃李']
	},
	{
		name: '模特經驗者',
		buff: 10,
		members: ['遊木真','瀨名泉','鳴上嵐']
	},
	{
		name: '空手道部',
		buff: 5,
		members: ['南雲鐵虎','鬼龍紅郎']
	},
	{
		name: '最愛妹妹',
		buff: 5,
		members: ['月永雷歐','鬼龍紅郎']
	},
	{
		name: 'Switch',
		buff: 10,
		members: ['逆先夏目','春川宙','青葉紡']
	}
];
const blueskill = [
	{
		name: '流星隊',
		buff: 18,
		members: ['守澤千秋','深海奏汰','仙石忍','南雲鐵虎','高峯翠']
	},
	{
		name: '學生會',
		buff: 13,
		members: ['天祥院英智','蓮巳敬人','衣更真緒','姬宮桃李']
	},
	{
		name: 'Rabbits',
		buff: 13,
		members: ['仁兔成鳴','天滿光','紫之創','真白友也']
	},
	{
		name: '陸上部',
		buff: 10,
		members: ['乙狩阿多尼斯','鳴上嵐','天滿光']
	},
	{
		name: '2wink',
		buff: 5,
		members: ['葵日向','葵裕太']
	},				
	{
		name: '手工藝部',
		buff: 10,
		members: ['齋宮宗','影片美伽','青葉紡']
	},
	{
		name: '花粉症',
		buff: 5,
		members: ['大神晃牙','衣更真緒']
	},
	{
		name: '籃球部',
		buff: 13,
		members: ['守澤千秋','明星昴流','衣更真緒','高峯翠']
	},
	{
		name: '智慧眼鏡',
		buff: 10,
		members: ['蓮巳敬人','遊木真','青葉紡']
	},
	{
		name: '紅茶部',
		buff: 10,
		members: ['紫之創','天祥院英智','朔間凜月']
	},
	{
		name: '朔間兄弟',
		buff: 5,
		members: ['朔間零','朔間凜月']
	},
	{
		name: '圖書委員',
		buff: 2,
		members: ['青葉紡']
	}
];
const yellowskill = [
	{
		name: 'Knights',
		buff: 18,
		members: ['月永雷歐','瀨名泉','朔間凜月','鳴上嵐','朱櫻司']
	},
	{
		name: '三奇人',
		buff: 10,
		members: ['朔間零','深海奏汰','日日樹涉']
	},
	{
		name: '海洋生物部',
		buff: 10,
		members: ['深海奏汰','羽風薰','神崎颯馬']
	},
	{
		name: '演劇部',
		buff: 10,
		members: ['日日樹涉','冰鷹北斗','真白友也']
	},
	{
		name: '網球部',
		buff: 13,
		members: ['仁兔成鳴','瀨名泉','姬宮桃李','遊木真']
	},
	{
		name: 'fine',
		buff: 13,
		members: ['日日樹涉','天祥院英智','伏見弓弦','姬宮桃李']
	},
	{
		name: '左撇子',
		buff: 10,
		members: ['天祥院英智','朔間凜月','葵裕太']
	},
	{
		name: '擅長縫紉',
		buff: 13,
		members: ['鬼龍紅郎','紫之創','齋宮宗','青葉紡']
	},
	{
		name: 'Valkyrie',
		buff: 5,
		members: ['齋宮宗','影片美伽']
	},
	{
		name: '遊戲研究部',
		buff: 5,
		members: ['逆先夏目','春川宙']
	},
	{
		name: '忍者同好會',
		buff: 2,
		members: ['仙石忍']
	}
];
const activeskill = [
	{
		name: 'FruitsParlor',
		buff: 13,
		members: ['朱櫻司','天滿光','葵裕太','鳴上嵐'],
		color: 'yellow',
		describe: 'FruitsParlor 黃+13% '+'[ 朱櫻司 + '+'天滿光 + '+'葵裕太 + '+'鳴上嵐 ]'
	}
];
module.exports = {
	characters,
	redskill,
	blueskill,
	yellowskill,
	activeskill
};