/* Short, thematic levels; old lesson identifiers remain as migration aliases. */
(function(){
const themes=[
['Premiers échanges','Dire bonjour et te présenter.',['l06','l07'],'👋','#7864e8'],
['Le secret des lettres','Apprivoiser le cyrillique, petit à petit.',['l01','l02','l03','l04','l05'],'А','#32a7b4'],
['Parler de toi','Les personnes, les questions et les nombres.',['l09','l10','l08'],'💬','#d58031'],
['À table !','Commander, manger et boire.',['l12','l18'],'🍜','#e06b70'],
['Comme à la maison','Les objets, les actions et les descriptions.',['l11','l13','l15'],'⌂','#4c9c7b'],
['Au fil de la journée','Les habitudes, le temps et la météo.',['l14','l20'],'☀','#ca9134'],
['On y va ?','Explorer la ville, voyager et acheter.',['l16','l17','l19'],'✈','#5196d2'],
['Assembler les idées','Les premières constructions grammaticales.',['l21','l22','l23'],'🧩','#8872c5'],
['Des conversations qui grandissent','Raconter, inviter et donner ton avis.',['l24','l25','l26','l27','l28','l29','l30'],'✦','#529b9a'],
['Entre vous deux','Des petits mots pour te rapprocher d’elle.',['ru-couple1','ru-couple2','ru-couple3','ru-couple4'],'♡','#d86c96']];
for(const [lang,c] of Object.entries(COURSES)){
const originals=c.lessons;
const groups=lang==='ru'?themes:c.chapters.map((name,i)=>[name,['Les sons et tes premiers mots.','Exprimer une idée simplement.','Te débrouiller au quotidien.'][i],originals.filter(l=>l.ch===i).map(l=>l.id),['声','文','茶'][i],['#db8256','#509ba1','#9772c6'][i]]);
c.chapters=groups.map(g=>g[0]);c.worlds=groups.map(g=>({name:g[0],description:g[1],icon:g[3],color:g[4]}));c.lessons=[];
groups.forEach((g,ch)=>g[2].forEach(id=>{const old=originals.find(l=>l.id===id);let remaining=[...old.words],part=0;const parts=Math.ceil(remaining.length/4);while(remaining.length){const take=Math.ceil(remaining.length/(parts-part)),batch=remaining.splice(0,take);part++;const newId='v7-'+old.id+'-'+part;c.lessons.push({...old,id:newId,legacy:old.id,ch,optional:lang==='ru'&&ch===9,baseTitle:old.title,title:old.title+(parts>1?' · '+part+'/'+parts:''),part,parts,words:batch.map(w=>({...w,lesson:newId})),clozes:part===parts?old.clozes:[],reading:part===parts?old.reading:null});}}));
}
})();
