$.getJSON('resources/albums.json', (data) => {
    for (var key in data) {
        const div = document.createElement('div');
        div.className = 'album';
        
        const img = document.createElement('img');
        const text = document.createElement('div');
        const path = 'resources/albums/' + key;
        const details = data[key];
        const detailsHTML = details.artist + ' - <b><i>' + details.album + '</b></i> - ' + details.year;
        $.get(path + '/info.html', (data) => {
            text.innerHTML = detailsHTML + '<br><br>' + data;
        });

        img.className = 'cover';
        img.src = path + '/cover.jpg';
        text.className = 'text';
        
        text.hidden = true;
        $(div).append([img, text]);
        $([div, img, text]).addClass('inactive');

        $(div).on('click', (_ev) => {
            if ($(div).hasClass('inactive')) {
                $(text).on('animationend', (_animShowEv) => {
                    $(document).on('click', (_docEv) => {
                        $([div, img, text]).removeClass('active').addClass('inactive');

                        const blur = $('.blur');
                        $('.inner').append(blur.children());
                        blur.remove();

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

                const inner = $('.inner');
                const blur = document.createElement('div');
                var inactiveChildren: Element[] = [];
                inner[0].childNodes.forEach((node, _i, _list) => {
                    if (!$(node).hasClass('active')) {
                        inactiveChildren.push(node as Element);
                    }
                });

                blur.className = 'blur';
                blur.setAttribute('style', inner[0].style.cssText);
                blur.append(...inactiveChildren);
                $(blur).insertBefore(inner.first());
            }
        });

        $('.inner').append(div);
    }
});