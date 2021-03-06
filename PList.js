let result;
let error;
let currentLine = 20;
let line = ' ';
let file;
let currentTextSize = 15;
let w, h;
let canvasCreated = false;

function setup() {
  w = windowWidth;
  h = windowHeight;
  let params = getURLParams();
  file = params.page;
  if(file == null)
  {
    file = 'data/main';
  }
  loadStrings(file, loaded, loadErr);
}

function reset()
{
  w = windowWidth;
  if(!canvasCreated)
  {
    createCanvas(w, h);
    canvasCreated = true;
  }
  else
  {
    resizeCanvas(w, h, false);
  }
  background(37.0, 38.0, 41.7);
  renderPage();
}

function loadErr(error)
{
  createCanvas(w, h, false);
  canvasCreated = true;
  background(255);
  text(error + " Could not load data file '" + file + "'.", 10, 10);
}

function windowResized()
{
  reset();
}

function loaded(data)
{
  result = data;
  line = ' ';
  let i = 0;
  while(line != '')
  {
    if(line != '')
    {
      line = data[i];
      getPageSize();
      i++;
    }
  }
  
  if(h > windowHeight)
  {
    reset();
  }
  else
  {
    renderPage();
  }
}

function renderPage()
{
  currentLine = 20;
  createCanvas(w, h);
  canvasCreated = true;
  background(37.0, 38.0, 41.7);
  line = ' ';
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
  textSize(currentTextSize);
  noStroke();
  fill(255);
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
    let a = createA("?page=" + str, name);
    a.position(10, currentLine - currentTextSize);
    a.style('color', '#aaaaff');
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


function getPageSize()
{
  if(currentLine + 15 > h)
  {
    h = currentLine + 15;
  }
  if(match(line, '{i}') != null)
  {
    currentLine += 180;
  }
  else if(match(line, '{a}') != null)
  {
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
    currentLine += currentTextSize * 1.5;
    setTextSize(tsOld);
  }
}
