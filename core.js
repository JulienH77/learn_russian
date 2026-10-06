(function(root){
const normalize=s=>String(s).normalize('NFD').replace(/\u0301/g,'').normalize('NFC').toLowerCase().replace(/ё/g,'е').replace(/[.,!?;:«»“”"—–]/g,' ').replace(/\s+/g,' ').trim();
const stripStress=s=>s.replace(/\u0301/g,'');
const letterMap={а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'io',ж:'j',з:'z',и:'i',й:'ï',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'ou',ф:'f',х:'kh',ц:'ts',ч:'tch',ш:'ch',щ:'chtch',ъ:'″',ы:'y',ь:'′',э:'è',ю:'iou',я:'ia'};
const latin=s=>Array.from(s).map(c=>{const l=c.toLowerCase();if(!letterMap[l])return c;let out=letterMap[l];return c===l?out:out[0].toUpperCase()+out.slice(1)}).join('');
const dayKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const shuffle=(a,rng=Math.random)=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const mergeEvents=(a,b)=>[...new Map([...a,...b].map(x=>[x.id,x])).values()].sort((x,y)=>x.at.localeCompare(y.at)||x.id.localeCompare(y.id));
function validEvent(e){return e&&typeof e.id==='string'&&typeof e.at==='string'&&!isNaN(Date.parse(e.at))&&/^\d{4}-\d{2}-\d{2}$/.test(e.day)&&['answer','complete','writing'].includes(e.kind)&&(e.kind!=='answer'||(typeof e.correct==='boolean'&&typeof e.skill==='string'));}
function parseProgress(s){const x=typeof s==='string'?JSON.parse(s):s;if(!x||x.schema!==1||!Array.isArray(x.events)||!x.events.every(validEvent))throw new Error('Format de progression invalide. Aucun fichier existant ne sera écrasé.');return x;}
function derive(events,now=Date.now()){
const days={},words={},lessons={},skills={};let xp=0,correct=0,answers=0;
for(const e of events){const d=days[e.day]??={answers:0,correct:0,seconds:0,lessons:new Set(),xp:0};if(e.lesson)d.lessons.add(e.lesson);
if(e.kind==='answer'){answers++;d.answers++;if(e.correct){correct++;d.correct++;xp+=10;d.xp+=10}const sec=Math.min(120,Math.max(0,e.seconds||0));d.seconds+=sec;const s=skills[e.skill]??={total:0,correct:0};s.total++;s.correct+=e.correct?1:0;
if(e.word){const w=words[e.word]??={streak:0,seen:0,correct:0,due:0};w.seen++;w.correct+=e.correct?1:0;w.streak=e.correct?w.streak+1:0;const intervals=[0,1,3,7,14,30];w.due=Date.parse(e.at)+(e.correct?intervals[Math.min(w.streak,5)]*86400000:600000);}}
if(e.kind==='complete'){const l=lessons[e.lesson]??={best:0,attempts:0,passed:false};l.attempts++;l.best=Math.max(l.best,e.score||0);l.passed=l.best>=80;}
}
let cursor=new Date(now);if(!days[dayKey(cursor)]?.answers)cursor.setDate(cursor.getDate()-1);let streak=0;while(days[dayKey(cursor)]?.answers){streak++;cursor.setDate(cursor.getDate()-1)}
return{days,words,lessons,skills,xp,correct,answers,streak,due:Object.keys(words).filter(k=>words[k].due<=now),mastered:Object.values(words).filter(w=>w.streak>=3).length};}
function questions(lesson,all,{exam=false,audio=true}={}){
const pool=all.lessons.flatMap(l=>l.words);const q=[];
for(const w of lesson.words){const other=shuffle(pool.filter(x=>x.fr!==w.fr));const opts=shuffle([w.fr,...new Set(other.map(x=>x.fr))].slice(0,4));q.push({type:'choice',skill:'lecture',word:w.id,lesson:lesson.id,prompt:'Que signifie ce mot ou cette expression ?',ru:w.ru,answer:w.fr,choices:opts,explain:`${w.ru} = ${w.fr}.`});
q.push({type:'write',skill:'écriture',word:w.id,lesson:lesson.id,prompt:'Écris en russe',fr:w.fr,answer:stripStress(w.ru),explain:`La réponse attendue est « ${stripStress(w.ru)} ».`});
if(audio)q.push({type:'listen',skill:'écoute',word:w.id,lesson:lesson.id,prompt:'Écoute, puis choisis le sens.',ru:w.ru,answer:w.fr,choices:shuffle([w.fr,...new Set(other.map(x=>x.fr))].slice(0,4)),explain:`Tu as entendu « ${w.ru} » : ${w.fr}.`});
if(w.ru.trim().split(/\s+/).length>=3)q.push({type:'order',skill:'grammaire',word:w.id,lesson:lesson.id,prompt:'Remets les mots dans l’ordre',fr:w.fr,answer:stripStress(w.ru),words:shuffle(stripStress(w.ru).split(/\s+/)),explain:`Dans ce modèle : ${stripStress(w.ru)}. D’autres ordres peuvent être naturels, mais l’exercice attend celui-ci.`});}
for(const c of lesson.clozes)q.push({type:'choice',skill:'grammaire',lesson:lesson.id,prompt:c.prompt,answer:c.answer,choices:shuffle(c.choices),explain:c.explain});
if(lesson.reading){const r=lesson.reading;q.push({type:'reading',skill:'lecture',lesson:lesson.id,prompt:r.question,ru:r.ru,answer:r.answer,choices:shuffle(r.choices),explain:r.fr});if(audio)q.push({type:'dialogue',skill:'écoute',lesson:lesson.id,prompt:r.question,ru:r.ru,answer:r.answer,choices:shuffle(r.choices),explain:r.fr});}
if(!exam)return shuffle(q);
// Every lesson's test includes reading, writing, grammar and listening when a Russian voice exists.
const selected=[];const grammar=shuffle(q.filter(x=>x.type==='choice'&&x.skill==='grammaire'));selected.push(...grammar.slice(0,2));for(const type of ['choice','write','listen','order','reading','dialogue']){const group=shuffle(q.filter(x=>x.type===type&&!selected.includes(x)));selected.push(...group.slice(0,type==='write'?4:type==='choice'?3:type==='listen'?3:1));}
return shuffle(selected);
}
root.RuCore={normalize,stripStress,latin,dayKey,shuffle,mergeEvents,parseProgress,derive,questions};if(typeof module!=='undefined')module.exports=root.RuCore;
})(typeof window!=='undefined'?window:globalThis);
