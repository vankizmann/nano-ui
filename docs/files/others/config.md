
# pi.Arr Class

A lightweight utility class for working with arrays.

```js
import { Arr } from "@kizmann/pico-js";
```

<hr>

### Arr.make(count)
Creates an array of a given count filled with incrementing integers starting from 1.

```js
Arr.make(3);
// => [1, 2, 3]
```

**Arguments:**  
count `Int`: The number of elements in the new array.

**Returns:**  
`Array<Int>`: An array of integers `[1, 2, ..., count]`.

<hr>

### Arr.all(arr)
Ensures the input is always returned as an array.

```js
Arr.all(5);
// => [5]

Arr.all([1, 2]);
// => [1, 2]
```

**Arguments:**  
arr `Any`: The value to wrap in an array if it isn't already.

**Returns:**  
`Array`: The original array or a single-element array.

<hr>

### Arr.get(arr, index, fallback = null)
Returns the value at a given index or a fallback if it doesn't exist.

```js
Arr.get([1, 2, 3], 1);
// => 2

Arr.get([1, 2, 3], 5, null);
// => null
```

**Arguments:**  
arr `Array`: The array to query.  
index `Int`: The index to access.  
fallback `Any`: Value returned if the index is out of bounds.  

**Returns:**  
`Any`: The element at the index or the fallback.

<hr>

### Arr.set(arr, index, value)
Sets a value at the specified index of the array.

```js
Arr.set([0, 2, 44], 1, 42);
// => [0, 42, 44]
```

**Arguments:**  
arr `Array`: The array to modify.  
index `Int`: The index to set.  
value `Any`: The value to assign.  

**Returns:**  
`Any`: The assigned value.

<hr>

### Arr.first(arr, fallback = null)
Gets the first element of the array or a fallback.

```js
Arr.first([10, 20]);
// => 10

Arr.first([], null);
// => null
```

**Arguments:**  
arr `Array`: The array to query.  
fallback `Any`: Returned if array is empty or invalid.  

**Returns:**  
`Any`: First element or fallback.

<hr>

### Arr.second(arr, fallback = null)
Gets the second element of the array, falling back to the first or a fallback.

```js
Arr.second([10, 20]);
// => 20

Arr.second([10], 'none');
// => 10
```

**Arguments:**  
arr `Array`: The array to query.  
fallback `Any`: Returned if array is empty or invalid.

**Returns:**  
`Any`: Second element or fallback.

<hr>

### Arr.third(arr, fallback = null)
Gets the third element, or falls back to second, first, or fallback.

```js
Arr.third([1, 2, 3]);
// => 3

Arr.third([1], 'none');
// => 1
```

**Arguments:**  
arr `Array`: The array to query.  
fallback `Any`: Returned if array is empty or invalid.

**Returns:**  
`Any`: Third element or fallback.

<hr>

### Arr.last(arr, fallback = null)
Gets the last element of the array.

```js
Arr.last([5, 6, 7]);
// => 7
```

**Arguments:**  
arr `Array`: The array to query.  
fallback `Any`: Returned if array is empty or invalid.  

**Returns:**  
`Any`: Last element or fallback.

<hr>

### Arr.prepend(arr, val)
Adds a value to the beginning of an array.

```js
Arr.prepend([2, 3], 1);
// => [1, 2, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Any`: The value to prepend.  

**Returns:**  
`Array`: The updated array.

<hr>

### Arr.append(arr, val)
Adds a value to the end of an array.

```js
Arr.append([1, 2], 3);
// => [1, 2, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Any`: The value to append.  

**Returns:**  
`Array`: The updated array.

<hr>

### Arr.sort(obj, key)
Sorts an object of keyed values by a key or a custom function.

```js
Arr.sort([{ val: 2 }, { val: 1 }], 'val');
// => [{ val: 1, _key: 1 }, { val: 2, _key: 0 }]
```

**Arguments:**  
obj `Object`: The object to sort.  
key `String|Function`: A key to sort by or a custom comparison function.  

**Returns:**  
`Array`: Sorted array of values, each augmented with `_key`.

<hr>

### Arr.sortString(obj, key)
Sorts an object’s values alphabetically by a string key.

```js
Arr.sortString([{ name: "Zoe" }, { name: "Anna" }], 'name');
// => [{ name: "Anna", _key: 1 }, { name: "Zoe", _key: 0 }]
```

**Arguments:**  
obj `Object`: The object to sort.  
key `String`: Key to sort values by (case-insensitive).  

**Returns:**  
`Array`: Alphabetically sorted values.

<hr>

### Arr.filter(arr, filter)
Filters array values by a function, object, or array.

```js
Arr.filter([1, 2, 3, 4], n => n > 2);
// => [3, 4]
```

**Arguments:**  
arr `Array`: The array to filter.  
filter `Function|Object|Array`: Filter logic.  

**Returns:**  
`Array`: Filtered array.

<hr>

### Arr.filterIndex(arr, filter)
Gets indexes of values matching a filter.

```js
Arr.filterIndex([1, 2, 3, 4], n => n > 2);
// => ['2', '3']
```

**Arguments:**  
arr `Array`: The array to filter.  
filter `Function|Object|Array`: Filter logic.  

**Returns:**  
`Array<Number>`: Array of indexes matching the condition.
