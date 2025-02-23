function handleDeposit() {
    var amount = getConvertedValue("deposit-input", "value");
    if (amount <= 0) return alert("Please enter a valid deposit amount!");
    
    updateAmount("deposit-amount", amount);
    updateAmount("total-amount", amount);
    addTransaction("Deposit", amount);
    document.getElementById("deposit-input").value = "";
}

function handleWithdraw() {
    var amount = getConvertedValue("withdraw-input", "value");
    var total = getConvertedValue("total-amount", "innerText");
    
    if (amount <= 0) return alert("Please enter a valid withdrawal amount!");
    if (amount > total) return alert("Insufficient balance!");
    
    updateAmount("withdraw-amount", amount);
    updateAmount("total-amount", -amount);
    addTransaction("Withdraw", amount);
    document.getElementById("withdraw-input").value = "";
}

function calculateInterest() {
    var rate = getConvertedValue("interest-rate", "value");
    var total = getConvertedValue("total-amount", "innerText");
    
    if (rate <= 0) return alert("Enter a valid interest rate!");
    
    var interest = total * (rate / 100);
    updateAmount("total-amount", interest);
    addTransaction("Interest Added", interest);
    alert(`Interest of ${interest.toFixed(2)} added!`);
}

function resetAmounts() {
    setInnerText("deposit-amount", 0);
    setInnerText("withdraw-amount", 0);
    setInnerText("total-amount", 0);
    document.getElementById("transaction-list").innerHTML = "";
}

function getConvertedValue(id, element) {
    var value = element === "innerText" ? document.getElementById(id).innerText : document.getElementById(id).value;
    return parseFloat(value) || 0;
}

function setInnerText(id, value) {
    document.getElementById(id).innerText = value.toFixed(2);
}

function updateAmount(id, amount) {
    var current = getConvertedValue(id, "innerText");
    setInnerText(id, current + amount);
}

function addTransaction(type, amount) {
    var list = document.getElementById("transaction-list");
    var item = document.createElement("li");
    item.textContent = `${type}: $${amount.toFixed(2)} - ${new Date().toLocaleString()}`;
    list.prepend(item);
}