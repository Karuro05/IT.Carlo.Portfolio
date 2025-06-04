// Firebase config and realtime chat logic using compat SDK
const firebaseConfig = {
  apiKey: "AIzaSyCwBu8fgH4v5bh6RX0c5HTuHEgSem6masc",
  authDomain: "test-chatbox-ef60b.firebaseapp.com",
  databaseURL: "https://test-chatbox-ef60b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-chatbox-ef60b",
  storageBucket: "test-chatbox-ef60b.appspot.com",
  messagingSenderId: "246995010589",
  appId: "1:246995010589:web:19ec20fbda72dfba56f2f4",
  measurementId: "G-MGFN815WL4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const messagesRef = db.ref("messages");

const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

sendBtn.addEventListener("click", () => {
  const user = usernameInput.value.trim().substring(0, 30);  // max 30 chars
  const message = messageInput.value.trim().substring(0, 300);  // max 300 chars

  if (!user || !message) return;

  const safeUser = user.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  messagesRef.push({
    user: safeUser,
    message: safeMessage,
    timestamp: Date.now()
  });
});

messagesRef.on("child_added", (snapshot) => {
  const { user, message } = snapshot.val();
  const msgElement = document.createElement("p");
  msgElement.textContent = `${user}: ${message}`;
  messagesDiv.appendChild(msgElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
