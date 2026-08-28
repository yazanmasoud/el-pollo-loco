const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * -2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720 * -2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720 * -2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720 * -2),

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

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 4),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 720 * 4),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 720 * 4),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 720 * 4),
        
        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 5),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720 * 5),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720 * 5),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720 * 5),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 6),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 720 * 6),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 720 * 6),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 720 * 6),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 7),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720 * 7),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720 * 7),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720 * 7),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 8),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 720 * 8),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 720 * 8),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 720 * 8) 
    ]

    , [
        new Coins(300, 350),
        new Coins(500, 280),
        new Coins(900, 350),
        new Coins(1300, 250)
    ]
    
    , [
        new Bottle(400, 380),
        new Bottle(700, 380),
        new Bottle(1100, 380),
        new Bottle(1500, 380),
        new Bottle(1250, 380),
        new Bottle(1650, 380),
        new Bottle(2050, 380),
        new Bottle(2450, 380),
        new Bottle(2850, 380),
        new Bottle(3250, 380),
        new Bottle(3650, 380),
        new Bottle(4050, 380),
        new Bottle(4450, 380),
        new Bottle(4850, 380)

    ]
);