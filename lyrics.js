class Lyrics{
    constructor(song, btn){
        this.song = song;
        this.text = `<span style='color:red' class="highlight">Family</span>
        I know <span style='color:blue' class="highlight">water</span> that's thicker than <span style='color:red' class="highlight">blood</span>
        That's deeper than <span style='color:red' class="highlight">love</span> with my <span style='color:red' class="highlight">friends</span>
        <span style='color:red' class="highlight">People</span> come and some <span style='color:red' class="highlight">people</span> go
        And some people <span style='color:red' class="highlight">ride</span> to the end
        When I am <span style='color:red' class="highlight">blind</span>, in my <span style='color:red' class="highlight">mind</span>
        I swear they be my <span style='color:red' class="highlight">rescue</span>, my lifeline
        I don't know what I'd do if I, if I'd <span style='color:red' class="highlight">survive</span>
        My <span style='color:red' class="highlight">brothers</span> and my <span style='color:red' class="highlight">sisters</span> in my life, yeah
        I know some <span style='color:red' class="highlight">people</span>, they would <span style='color:red' class="highlight">die</span> for me
        We run <span style='color:red' class="highlight">together</span>, they're my <span style='color:red' class="highlight">family</span>
        When I get up they gon' be <span style='color:red' class="highlight">high</span> with me
        I'll say <span style='color:red' class="highlight">forever</span> my <span style='color:red' class="highlight">family</span>
        My <span style='color:red' class="highlight">family</span>
        I'll say <span style='color:red' class="highlight">forever</span> my <span style='color:red' class="highlight">family</span>
        My <span style='color:red' class="highlight">family</span>
        I'll say <span style='color:red' class="highlight">forever</span> my <span style='color:red' class="highlight">family</span>
        Stolen <span style='color:red' class="highlight">dream</span>s took our, our <span style='color:red' class="highlight">child</span>ish days
        Still, ain't <span style='color:red' class="highlight">nothing</span> changed now we're <span style='color:red' class="highlight">grow</span>n
        We're still <span style='color:red' class="highlight">young</span>, still got our <span style='color:red' class="highlight">mindless</span> ways
        In a timeless phase, <span style='color:red' class="highlight">kicking</span> <span style='color:red' class="highlight">stones</span>
        When I am <span style='color:red' class="highlight">blind</span>, in my <span style='color:red' class="highlight">mind</span>
        I swear they be my <span style='color:red' class="highlight">rescue</span>, my lifeline
        I don't know what I'd do if I, if I'd <span style='color:red' class="highlight">survive</span>
        My <span style='color:red' class="highlight">brothers</span> and my <span style='color:red' class="highlight">sisters</span> in my life, yeah
        I know some <span style='color:red' class="highlight">people</span>, they would <span style='color:red' class="highlight">die</span> for me
        We run <span style='color:red' class="highlight">together</span>, they're my <span style='color:red' class="highlight">family</span>
        When I get up they gon' be <span style='color:red' class="highlight">high</span> with me
        I'll say <span style='color:red' class="highlight">forever</span> my <span style='color:red' class="highlight">family</span>
        <span style='color:red' class="highlight">Family</span>
        I'll say <span style='color:red' class="highlight">forever my family</span>
        My <span style='color:red' class="highlight">family</span>
        I'll say forever my <span style='color:red' class="highlight">family</span>
        I know some <span style='color:red' class="highlight">people</span>, they would <span style='color:red' class="highlight">die</span> for me
        We run <span style='color:red' class="highlight">together</span>, they're my <span style='color:red' class="highlight">family</span>
        When I get up they gon' be <span style='color:red' class="highlight">high</span> with me
        I'll say forever my <span style='color:red' class="highlight">family</span>`;
        this.splited = this.text.split("\n");
        this.keywords = [];
        for(let i = 0; i < this.splited.length; i++){
            let ps = document.createElement("p");
            ps.innerHTML = this.splited[i];
            let wordSpam = ps.getElementsByClassName("highlight");
            let words = [];
            for(let j = 0; j < wordSpam.length; j++){
                words.push(wordSpam[j].innerHTML);
            }
            this.keywords.push(words);
        }
        this.currentPress = 0;
        this.data = [81,120,162,204,242,270,312,355,408,444,490,528,638,694,794,860,900,958,998,1033,1076,1104,1146,1183,1244,1283,1324,1364,1471,1531,1630,1690,1736,1771,1812,1855]
        this.times = [];
        this.p = document.createElement("h2");
        this.p.style.color = "white";
        this.p.style.backgroundColor = "black";
        this.p.style.position = "absolute";
        this.p.style.textAlign = "center";
        this.p.style.top = "50%";
        this.p.innerHTML =  this.splited[0];
        document.body.appendChild(this.p);
        this.requiredI = 0;
        this.count = 0;
        btn.addEventListener("click", ()=>{
            this.count++;
            if(this.count > 0){
                document.getElementById("play").innerHTML = "RESTART";
            }
            this.reset();
            this.song.play();
        });
    }

    start(){
        this.song.play();
        this.startTime = performance.now();
        window.addEventListener("click", ()=>{
            this.now = performance.now();
            this.times.push(Math.floor((this.now - this.startTime) / 100));
            console.log(this.times[this.currentPress]);
            this.currentPress++;
        });
    }

    update(){
        if(Math.floor(this.song.currentTime * 10) == this.data[this.requiredI]){
            this.requiredI++;
        }
        this.p.innerHTML = this.splited[this.requiredI];
    }

    reset(){
        this.requiredI = 0;
        this.song.pause();
        this.song.currentTime = 0;
    }

    done(){
        localStorage.setItem("array", this.times);
        console.log(localStorage.getItem("array"));
    }
}



