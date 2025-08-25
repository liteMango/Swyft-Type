import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD43T2lRl4EIfUsta6yFuBvofjixpoMykk",
  authDomain: "lets-try-again-6918a.firebaseapp.com",
  projectId: "lets-try-again-6918a",
  storageBucket: "lets-try-again-6918a.appspot.com",
  messagingSenderId: "7902851770",
  appId: "1:7902851770:web:750f6ac552080d31154883",
  measurementId: "G-0EBQR9MB5L"
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
