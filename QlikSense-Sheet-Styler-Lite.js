define(["qlik", "ng!$q"], function(qlik, ng) {
    "use strict";
    console.time('qlik Function start #1');
    console.timeEnd('qlik Function start #1');
    var objectlist1 = ['barchart', 'combochart', 'table', 'pivot-table', 'waterfallchart', 'treemap', 'map', 'linechart', 'scatterplot', 'piechart', 'gauge', 'histogram', 'distributionplot', 'boxplot', 'kpi', 'text-image'],
        objectlist = [];
    var sheetId = qlik.navigation.getCurrentSheetId().sheetId;
    var app = qlik.currApp();

    function resizeGrid(rows, cols) {
        app.getObject(sheetId).then(function(obj) {
            obj.applyPatches([{
                qOp: 'replace',
                qPath: '/columns',
                qValue: '"' + cols + '"'
            }, {
                qPath: '/rows',
                qOp: 'replace',
                qValue: '"' + rows + '"'
            }], false);
        }).then(function() {
            app.doSave();
        });
    }
    // end resizeGrid()
    var input_rows = {
        ref: "sheetrows",
        label: "Number of rows",
        type: "integer",
        defaultValue: "12"
    };
    var input_cols = {
        ref: "sheetcols",
        label: "Number of columns",
        type: "integer",
        defaultValue: "24"
    };
    var actionbutton = {
        label: "Resize Sheet",
        component: "button",
        action: function(data) {
            console.log('Resize screen :- rows : ' + data.sheetrows + ', cols : ' + data.sheetcols);
            resizeGrid(data.sheetrows, data.sheetcols);
        }
    };

    // exit
    var getSheetList = function() {
        var defer = ng.defer();
        app.getAppObjectList('sheet', function(reply) {
            var str = "";
            $.each(reply.qAppObjectList.qItems, function(key, value) {
                var sheet = value.qInfo.qId + '';
                if (sheet == sheetId) {
                    var objlist = [];
                    //str += value.qData.title + ' ';
                    $.each(value.qData.cells, function(k, v) {
                        objlist.push({
                            value: v.type,
                            label: v.type,
                        });
                    });
                    return defer.resolve(objlist);
                }
            });
        });
        return defer.promise;
    };
    var getSheetobjidList = function() {
        var defer = ng.defer();
        app.getAppObjectList('sheet', function(reply) {
            var str = "";
            $.each(reply.qAppObjectList.qItems, function(key, value) {
                var sheet = value.qInfo.qId + '';
                if (sheet == sheetId) {
                    var objlist = [];
                    //str += value.qData.title + ' ';
                    $.each(value.qData.cells, function(k, v) {
                        objlist.push({
                            value: v.name,
                            label: v.name + ' : ' + v.type,
                        });
                    });
                    return defer.resolve(objlist);
                }
            });
        });
        return defer.promise;
    };

    var getTableList = function() {
        var defer = ng.defer();
        app.getAppObjectList('sheet', function(reply) {
            var str = "";
            $.each(reply.qAppObjectList.qItems, function(key, value) {
                var sheet = value.qInfo.qId + '';
                if (sheet == sheetId) {
                    var objlist = [];
                    //str += value.qData.title + ' ';
                    $.each(value.qData.cells, function(k, v) {
                        console.log(value);
                        if (v.type == "table" || v.type == 'table' || v.type == "pivot-table" || v.type == 'pivot-table') {
                            objlist.push({
                                value: v.name,
                                label: v.name + ' : ' + v.type,
                            });
                        }
                    });
                    return defer.resolve(objlist);
                }
            });
        });
        return defer.promise;
    };


    var objectlst = {
        type: "string",
        component: "dropdown",
        label: "Select Objects in Current Sheet to apply Style",
        ref: "selectedSheetObj",
        options: function() {
            return getSheetList().then(function(items) {
                return items;
            });
        }
    };
    var objectlst2 = {
        type: "string",
        component: "dropdown",
        label: "Select Objects in Current Sheet to apply Style",
        ref: "selectedSheetObj",
        options: function() {
            return getSheetobjidList().then(function(items) {
                return items;
            });
        }
    };

    var tablelst = {
        type: "string",
        component: "dropdown",
        label: "Select Objects in Current Sheet to apply Style",
        ref: "selectedTableObject",
        options: function() {
            return getTableList().then(function(items) {
                return items;
            });
        }
    };

    function getBasePath() {
        var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/sense") + 1);
        var url = window.location.href;
        url = url.split("/");
        return url[0] + "//" + url[2] + ((prefix[prefix.length - 1] === "/") ? prefix.substr(0, prefix.length - 1) : prefix);
    }

    function addStyleLinkToHeader(linkUrl, id) {
        if (id && !_.isEmpty(id)) {
            if (!$('#' + id).length) {
                var $styleLink = $(document.createElement('link'));
                $styleLink.attr('rel', 'stylesheet');
                $styleLink.attr('type', 'text/css');
                $styleLink.attr('href', linkUrl);
                if (id && !_.isEmpty(id)) {
                    $styleLink.attr('id', id);
                }
                $('head').append($styleLink);
            }
        }
    }
    var getFontList = function() {
        var fontstyle = ["Default", "ABeeZee", "Abel", "Abhaya Libre", "Abril Fatface", "Aclonica", "Acme", "Actor", "Adamina", "Advent Pro", "Aguafina Script", "Akronim", "Aladin", "Aldrich", "Alef", "Alegreya", "Alegreya SC", "Alegreya Sans", "Alegreya Sans SC", "Alex Brush", "Alfa Slab One", "Alice", "Alike", "Alike Angular", "Allan", "Allerta", "Allerta Stencil", "Allura", "Almendra", "Almendra Display", "Almendra SC", "Amarante", "Amaranth", "Amatic SC", "Amatica SC", "Amethysta", "Amiko", "Amiri", "Amita", "Anaheim", "Andada", "Andika", "Angkor", "Annie Use Your Telescope", "Anonymous Pro", "Antic", "Antic Didone", "Antic Slab", "Anton", "Arapey", "Arbutus", "Arbutus Slab", "Architects Daughter", "Archivo", "Archivo Black", "Archivo Narrow", "Aref Ruqaa", "Arima Madurai", "Arimo", "Arizonia", "Armata", "Arsenal", "Artifika", "Arvo", "Arya", "Asap", "Asap Condensed", "Asar", "Asset", "Assistant", "Astloch", "Asul", "Athiti", "Atma", "Atomic Age", "Aubrey", "Audiowide", "Autour One", "Average", "Average Sans", "Averia Gruesa Libre", "Averia Libre", "Averia Sans Libre", "Averia Serif Libre", "Bad Script", "Bahiana", "Baloo", "Baloo Bhai", "Baloo Bhaijaan", "Baloo Bhaina", "Baloo Chettan", "Baloo Da", "Baloo Paaji", "Baloo Tamma", "Baloo Tammudu", "Baloo Thambi", "Balthazar", "Bangers", "Barrio", "Basic", "Battambang", "Baumans", "Bayon", "Belgrano", "Bellefair", "Belleza", "BenchNine", "Bentham", "Berkshire Swash", "Bevan", "Bigelow Rules", "Bigshot One", "Bilbo", "Bilbo Swash Caps", "BioRhyme", "BioRhyme Expanded", "Biryani", "Bitter", "Black Ops One", "Bokor", "Bonbon", "Boogaloo", "Bowlby One", "Bowlby One SC", "Brawler", "Bree Serif", "Bubblegum Sans", "Bubbler One", "Buda", "Buenard", "Bungee", "Bungee Hairline", "Bungee Inline", "Bungee Outline", "Bungee Shade", "Butcherman", "Butterfly Kids", "Cabin", "Cabin Condensed", "Cabin Sketch", "Caesar Dressing", "Cagliostro", "Cairo", "Calligraffitti", "Cambay", "Cambo", "Candal", "Cantarell", "Cantata One", "Cantora One", "Capriola", "Cardo", "Carme", "Carrois Gothic", "Carrois Gothic SC", "Carter One", "Catamaran", "Caudex", "Caveat", "Caveat Brush", "Cedarville Cursive", "Ceviche One", "Changa", "Changa One", "Chango", "Chathura", "Chau Philomene One", "Chela One", "Chelsea Market", "Chenla", "Cherry Cream Soda", "Cherry Swash", "Chewy", "Chicle", "Chivo", "Chonburi", "Cinzel", "Cinzel Decorative", "Clicker Script", "Coda", "Coda Caption", "Codystar", "Coiny", "Combo", "Comfortaa", "Coming Soon", "Concert One", "Condiment", "Content", "Contrail One", "Convergence", "Cookie", "Copse", "Corben", "Cormorant", "Cormorant Garamond", "Cormorant Infant", "Cormorant SC", "Cormorant Unicase", "Cormorant Upright", "Courgette", "Cousine", "Coustard", "Covered By Your Grace", "Crafty Girls", "Creepster", "Crete Round", "Crimson Text", "Croissant One", "Crushed", "Cuprum", "Cutive", "Cutive Mono", "Damion", "Dancing Script", "Dangrek", "David Libre", "Dawning of a New Day", "Days One", "Dekko", "Delius", "Delius Swash Caps", "Delius Unicase", "Della Respira", "Denk One", "Devonshire", "Dhurjati", "Didact Gothic", "Diplomata", "Diplomata SC", "Domine", "Donegal One", "Doppio One", "Dorsa", "Dosis", "Dr Sugiyama", "Droid Sans", "Droid Sans Mono", "Droid Serif", "Duru Sans", "Dynalight", "EB Garamond", "Eagle Lake", "Eater", "Economica", "Eczar", "El Messiri", "Electrolize", "Elsie", "Elsie Swash Caps", "Emblema One", "Emilys Candy", "Encode Sans", "Encode Sans Condensed", "Encode Sans Expanded", "Encode Sans Semi Condensed", "Encode Sans Semi Expanded", "Engagement", "Englebert", "Enriqueta", "Erica One", "Esteban", "Euphoria Script", "Ewert", "Exo", "Exo 2", "Expletus Sans", "Fanwood Text", "Farsan", "Fascinate", "Fascinate Inline", "Faster One", "Fasthand", "Fauna One", "Faustina", "Federant", "Federo", "Felipa", "Fenix", "Finger Paint", "Fira Mono", "Fira Sans", "Fira Sans Condensed", "Fira Sans Extra Condensed", "Fjalla One", "Fjord One", "Flamenco", "Flavors", "Fondamento", "Fontdiner Swanky", "Forum", "Francois One", "Frank Ruhl Libre", "Freckle Face", "Fredericka the Great", "Fredoka One", "Freehand", "Fresca", "Frijole", "Fruktur", "Fugaz One", "GFS Didot", "GFS Neohellenic", "Gabriela", "Gafata", "Galada", "Galdeano", "Galindo", "Gentium Basic", "Gentium Book Basic", "Geo", "Geostar", "Geostar Fill", "Germania One", "Gidugu", "Gilda Display", "Give You Glory", "Glass Antiqua", "Glegoo", "Gloria Hallelujah", "Goblin One", "Gochi Hand", "Gorditas", "Goudy Bookletter 1911", "Graduate", "Grand Hotel", "Gravitas One", "Great Vibes", "Griffy", "Gruppo", "Gudea", "Gurajada", "Habibi", "Halant", "Hammersmith One", "Hanalei", "Hanalei Fill", "Handlee", "Hanuman", "Happy Monkey", "Harmattan", "Headland One", "Heebo", "Henny Penny", "Herr Von Muellerhoff", "Hind", "Hind Guntur", "Hind Madurai", "Hind Siliguri", "Hind Vadodara", "Holtwood One SC", "Homemade Apple", "Homenaje", "IM Fell DW Pica", "IM Fell DW Pica SC", "IM Fell Double Pica", "IM Fell Double Pica SC", "IM Fell English", "IM Fell English SC", "IM Fell French Canon", "IM Fell French Canon SC", "IM Fell Great Primer", "IM Fell Great Primer SC", "Iceberg", "Iceland", "Imprima", "Inconsolata", "Inder", "Indie Flower", "Inika", "Inknut Antiqua", "Irish Grover", "Istok Web", "Italiana", "Italianno", "Itim", "Jacques Francois", "Jacques Francois Shadow", "Jaldi", "Jim Nightshade", "Jockey One", "Jolly Lodger", "Jomhuria", "Josefin Sans", "Josefin Slab", "Joti One", "Judson", "Julee", "Julius Sans One", "Junge", "Jura", "Just Another Hand", "Just Me Again Down Here", "Kadwa", "Kalam", "Kameron", "Kanit", "Kantumruy", "Karla", "Karma", "Katibeh", "Kaushan Script", "Kavivanar", "Kavoon", "Kdam Thmor", "Keania One", "Kelly Slab", "Kenia", "Khand", "Khmer", "Khula", "Kite One", "Knewave", "Kotta One", "Koulen", "Kranky", "Kreon", "Kristi", "Krona One", "Kumar One", "Kumar One Outline", "Kurale", "La Belle Aurore", "Laila", "Lakki Reddy", "Lalezar", "Lancelot", "Lateef", "Lato", "League Script", "Leckerli One", "Ledger", "Lekton", "Lemon", "Lemonada", "Libre Barcode 128", "Libre Barcode 128 Text", "Libre Barcode 39", "Libre Barcode 39 Extended", "Libre Barcode 39 Extended Text", "Libre Barcode 39 Text", "Libre Baskerville", "Libre Franklin", "Life Savers", "Lilita One", "Lily Script One", "Limelight", "Linden Hill", "Lobster", "Lobster Two", "Londrina Outline", "Londrina Shadow", "Londrina Sketch", "Londrina Solid", "Lora", "Love Ya Like A Sister", "Loved by the King", "Lovers Quarrel", "Luckiest Guy", "Lusitana", "Lustria", "Macondo", "Macondo Swash Caps", "Mada", "Magra", "Maiden Orange", "Maitree", "Mako", "Mallanna", "Mandali", "Manuale", "Marcellus", "Marcellus SC", "Marck Script", "Margarine", "Marko One", "Marmelad", "Martel", "Martel Sans", "Marvel", "Mate", "Mate SC", "Maven Pro", "McLaren", "Meddon", "MedievalSharp", "Medula One", "Meera Inimai", "Megrim", "Meie Script", "Merienda", "Merienda One", "Merriweather", "Merriweather Sans", "Metal", "Metal Mania", "Metamorphous", "Metrophobic", "Michroma", "Milonga", "Miltonian", "Miltonian Tattoo", "Miniver", "Miriam Libre", "Mirza", "Miss Fajardose", "Mitr", "Modak", "Modern Antiqua", "Mogra", "Molengo", "Molle", "Monda", "Monofett", "Monoton", "Monsieur La Doulaise", "Montaga", "Montez", "Montserrat", "Montserrat Alternates", "Montserrat Subrayada", "Moul", "Moulpali", "Mountains of Christmas", "Mouse Memoirs", "Mr Bedfort", "Mr Dafoe", "Mr De Haviland", "Mrs Saint Delafield", "Mrs Sheppards", "Mukta", "Mukta Mahee", "Mukta Malar", "Mukta Vaani", "Muli", "Mystery Quest", "NTR", "Neucha", "Neuton", "New Rocker", "News Cycle", "Niconne", "Nixie One", "Nobile", "Nokora", "Norican", "Nosifer", "Nothing You Could Do", "Noticia Text", "Noto Sans", "Noto Serif", "Nova Cut", "Nova Flat", "Nova Mono", "Nova Oval", "Nova Round", "Nova Script", "Nova Slim", "Nova Square", "Numans", "Nunito", "Nunito Sans", "Odor Mean Chey", "Offside", "Old Standard TT", "Oldenburg", "Oleo Script", "Oleo Script Swash Caps", "Open Sans", "Open Sans Condensed", "Oranienbaum", "Orbitron", "Oregano", "Orienta", "Original Surfer", "Oswald", "Over the Rainbow", "Overlock", "Overlock SC", "Overpass", "Overpass Mono", "Ovo", "Oxygen", "Oxygen Mono", "PT Mono", "PT Sans", "PT Sans Caption", "PT Sans Narrow", "PT Serif", "PT Serif Caption", "Pacifico", "Padauk", "Palanquin", "Palanquin Dark", "Pangolin", "Paprika", "Parisienne", "Passero One", "Passion One", "Pathway Gothic One", "Patrick Hand", "Patrick Hand SC", "Pattaya", "Patua One", "Pavanam", "Paytone One", "Peddana", "Peralta", "Permanent Marker", "Petit Formal Script", "Petrona", "Philosopher", "Piedra", "Pinyon Script", "Pirata One", "Plaster", "Play", "Playball", "Playfair Display", "Playfair Display SC", "Podkova", "Poiret One", "Poller One", "Poly", "Pompiere", "Pontano Sans", "Poppins", "Port Lligat Sans", "Port Lligat Slab", "Pragati Narrow", "Prata", "Preahvihear", "Press Start 2P", "Pridi", "Princess Sofia", "Prociono", "Prompt", "Prosto One", "Proza Libre", "Puritan", "Purple Purse", "Quando", "Quantico", "Quattrocento", "Quattrocento Sans", "Questrial", "Quicksand", "Quintessential", "Qwigley", "Racing Sans One", "Radley", "Rajdhani", "Rakkas", "Raleway", "Raleway Dots", "Ramabhadra", "Ramaraja", "Rambla", "Rammetto One", "Ranchers", "Rancho", "Ranga", "Rasa", "Rationale", "Ravi Prakash", "Redressed", "Reem Kufi", "Reenie Beanie", "Revalia", "Rhodium Libre", "Ribeye", "Ribeye Marrow", "Righteous", "Risque", "Roboto", "Roboto Condensed", "Roboto Mono", "Roboto Slab", "Rochester", "Rock Salt", "Rokkitt", "Romanesco", "Ropa Sans", "Rosario", "Rosarivo", "Rouge Script", "Rozha One", "Rubik", "Rubik Mono One", "Ruda", "Rufina", "Ruge Boogie", "Ruluko", "Rum Raisin", "Ruslan Display", "Russo One", "Ruthie", "Rye", "Sacramento", "Sahitya", "Sail", "Saira", "Saira Condensed", "Saira Extra Condensed", "Saira Semi Condensed", "Salsa", "Sanchez", "Sancreek", "Sansita", "Sarala", "Sarina", "Sarpanch", "Satisfy", "Scada", "Scheherazade", "Schoolbell", "Scope One", "Seaweed Script", "Secular One", "Sedgwick Ave", "Sedgwick Ave Display", "Sevillana", "Seymour One", "Shadows Into Light", "Shadows Into Light Two", "Shanti", "Share", "Share Tech", "Share Tech Mono", "Shojumaru", "Short Stack", "Shrikhand", "Siemreap", "Sigmar One", "Signika", "Signika Negative", "Simonetta", "Sintony", "Sirin Stencil", "Six Caps", "Skranji", "Slabo 13px", "Slabo 27px", "Slackey", "Smokum", "Smythe", "Sniglet", "Snippet", "Snowburst One", "Sofadi One", "Sofia", "Sonsie One", "Sorts Mill Goudy", "Source Code Pro", "Source Sans Pro", "Source Serif Pro", "Space Mono", "Special Elite", "Spectral", "Spicy Rice", "Spinnaker", "Spirax", "Squada One", "Sree Krushnadevaraya", "Sriracha", "Stalemate", "Stalinist One", "Stardos Stencil", "Stint Ultra Condensed", "Stint Ultra Expanded", "Stoke", "Strait", "Sue Ellen Francisco", "Suez One", "Sumana", "Sunshiney", "Supermercado One", "Sura", "Suranna", "Suravaram", "Suwannaphum", "Swanky and Moo Moo", "Syncopate", "Tangerine", "Taprom", "Tauri", "Taviraj", "Teko", "Telex", "Tenali Ramakrishna", "Tenor Sans", "Text Me One", "The Girl Next Door", "Tienne", "Tillana", "Timmana", "Tinos", "Titan One", "Titillium Web", "Trade Winds", "Trirong", "Trocchi", "Trochut", "Trykker", "Tulpen One", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono", "Ultra", "Uncial Antiqua", "Underdog", "Unica One", "UnifrakturCook", "UnifrakturMaguntia", "Unkempt", "Unlock", "Unna", "VT323", "Vampiro One", "Varela", "Varela Round", "Vast Shadow", "Vesper Libre", "Vibur", "Vidaloka", "Viga", "Voces", "Volkhov", "Vollkorn", "Voltaire", "Waiting for the Sunrise", "Wallpoet", "Walter Turncoat", "Warnes", "Wellfleet", "Wendy One", "Wire One", "Work Sans", "Yanone Kaffeesatz", "Yantramanav", "Yatra One", "Yellowtail", "Yeseva One", "Yesteryear", "Yrsa", "Zeyada", "Zilla Slab", "Zilla Slab Highlight"];
        var defer = ng.defer();
        var list = [];
        $.each(fontstyle, function(no, value) {
            //  console.log(value);
            list.push({
                value: value,
                label: value
            });
            return defer.resolve(list);
        });
        return defer.promise;
    };

    return {
        initialProperties: {
            listItems: [],
            listItems2: [],
            listItems3: [],
            customtablestyle: []
        },
        definition: {
            type: "items",
            component: "accordion",
            items: {
                selectstyle: {
                    label: 'Select Style Type',
                    items: {
                        CustomLayoutforobjects: {
                            ref: "CustomLayoutforobjects",
                            type: "boolean",
                            component: "checkbox",
                            label: "Custom Layout Style For Each Object",
                            defaultValue: false
                        },
                        getobjectidbadge: {
                            ref: "getobjectidbadge",
                            type: "boolean",
                            component: "checkbox",
                            label: "Show Object ID",
                            defaultValue: false,
                            show: function(data) {
                                if (data.CustomLayoutforobjects || data.customtablestyleenable) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        },
                        // CustomLayoutforobjects start
                        MyList3: {
                            type: "array",
                            ref: "listItems3",
                            label: "Style Objects Manually",
                            itemTitleRef: "label",
                            allowAdd: true,
                            allowRemove: true,
                            addTranslation: "Add Objects",
                            min: 1,
                            show: function(data) {
                                if (data.CustomLayoutforobjects) {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            items: {
                                label: {
                                    type: "string",
                                    ref: "label",
                                    label: "Label",
                                    expression: "optional"
                                },
                                // start
                                objectlst: objectlst2,
                                headerbgcolor: {
                                    type: "string",
                                    ref: "headerbgcolor",
                                    label: "Object Title Background color",
                                    expression: "optional",
                                    defaultValue: '#4477aa'
                                },
                                headercolor: {
                                    type: "string",
                                    ref: "headercolor",
                                    label: "Object Title color",
                                    expression: "optional",
                                    defaultValue: '#fff'
                                },
                                headerfontsize: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Font Size",
                                    ref: "headerfontsize",
                                    min: 10,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 15
                                },
                                headerfontweight: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Font Width",
                                    ref: "headerfontweight",
                                    min: 300,
                                    max: 900,
                                    step: 1,
                                    defaultValue: 300
                                },
                                headertextalin: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Title Text Align",
                                    ref: "headertextalin",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }]
                                },
                                headerpaddingtop: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Padding Top",
                                    ref: "headerpaddingtop",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 11
                                },
                                headerpaddingbottom: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Padding Bottom",
                                    ref: "headerpaddingbottom",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 11
                                },
                                headerpaddingright: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Padding Right",
                                    ref: "headerpaddingright",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 11
                                },
                                headerpaddingleft: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Padding Left",
                                    ref: "headerpaddingleft",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 11
                                },
                                containerbgcolor: {
                                    type: "string",
                                    ref: "containerbgcolor",
                                    label: "Object's container Background Color",
                                    expression: "optional",
                                    defaultValue: '#fff'
                                },
                                // end
                            }
                        },
                        // end
                        customtablestyleenable: {
                            ref: "customtablestyleenable",
                            type: "boolean",
                            component: "checkbox",
                            label: "Style Table Manually",
                            defaultValue: false
                        },
                        customtablestyle: {
                            type: "array",
                            ref: "customtablestyle",
                            label: "Style Table Manually",
                            itemTitleRef: "label",
                            allowAdd: true,
                            allowRemove: true,
                            addTranslation: "Add Objects",
                            min: 1,

                            show: function(data) {
                                if (data.customtablestyleenable) {
                                    return true;
                                } else {
                                    return false;
                                }
                            },

                            items: {
                                label: {
                                    type: "string",
                                    ref: "label",
                                    label: "Label",
                                    expression: "optional"
                                },
                                // start
                                objectlst: tablelst,
                                // select
                                tablesupport: {
                                    ref: "tablesupport",
                                    type: "boolean",
                                    component: "checkbox",
                                    label: "Apply style for Table?",
                                    defaultValue: false
                                },
                                pivotsupport: {
                                    ref: "pivotsupport",
                                    type: "boolean",
                                    component: "checkbox",
                                    label: "Apply style for Pivot?",
                                    defaultValue: false,
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }

                                },
                                // table
                                // new 11/6/2018
                                tablenumericalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Numeric Measure Text Align",
                                    ref: "tablenumericalign",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletextalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Text Dim Align",
                                    ref: "tabletextalign",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tablecustomalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Custom Text Align",
                                    ref: "tablecustomalign",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tablecolumnalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Column Align",
                                    ref: "tablecolumnalign",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tablecellstyle: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Data Cell Size",
                                    ref: "tablecellstyle",
                                    options: [{
                                        value: "standard",
                                        label: "Standard"
                                    }, {
                                        value: "small",
                                        label: "Small"
                                    }, {
                                        value: "medium",
                                        label: "Medium"
                                    }, {
                                        value: "large",
                                        label: "Large"
                                    }],
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    },
                                    defaultValue: "small"
                                },
                                tablecellfontsize: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Data Font Size",
                                    ref: "tablecellfontsize",
                                    options: [{
                                        value: "standard",
                                        label: "Standard"
                                    }, {
                                        value: "small",
                                        label: "Small"
                                    }, {
                                        value: "medium",
                                        label: "Medium"
                                    }, {
                                        value: "large",
                                        label: "Large"
                                    }],
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    },
                                    defaultValue: "small"
                                },
                                // end
                                tablecolor: {
                                    type: "string",
                                    label: "Table color",
                                    ref: "tablecolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tablebgcolor: {
                                    type: "string",
                                    label: "Header Background color",
                                    ref: "tablebgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tablehoverbgcolor: {
                                    type: "string",
                                    label: "Header Hover Background color",
                                    ref: "tablehoverbgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tablehovercolor: {
                                    type: "string",
                                    label: "Header Hover color",
                                    ref: "tablehovercolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletotalcolor: {
                                    type: "string",
                                    label: "Total Top color",
                                    ref: "tabletotalcolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletotalbgcolor: {
                                    type: "string",
                                    label: "Total Top Background color",
                                    ref: "tabletotalbgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletotalhovercolor: {
                                    type: "string",
                                    label: "Total Top Hover color",
                                    ref: "tabletotalhovercolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletotalhoverbgcolor: {
                                    type: "string",
                                    label: "Total Top Hover Background color",
                                    ref: "tabletotalhoverbgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletotalbottomcolor: {
                                    type: "string",
                                    label: "Total Bottom color",
                                    ref: "tabletotalbottomcolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletotalbottombgcolor: {
                                    type: "string",
                                    label: "Total Bottom Background color",
                                    ref: "tabletotalbottombgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletotalhoverbottomcolor: {
                                    type: "string",
                                    label: "Total Bottom Hover color",
                                    ref: "tabletotalhoverbottomcolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tabletotalhoverbottombgcolor: {
                                    type: "string",
                                    label: "Total Bottom Hover Background color",
                                    ref: "tabletotalhoverbottombgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tablecolumwidthadjuster: {
                                    type: "string",
                                    label: "Table Column width Adjuster in PX",
                                    ref: "tablecolumwidthadjuster",
                                    defaultValue: "1",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tablecolumwidthadjustercolor: {
                                    type: "string",
                                    label: "Table Column width Adjuster Color",
                                    ref: "tablecolumwidthadjustercolor",
                                    defaultValue: "black",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tableheaderborder: {
                                    type: "string",
                                    label: "Table Header Border",
                                    ref: "tableheaderborder",
                                    defaultValue: "1px solid #000",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tableoddcolor: {
                                    type: "string",
                                    label: "Total Odd color",
                                    ref: "tableoddcolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                tableevencolor: {
                                    type: "string",
                                    label: "Total Even color",
                                    ref: "tableevencolor",
                                    defaultValue: "#f2f2f2",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.tablesupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },

                                // pivot
                                pivottablecolor: {
                                    type: "string",
                                    label: "Pivot Header color",
                                    ref: "pivottablecolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablebgcolor: {
                                    type: "string",
                                    label: "Pivot Header Background color",
                                    ref: "pivottablebgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablehoverbgcolor: {
                                    type: "string",
                                    label: "Pivot Header Hover Background color",
                                    ref: "tablehoverbgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablehovercolor: {
                                    type: "string",
                                    label: "Pivot Header Hover color",
                                    ref: "tablehovercolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                // 11/6/2018
                                pivottableoddcolor: {
                                    label: "Row Odd color",
                                    component: "color-picker",
                                    ref: "pivottableoddcolor",
                                    type: "object",
                                    dualOutput: true,
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottableevencolor: {
                                    label: "Row Even color",
                                    component: "color-picker",
                                    ref: "pivottableevencolor",
                                    type: "object",
                                    dualOutput: true,
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottableheaderalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Coloumn Text Align",
                                    ref: "pivottableheaderalign",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottableheaderweight: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Column Text Weight",
                                    ref: "pivottableheaderweight",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "bold",
                                        label: "Bold"
                                    }, {
                                        value: "lighter",
                                        label: "Lighter"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottableheaderfontsize: {
                                    type: "string",
                                    ref: "pivottableheaderfontsize",
                                    label: "Coloumn Text Size in PX",
                                    expression: "optional",
                                    defaultValue: "14",
                                },
                                pivottabledataheaderalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Text Align",
                                    ref: "pivottabledataheaderalign",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablenumericalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Number Text Align",
                                    ref: "pivottablenumericalign",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablecustomalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Custom Text Align",
                                    ref: "pivottablecustomalign",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablenullvalbgcolor: {
                                    label: "Null Value BG color",
                                    component: "color-picker",
                                    ref: "pivottablenullvalbgcolor",
                                    type: "object",
                                    dualOutput: true,
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                // end

                            }
                        },
                        // end
                        xportlayout: {
                            ref: "xportlayout",
                            type: "boolean",
                            component: "checkbox",
                            label: "Show Layout Style CSS",
                            defaultValue: false
                        },
                        manualselectobj: {
                            ref: "manualselectobj",
                            label: "Manually Select Object's and style theme",
                            type: "boolean",
                            defaultValue: false
                        },
                        selectcustomstyle: {
                            ref: "selectcustomstyle",
                            label: "Select Sheet Style",
                            type: "boolean",
                            defaultValue: false
                        },
                        stylelist: {
                            type: "string",
                            component: "dropdown",
                            label: "Select Theme",
                            ref: "stylelist",
                            options: [{
                                value: "1",
                                label: "Gray"
                            }, {
                                value: "2",
                                label: "Black & Gray"
                            }, {
                                value: "3",
                                label: "Blue & Gray"
                            }, {
                                value: "4",
                                label: "Green & Gray"
                            }, {
                                value: "5",
                                label: "Dark"
                            }, {
                                value: "6",
                                label: "Dark Theme 1"
                            }, {
                                value: "7",
                                label: "Dark Theme 2"
                            }, {
                                value: "8",
                                label: "Dark Theme 3"
                            }],
                            defaultValue: "1",
                            show: function(data) {
                                if (data.selectcustomstyle) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        },
                        // objects
                        MyList: {
                            type: "array",
                            ref: "listItems",
                            label: "Add Objects",
                            itemTitleRef: "label",
                            allowAdd: true,
                            allowRemove: true,
                            addTranslation: "Add Objects",
                            min: 1,
                            show: function(data) {
                                if (data.manualselectobj) {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            items: {
                                label: {
                                    type: "string",
                                    ref: "label",
                                    label: "Label",
                                    expression: "optional"
                                },
                                // start
                                objectlst: objectlst
                                    // end
                            }
                        },
                    }
                },
                sheetsettings: {
                    label: 'Basic Sheet Settings',
                    component: "expandable-items",
                    show: function(data) {
                        if (data.selectcustomstyle) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    items: {
                        sheettitlesetting: {
                            type: "items",
                            label: "Sheet Title Settings",
                            items: {
                                titleHide: {
                                    ref: "titleHide",
                                    type: "boolean",
                                    component: "checkbox",
                                    label: "Hide Title Bar",
                                    defaultValue: false
                                },
                                titleheight: {
                                    type: "number",
                                    component: "slider",
                                    label: "Sheet Title Height",
                                    ref: "titleheight",
                                    min: 15,
                                    max: 200,
                                    step: 1,
                                    defaultValue: 36,
                                    show: function(data) {
                                        if (data.titleHide) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }
                                },
                                titlefontsize: {
                                    type: "number",
                                    component: "slider",
                                    label: "Sheet Title Font Size",
                                    ref: "titlefontsize1",
                                    min: 10,
                                    max: 200,
                                    step: 1,
                                    defaultValue: 30,
                                    show: function(data) {
                                        if (data.titleHide) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }
                                },
                                titleimgwidth: {
                                    type: "number",
                                    component: "slider",
                                    label: "Sheet Title Image Width",
                                    ref: "titleimgwidth",
                                    min: 35,
                                    max: 198,
                                    step: 1,
                                    defaultValue: 35,
                                    show: function(data) {
                                            if (data.titleHide) {
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        }
                                        //end
                                },
                            }
                        },
                        sheetbackgroundsetting: {
                            type: "items",
                            label: "Sheet Background Settings",
                            items: {
                                sheetbackgroundcolororimg: {
                                    ref: "sheetbackgroundcolororimg",
                                    label: "Background Image",
                                    type: "boolean",
                                    defaultValue: false
                                },
                                sheetbackground: {
                                    type: "string",
                                    ref: "sheetbackground",
                                    label: "Sheet Background Color",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.sheetbackgroundcolororimg) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }
                                },
                                sheetbackgroundimage: {
                                    label: "Sheet Background Image",
                                    component: "media",
                                    ref: "sheetbackgroundimage",
                                    layoutRef: "sheetbackgroundimage",
                                    type: "string",
                                    show: function(data) {
                                        if (data.sheetbackgroundcolororimg) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                sheetbackgroundimgurl: {
                                    type: "string",
                                    ref: "sheetbackgroundimgurl",
                                    label: "Sheet Background Image[url]",
                                    expression: "optional",
                                    defaultValue: 'url(/content/default/Qlik_default_orange.png)',
                                    show: function(data) {
                                        if (data.sheetbackgroundcolororimg) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                            }
                        },
                        //"QlikView Sans", sans-serif
                        /*
                                                    customfont: {
                                                        type: "string",
                                                        ref: "customfont",
                                                        label: "Custom Font",
                                                        expression: "optional",
                                                        defaultValue: "='Roboto, sans-serif'"
                                                    },
                        */
                        customfont: {
                            type: "string",
                            component: "dropdown",
                            label: "Custom Google Font",
                            ref: "customfont",
                            options: function() {
                                    return getFontList().then(function(items) {
                                        return items;
                                    });
                                }
                                //,defaultValue: "Roboto"
                        },
                        gridcellactive: {
                            type: "string",
                            ref: "gridcellactive",
                            label: "Object Active color[edit mode only]",
                            expression: "optional",
                            defaultValue: '#fab761'
                        },
                    }
                },
                customstyling: {
                    label: 'Object Styling & Advance Settings',
                    component: "expandable-items",
                    show: function(data) {
                        if (data.selectcustomstyle) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    items: {
                        basicobjectsettings: {
                            type: "items",
                            label: "Basic object Settings",
                            items: {
                                qvobjecttransparent: {
                                    ref: "qvobjecttransparent",
                                    //label: "Transparent Object",
                                    label: "Transparent all the objects?",
                                    type: "boolean",
                                    defaultValue: false
                                },
                                ignorekpiandtextbox: {
                                    ref: "ignorekpiandtextbox",
                                    label: "Ignore style for KPI and Text-Image Object?",
                                    type: "boolean",
                                    defaultValue: false
                                },
                                qvobjectborder: {
                                    ref: "qvobjectborder",
                                    //label: "Transparent Object",
                                    label: "Add border to objects container?",
                                    type: "boolean",
                                    defaultValue: false
                                },
                                qvobjectbordercss: {
                                    type: "string",
                                    ref: "qvobjectbordercss",
                                    label: "Object border css",
                                    expression: "optional",
                                    defaultValue: '1px solid rgb(68, 119, 170)'
                                },
                                qvobjecttopmargin: {
                                    type: "string",
                                    ref: "qvobjecttopmargin",
                                    label: "Object Top Margin",
                                    expression: "optional",
                                    defaultValue: '1px'
                                },
                            }
                        },
                        customactioniconsettings: {
                            type: "items",
                            label: "Custom Action Button Style",
                            items: {
                                customactionstyle: {
                                    ref: "customactionstyle",
                                    type: "boolean",
                                    component: "checkbox",
                                    label: "Custom Action Style?",
                                    defaultValue: false
                                },
                                customactionbtntop: {
                                    type: "number",
                                    component: "slider",
                                    label: "Action Button Top Align",
                                    ref: "customactionbtntop",
                                    min: 1,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 50,
                                    show: function(data) {
                                        if (data.customactionstyle) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                actionbtncolor: {
                                    type: "string",
                                    ref: "actionbtncolor",
                                    label: "Action Button color [after fullscreen]",
                                    expression: "optional",
                                    defaultValue: '#fff'
                                },
                            }
                        },
                        objectheadersettings: {
                            type: "items",
                            label: "Object Style",
                            items: {
                                headerbgcolor: {
                                    type: "string",
                                    ref: "headerbgcolor",
                                    label: "Object Title Background color",
                                    expression: "optional",
                                    defaultValue: '#4477aa'
                                },
                                headercolor: {
                                    type: "string",
                                    ref: "headercolor",
                                    label: "Object Title color",
                                    expression: "optional",
                                    defaultValue: '#fff'
                                },
                                headerfontsize: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Font Size",
                                    ref: "headerfontsize",
                                    min: 10,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 15
                                },
                                headerfontweight: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Font Width",
                                    ref: "headerfontweight",
                                    min: 300,
                                    max: 900,
                                    step: 1,
                                    defaultValue: 300
                                },
                                headertextalin: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Title Text Align",
                                    ref: "headertextalin",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }]
                                },
                                headerpaddingtop: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Padding Top",
                                    ref: "headerpaddingtop",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 11
                                },
                                headerpaddingbottom: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Padding Bottom",
                                    ref: "headerpaddingbottom",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 11
                                },
                                headerpaddingright: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Padding Right",
                                    ref: "headerpaddingright",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 11
                                },
                                headerpaddingleft: {
                                    type: "number",
                                    component: "slider",
                                    label: "Object Title Padding Left",
                                    ref: "headerpaddingleft",
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    defaultValue: 11
                                },
                                containerbgcolor: {
                                    type: "string",
                                    ref: "containerbgcolor",
                                    label: "Object's container Background Color",
                                    expression: "optional",
                                    defaultValue: '#fff'
                                },
                            }
                        },
                        /*
								icon: {
									type: "string",
									ref: "iconname",
									label: "Icon Name",
									expression: "optional"
                            	},
								*/
                    }
                },
                customstylingtable: {
                    label: 'Table Styling & Advance Settings',
                    component: "expandable-items",
                    show: function(data) {
                        if (data.selectcustomstyle) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    items: {
                        Table: {
                            type: "items",
                            label: "Table",
                            items: {
                                // table
                                // new 11/6/2018
                                tablenumericalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Numeric Measure Text Align",
                                    ref: "tablenumericalign",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                },
                                tabletextalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Text Dim Align",
                                    ref: "tabletextalign",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                },
                                tablecustomalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Custom Text Align",
                                    ref: "tablecustomalign",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                },
                                tablecolumnalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Column Align",
                                    ref: "tablecolumnalign",
                                    options: [{
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                },
                                tablecellstyle: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Data Cell Size",
                                    ref: "tablecellstyle",
                                    options: [{
                                        value: "standard",
                                        label: "Standard"
                                    }, {
                                        value: "small",
                                        label: "Small"
                                    }, {
                                        value: "medium",
                                        label: "Medium"
                                    }, {
                                        value: "large",
                                        label: "Large"
                                    }],
                                    defaultValue: "small"
                                },
                                tablecellfontsize: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Data Font Size",
                                    ref: "tablecellfontsize",
                                    options: [{
                                        value: "standard",
                                        label: "Standard"
                                    }, {
                                        value: "small",
                                        label: "Small"
                                    }, {
                                        value: "medium",
                                        label: "Medium"
                                    }, {
                                        value: "large",
                                        label: "Large"
                                    }],
                                    defaultValue: "small"
                                },
                                // end
                                tablecolor: {
                                    type: "string",
                                    label: "Table color",
                                    ref: "tablecolor",
                                    defaultValue: "#fff",
                                    expression: "optional"
                                },
                                tablebgcolor: {
                                    type: "string",
                                    label: "Table Background color",
                                    ref: "tablebgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional"
                                },
                                tablehoverbgcolor: {
                                    type: "string",
                                    label: "Table Hover Background color",
                                    ref: "tablehoverbgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional"
                                },
                                tablehovercolor: {
                                    type: "string",
                                    label: "Table Hover color",
                                    ref: "tablehovercolor",
                                    defaultValue: "#fff",
                                    expression: "optional"
                                },
                                tabletotalcolor: {
                                    type: "string",
                                    label: "Total Top color",
                                    ref: "tabletotalcolor",
                                    defaultValue: "#fff",
                                    expression: "optional"
                                },
                                tabletotalbgcolor: {
                                    type: "string",
                                    label: "Total Top Background color",
                                    ref: "tabletotalbgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional"
                                },
                                tabletotalhovercolor: {
                                    type: "string",
                                    label: "Total Top Hover color",
                                    ref: "tabletotalhovercolor",
                                    defaultValue: "#fff",
                                    expression: "optional"
                                },
                                tabletotalhoverbgcolor: {
                                    type: "string",
                                    label: "Total Top Hover Background color",
                                    ref: "tabletotalhoverbgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional"
                                },
                                tabletotalbottomcolor: {
                                    type: "string",
                                    label: "Total Bottom color",
                                    ref: "tabletotalbottomcolor",
                                    defaultValue: "#fff",
                                    expression: "optional"
                                },
                                tabletotalbottombgcolor: {
                                    type: "string",
                                    label: "Total Bottom Background color",
                                    ref: "tabletotalbottombgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional"
                                },
                                tabletotalhoverbottomcolor: {
                                    type: "string",
                                    label: "Total Bottom Hover color",
                                    ref: "tabletotalhoverbottomcolor",
                                    defaultValue: "#fff",
                                    expression: "optional"
                                },
                                tabletotalhoverbottombgcolor: {
                                    type: "string",
                                    label: "Total Bottom Hover Background color",
                                    ref: "tabletotalhoverbottombgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional"
                                },
                                tablecolumwidthadjuster: {
                                    type: "string",
                                    label: "Table Column width Adjuster in PX",
                                    ref: "tablecolumwidthadjuster",
                                    defaultValue: "1",
                                    expression: "optional"
                                },
                                tablecolumwidthadjustercolor: {
                                    type: "string",
                                    label: "Table Column width Adjuster Color",
                                    ref: "tablecolumwidthadjustercolor",
                                    defaultValue: "black",
                                    expression: "optional"
                                },
                                tableheaderborder: {
                                    type: "string",
                                    label: "Table Header Border",
                                    ref: "tableheaderborder",
                                    defaultValue: "1px solid #000",
                                    expression: "optional"
                                },
                                tableoddcolor: {
                                    type: "string",
                                    label: "Total Odd color",
                                    ref: "tableoddcolor",
                                    defaultValue: "#fff",
                                    expression: "optional"
                                },
                                tableevencolor: {
                                    type: "string",
                                    label: "Total Even color",
                                    ref: "tableevencolor",
                                    defaultValue: "#f2f2f2",
                                    expression: "optional"
                                },
                            }
                        },
                        PivotTable: {
                            type: "items",
                            label: "Pivot Table",
                            items: {
                                pivotsupport: {
                                    ref: "pivotsupport",
                                    type: "boolean",
                                    component: "checkbox",
                                    label: "Apply style for Pivot?",
                                    defaultValue: false
                                },
                                // pivot
                                pivottablecolor: {
                                    type: "string",
                                    label: "Pivot Header color",
                                    ref: "pivottablecolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablebgcolor: {
                                    type: "string",
                                    label: "Pivot Header Background color",
                                    ref: "pivottablebgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablehoverbgcolor: {
                                    type: "string",
                                    label: "Pivot Header Hover Background color",
                                    ref: "tablehoverbgcolor",
                                    defaultValue: "#c9cacc",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablehovercolor: {
                                    type: "string",
                                    label: "Pivot Header Hover color",
                                    ref: "tablehovercolor",
                                    defaultValue: "#fff",
                                    expression: "optional",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                // 11/6/2018
                                pivottableoddcolor: {
                                    label: "Row Odd color",
                                    component: "color-picker",
                                    ref: "pivottableoddcolor",
                                    type: "object",
                                    dualOutput: true,
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottableevencolor: {
                                    label: "Row Even color",
                                    component: "color-picker",
                                    ref: "pivottableevencolor",
                                    type: "object",
                                    dualOutput: true,
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottableheaderalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Coloumn Text Align",
                                    ref: "pivottableheaderalign",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottableheaderweight: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Column Text Weight",
                                    ref: "pivottableheaderweight",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "bold",
                                        label: "Bold"
                                    }, {
                                        value: "lighter",
                                        label: "Lighter"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottableheaderfontsize: {
                                    type: "string",
                                    ref: "pivottableheaderfontsize",
                                    label: "Coloumn Text Size in PX",
                                    expression: "optional",
                                    defaultValue: "14",
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottabledataheaderalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Text Align",
                                    ref: "pivottabledataheaderalign",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablenumericalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Number Text Align",
                                    ref: "pivottablenumericalign",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablecustomalign: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Custom Text Align",
                                    ref: "pivottablecustomalign",
                                    options: [{
                                        value: "Default",
                                        label: "Default"
                                    }, {
                                        value: "Left",
                                        label: "Left"
                                    }, {
                                        value: "Right",
                                        label: "Right"
                                    }, {
                                        value: "Center",
                                        label: "Center"
                                    }],
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                pivottablenullvalbgcolor: {
                                    label: "Null Value BG color",
                                    component: "color-picker",
                                    ref: "pivottablenullvalbgcolor",
                                    type: "object",
                                    dualOutput: true,
                                    show: function(data) {
                                        if (data.pivotsupport) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                // end
                            }
                        }
                    }
                },
                // objects
                MyList2: {
                    type: "array",
                    ref: "listItems2",
                    label: "Add More Objects",
                    itemTitleRef: "label",
                    allowAdd: true,
                    allowRemove: true,
                    addTranslation: "Add Objects",
                    min: 1,
                    show: function(data) {
                        if (data.manualselectobj) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    items: {
                        label: {
                            type: "string",
                            ref: "label",
                            label: "Label",
                            expression: "optional"
                        },
                        // start
                        objectlst: objectlst
                            // end
                    }
                },
                selectionbar: {
                    label: 'Selection Bar Styling & Settings',
                    show: function(data) {
                        if (data.selectcustomstyle) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    items: {
                        selectionbarHide: {
                            ref: "selectionbarHide",
                            type: "boolean",
                            component: "checkbox",
                            label: "Hide Selection Bar",
                            defaultValue: false
                        },
                        selectionbarbg: {
                            type: "string",
                            label: "Selection Bar Background color",
                            ref: "prop.selectionbarbg",
                            defaultValue: "#404b56",
                            expression: "optional",
                            show: function(data) {
                                if (data.selectionbarHide) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        selectionbarbuttonbg: {
                            type: "string",
                            label: "Selection Bar Button Background color",
                            ref: "prop.selectionbarbuttonbg",
                            defaultValue: "#404b56",
                            expression: "optional",
                            show: function(data) {
                                if (data.selectionbarHide) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        /*
                                    selectionbarbuttoncolor: {
                                        type: "string",
                                        label: "SelectionBar Button color",
                                        ref: "prop.selectionbarbuttoncolor",
                                        defaultValue: "gray",
                                        expression: "optional",
										show:function(data){
											if(data.selectionbarHide){
												return false;
											}else{
												return true;
											}

										}
                                    },
									*/
                        selectionbartextcolor: {
                            type: "string",
                            label: "Selection Bar Text color",
                            ref: "prop.selectionbartextcolor",
                            defaultValue: "#ffffff",
                            expression: "optional",
                            show: function(data) {
                                if (data.selectionbarHide) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        selectionbaritemcolor: {
                            type: "string",
                            label: "Selection Bar Item color",
                            ref: "prop.selectionbaritemcolor",
                            defaultValue: "#ccc",
                            expression: "optional",
                            show: function(data) {
                                if (data.selectionbarHide) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        selectionbarBorderColor: {
                            type: "string",
                            label: "Selection Bar Border color",
                            ref: "prop.selectionbarBorderColor",
                            defaultValue: "#fff",
                            expression: "optional",
                            show: function(data) {
                                if (data.selectionbarHide) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        selectionbaritemhovercolor: {
                            type: "string",
                            label: "Selection Bar Item Hover color",
                            ref: "prop.selectionbaritemhovercolor",
                            defaultValue: "#404142",
                            expression: "optional",
                            show: function(data) {
                                if (data.selectionbarHide) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                    }
                },
                // end
            }
        },
        support: {
            snapshot: true,
            export: true,
            exportData: false
        },
        paint: function($element, layout) {
            var selectcustomstyle = layout.selectcustomstyle,
                xportlayout = layout.xportlayout;
            if (layout.getobjectidbadge) {
                var badgestyle = '';
                badgestyle += '.custbadgeforid[data-badge]:after {';
                badgestyle += 'content:attr(data-badge);';
                badgestyle += 'position:absolute;';
                badgestyle += 'top:-10px;';
                badgestyle += 'right:-10px;';
                badgestyle += 'font-size:.9em;';
                badgestyle += 'background:green;';
                badgestyle += 'color:white;';
                badgestyle += '/*width:18px; */height:18px;';
                badgestyle += 'text-align:center;';
                badgestyle += 'line-height:18px;';
                badgestyle += 'border-radius:50%;';
                badgestyle += 'box-shadow:0 0 1px #333;';
                badgestyle += 'z-index:1050;     padding-left: 5px; padding-right: 5px;}';
                if ($('#custom-Qs-badge').length == 0) {
                    $('<style id="custom-Qs-badge"></style>').html(badgestyle).appendTo('head');
                }
                var sheetId = qlik.navigation.getCurrentSheetId().sheetId;
                app.getAppObjectList('sheet', function(reply) {
                    var str = "";
                    $.each(reply.qAppObjectList.qItems, function(key, value) {
                        var sheet = value.qInfo.qId + '';
                        if (sheet == sheetId) {
                            $.each(value.qData.cells, function(k, v) {
                                console.log(v.name);
                                $('div[tid="' + v.name + '"] header').addClass('custbadgeforid');
                                $('div[tid="' + v.name + '"] header').attr("data-badge", "" + v.name);
                            });
                        }
                    });
                });
            }
            if (selectcustomstyle) {
                $('#custom-Qs-selected').remove();
                if (layout.stylelist == '1') {
                    var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/gray.css';
                    addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                } else if (layout.stylelist == '2') {
                    //  console.log(getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/black-gray.css');
                    if ($('#custom-Qs-selected').length >= 1) {
                        $('#custom-Qs-selected').remove();
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/black-gray.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    } else {
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/black-gray.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    }
                } else if (layout.stylelist == '3') {
                    //  console.log(getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/blue-gray.css');
                    if ($('#custom-Qs-selected').length >= 1) {
                        $('#custom-Qs-selected').remove();
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/blue-gray.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    } else {
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/blue-gray.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    }
                } else if (layout.stylelist == '4') {
                    //  console.log(getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/green-gray.css');
                    if ($('#custom-Qs-selected').length >= 1) {
                        $('#custom-Qs-selected').remove();
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/green-gray.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    } else {
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/green-gray.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    }
                } else if (layout.stylelist == '5') {
                    //   console.log(getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark.css');
                    if ($('#custom-Qs-selected').length >= 1) {
                        $('#custom-Qs-selected').remove();
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    } else {
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    }
                } else if (layout.stylelist == '6') {
                    //   console.log(getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme1.css');
                    if ($('#custom-Qs-selected').length >= 1) {
                        $('#custom-Qs-selected').remove();
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme1.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    } else {
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme1.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    }
                } else if (layout.stylelist == '7') {
                    //    console.log(getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme2.css');
                    if ($('#custom-Qs-selected').length >= 1) {
                        $('#custom-Qs-selected').remove();
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme2.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    } else {
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme2.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    }
                } else if (layout.stylelist == '8') {
                    //   console.log(getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme3.css');
                    if ($('#custom-Qs-selected').length >= 1) {
                        $('#custom-Qs-selected').remove();
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme3.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    } else {
                        var styleUrl = getBasePath() + '/extensions/QlikSense-Sheet-Styler-Lite/Theme/dark-theme3.css';
                        addStyleLinkToHeader(styleUrl, 'custom-Qs-selected');
                    }
                }
            } else {
                var objectlist_lst = [];

                function removeDuplicates(arr) {
                    var unique_array = []
                    for (var i = 0; i < arr.length; i++) {
                        if (unique_array.indexOf(arr[i]) == -1) {
                            unique_array.push(arr[i])
                        }
                    }
                    return unique_array
                }
                if (layout.manualselectobj) {
                    $.each(layout.listItems, function(k, v) {
                        //    console.log(v.selectedSheetObj);
                        objectlist_lst.push(v.selectedSheetObj);
                    });
                    objectlist = removeDuplicates(objectlist_lst);
                } else {
                    $.each(layout.listItems2, function(k, v) {
                        //   console.log(v.selectedSheetObj);
                        objectlist1.push(v.selectedSheetObj);
                    });
                    objectlist = removeDuplicates(objectlist1);
                }
                //  console.log(objectlist);
                var headerbg = layout.headerbgcolor,
                    headercolor = layout.headercolor,
                    actionbtncolor = layout.actionbtncolor,
                    containerbgcolor = layout.containerbgcolor,
                    tablecolor = layout.tablecolor,
                    tablebgcolor = layout.tablebgcolor,
                    tabletotalcolor = layout.tabletotalcolor,
                    tabletotalbgcolor = layout.tabletotalbgcolor,
                    tablehoverbgcolor = layout.tablehoverbgcolor,
                    tablehovercolor = layout.tablehovercolor,
                    tablecolumwidthadjuster = layout.tablecolumwidthadjuster,
                    tablecolumwidthadjustercolor = layout.tablecolumwidthadjustercolor,
                    tableheaderborder = layout.tableheaderborder,
                    pivottablecolor = layout.pivottablecolor,
                    pivottablebgcolor = layout.pivottablebgcolor,
                    pivottablehoverbgcolor = layout.pivottablehoverbgcolor,
                    pivottablehovercolor = layout.pivottablehovercolor,
                    tabletotalhoverbgcolor = layout.tabletotalhoverbgcolor,
                    tabletotalhovercolor = layout.tabletotalhovercolor,
                    tabletotalhoverbottombgcolor = layout.tabletotalhoverbottombgcolor,
                    tabletotalhoverbottomcolor = layout.tabletotalhoverbottomcolor,
                    tabletotalbottombgcolor = layout.tabletotalbottombgcolor,
                    tabletotalbottomcolor = layout.tabletotalbottomcolor,
                    tableevencolor = layout.tableevencolor,
                    tableoddcolor = layout.tableoddcolor,
                    //11/6/2018
                    tablenumericalign = layout.tablenumericalign,
                    tabletextalign = layout.tabletextalign,
                    tablecustomalign = layout.tablecustomalign,
                    tablecolumnalign = layout.tablecolumnalign,
                    tablecellstyle = layout.tablecellstyle,
                    tablecellfontsize = layout.tablecellfontsize,

                    pivottablenullvalbgcolor = (layout.pivottablenullvalbgcolor == undefined ? '#ccc' : pivottablenullvalbgcolor),
                    pivottablecustomalign = layout.pivottablecustomalign,
                    pivottablenumericalign = layout.pivottablenumericalign,
                    pivottabledataheaderalign = layout.pivottabledataheaderalign,
                    pivottableheaderfontsize = layout.pivottableheaderfontsize,
                    pivottableheaderweight = layout.pivottableheaderweight,
                    pivottableheaderalign = layout.pivottableheaderalign,
                    pivottableevencolor = layout.pivottableevencolor,
                    pivottableoddcolor = layout.pivottableoddcolor;
                //console.log(pivottablenullvalbgcolor);
                // end
                var basestyle = '';
                var font = layout.customfont;
                font.replace(/\s /g, '+');
                if (font == '' || font == undefined || font == "Default") {} else {
                    console.log("Font is :", font);
                    basestyle += "@import url('https://fonts.googleapis.com/css?family=" + font + "');";
                }
                //console.log(objectlist);
                // sheet background
                if (layout.sheetbackgroundcolororimg) {
                    if (layout.sheetbackgroundimage == '' || layout.sheetbackgroundimage == undefined || layout.sheetbackgroundimage == 'undefined') {
                        console.log('content img : ' + layout.sheetbackgroundimgurl);
                        basestyle += '#grid-wrap.sheet-grid{ background:' + layout.sheetbackgroundimgurl + ' !important; }   \n ';
                    } else {
                        console.log('url img : ' + layout.sheetbackgroundimage);
                        basestyle += '#grid-wrap.sheet-grid{background:url(' + layout.sheetbackgroundimage + ') !important;   }   \n ';
                    }
                } else {
                    console.log('bg color : ' + layout.sheetbackground);
                    basestyle += ' #grid-wrap.sheet-grid{ background:' + layout.sheetbackground + ' !important;   }  \n ';

                }
                // qv-gridcell active
                basestyle += '#grid .qv-gridcell.active{ border: 2px solid ' + layout.gridcellactive + ' !important; }';
                // title img
                $('.sheet-title-logo-img img').css("width", layout.titleimgwidth);
                // hide title
                if (layout.titleHide) {
                    $('.sheet-title-container').hide();
                } else {
                    $('.sheet-title-container').show();
                }
                // title height
                $('.sheet-title-container').css("height", layout.titleheight + 'px');
                $('#sheet-title').css("height", layout.titleheight + 'px');
                // title font size
                $('#sheet-title span').css("font-size", layout.titlefontsize1 + 'px');

                // hide selection bar
                if (layout.selectionbarHide) {
                    $('.qvt-selections').hide();
                } else {
                    $('.qvt-selections').show();
                }
                // selection bar styling
                basestyle += ' .qv-panel-current-selections{ background-color: ' + layout.prop.selectionbarbg + ' !important } \n';
                basestyle += ' .qv-panel-current-selections .wrap{ background-color: ' + layout.prop.selectionbarbg + ' !important } \n';
                basestyle += ' .qv-panel-current-selections .buttons-end .qv-subtoolbar-button{  background-color: ' + layout.prop.selectionbarbuttonbg + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .buttons-end .qv-subtoolbar-button span,.qv-panel-current-selections .buttons-end .qv-subtoolbar-button i{   color: ' + layout.prop.selectionbartextcolor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .buttons .qv-subtoolbar-button{  background-color: ' + layout.prop.selectionbarbuttonbg + ' !important;  color: ' + layout.prop.selectionbartextcolor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .no-selection{  color: ' + layout.prop.selectionbartextcolor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .item {  color: ' + layout.prop.selectionbartextcolor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .values :not(.item-locked) {  color: ' + layout.prop.selectionbartextcolor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .remove {  color: ' + layout.prop.selectionbartextcolor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .item:hover{ background-color: ' + layout.prop.selectionbaritemhovercolor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections li{ background-color: ' + layout.prop.selectionbaritemcolor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .buttons.border-right{ border-right: 1px solid ' + layout.prop.selectionbarBorderColor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .wrap{ border-bottom: 1px solid ' + layout.prop.selectionbarBorderColor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .buttons-end.border-left{ border-left: 1px solid ' + layout.prop.selectionbarBorderColor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .buttons-end .qv-subtoolbar-button{ border-bottom: 1px solid ' + layout.prop.selectionbarBorderColor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .buttons.border-bottom{ border-bottom: 1px solid ' + layout.prop.selectionbarBorderColor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .buttons .qv-subtoolbar-button{ border-bottom: 1px solid ' + layout.prop.selectionbarBorderColor + ' !important; } \n';
                basestyle += ' .qv-panel-current-selections .buttons-end .qv-insight-toggle-button.bright{ border-left: 1px solid ' + layout.prop.selectionbarBorderColor + ' !important; } \n';

                /* basic styling */
                if (layout.qvobjecttransparent) {
                    basestyle += '.qv-object{ background: transparent !important; } \n ';
                }
                /* fullscreen padding issue */
                basestyle += '\n .sheet-grid #grid .zoom .qv-object-wrapper .qv-inner-object { padding: 0px !important; } \n';
                $.each(objectlist, function(k, v) {
                    //header bg and other css will not apply to kpi and text obj and action navigation
                    if (layout.customactionstyle) {
                        basestyle += 'article.qv-object-' + v + ' .qv-inner-object .qv-object-content-container{border: 1px solid #d7cfcf !important;;}';
                        basestyle += '.grid-wrap-zoom-cell .qv-object-' + v + ' .qv-object-content-container {padding-top: 1px !important;}';
                        basestyle += '.qv-object-' + v + ' .qv-object-content-container {padding-top: 1px !important;}';
                        basestyle += '.qv-object-nav > a.border {border: 1px solid #ccc !important;padding: 5px !important;background: #FFFFFF !important;color: #a19a9a !important;border-radius: 0% !importnat;}';
                        /* change 50px dynamic */
                        basestyle += '.qv-object-nav{top: ' + layout.customactionbtntop + 'px !important;}';
                        basestyle += '.grid-wrap-zoom-cell .qv-object-nav{top: 9px !important;right: 17px !important;}';
                        basestyle += '.grid-wrap-zoom-cell  .qv-object-nav > a {font-size: 15px !important;}';
                        basestyle += '.qv-object-nav > a {font-size: 12px !important;line-height: 14px !important;width: 14px !important;height: 14px !important;}';
                        basestyle += '.qv-object-nav > a.border{border-radius: 0% !important;}';
                        basestyle += '.sheet-grid article.qv-object-filterpane .qv-object-nav {top: 45px !important;}';
                        basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-filterpane .qv-object-nav {top: -5px !important;}';
                        basestyle += '.sheet-grid article.qv-object-text-image .qv-object-nav {top: 45px !important;}';
                        basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-text-image .qv-object-nav {top: -5px !important;}';
                        basestyle += '.sheet-grid article.qv-object-kpi .qv-object-nav {top: 45px !important;}';
                        basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-kpi .qv-object-nav {top: -5px !important;}';
                        basestyle += '.sheet-grid article.qv-object-filterpane .qv-object-nav > a {font-size: 12px !important;line-height: 14px !important;width: 14px !important;height: 14px !important;}';
                        basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-filterpane .qv-object-nav > a { color: rgba(89, 89, 89, 0.6); font-size: 20px !important;line-height: 36px !important;width: 44px !important;height: 36px !important;}';
                        basestyle += '.sheet-grid article.qv-object-text-image .qv-object-nav > a {font-size: 12px !important;line-height: 14px !important;width: 14px !important;height: 14px !important;}';
                        basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-text-image .qv-object-nav > a {    color: rgba(89, 89, 89, 0.6); font-size: 20px !important;line-height: 36px !important;width: 44px !important;height: 36px !important;}';
                        basestyle += '.sheet-grid article.qv-object-kpi .qv-object-nav > a {font-size: 12px !important;line-height: 14px !important;width: 14px !important;height: 14px !important;}';
                        basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-kpi .qv-object-nav > a {    color: rgba(89, 89, 89, 0.6); font-size: 20px !important;line-height: 36px !important;width: 44px !important;height: 36px !important;}';
                    }
                    if (layout.ignorekpiandtextbox) {
                        if (v == 'kpi' || v == 'text-image') {
                            basestyle += '.qv-object-' + v + ' .qv-object-content-container { border: 1px solid #d7cfcf !important;}\n';
                            basestyle += 'article.qv-object-' + v + ' { background: ' + containerbgcolor + '; }';
                        } else {
                            basestyle += 'article.qv-object-' + v + ' .qv-inner-object header{background: ' + headerbg + ' !important; text-transform: capitalize !important; padding:0px !important;  }\n';
                            // edit here
                            basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h1.qv-object-title .qv-object-title-text{ text-align:' + layout.headertextalin + ' !important; padding: 0 0px 0 0 !important;  color: ' + headercolor + '!important ;  font-weight: ' + layout.headerfontweight + ' !important;  font-size: ' + layout.headerfontsize + 'px;}\n';
                            basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h1.qv-object-title .qv-object-title-text{ width: 100% !important; padding: ' + layout.headerpaddingtop + 'px ' + layout.headerpaddingright + 'px ' + layout.headerpaddingbottom + 'px ' + layout.headerpaddingleft + 'px !important;}\n';
                            basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h2.qv-object-subtitle  {color: ' + headercolor + ' !important;   padding: 0 0 0 ' + layout.headerpaddingleft + 'px !important; }\n';
                            basestyle += '.qv-object-' + v + ' .qv-object-content-container {margin-top: ' + layout.qvobjecttopmargin + ' !important; }\n';
                            // object border 
                            if (layout.qvobjectborder) {
                                //	basestyle += '.qv-object-' + v + ' .qv-object-content-container {  border: ' + layout.qvobjectbordercss + ' !important;}\n';
                                //} else {
                                basestyle += '.qv-object-' + v + ' .qv-inner-object  {border: ' + layout.qvobjectbordercss + ' !important;}\n';
                            }
                            basestyle += '.grid-wrap-zoom-cell .qv-object-' + v + ' .qv-object-nav.zero-top > a {color: ' + actionbtncolor + ' !important;}\n';
                            basestyle += 'article.qv-object-' + v + ' .qv-inner-object { background: ' + containerbgcolor + ' !important; }';
                        }
                    } else {
                        basestyle += 'article.qv-object-' + v + ' .qv-inner-object header{background: ' + headerbg + '; text-transform: capitalize !important; padding:0px !important;  }\n';
                        // edit here
                        basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h1.qv-object-title { text-align:' + layout.headertextalin + ' !important; padding: 0 0px 0 0 !important; color: ' + headercolor + ' !important;font-weight: ' + layout.headerfontweight + ' !important;font-size: ' + layout.headerfontsize + 'px;}\n';
                        basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h1.qv-object-title .qv-object-title-text{ width: 100%; padding: ' + layout.headerpaddingtop + 'px ' + layout.headerpaddingright + 'px ' + layout.headerpaddingbottom + 'px ' + layout.headerpaddingleft + 'px;}\n';
                        basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h2.qv-object-subtitle  {color: ' + headercolor + ' !important;   padding: 0 0 0 ' + layout.headerpaddingleft + 'px !important; }\n';
                        basestyle += '.qv-object-' + v + ' .qv-object-content-container {margin-top: ' + layout.qvobjecttopmargin + ' !important; }\n';
                        // object border 
                        if (layout.qvobjectborder) {
                            basestyle += '.qv-object-' + v + ' .qv-object-content-container {  border: ' + layout.qvobjectbordercss + ' !important;}\n';
                        } else {
                            basestyle += '.qv-object-' + v + ' .qv-inner-object  {border: ' + layout.qvobjectbordercss + ' !important;}\n';
                        }
                        basestyle += '.grid-wrap-zoom-cell .qv-object-' + v + ' .qv-object-nav.zero-top > a {color: ' + actionbtncolor + ' !important;}\n';
                        basestyle += 'article.qv-object-' + v + ' .qv-inner-object { background: ' + containerbgcolor + ' !important; }'
                    }
                });
                /* end basic styling */
                /*table css*/
                // th column name
                basestyle += '.qv-st-header-wrapper tr:nth-child(1) {background: ' + tablebgcolor + ' !important; color: ' + tablecolor + ' !important;}';
                // th total column
                basestyle += '.qv-st-header-wrapper tr:nth-child(2) {background: ' + tabletotalbgcolor + ' !important; color: ' + tabletotalcolor + ' !important;}';
                // total culumn buttom
                basestyle += '.qv-st-bottom-header tr{ background: ' + tabletotalbottombgcolor + ' !important;color: ' + tabletotalbottomcolor + ' !important; }';
                // odd
                basestyle += '.qv-object-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(even) {background: ' + tableevencolor + ' !important;}';
                //even
                basestyle += '.qv-object-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(odd) {background: ' + tableoddcolor + ' !important;}';
                // hover
                basestyle += '.qv-st-header-wrapper tr:nth-child(1) :hover {background: ' + tablehoverbgcolor + ' !important; color: ' + tablehovercolor + ' !important;}';
                basestyle += '.qv-st-header-wrapper tr:nth-child(2) :hover {background: ' + tabletotalhoverbgcolor + ' !important; color: ' + tabletotalhovercolor + ' !important;}';
                basestyle += '.qv-st-bottom-header tr :hover{ background: ' + tabletotalhoverbottombgcolor + ' !important; color: ' + tabletotalhoverbottomcolor + ' !important; }';
                // column width adjuster & color
                basestyle += '.column-width-adjuster .column-width-adjust-line { width:' + tablecolumwidthadjuster + 'px !important; background: ' + tablecolumwidthadjustercolor + ' !important; }';
                // table header border
                basestyle += 'table .qv-st-header-cell { border:' + tableheaderborder + ' !important; }';

                // align tablenumericalign tabletextalign
                //11/6/2018
                basestyle += 'table .qv-st-data-cell.qv-st-data-cell-numeric .qv-st-value { text-align:' + tablenumericalign + ' !important; }';
                basestyle += 'table .qv-st-data-cell.qv-st-data-cell-dimension-value .qv-st-value { text-align:' + tabletextalign + ' !important; }';
                basestyle += 'table .qv-st-data-cell .qv-st-value { text-align:' + tablecustomalign + ' !important; }';
                basestyle += 'table tr th .qv-st-value { text-align:' + tablecolumnalign + ' !important; }';
                // table datastyle : tablecellstyle
                if (tablecellstyle == 'standard' || tablecellstyle == "standard") {
                    // table data font size
                } else if (tablecellstyle == 'small' || tablecellstyle == "small") {
                    // table data formatting
                    basestyle += 'table tr td.qv-st-data-cell { padding-left: 1px !important; padding-top: 0.3em !important;  padding-bottom: 0.3em !important; ';
                } else if (tablecellstyle == 'medium' || tablecellstyle == "medium") {
                    // table data formatting
                    basestyle += 'table tr td.qv-st-data-cell { padding-left: 1px !important; padding-top: 0.6em !important;  padding-bottom: 0.6em !important; ';
                } else if (tablecellstyle == 'large' || tablecellstyle == "large") {
                    // table data formatting
                    basestyle += 'table tr td.qv-st-data-cell { padding-left: 1px !important; padding-top: 1em !important;  padding-bottom: 1em !important; ';
                }
                // table data font size
                if (tablecellfontsize == 'standard' || tablecellfontsize == "standard") {
                    // table data font size
                    basestyle += ' }';
                } else if (tablecellfontsize == 'small' || tablecellfontsize == "small") {
                    basestyle += ' font-size: 0.6em !important; }';
                } else if (tablecellfontsize == 'medium' || tablecellfontsize == "medium") {
                    // table data font size
                    basestyle += ' font-size: 1.1em !important; }';
                } else if (tablecellfontsize == 'large' || tablecellfontsize == "large") {
                    // table data font size
                    basestyle += ' font-size: 1.2em !important; }';
                }

                // end

                // pivotsupport
                if (layout.pivotsupport) {
                    // odd
                    //  debugger;

                    // console.log(pivottablenullvalbgcolor);

                    basestyle += '.qv-object-pivot-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(even) {background: ' + tableevencolor + ' !important;}';
                    //even
                    basestyle += '.qv-object-pivot-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(odd) {background: ' + tableoddcolor + ' !important;}';
                    basestyle += '.qv-object-pivot-table .qv-inner-object table tr[tid="header.row"]{background: ' + pivottablebgcolor + ' !important; color: ' + pivottablecolor + ' !important;}';
                    // hover
                    basestyle += '.qv-object-pivot-table .qv-inner-object table tr[tid="header.row"]:hover{background: ' + pivottablehoverbgcolor + ' !important; color: ' + pivottablehovercolor + ' !important;}';

                    // 11/6/2018
                    //	num val alingn
                    if (!pivottablenumericalign == undefined || pivottablenumericalign == 'Default' || pivottablenumericalign == "Default") {} else {
                        basestyle += '.qv-object-pivot-table .qv-inner-object table td.cell.numeric { text-align: ' + pivottablenumericalign + ' !important; }';
                    }
                    //5/11/2018
                    // header text align
                    if (!pivottabledataheaderalign == undefined || pivottabledataheaderalign == 'Default' || pivottabledataheaderalign == "Default") {} else {
                        basestyle += '.qv-object-pivot-table .qv-inner-object table td.cell.header { text-align: ' + pivottabledataheaderalign + ' !important; }';
                    }
                    // custom text align
                    if (!pivottablecustomalign == undefined || pivottablecustomalign == 'Default' || pivottablecustomalign == "Default") {} else {
                        basestyle += '.qv-object-pivot-table .qv-inner-object table td.cell.data { text-align: ' + pivottablecustomalign + ' !important; }';
                    }
                    basestyle += '.qv-object-pivot-table .qv-inner-object table .cell.null-value { background-color: ' + pivottablenullvalbgcolor.color + ' !important; }';
                    // header align
                    if (!pivottableheaderalign == undefined || pivottableheaderalign == 'Default' || pivottableheaderalign == "Default") {} else {
                        basestyle += '.qv-object-pivot-table .qv-inner-object table tr th div {font-size:' + pivottableheaderfontsize + 'px !important;text-align: ' + pivottableheaderalign + ' !important; }';
                    }
                    if (!pivottableheaderweight == undefined || pivottableheaderweight == 'Default' || pivottableheaderweight == "Default") {} else {
                        //console.log(pivottableheaderweight);
                        basestyle += '.qv-object-pivot-table .qv-inner-object table tr th div{font-weight:' + pivottableheaderweight + ' !important;}';
                    }
                    // hide button measure
                    //customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table tr th .button-wrapper:has(div[title="Measures"]) { display:none !important; }';
                    $('.qv-object-pivot-table .qv-inner-object table tr th .button-wrapper:has(div[title="Values"])').css("display", "none");
                    // end

                }
                /*end table css*/
                /* html document font style */
                // 'QlikView Sans', sans-serif
                //basestyle += '@import url(https://fonts.googleapis.com/css?family=Roboto:400,500);';
                basestyle += 'body,input,textarea,keygen,select,button,isindex {	font-family: ' + layout.customfont + ' !important; }';
                basestyle += ' .qv-selection-toolbar {	font-family: ' + layout.customfont + ' !important;  } ';
                basestyle += ' .qv-progress-bar {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-panel-current-selections {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-object *{	font-family: ' + layout.customfont + ' !important;	} ';
                //  basestyle += '.qv-object .qv-object-header {	font-family: ' + layout.customfont + ' !important;	} ';
                //  basestyle += '.qv-object .qv-object-subtitle {	font-family: ' + layout.customfont + ' !important;	} ';
                //  basestyle += '.qv-object .qv-object-footnote {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-object .lui-icon, .qv-object .lui-caret, .qv-object .lui-checkbox__check {  font-family: "LUI icons" !important;	}';
                basestyle += '.qv-chart-component {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-tooltip {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-listbox {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qui-immidiateContextual {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qui-delayedModal {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-object-info-mobile .qv-mi-toolbar .qv-mi-toolbar-close,.qv-object-info-mobile .qv-mi-toolbar .qv-mi-toolbar-title {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-global-selections {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-global-search {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-mobile-print .qv-mp-toolbar .qv-mp-toolbar-confirm,.qv-mobile-print .qv-mp-toolbar .qv-mp-toolbar-close {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-mobile-selections .qv-ms-toolbar .qv-ms-toolbar-close {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-odag-bar {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-odag-bar .leftOdag .list .odag-nav-point .nav-point-container .odag-nav-point-cell {	font-family: ' + layout.customfont + ' !important; }	 ';
                basestyle += '.odag-toolbar-navpoint-popover {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.odag-request-menu {	font-family: ' + layout.customfont + ' !important;	} ';
                basestyle += '.qv-small-av .qv-tbar .qv-bm-toolbar-close {	font-family: ' + layout.customfont + ' !important;	} ';
                // end font
                basestyle += '.qv-object-QlikSense-Sheet-Styler-Lite ~ .qv-object-nav>a {  display: none !important;  }   .qv-object-QlikSense-Sheet-Styler-Lite .qv-object-nav>a {  display: none !important;  }';
                /* for gap in objects */
                basestyle += '.sheet-grid .qv-gridcell{  border: 0px solid rgba(0, 0, 0, 0) !important;   }';
                /* for fa icon fix in objects */
                basestyle += '.fa {	font-family: FontAwesome !important;  }';
                // $('<style id="custom-Qs"></style>').html(basestyle).appendTo('head');

                console.time('add style start #2');
                console.timeEnd('add style start #2');
                // if in edit mode change style on fly
                if (qlik.navigation.isModeAllowed(qlik.navigation.EDIT)) {
                    $('#custom-Qs').remove();
                    $('<style id="custom-Qs"></style>').html(basestyle).appendTo('head');
                } else {
                    if ($("#custom-Qs").length == 0) {
                        $('#custom-Qs').remove();
                        $('<style id="custom-Qs"></style>').html(basestyle).appendTo('head');
                    }
                }

                if (layout.CustomLayoutforobjects) {
                    // manually add object style 
                    var customobjectstyle = '';
					
                    $.each(layout.listItems3, function(k, v) {
                        // console.log(v);
                        customobjectstyle += 'div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-inner-object header{background: ' + v.headerbgcolor + '; text-transform: capitalize !important; padding:0px !important;  }\n';
                        // edit here
                        customobjectstyle += 'div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-inner-object header h1.qv-object-title { text-align:' + v.headertextalin + ' !important; padding: 0 0px 0 0 !important;  color: ' + v.headercolor + '!important ;  font-weight: ' + v.headerfontweight + ' !important;  font-size: ' + v.headerfontsize + 'px !important;}\n';
                        customobjectstyle += 'div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-inner-object header h1.qv-object-title .qv-object-title-text{ width: 100% !important; padding: ' + v.headerpaddingtop + 'px ' + v.headerpaddingright + 'px ' + v.headerpaddingbottom + 'px ' + v.headerpaddingleft + 'px !important;}\n';
                        customobjectstyle += 'div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-inner-object header h2.qv-object-subtitle  {color: ' + v.headercolor + ' !important;   padding: 0 0 0 ' + v.headerpaddingleft + 'px !important; }\n';
                        customobjectstyle += 'div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-object-content-container {margin-top: ' + v.qvobjecttopmargin + ' !important; }\n';
                        // object border 
                        if (layout.qvobjectborder) {
                            customobjectstyle += 'div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-object-content-container {  border: ' + v.qvobjectbordercss + ' !important;}\n';
                        } else {
                            customobjectstyle += 'div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-inner-object  {border: ' + v.qvobjectbordercss + ' !important;}\n';
                        }
                        customobjectstyle += '.grid-wrap-zoom-cell div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-object-nav.zero-top > a {color: ' + actionbtncolor + ' !important;}\n';
                        customobjectstyle += 'div[tid="' + v.selectedSheetObj + '"] article.qv-object .qv-inner-object { background: ' + v.containerbgcolor + ' !important; }';
                   		console.log(customobjectstyle);
				   
				   });

					setTimeout(function(){
					// end custom table selected styling 
                    // if in edit mode change style on fly
                    if (qlik.navigation.isModeAllowed(qlik.navigation.EDIT)) {
                        $('#custom-QsObjects').remove();
                        $('<style id="custom-QsObjects"></style>').html(customobjectstyle).appendTo('head');
                    } else {
                        if ($("#custom-QsObjects").length == 0) {
                            $('#custom-QsObjects').remove();
                            $('<style id="custom-QsObjects"></style>').html(customobjectstyle).appendTo('head');
                        }
                    }
					},1000);
                }

                if (layout.customtablestyleenable) {
                    // custom table styling
                    var customtablestyle = '';
                    $.each(layout.customtablestyle, function(k, v) {
                        /*table css*/
                        // th column name
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-st-header-wrapper tr:nth-child(1) {background: ' + v.tablebgcolor + ' !important; color: ' + v.tablecolor + ' !important;}';
                        // th total column
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-st-header-wrapper tr:nth-child(2) {background: ' + v.tabletotalbgcolor + ' !important; color: ' + v.tabletotalcolor + ' !important;}';
                        // total culumn buttom
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-st-bottom-header tr{ background: ' + v.tabletotalbottombgcolor + ' !important;color: ' + v.tabletotalbottomcolor + ' !important; }';
                        // odd
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(even) {background: ' + v.tableevencolor + ' !important;}';
                        //even
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(odd) {background: ' + v.tableoddcolor + ' !important;}';
                        // hover
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-st-header-wrapper tr:nth-child(1) :hover {background: ' + v.tablehoverbgcolor + ' !important; color: ' + v.tablehovercolor + ' !important;}';
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-st-header-wrapper tr:nth-child(2) :hover {background: ' + v.tabletotalhoverbgcolor + ' !important; color: ' + v.tabletotalhovercolor + ' !important;}';
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-st-bottom-header tr :hover{ background: ' + v.tabletotalhoverbottombgcolor + ' !important; color: ' + v.tabletotalhoverbottomcolor + ' !important; }';
                        // column width adjuster & color
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .column-width-adjuster .column-width-adjust-line { width:' + v.tablecolumwidthadjuster + 'px !important; background: ' + v.tablecolumwidthadjustercolor + ' !important; }';
                        // table header border
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] table .qv-st-header-cell { border:' + v.tableheaderborder + ' !important; }';

                        // align tablenumericalign tabletextalign
                        //11/6/2018
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] table .qv-st-data-cell.qv-st-data-cell-numeric .qv-st-value { text-align:' + v.tablenumericalign + ' !important; }';
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] table .qv-st-data-cell.qv-st-data-cell-dimension-value .qv-st-value { text-align:' + v.tabletextalign + ' !important; }';
                        //5/11/2018
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] table .qv-st-data-cell .qv-st-value { text-align:' + v.tablecustomalign + ' !important; }';
                        customtablestyle += 'div[tid="' + v.selectedTableObject + '"] table tr th .qv-st-value { text-align:' + v.tablecolumnalign + ' !important; }';
                        // table datastyle : tablecellstyle
                        if (v.tablecellstyle == 'standard' || v.tablecellstyle == "standard") {
                            // table data font size
                        } else if (v.tablecellstyle == 'small' || v.tablecellstyle == "small") {
                            // table data formatting
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] table tr td.qv-st-data-cell { padding-left: 1px !important; padding-top: 0.3em !important;  padding-bottom: 0.3em !important; ';
                        } else if (v.tablecellstyle == 'medium' || v.tablecellstyle == "medium") {
                            // table data formatting
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] table tr td.qv-st-data-cell { padding-left: 1px !important; padding-top: 0.6em !important;  padding-bottom: 0.6em !important; ';
                        } else if (v.tablecellstyle == 'large' || v.tablecellstyle == "large") {
                            // table data formatting
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] table tr td.qv-st-data-cell { padding-left: 1px !important; padding-top: 1em !important;  padding-bottom: 1em !important; ';
                        }
                        // table data font size
                        if (v.tablecellfontsize == 'standard' || v.tablecellfontsize == "standard") {
                            // table data font size
                            customtablestyle += ' }';
                        } else if (v.tablecellfontsize == 'small' || v.tablecellfontsize == "small") {
                            customtablestyle += ' font-size: 0.6em !important; }';
                        } else if (v.tablecellfontsize == 'medium' || v.tablecellfontsize == "medium") {
                            // table data font size
                            customtablestyle += ' font-size: 1.1em !important; }';
                        } else if (v.tablecellfontsize == 'large' || v.tablecellfontsize == "large") {
                            // table data font size
                            customtablestyle += ' font-size: 1.2em !important; }';
                        }

                        // end


                        // pivotsupport
                        if (v.pivotsupport) {
                            // odd
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(even) {background: ' + v.tableevencolor + ' !important;}';
                            //even
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(odd) {background: ' + v.tableoddcolor + ' !important;}';
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table tr:nth-child(1) {background: ' + v.pivottablebgcolor + ' !important; color: ' + v.pivottablecolor + ' !important;}';
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table tr:nth-child(2) {background: ' + v.pivottablebgcolor + ' !important; color: ' + v.pivottablecolor + ' !important;}';
                            // hover
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table tr:nth-child(2) :hover {background: ' + v.pivottablehoverbgcolor + ' !important; color: ' + v.pivottablehovercolor + ' !important;}';

                            //	num val alingn
                            if (v.pivottablenumericalign == 'Default' || v.pivottablenumericalign == "Default") {} else {
                                customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table td.cell.numeric { text-align: ' + v.pivottablenumericalign + ' !important; }';
                            }
                            //5/11/2018
                            // header text align
                            if (v.pivottabledataheaderalign == 'Default' || v.pivottabledataheaderalign == "Default") {} else {
                                customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table td.cell.header { text-align: ' + v.pivottabledataheaderalign + ' !important; }';
                            }
                            // custom text align
                            if (v.pivottablecustomalign == 'Default' || v.pivottablecustomalign == "Default") {} else {
                                customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table td.cell.data { text-align: ' + v.pivottablecustomalign + ' !important; }';
                            }
                            customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table .cell.null-value { background-color: ' + v.pivottablenullvalbgcolor.color + ' !important; }';
                            // header align
                            if (v.pivottableheaderalign == 'Default' || v.pivottableheaderalign == "Default") {} else {
                                customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table tr th div {font-size:' + v.pivottableheaderfontsize + 'px !important;text-align: ' + v.pivottableheaderalign + ' !important; }';
                            }
                            if (v.pivottableheaderweight == 'Default' || v.pivottableheaderweight == "Default") {} else {
                                console.log(v.pivottableheaderweight);
                                customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table tr th div{font-weight:' + v.pivottableheaderweight + ' !important;}';
                            }
                            // hide button measure
                            //customtablestyle += 'div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table tr th .button-wrapper:has(div[title="Measures"]) { display:none !important; }';
                            $('div[tid="' + v.selectedTableObject + '"] .qv-object-pivot-table .qv-inner-object table tr th .button-wrapper:has(div[title="Measures"])').css("display", "none");


                        }


                    });
                    // if in edit mode change style on fly
                    if (qlik.navigation.isModeAllowed(qlik.navigation.EDIT)) {
                        $('#custom-QsTable').remove();
                        $('<style id="custom-QsTable"></style>').html(customtablestyle).appendTo('head');
                    } else {
                        if ($("#custom-QsTable").length == 0) {
                            $('#custom-QsTable').remove();
                            $('<style id="custom-QsTable"></style>').html(customtablestyle).appendTo('head');
                        }
                    }

                }


                console.time('add style end #2');
                console.timeEnd('add style end #2');
                $element.html('<textarea id="xportcsstext" class="simple-textarea lui-textarea" rows="10">' + basestyle + '</textarea>');
                $(".qv-object-QlikSense-Sheet-Styler-Lite .qv-object-header").hide();
                if (!xportlayout) {
                    $(this).hide();
                    $("#xportcsstext").hide();
                }
                console.time('qlik Function start #2');
                console.timeEnd('qlik Function start #2');
                // end
            }
        }
    };
});
