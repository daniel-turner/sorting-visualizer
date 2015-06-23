window.Sorter = (function () {
  var arraySize = 150;
  var highestInput = 999;
  var interval = 2;
  var visualizableArray = [];
  var intervalID = 0;

  //generate random array for sort visualization
  var generateArray = function () {

    visualizableArray = [];

    for(var i = 0; i < arraySize; i++) {
      visualizableArray.push(Math.floor(Math.random() *1000));
    }
  };

  // normalizes number to a 0-highestOutput range
  var normalizeInputToRange = function (number, highestInput, highestOutput) {

    return ((number * highestOutput) / highestInput) + 20;
  };

  var styleElement = function(element, id) {

    var colorValue = Math.floor(normalizeInputToRange(visualizableArray[id],highestInput,245));
    var widthValue = Math.floor(normalizeInputToRange(visualizableArray[id],highestInput,1000));

    element.style.maxWidth = widthValue + "px";
    element.style.backgroundColor = "rgb("+50+","+colorValue+","+colorValue+")";

    return element;
  }

  var quickTransformDisplayItems = function(displayArray,startIndex,endIndex) {

    var element = null;

    var i = startIndex;

    for(var j = 0;i < displayArray.length;j++) {

      element = document.querySelector("#"+i);

      element = styleElement(element,j);
      element.id = i;
      i++;
    }
}

  var bubbleTransformDisplayItems = function(iteration) {

      function transform(to,from) {

        to.style.maxWidth = from.style.maxWidth;
        to.style.backgroundColor = from.style.backgroundColor;
      };

      var li1 = document.getElementById(iteration);
      var li2 = document.getElementById((iteration+1).toString());
      var temp = document.createElement('li');

      transform(temp,li1);
      transform(li1,li2);
      transform(li2,temp);
    };

  var startAnimation = function(){

    var requestedAlgorithm = quickSort;

    intervalID = setInterval(requestedAlgorithm, interval, visualizableArray);
  }

  var generateInitialMarkup = function() {

    generateArray();

    var orderedList = document.createElement('ol');

    for(var i = 0; i < visualizableArray.length; i++) {

      var arrayItem = document.createElement('li');
      arrayItem = styleElement(arrayItem,i);
      arrayItem.id = i;
      orderedList.appendChild(arrayItem);
    }

    document.body.appendChild(orderedList);
  };

  var bubbleSort = function() {

    for(var i = 0; i < visualizableArray.length; i++) {

      if((i + 1) === visualizableArray.length) {

        clearInterval(intervalID);

      } else if(visualizableArray[i] > visualizableArray[(i+1)]) {

        bubbleTransformDisplayItems(i);

        var tempVariable = visualizableArray[i];
        visualizableArray[i] = visualizableArray[i+1];
        visualizableArray[i+1] = tempVariable;
        return;
      }
    }
  };

  var quickSort = function(quickArray,startIndex,endIndex) {
    var pivotIndex = Math.floor(quickArray.length/2);
    var pivotValue = quickArray[pivotIndex];
    var left = [];
    var right = [];

    pivotValue = quickArray.splice(pivotIndex,1);

    for(var i = 0; i< quickArray.length; i++) {

      if(quickArray[i] < pivotValue) {

        left.push(quickArray[i]);

      } else {

        right.push(quickArray[i]);
      }
    }

    if(left.length > 1 ) {

      left = quickSort(left,startIndex, startIndex+left.length);
    }

    if(right.length > 1 ) {

      right = quickSort(right, startIndex+left.length+1, endIndex);
    }

    var out = left.concat(pivotValue,right);

    quickTransformDisplayItems(out,startIndex,endIndex);

    return out;
  };


  return {
    init: generateInitialMarkup,
    start: startAnimation
  };
})();

