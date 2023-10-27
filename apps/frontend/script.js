/** Styling the BarSlide Script */
const slideValue=document.querySelector("span");
const inputSlider= document.querySelector("#gridSize");
inputSlider.oninput = (()=>{
    let value = inputSlider.value;
    slideValue.textContent = value;
    slideValue.style.left = (value) + '%';

})