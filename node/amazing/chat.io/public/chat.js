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

  const form = document.getElementById('dj')
  const results = document.getElementById('results')
  form.style.display = 'block'
  form.onsubmit = function () {
    results.innerHTML = ''
    socket.emit('search', document.getElementById('s').value, function (songs) {
      songs.forEach(song => {
        const result = document.createElement('li')
        result.innerHTML = `${song.ArtistName} - <b>${song.SongName}</b> `
        const a = document.createElement('a')
        a.href = '#'
        a.innerHTML = 'Select'
        a.onclick = function () {
          socket.emit('song', song)
          play(song)
          return false
        }
        result.appendChild(a)
        results.appendChild(result)
      })
    })
    return false
  }

  socket.on('elected', function () {
    form.className = 'isDJ'
  })

  const playing = document.getElementById('playing')

  function play(song) {
    if (!song) return
    playing.innerHTML = '<hr><b>Now Playing:</b>' +
      song.ArtistName + ' ' + song.SongName + '<br>'
    const iframe = document.createElement('iframe')
    iframe.frameBorder = 0
    iframe.src = song.Url
    playing.appendChild(iframe)
  }

  socket.on('song', play)
}