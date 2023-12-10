import {  Typography } from "@mui/material";
import './tictactoe.css';
import Header from "../header/Header";
import { CanvasHTMLAttributes } from "react";

function TicTacToe() {

let i = 0;
let j = 1;


let flag = true;

let array = [];

let board = [[0, 1, 2],

             [3, 4, 5],
 
             [6, 7, 8]];


let indices = [[0, 1, 2],

               [0, 1, 2],

               [0, 1, 2]
]             

let gameOver = false;

    function handlePlay(e) {
        try{

          
           
            if(gameOver) {
                return;
            }  
            let id = e.target.id;
            id = parseInt(id);
            if(array.includes(id)) {
                return;
            }
            else{
                array.push(id);
            }
           let btn = document.getElementById(id);
          btn.innerText = 'X';
          if(detectCheckmate(id)) {
            let div = document.getElementsByClassName('hide')[0];
            div.classList.add('unhide');
            div.classList.remove('hide');
            gameOver = true;
            let pElement = document.getElementsByClassName('pblock')[0];
            pElement.innerHTML += "<h3>You Won!</h3>"
          }
          btn.classList.add('colorGreen')
          if(scanBoard()) {
            gameOver = true;
            let div = document.getElementsByClassName('hide')[0];
            div.classList.add('unhide');
            div.classList.remove('hide');
            let pElement = document.getElementsByClassName('pblock')[0];
            pElement.innerHTML += "<h3>Game Ended In a Tie!</h3>"
        }
             id = computerMove();
             id = parseInt(id)
             console.log('logging comp id');
             console.log(id);
            array.push(id);
             btn = document.getElementById(id);
            btn.innerText = "O";
            if(detectCheckmate(id)) {
                let div = document.getElementsByClassName('hide')[0];
                div.classList.add('unhide');
                div.classList.remove('hide');
                gameOver = true;
                let pElement = document.getElementsByClassName('pblock')[0];
                pElement.innerHTML += "<h3>Game won by Computer!</h3>"
              }
            btn.classList.add('colorRed')
          
    }catch(err) {
            console.log(err);
            return;
        }
    }

    function scanBoard() {
       
        for(let k = 0; k < board.length; k++) {
            for(let p = 0; p < board.length; p++) {
                let text = document.getElementById(board[k][p]).innerText;
                    if(text === '') {
                    return false;
                    }  
            }
        }
        return true;

    }

    function detectCheckmate(id) {
        try{
                let text = document.getElementById(id).innerText;
                for(let k = 0; k < indices.length; k++) {
                    for(let p = 0; p < indices.length; p++) {
                        if(board[k][p] == id) {
                            if(checkHorizontalCheckmate(board[k][p], k, p, text)) {
                                return true;
                            }
                            if(checkVerticalCheckmate(board[k][p], k, p, text)) {
                                return true;
                            }
                            if(checkDiagonalCheckmate(board[k][p], k, p, text)) {
                                return true;
                            }
                            return false;
                        }
                    }
                }

                
        }
        catch(err) {
            console.log(err);
        }
    }

    function checkHorizontalCheckmate(id, x, y, text) {
        try{
        let checkmate = 1;
        if(y - 1 >= 0) {
            let text1 = document.getElementById(board[x][y - 1]).innerText;
            if(text1 !== undefined) {
                if(text1 === text) {
                    checkmate++;
                }
                if(y - 2 >= 0) {
                    let text2 = document.getElementById(board[x][y - 2]).innerText;
                    if(text2 !== undefined) {
                        if(text === text2) {
                            checkmate++;
                            if(checkmate === 3) {
                                return true;
                            }
                        }
                    }
                }
                else if(y + 1 <= 2) {
                    let text2 = document.getElementById(board[x][y + 1]).innerText;
                    if(text2 !== undefined) {
                        if(text === text2) {
                            checkmate++;
                            if(checkmate === 3) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        else if(y + 1 <= 2) {
            let text1 = document.getElementById(board[x][y + 1]).innerText;
            if(text1 !== undefined) {
                if(text === text1) {
                    checkmate++;
                    if(checkmate === 3) {
                        return true;
                    }
                }
                if(y + 2 <= 2) {
                    let text2 = document.getElementById(board[x][y + 2]).innerText;
                    if(text2 !== undefined) {
                        if(text === text2) {
                            checkmate++;
                            if(checkmate === 3) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    
    
    
    
    }catch(err) {
            console.log(err);
        }
    }


    function checkVerticalCheckmate(id, x, y, text) {
        try{
            let checkmate = 1;
            if(x - 1 >= 0) {
                let text1 = document.getElementById(board[x - 1][y]).innerText;
                if(text1 !== undefined) {
                    if(text1 === text) {
                        checkmate++;
                    }
                    if(x - 2 >= 0) {
                        let text2 = document.getElementById(board[x - 2][y]).innerText;
                        if(text2 !== undefined) {
                            if(text === text2) {
                                checkmate++;
                                if(checkmate === 3) {
                                    return true;
                                }
                            }
                        }
                    }
                    else if(x + 1 <= 2) {
                        let text2 = document.getElementById(board[x + 1][y]).innerText;
                        if(text2 !== undefined) {
                            if(text === text2) {
                                checkmate++;
                                if(checkmate === 3) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            else if(x + 1 <= 2) {
                let text1 = document.getElementById(board[x + 1][y]).innerText;
                if(text1 !== undefined) {
                    if(text === text1) {
                        checkmate++;
                        if(checkmate === 3) {
                            return true;
                        }
                    }
                    if(x + 2 <= 2) {
                        let text2 = document.getElementById(board[x + 2][y]).innerText;
                        if(text2 !== undefined) {
                            if(text === text2) {
                                checkmate++;
                                if(checkmate === 3) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;

    }catch(err) {
        console.log(err);
    }
}

    function checkDiagonalCheckmate(id, x, y, text) {
        try{
            let checkmate = 1;
            if(x - 1 >= 0 && y - 1 >= 0) {
                let text1 = document.getElementById(board[x - 1][y - 1]).innerText;
                if(text1 !== undefined) {
                    if(text1 === text) {
                        checkmate++;
                        if(x - 2 >= 0 && y - 2 >= 0) {
                            let text2 = document.getElementById(board[x - 2][y - 2]).innerText;
                            if(text2 !== undefined) {
                                if(text2 === text) {
                                        return true;
                                }
                            }
                        }
                        else if(x + 1 <= 2 && y + 1 <= 2) {
                            let text2 = document.getElementById(board[x + 1][y + 1]).innerText;
                            if(text2 !== undefined) {
                                if(text2 === text) {
                                    checkmate++;
                                    if(checkmate === 3) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if(x + 2 <= 2 && y + 2 <= 2) {
                let text1 = document.getElementById(board[x + 1][y + 1]).innerText;
                if(text1 !== undefined) {
                    if(text === text1) {
                        let text2 = document.getElementById(board[x + 2][y + 2]).innerText;
                        if(text2 !== undefined) {
                        if(text2 === text) {
                            return true;
                        }
                    }
                    }
                }
            }

            else if( x- 1 >= 0 && y + 1 <= 2) {
                let text1 = document.getElementById(board[x - 1][y + 1]).innerText;
                if(text1 !== undefined) {
                    if(text === text1) {
                        checkmate++;
                        if(x - 2 >= 0 && y + 2 <= 2) {
                            let text2 = document.getElementById(board[x - 2][y + 2]).innerText;
                                if(text2 !== undefined) {
                                    if(text2 === text) {
                                        checkmate++;
                                        if(checkmate === 3) {
                                            return true;
                                        }
                                    }
                                }
                            }
                            else if(x + 1 <= 2 && y - 1>= 0) {
                                let text2 = document.getElementById(board[x + 1][y - 1]).innerText;
                                if(text2 !== undefined) {
                                    if(text === text2) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
                else if(x + 2 <= 2 && y - 2 >= 0) {
                    let text1 = document.getElementById(board[x + 1][y - 1]).innerText;
                    if(text1 !== undefined) {
                    if(text1 === text) {
                        let text2 = document.getElementById(board[x + 2][y - 2]).innerText;
                        if(text2 !== undefined) {
                            if(text2 === text) {
                                return true;
                            }
                        }
                    }
                }
                }
                return false;
    }catch(err) {
        console.log(err);
    }
    return false;
    }

    function computerMove(){
        try{
       
            let indexes = detectPossibleCheckmate();
            console.log('logging comp indexes');
            console.log(indexes);
            if(indexes?.length > 1) {
                return board[indexes[0]][indexes[1]];
            }
            //special cell
            let specialCell = [1, 1];
            let text = document.getElementById(board[1][1]).innerText;
            if(text === '') {
                return board[specialCell[0]][specialCell[1]];
            }
            //corners
            else{
                console.log('else');
                text = document.getElementById(board[2][0]).innerText;
                console.log('logging 2, 0 text');
                console.log(text);
                if(text === '') {
                    console.log('2, 0');
                    return board[2][0];
                }
                else{
                    text = document.getElementById(board[2][2]).innerText;
                    if(text === '') {
                        return board[2][2];
                    }
                    else{
                        text = document.getElementById(board[0][0]).innerText;
                        if(text === '') {
                            return board[0][0];
                        }
                        else{
                            text = document.getElementById(board[0][2]).innerText;
                            if(text === '') {
                                return board[0][2];
                            }

                            //any other random cell
                            else{
                                for(let k = 0; k < board.length; k++) {
                                    for(let p = 0; p < board.length; p++) {
                                        text = document.getElementById(board[k][p]).innerText;
                                        if(text === '') {
                                            return board[k][p];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }catch(err) {
            console.log(err);
        }
    }


    function detectPossibleCheckmate() {
       let indexes =  compPossibleHorizontalCheckmate();
       if(indexes?.length > 1) {
            return indexes;
       }
       indexes = compPossibleVerticalCheckmate();
       if(indexes?.length > 1) {
        return indexes;
       }

       indexes = compPossibleDiagonalCheckmate();
       if(indexes?.length > 1) {
        return indexes;
       }
       indexes = checkPossibleHorizontalCheckmate();
       if(indexes?.length > 1) {
        return indexes;
       }
       indexes =  checkPossibleVerticalCheckmate();
       if(indexes?.length > 1) {
        return indexes;
       }
       
        indexes = checkPossibleDiagonalCheckmate();
        if(indexes?.length > 1) {
            return indexes;
        }
    }


    function compPossibleHorizontalCheckmate() {
        try{
            let text = 'O';
            let oCheckmate = 0;
        for(let k = 0; k < board.length; k++) {
            for(let p = 0; p < board.length; p++) {
                let text1 = document.getElementById(board[k][p]).innerText;
                if(text1 !== '') {
                    if(text1 === text) {
                        oCheckmate++;
                        if(oCheckmate === 2) {
                           for(let x = 0; x < board.length; x++) {
                            let text7 = document.getElementById(board[k][x]).innerText;
                            if(text7 === '') {
                                let xY = [];
                                xY.push(k);
                                xY.push(x);
                                console.log('from COMP horizontal checkmate')
                                console.log(xY);
                                return xY;
                            }
                           }
                           oCheckmate--;
                        }
                    }
                }
            }
        oCheckmate = 0;
      }
      return [];
    
    
    }catch(err) {
            console.log(err);
        }
    }

    function checkPossibleHorizontalCheckmate() {
        try{
            let text = 'X';
            let checkmate = 0;
          for(let k = 0; k < board.length; k++) {
            for(let p = 0; p < board.length; p++) {
                let text1 = document.getElementById(board[k][p]).innerText;
                if(text1 !== '') {
                    if(text1 === text) {
                        checkmate++;
                        if(checkmate === 2) {
                            for(let x = 0; x < board.length; x++) {
                                let text7 = document.getElementById(board[k][x]).innerText;
                                if(text7 === '') {
                                    console.log('Horizontal Checkmate')
                                    let xY = [];
                                    xY.push(k);
                                    xY.push(x);
                                    return xY;
                                }
                               }
                               checkmate--;
                        }
                    }
                   

                }
            }
            checkmate = 0;
                  }
          return [];
        
        
        }catch(err) {
                console.log(err);
            }
    }

    function compPossibleVerticalCheckmate() {
        let text6 = 'O';
        let oCheckmate = 0;
        for(let k = 0; k < board.length; k++) {
            for(let p = 0; p < board.length; p++) {
                let text1 = document.getElementById(board[p][k]).innerText;
                if(text1 !== '') {
                    if(text1 === text6) {
                        oCheckmate++;
                        if(oCheckmate === 2) {
                            for(let x = 0; x < board.length; x++) {
                                let text7 = document.getElementById(board[x][k]).innerText;
                                if(text7 === '') {
                                    console.log('From COMP Vertical')
                                    let xY = [];
                                    xY.push(x);
                                    xY.push(k);
                                    return xY;
                                }
                               }
                               oCheckmate--;
                        
                        }
                    }
                }
            }
                    oCheckmate = 0;
                }
                return [];
    }

    function checkPossibleVerticalCheckmate() {
        let text = 'X';
        let checkmate = 0;
        for(let k = 0; k < board.length; k++) {
            for(let p = 0; p < board.length; p++) {
                let text1 = document.getElementById(board[p][k]).innerText;
                if(text1 !== '') {
                    if(text1 === text) {
                        checkmate++;
                        if(checkmate === 2) {
                            for(let x = 0; x < board.length; x++) {
                                let text7 = document.getElementById(board[x][k]).innerText;
                                if(text7 === '') {
                                    console.log('Vertical Checkmate!')
                                    let xY = [];
                                    xY.push(x);
                                    xY.push(k);
                                    return xY;
                                }
                               }
                               checkmate--;
                        }
                    }
                    
                }
            }
            checkmate = 0;
        }
        return [];
    }



    function compPossibleDiagonalCheckmate() {
        let text6 = 'O';
        let x = 1;
        let y = 1;
        let oCheckmate = 0;
        let text1 = document.getElementById(board[x][y]).innerText;
        if(text1 !== '') {
            if(text1 === text6) {
                oCheckmate++;
            }
        }

        let text2 = document.getElementById(board[x - 1][y - 1]).innerText;
        if(text2 !== '') {
            if(text2 === text6) {
                oCheckmate++;
                if(oCheckmate === 2) {
                    let text3 = document.getElementById(board[x + 1][y + 1]).innerText;
                    if(text3 === '') {
                        console.log('FROM DIAGONAL COMP')
                    let xY = [];
                    xY.push(x + 1);
                    xY.push(y + 1);
                    return xY;
                }
            else{
                oCheckmate--;
            }
            }
            }
        }


        let text3 = document.getElementById(board[x + 1][y + 1]).innerText;
        if(text3 !== '') {
            if(text3 === text6) {
                oCheckmate++;
                if(oCheckmate === 2) {
                    if(text1 === '') {
                        console.log('FROM DIAGONAL COMP')
                        let xY = [];
                        xY.push(x);
                        xY.push(y);
                        return xY;
                    }
                    else{
                        let text3 = document.getElementById(board[x - 1][y - 1]).innerText;
                        if(text3 === '') {
                            console.log('FROM DIAGONAL COMP')
                        let xY = [];
                        xY.push(x - 1);
                        xY.push(y - 1);
                        return xY;
                        }
                        else{
                            oCheckmate--;
                        }
                    }
                }
            }
    }

    if(text1 === '' || (text1 !== text6)) {
        oCheckmate = 0;
    }
    text2 = document.getElementById(board[x - 1][y + 1]).innerText;
    if(text2 !== '') {
        if(text2 === text6) {
            oCheckmate++;
            if(oCheckmate === 2) {
                let text3 = document.getElementById(board[x + 1][y - 1]).innerText;
                if(text3 === '') {
                    console.log('FROM DIAGONAL COMP')
                let xY = [];
                xY.push(x + 1);
                xY.push(y - 1);
                return xY;
            }}
            else{
                oCheckmate--;
            }
        }
    }

    text3 = document.getElementById(board[x + 1][y - 1]).innerText;
    if(text3 !== '') {
        if(text3 === text6) {
            oCheckmate++;
            if(oCheckmate === 2) {
                if(text1 === '') {
                    console.log('FROM DIAGONAL COMP')
                    let xY = [];
                    xY.push(x);
                    xY.push(y);
                    return xY;
                }
                else{
                    let text3 = document.getElementById(board[x - 1][y + 1]).innerText;
                    if(text3 === '') {
                        console.log('FROM DIAGONAL COMP')
                    let xY = [];
                    xY.push(x - 1);
                    xY.push(y + 1);
                    return xY;
                }
                else{
                    oCheckmate--;
                }
            }
              
            }
        }

    }
    return [];


}







    function checkPossibleDiagonalCheckmate() {
        let text = "X";
        let x = 1;
        let y = 1;
        let checkmate = 0;
        let text1 = document.getElementById(board[x][y]).innerText;
        if(text1 !== '') {
            if(text1 === text) {
                checkmate++;
            }
        }

        let text2 = document.getElementById(board[x - 1][y - 1]).innerText;
        if(text2 !== '') {
            if(text2 === text) {
                checkmate++;
                if(checkmate === 2) {
                    let text3 = document.getElementById(board[x + 1][y + 1]).innerText;
                    if(text3 === '') {
                        console.log('Diagonal Checkmate')
                    let xY = [];
                    xY.push((x + 1));
                    xY.push(y + 1);
                    return xY;
                    }
                    else{
                        checkmate--;
                    }
                }
            }
        }

        let text3 = document.getElementById(board[x + 1][y + 1]).innerText;
        if(text3 !== '') {
            if(text3 === text) {
                checkmate++;
                if(checkmate === 2) {
                    if(text1 === '') {
                        console.log('Diagonal Checkmate')
                    let xY = [];
                    xY.push(x);
                    xY.push(y);
                    return xY;
                }
                else{
                    let text3 = document.getElementById(board[x - 1][y - 1]).innerText;
                        if(text3 === '') {
                            console.log('Diagonal Checkmate')
                    
                    let xY = [];
                    xY.push(x - 1);
                    xY.push(y - 1);
                    return xY;
                }
            else{
                checkmate--;
            }
            
            }
            }
            }

            }
            if(text1 === '' || (text1 !== text)) {
            checkmate = 0;
        }else{
            checkmate = 1;
        }


        text2 = document.getElementById(board[x - 1][y + 1]).innerText;
        if(text2 !== '') {
            if(text2 === text) {
                checkmate++;
                if(checkmate === 2) {
                    let text3 = document.getElementById(board[x + 1][y - 1]).innerText;
                    if(text3 === '') {
                        console.log('Diagonal Checkmate')
                    let xY = [];
                    xY.push(x + 1);
                    xY.push(y - 1);
                    return xY;
                }}
                else{
                    checkmate--;
                }
            }
        }

        text3 = document.getElementById(board[x + 1][y - 1]).innerText;
        if(text3 !== '') {
            if(text3 === text) {
                checkmate++;
                if(checkmate === 2) {
                    if(text1 === '') {
                        console.log('Diagonal Checkmate')
                        let xY = [];
                        xY.push(x);
                        xY.push(y);
                        return xY;
                    }
                    else{
                        let text3 = document.getElementById(board[x - 1][y + 1]).innerText;
                        if(text3 === '') {
                            console.log('Diagonal Checkmate')
                        let xY = [];
                        xY.push(x - 1);
                        xY.push(y + 1);
                        return xY;
                    }
                else{
                    checkmate--;
                }
                }
                }
            }
        }
        return [];
    }

    return(
        <>
        <Header></Header>
        <div className="heading">
        <Typography><h3>TIC-TAC-TOE</h3></Typography>
        <Typography id = 'turn' className="nothidden"><h5>PLAYER {j}'s TURN</h5></Typography>
        <Typography id = 'turn' className="hidden"><h5>Computer's TURN</h5></Typography>
        </div>
        <div id = 'gridDiv'>
        <div id = 'firstcoldiv'>
            <div>
            <button id = {i++} className="btn" onClick={event => {handlePlay(event)}} ></button>
            </div>
            <div>
            <button  id = {i++} className="btn" onClick={event => {handlePlay(event)}}></button>
            </div>
            <div>
            <button  id = {i++} className="btn" onClick={event => {handlePlay(event)}}></button>
            </div>
        </div>
         <div id = 'secondcoldiv'>
            <div>
         <button  id = {i++} className="btn" onClick={event => {handlePlay(event)}}></button>
         </div>
         <div>
         <button  id = {i++} className="btn" onClick={event => {handlePlay(event)}}></button>
         </div>
         <div>
         <button  id = {i++} className="btn" onClick={event => {handlePlay(event)}}></button>
         </div>
     </div>
      <div id = 'thirdcoldiv'>
        <div>
      <button  id = {i++} className="btn" onClick={event => {handlePlay(event)}}></button>
      </div>
      <div>
      <button  id = {i++} className="btn" onClick={event => {handlePlay(event)}}></button>
      </div>
      <div>
      <button  id = {i++} className="btn" onClick={event => {handlePlay(event)}}></button>
      </div>
  </div>
  </div>
  <div className="hide"> 
    <p className="pblock">
    </p>
  </div>
  </>
    )
}


export default TicTacToe;