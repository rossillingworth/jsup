
/**
 * cmd line:
 * specify file, or pass in stdin
 * use @extends, or allow cmd line to specify, override @extends?
 *
 * CRUD:
 * Insert / Update, is the default operation
 * @delete, specifies all keys to remove at this level
 *          except in a flat array, where it specifies the value
 *
 * @match:{key:"",[value:""]}, used for array object property matching,
 *
 *
 */


function extend(target /*,[source],[source]*/ ){
    //if(!target){target = this;}
    var sources = TM.ARRAY.fromCollection(arguments).slice(1);
    for(var index in sources){
        var source = sources[index];
        for(var propName in source){
            if(source.hasOwnProperty(propName)){
                try{
                    TM.log("applying prop["+propName+"]");
                    if(typeof(source[propName]) == 'object'){
                        if(target[propName] == undefined){target[propName]={};}
                        TM.log("recurse into " + propName);
                        TM.extend(target[propName], source[propName]);
                    }else{
                        try{target[propName] = source[propName];}catch(exc){TM.log("error:" + exc.message);}
                    }
                }catch(ex){
                    // ignore errors, uncomment for debugging
                    TM.log("error extending object: " + ex.message);
                }
            }
        }
    }
    return target;
}



//

