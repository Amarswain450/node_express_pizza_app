const addToBtn = document.querySelectorAll('.add-to-btn');
const cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza){
    fetch('/update-cart', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(pizza)
    }).then((res) => {
        // cartCounter.innerText = res.data.totalQty
        alert('Item added')
        console.log(res);
        return res.json();
    }).then((output) => {
        cartCounter.innerText = totalQty
        console.log(output);
    }).catch((err) => {
        console.log(err);
    })
}

addToBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    });
});


const successAlert = document.querySelector('#suucess__alert');
setTimeout(() => {
    successAlert.remove();
}, 2000);