const BLOCK_HEIGHT = 83;
const BLOCK_WIDTH = 101;
let  win_count = 0;
// Enemies our player must avoid
class Enemy {
    constructor(x,y,speed) {
        this.x = x;
        this.y = y + 60;
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        this.blockWidth = 101;
        this.blockHeight = 83;
    }
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks

    update (dt) {
        if(this.x < this.blockWidth*4 ){
            this.x += this.speed * dt;
        } else {
            this.x = 0;
        }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    };

    // Draw the enemy on the screen, required method for game
    render () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y,sprite) {
        this.x = 200;
        this.y = 400;
        this.sprite = 'images/char-cat-girl.png';
        this.blockWidth = 101;
        this.blockHeight = 83;
        this.score =0;
    }
    
    update () {
        //check collision
        for(let enemy of allEnemies){
             if(this.x < enemy.x + enemy.blockWidth/2 &&
                this.x + this.blockWidth/2 > enemy.x &&
                this.y < enemy.y + enemy.blockHeight/2 &&
                this.y + this.blockHeight/2 > enemy.y) {
                alert('Collision');
                this.score -= 20;
                this.reset();
            }
            
            } 
            //check win
        if(this.y < 0) {
            
            this.score += 100;
            this.reset();
            }
    }
    
    reset() {
        this.x = 200;
        this.y = 400;
    }
    // Draw the enemy on the screen, required method for game
    render () {
        //draw player on x,y
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.fillStyle = "white";
        ctx.font = 'bold 20px serif';
        ctx.fillText("Score: " + this.score, 5, 120);
    };

    handleInput(input) {
        switch(input){
            case 'left': 
                if(this.x > 0) {
                    this.x -= this.blockWidth;
                }
                break;
            case 'right':
                if(this.x < this.blockWidth * 3) {
                    this.x += this.blockWidth;
                }
                break;
            case 'up':
                if(this.y > 0) {
                  this.y -= this.blockHeight;
                }
                break;
            case 'down':
                if(this.y < this.blockHeight * 4){
                  this.y += this.blockHeight;
                }
                break;
        }
    }

    changeSprite(value){
        switch(value){
            case '1':
            this.sprite = 'images/char-boy.png';
            break;
            case '2':
            this.sprite = 'images/char-cat-girl.png';
            break;
            case '3':
            this.sprite = 'images/char-horn-girl.png';
            break;
            case '4':
            this.sprite = 'images/char-pink-girl.png';
            break;
            case '5':
            this.sprite = 'images/char-princess-girl.png';
            break;
        }
        
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();
let allEnemies = [];
let bug1 = new Enemy(-101,1*BLOCK_HEIGHT,100 + Math.floor(Math.random() * 300));
let bug2 = new Enemy(-101,2*BLOCK_HEIGHT,70 + Math.floor(Math.random() * 300));
let bug3 = new Enemy(-101,3*BLOCK_HEIGHT,100 + Math.floor(Math.random() * 300));
allEnemies.push(bug1,bug2,bug3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keypress',function(e){
    var spriteKeys = {
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5'
    };
    player.changeSprite(spriteKeys[e.keyCode]);
});
