const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible = user.header.toLowerCase().includes(value) || user.body.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const formula = card.querySelector("[data-formula]")
            const body = card.querySelector("[data-body]")
            console.log(user)
            header.textContent = user.header
            formula.textContent = user.formula
            body.textContent = user.body
            userCardContainer.append(card)
            if (MathJax) MathJax.typesetPromise();
            return {header: user.header, formula: user.formula, body: user.body, element: card}
        });
        
    })
     