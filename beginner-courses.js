/* New foundations use independent identifiers: old successes cannot skip the alphabet. */
(function(){
const c=COURSES.ru,alphabet=c.alphabet,lessons=[];
const samples={А:'а',М:'ма',О:'о',Т:'та',К:'ка',И:'и',Н:'на',С:'са',В:'ва',Р:'ра',П:'па',У:'у',Б:'ба',Д:'да',Г:'га',Л:'ла',З:'за',Ф:'фа',Е:'е',Ё:'ё',Э:'э',Й:'мой',Ы:'мы',Ж:'жа',Ш:'ша',Щ:'щи',Х:'ха',Ц:'ца',Ч:'ча',Ю:'ю',Я:'я'};
const soundNames={Щ:'ch long et doux',Ж:'j dur',Ш:'ch dur',Ы:'voyelle reculée, différente de i',Й:'y bref',Р:'r roulé',Х:'kh soufflé'};
const shapes={А:'Deux traits inclinés et une barre au milieu. La minuscule imprimée а change de forme.',М:'Deux traits verticaux reliés par un creux en V. La minuscule м a la même silhouette.',О:'Un ovale fermé. La minuscule о a la même forme.',Т:'Une barre horizontale au-dessus d’un trait vertical. Ici, on apprend les caractères imprimés, pas la cursive.',К:'Un trait vertical et deux branches obliques. La minuscule к garde cette forme.',И:'Deux traits verticaux reliés par une diagonale qui monte vers la droite. Ce n’est pas un N latin.',Н:'Deux traits verticaux et une barre horizontale. Cette lettre se lit n, malgré sa forme de H.',С:'Un arc ouvert à droite, comme C. Il se prononce toujours s.',В:'Un trait vertical et deux boucles, comme B. Son son est v.',Р:'Un trait vertical et une boucle en haut, comme P. Son son est r roulé.'};
function letters(chars,title){const id='ru-found-'+String(lessons.length+1).padStart(2,'0');lessons.push({id,lang:'ru',ch:0,foundation:true,difficulty:0,baseTitle:title,title,goal:'Reconnaître '+chars.join(' et ')+', sans écrire de mémoire.',rule:'Seulement '+chars.length+' lettres cette fois. Observe leur forme, écoute leur son si une voix russe est disponible, puis choisis la bonne réponse.\nLe tracé au doigt est un entraînement libre : il ne compte pas dans le score. Nous travaillons les lettres imprimées, pas encore l’écriture cursive.',clozes:[],words:chars.map(ch=>{const a=alphabet.find(x=>x[0]===ch);return{id:id+'-'+ch,lesson:id,text:ch,lower:a[1],latin:a[2],fr:['Ь','Ъ'].includes(ch)?(ch==='Ь'?'signe mou, sans son propre':'signe dur, sans son propre'):'son « '+(soundNames[ch]||a[2])+' »',note:a[3],shape:shapes[ch]||'Compare la majuscule '+ch+' et la minuscule '+a[1]+'. Observe puis repasse la forme imprimée.',trace:ch,audio:samples[ch]||null,foundation:true,difficulty:0};})});}
function small(title,rows){const id='ru-read-'+String(lessons.length+1);lessons.push({id,lang:'ru',ch:0,difficulty:1,baseTitle:title,title,goal:'Assembler uniquement les lettres déjà rencontrées.',rule:'Tu connais déjà toutes les lettres de cette étape. Lis-les lentement, puis assemble leurs sons.\nLe modèle reste visible quand tu reconstruis le mot. Tu n’as rien à taper de mémoire.',clozes:[],words:rows.map(([text,latin,fr],i)=>({id:id+'w'+i,lesson:id,text,latin,fr,difficulty:1}))});}
letters(['А','М'],'А et М · deux premiers sons');
letters(['О','Т'],'О et Т · deux lettres familières');
small('Tes premiers assemblages',[['ма́ма','ma-ma','maman'],['там','tam','là-bas']]);
letters(['К','И'],'К et И · observer la forme');
small('Un tout petit mot',[['кот','kot','chat'],['кто','kto','qui']]);
letters(['Н','С'],'Н et С · attention aux faux amis');
small('Lire trois lettres',[['нос','nos','nez'],['сок','sok','jus']]);
letters(['В','Р'],'В et Р · de nouveaux sons');
letters(['П','У'],'П et У · p et ou');
letters(['Б','Д','Г'],'Б, Д et Г · trois consonnes');
letters(['Л','З','Ф'],'Л, З et Ф · encore trois formes');
letters(['Е','Ё','Э'],'Е, Ё et Э · écouter la différence');
letters(['Й','Ы'],'Й et Ы · prendre son temps');
letters(['Ж','Ш','Щ'],'Ж, Ш et Щ · des sons à écouter');
letters(['Х','Ц','Ч'],'Х, Ц et Ч · kh, ts, tch');
letters(['Ю','Я'],'Ю et Я · les dernières voyelles');
letters(['Ь','Ъ'],'Ь et Ъ · deux signes sans son');
const rest=c.lessons.filter(l=>l.ch!==1).map(l=>({...l,ch:l.ch===0?1:l.ch,difficulty:l.ch<3?1:l.ch<7?2:3,words:l.words.map(w=>({...w,difficulty:l.ch<3?1:l.ch<7?2:3}))}));
c.worlds=[{name:'Mes toutes premières lettres',description:'Deux lettres, deux sons. Tout commence doucement.',icon:'А',color:'#32a7b4'},...c.worlds.filter((_,i)=>i!==1)];c.chapters=c.worlds.map(w=>w.name);c.lessons=[...lessons,...rest];
for(const l of COURSES.zh.lessons){l.difficulty=l.ch+1;l.words.forEach(w=>w.difficulty=l.difficulty);}
})();
