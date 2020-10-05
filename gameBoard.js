const numColumns=5;
const numRows=5;

const numCards=numColumns*numRows-1;

function createShuffleArr(){
   const outer=[];
    for (let i=1;i<=numCards;i++){
        let inner=[i,Math.random(),''];
        outer.push(inner);
    }
    // console.log({outer});
    return outer;
}

function sortArrayByIndex (tempArr,intInd) {   // Array und Index
    // const newArr = tempArr.slice();
    // const newArr=[...tempArr];
    const newArr=JSON.parse(JSON.stringify(tempArr)); //Kopie des Array mit neuen Referenzen
    let modified=true;
    while (modified){
        modified=false;
        for(let j=0;j<newArr.length-1;j++) {
            let arrClb=[];
            
            if (newArr[j][intInd] > newArr[(j+1)][intInd]) {  //newArr[j][intInd] > newArr[(j+1)][intInd]
                                                            //Die Zufallszahlen der 
                arrClb=newArr[j];                       //Die Zeilen werden getauscht
                newArr[j]=newArr[j+1];                 //dafür bracht man einen Zwischenspeicher
                newArr[j+1]=arrClb;
                modified=true;
            }
        }
    }
    return newArr;
}



function setImages(tempArray){
    // const newArray=tempArray.slice(); funkioniert nur für das äußere Array, die inneren Arrays bleiben gleich
    // const newArray=[...tempArray];
    const newArray=JSON.parse(JSON.stringify(tempArray));
    let j=0;   //Zählvariable für den Durchlauf des Array
    for (let i=1; i<=(numCards/2); i++){
        
        newArray[j][2]="img"+i;   //Jeweils 2 Felder bekommen das gleiche Bild
        j++;
        newArray[j][2]="img"+i;
        j++;
    }
    return newArray;
}

function createMasterArray(){
    return sortArrayByIndex( setImages( sortArrayByIndex( createShuffleArr() ,1) ) ,0);
}

function createSub(type,id,className,dataKey,dataValue,innerText){
    //values: {id,classname}
    const sub = document.createElement(type);
    if(id){sub.id=id;}
    if(className){sub.className=className;}
    if(dataKey && dataValue){sub.setAttribute(dataKey,dataValue)};
    if(innerText){sub.innerText=innerText};
        // console.log('sub.dataset.img: ',sub.dataset.img);
        // console.log({sub});
    return sub;
}
function createSubDiv(id,className,dataKey,dataValue,innerText){
   return createSub('div',id,className,dataKey,dataValue,innerText);
}


function createBoard(){
    
    const masterArray=createMasterArray();
    const board = document.querySelector('#board');
    
    let k=0;    //Zählvariable für das Auslesen des masterArray (24 Kartenfelder von 1 bis 24 (Array:0 bis 23))
    let l=0;    //Zählvariable für die Anzahl der Felder (25 Felder, 24 Kartenfelder und 1 Score-Feld in der Mitte
    for(let i=0; i<numRows;i++){
        const rowDiv = createSubDiv(('row'+(i+1)),'row');
        for(let j=0; j<numColumns;j++){
            // const cardDiv = document.createElement('div');
            let cardDiv;
            let innerBox;
            if (l===numCards/2){
                cardDiv=(createSubDiv('score', 'card'));
                    innerBox=createSubDiv('','innerBox','','','Score');
                    cardDiv.append(innerBox);               // cardDiv.id="score";
                l++;
            } else {
                cardDiv=createSubDiv(masterArray[k][0],"card validCard","data-img",masterArray[k][2]);
                    innerBox=createSubDiv('','innerBox');
                        let front=createSubDiv('',('front '+masterArray[k][2]))
                        let back=createSubDiv('','back');
                    innerBox.append(front,back);
                cardDiv.append(innerBox);
                k++;  
                l++;  
            }
            rowDiv.append(cardDiv);
            // console.log(i,j);
        }
        board.append(rowDiv);
    }
}  
    
createBoard();
console.log('Spiel geladen');   
    




