'use strict';

var keywards=[];
var animalsArray=[];

var uniqueNames=["selectAll","narwhal","rhino","unicorn","unilego","triceratops","markhor","mouflon","addax","chameleon","lizard","dragon"];

function Animals(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    
    animalsArray.push(this);
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

    $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
        data.forEach(element => {
            let newAnimals = new Animals(
                element.image_url,
                element.title,
                element.description,
                element.keyword, element.horns);
            newAnimals.render();
            keywards.push(element.keyword);
        });

    });
}

$(() => Animals.readJson());


selectList();
options();

function selectList() {
    
    for (let index = 0; index < uniqueNames.length; index++) {
        var select=$('.temp-select').clone();
        select.attr('value', uniqueNames[index]);
        select.text(uniqueNames[index]);
        select.removeClass('temp-select');
        $('select').append(select);
    }
}

function options() {
    $('#select').on('change',function() {
        $('main').children().not(':first-child').remove();
        for (let index = 0; index < animalsArray.length; index++) {
            if (this.value ===animalsArray[index].keyword) {
                animalsArray[index].render();
            }
            
        }

        for (let i = 0; i < animalsArray.length; i++) {
            if (this.value==='selectAll') {
                    animalsArray[i].render();
            }
            
        }
    })
    
}




 



