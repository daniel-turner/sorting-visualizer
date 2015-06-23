module.exports = (function BubbleSorter() {

  var sorted = false;

  var sort = function(array) {

    //validation
    if(!Array.isArray(array)) {

      throw new TypeError('Bubble_Sort was not given valid array input to sort.');
    }

    if(array.length < 2) {

      console.log(0);
      return array;
    }

    var moveCount = 0;

    moveCount = recursive_sort(array,false,moveCount);

    console.log(moveCount);
    return array;
  }

  var recursive_sort = function(array,sorted,count) {

    while(!sorted) {

      for(var i = 0; i < array.length; i++) {

        if(i + 1 === array.length) {

          sorted = true;

        } else if(array[i] > array[i+1]) {

          var tempVariable = array[i];
          array[i] = array[i+1];
          array[i+1] = tempVariable;
          count++;

          count = recursive_sort(array,sorted,count);
        }
      }
    }
    return count;
  }

  return {

    sort: sort
  }
})();