function html_card(title="",desc="",date="",img="",size="midium") {
    let html = `<div class="history_card ${size} purpule">
        <div style="grid-column: 1; grid-row: 2;">
            <h2> </h2>
            <div class="history_card_description">
                <div style="height: 10px; display: grid; grid-template-columns: 1fr 1fr 4fr;">
                    <hr class="purpule" style="grid-column: 1;"></hr>
                    <p style="grid-column: 2; margin-left: 30px; margin-right: 30px; margin-top: 7px;"><b>${title}</b></p>
                    <hr class="purpule" style="grid-column: 3;"></hr>
                </div>
            <p style="margin-left: 10px;">${desc}</p></div></div>
        <div style="grid-column: 2; grid-row: 2; width: 100%; height: 100%;">
            <img src="../resources/${img}" class="purpule" style="height: 200px; border-radius: 5px; border-width: 5px; border-style: solid;"></img>
        </div></div>`
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}

function add_card(json="test.json"){
    let root_element = window.root_tag;
    let file = fetch(`../resources/cards/${json}`)
        .then(response => {
            if (!response.ok){throw new Error(`HTTP error! Status: ${response.status}`);}
            return response.json();
        })
        .then(data => root_element.appendChild(html_card(data.title,data.description,data.date,data.img,data.size)));
}

window.onload = function() {
    // ВСТЯВЛЯТЬ ИМЕНА СЮДА \/ \/
    const cards = ["history_anch","XIII","history_new_age","XX","XXI"].reverse()
    for (let card = cards.length; card--; card > 0){
        add_card(`${cards[card]}.json`)
    }
};