
document.addEventListener("DOMContentLoaded", () => {
    let pageCount = 1;
    // get first 50 monsters from API and add to DOM
    function fetchMonsters(page){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then((res) => res.json())
            .then((json) => { 
                //pageCount++
                console.log(pageCount)
                console.log(json)
                monsterContainer.innerHTML = ""
                json.forEach(monster => getMonster(monster)
            )
            })
    }
    fetchMonsters(pageCount)

    const monsterContainer = document.getElementById("monster-container")
    const createMonsterDiv = document.getElementById("create-monster")

    //create a new monster form
    const form = document.createElement("form");
    form.id = "monster-form";
    const inputName = document.createElement("input");
    inputName.id = "name";
    inputName.placeholder= "name...";
    const inputAge = document.createElement("input");
    inputAge.id = "age";
    inputAge.placeholder= "age...";
    const inputDescription = document.createElement("input");
    inputDescription.id = "description";
    inputDescription.placeholder = "description...";
    const button = document.createElement("button")
    button.innerText = "Create"
    form.append(inputName, inputAge, inputDescription, button)
    createMonsterDiv.append(form)

    form.addEventListener("submit", (e) => {
        console.log('submit button clicked')
        e.preventDefault();
        const newName = document.getElementById("name");
        const newAge = document.getElementById("age");
        const newDesc = document.getElementById("description");

        if(!newName || !newAge || !newDesc){
            console.error("Missing new monster name, age, or description");
            return;
        };

        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": newName.value,
                "age": newAge.value,
                "description": newDesc.value
            })  
        };

        fetch("http://localhost:3000/monsters", request)
            .then((res) => res.json())
            .then((json) => getMonster(json))
            })

    // get forward button to load next set of monsters
    const forward = document.getElementById("forward");
    forward.addEventListener("click", () => {
       console.log('forward button clicked')
       pageCount++
       console.log(`fetching page ${pageCount}`)
       fetchMonsters(pageCount)
    })


    function getMonster(monster) {
        const monsterName = monster.name;
        const monsterDesc = monster.description;
        const monsterAge = monster.age;
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        h2.innerText = monsterName;
        h4.innerText = `Age: ${monsterAge}`;
        p.innerText = `Bio: ${monsterDesc}`;
        div.append(h2, h4, p);
        monsterContainer.append(div);
        }
})
