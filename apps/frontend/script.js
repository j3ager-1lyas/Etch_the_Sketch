
/*Styling The Slide Size-Slide Bar */
const slideValue=document.querySelector("span");
const inputSlider= document.querySelector("#gridSize");
slideValue.style.left = (16) + '%';
inputSlider.oninput = (()=>{
    let value = inputSlider.value;
    slideValue.textContent = value;
    slideValue.style.left = (value) + '%';
})

/* Calling UI Inputs & Outputs and Declaring Global Variables*/
    /* Inputs */
let chosenGridSize = document.querySelector('#gridSize');
let chosenColor = document.querySelector('#colorPalette');
let chosenRainbow = document.querySelector('#rainbowColor');
let darkening = document.querySelector('#darkening');
let lightening = document.querySelector('#lightening');
let eraser = document.querySelector('#eraser');
let clear = document.querySelector('#tableClear');
    /* Outputs */
let drawingBoard = document.querySelector('#drawingBoard');
    /* G-Variables */
let gridSize =16;
let pixelColor='black';
let pixelRainbow=pixelDarken=pixelLighten=false;

/*Initsialize when Content is Loaded */
initialize();
/* Functionality */
function buildGrid(){
    
    let boardsData = drawingBoard.getBoundingClientRect()
    let boardsWidth = Math.floor(boardsData.width)-3;/*3px is the added value of the border af */
    let boardsHeight= boardsData.height - 3.2;/*3.2px is the added value of the bordes issue */

    for(i=1; i<=gridSize*gridSize;i++){
        let gridPixel = document.createElement('div');
        gridPixel.classList.add(`pixel`);
        gridPixel.style.width = boardsWidth / gridSize +"px";
        gridPixel.style.height = boardsHeight / gridSize+ "px";
        drawingBoard.appendChild(gridPixel);
    }
    let gridPixel=document.querySelectorAll('.pixel');
    gridPixel.forEach((pixel)=>{
        pixel.addEventListener('mouseover',colorThePixel);
    })
    clear.textContent= 'Table Building !!'
    setTimeout(()=>{clear.textContent= 'Clear Table'},2000)
}

function getGridSize(){
    gridSize =0;
    gridSize = this.value;
    clearTable();
}

function colorThePixel(){
    if (pixelRainbow){
        this.style.backgroundColor= "#" + Math.floor(Math.random()* 16777215).toString(16)
    } else if(pixelDarken){
        this.style.backgroundColor=pSBC(-0.2, this.style.backgroundColor);

    } else if(pixelLighten){
        this.style.backgroundColor= pSBC(0.2, this.style.backgroundColor);
    } else {
        this.style.backgroundColor= pixelColor;
    }
    
}

function setColor(){
    pixelRainbow=false;
    pixelDarken = false;
    pixelLighten = false;
    switch (this.id){
        case 'colorPalette':
            pixelColor=this.value;
            break;
        case 'rainbowColor':
            pixelRainbow = true;
            break;
        case 'darkening':
            pixelDarken = true;
            break;
        case 'lightening':
            pixelLighten = true;
            break;
        case 'eraser':
            pixelColor = 'aliceblue';
            break;
        default : pixelColor = 'black';
    }
    
}

function clearTable(){
    drawingBoard.textContent='';
    buildGrid();
}
/* To Initialize all the Listeners of the Buttons */
function initialize(){
    buildGrid();
    chosenGridSize.addEventListener('change',getGridSize);
    clear.addEventListener('click',clearTable);
    eraser.addEventListener('click',setColor);
    lightening.addEventListener('click',setColor);
    darkening.addEventListener('click',setColor);
    chosenColor.addEventListener('change',setColor);
    chosenRainbow.addEventListener('click',setColor);
}

/**Darkening Function Borrowed from PimpTrizkit/PJs  */
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}
