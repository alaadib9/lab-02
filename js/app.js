'use strict';

var keywords=[];
var animalsArray=[];


//////////////////Constructor////////////////////////////////


function Animals(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    
    animalsArray.push(this);
    keywords.push(this.keyword);
}


//////////////////Rendering////////////////////////////////

Animals.prototype.render = function () {
    let template= $('#templateId').html();
    let x= Mustache.render(template,this);
    $('#main').append(x);
}


////////////////////////////read JSON//////////////////////


Animals.readJson1 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
        keywords = [];
        animalsArray  = [];
        data.forEach(element => {
            let newAnimals = new Animals(
                element.image_url,
                element.title,
                element.description,
                element.keyword, 
                element.horns);
            newAnimals.render();
            
        });
        selectList();
        options();
    });

}


Animals.readJsonPage2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('./data/page-2.json', ajaxSettings)
    .then(data => {
        keywords = [];
        animalsArray  = [];
        data.forEach(element => {
            let newAnimals = new Animals(
                element.image_url,
                element.title,
                element.description,
                element.keyword, 
                element.horns); 
        
            newAnimals.render();

        });
        selectList();
        options();
    });

}

$(() => Animals.readJson1());




////////////////////////select list Item////////////////////////

function selectList() {
    let unique = [];
    $.each(keywords, function(index,value) {
        if($.inArray(value, unique)  === -1) unique.push(value);
    });
    unique.forEach(value => {
        $('#select').append(`<option value="${value}" class="selectAll">${value}</option>`);
    })
}




////////////////////event listener///////////////////////

function options() {
    $('#select').on('change',function() {
        $('main').children().remove();
        for (let index = 0; index < animalsArray.length; index++) {
            if (this.value ===animalsArray[index].keyword) {
                animalsArray[index].render();
            } else if (this.value==='selectAll') {
                animalsArray[index].render();
            }
        }

    })
    
}



$('#pageOne').on('click',function () {
    $('#main').children().remove();
    $('select').children().not(':first-child').remove();
    Animals.readJson1();

});


$('#pageTwo').on('click',function () {
    $('#main').children().remove();
    $('select').children().not(':first-child').remove();
    Animals.readJsonPage2();
});




/////////////////////////sort/////////////////////

$('#horns').on('click',function () {
    $('#main').children().remove();
    animalsArray.sort((a,b) => b.horns-a.horns);
    animalsArray.forEach(value => value.render());
});


$('#title').on('click',function () {
    $('#main').children().remove();
    animalsArray.sort((a,b) =>{ 
    if (a.title < b.title) {
        return -1;
    }else if (a.title > b.title){
        return 1;
    }
    return 0;
});
    animalsArray.forEach(value => value.render());
});