  //Connecting Nodes
  /*to connect nodes we take two levels at a time ith and (i+1)th then for every node in the ith level 
  we visit the (i+1)th level and generate nodes from the node of ith level to node of (i+1)th level
  iff node in (i+1)th level has all the attributes that ith level node has.*/
  for (i = 1; i <= set.length; i++) {
    current_breadth = k_combinations(set, i);         //ith level
    next_breadth = k_combinations(set, i + 1);        //(i+1)th level
    lenk = current_breadth.length;
    j = 1;
    for (curnode of current_breadth) {      //for every node in ith level
      k = 1;
      for (nexnode of next_breadth) {       //for every node in (i+1)th level
        for (curel of curnode) {            //for every attribute in the node of ith object
          for (nexel of nexnode) {          //for every attribute in the node of (i+1)th level
            if (curel === nexel) {          //if we find nodes where the condition is satisfied we
              tempJson.push({               //generate a connection
                "data": {
                  "source": (k + presum + lenk).toString(), // source node id
                  "target": (j + presum).toString(),         //target node id
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