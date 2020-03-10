const imageMethods = {
  getMediaSourceOfLink( link ){
    let src;
    if(link){
      if(link.media){
        if(link.media.s3 && link.media.s3.small){
          src = link.media.s3.small.location
        }
      }
    }else{
      return 'empty link'
    }

    return src || 'no meta image source'
  }
}


export default imageMethods
