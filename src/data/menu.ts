// Menu data for Am Trapeneck.
// Source: Menu - Trapeneck OG (10).pdf (June 2026 update) + owner-supplied
// boissons (the PDF does not list drinks). Accents hand-restored from the
// PDF extraction. Allergen numbering follows the legend printed in the PDF
// footer (1..14). Number 15 appears on a few items in the PDF but is absent
// from the legend — kept as-is; owner to clarify.

export interface PriceVariant {
    label: string;
    price: string;
}

export interface MenuItem {
    name: string;
    description?: string;
    /** Single price (mutually exclusive with `pricing`). */
    price?: string;
    /** Multiple price points for the same item (1P/2P, 6P/12P, …). */
    pricing?: PriceVariant[];
    allergens?: number[];
    /** Side note such as "Sur commande" or "24h à l'avance". */
    note?: string;
    /** Hide this item in the delivery view (default = available everywhere). */
    delivery?: boolean;
}

export interface MenuSubCategory {
    title: string;
    items: MenuItem[];
    /** Hide the whole sub-category in the delivery view. */
    delivery?: boolean;
}

export interface MenuCategory {
    title: string;
    items?: MenuItem[];
    subCategories?: MenuSubCategory[];
}

export const ALLERGENS: Record<number, string> = {
    1: 'Céréales contenant du gluten',
    2: 'Crustacés',
    3: 'Œufs',
    4: 'Poissons',
    5: 'Arachides',
    6: 'Soja',
    7: 'Lait',
    8: 'Fruits à coque',
    9: 'Céleri',
    10: 'Moutarde',
    11: 'Graines de sésame',
    12: 'Anhydride sulfureux et sulfites',
    13: 'Lupin',
    14: 'Mollusques',
};

export const MENU: MenuCategory[] = [
    {
        title: 'Nos Bruschettes',
        items: [
            {
                name: 'Bruschettes Classic 4PC',
                description: "Pain grillé frotté à l'ail, tomates fraîches, origan et basilic",
                price: '11,50 €',
                allergens: [1],
            },
            {
                name: 'Bruschettes Trapeneck 4PC',
                description: 'Pain grillé garni de saucisse italienne et gorgonzola gratiné au four',
                price: '16,50 €',
                allergens: [1, 7],
            },
            {
                name: 'Bruschettes Liguria 4PC',
                description: 'Pain grillé au pesto, jambon de Parme, tomates et roquette',
                price: '17,00 €',
                allergens: [1, 8],
            },
        ],
    },
    {
        title: 'Entrée Froide',
        items: [
            {
                name: 'Caprese Tomate Mozzarella',
                description: 'Mozzarella, tomate et basilic',
                price: '12,00 €',
                allergens: [7, 12, 15],
            },
            {
                name: 'Caprese di Bufala',
                description: 'Mozzarella di bufala, tomate et basilic',
                price: '16,00 €',
                allergens: [7, 12, 15],
            },
            {
                name: 'Carpaccio de Bœuf',
                description: 'Fines tranches de filet de bœuf, roquette et copeaux de parmesan',
                price: '20,80 €',
                allergens: [7, 12],
            },
            {
                name: 'Antipasto Italiano',
                description: 'Jambon cru, bruschette, arancini, panzerottini',
                pricing: [
                    { label: '1P', price: '21,90 €' },
                    { label: '2P', price: '37,90 €' },
                ],
                allergens: [3, 7, 10, 12],
                delivery: false,
            },
            {
                name: 'Tartare de Bœuf',
                description: 'Frites, salade',
                price: '20,50 €',
                allergens: [3, 10, 12],
            },
        ],
    },
    {
        title: 'Nos Salades',
        items: [
            {
                name: 'Salade de Chèvre Chaude',
                description: 'Salade mixte, toasts de chèvre chaud nappés de miel',
                price: '17,90 €',
                allergens: [1, 2, 7, 10, 12],
            },
            {
                name: 'Salade César',
                description: 'Salade mixte, émincé de poulet pané, copeaux de parmesan, roquette, sauce césar',
                price: '17,90 €',
                allergens: [2, 3, 10, 12],
            },
            {
                name: 'Salade Paysanne',
                description: 'Salade mixte, pommes de terre sautées, oignons, champignons, lardons, œuf au plat',
                price: '23,50 €',
                allergens: [1, 3, 10, 12],
            },
            {
                name: 'Salade Maritime',
                description: 'Salade mixte, thon, saumon fumé, crevettes, câpres, œufs durs',
                price: '21,50 €',
                allergens: [2, 4, 10, 12],
            },
            {
                name: 'Salade Niçoise Thon-Anchois',
                description: 'Salade mixte, poivron, radis, olives, basilic, œufs durs',
                price: '22,00 €',
                allergens: [1, 3, 4, 10],
            },
        ],
    },
    {
        title: 'Entrée Chaude',
        items: [
            {
                name: 'Escargots de Bourgogne',
                description: 'Escargots cuisinés au beurre persillé',
                pricing: [
                    { label: '6P', price: '11,50 €' },
                    { label: '12P', price: '21,50 €' },
                ],
                allergens: [7, 12],
                delivery: false,
            },
            {
                name: 'Cuisses de Grenouille',
                description: 'Cuisses de grenouille persillées',
                pricing: [
                    { label: '6P', price: '12,00 €' },
                    { label: '12P', price: '21,50 €' },
                ],
                allergens: [7, 12],
                delivery: false,
            },
            {
                name: 'Minestrone',
                description: 'Soupe de légumes italiens de saison',
                price: '13,50 €',
                allergens: [9, 12],
            },
            {
                name: 'Tortellini in Brodo',
                description: 'Pâtes farcies servies dans un bouillon chaud',
                price: '14,50 €',
                allergens: [1, 12],
            },
            {
                name: 'Crema di Pomodoro',
                description: 'Velouté de tomates maison',
                price: '13,00 €',
                allergens: [7, 12],
            },
        ],
    },
    {
        title: 'Nos Pâtes',
        items: [
            {
                name: 'Fiocchi Gorgonzola et Speck',
                description: 'Fiocchi farcies au gorgonzola, noix, roquette et speck',
                price: '24,00 €',
                allergens: [1, 7, 12],
            },
            {
                name: 'Tortellini Panna Prosciutto',
                description: 'Tortellini, crème et jambon',
                price: '16,90 €',
                allergens: [1, 3, 7, 12],
            },
            {
                name: 'Ravioli Ricotta et Épinards Sauce Aurora',
                description: "Ravioli ricotta et épinards nappés d'une sauce tomate crème",
                price: '19,50 €',
                allergens: [3, 7, 12],
            },
            {
                name: 'Strozzapreti à la Saucisse Italienne',
                description: 'Pâtes courtes à la saucisse italienne, parfumées au fenouil, en sauce tomate',
                price: '19,50 €',
                allergens: [1, 3, 12],
            },
            {
                name: 'Gnocchi Truffées et Speck',
                description: 'Gnocchi à la crème de truffe et speck',
                price: '25,90 €',
                allergens: [1, 7, 12],
            },
            {
                name: 'Orechiette al Cime di Rape e Salsiccia',
                description: 'Orecchiette aux brocolis-rave et saucisse italienne, parfumées au fenouil',
                price: '22,00 €',
                allergens: [1, 3, 12],
            },
            {
                name: 'Orechiette Barese',
                description: 'Pâtes en sauce tomate et polpette maison',
                price: '19,90 €',
                allergens: [1, 3, 12],
            },
            {
                name: 'Cavatelli aux Scampis et Gambas Flambés au Cognac',
                description: 'Pâtes aux scampis et gambas flambés au cognac',
                price: '21,50 €',
                allergens: [1, 2, 3, 12],
            },
            {
                name: 'Pasta Fagioli',
                description: 'Pâtes mijotées aux haricots',
                price: '17,50 €',
                allergens: [9, 12],
            },
            {
                name: 'Pasta e Ceci',
                description: 'Pâtes aux pois chiches façon traditionnelle',
                price: '17,50 €',
                allergens: [9, 12],
            },
            {
                name: 'Pasta e Lenticchie',
                description: 'Pâtes mijotées aux lentilles',
                price: '17,50 €',
                allergens: [9, 12],
            },
            {
                name: 'Trio de Pâtes',
                description: "Penne à l'arrabbiata, tortellini au jambon et à la crème, ravioli ricotta épinards",
                price: '17,90 €',
                allergens: [9, 12],
            },
            {
                name: 'Tagliolini Pomodoro Basilico',
                description: 'Tagliolini à la sauce tomate et basilic',
                price: '12,90 €',
                allergens: [1, 12],
            },
            {
                name: 'Tagliolini Aglio e Olio e Peperoncino',
                description: "Tagliolini, huile d'olive, ail, piment, persil",
                price: '13,50 €',
                allergens: [1, 12],
            },
            {
                name: 'Tagliatelle Bolognaise',
                description: 'Tagliatelle à la sauce bolognaise maison',
                price: '16,90 €',
                allergens: [1, 7, 10],
            },
            {
                name: 'Tagliatelle aux Scampis et Tomate Cerise Flambé à la Vodka',
                description: "Tagliatelle, scampis, tomates cerises, ail, huile d'olive, persil",
                price: '22,50 €',
                allergens: [1, 2, 12],
            },
            {
                name: "Tagliatelle Carbonara à l'Italienne",
                description: 'Tagliatelle, œufs, pecorino et guanciale',
                price: '16,90 €',
                allergens: [1, 3, 7],
            },
            {
                name: 'Linguine aux Fruits de Mer',
                description: 'Pâtes aux fruits de mer',
                price: '23,50 €',
                allergens: [1, 2, 4, 12],
            },
            {
                name: 'Penne Arrabbiata et Peperoncini Frais',
                description: 'Penne à la sauce tomate relevée',
                price: '16,90 €',
                allergens: [1, 12],
            },
            {
                name: 'Bucatini Amatriciana',
                description: 'Bucatini, sauce tomate, guanciale et pecorino',
                price: '16,00 €',
                allergens: [1, 7, 12],
            },
        ],
    },
    {
        title: 'Nos Pizzas',
        items: [
            {
                name: 'Lecce',
                description: 'Tomate, mozzarella, saucisses italienne, scamorza fumée, oignons',
                price: '18,00 €',
                allergens: [1, 7],
            },
            {
                name: 'Norcia',
                description: 'Tomate, mozzarella, gorgonzola, speck, champignons, noix',
                price: '18,00 €',
                allergens: [1, 5, 7],
            },
            {
                name: 'Gallipoli',
                description: "Tomate, mozzarella, pesto di rucola, rucola, scampis à l'ail, tomates cerises, oignons",
                price: '20,90 €',
                allergens: [1, 2, 5, 7],
            },
            {
                name: 'Brindisi',
                description: 'Tomate, mozzarella, jambon de Parme, rucola, buffala, tomates cerises, olives noires',
                price: '19,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Metaponte',
                description: 'Tomate, mozzarella, salami piquant, poivrons, oignons, olives noires',
                price: '16,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Calabrese',
                description: "Tomate, mozzarella, n'duja, tomates cerises, rucola",
                price: '16,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Mortaza',
                description: 'Mozzarella, mortadelle, burrata, pistaches, crème de pistache, rucola',
                price: '19,00 €',
                allergens: [1, 8],
            },
            {
                name: 'Tartufa',
                description: 'Mozzarella, crème de tartufo, coppa, rucola, buffala',
                price: '19,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Salerno',
                description: 'Mozzarella, salsiccia, cime di rape',
                price: '17,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Tiroles',
                description: 'Mozzarella, speck et radicchio, taleggio',
                price: '18,00 €',
                allergens: [1, 7],
            },
            {
                name: 'Scarla di Forno',
                description: 'Tomate, mozzarella, chèvre, jambon',
                price: '17,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Végétarienne',
                description: 'Tomate, mozzarella, champignons, olives, peperoni',
                price: '14,30 €',
                allergens: [3, 7],
            },
            {
                name: 'Margarita',
                description: 'Tomate, mozzarella',
                price: '11,50 €',
                allergens: [1, 7],
            },
            {
                name: 'Diavola',
                description: 'Tomate, mozzarella, salami piquant',
                price: '14,50 €',
                allergens: [1, 7],
            },
            {
                name: 'Napoletana',
                description: 'Tomate, mozzarella, anchois, câpres',
                price: '12,90 €',
                allergens: [1, 7],
            },
            {
                name: '4 Stagioni',
                description: 'Tomate, mozzarella, jambon, champignons, olives, artichauts, anchois',
                price: '14,20 €',
                allergens: [1, 4, 7],
            },
            {
                name: 'Salami',
                description: 'Tomate, mozzarella, salami doux',
                price: '14,20 €',
                allergens: [1, 5, 7],
            },
            {
                name: 'Tonno e Chipolla',
                description: 'Tomate, mozzarella, thon, oignons, câpres',
                price: '15,50 €',
                allergens: [1, 7],
            },
            {
                name: 'Calzone',
                description: 'Tomate, mozzarella, jambon, champignons',
                price: '14,50 €',
                allergens: [1, 7],
            },
            {
                name: 'Frutti di Mare',
                description: 'Tomate, mozzarella, ail, calamars, moules, crevettes',
                price: '16,90 €',
                allergens: [1, 7, 8],
            },
            {
                name: 'Prosciutto',
                description: 'Tomate, mozzarella, jambon',
                price: '12,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Prosciutto Funghi',
                description: 'Tomate, mozzarella, jambon, champignons',
                price: '13,90 €',
                allergens: [1, 7],
            },
            {
                name: '4 Fromages',
                description: 'Tomate, mozzarella, parmesan, taleggio, gorgonzola',
                price: '14,30 €',
                allergens: [1, 7],
            },
            {
                name: 'Capricciosa',
                description: 'Tomate, mozzarella, jambon, champignons, artichauts, olives',
                price: '14,50 €',
                allergens: [1, 7],
            },
            {
                name: 'Hawai',
                description: 'Tomate, mozzarella, ananas, jambon',
                price: '14,90 €',
                allergens: [1, 7],
            },
        ],
    },
    {
        title: 'Nos Gratinées',
        items: [
            {
                name: 'Lasagne Maison',
                description: 'Lasagnes traditionnelles gratinées',
                price: '18,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Canneloni Maison',
                description: 'Canneloni traditionnelles gratinées',
                price: '18,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Parmigiana Maison',
                description: 'Aubergines gratinées à la tomate et mozzarella',
                price: '19,50 €',
                allergens: [1, 7],
            },
            {
                name: 'Gnocchi Sorrentina',
                description: "Gnocchi de pommes de terre, sauce tomate, mozzarella, basilic, huile d'olive",
                price: '17,90 €',
                allergens: [1, 7],
            },
            {
                name: 'Tortellini à la Boscaiola',
                description: 'Tortellini, jambon, champignons et crème',
                price: '19,90 €',
                allergens: [1, 7],
            },
        ],
    },
    {
        title: 'Nos Risotto',
        items: [
            {
                name: 'Risotto Taleggio et Saucisse Italienne',
                description: 'Risotto crémeux au taleggio et saucisse italienne',
                price: '23,50 €',
                allergens: [7, 12],
            },
            {
                name: 'Risotto avec Taleggio et Pancetta',
                description: 'Risotto, pancetta, fromage taleggio',
                price: '23,00 €',
                allergens: [7, 12],
            },
            {
                name: 'Risotto al Salmone',
                description: 'Risotto crémeux au saumon',
                price: '22,50 €',
                allergens: [4, 7],
            },
        ],
    },
    {
        title: 'Nos Plats Traditionnels Luxembourgeois',
        items: [
            {
                name: 'Bouchée à la Reine',
                description: 'Vol-au-vent garni de volaille et sauce crémeuse',
                price: '21,50 €',
                allergens: [1, 7],
            },
            {
                name: 'Kuddelfleck',
                description: 'Spécialité luxembourgeoise à base de tripes',
                price: '24,90 €',
                allergens: [1],
            },
            {
                name: 'Wäinzoossis mat Moschterzooss',
                description: 'Saucisses au vin blanc et moutarde',
                price: '21,00 €',
                allergens: [10, 12],
            },
            {
                name: 'Judd mat Gaardebounen',
                description: 'Échine de porc fumée, fèves et pommes de terre',
                price: '25,50 €',
                allergens: [12],
            },
            {
                name: 'Assiette de Jambon Parme',
                description: 'Jambon cru, frites, salade',
                price: '19,00 €',
                allergens: [12],
            },
        ],
    },
    {
        title: 'Nos Omelettes',
        items: [
            { name: 'Nature', description: 'Frites, salade', price: '14,90 €', allergens: [3, 7, 12] },
            { name: 'Fromage', description: 'Frites, salade', price: '15,90 €', allergens: [3, 7, 12] },
            { name: 'Jambon Champignons', description: 'Frites, salade', price: '16,90 €', allergens: [3, 7, 12] },
            { name: 'Jambon Fromage', description: 'Frites, salade', price: '16,90 €', allergens: [3, 7, 12] },
        ],
    },
    {
        title: 'Nos Poissons',
        items: [
            {
                name: 'Cabillaud Pané à la Sauce Rémoulade',
                description: 'Cabillaud pané à la sauce rémoulade',
                price: '22,50 €',
                allergens: [1, 3, 4, 10],
            },
            {
                name: 'Poulpe Grillé sur un Lit de Purée de Pommes de Terre',
                description: 'Poulpe grillé servi sur purée de pommes de terre',
                price: '31,90 €',
                allergens: [7, 14],
            },
            {
                name: 'Gambas Flambées au Cognac',
                description: 'Gambas sautées et flambées',
                price: '32,50 €',
                allergens: [2],
            },
            {
                name: 'Calamards Frits',
                description: 'Calamards croustillants',
                price: '24,50 €',
                allergens: [1, 14],
            },
            {
                name: 'Médaillon de Sole Sauce Homardine',
                description: 'Sole délicate, sauce homardine',
                price: '29,50 €',
                allergens: [2, 4, 7],
            },
            {
                name: 'Poisson Frit ou Filet de Poisson',
                description: 'Poisson frit entier façon maison',
                pricing: [
                    { label: 'Poisson', price: '29,90 €' },
                    { label: 'Filet double', price: '32,00 €' },
                ],
                allergens: [1, 4],
                note: "Sur commande, 24h à l'avance",
            },
        ],
    },
    {
        title: 'Nos Viandes',
        items: [
            {
                name: "Saucisses Italienne Sauce à l'Ail",
                description: "Saucisses italienne grillées, parfumées au fenouil, sauce à l'ail",
                price: '22,50 €',
                allergens: [7],
            },
            {
                name: 'Boulettes de Viande sur son Lit de Polenta',
                description: 'Boulettes, polenta crémeuse, sauce tomate',
                price: '22,50 €',
                allergens: [1, 3, 12],
            },
            {
                name: 'Filet de Bœuf aux Cèpes',
                description: 'Bœuf, cèpes, frites, salade',
                price: '32,50 €',
                allergens: [3, 10, 12],
            },
            {
                name: 'Tagliata de Bœuf Rucola et Copeaux de Parmesan',
                description: 'Bœuf, rucola, parmesan, frites, salade',
                price: '28,50 €',
                allergens: [7, 12],
            },
            {
                name: 'Escalope de Veau Grillé',
                description: "Escalope de veau, huile d'olive, sel, poivre",
                price: '25,00 €',
                allergens: [12],
            },
            {
                name: 'Escalope de Veau Panée',
                description: 'Escalope de veau, chapelure, œufs, farine, huile',
                price: '25,00 €',
                allergens: [1, 3, 12],
            },
            {
                name: 'Escalope Milanaise',
                description: "Escalope panée à l'italienne",
                price: '22,00 €',
                allergens: [1, 3, 12],
            },
            {
                name: 'Entrecôte Grillé',
                price: '26,50 €',
                allergens: [12],
            },
            {
                name: 'Steak de Cheval Grillé',
                price: '26,50 €',
                allergens: [12],
            },
            {
                name: 'Osso Bucco avec Pâtes Tagliatelle',
                description: 'Jarret de veau mijoté, tagliatelle',
                price: '29,90 €',
                allergens: [1, 7, 9, 12],
            },
            {
                name: "Sauces d'Accompagnement",
                description: "Gorgonzola, crème champignons, poivre vert, à l'ail, provençale",
                price: '1,50 €',
                allergens: [1, 7, 9, 12],
            },
        ],
    },
    {
        title: 'Nos Desserts',
        subCategories: [
            {
                title: 'Desserts Vitrine',
                items: [
                    {
                        name: 'Tiramisu',
                        description: 'Mascarpone, biscuits, espresso, œufs, sucre, cacao',
                        price: '8,50 €',
                        allergens: [1, 3, 7],
                    },
                    {
                        name: 'Crème Brûlée',
                        description: "Crème fraîche, lait, jaunes d'œufs, sucre, vanille",
                        price: '8,50 €',
                        allergens: [3, 7],
                        delivery: false,
                    },
                    {
                        name: 'Mousse au Chocolat',
                        description: 'Chocolat noir, œufs, sucre, beurre',
                        price: '8,50 €',
                        allergens: [3, 7],
                    },
                    {
                        name: 'Tarte aux Pommes',
                        description: 'Pommes, pâte brisée, sucre, œufs',
                        price: '8,50 €',
                        allergens: [1, 3, 7],
                        delivery: false,
                    },
                    {
                        name: 'Panna Cotta',
                        description: 'Crème, lait, sucre, vanille, coulis de fruits rouges',
                        price: '8,50 €',
                        allergens: [7],
                    },
                    {
                        name: 'Café Gourmand',
                        description: "Café espresso accompagné d'un assortiment de mini-desserts",
                        price: '8,50 €',
                        allergens: [1, 3, 7],
                        delivery: false,
                    },
                ],
            },
            {
                title: 'Desserts Glacés',
                delivery: false,
                items: [
                    {
                        name: 'Semifreddo aux Châtaignes Coulis de Chocolat',
                        description: 'Crème, châtaignes, sucre, œufs, chocolat, cacao',
                        price: '12,00 €',
                        allergens: [1, 3, 7],
                    },
                    {
                        name: 'Dame Blanche',
                        description: 'Glace vanille, sauce chocolat chaud maison, chantilly',
                        price: '10,00 €',
                        allergens: [7],
                    },
                    {
                        name: 'Café Glacé',
                        price: '10,00 €',
                        allergens: [7],
                    },
                    {
                        name: 'Sorbets',
                        description: 'Citron · Passion · Mangue · Poire Williams · Pomme verte · Framboise · Melon',
                        pricing: [
                            { label: '1 boule', price: '2,90 €' },
                            { label: '2 boules', price: '5,50 €' },
                        ],
                    },
                    {
                        name: 'Glaces',
                        description: 'Spéculoos · Vanille · Moka · Chocolat Blanc · Chocolat Nuts · Coco · Pistache',
                        pricing: [
                            { label: '1 boule', price: '2,90 €' },
                            { label: '2 boules', price: '5,50 €' },
                        ],
                        allergens: [7],
                    },
                ],
            },
        ],
    },
];
