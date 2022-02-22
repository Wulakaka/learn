window.onload = function () {
  const socket = io.connect();

  socket.on('connect', () => {
    socket.emit('join', prompt('What is your nickname?'))
    document.getElementById('chat').style.display = 'block'
  })

  socket.on('announcement', msg => {
    const li = document.createElement('li')
    li.className = 'announcement'
    li.innerHTML = msg
    document.getElementById('message').appendChild(li)
  })

  socket.on('text', addMessage)

  const input = document.getElementById('input')
  document.getElementById('form').onsubmit = function () {
    const li = addMessage('me', input.value)
    socket.emit('text', input.value, function (date) {
      li.classList.add('confirmed')
      li.title = date
    })

    input.value = '';
    input.focus()

    return false
  }

  function addMessage(form, text) {
    const li = document.createElement('li')
    li.className = 'message'
    li.innerHTML = '<b>' + form + '</b>: ' + text;
    document.getElementById('message').appendChild(li)
    return li
  }
}