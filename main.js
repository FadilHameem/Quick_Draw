quick_draw_data_array=["Pen","Paper","Book","Bottle","Tree", "Apple"];
random_no = Math.floor((Math.random()*quick_draw_data_array.length)+1);
console.log(random_no, quick_draw_data_array);

sketch = quick_draw_data_array[random_no];
console.log("Sketch to be drawn : ", sketch);
document.getElementById("sketch_to_be_drawn").innerHTML =  '<p id="sketch_to_be_drawn">Sketch To Be Drawn : '+sketch+'</p>';

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score =  0;

function updateCanvas(){
    background("white");
    random_no = Math.floor((Math.random()*quick_draw_data_array.length)+1);
    console.log(random_no, quick_draw_data_array);
    document.getElementById("sketch_to_be_drawn").innerHTML =  '<p id="sketch_to_be_drawn">Sketch To Be Drawn : '+sketch+'</p>';
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function draw(){
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch();
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score++;
        document.getElementById("score").innerHTML = '<span id="score">Score : '+score+'</p>';
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        document.getElementById("your_sketch").innerHTML = 'Your Sketch : ' + results[0].label;
        document.getElementById("confidence").innerHTML = 'Confidence : ' + Math.round(results[0].confidence * 100) + '%';
        }
}

function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = '<span id="timer">Timer : '+timer_counter+'</span>';
    console.log("Time : ", timer_counter);
    if(timer_counter > 20000){
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}