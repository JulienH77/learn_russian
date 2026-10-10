const assert=require('node:assert/strict');
const K=require('../learn-core.js');require('../curriculum.js');require('../core.js');require('../courses.js');require('../game-courses.js');require('../game-core.js');
assert.ok(COURSES.ru.lessons.length>50);assert.equal(COURSES.zh.lessons.length,15);
for(const [lang,c] of Object.entries(COURSES)){const ids=new Set();for(const l of c.lessons){assert.ok(l.words.length>=2&&l.words.length<=4);assert.ok(l.rule.length>50);assert.ok(!ids.has(l.id));ids.add(l.id);for(const w of l.words){assert.ok(!ids.has(w.id));ids.add(w.id);if(lang==='zh')assert.ok(w.latin);}for(const q of K.questions(l,c,true)){assert.ok(q.answer);if(q.choices){assert.ok(q.choices.includes(q.answer));assert.equal(new Set(q.choices).size,q.choices.length);}}}}
assert.equal(K.norm(' Ма́ма! '),'мама');assert.equal(K.norm('Ёж'),'еж');assert.notEqual(K.norm('Й'),'и');assert.notEqual(K.norm('mā','zh'),K.norm('má','zh'));assert.equal(K.norm('nǐ hǎo','zh'),K.norm('nǐhǎo','zh'));
const e=(id,lang,correct,at='2026-10-09T12:00:00Z')=>({id,lang,at,day:'2026-10-09',kind:'answer',word:'word',correct});
let es=[e('1','ru',true),e('2','zh',false)];assert.equal(K.derive(es,'ru').answers,1);assert.equal(K.derive(es,'zh').correct,0);assert.equal(K.merge(es,[es[0]]).length,2);assert.deepEqual(K.parse({schema:1,events:es}),es);assert.throws(()=>K.parse({schema:2,events:[{id:'x'}]}));assert.throws(()=>K.parse({schema:2,events:[{...e('x','ru',true),kind:'complete',lesson:'l01',score:150}]}));
assert.equal(K.derive([e('1','ru',true)],'ru',Date.parse('2026-10-10T12:01:00Z')).due.length,1);
assert.equal(K.derive([e('1','ru',true)],'ru',Date.parse('2026-10-09T12:01:00Z')).due.length,0);
assert.equal(K.derive([{id:'c',at:'2026-10-09T12:00:00Z',day:'2026-10-09',kind:'complete',lesson:'l01',score:79}],'ru').lessons.l01.passed,false);
console.log('Core OK: thematic micro-lessons, unique identifiers, valid exercises, language isolation, tones, old JSON support and spaced revision.');
