// 状態変数>
var scale = 1;
var transitionStarted = 0;
var transitionFrom = 0;
var transitionTo = 0;
var transitionDuration = 0;

// サイズの変更を開始する処理

function changeSIZE1()
{
  transitionStarted = new Date().getTime();
  transitionFrom = scale;
  transitionTo =  2.5; // 最終的な倍率。状態により変化
  transitionDuration = 1000;
}
function changeSIZE2()
{
  transitionStarted = new Date().getTime();
  transitionFrom = scale;
  transitionTo =  1; // 最終的な倍率。状態により変化
  transitionDuration = 1000;
}
function changeSIZE3()
{
  transitionStarted = new Date().getTime();
  transitionFrom = scale;
  transitionTo = 0.5; // 最終的な倍率。状態により変化
  transitionDuration = 1000;
}



(function(){
  "use strict";

  function $(sel)
  {
    return document.getElementById(sel);
  }

  function $$(sel)
  {
    if (typeof document.getElementsByClassName === 'undefined')
    {
      return document.getElementsByName(sel);
    }
    return document.getElementsByClassName(sel);
  }

  var dCol = '', //date colour.
      sCol = '', //seconds colour.
      mCol = '', //minutes colour.
      hCol = '', //hours colour.
      fCol = '', //face color

      ClockHeight = 65,
      ClockWidth = 65,
      ClockFromMouseY = 0,
      ClockFromMouseX = 100,
      d = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      date = new Date(),
      day = date.getDate(),
      year = date.getYear() + 1900;
  var TodaysDate = " " + d[date.getDay()] + " " + day + " " + m[date.getMonth()] + " " + year;
  var D = TodaysDate.split('');
  var H = '☆☆☆';
  H = H.split('');
  var M = '☆☆☆☆';
  M = M.split('');
  var S = '・・・・・';
  S = S.split('');
  var Face = '1 2 3 4 5 6 7 8 9 10 11 12',
      font = 'Helvetica, Arial, sans-serif',
      size = 1,
      speed = 0.55;
  Face = Face.split(' ');
  var n = Face.length;
  var a = size * 10;
  var ymouse = 0,
      xmouse = 0,
      scrll = 0,
      props = '<span style="font-family:' + font + ';font-size:' + size + 'em; color:#' + fCol + '">',
      props2 = '<span style="font-family:' + font + ';font-size:' + size + 'em; color:#' + dCol + '">';
  var Split = 360 / n;
  var Dsplit = 360 / D.length;
  var HandHeight = ClockHeight / 4.5;
  var HandWidth = ClockWidth / 4.5;
  var HandY = -7,
      HandX = -2.5,
      step = 0.02,
      currStep = 0,
      y = [],
      x = [],
      Y = [],
      X = [],
      Dy = [],
      Dx = [],
      DY = [],
      DX = [];
  var i;

  for (i = 0; i < n; i++)
  {
    y[i] = 0;
    x[i] = 0;
    Y[i] = 0;
    X[i] = 0;
  }

  for (i = 0; i < D.length; i++)
  {
    Dy[i] = 0;
    Dx[i] = 0;
    DY[i] = 0;
    DX[i] = 0;
  }
  var wrapper = $('clock');
  var html = '';
  // Date wrapper

  html = '';

  for (i = 0; i < D.length; i++)
  {
    html += '<div class="Date" name="Date" style="position:absolute;top:0px;left:0;height:' + a + ';width:' + a + ';text-align:center">' + props2 + D[i] + '</span></div>';
  }
  $('Od').children[0].innerHTML = html;

  // Face wrapper

  html = '';

  for (i = 0; i < n; i++)
  {
    html += '<div class="Face" name="Face" style="position:absolute;top:0px;left:0;height:' + a + ';width:' + a + ';text-align:center">' + props + Face[i] + '</span></div>';
  }
  $('Of').children[0].innerHTML = html;
  // Hours wrapper

  html = '';

  for (i = 0; i < H.length; i++)
  {
    html += '<div class="Hours" name="Hours" style="position:absolute;width:16px;height:16px;font-family:Arial;font-size:16px;color:' + hCol + ';text-align:center;font-weight:bold">' + H[i] + '</div>';
  }
  $('Oh').children[0].innerHTML = html;
  // Minute wrapper

  html = '';

  for (i = 0; i < M.length; i++)
  {
    html += '<div class="Minutes" name="Minutes" style="position:absolute;width:16px;height:16px;font-family:Arial;font-size:16px;color:' + mCol + ';text-align:center;font-weight:bold">' + M[i] + '</div>';
  }
  $('Om').children[0].innerHTML = html;
  // Seconds wrapper

  html = '';

  for (i = 0; i < S.length; i++)
  {
    html += '<div class="Seconds" name="Seconds" style="position:absolute;width:16px;height:16px;font-family:Arial;font-size:16px;color:' + sCol + ';text-align:center;font-weight:bold">' + S[i] + '</div>';
  }
  $('Os').children[0].innerHTML = html;
  // Mouse move event handler

  function Mouse(evnt)
  {
    if (typeof evnt === 'undefined')
    {
      ymouse = event.Y + ClockFromMouseY;
      xmouse = event.X + ClockFromMouseX;
    }
    else
    {
      ymouse = evnt.clientY + ClockFromMouseY;
      xmouse = evnt.clientX + ClockFromMouseX;
    }
  }

  document.onmousemove = Mouse;

  function ClockAndAssign()
  {
    var time = new Date();

    // 状態変更処理
    if(transitionStarted)
    {
      var d = time.getTime() - transitionStarted;
      if (d < transitionDuration)
      {
        scale = transitionFrom + (transitionTo - transitionFrom) * d / transitionDuration;
      }
      else
      {
        // トランジション終了
        scale = transitionTo;
        transitionStarted = 0;
      }
    }

    var secs = time.getSeconds();
    var sec = -1.57 + Math.PI * secs / 30;
    var mins = time.getMinutes();
    var min = -1.57 + Math.PI * mins / 30;
    var hr = time.getHours();
    var hrs = -1.575 + Math.PI * hr / 6 + Math.PI * parseInt(time.getMinutes(), 10) / 360;
    $('Od').style.top = window.document.body.scrollTop;
    $('Of').style.top = window.document.body.scrollTop;
    $('Oh').style.top = window.document.body.scrollTop;
    $('Om').style.top = window.document.body.scrollTop;
    $('Os').style.top = window.document.body.scrollTop;

    for (i = 0; i < n; i++)
    {
      var F = $$('Face')[i];
      F.style.top = y[i] + scale * ClockHeight * Math.sin(-1.0471 + i * Split * Math.PI / 180) + scrll;
      F.style.left = x[i] + scale * ClockWidth * Math.cos(-1.0471 + i * Split * Math.PI / 180);
    }

    for (i = 0; i < H.length; i++)
    {
      var HL = $$('Hours')[i];
      HL.style.top = y[i] + HandY + scale * (i * HandHeight) * Math.sin(hrs) + scrll;
      HL.style.left = x[i] + HandX + scale * (i * HandWidth) * Math.cos(hrs);
    }

    for (i = 0; i < M.length; i++)
    {
      var ML = $$('Minutes')[i].style;
      ML.top = y[i] + HandY + scale * (i * HandHeight) * Math.sin(min) + scrll;
      ML.left = x[i] + HandX + scale * (i * HandWidth) * Math.cos(min);
    }

    for (i = 0; i < S.length; i++)
    {
      var SL = $$('Seconds')[i].style;
      SL.top = y[i] + HandY + scale * (i * HandHeight) * Math.sin(sec) + scrll;
      SL.left = x[i] + HandX + scale * (i * HandWidth) * Math.cos(sec);
    }

    for (i = 0; i < D.length; i++)
    {
      var DL = $$('Date')[i].style;
      DL.top = Dy[i] + scale * ClockHeight * 1.5 * Math.sin(currStep + i * Dsplit * Math.PI / 180) + scrll;
      DL.left = Dx[i] + scale * ClockWidth * 1.5 * Math.cos(currStep + i * Dsplit * Math.PI / 180);
    }
    currStep -= step;
  }

  function Delay()
  {
    scrll = 0;
    Dy[0] = Math.round(DY[0] += ((ymouse) - DY[0]) * speed);
    Dx[0] = Math.round(DX[0] += ((xmouse) - DX[0]) * speed);

    for (i = 1; i < D.length; i++) {
      Dy[i] = Math.round(DY[i] += (Dy[i - 1] - DY[i]) * speed);
      Dx[i] = Math.round(DX[i] += (Dx[i - 1] - DX[i]) * speed);
    }
    y[0] = Math.round(Y[0] += ((ymouse) - Y[0]) * speed);
    x[0] = Math.round(X[0] += ((xmouse) - X[0]) * speed);

    for (i = 1; i < n; i++) {
      y[i] = Math.round(Y[i] += (y[i - 1] - Y[i]) * speed);
      x[i] = Math.round(X[i] += (x[i - 1] - X[i]) * speed);
    }
    ClockAndAssign();
    setTimeout(Delay, 20);
  }

  Delay();

}());

num = 1;
function toggle(){
  num ^= 1;
  if(num == 1){
    document.getElementById('clock').style.visibility="hidden";
    document.getElementById('size').disabled=true;
  }
  else {
    document.getElementById('clock').style.visibility="visible";
    document.getElementById('size').disabled=false;
  }
  document.getElementById("tog").value = num ?" APPEAR ":"KILL(切る)";
}
