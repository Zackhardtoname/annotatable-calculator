/*
Future Features
Delete individual calcs
*/

let calc = "";
let counter = 1;
const opers = "+-**/";
changed_mul_operator_symbol = false

function preWash () {
   ori =  $("#formula").val()
   calc = ori.replace("^", "**")
   changed_mul_operator_symbol = true
}

function postWash () {
  ori =  $("#formula").val()
  if (changed_mul_operator_symbol == true) {
    ori.replace("**", "^")
  }
  changed_mul_operator_symbol = false
  return ori
}

function finalUpdate() {
  $("#formula").val(calc)
}

function evaluate() {
  if ($("#annotation").val() != "" | $("#formula").val() != "") {
    let anno = $("#annotation").val()
    let toBeInserted = ""
    if (anno != "") {
      anno += ":" + "<br>"
    }
    toBeInserted = "<div class = 'historical' id =" + counter + " >" + counter + ". " + anno + postWash(calc) + "= <b>" + eval(calc) + "<b></div>"
    $("#historyContent").prepend(toBeInserted)
    counter++
    calc = ""
    $("#annotation").val("") 
    finalUpdate()
  }
}

function numUpdate(para) {
  calc += para
   finalUpdate()
}

function operUpdate(para) {
  if (calc.length !== 0) {
      const last = calc.slice(-1)
      if (opers.indexOf(last) === -1 ){
        calc += para
      }
    else if (opers.indexOf(last) >= 0 && calc.slice(-2) !== "**") {
         calc = calc.slice(0, -1) + para
      }
    else {
      calc = calc.slice(0, -2) + para
    }
      finalUpdate()
    }
}

function ceUpdate() {
  while (true) {
    if (opers.indexOf(calc.slice(-1)) >= 0) {
        break
        }
    calc = calc.slice(0, -1)
  }
  finalUpdate()
}

function acUpdate() {
    calc = ""
    finalUpdate()
}

function signUpdate() {
  calc = "-1*(" + calc + ")"
  finalUpdate()
}

$(document).ready(function () {
  $("#clearAnnotation").click(function () {
    $("#annotation").val("")
  })
  
  $("#clearFormula").click(function () {
    acUpdate()
  })
  
  $("#clearHistory").click(function () {
    $("#history").html('<div id="historyTitle"><h3>History</h3></div><div id="historyContent"></div>')
    counter = 1
  })
  
  $(".num").click(function () {
    let para = this.innerHTML
   numUpdate(para)
  })
  
  $(".oper").click(function() {
    let para = this.innerHTML
    operUpdate(para)
  })
  
    $("#ac").click(acUpdate()
  )
  
  $("#ce").click(function() {
    ceUpdate()
  })
  
  $(".equal").click(function() {
    evaluate()
    $("#annotation").val("")
  })
  
  $("#sign").click(function() {
    signUpdate()
  })
  
  $( "#formula" ).change(function() {
    preWash()
    evaluate()
  })
}
)