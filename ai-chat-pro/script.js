let chatBox = document.getElementById("chatBox");

// Load chat history
window.onload = () => {
  let saved = localStorage.getItem("chat");
  if (saved) {
    chatBox.innerHTML = saved;
  }
};

// Send message
function sendMessage() {
  let input = document.getElementById("userInput");
  let text = input.value.trim();

  if (text === "") return;

  addMessage("You: " + text, "user");

  input.value = "";

  typingEffect();

  setTimeout(() => {
    let reply = botReply(text);
    removeTyping();
    addMessage("Bot: " + reply, "bot");
    saveChat();
  }, 1000);
}

// Add message to chat
function addMessage(message, type) {
  let p = document.createElement("p");
  p.className = type;
  p.innerText = message;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Bot logic
function botReply(text) {
  text = text.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello there! 😊";
  } 
  else if (text.includes("time")) {
    return "Current time is: " + new Date().toLocaleTimeString();
  } 
  else if (text.includes("date")) {
    return "Today is: " + new Date().toDateString();
  } 
  else if (text.includes("joke")) {
    return "Why did the computer get cold? Because it forgot to close its Windows 😂";
  } 
  else {
    return "Hmm... I am still learning 🤖";
  }
}

// Typing effect
function typingEffect() {
  let typing = document.createElement("p");
  typing.id = "typing";
  typing.className = "bot";
  typing.innerText = "Bot is typing...";
  chatBox.appendChild(typing);
}

// Remove typing
function removeTyping() {
  let typing = document.getElementById("typing");
  if (typing) typing.remove();
}

// Save chat
function saveChat() {
  localStorage.setItem("chat", chatBox.innerHTML);
}

// Enter key support
document.getElementById("userInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});