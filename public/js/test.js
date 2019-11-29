console.log('Clinet side java script file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

messageOne.textContent = 'From JS file'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('testing')

    const location = search.value
    console.log(location)

    fetch('/weather?address=' + location).then( (response) => {
    response.json().then( (data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            let features = data.response.features
            console.log(features) 

               let feature = features[0]
               messageOne.textContent = feature.place_name
                console.log(feature.place_name) 

        }

    })
}) 
})