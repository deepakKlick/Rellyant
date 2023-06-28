async function getStories(path) {
    const resp = await fetch(`${path}`);
    if (resp.ok) {
      return await resp.json();
    }
  }
  
  async function renderStories(path, layout){
    let stories = await getStories(path);
    //console.log(stories.data);
    let homepageData = stories.data.filter(story => story.homepage == 'true');
    let htmlSegment;
    let html = '';
    if(layout == "homepage"){
      homepageData.map(story => {
        htmlSegment = `<div class="story"><div class="story-name">${story.name}</div><img src="${story.image}"/></div>`;
        html += htmlSegment
      });
    }else{
      stories.data.map(story => {
        htmlSegment = `<div class="story"><div class="story-name">${story.name}</div><div class="story-overlay"><div class="story-quote">${story.quote}</div><div class="story-warning">${story.disclaimer}</div></div><img src="${story.image}"/></div>`;
        html += htmlSegment
      });
    }
  
    let container = document.querySelector('.patient-stories');
    container.innerHTML = html;
  }
  
  export default async function decorate(block) {
    let storiesEndpoint;
    //console.log(block.classList);
    [...block.children].forEach((row) => {
      [...row.children].forEach((div, i) => {
        console.log(div.innerHTML);
        storiesEndpoint = div.innerHTML;
        div.remove();
      });
     if(storiesEndpoint){
  
        if(block.classList.contains('homepage-layout')){
          renderStories(storiesEndpoint, 'homepage');
        }else{
          renderStories(storiesEndpoint, 'full');
        }
      }
      //row.remove();
    });
  }
  