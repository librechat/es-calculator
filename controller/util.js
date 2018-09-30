const card_template = {
    id: 0, 
    star: 1, 
    character: '', 
    cardname: '', 
    red: 0, 
    blue: 0, 
    yellow: 0, 
    event: false, 
    dupe: 0
};
const member_template = {
    id: -1,
    star: 1, 
    character: '', 
    cardname: '', 
    value: 0, 
    event: false, 
    dupe: 0
};
const team_template = {
    total: 0,
    skillname: '無技能',
    skillbuff: 0, 
    members:[]
};
const colors = ['red', 'blue', 'yellow'];
const warning = {
    count: '至少要有15張卡才能使用組隊功能',
    character_count: '重複角色太多',
    empty_character: '不能有空白角色',
    illegal_cardfile: '卡組資料格式錯誤',
    illegal_value: '卡片數值請用數字填入',
    illegal_star: '卡片星級請用數字填入，僅限1~5',
    illegal_dupe: '卡片突破請用數字填入，僅限0~4',
    illegal_character: '請填入正確角色名稱',
    illegal_name: '請用文字敘述卡片名稱',
    illegal_event: '倍卡格式錯誤'
};
const level_big = [
    10000, 11450, 13110, 15011, 17187,
    19680, 22533, 25801, 29542, 33818,
    38721, 44346, 50763, 58123, 66550,
    76199, 87247, 99897, 114382, 130967,
    149957, 171700, 196596, 225102, 257741,
    295113, 337904, 387033, 443152, 500000
];
const level_postbig = [
    40000, 46680, 54475, 63572, 74189,
    89579, 101038, 117911, 137602, 160582,
    187399, 218695, 255217, 297838, 347577,
    405623, 473362, 552413, 644666, 750000
];
const level_emer = [
    70000, 84700, 102487, 124009, 150051,
    181560, 219687, 265821, 321643, 389188,
    470917, 569809, 689481, 834256, 1000000
];
const Const = {
    colors: colors,
    team_template: team_template,
    card_template: card_template,
    member_template: member_template,
    warning: warning,
    level_big: level_big,
    level_postbig: level_postbig,
    level_emer: level_emer
};

CheckNaturalNum = function (input){
	if(input == undefined) return false;
	if(Number.isInteger(input) && input > -1) return true;
	return false;
}
CopyByValue = function(object){
	return JSON.parse(JSON.stringify(object));
}
Arrangeable = function(cards, characters){
    if(cards.length < 15) return warning.count;
    var different_count = 0;
    var character_dic = {};
    for(var i=0; i<characters.length; i++){
        character_dic[characters[i]] = 0;
    }
    for(var i=0; i<cards.length; i++){
        var char = cards[i].character;
        if(char === '') return warning.empty_character;
        if(typeof(character_dic[char]) === 'undefined') return warning.illegal_character;
        if(character_dic[char] < 3){
            different_count++;
            character_dic[char]++;
        }
    }
    if(different_count < 15) return warning.character_count;
    else return null;
}
IsLegal = function(cards, characters){
    if(cards == undefined || cards == null) return warning.illegal_cardfile;
    if(cards.constructor !== Array) return warning.illegal_cardfile;

    var character_dic = {};
    for(var i=0; i<characters.length; i++){
        character_dic[characters[i]] = 0;
    }

    for(var i=0; i<cards.length; i++){
        if(!CheckNaturalNum(cards[i].red) 
            || !CheckNaturalNum(cards[i].blue) 
            || !CheckNaturalNum(cards[i].yellow)) {
            return warning.illegal_value;
        }
        if(!CheckNaturalNum(cards[i].star) || cards[i].star > 5) {
            return warning.illegal_value;
        }
        if(!CheckNaturalNum(cards[i].dupe) || cards[i].dupe > 4) {
            return warning.illegal_value;
        }
        if(typeof(cards[i].character) != 'string') return warning.illegal_character;
        if(typeof(character_dic[cards[i].character]) === 'undefined') return warning.illegal_character;
        if(typeof(cards[i].cardname) != 'string') return warning.illegal_name;
        if(typeof(cards[i].event) != 'boolean') return warning.illegal_event;
    }
    return null;
}
array_dupe = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j, 1);
        }
    } 
    return a;
}
array_equals = function(array) {
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
}
ExtendArray = function(){
    Array.prototype.dupe = array_dupe;
    Array.prototype.equals = array_equals;
}

module.exports = {
    CheckNaturalNum,
    CopyByValue,
    ExtendArray,
    Arrangeable,
    IsLegal,
    Const
};