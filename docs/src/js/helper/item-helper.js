import { Arr, Obj, UUID } from "@kizmann/pico-js";

export const RegionList = [
    {
        'name': 'Baden-Württemberg',
        'population': '11.070.000',
        'size': '35.751 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Baden-Württemberg.svg/1000px-Flag_of_Baden-Württemberg.svg.png',
        'cities': [
            {
                name: 'Stuttgart',
                population: '635.000',
                size: '207,4 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Stuttgart.svg/1000px-Flag_of_Stuttgart.svg.png'
            },
            {
                name: 'Karlsruhe',
                population: '313.000',
                size: '173,5 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Karlsruhe.svg/1000px-Flag_of_Karlsruhe.svg.png'
            },
            {
                name: 'Mannheim',
                population: '309.000',
                size: '145 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Mannheim.svg/1000px-Flag_of_Mannheim.svg.png'
            }
        ]
    },
    {
        'name': 'Bayern',
        'population': '13.140.000',
        'size': '70.542 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_Bavaria_%28lozengy%29.svg/1000px-Flag_of_Bavaria_%28lozengy%29.svg.png',
        'cities': [
            {
                name: 'München',
                population: '1.472.000',
                size: '310,7 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Munich.svg/1000px-Flag_of_Munich.svg.png'
            },
            {
                name: 'Nürnberg',
                population: '518.000',
                size: '186,5 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Flag_of_Nuremberg.svg/1000px-Flag_of_Nuremberg.svg.png'
            },
            {
                name: 'Augsburg',
                population: '296.000',
                size: '147,8 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Flag_of_Augsburg.svg/1000px-Flag_of_Augsburg.svg.png'
            }
        ]
    },
    {
        'name': 'Berlin',
        'population': '3.670.000',
        'size': '891,7 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Flag_of_Berlin.svg/1000px-Flag_of_Berlin.svg.png',
        'cities': [
            {
                name: 'Berlin',
                population: '3.670.000',
                size: '891,7 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Flag_of_Berlin.svg/1000px-Flag_of_Berlin.svg.png'
            }
        ]
    },
    {
        'name': 'Brandenburg',
        'population': '2.531.000',
        'size': '29.654 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Brandenburg.svg/1000px-Flag_of_Brandenburg.svg.png',
        'cities': [
            {
                name: 'Potsdam',
                population: '182.000',
                size: '188,2 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flag_of_Potsdam.svg/1000px-Flag_of_Potsdam.svg.png'
            },
            {
                name: 'Cottbus',
                population: '100.000',
                size: '164,2 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Cottbus.svg/1000px-Flag_of_Cottbus.svg.png'
            },
            {
                name: 'Brandenburg an der Havel',
                population: '72.000',
                size: '228,8 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Flag_of_Brandenburg_an_der_Havel.svg/1000px-Flag_of_Brandenburg_an_der_Havel.svg.png'
            }
        ]
    },
    {
        'name': 'Bremen',
        'population': '680.000',
        'size': '419,4 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Bremen.svg/1000px-Flag_of_Bremen.svg.png',
        'cities': [
            {
                name: 'Bremen',
                population: '569.000',
                size: '326,7 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Bremen.svg/1000px-Flag_of_Bremen.svg.png'
            },
            {
                name: 'Bremerhaven',
                population: '113.000',
                size: '93,8 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Bremerhaven.svg/1000px-Flag_of_Bremerhaven.svg.png'
            }
        ]
    },
    {
        'name': 'Hamburg',
        'population': '1.841.000',
        'size': '755,2 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_Hamburg.svg/1000px-Flag_of_Hamburg.svg.png',
        'cities': [
            {
                name: 'Hamburg',
                population: '1.841.000',
                size: '755,2 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_Hamburg.svg/1000px-Flag_of_Hamburg.svg.png'
            }
        ]
    },
    {
        'name': 'Hessen',
        'population': '6.288.000',
        'size': '21.115 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Hesse.svg/1000px-Flag_of_Hesse.svg.png',
        'cities': [
            {
                name: 'Frankfurt am Main',
                population: '763.000',
                size: '248,3 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Flag_of_Frankfurt_am_Main.svg/1000px-Flag_of_Frankfurt_am_Main.svg.png'
            },
            {
                name: 'Wiesbaden',
                population: '278.000',
                size: '203,9 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Flag_of_Wiesbaden.svg/1000px-Flag_of_Wiesbaden.svg.png'
            },
            {
                name: 'Kassel',
                population: '202.000',
                size: '106,8 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Flag_of_Kassel.svg/1000px-Flag_of_Kassel.svg.png'
            }
        ]
    },
    {
        'name': 'Niedersachsen',
        'population': '8.003.000',
        'size': '47.709 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Flag_of_Lower_Saxony.svg/1000px-Flag_of_Lower_Saxony.svg.png',
        'cities': [
            {
                name: 'Hannover',
                population: '534.000',
                size: '204 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Hannover.svg/1000px-Flag_of_Hannover.svg.png'
            },
            {
                name: 'Braunschweig',
                population: '249.000',
                size: '192 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_Braunschweig.svg/1000px-Flag_of_Braunschweig.svg.png'
            },
            {
                name: 'Oldenburg',
                population: '169.000',
                size: '102,9 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Oldenburg.svg/1000px-Flag_of_Oldenburg.svg.png'
            }
        ]
    },
    {
        'name': 'Mecklenburg-Vorpommern',
        'population': '1.610.000',
        'size': '23.294 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Mecklenburg-Western_Pomerania.svg/1000px-Flag_of_Mecklenburg-Western_Pomerania.svg.png',
        'cities': [
            {
                name: 'Rostock',
                population: '209.000',
                size: '181,4 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Flag_of_Rostock.svg/1000px-Flag_of_Rostock.svg.png'
            },
            {
                name: 'Schwerin',
                population: '95.000',
                size: '130,5 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Schwerin.svg/1000px-Flag_of_Schwerin.svg.png'
            },
            {
                name: 'Neubrandenburg',
                population: '64.000',
                size: '85,7 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Neubrandenburg.svg/1000px-Flag_of_Neubrandenburg.svg.png'
            }
        ]
    },
    {
        'name': 'Nordrhein-Westfalen',
        'population': '17.930.000',
        'size': '34.110 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_North_Rhine-Westphalia.svg/1000px-Flag_of_North_Rhine-Westphalia.svg.png',
        'cities': [
            {
                name: 'Köln',
                population: '1.087.000',
                size: '405,2 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Cologne.svg/1000px-Flag_of_Cologne.svg.png'
            },
            {
                name: 'Düsseldorf',
                population: '619.000',
                size: '217,4 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Düsseldorf.svg/1000px-Flag_of_Düsseldorf.svg.png'
            },
            {
                name: 'Dortmund',
                population: '587.000',
                size: '280,7 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Dortmund.svg/1000px-Flag_of_Dortmund.svg.png'
            }
        ]
    },
    {
        'name': 'Rheinland-Pfalz',
        'population': '4.093.000',
        'size': '19.854 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Rhineland-Palatinate.svg/1000px-Flag_of_Rhineland-Palatinate.svg.png',
        'cities': [
            {
                name: 'Mainz',
                population: '218.000',
                size: '97,8 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Flag_of_Mainz.svg/1000px-Flag_of_Mainz.svg.png'
            },
            {
                name: 'Ludwigshafen',
                population: '172.000',
                size: '77,7 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_Ludwigshafen.svg/1000px-Flag_of_Ludwigshafen.svg.png'
            },
            {
                name: 'Koblenz',
                population: '114.000',
                size: '105,2 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Flag_of_Koblenz.svg/1000px-Flag_of_Koblenz.svg.png'
            }
        ]
    },
    {
        'name': 'Saarland',
        'population': '983.000',
        'size': '2.570 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Saarland.svg/1000px-Flag_of_Saarland.svg.png',
        'cities': [
            {
                name: 'Saarbrücken',
                population: '181.000',
                size: '167,1 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Saarbrücken.svg/1000px-Flag_of_Saarbrücken.svg.png'
            },
            {
                name: 'Neunkirchen',
                population: '46.000',
                size: '75,1 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Neunkirchen_%28Saar%29.svg/1000px-Flag_of_Neunkirchen_%28Saar%29.svg.png'
            },
            {
                name: 'Homburg',
                population: '42.000',
                size: '82,7 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Flag_of_Homburg_%28Saar%29.svg/1000px-Flag_of_Homburg_%28Saar%29.svg.png'
            }
        ]
    },
    {
        'name': 'Sachsen',
        'population': '4.056.000',
        'size': '18.449 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Saxony.svg/1000px-Flag_of_Saxony.svg.png',
        'cities': [
            {
                name: 'Leipzig',
                population: '593.000',
                size: '297,4 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Flag_of_Leipzig.svg/1000px-Flag_of_Leipzig.svg.png'
            },
            {
                name: 'Dresden',
                population: '554.000',
                size: '328,3 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Flag_of_Dresden.svg/1000px-Flag_of_Dresden.svg.png'
            },
            {
                name: 'Chemnitz',
                population: '247.000',
                size: '221 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Chemnitz.svg/1000px-Flag_of_Chemnitz.svg.png'
            }
        ]
    },
    {
        'name': 'Sachsen-Anhalt',
        'population': '2.180.000',
        'size': '20.454 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Saxony-Anhalt.svg/1000px-Flag_of_Saxony-Anhalt.svg.png',
        'cities': [
            {
                name: 'Halle (Saale)',
                population: '238.000',
                size: '135 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Halle_%28Saale%29.svg/1000px-Flag_of_Halle_%28Saale%29.svg.png'
            },
            {
                name: 'Magdeburg',
                population: '238.000',
                size: '201 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Magdeburg.svg/1000px-Flag_of_Magdeburg.svg.png'
            },
            {
                name: 'Dessau-Roßlau',
                population: '80.000',
                size: '245 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Dessau.svg/1000px-Flag_of_Dessau.svg.png'
            }
        ]
    },
    {
        'name': 'Schleswig-Holstein',
        'population': '2.910.000',
        'size': '15.804 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Schleswig-Holstein.svg/1000px-Flag_of_Schleswig-Holstein.svg.png',
        'cities': [
            {
                name: 'Kiel',
                population: '248.000',
                size: '118,6 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_Kiel.svg/1000px-Flag_of_Kiel.svg.png'
            },
            {
                name: 'Lübeck',
                population: '217.000',
                size: '214,2 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Flag_of_Lübeck.svg/1000px-Flag_of_Lübeck.svg.png'
            },
            {
                name: 'Flensburg',
                population: '90.000',
                size: '56,7 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Flag_of_Flensburg.svg/1000px-Flag_of_Flensburg.svg.png'
            }
        ]
    },
    {
        'name': 'Thüringen',
        'population': '2.133.000',
        'size': '16.202 qkm',
        'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Flag_of_Thuringia.svg/1000px-Flag_of_Thuringia.svg.png',
        'cities': [
            {
                name: 'Erfurt',
                population: '214.000',
                size: '269,2 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Erfurt.svg/1000px-Flag_of_Erfurt.svg.png'
            },
            {
                name: 'Jena',
                population: '111.000',
                size: '114,8 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Flag_of_Jena.svg/1000px-Flag_of_Jena.svg.png'
            },
            {
                name: 'Gera',
                population: '94.000',
                size: '152 qkm',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Gera.svg/1000px-Flag_of_Gera.svg.png'
            }
        ]
    }
];

export class ItemHelper
{
    static get(sorter = [], filter = [])
    {
        return Arr.recursive(RegionList, 'cities', (item) => {
            return Obj.assign({ id: UUID() }, item);
        });
    }
}

export default ItemHelper;