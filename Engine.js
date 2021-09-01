function random(min, max){
    return Math.round(Math.random() * (max - min) + min);
}
var pro;
var familyURL = [];

function drawImages(c, iArray){
    if(iArray.length == 1){
        c.drawImage(iArray[0], 0, 0, c.canvas.width, c.canvas.height);
    }else{
        if(c.canvas.width > c.canvas.height){
            let iw = c.canvas.width / iArray.length;
            let ih = c.canvas.height;
            for(let i = 0; i < iArray.length; i++){
                c.drawImage(iArray[i], i * iw, 0, iw, ih);
            }
        }else{
            let iw = c.canvas.width;
            let ih = c.canvas.height / iArray.length;
            for(let i = 0; i < iArray.length; i++){
                c.drawImage(iArray[i], 0, i * ih, iw, ih);
            }   
        }
    }
}

class Game{
    constructor(width = window.innerWidth, height = window.innerHeight){
        this.width = width;
        this.height = height;
        this.contentLoaded = false;
        this.loadScripts = function(){
            for(let i = 0; i < arguments.length; i++){
                let script = document.createElement("script");
                script.setAttribute("src", arguments[i]);
                document.body.appendChild(script);
            }
        };
        this.init();
    }

    init(){
        this.loadScripts("vec.js", "rectangle.js", "lyrics.js");
        document.body.style.margin = "0px";
        document.body.style.backgroundColor = "gray";
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.style.top = "50%";
        this.div.style.left = "50%";
        this.canvas = document.createElement("canvas");
        this.c = this.canvas.getContext("2d");
        this.canvas.style.position = "absolute";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.div.appendChild(this.canvas);
        document.body.appendChild(this.div);
        this.t0 = performance.now();
        this.t1 = 0;
        this.dt = 0;
        window.onload =()=>{
            this.contentLoaded = true;
            this.inilitize();
        }
        this.run = () =>{
            if(this.contentLoaded){
                this.t1 = performance.now();
                this.dt = this.t1 - this.t0;
                if(this.dt > 17) this.dt = 17;
                if(isNaN(this.dt)) this.dt = 17;
                this.update(this.dt / 1000);
                this.draw(this.canvas.getContext("2d"));
                this.t0 = this.t1;
            }
            this.raf = window.requestAnimationFrame(this.run);
        };
        this.STOP = () =>{
            window.cancelAnimationFrame(this.raf);
        };
    }

    giveImage(query, cb, rate = 3){
        let p = new Promise((res, rej)=>{
            if(familyURL.length > 0){
                if(query == "Family" || query == "family"){
                    let rad = random(0, familyURL.length - 1);
                    res(true);
                    cb(familyURL[rad].src.medium);
                }else{
                    var url = "https://api.pexels.com/v1/search?query="+ query +"&per_page=" + rate;
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.setRequestHeader("Authorization", "563492ad6f91700001000001d26e1fb95f274c898ef9e44295e0c1ab");
                    xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var obj = JSON.parse(xhr.responseText);
                        if(obj.error){
                            res(true);
                            cb("https://th.bing.com/th?q=What%27s+a+Meaningful+Expression&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-IN&adlt=moderate&t=1&mw=247");
                        }else{
                            if(query == "family" || query == "Family"){
                                familyURL = obj.photos;
                            }
                            let rad = random(0, rate - 1);
                            if(obj.photos[rad]){
                                res(true);
                                cb(obj.photos[rad].src.medium);
                            }else{
                                res(true);
                                cb("https://th.bing.com/th?q=What%27s+a+Meaningful+Expression&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-IN&adlt=moderate&t=1&mw=247");
                            }
                        }
                    }
                    };
                    xhr.send();
                }
            }else{
                var url = "https://api.pexels.com/v1/search?query="+ query +"&per_page=" + rate;
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.setRequestHeader("Authorization", "563492ad6f91700001000001d26e1fb95f274c898ef9e44295e0c1ab");
                xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.error){
                        res(true);
                        cb("https://th.bing.com/th?q=What%27s+a+Meaningful+Expression&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-IN&adlt=moderate&t=1&mw=247");
                    }else{
                        if(query == "family" || query == "Family"){
                            familyURL = obj.photos;
                        }
                        let rad = random(0, rate - 1);
                        if(obj.photos[rad]){
                            res(true);
                            cb(obj.photos[rad].src.medium);
                        }else{
                            res(true);
                            cb("https://th.bing.com/th?q=What%27s+a+Meaningful+Expression&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-IN&adlt=moderate&t=1&mw=247");
                        }
                    }
                }
                };
                xhr.send();
            }
        });
        return p;
    }

    resizeScreen(){
        let widthToHeight = this.width / this.height;
        let newWidth = window.innerWidth;
        let newHeight = window.innerHeight;
        let newWidthToHeight = newWidth / newHeight;
        if(newWidthToHeight > widthToHeight){
            newWidth = newHeight * widthToHeight;
        }else{
            newHeight = newWidth / widthToHeight;
        }
        this.div.style.width = newWidth + "px";
        this.div.style.height = newHeight + "px";
        this.div.style.marginTop = (-newHeight / 2) + "px";
        this.div.style.marginLeft = (-newWidth / 2) + "px";
    }

    RUN(){
        this.run();
    }

    inilitize(){
        this.images = [];
        this.audioLoaded = false;
        document.getElementById("button").style.display = "none";
        this.audio = new Audio("https://raw.githubusercontent.com/God-Coding/LyricViewer/main/family.mp3");
        this.audio.addEventListener("canplaythrough", ()=>{
            this.audioLoaded = true;
            document.getElementById("button").style.display = "block";
        });
        this.shit = new Lyrics(this.audio, document.getElementById("button"));
        this.shit.keywords.forEach((keyword, k)=>{
            let subImages = [];
            if(k == 0){
                keyword.forEach(word=>{
                    pro = this.giveImage(word, (s)=>{
                        let i = new Image();
                        i.src = s;
                        subImages.push(i);
                    }, 1);
                });
            }else{
                pro.then(()=>{
                    keyword.forEach(word=>{
                        pro = this.giveImage(word, (s)=>{
                            let i = new Image();
                            i.src = s;
                            subImages.push(i);
                        }, 1);
                    });
                });
            }
            this.images.push(subImages);
        });
    }

    update(e){    
        this.shit.update();
    }   

    draw(c){
        this.resizeScreen();
        c.fillStyle = "black";
        c.fillRect(0, 0, this.width, this.height);
        if(this.audioLoaded){
            if(this.images[this.shit.requiredI].length > 0){
                drawImages(c, this.images[this.shit.requiredI]);
            }
        }else{
            c.fillStyle = "white";
            c.font = "50px verdana";
            c.fillText("Audio Loading...", 0, this.height/2);
        }
    }
}

