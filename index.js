$.getJSON('resources/albums.json', (data) => {
    for (var key in data) {
        const div = document.createElement('div');
        div.className = 'album';

        const img = document.createElement('img');
        const info = data[key].info;
        img.className = 'cover';
        img.src = 'resources/albums/' + key + '/cover.jpg';
        div.appendChild(img);

        $('.inner').append(div);
    }
});