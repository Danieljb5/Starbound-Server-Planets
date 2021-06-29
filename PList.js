let result;
let error;
let currentLine = 15;
let line = ' ';
let file;
let defaultURL = "";
let currentTextSize = 15;

function setup() {
  let params = getURLParams();
  file = params.file;
  if(file == null)
  {
    file = 'main';
  }
  loadStrings(file, loaded, loadErr);
  createCanvas(windowWidth, windowHeight);
}

function loadErr(error)
{
  background(255);
  text(error + " Could not load data file '" + file + "'.", 10, 10);
}

function loaded(result)
{
  background(255);
  let i = 0;
  while(line != '')
  {
    if(line != '')
    {
      line = result[i];
      parseLine();
      i++;
    }
  }
}

function draw() {
  
}

function parseLine()
{
  textSize(currentTextSize);
  if(match(line, '{i}') != null)
  {
    let arr = split(line, 'i}');
    let str;
    str = arr[1];
    imageMode(CORNER);
    let imgL = currentLine - currentTextSize;
    drawImage(str, imgL);
    currentLine += 180;
  }
  else if(match(line, '{a}') != null)
  {
    let arr = split(line, 'a}');
    let str;
    str = arr[1];
    let name = str;
    if(match(str, '{l}') != null)
    {
      arr = split(str, '{l}');
      str = arr[0];
      name = arr[1];
    }
    let a = createA(defaultURL + "?file=" + str, name);
    a.position(10, currentLine - currentTextSize);
    currentLine += currentTextSize * 1.5;
  }
  else if(match(line, '{s}') != null)
  {
    let arr = split(line, 's}');
    let str;
    str = arr[1];
    textSize(int(str));
    currentTextSize = int(str);
  }
  else
  {
    let lines = [];
    if(textWidth(line > windowWidth))
    {
      
    }
    text(line, 10, currentLine);
    currentLine += currentTextSize * 1.5;
  }
}

function drawImage(str, imageLine)
{
  loadImage(str, img => {
    image(img, 10, imageLine, 150, 150);
  });
}
