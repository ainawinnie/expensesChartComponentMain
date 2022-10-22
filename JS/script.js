/*Columns */
const mondayColumn = document.getElementById('mon-column');
const tuesdayColumn = document.getElementById('tue-column');
const wednesdayColumn = document.getElementById('wed-column');
const thursdayColumn = document.getElementById('thu-column');
const fridayColumn = document.getElementById('fri-column');
const saturdayColumn = document.getElementById('sat-column');
const sundayColumn = document.getElementById('sun-column');

/*Defines column heights*/


function defineGraph (amountPerDays) {
    const bigestValue = getBigest(amountPerDays);
    mondayColumn.style.height = String(calculatesHeight(amountPerDays, 'mon', bigestValue))+'vh';
    tuesdayColumn.style.height = String(calculatesHeight(amountPerDays, 'tue', bigestValue))+'vh';
    wednesdayColumn.style.height = String(calculatesHeight(amountPerDays, 'wed', bigestValue))+'vh';
    thursdayColumn.style.height = String(calculatesHeight(amountPerDays, 'thu', bigestValue))+'vh';
    fridayColumn.style.height = String(calculatesHeight(amountPerDays, 'fri', bigestValue))+'vh';
    saturdayColumn.style.height = String(calculatesHeight(amountPerDays, 'sat', bigestValue))+'vh';
    sundayColumn.style.height = String(calculatesHeight(amountPerDays, 'sun', bigestValue))+'vh';

    addEventInElements(mondayColumn, 'mon', amountPerDays)
    addEventInElements(tuesdayColumn, 'tue', amountPerDays)
    addEventInElements(wednesdayColumn, 'wed', amountPerDays)
    addEventInElements(thursdayColumn, 'thu', amountPerDays)
    addEventInElements(fridayColumn, 'fri', amountPerDays)
    addEventInElements(saturdayColumn, 'sat', amountPerDays)
    addEventInElements(sundayColumn, 'sun', amountPerDays)

    highlightDate()
    
}

function getBigest (daysList) {
    let bigestValue = 0; 
    const len = daysList.length;

    for (let i = 0; i < len;  i++) {
        if (daysList[i].amount > bigestValue) {
            bigestValue = daysList[i].amount
        }
    }
    return bigestValue

}

function calculatesHeight (amountPerDays, day, bigestValue) {
    const len = amountPerDays.length;
    let height = 0;

    for (let i = 0; i < len;  i++) {
        if (amountPerDays[i].day === day) {
            height = (amountPerDays[i].amount * 15 / bigestValue);
        }
    }
    return height
}



/*Highlights today*/
function highlightDate () {
    const dayOfWeekDigit = new Date().getDay();
    const weekDays = [sundayColumn, mondayColumn, tuesdayColumn, wednesdayColumn, thursdayColumn, 
        fridayColumn, saturdayColumn]
    
    weekDays [dayOfWeekDigit].style.backgroundColor = 'var(--cyan)';
}

/*Show values on hover */

function addEventInElements (element, day, amountPerDays) {
    let value = returnBalance (amountPerDays, day)

    element.addEventListener('mouseover', function () {
        element.parentNode.firstElementChild.classList.remove('hide');
        element.parentNode.firstElementChild.innerHTML = value;
    })

    element.addEventListener('mouseout', function () {
        element.parentNode.firstElementChild.classList.add('hide');
    })

    
}

function returnBalance (amountPerDays, day) {
    const len = amountPerDays.length;
    for (let i = 0; i < len;  i++) {
        if (amountPerDays[i].day === day) {
            dayBalance = amountPerDays[i].amount;
        }
    }

    return dayBalance
}



  

fetch('./data.json').then(r => r.json()).then(defineGraph)