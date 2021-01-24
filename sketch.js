var path, boy, b2Img, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var PLAY = 1;
var END = 0;
var state = PLAY;
var end ;
var re, rei;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
  rei = loadImage("restart.png");

}

function setup() {

  createCanvas(400, 400);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  boy.debug = 0;
  boy.setCollider("circle", 0, 0, 500)
  
  // End Image
 end= createSprite(200, 150);
  end.addImage(endImg);
  end.scale = 0.9
  end.visible = 0;

 // Restart Image
 re= createSprite(200, 250);
  re.addImage(rei);
  re.scale = 0.5
  re.visible = 0;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0); 
  
    

   
  if (state === PLAY) {
    boy.x = World.mouseX;
    
    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > 400) {
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 10;
      
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 50;

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 30;

    }

      


    rand = Math.round(random(1, 4));
    if (frameCount % 60 === 0) {
      switch (rand) {
        case 1:
          createCash();
          break;
        case 2:
          createDiamonds();
          break;
        case 3:
          createJwellery();
          break;
        case 4:
          createSword();
          break;

        default:
          break;
      }
     
    }
    if (swordGroup.isTouching(boy)) {
      state = END;
    }
  }

  if (state === END) {

 


    
    path.velocityY = 0;
    
  //
  cashG.setLifetimeEach(-1);
  diamondsG.setLifetimeEach(-1);
  jwelleryG.setLifetimeEach(-1);
  swordGroup.setLifetimeEach(-1);
    
  //
  cashG.setVelocityYEach(0);
  diamondsG.setVelocityYEach(0);
  jwelleryG.setVelocityYEach(0);
  swordGroup.setVelocityYEach(0);
  
  //
    
    end.visible = 1;
    re.visible = 1;
    boy.visible = 0;
    treasureCollection.visible =0;
    
    //restart
    if(mousePressedOver(re))
      {
        reset();
      }
  }
  drawSprites();
  
textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);
}

function reset()
{
  state = PLAY;
  end.visible = 0;
    re.visible = 0;
    boy.visible = 1;
   treasureCollection = 0;
  
  cashG.destroyEach();
  diamondsG.destroyEach();
  jwelleryG.destroyEach();
  swordGroup.destroyEach();
  
}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
    // console.log(cash.depth);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
        // console.log(diamonds.depth);

  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
        // console.log(jwellery.depth);

  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
    
   
        // console.log(sword.depth);

  }
}

