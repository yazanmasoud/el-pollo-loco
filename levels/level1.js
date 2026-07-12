const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * -1),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720 * -1),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720 * -1),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720 * -1),

        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 720 * 2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 720 * 2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 720 * 2),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * -3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720 * -3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720 * -3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720 * -3),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720 * 3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720 * 3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720 * 3),
    ]
    ,[
        new Coins(350, 365),
        new Coins(450, 365),
        new Coins(550, 365),
        new Coins(650, 365),
        new Coins(750, 365),
        new Coins(850, 365)
    ]
    ,[
        new Bottle(330, 375),
        new Bottle(490, 375),
        new Bottle(520, 375),
        new Bottle(695, 375),
        new Bottle(7950, 375),
        new Bottle(810, 375)
    ]
);