console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const dogDiv = document.getElementById("dog-image-container")
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const dogBreeds = document.getElementById("dog-breeds")
    const dropDown = document.querySelector("#breed-dropdown")
    let breedsList = []
    
    dropDown.addEventListener('change', handleChange);

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs)
    );

    function renderDogs(dogs){
        const dogPics = dogs.message
        for (const dog of dogPics) {
            const img = `<img src=${dog} width="200">`
            // use innerHTML because the literal above is recognized as a string, not a node
            dogDiv.innerHTML += img
            // the following also works inside of for...of:
            // const img = document.createElement('img')
            // img.src = dog
            // img.width = '200'
            // dogDiv.appendChild(img)
        }
    };

    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        breedsList = Object.keys(breeds.message);
        listBreeds(breedsList);
    });

    function listBreeds(breedsList) {
        for (const breed of breedsList) {
            const li = document.createElement('li')
            li.innerText = breed
            dogBreeds.appendChild(li)
            li.addEventListener('click', handleClick);
        }
    };

    function handleClick(event) {
        if (event.target.style.color === 'red'){
            event.target.style.color = 'black'
        } else {
            event.target.style.color = 'red'
        }
    }

    function handleChange(event) {
        const selection = event.target.value
        const filterList = breedsList.filter(breed => breed.startsWith(selection));
        dogBreeds.innerHTML = ''
        filterList.forEach(breed => {
            const li = document.createElement('li')
            li.innerText = breed
            dogBreeds.appendChild(li)
        });    
    };
});
