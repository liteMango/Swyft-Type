
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } 
//   from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyD43T2lRl4EIfUsta6yFuBvofjixpoMykk",
//   authDomain: "lets-try-again-6918a.firebaseapp.com",
//   projectId: "lets-try-again-6918a",
//   storageBucket: "lets-try-again-6918a.appspot.com",
//   messagingSenderId: "7902851770",
//   appId: "1:7902851770:web:750f6ac552080d31154883",
//   measurementId: "G-0EBQR9MB5L"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Save score function
// async function saveScore(playerName, wpm) {
//   try {
//     await addDoc(collection(db, "leaderboard"), {
//       name: playerName,
//       wpm: wpm,
//       timestamp: Date.now()
//     });
//     console.log("Score saved!");
//     loadLeaderboard();
//   } catch (e) {
//     console.error("Error saving score: ", e);
//   }
// }

// // Load leaderboard
// async function loadLeaderboard() {
//   const q = query(collection(db, "leaderboard"), orderBy("wpm", "desc"), limit(10));
//   const snapshot = await getDocs(q);
//   const container = document.getElementById("leaderboard");
//   if (container) {
//     container.innerHTML = snapshot.docs
//       .map((doc, i) => `<p>${i+1}. ${doc.data().name} — ${doc.data().wpm} WPM</p>`)
//       .join("");
//   }
// }

// Button test
// document.getElementById("testBtn").addEventListener("click", () => {
//   const testName = "Tester";
//   const testWPM = Math.floor(Math.random() * 100);
//   saveScore(testName, testWPM);
// });






import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } 
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

export async function saveScore(playerName, wpm) {
  try {
    await addDoc(collection(db, "leaderboard"), {
      name: playerName,
      wpm: wpm,
      timestamp: Date.now()
    });
    console.log("Score saved!");
  } catch (e) {
    console.error("Error saving score: ", e);
  }
}

// export async function loadLeaderboard() {
//   const q = query(collection(db, "leaderboard"), orderBy("wpm", "desc"), limit(10));
//   const snapshot = await getDocs(q);
//   const container = document.getElementById("leaderboard");
//   if (container) {
//     container.innerHTML = snapshot.docs
//       .map((doc, i) => `<p>${i+1}. ${doc.data().name} — ${doc.data().wpm} WPM</p>`)
//       .join("");
//   }
// }


export async function loadLeaderboard() {
  const q = query(collection(db, "leaderboard"), orderBy("wpm", "desc"), limit(10));
  const snapshot = await getDocs(q);

  const tbody = document.querySelector("#leaderboard tbody");
  if (!tbody) return; // safety check

  tbody.innerHTML = ""; // clear old rows

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



