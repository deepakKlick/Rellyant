// Get the tab list and content elements
const tabList = document.querySelectorAll('.tabs li');
const tabContent = document.querySelectorAll('.tabs-wrapper .tabs > div div');

// Add the "active" class to the first tab and content element by default
tabList[0].classList.add('active');
tabContent[0].classList.add('active');

// Loop through each tab and add a click event listener
tabList.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove the "active" class from all tabs and content elements
    tabList.forEach(tab => tab.classList.remove('active'));
    tabContent.forEach(content => content.classList.remove('active'));

    // Add the "active" class to the clicked tab and content element
    tab.classList.add('active');
    tabContent[index].classList.add('active');
  });
});
