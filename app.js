const $num1 = $('#num-1');
const $num2 = $('#num-2');
const $facts = $('#facts');
const $factBtn1 = $('#fact-btn-1');
const $factBtn2 = $('#fact-btn-2');
const $factBtn3 = $('#fact-btn-3');

const baseURL = 'http://numbersapi.com/'

function getNumFact(e) {
    e.preventDefault()
    console.log('in getNumFact')
    let num = $num1.val()
    axios.get(`${baseURL}${num}?json`)
    .then(p => $facts.text(p.data.text))
}

function getFourNumFacts(e) {
    e.preventDefault()
    console.log('in getFourNumFacts')
    let num = $num1.val()
    let facts = []
    for (let i = 1; i < 5; i++) {
        facts.push(axios.get(`${baseURL}${num}?json`))
    }
    Promise.all(facts)
    .then(factsArr => (
        factsArr.forEach(p => {
            $facts.append(`${p.data.text}<br>`)})
    ))
}

function getMultiNumFact(e) {
    e.preventDefault()
    console.log('in getMultiNumFact')
    let nums = $num2.val()
    axios.get(`${baseURL}${nums}`)
    .then(p => { $facts.text('') 
    Object.keys(p.data).forEach(key => {
        $facts.append(`${p.data[key]}<br>`)})})
}

$factBtn1.on('click',getNumFact)
$factBtn2.on('click',getMultiNumFact)
$factBtn3.on('click',getFourNumFacts)