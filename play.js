let openCards=0;
let card1;
let card2;
const board=document.querySelector('#board');
// console.log(board);
board.addEventListener('click',function(e){
    let card;
    function restoreCards(){
        card1.classList.remove('visible');
        card2.classList.remove('visible');
        openCards=0;
    }
    
    function clickedCard(){
        let back=e.target;
        console.log({back});
        // back.classList.add('hidden');
        card=back.parentElement.parentElement;
        console.log({card});
        if (!(card.classList.contains('validCard'))||(card.classList.contains('visible'))||(openCards>1)){
            console.log("Invalid Card");
            return;
        };
        card.classList.add('visible');
        openCards++;
        return card;
    }  //Ende der Funktion clickedCard()
    
    card=clickedCard();
    
    if (!card){
        console.log('Kartenwert Null');
        return
    }
    
    if (openCards===1){
        
        card1=card;
        
    } else if(openCards===2){
        card2=card;
        console.log('card1 :',card1.dataset.img)
        console.log('card2 :',card2.dataset.img)
        if (card1.dataset.img === card2.dataset.img){   //Hurra, ein Paar
            card1.classList.remove('validCard');
            card2.classList.remove('validCard');
            openCards=0;
        } else {                                        //Du Loser, wieder nix
            setTimeout(restoreCards,1500)
        }

    } else {
        console.log('Es sind schon zwei Karten gezogen', openCards);
    }
    console.log('openCards: ',openCards);
    

});