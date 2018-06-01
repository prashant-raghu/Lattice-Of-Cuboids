set = [84, 80, 77, 83, 67];
avalue = [30, 10, 50, 20, 40];

var someString = "Values: ";
  var somethingString = "Names: ";
  for (a of set) {
    somethingString = somethingString + String.fromCharCode(a) + " ";
  }
  document.querySelector('.resultname').innerHTML = somethingString;
  for (b of avalue) {
    someString = someString + b.toString() + " ";
  }
  document.querySelector('.resultvalue').innerHTML = someString;
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
var cond = false;
var currentarray = [];
var nextcurarray = [];
var dummyempty = [];
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
  wholearray = Array.from(dummyempty);
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

  dataJson.push({ //first node "ALL"
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

  backupJson = copy(dataJson);

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
//error here not working properly, add shows ascii code at resultvalue.
function add() {
  var here = document.getElementById("name").value.charCodeAt(0);
  var there = parseInt(document.getElementById("value").value);
  var someString = "Values: ";
  var somethingString = "Names: ";
  set.push(here);
  avalue.push(there)
  for (a of set) {
    somethingString = somethingString + String.fromCharCode(a) + " ";
  }
  document.querySelector('.resultname').innerHTML = somethingString;
  for (b of avalue) {
    someString = someString + b.toString() + " ";
  }
  document.querySelector('.resultvalue').innerHTML = someString;
}


function pop() {
  set.pop();
  avalue.pop();
  var someString = "Values: ";
  var somethingString = "Names: ";
  for (a of set) {
    somethingString = somethingString + String.fromCharCode(a) + " ";
  }
  document.querySelector('.resultname').innerHTML = somethingString;
  for (b of avalue) {
    someString = someString + b.toString() + " ";
  }
  document.querySelector('.resultvalue').innerHTML = someString;
}
// Function to Deep copy objects that contain cycles.
function copy(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    output[key] = (typeof v === "object") ? copy(v) : v;
  }
  return output;
}

function find() {

  generate();
  // dataJson = Array.from(backupJson);
  dataJson = copy(backupJson);
  srcind = Math.min(parseInt(document.getElementById("source").value), parseInt(document.getElementById("sink").value))
  snkind = Math.max(parseInt(document.getElementById("source").value), parseInt(document.getElementById("sink").value))

  if (snkind > last) {
    document.querySelector('.nil').innerHTML = "Path doesn't exist";
  } else {

    lowerarray = Array.from(wholearray[srcind - 1]);
    greaterarray = Array.from(wholearray[snkind - 1]);
    subarray = Array.from(wholearray[snkind - 1]);
    if (lowerarray.length === greaterarray.length) {

    }
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
      subarrayval.push(avalue[ind]);
    }
    sortedname = Array.from(subarray);
    sortedval = Array.from(subarrayval);
    var call = bubbleSort();
    console.log(wholearray);
    console.log(lowerarray);
    console.log(greaterarray);
    console.log(subarray);
    console.log(sortedname);
    console.log(sortedval);
    if (subarray.length != greaterarray.length - lowerarray.length) {
      document.querySelector('.nil').innerHTML = "Path doesn't exist";
    } else {
      document.querySelector('.nil').innerHTML = "Path Highlighted";
      currentarray = [];
      nextcurarray = [];
      currentarray = Array.from(lowerarray);
      nextcurarray = Array.from(lowerarray);
      var tempval = sortedname[0];
      nextcurarray.push(tempval);
      // generate data_cube
      var low = 0;
      while (nextcurarray.length <= greaterarray.length) {
        var count = 0;
        var count2 = 0;
        var lowind;
        var upind;
        var it;
        var it2;
        it = 0;
        count = 0;
        for (values of wholearray) {
          for (a of currentarray) {
            for (b of values) {
              if (a === b) {
                count++;
              }
            }
          }
          if (count === currentarray.length) {
            lowind = it;
            break;
          }
          count = 0;
          it++;
        }
        it2 = 0;
        count2 = 0;
        for (values of wholearray) {
          for (a of nextcurarray) {
            for (b of values) {
              if (a === b) count2++;
            }
          }
          if (count2 === nextcurarray.length) {
            upind = it2;
            break;

          }
          it2++;
          count2 = 0;
        }
        upind = upind + 1;
        lowind = lowind + 1;
        console.log(lowind);
        console.log(upind);

        for (data1 of dataJson) {
        if (data1.data.source === lowind.toString() && data1.data.target === upind.toString()) {
            data1.data.group = 'coexp1';
          } else if (data1.data.source === upind.toString() && data1.data.target === lowind.toString()) {
            data1.data.group = 'coexp1';
          }
        }
        currentarray.push(sortedname[low])
        nextcurarray.push(sortedname[low + 1]);
        low = low + 1;

      }
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
  }
}