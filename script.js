let currentBalance = 0;

// --- STEP 1: INITIALIZE APP ---
function initializeApp() {
    const startInput = document.getElementById("startBalanceInput");
    const val = parseInt(startInput.value);

    if (isNaN(val)) {
        currentBalance = 0;
    } else {
        currentBalance = val;
    }

    document.getElementById("balanceDisplay").innerText = currentBalance;

    document.getElementById("setupSection").classList.add("hidden");
    document.getElementById("appSection").classList.remove("hidden");
    
    // Auto-focus on the description box so they can type immediately
    document.getElementById("descInput").focus();
}

// --- KEYBOARD SHORTCUTS ---

// 1. Enter key on Start Screen -> Runs initializeApp
document.getElementById("startBalanceInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        initializeApp();
    }
});

// 2. Enter key on Description -> Jumps to Amount (Your Request)
document.getElementById("descInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // .focus() moves the typing cursor to the specified box
        document.getElementById("amountInput").focus();
    }
});

// 3. Enter key on Amount -> Triggers "Debit" automatically (Optional Bonus)
document.getElementById("amountInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTransaction('expense'); // Defaulting to expense for speed
    }
});


// --- STEP 2: ADD TRANSACTION ---
function addTransaction(type) {
    const descInput = document.getElementById("descInput");
    const amountInput = document.getElementById("amountInput");
    const errorMsg = document.getElementById("errorMsg");
    const list = document.getElementById("transactionList");

    errorMsg.innerText = "";
    errorMsg.classList.remove("shake");

    const desc = descInput.value;
    const amount = parseInt(amountInput.value);

    if (desc === "" || isNaN(amount) || amount <= 0) {
        errorMsg.innerText = "Please enter valid details!";
        void errorMsg.offsetWidth; 
        errorMsg.classList.add("shake");
        return;
    }

    if (type === 'expense' && amount > currentBalance) {
        errorMsg.innerText = "Insufficient Funds!";
        void errorMsg.offsetWidth; 
        errorMsg.classList.add("shake");
        return;
    }

    if (type === 'income') {
        currentBalance += amount;
    } else {
        currentBalance -= amount;
    }
    
    document.getElementById("balanceDisplay").innerText = currentBalance;

    const li = document.createElement("li");
    if (type === 'income') {
        li.classList.add("plus");
        li.innerHTML = `${desc} <span>+ ₹${amount}</span>`;
    } else {
        li.classList.add("minus");
        li.innerHTML = `${desc} <span>- ₹${amount}</span>`;
    }
    list.appendChild(li);

    descInput.value = "";
    amountInput.value = "";
    
    // Move cursor back to description for the next item
    descInput.focus();
}