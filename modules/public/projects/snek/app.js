document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    let scoreDisplay = document.querySelector('#score')
    let txtDisplay = document.querySelector('#text')
    let score = 0
    const startBtn = document.querySelector('#start-button')
    const widthHeight = 22

    let currentPosition = widthHeight*10 + 5 
    let timerId
    let snekList = [] // it isn't adding values to the list sequentially
    let snek = []
    let appleList = []
    let direction = null;
    let snekLength = 0 // current length of snek
    let snekLimit = 5 // ++ if eats apple
    const rightKey = 39
    const upKey = 38
    const leftKey = 37
    const downKey = 40
    const speed = 200
    const scoreAdd = 10
    const grow = 2
    const txtDuration = 4000
    //let hasSnek = []
     
    
    function getSnekList(currentPosition) { // this has some problems
        let addStartPosition = 0
        addStartPosition += currentPosition
        if(snekList.length === 0 || snekList[snekList.length-1] != addStartPosition) {
        
            snekList.push(addStartPosition)
            addStartPosition -= currentPosition
        }
        if(snekList[snekList.length-1] === addStartPosition){
            snekLength -=1
        }
        
        return snekList
    }
    function gameOver() {
        var count = 0;
        getSnek(getSnekList(currentPosition)).forEach(index => {
            if(index === currentPosition) {
                count += 1
            }
        })

        if(squares[currentPosition].classList.contains('taken') || count >= 2) {
            console.log("game over")
            clearInterval(timerId)
            innerHTML = 'end'
            txtDisplay.innerHTML = "You ded :( "
        }
        if(squares[currentPosition].classList.contains('snek')) {
            console.log("game over")
            clearInterval(timerId)
            innerHTML = 'end'
            txtDisplay.innerHTML = "You ded :( "
        }
        
    }
    function getSnek(snekList) { // this is going to have some problems
        if(snekLength < snekLimit){
            snekLength +=1
        }
        if(snekLength > snekList.length-1){
            snekLength === snekList.length-1
        }
        snek.length = 0;
        
        
        for(i = snekList.length-1 ; i > (snekList.length-1) - snekLength; i--) {
            //if(snek.some(index => index === snekList[i])) {
               // continue
            //}    
            
            snek.splice(0,0, snekList[i])
            //snek.push(snekList[i])
        }
        return snek
    }

    function control(e) {
        if(e.keyCode === leftKey && direction != moveRight) {
            
            clearInterval(timerId)
            timerId = setInterval(moveLeft, speed)
            
        }
        if(e.keyCode === upKey && direction != moveDown) {
            
            clearInterval(timerId)
            timerId = setInterval(moveUp, speed)
        }
        if(e.keyCode === downKey && direction != moveUp) {
            
            clearInterval(timerId)
            timerId = setInterval(moveDown, speed)
        }
        if(e.keyCode === rightKey && direction != moveLeft) {
            clearInterval(timerId)
            timerId = setInterval(moveRight, speed)
        }
    }

    document.addEventListener('keyup', control)

    function draw() {
        
        getSnek(getSnekList(currentPosition)).forEach(index => {
            if(snek.length >= 5 && index != snek[snek.length-1]){
                //squares[index].classList.add('taken')
                squares[index].classList.add('snek')
            }
            if(snek.length >= 5 && index === snek[snek.length-1]){
                squares[index].classList.add('currentposition')
            }
            //console.log(squares[index])
            
        })
        
    }
    
    function unDraw() {
        
        getSnek(getSnekList(currentPosition)).forEach(index => {
            //if(squares[index] === null) {
               // continue
           // }
           
            squares[index].classList.remove('snek')
            squares[index].classList.remove('taken')
            squares[index].classList.remove('currentposition')
            //console.log(currentPosition)
            
            squares[index].style.backgroundColor = '';
        })
        
    }

    // function blinkTaken() {
    //     for(let i = 0; i < squares.length; i++) {
    //         if(squares[i].classList.contains('taken')){
    //             squares[i].style.backgroundColor == 'red';
    //             squares[i].style.backgroundColor = 'yellow';
    //             console.log('something ok?')
    //             break;
    //         }
    //         if(squares[i].classList.contains('taken')){
    //             squares[i].style.backgroundColor == 'yellow';
    //             squares[i].style.backgroundColor = 'red';
    //             console.log('something diffferent')
    //             break;
    //         }
    //     }
    // }

    function generateApple() {
        for(i = 0; i < squares.length; i++) {
            
            if(squares[i].classList.contains('taken')) {
                continue;
            }
            if(squares[i].classList.contains('snek')){
                continue;
            }
            appleList.push(i)
        }
        var appleIndex = Math.floor(Math.random() * appleList.length)
        var apple = appleList[appleIndex]
        //console.log(appleList)
        squares[apple].classList.add('apple')
        appleList.splice(0, appleList.length)
    }
    function appleTxt(){
        var appleTxt = SetInterval("alright!", txtDuration)
        
        return appleTxt;
    }

    function checkApple() {
        if(squares[currentPosition].classList.contains('apple')) {
            squares[currentPosition].classList.remove('apple')
            snekLimit += grow;
            score += scoreAdd;
            scoreDisplay.innerHTML = score;
            
            //aksldfhja;klsdfh;aklsdf
            generateApple()
            txtDisplay.innerHTML = appleTxt()
            txtDisplay.innerHTML = "Can snek has snac?"
            

        }
    }

    function moveRight() {
        unDraw()
        currentPosition +=1
        draw()
        checkApple()
        direction = moveRight
        gameOver()
    }

    function moveUp() {
        unDraw()
        currentPosition -= widthHeight
        //getSnekList(startPosition)
        //getSnek(snekList)
        draw()
        direction = moveUp
        checkApple()
        
        gameOver()
    }

    function moveDown() {
        unDraw()
        currentPosition += widthHeight
        //getSnekList(startPosition)
        //getSnek(snekList)
        draw()
        checkApple()
        direction = moveDown
        gameOver()
    }

    function moveLeft() {
        unDraw()
        currentPosition -= 1
        //getSnekList(startPosition)
        //getSnek(snekList)
        draw()
        checkApple()
        direction = moveLeft
        gameOver()
    }
    
    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            
            timerId = setInterval(moveRight, speed)
            if(!squares.some(index => index.classList.contains('apple'))){
                generateApple()
            }
                   
        }
    })


})