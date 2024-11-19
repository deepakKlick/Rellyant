// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

//ISI Stuff
const isi = document.querySelectorAll('.isi')[0];
const fixedISI = document.createElement('div');
const isiTitle = document.querySelectorAll('.isi h2')[0].cloneNode(true);
const fixedIsiTitle = document.createElement('div');
const body = document.getElementsByTagName('body')[0];


fixedIsiTitle.classList.add('fixed-isi-title');

// Add isiTitle element to fixedIsiTitle element
fixedIsiTitle.appendChild(isiTitle);

// Add fixedIsiTitle element to fixedISI element
fixedISI.appendChild(fixedIsiTitle);

fixedISI.innerHTML += isi.innerHTML;
fixedISI.classList.add('isi', 'fixed-isi');
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



if (document.querySelectorAll('.modelviewer').length > 0) {
    const script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
    script.setAttribute('type', 'module');
    document.head.append(script);

    if(document.querySelector(".slider").length > 0){
        document.querySelector(".slider").addEventListener('beforexrselect', (ev) => {
            // Keep slider interactions from affecting the XR scene.
            ev.preventDefault();
          });
    }
    
}