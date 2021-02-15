'use strict';

function Animals(image_url, title, description, keywords, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keywords = keywords;
    this.horns = horns;
}

Animals.prototype.render = function () {
    let animalsTemp = $('.photo-template').clone();
    animalsTemp.find('h2').text(this.title);
    animalsTemp.find('img').attr('src', this.image_url);
    animalsTemp.find('p').text(this.description);
    animalsTemp.removeClass('photo-template');
    $('main').append(animalsTemp);

}


Animals.readJson = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('../data/page-1.json', ajaxSettings)
    .then(data => {
        data.forEach(element => {
            let newAnimals = new Animals(
                element.image_url,
                element.title,
                element.description,
                element.keywords, element.horns);
            newAnimals.render();
        });
    });
}

$(() => Animals.readJson());



