 const translations = {
	"name": "Jméno",
	"charname": "Jméno postavy",
	"charnamePlaceholder": "Vyplň tu něco! Přece nechceš, aby to byl náhodný bezejmenný vidlák...",
	"race": "Rasa",
	"class": "Povolání",
	"level": "Úroveň",
	"levelLow": "úroveň",
	"sex": "Pohlaví",
	"sexPopover": "Pokud zvolíš Žena, započítají se opravy pro ženy podle rasy z tabulky v PPH",
	"note": "Poznámka",
	"notePlaceholder": "Když si poznámky napíšeš tady, můžeš si je v klidu vytisknout.",
	"default-name": "Bezejmenný vidlák č.",
	"human": "Člověk",
	"mountaineer": "Horal",
	"elf": "Elf",
	"greenElf": "Zelený elf",
	"darkElf": "Temný elf",
	"dwarf": "Trpaslík",
	"mountainDwarf": "Horský trpaslík",
	"hobbit": "Hobit",
	"kroll": "Kroll",
	"wildKroll": "Divoký Kroll",
	"orc": "Skřet",
	"hobgoblin": "Skurut",
	"goblin": "Goblin",
	"warrior": "Bojovník",
	"sorcerer": "Čaroděj",
	"rogue": "Zloděj",
	"ranger": "Hraničář",
	"theurge": "Theurg",
	"cleric": "Kněz",
	"male": "Muž",
	"female": "Žena",
	"screenCharacter": "1. Volba postavy",
	"screenBackground": "2. Zázemí",
	"screenAbilities": "3. Vlastnosti",
	"screenSkills": "4. Dovednosti",
	"screenWeapons": "5. Zbraně",
	"screenArmors": "6. Zbroje",
	"screenExport": "7. Export a tisk",
	"previousStep": "Zpět",
	"nextStep": "Pokračovat",
	"autoFillHeader": "Zrychlená volba",
	"autoFillBackground": "Chci maximum bodů do vlastností a dovedností (a být chudým sirotkem)",
	"autoFillAbilities": "Chci předvyplnit vlastnosti podle nejlepšího doporučení Sfér.",
	"autoFillAbilitiesClass1": "U povolání",
	"autoFillAbilitiesClass2": "budou přednostně zvyšovány vlastnosti v pořadí:",
	"autoFillAbilitiesFalse": "Bojové zaměření",
	"combat": "Bojový",
	"autoFillAbilitiesTrue": "Nebojové zaměření",
	"autoFillSkills": "Chci předvyplnit Psychické a Kombinované dovednosti podle nejlepšího doporučení Sfér.",
	"autoFillSkillsInfo1": "Přednostně budou zvyšovány dovednosti v pořadí:",
	"autoFillWeapons": "Chci přidat nejtěžší zbraň, jakou unesu bez postihu, z každé zbraňové kategorie, ke které mám dovednost aspoň na 1. stupni.",
	"nonCombat": "Nebojový",
	"backgroundPanelHeader": "Body zázemí",
	"backgroundPanelBody": "Volba zázemí má vliv na body do hlavních a vedlejších vlastností a také na obecné dovednosti. Kromě toho také samozřejmě na příběh tvé postavy - zde je důležité domluvit se se svým PJ.",
	"backgroundPanelLi1": "Než si zvolíš šlechtický původ, ujisti se, že jej můžeš ve hře využít.",
	"backgroundPanelLi2": "Než si zvolíš bohatou postavu, ujisti se, že váš příběh nebude začínat ve vězení.",
	"backgroundPanelLi3": "Než si zvolíš být sirotkem s jedním zlaťákem v kapse, uvědom si, že než začne dobrodružství, budeš muset pracovat na poli nebo krást.",
	"backgroundPanelRangeLimit": "Body v Majetku a v Dovednostech mohou být maximálně o 3 vyšší než Původ.",
	"backgroundPanelTableTh1": "Zázemí",
	"backgroundPanelTableTh2": "Hl. vlastnosti",
	"backgroundPanelTableTh3": "Vedl. vlastnosti",
	"backgroundPanelTableTh4": "Body zázemí",
	"backgroundHeader": "Rozdělení bodů zázemí",
	"backgroundHeaderPopover": "Volba zázemí má vliv na body do vlastností.",
	"goodAbility": "Výjimečné vlastnosti",
	"combinationBackground": "Kombinace vlastností a zázemí",
	"goodBackground": "Dobré zázemí",
	"distributeLeft": "Zbývá rozdělit",
	"from": "z",
	"points": "bodů",
	"distributeBackgroundPopover": "Věnuj pozornost hlavně tabulce Dovednosti, na jejím základě můžeš později rozdělit dovednostní body.",
	"origin": "Původ",
	"origin0": "Nalezenec",
	"origin1": "Sirotek",
	"origin2": "Z neúplné rodiny",
	"origin3": "Z pochybné rodiny",
	"origin4": "Ze slušné rodiny",
	"origin5": "Z dobré rodiny",
	"origin6": "Z velmi dobré a vlivné rodiny",
	"origin7": "Šlechtic",
	"origin8": "Šlechtic z dobrého rodu",
	"property": "Majetek",
	"property0": "1 zl",
	"property1": "3 zl",
	"property2": "10 zl",
	"property3": "30 zl",
	"property4": "100 zl",
	"property5": "300 zl",
	"property6": "1000 zl",
	"property7": "3000 zl",
	"property8": "10000 zl",
	"skills": "Dovednosti",
	"strength": "Síla",
	"dexterity": "Obratnost",
	"manualdexterity": "Zručnost",
	"will": "Vůle",
	"intelligence": "Inteligence",
	"charisma": "Charisma",
	"strengthAbbr": "SIL",
	"dexterityAbbr": "OBR",
	"manualdexterityAbbr": "ZRČ",
	"willAbbr": "VOL",
	"intelligenceAbbr": "INT",
	"charismaAbbr": "CHR",
	"PanelErrataHeader": "Je libo errata?",
	"PanelErrataTextBackground": "Pravidlo, že při tvorbě postavy smí hráč dát do dovedností nebo majetku nejvýše o 3 body víc než do původu neplatí, pokud je hráč schopný obhájit rozdělení bodů původem postavy.",
	"PanelErrataTextWeaponSkillsDegree": "Bojovník se může od druhé úrovně naučit 4., 5. a 6. stupeň dovednosti Boj se zbraní. Dostává následující bonusy:",
	"PanelErrataTrue": "Použít errata",
	"PanelErrataFalse": "Nie, radšej knihu (pravidel)",
	"resistance": "Odolnost",
	"fortitude": "Výdrž",
	"speed": "Rychlost",
	"senses": "Smysly",
	"beauty": "Krása",
	"danger": "Nebezpečnost",
	"dignity": "Důstojnost",
	"combatSpeed": "Boj",
	"attack": "Útok",
	"shoot": "Střelba",
	"defense": "Obrana",
	"health": "Mez zranění",
	"levelAbilitiesRace": "Základ (rasa)",
	"levelAbilitiesClass": "Hl. vlastnosti povolání",
	"levelAbilitiesBackground": "Zázemí",
	"levelAbilitiesPopoverTitle": "Moudře vybírej!",
	"levelAbilitiesPopover": "Tímto smažeš tuto a všechny následující úrovně",
	"levelAbilitiesAlertTitle": "Není cesty zpět!",
	"levelAbilitiesAlert": "Pokud na předcházejících záložkách změníš cokoliv (kromě jména a poznámky), veškeré nastavení na této a všech dalších záložkách bude vymazáno. Pokud nejsi s postavou spokojen, proveď změny dříve, než tady začneš na něco klikat.",
	"abilitiesPanelHeader": "Určení základních vlastností",
	"abilitiesPanelBody": "Rozděl body získané zázemím a případně postupuj po úrovních.",
	"abilitiesPanelLi1": "Při počátečním vytváření postavy nelze zvýšit základní hodnotu z Tabulky ras opravené o pohlaví o více než 3 .",
	"abilitiesPanelLi2": "Hlavní vlastnost můžeš zvýšit maximálně 2x za sebou",
	"abilitiesPanelLi3": "Vedlejší vlastnost můžeš zvýšit maximálně 1x za sebou",
	"charOrigin": "Původ postavy",
	"skillsPanelHeader": "Body dovedností",
	"skillsPanelBody": "Rozděl body do dovedností. Kategorie Bojové spadá pod kategorii Fyzické, tzn. všechny Fyzické body lze uplatnit i pro Bojové dovednosti.",
	"skillsPanelBodyWarrior": "Body, které získal Bojovník navíc (pouze pro Bojové dovednosti)",
	"skillsPanelTableTh1": "Zdroj bodů",
	"degree": "Stupeň",
	"combat": "Bojové",
	"physical": "Fyzické",
	"psychical": "Psychické",
	"combined": "Kombinované",
	"leveling": "Postup po úrovních",
	"totalPoints": "Celkem bodů",
	"athletics": "Atletika",
	"fightWithWeapon": "Boj se zbraní",
	"riding": "Jezdectví",
	"blacksmithing": "Kovářství",
	"aviation": "Letectví",
	"seamanship": "Námořnictví",
	"wearingArmor": "Nošení zbroje",
	"boatControl": "Ovládání loďky",
	"swimming": "Plavání",
	"movementInMountains": "Pohyb v horách",
	"movementInForrest": "Pohyb v lese",
	"movementInCity": "Pohyb ve městě",
	"usingShield": "Používání štítu",
	"fastMarch": "Rychlý pochod",
	"driving": "Řízení vozu",
	"climbing": "Šplh a lezení",
	"astronomy": "Astronomie",
	"mythology": "Bájesloví",
	"botanics": "Botanika",
	"foreignLanguage": "Cizí jazyk",
	"readingAndWriting": "Čtení/psaní",
	"history": "Dějeprava",
	"underworldEtiquette": "Etiketa podsvětí",
	"mapDrawing": "Kreslení map",
	"socialEtiquette": "Společenská etiketa",
	"technology": "Technologie",
	"theology": "Teologie",
	"magicalObjectsManipulation": "Zacházení s mag. předměty",
	"geography": "Zeměpis",
	"cityKnowledge": "Znalost města",
	"worldKnowledge": "Znalost světa",
	"zoology": "Zoologie",
	"fightWithShootingWeapons": "Boj se střelnými zbraněmi",
	"herbalism": "Bylinkářství",
	"gambling": "Hazardní hry",
	"acting": "Herectví",
	"playingAMusicalInstrument": "Hra na hudební nástroj",
	"hunting": "Lov a rybolov",
	"painting": "Malování",
	"firstAid": "První pomoc",
	"handwork": "Ruční práce",
	"sculpture": "Sochařství",
	"seduction": "Svádění",
	"brightVision": "Šerozrakost",
	"dancing": "Tanec",
	"knotting": "Uzlování",
	"cooking": "Vaření",
	"largeHandwork": "Velké ruční práce",
	"pedagogy": "Vychovatelství",
	"teaching": "Vyučování",
	"animalTreatment": "Zacházení se zvířaty",
	"singing": "Zpěv",
	"noWeapon": "Beze zbraně",
	"knives": "Nože a dýky",
	"axes": "Sekery",
	"sabers": "Šavle a tesáky",
	"swords": "Meče",
	"maces": "Palice a kyje",
	"flails": "Řemdihy a bijáky",
	"spears": "Hole a kopí",
	"tridents": "Sudlice a trojzubce",
	"thrownWeapons": "Vrhací zbraně",
	"combatSpeedNumber": "BČ",
	"attackNumber": "ÚČ",
	"defenseNumber": "OČ",
	"cover": "Kryt",
	"damageNumber": "ZZ",
	"hand": "Ruka",
	"hobnailedGauntlet": "Okovaná rukavice",
	"combatGauntlet": "Rukavice s hřeby",
	"foot": "Noha",
	"hobnailedBoot": "Okovaná bota",
	"body": "Tělo",
	"head": "Hlava",
	"knife": "Nůž",
	"longKnife": "Dlouhý nůž",
	"dagger": "Dýka",
	"stabDagger": "Bodná dýka",
	"curvedKnife": "Zakřivený nůž",
	"toothedDagger": "Zubatá dýka",
	"longDagger": "Dlouhá dýka",
	"longToothedDagger": "Dlouhá zubatá dýka",
	"lightAxe": "Lehká sekera",
	"axe": "Sekera",
	"warAxe": "Válečná sekera",
	"twohandedAxe": "Obouruční sekera",
	"doublesidedAxe": "Dvoubřitá sekera",
	"doublesidedTwohandedAxe": "Dvoubřitá obouruční sekera",
	"machete": "Mačeta",
	"fang": "Tesák",
	"lightSaber": "Lehká šavle",
	"saber": "Šavle",
	"toothedSaber": "Zubatá šavle",
	"heavySaber": "Těžká šavle",
	"warSaber": "Válečná šavle",
	"shortSword": "Krátký meč",
	"shortWideSword": "Krátký široký meč",
	"wideSword": "Široký meč",
	"longSword": "Dlouhý meč",
	"oneandahalfSword": "Jedenapůlroční meč",
	"barbarianSword": "Barbarský meč",
	"twohandedSword": "Obouruční meč",
	"fierySword": "Plamenný meč",
	"giantSword": "Obří meč",
	"baton": "Obušek",
	"club": "Kyj",
	"hobnailedClub": "Okovaný kyj",
	"lightMace": "Lehký palcát",
	"heavyClub": "Těžký kyj",
	"mace": "Palcát",
	"warHammer": "Válečné kladivo",
	"twohandedClub": "Obouruční kyj",
	"ironClub": "Železný kyj",
	"heavySledge": "Těžký perlík",
	"warSledge": "Bitevní perlík",
	"giantHammer": "Obří kladivo",
	"lightRingflail": "Lehký biják",
	"ringflail": "Biják",
	"heavyRingflail": "Těžký biják",
	"threeheadedRingflail": "Trojhlavý biják",
	"woodenflail": "Cep",
	"flail": "Řemdih",
	"hobnailedWoodenflail": "Okovaný cep",
	"heavyFlail": "Těžký řemdih",
	"threeheadedWoodenflail": "Trojhlavý řemdih",
	"lightStaff": "Lehká hůl",
	"lightSpear": "Lehké kopí",
	"hobnailedStaff": "Okovaná hůl",
	"heavyHobnailedStaff": "Těžká kovaná hůl",
	"spear": "Kopí",
	"metalStaff": "Kovová hůl",
	"longSpear": "Dlouhé kopí",
	"steelLongStaff": "Ocelová dlouhá hůl",
	"pike": "Píka",
	"steelSpear": "Ocelové kopí",
	"pitchfork": "Vidle",
	"lightGuisarme": "Lehká sudlice",
	"lightTrident": "Lehký trojzubec",
	"halberd": "Halapartna",
	"heavyGuisarme": "Těžká sudlice",
	"heavyTrident": "Těžký trojzubec",
	"heavyHalberd": "Těžká halapartna",
	"warTrident": "Bitevní trojzubec",
	"warHalberd": "Válečná halapartna",
	"weapon": "Zbraň",
	"hold": "Držení",
	"onehanded": "Jednoruční",
	"onehandedAbbr": "Jednor.",
	"twohanded": "Obouruční",
	"twohandedAbbr": "Obour.",
	"necessaryStrength": "Potř. síla",
	"length": "Délka",
	"weaponAttack": "Útočnost zbraně",
	"weaponAttackAbbr": "Útoč.",
	"weaponDamage": "Zran.",
	"weaponPanelHeader": "Zbraně pro boj zblízka",
	"weaponPanelLi1": "Při kliknutí na jednoruční zbraň se automaticky doplní i obouruční držení. ",
	"weaponPanelLi2": "Zbraně, u kterých získáš postih za chybějící sílu, jsou vypsány světlejším písmem.",
	"showCharNumbersInWeaponTableFalse": "Zobrazit parametry zbraní",
	"showCharNumbersInWeaponTableTrue": "Spočítat pro postavu",
	"debugBoxTitle": "přehled výpočtů",
	"sexCorrection": "Opravy podle pohlaví",
	"levelingAndBackground": "Zázemí a postup po úrovních",
	"total": "Celkem",
	"derivedAbilitiesBase": "Základ (podle hl. vlastností)",
	"raceCorrection": "Oprava za rasu",
	"weaponLength": "Délka zbraně",
	"weaponCover": "Kryt zbraně",
	"missingStrengthCorrection": "Oprava za chybějící sílu",
	"missingSkillCorrection": "Oprava za stupeň dovednosti",
	"damageNumberFromTable": "Průnik Síly a Zranění zbraně",
	"twohandedCorrection": "Oprava za obouruční držení",
	"armorPanelHeader": "Zbroje",
	"armorPanelLi1": "Zbroje, u kterých získáš postih za chybějící sílu, jsou vypsány světlejším písmem.",
	"bodyArmors": "Zbroje",
	"armor": "Zbroj",
	"helmets": "Přilby",
	"limitation": "Omezení",
	"protection": "Ochrana",
	"noArmor": "Beze zbroje",
	"paddedArmor": "Prošívaná",
	"leatherArmor": "Kožená",
	"patchworkArmor": "Pobíjená",
	"ringArmor": "Kroužková",
	"scaledArmor": "Šupinová",
	"platedArmor": "Plátová",
	"fullPlatedArmor": "Plná plátová",
	"noHelmet": "Bez pokrývky hlavy",
	"leatherCap": "Kožená čapka",
	"rignHelmet": "Kroužková kukla",
	"conicalHelmet": "Konická",
	"fullHelmet": "Plná",
	"potHelmet": "Hrncová",
	"greatHelmet": "Kbelcová",
	"armorHeightType": "Postih k Obr.",
};

export default translations;
