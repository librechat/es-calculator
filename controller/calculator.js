var util = require('./util.js');
util.ExtendArray();

sort_cards = function(cards, color, left, right){
	if(left >= right) return;
	var pivot = cards[left][color];
	if(cards[left].event == true) pivot = cards[left][color] * (cards[left].dupe * 0.5 + 2);
	var i=left;
	var j=right+1;
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
calculate_total = function(team, skill){
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
		var skillteam = util.CopyByValue(util.Const.team_template);
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
	ableteam.push(util.CopyByValue(util.Const.team_template)); //no skill team

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

	//calculate total and choose max one
	var max_total = -1;
	var max_team = null;
	ableteam.forEach(function(team){
		//calculate
		total = calculate_total(team, origin_skill);
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
		var skillteam = util.CopyByValue(util.Const.team_template);
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
	ableteam.push(util.CopyByValue(util.Const.team_template)); //no skill team
	var ableteam2 = [];
	for(var i=0; i<ableteam.length; i++){
		for(var j=i; j<ableteam.length; j++){
			var t_group = (ableteam[i].skillbuff < ableteam[j].skillbuff)? [ableteam[j], ableteam[i]]:[ableteam[i], ableteam[j]];
			var tmp_group = util.CopyByValue(t_group);
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
			if(prepare) ableteam2.push(util.CopyByValue(tmp_group));
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
	//calculate total and choose max one
	var max_total = -1;
	var max_team = null;
	ableteam2.forEach(function(team){
		var total_0 = calculate_total(team[0], origin_skill);
		var total_1 = calculate_total(team[1], origin_skill);
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
arrange_three = function(color, cards, skill, origin_skill, usedcards_index, evaluation){
	//use ableteam and ableteam2 to build ableteam3
	var ableteam = [];
	skill.forEach(function(value){
		//value.members, value.buff
		var skillteam = util.CopyByValue(util.Const.team_template);
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
	ableteam.push(util.CopyByValue(util.Const.team_template)); //no skill team
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
				var tmp_group = util.CopyByValue(t_group);
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
					ableteam3.push(util.CopyByValue(tmp_group));
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
	//calculate total and choose max one
	var max_total = -1;
	var max_team = null;
	var max_values = [-1,-1,-1];
	var totals = [-1,-1,-1];
	ableteam3.forEach(function(team){
		totals[0] = calculate_total(team[0], origin_skill);
		totals[1] = calculate_total(team[1], origin_skill);
		totals[2] = calculate_total(team[2], origin_skill);
		//sort for total values
		if(totals[0] < totals[1]){
			if(totals[1] < totals[2]) {
				team = [team[2], team[1], team[0]];
				totals = [totals[2], totals[1], totals[0]];
			}
			else if(totals[2] < totals[0]) {
				team = [team[1], team[0], team[2]];
				totals = [totals[1], totals[0], totals[2]];
			}
			else {
				team = [team[1], team[2], team[0]];
				totals = [totals[1], totals[2], totals[0]];
			}
		}
		else{ // 1 < 0
			if(totals[0] < totals[2]) {
				team = [team[2], team[0], team[1]];
				totals = [totals[2], totals[0], totals[1]];
			}
			else if(totals[2] < totals[1]);
			else {
				team = [team[0], team[2], team[1]];
				totals = [totals[0], totals[2], totals[1]];
			}
		}
		if(evaluation(totals, max_values)){
			for(var i=0; i<3; i++) max_values[i] = totals[i];
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
multiple_skill = function(color, candidate_skills){
	//prepare multiple skill
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
						var m = util.CopyByValue(exist_skill.members);
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
module.exports = {
	sort_cards,
	calculate_total,
	arrange_one,
	arrange_two,
	arrange_three,
	multiple_skill
};
