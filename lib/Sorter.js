window.Sorter = (function () {
  var arraySize = 150;
  var highestInput = 999;
  var interval = 25;
  var visualizableArray = [];
  var intervalID = 0;
  var restyleQueue = [];

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

  var dequeue = function() {

    var styleEvent = null;

    styleEvent = restyleQueue.shift();

    styleEvent.element.style.maxWidth = styleEvent.maxWidth;
    styleEvent.element.style.backgroundColor = styleEvent.backgroundColor;

    if(restyleQueue.length === 0) {

      clearInterval(intervalID);
    }
  }

  var styleElement = function(element, id, value) {

    var colorValue = Math.floor(normalizeInputToRange(value,highestInput,245));
    var widthValue = Math.floor(normalizeInputToRange(value,highestInput,1000));

    //element.style.maxWidth = widthValue + "px";
    //element.style.backgroundColor = "rgb("+50+","+colorValue+","+colorValue+")";

    var restyleEvent = {

      element: element,
      maxWidth: widthValue + "px",
      backgroundColor: "rgb("+50+","+colorValue+","+colorValue+")"
    };

    restyleQueue.push(restyleEvent);

    //return element;
  }

  var quickTransformDisplayItems = function(displayArray,startIndex) {

    var element = null;

    for(var i = startIndex;i < displayArray.length;i++) {

      element = document.querySelector("#item"+i);

      element = styleElement(element,i, displayArray[i]);
      //element.id = "item" + i;
    }
}

  var bubbleTransformDisplayItems = function(iteration) {

      function transform(to,from) {

        to.style.maxWidth = from.style.maxWidth;
        to.style.backgroundColor = from.style.backgroundColor;
      };

      var li1 = document.getElementById("item" + iteration);
      var li2 = document.getElementById(("item" + (iteration+1)).toString());
      var temp = document.createElement('li');

      transform(temp,li1);
      transform(li1,li2);
      transform(li2,temp);
    };

  var startAnimation = function(sortType){

    if(typeof sortType !== 'string') {

      throw new TypeError("Did not recognize sort type.");
    }

    switch (sortType) {

      case "bubble":
        intervalID = setInterval(bubbleSort, interval);
        break;
      case "quick":
        quickSort(visualizableArray,0);
        break;
      default:
        throw new Error(sortType + " is not a recognized sorting type.");
    }

    intervalID = setInterval(dequeue, interval);

    //var requestedAlgorithm = quickSort;

    //intervalID = setInterval(requestedAlgorithm, interval, visualizableArray, 0, visualizableArray.length -1);
    //requestedAlgorithm(visualizableArray,0,visualizableArray.length);
  }

  var generateInitialMarkup = function() {

    generateArray();

    var orderedList = document.createElement('ol');

    for(var i = 0; i < visualizableArray.length; i++) {

      var arrayItem = document.createElement('li');

      var colorValue = Math.floor(normalizeInputToRange(visualizableArray[i],highestInput,245));
      var widthValue = Math.floor(normalizeInputToRange(visualizableArray[i],highestInput,1000));

      arrayItem.style.maxWidth = widthValue + "px";
      arrayItem.style.backgroundColor = "rgb("+50+","+colorValue+","+colorValue+")";
      //arrayItem = styleElement(arrayItem,i,visualizableArray[i]);
      arrayItem.id = "item" + i;
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

  var quickSort = function(quickArray,startIndex) {

    var pivotIndex = Math.floor(quickArray.length/2);
    var pivotValue = quickArray.splice(pivotIndex,1);
    var left = [];
    var right = [];

    for(var i = 0; i< quickArray.length; i++) {

      if(quickArray[i] < pivotValue) {

        left.push(quickArray[i]);

      } else {

        right.push(quickArray[i]);
      }
    }

    if(left.length > 1 ) {

      left = quickSort(left,startIndex);
    }

    if(right.length > 1 ) {

      right = quickSort(right, startIndex+left.length);
    }

    var out = left.concat(pivotValue,right);

    quickTransformDisplayItems(out,startIndex);

    return out;
  };

  return {
    init: generateInitialMarkup,
    start: startAnimation
  };
})();

