/**
 * Function that can get complex attributes from
 * object, e.g 'abc.xyz.ijk'
 * @param {Object} ob Object to find the result
 * @param {string} key complex or simple string attribute
 */
function deepGet(ob, key) {
  let result = ob
  // Split key by '.' delimeter
  key.split('.').forEach((attr) => {
    result = result[attr]
  })
  return result
}
/**
 * Function to get props from binded object
 * @return if one prop is send that prop value is return otherwise
 * object is returned having all requested keys
 * @param {String} keys key of property to get it
 */
function getter(ob, keys) {
  let result
  if (keys.length === 1) {
    result = deepGet(ob, keys[0])
  } else {
    result = {}
    keys.forEach((key) => {
      result[key] = deepGet(ob, key)
    })
  }
  return result
}
/**
 * A class that will be base class for all other components
 * so initialize states and add basic functionalities
 */
class Component {
  constructor() {
    this.state = {}
  }
  /* Setter for store */
  addToStore(key, val) {
    this.store[key] = val
    return val
  }
  /* Getter for store */
  getFromStore(...keys) {
    return getter(this.store, keys)
  }
}

module.exports = Component
