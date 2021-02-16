'use strict';

var keywards=[];
var animalsArray=[];
var hornsArray=[1,2,3,100];


var uniqueNames=["selectAll","narwhal","rhino","unicorn","unilego","triceratops","markhor","mouflon","addax","chameleon","lizard","dragon","jackalope","horn","Rhino","Music","giraffe","saiga"];

function Animals(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    
    animalsArray.push(this);
    // hornsArray.push(this.horns);

}

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
        data.forEach(element => {
            let newAnimals = new Animals(
                element.image_url,
                element.title,
                element.description,
                element.keyword, 
                element.horns);
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
                element.keyword, 
                element.horns); 
        
            newAnimals.render();

        });
       
    });

}

$(() => Animals.readJson1());




////////////////////////select list Item////////////////////////
selectList(uniqueNames);



function selectList(array) {
    
    for (let index = 0; index < array.length; index++) {
        var select=$('.temp-select').clone();
        select.attr('value', array[index]);
        select.text(array[index]);
        select.removeClass('temp-select');
        $('select').append(select);
    }
}

/////////////////option for select items/////////////////////////

options();
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


/////////////////compare function/////////////////////////
// function compare(a,b) {
//     return a-b;
// }

// hornsArray.sort(compare);

// console.log(hornsArray);



////////////////////event listener///////////////////////

$('#pageOne').on('click',function () {
    $('#main').empty();
    Animals.readJson1();
    selectList(uniqueNames);
});


// console.log(animalsArray);

$('#pageTwo').on('click',function () {
    $('#main').empty();
    $('select').empty();
    selectList(uniqueNames);
    Animals.readJsonPage2();
    console.log(animalsArray);
});

/////////////////////////sort/////////////////////



$('#horns').on('click',function () {
    Animals.readJsonPage2();
    console.log(animalsArray);
    console.log(hornsArray);
    $('#main').empty();
    for (var i = 0; i < hornsArray.length; i++) {
       for (var index = 0; index < animalsArray.length; index++) {
           if ( hornsArray[i] == animalsArray[index].horns) {
               animalsArray[index].render();
           }  
        }
           
        
    }
});













/// TODO sort by horns 
/// TODO list  
