import { Arr, Obj, UUID } from "@kizmann/pico-js";

export const RegionList = [
    {
        'name': 'Baden-Württemberg',
        'population': '11.070.000',
        'size': '35.751 qkm',
        'flag': '../assets/demo/baden-wuerttemberg.png',
        'cities': [
            {
                name: 'Stuttgart',
                population: '635.000',
                size: '207,4 qkm',
                flag: '../assets/demo/baden-wuerttemberg.png'
            },
            {
                name: 'Karlsruhe',
                population: '313.000',
                size: '173,5 qkm',
                flag: '../assets/demo/baden-wuerttemberg.png'
            },
            {
                name: 'Mannheim',
                population: '309.000',
                size: '145 qkm',
                flag: '../assets/demo/baden-wuerttemberg.png'
            }
        ]
    },
    {
        'name': 'Bayern',
        'population': '13.140.000',
        'size': '70.542 qkm',
        'flag': '../assets/demo/bayern.png',
        'cities': [
            {
                name: 'München',
                population: '1.472.000',
                size: '310,7 qkm',
                flag: '../assets/demo/bayern.png',
            },
            {
                name: 'Nürnberg',
                population: '518.000',
                size: '186,5 qkm',
                flag: '../assets/demo/bayern.png',
            },
            {
                name: 'Augsburg',
                population: '296.000',
                size: '147,8 qkm',
                flag: '../assets/demo/bayern.png',
            }
        ]
    },
    {
        'name': 'Berlin',
        'population': '3.670.000',
        'size': '891,7 qkm',
        'flag': '../assets/demo/berlin.png',
        'cities': [
            {
                name: 'Berlin',
                population: '3.670.000',
                size: '891,7 qkm',
                flag: '../assets/demo/berlin.png',
            }
        ]
    },
    {
        'name': 'Brandenburg',
        'population': '2.531.000',
        'size': '29.654 qkm',
        'flag': '../assets/demo/brandenburg.png',
        'cities': [
            {
                name: 'Potsdam',
                population: '182.000',
                size: '188,2 qkm',
                flag: '../assets/demo/brandenburg.png',
            },
            {
                name: 'Cottbus',
                population: '100.000',
                size: '164,2 qkm',
                flag: '../assets/demo/brandenburg.png',
            },
            {
                name: 'Brandenburg an der Havel',
                population: '72.000',
                size: '228,8 qkm',
                flag: '../assets/demo/brandenburg.png',
            }
        ]
    },
    {
        'name': 'Bremen',
        'population': '680.000',
        'size': '419,4 qkm',
        'flag': '../assets/demo/bremen.png',
        'cities': [
            {
                name: 'Bremen',
                population: '569.000',
                size: '326,7 qkm',
                flag: '../assets/demo/bremen.png',
            },
            {
                name: 'Bremerhaven',
                population: '113.000',
                size: '93,8 qkm',
                flag: '../assets/demo/bremen.png',
            }
        ]
    },
    {
        'name': 'Hamburg',
        'population': '1.841.000',
        'size': '755,2 qkm',
        'flag': '../assets/demo/hamburg.png',
        'cities': [
            {
                name: 'Hamburg',
                population: '1.841.000',
                size: '755,2 qkm',
                flag: '../assets/demo/hamburg.png',
            }
        ]
    },
    {
        'name': 'Hessen',
        'population': '6.288.000',
        'size': '21.115 qkm',
        'flag': '../assets/demo/hessen.png',
        'cities': [
            {
                name: 'Frankfurt am Main',
                population: '763.000',
                size: '248,3 qkm',
                flag: '../assets/demo/hessen.png',
            },
            {
                name: 'Wiesbaden',
                population: '278.000',
                size: '203,9 qkm',
                flag: '../assets/demo/hessen.png',
            },
            {
                name: 'Kassel',
                population: '202.000',
                size: '106,8 qkm',
                flag: '../assets/demo/hessen.png',
            }
        ]
    },
    {
        'name': 'Niedersachsen',
        'population': '8.003.000',
        'size': '47.709 qkm',
        'flag': '../assets/demo/niedersachsen.png',
        'cities': [
            {
                name: 'Hannover',
                population: '534.000',
                size: '204 qkm',
                flag: '../assets/demo/niedersachsen.png',
            },
            {
                name: 'Braunschweig',
                population: '249.000',
                size: '192 qkm',
                flag: '../assets/demo/niedersachsen.png',
            },
            {
                name: 'Oldenburg',
                population: '169.000',
                size: '102,9 qkm',
                flag: '../assets/demo/niedersachsen.png',
            }
        ]
    },
    {
        'name': 'Mecklenburg-Vorpommern',
        'population': '1.610.000',
        'size': '23.294 qkm',
        'flag': '../assets/demo/mecklenburg-vorpommern.png',
        'cities': [
            {
                name: 'Rostock',
                population: '209.000',
                size: '181,4 qkm',
                flag: '../assets/demo/mecklenburg-vorpommern.png',
            },
            {
                name: 'Schwerin',
                population: '95.000',
                size: '130,5 qkm',
                flag: '../assets/demo/mecklenburg-vorpommern.png',
            },
            {
                name: 'Neubrandenburg',
                population: '64.000',
                size: '85,7 qkm',
                flag: '../assets/demo/mecklenburg-vorpommern.png',
            }
        ]
    },
    {
        'name': 'Nordrhein-Westfalen',
        'population': '17.930.000',
        'size': '34.110 qkm',
        'flag': '../assets/demo/nordrhein-westphalen.png',
        'cities': [
            {
                name: 'Köln',
                population: '1.087.000',
                size: '405,2 qkm',
                flag: '../assets/demo/nordrhein-westphalen.png',
            },
            {
                name: 'Düsseldorf',
                population: '619.000',
                size: '217,4 qkm',
                flag: '../assets/demo/nordrhein-westphalen.png',
            },
            {
                name: 'Dortmund',
                population: '587.000',
                size: '280,7 qkm',
                flag: '../assets/demo/nordrhein-westphalen.png',
            }
        ]
    },
    {
        'name': 'Rheinland-Pfalz',
        'population': '4.093.000',
        'size': '19.854 qkm',
        'flag': '../assets/demo/rheinland-pfalz.png',
        'cities': [
            {
                name: 'Mainz',
                population: '218.000',
                size: '97,8 qkm',
                flag: '../assets/demo/rheinland-pfalz.png',
            },
            {
                name: 'Ludwigshafen',
                population: '172.000',
                size: '77,7 qkm',
                flag: '../assets/demo/rheinland-pfalz.png',
            },
            {
                name: 'Koblenz',
                population: '114.000',
                size: '105,2 qkm',
                flag: '../assets/demo/rheinland-pfalz.png',
            }
        ]
    },
    {
        'name': 'Saarland',
        'population': '983.000',
        'size': '2.570 qkm',
        'flag': '../assets/demo/saarland.png',
        'cities': [
            {
                name: 'Saarbrücken',
                population: '181.000',
                size: '167,1 qkm',
                flag: '../assets/demo/saarland.png',
            },
            {
                name: 'Neunkirchen',
                population: '46.000',
                size: '75,1 qkm',
                flag: '../assets/demo/saarland.png',
            },
            {
                name: 'Homburg',
                population: '42.000',
                size: '82,7 qkm',
                flag: '../assets/demo/saarland.png',
            }
        ]
    },
    {
        'name': 'Sachsen',
        'population': '4.056.000',
        'size': '18.449 qkm',
        'flag': '../assets/demo/sachsen.png',
        'cities': [
            {
                name: 'Leipzig',
                population: '593.000',
                size: '297,4 qkm',
                flag: '../assets/demo/sachsen.png',
            },
            {
                name: 'Dresden',
                population: '554.000',
                size: '328,3 qkm',
                flag: '../assets/demo/sachsen.png',
            },
            {
                name: 'Chemnitz',
                population: '247.000',
                size: '221 qkm',
                flag: '../assets/demo/sachsen.png',
            }
        ]
    },
    {
        'name': 'Sachsen-Anhalt',
        'population': '2.180.000',
        'size': '20.454 qkm',
        'flag': '../assets/demo/sachsen-anhalt.png',
        'cities': [
            {
                name: 'Halle (Saale)',
                population: '238.000',
                size: '135 qkm',
                flag: '../assets/demo/sachsen-anhalt.png',
            },
            {
                name: 'Magdeburg',
                population: '238.000',
                size: '201 qkm',
                flag: '../assets/demo/sachsen-anhalt.png',
            },
            {
                name: 'Dessau-Roßlau',
                population: '80.000',
                size: '245 qkm',
                flag: '../assets/demo/sachsen-anhalt.png',
            }
        ]
    },
    {
        'name': 'Schleswig-Holstein',
        'population': '2.910.000',
        'size': '15.804 qkm',
        'flag': '../assets/demo/schleswig-holstein.png',
        'cities': [
            {
                name: 'Kiel',
                population: '248.000',
                size: '118,6 qkm',
                flag: '../assets/demo/schleswig-holstein.png',
            },
            {
                name: 'Lübeck',
                population: '217.000',
                size: '214,2 qkm',
                flag: '../assets/demo/schleswig-holstein.png',
            },
            {
                name: 'Flensburg',
                population: '90.000',
                size: '56,7 qkm',
                flag: '../assets/demo/schleswig-holstein.png',
            }
        ]
    },
    {
        'name': 'Thüringen',
        'population': '2.133.000',
        'size': '16.202 qkm',
        'flag': '../assets/demo/thueringen.png',
        'cities': [
            {
                name: 'Erfurt',
                population: '214.000',
                size: '269,2 qkm',
                flag: '../assets/demo/thueringen.png',
            },
            {
                name: 'Jena',
                population: '111.000',
                size: '114,8 qkm',
                flag: '../assets/demo/thueringen.png',
            },
            {
                name: 'Gera',
                population: '94.000',
                size: '152 qkm',
                flag: '../assets/demo/thueringen.png',
            }
        ]
    }
];

const cache = {};

export class ItemHelper
{
    static chunkedList()
    {
        let items = Arr.recursive(RegionList, 'cities', (item) => {
            return Obj.assign({ id: UUID() }, item);
        });

        return Arr.chunk(items, Math.ceil(items.length/2));
    }

    static largeList(count = 10000)
    {
        if ( Obj.has(cache, count) ) {
            return cache[count];
        }

        let items = Arr.each(Arr.make(count), (index) => {
            return { id: UUID(), name: `Item with index (${index})`, image: `https://picsum.photos/300/300.jpg?${index}` };
        });

        return cache[count] = items;
    }
}

export default ItemHelper;