
// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCwBu8fgH4v5bh6RX0c5HTuHEgSem6masc",
  authDomain: "test-chatbox-ef60b.firebaseapp.com",
  databaseURL: "https://test-chatbox-ef60b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-chatbox-ef60b",
  storageBucket: "test-chatbox-ef60b.appspot.com",
  messagingSenderId: "246995010589",
  appId: "1:246995010589:web:19ec20fbda72dfba56f2f4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("messages");

const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

sendBtn.addEventListener("click", () => {
  const user = usernameInput.value.trim();
  const message = messageInput.value.trim();
  if (user && message) {
    db.push({
      user,
      message,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
});

db.on("child_added", (snapshot) => {
  const { user, message } = snapshot.val();
  const msgElement = document.createElement("p");
  msgElement.textContent = `${user}: ${message}`;
  messagesDiv.appendChild(msgElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
