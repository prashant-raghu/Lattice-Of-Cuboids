set = [84, 80, 77, 83, 67];
value = [10, 40, 30, 20, 50];
var subarray = [];
var greaterarray = [];
var temparray = [];
var lowerarray = [];
var subarrayval = [];
var wholearray = [];
var sortedval = [];
var sortedname = [];
var last;
var srcind;
var snkind;
var garbage;
var counter;
var cond= false;
function bubbleSort() {
  var len = sortedval.length;
  for (var i = len - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (sortedval[j - 1] > sortedval[j]) {

        var temp = sortedval[j - 1];
        var temp2 = sortedname[j - 1];
        sortedval[j - 1] = sortedval[j];
        sortedname[j - 1] = sortedname[j];
        sortedval[j] = temp;
        sortedname[j] = temp2;
      }
    }
  }
  return 0;
}

function generate() {

  function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;
    if (k > set.length || k <= 0) {
      return [];
    }
    if (k == set.length) {
      return [set];
    }
    if (k == 1) {
      combs = [];
      for (i = 0; i < set.length; i++) {
        combs.push([set[i]]);
      }
      return combs;
    }
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
      head = set.slice(i, i + 1);
      tailcombs = k_combinations(set.slice(i + 1), k - 1);
      for (j = 0; j < tailcombs.length; j++) {
        combs.push(head.concat(tailcombs[j]));
      }
    }
    return combs;
  }
  i = 0;

  dataJson = [];
  tempJson = [];
  iterator = 1;
  y = 300;

  dataJson.push({
    "data": {
      "id": "0",
      "idInt": 0,
      "name": "ALL",
      "score": 0.006769776522008331,
      "query": true,
      "gene": true
    },
    "position": {
      "x": 0,
      "y": 0,
    },
    "group": "nodes",
    "removed": false,
    "selected": false,
    "selectable": true,
    "locked": false,
    "grabbed": false,
    "grabbable": true,
    "classes": ""
  });
  for (i = 1; i <= set.length; i++) {
    tempData = k_combinations(set, i)


    x = -150 * (tempData.length - 1);
    for (val of tempData) {
      wholearray.push(val);

      name = String.fromCharCode(...val);


      dataJson.push({
        "data": {
          "id": iterator.toString(),
          "idInt": iterator,
          "name": name + "(" + iterator.toString() + ")",
          "score": 0.006769776522008331,
          "query": true,
          "gene": true
        },
        "position": {
          "x": x,
          "y": y,
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      });
      x = x + 300;
      iterator = iterator + 1;
    }

    y = y + 300;
  }
  last = iterator;

  for (i = 1; i <= set.length; i++) {
    dataJson.push({
      "data": {
        "source": i.toString(),
        "target": "0",
        "weight": 10.0055478187,
        "group": "coexp",
        "networkId": (i + 1000000).toString(),
        "networkGroupId": 18,
        "intn": true,
        "rIntnId": 2,
        "id": "e" + (i + 10000000).toString()
      },
      "position": {},
      "group": "edges",
      "removed": false,
      "selected": false,
      "selectable": true,
      "locked": false,
      "grabbed": false,
      "grabbable": true,
      "classes": ""
    });
  }
  iterable = 0;
  j = 1;
  k = 1;
  presum = 0;
  lenk = 0;
  for (i = 1; i <= set.length; i++) {
    current_breadth = k_combinations(set, i);
    next_breadth = k_combinations(set, i + 1);
    lenk = current_breadth.length;
    j = 1;
    for (curnode of current_breadth) {
      k = 1;
      for (nexnode of next_breadth) {

        for (curel of curnode) {
          for (nexel of nexnode) {
            if (curel === nexel) {

              tempJson.push({
                "data": {
                  "source": (k + presum + lenk).toString(),
                  "target": (j + presum).toString(),
                  "weight": 10.0055478187,
                  "group": "coexp",
                  "networkId": (iterable).toString(),
                  "networkGroupId": 18,
                  "intn": true,
                  "rIntnId": 2,
                  "id": "e" + (iterable).toString()
                },
                "position": {},
                "group": "edges",
                "removed": false,
                "selected": false,
                "selectable": true,
                "locked": false,
                "grabbed": false,
                "grabbable": true,
                "classes": ""
              });


              iterable++;
            }
          }

        }
        k++;
        if (tempJson.length == curnode.length) {
          for (a of tempJson) {
            dataJson.push(a);
            //console.log(a);
            break;
          }

        }
        tempJson = [];
      }
      j++;


    }
    presum = presum + current_breadth.length;

  }


  backupJson = dataJson;
  Promise.all([
      fetch('cy-style.json', {
        mode: 'no-cors'
      })
      .then(function(res) {
        return res.json()
      }), dataJson
    ])
    .then(function(dataArray) {
      var Lattice = window.Lattice = cytoscape({
        container: document.getElementById('Lattice'),

        layout: {
          name: 'preset',
          idealEdgeLength: 0,
          nodeOverlap: 0,
          refresh: 0,
          fit: true,
          padding: 0,
          randomize: false,
          componentSpacing: 0,
          nodeRepulsion: 0,
          edgeElasticity: 100,
          nestingFactor: 0,
          gravity: 0,
          numIter: 0,
          initialTemp: 0,
          coolingFactor: 0,
          minTemp: 0
        },

        style: dataArray[0],

        elements: dataArray[1]

      });
    });

}

function add() {
  var here = document.getElementById("name").value.charCodeAt(0);
  var there = parseInt(document.getElementById("value").value);
  var someString = "";
  var somethingString = "";
  set.push(here);
  value.push(there)
  for (a of set) {
    somethingString = somethingString + String.fromCharCode(a);
    somethingString = somethingString + ", "

  }
  document.querySelector('.resultname').innerHTML = somethingString;
  for (a of value) {
    someString = someString + a.toString();
    someString = someString + ", "

  }
  document.querySelector('.resultvalue').innerHTML = someString;
}

function pop() {
  set.pop();
  value.pop();
  var someString = "";
  var somethingString = "";
  for (a of set) {
    somethingString = somethingString + String.fromCharCode(a);
    somethingString = somethingString + " "

  }
  document.querySelector('.resultname').innerHTML = somethingString;
  for (a of value) {
    someString = someString + a.toString();
    someString = someString + ", "
  }
  document.querySelector('.resultvalue').innerHTML = someString;
}
Array.prototype.clone

function find() {
      dataJson = backupJson;
   srcind = Math.min(parseInt(document.getElementById("source").value), parseInt(document.getElementById("sink").value))
    snkind = Math.max(parseInt(document.getElementById("source").value), parseInt(document.getElementById("sink").value))

  if (snkind > last) {
    document.querySelector('.nil').innerHTML = "Path doesn't exist";
  } 
  else {

   
    lowerarray = wholearray.slice(srcind - 1, srcind);
    lowerarray = lowerarray[0];

    greaterarray = wholearray.slice(snkind - 1, snkind);
    greaterarray = greaterarray[0];

    subarray = wholearray.slice(snkind - 1, snkind);
    subarray = subarray[0];
   
     if (lowerarray.length === greaterarray.length) {
      document.querySelector('.nil').innerHTML = "Path doesn't exist";
    } 

    
      document.querySelector('.nil').innerHTML = "Path Highlighted";

      console.log(lowerarray);
      console.log(greaterarray);
      for (val1 of lowerarray) {
        for (val2 of greaterarray) {
          if (val1 === val2) {
            var dex = subarray.indexOf(val2);
            var removed = subarray.splice(dex, 1);
          }
        }
      }
      subarrayval = [];
      for (l of subarray) {
        ind = set.indexOf(l);
        subarrayval.push(value[ind]);
      }
      sortedname = subarray.slice(0);
      sortedval = subarrayval.slice(0);
      var call = bubbleSort();
      console.log(subarray);
      console.log(sortedname);
      console.log(sortedval);
    
   
  }
}