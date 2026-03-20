function html_card(title="",desc="",date="",img="",size="exstra") {
    let html = `<div class="baner_card ${size} green">
        <div style="margin-left: 20%; margin-right: 20%; margin-bottom: 0;">
            <img src="../resources/${img}" class="green" style="height: calc(width * 0.779014); width: 53.542vw; border-radius: 5px; border-width: 5px; border-style: solid;"></img>
        </div>
        <div>
            <div class="history_card_description">
                <div style="height: 10px; display: grid; grid-template-columns: 1fr 1fr 1fr;">
                    <hr class="green" style="grid-column: 1;"></hr>
                    <p style="grid-column: 2; margin-left: 30px; margin-right: 30px; margin-top: 7px; text-align: center; font-size: large; text-wrap: nowrap;"><b> ${title}</b></p>
                    <hr class="green" style="grid-column: 3;"></hr>
                </div>
            <p style="margin-left: 10px;">${desc}</p></div></div>
        </div>`
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
    const cards = ["engine_how_w","engine_how_w2","engine_history"].reverse()
    for (let card = cards.length; card--; card > 0){
        add_card(`${cards[card]}.json`)
    }
};