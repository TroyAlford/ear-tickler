module.exports = {
  extend: function (a, b){
    for(var key in b)
      if(b.hasOwnProperty(key))
        a[key] = b[key];

    return a;
  },
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
}
