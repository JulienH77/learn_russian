const assert=require('node:assert/strict');
const K=require('../learn-core.js');require('../curriculum.js');require('../core.js');require('../courses.js');require('../game-courses.js');require('../beginner-courses.js');require('../game-core.js');
assert.ok(COURSES.ru.lessons.length>50);assert.equal(COURSES.zh.lessons.length,15);
for(const [lang,c] of Object.entries(COURSES)){const ids=new Set();for(const l of c.lessons){assert.ok(l.words.length>=2&&l.words.length<=4);assert.ok(l.rule.length>50);assert.ok(!ids.has(l.id));ids.add(l.id);for(const w of l.words){assert.ok(!ids.has(w.id));ids.add(w.id);if(lang==='zh')assert.ok(w.latin);}for(const q of K.questions(l,c,true)){assert.ok(q.answer);if(q.choices){assert.ok(q.choices.includes(q.answer));assert.equal(new Set(q.choices).size,q.choices.length);}}}}
assert.equal(K.norm(' Ма́ма! '),'мама');assert.equal(K.norm('Ёж'),'еж');assert.notEqual(K.norm('Й'),'и');assert.notEqual(K.norm('mā','zh'),K.norm('má','zh'));assert.equal(K.norm('nǐ hǎo','zh'),K.norm('nǐhǎo','zh'));
const e=(id,lang,correct,at='2026-10-09T12:00:00Z')=>({id,lang,at,day:'2026-10-09',kind:'answer',word:'word',correct});
let es=[e('1','ru',true),e('2','zh',false)];assert.equal(K.derive(es,'ru').answers,1);assert.equal(K.derive(es,'zh').correct,0);assert.equal(K.merge(es,[es[0]]).length,2);assert.deepEqual(K.parse({schema:1,events:es}),es);assert.throws(()=>K.parse({schema:2,events:[{id:'x'}]}));assert.throws(()=>K.parse({schema:2,events:[{...e('x','ru',true),kind:'complete',lesson:'l01',score:150}]}));
assert.equal(K.derive([e('1','ru',true)],'ru',Date.parse('2026-10-10T12:01:00Z')).due.length,1);
assert.equal(K.derive([e('1','ru',true)],'ru',Date.parse('2026-10-09T12:01:00Z')).due.length,0);
assert.equal(K.derive([{id:'c',at:'2026-10-09T12:00:00Z',day:'2026-10-09',kind:'complete',lesson:'l01',score:79}],'ru').lessons.l01.passed,false);
console.log('Core OK: thematic micro-lessons, unique identifiers, valid exercises, language isolation, tones, old JSON support and spaced revision.');

const intro=COURSES.ru.lessons.filter(l=>l.ch===0);assert.equal(intro.length,17);assert.equal(COURSES.ru.lessons[0].words.map(w=>w.text).join(''),'АМ');assert.equal(new Set(intro.filter(l=>l.foundation).flatMap(l=>l.words.map(w=>w.text))).size,33);
for(const c of Object.values(COURSES))for(const l of c.lessons){for(const q of K.questions(l,c,false)){assert.ok(!['write','pinyin'].includes(q.type),'Default mode must not require free typing');if(q.type==='tiles')assert.equal(q.model,q.answer);}if(l.foundation){const qs=K.questions(l,c,true,null,true);assert.ok(qs.every(q=>['choice','reverse','match'].includes(q.type)));assert.ok(qs.filter(q=>q.choices).every(q=>q.choices.length<=2));}}
const advanced=COURSES.ru.lessons.find(l=>l.id==='v7-ru-couple1-1');assert.ok(K.questions(advanced,COURSES.ru,false,null,true).some(q=>q.type==='write'));
console.log('Beginner safety OK: all 33 letters in small groups, 17 guided foundations, no default free typing, optional short-word challenges.');
