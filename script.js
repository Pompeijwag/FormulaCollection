const formCardTemplate = document.querySelector("[data-form-template]")
const formCardContainer = document.querySelector("[data-form-cards-container]")
const formTagsContainer = document.querySelector("[data-form-tags-container]")
const searchInput = document.querySelector("[data-search]")
const searchTagInput = document.querySelector("[data-search-tag]")
const formCard = document.getElementsByClassName('card')
const resultBox = document.querySelector("[result-box]")

let forms = []
let availableTags = []

searchTagInput.onkeyup = function(){
    let result = [];
    let input = searchTagInput.value;
    if(input.length) {
        result = availableTags.filter((keyword)=>{
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result)
    }
    display(result);

    if(!result.length){
        resultBox.innerHTML = '';
    }
}

function display(result){
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });
    resultBox.innerHTML = "<ul>" + content.join('') +  "</ul>"
}

searchInput.addEventListener("input", e => {
   update();
})

function update(){
    const value = searchInput.value.toLowerCase()
    forms.forEach(form => {
        const isVisible = form.title.toLowerCase().includes(value) || form.body.toLowerCase().includes(value)
        form.element.classList.toggle("hide", !isVisible)
    })
    forms.forEach(form => {
        if(form.element.classList.contains("pinned")){
            form.element.classList.remove("hide")
            
        }
    })
}

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        forms = data.map(form => {
            const card = formCardTemplate.content.cloneNode(true).children[0]
            const title = card.querySelector("[data-title]")
            const formula = card.querySelector("[data-formula]")
            const body = card.querySelector("[data-body]")
            console.log(form)
            title.textContent = form.title
            formula.textContent = form.formula
            body.textContent = form.body
            formCardContainer.append(card)
            form.variables.forEach(addVariables)
            if (MathJax) MathJax.typesetPromise();
            return {title: form.title, formula: form.formula, body: form.body, variables: form.variables, element: card}
        });
        
    })


formCardContainer.addEventListener("click", doSomething)

function addVariables(item){
    if(!availableTags.includes(item)){
        availableTags.push(item);
    }
}
function doSomething(){
    forms.forEach(form => {
        const hovered = form.element.matches(':hover')
        if(hovered){
            form.element.classList.toggle("pinned")
        }
    })
}
    
function selectInput(list){
    searchTagInput.value = list.innerHTML;
    resultBox.innerHTML = '';
}