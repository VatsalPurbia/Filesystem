// Return Keys 
function getObjectKeys(obj) {
    return Object.keys(obj);
}
// Return values 
function getObjectvalues(obj) {
    return Object.values(obj);
}
// upper case funtion 
function convertToLowerCase(str) {
    return str.toLowerCase();
}
// mergin two object 
function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}
  
const myObject = { name: 'vatsal' , email: 'vatsal.purbia@appinventiv.com', id : 3 };
const keys = getObjectKeys(myObject);
console.log(keys);
const values = getObjectvalues(myObject)
console.log(values)


