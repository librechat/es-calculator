var util = require('./util.js');
var data = require('./data.js');
var jq = require('./custom_jquery.js');
var calculator = require('./calculator.js');
util.ExtendArray();

var app = angular.module("ESCalculator", []);
var reader = new FileReader();
app.controller("CardGroup", ["$scope", function($scope){
	$scope.characters = [];
	$scope.redskill = [];
	$scope.blueskill = [];
	$scope.yellowskill = [];
	$scope.redteams = [];
	$scope.blueteams = [];
	$scope.yellowteams = [];
	$scope.cards = [];

	$scope.teams = {'red': $scope.redteams, 'blue': $scope.blueteams, 'yellow': $scope.yellowteams};
	$scope.skill = {};
	$scope.color = 'gray';
	$scope.cardcount = 15;
	$scope.groupstyle = 3;
	$scope.warning_msg = "";
	
	$scope.activeskill = {
		skillname: "卡池技能",
		skillbuff: 0,
		members: []
	};

	$scope.init = function(){
		//console.log("init");
		console.log("INITTTT");
		console.log($scope.color);
		reader.onload = (function(file){
			return function(event){
				var data_string = event.target.result;
				var cards;
				try {
					cards = JSON.parse(data_string);
				} catch(e){
					console.log(e);
					jq.toggle_alert($scope, false, util.Const.warning.illegal_cardfile);
					return;
				}
				var illegal = util.IsLegal(cards, $scope.characters);
				console.log(illegal);
				jq.toggle_alert($scope, illegal === null, illegal);			
				if(illegal !== null) {
					$scope.$apply();
					return;
				}

				var timestamp = new Date().getTime();
				var cnt = 0;
				for(var i=0; i<cards.length; i++){
					if(cards[i].id == null) {
						cards[i].id = timestamp + cnt;
						cnt++;
					}
				}
				$scope.cards = cards;
				$scope.cardcount = cards.length;
				$scope.$apply();
			}
		})();
		//load json basic data;
		var card = util.CopyByValue(util.Const.card_template);
		card.id = 0;
		$scope.cards.push(card);

		for(var i=0; i<3; i++){
			var color = util.Const.colors[i];
			for(var j=0; j<3; j++){
				var team = util.CopyByValue(util.Const.team_template);
				for(var k=0; k<5; k++){
					var member = util.CopyByValue(util.Const.member_template);
					team.members.push(member);
				}
				$scope.teams[color].push(team);
			}
		}
		$scope.cardcount = $scope.cards.length;
		$scope.characters = data.characters;
		$scope.redskill = data.redskill;
		$scope.blueskill = data.blueskill;
		$scope.yellowskill = data.yellowskill;
		$scope.activeskill = {
			members
		};
		$scope.skill = {'red': $scope.redskill, 'blue': $scope.blueskill, 'yellow': $scope.yellowskill};
	}

	$scope.calculate = function(){
		var color = $scope.color;
		$scope.calculate_color($scope.teams[color], $scope.skill[color]);
	}
	$scope.calculate_color = function(teams, skill){
		for(var i=0; i<3; i++){
			calculator.calculate_total(teams[i], skill);
		}
	}
	$scope.changecolor = function(color){
		$scope.color = color;
	}
	$scope.changecardcount = function(){
		var prevlength = $scope.cards.length;
		if($scope.cardcount == undefined || $scope.cardcount == null || $scope.cardcount < 1) $scope.cardcount = 1;
		if(prevlength == $scope.cardcount) return;
		$scope.cards.length = $scope.cardcount;
		var timestamp = new Date().getTime();
		var cnt = 0;
		if(prevlength < $scope.cards.length){
			for(var i=prevlength; i<$scope.cards.length; i++){
				$scope.cards[i] = util.CopyByValue(util.Const.card_template);
				$scope.cards[i].id = timestamp+cnt;
				cnt++;
			}
		}
	}
	$scope.autoarrangeall = function(){
		var arrange_msg = util.Arrangeable($scope.cards, $scope.characters);
		jq.toggle_alert($scope, arrange_msg === null, arrange_msg);
		if(arrange_msg !== null) {
			return;
		}
		var cards = util.CopyByValue($scope.cards);
		for(var i=0; i<util.Const.colors.length; i++){
			var color = util.Const.colors[i];
			$scope.arrangebycolor(cards, color);
		}
	}
	$scope.arrangebycolor = function(cards, color){
		var teams = util.CopyByValue($scope.teams[color]);
		var candidate_skills = util.CopyByValue($scope.skill[color]);
		var skill = calculator.multiple_skill(color, candidate_skills);
		calculator.sort_cards(cards, color, 0, cards.length-1);
		//concept: max('skill') = (sum(skill_members)+sum(others)) * (100+buff)%
		var usedcards_index = [];
		switch($scope.groupstyle){
			case 1: {
				for(var t=0; t<3; t++){
					teams[t] = calculator.arrange_one(color, cards, skill, $scope.skill[color], usedcards_index);
				}
				$scope.teams[color] = teams;
				break;
			}
			case 2: {
				var t2 = calculator.arrange_two(color, cards, skill, $scope.skill[color], usedcards_index);
				teams[0] = t2[0];
				teams[1] = t2[1];
				teams[2] = calculator.arrange_one(color, cards, skill, $scope.skill[color], usedcards_index);
				$scope.teams[color] = teams;
				break;
			}
			case 3: {
				$scope.teams[color] = calculator.arrange_three(color, cards, skill, $scope.skill[color], usedcards_index,
					(totals, max_values) => {
						var sum = totals[0]+totals[1]+totals[2];
						var max_total = max_values[0]+max_values[1]+max_values[2];
						if(sum === max_total) {
							var sum_2 = totals[0]+totals[1];
							var max_2 = max_values[0]+max_values[1];
							if(sum_2 === max_2) return totals[0] > max_values[0];
							else return sum_2 > max_2;
						}
						else return sum > max_total;
					}
				);
				break;
			}
			case 4: case 5: case 6:{
				//smart arrange: big, postbig, emer
				//check if can cross the level!
				var level =
					($scope.groupstyle === 4)? util.Const.level_big:
					($scope.groupstyle === 5)? util.Const.level_postbig: util.Const.level_emer;
				console.log(level.length);
				$scope.teams[color] = calculator.arrange_three(color, cards, skill, $scope.skill[color], usedcards_index,
					(totals, max_values) => {
						var sum_1 = totals[0];
						var max_1 = max_values[0];
						var sum_2 = Math.floor((totals[0]+totals[1]) * 1.5);
						var max_2 = Math.floor((max_values[0]+max_values[1]) * 1.5);
						var sum_3 = (totals[0]+totals[1]+totals[2]) * 2;
						var max_3 = (max_values[0]+max_values[1]+max_values[2]) * 2;

						var max_1_id = level.findIndex((element) => { return element > max_1; });
						max_1_id = (max_1_id < 0)? level.length: max_1_id;
						var max_2_id = level.findIndex((element) => { return element > max_2; });
						max_2_id = (max_2_id < 0)? level.length: max_2_id;						
						var max_3_id = level.findIndex((element) => { return element > max_3; });
						max_3_id = (max_3_id < 0)? level.length: max_3_id;

						var sum_1_id = level.findIndex((element) => { return element > sum_1; });
						sum_1_id = (sum_1_id < 0)? level.length: sum_1_id;
						var sum_2_id = level.findIndex((element) => { return element > sum_2; });
						sum_2_id = (sum_2_id < 0)? level.length: sum_2_id;						
						var sum_3_id = level.findIndex((element) => { return element > sum_3; });
						sum_3_id = (sum_3_id < 0)? level.length: sum_3_id;

						console.log(sum_1 + "+"+ sum_2+"+"+sum_3);
						
						if(sum_3_id === max_3_id){
							if(sum_2_id === max_2_id){
								if(sum_1_id === max_1_id) {
									if(sum_3_id < level.length && sum_3 !== max_3) return sum_3 > max_3;
									else if(sum_2_id < level.length && sum_2 !== max_2) {
										return sum_2 > max_2;
									}
									else return sum_1 > max_1;
								}
								else return sum_1_id > max_1_id;
							}
							else return sum_2_id > max_2_id;
						}
						else return sum_3_id > max_3_id;
					}
				);
				break;
			}
			default: break;
		}
		return;
	}
	$scope.clear = function(){
		$scope.cardcount = 1;
		$scope.cards.length = 1;
		$scope.cards[0] = util.CopyByValue(util.Const.card_template);
		$scope.cards[0].id = new Date().getTime();
		
		var file_input = angular.element(document.getElementsByName('cardfile')[0]);
		file_input.val(null);
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
		reader.readAsText(file);
	}

	$scope.addcard = function(copyindex, new_one){
		var timestamp = new Date().getTime();
		var card;
		console.log(new_one);
		if(new_one) card = util.CopyByValue(util.Const.card_template);
		else card = util.CopyByValue($scope.cards[copyindex]);
		card.id = timestamp;
		console.log(card);
		$scope.cards.splice(copyindex + 1, 0, card);
	}
	$scope.removecard = function(cardindex){
		if($scope.cards.length == 1) {
			var id = $scope.cards[0].id;
			$scope.cards[0] = util.CopyByValue(util.Const.card_template);
			$scope.cards[0].id = id;
		}
		else $scope.cards.splice(cardindex, 1);
	}
	$scope.$watch('cards', function(){
		var arrange_msg = util.Arrangeable($scope.cards, $scope.characters);		
		jq.toggle_alert($scope, arrange_msg === null, arrange_msg);
		$scope.cardcount = $scope.cards.length;
	}, true);

	$scope.init();
}]);
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
});
app.filter('floor', function() {
    return function(input) {
        return Math.floor(input);
    };
});
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