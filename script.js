
let money = localStorage.getItem("money");
if (money === null) {
  money = 100; // starting balance
  localStorage.setItem("money", money);
}
updateMoney();

function spin() {
  if (money < 10) {
    document.getElementById("result").innerText = "❌ Not enough Tk. Please reload page.";
    return;
  }

  const spinSound = document.getElementById("spinSound");
  spinSound.play();

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
  const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

  document.getElementById('slot').innerText = slot1 + slot2 + slot3;

  if (slot1 === slot2 && slot2 === slot3) {
    document.getElementById("result").innerText = "🎉 You Win! +৳50";
    money = parseInt(money) + 50;
    document.getElementById("winSound").play();
  } else {
    document.getElementById("result").innerText = "😢 Try Again! -৳10";
    money = parseInt(money) - 10;
    document.getElementById("loseSound").play();
  }

  localStorage.setItem("money", money);
  updateMoney();
}

function updateMoney() {
  document.getElementById("money").innerText = "৳" + money;
}
