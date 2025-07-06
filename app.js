
const firebaseConfig = {
  apiKey: "AIzaSyD9Ba6AOEPsPV3me_csm2kdug53Yz5nU2A",
  authDomain: "casino-99-edd37.firebaseapp.com",
  projectId: "casino-99-edd37",
  storageBucket: "casino-99-edd37.appspot.com",
  messagingSenderId: "802701869556",
  appId: "1:802701869556:web:4a3bd72e7e845dd9098f2a"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const adminEmail = "rafsanhridoy8236@gmail.com";

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      const photo = user.photoURL;
      localStorage.setItem("casino_balance_" + email, localStorage.getItem("casino_balance_" + email) || "৳0.00");

      document.getElementById("user-pic").src = photo;
      document.getElementById("user-name").innerText = name;
      document.getElementById("balance").innerText = localStorage.getItem("casino_balance_" + email);
      document.getElementById("user-info").style.display = "flex";
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("game-section").style.display = "block";

      if (email === adminEmail) {
        document.getElementById("admin-panel").style.display = "block";
      }
    })
    .catch(error => {
      alert("Login Failed: " + error.message);
    });
}

function logout() {
  auth.signOut().then(() => location.reload());
}

function handleDeposit() {
  const amount = prompt("কত টাকা ডিপোজিট করবেন?");
  if (amount) {
    const email = auth.currentUser.email;
    let newBalance = parseFloat(amount) + parseFloat((localStorage.getItem("casino_balance_" + email) || "৳0").replace("৳", ""));
    localStorage.setItem("casino_balance_" + email, `৳${newBalance.toFixed(2)}`);
    document.getElementById("balance").innerText = `৳${newBalance.toFixed(2)}`;
  }
}

function handleWithdraw() {
  const amount = prompt("কত টাকা উত্তোলন করবেন?");
  if (amount) {
    const email = auth.currentUser.email;
    let current = parseFloat((localStorage.getItem("casino_balance_" + email) || "৳0").replace("৳", ""));
    let withdraw = parseFloat(amount);
    if (withdraw <= current) {
      let newBalance = current - withdraw;
      localStorage.setItem("casino_balance_" + email, `৳${newBalance.toFixed(2)}`);
      document.getElementById("balance").innerText = `৳${newBalance.toFixed(2)}`;
    } else {
      alert("পর্যাপ্ত টাকা নেই!");
    }
  }
}

function addBalance() {
  const targetEmail = document.getElementById("target-email").value;
  const amount = parseFloat(document.getElementById("add-amount").value);
  if (targetEmail && amount) {
    let current = parseFloat((localStorage.getItem("casino_balance_" + targetEmail) || "৳0").replace("৳", ""));
    let newBalance = current + amount;
    localStorage.setItem("casino_balance_" + targetEmail, `৳${newBalance.toFixed(2)}`);
    alert("টাকা যোগ হয়েছে!");
  } else {
    alert("সঠিক তথ্য দিন!");
  }
}
