
function spin() {
  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
  const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

  document.getElementById('slot').innerText = slot1 + slot2 + slot3;

  if (slot1 === slot2 && slot2 === slot3) {
    document.getElementById('result').innerText = '🎉 You Win!';
  } else {
    document.getElementById('result').innerText = '😢 Try Again!';
  }
}
