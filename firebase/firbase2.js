import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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

export async function loadLeaderboard() {
  const q = query(collection(db, "leaderboard"), orderBy("wpm", "desc"), limit(10));
  const snapshot = await getDocs(q);
  const tbody = document.querySelector("#leaderboard tbody");

  if (!tbody) return; // safety check

  tbody.innerHTML = ""; // clear existing rows

  if (snapshot.empty) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center">No scores yet.</td></tr>`;
  } else {
    snapshot.docs.forEach((doc, index) => {
      const { name, wpm } = doc.data();
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${name}</td>
        <td>${wpm}</td>
      `;

      tbody.appendChild(row);
    });
  }
}
