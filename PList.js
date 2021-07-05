let result;
let error;
let currentLine = 20;
let line = ' ';
let file;
let defaultURL = "";
let currentTextSize = 15;
let w, h;

function setup() {
  w = windowWidth;
  h = windowHeight;
  let params = getURLParams();
  file = params.file;
  if(file == null)
  {
    file = 'main.dat';
  }
  loadStrings(file, loaded, loadErr);
  createCanvas(w, h);
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

function parseLine()
{
  if(currentLine + 15 > h)
  {
    h = currentLine + 15;
    resizeCanvas(w, h);
  }
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
    setTextSize(int(str));
  }
  else
  {
    if(match(line, '{n}') != null)
    {
      arr = split(line, '{n}');
      let i = 0;
      while(arr[i] != null)
      {
        let tsOld = currentTextSize;
        if(textWidth(arr[i]) + 15 > windowWidth)
        {
          while(textWidth(arr[i]) + 15 > windowWidth)
          {
            setTextSize(currentTextSize - 1);
          }
        }
        text(arr[i], 10, currentLine);
        currentLine += currentTextSize * 2;
        setTextSize(tsOld);
        i++;
      }
      return;
    }
    let tsOld = currentTextSize;
    if(textWidth(line) + 15 > windowWidth)
    {
      while(textWidth(line) + 15 > windowWidth)
      {
        setTextSize(currentTextSize - 1);
      }
    }
    text(line, 10, currentLine);
    currentLine += currentTextSize * 1.5;
    setTextSize(tsOld);
  }
}

function drawImage(str, imageLine)
{
  loadImage(str, img => {
    image(img, 10, imageLine, 150, 150);
  });
}

function setTextSize(size)
{
  currentTextSize = size;
  textSize(size);
}
