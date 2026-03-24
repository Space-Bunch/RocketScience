function html_card_list(size="normal",entryes=[]) {
    let entryes_list = ""
    for(let line = entryes.length; line--; line > 0){
        entryes_list = entryes_list+`<a class="yellow link" style="" href="#${entryes[line]}">${entryes[line].replaceAll(".json","")}</a><br>\n`
    }
    let html = `<div class="history_card ${size} yellow">
        <div style="grid-column: 1; grid-row: 2;">
            <h2> </h2>
            <div class="history_card_description">
                <div style="height: 10px; display: grid; grid-template-columns: 1fr 1.5fr 4fr;">
                    <hr class="yellow" style="grid-column: 1;"></hr>
                    <p style="grid-column: 2; margin-left: 30px; margin-right: 30px; margin-top: 7px; text-wrap: nowrap; font-size: 20px;"><b>Лист карточек</b></p>
                    <hr class="yellow" style="grid-column: 3;"></hr>
                </div>
            <p style="margin-left: 10px; font-size: 20px;">${entryes_list}</p></div></div>
        <div style="grid-column: 2; grid-row: 2; width: 100%; height: 100%;">
            <img src="../resources/uhhhhhh512.png" class="yellow" style="height: 200px; border-radius: 5px; border-width: 5px; border-style: solid;"></img>
        </div></div>`
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}

function html_card(title="",desc="",date="",img="",size="normal",json="") {
    let html = `<div class="history_card ${size} yellow">
        <a class="card_anchor" name="${json}" style="grid-column: 1; grid-row: 2;"></a>
        <div style="grid-column: 1; grid-row: 2;">
            <h2>${title}</h2>
            <div class="history_card_description">
                <div style="height: 10px; display: grid; grid-template-columns: 1fr 1fr 4fr;">
                    <hr class="yellow" style="grid-column: 1;"></hr>
                    <p style="grid-column: 2; margin-left: 30px; margin-right: 30px; margin-top: 7px; font-size:105%; text-wrap: nowrap; font-size: 20px;"><b>${date}</b></p>
                    <hr class="yellow" style="grid-column: 3;"></hr>
                </div>
            <p style="margin-left: 10px; font-size: 20px;">${desc}</p></div></div>
        <div style="grid-column: 2; grid-row: 2; width: 100%; height: 100%;">
            <img src="../resources/${img}" class="yellow" style="height: 200px; border-radius: 5px; border-width: 5px; border-style: solid;"></img>
        </div></div>`
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}

/*function crutch(ls){
    file_data = ls
}*/

/*const file_data = []
function set_fd(dt){file_data = []; file_data.push(dt); console.log(file_data);
}*/

/*function get_json_data(json="test.json"){
    let file_data_f = ""
    let file = 
        fetch(`../resources/cards/${json}.json`)
            .then((response) => {
                if (!response.ok){throw new Error(`HTTP error! Status: ${response.status}`);}
                return response.json();
            })
            .then(fetch(data).then(data => {file_data_f = file_data_f + data.title}));
    console.log(file_data_f);  
}*/

function add_card_list(entryes=[]){
    let root_element = window.root_tag;
    root_element.append(html_card_list("normal",entryes))
}

function add_card(json="test.json"){
    let root_element = window.root_tag;
    let file = fetch(`../resources/cards/${json}`)
        .then(response => {
            if (!response.ok){throw new Error(`HTTP error! Status: ${response.status}`);}
            return response.json();
        })
        .then(data => root_element.appendChild(html_card(data.title,data.description,data.date,data.img,data.size,json)));
}

window.onload = function() {
    // ВСТЯВЛЯТЬ ИМЕНА СЮДА \/ \/
    const cards = ["Юрий Алексеевич Гагарин", "Нил Олден Армстронг","Франко Малерба","Зигмунд Йен","Харрисон Шмит","Александр Михайлович Самокутяев","Алексей Леонов","Герман Титов","Валентина Терешкова"].reverse()
    let entryes = []
    for (let entry = cards.length; entry--; entry > 0){
        entryes.push(`${cards[entry]}.json`)
    }
    add_card_list(entryes)
    for (let card = cards.length; card--; card > 0){
        add_card(`${cards[card]}.json`)
    }
};