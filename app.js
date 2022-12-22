const about = "C:/Users/Chad/Desktop/Grand Circus/Personal_Website_Lab/about.html";
const portfolio = "C:/Users/Chad/Desktop/Grand Circus/Personal_Website_Lab/portfolio.html";
const home = "C:/Users/Chad/Desktop/Grand Circus/Personal_Website_Lab/home.html"
const linksArray = [home,about,portfolio];
const nav = document.getElementById('nav');
let links = document.getElementsByClassName('link');
const educationLinks = document.querySelectorAll('a.light-purple');
const imageContent = document.getElementById('main-image');
const imageTitle = document.getElementById('image-title');
const imageMessage = document.getElementById('image-message');
const bulky = 'https://github.com/ChadGessner/BulkyBook';
const bulkyHTML = document.createElement('a');
const bulkyLinkContainer = document.getElementById('put-here')
const bulkyLink =  `
    <a href=${bulky} class="a-style text-smaller press-start text-light darker-blue text-end">Bulky Book Finished Project</a>
`;
//bulkyLink.href = 'https://github.com/ChadGessner/BulkyBook';
//bulkyLink.innerText = 'here is a link';

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
const loadLinks = () => {
    for(let i = 0; i < links.length;i++){
        links[i].href = linksArray[i];
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
                bulkyLinkContainer.style.display = 'inline'
                bulkyLinkContainer.innerHTML = bulkyLink;
            }else{
                bulkyLinkContainer.style.display = 'none';
            }
            
        })
    })
}
onClick();
loadLinks();
