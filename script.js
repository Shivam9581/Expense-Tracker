var entries = [];
function addEntry() {

    var type = document.getElementById("typeSelect").value;
    var description = document.getElementById("descriptionInput").value;
    var amountText = document.getElementById("amountInput").value;
    var category = document.getElementById("categorySelect").value;

    var amount = parseFloat(amountText);

   if (description.trim() === "") {
      alert("Please enter a description.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    var newEntry = {
      type: type,
      description: description,
      amount: amount,
      category: category
    };

    entries.push(newEntry);

    document.getElementById("descriptionInput").value = "";
    document.getElementById("amountInput").value = "";

    updateDisplay();
  }


  function deleteEntry(indexToDelete) {

     entries.splice(indexToDelete, 1);

    updateDisplay();
  }


  function calculateTotals() {

    var totalIncome = 0;
    var totalExpense = 0;

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      if (entry.type === "income") {
        totalIncome = totalIncome + entry.amount;
      } else {
        totalExpense = totalExpense + entry.amount;
      }
    }

    return {
      income: totalIncome,
      expense: totalExpense
    };
  }


  
  function formatMoney(number) {
    return "$" + number.toFixed(2);
  }


 function updateDisplay() {

    var totals = calculateTotals();
    var balance = totals.income - totals.expense;

    document.getElementById("totalIncomeText").textContent = formatMoney(totals.income);
    document.getElementById("totalExpenseText").textContent = formatMoney(totals.expense);
    document.getElementById("balanceText").textContent = formatMoney(balance);

    var tableBody = document.getElementById("entriesTableBody");
    var emptyMessage = document.getElementById("emptyMessage");

    tableBody.innerHTML = "";

    if (entries.length === 0) {
      emptyMessage.style.display = "block";
      return;
    } else {
      emptyMessage.style.display = "none";
    }

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      var row = document.createElement("tr");

      var sign = "+";
      var amountClass = "amount-income";
      if (entry.type === "expense") {
        sign = "-";
        amountClass = "amount-expense";
      }

      row.innerHTML =
        "<td>" + entry.description + "</td>" +
        "<td>" + entry.category + "</td>" +
        "<td class='" + amountClass + "'>" + sign + formatMoney(entry.amount) + "</td>" +
        "<td><button class='delete-button' onclick='deleteEntry(" + i + ")'>Delete</button></td>";

      tableBody.appendChild(row);
    }
  }

updateDisplay();