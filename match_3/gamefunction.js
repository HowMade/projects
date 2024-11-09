var coreplace = document.getElementById('coreplace');
var container_of_items = document.createElement('div');
var cutscene = document.createElement('img');
cutscene.src = 'pic/horn.jpg';
cutscene.style.display = 'block';
cutscene.style.margin = 'auto';
cutscene.style.position = "fixed";
let counter_of_click = 0;
let bucket_of_item = [];
let counter_of_gone = 0;
var difficulty = 2;//how many kinds of bokstave
var quantity = difficulty * 3;
var interval = 600;
var timer = 0;
var TIMER = [];
TIMER[0] = false;
var time = document.getElementById('time');
//sound effect
const beezle = document.createElement('audio');
beezle.src = 'beezle.mp3';
const wrong = document.createElement('audio');
wrong.src = 'wrong.mp3';
const success = document.createElement('audio');
success.src = 'success.mp3';
const next = document.createElement('audio');
next.src = 'next.mp3';
const coin = document.createElement('audio');
coin.src = "coin.mp3";
function playBeezle(){
    beezle.play();
};
function playWrong(){
    wrong.play();
};
function playSuccess(){
    success.play();
};
function playNext(){
    next.play();
}
//...sound effect
function mate(event){
    switch(counter_of_click){
        case 0: 
            counter_of_click ++;
            bucket_of_item[0] = event.target;
            blur(event.target);
            playBeezle();
            break;
        case 1: 
            bucket_of_item[1] = event.target;
            blur(event.target);
            blur(bucket_of_item[0]);
            if(bucket_of_item[0].src != bucket_of_item[1].src){
                counter_of_click = 0;
                let item01 = bucket_of_item[0];
                let item02 = bucket_of_item[1];
                bucket_of_item = [];
                playWrong();
                setTimeout(function(){
                    item01.style.filter = '';
                    item02.style.filter = '';
                    }, interval);
            }else if(bucket_of_item[0] != bucket_of_item[1]){
                counter_of_click ++;
                playBeezle();
            };
            break;
        case 2:
            if(bucket_of_item[0].src != event.target.src){
                counter_of_click = 0;
                let item01 = bucket_of_item[0];
                let item02 = bucket_of_item[1];
                let item03 = event.target;
                bucket_of_item = [];
                blur(item01);
                blur(item02);
                blur(item03);
                playWrong();
                setTimeout(function(){
                    item01.style.filter = '';
                    item02.style.filter = '';
                    item03.style.filter = '';
                    }, interval);
            }else if(bucket_of_item[0] !== event.target && bucket_of_item[1] != event.target){
                counter_of_gone += 3;
                counter_of_click = 0;
                let item01 = bucket_of_item[0];
                let item02 = bucket_of_item[1];
                let item03 = event.target;
                bucket_of_item = [];
                blur(item01);
                blur(item02);
                blur(item03);
                if(counter_of_gone >= quantity){
                    TIMER[0] = false;
                    playNext();
                    difficulty ++;
                    quantity = difficulty * 3;
                    counter_of_gone = 0;
                    cutscene.style.animationName = 'zoomout';
                    cutscene.style.animationDuration ='3s';
                    container_of_items.innerHTML ='';
                    container_of_items.appendChild(cutscene);
                    setTimeout(function(){
                        cutscene.setAttribute('class', '');
                        container_of_items.innerHTML ='';
                        start.innerHTML = 'NEXT!'; 
                        start.style.display = 'block';
                    }, 3000);
                }else{
                    playSuccess();
                    setTimeout(function(){
                        item01.style.visibility = 'hidden';
                        item02.style.visibility = 'hidden';
                        item03.style.visibility = 'hidden';
                    }, interval);
                }
        }
    }        
}
function blur(item){
    item.style.filter = 'blur(2px)';
    item.style.animationName = 'itemrote';
    item.style.animationDuration = '1s';
    setTimeout(function(){
        item.style.animationName = '';
        item.style.animationDuration = '0s';
    }, 600);
};

function game(){
    //generate random numbers and change numbers to char..
    if(difficulty >= 27){
        for(let i = 0; i < 80; i ++){
            let item = document.createElement('img');
            item.setAttribute('class', 'item');
            item.addEventListener('mouseout', (event) => {
                coin.pause();
                coin.currentTime = 0;
                coin.play();
                let theElement = event.target;
                theElement.style.animationName = 'itemrote';
                theElement.style.animationDuration = '1s';
                setTimeout(function(){
                    theElement.style.animationName = '';
                    theElement.style.animationDuration = '0s';
                }, 1000);
            })
            container_of_items.appendChild(item);
        }
        coreplace.appendChild(container_of_items);
        return;
    }

    let counter =[];
    let randoms = [];
    let random = 0;
    for(let i = 0; i < difficulty; i ++){
        counter[i] = 0;
    };
    for(let i = 0; i < quantity; i ++){

        do {
            random = Math.floor(Math.random() * 1000) % difficulty;
            counter[random] ++;
        }
        while(counter[random] > 3);

        randoms[i] = String.fromCharCode(97 + random); //change number to char
    };
    //..finshed
    //show pics on
    let random_in_80 = [];
    for(let i = 0; i < 80; i++){
        random_in_80[i] = false;
    }

    for(let i = 0; i < quantity; i ++){
        random = Math.floor(Math.random() * 1000) % 80;
        if(!random_in_80[random]){
            random_in_80[random] = randoms[i];
        }else{
            let BREAK = false;
                for(let y = 1; y <= random; y ++){
                    if(!random_in_80[random - y]){
                        random_in_80[random - y] = randoms[i];
                        BREAK = true;
                        break;
                    }
                }

                if(!BREAK){
                    let afte_number = 80 - random;
                    for(let x = 1; x < afte_number; x ++){
                        if(!random_in_80[random + x]){
                            random_in_80[random + x] = randoms[i];
                            break;
                        }
                    } 
                }
            }
    }

    for(let i = 0; i < 80; i ++){
        let item = document.createElement('img');
        item.setAttribute('class', 'item');
        if(random_in_80[i]){
            item.setAttribute('src', `pic/${random_in_80[i]}.png`);
            item.addEventListener('click', mate)
        }else{
            item.addEventListener('mouseout', (event) => {
                coin.pause();
                coin.currentTime = 0;
                coin.play();
                let theElement = event.target;
                theElement.style.animationName = 'itemrote';
                theElement.style.animationDuration = '1s';
                setTimeout(function(){
                    theElement.style.animationName = '';
                    theElement.style.animationDuration = '0s';
                }, 1000);
            })
        }
        container_of_items.appendChild(item);
    }
    coreplace.appendChild(container_of_items);

    TIMER[0] = true;
    myTimer();
}

function myTimer(){
    if(TIMER[0]){
        setTimeout(function(){
            timer ++;
            time.innerHTML = timer;
            myTimer();
        }, 100);
    }
}
