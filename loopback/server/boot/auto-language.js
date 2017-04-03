module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('language', function(err) {

    if (err) throw err;

    // app.models.term.create([], function(err, terms) {
    //   if (err) throw err;
    //   console.log('Models created: \n', terms);
    // });

    app.models.language.create([
      {
        "acronym": "ab",
        "language_name": "Abkhaz",
        "native_name": "аҧсуа"
      }, {
        "acronym": "aa",
        "language_name": "Afar",
        "native_name": "Afaraf"
      }, {
        "acronym": "af",
        "language_name": "Afrikaans",
        "native_name": "Afrikaans"
      }, {
        "acronym": "ak",
        "language_name": "Akan",
        "native_name": "Akan"
      }, {
        "acronym": "sq",
        "language_name": "Albanian",
        "native_name": "Shqip"
      }, {
        "acronym": "am",
        "language_name": "Amharic",
        "native_name": "አማርኛ"
      }, {
        "acronym": "ar",
        "language_name": "Arabic",
        "native_name": "العربية"
      }, {
        "acronym": "an",
        "language_name": "Aragonese",
        "native_name": "Aragonés"
      }, {
        "acronym": "hy",
        "language_name": "Armenian",
        "native_name": "Հայերեն"
      }, {
        "acronym": "as",
        "language_name": "Assamese",
        "native_name": "অসমীয়া"
      }, {
        "acronym": "av",
        "language_name": "Avaric",
        "native_name": "авар мацӀ, магӀарул мацӀ"
      }, {
        "acronym": "ae",
        "language_name": "Avestan",
        "native_name": "avesta"
      }, {
        "acronym": "ay",
        "language_name": "Aymara",
        "native_name": "aymar aru"
      }, {
        "acronym": "az",
        "language_name": "Azerbaijani",
        "native_name": "azərbaycan dili"
      }, {
        "acronym": "bm",
        "language_name": "Bambara",
        "native_name": "bamanankan"
      }, {
        "acronym": "ba",
        "language_name": "Bashkir",
        "native_name": "башҡорт теле"
      }, {
        "acronym": "eu",
        "language_name": "Basque",
        "native_name": "euskara, euskera"
      }, {
        "acronym": "be",
        "language_name": "Belarusian",
        "native_name": "Беларуская"
      }, {
        "acronym": "bn",
        "language_name": "Bengali",
        "native_name": "বাংলা"
      }, {
        "acronym": "bh",
        "language_name": "Bihari",
        "native_name": "भोजपुरी"
      }, {
        "acronym": "bi",
        "language_name": "Bislama",
        "native_name": "Bislama"
      }, {
        "acronym": "bs",
        "language_name": "Bosnian",
        "native_name": "bosanski jezik"
      }, {
        "acronym": "br",
        "language_name": "Breton",
        "native_name": "brezhoneg"
      }, {
        "acronym": "bg",
        "language_name": "Bulgarian",
        "native_name": "български език"
      }, {
        "acronym": "my",
        "language_name": "Burmese",
        "native_name": "ဗမာစာ"
      }, {
        "acronym": "ca",
        "language_name": "Catalan",
        "native_name": "Català"
      }, {
        "acronym": "ch",
        "language_name": "Chamorro",
        "native_name": "Chamoru"
      }, {
        "acronym": "ce",
        "language_name": "Chechen",
        "native_name": "нохчийн мотт"
      }, {
        "acronym": "ny",
        "language_name": "Nyanja",
        "native_name": "chiCheŵa, chinyanja"
      }, {
        "acronym": "zh",
        "language_name": "Chinese",
        "native_name": "中文 (Zhōngwén), 汉语, 漢語"
      }, {
        "acronym": "cv",
        "language_name": "Chuvash",
        "native_name": "чӑваш чӗлхи"
      }, {
        "acronym": "kw",
        "language_name": "Cornish",
        "native_name": "Kernewek"
      }, {
        "acronym": "co",
        "language_name": "Corsican",
        "native_name": "corsu, lingua corsa"
      }, {
        "acronym": "cr",
        "language_name": "Cree",
        "native_name": "ᓀᐦᐃᔭᐍᐏᐣ"
      }, {
        "acronym": "hr",
        "language_name": "Croatian",
        "native_name": "hrvatski"
      }, {
        "acronym": "cs",
        "language_name": "Czech",
        "native_name": "česky, čeština"
      }, {
        "acronym": "da",
        "language_name": "Danish",
        "native_name": "dansk"
      }, {
        "acronym": "dv",
        "language_name": "Divehi-Maldivian",
        "native_name": "ދިވެހި"
      }, {
        "acronym": "nl",
        "language_name": "Dutch",
        "native_name": "Nederlands, Vlaams"
      }, {
        "acronym": "en",
        "language_name": "English",
        "native_name": "English"
      }, {
        "acronym": "en-us",
        "language_name": "English-USA",
        "native_name": "English USA"
      }, {
        "acronym": "en-au",
        "language_name": "English-Australia",
        "native_name": "English Australia"
      }, {
        "acronym": "en-uk",
        "language_name": "English-UK",
        "native_name": "English UK"
      }, {
        "acronym": "en-ir",
        "language_name": "English-Ireland",
        "native_name": "English Ireland"
      }, {
        "acronym": "en-sc",
        "language_name": "English-Scottland",
        "native_name": "English Scottland"
      }, {
        "acronym": "en-sa",
        "language_name": "English-South-Africa",
        "native_name": "English South Africa"
      }, {
        "acronym": "en-ca",
        "language_name": "English-Canada",
        "native_name": "English Canada"
      }, {
        "acronym": "eo",
        "language_name": "Esperanto",
        "native_name": "Esperanto"
      }, {
        "acronym": "et",
        "language_name": "Estonian",
        "native_name": "eesti, eesti keel"
      }, {
        "acronym": "ee",
        "language_name": "Ewe",
        "native_name": "Eʋegbe"
      }, {
        "acronym": "fo",
        "language_name": "Faroese",
        "native_name": "føroyskt"
      }, {
        "acronym": "fj",
        "language_name": "Fijian",
        "native_name": "vosa Vakaviti"
      }, {
        "acronym": "fi",
        "language_name": "Finnish",
        "native_name": "suomi, suomen kieli"
      }, {
        "acronym": "fr",
        "language_name": "French",
        "native_name": "français, langue française"
      }, {
        "acronym": "ff",
        "language_name": "Fula-Pular",
        "native_name": "Fulfulde, Pulaar, Pular"
      }, {
        "acronym": "gl",
        "language_name": "Galician",
        "native_name": "Galego"
      }, {
        "acronym": "ka",
        "language_name": "Georgian",
        "native_name": "ქართული"
      }, {
        "acronym": "de",
        "language_name": "German",
        "native_name": "Deutsch"
      }, {
        "acronym": "el",
        "language_name": "Greek",
        "native_name": "Ελληνικά"
      }, {
        "acronym": "gn",
        "language_name": "Guaraní",
        "native_name": "Avañeẽ"
      }, {
        "acronym": "gu",
        "language_name": "Gujarati",
        "native_name": "ગુજરાતી"
      }, {
        "acronym": "ht",
        "language_name": "Haitian-Creole",
        "native_name": "Kreyòl ayisyen"
      }, {
        "acronym": "ha",
        "language_name": "Hausa",
        "native_name": "Hausa, هَوُسَ"
      }, {
        "acronym": "he",
        "language_name": "Hebrew",
        "native_name": "עברית"
      }, {
        "acronym": "hz",
        "language_name": "Herero",
        "native_name": "Otjiherero"
      }, {
        "acronym": "hi",
        "language_name": "Hindi",
        "native_name": "हिन्दी, हिंदी"
      }, {
        "acronym": "ho",
        "language_name": "Hiri-Motu",
        "native_name": "Hiri Motu"
      }, {
        "acronym": "hu",
        "language_name": "Hungarian",
        "native_name": "Magyar"
      }, {
        "acronym": "ia",
        "language_name": "Interlingua",
        "native_name": "Interlingua"
      }, {
        "acronym": "id",
        "language_name": "Indonesian",
        "native_name": "Bahasa Indonesia"
      }, {
        "acronym": "ie",
        "language_name": "Interlingue",
        "native_name": "Originally called Occidental; then Interlingue after WWII"
      }, {
        "acronym": "ga",
        "language_name": "Irish",
        "native_name": "Gaeilge"
      }, {
        "acronym": "ig",
        "language_name": "Igbo",
        "native_name": "Asụsụ Igbo"
      }, {
        "acronym": "ik",
        "language_name": "Inupiaq",
        "native_name": "Iñupiaq, Iñupiatun"
      }, {
        "acronym": "io",
        "language_name": "Ido",
        "native_name": "Ido"
      }, {
        "acronym": "is",
        "language_name": "Icelandic",
        "native_name": "Íslenska"
      }, {
        "acronym": "it",
        "language_name": "Italian",
        "native_name": "Italiano"
      }, {
        "acronym": "iu",
        "language_name": "Inuktitut",
        "native_name": "ᐃᓄᒃᑎᑐᑦ"
      }, {
        "acronym": "ja",
        "language_name": "Japanese",
        "native_name": "日本語 (にほんご／にっぽんご)"
      }, {
        "acronym": "jv",
        "language_name": "Javanese",
        "native_name": "basa Jawa"
      }, {
        "acronym": "kl",
        "language_name": "Kalaallisut-Greenlandic",
        "native_name": "kalaallisut, kalaallit oqaasii"
      }, {
        "acronym": "kn",
        "language_name": "Kannada",
        "native_name": "ಕನ್ನಡ"
      }, {
        "acronym": "kr",
        "language_name": "Kanuri",
        "native_name": "Kanuri"
      }, {
        "acronym": "ks",
        "language_name": "Kashmiri",
        "native_name": "कश्मीरी, كشميري‎"
      }, {
        "acronym": "kk",
        "language_name": "Kazakh",
        "native_name": "Қазақ тілі"
      }, {
        "acronym": "km",
        "language_name": "Khmer",
        "native_name": "ភាសាខ្មែរ"
      }, {
        "acronym": "ki",
        "language_name": "Kikuyu-Gikuyu",
        "native_name": "Gĩkũyũ"
      }, {
        "acronym": "rw",
        "language_name": "Kinyarwanda",
        "native_name": "Ikinyarwanda"
      }, {
        "acronym": "ky",
        "language_name": "Kirghiz-Kyrgyz",
        "native_name": "кыргыз тили"
      }, {
        "acronym": "kv",
        "language_name": "Komi",
        "native_name": "коми кыв"
      }, {
        "acronym": "kg",
        "language_name": "Kongo",
        "native_name": "KiKongo"
      }, {
        "acronym": "ko",
        "language_name": "Korean",
        "native_name": "한국어 (韓國語), 조선말 (朝鮮語)"
      }, {
        "acronym": "ku",
        "language_name": "Kurdish",
        "native_name": "Kurdî, كوردی‎"
      }, {
        "acronym": "kj",
        "language_name": "Kwanyama-Kuanyama",
        "native_name": "Kuanyama"
      }, {
        "acronym": "la",
        "language_name": "Latin",
        "native_name": "latine, lingua latina"
      }, {
        "acronym": "lb",
        "language_name": "Luxembourgish",
        "native_name": "Lëtzebuergesch"
      }, {
        "acronym": "lg",
        "language_name": "Luganda",
        "native_name": "Luganda"
      }, {
        "acronym": "li",
        "language_name": "Limburgish",
        "native_name": "Limburgs"
      }, {
        "acronym": "ln",
        "language_name": "Lingala",
        "native_name": "Lingála"
      }, {
        "acronym": "lo",
        "language_name": "Lao",
        "native_name": "ພາສາລາວ"
      }, {
        "acronym": "lt",
        "language_name": "Lithuanian",
        "native_name": "lietuvių kalba"
      }, {
        "acronym": "lu",
        "language_name": "Luba-Katanga",
        "native_name": "Luba-Katanga"
      }, {
        "acronym": "lv",
        "language_name": "Latvian",
        "native_name": "latviešu valoda"
      }, {
        "acronym": "gv",
        "language_name": "Manx",
        "native_name": "Gaelg, Gailck"
      }, {
        "acronym": "mk",
        "language_name": "Macedonian",
        "native_name": "македонски јазик"
      }, {
        "acronym": "mg",
        "language_name": "Malagasy",
        "native_name": "Malagasy fiteny"
      }, {
        "acronym": "ms",
        "language_name": "Malay",
        "native_name": "bahasa Melayu, بهاس ملايو‎"
      }, {
        "acronym": "ml",
        "language_name": "Malayalam",
        "native_name": "മലയാളം"
      }, {
        "acronym": "mt",
        "language_name": "Maltese",
        "native_name": "Malti"
      }, {
        "acronym": "mi",
        "language_name": "Maori",
        "native_name": "te reo Māori"
      }, {
        "acronym": "mr",
        "language_name": "Marathi",
        "native_name": "मराठी"
      }, {
        "acronym": "mh",
        "language_name": "Marshallese",
        "native_name": "Kajin M̧ajeļ"
      }, {
        "acronym": "mn",
        "language_name": "Mongolian",
        "native_name": "монгол"
      }, {
        "acronym": "na",
        "language_name": "Nauru",
        "native_name": "Ekakairũ Naoero"
      }, {
        "acronym": "nv",
        "language_name": "Navajo",
        "native_name": "Diné bizaad, Dinékʼehǰí"
      }, {
        "acronym": "nb",
        "language_name": "Norwegian-Bokmal",
        "native_name": "Norsk bokmål"
      }, {
        "acronym": "nd",
        "language_name": "North-Ndebele",
        "native_name": "isiNdebele"
      }, {
        "acronym": "ne",
        "language_name": "Nepali",
        "native_name": "नेपाली"
      }, {
        "acronym": "ng",
        "language_name": "Ndonga",
        "native_name": "Owambo"
      }, {
        "acronym": "nn",
        "language_name": "Norwegian-Nynorsk",
        "native_name": "Norsk nynorsk"
      }, {
        "acronym": "no",
        "language_name": "Norwegian",
        "native_name": "Norsk"
      }, {
        "acronym": "ii",
        "language_name": "Nuosu",
        "native_name": "ꆈꌠ꒿ Nuosuhxop"
      }, {
        "acronym": "nr",
        "language_name": "South-Ndebele",
        "native_name": "isiNdebele"
      }, {
        "acronym": "oc",
        "language_name": "Occitan",
        "native_name": "Occitan"
      }, {
        "acronym": "oj",
        "language_name": "Ojibwe",
        "native_name": "ᐊᓂᔑᓈᐯᒧᐎᓐ"
      }, {
        "acronym": "cu",
        "language_name": "Old-Slavonic",
        "native_name": "ѩзыкъ словѣньскъ"
      }, {
        "acronym": "om",
        "language_name": "Oromo",
        "native_name": "Afaan Oromoo"
      }, {
        "acronym": "or",
        "language_name": "Oriya",
        "native_name": "ଓଡ଼ିଆ"
      }, {
        "acronym": "os",
        "language_name": "Ossetian",
        "native_name": "ирон æвзаг"
      }, {
        "acronym": "pa",
        "language_name": "Panjabi",
        "native_name": "ਪੰਜਾਬੀ, پنجابی‎"
      }, {
        "acronym": "pi",
        "language_name": "Pali",
        "native_name": "पाऴि"
      }, {
        "acronym": "fa",
        "language_name": "Persian",
        "native_name": "فارسی"
      }, {
        "acronym": "pl",
        "language_name": "Polish",
        "native_name": "polski"
      }, {
        "acronym": "ps",
        "language_name": "Pashto",
        "native_name": "پښتو"
      }, {
        "acronym": "pt",
        "language_name": "Portuguese",
        "native_name": "Português"
      }, {
        "acronym": "pt-br",
        "language_name": "Portuguese-Brasil",
        "native_name": "Português Brasileiro"
      }, {
        "acronym": "pt-pt",
        "language_name": "Portuguese-Portugal",
        "native_name": "Português de Portugal"
      }, {
        "acronym": "pt-an",
        "language_name": "Portuguese-Angola",
        "native_name": "Português de Angola"
      }, {
        "acronym": "qu",
        "language_name": "Quechua",
        "native_name": "Runa Simi, Kichwa"
      }, {
        "acronym": "rm",
        "language_name": "Romansh",
        "native_name": "rumantsch grischun"
      }, {
        "acronym": "rn",
        "language_name": "Kirundi",
        "native_name": "kiRundi"
      }, {
        "acronym": "ro",
        "language_name": "Romanian",
        "native_name": "română"
      }, {
        "acronym": "mo",
        "language_name": "Moldavian",
        "native_name": "moldavian"
      }, {
        "acronym": "ru",
        "language_name": "Russian",
        "native_name": "русский язык"
      }, {
        "acronym": "sa",
        "language_name": "Sanskrit",
        "native_name": "संस्कृतम्"
      }, {
        "acronym": "sc",
        "language_name": "Sardinian",
        "native_name": "sardu"
      }, {
        "acronym": "sd",
        "language_name": "Sindhi",
        "native_name": "सिन्धी, سنڌي، سندھی‎"
      }, {
        "acronym": "se",
        "language_name": "Northern-Sami",
        "native_name": "Davvisámegiella"
      }, {
        "acronym": "sm",
        "language_name": "Samoan",
        "native_name": "gagana faa Samoa"
      }, {
        "acronym": "sg",
        "language_name": "Sango",
        "native_name": "yângâ tî sängö"
      }, {
        "acronym": "sr",
        "language_name": "Serbian",
        "native_name": "српски језик"
      }, {
        "acronym": "gd",
        "language_name": "Scottish-Gaelic",
        "native_name": "Gàidhlig"
      }, {
        "acronym": "sn",
        "language_name": "Shona",
        "native_name": "chiShona"
      }, {
        "acronym": "si",
        "language_name": "Sinhalese",
        "native_name": "සිංහල"
      }, {
        "acronym": "sk",
        "language_name": "Slovak",
        "native_name": "slovenčina"
      }, {
        "acronym": "sl",
        "language_name": "Slovene",
        "native_name": "slovenščina"
      }, {
        "acronym": "so",
        "language_name": "Somali",
        "native_name": "Soomaaliga, af Soomaali"
      }, {
        "acronym": "st",
        "language_name": "Southern-Sotho",
        "native_name": "Sesotho"
      }, {
        "acronym": "es",
        "language_name": "Spanish",
        "native_name": "Español, castellano"
      }, {
        "acronym": "es-sp",
        "language_name": "Spanish-Spain",
        "native_name": "Español España"
      }, {
        "acronym": "es-co",
        "language_name": "Spanish-Colombia",
        "native_name": "Español de Colombia"
      }, {
        "acronym": "es-mx",
        "language_name": "Spanish-Mexico",
        "native_name": "Español de Mexico"
      }, {
        "acronym": "es-ar",
        "language_name": "Spanish-Argentina",
        "native_name": "Español de Argentina"
      }, {
        "acronym": "es-dm",
        "language_name": "Spanish-Rep-Dominicana",
        "native_name": "Español de Rep Dominicana"
      }, {
        "acronym": "es-bo",
        "language_name": "Spanish-Bolivia",
        "native_name": "Español de Bolivia"
      }, {
        "acronym": "es-cu",
        "language_name": "Spanish-Cuba",
        "native_name": "Español de Cuba"
      }, {
        "acronym": "es-ur",
        "language_name": "Spanish-Uruguay",
        "native_name": "Español de Uruguay"
      }, {
        "acronym": "es-pa",
        "language_name": "Spanish-Paraguay",
        "native_name": "Español de Paraguay"
      }, {
        "acronym": "es-eq",
        "language_name": "Spanish-Equador",
        "native_name": "Español de Equador"
      }, {
        "acronym": "es-ch",
        "language_name": "Spanish-Chile",
        "native_name": "Español de Chile"
      }, {
        "acronym": "es-gu",
        "language_name": "Spanish-Guatemala",
        "native_name": "Español de Guatemala"
      }, {
        "acronym": "es-pr",
        "language_name": "Spanish-Puerto-Rico",
        "native_name": "Español de Puerto Rico"
      }, {
        "acronym": "su",
        "language_name": "Sundanese",
        "native_name": "Basa Sunda"
      }, {
        "acronym": "sw",
        "language_name": "Swahili",
        "native_name": "Kiswahili"
      }, {
        "acronym": "ss",
        "language_name": "Swati",
        "native_name": "SiSwati"
      }, {
        "acronym": "sv",
        "language_name": "Swedish",
        "native_name": "svenska"
      }, {
        "acronym": "ta",
        "language_name": "Tamil",
        "native_name": "தமிழ்"
      }, {
        "acronym": "te",
        "language_name": "Telugu",
        "native_name": "తెలుగు"
      }, {
        "acronym": "tg",
        "language_name": "Tajik",
        "native_name": "тоҷикӣ, toğikī, تاجیکی‎"
      }, {
        "acronym": "th",
        "language_name": "Thai",
        "native_name": "ไทย"
      }, {
        "acronym": "ti",
        "language_name": "Tigrinya",
        "native_name": "ትግርኛ"
      }, {
        "acronym": "bo",
        "language_name": "Tibetan",
        "native_name": "བོད་ཡིག"
      }, {
        "acronym": "tk",
        "language_name": "Turkmen",
        "native_name": "Türkmen, Түркмен"
      }, {
        "acronym": "tl",
        "language_name": "Tagalog",
        "native_name": "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
      }, {
        "acronym": "tn",
        "language_name": "Tswana",
        "native_name": "Setswana"
      }, {
        "acronym": "to",
        "language_name": "Tonga",
        "native_name": "faka Tonga"
      }, {
        "acronym": "tr",
        "language_name": "Turkish",
        "native_name": "Türkçe"
      }, {
        "acronym": "ts",
        "language_name": "Tsonga",
        "native_name": "Xitsonga"
      }, {
        "acronym": "tt",
        "language_name": "Tatar",
        "native_name": "татарча, tatarça, تاتارچا‎"
      }, {
        "acronym": "tw",
        "language_name": "Twi",
        "native_name": "Twi"
      }, {
        "acronym": "ty",
        "language_name": "Tahitian",
        "native_name": "Reo Tahiti"
      }, {
        "acronym": "ug",
        "language_name": "Uighur",
        "native_name": "Uyƣurqə, ئۇيغۇرچە‎"
      }, {
        "acronym": "uk",
        "language_name": "Ukrainian",
        "native_name": "українська"
      }, {
        "acronym": "ur",
        "language_name": "Urdu",
        "native_name": "اردو"
      }, {
        "acronym": "uz",
        "language_name": "Uzbek",
        "native_name": "zbek, Ўзбек, أۇزبېك‎"
      }, {
        "acronym": "ve",
        "language_name": "Venda",
        "native_name": "Tshivenḓa"
      }, {
        "acronym": "vi",
        "language_name": "Vietnamese",
        "native_name": "Tiếng Việt"
      }, {
        "acronym": "vo",
        "language_name": "Volapuk",
        "native_name": "Volapük"
      }, {
        "acronym": "wa",
        "language_name": "Walloon",
        "native_name": "Walon"
      }, {
        "acronym": "cy",
        "language_name": "Welsh",
        "native_name": "Cymraeg"
      }, {
        "acronym": "wo",
        "language_name": "Wolof",
        "native_name": "Wollof"
      }, {
        "acronym": "fy",
        "language_name": "Western-Frisian",
        "native_name": "Frysk"
      }, {
        "acronym": "xh",
        "language_name": "Xhosa",
        "native_name": "isiXhosa"
      }, {
        "acronym": "yi",
        "language_name": "Yiddish",
        "native_name": "ייִדיש"
      }, {
        "acronym": "yo",
        "language_name": "Yoruba",
        "native_name": "Yorùbá"
      }, {
        "acronym": "za",
        "language_name": "Zhuang",
        "native_name": "Saɯ cueŋƅ, Saw cuengh"
      },

    ], function(err, langs) {
      if (err) throw err;
      // console.log('Models created: \n', langs);
    });

  });
};
