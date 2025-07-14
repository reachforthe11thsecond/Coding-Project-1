const form = document.getElementById("contactForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const comments = document.getElementById("comments");
const feedbackDisplay = document.getElementById("feedback-display");


const charCount = document.createElement("p");
comments.insertAdjacentElement("afterend", charCount);


form.addEventListener("input", (e) => {
  e.stopPropagation(); 

  const target = e.target;

  if (target.id === "comments") {
    charCount.textContent = `Character count: ${target.value.length}`;
  }

  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    target.style.borderColor = target.value.trim() === "" ? "red" : "";
  }
});


form.addEventListener("mouseover", (e) => {
  e.stopPropagation();

  const target = e.target;
  if (target.matches("input, textarea")) {
    target.title = getTooltipText(target.id); 
  }
});


function getTooltipText(id) {
  switch (id) {
    case "username": return "Enter your full name.";
    case "email": return "Enter a valid email address.";
    case "comments": return "Write your message here.";
    default: return "";
  }
}


form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  let valid = true;
  let message = "";

  if (username.value.trim() === "") {
    valid = false;
    message += "Name is required.\n";
  }
  if (email.value.trim() === "") {
    valid = false;
    message += "Email is required.\n";
  }
  if (comments.value.trim() === "") {
    valid = false;
    message += "Comments are required.\n";
  }

  if (!valid) {
    alert(message);
    return;
  }


  const entry = document.createElement("div");
  entry.className = "feedback-entry";
  entry.innerHTML = `
    <strong>${username.value}</strong> (${email.value})<br>
    <em>${comments.value}</em>
    <hr>
  `;
  feedbackDisplay.appendChild(entry);


  form.reset();
  charCount.textContent = "";
});


document.body.addEventListener("click", (e) => {
  console.log("Background clicked:", e.target.tagName);
});

