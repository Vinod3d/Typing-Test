let typingText = document.querySelector(".typing-text p");
let inpField = document.querySelector(".wrapper .input-field");
let timeTag = document.querySelector(".time span b")
let mistakeTag = document.querySelector(".mistake span");
let wpmTag = document.querySelector(".wpm span");
let cpmTag = document.querySelector(".cpm span");
let tryAgainBtn = document.querySelector("button");


let timer, maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

function randomParagraph(){
    //getting random number and it'll always less than the paragraph length
    let randIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = "";
    // console.log(randIndex);
    // console.log(paragraph);

    //getting random item from the paragraph array, splitting all character
    //of it, adding each character inside span and adding this span inside p
    paragraph[randIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;

        // console.log(spanTag);
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", ()=> inpField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
    
        //if user hasn't enterd any character or pressed backspace
        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        }else{
    
            // console.log(typedChar);
            if(characters[charIndex].innerText === typedChar){
                // console.log("Correct");
                characters[charIndex].classList.add("correct");
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active")); //Remove previous active class
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60 );
        //to get WPM, first substracting total mistakes from the tatal typed characters then dividing it by 5 and again dividing this output by subtacting timeLeft from maxTime and last multiplying the output with 60.5 means assuming 5 characters = 1 word
    
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        // if wpm value is 0, empty, or infinity then setting it's value to 0
    
    
    
    
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    }else{
        inpField.value = "";
        clearInterval(timer);
    }
} 

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
        clearInterval(timer);
    }
}

function resetGame(){
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}
randomParagraph();
inpField.addEventListener("input", initTyping); 
tryAgainBtn.addEventListener("click", resetGame); 