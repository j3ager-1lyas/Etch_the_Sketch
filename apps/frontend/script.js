/** Styling the BarSlide Script */
const slideValue=document.querySelector("span");
const inputSlider= document.querySelector("#gridSize");
slideValue.style.left = (16) + '%';
inputSlider.oninput = (()=>{
    let value = inputSlider.value;
    slideValue.textContent = value;
    slideValue.style.left = (value) + '%';
})

