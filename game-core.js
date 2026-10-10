(function(){
LearnCore.questions=function(l,c,audio=false,reviewWords=null,challenge=false){
const K=LearnCore,ws=reviewWords||l.words,isRu=c.code==='ru-RU',foundation=!!l?.foundation;const options=(w,field)=>K.shuffle([w[field],...K.shuffle([...new Set(ws.filter(x=>x[field]!==w[field]).map(x=>x[field]))]).slice(0,foundation?1:2)]);let qs=[];
for(const w of ws)qs.push({type:'choice',word:w,prompt:w.foundation?'Quel son représente cette lettre ?':'Retrouve le sens',text:w.text,answer:w.fr,choices:options(w,'fr')});
ws.forEach(w=>{const text=K.plain(w.text),level=w.difficulty??l?.difficulty??1,tokens=isRu?text.split(/\s+/):[...w.text];
if(w.foundation){qs.push({type:'reverse',word:w,prompt:'Quelle lettre correspond à… ?',text:w.fr,answer:w.text,choices:options(w,'text')});return;}
if(challenge&&level>=2&&text.length<=8&&tokens.length===1){qs.push({type:isRu?'write':'pinyin',word:w,prompt:isRu?'Défi facultatif · écris ce petit mot':'Défi facultatif · retrouve le pinyin',text:isRu?w.fr:w.text,answer:isRu?text:w.latin});return;}
if((isRu&&text.length<=5)||level>=2&&((isRu&&tokens.length>1)||!isRu)){
const separator=isRu&&tokens.length>1?' ':'';const tiles=isRu&&tokens.length===1?[...text]:tokens;
qs.push({type:'tiles',word:w,prompt:'Recompose avec le modèle',text:w.fr,answer:text,model:text,tiles:K.shuffle(tiles),separator});
}else qs.push({type:'reverse',word:w,prompt:'Reconnais la bonne réponse',text:w.fr,answer:w.text,choices:options(w,'text')});
});
const pairs=ws.filter((w,i,a)=>a.findIndex(x=>x.fr===w.fr)===i).slice(0,3);if(pairs.length>1)qs.push({type:'match',prompt:foundation?'Associe chaque lettre à son son':'Associe les paires',answer:'matched',left:K.shuffle(pairs),right:K.shuffle(pairs),explain:foundation?'Chaque lettre correspond au son indiqué.':'Tu as retrouvé les associations.'});
if(audio&&!foundation&&ws.length){const w=ws[0];qs.push({type:'audio',word:w,prompt:'Écoute et reconnais la réponse',answer:w.fr,choices:options(w,'fr')});}
if(l?.difficulty>=2&&l.clozes?.length){const q=l.clozes[0];qs.push({type:'rule',prompt:q.prompt,answer:q.answer,choices:K.shuffle(q.choices),explain:q.explain});}
if(l?.difficulty>=3&&l.reading){const r=l.reading;qs.push({type:'reading',prompt:r.question,text:r.ru,answer:r.answer,choices:K.shuffle(r.choices),explain:r.fr});}return qs;
};
})();
