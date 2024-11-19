import { readBlockConfig } from '../../scripts/lib-franklin.js';
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
    block.append(sectionTitleEl);
    block.append(modelViewerEl);
    
    
}