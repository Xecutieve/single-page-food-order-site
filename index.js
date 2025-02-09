import { menuArray } from "/data.js"

const menuItemsContainer = document.getElementById("menu-items-container")
const basketList = document.getElementById("total-basket")

let basket = []
let totalPrice = 0

document.addEventListener("click", (e) => {
    let itemID = e.target.id

    // Add item to basket based on button click
    if (itemID === "0" || itemID === "1" || itemID === "2") {
        basket.push(Number(itemID))// Convert to number before pushing
        totalPrice += menuArray[Number(itemID)].price  
        renderBasket()
    }
    
    if(itemID === "complete-order"){
        document.getElementById("payment-info-modal").style.display = "flex"
    }
    if(itemID === "pay"){
        e.preventDefault()
        document.getElementById("payment-info-modal").style.display = "none"
        document.getElementById("basket").style.display = "none"
        document.getElementById("menu-items-container").innerHTML = `
                <div id="thanks-message">
                    <p>Thanks, ${document.getElementById("name").value}! Your order is on its way!</p>
                </div>`
    }
    
})




// Render menu items
function getMenuItems() {
    let html = ""
    menuArray.forEach((item) => {
        html += `
            <div class="menu-item">
                <h2>${item.emoji}</h2>
                <div class="price-desc-button-container">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.ingredients}</p>
                        <h3>$${item.price}</h3>
                    </div>
                    <button class="add-button" id="${item.id}">+</button>
                </div> 
            </div>
            <hr>
        `
    })

    return html
}

// Render basket with remove buttons
function renderBasket() {
    document.getElementById("basket").style.display = "block"
    document.getElementById("basket").style.display = "block"
    let basketHTML = ""
    basket.forEach((item) => {
        menuArray.forEach((menuArray) => {
            if (item === menuArray.id) {
                basketHTML += `
                    <div class="basket-item">
                        <div class="title-removebtn-container">
                            <h3>${menuArray.name}</h3>
                            <button class="remove-btn" id="remove-btn-${menuArray.id}">remove</button>
                        </div>
                        <h4>$${menuArray.price}</h4>
                    </div>
                `
                document.getElementById("total-basket-price").innerText = "$" + totalPrice
            }
        })
    })

    basketList.innerHTML = basketHTML

    // Add event listeners to the remove buttons after rendering
    document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            const itemID = Number(e.target.id.replace("remove-btn-", ""))
            const index = basket.indexOf(itemID)// Get the index of the first occurrence
            totalPrice -= menuArray[itemID].price 
            if (index !== -1) {
                basket.splice(index, 1) // Remove only the first occurrence of the item
                renderBasket() // Re-render the basket
            }
            if(totalPrice === 0){
                document.getElementById("basket").style.display = "none"
            }
        })
    })
}

// Initial render of menu items
menuItemsContainer.innerHTML = getMenuItems()
