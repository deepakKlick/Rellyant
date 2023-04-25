// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

//ISI Stuff
const isi = document.querySelectorAll('.isi')[0];
const fixedISI = document.createElement('div');
const body = document.getElementsByTagName('body')[0];
fixedISI.innerHTML = isi.innerHTML;
fixedISI.classList.add('fixed-isi');
isi.parentNode.append(fixedISI);

function toggle(el, classname){
    el.classList.toggle(classname);
}
function handleIntersection(entries){
    entries.map((entry) => {
        if(entry.isIntersecting){
            fixedISI.classList.add('hide-fixed-isi');
        }else{
            fixedISI.classList.remove('hide-fixed-isi');
        }
    },{
        threshold: 1
    });
}

const observer = new IntersectionObserver(handleIntersection);
observer.observe(isi);
fixedISI.addEventListener('click', (e) => {
    e.preventDefault();
    toggle(body,'fixed');
    toggle(fixedISI,'expanded');
    fixedISI.scrollTop = 0;
});