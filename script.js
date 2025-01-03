const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
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
        });
        
    })
     