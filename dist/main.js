!function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=5)}([function(e,r){const t={colors:["red","blue","yellow"],team_template:{total:0,skillname:"無技能",skillbuff:0,members:[]},card_template:{id:0,star:1,character:"",cardname:"",red:0,blue:0,yellow:0,event:!1,dupe:0}};CheckNaturalNum=function(e){return void 0!=e&&!!(Number.isInteger(e)&&e>-1)},CopyByValue=function(e){return JSON.parse(JSON.stringify(e))},array_dupe=function(){for(var e=this.concat(),r=0;r<e.length;++r)for(var t=r+1;t<e.length;++t)e[r]===e[t]&&e.splice(t,1);return e},array_equals=function(e){if(!e)return!1;if(this.length!=e.length)return!1;for(var r=0;r<this.length;r++){if(e[r]instanceof Array&&this[r]instanceof Array)return this[r].equals(e[r]);if(e[r]!==this[r])return!1}return!0},ExtendArray=function(){Array.prototype.dupe=array_dupe,Array.prototype.equals=array_equals},e.exports={CheckNaturalNum:CheckNaturalNum,CopyByValue:CopyByValue,ExtendArray:ExtendArray,Const:t}},function(e,r){},function(e,r,t){var n=t(0);n.ExtendArray(),sort_cards=function(e,r,t,n){if(!(t>=n)){var a=e[t][r];1==e[t].event&&(a=e[t][r]*(.5*e[t].dupe+2));for(var l=t,o=n+1;;){for(;l+1<=n&&card_greater(e[++l],r,a););for(;o-1>=t&&card_less(e[--o],r,a););if(!(l<o))break;var u=e[l];e[l]=e[o],e[o]=u}u=e[t];e[t]=e[o],e[o]=u,sort_cards(e,r,t,o-1),sort_cards(e,r,o+1,n)}},card_to_team=function(e,r){return{id:e.id,star:e.star,character:e.character,cardname:e.cardname,value:e[r],event:e.event,dupe:e.dupe}},card_greater=function(e,r,t){return!0===e.event?value=e[r]*(.5*e.dupe+2):value=e[r],value>t},card_less=function(e,r,t){return!0===e.event?value=e[r]*(.5*e.dupe+2):value=e[r],value<t},caculate_total=function(e,r){for(var t=0,n=0,a="",l=0;l<5;l++){var o=e.members[l].value;!0===e.members[l].event&&(o*=.5*e.members[l].dupe+2),t+=o}return r.filter(function(r){return-1!==r.members.indexOf(e.members[0].character)}).forEach(function(r){for(var t=1,l=1;l<5;l++)e.members[0].character!==e.members[l].character&&-1!==r.members.indexOf(e.members[l].character)&&t++;t==r.members.length&&(n+=r.buff,a=0===a.length?r.name:a+"+"+r.name)}),e.total=Math.floor(t*(100+n)/100),e.skillbuff=n,e.skillname=0===a.length?"無技能":a,e.total},arrange_one=function(e,r,t,a,l){var o=[];t.forEach(function(t){var a=n.CopyByValue(n.Const.team_template);t.members.every(function(t){var n=r.findIndex(function(e){return e.character===t&&-1===l.indexOf(e.id)});return-1!==n&&-1===l.indexOf(r[n].id)&&(a.members.push(card_to_team(r[n],e)),!0)}),a.members.length===t.members.length&&(a.skillname=t.name,a.skillbuff=t.buff,o.push(a))}),o.push(n.CopyByValue(n.Const.team_template)),o.forEach(function(t){for(var n=0;t.members.length<5&&n<r.length;)-1===t.members.findIndex(function(e){return e.character==r[n].character})&&-1===l.indexOf(r[n].id)?t.members.push(card_to_team(r[n],e)):n++});var u=-1,c=null;if(o.forEach(function(e){total=caculate_total(e,a),total>u&&(u=total,c=e)}),null!==c)for(var i=0;i<c.members.length;i++)l.push(c.members[i].id);else console.log(o);return c},arrange_two=function(e,r,t,a,l){var o=[];t.forEach(function(t){var a=n.CopyByValue(n.Const.team_template);t.members.every(function(t){var n=r.findIndex(function(e){return e.character===t&&-1===l.indexOf(e.id)});return-1!==n&&-1===l.indexOf(r[n].id)&&(a.members.push(card_to_team(r[n],e)),!0)}),a.members.length===t.members.length&&(a.skillname=t.name,a.skillbuff=t.buff,o.push(a))}),o.push(n.CopyByValue(n.Const.team_template));for(var u=[],c=0;c<o.length;c++)for(var i=c;i<o.length;i++){for(var s=o[c].skillbuff<o[i].skillbuff?[o[i],o[c]]:[o[c],o[i]],m=n.CopyByValue(s),f=!0,d=0;d<m[0].members.length;d++){var h=m[1].members.findIndex(function(e){return m[0].members[d].id===e.id});if(-1!==h){var b=r.findIndex(function(e){return e.character===m[1].members[h].character&&e.id!==m[1].members[h].id});if(-1===b){f=!1;break}m[1].members[h]=card_to_team(r[b],e)}}f&&u.push(n.CopyByValue(m))}u.forEach(function(t){for(var n=0;t[0].members.length<5&&n<r.length;){var a=t[0].members.findIndex(function(e){return e.character===r[n].character}),l=t[1].members.findIndex(function(e){return e.id===r[n].id});-1===a&&-1===l?t[0].members.push(card_to_team(r[n],e)):n++}for(n=0;t[1].members.length<5&&n<r.length;){a=t[1].members.findIndex(function(e){return e.character===r[n].character});var o=t[0].members.findIndex(function(e){return e.id===r[n].id});-1===a&&-1===o?t[1].members.push(card_to_team(r[n],e)):n++}});var g=-1,p=null;if(u.forEach(function(e){var r=caculate_total(e[0],a),t=caculate_total(e[1],a),n=r+t;if(n>g){if(g=n,r<t){var l=e[0];e[0]=e[1],e[1]=l}p=e}}),null!==p){for(var v=0;v<p[0].members.length;v++)l.push(p[0].members[v].id);for(v=0;v<p[1].members.length;v++)l.push(p[1].members[v].id)}else console.log(u);return p},arrange_three=function(e,r,t,a,l,o){var u=[];t.forEach(function(t){var a=n.CopyByValue(n.Const.team_template);t.members.every(function(t){var n=r.findIndex(function(e){return e.character===t&&-1===l.indexOf(e.id)});return-1!==n&&-1===l.indexOf(r[n].id)&&(a.members.push(card_to_team(r[n],e)),!0)}),a.members.length===t.members.length&&(a.skillname=t.name,a.skillbuff=t.buff,u.push(a))}),u.push(n.CopyByValue(n.Const.team_template));for(var c=[],i=0;i<u.length;i++)for(var s=i;s<u.length;s++)for(var m=s;m<u.length;m++){var f=[];f=u[i].skillbuff<u[s].skillbuff?[u[s],u[i]]:[u[i],u[s]],f=u[m].skillbuff<f[1].skillbuff?f.concat(u[m]):u[m].skillbuff>f[0].skillbuff?[u[m]].concat(f):[f[0],u[m],f[1]];for(var d=n.CopyByValue(f),h=!0,b=0;b<d[0].members.length;b++){var g,p=d[1].members.findIndex(function(e){return d[0].members[b].id===e.id});if(-1!==p){if(-1===(g=r.findIndex(function(e){return e.character===d[1].members[p].character&&e.id!==d[1].members[p].id}))){h=!1;break}d[1].members[p]=card_to_team(r[g],e)}if(-1!==(_=d[2].members.findIndex(function(e){return d[0].members[b].id===e.id}))){if(-1===(v=r.findIndex(function(e){return e.character===d[2].members[_].character&&(e.id!==d[2].members[_].id&&(-1===p||e.id!==r[g].id))}))){h=!1;break}d[2].members[_]=card_to_team(r[v],e)}}for(b=0;b<d[1].members.length;b++){var v,_=d[2].members.findIndex(function(e){return d[1].members[b].id===e.id}),y=d[0].members.findIndex(function(e){return d[1].members[b].id===e.id});if(-1!==_&&-1===y){if(-1===(v=r.findIndex(function(e){return e.character===d[2].members[_].character&&e.id!==d[2].members[_].id}))){h=!1;break}d[2].members[_]=card_to_team(r[v],e)}}h&&c.push(n.CopyByValue(d))}c.forEach(function(t){for(var n=0;t[0].members.length<5&&n<r.length;){var a=t[0].members.findIndex(function(e){return e.character===r[n].character}),l=t[1].members.findIndex(function(e){return e.id===r[n].id}),o=t[2].members.findIndex(function(e){return e.id===r[n].id});-1===a&&-1===l&&-1===o?t[0].members.push(card_to_team(r[n],e)):n++}for(n=0;t[1].members.length<5&&n<r.length;){a=t[1].members.findIndex(function(e){return e.character===r[n].character});var u=t[0].members.findIndex(function(e){return e.id===r[n].id});o=t[2].members.findIndex(function(e){return e.id===r[n].id});-1===a&&-1===u&&-1===o?t[1].members.push(card_to_team(r[n],e)):n++}for(n=0;t[2].members.length<5&&n<r.length;){a=t[2].members.findIndex(function(e){return e.character===r[n].character}),u=t[0].members.findIndex(function(e){return e.id===r[n].id}),l=t[1].members.findIndex(function(e){return e.id===r[n].id});-1===a&&-1===u&&-1===l?t[2].members.push(card_to_team(r[n],e)):n++}});var k=null,x=[-1,-1,-1],C=[-1,-1,-1];if(c.forEach(function(e){if(C[0]=caculate_total(e[0],a),C[1]=caculate_total(e[1],a),C[2]=caculate_total(e[2],a),o(C,x)){for(var r=0;r<3;r++)x[r]=C[r];C[0]<C[1]?e=C[1]<C[2]?[e[2],e[1],e[0]]:C[2]<C[0]?[e[1],e[0],e[2]]:[e[1],e[2],e[0]]:C[0]<C[2]?e=[e[2],e[0],e[1]]:C[2]<C[1]||(e=[e[0],e[2],e[1]]),k=e}}),null!==k){for(m=0;m<k[0].members.length;m++)l.push(k[0].members[m].id);for(m=0;m<k[1].members.length;m++)l.push(k[1].members[m].id);for(m=0;m<k[2].members.length;m++)l.push(k[2].members[m].id)}else console.log(c);return k},multiple_skill=function(e,r){var t=0,a=r.length;do{for(var l=r.length,o=l-1;o>=t;o--)for(var u=o<a?o-1:a-1;u>=0;u--){var c=r[o],i=r[u],s=c.members.concat(i.members).dupe();if(s.length!=c.members.length+i.members.length&&s.length<=5)if(void 0===r.find(function(e){if(n.util.CopyByValue(e.members).sort().equals(s.sort())){var r=e.name.split("+"),t=c.name.split("+"),a=i.name.split("+"),l=t.concat(a).dupe();return l.length!==t.length+a.length||l.length===r.length}return!1})){var m=0;for(u=0;u<s.length;u++)if(c.members.indexOf(s[u])>-1&&i.members.indexOf(s[u])>-1){var f=s[u];s[u]=s[m],s[m]=f,m++}s.length===c.members.length&&(r.splice(o,1),o<a&&a--,o<l&&l--),s.length===i.members.length&&(r.splice(u,1),u<a&&a--,u<l&&l--),r.push({name:c.name+"+"+i.name,members:s,buff:c.buff+i.buff})}}t=l}while(t!==r.length);return r},e.exports={sort_cards:sort_cards,caculate_total:caculate_total,arrange_one:arrange_one,arrange_two:arrange_two,arrange_three:arrange_three,multiple_skill:multiple_skill}},function(e,r){e.exports={}},function(e,r,t){var n=t(0),a=(t(3),t(2));n.ExtendArray();var l=new FileReader,o=angular.module("ESCaculator",[]);o.controller("CardGroup",function(e){e.characters=[],e.redskill=[],e.blueskill=[],e.yellowskill=[],e.redteams=[],e.blueteams=[],e.yellowteams=[],e.cards=[],e.teams={red:e.redteams,blue:e.blueteams,yellow:e.yellowteams},e.skill={red:e.redskill,blue:e.blueskill,yellow:e.yellowskill},e.color="red",e.cardcount=15,e.groupstyle=3,e.calculate=function(){var r=e.color;e.calculate_color(e.teams[r],e.skill[r])},e.calculate_color=function(e,r){for(var t=0;t<3;t++)a.calculate_total(e[t],r)},e.changecolor=function(r){e.color=r},e.changecardcount=function(){var r=e.cards.length;if((void 0==e.cardcount||null==e.cardcount||e.cardcount<15)&&(e.cardcount=15),r!=e.cardcount&&(e.cards.length=e.cardcount,r<e.cards.length))for(var t=r;t<e.cards.length;t++)e.cards[t]={id:r+t,star:1,character:"",cardname:"",red:0,blue:0,yellow:0,event:!1,dupe:0}},e.autoarrangeall=function(){for(var r=n.CopyByValue(e.cards),t=0;t<n.Const.colors.length;t++){var a=n.Const.colors[t];e.arrangebycolor(r,a)}},e.arrangebycolor=function(r,t){var l=n.CopyByValue(e.teams[t]),o=n.CopyByValue(e.skill[t]),u=caculator.multiple_skill(t,o);a.sort_cards(r,t,0,r.length-1);var c=[];switch(e.groupstyle){case 1:for(var i=0;i<3;i++)l[i]=a.arrange_one(t,r,u,e.skill[t],c);e.teams[t]=l;break;case 2:var s=a.arrange_two(t,r,u,e.skill[t],c);l[0]=s[0],l[1]=s[1],l[2]=a.arrange_one(t,r,u,e.skill[t],c),e.teams[t]=l;break;case 3:e.teams[t]=a.arrange_three(t,r,u,e.skill[t],c,(e,r)=>{var t=e[0]+e[1]+e[2],n=r[0]+r[1]+r[2];if(t===n){var a=e[0]+e[1],l=r[0]+r[1];return a===l?e[0]>r[0]:a>l}return t>n});break;case 4:e.teams[t]=a.arrange_three(t,r,u,e.skill[t],c,(e,r)=>{var t=e[0]+e[1],n=r[0]+r[1],a=e[0]+e[1]+e[2],l=r[0]+r[1]+r[2];return l<25e4||a<25e4?a>l:n<333334||t<333334?t===n?e[0]>r[0]:t>n:e[0]>r[0]});break;case 5:e.teams[t]=a.arrange_three(t,r,u,e.skill[t],c,(e,r)=>{var t=e[0]+e[1]+e[2],n=r[0]+r[1]+r[2],a=e[0]+e[1],l=r[0]+r[1];return n<5e5||t<5e5?t>n:a>l})}},e.clear=function(){e.cardcount=15,e.cards.length=15;for(var r=0;r<e.cards.length;r++)e.cards[r]=n.CopyByValue(n.Const.card_template),e.cards[r].id=r},e.download=function(){var r=new Date,t=(r.getMonth()+1).toString();1==t.length&&(t="0"+t);var n=r.getDate().toString();1==n.length&&(n="0"+n);var a="es_cards_"+r.getFullYear()+t+n+".txt",l=JSON.stringify(e.cards),o=document.createElement("a");o.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(l)),o.setAttribute("download",a),o.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o)},e.upload=function(){if(void 0!=event&&void 0!=event.target&&0!=event.target.files.length){var e=event.target.files[0],r=e.name;console.log(r),l.readAsText(e)}},e.init=function(){console.log("init"),l.onload=function(r){var t,a=r.target.result;try{t=JSON.parse(a)}catch(e){return void console.log(e)}if(void 0!=t&&null!=t&&t.constructor===Array){for(var l=0;l<t.length;l++){if(!n.CheckNaturalNum(t[l].red)||!n.CheckNaturalNum(t[l].blue)||!n.CheckNaturalNum(t[l].yellow))return;if(!n.CheckNaturalNum(t[l].star)||t[l].star>5)return;if(!n.CheckNaturalNum(t[l].dupe)||t[l].dupe>4)return;if("string"!=typeof t[l].character)return;if("string"!=typeof t[l].cardname)return;if("boolean"!=typeof t[l].event)return;null==t[l].id&&(t[l].id=l)}for(;t.length<15;){var o=n.CopyByValue(n.Const.card_template);o.id=t.length,t.push(o)}console.log("legal"),e.cards=t,e.cardcount=t.length,e.$apply()}}},e.init()}),o.directive("customFileChange",function(){return{restict:"A",link:function(e,r,t){var n=e.$eval(t.customFileChange);r.on("change",n)}}}),o.directive("optionValue",function(){return{require:"ngModel",link:function(e,r,t,n){n.$parsers.push(function(e){return null!=e?parseInt(e,10):null}),n.$formatters.push(function(e){return null!=e?""+e:null})}}}),window.onload=function(){$(".loading").slideUp(500)},$(document).ready(function(){$("#cardcount").keyup(function(e){13==e.keyCode&&$(this).blur()})})},function(e,r,t){t(4),e.exports=t(1)}]);