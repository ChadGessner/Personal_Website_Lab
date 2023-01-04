

const about = './about.html';
const portfolio = "./portfolio.html";
const home = "./home.html";
const aboutMeSection = document.getElementById('about-me');
const bubsSection = document.getElementById('bubs-section');
const westMichiganGoClubSection = document.getElementById('west-michigan-go-club');
const aboutMeImage = document.getElementById('about-me-image');
const aboutMeLabel = document.getElementById('about-me-label');
const linksArray = [
    home,
    about,
    portfolio,
    home,
    about,
    portfolio,
    
];
const nav = document.getElementById('nav');
let links = document.getElementsByClassName('link');
let timerTick = 0;
let isBubs = false; // :(
const educationLinks = document.querySelectorAll('a.light-purple');
const imageContent = document.getElementById('main-image');
const imageTitle = document.getElementById('image-title');
const imageMessage = document.getElementById('image-message');
const bulky = 'file://https://github.com/ChadGessner/BulkyBook';
const bulkyHTML = document.createElement('a');
const bulkyLinkContainer = document.getElementById('put-here')
const bulkyLink =  `
    <a href=${bulky} class="a-style text-smaller press-start text-light darker-blue text-end">Bulky Book Finished Project</a>
`;
const listCard = document.getElementsByClassName('list-card');
const bubsImage = document.getElementById('bubs-image');
const bubsMessage = document.getElementById('bubs-message');
const mrBubsArray = [
    'https://i.imgur.com/unCeZIc.jpg',
    'https://imgur.com/hYpIreD.jpg',
    'https://i.imgur.com/cLmfnsL.jpg',
    'https://i.imgur.com/wLwF5rt.jpg',
    'https://i.imgur.com/9x4uyw6.jpg',
    'https://i.imgur.com/368NXOY.jpg',
    'https://i.imgur.com/83f1lfY.jpg',
    'https://i.imgur.com/E5jZnr9.jpg',
    'https://i.imgur.com/zF4Tdd9.jpg',
    'https://i.imgur.com/qvwp2kZ.jpg',
    'https://i.imgur.com/l3VeWFt.jpg',
    'https://i.imgur.com/cLmfnsL.jpg',
    'https://i.imgur.com/hYpIreD.jpg',
    'https://i.imgur.com/vHfDw0f.jpg',
    'https://i.imgur.com/57ObGEh.jpg',
    'https://i.imgur.com/AykQMu0.jpg',
    'https://i.imgur.com/qvwp2kZ.jpg',
    'https://i.imgur.com/9x4uyw6.jpg',
    'https://i.imgur.com/ZKbgk96.jpg',
    'https://i.imgur.com/368NXOY.jpg',
];
const mrBubsMessages = [
    'This is Bubs!',
    'he is my friend!',
    'I like you and him!',
    'and he likes you!'
]
const imageMessageArray = [
    '',
    '',
    'This was where I wrote my first "Hello World!" app. The instructor, Dr. Chuck, covers the fundamentals of procedural programming while teaching python.\n\n I gained a basic understanding of iterable data structures, how and why they are used and how to apply them to manipulate, transform and synthesize data using algorithms.\n\n',
    'JavaScript is the third high-level programming language I learned after Python and then C#.\n\n This course was my first introduction to JavaScript and I can\'t recommend it enough to people who learn like me, by doing, try, fail, research, repeat.\n\n This course is comprehensive and the final projects, although fairly simple as far as software developement goes, are a good test for your ability to solve problems that in my experience are unique to javascript.',
    'The quick brown fox jumped over the lazy dog',
    'The quick brown fox jumped over the lazy dog',
    'The quick brown fox jumped over the lazy dog',
    'The quick brown fox jumped over the lazy dog',
    'The quick brown fox jumped over the lazy dog',
    'This course is comprehensive to say the least. The instructor, Bruhgen Patel, takes you through all the steps from beginning to end creating a truly enterprise level website from creating the first project to deploying the complete solution to Microsoft Azure.\n\n The course covers a wide range of ASP .NET topics. The project uses Entity Framework Core with Microsoft SQL Server Management Studio, MVC using both manual Controllers and Views as well as scaffolding. Even using AJAX to pass data between Views and Controllers.\n\n The front end uses Razor views so as you go through the course you become familiar with razor syntax and ASP tag helpers. You also become familiar with using NewtonSoft.Json to serialize and deserialize JSON as the payment functionality of the site is outsourced to a third party API. There are lots of front end bells and whistles used such as JQuery, Bootstrap, Bootswatch and more to make the interface look slick while keeping focused on pure .NET related topics.\n\n Saying I got my moneys worth on this course is a massive understatement. My only complaint is that to complete this course honestly you need to deploy the project to Microsoft Azure which can end up costing money so I\'m told, so although I have completed 95% of this course I don\'t yet have the certificate but I have a link to my completed project from this course.',
    'The quick brown fox jumped over the lazy dog',
];
const projectLinksArray = [
    '/projects/snek/snek.html',
    '/modules/public/projects/basic-tetris/index.html',
    '/modules/public/projects/url_resource_library/index.html',
    '/modules/public/projects/nft-preview-card-component-main/index.html',
    '/modules/public/projects/order-summary-component/index.html',
];
const aboutMeImageArray = [
    '/projects/images/0ECQGTp - Imgur.jpg',
    '/projects/images/ermagerd_crop.png',
    '/projects/images/mi_state_tournament.jpg'
];
const aboutMeMessageArray = [
    'About Me',
    'Ermagerd! It\'s Berbs! Muh fravrit derg!',
    'West Michigan Go Club hosted the state tournament 2022'
];
const aboutMeLinksArray = [
    'https://www.linkedin.com/in/chad-gessner/',
    '#',
    'https://www.facebook.com/media/set/?set=oa.580517606645250&type=3'
];
const aboutMeClickEventsArray = [
    aboutMeSection,
    bubsSection,
    westMichiganGoClubSection
]

const projectLinks = document.getElementsByClassName('project-link');
let iframe = document.getElementById('iframe');
const projectSection = document.getElementById('project-section');
let projectsLabel = document.getElementById('projects-label');

let gradientStartCount = 0;
let gradientEndCount = 100;
let gradientDegreeCount = -35;
let indexOnMouseLeave = -1;
const bubsMessageContainer = document.getElementById('bubs-message-container');
const bubsMessageContainers = document.getElementsByClassName('label-effect');

const aboutMeClickEvents = () => {
    for(let i = 0; i < aboutMeClickEventsArray.length; i++){
        aboutMeClickEventsArray[i].addEventListener('click', ()=> {
            console.log(aboutMeImageArray)
            aboutMeImage.href = aboutMeLinksArray[i];
            aboutMeLabel.innerText = aboutMeMessageArray[i];
            aboutMeLabel.style.fontSize = i === 0 ? '1.5em':'1em';
            aboutMeImage.src = aboutMeImageArray[i];
        })
    }
}

const bubsSectionController = () => {

    let random = Math.floor(Math.random() * mrBubsArray.length -1);
    random = random < 0 ? 0 : random;
    bubsMessage.innerText = mrBubsMessages[timerTick];
    bubsImage.src = mrBubsArray[random];
    timerTick = timerTick === mrBubsMessages.length - 1 ? 0 : timerTick += 1;
}

let bubsInterval;
const loadLinks = () => {
    for(let i = 0; i < links.length;i++){
        console.log(linksArray[i])
        links[i].href = linksArray[i];
        links[i].addEventListener('click',()=> {
            if(links[i].innerText === "About"){
                bubsInterval = setInterval(2000, bubsSectionController);
            }else{
                clearInterval(bubsInterval)
            }
        })
        }

        //links[i].classList.add("cursor: url('C:/Users/Chad/Desktop/Grand Circus/Personal_Website_Lab/projects/images/zelda_book.png')")
    }
    
const formatListTitles = () => {
    
    for(let i = 0; i < listCard.length;i++){
        let title = listCard[i];
        console.log(title.firstChild.textContent.trim().length)
        if(title.firstChild.textContent.trim().length > 'JavaScript'.length){
            title.style.fontSize = '12px';
        }
    }
}
const onClick = () => {
    educationLinks.forEach((l,i) => {
        l.addEventListener('click', ()=> {
            if(l.title.length > 12) {
                imageTitle.style.fontSize = '12px';
            }
            imageTitle.innerText = l.title;
            imageContent.src = l.name;
            
            imageMessage.innerText = imageMessageArray[i];
            if(i === 9){
                bulkyLinkContainer.style.display = 'inline';
                bulkyLinkContainer.innerHTML = bulkyLink;
            }else{
                bulkyLinkContainer.style.display = 'none';
            }
            
        })
    })
}

const projectsLinksOnClick = () => {
    for(let i = 0; i < projectLinks.length;i++){
        console.log('all sorts of shit')
        projectLinks[i].addEventListener('click', ()=> {
            let iframe = document.getElementById('iframe');
            // iframeElement.id = 'iframe';
            // iframeElement.scrolling = 'no';
            // iframeElement.width = '1000px';
            // iframeElement.height = '100%';
            // iframeElement.src = projectLinks[i].name;
            console.log(projectLinks[i].name);
            iframe.src = projectLinks[i].name;
            projectsLabel.innerText = projectLinks[i].innerText;

        })
    }
}
const modifyGradient = (
    isRotate,
    isReverse,
    gradientCount
    ) => {
    if(isRotate){
        return gradientCount;
    }
    if(isReverse){
        return gradientCount
    } 
    return gradientCount--;
}

const addGradient = () => {
    if(indexOnMouseLeave !== -1){
        let isRotate = Math.abs(gradientStartCount) === 40;
        let isReverse = Math.abs(gradientDegreeCount) === 36//Math.abs(gradientDegreeCount) === 35;//gradientDegreeCount === 35;
        let isBoth = isRotate && !isReverse;
        bubsMessageContainers[indexOnMouseLeave].style = ` 
        background-image: linear-gradient(
        ${gradientDegreeCount}deg,
        black ${gradientStartCount}%,
        var(--Blue) ,
        black ${gradientEndCount}%
        )`;
        if(!isRotate){
            gradientStartCount = isReverse ? gradientStartCount - 1 : gradientStartCount + 1;
            gradientEndCount = isReverse ? gradientEndCount + 1 : gradientEndCount - 1;
            isRotate = Math.abs(gradientStartCount) === 40;
            isReverse = Math.abs(gradientDegreeCount) === 36;
            isBoth = isRotate && !isReverse;
            if(isRotate && isReverse){
                console.log('hit')
                gradientDegreeCount = gradientDegreeCount - 1;
                isReverse = Math.abs(gradientDegreeCount) === 36;
            }
        }
        if(isRotate ){
            isReverse = Math.abs(gradientDegreeCount) === 36;
            gradientDegreeCount = isReverse ? gradientDegreeCount - 1 : gradientDegreeCount + 1;
            if(Math.abs(gradientDegreeCount) === 36){
                gradientStartCount = !isReverse ? gradientStartCount - 1 : gradientStartCount + 1;
                gradientEndCount = !isReverse ? gradientEndCount + 1 : gradientEndCount - 1;
                console.log(isReverse + "  " + isRotate)
            }
        }    
    }
}
let labelBackgroundInterval;

let isMouseEntered = false;
const onMouseEntered = (index) => {
    indexOnMouseLeave = index;
}
const onMouseLeave = (index) => {
    if(index === indexOnMouseLeave){
        
        clearInterval(labelBackgroundInterval);
        indexOnMouseLeave = -1;
    }
}
for(let i = 0; i < bubsMessageContainers.length;i++){
    let container = bubsMessageContainers[i];
    container.addEventListener('mouseenter', ()=> {
        labelBackgroundInterval  = setInterval(addGradient,30)
        
        onMouseEntered(i);
    })
    container.addEventListener('mouseleave', ()=> {
        onMouseLeave(i);
        gradientStartCount = -0;
        gradientEndCount = 100;
        gradientDegreeCount = -35;
        bubsMessageContainers[i].style = 'background-image: var(--Blue)'
    })
}
const headShot = document.getElementsByClassName('label-effect');
const badThings = document.getElementById('bad-things');
const itsFun = document.getElementById('its-fun-to-do-bad-things');
const bubsDisplayContainer = document.getElementById('bubs-display-container')
console.log(badThings)
const hoodRatStuff = document.getElementById('hood-rat-stuff')
const badThingsController = () => {
    badThings.addEventListener('mouseenter', (e)=> {
        console.log('hood rat stuff')
        bubsImage.classList.add('no-display');
        hoodRatStuff.classList.remove('no-display');
        bubsDisplayContainer.classList.add('no-display')
        itsFun.src = "https://www.youtube.com/embed/qcqOgnQyXp4?autoplay=true"
    });
    badThings.addEventListener('mouseleave', ()=> {
        hoodRatStuff.classList.add('no-display')
    }) 
}

const navController = () => {
    nav.addEventListener('mouseenter', (e)=> {
        console.log(e);
        for(let i = 0; i < headShot.length;i++){
            headShot[i] += e;
            let someInterval = setInterval(addGradient,30);
            someInterval;
            //onMouseEntered(i)
            console.log(someInterval.valueOf())
        }
        nav.addEventListener(
            'mouseleave', 
            (a)=> {
            for(let i = 0; i < headShot.length; i++){
                headShot[i] += a;
                clearInterval(someInterval);
                          gradientStartCount = -0;
            gradientEndCount = 100;
            gradientDegreeCount = -35;
                console.log(someInterval.valueOf())
            }
        })
    })
    // nav.addEventListener('mouseleave', (e)=> {
    //         for(let i = 0; i < headShot.length;i++){
    //             headShot[i] += e;
    //         gradientStartCount = -0;
    //         gradientEndCount = 100;
    //         gradientDegreeCount = -35;
    //         clearInterval(someInterval);
    //         console.log('things and stuff')
    //     }
    // })
}
onClick();
loadLinks();
projectsLinksOnClick();
aboutMeClickEvents();

bubsInterval;



//bubsIntervalModule();
badThingsController();
formatListTitles();
// if (HTMLScriptElement.supports?.("importmap")) {
//     console.log("Browser supports import maps.");
