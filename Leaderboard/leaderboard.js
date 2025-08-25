import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB35nG2D5eKnf37St1dqqSxp4HxenqSlSw",
  authDomain: "swyfte-type.firebaseapp.com",
  projectId: "swyfte-type",
  storageBucket: "swyfte-type.firebasestorage.app",
  messagingSenderId: "1044279334556",
  appId: "1:1044279334556:web:08800580ae1e7f38377f59",
  measurementId: "G-SGLJPPPW0B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔁 Function to load and display the leaderboard
async function loadLeaderboard() {
  const leaderboardBody = document.querySelector("#leaderboard tbody");
  leaderboardBody.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "users"));
  const players = [];

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.wpm !== undefined && data.displayName) {
      players.push({ id: docSnap.id, ...data });
    }
  });

  // Sort by WPM descending
  players.sort((a, b) => b.wpm - a.wpm);

  // Display in table
  players.forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${player.displayName}</td>
      <td>${player.wpm}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}

// 🆕 Optional: Add a new test player manually
document.getElementById("entryForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const score = parseInt(document.getElementById("scoreInput").value);

  if (name && !isNaN(score)) {
    await addDoc(collection(db, "users"), {
      displayName: name,
      wpm: score,
    });
    await loadLeaderboard(); // Refresh
  }

  e.target.reset();
});

// 🧹 Optional: Reset leaderboard (delete all entries)
document.getElementById("resetBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const querySnapshot = await getDocs(collection(db, "users"));
  for (const docSnap of querySnapshot.docs) {
    await deleteDoc(doc(db, "users", docSnap.id));
  }
  await loadLeaderboard();
});

// 🚀 Initial load
loadLeaderboard();

