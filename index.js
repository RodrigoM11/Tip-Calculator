const form = document.querySelector("#form");
const $buttons = document.querySelectorAll(".button[type='button']");
const $customInput = document.querySelector("#custom-input");
const $resetBtn = document.querySelector("#reset");
const $tipAmount = document.querySelector('#tip-amount')
const $totalAmount = document.querySelector('#total-amount');





$buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        $buttons.forEach((button) => {
            if (button !== btn) {
                button.classList.remove("active");
            }
        });
        console.log('click')
        btn.classList.add("active");
        $customInput.value = 0
    });
});





$customInput.addEventListener('focus', () => {
    $buttons.forEach(btn => {
        btn.classList.remove("active");
    })
})


$resetBtn.addEventListener("click", () => {
    $tipAmount.innerHTML = '$0.00'
    $totalAmount.innerHTML = '$0.00'
    form.reset();
})




form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const bill = Number(formData.get("bill"));
    const person = Number(formData.get("personNumber"));
    const custom = Number(formData.get("custom"));

    if(!isNaN(bill) && bill > 0 && person > 0) {
        setValues({
            bill,
            person,
            custom,
        });
    }
});





function setValues({ bill, person, custom }) {
    const percent = custom > 0
        ? custom
        : Number(Array.prototype.find.call($buttons, (btn) =>
              btn.classList.contains("active")
          ).value);

          

    console.log (bill, person, percent)
    
    const tip = tipAmount(Number(bill), percent, person);
    const totalBill = total(bill, person, tip);

    // console.log(Number(tip.toFixed(2)))
    // console.log(Number(totalBill.toFixed(2)))

    if($tipAmount.innerHTML && $totalAmount.innerHTML) {
        $tipAmount.innerHTML = '';
        $totalAmount.innerHTML = '';
    }

    $tipAmount.innerHTML = `$${tip}`
    $totalAmount.innerHTML = `$${totalBill}`
}





function tipAmount(amount, percent, person) {
    
    const result = ((amount * percent) / 100) / person
    return Number(result.toFixed(2));
}

function total(bill, person, tip) {
    const result = (bill / person) + tip
    return Number(result.toFixed(2));
}
