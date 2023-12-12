// Entrance Animation handler

const animateitems = Array.from(document.querySelectorAll(".animate-div"));
const btnOrderNow = document.getElementById("btn-order-now");
const placeOrderView = document.getElementById("place-order-view");

btnOrderNow.addEventListener("click",()=>{
    btnOrderNow.classList.add('animate__animated');
    animateitems.forEach(addAnimations);
    setTimeout(() => {
        animateitems.forEach(removeElement);
    }, 4000);
    document.body.style.overflow = 'hidden';
    placeOrderView.classList.remove('d-none');
});

function addAnimations(element){
    setTimeout(() => {
        element.classList.add('animate__animated');
    }, 500);
}

function removeElement(element){
    element.classList.add('d-none');
}

