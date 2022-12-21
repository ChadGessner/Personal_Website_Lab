const about = "C:/Users/Chad/Desktop/Grand Circus/Personal_Website_Lab/about.html";
const portfolio = "C:/Users/Chad/Desktop/Grand Circus/Personal_Website_Lab/portfolio.html";
const home = "C:/Users/Chad/Desktop/Grand Circus/Personal_Website_Lab/home.html"
const linksArray = [home,about,portfolio];
const nav = document.getElementById('nav');
let links = document.getElementsByClassName('link');
const educationLinks = document.querySelectorAll('a.light-purple');
const imageContent = document.getElementById('main-image');
const imageTitle = document.getElementById('image-title')
const loadLinks = () => {
    for(let i = 0; i < links.length;i++){
        links[i].href = linksArray[i];
    }
}
const onClick = () => {
    educationLinks.forEach(l => {
        l.addEventListener('click', ()=> {
            imageTitle.innerText = l.title
            imageContent.src = l.name;
        })
    })
}
onClick();
loadLinks();
