var JsFormatter = function() {
  
  this.spaces = "    ";
  this.new_line = "\n";
  
  var _this = this;
  
  this.format = function(data) {
      var string = '';
      try
      {
          string = iAmFormator(JSON.parse(data), 0, false);
      } catch(e) {
          string = 'Not a valid json';
      }
      
      return string;
  };
  
  function getSpacesByLevel(level) {
      
      var ret = '';
      
      for(var x = 1; x <= level; x++) {
          ret += _this.spaces;
      }
      return ret;
      
  }
  
  function iAmFormator(data, level, skip_space)
  {
      var level_space = getSpacesByLevel(level);
      var string = (skip_space ? "" : level_space) + "{" + _this.new_line;
      
      for(var index in data) {
          var type = typeof data[index];
          switch(type) {
              
              case 'object':
                    string += getSpacesByLevel(level + 1) + '"'+ index +'": ' + iAmFormator(data[index], level + 1, true) + _this.new_line;
                  break;
              
              case 'integer':
              case 'number':
              case 'string':
              case 'boolean':
              case 'null':
                   string += getSpacesByLevel(level + 1) + '"'+ index +'": ' + printData(data[index], type) + ","+ _this.new_line;
              break;
              
          }
          
      }
      string += level_space + "}" + _this.new_line;
      return string;
  }
  
  function printData(data, type) {
      
      if(type == 'string') {
          return '"' + data + '"';
      } else {
          return data;
      }
      
  }
  
};