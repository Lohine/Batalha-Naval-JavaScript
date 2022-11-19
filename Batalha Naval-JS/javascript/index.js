function field(cols_count, rows_count, ships){
    var rows =[];

    //Posiciona os barcos no campo. Se não tiver barcos, começa com zero.
    for(var i = 0; i < rows_count; i++){
        rows[i] = [];
        for(var j = 0; j < cols_count; j++){
            if (ships.map(x=> JSON.stringify(x)).includes("["+i +","+j+"]")){
                rows[i][j] = "🚢";
            } else {
                rows[i][j] = "🌊";
            }
        }
    }

    return rows;
}

function click(event){
    
    if(fim === 0){
        if (event.target.textContent === "🚢"){ 
            event.target.childNodes[0].setAttribute('class', '');                  
            event.target.childNodes[0].textContent = '💥';                            
            points = points + 1;        
            
            if (dif === 0 && points === 4 && fim === 0){
                for(element of document.querySelectorAll('span')){
                    element.setAttribute('class', '');
                }
                fim = 1;  
                endGame('W');          
            }
    
            if (dif === 1 && points === 7 && fim === 0){
                for(element of document.querySelectorAll('span')){
                    element.setAttribute('class', '');
                }
                fim = 1;            
                endGame('W');    
            }
    
            if (dif === 2 && points === 10 && fim === 0){
                for(element of document.querySelectorAll('span')){
                    element.setAttribute('class', '');
                }
                fim = 1;  
                endGame('W');               
            }
            
        } else {
            event.target.childNodes[0].setAttribute('class', '');
            errors = errors + 1;
    
            if (dif === 0 && errors === 10 && fim === 0){
                for(element of document.querySelectorAll('span')){
                    element.setAttribute('class', '');
                }
                fim = 1;
                endGame('L');              
            }
    
            if (dif === 1 && errors === 15 && fim === 0){
                for(element of document.querySelectorAll('span')){
                    element.setAttribute('class', '');
                }
                fim = 1;
                endGame('L');             
            }
    
            if (dif === 2 && errors === 20 && fim === 0){
                for(element of document.querySelectorAll('span')){
                    element.setAttribute('class', '');
                }
                fim = 1;
                endGame('L');            
            }
        }
    }   

    pontuacaoJogadas(dif);
}

function drawTable(rows){

    pontuacaoJogadas(dif);

    var table = document.getElementById('field');
    for(var row of rows){ 
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for(var col of row){
            var td = document.createElement('td');
            var span = document.createElement('span');            
            span.textContent = col;
            span.setAttribute('class', 'invisible');            
            td.appendChild(span);
            tr.appendChild(td);
            td.addEventListener('click', click);
        }       
    }
}

function pontuacaoJogadas(difficulty){

    if (difficulty === 0){   

        var naviosRestantes = 4-points
        var jogadasRestantes = 10-errors

        if (naviosRestantes >= 0 && jogadasRestantes >= 0){
            var element1 = document.getElementById('naviosRestantes');
            var element2 = document.getElementById('jogadasRestantes');
            element1.innerHTML =("Navios Restantes: " + (naviosRestantes));
            element2.innerHTML = ("Jogadas Restantes: " + (jogadasRestantes));               
        }         
    }

    if (difficulty === 1){   

        var naviosRestantes = 7-points
        var jogadasRestantes = 15-errors

        if (naviosRestantes >= 0 && jogadasRestantes >= 0){
            var element1 = document.getElementById('naviosRestantes');
            var element2 = document.getElementById('jogadasRestantes');
            element1.innerHTML =("Navios Restantes: " + (naviosRestantes));
            element2.innerHTML = ("Jogadas Restantes: " + (jogadasRestantes));               
        }         
    }

    if (difficulty === 2){   

        var naviosRestantes = 10-points
        var jogadasRestantes = 20-errors

        if (naviosRestantes >= 0 && jogadasRestantes >= 0){
            var element1 = document.getElementById('naviosRestantes');
            var element2 = document.getElementById('jogadasRestantes');
            element1.innerHTML =("Navios Restantes: " + (naviosRestantes));
            element2.innerHTML = ("Jogadas Restantes: " + (jogadasRestantes));               
        }         
    }
}

function endGame(EndType){
    var h3 = document.getElementById('endGame');
    h3.setAttribute('class', '');

    if(EndType === 'W'){
        h3.innerHTML = ("Todos os Navios Foram Atingidos! Fim de Jogo!");
    } else {
        h3.innerHTML = ("Você Errou Muitos Disparos! Tente Novamente!");
    }
}

function randomShips(quantity, cols, rows){
    ships = []
    for(var i = 0; i < quantity; i++){
        var positionRow = parseInt(Math.random() * rows);
        var positionCol = parseInt(Math.random() * cols);
        if (ships.map(x=> JSON.stringify(x)).includes("["+positionRow +","+positionCol+"]")){
            i--;
        } else {
            ships.push([positionRow, positionCol]);
        }        
    }
    return ships;
}

function clearSea(){
    window.location.reload();
}

function easyGame(){       
    var ships = randomShips(4, 4, 4);
    var sea = field(4, 4, ships);   
    
    var btnReset = document.getElementById('reset');
    btnReset.setAttribute('class', '');  

    drawTable(sea);   
    
    var aux = document.getElementById('btnEasy');
    aux.setAttribute('class', 'invisible');    
    
    var aux = document.getElementById('btnMedium');
    aux.setAttribute('class', 'invisible');   

    var aux = document.getElementById('btnHard');
    aux.setAttribute('class', 'invisible'); 
}

function mediumGame(){        
    var ships = randomShips(7, 6, 6);
    var sea = field(6, 6, ships);

    var btnReset = document.getElementById('reset');
    btnReset.setAttribute('class', '');  

    dif = 1;
    drawTable(sea);

    var aux = document.getElementById('btnEasy');
    aux.setAttribute('class', 'invisible');    
    
    var aux = document.getElementById('btnMedium');
    aux.setAttribute('class', 'invisible');   

    var aux = document.getElementById('btnHard');
    aux.setAttribute('class', 'invisible'); 
}

function hardGame(){ 
    var ships = randomShips(10, 8, 8);
    var sea = field(8, 8, ships);

    var btnReset = document.getElementById('reset');
    btnReset.setAttribute('class', '');  

    dif = 2;
    drawTable(sea);

    var aux = document.getElementById('btnEasy');
    aux.setAttribute('class', 'invisible');    
    
    var aux = document.getElementById('btnMedium');
    aux.setAttribute('class', 'invisible');   

    var aux = document.getElementById('btnHard');
    aux.setAttribute('class', 'invisible'); 
}

var points = 0;
var errors = 0;
var dif = 0;
var fim = 0;
 