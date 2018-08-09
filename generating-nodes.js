/* 1) Generating nodes */


/* k_combinations is a function to generate each level of the cube 
where nth level is k_combinations(set, n+1) starting from 0th level*/

function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;
    //base cases start here
    /*------------------------------*/
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
    //base cases end here
    /*--------------------------------*/
    //recursive algorithm that generates combinations for non base cases
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


// generating nodes level by level, each iteration of the below for loop generates each level of the cuboid.

    for (i = 1; i <= set.length; i++) {
    tempData = k_combinations(set, i) 	/* if set=[q,p,t] then k_combination(set,2) = (p,q),(p,t),(q,t)*/
    x = -150 * (tempData.length - 1);	/* variable x is the x coordinate of the left most node of each level which iterates
    									with every node of each level by +300 */
    for (val of tempData) {
      wholearray.push(val);
      name = String.fromCharCode(...val);
      dataJson.push({				    /*this is part of the graphics library we are using(cytoscape.js) in which 
      									every point on the graph is represented by a json object here we are doing that*/		
        "data": {
          "id": iterator.toString(),		//unique id to every node from 0 to 2^n -1
          "idInt": iterator,				//integer version of the id
          "name": name + "(" + iterator.toString() + ")",	//data to be written on the node, eg, P,T 
          "score": 0.006769776522008331,	//physical size of the node
          "query": true,					//specific to the graphic library not the core part
          "gene": true						//specific to the graphic library not the core part
        },
        "position": {
          "x": x,							//x coordinate of the node
          "y": y,							//y coordinate of the node
        },
        "group": "nodes",					//grouping objects into a single class for styling
        "removed": false,					//specific to the graphic library not the core part
        "selected": false,					//specific to the graphic library not the core part
        "selectable": true,					//specific to the graphic library not the core part
        "locked": false,					//specific to the graphic library not the core part
        "grabbed": false,					//specific to the graphic library not the core part
        "grabbable": true,					//specific to the graphic library not the core part
        "classes": ""						//specific to the graphic library not the core part
      });
      x = x + 300;					/*increasing value of x by 300 after pushing each node*/
      iterator = iterator + 1;
    }

    y = y + 300;					/*increasing value of y by 300 after pushing each level*/
  }