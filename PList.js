let result;
let error;
let currentLine = 1;
let line = ' ';
let file;
let defaultURL = "";

function setup() {
  let params = getURLParams();
  file = params.file;
  if(file == null)
  {
    file = 'data';
  }
  loadStrings(file, loaded, loadErr);
  createCanvas(600, 600);
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
  if(match(line, '{i}') != null)
  {
    let arr = split(line, 'i}');
    let str;
    str = arr[1];
    imageMode(CORNER);
    let imgL = currentLine - 1;
    drawImage(str, imgL);
    currentLine += 10;
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
    a.position(10, (currentLine - 1) * 15);
    currentLine += 1.3;
  }
  else
  {
    text(line, 10, currentLine * 15);
    currentLine += 1.3;
  }
}

function drawImage(str, imageLine)
{
  loadImage(str, img => {
    image(img, 10, imageLine * 15, 150, 150);
  });
}
