/* Russian teaching content. Latin display is transliteration, not exact phonetics. */
(function(root){
const alphabet=[['А','а','a','Comme le a de papa.'],['Б','б','b','Comme b.'],['В','в','v','Attention : cette lettre se lit v.'],['Г','г','g','G dur, comme dans gare.'],['Д','д','d','Comme d.'],['Е','е','ie','Au début d’un mot : yé. Adoucit la consonne précédente.'],['Ё','ё','io','Yo ; toujours accentué.'],['Ж','ж','j','Proche du j de journal, plus dur.'],['З','з','z','Comme z.'],['И','и','i','Comme i ; adoucit la consonne précédente.'],['Й','й','ï','Un bref y, comme dans yaourt.'],['К','к','k','Comme k.'],['Л','л','l','L dur ou doux selon la voyelle suivante.'],['М','м','m','Comme m.'],['Н','н','n','Attention : cette lettre se lit n.'],['О','о','o','O accentué ; souvent proche de a sans accent.'],['П','п','p','Comme p.'],['Р','р','r','R roulé avec la pointe de la langue.'],['С','с','s','Toujours s, jamais k.'],['Т','т','t','Comme t.'],['У','у','ou','Comme ou ; ne se lit pas y.'],['Ф','ф','f','Comme f.'],['Х','х','kh','Son soufflé du fond de la bouche, proche du j espagnol.'],['Ц','ц','ts','T et s en un seul son.'],['Ч','ч','tch','Comme tch, avec une consonne douce.'],['Ш','ш','ch','Ch dur.'],['Щ','щ','chtch','Ch long et doux ; chtch est une convention écrite.'],['Ъ','ъ','″','Signe dur, sans son propre ; sépare une consonne et une voyelle.'],['Ы','ы','y','Voyelle sans équivalent français ; langue plus reculée que pour i.'],['Ь','ь','′','Signe mou, sans son propre ; adoucit la consonne.'],['Э','э','è','È sans y initial.'],['Ю','ю','iou','You au début d’un mot ; adoucit la consonne précédente.'],['Я','я','ia','Ya au début d’un mot ; adoucit la consonne précédente.']];
const chapters=[['Lire le russe','A0','Reconnaître les lettres, lire tes premiers mots.'],['Premières conversations','A1','Te présenter, poser des questions, compter.'],['Le quotidien','A1','Parler de la maison, des repas et de tes journées.'],['Se débrouiller','A1+','Voyager, acheter et demander de l’aide.'],['Relier les idées','Vers A2','Comprendre les cas et raconter un événement.'],['Échanger vraiment','Vers A2','Inviter, donner ton avis, comprendre de petits textes.']];
const lessons=[];
function add(ch,title,goal,rule,rows,clozes=[],reading=null){const id='l'+String(lessons.length+1).padStart(2,'0');const words=rows.split('\n').filter(Boolean).map((r,i)=>{const [ru,fr]=r.split('|');return{id:id+'w'+i,ru,fr,lesson:id}});lessons.push({id,ch,title,goal,rule,words,clozes:clozes.map(r=>{const [prompt,answer,wrong1,wrong2,explain]=r;return{prompt,answer,choices:[answer,wrong1,wrong2],explain}}),reading});}
add(0,'Les lettres familières','Lire А, К, М, О, Т et tes premiers mots.','Les majuscules А К М О Т ressemblent aux lettres latines et ont un son proche. Lis lentement, lettre par lettre.\nL’accent aigu indique la syllabe forte : ма́ма. Il aide à apprendre mais ne s’écrit pas normalement.\nLa version latine est une translittération. Par exemple, o non accentué se prononce souvent près de a.',`ма́ма|maman
кот|chat
там|là-bas
мак|coquelicot
так|ainsi
кто|qui`,[['___ это? (Qui est-ce ?)','Кто','Там','Кот','Кто pose une question sur une personne.']]);
add(0,'Les faux amis visuels','Lire В, Н, Р, С, У, Х sans les confondre.','В se lit v, Н se lit n, Р se lit r, С se lit s, У se lit ou et Х se lit kh.\nLis сначала (« d’abord ») sans chercher le son de la lettre française. Сок se lit sok ; нос se lit nos.',`сок|jus
нос|nez
рот|bouche
рука́|main / bras
сын|fils
ухо|oreille`,[['La lettre Н se lit…','n','h','v','Н correspond au son n.'],['La lettre В se lit…','v','b','r','В correspond au son v.']]);
add(0,'Les nouvelles consonnes','Reconnaître Б, Г, Д, З, Л, П, Ф.','Ces lettres demandent de nouvelles associations visuelles. Б = b, Г = g dur, Д = d, З = z, Л = l, П = p, Ф = f.\nÀ la fin d’un mot, certaines consonnes sonores deviennent sourdes : dans хлеб, б se prononce p.',`дом|maison
хлеб|pain
вода́|eau
друг|ami
па́па|papa
фото|photo`,[['La lettre П se lit…','p','n','r','П correspond au son p.']]);
add(0,'Voyelles et sons nouveaux','Lire Е, Ё, И, Й, Э, Ю, Я, Ы, Ж, Ц, Ч, Ш, Щ.','Е, Ё, Ю, Я commencent souvent par un son y au début d’un mot : я = ya. Après une consonne, elles l’adoucissent.\nИ = i ; Ы est une autre voyelle, plus reculée. Ч = tch ; Ш = ch dur ; Щ est long et doux.\nLa translittération est une béquille : écoute puis répète, surtout pour Ы et Щ.',`чай|thé
я|je
ты|tu
мы|nous
ещё|encore
язы́к|langue`,[['La lettre Ч se lit…','tch','ts','ch','Ч = tch ; Ц = ts ; Ш = ch dur.'],['La lettre Я au début d’un mot se lit…','ia','a','è','Я commence par un son y : ya.']]);
add(0,'Lire sans la béquille','Comprendre les signes Ь et Ъ et assembler les mots.','Ь et Ъ ne sont pas des voyelles et n’ont pas de son propre. Ь adoucit la consonne précédente : день. Ъ sépare une consonne d’une voyelle : объём.\nLis les mots avec l’aide latine, puis masque-la. Ne rajoute pas de voyelle pour prononcer Ь.\nTu as rencontré les 33 lettres ; reviens à « Alphabet & sons » pour les réécouter.',`день|jour
ночь|nuit
семья́|famille
объём|volume
дверь|porte
пять|cinq`,[['Le signe Ь…','adoucit la consonne','se prononce i','se prononce b','Le signe mou n’a pas de son propre.']]);
add(1,'Saluer et remercier','Ouvrir une conversation polie.','Привет s’emploie avec les proches. Здравствуйте est une salutation polie.\nПожалуйста signifie « s’il vous plaît » et aussi « de rien », selon le contexte.\nPour demander comment ça va : Как дела? Réponse simple : Хорошо, спасибо.',`Приве́т|Salut
Здра́вствуйте|Bonjour (poli)
Спаси́бо|Merci
Пожа́луйста|S’il vous plaît / de rien
До свида́ния|Au revoir
Как дела́?|Comment ça va ?`,[['Avec un inconnu, choisis…','Здравствуйте','Привет','Пока','Здравствуйте est la formule polie.']],{ru:'— Привет! Как дела?\n— Хорошо, спасибо. А у тебя?\n— Тоже хорошо.',fr:'— Salut ! Comment ça va ?\n— Bien, merci. Et toi ?\n— Bien aussi.',question:'Comment vont les deux personnes ?',answer:'Elles vont bien.',choices:['Elles vont bien.','Elles sont malades.','Elles se quittent fâchées.']});
add(1,'Se présenter','Dire ton nom, ta nationalité et où tu vis.','Меня зовут… signifie littéralement « on m’appelle… ».\nAu présent, on omet normalement « être » : Я француз = Je suis français.\nЯ живу во Франции : во facilite la prononciation avant Франции. Из exprime l’origine ; в / во le lieu.',`Меня́ зову́т Жюлье́н|Je m’appelle Julien
Я францу́з|Je suis français
Я из Фра́нции|Je viens de France
Я живу́ во Фра́нции|J’habite en France
Я учу́ ру́сский язы́к|J’apprends le russe
Очень прия́тно|Enchanté`,[['Меня ___ Анна.','зовут','живу','из','La formule est Меня зовут + prénom.'],['Я ___ Франции. (Je viens de France.)','из','на','о','Из exprime l’origine.']]);
add(1,'Compter de 0 à 20','Lire les premiers nombres et donner une quantité.','Les nombres 1 et 2 changent selon le genre, mais on commence par leurs formes de base : один, два.\nAprès 2, 3, 4, le nom est souvent au génitif singulier ; après 5 à 20, au génitif pluriel.\nApprends d’abord les nombres puis les expressions : два билета, пять билетов.',`ноль|zéro
оди́н|un
два|deux
три|trois
четы́ре|quatre
пять|cinq
шесть|six
семь|sept
во́семь|huit
де́вять|neuf
де́сять|dix
оди́ннадцать|onze
двена́дцать|douze
трина́дцать|treize
четы́рнадцать|quatorze
пятна́дцать|quinze
шестна́дцать|seize
семна́дцать|dix-sept
восемна́дцать|dix-huit
девятна́дцать|dix-neuf
два́дцать|vingt`,[['___ билета (deux billets)','два','пять','один','Après два : билета. Après пять : билетов.']]);
add(1,'Poser des questions','Demander qui, quoi, où et quand.','Une question simple peut se construire avec un mot interrogatif : Где магазин? = Où est le magasin ?\nКто concerne une personne ; что une chose ; где un lieu ; когда un moment.\nPour « pourquoi ? », emploie Почему? ; pour « comment ? », Как?',`кто?|qui ?
что?|quoi ?
где?|où ? (position)
когда́?|quand ?
почему́?|pourquoi ?
как?|comment ?`,[['___ ты живёшь? (Où habites-tu ?)','Где','Когда','Кто','Где interroge sur le lieu.'],['___ это? (Qu’est-ce que c’est ?)','Что','Когда','Где','Что interroge sur une chose.']]);
add(1,'La famille et les personnes','Nommer tes proches et dire « mon / ma ».','Мой accompagne un nom masculin, моя un féminin, моё un neutre, мои un pluriel.\nМой брат, моя сестра, моё имя, мои друзья.\nUn nom en consonne est souvent masculin ; en -а / -я souvent féminin. Папа est une exception : masculin.',`брат|frère
сестра́|sœur
мать|mère
оте́ц|père
моя́ семья́|ma famille
мой друг|mon ami`,[['___ сестра','моя','мой','моё','Сестра est féminin : моя сестра.'],['___ брат','мой','моя','моё','Брат est masculin : мой брат.']]);
add(2,'Chez soi','Décrire les pièces et les objets.','Au présent : Это кухня = C’est la cuisine.\nОн représente un nom masculin, она un féminin et оно un neutre.\nДом — он ; комната — она ; окно — оно. Les pronoms dépendent du genre grammatical.',`ко́мната|chambre / pièce
ку́хня|cuisine
стол|table
стул|chaise
окно́|fenêtre
Это мой дом|C’est ma maison`,[['Окно — ___','оно','она','он','Окно est neutre.'],['Комната — ___','она','он','оно','Комната est féminin.']]);
add(2,'Manger et boire','Nommer les aliments et formuler un souhait.','Я хочу… = Je veux / je voudrais… ; Я люблю… = J’aime…\nAprès ces verbes, un complément direct est à l’accusatif : вода → воду, рыба → рыбу.\nLes noms masculins inanimés gardent souvent leur forme : Я хочу хлеб. Le nom кофе est normalement masculin et indéclinable.',`Я хочу́ во́ду|Je voudrais de l’eau
Я люблю́ чай|J’aime le thé
ко́фе|café
сыр|fromage
ры́ба|poisson
мо́локо|lait`,[['Я хочу ___. (de l’eau)','воду','вода','воде','Вода devient воду à l’accusatif.'],['Я люблю ___. (le thé)','чай','чаю','чаем','Чай est masculin inanimé : accusatif identique.']]);
add(2,'Les verbes au présent','Dire ce que tu fais et comprends.','Работать : я работаю, ты работаешь, он работает, мы работаем, вы работаете, они работают.\nГоворить : я говорю, ты говоришь, он говорит, мы говорим, вы говорите, они говорят.\n« Parler russe » se dit говорить по-русски. Pour apprendre la langue : учить русский язык.',`Я рабо́таю|Je travaille
Ты рабо́таешь|Tu travailles
Он рабо́тает|Il travaille
Я говорю́ по-ру́сски|Je parle russe
Я понима́ю|Je comprends
Я не понима́ю|Je ne comprends pas`,[['Ты ___ по-русски.','говоришь','говорю','говорит','Avec ты : говоришь.'],['Мы ___. (travaillons)','работаем','работаю','работает','Avec мы : работаем.']]);
add(2,'Le temps et les habitudes','Situer ta journée et dire la fréquence.','Сегодня = aujourd’hui ; вчера = hier ; завтра = demain.\nУтром, днём, вечером et ночью indiquent les moments de la journée.\nОбычно = habituellement ; часто = souvent ; иногда = parfois. Не se place avant le verbe pour la négation.',`сего́дня|aujourd’hui
вчера́|hier
за́втра|demain
у́тром|le matin
ве́чером|le soir
ча́сто|souvent
иногда́|parfois
о́бычно|habituellement`,[['Я ___ пью чай. (souvent)','часто','вчера','завтра','Часто exprime la fréquence.']],{ru:'Утром я работаю. Вечером я учу русский язык. Иногда я читаю книгу.',fr:'Le matin, je travaille. Le soir, j’apprends le russe. Parfois, je lis un livre.',question:'Quand cette personne apprend-elle le russe ?',answer:'Le soir.',choices:['Le soir.','Le matin.','Seulement la nuit.']});
add(2,'Décrire et accorder','Accorder quelques adjectifs simples.','Un adjectif s’accorde avec son nom : новый дом, новая книга, новое окно, новые книги.\nБольшой = grand ; маленький = petit.\nНовая комната = une nouvelle pièce ; комната большая = la pièce est grande. L’ordre peut changer selon ce que tu veux souligner.',`но́вый дом|une nouvelle maison
но́вая кни́га|un nouveau livre
но́вое окно́|une nouvelle fenêtre
большо́й го́род|une grande ville
ма́ленькая ко́мната|une petite pièce
краси́вая у́лица|une belle rue`,[['___ книга','новая','новый','новое','Книга est féminin : новая.'],['___ окно','новое','новая','новый','Окно est neutre : новое.']]);
add(3,'En ville','Chercher une gare, un magasin ou une rue.','Где…? demande une position. Где находится…? = Où se trouve… ?\nСправа = à droite ; слева = à gauche ; прямо = tout droit.\n« Où est la gare ? » : Где вокзал? Pour demander un trajet : Как пройти к вокзалу?',`вокза́л|gare
магази́н|magasin
у́лица|rue
спра́ва|à droite
сле́ва|à gauche
пря́мо|tout droit`,[['___ вокзал? (Où est la gare ?)','Где','Кто','Когда','Где demande la position.']],{ru:'— Где магазин?\n— Идите прямо. Магазин справа.\n— Спасибо!',fr:'— Où est le magasin ?\n— Allez tout droit. Le magasin est à droite.\n— Merci !',question:'De quel côté est le magasin ?',answer:'À droite.',choices:['À droite.','À gauche.','Derrière la gare.']});
add(3,'Les transports','Demander un billet et comprendre un départ.','Мне нужен билет = Il me faut un billet. Нужен s’accorde avec билет ; нужна avec карта.\nВ Москву indique la destination ; в Москве la position.\nИдти concerne un déplacement à pied en cours ; ехать un déplacement en véhicule en cours.',`по́езд|train
авто́бус|bus
метро́|métro
биле́т|billet
Мне ну́жен биле́т|Il me faut un billet
Я е́ду в Москву́|Je vais à Moscou (en véhicule)`,[['Я еду ___ Москву.','в','из','о','В + accusatif exprime ici la destination.'],['Мне ___ билет.','нужен','нужна','нужно','Билет est masculin : нужен.']]);
add(3,'Au café et au restaurant','Commander et demander l’addition.','Можно…? = Est-ce possible / Puis-je avoir… ? C’est une façon simple de commander.\nМожно чай, пожалуйста? = Un thé, s’il vous plaît ?\nЯ хочу заказать… = Je voudrais commander… ; Счёт, пожалуйста = L’addition, s’il vous plaît.',`ме́ню|menu
Счёт, пожа́луйста|L’addition, s’il vous plaît
Мо́жно чай?|Puis-je avoir un thé ?
Я хочу́ заказа́ть суп|Je voudrais commander une soupe
вку́сно|c’est bon (au goût)
без са́хара|sans sucre`,[['Чай ___ сахара. (sans)','без','на','о','Без est suivi du génitif : сахара.']],{ru:'— Можно кофе без сахара?\n— Конечно. Что ещё?\n— Суп, пожалуйста.',fr:'— Puis-je avoir un café sans sucre ?\n— Bien sûr. Quoi d’autre ?\n— Une soupe, s’il vous plaît.',question:'Comment la personne veut-elle son café ?',answer:'Sans sucre.',choices:['Sans sucre.','Avec du lait.','Elle commande du thé.']});
add(3,'Faire des achats','Demander un prix et choisir.','Сколько стоит…? = Combien coûte… ? Au pluriel : Сколько стоят…?\nЭто дорого = C’est cher ; Это дёшево = C’est bon marché.\nМожно оплатить картой? = Puis-je payer par carte ? Картой est à l’instrumental.',`Ско́лько сто́ит?|Combien ça coûte ?
до́рого|cher
дёшево|bon marché
Я беру́ э́то|Je prends ceci
Мо́жно оплати́ть ка́ртой?|Puis-je payer par carte ?
наличными|en espèces`,[['Сколько ___ билет?','стоит','стоят','стоить','Un seul billet : стоит.'],['Сколько ___ билеты?','стоят','стоит','стоить','Plusieurs billets : стоят.']]);
add(3,'Météo et santé','Décrire le temps et une douleur simple.','Pour la météo : Сегодня холодно = Il fait froid aujourd’hui.\nУ меня болит голова = J’ai mal à la tête. Avec plusieurs parties du corps : болят.\nМне плохо = Je me sens mal. Ces expressions servent à communiquer, pas à établir un diagnostic.',`хо́лодно|il fait froid
тепло́|il fait doux / chaud
дождь|pluie
снег|neige
У меня́ боли́т голова́|J’ai mal à la tête
Мне ну́жен врач|Il me faut un médecin`,[['У меня ___ голова.','болит','болят','болеть','Голова est singulier : болит.'],['Сегодня ___. (il fait froid)','холодно','снег','дождь','Холодно décrit la sensation de froid.']]);
add(4,'Où ? Le prépositionnel','Distinguer être dans un lieu et aller vers lui.','Pour la position : в / на + prépositionnel. Москва → в Москве ; работа → на работе ; дом → в доме.\nPour la destination : в / на + accusatif. Я еду в Москву ; Я иду на работу.\nО + prépositionnel signifie « à propos de » : о семье. Le choix entre в et на s’apprend avec le lieu.',`в Москве́|à Moscou
на рабо́те|au travail
в магази́не|dans le magasin
о семье́|à propos de la famille
Я живу́ в го́роде|J’habite en ville
Я иду́ на рабо́ту|Je vais au travail (à pied)`,[['Я живу в ___.','Москве','Москву','Москва','La position exige le prépositionnel : Москве.'],['Я иду на ___.','работу','работе','работа','La destination exige l’accusatif : работу.']]);
add(4,'Possession et absence','Employer у меня et нет avec le génitif.','У меня есть… = J’ai… ; У меня нет… = Je n’ai pas…\nAprès нет, le nom est au génitif : время → времени, билет → билета, вода → воды.\nМного demande aussi le génitif : много времени, много книг. Apprends progressivement les formes, car certaines sont irrégulières.',`У меня́ есть кни́га|J’ai un livre
У меня́ нет вре́мени|Je n’ai pas le temps
У меня́ нет биле́та|Je n’ai pas de billet
мно́го книг|beaucoup de livres
мало вре́мени|peu de temps
без воды́|sans eau`,[['У меня нет ___. (billet)','билета','билет','билету','Après нет : génitif, билета.'],['Без ___. (eau)','воды','вода','воду','Après без : génitif, воды.']]);
add(4,'Aimer et avoir besoin','Utiliser мне / тебе et нравится.','Мне нравится… = J’aime… ; littéralement « cela me plaît ». L’objet aimé est le sujet.\nМне нравится книга, mais Мне нравятся книги.\nМне = à moi ; тебе = à toi ; ему = à lui ; ей = à elle. Мне нужно работать = Il faut que je travaille.',`Мне нра́вится му́зыка|J’aime la musique
Мне нра́вятся кни́ги|J’aime les livres
Тебе́ нра́вится чай?|Aimes-tu le thé ?
Мне ну́жно рабо́тать|Il faut que je travaille
ему́|à lui
ей|à elle`,[['Мне ___ книги.','нравятся','нравится','нравиться','Книги est pluriel : нравятся.'],['___ нравится музыка. (à moi)','Мне','Я','Меня','La personne qui aime est au datif : мне.']]);
add(4,'Raconter hier','Construire le passé avec le genre du sujet.','Au passé, le verbe s’accorde avec le genre et le nombre : работал (masculin), работала (féminin), работало (neutre), работали (pluriel).\nЯ был дома si le locuteur est un homme ; Я была дома si c’est une femme.\nLe passé ne varie pas selon je / tu : ты работал, он работал.',`Вчера́ я рабо́тал|Hier, j’ai travaillé (homme)
Она́ рабо́тала|Elle a travaillé
Мы рабо́тали|Nous avons travaillé
Я был до́ма|J’étais à la maison (homme)
Я чита́л кни́гу|Je lisais un livre (homme)
Я смотре́л фильм|J’ai regardé un film (homme)`,[['Она вчера ___.','работала','работал','работали','Она est féminin : работала.'],['Мы вчера ___.','работали','работал','работала','Мы est pluriel : работали.']],{ru:'Вчера Анна была дома. Она читала книгу. Вечером она смотрела фильм.',fr:'Hier, Anna était à la maison. Elle lisait un livre. Le soir, elle a regardé un film.',question:'Où était Anna hier ?',answer:'À la maison.',choices:['À la maison.','Au travail.','À la gare.']});
add(4,'Projets et aspect','Distinguer une activité et son résultat.','L’imperfectif décrit une activité, une habitude ou son déroulement ; le perfectif présente un événement comme un tout, souvent avec un résultat.\nЯ читал книгу = je lisais / j’ai lu (activité). Я прочитал книгу = j’ai lu le livre jusqu’au bout.\nFutur imperfectif : Я буду читать. Futur perfectif : Я прочитаю. Les formes perfectives ressemblant au présent expriment un futur.',`Я бу́ду чита́ть|Je lirai (activité)
Я прочита́ю кни́гу|Je lirai le livre jusqu’au bout
Я чита́л кни́гу|Je lisais un livre
Я прочита́л кни́гу|J’ai fini de lire le livre
Я бу́ду рабо́тать|Je travaillerai
За́втра я отдыха́ю|Demain, je me repose`,[['Я ___ читать завтра.','буду','был','была','Буду + infinitif imperfectif forme le futur.'],['J’ai fini le livre : Я ___ книгу.','прочитал','читал','читаю','Прочитал présente la lecture achevée.']]);
add(5,'Loisirs et invitations','Proposer une sortie et répondre.','Давай + verbe (avec un proche) propose une action commune. Давай пойдём в кино!\nТы хочешь…? = Veux-tu… ? Pour accepter : С удовольствием!\nЧтобы exprime un but, mais commençons par des invitations courtes et claires.',`Я люблю́ чита́ть|J’aime lire
Дава́й пойдём в кино́|Allons au cinéma
Ты хо́чешь гуля́ть?|Veux-tu te promener ?
С удово́льствием|Avec plaisir
Я не могу́ сего́дня|Je ne peux pas aujourd’hui
Дава́й за́втра|On fait ça demain`,[['Ты ___ гулять?','хочешь','хочу','хочет','Avec ты : хочешь.']],{ru:'— Давай пойдём в кино сегодня!\n— Я не могу сегодня. Давай завтра.\n— Хорошо. Завтра в семь.',fr:'— Allons au cinéma aujourd’hui !\n— Je ne peux pas aujourd’hui. Faisons ça demain.\n— D’accord. Demain à sept heures.',question:'Quand vont-ils au cinéma ?',answer:'Demain à sept heures.',choices:['Demain à sept heures.','Aujourd’hui à sept heures.','Demain le matin.']});
add(5,'Donner son avis','Relier tes idées avec parce que et mais.','Я думаю, что… = Je pense que…\nПотому что introduit une cause ; поэтому une conséquence ; но une opposition ; если une condition.\nЯ учу русский, потому что мне нравится этот язык. = J’apprends le russe parce que j’aime cette langue.',`Я ду́маю, что э́то интере́сно|Je pense que c’est intéressant
потому́ что|parce que
поэ́тому|c’est pourquoi
но|mais
е́сли|si
Мне ка́жется, что э́то хорошо́|Il me semble que c’est bien`,[['Я учу русский, ___ мне нравится этот язык.','потому что','но','если','Потому что donne la raison.'],['Я устал, ___ я отдыхаю.','поэтому','потому что','если','Поэтому introduit la conséquence : je me repose.']]);
add(5,'Comparer et accompagner','Dire mieux, plus et avec quelqu’un.','Лучше = mieux ; хуже = moins bien ; больше = plus / plus grand ; меньше = moins / plus petit.\nЧем permet de comparer : Этот дом больше, чем мой.\nС + instrumental exprime l’accompagnement : с другом, с сестрой. Le même cas apparaît dans travailler comme : Я работаю инженером.',`лу́чше|mieux
ху́же|moins bien / pire
бо́льше|plus / plus grand
ме́ньше|moins / plus petit
с дру́гом|avec un ami
с сестро́й|avec une sœur`,[['Я гуляю с ___. (ami)','другом','друг','друга','С pour l’accompagnement demande l’instrumental.'],['Этот дом больше, ___ мой.','чем','что','где','Чем introduit le deuxième terme de la comparaison.']]);
add(5,'Comprendre un petit récit','Lire un texte court et retrouver les informations.','Commence par identifier qui, où et quand. N’essaie pas de traduire chaque mot pour saisir le sens général.\nPuis repère les verbes : был / была (passé), живёт (présent), будет (futur).\nAprès lecture, résume le récit en une ou deux phrases simples.',`В вы́ходные|le week-end
по́сле рабо́ты|après le travail
пе́ред обе́дом|avant le déjeuner
Она́ живёт в Тюме́ни|Elle habite à Tioumen
Он прие́хал вчера́|Il est arrivé hier
Мы бу́дем до́ма|Nous serons à la maison`,[['Она ___ в Тюмени. (habite)','живёт','живу','живёшь','Avec она : живёт.']],{ru:'Анна живёт в Тюмени. Она работает в университете. Вчера после работы она гуляла с другом. В выходные она будет дома и будет читать книгу.',fr:'Anna habite à Tioumen. Elle travaille à l’université. Hier, après le travail, elle s’est promenée avec un ami. Le week-end, elle sera à la maison et lira un livre.',question:'Avec qui Anna s’est-elle promenée ?',answer:'Avec un ami.',choices:['Avec un ami.','Avec sa sœur.','Toute seule.']});
add(5,'Écrire de petits messages','Assembler une présentation et une invitation simples.','Un message court n’a pas besoin d’être compliqué : salue, donne une information, puis pose une question.\nПривет! Я буду в городе завтра. Ты хочешь встретиться?\nDans les exercices, les phrases sont corrigées par comparaison avec un modèle. Pour une expression vraiment libre, demande ensuite à une personne russophone de corriger tes phrases.',`Приве́т, как дела́?|Salut, comment ça va ?
Я бу́ду в го́роде за́втра|Je serai en ville demain
Ты хо́чешь встре́титься?|Veux-tu qu’on se retrouve ?
Дава́й встре́тимся в семь|Retrouvons-nous à sept heures
Напиши́ мне|Écris-moi
До встре́чи|À bientôt`,[['Давай ___ в семь.','встретимся','встретиться','встреча','Après давай, встретимся propose ici une rencontre commune.']],{ru:'Привет! Я буду в городе завтра. Давай встретимся в семь в кафе. Напиши мне. До встречи!',fr:'Salut ! Je serai en ville demain. Retrouvons-nous à sept heures au café. Écris-moi. À bientôt !',question:'Où est proposé le rendez-vous ?',answer:'Au café.',choices:['Au café.','À l’université.','À la gare.']});
root.CURRICULUM={alphabet,chapters,lessons,version:3};if(typeof module!=='undefined')module.exports=root.CURRICULUM;
})(typeof window!=='undefined'?window:globalThis);
