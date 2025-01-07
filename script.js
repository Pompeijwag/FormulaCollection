const formCardTemplate = document.querySelector("[data-form-template]")
const formCardContainer = document.querySelector("[data-form-cards-container]")
const searchInput = document.querySelector("[data-search]")
const formCard = document.getElementsByClassName('card')

let forms = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    forms.forEach(form => {
        const isVisible = form.title.toLowerCase().includes(value) || form.body.toLowerCase().includes(value)
        form.element.classList.toggle("hide", !isVisible)
    })
    forms.forEach(form => {
        if(form.element.classList.contains("pinned")){
            form.element.classList.remove("hide")
            
        }
    })
})

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
            if (MathJax) MathJax.typesetPromise();
            return {title: form.title, formula: form.formula, body: form.body, element: card}
        });
        
    })


formCardContainer.addEventListener("click", doSomething)

function doSomething(){
    forms.forEach(form => {
        const hovered = form.element.matches(':hover')
        if(hovered){
            form.element.classList.toggle("pinned")
        }
    })
}
    