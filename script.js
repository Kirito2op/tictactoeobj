const gameboard = (function(){
    let board = new Array(9).fill('#');
    let toPlay = 0;
    let lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    let check = (position) => {
        if(board[position]!='#'){
            return board[position];
        }
        return '#';
    }
    let place = (positon) => {
        if(board[positon]==='#'){
            const display = document.querySelectorAll('.displaytext');
            if(toPlay==0){
                board[positon]='X';
                display[0].textContent = 'Player 2 to play';
            }
            else{
                board[positon]='O';
                display[0].textContent = 'Player 1 to play';
            }
            toPlay^= 1;
        }
    }
    let reset = () => {
        for(let i=0;i<9;i++){
            board[i]='#';
        }
        toPlay = 0;
        const grid = document.querySelectorAll('.grid');
        grid.forEach(element =>{
            element.textContent = '';
        });
        const display = document.querySelectorAll('.displaytext');
        display.forEach(element =>{
            element.textContent = 'Player 1 to play';
        });
    }

    let checkWinner = () => {
        for(let i=0;i<lines.length;i++){
            let tuple = lines[i];
            if(board[tuple[0]]===board[tuple[1]] && board[tuple[1]]===board[tuple[2]] && board[tuple[0]]!='#'){
                return board[tuple[0]];
            }
        }
        return '#';
    }
    return {check, place, reset, checkWinner};
})();

const squares = document.querySelectorAll('.grid');

squares.forEach(element => {
    element.addEventListener('click', function() {
        if(gameboard.checkWinner()==='#'){
            selected(parseInt(element.id));
        }
    });
});

const selected = (position) => {
    if(gameboard.check(position)!='#'){
        return;
    }
    gameboard.place(position);
    const square = document.getElementById(String(position));
    square.textContent = gameboard.check(position);
    const display = document.querySelectorAll('.displaytext');
    if(gameboard.checkWinner()==='X'){
        display[0].textContent = 'Player 1 has won! GGEZ!';
    }
    else if(gameboard.checkWinner()==='O'){
        display[0].textContent = 'Player 2 has won! GGEZ!';
    }
}