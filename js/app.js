'use strict';

var keywards=[];
var animalsArray=[];
var hornsArray=[];

var uniqueNames=["selectAll","narwhal","rhino","unicorn","unilego","triceratops","markhor","mouflon","addax","chameleon","lizard","dragon"];

function Animals(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    
    animalsArray.push(this);
    hornsArray.push(this);
///here we stopped
}

Animals.prototype.render = function () {
    let template= $('#templateId').html();
    let x= Mustache.render(template,this);
    $('#main').append(x);
}

Animals.readJson1 = () => {
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


Animals.readJsonPage2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('./data/page-2.json', ajaxSettings)
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

$(() => Animals.readJson1());

selectList(uniqueNames);


options();
///I changed the select list function 
function selectList(array) {
    
    for (let index = 0; index < array.length; index++) {
        var select=$('.temp-select').clone();
        select.attr('value', array[index]);
        select.text(array[index]);
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


function compare(a,b) {
    return a-b;
}

hornsArray.sort(compare);



$('#pageOne').on('click',function () {
    $('#main').empty();
    Animals.readJson1();
});
console.log(animalsArray);

$('#pageTwo').on('click',function () {
    $('#main').empty();

    Animals.readJsonPage2();
});



/// TODO sort by horns 
/// TODO list 
/// TODO CSS 