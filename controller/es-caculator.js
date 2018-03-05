var app = angular.module("ESCaculator", []);
const card_template = {id: 0, star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0};
const team_template = {
	total: 0,
	skillname: '無技能',
	skillbuff: 0, 
	members:[]
};
const colors = ['red', 'blue', 'yellow'];

var reader = new FileReader();
app.controller("CardGroup", function($scope){
	$scope.characters = [
		'南雲鐵虎', '紫之創', '真白友也', '葵日向', '高峯翠',
		'姬宮桃李', '仙石忍', '葵裕太', '天滿光', '朱櫻司','春川宙',
		'明星昴流', '冰鷹北斗', '遊木真', '神崎颯馬', '乙狩阿多尼斯','逆先夏目',
		'大神晃牙', '朔間凜月', '衣更真緒', '伏見弓弦', '鳴上嵐','影片美伽',
		'蓮巳敬人', '天祥院英智', '羽風薰', '瀨名泉', '守澤千秋','齋宮宗',
		'鬼龍紅郎', '日日樹涉', '深海奏汰', '朔間零', '仁兔成鳴', '月永雷歐','青葉紡'
	];
	$scope.redskill = [
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
	$scope.blueskill = [
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
	$scope.yellowskill = [
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
	$scope.redteams = [
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0, 
			members:[
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		},
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0,
			members:[
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		},
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0,
			members:[
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1,star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		}
	];
	$scope.blueteams = [
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0, 
			members:[
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		},
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0,
			members:[
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		},
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0,
			members:[
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		}
	];
	$scope.yellowteams = [
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0, 
			members:[
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		},
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0,
			members:[
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		},
		{
			total: 0,
			skillname: '無技能',
			skillbuff: 0,
			members:[
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0},
				{id: -1, star: 1, character: '', cardname: '', value: 0, event: false, dupe: 0}
			]
		}
	];
	$scope.cards = [
		{id: 0,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 1,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 2,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 3,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 4,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 5,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 6,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 7,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 8,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 9,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 10,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 11,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 12,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 13,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0},
		{id: 14,star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0}
	];

	$scope.teams = {'red': $scope.redteams, 'blue': $scope.blueteams, 'yellow': $scope.yellowteams};
	$scope.skill = {'red': $scope.redskill, 'blue': $scope.blueskill, 'yellow': $scope.yellowskill};
	$scope.color = 'red';
	$scope.cardcount = 15;
	$scope.groupstyle = 3;

	$scope.caculate = function(){
		var color = $scope.color;
		$scope.caculate_color($scope.teams[color], $scope.skill[color]);
	}
	$scope.caculate_color = function(teams, skill){
		for(var i=0; i<3; i++){
			caculate_total(teams[i], skill);
		}		
	}
	$scope.changecolor = function(color){
		$scope.color = color;
	}
	$scope.changecardcount = function(){
		var prevlength = $scope.cards.length;
		if($scope.cardcount == undefined || $scope.cardcount == null || $scope.cardcount < 15) $scope.cardcount = 15;
		if(prevlength == $scope.cardcount) return;
		$scope.cards.length = $scope.cardcount;
		if(prevlength < $scope.cards.length){
			for(var i=prevlength; i<$scope.cards.length; i++){
				$scope.cards[i] = {id: i, star: 1, character: '', cardname: '', red: 0, blue: 0, yellow: 0, event: false, dupe: 0};
			}
		}
	}
	$scope.autoarrange_tmp = function(){
		//to be removed
		var teams, skill;
		var cards = CopyByValue($scope.cards);
		for(var i=0; i<colors.length; i++){
			var color = colors[i];
			console.log(color);
			teams = CopyByValue($scope.teams[color]);
			skill = CopyByValue($scope.skill[color]);
			sort_cards(cards, color, 0, cards.length-1);
			//put in 15 slots and caculate min by rule
			console.log(cards);
			var index = 0;
			for(var j=0; j<3; j++){
				for(var k=0; k<5; k++){
					teams[j].members[k] = card_to_team(cards[index], color);
					index++;
				}
			}
			$scope.teams[color] = CopyByValue(teams);
			$scope.caculate_color(color, $scope.teams[color], $scope.skill[color]);
		}
	}
	$scope.autoarrangeall = function(){
		//rule: T1 max, T2 max(1.5), T3 max(2)
		var cards = CopyByValue($scope.cards);
		for(var i=0; i<colors.length; i++){
			var color = colors[i];
			$scope.arrangebycolor(cards, color);
		}
	}
	$scope.autoarrange = function(color){
		var cards = CopyByValue($scope.cards);
		$scope.arrangebycolor(cards, color);
	}
	$scope.arrangebycolor = function(cards, color){
		var teams = CopyByValue($scope.teams[color]);
		var skill = $scope.multiple_skill(color);
		sort_cards(cards, color, 0, cards.length-1);
		
		//concept: max('紅月') = (max('蓮巳敬人')+max('鬼龍紅郎')+max('神崎颯馬')+max(A)+max(B)) * 10%
		var usedcards_index = [];
		switch($scope.groupstyle){
			case 1: {
				for(var t=0; t<3; t++){
					teams[t] = arrange_one(color, cards, skill, $scope.skill[color], usedcards_index);
				}
				$scope.teams[color] = teams;
				break;
			}
			case 2: {
				var t2 = arrange_two(color, cards, skill, $scope.skill[color], usedcards_index);
				teams[0] = t2[0];
				teams[1] = t2[1];
				teams[2] = arrange_one(color, cards, skill, $scope.skill[color], usedcards_index);
				$scope.teams[color] = teams;
				break;
			}
			case 3: {
				$scope.teams[color] = arrange_three(color, cards, skill, $scope.skill[color], usedcards_index);
				break;
			}
			default: break;
		}
		return;
	}
	$scope.clear = function(){
		for(var i=0; i<$scope.cards.length; i++){
			$scope.cards[i] = CopyByValue(card_template);
			$scope.cards[i].id = i;
		}
	}
	$scope.download = function(){
		//prepare data
		var d = new Date();
		var month = (d.getMonth() + 1).toString();
		if(month.length == 1) month = "0"+month;
		var date = d.getDate().toString();
		if(date.length == 1) date = "0"+date;
		var filename = "es_cards_"+d.getFullYear()+month+date+".txt";
		var text = JSON.stringify($scope.cards);
		//create a fake element and click it
		//a(href="file" download)
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
		element.setAttribute('download', filename);
		element.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
	$scope.upload = function(){
		//open file
		if(event == undefined || event.target == undefined || event.target.files.length == 0) return;
		var file = event.target.files[0];
		var filename = file.name;
		console.log(filename);
		//parse json
		
		reader.readAsText(file);
	}
	$scope.multiple_skill = function(color){
		//prepare multiple skill
		var candidate_skills = CopyByValue($scope.skill[color]);
		var candidate_left = 0;
		var origin_candidate_length = candidate_skills.length;
		do {
			var candidates = candidate_skills.length;
			for(var j=candidates-1; j>=candidate_left; j--){
				for(var k=(j < origin_candidate_length)? j-1: origin_candidate_length-1; k>=0; k--){
					var skl = candidate_skills[j];
					var another_skl = candidate_skills[k];
					var difference = skl.members.concat(another_skl.members).dupe();
					if(difference.length != skl.members.length + another_skl.members.length && difference.length <= 5){
						var same = candidate_skills.find(function(exist_skill){
							var m = CopyByValue(exist_skill.members);
							if(m.sort().equals(difference.sort())) {
								var skillnames = exist_skill.name.split("+");
								var skl_skillnames = skl.name.split("+");
								var another_skl_skillnames = another_skl.name.split("+");
								var new_name = skl_skillnames.concat(another_skl_skillnames).dupe();
								if(new_name.length === skl_skillnames.length+another_skl_skillnames.length && new_name.length !== skillnames.length) return false;
								else return true;
							}
							else return false;
						});
						if(same === undefined){
							var head = 0;
							for(var k=0; k<difference.length; k++){
								if(skl.members.indexOf(difference[k]) > -1 && another_skl.members.indexOf(difference[k]) > -1){
									var tmp = difference[k];
									difference[k] = difference[head];
									difference[head] = tmp;
									head++;
								}
							}							
							if(difference.length === skl.members.length){
								candidate_skills.splice(j, 1);
								if(j < origin_candidate_length) origin_candidate_length--;
								if(j < candidates) candidates--;
							}
							if(difference.length === another_skl.members.length){
								candidate_skills.splice(k, 1);
								if(k < origin_candidate_length) origin_candidate_length--;
								if(k < candidates) candidates--;
							}
							candidate_skills.push({
								name: skl.name +"+"+another_skl.name,
								members: difference,
								buff: skl.buff + another_skl.buff
							});
						}
					}
				}
			}
			candidate_left = candidates;
		} while(candidate_left !== candidate_skills.length);
		return candidate_skills;
	}
	$scope.init = function(){
		console.log("init");
		reader.onload = (function(file){
			return function(event){
				var data_string = event.target.result;
				var cards;
				try {
					cards = JSON.parse(data_string);
				} catch(e){
					console.log(e);
					return;
				}
				if(cards == undefined || cards == null) return;
				//check format
				if(cards.constructor !== Array) return;
				for(var i=0; i<cards.length; i++){
					if(!CheckNaturalNum(cards[i].red) || !CheckNaturalNum(cards[i].blue) || !CheckNaturalNum(cards[i].yellow)) return;
					if(!CheckNaturalNum(cards[i].star) || cards[i].star > 5) return;
					if(!CheckNaturalNum(cards[i].dupe) || cards[i].dupe > 4) return;
					if(typeof(cards[i].character) != 'string') return;
					if(typeof(cards[i].cardname) != 'string') return;
					if(typeof(cards[i].event) != 'boolean') return;
					if(cards[i].id == null) cards[i].id = i;
				}
				while(cards.length < 15) {
					var new_card = CopyByValue(card_template);
					new_card.id = cards.length;
					cards.push(new_card);
				}
				console.log("legal");
				$scope.cards = cards;
				$scope.$apply();
			}
		})();
	}

	$scope.init();
});
app.directive('customFileChange', function(){
	return {
		restict: 'A',
		link: function (scope, element, attrs) {
			var onChangeFunc = scope.$eval(attrs.customFileChange);
			element.on("change", onChangeFunc);
		}
	};
});
app.directive('optionValue', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel){
			ngModel.$parsers.push(function(val) {
				return (val != null) ? parseInt(val, 10) : null;
			});
			ngModel.$formatters.push(function(val) {
				return (val != null) ? '' + val : null;
			});
		}
	}
})
//--------------------------------
window.onload = function(){
	$('.loading').slideUp(500);
};
$(document).ready(function(){
	$('#cardcount').keyup(function(e){
		if(e.keyCode == 13) {
			$(this).blur();
		}
	});
});
//--------------------------------
sort_cards = function(cards, color, left, right){
	if(left >= right) return;
	var pivot = cards[left][color];
	if(cards[left].event == true) pivot = cards[left][color] * (cards[left].dupe * 0.5 + 2);
	var i=left;
	var j=right+1;
	/*if(card.event === true){
		for(var i=0; i<colors.length; i++) card[colors[i]] *= (card.dupe * 0.5 + 2);
	}*/
	while(true){
		var value = 0;
		while(i+1 <= right && card_greater(cards[++i], color, pivot));
		while(j-1 >= left && card_less(cards[--j], color, pivot));
		if(i < j) {
			//swap
			var temp = cards[i];
			cards[i] = cards[j];
			cards[j] = temp;
		}
		else break;
	}
	var temp = cards[left];
	cards[left] = cards[j];
	cards[j] = temp;
	sort_cards(cards, color, left, j-1);
	sort_cards(cards, color, j+1, right);
}
card_to_team = function(card, color){
	return {id: card.id, star: card.star, character: card.character, cardname: card.cardname, value: card[color], event: card.event, dupe: card.dupe};
}
card_greater = function(card, color, pivot){
	if(card.event === true) value = card[color] * (card.dupe * 0.5 + 2);
	else value = card[color];
	return value > pivot;
}
card_less = function(card, color, pivot){
	if(card.event === true) value = card[color] * (card.dupe * 0.5 + 2);
	else value = card[color];
	return value < pivot;
}
caculate_total = function(team, skill){
	var sum = 0;
	var buffs = 0;
	var buff_name = '';
	for(var j=0; j<5; j++){
		var value = team.members[j].value;
		if(team.members[j].event === true) value *= (team.members[j].dupe * 0.5 + 2);
		sum += value;
	}
	var skls = skill.filter(function(value){
		if(value.members.indexOf(team.members[0].character) !== -1) return true;
		return false;
	});
	skls.forEach(function(value){
		var count = 1;
		for(var j=1; j<5; j++){
			if(team.members[0].character !== team.members[j].character && value.members.indexOf(team.members[j].character) !== -1){
				count++;
			}
		}
		if(count == value.members.length){
			buffs += value.buff;
			buff_name = (buff_name.length === 0)? value.name: buff_name + '+' + value.name;
		}
	});
	team.total = Math.floor(sum * (100 + buffs) / 100);
	team.skillbuff = buffs;
	team.skillname = (buff_name.length === 0)? '無技能': buff_name;
	return team.total;
}
arrange_one = function(color, cards, skill, origin_skill, usedcards_index){
	//prepare skills
	var ableteam = [];
	skill.forEach(function(value){
		//value.members, value.buff
		var skillteam = CopyByValue(team_template);
		value.members.every(function(member){
			var first_id = cards.findIndex(function(card){
				return card.character === member && usedcards_index.indexOf(card.id) === -1;
			});
			if(first_id === -1 || usedcards_index.indexOf(cards[first_id].id) !== -1) return false;
			skillteam.members.push(card_to_team(cards[first_id], color));
			//the cards may be modified but character is same
			return true;
		});
		if(skillteam.members.length === value.members.length){
			skillteam.skillname = value.name;
			skillteam.skillbuff = value.buff;
			ableteam.push(skillteam);
		}
		else; //impossible team skills
	});
	ableteam.push(CopyByValue(team_template)); //no skill team

	//fill in with max not-used members(skill members are ok becuase they'll be removed soon)
	ableteam.forEach(function(team){
		var max_id = 0;
		while(team.members.length < 5 && max_id < cards.length) {
			if(team.members.findIndex(function(member){
				return member.character == cards[max_id].character;
			}) === -1 && usedcards_index.indexOf(cards[max_id].id) === -1){
				team.members.push(card_to_team(cards[max_id], color));
			}
			else max_id++;		
		}
	});

	//caculate total and choose max one
	var max_total = -1;
	var max_team = null;
	ableteam.forEach(function(team){
		//caculate
		total = caculate_total(team, origin_skill);
		if(total > max_total){
			max_total = total;
			max_team = team;
		}
	});
	if(max_team !== null){
		for(var k=0; k<max_team.members.length; k++){
			usedcards_index.push(max_team.members[k].id);
		}
	}
	else console.log(ableteam); //too many duplicate characters
	return max_team;
}
arrange_two = function(color, cards, skill, origin_skill, usedcards_index){
	var ableteam = [];
	skill.forEach(function(value){
		//value.members, value.buff
		var skillteam = CopyByValue(team_template);
		value.members.every(function(member){
			var first_id = cards.findIndex(function(card){
				return card.character === member && usedcards_index.indexOf(card.id) === -1;
			});
			if(first_id === -1 || usedcards_index.indexOf(cards[first_id].id) !== -1) return false;
			skillteam.members.push(card_to_team(cards[first_id], color));
			//the cards may be modified but character is same
			return true;
		});
		if(skillteam.members.length === value.members.length){
			skillteam.skillname = value.name;
			skillteam.skillbuff = value.buff;
			ableteam.push(skillteam);
		}
		else; //impossible team skills
	});
	ableteam.push(CopyByValue(team_template)); //no skill team
	var ableteam2 = [];
	for(var i=0; i<ableteam.length; i++){
		for(var j=i; j<ableteam.length; j++){
			var t_group = (ableteam[i].skillbuff < ableteam[j].skillbuff)? [ableteam[j], ableteam[i]]:[ableteam[i], ableteam[j]];
			var tmp_group = CopyByValue(t_group);
			var prepare = true;
			for(var m=0; m<tmp_group[0].members.length; m++){
				var dupe_id = tmp_group[1].members.findIndex(function(member){
					return tmp_group[0].members[m].id === member.id;
				});
				if(dupe_id !== -1){
					//find another card of the character
					var second_id = cards.findIndex(function(card){
						return card.character === tmp_group[1].members[dupe_id].character && card.id !== tmp_group[1].members[dupe_id].id;
					});
					//if no, dont push (these 2 teams are impossible)
					if(second_id === -1) {
						prepare = false;
						break;
					}
					tmp_group[1].members[dupe_id] = card_to_team(cards[second_id], color);
				}
			}
			if(prepare) ableteam2.push(CopyByValue(tmp_group));
		}
	}
	ableteam2.forEach(function(team){
		//team[0], team[1]: let weaker be team[1]
		//fill in max non-skilled members
		var max_id = 0;
		while(team[0].members.length < 5 && max_id < cards.length) {
			var exist_id = team[0].members.findIndex(function(member){
				return member.character === cards[max_id].character;
			});
			var used_in_1 = team[1].members.findIndex(function(member){
				return member.id === cards[max_id].id;
			});
			if(exist_id === -1 && used_in_1 === -1){
				team[0].members.push(card_to_team(cards[max_id], color));
			}
			else max_id++;		
		}
		max_id = 0;
		while(team[1].members.length < 5 && max_id < cards.length) {
			var exist_id = team[1].members.findIndex(function(member){
				return member.character === cards[max_id].character;
			});
			var used_in_0 = team[0].members.findIndex(function(member){
				return member.id === cards[max_id].id;
			});
			if(exist_id === -1 && used_in_0 === -1){
				team[1].members.push(card_to_team(cards[max_id], color));
			}
			else max_id++;
		}
	});
	//caculate total and choose max one
	var max_total = -1;
	var max_team = null;
	ableteam2.forEach(function(team){
		var total_0 = caculate_total(team[0], origin_skill);
		var total_1 = caculate_total(team[1], origin_skill);
		var sum = total_0 + total_1;
		if(sum > max_total){
			max_total = sum;
			//swap if total[0] < total[1]
			if(total_0 < total_1){
				var tmp = team[0];
				team[0] = team[1];
				team[1] = tmp;
			}
			max_team = team;
		}
	});
	if(max_team !== null){
		for(var k=0; k<max_team[0].members.length; k++){
			usedcards_index.push(max_team[0].members[k].id);
		}
		for(var k=0; k<max_team[1].members.length; k++){
			usedcards_index.push(max_team[1].members[k].id);
		}
	}
	else console.log(ableteam2); //too many duplicate characters
	return max_team;
}
arrange_three = function(color, cards, skill, origin_skill, usedcards_index){
	//use ableteam and ableteam2 to build ableteam3
	var ableteam = [];
	skill.forEach(function(value){
		//value.members, value.buff
		var skillteam = CopyByValue(team_template);
		value.members.every(function(member){
			var first_id = cards.findIndex(function(card){
				return card.character === member && usedcards_index.indexOf(card.id) === -1;
			});
			if(first_id === -1 || usedcards_index.indexOf(cards[first_id].id) !== -1) return false;
			skillteam.members.push(card_to_team(cards[first_id], color));
			//the cards may be modified but character is same
			return true;
		});
		if(skillteam.members.length === value.members.length){
			skillteam.skillname = value.name;
			skillteam.skillbuff = value.buff;
			ableteam.push(skillteam);
		}
		else; //impossible team skills
	});
	ableteam.push(CopyByValue(team_template)); //no skill team
	var ableteam3 = []; // ableteam x ableteam x ableteam
	for(var i=0; i<ableteam.length; i++){
		for(var j=i; j<ableteam.length; j++){
			for(var k=j; k<ableteam.length; k++){
				var t_group = [];
				if(ableteam[i].skillbuff < ableteam[j].skillbuff) t_group = [ableteam[j], ableteam[i]];
				else t_group = [ableteam[i], ableteam[j]];
				if(ableteam[k].skillbuff < t_group[1].skillbuff) t_group = t_group.concat(ableteam[k]);
				else if(ableteam[k].skillbuff > t_group[0].skillbuff) t_group = [ableteam[k]].concat(t_group);
				else {
					t_group = [t_group[0], ableteam[k], t_group[1]];
				}
				var tmp_group = CopyByValue(t_group);
				var prepare = true;
				for(var m=0; m<tmp_group[0].members.length; m++){
					var dupe_id_1 = tmp_group[1].members.findIndex(function(member){
						return tmp_group[0].members[m].id === member.id;
					});
					var second_id, third_id;
					if(dupe_id_1 !== -1){
						//find another card of the character
						second_id = cards.findIndex(function(card){
							return card.character === tmp_group[1].members[dupe_id_1].character && card.id !== tmp_group[1].members[dupe_id_1].id;
						});
						//if no, dont push (these 3 teams are impossible)
						if(second_id === -1) {
							prepare = false;
							break;
						}
						tmp_group[1].members[dupe_id_1] = card_to_team(cards[second_id], color);
					}
					var dupe_id_2 = tmp_group[2].members.findIndex(function(member){
						return tmp_group[0].members[m].id === member.id;
					});
					if(dupe_id_2 !== -1){
						//find another card of the character
						third_id = cards.findIndex(function(card){
							if(card.character !== tmp_group[2].members[dupe_id_2].character) return false;
							if(card.id === tmp_group[2].members[dupe_id_2].id) return false;
							if(dupe_id_1 !== -1 && card.id === cards[second_id].id) return false;
							return true;
						});
						//if no, dont push (these 3 teams are impossible)
						if(third_id === -1) {
							prepare = false;
							break;
						}
						tmp_group[2].members[dupe_id_2] = card_to_team(cards[third_id], color);
					}
				}
				for(var m=0; m<tmp_group[1].members.length; m++){
					var third_id;
					var dupe_id_2 = tmp_group[2].members.findIndex(function(member){
						return tmp_group[1].members[m].id === member.id;
					});
					var dupe_id_0 = tmp_group[0].members.findIndex(function(member){
						return tmp_group[1].members[m].id === member.id;
					});
					if(dupe_id_2 !== -1 && dupe_id_0 === -1){
						//find another card of the character
						third_id = cards.findIndex(function(card){
							if(card.character !== tmp_group[2].members[dupe_id_2].character) return false;
							if(card.id === tmp_group[2].members[dupe_id_2].id) return false;
							return true;
						});
						//if no, dont push (these 3 teams are impossible)
						if(third_id === -1) {
							prepare = false;
							break;
						}
						tmp_group[2].members[dupe_id_2] = card_to_team(cards[third_id], color);
					}
				}
				if(prepare) {
					ableteam3.push(CopyByValue(tmp_group));
				}
			}
		}
	}
	//===============
	ableteam3.forEach(function(team){
		//team[0], team[1]: let weaker be team[1]
		//fill in max non-skilled members
		var max_id = 0;
		while(team[0].members.length < 5 && max_id < cards.length) {
			var exist_id = team[0].members.findIndex(function(member){
				return member.character === cards[max_id].character;
			});
			var used_in_1 = team[1].members.findIndex(function(member){
				return member.id === cards[max_id].id;
			});
			var used_in_2 = team[2].members.findIndex(function(member){
				return member.id === cards[max_id].id;
			});
			if(exist_id === -1 && used_in_1 === -1 && used_in_2 === -1){
				team[0].members.push(card_to_team(cards[max_id], color));
			}
			else max_id++;		
		}
		max_id = 0;
		while(team[1].members.length < 5 && max_id < cards.length) {
			var exist_id = team[1].members.findIndex(function(member){
				return member.character === cards[max_id].character;
			});
			var used_in_0 = team[0].members.findIndex(function(member){
				return member.id === cards[max_id].id;
			});
			var used_in_2 = team[2].members.findIndex(function(member){
				return member.id === cards[max_id].id;
			});
			if(exist_id === -1 && used_in_0 === -1 && used_in_2 === -1){
				team[1].members.push(card_to_team(cards[max_id], color));
			}
			else max_id++;
		}
		max_id = 0;
		while(team[2].members.length < 5 && max_id < cards.length) {
			var exist_id = team[2].members.findIndex(function(member){
				return member.character === cards[max_id].character;
			});
			var used_in_0 = team[0].members.findIndex(function(member){
				return member.id === cards[max_id].id;
			});
			var used_in_1 = team[1].members.findIndex(function(member){
				return member.id === cards[max_id].id;
			});
			if(exist_id === -1 && used_in_0 === -1 && used_in_1 === -1){
				team[2].members.push(card_to_team(cards[max_id], color));
			}
			else max_id++;
		}
	});
	//caculate total and choose max one
	var max_total = -1;
	var max_team = null;
	ableteam3.forEach(function(team){
		var total_0 = caculate_total(team[0], origin_skill);
		var total_1 = caculate_total(team[1], origin_skill);
		var total_2 = caculate_total(team[2], origin_skill);
		var sum = total_0 + total_1 + total_2;
		if(sum > max_total){
			max_total = sum;
			//sort for total values
			if(total_0 < total_1){
				if(total_1 < total_2) team = [team[2], team[1], team[0]];
				else if(total_2 < total_0) team = [team[1], team[0], team[2]];
				else team = [team[1], team[2], team[0]];
			}
			else{ // 1 < 0
				if(total_0 < total_2) team = [team[2], team[0], team[1]];
				else if(total_2 < total_1);
				else team = [team[0], team[2], team[1]];
			}
			max_team = team;
		}
	});
	if(max_team !== null){
		for(var k=0; k<max_team[0].members.length; k++){
			usedcards_index.push(max_team[0].members[k].id);
		}
		for(var k=0; k<max_team[1].members.length; k++){
			usedcards_index.push(max_team[1].members[k].id);
		}
		for(var k=0; k<max_team[2].members.length; k++){
			usedcards_index.push(max_team[2].members[k].id);
		}
	}
	else console.log(ableteam3); //too many duplicate characters
	return max_team;
}
//--------------------------------
saveTextAsFile = function( _fileName, _text ) {
    var textFileAsBlob = new Blob([_text], {type:'text/plain'});
 
    var downloadLink = document.createElement("a");
    downloadLink.download = _fileName;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
 
    downloadLink.click();
} 
destroyClickedElement = function(event) {
    document.body.removeChild(event.target);
}
//--------------------------------
function CheckNaturalNum(input){
	if(input == undefined) return false;
	if(Number.isInteger(input) && input > -1) return true;
	return false;
}
function CopyByValue(object){
	return JSON.parse(JSON.stringify(object));
}
Array.prototype.dupe = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j, 1);
        }
    } 
    return a;
};
Array.prototype.equals = function(array) {
    if(!array) return false;
    if(this.length != array.length) return false;
    for(var i=0; i<this.length; i++){
    	//TODO: check nested arrays
    	if(array[i] instanceof Array && this[i] instanceof Array){
    		return this[i].equals(array[i]);
    	}
    	if(array[i] !== this[i]) return false;
    }
    return true;
};