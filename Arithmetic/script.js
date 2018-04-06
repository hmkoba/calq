var isMenu = true
var first, second, mode, count, endCount, timerId = 0
var startDate
var timerResult = ''
var problemCount = 1
var MAX_PROBLEM_COUNT = 10

var formula_func = {}
///////////////////////////////////////////////////
// 足し算
///////////////////////////////////////////////////
formula_func[49] = [
  function (){
    endCount = 1
    first = Math.floor( Math.random() * 100 )
    second = Math.floor( Math.random() * 100 )
    operator = '+'
    viewFormula('')
  },
  function (){
    viewFormula(first + second)
  }
]
///////////////////////////////////////////////////
// 引き算
///////////////////////////////////////////////////
formula_func[50] = [
  function (){
    endCount = 1
    first = Math.floor( Math.random() * 100 )
    second = Math.floor( Math.random() * (first + 1) )
    operator = '-'
    viewFormula('')
  },
  function (){
    viewFormula(first - second)
  }
]
///////////////////////////////////////////////////
// 掛け算
///////////////////////////////////////////////////
formula_func[51] = [
  function (){
    endCount = 1
    first = Math.floor( Math.random() * 100 )
    second = Math.floor( Math.random() * 100 )
    operator = '×'
    viewFormula('')
  },
  function (){
    viewFormula(first * second)
  }
]
///////////////////////////////////////////////////
// 割り算
///////////////////////////////////////////////////
formula_func[52] = [
  function (){
    endCount = 1
    second = Math.floor( Math.random() * (99 + 1) + 1)
    first = second * Math.floor( Math.random() * 100 + 1)
    operator = '÷'
    viewFormula('')
  },
  function (){
    viewFormula(first / second)
  }
]

///////////////////////////////////////////////////
// キー入力
///////////////////////////////////////////////////
document.onkeydown = function (){
  var formula = null

  // メニュー選択
  if (isMenu){
    if((mode = menuSelect(event.keyCode)) === 0){
      return
    }
    problemCount = 1
    count = 0
    formula = getFormula()
    count = 1
    disableMenu()

    // メニューに戻る
  } else if (event.keyCode == 27){
    first = second = count = mode = 0
    problemCount = 1
    enableMenu()
    return

    // 問題を進める
  } else if (event.keyCode == 32){
    formula = getFormula()
    count++

    if (count > endCount){
      problemCount++
      count = 0
    }

    if (problemCount == MAX_PROBLEM_COUNT + 1 && count == endCount) {
      document.getElementById('timer_result').innerHTML =  timerResult
      enableMenu()
      return
    }
  }

  if (formula !== null){
    formula()
  }
  return
}

function menuSelect (keyCode){
  switch (keyCode){
    case 49:  // 1
    case 50:  // 2
    case 51:  // 3
    case 52:  // 4
      return keyCode
  }
  return 0
}

function viewFormula (answer){
  document.getElementById('first').innerHTML =
  document.getElementById('first_l').innerHTML = first

  document.getElementById('second').innerHTML =
  document.getElementById('second_l').innerHTML = second

  document.getElementById('operator').innerHTML =
  document.getElementById('operator_l').innerHTML = operator

  if (answer.length === 0){
    document.getElementById('answer').innerHTML =
    document.getElementById('answer_l').innerHTML = answer
    return
  }

  document.getElementById('problem_count').innerHTML = problemCount
  document.getElementById('answer').innerHTML =
  document.getElementById('answer_l').innerHTML = ''

  return
}

function getFormula (){
  if (mode === 0){
    return null
  }
  return formula_func[mode][count]
}

function enableMenu (){
  isMenu = true
  document.getElementById("menu").style.display = 'block'
  document.getElementById("formula").style.display = 'none'
  stopTimer()
  return
}

function disableMenu (){
  isMenu = false
  document.getElementById("menu").style.display = 'none'
  document.getElementById("formula").style.display = 'block'
  startTimer()
  return
}

function startTimer (){
  startDate = Date.now();
  timerId = setInterval(showTimer,100);
}
function stopTimer (){
  clearInterval(timerId)
}
function showTimer (){
  timerResult = ((Date.now() - startDate) / 1000).toFixed(3)
  document.getElementById('timer').innerHTML =  timerResult + ' 秒'
}
