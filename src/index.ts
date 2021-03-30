$.getJSON('resources/albums.json', (data) => {
    for (var key in data) {
        const div = document.createElement('div');
        div.className = 'album';
        
        const img = document.createElement('img');
        const text = document.createElement('div');
        const info = data[key].info;
        img.className = 'cover';
        img.src = 'resources/albums/' + key + '/cover.jpg';
        text.className = 'text';
        text.innerText = info;
        text.hidden = true;
        $(div).append([img, text]);
        $([div, img, text]).addClass('inactive');

        $(div).on('click', (_ev) => {
            if ($(div).hasClass('inactive')) {
                $(text).on('animationend', (_animShowEv) => {
                    $(document).on('click', (_docEv) => {
                        $([div, img, text]).removeClass('active').addClass('inactive');

                        $(text).on('animationend', (_animHideEv) => {
                            $(text).hide();
                            $(text).off('animationend');
                        });

                        $(document).off('click');
                    });

                    $(text).off('animationend');
                });

                $([div, img, text]).removeClass('inactive').addClass('active');
                $(text).show();
            }
        });

        $('.inner').append(div);
    }
});