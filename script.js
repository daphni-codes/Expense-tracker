const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

const localStorageTransactions =
    JSON.parse(localStorage.getItem("transactions")) || [];


let transactions = localStorageTransactions;
//Add Transactions
function addTransaction(e) {
    e.preventDefault();

if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter both text and amount");
    return;
    } else {
      const type = document.querySelector('input[name="type"]:checked').value;

let transactionAmount = +amount.value;

if (type === "expense") {
    transactionAmount = -Math.abs(transactionAmount);
} else {
    transactionAmount = Math.abs(transactionAmount);
}

const transaction = {
    id: generateId(),
    text: text.value,
    amount: transactionAmount,
    category: category.value,
};
         transactions.push(transaction);

         console.log(transactions);

        addTransactionToDOM(transaction);

        updateLocalStorage();

        updateValues();

        text.value = "";
        amount.value= "";

    }
}

//Add Transactions TO The DOM
function addTransactionToDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
    <div>
        <strong>${transaction.text}</strong>
        <small>${transaction.category}</small>
    </div>

    <span>${sign}₹${Math.abs(transaction.amount)}</span>

    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
`;
    list.appendChild(item);
}

//Update the balance, income and expenses
function updateValues () {
    const amounts = transactions.map((transaction) => transaction.amount)
    const total = amounts
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);
    const income = amounts
            .filter((item) => item > 0)
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);
    const expense = (
      amounts
           .filter((item) => item < 0)
           .reduce((acc, item) => (acc += item), 0) * -1
     ).toFixed(2);

    balance.innerText = `₹${total}`;
    money_plus.innerText = `+₹${income}`
    money_minus.innerText =`-₹${expense}`
}
    

//Delete The Transaction by ID

function removeTransaction(id) {
    transactions = transactions.filter(
        (transaction) => transaction.id !== id
    );

    updateLocalStorage();

    init();
}

    
//Update The Local Storage
function updateLocalStorage () {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize the App
function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionToDOM);

    updateValues();
}

init();

// Generate a Random ID
function generateId() {
    return Math.floor(Math.random() * 100000000);

}
form.addEventListener('submit', addTransaction)

