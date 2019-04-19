import * as data from '../navigation.json';
const css = require('./index.css');
const cities = data.cities;
// a function to create <li> element which include <a> element
const addElement = (text) => {
    const city = text || {};
    let listNode = document.createElement('li');
    let aNode = document.createElement('a');
    let textnode = document.createTextNode(city.label);
    listNode.className = 'listItem';
    aNode.href = '#';
    aNode.id = `${city.section}`
    aNode.className = 'link';
    aNode.appendChild(textnode);
    listNode.appendChild(aNode)
    return listNode;
}
// map json file and create li element for each city
const changeStyle = (arr, eventTarget) => {
    if (!Array.isArray(arr)) {
        return;
    }
    if (arr[0].id != eventTarget.id) {
        const element = arr.shift();
        element.className = 'link';
    }
    if (arr[0].id === eventTarget.id) {
        return;
    }
}
const stack = [];
let timezone;
const appendNavElement = () => {
    let list = document.querySelector('ul');
    cities.map((city) => {
        let node = addElement(city);
        list.appendChild(node);
        node.addEventListener('click', function(event) {
            timezone = event.target.id;
            stack.push(event.target);
            event.target.className = 'link afterClick';
            changeStyle(stack, event.target);
            printTime();
        })
    })
    
}
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    })
    navLinks.forEach((link, index) => {
        link.style.animation =  `navLinkFade 0.5s ease forwards ${index / 7 + 2}s`
    })
}
const printTime = () => {
    let time = new Date();
    const clock = document.getElementById('clock-content');
    switch (timezone) {
        case 'cupertino':
            clock.textContent = time.toLocaleTimeString('en-US',{timeZone: "America/Los_Angeles"})
            break;
        case 'new-york-city':
            clock.textContent = time.toLocaleTimeString('en-US',{timeZone: "America/New_York"})
            break;
        case 'london':
            clock.textContent = time.toLocaleTimeString('en-US',{timeZone: "Europe/London"})
            break;
        case 'amsterdam':
            clock.textContent = time.toLocaleTimeString('en-US',{timeZone: "Europe/Amsterdam"})
            break;
        case 'tokyo':
            clock.textContent = time.toLocaleTimeString('en-US',{timeZone: "Asia/Tokyo"})
            break;
        case 'hong-kong':
            clock.textContent = time.toLocaleTimeString('en-US',{timeZone: "Asia/Hong_Kong"})
            break;
        case 'sydney':
            clock.textContent = time.toLocaleTimeString('en-US',{timeZone: "Australia/Sydney"})
            break;
        default:
            time = new Date();
    }
} 
const timer = setInterval(printTime, 1000);
const app = () => {
    appendNavElement();
    navSlide();
    timer;
}
app();

