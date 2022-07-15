// reference
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('message-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = documents.getElementById('username');
const messageContentInput = documents.getElementById('message-content');

let useName = '';

const login = (e) => {
  e.preventDefault();

  if (userNameInput.value == '') {
    alert('Field is empty!');
  } else {
    useName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message message--received');

  if (author === useName) {
    message.classList.add('message--self');
  }

  message.innerHTML = `
    <h3 class='message__author'>${useName === author ? 'You' : author}</h3>
    <div class='message__content'>
        ${content}
    </div>
  `;

  messagesList.appendChild(message);
};

const sendMessage = (e) => {
  e.preventDefault();

  if ((messageContentInput.value = '')) {
    alert('Field is empty!');
  } else {
    useName = messageContentInput.value;
    addMessage(userName, messageContentInput.value);
  }
};

loginForm.addEventListener('submit', (e) => {
  login(e);
});

addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});
