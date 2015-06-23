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

    return visualizableArray;
  };

  // normalizes number to a 0-highestOutput range
  var normalizeInputToRange = function (number, highestInput, highestOutput) {

    return ((number * highestOutput) / highestInput) + 20;
  };

  var transform =function (to,from) {
    to.style.maxWidth = from.style.maxWidth;
    to.style.backgroundColor = from.style.backgroundColor;
  };

  var transformDisplayItems = function(iteration) {

    var li1 = document.getElementById(iteration);
    var li2 = document.getElementById((iteration+1).toString());
    var temp = document.createElement('li');

    transform(temp,li1);
    transform(li1,li2);
    transform(li2,temp);

  };

  var startAnimation = function(){

    intervalID = setInterval(interval_sort, interval);
  }

  var generateInitialMarkup = function() {
    var visualizableArray = generateArray();
    var orderedList = document.createElement('ol');

    for(var i = 0; i < visualizableArray.length; i++) {

      var colorValue = Math.floor(normalizeInputToRange(visualizableArray[i],highestInput,245));
      var widthValue = Math.floor(normalizeInputToRange(visualizableArray[i],highestInput,1000));

      var arrayItem = document.createElement('li');
      arrayItem.id = i;
      arrayItem.style.maxWidth = widthValue + "px";
      arrayItem.style.backgroundColor = "rgb("+colorValue+","+colorValue+","+colorValue+")";
      orderedList.appendChild(arrayItem);
    }

    document.body.appendChild(orderedList);
  };

  var interval_sort = function() {

    for(var i = 0; i < visualizableArray.length; i++) {

      if((i + 1) === visualizableArray.length) {

        clearInterval(intervalID);

      }
      else if(visualizableArray[i] > visualizableArray[(i+1)]) {

        transformDisplayItems(i);

        var tempVariable = visualizableArray[i];
        visualizableArray[i] = visualizableArray[i+1];
        visualizableArray[i+1] = tempVariable;
        return;
      }
    }
  };


  return {
    init: generateInitialMarkup,
    start: startAnimation
  };
})();

