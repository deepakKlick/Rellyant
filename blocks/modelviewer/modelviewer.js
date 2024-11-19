import { readBlockConfig } from '../../scripts/lib-franklin.js';
async function getSlider(path) {
    const resp = await fetch(`${path}`);
    if (resp.ok) {
        return await resp.json();
    }
}

export default async function decorate(block) {
    const cfg = readBlockConfig(block);
    
    block.innerHTML = '';

    const sectionTitleEl = document.createElement('h3');
    sectionTitleEl.innerText = cfg.sectiontitle;
    
    const modelViewerEl = document.createElement('model-viewer');
    modelViewerEl.setAttribute('alt', cfg.alttext);
    modelViewerEl.setAttribute('poster', cfg.poster);
    modelViewerEl.setAttribute('src', cfg.modelsrc);
    modelViewerEl.setAttribute('shadow-intensity', '1');
    modelViewerEl.setAttribute('camera-controls', true);
    modelViewerEl.setAttribute('touch-action', 'pan-x');
    // modelViewerEl.style.width = '800px';

    if(cfg.autorotate) {
        modelViewerEl.setAttribute('auto-rotate', cfg.autorotate);
    }
    
    // modelViewerEl.setAttribute('loading', cfg.loading);
    modelViewerEl.setAttribute('loading', 'eager');
   
    
    if (block.classList.contains('carousel')){
        let slider = await getSlider(cfg.slidersrc);
        console.log(slider.data[0]);

        // create slider element
        const sliderEl = document.createElement('div');
        sliderEl.classList.add('slider');
        const slides = document.createElement('div');
        slides.classList.add('slides');

        slider.data.forEach((item, index) => {
            const slidebtn = document.createElement('button');
            slidebtn.classList.add('slide');
            slidebtn.setAttribute('onclick', `switchSrc(this, '${item.Name}')`);
            slidebtn.setAttribute('style', `background-image: url('${item.poster}')`);

            slides.append(slidebtn);
        });

        sliderEl.append(slides);

        //reset model with default 1st item
        modelViewerEl.setAttribute('poster', slider.data[0].poster);
        modelViewerEl.setAttribute('src', slider.data[0].modelsrc);

        modelViewerEl.append(sliderEl);

        window.switchSrc = (element, name) => {
            const base = `${cfg.assetpath}/${name}`;
            modelViewerEl.src = base + '.glb';
            modelViewerEl.poster = base + '.webp';
            const slidesAll = modelViewerEl.querySelectorAll('.slide');
            slidesAll.forEach((element) => {element.classList.remove("selected")});
            element.classList.add("selected");
        };
        
    }

    block.append(sectionTitleEl);
    block.append(modelViewerEl);
    
}