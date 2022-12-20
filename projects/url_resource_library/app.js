const gobanNineBy = 'https://commons.wikimedia.org/wiki/File:Blank_Go_board_9x9.svg';
const blackStone = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Realistic_go_stone_render_-_black.svg';
const whiteStone = 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Realistic_go_stone_render_-_white.svg';
const alphabet = ['a','b','c','d','e','f','g','h','i'];
const goban = document.getElementById('goban');
const hitboxes = document.getElementById('hitbox-container');
let turn = true;
let color = turn ? 'black' : 'white';
// for(i=0; i < 81; i++) {
//     let square = document.createElement('div');
//     square.classList.add('goban-square');
//     square.addEventListener('click',()=> {
//         let stone = document.createElement('img');
//         stone.src = turn ?
//         blackStone :
//         whiteStone;
//         stone.classList.add('stone')
//         square.append(stone);
//         turn = !turn;
//     })
//     hitboxes.append(square);
// }
class Game {
    constructor() {
        this.Turn = true;
        this.Goban = new Goban();
        this.Move = 0;
    }
    GetStone = (intersection) => {
        this.Turn = !this.Turn;
        this.Move++;
        let color = !this.Turn ? 'black' : 'white';
        let nextStone = new Stone(color);
        nextStone.GetAir(intersection);
        //console.log(nextStone.Air["X+"]["Status"] + " " + nextStone.Air["X-"]["Coord"])
        return nextStone;
    }
}
class Goban {
    constructor() {
        this.Move = 0;
        this.Intersections = [];
        this.Whites = [];
        this.Blacks = [];
        this.Groups = [];
    }
    // IsUniqueArray = (stone, groups) => {
    //     for(let i = 0; i < groups.length; i++){
    //         for(let j = 0; j < groups[i].length; j++){
    //             if(stone.X === groups[i][j].X && stone.Y === groups[i][j].Y){
    //                 return false;
    //             }
    //             if(stone.X)
    //         }
    //     }
    // }
    
    IsHeckinConnected = (stoneOne, stoneTwo) => {
        if(!this.CheckStoneColor(stoneOne,stoneTwo)){
            return false;
        }
        if(stoneOne.X === stoneTwo.X && stoneOne.Y === stoneTwo.Y + 1 || stoneOne.X === stoneTwo.X && stoneOne.Y === stoneTwo.Y - 1){
            return true;
        }
        if(stoneOne.Y === stoneTwo.Y && stoneOne.X === stoneTwo.X + 1 || stoneOne.Y === stoneTwo.Y && stoneOne.X === stoneTwo.X - 1){
            return true;
        }
        return false;
    }
    CheckStoneColor = (stoneOne, stoneTwo) => {
        return stoneOne.Stone.Color === stoneTwo.Stone.Color;
    }
    IsSameStone = (stoneOne, stoneTwo) => {
        return this.CheckStoneColor(stoneOne,stoneTwo) && stoneOne.X === stoneTwo.X && stoneOne.Y === stoneTwo.Y;
    }
    CheckGroups = (intersection) => {
        if( this.Groups.length === 0){
            return false;
        }
        for(let i = 0; i < this.Groups.length; i++){
            let g = this.Groups[i];
            if(g.some(s => this.IsSameStone(s,intersection))){
                return true; // because this confirms that the intersection/stone is already in a group array
            }
            if(g.some(s => this.IsHeckinConnected(s,intersection))){
                g.push(intersection);
                return true;
            }
        }
        return false;
    }
    CheckGroupsAgainstOtherGroups = () => {
        let groups = this.Groups;
        for(let i = 0; i < groups.length; i++){
            let g = groups[i];
            let others = groups.filter((g,index)=> index !== i);
            for(let j = 0; j < others.length; j++){
                let currentOtherGroup = others[j];
                if(g.some(s => currentOtherGroup.some(cs => this.IsHeckinConnected(s,cs)))){
                    g = g.concat(currentOtherGroup);
                    groups[i] = g;
                    currentOtherGroup = [];
                    groups[j + i] = currentOtherGroup;
                    continue;
                }
            }
        }
        return groups.filter(a => a.length > 0);
    }
    GetGroups = () => {
        let stones = this.GetStones();
        this.Groups = this.CheckGroupsAgainstOtherGroups();
        for(let i = 0; i < stones.length; i++){
            let intersection = stones[i];
            if(!this.CheckGroups(intersection)){
                //console.log(false)
                this.Groups.push([intersection]);
                continue;
            }
            //console.log(true)
            continue;
        }
        this.Groups = this.CheckGroupsAgainstOtherGroups();
        return this.Groups;
    }
    // GetAllGroups = () => {
    //     this.GetGroups();
    //     return this.Groups;
    // }
    // GetWhiteGroups = () => {
    //     this.GetGroups();
    //     return this.Whites;
    // }
    // GetBlackGroups = () => {
    //     this.GetGroups();
    //     return this.Blacks;
    // }
    GetStones = () => {
        return this.Intersections
        .filter(i => i.IsClicked);
    }
    GetBlacks = () => {
        return this
        .GetStones()
        .filter(i => i.Stone.Color === 'black');
    }
    GetWhites = () => {
        return this
        .GetStones()
        .filter(i => i.Stone.Color === 'white');
    }
    CanSpewData = () => {
        let stones = this.GetStones();
        let groups = this.GetGroups();
        for(let i = 0; i < stones.length; i++) {
            let stone = stones[i].Stone;
            for(let j = 0; j < stones.length; j++){
                if(i != j){
                    stone.IsConnected(stones[j]);
                    stone.StonePointers.forEach(p  => {
                        console.log(p.Stone.Air)
                    })
                }
                
            }
        }
    }
    getOrUpdateGoban = (intersections) => {
        this.Intersections = [];
        this.Intersections = intersections;
        //this.GetGroups();
        this.CanSpewData();
    }
}
class ClickService {
    constructor(game) {
        this.Move = 0;
        this.Game = game;
        this.IsClicked = false;
        this.Stone = null;
        this.Intersections = [];
    }
    Initialize = () => {
        let intersections = [];
        for(let x = 0; x < 9; x++) {
            for(let y = 0; y < 9; y++) {
                
                let intersection = new Intersection(x,y,this);
                intersection.OnClick();
                intersections
                .push(intersection);
            }
        }
        this.Intersections = intersections
        this.UpdateGame();
    }
    SpewData = () => {
        let stones = this.Intersections
        .filter(i => i.IsClicked);
        for(let i = 0; i < stones.length;i++) {
            let stone = stones[i];
            console.log(`${stone.X} ${stone.Y} ${stone.Stone.Color} ${stone.ClickBox}`)
        }
    }
    UpdateGame = () => {
        
        this.Intersections.forEach(i => {
            i.Move = this.Game.Move;
            hitboxes.append(i.ClickBox);
        })
        this.Game.Goban.getOrUpdateGoban(this.Intersections);
        
        return; //this.SpewData();
    }
    GiveNextStone = (x,y) => {
        //console.log(x + " " + y + " " + this.Intersections.filter(i => i.Y === y && i.X === x))
        let intersection = this.Intersections
        .filter(i => i.X === x && i.Y === y)[0];
        //console.log(intersection)
        intersection.Move = this.Game.Move;
        return this.Game.GetStone(intersection);
    }
    UpdateIntersections = (intersection) => {
        let toUpdate = this.Intersections
        .filter(i => i.X === intersection.X && i.Y === intersection.Y);
        toUpdate = intersection;
        this.UpdateGame();
    }
}
class Intersection {
    constructor(x,y, service) {
        this.Service = service;
        this.Move = 0;
        this.ClickBox;
        this.X = x;
        this.Y = y;
        this.IsClicked = false;
        this.Stone = null;
    }
    OnClick = () => {
        if(!this.IsClicked){
            let clicky = document.createElement('div');
            clicky.classList
            .add('goban-square');
            this.ClickBox = clicky;
            clicky
            .addEventListener('click',async()=> {
                if(this.IsClicked){
                    return;
                }
                this.IsClicked = !this.IsClicked;
                this.Stone = this.Service.GiveNextStone(this.X,this.Y);
                clicky.append(this.Stone.OnClick());
                this.Service.UpdateIntersections(this);
                //this.Service.UpdateGame();
            });
        }
    }
}

class Stone {
    constructor(color, intersection) {
        this.Intersection = intersection;
        this.Color = color;
        this.Image = this.Color === 'black' ?
        blackStone : whiteStone;
        this.StoneImage;
        this.Air;
        this.StonePointers = [];
    }
    IsConnected(stone) {
        let x = stone.Stone.Air["X"]
        let y = stone.Stone.Air["Y"]
        let xMinus = this.Air["X-"]["Coord"];
        let yMinus = this.Air["Y-"]["Coord"];
        let xPlus = this.Air["X+"]["Coord"];
        let yPlus = this.Air["Y+"]["Coord"];
        //console.log(this.Air["X"] + " " + this.Air["Y"])
        if(x === this.Air["X"] && y === this.Air["Y"]){
            //console.log("hit")
            return false;
        }
        if(x === xPlus && y === this.Air["Y"]){
            console.log("hit")
            this.Air["X+"]["Status"]  = false;
            this.StonePointers
            .filter(s => s.Y === y && s.X === x).length === 0 ? 
            this.StonePointers.push(stone) : this.StonePointers;
            return true;
        }
        if(x === xMinus && y === this.Air["Y"]){
            console.log("hit1")
            this.Air["X-"]["Status"]  = false;
            this.StonePointers
            .filter(s => s.Y === y && s.X === x).length === 0 ? 
            this.StonePointers.push(stone) : this.StonePointers;
            return true;
        }
        if(y === yPlus && x === this.Air["X"]){
            console.log("hit2")
            this.Air["Y+"]["Status"] = false;
            this.StonePointers
            .filter(s => s.Y === y && s.X === x).length === 0 ? 
            this.StonePointers.push(stone) : this.StonePointers;
            return true;
        }
        if(y === yMinus && x === this.Air["X"]){
            console.log("hit3")
            this.Air["Y-"]["Status"]  = false;
            this.StonePointers
            .filter(s => s.Y === y && s.X === x).length === 0 ? 
            this.StonePointers.push(stone) : this.StonePointers;
            return true;
        }
        return false;
    }
    GetAir = (intersection) => {
        let json = {
            "X": intersection.X,

            "Y": intersection.Y,

            "X+": {
                "Coord": intersection.X + 1,
                "Status": true,
            },
            "X-": {
                "Coord": intersection.X - 1,
                "Status": true,
            },
            "Y+": {
                "Coord": intersection.Y + 1,
                "Status": true,
            },
            "Y-": {
                "Coord": intersection.Y - 1,
                "Status": true
            }
        }
        this.Air = json;
    }
    OnClick = () => {
        let stone = document
        .createElement('img')
        stone.src = this.Image;
        stone.classList.add('stone')
        this.StoneImage = stone;
        return this.StoneImage;
    }
}
class Group {
    constructor(intersection) {
        this.Group = [intersection];
    }
    connect = (otherGroup) => {
        this.Group = this.Group
        .concat(otherGroup);
        otherGroup.length = 0;
    }
}
const game = new Game();
const clickService = new ClickService(game);
clickService.Initialize();





