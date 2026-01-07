const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  saveTransactions();

  text.value = "";
  amount.value = "";

  render();
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  render();
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((acc, val) => acc + val, 0);
  const incomeTotal = amounts
    .filter(val => val > 0)
    .reduce((acc, val) => acc + val, 0);
  const expenseTotal = amounts
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val, 0);

  balance.textContent = `$${total.toFixed(2)}`;
  income.textContent = `$${incomeTotal.toFixed(2)}`;
  expense.textContent = `$${Math.abs(expenseTotal).toFixed(2)}`;
}

function renderTransactions() {
  list.innerHTML = "";

  transactions.forEach(t => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
      ${t.text}
      <span>${t.amount > 0 ? "+" : ""}${t.amount}</span>
      <button onclick="deleteTransaction(${t.id})">x</button>
    `;

    list.appendChild(li);
  });
}

function render() {
  renderTransactions();
  updateValues();
}

form.addEventListener("submit", addTransaction);
render();
