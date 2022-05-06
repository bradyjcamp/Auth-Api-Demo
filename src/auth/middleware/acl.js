'use strict';



module.exports = (capability) => {
  return (req, res, next) => {
    try{
      console.log('testACL');
      if(req.user.capabilities.includes(capability)){
        next();
      }else{
        next('Access Denied');
      }
    }catch(e){
      next('Invalid Login')
    }
  }
}